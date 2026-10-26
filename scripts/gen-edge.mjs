// Genereert de twee JSON-bestanden die functions/_middleware.js inleest: de indexeringsregels
// uit src/data/indexering.mjs en de statische redirects uit public/_redirects. Draait vóór elke
// build en dev-server, dus de middleware loopt nooit uit de pas met de bron.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const { preLaunch, zakelijk, legeHubs } = await import('../src/data/indexering.mjs');

// Wat hoort bij de zakelijke site. Alles daarbuiten krijgt aan de rand een X-Robots-Tag:
// noindex, ook losse HTML en pdf's in public/ die nooit door BasisLayout gaan. Zelfde bron
// als de sitemap en de robots-metatag.
const idxOut = resolve(here, '../functions/_indexering.json');
writeFileSync(idxOut, JSON.stringify({ preLaunch, ...zakelijk, legeHubs }, null, 2) + '\n');
console.log(`[gen-edge] indexering geschreven naar functions/_indexering.json (preLaunch=${preLaunch})`);

// Statische redirects uit public/_redirects ook naar de middleware.
// Alleen echte redirects: een 200-regel is een rewrite.
const redirects = {};
// Bron en doel zijn elk een pad op deze site: precies één '/' vooraan. Het doel komt letterlijk in
// de Location-header, dus alles wat een browser als andere host kan lezen ('//host', '/\host',
// 'https://host', '@host') breekt de build. Zelfde patroon als PAD_OP_SITE in de middleware.
const PAD_OP_SITE = /^\/(?![\/\\])[^\/@\\\s\x00-\x1f\x7f]*(?:\/[^\\\s\x00-\x1f\x7f]*)?$/;
readFileSync(resolve(here, '../public/_redirects'), 'utf8').split('\n').forEach((regel, i) => {
  const t = regel.trim();
  if (!t || t.startsWith('#')) return;
  const fout = (reden) => { throw new Error(`[gen-edge] _redirects regel ${i + 1}: ${reden}, niet: ${t}`); };
  // Precies drie delen. Cloudflare leest een regel zonder status als 302 en weigert een vierde
  // deel; hier is beide een fout, zodat de middleware en Cloudflare nooit iets anders doen.
  const delen = t.split(/\s+/);
  if (delen.length > 3) fout('precies drie delen verwacht (<van> <naar> <status>)');
  const [van, naar, status] = delen;
  if (!PAD_OP_SITE.test(van)) fout("de bron moet een pad op deze site zijn dat met precies één '/' begint");
  if (!naar) fout('doel ontbreekt');
  if (!PAD_OP_SITE.test(naar)) fout("het doel moet een pad op deze site zijn dat met precies één '/' begint, zonder backslash, spatie, stuurteken of '@' in het eerste deel");
  if (/[*:]/.test(van + naar)) fout('alleen statische regels (geen * en geen :placeholder)');
  if (!status) fout('status ontbreekt (301/302/303/307/308 verplicht)');
  if (!/^(301|302|303|307|308)$/.test(status)) fout('status 301/302/303/307/308 verplicht');
  // Cloudflare houdt bij een dubbele bron de eerste regel aan; een dubbele is altijd een vergissing.
  const bron = van.replace(/\/+$/, '') || '/';
  if (Object.hasOwn(redirects, bron)) fout(`de bron ${bron} staat er al`);
  redirects[bron] = { naar, status: Number(status) };
});
writeFileSync(resolve(here, '../functions/_redirects.json'), JSON.stringify(redirects, null, 2) + '\n');
console.log(`[gen-edge] ${Object.keys(redirects).length} redirect(s) naar functions/_redirects.json`);
