// Linklabels voor statische pagina's in het "Gerelateerd"-blok (Spec C, C-08).
// Elke waarde is gelijk aan de H1 of aan de <title> zonder " | Implementeren.ai" van die pagina;
// scripts/onpage-check.mjs controleert dat. Artikelen en cases staan hier niet: hun label komt
// uit de content collection (data.titleTag). Een nieuwe statische pagina krijgt hier een regel.
// Verandert de titel of H1 van een pagina hier, pas dan ook de regel aan.
export const paginaLabels: Record<string, string> = {
  '/': 'Claude zakelijk inzetten voor het MKB',
  '/ai-enablement-scan': 'Gratis AI-check: is je bedrijf klaar voor Claude?',
  '/cases': 'Wat we met Claude gebouwd hebben',
  '/claude-compagnon': 'Claude-begeleiding na de implementatie',
  '/claude-consultant': 'Claude consultant voor het Nederlandse MKB',
  '/claude-implementatie': 'Claude-implementatie voor het Nederlandse MKB',
  '/claude-in-30-dagen': 'Claude inrichten voor je bedrijf in 30 dagen',
  '/claude-readiness-scan': 'Claude Readiness Scan: AI-audit voor je MKB',
  '/compliance': 'Is Claude AVG-proof? Niet met Free of Pro',
  '/contact': 'Contact',
  '/gids': 'Claude gidsen voor bedrijven',
  '/gids/claude-voor-mkb': 'Zakelijk Claude-account en abonnement voor het mkb',
  '/gids/claude-code-voor-bedrijven': 'Claude Code voor bedrijven: wat kan het?',
  '/gids/overstappen-van-chatgpt-naar-claude': 'Overstappen van ChatGPT naar Claude: zakelijk stappenplan',
  '/hoe-claude-werkt': 'Hoe Claude werkt',
  '/integraties': 'Claude gekoppeld aan je tools',
  '/nieuws': 'Nieuws & analyses',
  '/methodologie': 'Onze methode in vijf bouwstenen',
  '/over': 'Over Implementeren.ai: wie we zijn en hoe we werken',
  '/prijs': 'Claude kosten zakelijk: alle prijzen 2026',
  '/use-cases': 'Wat je met Claude doet',
  '/tools': 'Claude rekentools voor je bedrijf',
  '/tools/claude-api-kosten-calculator': 'Claude API kosten calculator',
  '/tools/claude-roi-mkb-calculator': 'Claude ROI calculator voor het mkb',
  '/vergelijken': 'Claude vergelijken met ChatGPT, Copilot en Cursor',
  '/verticalen': 'Claude per branche',
};

// Oude paden die met een 301 naar een nieuw pad gaan (public/_redirects). Een link naar
// een oud pad laat de build falen: verwijs direct naar het nieuwe pad.
export const omgeleid: Record<string, string> = {
  '/gids/claude-avg-gdpr-voor-mkb': '/compliance',
  '/prijs/kosten-zakelijk': '/prijs',
  '/gids/claude-vs-chatgpt-voor-bedrijven': '/gids/overstappen-van-chatgpt-naar-claude',
};
