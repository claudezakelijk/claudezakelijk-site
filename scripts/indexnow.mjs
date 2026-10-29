// IndexNow: meld nieuwe, gewijzigde en verwijderde URL's aan Bing, Yandex e.a.
//
//   node scripts/indexnow.mjs --all [--dry-run]            alle <loc>'s van de live sitemap
//   node scripts/indexnow.mjs --since <sha> [--dry-run]    pagina's die sinds <sha> veranderd zijn
//   node scripts/indexnow.mjs --published-on [YYYY-MM-DD] [--dry-run]
//       entries met status published en precies deze publishDate (standaard vandaag,
//       Europe/Amsterdam) plus hun hub. Voor de dagelijkse geplande deploy: ingeplande
//       artikelen gaan dan live zonder push, dus --since ziet ze niet.
//
// De sleutel is het enige public/<32 hex>.txt. Hij is publiek per ontwerp (indexnow.org).
// --dry-run print de JSON-body en de URL-lijst en verstuurt niets.

import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { leesPublicatie, vandaag } from '../src/lib/publicatie.mjs';

const HOST = 'implementeren.ai';
const ORIGIN = `https://${HOST}`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const MAX_URLS = 10000;

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const alles = args.includes('--all');
const sinceIndex = args.indexOf('--since');
const since = sinceIndex === -1 ? undefined : args[sinceIndex + 1];
const sinceLeeg = sinceIndex !== -1 && (!since || since.startsWith('--'));
const opIndex = args.indexOf('--published-on');
const opWaarde = opIndex === -1 ? undefined : args[opIndex + 1];
const publishedOn = opIndex === -1 ? undefined : opWaarde && !opWaarde.startsWith('--') ? opWaarde : vandaag();
if (publishedOn !== undefined && !/^\d{4}-\d{2}-\d{2}$/.test(publishedOn)) {
  console.error(`--published-on verwacht YYYY-MM-DD, kreeg '${publishedOn}'`);
  process.exit(1);
}
// Lege hubs hangen af van de dag (src/lib/publicatie.mjs). Kijk met --published-on naar de
// site zoals die op die dag is, zodat een hub die die dag opengaat ook gepingd wordt.
if (publishedOn !== undefined && !process.env.BOUWDATUM) process.env.BOUWDATUM = publishedOn;
const { collectieRoutes, isIndexeerbaarPad } = await import('../src/data/indexering.mjs');

function vindSleutel() {
  const kandidaten = readdirSync('public').filter((f) => /^[0-9a-f]{32}\.txt$/.test(f) && f !== 'robots.txt');
  if (kandidaten.length !== 1) {
    console.error(`Verwacht precies één public/<32 hex>.txt, gevonden: ${kandidaten.length}`);
    process.exit(1);
  }
  return kandidaten[0].replace(/\.txt$/, '');
}

