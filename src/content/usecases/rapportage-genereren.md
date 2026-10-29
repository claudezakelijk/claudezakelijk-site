---
title: "Rapportages genereren met Claude"
titleTag: "Claude rapportage genereren uit Power BI, met DAX-controle"
metaDescription: "Claude rapportage genereren uit Power BI: de MCP-servers van Microsoft, DAX checken tegen je model en wat 872 rapporten ons leerden. Stand oktober 2026."
h1: "Rapportage genereren met Claude: maandrapportages uit Power BI"
targetKeywords:
  - claude rapportage genereren
  - rapportage genereren
  - maandrapportage
  - claude power bi koppelen
  - claude power bi dashboard
wordCountTarget: 1706
priority: 2
tier: 3
cases:
  - powerbi-reporting
  - dashboard-automation
internalLinks:
  - /cases/powerbi-reporting
  - /cases/dashboard-automation
  - /integraties/microsoft-365
  - /prijs/pro-vs-team-vs-enterprise
  - /compliance/dpia-stappenplan
  - /claude-implementatie
schemaTypes:
  - Article
  - FAQPage
  - BreadcrumbList
author: camiel
competitors:
  - learn.microsoft.com
  - community.fabric.microsoft.com
status: published
publishDate: 2026-12-17
updatedDate: null
changelogLine: null
reviewedBy: null
reviewedDate: null
disclaimer: null
kortAntwoord: "Claude rapportage genereren uit Power BI gaat via een MCP-server van Microsoft. Daarmee leest Claude je semantisch model en voert het DAX-query's uit, zodat elk cijfer uit je eigen model komt. De lokale Power BI Authoring MCP server is algemeen beschikbaar, de gehoste versie is in preview. Claude Code zit in elk betaald Claude-plan, vanaf 20 dollar per maand."
bronnen:
  - titel: "Microsoft Learn, Overview of the Power BI MCP servers (24 september 2026)"
    url: "https://learn.microsoft.com/en-us/power-bi/developer/mcp/mcp-servers-overview"
    geraadpleegd: "2026-10-29"
  - titel: "Microsoft Learn, Power BI Authoring MCP server (1 september 2026)"
    url: "https://learn.microsoft.com/en-us/power-bi/developer/mcp/power-bi-authoring-mcp"
    geraadpleegd: "2026-10-29"
  - titel: "Microsoft Learn, Register Power BI MCP servers for MCP clients (1 september 2026)"
    url: "https://learn.microsoft.com/en-us/power-bi/developer/mcp/remote-mcp-server-external-clients"
    geraadpleegd: "2026-10-29"
  - titel: "Microsoft Learn, Copilot for Power BI overview (24 augustus 2026)"
    url: "https://learn.microsoft.com/en-us/power-bi/create-reports/copilot-introduction"
    geraadpleegd: "2026-10-29"
  - titel: "Claude Code Docs, Connect Claude Code to tools via MCP"
    url: "https://code.claude.com/docs/en/mcp"
    geraadpleegd: "2026-10-29"
  - titel: "Claude Help Center, Getting started with custom connectors using remote MCP"
    url: "https://support.claude.com/en/articles/11175166-getting-started-with-custom-connectors-using-remote-mcp"
    geraadpleegd: "2026-10-29"
  - titel: "Claude by Anthropic, productoverzicht (claude.com, doorverwezen vanaf anthropic.com/claude)"
    url: "https://claude.com/product/overview"
    geraadpleegd: "2026-10-29"
  - titel: "Claude, plans en prijzen (claude.com)"
    url: "https://claude.com/pricing"
    geraadpleegd: "2026-10-29"
  - titel: "ECB-referentiekoers euro/dollar, 28 oktober 2026 (ecb.europa.eu)"
    url: "https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/eurofxref-graph-usd.en.html"
    geraadpleegd: "2026-10-29"
