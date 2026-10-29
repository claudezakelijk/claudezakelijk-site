#!/usr/bin/env python3
"""Controleer een artikelbeeld: meet tekst in headless Chrome en maak screenshots.

Gebruik: python3 check.py <pad/naar/beeld.svg> [meer.svg ...]

Werkt voor kopbeelden (<id>.svg, 1200x600) en figuren in de tekst
(<id>-<n>.svg, n = 1..3, 1200 breed en 500, 600 of 700 hoog).

Per SVG:
  - JSON-rapport: viewBox, woorden, te kleine tekst, tekst buiten de marge,
    tekst die andere tekst overlapt, verboden filters, losse pijlpunten,
    kleuren buiten het v2-palet, oude lettertypen, fel olijf als tekst,
    dubbele id's met de andere beelden van hetzelfde artikel en getallen die
    niet in het artikel staan.
  - <naam>-760.png (desktop-kolom), <naam>-358.png (iPhone-kolom) en
    <naam>-1600.png (zoom voor pijlpunten en lijnaansluitingen) in de map uit
    $ARTIKELBEELD_OUT, anders /tmp/artikelbeeld/.
Exitcode 1 als een harde regel faalt. Bekijk de PNG's daarna altijd zelf.
"""
import base64, json, os, re, subprocess, sys, tempfile, pathlib

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
MIN_FONT = 26      # in viewBox-eenheden (1200 breed); labels horen op 32+
MIN_KICKER = 22    # alleen gespatieerde kapitalen (letter-spacing) mogen kleiner
LABEL = 30         # tekst vanaf deze maat telt mee als woord
GROOT = 44         # oordeelwoorden en getallen: Instrument Sans (cijfers) of Newsreader (woorden)
MARGE = 24         # tekst blijft zoveel binnen de rand
MAX_WOORDEN = 16   # alleen labels (>= LABEL), zonder kicker, voetregel en "·"
BREEDTES = (760, 358, 1600)  # 1600 is de zoom-render, niet een echte kolom
SUB_HOOGTES = (500, 600, 700)  # toegestane hoogtes voor figuren in de tekst

# Huisstijl v2 (src/styles/global.css, --color-v2-*). Elke andere hex faalt.
PALET = {
    "#F4F1E8": "crème (canvas)",
    "#FFFFFF": "wit (opgehoogd vlak)",
    "#E9EBDC": "tint (verzonken vlak)",
    "#E1DED2": "lijn (vage lijnen in objecten)",
    "#CFCDBE": "lijn-donker (neutrale balk, inactieve rand)",
    "#23261D": "inkt",
    "#565A4C": "inkt-zacht",
    "#64685A": "muted (datumregel)",
    "#3D5220": "olijf (goede uitkomst)",
    "#B4C13E": "fel olijf (alleen vlakken)",
    "#A8433B": "rood (risico)",
    "#F6E7E4": "rood-tint (risicovlak)",
    "#E4C8C3": "rood-lijn (risicorand)",
}
# Het oude palet (papier + terracotta + teal, tot 27 okt 2026) en de tussenkleur
# uit de eerste v2-omkleuring. Krijgen een eigen foutmelding.
OUD = {
    "#FAF7F2", "#FFFDF8", "#F2ECE0", "#D9CBB6", "#E6DFD2", "#2A2725", "#58524C",
    "#8A8079", "#CC785C", "#A35A41", "#0F766E", "#115E58", "#6E7263",
}
FEL = "#B4C13E"
OUDE_FONTS = ("Source Serif",)

ROOT = pathlib.Path(__file__).resolve().parents[3]


