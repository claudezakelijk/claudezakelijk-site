---
title: "Claude koppelen aan Power BI"
titleTag: "Claude Power BI: dashboards genereren en analyseren | ClaudeZakelijk"
metaDescription: "872 Power BI rapporten in 12 weken. Hoe Claude Code dashboards genereert en valideert via MCP."
h1: "Claude Power BI dashboard genereren en koppelen"
targetKeywords:
  - claude power bi dashboard
  - claude power bi koppelen
wordCountTarget: 1500
priority: 1
tier: 3
cases:
  - powerbi-reporting
  - dashboard-automation
  - copilot-studio-agent
internalLinks:
  - /claude-voor-msp
schemaTypes:
  - Article
  - FAQPage
  - BreadcrumbList
author: camiel
competitors:
  - community.fabric.microsoft.com
status: draft
publishDate: null
updatedDate: null
changelogLine: null
faq:
  - question: "Kan Claude DAX-queries schrijven voor Power BI?"
    answer: "Ja, maar niet zomaar. Claude Code gebruikt een MCP server die het Power BI semantic model uitleest. Elke DAX measure wordt gevalideerd tegen het echte datamodel voordat die in een rapport terechtkomt. Als een measure niet bestaat, wordt die niet gebruikt. Bij de 872 rapporten die ons team eerder bij een Nederlands softwarebedrijf maakte, heeft dat nul verzonnen DAX opgeleverd."
  - question: "Heb ik Power BI Pro-licenties nodig voor dashboard-viewers?"
    answer: "Niet als je de dashboards via Claude laat genereren als HTML met Chart.js. De 173 dashboards die ons team eerder bij een Nederlands softwarebedrijf bouwde, draaien als WordPress-pagina's. Iedereen met de link ziet de data. Geen Fabric-capaciteit nodig, geen Microsoft-account vereist voor viewers. Besparing: duizenden euro's per jaar bij tientallen gebruikers."
  - question: "Hoe zit het met AVG als ik klantdata naar Claude stuur?"
    answer: "Classificeer je data eerst. Ticketmetadata en SLA-cijfers zijn doorgaans groen: vrij te gebruiken. Persoonsgegevens zijn rood: die gaan niet naar de cloud. Wij werken met een drielagenmodel en een ingebouwde anonimiseringslaag. Bij de report-engine verlaat de data de server niet. Pas je verwerkersovereenkomst aan als je Anthropic als sub-verwerker inzet."
  - question: "Werkt deze aanpak ook met Fabric en de nieuwere Power BI-architectuur?"
    answer: "De MCP server draait tegen het Power BI semantic model, ongeacht of dat in Fabric of in de klassieke Power BI Service staat. De DAX-laag is hetzelfde. Zolang het model beschikbaar is via de XMLA-endpoint, werkt de koppeling."
softwareName: "Power BI"
softwareUrl: "https://powerbi.microsoft.com"
---

Claude Power BI koppelen levert concrete resultaten op. 872 rapporten in 12 weken. 173 dashboards met dagelijkse automatische verversing. Een rapportage-agent die klanten in 2 minuten bedient in plaats van 45. Hier lees je hoe je een Claude Power BI dashboard opzet.

## Claude Power BI koppelen via MCP

De verbinding tussen Claude Code en Power BI loopt via een MCP server (Model Context Protocol). Die server leest het Power BI semantic model uit en stelt de beschikbare measures, dimensies en tabellen beschikbaar als tools in Claude Code. Je typt een slash command, Claude haalt de data op, en genereert de output.

Concreet: de MCP server verbindt met het XMLA-endpoint van je Power BI-workspace. Claude Code ziet welke measures beschikbaar zijn, welke dimensies erbij horen, en welke filters van toepassing zijn. Elke DAX-query die Claude schrijft, wordt gevalideerd tegen dat echte datamodel. Als een measure niet bestaat, wordt die niet gebruikt. Dat is het verschil met ChatGPT of een ander taalmodel dat DAX "verzint" op basis van trainingsdata: Claude Code werkt tegen je werkelijke schema.

De MCP server draait lokaal. De data reist niet naar een externe dienst. Je Power BI-credentials blijven op je eigen machine. De server fungeert als brug: Claude vraagt, de server vertaalt naar DAX, voert uit tegen het semantic model, en stuurt het resultaat terug.

De MCP server is het fundament onder alles wat hieronder staat: de 872 rapporten, de 173 dashboards, en de conversational agent.

