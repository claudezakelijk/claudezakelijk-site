#!/usr/bin/env node
// Live check of claudezakelijk.nl against the indexing rules (seo-werklijst task 16).
//
//   node scripts/verify-live.mjs            # after the flip: every sitemap URL must be indexable
//   node scripts/verify-live.mjs --prelaunch # before the flip: every sitemap URL must be noindex
//
// Fetches the live sitemap, then every URL with and without a cache-busting query string,
// and reports status, X-Robots-Tag, robots meta, canonical and placeholder text. The sweder
// subdomain must stay noindex in both modes. Crawler user agents must not
// be blocked at the edge. Removed paths must 404. Checks that depend on work not yet live are
// printed as PENDING and never fail the run. Exit code 1 on any failure.
//
// Only GET/HEAD requests. Never prints bodies or e-mail addresses: statuses, sizes, booleans.
//
//   node scripts/verify-live.mjs --no-ua-matrix   # skip the crawler user-agent matrix

import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// indexering.mjs reads src/content relative to the cwd, so run from the repo root.
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
process.chdir(ROOT);

const SITE = 'https://claudezakelijk.nl';
const HOST = new URL(SITE).hostname;
const PRELAUNCH = process.argv.includes('--prelaunch');

// ---- configuration: change when the matching task ships ----
const AI_TRAINING_POLICY = 'allow';          // 'allow' | 'disallow-training' (owner decision: allow)
const LEGAL_PATHS = [];                      // Spec D legal pages, e.g. ['/privacy', '/cookies', '/algemene-voorwaarden']
const REMOVED_PATHS = [];                    // paths taken off the site that must keep returning 404
// One switch per task, so a check runs as soon as its own task is live (S4c, 2026-10-06).
const EXPECT_SECURITY_HEADERS = true;        // A-14 live (c879849)
const EXPECT_ASSET_HEADERS = true;           // /_astro/ immutable via public/_headers (c879849); A-15's _routes.json is a separate change
const EXPECT_ICONS = false;                  // true once A-20 is live (favicon.ico, apple-touch-icon.png, site.webmanifest)
const EXPECT_LLMS_TXT = false;               // true once A-21 is live
const EXPECT_404_STATUS = true;              // A-13 live (c879849)
const EXPECT_INDEXNOW_KEY = true;            // A-22 live (128a0f8)
const EXPECT_EMAIL_PLAIN = false;            // true once A-24 is done
const SKIP_UA = process.argv.includes('--no-ua-matrix');
const PLACEHOLDER = /wordt gevuld tijdens|batch gebouwd|Binnenkort meer/;

const failures = [];
const fail = (msg) => { failures.push(msg); console.log('FAIL ' + msg); };
const pending = [];
const pend = (check, task) => { pending.push({ check, task }); console.log(`PENDING ${check} (waits on ${task})`); };

async function fetchPage(url) {
  const res = await fetch(url, { redirect: 'manual', headers: { 'user-agent': 'verify-live/1' } });
  const html = res.status === 200 ? await res.text() : '';
  return {
    status: res.status,
    xrobots: res.headers.get('x-robots-tag') || '',
    cache: res.headers.get('cf-cache-status') || '',
    age: res.headers.get('age') || '',
    noindexMeta: /<meta[^>]+name="robots"[^>]+noindex/i.test(html),
    canonical: (html.match(/rel="canonical" href="([^"]+)"/) || [])[1] || '',
    placeholder: PLACEHOLDER.test(html),
  };
}

const norm = (u) => u.replace(/\/$/, '');

// 1. robots.txt
const robots = await (await fetch(SITE + '/robots.txt?v=' + Date.now())).text();
console.log('robots.txt:\n' + robots.trim().split('\n').map((l) => '  ' + l).join('\n'));
if (PRELAUNCH) {
  if (!/^Disallow: \/\s*$/m.test(robots)) fail('robots.txt no longer has Disallow: / while in prelaunch mode');
} else {
  if (/^Disallow: \/\s*$/m.test(robots)) fail('robots.txt still has Disallow: /');
  if (!/^Sitemap: https:\/\/claudezakelijk\.nl\/sitemap-index\.xml/m.test(robots)) fail('robots.txt has no Sitemap line');
  if (AI_TRAINING_POLICY === 'allow' && /Content-Signal|GPTBot|ClaudeBot|Google-Extended/i.test(robots)) fail('robots.txt carries a managed AI-bot block or Content-Signal line');
}

