export const site = {
  naam: 'ClaudeZakelijk',
  tagline: 'Onafhankelijke Claude-implementatie voor het MKB',
  onafhankelijkheid:
    'ClaudeZakelijk is een onafhankelijk adviesbureau. We zijn geen onderdeel of partner van Anthropic, en Anthropic heeft deze site niet goedgekeurd. Claude en Anthropic zijn handelsmerken van Anthropic, PBC.',
  onafhankelijkheidLang:
    'ClaudeZakelijk is een onafhankelijk Nederlands adviesbureau. We zijn geen onderdeel, partner of vertegenwoordiger van Anthropic, het bedrijf dat Claude maakt. Anthropic sponsort ons niet en heeft deze site niet goedgekeurd. Wij adviseren over Claude en richten het in bij bedrijven. De licenties koop je rechtstreeks bij Anthropic. Claude en Anthropic zijn handelsmerken van Anthropic, PBC.',
  wieZijnWij:
    'ClaudeZakelijk is een onafhankelijk Nederlands adviesbureau dat Claude van Anthropic inricht bij MKB-bedrijven van 10 tot 200 medewerkers. Lead consultant is Camiel Wits. Vaste prijzen: de Readiness Scan kost vanaf €1.500. ClaudeZakelijk is een handelsnaam van Wits SustAInable Solutions B.V. (KvK 99455390).',
  // Domein ook in astro.config.mjs — houd synchroon
  url: 'https://claudezakelijk.nl',
  taal: 'nl-NL',
  // Intro-CTA: Google-afsprakenpagina (agenda van Max, tijdelijk). Later vervangen door die van Camiel.
  // De footer-link "Neem contact op" wijst los hiervan naar /contact.
  introLink: 'https://calendar.app.google/na8Z13rCPAkexaoz9',
  email: 'hallo@claudezakelijk.nl',
  // Juridische gegevens (footer) — bevestigd door Sweder 22 juli 2026:
  // zelfde entiteit als fractionalaiteam.nl (Camiels B.V.).
  juridisch: {
    handelsnaamVan: 'Wits SustAInable Solutions B.V.',
    kvk: '99455390',
    btw: 'NL868999386B01',
    adres: null as string | null,
  },
  linkedin: 'https://www.linkedin.com/in/camielwits/',
} as const;

// Entiteit (Spec B): alles wat het Organization-schema over de onderneming zegt.
// Alleen bevestigde feiten. null of [] betekent: niet in het schema.
// Wijzig hier, nergens anders; src/lib/schema.ts leest dit.
export const entiteit = {
  legalName: site.juridisch.handelsnaamVan,
  kvk: site.juridisch.kvk,
  btw: site.juridisch.btw,
  alternateName: ['Claude Zakelijk', 'claudezakelijk.nl'] as string[],
  beschrijving:
    'Nederlands adviesbureau dat Claude implementeert bij mkb-bedrijven: scan, rollout, training en begeleiding.',
  // Pas op true als de zichtbare onafhankelijkheidszin (site.onafhankelijkheid) live staat.
  onafhankelijk: false,
  // B-D1: alleen invullen na besluit van de eigenaar.
  moederOrganisatie: null as null | { naam: string; url: string },
  adres: null as null | { straat: string; postcode: string; plaats: string },
  // B-D2: alleen sleutels uit `auteurs` met zichtbaar: true.
  oprichters: [] as Array<'camiel'>,
  // B-D6: alleen profielen die bestaan en die de organisatie zelf beheert.
  sameAs: [] as string[],
  // B-14: gevuld zodra Spec A het logo levert. Nooit /icons/ (dat is de Naam-app).
  logo: null as null | { pad: string; breedte: number; hoogte: number },
};

