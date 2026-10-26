---
title: "Claude business case template voor MKB"
titleTag: "Claude business case template voor MKB | ClaudeZakelijk"
metaDescription: "Claude business case template voor MKB: TCO, ROI en risico's in een Excel-format. Twee case studies met concrete cijfers. Download en pas aan."
h1: "Claude business case template voor MKB"
targetKeywords:
  - claude business case template
  - claude tco mkb
wordCountTarget: 1200
priority: 3
tier: 3
cases:
  - powerbi-reporting
  - sdr-sales-agent
internalLinks:
  - /prijs
  - /prijs/roi-mkb-calculator
  - /prijs/pro-vs-team-vs-enterprise
  - /use-cases/sales-outreach
schemaTypes:
  - Article
  - FAQPage
author: camiel
competitors: []
status: draft
publishDate: null
updatedDate: null
changelogLine: null
hasCalculator: false
faq:
  - question: "Wat moet er in een Claude business case staan?"
    answer: "Vier onderdelen: de huidige kosten van het proces dat je wilt automatiseren, de verwachte kosten met Claude (licenties plus implementatie), de verwachte besparing per maand, en de risico's. Gebruik concrete uren en tarieven, geen percentages. Een directeur wil weten hoeveel het kost en wanneer het terugverdiend is."
  - question: "Hoe bereken ik de TCO van Claude voor mijn bedrijf?"
    answer: "Tel alle kosten bij elkaar: abonnementskosten per maand maal 12, API-kosten op basis van geschat volume, implementatietijd in uren maal intern of extern tarief, en trainingstijd voor medewerkers. Bij 10 gebruikers op Claude Team is de jaarlijkse TCO ongeveer 2.760 EUR aan licenties plus de implementatie-investering."
  - question: "Hoe lang duurt het voordat Claude zichzelf terugverdient?"
    answer: "Bij rapportage-automatisering zagen we break-even na 3 weken. Bij sales outreach na 6 weken. Het hangt af van het aantal uren dat je bespaart en het tarief van die uren. Een medewerker die 10 uur per week bespaart tegen 50 EUR per uur levert 500 EUR per week op. Tegen Team-kosten van 115 EUR per maand is de terugverdientijd minder dan een week."
---

Een Claude business case template helpt je om de investering in AI intern te onderbouwen. Geen vage beloften over productiviteit, maar concrete cijfers: wat kost het, wat levert het op, wanneer is het terugverdiend. Dit template is gebaseerd op twee cases die ons team eerder bij een Nederlands softwarebedrijf bouwde. Pas de getallen aan voor jouw situatie.

## Waarom een business case voor Claude

De meeste MKB-bedrijven in Nederland beginnen met Claude Pro voor een of twee medewerkers. Dat kost EUR 18,50 per maand exclusief BTW. Geen business case nodig. Maar zodra je opschaalt naar Claude Team (EUR 23 per gebruiker, minimum 5 gebruikers) of de API integreert in je werkprocessen, wil je directie of management overtuigen met cijfers.

Een claude tco mkb berekening voorkomt twee fouten. De eerste: onderschatten van de totale kosten door alleen naar de licentieprijs te kijken. De tweede: overschatten van de besparing door met theoretische productiviteitswinst te rekenen in plaats van gemeten uren. Dit template dwingt je om beide kanten concreet te maken.

## Het template: vier onderdelen

### 1. Huidige situatie (baseline)

Beschrijf het proces dat je wilt verbeteren of automatiseren. Meet de huidige kosten in uren en euro's. Niet schatten, maar meten. Laat medewerkers een week lang bijhouden hoeveel tijd ze besteden aan het specifieke proces.

Voorbeeld uit de powerbi-reporting case:
- Proces: Power BI rapportages maken voor klanten
- Frequentie: maandelijks, per klant, twee talen
- Huidige doorlooptijd: 45 minuten per rapport
- Volume: 72 rapporten per maand (36 klanten x 2 talen)
- Kosten: 72 x 0,75 uur x EUR 50 = EUR 2.700 per maand

### 2. Voorstel (Claude-implementatie)

Specificeer welk Claude-product je inzet, voor hoeveel gebruikers, en wat de maandelijkse kosten zijn. Tel de eenmalige implementatiekosten erbij op.

Voorbeeld powerbi-reporting:
- Product: Claude Team (5 gebruikers) + API voor rapportgeneratie
- Licentiekosten: 5 x EUR 23 = EUR 115 per maand
- API-kosten: geschat EUR 55 per maand (872 reports over 12 weken = ~73/maand)
- Implementatie: 80 uur x EUR 100 (extern tarief) = EUR 8.000 eenmalig
- Training: 8 uur x 5 medewerkers x EUR 50 = EUR 2.000 eenmalig
- **Maandelijkse kosten: EUR 170**
- **Eenmalig: EUR 10.000**

### 3. Besparing en terugverdientijd

Hier maak je het verschil zichtbaar. Trek de nieuwe kosten af van de huidige kosten. Bereken hoe snel de eenmalige investering is terugverdiend.

Voorbeeld powerbi-reporting:
- Maandelijkse besparing: EUR 2.700 - EUR 170 = EUR 2.530
- Terugverdientijd eenmalige investering: EUR 10.000 / EUR 2.530 = 3,95 maanden
- **ROI jaar 1: (EUR 2.530 x 12 - EUR 10.000) / EUR 10.000 = 204%**
- Jaar 2 en verder: EUR 2.530 x 12 = EUR 30.360 per jaar bespaard