// 2. sitemap
const index = await (await fetch(SITE + '/sitemap-index.xml?v=' + Date.now())).text();
const sitemaps = [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const urls = [];
for (const sm of sitemaps) {
  const xml = await (await fetch(sm + '?v=' + Date.now())).text();
  urls.push(...[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
}
console.log(`sitemap: ${urls.length} URLs in ${sitemaps.length} file(s)`);

// 3. every sitemap URL, plain and cache-busted
let ok = 0;
for (const url of urls) {
  for (const suffix of ['', '?v=' + Date.now()]) {
    const p = await fetchPage(url + suffix);
    const label = url.replace(SITE, '') || '/';
    const problems = [];
    if (p.status !== 200) problems.push('status ' + p.status);
    if (PRELAUNCH) {
      if (!/noindex/.test(p.xrobots)) problems.push('no noindex header');
      if (!p.noindexMeta) problems.push('no noindex meta');
    } else {
      if (p.xrobots) problems.push('X-Robots-Tag: ' + p.xrobots);
      if (p.noindexMeta) problems.push('noindex meta');
    }
    if (p.status === 200 && norm(p.canonical) !== norm(url)) problems.push('canonical ' + p.canonical);
    if (p.placeholder) problems.push('placeholder text');
    if (problems.length) fail(`${label}${suffix ? ' (cache-busted)' : ''}: ${problems.join(', ')} [cf=${p.cache} age=${p.age}]`);
    else ok++;
  }
}
console.log(`sitemap pages: ${ok} of ${urls.length * 2} fetches clean (plain + cache-busted)`);

// 4. the staging subdomain must stay out of the index
try {
  const s = await fetchPage('https://sweder.claudezakelijk.nl/?v=' + Date.now());
  const sr = await (await fetch('https://sweder.claudezakelijk.nl/robots.txt?v=' + Date.now())).text();
  if (s.status === 200 && !s.noindexMeta && !/noindex/.test(s.xrobots)) fail('sweder.claudezakelijk.nl is indexable');
  if (!/^Disallow: \/\s*$/m.test(sr)) fail('sweder.claudezakelijk.nl robots.txt has no Disallow: /');
  console.log(`sweder subdomain: status ${s.status}, noindex meta ${s.noindexMeta}, robots Disallow ${/^Disallow: \/\s*$/m.test(sr)}`);
} catch (e) {
  console.log('sweder subdomain: unreachable (' + e.message + ')');
}

// 5. www
const www = await fetch(SITE.replace('https://', 'https://www.') + '/prijs', { redirect: 'manual' });
const loc = www.headers.get('location') || '';
if (www.status !== 301 || loc !== SITE + '/prijs') fail(`www: status ${www.status}, location ${loc || '(none)'}`);
else console.log('www: 301 to ' + loc);

// 5b. every line of public/_redirects: <from> <to> <status>, checked without following the redirect
let redirOk = 0, redirN = 0;
for (const line of readFileSync(join(ROOT, 'public/_redirects'), 'utf8').split('\n')) {
  const t = line.trim();
  if (!t || t.startsWith('#')) continue;
  const [from, to, status] = t.split(/\s+/);
  redirN++;
  const r = await fetch(SITE + from, { redirect: 'manual', headers: { 'user-agent': 'verify-live/1' } });
  const loc = r.headers.get('location') || '';
  let locPath = loc;
  try {
    const u = new URL(loc, SITE);
    locPath = u.hostname === HOST ? u.pathname : loc;
  } catch { /* keep the raw value for the message */ }
  if (r.status !== Number(status) || locPath !== to) fail(`redirect ${from}: status ${r.status}, location ${loc || '(none)'}, want ${status} to ${to}`);
  else redirOk++;
}
console.log(`redirects: ${redirOk} of ${redirN} lines in public/_redirects answer as written`);

// 6. UA matrix: edge blocks of crawlers
const UAS = {
  GPTBot: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.4; +https://openai.com/gptbot',
  'OAI-SearchBot': 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot',
  'ChatGPT-User': 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot',
  ClaudeBot: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)',
  'Claude-User': 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Claude-User/1.0; +Claude-User@anthropic.com)',
  'Claude-SearchBot': 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Claude-SearchBot/1.0; +Claude-SearchBot@anthropic.com)',
  PerplexityBot: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)',
  CCBot: 'CCBot/2.0 (https://commoncrawl.org/faq/)',
  Googlebot: 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
  bingbot: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm) Chrome/116.0.1938.76 Safari/537.36',
  Applebot: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15 (Applebot/0.1; +http://www.apple.com/go/applebot)',
};
// Bytespider and Amazonbot are deliberately not tested: the owner allows blocking them.
const TRAINING = ['GPTBot', 'ClaudeBot', 'CCBot'];
if (SKIP_UA) {
  console.log('UA matrix: skipped (--no-ua-matrix)');
} else {
  let uaOk = 0;
  for (const [name, ua] of Object.entries(UAS)) {
    for (const path of ['/?v=' + Date.now(), '/prijs']) {
      const res = await fetch(SITE + path, { redirect: 'manual', headers: { 'user-agent': ua } });
      const n = (await res.arrayBuffer()).byteLength;
      const blockExpected = AI_TRAINING_POLICY === 'disallow-training' && TRAINING.includes(name);
      const good = blockExpected ? res.status === 403 : res.status === 200 && n >= 1024;
      if (good) uaOk++;
      else fail(`UA ${name} ${path.split('?')[0]}: status ${res.status}, ${n} bytes`);
    }
  }
  console.log(`UA matrix: ${uaOk} of ${Object.keys(UAS).length * 2} fetches as expected`);
  console.log('note: spoofed user agents cannot prove what verified bots from Google/Bing IPs get; see A-09');
}