## Claude Power BI rapporten genereren: 872 reports in 12 weken

Dit is het grootste project, eerder uitgevoerd door ons team bij een Nederlands softwarebedrijf. Wij genereerden 872 live Power BI rapporten in twee talen: 449 in het Engels, 423 in het Nederlands. Het hele traject duurde 12 weken. Elk rapport bevat een vaste structuur: samenvatting, trendgrafieken, detailtabellen, en toelichting bij afwijkingen. De layout volgt een Printed Document format dat er goed uitziet op scherm en in print.

### Stap 1: slash command met DAX-validatie

Een custom slash command in Claude Code genereert een compleet rapport op basis van klantnaam en rapporttype. Het command haalt de beschikbare measures op via de MCP server. Elke DAX-query wordt gevalideerd tegen het semantic model. Geen verzonnen kolommen, geen gefabriceerde aggregaties. Bij 872 rapporten heeft dat nul verzonnen DAX opgeleverd.

### Stap 2: geautomatiseerde kwaliteitscontrole

Na de eerste batch van 200 rapporten draaiden we een structural sweep over alle bestanden. Resultaat: 30 structurele fouten gevangen. Ontbrekende secties, verkeerde kolomvolgorde, inconsistente naamgeving. Allemaal in een ronde hersteld.

Een Visual Truthifier controleert of grafieken en tabellen correct renderen. Lege charts, ontbrekende labels, verkeerde assen: het systeem vangt het af voordat een rapport live gaat. Kwaliteitscontrole die geen mens handmatig doet bij honderden rapporten.

### Stap 3: frozen status voor handmatige bewerkingen

Rapporten die handmatig zijn aangepast krijgen een "frozen" status in het deploy systeem. Het script weet welke pagina's beschermd zijn en slaat die over bij bulk-updates. Geen ongelukken waarbij handmatig werk wordt overschreven. Je combineert bulk-generatie met ruimte voor maatwerk per klant.

## Claude Power BI dashboard automatiseren: 173 dashboards

Naast de rapporten bouwden we 173 interactieve dashboards verdeeld over 10 categorieën: ticketvolume, responstijden, SLA-compliance, klanttevredenheid, contractwaarde, resourcebezetting en meer. Doorlooptijd: 5 weken.

### Chart.js in plaats van Power BI viewer-licenties

De dashboards zijn gebouwd met Chart.js en gehost als WordPress-pagina's. Geen Power BI Pro, geen Fabric-capaciteit nodig. Iedereen met de link ziet de actuele cijfers. Bij een MSP met 30 klanten die allemaal dashboard-toegang willen, bespaar je duizenden euro's per jaar aan viewer-licenties. En je klant hoeft geen Microsoft-account te hebben.

### Dagelijkse refresh via LaunchAgent

Een LaunchAgent ververst alle dashboards dagelijks om 07:00. Tegen de tijd dat het team begint, staat de data van gisteren klaar. Het proces is volledig onbeheerd. Als er een probleem is met de databron, logt het script een foutmelding. De dashboards van de vorige dag blijven staan tot het probleem is opgelost.

Filters per tijdsperiode, klant en categorie. Hover-tooltips met exacte cijfers. Geen zware BI-interface, maar precies genoeg om snel de juiste conclusie te trekken.

## Conversational rapportage-agent: van 45 naar 2 minuten

De derde pijler is een conversational agent gebouwd met Claude Code. Een klant typt "Laat mijn SLA-prestaties van Q1 zien" in een chatvenster en krijgt binnen 2 minuten een volledig opgemaakt rapport. Geen mail naar de servicedesk, geen wachttijd, geen handmatige export.

De technische kern: een Streamable HTTP endpoint ontvangt chatberichten. Authenticatie loopt via Azure AD OAuth met een on-behalf-of flow. De klant logt in met zijn bestaande bedrijfsaccount. Geen apart wachtwoord, geen extra portaal. De agent ziet alleen data van de klant die ingelogd is.

