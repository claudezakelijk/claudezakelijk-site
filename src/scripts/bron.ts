// Lead-bron: waar kwam een bezoeker vandaan, en wat bekeek hij voor hij de AI-check invulde?
// De eerste lead (22 oktober 2026) kwam binnen zonder enige bron. Dit script legt bij de
// eerste pageview van een sessie de herkomst vast en houdt de laatste paden bij.
//
// Privacy-keuze: alleen sessionStorage. Geen cookies, geen localStorage, niets dat de
// sessie overleeft, geen klik-ID-waarden (alleen of ze er waren). Daarom geen
// toestemmingsbanner nodig. Alles in try/catch: dit mag een pagina of formulier nooit breken.

const SLEUTEL = 'czk-bron';
const MAX_PADEN = 10;
const KLIK_IDS = ['gclid', 'msclkid', 'fbclid', 'li_fat_id'] as const;

interface Bron {
  referrer: string;
  landing: string;
  utm: Record<string, string>;
  klik: Record<string, boolean>;
  ts: string;
  paden: string[];
  aantal: number;
}

// Zoekmachines: hun referrer-query mag mee (meestal stuurt alleen Bing of DuckDuckGo er een).
const ZOEK_HOST = /(^|\.)(google|bing|duckduckgo)\.[a-z.]+$/;
const ANDERE_ZOEKMACHINES = ['yahoo.', 'ecosia.org', 'startpage.com', 'qwant.com', 'yandex.', 'baidu.com', 'search.brave.com'];

// AI-assistenten, op host (referrer) en op utm_source.
const AI_HOSTS: Record<string, string> = {
  'chatgpt.com': 'chatgpt',
  'chat.openai.com': 'chatgpt',
  'perplexity.ai': 'perplexity',
  'claude.ai': 'claude',
  'copilot.microsoft.com': 'copilot',
  'gemini.google.com': 'gemini',
};

const SOCIAL_HOSTS = ['facebook.com', 'fb.com', 'instagram.com', 't.co', 'x.com', 'twitter.com', 'reddit.com', 'youtube.com', 'youtu.be', 'bsky.app', 'threads.net', 'mastodon.social', 'tiktok.com', 'whatsapp.com', 'wa.me'];
const MAIL_HOSTS = ['mail.google.com', 'outlook.live.com', 'outlook.office.com', 'outlook.office365.com', 'mail.yahoo.com', 'mail.proton.me'];

// host === domein of een subdomein ervan (www.linkedin.com, nl.linkedin.com).
function hoortBij(host: string, domein: string) {
  return host === domein || host.endsWith('.' + domein);
}

function isZoekmachine(host: string) {
  if (Object.keys(AI_HOSTS).some((d) => hoortBij(host, d))) return false;
  return ZOEK_HOST.test(host) || ANDERE_ZOEKMACHINES.some((d) => host.includes(d));
}

function eigenHost(host: string) {
  return host === location.hostname || /(^|\.)(implementeren\.ai|claudezakelijk\.(nl|pages\.dev))$/.test(host);
}

// Referrer als host + pad. Query alleen bewaren bij een zoekmachine.
function leesReferrer(): string {
  const ref = document.referrer;
  if (!ref) return '';
  try {
    const u = new URL(ref);
    const host = u.hostname.replace(/^www\./, '');
    const pad = u.pathname === '/' ? '' : u.pathname;
    return host + pad + (isZoekmachine(u.hostname) && u.search ? u.search : '');
  } catch {
    return '';
  }
}

// Landingspad met query, maar zonder klik-ID-waarden.
function leesLanding(): string {
  const params = new URLSearchParams(location.search);
  for (const id of KLIK_IDS) params.delete(id);
  const q = params.toString();
  return location.pathname + (q ? '?' + q : '');
}

function leesUtm(): Record<string, string> {
  const utm: Record<string, string> = {};
  new URLSearchParams(location.search).forEach((waarde, sleutel) => {
    if (sleutel.toLowerCase().startsWith('utm_') && waarde) utm[sleutel.toLowerCase()] = waarde.slice(0, 200);
  });
  return utm;
}

function leesKlik(): Record<string, boolean> {
  const params = new URLSearchParams(location.search);
  const klik: Record<string, boolean> = {};
  for (const id of KLIK_IDS) klik[id] = params.has(id);
  return klik;
}

function nieuweBron(): Bron {
  return {
    referrer: leesReferrer(),
    landing: leesLanding(),
    utm: leesUtm(),
    klik: leesKlik(),
    ts: new Date().toISOString(),
    paden: [location.pathname],
    aantal: 1,
  };
}

function lees(): Bron | null {
  try {
    const ruw = sessionStorage.getItem(SLEUTEL);
    return ruw ? (JSON.parse(ruw) as Bron) : null;
  } catch {
    return null;
  }
}