// 8. removed paths must 404, plain and cache-busted (the plain URL shows a stale zone cache)
for (const p of REMOVED_PATHS) {
  for (const q of ['', '?v=' + Date.now()]) {
    const r = await fetch(SITE + p + q, { redirect: 'manual', headers: { 'user-agent': 'verify-live/1' } });
    if (r.status !== 404) fail(`removed path ${p}${q ? ' (cache-busted)' : ''} returned ${r.status}, expected 404 [cf=${r.headers.get('cf-cache-status') || ''}]`);
  }
}
console.log(`removed paths: ${REMOVED_PATHS.length} checked`);

// 9. legal pages
if (LEGAL_PATHS.length === 0) pend('legal pages return 200', 'Spec D legal pages (LEGAL_PATHS is empty)');
for (const p of LEGAL_PATHS) {
  const r = await fetch(SITE + p + '?v=' + Date.now(), { redirect: 'manual' });
  if (r.status !== 200) fail(`legal page ${p} returned ${r.status}`);
}

// 10. headers
const home = await fetch(SITE + '/?v=' + Date.now(), { redirect: 'manual' });
const h = (n) => home.headers.get(n) || '';
const homeHtml = await home.text();
if (!EXPECT_SECURITY_HEADERS) {
  pend('security headers on / (HSTS, X-Frame-Options, Permissions-Policy, nosniff)', 'A-14');
} else {
  if (!/max-age=/.test(h('strict-transport-security'))) fail('header strict-transport-security missing or without max-age');
  if (h('x-frame-options') !== 'SAMEORIGIN') fail('header x-frame-options is not SAMEORIGIN');
  if (!h('permissions-policy')) fail('header permissions-policy missing');
  if (h('x-content-type-options') !== 'nosniff') fail('header x-content-type-options is not nosniff');
  console.log('security headers on /: checked');
}
if (!EXPECT_ASSET_HEADERS) {
  pend('asset URLs from homepage: 200, no x-robots-tag, /_astro/ immutable', 'A-15');
} else {
  const html = homeHtml;
  const found = new Set();
  for (const m of html.matchAll(/(?:href|src|srcset)="([^"]+)"/g)) {
    for (const part of m[1].split(',')) {
      const u = part.trim().split(/\s+/)[0];
      if (/^\/(_astro\/|team\/|logos\/|brand\/|favicon)/.test(u)) found.add(u);
    }
  }
  for (const u of found) {
    const r = await fetch(SITE + u, { method: 'HEAD', redirect: 'manual' });
    const problems = [];
    if (r.status !== 200) problems.push('status ' + r.status);
    if (r.headers.get('x-robots-tag')) problems.push('x-robots-tag present');
    if (u.startsWith('/_astro/') && !/immutable/.test(r.headers.get('cache-control') || '')) problems.push('no immutable');
    if (problems.length) fail(`asset ${u}: ${problems.join(', ')}`);
  }
  console.log(`asset headers: ${found.size} asset URLs from / checked`);
}

