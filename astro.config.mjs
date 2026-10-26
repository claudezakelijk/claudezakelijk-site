import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// Wat in de sitemap mag staat in src/data/indexering.mjs, samen met de noindex-beslissing
// die BasisLayout gebruikt en de edge-header uit functions/_middleware.js. Bewust één
// bron: sitemap, robots-metatag en header mogen niet uit elkaar lopen.
import { inSitemap, collectieRoutes, isIndexeerbaarPad } from './src/data/indexering.mjs';
import rehypeTabelCaption from './src/lib/rehype-tabel-caption.mjs';

import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// lastmod voor URL's met een datum in de frontmatter: artikelen krijgen updatedDate
// (anders publishDate), cases hun publishDate. Pagina's zonder datum blijven zonder
// lastmod: een verzonnen datum is erger dan geen. De routes hieronder lopen gelijk
// met de [slug]-pagina's in src/pages.
const DATUM_ROUTES = collectieRoutes;

function leesLastmod() {
  const datums = new Map();
  const veld = (tekst, naam) =>
    tekst.match(new RegExp(`^${naam}:\\s*["']?(\\d{4}-\\d{2}-\\d{2})`, 'm'))?.[1];
  for (const [collectie, route] of Object.entries(DATUM_ROUTES)) {
    const dir = join('src/content', collectie);
    for (const bestand of readdirSync(dir)) {
      if (!bestand.endsWith('.md')) continue;
      const tekst = readFileSync(join(dir, bestand), 'utf-8');
      const datum = veld(tekst, 'updatedDate') ?? veld(tekst, 'publishDate');
      if (datum) datums.set(route + bestand.replace(/\.md$/, ''), new Date(datum).toISOString());
    }
  }
  // .astro-pagina's met een eigen datum: const bijgewerkt = '2026-10-02' of new Date('2026-10-02').
  // Een map of bestand dat niet (meer) bestaat wordt overgeslagen, zodat een verplaatste
  // gids de build niet breekt en de nieuwe gids vanzelf meedoet.
  for (const map of ['gids', 'tools']) {
    const dir = join('src/pages', map);
    if (!existsSync(dir)) continue;
    for (const bestand of readdirSync(dir)) {
      if (!bestand.endsWith('.astro') || bestand === 'index.astro') continue;
      const tekst = readFileSync(join(dir, bestand), 'utf-8');
      const datum = tekst.match(/const bijgewerkt\s*=\s*(?:new Date\()?['"](\d{4}-\d{2}-\d{2})['"]/)?.[1];
      if (datum) datums.set(`/${map}/${bestand.replace(/\.astro$/, '')}`, new Date(datum).toISOString());
    }
  }
  return datums;
}

const lastmodPerPad = leesLastmod();

// HTML-comments in markdown (zoals de MENS-vragen voor de redactie) horen niet in de
// paginabron van de live site. Ze blijven in het bronbestand staan.
function stripHtmlComments() {
  const schoon = (node) => {
    if (!node.children) return;
    node.children = node.children.filter(
      (kind) => !(kind.type === 'html' && /^<!--[\s\S]*-->$/.test(kind.value.trim())),
    );
    node.children.forEach(schoon);
  };
  return schoon;
}

export default defineConfig({
  // Domein ook in src/site.ts — houd synchroon
  site: 'https://claudezakelijk.nl',
  trailingSlash: 'never',

  build: {
    format: 'file',
  },

  compressHTML: true,

  // Astro 7 rendert markdown standaard met Sätteri; de remark/rehype-plugins hierboven
  // draaien alleen op de unified()-pipeline uit @astrojs/markdown-remark.
  markdown: {
    processor: unified({
      remarkPlugins: [stripHtmlComments],
      rehypePlugins: [rehypeTabelCaption],
    }),
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    // Alleen de zakelijke site, zonder lege hubs. Deposits komen er nooit in.
    sitemap({
      filter: (page) => inSitemap(page),
      serialize(item) {
        const url = item.url === 'https://claudezakelijk.nl' ? 'https://claudezakelijk.nl/' : item.url;
        const pad = new URL(url).pathname.replace(/\/$/, '');
        const lastmod = lastmodPerPad.get(pad);
        return lastmod ? { ...item, url, lastmod } : { ...item, url };
      },
    }),
    // @astrojs/sitemap schrijft bij trailingSlash 'never' de homepage als <loc>https://claudezakelijk.nl</loc>
    // (write-sitemap.js strips de slash na serialize). De canonical van / heeft wel een slash,
    // dus zet het sitemap-bestand er na het schrijven op gelijk. Staat na sitemap() in de lijst.
    {
      name: 'sitemap-homepage-slash',
      hooks: {
        'astro:build:done': ({ dir, logger }) => {
          const map = fileURLToPath(dir);
          const bestanden = readdirSync(map).filter((f) => /^sitemap-.+\.xml$/.test(f) && f !== 'sitemap-index.xml');
          const zonder = '<loc>https://claudezakelijk.nl</loc>';
          const met = '<loc>https://claudezakelijk.nl/</loc>';
          let gevonden = false;
          for (const f of bestanden) {
            const xml = readFileSync(join(map, f), 'utf-8');
            if (xml.includes(zonder)) {
              writeFileSync(join(map, f), xml.replace(zonder, met));
              gevonden = true;
            } else if (xml.includes(met)) {
              gevonden = true;
            }
          }
          if (!gevonden) {
            logger.warn(`homepage-<loc> niet gevonden in ${bestanden.length} sitemap-bestand(en) in dist; controleer de sitemap-integratie`);
          }
        },
      },
    },
    // Bouwnotities in HTML-comments (layouts, componenten, pagina's) horen niet in de bron van
    // zakelijke pagina's (H4, Spec D H-A4). Alleen indexeerbare pagina's; privé-pagina's blijven
    // zoals ze zijn. Comments in <script>, <style>, <pre> en <textarea> en Cloudflare's
    // <!--email_off--> blijven staan. scripts/check-dist.mjs controleert het resultaat.
    {
      name: 'zakelijk-html-comments-weg',
      hooks: {
        'astro:build:done': ({ dir, logger }) => {
          const map = fileURLToPath(dir);
          const COMMENT = /(<(script|style|pre|textarea)\b[\s\S]*?<\/\2\s*>)|<!--(?!\/?email_off-->)[\s\S]*?-->/gi;
          let paginas = 0;
          let weg = 0;
          const loop = (sub) => {
            for (const item of readdirSync(join(map, sub), { withFileTypes: true })) {
              const rel = sub ? `${sub}/${item.name}` : item.name;
              if (item.isDirectory()) { loop(rel); continue; }
              if (!item.name.endsWith('.html')) continue;
              const pad = ('/' + rel).replace(/\.html$/, '').replace(/\/index$/, '') || '/';
              if (!isIndexeerbaarPad(pad)) continue;
              const html = readFileSync(join(map, rel), 'utf-8');
              let n = 0;
              const schoon = html.replace(COMMENT, (m, blok) => (blok ? m : (n++, '')));
              if (n) { writeFileSync(join(map, rel), schoon); paginas++; weg += n; }
            }
          };
          loop('');
          logger.info(`${weg} HTML-comment(s) verwijderd uit ${paginas} zakelijke pagina('s)`);
        },
      },
    },
  ],
});