faq:
  - question: "Kan Claude rapportages maken uit mijn Power BI-data?"
    answer: "Ja. Via de Power BI Authoring MCP server van Microsoft leest Claude je semantisch model en voert het DAX-query's uit. Met alleen Build-rechten op het model kan de server alleen query's draaien en niets wijzigen. Claude zet de uitkomsten daarna in jouw vaste rapportopbouw. Iemand die de cijfers kent, leest het rapport na voordat het naar een klant gaat."
  - question: "Werkt de Power BI MCP server op een Mac?"
    answer: "De lokale server niet. Microsoft schrijft dat de lokale Power BI Authoring MCP server geen macOS ondersteunt en raadt op een Mac de gehoste server aan. Die gehoste server is op 29 oktober 2026 in preview en werkt alleen met semantische modellen in een Fabric-workspace, niet met een bestand in Power BI Desktop."
  - question: "Heb ik Fabric-capaciteit nodig om Claude met Power BI te gebruiken?"
    answer: "Voor Copilot in Power BI wel: Microsoft eist een betaalde Fabric-capaciteit vanaf F2 of Power BI Premium vanaf P1. Voor de MCP-server noemt Microsoft andere eisen: Write- of Build-rechten op het model, en bij de lokale server voor modellen in de service een XMLA-endpoint dat op Read Write staat."
  - question: "Verzint Claude DAX-measures die niet bestaan?"
    answer: "Een taalmodel kan een measure noemen die niet in je model staat. Daarom haal je de lijst met measures uit het model zelf en laat je elke query eerst draaien. Bij de 872 rapporten uit onze case kwam een measure die niet bestond niet in het rapport. Na de eerste 200 rapporten vond een structuurcontrole nog 30 problemen."
  - question: "Hoe zijn de 872 rapporten en 173 dashboards gemeten?"
    answer: "Het zijn tellingen van wat er aan het einde van elk project live stond: 872 rapporten, waarvan 449 in het Engels en 423 in het Nederlands, en 173 dashboards in tien categorieën. De tijdwinst uit de case is niet op dezelfde manier gemeten. Daarom staat die op deze pagina niet als meetresultaat."
---

<!--
  Feiten gecontroleerd 29-10-2026, bronnen in de frontmatter. Koers ECB 28-10-2026: 1 EUR = 1,1133 USD.
  Ervaring alleen uit de cases powerbi-reporting en dashboard-automation. Samengevoegd met de oude
  draft integraties/power-bi (gearchiveerd). Weggelaten: report-engine-cijfers, "duizenden euro's"
  licentiebesparing, XMLA-claim voor de oude server, drielagenmodel en de aantallen-claim over implementaties.
-->

Een maandrapportage maken kost vaak meer tijd dan het lezen ervan. De data staat al klaar in Power BI, maar iemand moet nog de cijfers ophalen, controleren, uitleggen en in de vaste opmaak zetten. Dat werk kun je met Claude grotendeels laten voorbereiden. Op deze pagina lees je hoe je Claude aan Power BI koppelt, hoe je voorkomt dat er verzonnen cijfers in een rapport komen en wat ons team leerde van 872 rapporten en 173 dashboards. De bronnen onderaan zijn geraadpleegd op 29 oktober 2026. Meer toepassingen per taak vind je bij de [use cases](/use-cases).

## Welk deel van een rapportage kan Claude overnemen?

Claude is een taalmodel van Anthropic. Het schrijft, vat samen en zet gegevens in een vaste vorm. Met een koppeling naar Power BI kan Claude ook query's op je datamodel uitvoeren. Welke cijfers belangrijk zijn en wat je met een afwijking doet, beslis je zelf.

Tabel: taakverdeling bij een maandrapportage uit Power BI, stand 29 oktober 2026.

| Taak | Wat Claude doet | Wat jij doet |
|------|-----------------|--------------|
| Cijfers ophalen | Schrijft DAX-query's en voert ze uit via de MCP-server | Kiest welke measures in het rapport horen |
| Controle | Draait elke query eerst en meldt fouten | Legt een steekproef naast het Power BI-rapport |
| Toelichting | Schrijft een korte uitleg bij trends en afwijkingen | Vult de oorzaak aan die niet in de data staat |
| Opmaak en vertaling | Zet alles in de vaste opbouw, in één of twee talen | Leest de vertaalde versie na |
| Verzenden | Niets, dit blijft bij jou | Keurt het rapport goed en stuurt het naar de klant |

## Hoe koppel je Claude aan Power BI?

Microsoft levert zelf de servers voor deze koppeling. Ze werken met het Model Context Protocol (MCP), een open standaard waarmee een AI-toepassing tools van een andere dienst kan gebruiken. Microsoft beschrijft twee servers voor Power BI: de Authoring MCP server, die je gehost of lokaal draait, en Fabric IQ.

Tabel: de Power BI MCP-servers van Microsoft, stand 29 oktober 2026.

