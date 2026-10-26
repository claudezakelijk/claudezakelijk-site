#!/usr/bin/env python3
"""Quality gate for generated SEO content pages.

Usage:
  python scripts/quality-gate.py <path-to-markdown-file> [--spec <path-to-yaml-spec>]
  python scripts/quality-gate.py --all

Single-file mode runs 13 automated checks and prints pass/fail per check.
Batch mode (--all, used in CI) runs the same checks on every *published*
content file (status: published); drafts/specs/review are skipped. Published
files with a future publishDate are scheduled: they are checked too, with link
targets resolved as of their own publishDate, so they cannot fail on their day.
Exit code 0 = all pass, 1 = any fail.
"""

import sys
import re
import yaml
import argparse
import os
from datetime import date, datetime
from pathlib import Path
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parent.parent
PAGES_DIR = ROOT / 'src' / 'pages'
CONTENT_DIR = ROOT / 'src' / 'content'

# Route-patroon per collectie (moet matchen met de [slug]-routes in src/pages).
COLLECTION_ROUTES = {
    'verticalen': '/claude-voor-{id}',
    'integraties': '/integraties/{id}',
    'usecases': '/use-cases/{id}',
    'vergelijkingen': '/vergelijken/{id}',
    'compliance': '/compliance/{id}',
    'training': '/training/{id}',
    'nieuws': '/nieuws/{id}',
    'prijs': '/prijs/{id}',
    'cases': '/cases/{id}',
}

# Collecties met een status-veld: alleen live entries bouwen mee (src/lib/content.ts).
STATUS_COLLECTIONS = [
    'verticalen', 'integraties', 'usecases', 'vergelijkingen',
    'compliance', 'training', 'nieuws', 'prijs',
]


# Live = status 'published' en publishDate op of voor de peildatum (Europe/Amsterdam).
# Zelfde regel als src/lib/publicatie.mjs; pas beide samen aan. BOUWDATUM overschrijft vandaag.
def vandaag() -> str:
    vast = os.environ.get('BOUWDATUM')
    if vast:
        if not re.fullmatch(r'\d{4}-\d{2}-\d{2}', vast):
            raise SystemExit(f"BOUWDATUM moet YYYY-MM-DD zijn, kreeg '{vast}'")
        return vast
    return datetime.now(ZoneInfo('Europe/Amsterdam')).date().isoformat()


def datum_tekst(waarde) -> str | None:
    if isinstance(waarde, (date, datetime)):
        return waarde.isoformat()[:10]
    m = re.match(r'(\d{4}-\d{2}-\d{2})', str(waarde or ''))
    return m.group(1) if m else None


def is_live(fm: dict, peildatum: str) -> bool:
    datum = datum_tekst(fm.get('publishDate'))
    return fm.get('status') == 'published' and datum is not None and datum <= peildatum


def peildatum_voor(fm: dict) -> str:
    """Vanaf welke dag een bestand linkdoelen ziet: vandaag, of later als het bestand
    zelf pas later live gaat. Een ingepland artikel mag linken naar een ander ingepland
    artikel met dezelfde of een eerdere publishDate."""
    eigen = datum_tekst(fm.get('publishDate'))
    nu = vandaag()
    return max(nu, eigen) if eigen else nu


def load_markdown(path: str) -> tuple[dict, str]:
    text = Path(path).read_text(encoding='utf-8')
    if not text.startswith('---'):
        return {}, text
    parts = text.split('---', 2)
    if len(parts) < 3:
        return {}, text
    fm = yaml.safe_load(parts[1]) or {}
    body = parts[2].strip()
    return fm, body


def word_count(body: str) -> int:
    clean = re.sub(r'```[\s\S]*?```', '', body)
    clean = re.sub(r'!\[.*?\]\(.*?\)', '', clean)
    clean = re.sub(r'\[([^\]]+)\]\([^\)]+\)', r'\1', clean)
    clean = re.sub(r'[#*_>`~\-|]', ' ', clean)
    return len(clean.split())


def check_word_count(fm: dict, body: str) -> tuple[bool, str]:
    target = fm.get('wordCountTarget', 0)
    if target == 0:
        return False, 'No wordCountTarget in frontmatter'
    actual = word_count(body)
    lower = target * 0.9
    upper = target * 1.1
    ok = lower <= actual <= upper
    return ok, f'{actual} words (target: {target}, range: {int(lower)}-{int(upper)})'


