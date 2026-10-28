// Eén bron voor alle JSON-LD (Spec B). SeoMeta.astro roept bouwGraph() aan en
// schrijft per indexeerbare pagina precies één <script type="application/ld+json">.
// Regel: niets in de markup dat de pagina niet zichtbaar toont (datum, auteur,
// broodkruimel, prijs, persoon). Gecontroleerd door scripts/schema-check.mjs.
import { site, auteurs, entiteit, onderwerpen } from '../site';

export type AuteurKey = keyof typeof auteurs;
export type Crumb = { name: string; url: string };
export type PaginaType = 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage';
export type Node = Record<string, unknown>;

export type SchemaInvoer = {
  paginaType?: PaginaType;
  /** Dezelfde array die de zichtbare <Broodkruimel> rendert. Alleen meegeven als die zichtbaar is. */
  breadcrumbs?: Crumb[];
  /** Extra nodes: faqNode, dienstNode, webAppNode, itemListNode. */
  nodes?: Node[];
  /** Personen die zichtbaar op de pagina staan. */
  personen?: AuteurKey[];
  /** @id van het hoofdonderwerp van de pagina (mainEntity). */
  hoofdonderwerp?: string;
  /** false = geen about: Claude op de WebPage (bv. contact). */
  overClaude?: boolean;
};

export type ArtikelInvoer = {
  /** De zichtbare H1. */
  headline: string;
  /** De zichtbare publicatiedatum. */
  gepubliceerd: Date | string;
  /** De zichtbare bijgewerkt-datum, anders null. */
  bijgewerkt?: Date | string | null;
  /** 'organisatie' zolang er geen zichtbare byline is. */
  auteur: AuteurKey | 'organisatie';
  /** Sectielabel, bv. 'Prijzen'. Wordt ook article:section. */
  sectie: string;
};

export const ID = {
  organisatie: `${site.url}/#organisatie`,
  website: `${site.url}/#website`,
  logo: `${site.url}/#logo`,
  claude: `${site.url}/#claude`,
  anthropic: `${site.url}/#anthropic`,
} as const;

export const ref = (id: string) => ({ '@id': id });
export const canonicalUrl = (pad: string) => new URL(pad, site.url).toString();
export const persoonId = (k: AuteurKey) => `${site.url}${auteurs[k].schemaAnker}`;
export const dienstId = (pad: string) => `${canonicalUrl(pad)}#dienst`;
export const lijstId = (pad: string) => `${canonicalUrl(pad)}#lijst`;
export const toolId = (pad: string) => `${canonicalUrl(pad)}#tool`;

const LAND_NL = { '@type': 'Country', name: 'Nederland', identifier: 'NL' };

const AMS = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Amsterdam',
  year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hourCycle: 'h23',
});
function amsDeel(t: number): { dag: string; uur: number } {
  const d: Record<string, string> = {};
  for (const p of AMS.formatToParts(new Date(t))) d[p.type] = p.value;
  return { dag: `${d.year}-${d.month}-${d.day}`, uur: Number(d.hour) };
}

/**
 * Datum als middernacht Amsterdamse tijd met de offset die op dat moment geldt (S-19),
 * bv. 2026-10-02T00:00:00+02:00. Een string wordt gelezen als kalenderdag (eerste 10 tekens),
 * een Date op zijn Europe/Amsterdam-kalenderdag, dus onafhankelijk van de tijdzone van de machine.
 */
export function isoNl(datum: Date | string): string {
  let dag: string;
  if (typeof datum === 'string') {
    dag = datum.slice(0, 10);
  } else {
    if (Number.isNaN(datum.getTime())) throw new Error('isoNl: ongeldige Date');
    dag = amsDeel(datum.getTime()).dag;
  }
  const m = dag.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) throw new Error(`isoNl: geen datum in ${JSON.stringify(datum)}`);
  const utcMiddernacht = Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  for (const uren of [1, 2]) {
    const { dag: d, uur } = amsDeel(utcMiddernacht - uren * 3_600_000);
    if (d === dag && uur === 0) return `${dag}T00:00:00+0${uren}:00`;
  }
  throw new Error(`isoNl: geen geldige Amsterdamse middernacht voor ${dag}`);
}

