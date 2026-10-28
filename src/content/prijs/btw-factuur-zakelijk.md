---
title: "Claude BTW factuur zakelijk ophalen"
titleTag: "Claude BTW factuur zakelijk ophalen | Implementeren.ai"
metaDescription: "Claude BTW factuur zakelijk ophalen: stap-voor-stap voor Nederlandse ondernemers. Factuur downloaden vanuit Anthropic billing, BTW-nummer toevoegen."
h1: "Claude BTW factuur zakelijk ophalen"
targetKeywords:
  - claude btw factuur zakelijk
  - claude factuur ondernemers
wordCountTarget: 1000
priority: 3
tier: 3
cases:
  - automation-audit
internalLinks:
  - /prijs
  - /prijs/pro-vs-team-vs-enterprise
  - /compliance
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
  - question: "Kan ik BTW terugvragen op mijn Claude abonnement?"
    answer: "Ja, als je een BTW-nummer hebt opgegeven in je Anthropic billing settings. Anthropic is gevestigd in de VS, dus je ontvangt een factuur zonder BTW. Als Nederlands bedrijf geef je de kosten op als intracommunautaire dienst en draag je BTW af via de verleggingsregeling. Je boekhouder kent dit als reverse charge."
  - question: "Hoe voeg ik mijn BTW-nummer toe aan mijn Claude account?"
    answer: "Ga naar console.anthropic.com, klik op Settings, dan Billing. Onder je bedrijfsgegevens staat het veld Tax ID. Vul daar je BTW-nummer in inclusief landcode, dus NL gevolgd door je nummer. Sla op. Vanaf de volgende factuur staat je BTW-nummer vermeld."
  - question: "Krijg ik een factuur per gebruiker bij Claude Team?"
    answer: "Nee. Bij Claude Team ontvang je een verzamelfactuur per maand. Het totaalbedrag is het aantal actieve gebruikers maal 25 dollar. Je kunt per gebruiker een interne kostentoewijzing maken, maar Anthropic stuurt een enkele factuur per workspace."
  - question: "Kan ik betalen via SEPA of iDEAL?"
    answer: "Anthropic accepteert creditcard en debitcard via Stripe. SEPA-incasso is beschikbaar voor Enterprise-contracten. iDEAL wordt niet direct ondersteund. De meeste Nederlandse bedrijven gebruiken een zakelijke creditcard of een Adyen virtual card."
---

Claude BTW factuur zakelijk ophalen is een van de eerste stappen als je Claude als bedrijfstool inzet. Anthropic stuurt geen facturen per post en de factuur staat niet op een voor de hand liggende plek. In deze handleiding doorloop je het volledige proces: van BTW-nummer toevoegen tot factuur downloaden en boeken.

## Waarom je een BTW factuur nodig hebt

Als Nederlandse ondernemer wil je je Claude-kosten als bedrijfskosten boeken. Daarvoor heb je een factuur nodig met je bedrijfsgegevens en BTW-nummer. Anthropic is een Amerikaans bedrijf, gevestigd in San Francisco. Dat betekent twee dingen voor je administratie:

1. Je ontvangt een factuur zonder BTW (geen US sales tax voor niet-Amerikaanse bedrijven)
2. Je boekt de kosten als intracommunautaire dienst en past de verleggingsregeling toe

Dit geldt voor Claude Pro, Claude Team en Claude Enterprise. Bij de API geldt hetzelfde principe, maar de facturatie loopt via een apart billing dashboard op console.anthropic.com.

## Stap 1: BTW-nummer toevoegen

