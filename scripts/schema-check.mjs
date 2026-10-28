#!/usr/bin/env node
/**
 * schema-check (Spec B): valideert JSON-LD en deel-meta van alle indexeerbare pagina's in dist/.
 * Gebruik: node scripts/schema-check.mjs [--pad /prijs/kosten-zakelijk] [--dump]
 * Exit 0 = 0 fouten. Exit 1 = minstens één fout. Waarschuwingen blokkeren niet.
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, relative, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
process.chdir(ROOT);
const { isZakelijkPad } = await import('../src/data/indexering.mjs');
const SITE = 'https://implementeren.ai';
const DIST = join(ROOT, 'dist');
const args = process.argv.slice(2);
const alleenPad = args.includes('--pad') ? args[args.indexOf('--pad') + 1] : null;
const dump = args.includes('--dump');

if (!existsSync(DIST)) { console.error('schema-check: dist/ bestaat niet. Draai eerst `astro build`.'); process.exit(1); }

const fouten = [];
const waarschuwingen = [];
const fout = (p, m) => fouten.push(`${p}: ${m}`);
const waarschuw = (p, m) => waarschuwingen.push(`${p}: ${m}`);

const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)]));
const padVan = (f) => { const r = relative(DIST, f).replace(/\.html$/, ''); return r === 'index' ? '/' : '/' + r.replace(/\/index$/, ''); };
const decode = (s) => s
  .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
  .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
const zichtbaar = (html) => decode(html
  .replace(/<head[\s\S]*?<\/head>/, ' ').replace(/<script[\s\S]*?<\/script>/g, ' ')
  .replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ');
const norm = (s) => decode(String(s)).replace(/\s+/g, ' ').trim();
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const meta = (html, attr, naam) => { const m = html.match(new RegExp(`<meta ${attr}="${esc(naam)}" content="([^"]*)"`)); return m ? decode(m[1]) : null; };
const distBestand = (url) => join(DIST, decodeURIComponent(new URL(url).pathname));
const pngMaat = (f) => { const b = readFileSync(f); return b.toString('ascii', 1, 4) === 'PNG' ? { w: b.readUInt32BE(16), h: b.readUInt32BE(20) } : null; };
const typen = (n) => [].concat(n?.['@type'] ?? []);
const isRef = (o) => o && typeof o === 'object' && !Array.isArray(o) && Object.keys(o).length === 1 && typeof o['@id'] === 'string';
const refsIn = (n, uit = []) => { if (Array.isArray(n)) n.forEach((x) => refsIn(x, uit)); else if (n && typeof n === 'object') { if (isRef(n)) uit.push(n['@id']); else Object.values(n).forEach((v) => refsIn(v, uit)); } return uit; };
const sleutelsIn = (n, uit = new Set()) => { if (Array.isArray(n)) n.forEach((x) => sleutelsIn(x, uit)); else if (n && typeof n === 'object') { Object.keys(n).forEach((k) => uit.add(k)); Object.values(n).forEach((v) => sleutelsIn(v, uit)); } return uit; };
const typenIn = (n, uit = new Set()) => { if (Array.isArray(n)) n.forEach((x) => typenIn(x, uit)); else if (n && typeof n === 'object') { typen(n).forEach((t) => uit.add(t)); Object.values(n).forEach((v) => typenIn(v, uit)); } return uit; };
const ISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/;
const PAGINA_TYPEN = ['WebPage', 'AboutPage', 'ContactPage', 'CollectionPage'];
const bestaatAfbeelding = (p, url, minPixels = 0) => {
  if (!String(url).startsWith(SITE)) return fout(p, `afbeelding buiten het eigen domein: ${url}`);
  const f = distBestand(url);
  if (!existsSync(f)) return fout(p, `afbeelding bestaat niet in dist: ${url}`);
  if (minPixels && f.endsWith('.png')) { const m = pngMaat(f); if (m && m.w * m.h < minPixels) fout(p, `afbeelding te klein (${m.w}x${m.h}): ${url}`); }
};

// Pass 1: verzamel pagina's en grafen.
const paginas = [];
for (const f of walk(DIST).filter((x) => x.endsWith('.html'))) {
  const pad = padVan(f);
  const html = readFileSync(f, 'utf8');
  const noindex = /<meta name="robots" content="[^"]*noindex/.test(html);
  const blokken = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  if (!isZakelijkPad(pad) || noindex) {
    if (blokken.length > 0 && isZakelijkPad(pad)) waarschuw(pad, 'noindex-pagina met JSON-LD');
    continue;
  }
  if (alleenPad && pad !== alleenPad) { paginas.push({ pad, html, blokken, alleenIds: true }); continue; }
  paginas.push({ pad, html, blokken });
}
const globaal = new Set();
for (const pg of paginas) {
  pg.graph = [];
  for (const b of pg.blokken) {
    try { const j = JSON.parse(b); pg.graph.push(...(j['@graph'] ?? [j])); pg.ctx = j['@context']; }
    catch (e) { if (!pg.alleenIds) fout(pg.pad, `JSON-LD is geen geldige JSON: ${e.message}`); }
  }
  pg.graph.forEach((n) => n['@id'] && globaal.add(n['@id']));
}

// Pass 2: valideer.
let gecontroleerd = 0;
for (const pg of paginas.filter((x) => !x.alleenIds)) {
  gecontroleerd++;
  const { pad, html, graph } = pg;
  const p = pad;
  if (dump) console.log(JSON.stringify({ '@context': pg.ctx, '@graph': graph }, null, 2));
  if (pg.blokken.length !== 1) fout(p, `verwacht precies 1 JSON-LD-blok, gevonden ${pg.blokken.length}`);
  if (pg.ctx !== 'https://schema.org') fout(p, `@context is ${pg.ctx}`);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (!canonical) { fout(p, 'geen canonical'); continue; }
  if (meta(html, 'property', 'og:url') !== canonical) fout(p, 'og:url wijkt af van canonical');
  const tekst = zichtbaar(html);
  const ids = new Map();
  for (const n of graph) {
    if (typen(n).length === 0) fout(p, `node zonder @type: ${JSON.stringify(n).slice(0, 80)}`);
    if (n['@id']) { if (ids.has(n['@id'])) fout(p, `dubbele @id ${n['@id']}`); ids.set(n['@id'], n); }
  }
  for (const t of typenIn(graph)) if (['HowTo', 'Review', 'AggregateRating'].includes(t)) fout(p, `verboden type ${t}`);
  for (const k of sleutelsIn(graph)) if (['aggregateRating', 'review'].includes(k)) fout(p, `verboden eigenschap ${k} (self-serving)`);
  for (const r of refsIn(graph)) {
    if (!r.startsWith(SITE)) { fout(p, `verwijzing naar extern @id ${r}`); continue; }
    const basis = r.split('#')[0];
    const eigen = basis === canonical || basis === `${SITE}/` || r.startsWith(`${SITE}/over#`) || r.startsWith(`${SITE}/#`);
    if (eigen ? !ids.has(r) : !globaal.has(r)) fout(p, `@id ${r} wordt niet gedefinieerd`);
  }
  const get = (id) => ids.get(id);

  // Organization
  const org = get(`${SITE}/#organisatie`);
  if (!org) fout(p, 'Organization #organisatie ontbreekt');
  else {
    for (const k of ['name', 'legalName', 'url', 'vatID']) if (!org[k]) fout(p, `Organization mist ${k}`);
    if (org.vatID && !/^NL\d{9}B\d{2}$/.test(org.vatID)) fout(p, `vatID ongeldig: ${org.vatID}`);
    if (!/^\d{8}$/.test(org.identifier?.value ?? '')) fout(p, 'Organization identifier (KvK) ontbreekt of is geen 8 cijfers');
    if ('inLanguage' in org) fout(p, 'inLanguage hoort niet op Organization (S-12)');
    if (typen(org).some((t) => ['ProfessionalService', 'LocalBusiness'].includes(t)) && !org.address) fout(p, 'LocalBusiness-type zonder address');
    if (org.logo) {
      if (String(org.logo.url).includes('/icons/')) fout(p, 'logo wijst naar /icons/ (Naam-app, S-01)');
      bestaatAfbeelding(p, org.logo.url);
      const m = existsSync(distBestand(org.logo.url)) && org.logo.url.endsWith('.png') ? pngMaat(distBestand(org.logo.url)) : null;
      if (m && (m.w < 112 || m.h < 112)) fout(p, `logo kleiner dan 112x112 (${m.w}x${m.h})`);
    }
  }
  const ws = get(`${SITE}/#website`);
  if (!ws || ws.name !== 'Implementeren.ai' || ws.url !== `${SITE}/` || !Array.isArray(ws.alternateName)) fout(p, 'WebSite-node ontbreekt of mist name/url/alternateName');

  // Paginanode
  const pagina = graph.filter((n) => typen(n).some((t) => PAGINA_TYPEN.includes(t)) && n['@id'] === canonical);
  if (pagina.length !== 1) fout(p, `verwacht 1 paginanode met @id = canonical, gevonden ${pagina.length}`);
  else {
    const w = pagina[0];
    if (w.url !== canonical) fout(p, 'paginanode url wijkt af van canonical');
    if (w.isPartOf?.['@id'] !== `${SITE}/#website`) fout(p, 'paginanode isPartOf ontbreekt');
    if (!w.name) fout(p, 'paginanode zonder name');
  }

  // Breadcrumb tegen de zichtbare nav
  const nav = html.match(/<nav aria-label="Broodkruimel"[^>]*>([\s\S]*?)<\/nav>/)?.[1];
  const zichtbareKruimels = nav ? [...nav.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)].map((m) => norm(m[1].replace(/<span[^>]*aria-hidden="true"[^>]*>[\s\S]*?<\/span>/g, '').replace(/<[^>]+>/g, ' '))) : null;
  const kruimel = graph.find((n) => typen(n).includes('BreadcrumbList'));
  if (kruimel) {
    const el = kruimel.itemListElement ?? [];
    el.forEach((li, i) => {
      if (li.position !== i + 1) fout(p, `breadcrumb positie ${li.position} op plek ${i + 1}`);
      if (!li.name) fout(p, 'breadcrumb zonder name');
      if (i < el.length - 1 && !li.item) fout(p, `breadcrumb ${i + 1} zonder item`);
      if (li.item && !String(li.item).startsWith(SITE)) fout(p, `breadcrumb item buiten domein: ${li.item}`);
    });
    const laatste = el.at(-1);
    if (laatste?.item && laatste.item !== canonical) fout(p, `laatste breadcrumb item ${laatste.item} is niet de canonical (S-13)`);
    if (!zichtbareKruimels) fout(p, 'BreadcrumbList zonder zichtbare Broodkruimel-nav');
    else if (JSON.stringify(zichtbareKruimels) !== JSON.stringify(el.map((li) => norm(li.name)))) fout(p, `breadcrumb wijkt af van zichtbaar: ${zichtbareKruimels.join(' / ')} vs ${el.map((li) => li.name).join(' / ')}`);
  } else if (zichtbareKruimels) waarschuw(p, 'zichtbare broodkruimel zonder BreadcrumbList');

  // Article
  const ogType = meta(html, 'property', 'og:type');
  for (const a of graph.filter((n) => typen(n).includes('Article'))) {
    for (const k of ['headline', 'datePublished', 'dateModified', 'author', 'publisher', 'mainEntityOfPage', 'image']) if (!a[k]) fout(p, `Article mist ${k}`);
    if (!ISO.test(a.datePublished ?? '') || !ISO.test(a.dateModified ?? '')) fout(p, 'Article-datum zonder tijdzone (S-19)');
    if ((a.dateModified ?? '') < (a.datePublished ?? '')) fout(p, 'dateModified ligt voor datePublished');
    if (a.publisher?.['@id'] !== `${SITE}/#organisatie`) fout(p, 'Article publisher is niet #organisatie');
    if (a.mainEntityOfPage?.['@id'] !== canonical) fout(p, 'Article mainEntityOfPage is niet de canonical');
    if (!html.includes(`datetime="${String(a.datePublished).slice(0, 10)}`)) fout(p, `datePublished ${a.datePublished} staat niet zichtbaar in een <time> (S-06)`);
    const auteur = get(a.author?.['@id']);
    if (auteur && typen(auteur).includes('Person') && !tekst.includes(auteur.name)) fout(p, `auteur ${auteur.name} staat niet zichtbaar op de pagina`);
    [].concat(a.image ?? []).forEach((u) => bestaatAfbeelding(p, u, 50000));
    if (ogType !== 'article') fout(p, 'Article-pagina zonder og:type article (S-08)');
    if (meta(html, 'property', 'article:published_time') !== a.datePublished) fout(p, 'article:published_time wijkt af van datePublished');
    if (meta(html, 'property', 'article:modified_time') !== a.dateModified) fout(p, 'article:modified_time wijkt af van dateModified');
  }

  // Person
  for (const n of graph.filter((x) => typen(x).includes('Person'))) {
    if (!n.name || !n.url) fout(p, 'Person mist name of url');
    if (!tekst.includes(n.name)) fout(p, `Person ${n.name} staat niet zichtbaar op de pagina`);
    if (n.image) bestaatAfbeelding(p, n.image);
  }

  // Service en offers
  for (const s of graph.filter((x) => typen(x).includes('Service'))) {
    if (!s.name || s.provider?.['@id'] !== `${SITE}/#organisatie` || !s.areaServed) fout(p, 'Service mist name, provider of areaServed');
    const offers = [].concat(s.offers ?? [], s.hasOfferCatalog?.itemListElement ?? []);
    for (const o of offers) {
      if (o.priceCurrency !== 'EUR') fout(p, 'Offer zonder priceCurrency EUR');
      const min = o.priceSpecification?.minPrice;
      if (min === undefined && o.price === undefined) fout(p, 'Offer zonder prijs');
      if (min !== undefined && !tekst.includes(`€${Number(min).toLocaleString('nl-NL')}`)) fout(p, `prijs €${min} staat niet zichtbaar op de pagina`);
      if (o.price === '0' && !/gratis/i.test(tekst)) fout(p, 'gratis Offer zonder zichtbaar "gratis"');
    }
  }

  // WebApplication
  for (const w of graph.filter((x) => typen(x).includes('WebApplication'))) {
    if (!w.name || !w.url) fout(p, 'WebApplication mist name of url');
    // offers is optioneel (S4: geen prijs-claim die de pagina niet zichtbaar maakt); als hij er staat, met prijs.
    if (w.offers && w.offers.price === undefined) fout(p, 'WebApplication-offer zonder price');
  }

  // FAQPage tegen zichtbare tekst
  for (const f of graph.filter((x) => typen(x).includes('FAQPage'))) {
    for (const q of f.mainEntity ?? []) {
      if (!tekst.includes(norm(q.name))) fout(p, `FAQ-vraag niet zichtbaar: ${q.name}`);
      const begin = norm(q.acceptedAnswer?.text ?? '').slice(0, 60);
      if (!tekst.includes(begin)) fout(p, `FAQ-antwoord niet zichtbaar: ${begin}`);
    }
  }

  // ItemList tegen zichtbare links
  for (const l of graph.filter((x) => typen(x).includes('ItemList'))) {
    for (const li of l.itemListElement ?? []) {
      const pathname = new URL(li.url).pathname;
      if (!html.includes(`href="${pathname}"`)) fout(p, `ItemList-url ${pathname} staat niet als link op de pagina`);
    }
  }

  // Deel-meta
  const ogImage = meta(html, 'property', 'og:image');
  if (!ogImage) fout(p, 'geen og:image');
  else {
    bestaatAfbeelding(p, ogImage);
    const w = meta(html, 'property', 'og:image:width'); const h = meta(html, 'property', 'og:image:height');
    const f = ogImage.startsWith(SITE) ? distBestand(ogImage) : null;
    if (w && h && f && existsSync(f) && f.endsWith('.png')) { const m = pngMaat(f); if (m && (m.w !== Number(w) || m.h !== Number(h))) fout(p, `og:image is ${m.w}x${m.h}, gedeclareerd ${w}x${h} (T-16)`); }
  }
  if (meta(html, 'name', 'twitter:card') !== 'summary_large_image') fout(p, 'twitter:card ontbreekt');
  const titel = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '');
  if (titel.length > 60) waarschuw(p, `title ${titel.length} tekens (wording: Spec C)`);
}

for (const w of waarschuwingen) console.warn(`waarschuwing  ${w}`);
for (const f of fouten) console.error(`FOUT  ${f}`);
console.log(`schema-check: ${gecontroleerd} pagina's gecontroleerd, ${fouten.length} fouten, ${waarschuwingen.length} waarschuwingen`);
process.exit(fouten.length > 0 ? 1 : 0);