// ---- Deelafbeeldingen (B-12 zet OG_GEGENEREERD op true) ----
export const OG_GEGENEREERD = false;
export const OG_STANDAARD = { url: `${site.url}/og-implementeren.png`, breedte: 2400, hoogte: 1260 };
export const OG_FORMATEN = { og: [1200, 630], '16x9': [1200, 675], '4x3': [1200, 900], '1x1': [1200, 1200] } as const;
export function ogSlug(pad: string): string {
  const p = pad.replace(/^\/+|\/+$/g, '');
  return p === '' ? 'home' : p.replace(/\//g, '--');
}
export function ogAfbeelding(pad: string, formaat: keyof typeof OG_FORMATEN = 'og'): string {
  return `${site.url}/og/${ogSlug(pad)}${formaat === 'og' ? '' : `-${formaat}`}.png`;
}
export function artikelAfbeeldingen(pad: string): string[] {
  if (!OG_GEGENEREERD) return [OG_STANDAARD.url];
  return (['16x9', '4x3', '1x1'] as const).map((f) => ogAfbeelding(pad, f));
}

// ---- Sitebrede nodes ----
export function organisatieNode(): Node {
  const e = entiteit;
  return {
    // Geen ProfessionalService zonder zichtbaar adres (LocalBusiness verwacht address).
    '@type': e.adres ? ['Organization', 'ProfessionalService'] : 'Organization',
    '@id': ID.organisatie,
    name: site.naam,
    alternateName: e.alternateName,
    legalName: e.legalName,
    url: `${site.url}/`,
    description: e.onafhankelijk ? `${e.beschrijving} ${site.onafhankelijkheid}` : e.beschrijving,
    email: site.email,
    vatID: e.btw,
    identifier: { '@type': 'PropertyValue', propertyID: 'KvK-nummer', value: e.kvk },
    areaServed: LAND_NL,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: site.email,
      url: `${site.url}/contact`,
      availableLanguage: ['nl'],
      areaServed: 'NL',
    },
    knowsAbout: [ref(ID.claude), ref(ID.anthropic), 'AI-implementatie', 'AVG', 'EU AI Act'],
    ...(e.logo && {
      logo: {
        '@type': 'ImageObject',
        '@id': ID.logo,
        url: new URL(e.logo.pad, site.url).toString(),
        contentUrl: new URL(e.logo.pad, site.url).toString(),
        width: e.logo.breedte,
        height: e.logo.hoogte,
        caption: site.naam,
      },
    }),
    ...(e.sameAs.length > 0 && { sameAs: e.sameAs }),
    ...(e.moederOrganisatie && {
      parentOrganization: { '@type': 'Organization', name: e.moederOrganisatie.naam, url: e.moederOrganisatie.url },
    }),
    ...(e.adres && {
      address: {
        '@type': 'PostalAddress',
        streetAddress: e.adres.straat,
        postalCode: e.adres.postcode,
        addressLocality: e.adres.plaats,
        addressCountry: 'NL',
      },
    }),
    ...(e.oprichters.length > 0 && { founder: e.oprichters.map((k) => ref(zichtbarePersoonId(k))) }),
  };
}

export function websiteNode(): Node {
  return {
    '@type': 'WebSite',
    '@id': ID.website,
    url: `${site.url}/`,
    name: site.naam,
    alternateName: entiteit.alternateName,
    inLanguage: site.taal,
    publisher: ref(ID.organisatie),
  };
}

export function onderwerpNodes(): Node[] {
  return [
    { '@type': 'Thing', '@id': ID.claude, name: onderwerpen.claude.naam, description: onderwerpen.claude.beschrijving, sameAs: [...onderwerpen.claude.sameAs] },
    { '@type': 'Organization', '@id': ID.anthropic, name: onderwerpen.anthropic.naam, url: onderwerpen.anthropic.url, sameAs: [...onderwerpen.anthropic.sameAs] },
  ];
}

/** Guard: alleen personen met auteurs.<key>.zichtbaar mogen in output (founder, author, Person-node). */
export function zichtbarePersoonId(k: AuteurKey): string {
  if (!auteurs[k].zichtbaar) {
    throw new Error(`Person-node voor '${k}' gevraagd, maar die persoon staat niet zichtbaar op /over (Spec B, B-18).`);
  }
  return persoonId(k);
}

export function persoonNode(k: AuteurKey): Node {
  const a = auteurs[k];
  zichtbarePersoonId(k);
  return {
    '@type': 'Person',
    '@id': persoonId(k),
    name: a.naam,
    url: persoonId(k),
    jobTitle: a.functie,
    description: a.bio,
    ...(a.foto && { image: new URL(a.foto, site.url).toString() }),
    ...(a.linkedin && { sameAs: [a.linkedin] }),
    worksFor: ref(ID.organisatie),
    knowsAbout: [ref(ID.claude), ...a.knowsAbout],
    ...(a.media.length > 0 && {
      subjectOf: a.media.map((m) => ({
        '@type': 'PodcastEpisode',
        url: m.url,
        partOfSeries: { '@type': 'PodcastSeries', name: m.serie },
      })),
    }),
  };
}

