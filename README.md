# claudezakelijk-site

Marketingsite voor ClaudeZakelijk (claudezakelijk.nl), een Nederlandse Claude-consultancy voor het MKB. Statisch gegenereerd met Astro, gehost op Cloudflare Pages.

## Ontwikkelen

```bash
npm install
npm run dev
```

Server op http://localhost:4321.

## Bouwen

```bash
npm run build
npm run preview
```

## Werkwijze

- Werk op een eigen branch en open een pull request naar `main`.
- Een PR gaat pas live na goedkeuring van Max én Camiel.
- Cloudflare bouwt per PR een preview; zet de link in de PR.
- Na de merge deployt GitHub Actions `main` naar claudezakelijk.nl.

## Structuur

- `src/pages/` — routes, één bestand per pagina. Elke route staat ook in `src/data/public-pages.json`.
- `src/content/` — alle copy in markdown, met schemas in `src/content.config.ts`.
- `src/components/` — herbruikbare blokken.
- `src/data/indexering.mjs` — wat Google mag indexeren en wat in de sitemap komt.
- `src/site.ts` — centrale config (merknaam, Cal-link, e-mail).