Doorlooptijd van dit project: 3 weken. De rapportage-aanvraag ging van 45 minuten naar 2 minuten. Klanten zijn zelfredzaam. De servicedesk wordt niet meer gebeld voor "kun je even die SLA-cijfers sturen." Voor [MSP's](/claude-voor-msp) die kwartaalrapportages maken voor tientallen klanten scheelt dit werkdagen per kwartaal. En het is een verkoopargument in aanbestedingen: jouw klanten kunnen zelf rapportages opvragen via een chatinterface.

## AVG en dataclassificatie bij Power BI-koppelingen

Power BI-data bevat vaak klantinformatie. Voordat je die data door Claude laat verwerken, moet je classificeren.

**Groen:** eigen processen, rapportagesjablonen, kennisbankartikelen. Direct naar Claude.

**Oranje:** ticketdata met klantnamen uit Autotask of ConnectWise. Pseudonimiseer voordat het in een prompt gaat.

**Rood:** persoonsgegevens van eindgebruikers, BSN-nummers, medische data. Alleen een lokaal model of een engine waar de data de server niet verlaat.

Bij ons report-engine project (DuckDB, 148 tabellen, 254 measures, 1,55 miljoen rijen) verlaat de data de eigen server niet. Een ingebouwde anonimiseringslaag maakt demo's mogelijk zonder echte klantdata. AVG/GDPR-compliance als feature, niet als beperking.

Pas je verwerkersovereenkomsten aan als je Anthropic als sub-verwerker inzet. Classificeer eerst, bouw dan. In die volgorde. De meeste organisaties die we spreken onderschatten dit punt. Ze willen starten met AI-rapportage, maar vergeten de verwerkersovereenkomst bij te werken. Technisch is het niet ingewikkeld. Organisatorisch moet je het een keer goed regelen.

## Wat dit oplevert: de cijfers

Dit zijn productiecijfers, geen projecties.

- **872 rapporten** gegenereerd in 12 weken. Twee talen, gevalideerde DAX, geautomatiseerde kwaliteitscontrole met structural sweep en Visual Truthifier.
- **173 dashboards** met dagelijkse verversing om 07:00. Nul viewer-licenties. Nul handmatig werk na oplevering.
- **45 naar 2 minuten** per rapportage-aanvraag via de conversational agent met Azure AD authenticatie.
- **30 structurele fouten** gevangen door de geautomatiseerde sweep in de eerste 200 rapporten.
- **10 dashboardcategorieën** van ticketvolume tot contractwaarde, elk met filters per klant en periode.
- **Nul verzonnen DAX** dankzij validatie tegen het semantic model via MCP.

De investering is eenmalig, de opbrengst vermenigvuldigt over klanten. Wat je voor een klant bouwt, schaal je naar alle klanten met dezelfde slash commands en templates. Nieuwe klant toevoegen kost minuten: parameters invullen en het rapport genereren. Niet opnieuw bouwen. Dezelfde aanpak werkt voor elke organisatie die Power BI-data omzet in [klantrapportages](/cases/powerbi-reporting).

## Veelgestelde vragen

### Kan Claude DAX-queries schrijven voor Power BI?

Ja, maar niet zomaar. Claude Code gebruikt een MCP server die het Power BI semantic model uitleest. Elke DAX measure wordt gevalideerd tegen het echte datamodel voordat die in een rapport terechtkomt. Als een measure niet bestaat, wordt die niet gebruikt. Bij de 872 rapporten die ons team eerder bij een Nederlands softwarebedrijf maakte, heeft dat nul verzonnen DAX opgeleverd.

### Heb ik Power BI Pro-licenties nodig voor dashboard-viewers?

Niet als je de dashboards via Claude laat genereren als HTML met Chart.js. De 173 dashboards die ons team eerder bij een Nederlands softwarebedrijf bouwde, draaien als WordPress-pagina's. Iedereen met de link ziet de data. Geen Fabric-capaciteit nodig, geen Microsoft-account vereist voor viewers. Besparing: duizenden euro's per jaar bij tientallen gebruikers.

### Hoe zit het met AVG als ik klantdata naar Claude stuur?

Classificeer je data eerst. Ticketmetadata en SLA-cijfers zijn doorgaans groen: vrij te gebruiken. Persoonsgegevens zijn rood: die gaan niet naar de cloud. Wij werken met een drielagenmodel en een ingebouwde anonimiseringslaag. Bij de report-engine verlaat de data de server niet. Pas je verwerkersovereenkomst aan als je Anthropic als sub-verwerker inzet.

### Werkt deze aanpak ook met Fabric en de nieuwere Power BI-architectuur?

De MCP server draait tegen het Power BI semantic model, ongeacht of dat in Fabric of in de klassieke Power BI Service staat. De DAX-laag is hetzelfde. Zolang het model beschikbaar is via het XMLA-endpoint, werkt de koppeling.