// ---- Paginanodes ----
export function breadcrumbNode(pad: string, crumbs: Crumb[]): Node {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrl(pad)}#broodkruimel`,
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: canonicalUrl(c.url),
    })),
  };
}

export function artikelNode(pad: string, a: ArtikelInvoer, beschrijving: string): Node {
  const url = canonicalUrl(pad);
  return {
    '@type': 'Article',
    '@id': `${url}#artikel`,
    headline: a.headline.slice(0, 110),
    description: beschrijving,
    url,
    mainEntityOfPage: ref(url),
    isPartOf: ref(ID.website),
    datePublished: isoNl(a.gepubliceerd),
    dateModified: isoNl(a.bijgewerkt ?? a.gepubliceerd),
    inLanguage: site.taal,
    author: ref(a.auteur === 'organisatie' ? ID.organisatie : zichtbarePersoonId(a.auteur)),
    publisher: ref(ID.organisatie),
    image: artikelAfbeeldingen(pad),
    articleSection: a.sectie,
    about: ref(ID.claude),
  };
}

export function faqNode(pad: string, items: Array<{ question: string; answer: string }>): Node {
  return {
    '@type': 'FAQPage',
    '@id': `${canonicalUrl(pad)}#faq`,
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: { '@type': 'Answer', text: it.answer },
    })),
  };
}

export type Aanbod = { naam: string; prijsTekst: string; url: string; dienstPad?: string };

/** "Vanaf €1.500 per maand" -> { bedrag: 1500, perMaand: true }; "Gratis" -> { bedrag: 0 }. */
export function vanafBedrag(tekst: string): { bedrag: number; perMaand: boolean } {
  if (/gratis/i.test(tekst)) return { bedrag: 0, perMaand: false };
  const m = tekst.match(/€\s?([\d.]+)/);
  if (!m) throw new Error(`Geen bedrag gevonden in prijstekst "${tekst}"`);
  return { bedrag: Number(m[1].replace(/\./g, '')), perMaand: /per maand/i.test(tekst) };
}

export function offerNode(a: Aanbod): Node {
  const { bedrag, perMaand } = vanafBedrag(a.prijsTekst);
  const basis = {
    '@type': 'Offer',
    name: a.naam,
    url: canonicalUrl(a.url),
    priceCurrency: 'EUR',
    ...(a.dienstPad && { itemOffered: ref(dienstId(a.dienstPad)) }),
  };
  if (bedrag === 0) return { ...basis, price: '0' };
  return {
    ...basis,
    priceSpecification: perMaand
      ? { '@type': 'UnitPriceSpecification', minPrice: bedrag, priceCurrency: 'EUR', unitCode: 'MON', unitText: 'per maand' }
      : { '@type': 'PriceSpecification', minPrice: bedrag, priceCurrency: 'EUR' },
  };
}

export function dienstNode(o: {
  pad: string;
  naam: string;
  beschrijving: string;
  serviceType: string;
  /** Eén zichtbare prijs op deze pagina. */
  aanbod?: Aanbod;
  /** Zichtbare prijstabel met meerdere stappen. */
  catalogus?: Aanbod[];
}): Node {
  return {
    '@type': 'Service',
    '@id': dienstId(o.pad),
    name: o.naam,
    description: o.beschrijving,
    serviceType: o.serviceType,
    url: canonicalUrl(o.pad),
    provider: ref(ID.organisatie),
    areaServed: LAND_NL,
    audience: { '@type': 'BusinessAudience', name: 'Mkb-bedrijven in Nederland' },
    ...(o.aanbod && { offers: offerNode(o.aanbod) }),
    ...(o.catalogus && {
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `${o.naam}: stappen en prijzen`,
        itemListElement: o.catalogus.map(offerNode),
      },
    }),
  };
}

export function webAppNode(o: { pad: string; naam: string; beschrijving: string; gecheckt?: string }): Node {
  return {
    '@type': 'WebApplication',
    '@id': toolId(o.pad),
    name: o.naam,
    description: o.beschrijving,
    url: canonicalUrl(o.pad),
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript',
    inLanguage: site.taal,
    // Geen price 0 / isAccessibleForFree: de rekentool-pagina's zeggen zelf niet zichtbaar "gratis" (S4).
    publisher: ref(ID.organisatie),
    about: ref(ID.claude),
    ...(o.gecheckt && { dateModified: isoNl(o.gecheckt) }),
  };
}

