#!/usr/bin/env node
// Genereert het beeldmerk van Implementeren.ai en alles wat ervan afgeleid is.
// Gebruik: node tools/logo/gen-logo.mjs   (vanuit de repo-root; uitvoer daarna committen)
//
// Het merk: een kleine letter "i" in crème op een olijfgroene tegel, met de punt als vierkant
// in fel olijf, dezelfde kleur als ".ai" in het woordmerk op donker. Alles is pad, geen <text>,
// zodat het zonder fonts rendert. Kleuren zijn de v2-tokens uit src/styles/global.css.
// Het woordmerk en de tagline komen als paden uit tekst.json, gemaakt door tekstpaden.py.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import sharp from 'sharp';

const KLEUR = {
  creme: '#F4F1E8', // --color-v2-creme
  inkt: '#23261D', // --color-v2-inkt
  inkt2: '#565A4C', // --color-v2-inkt-2
  olijf: '#3D5220', // --color-v2-olijf
  olijfFel: '#B4C13E', // --color-v2-olijf-fel
};

// Raster van 32. Even maten, zodat het merk op 16px op hele pixels valt.
const PUNT = 'M12 4h8v8h-8z';
const STAM = 'M12 14h8v14h-8z';
const tekens = (schaal = 1) => {
  const t = schaal === 1 ? '' : ` transform="translate(16 16) scale(${schaal}) translate(-16 -16)"`;
  return `<g${t}><path fill="${KLEUR.olijfFel}" d="${PUNT}"/><path fill="${KLEUR.creme}" d="${STAM}"/></g>`;
};
// rx 8 = afgeronde tegel; rx 0 = volle vlakken voor iOS en maskable (het OS rondt zelf af).
const merkSvg = ({ rx = 8, schaal = 1, maat } = {}) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"${maat ? ` width="${maat}" height="${maat}"` : ''}>`
  + `<rect width="32" height="32" rx="${rx}" fill="${KLEUR.olijf}"/>${tekens(schaal)}</svg>\n`;

const tekst = JSON.parse(readFileSync(new URL('./tekst.json', import.meta.url), 'utf8'));
const { woordmerk, tagline, capEm } = tekst;

// Horizontale lockup: tegel van 40, 12 ruimte, woordmerk op 28px met de kapitalen
// verticaal gecentreerd op de tegel.
function lockupDelen({ x = 0, y = 0, tegel = 40, px = 28, kleurNaam = KLEUR.inkt, kleurStaart = KLEUR.olijf }) {
  const s = px / woordmerk.px;
  const basis = y + tegel / 2 + (capEm * px) / 2;
  const tx = x + tegel + tegel * 0.3;
  const breedte = tegel * 1.3 + woordmerk.breedte * s;
  const svg = `<g transform="translate(${x} ${y}) scale(${tegel / 32})"><rect width="32" height="32" rx="8" fill="${KLEUR.olijf}"/>${tekens()}</g>`
    + `<g transform="translate(${tx.toFixed(2)} ${basis.toFixed(2)}) scale(${s})">`
    + `<path fill="${kleurNaam}" d="${woordmerk.merk}"/><path fill="${kleurStaart}" d="${woordmerk.staart}"/></g>`;
  return { svg, breedte };
}

const lockup = lockupDelen({});
const lockupSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${Math.ceil(lockup.breedte) + 2} 40" role="img" aria-label="Implementeren.ai">`
  + `${lockup.svg}</svg>\n`;

// Deelafbeelding, 1200x630 ontwerp op 2x (OG_STANDAARD in src/lib/schema.ts is 2400x1260).
function ogSvg() {
  const m = 96;
  const kop = lockupDelen({ x: m, y: 206, tegel: 112, px: 84 });
  const ts = 36 / tagline.px;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="2400" height="1260">`
    + `<rect width="1200" height="630" fill="${KLEUR.creme}"/>`
    + kop.svg
    + `<g transform="translate(${m} 416) scale(${ts})"><path fill="${KLEUR.inkt2}" d="${tagline.d}"/></g>`
    + `<rect x="0" y="606" width="1200" height="24" fill="${KLEUR.olijf}"/>`
    + `</svg>\n`;
}

const png = (svg, px) => sharp(Buffer.from(svg), { density: 72 * Math.max(1, Math.ceil(px / 32)) }).resize(px, px).png().toBuffer();

mkdirSync('public/brand', { recursive: true });
mkdirSync('src/assets/logo', { recursive: true });

writeFileSync('public/favicon.svg', merkSvg());
writeFileSync('src/assets/logo/logo-mark.svg', merkSvg());
writeFileSync('src/assets/logo/logo.svg', lockupSvg);

writeFileSync('public/apple-touch-icon.png', await png(merkSvg({ rx: 0 }), 180));
for (const px of [96, 192, 512]) writeFileSync(`public/brand/icon-${px}.png`, await png(merkSvg(), px));
// Maskable: volle achtergrond, merk op 80% zodat de "i" ruim binnen de veilige cirkel (80%) valt.
writeFileSync('public/brand/maskable-512.png', await png(merkSvg({ rx: 0, schaal: 0.8 }), 512));

// favicon.ico met PNG-afbeeldingen (16, 32, 48), voor Google en oude browsers.
const maten = [16, 32, 48];
const beelden = await Promise.all(maten.map((px) => png(merkSvg(), px)));
const kopIco = Buffer.alloc(6 + 16 * maten.length);
kopIco.writeUInt16LE(0, 0); kopIco.writeUInt16LE(1, 2); kopIco.writeUInt16LE(maten.length, 4);
let offset = kopIco.length;
maten.forEach((px, i) => {
  const e = 6 + 16 * i;
  kopIco.writeUInt8(px, e); kopIco.writeUInt8(px, e + 1); kopIco.writeUInt16LE(1, e + 4); kopIco.writeUInt16LE(32, e + 6);
  kopIco.writeUInt32LE(beelden[i].length, e + 8); kopIco.writeUInt32LE(offset, e + 12); offset += beelden[i].length;
});
writeFileSync('public/favicon.ico', Buffer.concat([kopIco, ...beelden]));

await sharp(Buffer.from(ogSvg())).png().toFile('public/og-implementeren.png');

console.log('[gen-logo] favicon.svg, favicon.ico, apple-touch-icon.png, brand/*, og-implementeren.png, src/assets/logo/* geschreven');
