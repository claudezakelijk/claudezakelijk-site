// Redesign v2, homepage: drie kleine effecten bovenop een pagina die zonder JS
// al compleet is. Bij 'verminder beweging' doen typen en optellen niets.
const rustig = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Typ-effect: de tekst staat al in de HTML; we tikken hem opnieuw uit zodra
// het veld in beeld komt.
function typ(el: HTMLElement) {
  const tekst = el.dataset.typ ?? el.textContent ?? '';
  el.textContent = '';
  let i = 0;
  const stap = () => {
    el.textContent = tekst.slice(0, ++i);
    if (i < tekst.length) setTimeout(stap, 45 + Math.random() * 55);
  };
  setTimeout(stap, 500);
}

// Optellen: "8+ jaar" → telt 0..8 en zet daarna de volledige tekst terug.
function tel(el: HTMLElement) {
  const tekst = el.textContent ?? '';
  const m = tekst.match(/\d+/);
  if (!m) return;
  const doel = Number(m[0]);
  const start = performance.now();
  const duur = 1400;
  const frame = (nu: number) => {
    const t = Math.min(1, (nu - start) / duur);
    const waarde = Math.round(doel * (1 - Math.pow(1 - t, 3)));
    el.textContent = tekst.replace(m[0], String(waarde));
    if (t < 1) requestAnimationFrame(frame);
    else el.textContent = tekst;
  };
  requestAnimationFrame(frame);
}

if (!rustig) {
  const eenmalig = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target as HTMLElement;
      if (el.dataset.typ !== undefined) typ(el);
      if (el.hasAttribute('data-tel')) tel(el);
      eenmalig.unobserve(el);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll<HTMLElement>('[data-typ], [data-tel]').forEach((el) => eenmalig.observe(el));
}

// Stappenverhaal "Wat houdt je tegen?": de zorg in het midden van het scherm is
// actief; het beeld rechts wisselt mee. Klikken maakt een zorg ook actief.
const verhaal = document.querySelector<HTMLElement>('.v2-zorgen');
if (verhaal) {
  const zorgen = Array.from(verhaal.querySelectorAll<HTMLElement>('.v2-zorg'));
  const zet = (i: number) => {
    verhaal.dataset.actief = String(i);
    zorgen.forEach((z, j) => z.toggleAttribute('data-actief', i === j));
  };
  const midden = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) zet(zorgen.indexOf(e.target as HTMLElement)); });
  }, { rootMargin: '-45% 0px -45% 0px' });
  zorgen.forEach((z, i) => {
    midden.observe(z);
    z.addEventListener('click', () => {
      zet(i);
      z.scrollIntoView({ behavior: rustig ? 'auto' : 'smooth', block: 'center' });
    });
  });
}