// Onderwerp-entiteiten voor about/knowsAbout. QID's gecontroleerd op 5 oktober 2026
// via de Wikidata-API (Q118876059 = Claude, Q116758847 = Anthropic).
export const onderwerpen = {
  claude: {
    naam: 'Claude',
    beschrijving: 'AI-model en assistent van Anthropic',
    sameAs: [
      'https://www.wikidata.org/wiki/Q118876059',
      'https://nl.wikipedia.org/wiki/Claude_(taalmodel)',
      'https://en.wikipedia.org/wiki/Claude_(AI)',
    ],
  },
  anthropic: {
    naam: 'Anthropic',
    url: 'https://www.anthropic.com',
    sameAs: [
      'https://www.wikidata.org/wiki/Q116758847',
      'https://nl.wikipedia.org/wiki/Anthropic',
      'https://en.wikipedia.org/wiki/Anthropic',
    ],
  },
} as const;

// Hoofdnavigatie (rustige nav): dienst-links staan in de footer.
export const navigatie = [
  { label: 'Claude voor bedrijven', pad: '/gids/claude-voor-mkb' },
  { label: 'Hoe Claude werkt', pad: '/hoe-claude-werkt' },
  { label: 'Cases', pad: '/cases' },
  { label: 'Prijzen', pad: '/prijs' },
  { label: 'Over', pad: '/over' },
  { label: 'Contact', pad: '/contact' },
] as const;

// Dienst-links (footerkolom "Diensten" + funnel).
export const dienstenNavigatie = [
  { label: 'Gratis AI-check', pad: '/ai-enablement-scan' },
  { label: 'Readiness Scan', pad: '/claude-readiness-scan' },
  { label: 'Claude in 30 dagen', pad: '/claude-in-30-dagen' },
  { label: 'Claude Compagnon', pad: '/claude-compagnon' },
  { label: 'Claude-implementatie', pad: '/claude-implementatie' },
  { label: 'Claude-consultant', pad: '/claude-consultant' },
] as const;

// Kennis-kolom in de footer (review 23 juli, B4): geeft de contentpijlers
// sitewide inkomende links; de hubs waren daarvoor onbereikbare eilanden.
export const kennisNavigatie = [
  { label: 'Claude voor bedrijven', pad: '/gids/claude-voor-mkb' },
  { label: 'Prijzen & kosten', pad: '/prijs' },
  { label: 'Compliance & AVG', pad: '/compliance' },
  { label: 'Vergelijkingen', pad: '/vergelijken' },
  { label: 'Branches', pad: '/verticalen' },
  { label: 'Rekentools', pad: '/tools' },
  { label: 'Methodologie', pad: '/methodologie' },
  { label: 'Use-cases', pad: '/use-cases' },
  { label: 'Gidsen', pad: '/gids' },
] as const;

// foto: null = geen bestand in public/team/ → componenten tonen een initialen-fallback.
// linkedin: null = geen (echt) profiel bekend → componenten laten de LinkedIn-knop weg.
export const auteurs = {
  camiel: {
    naam: 'Camiel Wits',
    functie: 'Lead Data & AI Consultant',
    bio: 'Camiel Wits is Lead Data & AI Consultant met meer dan 8 jaar ervaring met data en AI in uiteenlopende sectoren. Hij stuurt AI-projecten van idee naar resultaat, met focus op waarde.',
    foto: '/team/camiel-avatar.jpg',
    linkedin: 'https://www.linkedin.com/in/camielwits/',
    overAnker: '/over#camiel',
    zichtbaar: true,
    schemaAnker: '/over#camiel',
    knowsAbout: ['AI-implementatie', 'Data & AI'] as string[],
    media: [{ serie: 'De Dataloog', url: 'https://open.spotify.com/episode/5pxbh8B6VEwyhJFdB92PCQ' }],
  },
} as const;

export const collectieMeta = {
  verticalen: { label: 'Verticalen', pad: '/verticalen' },
  integraties: { label: 'Integraties', pad: '/integraties' },
  usecases: { label: 'Use cases', pad: '/use-cases' },
  vergelijkingen: { label: 'Vergelijkingen', pad: '/vergelijken' },
  compliance: { label: 'Compliance', pad: '/compliance' },
  training: { label: 'Training', pad: '/training' },
  nieuws: { label: 'Nieuws', pad: '/nieuws' },
  prijs: { label: 'Prijzen', pad: '/prijs' },
} as const;