Ga naar [console.anthropic.com](https://console.anthropic.com) en log in met je zakelijke account. Navigeer naar Settings en vervolgens Billing. Onder het kopje Payment Information vind je het veld Tax ID.

Vul je Nederlandse BTW-nummer in met landcode: NL123456789B01. Let op de hoofdletters en het format. Anthropic valideert het nummer via het VIES-systeem van de Europese Commissie. Als je nummer niet geaccepteerd wordt, controleer dan of het actief is op ec.europa.eu/taxation_customs/vies.

Sla de wijziging op. Vanaf de eerstvolgende factureringsperiode staat je BTW-nummer op de factuur. Bestaande facturen worden niet met terugwerkende kracht aangepast.

## Stap 2: Factuur downloaden

Na elke factureringsperiode (maandelijks) verschijnt je factuur in het billing dashboard. Ga naar Settings, dan Billing, en scroll naar Invoice History. Klik op de PDF-link naast de gewenste maand.

De factuur bevat: je bedrijfsnaam, BTW-nummer, het gefactureerde bedrag in USD, de factuurdatum en het Stripe-referentienummer. Voor je boekhouding reken je het bedrag om naar EUR tegen de wisselkoers van de factuurdatum. De meeste boekhoudpakketten (Exact Online, Moneybird, e-Boekhouden) hebben een automatische omrekenfunctie voor buitenlandse valuta.

## Stap 3: Boeken in je administratie

De boeking verloopt als volgt. Dit is de standaard voor diensten van buiten de EU:

- Crediteer de creditcardrekening met het EUR-bedrag
- Debiteer de kostenrekening (bijvoorbeeld "Software abonnementen" of "ICT kosten")
- Boek de BTW via de verleggingsregeling: 21% BTW verschuldigd en 21% BTW als voorbelasting
- Het netto-effect op je BTW-aangifte is nul als je volledig aftrekgerechtigd bent

Bij Claude Team met 5 gebruikers betaal je $125 per maand (~EUR 115 exclusief BTW). Per kwartaal is dat EUR 345 aan softwarekosten. Bij een automation-audit werden 38 scripts geanalyseerd in 2 dagen. De Claude Team-kosten voor die maand: EUR 115. De besparing aan consultancy-uren: EUR 4.800. Dat soort verhoudingen maken de boekhouding relevant: je wilt die kosten netjes in je administratie hebben.

## Claude btw factuur zakelijk: Pro vs Team

Bij Claude Pro betaal je $20 per maand (~EUR 18,50 exclusief BTW) via je persoonlijke Anthropic-account. De factuur staat op naam van de accounthouder. Voor een eenmanszaak of zzp'er is dat voldoende.

Bij Claude Team betaal je $25 per gebruiker per maand (~EUR 23 exclusief BTW), met een minimum van 5 gebruikers. Je ontvangt een verzamelfactuur voor de hele workspace. De workspace-admin beheert de billing. Als je intern wilt verdelen per afdeling, maak je een eigen verdeling op basis van het aantal gebruikers per team.

Bij Claude Enterprise sluit je een contract af met Anthropic. De facturatie is maatwerk: jaarlijkse betaling, SEPA-incasso, en facturen op maat met je inkoopordernummer en kostenplaats. Enterprise-contracten zijn geschikt voor organisaties met 50+ gebruikers of specifieke compliance-eisen rond AVG (GDPR) en dataverwerking.

## API-facturatie apart

API-kosten worden apart gefactureerd via console.anthropic.com. Je stelt een spending limit in, voegt een creditcard toe, en ontvangt maandelijks een factuur op basis van daadwerkelijk tokenverbruik. De factuur toont het totale verbruik per model: Claude Opus, Claude Sonnet en Claude Haiku.

Voor een Nederlandse onderneming zijn de API-kosten identiek qua boekhouding: verleggingsregeling, BTW-neutraal bij volledige aftrek. Het verschil is dat API-kosten variabel zijn.

## Claude factuur ondernemers: persoonlijk vs zakelijk

Maak een apart Anthropic-account aan voor zakelijk gebruik. Gebruik je zakelijke e-mailadres, niet je persoonlijke Gmail of Outlook. Dat voorkomt discussies met de Belastingdienst over de zakelijkheid van de kosten. Bij een controle wil je een account tonen dat uitsluitend zakelijk wordt gebruikt.

OpenAI en Microsoft hanteren vergelijkbare facturatieprocessen voor ChatGPT en Copilot. Het verschil is dat Microsoft via een CSP-partner (Cloud Solution Provider) kan factureren, wat voor sommige bedrijven eenvoudiger is qua inkoop. Anthropic biedt die optie niet. Claude-kosten gaan altijd direct via Anthropic. Implementeren.ai adviseert om een zakelijke creditcard te gebruiken, bij voorkeur een met automatische boekhoudkoppeling.

Bekijk het [complete overzicht van Claude kosten per maand](/prijs) voor alle plannen en prijzen. Twijfel je welk plan past? Lees de [vergelijking van Pro vs Team vs Enterprise](/prijs/pro-vs-team-vs-enterprise). En voor bedrijven die werken met persoonsgegevens is ons [AVG-privacybeleid voor Claude](/compliance) relevant.

## Veelgestelde vragen

### Kan ik BTW terugvragen op mijn Claude abonnement?

Ja, als je een BTW-nummer hebt opgegeven in je Anthropic billing settings. Anthropic is gevestigd in de VS, dus je ontvangt een factuur zonder BTW. Als Nederlands bedrijf geef je de kosten op als intracommunautaire dienst en draag je BTW af via de verleggingsregeling. Je boekhouder kent dit als reverse charge.

### Hoe voeg ik mijn BTW-nummer toe aan mijn Claude account?

Ga naar console.anthropic.com, klik op Settings, dan Billing. Onder je bedrijfsgegevens staat het veld Tax ID. Vul daar je BTW-nummer in inclusief landcode, dus NL gevolgd door je nummer. Sla op. Vanaf de volgende factuur staat je BTW-nummer vermeld.

### Krijg ik een factuur per gebruiker bij Claude Team?

Nee. Bij Claude Team ontvang je een verzamelfactuur per maand. Het totaalbedrag is het aantal actieve gebruikers maal $25. Je kunt per gebruiker een interne kostentoewijzing maken, maar Anthropic stuurt een enkele factuur per workspace.

### Kan ik betalen via SEPA of iDEAL?

Anthropic accepteert creditcard en debitcard via Stripe. SEPA-incasso is beschikbaar voor Enterprise-contracten. iDEAL wordt niet direct ondersteund. De meeste Nederlandse bedrijven gebruiken een zakelijke creditcard of een Adyen virtual card.