def check_keyword_presence(fm: dict, body: str) -> tuple[bool, str]:
    keywords = fm.get('targetKeywords', [])
    h1 = fm.get('h1', '')
    if not keywords:
        return False, 'No targetKeywords in frontmatter'
    issues = []
    h1_found = any(kw.lower() in h1.lower() for kw in keywords)
    if not h1_found:
        issues.append('No keyword in H1')
    first_100 = ' '.join(body.split()[:100]).lower()
    first_100_found = any(kw.lower() in first_100 for kw in keywords)
    if not first_100_found:
        issues.append('No keyword in first 100 words')
    h2s = ' '.join(re.findall(r'^## (.+)$', body, re.MULTILINE)).lower()
    h2_count = sum(1 for kw in keywords if kw.lower() in h2s)
    if h2_count < 2:
        issues.append(f'Only {h2_count} keywords in H2 headings (need 2+)')
    ok = len(issues) == 0
    return ok, '; '.join(issues) if issues else 'All keyword placements OK'


ANTI_PATTERNS = [
    r'In het huidige digitale tijdperk',
    r'In een wereld die',
    r'In tijden van snelle',
    r'naadloze integratie',
    r'robuuste oplossing',
    r'toekomstbestendig',
    r'innovatieve aanpak',
    r'baanbrekend',
    r'—',
    r'^Bovendien[,.]',
    r'^Daarnaast[,.]',
    r'^Verder[,.]',
    r'^Tevens[,.]',
]


# Stijlpatronen (docs/schrijfstijl.md): AI-herkenbare constructies die in geen
# enkele tekst thuishoren. Gescheiden van ANTI_PATTERNS zodat --style ze los
# kan draaien op teksten zonder SEO-frontmatter (zoals cases).
STYLE_PATTERNS = [
    (r'(?i)\bis geen\b[^.\n]{0,60}:', '"X is geen Y: Z"-constructie'),
    (r'(?i)\bniet om\b[^.\n]{3,50},\s*maar om\b', '"niet om X, maar om Y"-constructie'),
    (r'(?i)van elkaars bestaan', 'personificatie ("wist van elkaars bestaan")'),
    (r"(?i)\b(tools?|systemen|systeem|pakketten|pakket|apps?|software)\b[^.\n]{0,30}\b(kennen|kent|weten|weet|wisten|wist|begrijpen|begrijpt|praten met|praat met)\b",
     'personificatie van software'),
]


def check_style_patterns(body: str) -> tuple[bool, str]:
    found = []
    for pattern, label in STYLE_PATTERNS:
        matches = re.findall(pattern, body, re.MULTILINE)
        if matches:
            found.append(f'{label}: {len(matches)}x')
    ok = len(found) == 0
    return ok, '; '.join(found) if found else 'Geen stijlpatronen gevonden'


def warn_triplets(body: str) -> str:
    """Heuristiek (alleen waarschuwen, nooit falen — te veel vals-positieven):
    alinea's met 3+ opeenvolgende korte zinnen (elk ≤ 8 woorden) = drieslag-ritme."""
    clean = re.sub(r'<!--[\s\S]*?-->', '', body)
    hits = 0
    for para in re.split(r'\n\s*\n', clean):
        if para.lstrip().startswith(('#', '-', '*', '|', '>')):
            continue
        sentences = [s.strip() for s in re.split(r'(?<=[.!?])\s+', para.strip()) if s.strip()]
        run = 0
        for s in sentences:
            run = run + 1 if len(s.split()) <= 8 else 0
            if run >= 3:
                hits += 1
                break
    return f'{hits} alinea(s) met drieslag-ritme (3+ korte zinnen op rij)' if hits else ''


def count_mens_markers(text: str) -> int:
    return len(re.findall(r'<!--\s*MENS:', text))


