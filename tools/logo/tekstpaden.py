"""Zet tekst in Instrument Sans om naar SVG-paden (met kerning via HarfBuzz).

Gebruik (vanuit de repo-root, eenmalig; daarna node tools/logo/gen-logo.mjs):
  python3 -m venv /tmp/logo-venv && /tmp/logo-venv/bin/pip install fonttools brotli uharfbuzz
  /tmp/logo-venv/bin/python tools/logo/tekstpaden.py \
    node_modules/@fontsource-variable/instrument-sans/files/instrument-sans-latin-wght-normal.woff2 \
    tools/logo/tekst.json
Schrijft het woordmerk en de tagline als paden (oorsprong op de basislijn, x=0) op 100px,
met breedte en capshoogte. Alleen nodig als de naam of de tagline verandert.
"""
import io
import json
import sys

import uharfbuzz as hb
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

FONT, UIT = sys.argv[1], sys.argv[2]

tt = TTFont(FONT)
tt.flavor = None
buf = io.BytesIO()
tt.save(buf)
data = buf.getvalue()
upem = tt["head"].unitsPerEm
cap = tt["OS/2"].sCapHeight


def regel(tekst, wght, px, tracking_em, start=0):
    blob = hb.Blob(data)
    face = hb.Face(blob)
    font = hb.Font(face)
    font.set_variations({"wght": wght})
    b = hb.Buffer()
    b.add_str(tekst)
    b.guess_segment_properties()
    hb.shape(font, b, {"kern": True, "liga": True})
    s = px / upem
    track = tracking_em * upem
    x = 0.0
    stukken = []
    for i, (info, pos) in enumerate(zip(b.glyph_infos, b.glyph_positions)):
        pen = SVGPathPen(None, ntos=lambda v: f"{v:.2f}".rstrip("0").rstrip("."))
        tp = TransformPen(pen, (s, 0, 0, -s, (x + pos.x_offset) * s, -pos.y_offset * s))
        font.draw_glyph_with_pen(info.codepoint, tp)
        stukken.append({"cluster": info.cluster, "d": pen.getCommands()})
        x += pos.x_advance + track
    breedte = (x - track) * s
    return stukken, breedte


def splits(stukken, vanaf):
    """Paden voor tekens vóór en vanaf clusterindex `vanaf`."""
    voor = " ".join(p["d"] for p in stukken if p["cluster"] < vanaf and p["d"])
    na = " ".join(p["d"] for p in stukken if p["cluster"] >= vanaf and p["d"])
    return voor, na


uit = {"capEm": cap / upem}
# Woordmerk zoals in de kop: 700, letter-spacing -0.02em. Op 100px, schaal in SVG.
naam = "Implementeren.ai"
stukken, breedte = regel(naam, 700, 100, -0.02)
merk, staart = splits(stukken, naam.index("."))
uit["woordmerk"] = {"px": 100, "merk": merk, "staart": staart, "breedte": round(breedte, 2)}
# Tagline (site.tagline), 500.
tag = "Onafhankelijke Claude-implementatie voor het MKB"
stukken, breedte = regel(tag, 500, 100, -0.01)
uit["tagline"] = {"px": 100, "d": " ".join(p["d"] for p in stukken if p["d"]), "breedte": round(breedte, 2)}

with open(UIT, "w") as f:
    json.dump(uit, f)
print("cap", cap / upem, "woordmerk", uit["woordmerk"]["breedte"], "tagline", uit["tagline"]["breedte"])
