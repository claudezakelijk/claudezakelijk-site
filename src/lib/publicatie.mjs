// Eén regel voor "staat dit artikel live" (besluit Max, 22 oktober 2026: inplannen op datum).
//
// Een entry is live als status 'published' is EN publishDate op of voor vandaag ligt.
// "Vandaag" is de bouwdatum in Europe/Amsterdam. Een published entry met een datum in de
// toekomst is ingepland: niet gebouwd, niet in de sitemap, telt niet mee voor een hub en is
// nog geen geldig linkdoel. De dagelijkse geplande run in .github/workflows/deploy.yml zet
// hem op zijn datum live, zonder push.
//
// Gebruikt door src/lib/content.ts (de build), src/data/indexering.mjs (lege hubs) en
// scripts/indexnow.mjs. scripts/quality-gate.py heeft dezelfde regel in Python: pas die
// mee aan als deze verandert.
//
// BOUWDATUM=YYYY-MM-DD overschrijft vandaag, voor tests en om een dag vooruit te kijken.

/** Vandaag als 'YYYY-MM-DD' in Europe/Amsterdam, of de waarde van BOUWDATUM. */
export function vandaag() {
  const vast = process.env.BOUWDATUM;
  if (vast) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(vast)) throw new Error(`BOUWDATUM moet YYYY-MM-DD zijn, kreeg '${vast}'`);
    return vast;
  }
  // en-CA geeft het datumformaat YYYY-MM-DD.
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Amsterdam', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
}

/** Date (uit het content-schema, UTC-middernacht) of string naar 'YYYY-MM-DD'; null blijft null. */
export function datumTekst(d) {
  if (d === null || d === undefined) return null;
  if (d instanceof Date) return d.toISOString().slice(0, 10);
  const m = String(d).match(/^(\d{4}-\d{2}-\d{2})/);
  return m ? m[1] : null;
}

/** De regel zelf. status en publishDate zoals in de frontmatter. */
export function isLive({ status, publishDate }, dag = vandaag()) {
  const datum = datumTekst(publishDate);
  return status === 'published' && datum !== null && datum <= dag;
}

/** Published met een datum na vandaag: ingepland. */
export function isIngepland({ status, publishDate }, dag = vandaag()) {
  const datum = datumTekst(publishDate);
  return status === 'published' && datum !== null && datum > dag;
}

/** status en publishDate uit de ruwe tekst van een markdown-bestand, zonder YAML-parser. */
export function leesPublicatie(tekst) {
  const fm = tekst.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
  const status = fm.match(/^status:\s*["']?([a-z]+)["']?\s*$/m)?.[1] ?? null;
  const publishDate = fm.match(/^publishDate:\s*["']?(\d{4}-\d{2}-\d{2})/m)?.[1] ?? null;
  return { status, publishDate };
}