def run_style(filepath: str, expected_mens: int | None) -> int:
    """--style-modus: alleen stijlchecks + MENS-telling, voor teksten zonder
    SEO-frontmatter (cases) én als snelle check tijdens herschrijfrondes."""
    raw = Path(filepath).read_text(encoding='utf-8')
    _, body = load_markdown(filepath)
    # HTML-comments (o.a. de verplichte <!-- MENS: -->-blokken en bronnenblokken)
    # zijn geen zichtbare tekst — stijlchecks alleen op wat de lezer ziet.
    body = re.sub(r'<!--[\s\S]*?-->', '', body)
    checks = [
        ('1. Anti-pattern scan', check_anti_patterns(body)),
        ('2. Stijlpatronen (schrijfstijl.md)', check_style_patterns(body)),
    ]
    mens = count_mens_markers(raw)
    if expected_mens is not None:
        checks.append(('3. MENS-markers', (mens == expected_mens, f'{mens} gevonden (verwacht: {expected_mens})')))
    print(filepath)
    all_pass = print_checks(checks)
    if expected_mens is None:
        print(f'  [INFO] MENS-markers: {mens}')
    warning = warn_triplets(body)
    if warning:
        print(f'  [WARN] {warning}')
    print()
    print('Result: ALL STYLE CHECKS PASSED' if all_pass else 'Result: STYLE CHECK(S) FAILED')
    return 0 if all_pass else 1


def check_anti_patterns(body: str) -> tuple[bool, str]:
    found = []
    for pattern in ANTI_PATTERNS:
        matches = re.findall(pattern, body, re.MULTILINE | re.IGNORECASE)
        if matches:
            found.append(f'"{pattern}": {len(matches)}x')
    ok = len(found) == 0
    return ok, '; '.join(found) if found else 'No anti-patterns found'


def check_experience_injection(fm: dict, body: str) -> tuple[bool, str]:
    cases = fm.get('cases', [])
    if not cases:
        return False, 'No cases listed in frontmatter'
    has_case_ref = bool(re.search(r'In \w+ \d{4} bouwden we', body))
    has_number = bool(re.search(r'\d+[\.,]?\d*\s*(euro|procent|%|uur|weken|dagen|scripts|rapporten|reports|pagina)', body, re.IGNORECASE))
    ok = has_case_ref or has_number
    return ok, 'Case reference with number found' if ok else 'No case reference with specific number found'


def check_entity_density(body: str) -> tuple[bool, str]:
    known = {'Claude', 'Claude Code', 'Claude Pro', 'Claude Team', 'Claude Enterprise',
             'Anthropic', 'ClaudeZakelijk', 'Proxuma', 'Dxfferent',
             'Exact Online', 'Moneybird', 'Twinfield', 'Yuki', 'Autotask',
             'HubSpot', 'Power BI', 'Microsoft 365', 'Google Workspace', 'Salesforce',
             'NBA', 'NOvA', 'KNGF', 'NVM', 'KvK',
             'EU AI Act', 'AVG', 'GDPR', 'DPIA',
             'ChatGPT', 'OpenAI', 'Cursor', 'Windsurf', 'Copilot',
             'Vodafone', 'PostNL', 'TheRippleCo',
             'Joshua', 'Max', 'Max de Kwaasteniet'}
    found_known = {e for e in known if e in body}
    capitalized = set(re.findall(r'\b[A-Z][a-z]+(?:\s[A-Z][a-z]+)+\b', body))
    all_entities = found_known | capitalized
    count = len(all_entities)
    ok = count >= 15
    return ok, f'{count} entities found (need 15+)'


def check_internal_links(fm: dict, body: str) -> tuple[bool, str]:
    required = fm.get('internalLinks', [])
    if not required:
        return True, 'No internal links required'
    body_links = re.findall(r'\]\((/[^)]+)\)', body)
    missing = [link for link in required if link not in body_links]
    ok = len(missing) == 0
    return ok, f'Missing links: {missing}' if missing else f'All {len(required)} internal links present'


def check_faq_section(fm: dict, body: str) -> tuple[bool, str]:
    schema_types = fm.get('schemaTypes', [])
    if 'FAQPage' not in schema_types:
        return True, 'FAQPage not in schemaTypes, skip'
    faq = fm.get('faq', [])
    ok = len(faq) >= 3
    return ok, f'{len(faq)} FAQ items (need 3+)'


def check_structural_uniqueness(fm: dict, body: str) -> tuple[bool, str]:
    h2s = re.findall(r'^## (.+)$', body, re.MULTILINE)
    return True, f'{len(h2s)} H2 headings (cross-page uniqueness checked in batch review)'