def lettertypen():
    """@font-face voor de drie sitefonts, uit node_modules (zelfde bestanden als de site)."""
    bronnen = [
        ("Inter", 400, "normal", "@fontsource/inter/files/inter-latin-400-normal.woff2"),
        ("Inter", 600, "normal", "@fontsource/inter/files/inter-latin-600-normal.woff2"),
        ("Instrument Sans Variable", "400 700", "normal",
         "@fontsource-variable/instrument-sans/files/instrument-sans-latin-wght-normal.woff2"),
        ("Newsreader Variable", "200 800", "normal",
         "@fontsource-variable/newsreader/files/newsreader-latin-wght-normal.woff2"),
        ("Newsreader Variable", "200 800", "italic",
         "@fontsource-variable/newsreader/files/newsreader-latin-wght-italic.woff2"),
    ]
    regels = []
    for naam, gewicht, stijl, rel in bronnen:
        for basis in (ROOT, *ROOT.parents):
            pad = basis / "node_modules" / rel
            if pad.exists():
                data = base64.b64encode(pad.read_bytes()).decode()
                regels.append(f"@font-face{{font-family:'{naam}';font-weight:{gewicht};"
                              f"font-style:{stijl};src:url(data:font/woff2;base64,{data}) format('woff2')}}")
                break
        else:
            sys.exit(f"lettertype niet gevonden: {rel} (draai npm ci)")
    return "".join(regels)


MEET = """
<script>
document.fonts.ready.then(() => {
  const svg = document.querySelector('svg');
  const vb = svg.viewBox.baseVal, r = svg.getBoundingClientRect();
  const k = vb.width / r.width;
  const teksten = [...svg.querySelectorAll('text')].map(t => {
    const b = t.getBoundingClientRect();
    return {tekst: t.textContent.trim(),
            maat: parseFloat(getComputedStyle(t).fontSize),
            spatie: parseFloat(getComputedStyle(t).letterSpacing) || 0,
            vulling: getComputedStyle(t).fill,
            familie: getComputedStyle(t).fontFamily,
            x1: (b.left - r.left) * k, y1: (b.top - r.top) * k,
            x2: (b.right - r.left) * k, y2: (b.bottom - r.top) * k};
  });
  const overlap = [];
  for (let i = 0; i < teksten.length; i++) for (let j = i + 1; j < teksten.length; j++) {
    const a = teksten[i], c = teksten[j];
    const w = Math.min(a.x2, c.x2) - Math.max(a.x1, c.x1);
    const h = Math.min(a.y2, c.y2) - Math.max(a.y1, c.y1);
    if (w > 2 && h > 2) overlap.push([a.tekst, c.tekst]);
  }
  document.getElementById('uit').textContent = JSON.stringify({
    viewBox: [vb.width, vb.height], teksten, overlap});
});
</script>
"""


def pagina(svg, breedte, meten, fonts):
    return (f'<!doctype html><html><head><meta charset="utf-8"><style>{fonts}'
            f'body{{margin:0;background:#F4F1E8;padding:16px}}'
            f'figure{{margin:0;width:{breedte}px;border:1px solid #E1DED2;'
            f'border-radius:24px;overflow:hidden;background:#FFFFFF}}svg{{display:block;width:100%;height:auto}}'
            f'</style></head><body><figure>{svg}</figure><pre id="uit"></pre>'
            f'{MEET if meten else ""}</body></html>')


def chrome(*args):
    return subprocess.run([CHROME, "--headless=new", "--hide-scrollbars",
                           "--virtual-time-budget=6000", *args],
                          capture_output=True, text=True, timeout=90).stdout


def is_sub(pad):
    return re.search(r"-[1-3]$", pathlib.Path(pad).stem) is not None


def artikel_van(pad):
    """src/assets/diagrams/artikelen/<collectie>/<id>[-n].svg -> src/content/<collectie>/<id>.md"""
    p = pathlib.Path(pad).resolve()
    if p.parent.parent.name != "artikelen":
        return None
    stam = re.sub(r"-[1-3]$", "", p.stem)
    md = p.parents[4] / "content" / p.parent.name / f"{stam}.md"
    return md if md.exists() else None


