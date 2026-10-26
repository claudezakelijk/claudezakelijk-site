#!/usr/bin/env node
/**
 * On-page check over dist/ (Spec C, task C-01). Run after `npm run build`.
 *
 * For every URL in dist/sitemap-0.xml:
 *   1. <title> present, 20..60 characters, unique across the sitemap
 *   2. meta description present, 70..154 characters, unique
 *   3. exactly one <h1>, non-empty; no em dash in title, description or h1
 *   4. no heading level skip (h1 -> h3 without h2, etc.)
 *   5. breadcrumb on every page except "/" (nav[aria-label="Broodkruimel"], first item "Home" -> "/")
 *   6. every internal <a href> on the page (header, main, footer) points at a sitemap URL or at a
 *      file (has an extension); never at a built page outside the sitemap (noindex, empty hub,
 *      private) and never at a path that does not exist in dist
 *   7. every sitemap URL except "/" gets links from at least MIN_INBOUND distinct other sitemap
 *      pages inside <main>, breadcrumb excluded
 *   8. labels in the "Gerelateerd" block (section[data-gerelateerd]) equal the target page's h1,
 *      its title without " | ClaudeZakelijk", or the last item of its breadcrumb
 *   9. the homepage h1 contains "Claude zakelijk"
 *
 * Usage: node scripts/onpage-check.mjs [--min-inbound=3] [--verbose]
 * Exit 0 = no failures, exit 1 = at least one failure.
 */
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const SITE = 'https://claudezakelijk.nl';
const SUFFIX = ' | ClaudeZakelijk';
const args = process.argv.slice(2);
const MIN_INBOUND = Number((args.find((a) => a.startsWith('--min-inbound=')) || '--min-inbound=3').split('=')[1]);
const VERBOSE = args.includes('--verbose');

if (!existsSync(join(DIST, 'sitemap-0.xml'))) {
  console.error('onpage-check: dist/sitemap-0.xml ontbreekt. Draai eerst `npm run build`.');
  process.exit(1);
}

const norm = (p) => (p.replace(/\/+$/, '') || '/');
const decode = (s) =>
  s
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;|&#160;/g, ' ')
    .replace(/&times;/g, '×')
    .replace(/&rarr;/g, '→')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/\s+/g, ' ')
    .trim();

const sitemapXml = readFileSync(join(DIST, 'sitemap-0.xml'), 'utf8');
const urls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => norm(m[1].replace(SITE, '')));
const inSitemap = new Set(urls);

function fileFor(p) {
  if (p === '/') return join(DIST, 'index.html');
  const rel = p.replace(/^\//, '');
  for (const c of [join(DIST, `${rel}.html`), join(DIST, rel, 'index.html'), join(DIST, rel)]) {
    if (existsSync(c) && statSync(c).isFile()) return c;
  }
  return null;
}

const failures = [];
const fail = (url, msg) => failures.push(`${url}: ${msg}`);

const pages = new Map();
for (const url of urls) {
  const file = fileFor(url);
  if (!file) { fail(url, 'staat in de sitemap maar heeft geen HTML-bestand in dist'); continue; }
  const html = readFileSync(file, 'utf8');
  const title = decode((html.match(/<title>([\s\S]*?)<\/title>/) || [, ''])[1]);
  const desc = decode((html.match(/<meta name="description" content="([^"]*)"/) || [, ''])[1]);
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => decode(m[1]));
  const levels = [...html.matchAll(/<h([1-6])\b/g)].map((m) => Number(m[1]));
  const crumbNav = (html.match(/<nav[^>]*aria-label="Broodkruimel"[^>]*>([\s\S]*?)<\/nav>/) || [, null])[1];
  const crumbItems = crumbNav ? [...crumbNav.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/g)].map((m) => m[1]) : [];
  const main = (html.match(/<main\b[^>]*>([\s\S]*)<\/main>/) || [, ''])[1]
    .replace(/<nav[^>]*aria-label="Broodkruimel"[^>]*>[\s\S]*?<\/nav>/g, '');
  const related = (html.match(/<section[^>]*data-gerelateerd[^>]*>([\s\S]*?)<\/section>/) || [, ''])[1];
  pages.set(url, { html, title, desc, h1s, levels, crumbItems, main, related });
}

