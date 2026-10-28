# implementeren-ai-site

Marketingsite voor Implementeren.ai (implementeren.ai), een Nederlandse Claude-consultancy voor het MKB. Statisch gegenereerd met Astro, gehost op Cloudflare Pages. Het oude domein claudezakelijk.nl stuurt met een 301 door naar implementeren.ai.

## Ontwikkelen

```bash
npm ci
npm run dev
```

Server op http://localhost:4321.

## Bouwen

```bash
npm run build
npm run preview
```

## Werkwijze

- Werk op een eigen branch en open een pull request naar `main`. Niemand pusht rechtstreeks naar `main`.
- Elke PR heeft 2 goedkeuringen nodig, waarvan minstens een van een code owner. De code owners zijn Max en Camiel (`.github/CODEOWNERS`).
- Cloudflare bouwt per PR een preview. Zet de link in de PR, zodat de reviewers de echte pagina zien.
- Na de merge deployt GitHub Actions `main` naar implementeren.ai (`.github/workflows/deploy.yml`).
- Noodprocedure: alleen als de live site kapot is en er niet genoeg reviewers beschikbaar zijn, mag een org-admin de regel tijdelijk omzeilen. Zet een bypass voor org-admins op de ruleset, merge de PR, haal de bypass meteen weer weg en noteer in de PR waarom. De commando's staan in `CLAUDE.md`.

## Structuur

- `src/pages/`: routes, een bestand per pagina. Elke route staat ook in `src/data/public-pages.json`.
- `src/content/`: alle copy in markdown, met schemas in `src/content.config.ts`.
- `src/components/`: herbruikbare blokken.
- `src/data/indexering.mjs`: wat Google mag indexeren en wat in de sitemap komt.
- `src/site.ts`: centrale config (merknaam, intro-link, e-mail).
