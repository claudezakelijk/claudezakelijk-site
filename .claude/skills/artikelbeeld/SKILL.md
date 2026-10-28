---
name: artikelbeeld
description: Make or redo the header graphic (kopbeeld) above an Implementeren.ai article, as a hand-authored inline SVG in the house style. Use when asked for an artikelbeeld, kopbeeld, article graphic, header graphic or "graphics for the articles", when rolling graphics out over a collection, or when fixing one. Covers the four picture types (stroom, versus, data, metafoor), the hard style rules, and the render check that must pass before a graphic counts as done.
---

# Artikelbeeld

Every article in `src/content/<collectie>/<id>.md` can have one header graphic at
`src/assets/diagrams/artikelen/<collectie>/<id>.svg`. `src/components/ArtikelBeeld.astro`
inlines that file under the article title. No file, no graphic: the page still renders.

The style was chosen by Max on 23 Oct 2026 from four mockups. The reasons matter more
than the pixels, so read them before you draw.

## What a graphic is for

The old pilots were text in boxes. They repeated the "In het kort" box directly below them,
and at phone width (358px) their 11-13px labels shrank to about 5px. A graphic earns its
place only if it shows something the text cannot:

- **a mechanism**: where data goes, what happens in which order, where the boundary is;
- **a contrast**: two things side by side, and the one thing they share;
- **real numbers**: the size difference you only feel when you see the bars;
- **one metaphor**: when there is no mechanism or data, one object that carries the verdict.

Before drawing, write the graphic's idea in one Dutch sentence. If that sentence is the
same as the article's "In het kort", pick a different angle.

## The four picture types

Start from the reference file, copy its `<defs>`, grain and type scale verbatim, and
change the content. Do not redesign the building blocks per article.

| Type | Reference | Use for |
|------|-----------|---------|
| **stroom** | `references/stroom.svg` | compliance, security, integraties, how-it-works: data or work moving through steps, with a boundary |
| **versus** | `references/versus.svg` | vergelijkingen: two overlapping ellipses, three icon+word strengths per side, the shared thing in the teal overlap |
| **data** | `references/data.svg` | prijs and anything with real figures: horizontal bars to scale, one highlighted bar |
| **metafoor** | `references/metafoor.svg` | nieuws, opinion, training: one pair of objects plus a big serif verdict word each |

## Hard rules (the check enforces 1-5 and the arrowhead part of 6)

1. **Canvas** `viewBox="0 0 1200 600"`, `role="img"`, a specific Dutch `aria-label`
   that states the point (not "diagram"), `font-family="Inter, system-ui, sans-serif"` on the root.
2. **Text size**: main labels 32-36, serif verdicts/numbers 44-76, secondary text 26,
   letter-spaced kicker 22. Nothing else below 26.
3. **At most 16 label words** (text of 30 and up, not counting "·"). Aim for about 12.
4. **Margins**: all text at least 24 units inside the edge. Date line at
   `x="1136" y="566" text-anchor="end" font-size="26" fill="#8A8079"`.
5. **No wobble.** Never `feDisplacementMap` or any hand-drawn distortion: Max rejected it
   as fake and sloppy. Clean lines only: ink strokes 4 wide, `stroke-linecap="round"`,
   `stroke-linejoin="round"`.
6. **No handwritten fonts, no emoji, no Unicode symbols** (✓ ✗ → ≥). Draw ticks, crosses
   and arrows as paths. "·" and "–" are fine. **Arrowheads are always a `<marker>` with
   `orient="auto"`** on the line's `marker-end`, copied from the reference (recolour the fill
   for an ink arrow, new prefixed id). Never draw a loose triangle next to a line end: it
   does not follow the curve's direction and comes loose from the line, which is invisible
   at 760 and obvious on the page (advocaten, 23 Oct 2026). The check fails on any small
   three-point path or polygon outside a marker.
7. **Paper grain** is the last element: the `<filter id="<p>g">` from the reference and
   `<rect width="1200" height="600" filter="url(#<p>g)"/>`.
8. **Unique ids**: prefix every id with a short per-file prefix (`veilig-g`, `vs-ec`),
   because the SVG is inlined into the page.
9. **Colour roles, nothing else:**
   - paper `#FAF7F2`, raised paper `#FFFDF8`, sunk `#F2ECE0`, neutral bar `#D9CBB6`
   - ink `#2A2725`, soft ink `#58524C`, faint `#8A8079`
   - terracotta `#CC785C` / deep `#A35A41`: risk, the "watch out" route, the brand side
   - teal `#0f766e`: the good outcome only, at most one teal element group per graphic
10. **Facts come from the article.** Every number, plan name and claim must appear in
    `src/content/<collectie>/<id>.md`. Time-sensitive facts get the date line (`stand ...`)
    with the date the article uses. A metaphor must not claim more than the article does.
11. **No other companies' logos.** Product names as text are fine.

## Workflow

1. Read the whole article, including `kortAntwoord` in the frontmatter (that is the
   "In het kort" box the graphic must not repeat).
2. Pick the type, write the one-sentence idea, list the at most 12 words you will use.
3. Copy the reference to the target path and rewrite the content.
4. Run the check:
   ```bash
   ARTIKELBEELD_OUT=<scratch dir> python3 .claude/skills/artikelbeeld/check.py src/assets/diagrams/artikelen/<collectie>/<id>.svg
   ```
   It exits 1 on any rule break and writes `<id>-760.png`, `<id>-358.png` and
   `<id>-1600.png`.
5. **Look at all three PNGs with the Read tool.** The check measures text; it cannot see a
   line running through a label, an arrow pointing at nothing, or a lopsided composition.
   Use 760 and 358 for composition and legibility. Use **1600 for detail**: every arrowhead
   sits on its line end and points along the curve, lines meet the box edges they connect
   to, no label touches a stroke. Crop it (`sips -c <h> <w> --cropOffset <y> <x>`) if the
   whole image is too small to judge. Fix and rerun until the check passes and all three
   look right.
6. Check it on the real page: the dev server runs on `http://localhost:4330`. Screenshot
   the article URL with headless Chrome
   (`"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars --window-size=1280,1300 --screenshot=<file> <url>`)
   and look at it.

## Rolling out

One subagent per article or per small batch, each writing only its own SVG files. Give
each agent this skill's path and the article ids. The orchestrator reviews every PNG,
including the 1600 zoom, and commits.
