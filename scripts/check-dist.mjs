// Draait na astro build. Breekt de build (exit 1) op:
//  1. een niet-HTML-bestand in de root van dist/ dat niet bewust
//     in rootBestanden (src/data/indexering.mjs) is ingedeeld;
//  2. e-mailadressen in een openbaar tekstbestand, en
//     "Kwaasteniet" of "maxdekwaasteniet" in een openbaar tekstbestand (M7, S3), en
//     "Proxuma" of "Dxfferent" in een openbaar tekstbestand (M39, T5);
//  3. een exclude-regel in dist/_routes.json die een niet-zakelijk pad
//     langs de Function laat lopen (alleen als dist/_routes.json bestaat, A-15);
//  4. een H1 binnen .reveal-target op een indexeerbare pagina (LCP, T-01);
//  5. een placeholder of een HTML-comment op een indexeerbare pagina (H4).
// Meldingen noemen paden en aantallen, nooit de gevonden inhoud.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { rootBestanden, zakelijk } from '../src/data/indexering.mjs';

const DIST = 'dist';

// Zelfde indeling als functions/_middleware.js.
const IDX = JSON.parse(readFileSync('functions/_indexering.json', 'utf-8'));
const kanoniek = (pad) => pad.toLowerCase().replace(/\.html$/, '').replace(/\/index$/, '') || '/';
const isIndexeerbaar = (pad) => {
  if (IDX.preLaunch) return false;
  if (IDX.assets.some((a) => pad.startsWith(a))) return true;
  const p = kanoniek(pad);
  if (IDX.legeHubs.includes(p)) return false;
  return IDX.exact.includes(p) || IDX.secties.some((q) => p === q || p.startsWith(q + '/')) || IDX.prefixen.some((q) => p.startsWith(q));
};
const soort = (pad) => (isIndexeerbaar(pad) ? 'INDEXABLE' : 'NOINDEX');

function* bestanden(dir) {
  for (const naam of readdirSync(dir)) {
    const pad = join(dir, naam);
    if (statSync(pad).isDirectory()) yield* bestanden(pad);
    else yield pad;
  }
}
const urlVan = (bestand) => '/' + relative(DIST, bestand).split(sep).join('/');
const alle = [...bestanden(DIST)].map((b) => ({ bestand: b, pad: urlVan(b) })).map((f) => ({ ...f, soort: soort(f.pad) }));
const fouten = [];

// 1. Rootbestanden.
const ingedeeld = new Set([...rootBestanden.zakelijk, ...rootBestanden.bewustNoindex]);
for (const pad of rootBestanden.zakelijk) {
  if (!zakelijk.assets.some((a) => pad.startsWith(a))) fouten.push(`rootBestanden.zakelijk ${pad} staat niet in zakelijk.assets`);
}
for (const f of alle) {
  if (f.pad.lastIndexOf('/') !== 0 || f.pad.endsWith('.html')) continue;
  if (!ingedeeld.has(f.pad)) fouten.push(`root file ${f.pad} not classified in rootBestanden`);
}

// 2. E-mailadressen op openbare paden. Bestandsnamen als naam@_@astro.abc.css of logo@2x.png
// lijken op een adres en tellen niet mee.
const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,}/g;
const GEEN_ADRES = /\.(css|js|mjs|png|jpe?g|webp|avif|gif|svg|ico|woff2?)$/i;
const ALLOW = new Set([]); // adressen die bewust op een openbare pagina staan, kleine letters
const UITZONDERINGEN = {}; // { '/pad/bestand.html': maximum } per bestand, met reden in een comment
for (const f of alle) {
  if (!/\.(html|js|json|md|txt|xml|csv)$/i.test(f.pad)) continue;
  const tekst = readFileSync(f.bestand, 'utf-8');
  const adressen = new Set(
    (tekst.match(EMAIL) || [])
      .map((a) => a.toLowerCase())
      .filter((a) => !a.endsWith('@claudezakelijk.nl') && !GEEN_ADRES.test(a) && !ALLOW.has(a)),
  );
  if (adressen.size > (UITZONDERINGEN[f.pad] ?? 0)) fouten.push(`file ${f.pad}: ${adressen.size} email address(es) on an ungated path`);
}

