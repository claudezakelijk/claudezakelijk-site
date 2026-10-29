---
name: artikelbeeld
description: Make or redo the header graphic (kopbeeld) above an Implementeren.ai article and the figures inside its text, as hand-authored inline SVGs in huisstijl v2 (crème + olijf). Use when asked for an artikelbeeld, kopbeeld, figuur, sub image, article graphic, header graphic or "graphics for the articles", when rolling graphics out over a collection, or when fixing one. Covers the five picture types (stroom, versus, data, metafoor, stappen), the hard style rules, the v2 colour roles, the figure markers, the headless generator, and the render check that must pass before a graphic counts as done.
---

# Artikelbeeld

Every article in `src/content/<collectie>/<id>.md` can have one header graphic at
`src/assets/diagrams/artikelen/<collectie>/<id>.svg`. `src/components/ArtikelBeeld.astro`
inlines that file under the article title. No file, no graphic: the page still renders.
Figures inside the text are `<id>-1.svg` to `<id>-3.svg` next to it (see "Figuren in de tekst").

**This is the standard for every article graphic** (approved by Max on 29 Oct 2026, as the
graphics render on `/pipeline`): huisstijl v2 crème + olijf (`src/styles/global.css`,
`--color-v2-*`), labels in Inter, numbers and prices in Instrument Sans, verdict words in
Newsreader italic, and the soft red `#A8433B` for risk. There is no orange. Every new or
redone graphic follows it, and the four files in `references/` are its canonical examples.
The reasons below matter more than the pixels, so read them before you draw.

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

## The five picture types

Start from the reference file, copy its `<defs>`, grain and type scale verbatim, and
change the content. Do not redesign the building blocks per article.

| Type | Reference | Use for |
|------|-----------|---------|
| **stroom** | `references/stroom.svg` | compliance, security, integraties, how-it-works: data or work moving through steps, with a boundary |
| **versus** | `references/versus.svg` | vergelijkingen: two overlapping ellipses (tint and white, both neutral), three icon+word strengths per side, the shared thing in the fel-olijf overlap |
| **data** | `references/data.svg` | prijs and anything with real figures: horizontal bars to scale, one highlighted bar |
| **metafoor** | `references/metafoor.svg` | nieuws, opinion, training: one pair of objects plus a big serif verdict word each |
| **stappen** | no reference file yet; copy from `src/assets/diagrams/artikelen/compliance/dpia-stappenplan-1.svg` (numbered row), `compliance/shadow-ai-policy.svg` (table) or `compliance/ai-geletterdheid-1.svg` (timeline) | a procedure, a timeline or a small decision table: numbered circles on one line with at most two labelled branches, or at most three rows of "situation, arrow, verdict chip". Numbers inside the circles may be 28 (they do not count as words) |

## Hard rules (the check enforces 1-5, 8, 9, the arrowhead part of 6 and the number part of 10; for 2 it fails any text of 44 and up that is not in Instrument Sans when it holds a digit, or in Newsreader when it does not)

1. **Canvas** `viewBox="0 0 1200 600"` (figures in the text: 1200 wide and 500, 600 or
   700 high), `role="img"`, a specific Dutch `aria-label` that states the point (not
   "diagram"), `font-family="Inter, system-ui, sans-serif"` on the root.
2. **Text size**: main labels 32-36, verdicts and numbers 44-76, secondary text 26,
   letter-spaced kicker 22. Nothing else below 26.
   **Fonts** (all three are loaded on the site): labels in Inter (the root). Numbers and
   prices in `font-family="'Instrument Sans Variable', Inter, system-ui, sans-serif"
   font-weight="600" letter-spacing="-1"`, like the prices on the site. Verdict words and
   product names used as a title in `font-family="'Newsreader Variable', Newsreader,
   Georgia, serif" font-style="italic" font-weight="500"`, like the italic accents in the
   site's headings. Source Serif 4 belongs to the old style and fails the check.
3. **At most 16 label words** (text of 30 and up, not counting "·"). Aim for about 12.
4. **Margins**: all text at least 24 units inside the edge. Date line at
   `x="1136" y="566" text-anchor="end" font-size="26" fill="#64685A"` (on a figure:
   `y` is the height minus 34).
5. **No wobble.** Never `feDisplacementMap` or any hand-drawn distortion: Max rejected it
   as fake and sloppy. Clean lines only: ink strokes 4 wide, `stroke-linecap="round"`,
   `stroke-linejoin="round"`.
6. **No handwritten fonts, no emoji, no Unicode symbols** (✓ ✗ → ≥). Draw ticks, crosses
   and arrows as paths. "·" and "–" are fine. **Arrowheads are always a `<marker>` with
   `orient="auto"`** on the line's `marker-end`, copied from the reference (recolour the fill
   for an ink, olijf or rood arrow, new prefixed id). Never draw a loose triangle next to a
   line end: it does not follow the curve's direction and comes loose from the line, which
   is invisible at 760 and obvious on the page (advocaten, 23 Oct 2026). The check fails on
   any small three-point path or polygon outside a marker.
