---
title: "Welk Claude model kies je als MKB?"
titleTag: "Welk Claude model kiezen? Fable, Opus, Sonnet, Haiku"
metaDescription: "Fable 5.1, Opus 5.5, Sonnet 5.5 of Haiku 5.5: welk Claude model gebruik je waarvoor, wat kost het per miljoen tokens en wat zit er in welk abonnement?"
h1: "Welk Claude model kies je als MKB: Fable, Opus, Sonnet of Haiku?"
targetKeywords:
  - welk claude model
  - claude sonnet vs opus
  - claude model kiezen
  - claude api prijzen
wordCountTarget: 1234
priority: 1
tier: 1
cases:
  - powerbi-reporting
  - sdr-sales-agent
internalLinks:
  - /nieuws
  - /prijs
  - /prijs/credits-en-limieten
  - /prijs/pro-vs-team-vs-enterprise
  - /vergelijken/welke-ai-voor-mkb
  - /tools/claude-api-kosten-calculator
  - /claude-implementatie
schemaTypes:
  - Article
  - FAQPage
  - BreadcrumbList
author: camiel
competitors: []
status: published
publishDate: 2026-10-29
updatedDate: 2026-10-29
changelogLine: null
reviewedBy: null
reviewedDate: null
isRecurring: false
kortAntwoord: "Voor de meeste zakelijke taken is Claude Opus 5.5 het beste startpunt: 4 dollar per miljoen input-tokens en 20 dollar per miljoen output-tokens. Sonnet 5.5 kost de helft en is sneller, Haiku 5.5 is het goedkoopst voor bulkwerk, en Fable 5.1 is het model voor zwaar werk: complexe analyses en lang lopende agent-taken. Stand: 22 oktober 2026."
bronnen:
  - titel: "Claude Platform Docs, Models overview (modellen, API-ID's, contextwindow)"
    url: "https://platform.claude.com/docs/en/models/overview"
    geraadpleegd: "22 oktober 2026"
  - titel: "Claude Platform Docs, Pricing (API-prijzen per model, batch, caching)"
    url: "https://platform.claude.com/docs/en/about-claude/pricing"
    geraadpleegd: "22 oktober 2026"
  - titel: "Claude plans & pricing (abonnementen en modelbeschikbaarheid)"
    url: "https://claude.com/pricing"
    geraadpleegd: "22 oktober 2026"
  - titel: "Claude Help Center, Covered Models (1 september 2026)"
    url: "https://support.claude.com/en/articles/15425695-covered-models"
    geraadpleegd: "22 oktober 2026"
  - titel: "ECB-referentiekoers euro/dollar (21 oktober 2026)"
    url: "https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/eurofxref-graph-usd.en.html"
    geraadpleegd: "29 oktober 2026"
faq:
  - question: "Wat is het verschil tussen Claude Sonnet en Opus?"
    answer: "Opus 5.5 is het sterkere model en de keuze van Anthropic zelf als startpunt voor de meeste taken. Sonnet 5.5 is sneller en kost de helft: 2 tegenover 4 dollar per miljoen input-tokens. Het oude beeld dat Opus vijf keer zo duur is klopt sinds de 5.5-generatie niet meer. Kies Sonnet als snelheid en volume zwaarder wegen dan maximale kwaliteit."
  - question: "Welk Claude model is het goedkoopst?"
    answer: "Claude Haiku 5.5: 0,10 dollar per miljoen input-tokens en 0,50 dollar per miljoen output-tokens bij prompts tot 100.000 tokens. Boven die promptlengte stijgt de prijs naar 0,50 en 2,50 dollar. Haiku is bedoeld voor classificatie, extractie en routering in hoog volume, waar snelheid en prijs belangrijker zijn dan redeneerdiepte."
  - question: "Zit Claude Fable 5.1 in mijn abonnement?"
    answer: "Niet standaard. Free heeft geen Fable. Op Pro gebruik je Fable alleen via usage credits tegen API-tarief. Max en de premium-seats van Team geven Fable tot 50 procent van je weeklimiet. Enterprise heeft volledige toegang. Via de API betaal je 10 dollar per miljoen input-tokens en 50 dollar per miljoen output-tokens."
  - question: "Hebben alle Claude modellen hetzelfde contextwindow?"
    answer: "Ja, de vier actuele modellen (Fable 5.1, Opus 5.5, Sonnet 5.5 en Haiku 5.5) hebben allemaal een contextwindow van 1 miljoen tokens en een maximale output van 128.000 tokens. Alleen de prijs verschilt: Haiku 5.5 rekent hogere tarieven voor requests met een prompt boven de 100.000 tokens, de andere drie niet."
  - question: "Kan ik per taak wisselen van model?"
    answer: "Ja. In de Claude-apps kies je per gesprek een model, via de API geef je per request een model-ID mee, en in Claude Code wissel je tussen modellen binnen een sessie. Zo kun je het dure model beperken tot de stappen die het nodig hebben en de rest op een goedkoper model draaien. Dat scheelt direct in je tokenkosten."