| Server | Status | Waar het model staat | Waarvoor |
|--------|--------|----------------------|----------|
| Authoring MCP server, gehost | Preview | Fabric-workspace | Model lezen en wijzigen, DAX uitvoeren |
| Authoring MCP server, lokaal | Algemeen beschikbaar | Fabric-workspace, Power BI Desktop of PBIP-bestanden | Hetzelfde, plus Desktop en bestanden op je eigen schijf |
| Fabric IQ | Apart product | Semantische modellen en rapporten | Vragen in gewone taal voor eindgebruikers |

Voor rapportages maken is de Authoring server de route. Op de overzichtspagina van de Power BI MCP-servers waarschuwt Microsoft wel dat de Authoring server niet bedoeld is om zakelijke vragen van eindgebruikers te beantwoorden. Daarvoor wijst Microsoft naar Fabric IQ. Een rapport bouwen en controleren valt onder het werk van de maker, en daar is de Authoring server voor gemaakt.

Een paar eisen van de pagina over de Power BI Authoring MCP server op Microsoft Learn:

- Je hebt Write- of Build-rechten op het semantisch model nodig. Met alleen Build kan de server alleen DAX-query's uitvoeren en niets aan het model veranderen.
- Een DAX-query geeft maximaal 100.000 rijen terug.
- De lokale server ondersteunt geen macOS. Op een Mac gebruik je de gehoste server.
- Voor de gehoste server zet een Fabric-beheerder de tenant-instelling aan waarmee gebruikers de Power BI MCP-server mogen gebruiken.

Claude Desktop kan de gehoste server toevoegen als eigen connector. Microsoft Entra ondersteunt geen automatische registratie van zo'n client. Je maakt daarom eerst zelf een app-registratie in Entra aan, met de redirect-URI van Claude, en vult het client-ID in bij de connector. Microsoft beschrijft die stappen voor Claude Desktop letterlijk. In Claude Code voeg je de lokale server toe met `claude mcp add`. De gehoste server voeg je toe met `--transport http` en de URL van Microsoft. Omdat Entra geen automatische registratie ondersteunt, geef je daarbij met `--client-id` het client-ID van je eigen app-registratie mee. Op een Team-plan voegen eigenaren de connector toe, waarna elke gebruiker hem zelf aanzet.

Werk je ook met Outlook, SharePoint en Teams, lees dan hoe [Claude koppelen aan Microsoft 365](/integraties/microsoft-365) werkt. Dat is een aparte connector met eigen beheerdersstappen.

## Hoe maak je een maandrapportage met Claude?

Begin met één rapport dat elke maand terugkomt, met steeds dezelfde opbouw en dezelfde bron. Zo richt je het in.

1. Leg de vaste opbouw vast: welke secties, welke measures, welke grafieken en welke toelichting. Een bestaand rapport is het beste voorbeeld.
2. Koppel Claude aan het semantisch model en vraag eerst alleen de lijst met tabellen en measures op. Zo zie je wat er in het model beschikbaar is.
3. Laat Claude per sectie de DAX-query's schrijven en uitvoeren. Een query die een fout geeft, gaat niet door naar het rapport.
4. Laat Claude de uitkomsten in de vaste opbouw zetten en een korte toelichting schrijven.
5. Leg twee of drie cijfers naast het rapport in Power BI zelf. Kloppen ze, dan keur je het rapport goed.
6. Maak er een vast commando van, met de klantnaam en het rapporttype als invoer. Daarna draai je het voor de volgende klant.

Een zelf gemaakt slash command in Claude Code is daar een praktische vorm voor. Zo werkte ons team in de case hieronder.

## Hoe voorkom je verzonnen cijfers in een rapport?

Een taalmodel kan een measure noemen die er niet is, of een kolomnaam raden. In een rapport voor een klant mag dat niet gebeuren. De oplossing is eenvoudig: elk cijfer moet uit een query komen die echt op je model is uitgevoerd.

In de [case over 872 Power BI-rapporten](/cases/powerbi-reporting) haalde het commando de beschikbare measures en dimensies op via een MCP-server die op het Power BI-model was aangesloten. Elke DAX-query werd gecontroleerd tegen dat model. Bestond een measure niet, dan kwam hij niet in het rapport.

Rapporten die iemand met de hand had aangepast, kregen de status "frozen". Het deploy-script sloeg die over, zodat handwerk niet werd overschreven. Een aparte controle keek voor publicatie of grafieken en tabellen goed renderden.

Let ook op wat er met je data gebeurt. Microsoft schrijft dat metadata, schema's en query-uitkomsten naar de MCP-client gaan en van daaruit naar de aanbieder van het taalmodel. Bij Claude is dat Anthropic. Staan er persoonsgegevens in je model, beoordeel dat dan vooraf met het [DPIA-stappenplan](/compliance/dpia-stappenplan).