export function itemListNode(pad: string, items: Array<{ url: string; naam: string }>): Node {
  return {
    '@type': 'ItemList',
    '@id': lijstId(pad),
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: canonicalUrl(it.url),
      name: it.naam,
    })),
  };
}

/** Voor de content-layouts: zet frontmatter om naar SchemaInvoer + ArtikelInvoer. */
export function seoVoorEntry(o: {
  pad: string;
  sectie: string;
  breadcrumbs: Crumb[];
  serviceType?: string;
  data: {
    title: string;
    h1: string;
    metaDescription: string;
    schemaTypes: readonly string[];
    author: AuteurKey;
    publishDate: Date | null;
    updatedDate: Date | null;
    faq: Array<{ question: string; answer: string }>;
  };
}): { schema: SchemaInvoer; artikel?: ArtikelInvoer } {
  const typen = new Set(o.data.schemaTypes);
  for (const t of typen) {
    if (!['Article', 'Service', 'FAQPage', 'BreadcrumbList'].includes(t)) {
      throw new Error(`schemaType '${t}' wordt niet ondersteund (${o.pad}). Zie Spec B.`);
    }
  }
  const nodes: Node[] = [];
  if (typen.has('Service')) {
    nodes.push(dienstNode({ pad: o.pad, naam: o.data.title, beschrijving: o.data.metaDescription, serviceType: o.serviceType ?? 'Claude-implementatie' }));
  }
  if (typen.has('FAQPage') && o.data.faq.length > 0) nodes.push(faqNode(o.pad, o.data.faq));
  // Besluit M7: een auteur met zichtbaar: false wordt nooit genoemd. ArtikelMeta toont dan
  // "Implementeren.ai" en AuthorBio niets, dus het schema noemt de organisatie.
  const zichtbareAuteur: AuteurKey | null = auteurs[o.data.author].zichtbaar ? o.data.author : null;
  const artikel =
    typen.has('Article') && o.data.publishDate
      ? { headline: o.data.h1, gepubliceerd: o.data.publishDate, bijgewerkt: o.data.updatedDate, auteur: zichtbareAuteur ?? ('organisatie' as const), sectie: o.sectie }
      : undefined;
  return {
    schema: {
      breadcrumbs: typen.has('BreadcrumbList') ? o.breadcrumbs : undefined,
      nodes,
      // AuthorBio staat op elke content-layout zichtbaar onderaan (alleen voor een zichtbare auteur).
      personen: zichtbareAuteur ? [zichtbareAuteur] : [],
    },
    artikel,
  };
}

export function bouwGraph(o: { pad: string; naam: string; beschrijving: string; schema?: SchemaInvoer; artikel?: ArtikelInvoer }) {
  const s = o.schema ?? {};
  const url = canonicalUrl(o.pad);
  const personen = new Set<AuteurKey>(s.personen ?? []);
  if (o.artikel && o.artikel.auteur !== 'organisatie') personen.add(o.artikel.auteur);
  const heeftKruimel = (s.breadcrumbs?.length ?? 0) > 0;
  const hoofd = s.hoofdonderwerp ?? (o.artikel ? `${url}#artikel` : undefined);
  const pagina: Node = {
    '@type': s.paginaType ?? 'WebPage',
    '@id': url,
    url,
    name: o.naam,
    description: o.beschrijving,
    inLanguage: site.taal,
    isPartOf: ref(ID.website),
    publisher: ref(ID.organisatie),
    ...(s.overClaude !== false && { about: ref(ID.claude) }),
    ...(heeftKruimel && { breadcrumb: ref(`${url}#broodkruimel`) }),
    ...(hoofd && { mainEntity: ref(hoofd) }),
    ...(o.artikel && {
      datePublished: isoNl(o.artikel.gepubliceerd),
      dateModified: isoNl(o.artikel.bijgewerkt ?? o.artikel.gepubliceerd),
    }),
  };
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organisatieNode(),
      websiteNode(),
      ...onderwerpNodes(),
      pagina,
      ...(heeftKruimel ? [breadcrumbNode(o.pad, s.breadcrumbs!)] : []),
      ...(o.artikel ? [artikelNode(o.pad, o.artikel, o.beschrijving)] : []),
      ...(s.nodes ?? []),
      ...[...personen].map(persoonNode),
    ],
  };
}
