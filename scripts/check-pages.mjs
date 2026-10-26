// Guardrail: elke pagina-route moet bewust in src/data/public-pages.json staan. Een nieuwe
// route die daar niet in staat breekt de build, zodat er nooit per ongeluk een pagina live
// gaat die niemand heeft ingedeeld. Dynamische collectie-templates ([slug]) en de vaste
// routes / en /404 hoeven er niet in.
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, relative, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');

// Portable recursive walk (no Node 22 fs.globSync dependency).
function walk(dir) {
  const out = [];
  for (const ent of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, ent.name);
    if (ent.isDirectory()) out.push(...walk(full));
    else if (ent.isFile() && ent.name.endsWith('.astro')) out.push(full);
  }
  return out;
}

const publicSet = new Set(JSON.parse(readFileSync(resolve(root, 'src/data/public-pages.json'), 'utf8')));
const reserved = new Set(['/', '/404']);

const files = walk(resolve(root, 'src/pages')).map((f) => relative(root, f));

function toRoute(file) {
  let r = '/' + file.replace(/^src\/pages\//, '').replace(/\.astro$/, '');
  r = r.replace(/\/index$/, '');
  return r === '' ? '/' : r;
}

const violations = [];
for (const f of files) {
  const route = toRoute(f);
  if (reserved.has(route) || route.includes('[')) continue;
  if (!publicSet.has(route)) violations.push({ route, file: f });
}

if (violations.length) {
  console.error('\n✗ check-pages: page route(s) missing from src/data/public-pages.json.\n');
  for (const v of violations) console.error(`  ${v.route}   (${v.file})`);
  console.error('\nAdd each route above to src/data/public-pages.json, then rebuild.\n');
  process.exit(1);
}

console.log(`[check-pages] ok — ${files.length} routes, all listed (${publicSet.size} public).`);
