// Figuren in de tekst van een artikel. Conventie in content-bestanden: een losse regel
// <!-- figuur:<n> --> (n = 1..3) na de alinea die de figuur illustreert. De plugin zet daar
// src/assets/diagrams/artikelen/<collectie>/<id>-<n>.svg neer, inline, in een <figure> met
// <figcaption>. Bijschrift: data-bijschrift op de <svg>, anders de aria-label.
// Geen bestand: de marker verdwijnt (via stripHtmlComments) en de build gaat gewoon door.
// Moet vóór stripHtmlComments staan, anders is de marker al weg.
import { existsSync, readFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const MARKER = /^<!--\s*figuur:([1-3])\s*-->$/;
// Attribuutwaarden in de SVG zijn al XML: bestaande entiteiten blijven staan.
const escape = (t) => t.replace(/&(?!#?\w+;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const attr = (svg, naam) => svg.match(new RegExp(`<svg\\b[^>]*\\s${naam}="([^"]*)"`))?.[1];

export default function remarkFiguren() {
  return (tree, file) => {
    const pad = file.path;
    const i = pad ? pad.lastIndexOf(`${sep}src${sep}content${sep}`) : -1;
    if (i < 0) return;
    const root = pad.slice(0, i);
    const [collectie, ...rest] = relative(join(root, 'src', 'content'), pad).split(sep);
    const id = rest.join('/').replace(/\.md$/, '');
    const vervang = (node) => {
      if (!node.children) return;
      node.children.forEach((kind) => {
        const m = kind.type === 'html' && kind.value.trim().match(MARKER);
        if (!m) return vervang(kind);
        const bestand = join(root, 'src', 'assets', 'diagrams', 'artikelen', collectie, `${id}-${m[1]}.svg`);
        if (!existsSync(bestand)) return;
        const svg = readFileSync(bestand, 'utf-8').trim();
        const bijschrift = attr(svg, 'data-bijschrift') ?? attr(svg, 'aria-label') ?? '';
        kind.value =
          `<figure class="v2-figuur"><div>${svg}</div>` +
          (bijschrift ? `<figcaption>${escape(bijschrift)}</figcaption>` : '') +
          `</figure>`;
      });
    };
    vervang(tree);
  };
}