7. **Paper grain** is the last element: the `<filter id="<p>g">` from the reference and
   `<rect width="1200" height="600" filter="url(#<p>g)"/>` (on a figure: its own height).
8. **Unique ids**: prefix every id with a short per-file prefix (`veilig-g`, `vs-ec`),
   because the SVG is inlined into the page. The kopbeeld and the figures of one article
   share a page, so each file gets its own prefix (`dpia-`, `dpia1-`); the check fails on
   a clash between them.
9. **Colour roles (huisstijl v2), nothing else.** The check fails on any other hex and
   names the old palette (paper, terracotta, teal, `#6E7263`) explicitly.
   - crème `#F4F1E8` canvas; wit `#FFFFFF` raised (documents, cards); tint `#E9EBDC`
     sunk or secondary fill; lijn `#E1DED2` faint lines inside objects; lijn-donker
     `#CFCDBE` neutral bars and inactive outlines
   - inkt `#23261D` text and strokes; inkt-zacht `#565A4C` secondary text and the kicker;
     muted `#64685A` the date line
   - olijf `#3D5220`: the good outcome, as text, a stroke or a solid block with white or
     crème text on it. At most one olijf element group per graphic
   - fel olijf `#B4C13E`: areas only. The kicker bar, the accent line in a document icon,
     a highlighted bar segment, the shared overlap, small bullets. Never text (the check
     fails on it) and never a thin line on crème. Inkt text on top of it is fine
   - rood `#A8433B`: risk, the "watch out" route, the forbidden thing, as text, a stroke
     or a solid block with white text. rood-tint `#F6E7E4` and rood-lijn `#E4C8C3` for
     risk areas and for a half-strength marker (the "oranje" data zone)
   - The brand side of a comparison is not a risk: Claude gets the same neutral colours
     as the other side. The old terracotta "brand" role does not exist in v2
10. **Facts come from the article.** Every number, plan name and claim must appear in
    `src/content/<collectie>/<id>.md`. The check fails on any number in the graphic that
    is not in the article; names and claims you check yourself. Time-sensitive facts get
    the date line (`stand ...`) with the date the article uses. A metaphor must not claim
    more than the article does.
11. **No other companies' logos.** Product names as text are fine.

## Figuren in de tekst

An article can carry up to three figures inside its body, on top of the kopbeeld:
`src/assets/diagrams/artikelen/<collectie>/<id>-<n>.svg` with n = 1, 2 or 3. Same rules,
same types, same check.

Place each one in the markdown with a marker on its own line, a blank line before and
after, directly after the paragraph or list it illustrates:

```markdown
Een rekenvoorbeeld om de verhoudingen te voelen. ...

<!-- figuur:1 -->

Vergelijk je Claude nog breder ...
```

`src/lib/remark-figuren.mjs` (wired in `astro.config.mjs`, before `stripHtmlComments`)
replaces the marker with the inlined SVG in a `<figure class="v2-figuur">` with a
`<figcaption>`. The caption is the `data-bijschrift` attribute on the `<svg>` when present,
otherwise the `aria-label`. Give a figure a short `data-bijschrift` (one or two sentences,
with the stand date if its facts are time-sensitive) and keep the full description in the
`aria-label`. A marker without a file is removed and the build passes. The markers are
HTML comments, so the style checks in `scripts/quality-gate.py` skip them; its word count
adds about three tokens per marker.

A figure earns its place like a kopbeeld does: it must not repeat the kopbeeld, the
"In het kort" box or a table right next to it. Figures that work in this repo: a worked
example as bars (`nieuws/welk-claude-model-mkb-1`), a procedure with its one branch
(`compliance/dpia-stappenplan-1`), a timeline that corrects a common mistake
(`compliance/ai-geletterdheid-1`), one example record split into the article's categories
(`compliance/ai-beleid-template-1`), the article's own table sorted into two groups
(`verticalen/notarissen-1`).

Astro caches rendered markdown per .md file. If you only change a figure's SVG, touch the
article (or delete `node_modules/.astro`) before a local `npm run dev` or `npm run build`;
CI builds from scratch.

## Generator (headless)

```bash
tools/artikelbeeld/genereer.sh src/content/<collectie>/<id>.md [--sub]
```

Runs `claude -p --model claude-opus-5-5 --permission-mode dontAsk` with its tools limited
to reading, writing this article's SVG paths, running check.py and (with `--sub`) editing
the article. Afterwards the script checks that the article only gained `<!-- figuur:n -->`
lines (anything else is reverted and counts as a failure), runs check.py on every image of
the article, and on a failure gives Claude one retry with the check report. Exit 0 means
the check passes; the PNGs are in `$ARTIKELBEELD_OUT` and still need a human look. One
article per run. For a rollout, loop over articles and review the PNGs before committing.

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
   `<id>-1600.png`. It renders with the site's own font files from `node_modules`, so run
   `npm ci` first.
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