// 11. root files
const head = async (p) => fetch(SITE + p + '?v=' + Date.now(), { redirect: 'manual' });
let r;
if (!EXPECT_ICONS) pend('favicon.ico, apple-touch-icon.png, site.webmanifest', 'A-20');
else {
  r = await head('/favicon.ico');
  if (r.status !== 200 || !/image\/(x-icon|vnd\.microsoft\.icon)/.test(r.headers.get('content-type') || '') || r.headers.get('x-robots-tag')) fail(`/favicon.ico: status ${r.status}, type ${r.headers.get('content-type')}, x-robots-tag ${!!r.headers.get('x-robots-tag')}`);
  r = await head('/apple-touch-icon.png');
  if (r.status !== 200 || !/image\/png/.test(r.headers.get('content-type') || '')) fail(`/apple-touch-icon.png: status ${r.status}`);
  r = await head('/site.webmanifest');
  if (r.status !== 200 || !/"name":\s*"ClaudeZakelijk"/.test(await r.text())) fail(`/site.webmanifest: status ${r.status} or wrong name`);
}
if (!EXPECT_LLMS_TXT) pend('llms.txt', 'A-21');
else {
  r = await head('/llms.txt');
  if (r.status !== 200 || !(r.headers.get('content-type') || '').startsWith('text/plain') || !(await r.text()).startsWith('# ClaudeZakelijk')) fail(`/llms.txt: status ${r.status} or wrong type/start`);
}
if (!EXPECT_404_STATUS) pend('/404 status 404', 'A-13');
else {
  r = await head('/404');
  if (r.status !== 404) fail(`/404: status ${r.status}, want 404`);
  console.log(`/404: status ${r.status}`);
}
if (!EXPECT_INDEXNOW_KEY) pend('IndexNow key file', 'A-22');
else {
  // The key file is named after the key (32 hex): other .txt files such as llms.txt (A-21) are not keys.
  const keys = readdirSync(join(ROOT, 'public')).filter((f) => /^[0-9a-f]{32}\.txt$/.test(f));
  if (keys.length === 0) fail('IndexNow key file: none found in public/');
  for (const k of keys) {
    r = await head('/' + k);
    if (r.status !== 200 || (await r.text()).trim() !== k.replace(/\.txt$/, '')) fail(`IndexNow key file ${k}: status ${r.status} or body mismatch`);
  }
  console.log(`IndexNow key file: ${keys.length} checked`);
}

// 12. e-mail must be plain text, not Cloudflare-obfuscated
if (!EXPECT_EMAIL_PLAIN) pend('homepage and /contact carry the address as plain text', 'A-24');
else {
  for (const p of ['/', '/contact']) {
    const t = await (await fetch(SITE + p + '?v=' + Date.now())).text();
    if (t.includes('/cdn-cgi/l/email-protection')) fail(`${p} still has Cloudflare e-mail obfuscation`);
    if (!t.includes('hallo@claudezakelijk.nl')) fail(`${p} has no plain contact address`);
  }
}

if (pending.length) console.log(`\n${pending.length} check(s) PENDING (not counted as failures)`);
console.log(failures.length ? `\n${failures.length} failure(s)` : '\nall checks passed');
process.exit(failures.length ? 1 : 0);
