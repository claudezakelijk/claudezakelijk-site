import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// -- Existing collections (unchanged) --

const diensten = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/diensten' }),
  schema: z.object({
    titel: z.string(),
    ondertitel: z.string(),
    prijs: z.string(),
    duur: z.string(),
    volgorde: z.number(),
    samenvatting: z.string(),
    pad: z.string(),
    opnemenOpHome: z.boolean().default(true),
    // Checklist op de homepage-kaart (ontwerpronde 2): wat je concreet krijgt.
    // Inhoudelijk 1-op-1 afgeleid van de samenvatting.
    punten: z.array(z.string()).default([]),
    // Alleen voor <title> (titleTag) en de H1 (h1) op de dienstpagina; de homepage-kaart en de prijstabellen blijven `titel` gebruiken.
    titleTag: z.string().optional(),
    h1: z.string().optional(),
  }),
});

const methodologie = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/methodologie' }),
  schema: z.object({
    titel: z.string(),
    samenvatting: z.string(),
    volgorde: z.number(),
    // 1b-redesign (juli 2026): elke bouwsteen krijgt een eigen visuele vorm.
    // Zonder vorm valt methodologie.astro terug op het platte prose-blok.
    kicker: z.string().nullable().default(null),
    vorm: z.enum(['dimensies', 'lagen', 'tweeluik', 'bibliotheek', 'ritme']).nullable().default(null),
    // Hoofd-items van de vorm (dimensie-kaarten, lagen, ritme-kaarten); label
    // is een klein bovenschrift per item (bv. "Maandagochtend" bij ritme).
    punten: z.array(z.object({
      kop: z.string(),
      tekst: z.string().default(''),
      label: z.string().nullable().default(null),
    })).default([]),
    // Gelabelde lijsten (tweeluik-checklists, rollen-pills bij bibliotheek).
    groepen: z.array(z.object({
      label: z.string(),
      items: z.array(z.string()),
    })).default([]),
    // Korte randnotities onder de vorm (bv. "Wat het je oplevert").
    notities: z.array(z.object({
      kop: z.string().nullable().default(null),
      tekst: z.string(),
    })).default([]),
    grootGetal: z.string().nullable().default(null),
    grootLabel: z.string().nullable().default(null),
  }),
});

const cases = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cases' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Alleen voor <title> en meta description; H1 en intro blijven title/description.
    // Titel max 48 tekens: met " | ClaudeZakelijk" erachter is dat 65.
    titleTag: z.string().max(48).optional(),
    metaDescription: z.string().max(158).optional(),
    sector: z.string(),
    duration: z.string(),
    tools: z.array(z.string()),
    results: z.array(z.string()),
    publishDate: z.date(),
    // -- MKB-gerichte "resultaat-eerst" velden (optioneel: bestaande content blijft bouwen) --
    kernwinst: z.string().optional(),
    klantprofiel: z.string().optional(),
    voorJou: z.string().optional(),
  }),
});

// -- Shared schema for SEO page collections --

// Loopt 1-op-1 met wat SchemaInjector.astro daadwerkelijk rendert (12 juli 2026).
// NB: 'HowTo' rendert alleen als een pagina howToSteps-data meegeeft; content-
// collecties hebben geen steps-veld, dus HowTo hoort niet in content-frontmatter.
const schemaTypeEnum = z.enum([
  'Article', 'Service', 'FAQPage', 'HowTo', 'BreadcrumbList',
]);

const baseSeoFields = {
  title: z.string(),
  titleTag: z.string().max(70),
  metaDescription: z.string().max(160),
  h1: z.string(),
  targetKeywords: z.array(z.string()),
  wordCountTarget: z.number(),
  priority: z.number().min(1).max(5),
  tier: z.number().min(0).max(9),
  cases: z.array(z.string()).default([]),
  internalLinks: z.array(z.string()).default([]),
  schemaTypes: z.array(schemaTypeEnum),
  author: z.enum(['camiel']).default('camiel'),
  competitors: z.array(z.string()).default([]),
  status: z.enum(['spec', 'draft', 'review', 'published']).default('spec'),
  publishDate: z.date().nullable().default(null),
  updatedDate: z.date().nullable().default(null),
  changelogLine: z.string().nullable().default(null),
  // Optionele menselijke leesronde (spec E, R-9): wie las het artikel en wanneer.
  // Leeg (null) betekent geen regel "nagelezen door" in ArtikelMeta.
  reviewedBy: z.string().nullable().default(null),
  reviewedDate: z.date().nullable().default(null),
  // Optionele disclaimer onder de datumregel, bv. bij AVG-, btw- of AI Act-artikelen.
  // Enum (ruling R2): AdviesDisclaimer.astro zet de waarde om in de zichtbare tekst.
  disclaimer: z.enum(['juridisch', 'fiscaal', 'juridisch-fiscaal']).nullable().default(null),
  faq: z.array(z.object({
    question: z.string(),
    answer: z.string(),
  })).default([]),
  // Kort antwoord (AEO): 40-60 woorden die de hoofdvraag van de pagina direct
  // beantwoorden, gerenderd als blok direct onder de H1. Dit is de passage die
  // AI Overviews en LLM's extraheren; zonder dit veld verschijnt er geen blok.
  kortAntwoord: z.string().nullable().default(null),
  // Zichtbare bronnen (review 23 juli, B6): gerenderd als "Bronnen"-blok onder
  // het artikel. E-E-A-T/CITE vereisen zichtbare, gelinkte, gedateerde bronnen —
  // bronnen alleen in HTML-comments ziet niemand.
  bronnen: z.array(z.object({
    titel: z.string(),
    url: z.string().url().nullable().default(null),
    geraadpleegd: z.string().nullable().default(null),
  })).default([]),
};

// Een gepubliceerd artikel zonder publishDate toont geen datum en krijgt geen
// datePublished in het schema. Daarom faalt de build als die combinatie voorkomt.
// De publishDate bepaalt ook wanneer het artikel live gaat (src/lib/publicatie.mjs).
// De verplichte reviewedBy vanaf 12 oktober 2026 is op 22 oktober 2026 weggehaald
// (besluit Max): de leesronde is optioneel, reviewedBy mag null blijven.
const seoSchema = <T extends z.ZodRawShape>(extra: T) =>
  z.object({ ...baseSeoFields, ...extra }).refine(
    (d) => d.status !== 'published' || d.publishDate !== null,
    { message: "status 'published' vereist een publishDate", path: ['publishDate'] },
  );

// -- New SEO collections --

const verticalen = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/verticalen' }),
  schema: seoSchema({
    areaServed: z.string().default('NL'),
    brancheOrganisatie: z.string().nullable().default(null),
  }),
});

const integraties = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/integraties' }),
  schema: seoSchema({
    softwareName: z.string(),
    softwareUrl: z.string().url(),
  }),
});

const usecases = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/usecases' }),
  schema: seoSchema({
  }),
});

const vergelijkingen = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/vergelijkingen' }),
  schema: seoSchema({
  }),
});

const compliance = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/compliance' }),
  schema: seoSchema({
    deadline: z.date().nullable().default(null),
    hasTemplate: z.boolean().default(false),
  }),
});

const training = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/training' }),
  schema: seoSchema({
  }),
});

const nieuws = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/nieuws' }),
  schema: seoSchema({
    isRecurring: z.boolean().default(false),
  }),
});

const prijs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/prijs' }),
  schema: seoSchema({
    hasCalculator: z.boolean().default(false),
  }),
});

export const collections = {
  diensten, methodologie, cases,
  verticalen, integraties, usecases, vergelijkingen,
  compliance, training, nieuws, prijs,
};