// 2b. Naam op openbare paden (besluit M7, S3): de openbare site noemt alleen Camiel. Elk
// tekstbestand, ook JSON-LD, sitemap, robots en manifest. max@claudezakelijk.nl
// telt ook mee, al is een claudezakelijk.nl-adres in check 2 verder vrijgesteld.
const NAAM = /kwaasteniet|maxdekwaasteniet|max@claudezakelijk\.nl/i;
for (const f of alle) {
  if (!/\.(html|js|mjs|css|json|md|txt|xml|csv|svg|webmanifest)$/i.test(f.pad)) continue;
  if (NAAM.test(readFileSync(f.bestand, 'utf-8'))) fouten.push(`file ${f.pad}: names a person who must not appear on the public site (M7)`);
}

// 2c. Proxuma en Dxfferent op openbare paden (besluit M39, T5): de openbare site noemt geen
// van beide bedrijven. Zelfde bestandsfilter als 2b.
const MERKEN = /proxuma|dxfferent/i;
for (const f of alle) {
  if (!/\.(html|js|mjs|css|json|md|txt|xml|csv|svg|webmanifest)$/i.test(f.pad)) continue;
  if (MERKEN.test(readFileSync(f.bestand, 'utf-8'))) fouten.push(`file ${f.pad}: names Proxuma or Dxfferent on the public site (M39)`);
}

// 3. _routes.json: een exclude slaat de Function over, dus ook de noindex-header.
if (existsSync(join(DIST, '_routes.json'))) {
  const routes = JSON.parse(readFileSync(join(DIST, '_routes.json'), 'utf-8'));
  for (const regel of routes.exclude || []) {
    const voorvoegsel = regel.replace(/\*$/, '');
    if (!zakelijk.assets.some((a) => voorvoegsel.startsWith(a))) fouten.push(`_routes.json exclude ${regel} is not on zakelijk.assets`);
  }
}

// 4 en 5. Indexeerbare HTML.
const PLACEHOLDERS = ['Foto volgt', 'class="ph ', '[INPUT', '[MAX]', '(toets)', 'MENS:'];
// Comments buiten <script>, <style>, <pre> en <textarea>; <!--email_off--> mag (Cloudflare).
const COMMENT = /(<(script|style|pre|textarea)\b[\s\S]*?<\/\2\s*>)|<!--(?!\/?email_off-->)[\s\S]*?-->/gi;
for (const f of alle) {
  if (f.soort !== 'INDEXABLE' || !f.pad.endsWith('.html')) continue;
  const html = readFileSync(f.bestand, 'utf-8');
  const route = kanoniek(f.pad);
  const h1 = html.indexOf('<h1');
  if (h1 >= 0) {
    // Open blokken op het moment van de eerste <h1>: de voorouders. Eén daarvan met
    // reveal-target houdt de H1 onzichtbaar tot JavaScript draait.
    const open = [];
    for (const m of html.slice(0, h1).matchAll(/<(\/?)(div|section|header|main|article|aside|figure)\b[^>]*>/g)) {
      if (m[1]) open.pop();
      else open.push(m[0]);
    }
    if (open.some((t) => /class="[^"]*\breveal-target\b/.test(t))) fouten.push(`${route}: H1 inside .reveal-target (LCP, see T-01)`);
  }
  for (const p of PLACEHOLDERS) if (html.includes(p)) fouten.push(`${route}: placeholder ${JSON.stringify(p)} on a business page`);
  let comments = 0;
  html.replace(COMMENT, (m, blok) => { if (!blok) comments++; return m; });
  if (comments) fouten.push(`${route}: ${comments} HTML comment(s) on a business page`);
}

const telling = { INDEXABLE: 0, NOINDEX: 0 };
for (const f of alle) telling[f.soort]++;
const samenvatting = `[check-dist] ${alle.length} files: ${telling.INDEXABLE} indexable, ${telling.NOINDEX} noindex; ${fouten.length} problems`;
if (fouten.length) {
  console.error(`${samenvatting}\n  - ${fouten.join('\n  - ')}`);
  process.exit(1);
}
console.log(samenvatting);