---

Welk Claude model je kiest, bepaalt wat je betaalt en wat je terugkrijgt. Het korte antwoord: begin met Claude Opus 5.5, dat is sinds de 5.5-generatie het aanbevolen startpunt van Anthropic zelf. Pak Sonnet 5.5 voor snel dagelijks werk tegen de halve prijs, Haiku 5.5 voor bulkwerk als classificatie en routering, en Fable 5.1 voor het zware werk: complexe analyses en agents die lang zelfstandig doorwerken. Hieronder staan de actuele prijzen, de verschillen per taak en wat er in welk abonnement zit. Alle cijfers zijn gecheckt op 22 oktober 2026 bij de bronnen onderaan.

## De vier actuele Claude modellen

Anthropic biedt op dit moment vier actuele modellen aan. Alle vier hebben een contextwindow van 1 miljoen tokens en een maximale output van 128.000 tokens. De verschillen zitten in capaciteit, snelheid en prijs.

Tabel: de actuele Claude modellen met API-prijzen in dollars per miljoen tokens (MTok), stand 22 oktober 2026.

| Model | API-ID | Positionering | Input | Output |
|-------|--------|---------------|-------|--------|
| Claude Fable 5.1 | claude-fable-5-1 | Zwaarste redeneerwerk en lang lopende agent-taken | $10 | $50 |
| Claude Opus 5.5 | claude-opus-5-5 | Aanbevolen startpunt, agentic coding en kenniswerk | $4 | $20 |
| Claude Sonnet 5.5 | claude-sonnet-5-5 | Beste combinatie van snelheid en capaciteit | $2 | $10 |
| Claude Haiku 5.5 | claude-haiku-5-5 | Hoog volume: classificatie, extractie, routering | $0,10 | $0,50 |

De Haiku-prijzen gelden voor requests met een prompt tot 100.000 tokens. Daarboven betaal je 0,50 dollar per miljoen input-tokens en 2,50 dollar per miljoen output-tokens. Voor de euro-indicaties verderop rekenen we met de ECB-referentiekoers van 21 oktober 2026: 1 euro is 1,1234 dollar, dus 1 dollar is ongeveer 0,89 euro.

Twee kortingen gelden voor alle vier de modellen. Batchverwerking (voor werk dat niet direct af hoeft) halveert de tokenprijs. En met prompt caching betaal je voor herhaalde context een fractie van het inputtarief: een cache-hit kost op Opus 5.5 en Sonnet 5.5 5 procent van de inputprijs, op Fable 5.1 zelfs 2,5 procent.

## Claude Sonnet vs Opus: klopt het oude prijsbeeld nog?

De vraag claude sonnet vs opus komt uit een tijd waarin Opus vijf keer zo duur was als Sonnet (15 tegenover 3 dollar per miljoen input-tokens). Dat beeld klopt niet meer. Opus 5.5 kost 4 dollar per miljoen input-tokens, Sonnet 5.5 kost 2 dollar. Het verschil is nog maar een factor 2, en Anthropic adviseert in de eigen documentatie om voor de meeste werklasten met Opus 5.5 te beginnen.

De praktische afweging is daarmee verschoven. Vroeger was Opus de uitzondering die je bewust inzette; nu is Opus de standaard en is Sonnet de bewuste keuze als je optimaliseert op snelheid en volume. Sonnet 5.5 reageert sneller en is voor e-mails, samenvattingen, standaardteksten en routinecode ruim voldoende. Bij hoog volume telt de halve prijs bovendien hard door.

Fable 5.1 staat daarboven: 10 dollar input, 50 dollar output per miljoen tokens. Dat is 2,5 keer de prijs van Opus 5.5. Anthropic zet Fable zelf neer voor veeleisend redeneerwerk en lange agent-taken, en daar hoort het ook: zeer complexe analyses, meerstapsredeneringen en agents die urenlang zelfstandig doorwerken. Voor gewoon kenniswerk betaal je die meerprijs niet terug.

## Welk Claude model voor welke taak?

Een praktische verdeling voor een MKB-organisatie:

1. **Dagelijks kantoorwerk** (e-mails, samenvattingen, vertalingen, offerteteksten): Sonnet 5.5. Snel en goedkoop genoeg om niet over na te denken.
2. **Analyse- en kenniswerk** (rapporten doornemen, contracten vergelijken, code schrijven): Opus 5.5. Het aanbevolen startpunt; pas afschalen naar Sonnet als de kwaliteit ook daar goed blijkt.
3. **Bulkwerk** (duizenden tickets classificeren, data extraheren uit documenten, berichten routeren): Haiku 5.5. Bij dit soort volumes is de prijs per taak belangrijker dan redeneerdiepte.
4. **Het zwaarste werk** (lang lopende agents, complexe meerstapsanalyses): Fable 5.1.