## Wat leerden 872 rapporten en 173 dashboards ons?

Ons team bouwde dit eerder bij een Nederlands MSP-softwarebedrijf. Daar kostte één klantrapport anderhalf uur handwerk, voor meer dan 50 klanten en in twee talen. Na 12 weken stonden er 872 rapporten live: 449 in het Engels en 423 in het Nederlands. Na de eerste 200 rapporten vond een controle op de structuur van alle bestanden 30 problemen, zoals ontbrekende secties en een verkeerde kolomvolgorde. Die zijn in één ronde hersteld. Nieuwe klanten kregen hun eerste set rapporten op dag twee van de onboarding.

Bij hetzelfde type bedrijf bouwde ons team in 5 weken [173 dashboards](/cases/dashboard-automation) in tien categorieën, zoals ticketvolume, responstijden en SLA-compliance. Het waren gegenereerde webpagina's met Chart.js, die elke ochtend om 07:00 automatisch ververst werden. Wie ze bekeek, had daar geen BI-licentie voor nodig.

Hoe hard zijn die cijfers? Niet elk getal uit de cases is op dezelfde manier vastgesteld.

Tabel: meetnotitie bij de cijfers uit de cases powerbi-reporting en dashboard-automation, stand 29 oktober 2026.

| Cijfer | Wat het is | Hoe het is vastgesteld |
|--------|-----------|------------------------|
| 872 rapporten (449 EN, 423 NL) | Aantal rapporten dat aan het einde van het project live stond | Telling van gepubliceerde rapporten |
| 173 dashboards, 10 categorieën | Aantal live dashboardpagina's | Telling van gepubliceerde pagina's |
| 30 problemen in de eerste 200 | Uitkomst van één structuurcontrole op alle bestanden | Uitvoer van die controle |
| 20 uur per week naar minder dan 1 uur | Tijdwinst op rapportagewerk | De case noemt geen meetperiode en geen methode |
| Bespaarde licentiekosten | Geen bedrag | De case noemt geen bedrag per maand of per jaar |

De tellingen zijn harde aantallen. De tijdwinst presenteren we daarom niet als meting: we weten niet over welke weken en met welke urenregistratie die is bepaald. Een bespaard licentiebedrag noemen we niet, omdat de case er geen geeft.

## Wat is het verschil met Copilot in Power BI?

Microsoft heeft ook eigen AI in Power BI. Copilot kan rapportpagina's maken, een rapport samenvatten en DAX-query's schrijven. Daarvoor heb je een betaalde Fabric-capaciteit vanaf F2 of Power BI Premium vanaf P1 nodig. Een Pro- of Premium Per User-licentie alleen is volgens Microsoft niet genoeg. Voor de losse Copilot-ervaring geldt verder dat andere talen dan Engels niet officieel ondersteund worden.

Claude via de MCP-server is een andere route. Je werkt in Claude of Claude Code en haalt de data uit je model. Dat past als je rapporten buiten Power BI wilt maken, in je eigen opmaak, of voor klanten zonder Power BI-account.

## Wat kost rapportage genereren met Claude?

Claude Code zit volgens Anthropic in elk betaald plan. Anthropic rekent in dollars. De euro-bedragen zijn omgerekend met de ECB-koers van 28 oktober 2026 (1 euro is 1,1133 dollar), exclusief btw.

- Claude Pro kost 20 dollar per maand bij maandbetaling (ongeveer 17,96 euro) of 17 dollar per maand bij jaarbetaling (ongeveer 15,27 euro).
- Een standaard Team-seat kost 25 dollar per gebruiker per maand (ongeveer 22,46 euro), of 20 dollar bij jaarbetaling (ongeveer 17,96 euro).

Wie rapporten met klantdata maakt, kiest een zakelijk plan. Het verschil tussen de plannen staat in [Claude Pro, Team of Enterprise](/prijs/pro-vs-team-vs-enterprise). De kosten aan de kant van Microsoft hangen af van je Power BI- of Fabric-abonnement.

## Waar begin je?

Kies het rapport dat je elke maand het meeste tijd kost. Koppel Claude eerst met alleen Build-rechten, zodat er niets aan je model kan veranderen. Maak met de stappen hierboven drie maanden lang dat ene rapport, en meet zelf hoeveel tijd het scheelt. Dan heb je een eigen getal in plaats van het onze.

Wil je hulp bij de koppeling of bij het eerste commando, kijk dan op onze [implementatiepagina](/claude-implementatie).