Tweede voorbeeld uit de sdr-sales-agent case:
- Proces: sales e-mails schrijven en versturen
- Volume: 25 e-mails per dag, 5 dagen per week
- Huidige tijdsinvestering: 15 uur per week
- Kosten: 15 x EUR 50 = EUR 750 per week = EUR 3.250 per maand
- Na Claude: 3 uur per week (review en aanpassen)
- Besparing: 12 uur per week = EUR 600 per week = EUR 2.600 per maand
- Conversieratio steeg van 8% naar 34%
- Extra omzet door hogere conversie: niet gekwantificeerd in de business case (vermijd speculatie)
- **Terugverdientijd: 4 weken**

### 4. Risico's en mitigatie

Elke business case heeft een risicosectie nodig. Directies die alleen roze cijfers zien, vertrouwen het niet. Wees eerlijk over de risico's.

| Risico | Impact | Mitigatie |
|--------|--------|-----------|
| AVG (GDPR) compliance | Hoog | Dataclassificatie in drie zones, gevoelige data blijft lokaal |
| Vendor lock-in bij Anthropic | Midden | Prompts en workflows zijn overdraagbaar naar OpenAI ChatGPT of Microsoft Copilot |
| Medewerkersweerstand | Midden | Training en geleidelijke uitrol, begin met vrijwilligers |
| Kwaliteit AI-output | Midden | Menselijke review verplicht, frozen-systeem voor goedgekeurde output |
| API-prijswijzigingen | Laag | Claude Pro als fallback, kosten nu <5% van besparing |

## Claude tco mkb: go/no-go criteria

Stel vooraf vast wanneer het project doorgaat en wanneer niet. Harde criteria voorkomen eindeloze discussies.

**Go als:**
- Terugverdientijd < 6 maanden
- Maandelijkse besparing > 3x maandelijkse Claude-kosten
- AVG-risico's zijn afgedekt met een DPIA
- Minimaal 2 medewerkers bereid om als pilot te starten

**No-go als:**
- Het proces dat je wilt automatiseren kost minder dan 10 uur per maand
- De data is volledig rood-geclassificeerd en er is geen lokaal model beschikbaar
- Er is geen interne sponsor die het project trekt

## Claude business case template presenteren

Houd de presentatie op een A4. Directeurs lezen geen 20-pagina rapporten. De samenvatting in drie zinnen: "We besteden nu X uur per maand aan Y. Met Claude wordt dat Z uur. De investering is in N maanden terugverdiend."

Gebruik de concrete cijfers uit je meting, niet de templates. Een directeur die vraagt "waar komen die getallen vandaan?" moet het antwoord krijgen "die hebben we vorige week gemeten", niet "dat is een schatting."

De business cases die werden goedgekeurd, hadden drie dingen gemeen: gemeten baseline, conservatieve schattingen, en een eerlijk risico-overzicht. De cases die werden afgewezen, beloofden te veel en onderbouwden te weinig. Anthropic levert het product, maar jij levert de cijfers.

OpenAI, Microsoft en andere aanbieders van AI-tools vragen vergelijkbare investeringen. Het template werkt ook voor ChatGPT of Copilot. De specifieke prijzen verschillen, maar de structuur van de business case is identiek. Wat telt is de verhouding tussen kosten en besparing, en die meet je op dezelfde manier.

## Meer hulpmiddelen voor je business case

Bekijk het [complete overzicht van Claude kosten per maand](/prijs) voor actuele prijzen van alle plannen. Gebruik de [ROI calculator voor MKB](/prijs/roi-mkb-calculator) om je eigen terugverdientijd te berekenen. Twijfel je welk plan past bij jouw team? Lees de [vergelijking van Pro vs Team vs Enterprise](/prijs/pro-vs-team-vs-enterprise). Wil je zien hoe de rapportage-case in de praktijk werkt? Lees de [case over 872 Power BI-rapporten](/cases/powerbi-reporting). En bekijk hoe [Claude sales outreach](/use-cases/sales-outreach) werkt voor het verbeteren van e-mailcampagnes.

## Veelgestelde vragen

### Wat moet er in een Claude business case staan?

Vier onderdelen: de huidige kosten van het proces dat je wilt automatiseren, de verwachte kosten met Claude (licenties plus implementatie), de verwachte besparing per maand, en de risico's. Gebruik concrete uren en tarieven, geen percentages. Een directeur wil weten hoeveel het kost en wanneer het terugverdiend is.

### Hoe bereken ik de TCO van Claude voor mijn bedrijf?

Tel alle kosten bij elkaar: abonnementskosten per maand maal 12, API-kosten op basis van geschat volume, implementatietijd in uren maal intern of extern tarief, en trainingstijd voor medewerkers. Bij 10 gebruikers op Claude Team is de jaarlijkse TCO ongeveer EUR 2.760 aan licenties plus de implementatie-investering.

### Hoe lang duurt het voordat Claude zichzelf terugverdient?

Bij rapportage-automatisering zagen we break-even na 3 weken. Bij sales outreach na 6 weken. Het hangt af van het aantal uren dat je bespaart en het tarief van die uren. Een medewerker die 10 uur per week bespaart tegen EUR 50 per uur levert EUR 500 per week op. Tegen Team-kosten van EUR 115 per maand is de terugverdientijd minder dan een week.
