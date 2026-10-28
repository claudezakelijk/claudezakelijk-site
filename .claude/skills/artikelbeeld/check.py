#!/usr/bin/env python3
"""Controleer een artikelbeeld: meet tekst in headless Chrome en maak screenshots.

Gebruik: python3 check.py <pad/naar/beeld.svg> [meer.svg ...]

Per SVG:
  - JSON-rapport: viewBox, woorden, te kleine tekst, tekst buiten de marge,
    tekst die andere tekst overlapt, verboden filters, losse pijlpunten.
  - <naam>-760.png (desktop-kolom), <naam>-358.png (iPhone-kolom) en
    <naam>-1600.png (zoom voor pijlpunten en lijnaansluitingen) in de map uit
    $ARTIKELBEELD_OUT, anders /tmp/artikelbeeld/.
Exitcode 1 als een harde regel faalt. Bekijk de PNG's daarna altijd zelf.
"""
import json, os, re, subprocess, sys, tempfile, pathlib

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
FONTS = ("https://fonts.googleapis.com/css2?family=Inter:wght@400;600"
         "&family=Source+Serif+4:wght@700&display=swap")
MIN_FONT = 26      # in viewBox-eenheden (1200 breed); labels horen op 32+
MIN_KICKER = 22    # alleen gespatieerde kapitalen (letter-spacing) mogen kleiner
LABEL = 30         # tekst vanaf deze maat telt mee als woord
MARGE = 24         # tekst blijft zoveel binnen de rand
MAX_WOORDEN = 16   # alleen labels (>= LABEL), zonder kicker, voetregel en "·"
BREEDTES = (760, 358, 1600)  # 1600 is de zoom-render, niet een echte kolom

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


def pagina(svg, breedte, meten):
    return (f'<!doctype html><html><head><meta charset="utf-8">'
            f'<link href="{FONTS}" rel="stylesheet"><style>'
            f'body{{margin:0;background:#FAF7F2;padding:16px}}'
            f'figure{{margin:0;width:{breedte}px;border:1px solid #E6DFD2;'
            f'border-radius:20px;overflow:hidden}}svg{{display:block;width:100%;height:auto}}'
            f'</style></head><body><figure>{svg}</figure><pre id="uit"></pre>'
            f'{MEET if meten else ""}</body></html>')


def chrome(*args):
    return subprocess.run([CHROME, "--headless=new", "--hide-scrollbars",
                           "--virtual-time-budget=6000", *args],
                          capture_output=True, text=True, timeout=90).stdout


def controleer(pad, uitmap):
    svg = pathlib.Path(pad).read_text()
    naam = pathlib.Path(pad).stem
    fouten = []
    if "feDisplacementMap" in svg:
        fouten.append("feDisplacementMap gevonden: geen wobble-lijnen")
    if 'role="img"' not in svg or "aria-label=" not in svg:
        fouten.append('role="img" of aria-label ontbreekt')
    # Een pijlpunt hoort een <marker orient="auto"> te zijn. Een los getekende
    # driehoek volgt de richting van de lijn niet en komt er los van te staan.
    los = re.sub(r"<marker\b.*?</marker>", "", svg, flags=re.S)
    kandidaten = re.findall(r'<path[^>]*\bd="(M[^"]*?[Zz])\s*"', los)
    kandidaten += re.findall(r'<polygon[^>]*\bpoints="([^"]*)"', los)
    driehoeken = []
    for d in kandidaten:
        punten = [(float(x), float(y)) for x, y in
                  re.findall(r"(-?\d+(?:\.\d+)?)[\s,]+(-?\d+(?:\.\d+)?)", d)]
        xs, ys = [x for x, _ in punten], [y for _, y in punten]
        # Een grote driehoek is een vorm (dak, berg), geen pijlpunt.
        if len(punten) == 3 and max(max(xs) - min(xs), max(ys) - min(ys)) <= 60:
            driehoeken.append(d)
    for d in driehoeken:
        fouten.append(f"losse pijlpunt ({d}): gebruik marker-end met een <marker orient=\"auto\">")

    with tempfile.TemporaryDirectory() as tmp:
        meet = pathlib.Path(tmp, "meet.html")
        meet.write_text(pagina(svg, 760, True))
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
            html.write_text(pagina(svg, b, False))
            hoogte = int(b / 2) + 80
            chrome(f"--window-size={b + 32},{hoogte}",
                   f"--screenshot={uitmap / f'{naam}-{b}.png'}", html.as_uri())

    vw, vh = data["viewBox"]
    if [vw, vh] != [1200, 600]:
        fouten.append(f"viewBox is {vw}x{vh}, moet 1200x600 zijn")
    woorden = sum(len([w for w in t["tekst"].split() if w != "·"])
                  for t in data["teksten"] if t["maat"] >= LABEL)
    if woorden > MAX_WOORDEN:
        fouten.append(f"{woorden} woorden, maximaal {MAX_WOORDEN}")
    for t in data["teksten"]:
        if t["maat"] < (MIN_KICKER if t["spatie"] > 0 else MIN_FONT) - 0.5:
            fouten.append(f"te klein ({t['maat']:.0f}): {t['tekst']!r}")
        if t["x1"] < MARGE or t["y1"] < MARGE or t["x2"] > vw - MARGE or t["y2"] > vh - MARGE:
            fouten.append(f"buiten de marge: {t['tekst']!r}")
    for a, c in data["overlap"]:
        fouten.append(f"tekst overlapt: {a!r} en {c!r}")

    return {"bestand": str(pad), "woorden": woorden,
            "kleinste_tekst": round(min((t["maat"] for t in data["teksten"]), default=0)),
            "screenshots": [str(uitmap / f"{naam}-{b}.png") for b in BREEDTES],
            "fouten": fouten}


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    uitmap = pathlib.Path(os.environ.get("ARTIKELBEELD_OUT", "/tmp/artikelbeeld"))
    uitmap.mkdir(parents=True, exist_ok=True)
    rapporten = [controleer(p, uitmap) for p in sys.argv[1:]]
    print(json.dumps(rapporten, indent=2, ensure_ascii=False))
    sys.exit(1 if any(r["fouten"] for r in rapporten) else 0)


if __name__ == "__main__":
    main()
