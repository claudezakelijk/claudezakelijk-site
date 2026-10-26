import { getCollection, type CollectionEntry } from 'astro:content';
import { isLive } from './publicatie.mjs';

/**
 * Collecties die het `status`-veld uit baseSeoFields dragen
 * (zie src/content.config.ts). Collecties zonder status-veld
 * (diensten, methodologie, cases) vallen hier bewust buiten.
 */
export type StatusCollectie =
  | 'verticalen'
  | 'integraties'
  | 'usecases'
  | 'vergelijkingen'
  | 'compliance'
  | 'training'
  | 'nieuws'
  | 'prijs';

/**
 * Alleen live entries horen in de build (en dus in de sitemap): status 'published' en een
 * publishDate op of voor de bouwdatum. Een ingeplande entry (datum in de toekomst) wacht op
 * de dagelijkse build van zijn datum. De regel staat in src/lib/publicatie.mjs.
 */
export function isPublished<C extends StatusCollectie>(entry: CollectionEntry<C>): boolean {
  return isLive(entry.data);
}

/** Haalt een collectie op en filtert op live entries (zie isPublished). */
export async function getPublished<C extends StatusCollectie>(
  collection: C,
): Promise<CollectionEntry<C>[]> {
  return (await getCollection(collection)).filter((entry) => isPublished(entry));
}