// Draait op elke openbare pageview (BasisLayout). Eerste pageview van de sessie legt de
// herkomst vast; daarna worden alleen pad en teller bijgewerkt.
export function legBronVast() {
  try {
    const bestaand = lees();
    let bron: Bron;
    if (!bestaand) {
      bron = nieuweBron();
    } else {
      bron = bestaand;
      const paden = Array.isArray(bron.paden) ? bron.paden : [];
      // Een herlaadbeurt telt mee als pageview, maar zet het pad niet dubbel in de lijst.
      if (paden[paden.length - 1] !== location.pathname) paden.push(location.pathname);
      bron.paden = paden.slice(-MAX_PADEN);
      bron.aantal = (Number(bron.aantal) || 0) + 1;
    }
    sessionStorage.setItem(SLEUTEL, JSON.stringify(bron));
  } catch {
    // sessionStorage geblokkeerd of vol: bronVelden() valt terug op document.referrer.
  }
}

function kanaalVanHost(host: string): string | null {
  host = host.toLowerCase().replace(/^www\./, '');
  for (const [domein, kanaal] of Object.entries(AI_HOSTS)) if (hoortBij(host, domein)) return kanaal;
  if (MAIL_HOSTS.some((d) => hoortBij(host, d))) return 'email';
  const zoek = host.match(ZOEK_HOST);
  if (zoek) return zoek[2];
  if (hoortBij(host, 'linkedin.com') || hoortBij(host, 'lnkd.in')) return 'linkedin';
  if (SOCIAL_HOSTS.some((d) => hoortBij(host, d))) return 'other-social';
  return null;
}

function kanaalVanUtm(utm: Record<string, string>): string | null {
  const bron = (utm.utm_source || '').toLowerCase().trim();
  const medium = (utm.utm_medium || '').toLowerCase().trim();
  if (!bron && !medium) return null;
  if (medium === 'email' || medium === 'e-mail' || medium === 'newsletter' || /mail|nieuwsbrief|newsletter/.test(bron)) return 'email';
  if (bron) {
    // utm_source=chatgpt.com (zo tagt ChatGPT zijn links), maar ook 'chatgpt' of 'perplexity'.
    const alsHost = kanaalVanHost(bron);
    if (alsHost) return alsHost;
    const kaal = bron.replace(/\.(com|ai|org|net|nl)$/, '');
    const bekend = ['google', 'bing', 'duckduckgo', 'chatgpt', 'perplexity', 'claude', 'copilot', 'gemini', 'linkedin'];
    if (bekend.includes(kaal)) return kaal;
    if (kaal === 'openai') return 'chatgpt';
    if (['facebook', 'fb', 'instagram', 'twitter', 'x', 'reddit', 'youtube', 'bluesky', 'threads', 'tiktok', 'whatsapp'].includes(kaal)) return 'other-social';
  }
  // Onbekende utm_source: laat klik-ID en referrer beslissen (zie bepaalKanaal).
  return null;
}

function bepaalKanaal(bron: Bron): string {
  const viaUtm = kanaalVanUtm(bron.utm || {});
  if (viaUtm) return viaUtm;
  const klik = bron.klik || {};
  if (klik.gclid) return 'google';
  if (klik.msclkid) return 'bing';
  if (klik.li_fat_id) return 'linkedin';
  if (klik.fbclid) return 'other-social';
  const host = (bron.referrer || '').split(/[/?]/)[0];
  const viaReferrer = host && !eigenHost(host) ? kanaalVanHost(host) : null;
  if (viaReferrer) return viaReferrer;
  // Wel utm-tags, maar geen herkenbare bron: een campagne die we (nog) niet kennen.
  if (Object.keys(bron.utm || {}).length) return 'other';
  if (!host) return 'direct';
  return eigenHost(host) ? 'internal' : 'other';
}

// Velden voor de Web3Forms-payload. Gooit nooit; in het ergste geval komt alleen
// bron_kanaal 'onbekend' mee.
export function bronVelden(): Record<string, string> {
  try {
    // Zonder sessionStorage: herkomst van deze ene pageview, op basis van document.referrer.
    const bron = lees() || nieuweBron();
    const utm = Object.entries(bron.utm || {}).map(([k, v]) => `${k}=${v}`).join(', ');
    const klik = KLIK_IDS.map((id) => `${id}: ${bron.klik?.[id] ? 'ja' : 'nee'}`).join(', ');
    const paden = Array.isArray(bron.paden) ? bron.paden : [];
    return {
      bron_kanaal: bepaalKanaal(bron),
      bron_referrer: bron.referrer || '(geen)',
      bron_landingspagina: bron.landing || '(onbekend)',
      bron_utm: utm || '(geen)',
      bron_klik_id: klik,
      bron_paginas_deze_sessie: `${Number(bron.aantal) || paden.length} pageviews: ${paden.join(' > ')}`,
      bron_eerste_bezoek: bron.ts || '',
      apparaat: window.innerWidth < 768 ? 'mobile' : 'desktop',
    };
  } catch {
    return { bron_kanaal: 'onbekend' };
  }
}