def kleuren(svg):
    fouten = []
    gevonden = {h.upper() if len(h) == 7 else "#" + "".join(c * 2 for c in h[1:]).upper()
                for h in re.findall(r"(?<!\()#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})(?![\w-])", svg)}
    for h in sorted(gevonden):
        if h in OUD:
            fouten.append(f"oude kleur {h}: gebruik het v2-palet (zie SKILL.md, kleurrollen)")
        elif h not in PALET:
            fouten.append(f"kleur {h} staat niet in het v2-palet")
    if re.search(r"\b(?:fill|stroke|stop-color)=\"(?:rgb|hsl)", svg):
        fouten.append("rgb()/hsl() gebruikt: alleen hex uit het v2-palet")
    for naam in OUDE_FONTS:
        if naam in svg:
            fouten.append(f"lettertype {naam!r} hoort bij de oude stijl: cijfers in Instrument Sans, oordeelwoorden in Newsreader")
    return fouten


def ids_botsen(pad, svg):
    p = pathlib.Path(pad)
    stam = re.sub(r"-[1-3]$", "", p.stem)
    eigen = set(re.findall(r'\bid="([^"]+)"', svg))
    fouten = []
    for ander in sorted(p.parent.glob(f"{stam}*.svg")):
        if ander.resolve() == p.resolve() or not re.fullmatch(rf"{re.escape(stam)}(-[1-3])?", ander.stem):
            continue
        dubbel = eigen & set(re.findall(r'\bid="([^"]+)"', ander.read_text()))
        if dubbel:
            fouten.append(f"id's ook in {ander.name}: {sorted(dubbel)} (zelfde pagina, kies een ander prefix)")
    return fouten


def getallen(teksten, md):
    """Elk getal in een label moet ergens in het artikel staan (regel 10)."""
    bron = md.read_text()
    bron_cijfers = re.sub(r"(?<=\d)[.\s](?=\d{3}\b)", "", bron)
    ontbreekt = []
    for t in teksten:
        for g in re.findall(r"\d+(?:[.,]\d+)?", t["tekst"]):
            kaal = g.replace(".", "").replace(",", ".") if re.fullmatch(r"\d{1,3}\.\d{3}", g) else g
            varianten = {g, kaal, g.replace(",", "."), g.replace(".", ",")}
            if not any(v in bron or v in bron_cijfers for v in varianten):
                ontbreekt.append(f"getal {g!r} in {t['tekst']!r} staat niet in {md.name}")
    return ontbreekt