async function haalTekst(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} gaf ${res.status}`);
  return res.text();
}

async function urlsUitSitemap() {
  const locs = (xml) => [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
  const index = await haalTekst(`${ORIGIN}/sitemap-index.xml`);
  const urls = [];
  for (const sitemap of locs(index)) urls.push(...locs(await haalTekst(sitemap)));
  return urls;
}

// Hub van een collectie: het voorvoegsel zonder slash, behalve claude-voor- (dat is /verticalen).
function hubVan(prefix) {
  return prefix === '/claude-voor-' ? '/verticalen' : prefix.replace(/\/$/, '');
}

export function routesVoorBestand(bestand) {
  const routes = [];
  const md = bestand.match(/^src\/content\/([^/]+)\/([^/]+)\.md$/);
  if (md) {
    const prefix = collectieRoutes[md[1]];
    if (prefix) routes.push(prefix + md[2], hubVan(prefix));
    return routes;
  }
  if (/^src\/pages\/.+\.astro$/.test(bestand) && !bestand.includes('[')) {
    let route = bestand.replace(/^src\/pages/, '').replace(/\.astro$/, '').replace(/\/index$/, '');
    if (route === '' || route === '/index') route = '/';
    routes.push(route);
  }
  return routes;
}

// Redirect-bronnen uit public/_redirects ("<van> <naar> 301"): een gewijzigde bron pingt zijn doel.
function leesRedirects() {
  const kaart = new Map();
  if (!existsSync('public/_redirects')) return kaart;
  for (const regel of readFileSync('public/_redirects', 'utf-8').split('\n')) {
    const [van, naar] = regel.trim().split(/\s+/);
    if (van?.startsWith('/') && naar?.startsWith('/')) kaart.set(van.replace(/(.)\/$/, '$1'), naar.replace(/(.)\/$/, '$1'));
  }
  return kaart;
}

// Paden uit de gebouwde sitemap (dist/sitemap-*.xml, zonder de index). De build moet dus eerst gelopen hebben.
function sitemapPaden() {
  const bestanden = existsSync('dist') ? readdirSync('dist').filter((f) => /^sitemap-.+\.xml$/.test(f) && f !== 'sitemap-index.xml') : [];
  if (bestanden.length === 0) {
    console.error('Geen dist/sitemap-*.xml gevonden: draai eerst `npm run build`, het script filtert op de gebouwde sitemap.');
    process.exit(1);
  }
  const paden = new Set();
  for (const f of bestanden) {
    for (const m of readFileSync(`dist/${f}`, 'utf-8').matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)) {
      const url = new URL(m[1]);
      // sitemap-claudezakelijk-nl.xml noemt het oude domein voor Search Console: die locs slaan we over.
      if (url.hostname !== 'implementeren.ai') continue;
      paden.add(url.pathname.replace(/(.)\/$/, '$1'));
    }
  }
  return paden;
}

function geenBruikbareBasis(sha) {
  if (/^0+$/.test(sha)) return true;
  try {
    execFileSync('git', ['cat-file', '-e', `${sha}^{commit}`], { stdio: 'ignore' });
    return false;
  } catch {
    return true;
  }
}

function urlsSinds(sha) {
  const uit = execFileSync('git', ['diff', '--name-status', sha, 'HEAD'], { encoding: 'utf-8' });
  const wijzigingen = []; // { bestand, verwijderd }
  for (const regel of uit.split('\n')) {
    if (!regel.trim()) continue;
    const [status, ...paden] = regel.split('\t');
    if (status.startsWith('R')) wijzigingen.push({ bestand: paden[0], verwijderd: true }, { bestand: paden[1], verwijderd: false });
    else wijzigingen.push({ bestand: paden[0], verwijderd: status === 'D' });
  }
  const redirects = leesRedirects();
  const sitemap = sitemapPaden();
  const routes = new Set();
  for (const { bestand, verwijderd } of wijzigingen) {
    for (const route of routesVoorBestand(bestand)) {
      if (redirects.has(route)) {
        // Redirect-bron: pingt het doel (ketens gevolgd), nooit de bron zelf. Het doel moet in de sitemap staan.
        let doel = route;
        for (let i = 0; i < 5 && redirects.has(doel); i++) doel = redirects.get(doel);
        if (sitemap.has(doel)) routes.add(doel);
      } else if (sitemap.has(route) || verwijderd) {
        // Een pagina die van published naar concept ging geeft nu 404 maar staat niet in de sitemap en is niet verwijderd: bewust overgeslagen.
        routes.add(route);
      }
    }
  }
  return [...routes].filter((r) => isIndexeerbaarPad(r)).sort().map((r) => (r === '/' ? `${ORIGIN}/` : ORIGIN + r));
}

// Entries die op deze dag live gaan, plus hun hub. Een redirect-bron pingt zijn doel.
function urlsGepubliceerdOp(dag) {
  const redirects = leesRedirects();
  const routes = new Set();
  for (const collectie of Object.keys(collectieRoutes)) {
    const dir = `src/content/${collectie}`;
    if (!existsSync(dir)) continue;
    for (const bestand of readdirSync(dir)) {
      if (!bestand.endsWith('.md')) continue;
      const { status, publishDate } = leesPublicatie(readFileSync(`${dir}/${bestand}`, 'utf-8'));
      if (status !== 'published' || publishDate !== dag) continue;
      for (const route of routesVoorBestand(`${dir}/${bestand}`)) {
        let doel = route;
        for (let i = 0; i < 5 && redirects.has(doel); i++) doel = redirects.get(doel);
        routes.add(doel);
      }
    }
  }
  return [...routes].filter((r) => isIndexeerbaarPad(r)).sort().map((r) => (r === '/' ? `${ORIGIN}/` : ORIGIN + r));
}

async function main() {
  if (!alles && since === undefined && !sinceLeeg && publishedOn === undefined) {
    console.error('Gebruik: node scripts/indexnow.mjs --all | --since <sha> | --published-on [YYYY-MM-DD] [--dry-run]');
    process.exit(1);
  }
  if (publishedOn !== undefined) {
    const urlList = urlsGepubliceerdOp(publishedOn);
    if (urlList.length === 0) {
      console.log(`nothing published on ${publishedOn}`);
      return;
    }
    return verstuur(urlList);
  }
  if (!alles && (sinceLeeg || since === '')) {
    console.log('no changes to submit');
    return;
  }
  if (!alles && geenBruikbareBasis(since)) {
    console.log(`no usable base commit (${since}), nothing submitted`);
    return;
  }
  const urlList = alles ? await urlsUitSitemap() : urlsSinds(since);
  if (urlList.length === 0) {
    console.log('no changes to submit');
    return;
  }
  return verstuur(urlList);
}

async function verstuur(alleUrls) {
  const urlList = alleUrls.slice(0, MAX_URLS);
  const sleutel = vindSleutel();
  const body = { host: HOST, key: sleutel, keyLocation: `${ORIGIN}/${sleutel}.txt`, urlList };
  if (dryRun) {
    console.log(JSON.stringify(body, null, 2));
    console.log(`\n${urlList.length} URL(s), dry-run, niets verstuurd:`);
    for (const u of urlList) console.log(u);
    return;
  }
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });
  const uitleg = { 200: 'URL submitted successfully', 202: 'key validation pending' }[res.status];
  if (uitleg) {
    console.log(`${res.status} ${uitleg} (${urlList.length} URL's)`);
    return;
  }
  console.error(`${res.status} ${res.statusText}: IndexNow wees de aanvraag af (${urlList.length} URL's)`);
  process.exit(1);
}

main().catch((fout) => {
  console.error(fout.message);
  process.exit(1);
});
