// Eén bron van waarheid voor "mag Google dit pad zien".
//
// Gebruikt door twee plekken die vroeger langs elkaar heen konden groeien:
//   - astro.config.mjs, voor de sitemap-filter (welke paden bieden we aan)
//   - src/layouts/BasisLayout.astro, voor de robots-metatag (welke paden mogen geïndexeerd)
//
// Sitemap-uitsluiting is géén noindex. Een pad uit de sitemap houden betekent alleen
// dat we het niet actief aanbieden; lekt de URL (doorgestuurde link, mailscanner,
// referrer) dan kan Google hem alsnog crawlen en indexeren. Daarom staat de
// noindex-beslissing hier, naast de sitemap-beslissing, en niet los ervan.

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { isLive, leesPublicatie } from '../lib/publicatie.mjs';

// De hoofdschakelaar. Zolang deze true is krijgt de HELE site noindex, ongeacht pad.
//
// Na de launch is alleen de lijst `zakelijk` hieronder indexeerbaar.
export const preLaunch = false;

// De zakelijke site. Alleen wat hier staat mag ooit geïndexeerd worden: alles daarbuiten
// (losse HTML in public/, toekomstige pagina's) is noindex tenzij het hier
// bewust wordt toegevoegd. Een nieuwe pagina vergeten is dus veilig: die blijft onzichtbaar.
export const zakelijk = {
  // Alleen exact dit pad.
  exact: [
    '/',
    '/ai-enablement-scan',
    '/claude-compagnon',
    '/claude-consultant',
    '/claude-implementatie',
    '/claude-in-30-dagen',
    '/claude-readiness-scan',
    '/contact',
    '/hoe-claude-werkt',
    '/methodologie',
    '/over',
    '/privacy',
    '/verticalen',
  ],
  // Het pad zelf en alles eronder, zoals /cases en /cases/crm-weekend.
  secties: [
    '/cases',
    '/gids',
    '/tools',
    '/compliance',
    '/integraties',
    '/nieuws',
    '/prijs',
    '/training',
    '/use-cases',
    '/vergelijken',
  ],
  // Alles wat zo begint, voor de route claude-voor-[slug].
  prefixen: ['/claude-voor-'],
  // Bestanden die de zakelijke pagina's laden. Alleen gebruikt door de edge-header in
  // functions/_middleware.js, zodat het logo en de teamfoto's wel in Google mogen.
  assets: ['/_astro/', '/team/', '/logos/', '/icons/', '/favicon.svg', '/og-implementeren.png', '/robots.txt', '/sitemap-'],
};

// Elk niet-HTML-bestand in de root van dist/ staat in precies
// één van deze lijsten, anders faalt scripts/check-dist.mjs. Een nieuw rootbestand (llms.txt,
// verificatiebestand, sleutel) deel je dus bewust in.
// zakelijk: zonder noindex-header, moet ook onder zakelijk.assets vallen.
// bewustNoindex: openbaar leesbaar, de middleware zet er noindex op.
// /llms.txt (A-21) en /_routes.json (A-15) staan er al in, zodat die taken dit bestand niet
// hoeven aan te raken.
export const rootBestanden = {
  zakelijk: ['/favicon.svg', '/og-implementeren.png', '/robots.txt', '/sitemap-index.xml', '/sitemap-0.xml'],
  bewustNoindex: ['/386ecd4c13fe57021749388a72d3ac44.txt', '/llms.txt', '/_headers', '/_redirects', '/_routes.json'],
};

// Hubs zonder gepubliceerde kinderen (review 23 juli, B2): een leeg overzicht is een
// thin-content-signaal. Zodra een collectie een live entry heeft, doet de hub vanzelf
// weer mee. Een ingeplande entry (publishDate na vandaag) telt nog niet: de hub gaat
// pas open op de dag van de eerste publicatie (src/lib/publicatie.mjs).
const HUB_COLLECTIES = {
  verticalen: '/verticalen',
  compliance: '/compliance',
  usecases: '/use-cases',
  integraties: '/integraties',
  training: '/training',
  nieuws: '/nieuws',
  vergelijkingen: '/vergelijken',
  prijs: '/prijs',
};

function bepaalLegeHubs() {
  const leeg = [];
  for (const [collectie, route] of Object.entries(HUB_COLLECTIES)) {
    const dir = join('src/content', collectie);
    let published = 0;
    for (const bestand of readdirSync(dir)) {
      if (!bestand.endsWith('.md')) continue;
      if (isLive(leesPublicatie(readFileSync(join(dir, bestand), 'utf-8')))) published++;
    }
    if (published === 0) leeg.push(route);
  }
  return leeg;
}

export const legeHubs = bepaalLegeHubs();

// Trailing slash weg, lege string wordt '/'. Houdt '/cases' en '/cases/' gelijk.
function normaliseerPad(pad) {
  return pad.replace(/\/$/, '') || '/';
}

// Hoort dit pad bij de zakelijke site?
export function isZakelijkPad(pad) {
  const p = normaliseerPad(pad);
  return (
    zakelijk.exact.includes(p) ||
    zakelijk.secties.some((q) => p === q || p.startsWith(q + '/')) ||
    zakelijk.prefixen.some((q) => p.startsWith(q))
  );
}

// Mag Google dit pad na de launch indexeren: zakelijk, en geen lege hub.
export function isIndexeerbaarPad(pad) {
  const p = normaliseerPad(pad);
  return isZakelijkPad(p) && !legeHubs.includes(p);
}

// De sitemap-filter: alleen wat ook geïndexeerd mag worden.
export function inSitemap(url) {
  return isIndexeerbaarPad(new URL(url).pathname);
}

// De vraag die BasisLayout stelt.
export function moetNoindex(pad) {
  return preLaunch || !isIndexeerbaarPad(pad);
}

// Collectie -> URL-voorvoegsel; loopt gelijk met de [slug]-pagina's in src/pages.
export const collectieRoutes = {
  cases: '/cases/', verticalen: '/claude-voor-', compliance: '/compliance/', usecases: '/use-cases/',
  integraties: '/integraties/', training: '/training/', nieuws: '/nieuws/', vergelijkingen: '/vergelijken/', prijs: '/prijs/',
};