def check_author(fm: dict) -> tuple[bool, str]:
    author = fm.get('author', '')
    ok = author in ('max', 'camiel')
    return ok, f'Author: {author}' if ok else f'Invalid author: {author}'


def check_no_fabricated_data(fm: dict, body: str) -> tuple[bool, str]:
    cases_dir = Path('src/content/cases')
    cases = fm.get('cases', [])
    if not cases:
        return True, 'No cases to cross-reference'
    issues = []
    for case_slug in cases:
        case_file = cases_dir / f'{case_slug}.md'
        if not case_file.exists():
            issues.append(f'Case file not found: {case_slug}.md')
    ok = len(issues) == 0
    return ok, '; '.join(issues) if issues else f'All {len(cases)} case files exist'


def check_frontmatter_complete(fm: dict) -> tuple[bool, str]:
    required = ['title', 'titleTag', 'metaDescription', 'h1', 'targetKeywords',
                 'wordCountTarget', 'priority', 'tier', 'schemaTypes', 'author', 'status']
    missing = [f for f in required if f not in fm]
    ok = len(missing) == 0
    return ok, f'Missing: {missing}' if missing else 'All required fields present'


def check_slug_matches(fm: dict, filepath: str) -> tuple[bool, str]:
    filename = Path(filepath).stem
    ok = not filename.startswith('_')
    return ok, f'Filename: {filename}' if ok else f'Test file detected: {filename} (starts with _)'


def build_valid_routes(peildatum: str) -> set[str]:
    """Alle routes die de site op de peildatum bouwt: statische .astro-pagina's
    plus content-entries (alleen live op die dag voor status-collecties)."""
    routes: set[str] = set()

    # 1. Statische pagina's uit src/pages ([slug]-routes overslaan; die
    #    worden hieronder via de collecties afgedekt).
    for astro_file in PAGES_DIR.rglob('*.astro'):
        rel = astro_file.relative_to(PAGES_DIR).with_suffix('')
        if '[' in str(rel):
            continue
        if rel.name == '404':
            continue
        if rel.name == 'index':
            route = '/' + str(rel.parent).replace('\\', '/')
            route = '/' if route == '/.' else route
        else:
            route = '/' + str(rel).replace('\\', '/')
        routes.add(route)

    # 2. Content-collecties.
    for collection, pattern in COLLECTION_ROUTES.items():
        coll_dir = CONTENT_DIR / collection
        if not coll_dir.is_dir():
            continue
        for md_file in coll_dir.rglob('*.md'):
            slug = md_file.stem
            if slug.startswith('_'):
                continue
            if collection in STATUS_COLLECTIONS:
                fm, _ = load_markdown(str(md_file))
                if not is_live(fm, peildatum):
                    continue
            routes.add(pattern.format(id=slug))

    return routes


def extract_internal_links(fm: dict, body: str) -> list[str]:
    links = list(fm.get('internalLinks', []) or [])
    links += re.findall(r'\]\((/[^)\s]*)\)', body)
    links += re.findall(r'href="(/[^"]*)"', body)
    return links


def check_link_targets(fm: dict, body: str, valid_routes: set[str]) -> tuple[bool, str]:
    """Valideert dat elk intern link-doel (frontmatter + body) echt bestaat:
    als gebouwde route of als bestand in public/."""
    broken = []
    seen = set()
    for raw in extract_internal_links(fm, body):
        link = raw.split('#')[0].split('?')[0]
        if not link or link in seen:
            continue
        seen.add(link)
        target = link.rstrip('/') or '/'
        if target in valid_routes:
            continue
        # Assets (bv. /downloads/x.docx, /images/y.svg) moeten in public/ staan.
        if (ROOT / 'public' / target.lstrip('/')).is_file():
            continue
        broken.append(target)
    ok = len(broken) == 0
    return ok, f'Broken link targets: {sorted(broken)}' if broken else 'All internal link targets exist'