Begin bij twijfel met Opus 5.5 en meet. Schaal per taak af naar Sonnet of Haiku zodra de uitkomst daar even goed is. Zwaar werk zet je meteen op Fable. Werk je binnen een abonnement, dan telt ook je limiet: Sonnet rekt die het langst op en Fable verbruikt hem het snelst, zie [credits en limieten](/prijs/credits-en-limieten). De [API-kostencalculator](/tools/claude-api-kosten-calculator) rekent je volume door per model.

Een rekenvoorbeeld om de verhoudingen te voelen. Stel, een taak kost 2.000 input-tokens en 500 output-tokens. Op Sonnet 5.5 is dat (2.000 x 2 + 500 x 10) / 1.000.000 = 0,009 dollar, ofwel 0,8 eurocent. Duizend van die taken per maand kosten 9 dollar (ongeveer 8 euro). Op Opus 5.5 is dat 18 dollar, op Haiku 5.5 0,45 dollar. Het model bepaalt je kosten dus meer dan het aantal taken.

Vergelijk je Claude nog breder met andere aanbieders, kijk dan bij [welke AI voor het MKB](/vergelijken/welke-ai-voor-mkb).

## Welk model zit in welk abonnement?

Gebruik je Claude via een abonnement in plaats van de API, dan bepaalt je plan welke modellen je kunt kiezen. De abonnementsprijzen zijn in dollars, exclusief btw; de euro-indicatie is tegen de ECB-koers van 21 oktober 2026.

Tabel: modelbeschikbaarheid en prijs per Claude-abonnement, stand 22 oktober 2026.

| Abonnement | Prijs | Sonnet | Haiku | Opus | Fable |
|-----------|-------|--------|-------|------|-------|
| Free | $0 | Ja | Ja | Nee | Nee |
| Pro | $17 p/m bij jaarbetaling, anders $20 (ca. 15 tot 18 euro) | Ja | Ja | Ja | Alleen via usage credits |
| Max | vanaf $100 p/m (ca. 89 euro) | Ja | Ja | Ja | Tot 50% van de weeklimiet |
| Team standaard-seat | $20 p/m per seat bij jaarbetaling, anders $25 (ca. 18 tot 22 euro) | Ja | Ja | Ja | Nee |
| Team premium-seat | $100 p/m per seat bij jaarbetaling, anders $125 (ca. 89 tot 111 euro) | Ja | Ja | Ja | Tot 50% van de weeklimiet |
| Enterprise | $20 per seat p/m plus verbruik tegen API-tarief, jaarbetaling, minimaal 20 seats | Ja | Ja | Ja | Ja |

Opvallend aan deze lijst: Opus 5.5 zit al in Pro, het instapabonnement van 17 dollar per maand. Fable 5.1 is overal de uitzondering. Loop je binnen je abonnement tegen je limiet aan, dan kun je op betaalde plannen bijbetalen tegen API-tarief; hoe dat werkt staat in [credits en limieten](/prijs/credits-en-limieten). De volledige afweging tussen de zakelijke abonnementen staat in [Claude Pro, Team of Enterprise](/prijs/pro-vs-team-vs-enterprise), en alle prijzen in euro's op onze [prijzenpagina](/prijs).

## Fable 5.1 heeft een eigen bewaarplicht

Eén compliance-detail hoort bij deze modelkeuze. Anthropic heeft Fable 5 en Fable 5.1 aangewezen als Covered Models: modellen met capaciteiten die extra waarborgen vragen. Prompts en antwoorden van die modellen worden daarom minimaal 30 dagen bewaard en daarna automatisch verwijderd, op elk platform. Zero data retention is voor deze modellen standaard niet beschikbaar. Voor Opus, Sonnet en Haiku geldt die verplichting niet. Werk je met strenge interne datarichtlijnen, weeg dit dan mee; meer context over bewaartermijnen en de verwerkersovereenkomst vind je op onze [compliance-pagina's](/compliance).

## Wat we er in de praktijk van zien

Twee van onze eigen trajecten laten zien waarom de taak het model bepaalt. Bij een [Power BI-rapportagepipeline](/cases/powerbi-reporting) die ons team eerder bij een Nederlands softwarebedrijf bouwde (872 reports, van 20 uur rapportagewerk per week naar minder dan 1 uur) was generatiekwaliteit alles: een fout in een rapport kost meer dan het prijsverschil tussen modellen. Bij de [SDR sales agent](/cases/sdr-sales-agent) (25 persoonlijke e-mails per ochtend, open rate van 8 naar 34 procent) telde juist volume, en was het snellere, goedkopere model de logische keuze. Beide trajecten draaiden op de modelgeneraties van dat moment; de verdeling zwaar-werk-versus-volume-werk is wat overdraagbaar is, niet de modelnamen.

Eigen benchmarkcijfers per 5.5-model publiceren we niet, die hebben we niet gemeten. Wil je weten welke verdeling bij jouw werk past, dan maken we die afweging samen in een [Claude-implementatie](/claude-implementatie).

Dit artikel hoort bij ons [nieuwsoverzicht](/nieuws); bij een nieuwe modelgeneratie van Anthropic werken we de tabellen bij.