const hrefs = (s) =>
  [...s.matchAll(/<a\b[^>]*\bhref="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)].map((m) => ({ href: m[1], text: decode(m[2]) }));
const internalPath = (href) => {
  if (href.startsWith(SITE)) href = href.slice(SITE.length) || '/';
  if (!href.startsWith('/') || href.startsWith('//')) return null;
  return norm(href.split('#')[0].split('?')[0]);
};
const isFile = (p) => /\.[a-z0-9]{2,5}$/i.test(p);

const seenTitle = new Map();
const seenDesc = new Map();
const inbound = new Map(urls.map((u) => [u, new Set()]));

for (const [url, p] of pages) {
  if (!p.title) fail(url, 'geen <title>');
  else {
    if (p.title.length < 20 || p.title.length > 60) fail(url, `title ${p.title.length} tekens (20-60): "${p.title}"`);
    if (seenTitle.has(p.title)) fail(url, `dubbele title, ook op ${seenTitle.get(p.title)}`);
    seenTitle.set(p.title, url);
  }
  if (!p.desc) fail(url, 'geen meta description');
  else {
    if (p.desc.length < 70 || p.desc.length > 154) fail(url, `description ${p.desc.length} tekens (70-154)`);
    if (seenDesc.has(p.desc)) fail(url, `dubbele description, ook op ${seenDesc.get(p.desc)}`);
    seenDesc.set(p.desc, url);
  }
  if (p.h1s.length !== 1) fail(url, `${p.h1s.length} h1-elementen (verwacht 1)`);
  else if (!p.h1s[0]) fail(url, 'lege h1');
  for (const [label, v] of [['title', p.title], ['description', p.desc], ['h1', p.h1s[0] || '']]) {
    if (v.includes('—')) fail(url, `em dash in ${label}`);
  }
  for (let i = 1; i < p.levels.length; i++) {
    if (p.levels[i] > p.levels[i - 1] + 1) { fail(url, `kopniveau springt van h${p.levels[i - 1]} naar h${p.levels[i]}`); break; }
  }
  if (url !== '/') {
    if (p.crumbItems.length < 2) fail(url, 'geen broodkruimel (nav aria-label="Broodkruimel" met minstens 2 items)');
    else if (!/href="\/"/.test(p.crumbItems[0]) || decode(p.crumbItems[0]) !== 'Home') fail(url, 'eerste kruimel is niet "Home" -> "/"');
  }
  for (const { href } of hrefs(p.html)) {
    const t = internalPath(href);
    if (t === null || isFile(t) || t.startsWith('/cdn-cgi/')) continue;
    if (inSitemap.has(t)) continue;
    fail(url, fileFor(t) ? `link naar ${t}: gebouwd maar niet in de sitemap (noindex, lege hub of privé)` : `link naar ${t}: bestaat niet in dist`);
  }
  for (const { href } of hrefs(p.main)) {
    const t = internalPath(href);
    if (t && t !== url && inbound.has(t)) inbound.get(t).add(url);
  }
}

for (const url of urls) {
  if (url === '/') continue;
  const n = inbound.get(url).size;
  if (n < MIN_INBOUND) fail(url, `${n} inkomende pagina's in <main> (minimaal ${MIN_INBOUND}): ${[...inbound.get(url)].join(', ') || 'geen'}`);
}

for (const [url, p] of pages) {
  for (const { href, text } of hrefs(p.related)) {
    const t = internalPath(href);
    const target = t && pages.get(t);
    if (!target) continue;
    const crumbLast = target.crumbItems.length ? decode(target.crumbItems[target.crumbItems.length - 1]) : null;
    const allowed = [target.h1s[0], target.title.replace(SUFFIX, ''), crumbLast].filter(Boolean);
    if (!allowed.includes(text)) fail(url, `Gerelateerd-label "${text}" voor ${t} hoort een van ${JSON.stringify(allowed)} te zijn`);
  }
}

const home = pages.get('/');
if (home && !/claude zakelijk/i.test(home.h1s[0] || '')) fail('/', `h1 bevat geen "Claude zakelijk": "${home.h1s[0] || ''}"`);

if (VERBOSE) {
  for (const url of urls) console.log(`${String(inbound.get(url).size).padStart(3)} inkomend  ${url}`);
}
if (failures.length) {
  console.error(failures.join('\n'));
  console.error(`\nonpage-check: ${failures.length} fout(en) op ${urls.length} sitemap-URL's`);
  process.exit(1);
}
console.log(`onpage-check: ${urls.length} sitemap-URL's, 0 fouten`);