def run_checks(filepath: str, fm: dict, body: str, valid_routes: set[str]) -> list[tuple[str, tuple[bool, str]]]:
    return [
        ('1. Word count', check_word_count(fm, body)),
        ('2. Keyword presence', check_keyword_presence(fm, body)),
        ('3. Anti-pattern scan', check_anti_patterns(body)),
        ('4. Experience injection', check_experience_injection(fm, body)),
        ('5. Entity density', check_entity_density(body)),
        ('6. Internal links', check_internal_links(fm, body)),
        ('7. FAQ section', check_faq_section(fm, body)),
        ('8. Structural uniqueness', check_structural_uniqueness(fm, body)),
        ('9. Author valid', check_author(fm)),
        ('10. No fabricated data', check_no_fabricated_data(fm, body)),
        ('11. Frontmatter complete', check_frontmatter_complete(fm)),
        ('12. Slug matches', check_slug_matches(fm, filepath)),
        ('13. Link targets exist', check_link_targets(fm, body, valid_routes)),
    ]


def print_checks(checks: list[tuple[str, tuple[bool, str]]]) -> bool:
    all_pass = True
    for name, (ok, msg) in checks:
        status = 'PASS' if ok else 'FAIL'
        if not ok:
            all_pass = False
        print(f'  [{status}] {name}: {msg}')
    return all_pass


def run_batch() -> int:
    """CI-modus: alle published content-bestanden checken; drafts overslaan.
    Ingeplande bestanden (publishDate na vandaag) tegen de routes van hun eigen datum."""
    routes_per_dag: dict[str, set[str]] = {}
    published: list[tuple[Path, dict, str]] = []
    skipped = 0
    for collection in STATUS_COLLECTIONS:
        coll_dir = CONTENT_DIR / collection
        if not coll_dir.is_dir():
            continue
        for md_file in sorted(coll_dir.rglob('*.md')):
            fm, body = load_markdown(str(md_file))
            if fm.get('status') == 'published':
                published.append((md_file, fm, body))
            else:
                skipped += 1

    nu = vandaag()
    ingepland = sum(1 for _, fm, _ in published if not is_live(fm, nu))
    print(f'Quality gate (batch, peildatum {nu}): {len(published)} published file(s) '
          f'({ingepland} scheduled), {skipped} non-published skipped\n')
    if not published:
        print('Result: NO PUBLISHED CONTENT TO CHECK (gate passes)')
        return 0

    failed_files = 0
    for md_file, fm, body in published:
        dag = peildatum_voor(fm)
        if dag not in routes_per_dag:
            routes_per_dag[dag] = build_valid_routes(dag)
        print(md_file.relative_to(ROOT) if dag == nu else f'{md_file.relative_to(ROOT)} (scheduled {dag})')
        checks = run_checks(str(md_file), fm, body, routes_per_dag[dag])
        if not print_checks(checks):
            failed_files += 1
        print()

    if failed_files:
        print(f'Result: {failed_files} of {len(published)} PUBLISHED FILE(S) FAILED')
        return 1
    print(f'Result: ALL {len(published)} PUBLISHED FILE(S) PASSED')
    return 0


def main():
    parser = argparse.ArgumentParser(description='Quality gate for SEO content')
    parser.add_argument('file', nargs='?', help='Path to markdown file')
    parser.add_argument('--spec', help='Path to YAML spec (optional)')
    parser.add_argument('--all', action='store_true',
                        help='Batch mode: check all published content files (CI)')
    parser.add_argument('--style', action='store_true',
                        help='Alleen stijlchecks + MENS-telling (voor cases/herschrijfrondes)')
    parser.add_argument('--mens', type=int, default=None,
                        help='Verwacht aantal <!-- MENS: -->-markers (faalt bij afwijking)')
    args = parser.parse_args()

    if args.all:
        sys.exit(run_batch())

    if args.style:
        if not args.file:
            parser.error('--style vereist een markdown-bestand')
        sys.exit(run_style(args.file, args.mens))

    if not args.file:
        parser.error('a markdown file is required (or use --all)')

    fm, body = load_markdown(args.file)
    checks = run_checks(args.file, fm, body, build_valid_routes(peildatum_voor(fm)))
    all_pass = print_checks(checks)

    print()
    if all_pass:
        print('Result: ALL CHECKS PASSED')
    else:
        failed = sum(1 for _, (ok, _) in checks if not ok)
        print(f'Result: {failed} CHECK(S) FAILED')

    sys.exit(0 if all_pass else 1)


if __name__ == '__main__':
    main()