def controleer(pad, uitmap, fonts):
    svg = pathlib.Path(pad).read_text()
    naam = pathlib.Path(pad).stem
    fouten = []
    if "feDisplacementMap" in svg:
        fouten.append("feDisplacementMap gevonden: geen wobble-lijnen")
    if 'role="img"' not in svg or "aria-label=" not in svg:
        fouten.append('role="img" of aria-label ontbreekt')
    fouten += kleuren(svg)
    fouten += ids_botsen(pad, svg)
    # Een pijlpunt hoort een <marker orient="auto"> te zijn. Een los getekende
    # driehoek volgt de richting van de lijn niet en komt er los van te staan.
    los = re.sub(r"<marker\b.*?</marker>", "", svg, flags=re.S)
    kandidaten = re.findall(r'<path[^>]*\bd="(M[^"]*?[Zz])\s*"', los)
    kandidaten += re.findall(r'<polygon[^>]*\bpoints="([^"]*)"', los)
    for d in kandidaten:
        punten = [(float(x), float(y)) for x, y in
                  re.findall(r"(-?\d+(?:\.\d+)?)[\s,]+(-?\d+(?:\.\d+)?)", d)]
        xs, ys = [x for x, _ in punten], [y for _, y in punten]
        # Een grote driehoek is een vorm (dak, berg), geen pijlpunt.
        if len(punten) == 3 and max(max(xs) - min(xs), max(ys) - min(ys)) <= 60:
            fouten.append(f"losse pijlpunt ({d}): gebruik marker-end met een <marker orient=\"auto\">")

    vb = re.search(r'viewBox="0 0 (\d+) (\d+)"', svg)
    verhouding = int(vb.group(2)) / int(vb.group(1)) if vb else 0.5
    with tempfile.TemporaryDirectory() as tmp:
        meet = pathlib.Path(tmp, "meet.html")
        meet.write_text(pagina(svg, 760, True, fonts))
        dom = chrome("--dump-dom", meet.as_uri())
        m = re.search(r'<pre id="uit">(.*?)</pre>', dom, re.S)
        if not m or not m.group(1).strip():
            fouten.append("meting mislukt (geen uitvoer van Chrome)")
            data = {"viewBox": [0, 0], "teksten": [], "overlap": []}
        else:
            data = json.loads(m.group(1).replace("&amp;", "&").replace("&lt;", "<")
                              .replace("&gt;", ">").replace("&quot;", '"'))
        for b in BREEDTES:
            html = pathlib.Path(tmp, f"{b}.html")
            html.write_text(pagina(svg, b, False, fonts))
            hoogte = int(b * verhouding) + 40
            chrome(f"--window-size={b + 32},{hoogte}",
                   f"--screenshot={uitmap / f'{naam}-{b}.png'}", html.as_uri())

    vw, vh = data["viewBox"]
    if is_sub(pad):
        if vw != 1200 or vh not in SUB_HOOGTES:
            fouten.append(f"viewBox is {vw}x{vh}, een figuur is 1200 breed en {'/'.join(map(str, SUB_HOOGTES))} hoog")
    elif [vw, vh] != [1200, 600]:
        fouten.append(f"viewBox is {vw}x{vh}, een kopbeeld is 1200x600")
    woorden = sum(len([w for w in t["tekst"].split() if w != "·"])
                  for t in data["teksten"] if t["maat"] >= LABEL)
    if woorden > MAX_WOORDEN:
        fouten.append(f"{woorden} woorden, maximaal {MAX_WOORDEN}")
    for t in data["teksten"]:
        if t["maat"] < (MIN_KICKER if t["spatie"] > 0 else MIN_FONT) - 0.5:
            fouten.append(f"te klein ({t['maat']:.0f}): {t['tekst']!r}")
        if t["x1"] < MARGE or t["y1"] < MARGE or t["x2"] > vw - MARGE or t["y2"] > vh - MARGE:
            fouten.append(f"buiten de marge: {t['tekst']!r}")
        if t.get("vulling", "").replace(" ", "") == "rgb(180,193,62)":
            fouten.append(f"fel olijf als tekstkleur: {t['tekst']!r} (alleen vlakken)")
        if t["maat"] >= GROOT - 0.5:
            nodig = "Instrument Sans" if re.search(r"\d", t["tekst"]) else "Newsreader"
            if nodig not in t.get("familie", ""):
                fouten.append(f"{t['tekst']!r} op {t['maat']:.0f} hoort in {nodig} (cijfers in Instrument Sans, oordeelwoorden in Newsreader italic)")
    for a, c in data["overlap"]:
        fouten.append(f"tekst overlapt: {a!r} en {c!r}")
    md = artikel_van(pad)
    if md:
        fouten += getallen(data["teksten"], md)

    return {"bestand": str(pad), "woorden": woorden,
            "kleinste_tekst": round(min((t["maat"] for t in data["teksten"]), default=0)),
            "artikel": str(md) if md else None,
            "screenshots": [str(uitmap / f"{naam}-{b}.png") for b in BREEDTES],
            "fouten": fouten}


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    uitmap = pathlib.Path(os.environ.get("ARTIKELBEELD_OUT", "/tmp/artikelbeeld"))
    uitmap.mkdir(parents=True, exist_ok=True)
    fonts = lettertypen()
    rapporten = [controleer(p, uitmap, fonts) for p in sys.argv[1:]]
    print(json.dumps(rapporten, indent=2, ensure_ascii=False))
    sys.exit(1 if any(r["fouten"] for r in rapporten) else 0)


if __name__ == "__main__":
    main()
