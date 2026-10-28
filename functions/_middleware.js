// Rand-logica voor implementeren.ai. Drie taken, op elk verzoek dat door de Function gaat:
// (1) statische redirects uit public/_redirects, (2) /404 als echte 404, (3) beveiligingsheaders
// plus een X-Robots-Tag: noindex op alles wat niet bij de zakelijke site hoort.
import INDEXERING from './_indexering.json';
import REDIRECTS from './_redirects.json';

function normalize(pathname) {
  const p = pathname.replace(/\/+$/, '');
  return p === '' ? '/' : p;
}

// Eén vorm per pad. De asset-server erachter is ruimhartiger dan een letterlijke vergelijking:
// //404, /404.html en /404/index leveren daar hetzelfde bestand als /404.
function kanoniek(p) {
  const delen = [];
  for (const deel of p.replace(/\\/g, '/').split('/')) {
    if (deel === '' || deel === '.') continue;
    if (deel === '..') delen.pop();
    else delen.push(deel);
  }
  const k = ('/' + delen.join('/')).toLowerCase().replace(/\.html$/, '').replace(/\/index$/, '');
  return k === '' ? '/' : k;
}

// Mag Google dit pad indexeren? Alleen de zakelijke site, en pas na de launch.
// Spiegelt isIndexeerbaarPad() uit src/data/indexering.mjs, plus de bestanden die de
// zakelijke pagina's laden.
function isIndexeerbaar(pathname) {
  if (INDEXERING.preLaunch) return false;
  // Astro bouwt /over als /over.html; beide vormen tellen als hetzelfde pad.
  const p = normalize(pathname).replace(/\.html$/, '').replace(/\/index$/, '') || '/';
  if (INDEXERING.assets.some((a) => pathname.startsWith(a))) return true;
  if (INDEXERING.legeHubs.includes(p)) return false;
  return (
    INDEXERING.exact.includes(p) ||
    INDEXERING.secties.some((q) => p === q || p.startsWith(q + '/')) ||
    INDEXERING.prefixen.some((q) => p.startsWith(q))
  );
}

// Alles buiten de zakelijke site krijgt een noindex-header mee. Dat dekt ook de losse
// bestanden in public/ (html, pdf, afbeeldingen) die geen robots-metatag kunnen dragen.
// Alleen het hoofddomein mag de index in. *.pages.dev en preview-hosts serveren dezelfde
// site en blijven daarom altijd noindex. claudezakelijk.nl stuurt sinds oktober 2026 met een
// 301 door naar implementeren.ai.
const INDEX_HOST = 'implementeren.ai';

const BEVEILIGING = {
  'Strict-Transport-Security': 'max-age=15552000',
  'X-Frame-Options': 'SAMEORIGIN',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
};

function metRobotsHeader(response, pathname, hostname) {
  const out = new Response(response.body, response);
  for (const [k, v] of Object.entries(BEVEILIGING)) out.headers.set(k, v);
  if (!(hostname === INDEX_HOST && isIndexeerbaar(pathname))) out.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return out;
}

// Een redirect-doel is een pad op deze site: precies één '/' vooraan, daarna geen '/' of '\',
// nergens een backslash, spatie of stuurteken en geen '@' in het eerste deel. Alles daarbuiten
// kan een browser als een andere host lezen. Zelfde patroon als in scripts/gen-edge.mjs.
const PAD_OP_SITE = /^\/(?![\/\\])[^\/@\\\s\x00-\x1f\x7f]*(?:\/[^\\\s\x00-\x1f\x7f]*)?$/;
const REDIRECT_STATUS = [301, 302, 303, 307, 308];

// Is dit een spelling van /404? Tot drie decodeerrondes, alleen het eindpad telt.
function is404Pad(pathname) {
  let p = pathname;
  for (let i = 0; i <= 3; i++) {
    if (kanoniek(p) === '/404') return true;
    let d;
    try { d = decodeURIComponent(p); } catch { return false; }
    if (d === p) return false;
    p = d;
  }
  return false;
}

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const p = normalize(url.pathname);
  const r = Object.hasOwn(REDIRECTS, p) ? REDIRECTS[p] : null;
  // Alleen het pad gaat in Location, nooit de host of het schema uit het verzoek. Een doel dat
  // geen pad op deze site is (kapotte of met de hand bewerkte JSON) wordt overgeslagen.
  if (r && typeof r.naar === 'string' && PAD_OP_SITE.test(r.naar) && REDIRECT_STATUS.includes(r.status)) {
    return metRobotsHeader(
      new Response(null, { status: r.status, headers: { Location: `${r.naar}${url.search}` } }),
      url.pathname, url.hostname,
    );
  }
  let response = await context.next();
  // /404 is de foutpagina zelf; als URL hoort hij een 404 te geven, geen 200. Dat geldt voor elke
  // spelling (//404, /404/, /404.html, /%3404): die krijgen allemaal de foutpagina met status 404.
  if (is404Pad(url.pathname)) {
    if (response.status !== 200 || p !== '/404') response = await context.env.ASSETS.fetch(new URL('/404', url));
    response = new Response(response.body, { status: 404, headers: response.headers });
  }
  return metRobotsHeader(response, url.pathname, url.hostname);
}
