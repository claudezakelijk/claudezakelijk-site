#!/usr/bin/env node
/**
 * Dist-linkcheck (stap 1.3 / audit P0.4): scant alle HTML in dist/ op interne
 * links (href/src) en controleert dat elk doel bestaat als gebouwd bestand.
 * Externe links, mailto/tel en pure ankers worden overgeslagen.
 *
 * Gebruik: node scripts/linkcheck.mjs   (na `npm run build`)
 * Exit 0 = 0 dode interne links, exit 1 = minstens één dode link.
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, relative, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// Productie draagt naast de zakelijke site ook privé-deposits. Alleen dode links op
// zakelijke pagina's houden een deploy tegen; de rest wordt gemeld als waarschuwing.
process.chdir(ROOT);
const { isZakelijkPad, isIndexeerbaarPad } = await import('../src/data/indexering.mjs');
const isZakelijkBestand = (relFile) =>
  isZakelijkPad('/' + relFile.replace(/\.html$/, '').replace(/(^|\/)index$/, ''));
const DIST = join(ROOT, 'dist');

if (!existsSync(DIST)) {
  console.error('linkcheck: dist/ bestaat niet — draai eerst `npm run build`.');
  process.exit(1);
}

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const htmlFiles = walk(DIST).filter((f) => f.endsWith('.html'));

/** Bestaat dit interne pad in dist? (build.format 'file': /foo -> foo.html) */
function targetExists(path) {
  const clean = decodeURIComponent(path.replace(/\/+$/, '')) || '/';
  if (clean === '/') return existsSync(join(DIST, 'index.html'));
  const rel = clean.replace(/^\//, '');
  const candidates = [
    join(DIST, rel),
    join(DIST, `${rel}.html`),
    join(DIST, rel, 'index.html'),
  ];
  return candidates.some((c) => {
    try {
      return existsSync(c) && statSync(c).isFile();
    } catch {
      return false;
    }
  });
}

const broken = [];
let checked = 0;
const seenPerFile = new Set();
// Zakelijke pagina's die linken naar een bestaande pagina die niet indexeerbaar is
// (privé, buiten de allowlist of lege hub). Alleen een waarschuwing, geen exit 1.
const naarNoindex = [];
const ASSET_PREFIXEN = ['/_astro/', '/team/', '/logos/', '/brand/', '/icons/'];

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const relFile = relative(DIST, file);
  // href="..." en src="..." (dubbele of enkele quotes)
  for (const match of html.matchAll(/\b(?:href|src)=["']([^"']+)["']/g)) {
    const raw = match[1];
    if (
      /^(https?:)?\/\//.test(raw) ||
      raw.startsWith('mailto:') ||
      raw.startsWith('tel:') ||
      raw.startsWith('#') ||
      raw.startsWith('data:')
    ) continue;
    if (!raw.startsWith('/')) continue; // site gebruikt alleen absolute interne paden
    const path = raw.split('#')[0].split('?')[0];
    if (!path) continue;
    const key = `${relFile} -> ${path}`;
    if (seenPerFile.has(key)) continue;
    seenPerFile.add(key);
    checked += 1;
    if (!targetExists(path)) {
      broken.push(key);
    } else if (isZakelijkBestand(relFile)) {
      const doel = path.replace(/\/+$/, '').replace(/\.html$/, '') || '/';
      const isAsset =
        ASSET_PREFIXEN.some((p) => doel.startsWith(p)) || /\.[a-z0-9]+$/i.test(doel);
      if (!isAsset && !isIndexeerbaarPad(doel)) naarNoindex.push(key);
    }
  }
}

console.log(`linkcheck: ${htmlFiles.length} HTML-bestanden, ${checked} unieke interne links gecontroleerd`);
const zakelijkBroken = broken.filter((b) => isZakelijkBestand(b.split(' -> ')[0]));
const overigBroken = broken.filter((b) => !zakelijkBroken.includes(b));
if (overigBroken.length > 0) {
  console.warn(`\n${overigBroken.length} dode link(s) buiten de zakelijke site (waarschuwing):`);
  for (const b of overigBroken.sort()) console.warn(`  ${b}`);
}
if (naarNoindex.length > 0) {
  console.warn(`\n${naarNoindex.length} link(s) van zakelijke pagina's naar noindex-pagina's (waarschuwing):`);
  for (const b of naarNoindex.sort()) console.warn(`  ${b}`);
}
if (zakelijkBroken.length > 0) {
  console.error(`\n${zakelijkBroken.length} DODE INTERNE LINK(S) OP DE ZAKELIJKE SITE:`);
  for (const b of zakelijkBroken.sort()) console.error(`  ${b}`);
  process.exit(1);
}
console.log('0 dode interne links op de zakelijke site.');
