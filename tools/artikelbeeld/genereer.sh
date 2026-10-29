#!/usr/bin/env bash
# Maak of ververs het kopbeeld van één artikel met headless Claude, volgens
# .claude/skills/artikelbeeld/SKILL.md. Met --sub ook 1 tot 3 figuren in de tekst
# plus de <!-- figuur:n -->-markers in het artikel.
#
#   tools/artikelbeeld/genereer.sh src/content/<collectie>/<id>.md [--sub]
#
# Claude mag alleen lezen, de SVG's van dit artikel schrijven, met --sub het artikel
# bewerken en check.py draaien (--permission-mode dontAsk weigert al het andere).
# Na afloop controleert dit script zelf dat het artikel alleen markers kreeg, draait
# check.py en geeft Claude bij een fout één herkansing.
#
# Omgeving: ARTIKELBEELD_MODEL (standaard claude-opus-5-5), ARTIKELBEELD_OUT (map voor
# de PNG's, standaard een tijdelijke map), ARTIKELBEELD_CLAUDE (standaard claude).
set -euo pipefail

gebruik() { echo "gebruik: $0 src/content/<collectie>/<id>.md [--sub]" >&2; exit 2; }
[[ $# -ge 1 && $# -le 2 ]] || gebruik
ARTIKEL=${1#./}
SUB=0
if [[ $# -eq 2 ]]; then [[ $2 == --sub ]] || gebruik; SUB=1; fi

ROOT=$(cd "$(dirname "$0")/../.." && pwd)
cd "$ROOT"
[[ $ARTIKEL =~ ^src/content/([a-z0-9-]+)/([a-z0-9-]+)\.md$ ]] || gebruik
COLLECTIE=${BASH_REMATCH[1]}
ID=${BASH_REMATCH[2]}
[[ -f $ARTIKEL ]] || { echo "bestaat niet: $ARTIKEL" >&2; exit 2; }

MAP=src/assets/diagrams/artikelen/$COLLECTIE
mkdir -p "$MAP"
MODEL=${ARTIKELBEELD_MODEL:-claude-opus-5-5}
CLAUDE=${ARTIKELBEELD_CLAUDE:-claude}
export ARTIKELBEELD_OUT=${ARTIKELBEELD_OUT:-$(mktemp -d)}
CHECK=.claude/skills/artikelbeeld/check.py
ORIGINEEL=$(mktemp)
cp "$ARTIKEL" "$ORIGINEEL"

TOOLS=(Read Glob Grep "Write($MAP/$ID.svg)" "Edit($MAP/$ID.svg)" "Bash(python3 $CHECK *)")
if (( SUB )); then
  for n in 1 2 3; do TOOLS+=("Write($MAP/$ID-$n.svg)" "Edit($MAP/$ID-$n.svg)"); done
  TOOLS+=("Edit($ARTIKEL)")
fi

OPDRACHT="Lees .claude/skills/artikelbeeld/SKILL.md en volg die volledig, inclusief de referenties.
Artikel: $ARTIKEL (lees het helemaal, ook kortAntwoord in de frontmatter).
Maak of ververs het kopbeeld $MAP/$ID.svg. Werkt een bestaand concept, houd het dan en breng alleen de huisstijl en de feiten op orde."
if (( SUB )); then
  OPDRACHT+="
Maak daarnaast 1 tot 3 figuren voor in de tekst: $MAP/$ID-1.svg, -2.svg, -3.svg (zie 'Figuren in de tekst' in SKILL.md).
Zet per figuur in $ARTIKEL de regel <!-- figuur:<n> --> op een eigen regel, met een lege regel ervoor en erna, direct na de alinea die de figuur illustreert.
Verander verder niets aan het artikel: geen tekst, geen frontmatter."
fi
OPDRACHT+="
Controleer elk beeld met: python3 $CHECK <pad.svg>
De PNG's staan daarna in $ARTIKELBEELD_OUT. Bekijk ze met Read (760, 358 en 1600) en herstel wat krap is of botst.
Schrijf alleen naar de genoemde paden. Elk getal en elke claim in een beeld moet in het artikel staan."

draai() {
  printf '%s' "$1" | "$CLAUDE" -p --model "$MODEL" --permission-mode dontAsk \
    --no-session-persistence --allowedTools "${TOOLS[@]}"
}

alleen_markers() {
  # Het artikel mag alleen <!-- figuur:n -->-regels (en lege regels) bij hebben gekregen.
  diff -q <(cat -s "$ORIGINEEL") <(grep -vxE '<!-- figuur:[1-3] -->' "$ARTIKEL" | cat -s) >/dev/null
}

beelden() {
  local b=("$MAP/$ID.svg")
  for n in 1 2 3; do [[ -f $MAP/$ID-$n.svg ]] && b+=("$MAP/$ID-$n.svg"); done
  printf '%s\n' "${b[@]}"
}

controleer() {
  alleen_markers || { cp "$ORIGINEEL" "$ARTIKEL"; echo "artikel had meer dan markers gewijzigd: teruggezet" >&2; return 1; }
  [[ -f $MAP/$ID.svg ]] || { echo "geen kopbeeld gemaakt: $MAP/$ID.svg" >&2; return 1; }
  local lijst=() r
  while IFS= read -r r; do lijst+=("$r"); done < <(beelden)
  python3 "$CHECK" "${lijst[@]}" > "$ARTIKELBEELD_OUT/rapport.json"
}

draai "$OPDRACHT"
if ! controleer; then
  echo "check faalde, één herkansing" >&2
  draai "$OPDRACHT

Een eerdere poging is gedaan. De check gaf dit rapport, los alle fouten op:
$(cat "$ARTIKELBEELD_OUT/rapport.json" 2>/dev/null || echo 'geen rapport: zie de eisen hierboven')"
  controleer || { cat "$ARTIKELBEELD_OUT/rapport.json" 2>/dev/null; echo "nog steeds fouten" >&2; exit 1; }
fi
echo "klaar: $(beelden | tr '\n' ' ')"
echo "PNG's: $ARTIKELBEELD_OUT"
