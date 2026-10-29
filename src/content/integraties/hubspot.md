---
title: "Claude koppelen aan HubSpot"
titleTag: "Claude HubSpot connector in het Nederlands uitgelegd"
metaDescription: "Claude HubSpot connector in het Nederlands: welke plannen je nodig hebt, hoe je koppelt, wat Claude leest en wijzigt en waar je klantdata heen gaat."
h1: "Claude koppelen aan HubSpot: de officiële connector voor je CRM"
targetKeywords:
  - claude hubspot connector nederlands
  - claude koppelen aan hubspot
  - hubspot connector
  - hubspot aan claude
  - claude hubspot koppelen
wordCountTarget: 1408
priority: 2
tier: 3
cases:
  - customer-intelligence
internalLinks:
  - /integraties
  - /integraties/microsoft-365
  - /prijs/pro-vs-team-vs-enterprise
  - /compliance/anthropic-dpa
  - /compliance/eu-hosting
  - /compliance/dpia-stappenplan
  - /cases/customer-intelligence
  - /claude-voor-marketingbureaus
  - /claude-implementatie
schemaTypes:
  - Article
  - FAQPage
  - BreadcrumbList
author: camiel
competitors:
  - knowledge.hubspot.com
  - hubspot.com
  - claude.com
status: published
publishDate: 2026-12-10
updatedDate: null
changelogLine: null
reviewedBy: null
reviewedDate: null
disclaimer: null
kortAntwoord: "HubSpot levert sinds 29 juli 2025 zelf een officiële connector voor Claude. Die is gratis en werkt met alle HubSpot-plannen, ook het gratis plan. Aan de kant van Claude heb je Pro, Max, Team of Enterprise nodig. Claude leest contacten, deals, tickets en marketingdata, en maakt of wijzigt records na jouw bevestiging. Verwijderen kan niet."
bronnen:
  - titel: "HubSpot Knowledge Base, Set up and use the HubSpot connector for Claude (bijgewerkt 19 oktober 2026)"
    url: "https://knowledge.hubspot.com/integrations/set-up-and-use-the-hubspot-connector-for-claude"
    geraadpleegd: "2026-10-29"
  - titel: "HubSpot, HubSpot connector for Claude (productpagina met FAQ)"
    url: "https://www.hubspot.com/claude"
    geraadpleegd: "2026-10-29"
  - titel: "HubSpot Developers changelog, HubSpot connector for Claude (29 juli 2025)"
    url: "https://developers.hubspot.com/changelog/hubspot-connector-for-claude"
    geraadpleegd: "2026-10-29"
  - titel: "Claude connector directory, HubSpot"
    url: "https://claude.com/connectors/hubspot"
    geraadpleegd: "2026-10-29"
  - titel: "Claude Help Center, Use connectors to extend Claude's capabilities"
    url: "https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities"
    geraadpleegd: "2026-10-29"
  - titel: "HubSpot Developers, Integrate with the remote HubSpot MCP server"
    url: "https://developers.hubspot.com/docs/apps/developer-platform/build-apps/integrate-with-the-remote-hubspot-mcp-server"
    geraadpleegd: "2026-10-29"
  - titel: "Anthropic, Claude for Small Business (13 mei 2026)"
    url: "https://www.anthropic.com/news/claude-for-small-business"
    geraadpleegd: "2026-10-29"
  - titel: "Anthropic Privacy Center, de verwerkersovereenkomst (DPA) voor zakelijke klanten"
    url: "https://privacy.claude.com/en/articles/7996862-i-am-a-commercial-customer-how-do-i-view-your-data-processing-addendum-dpa"
    geraadpleegd: "2026-10-29"
  - titel: "Anthropic Privacy Center, waar staan de servers van Anthropic?"
    url: "https://privacy.claude.com/en/articles/7996890-where-are-your-servers-located-do-you-host-your-models-on-eu-servers"
    geraadpleegd: "2026-10-29"
  - titel: "Claude, plans en prijzen (claude.com)"
    url: "https://claude.com/pricing"
    geraadpleegd: "2026-10-29"
  - titel: "ECB-referentiekoers euro/dollar, 28 oktober 2026 (ecb.europa.eu)"
    url: "https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/eurofxref-graph-usd.en.html"
    geraadpleegd: "2026-10-29"
faq:
  - question: "Heeft HubSpot een officiële connector voor Claude?"
    answer: "Ja. HubSpot bouwt en onderhoudt de connector zelf en hij staat in de connector directory van Claude. HubSpot bracht hem uit op 29 juli 2025, toen nog alleen om te lezen. Volgens de HubSpot Knowledge Base kan Claude nu ook records maken en wijzigen. Volgens HubSpot koppel je je account via OAuth, zonder eigen server."
  - question: "Wat kost de HubSpot connector voor Claude?"
    answer: "De connector zelf is gratis en werkt met elk HubSpot-plan, ook het gratis plan. Je betaalt wel voor Claude: Pro, Max, Team of Enterprise. Een standaard Team-seat kost 25 dollar per maand bij maandbetaling, ongeveer 22 euro exclusief btw tegen de ECB-koers van 28 oktober 2026."
  - question: "Kan Claude records in HubSpot verwijderen?"
    answer: "Nee. Claude kan via de connector onder meer contacten, bedrijven, deals, tickets en notities maken en bijwerken. Verwijderen kan bij geen enkel object, dat doe je in HubSpot zelf. HubSpot raadt aan de schrijftools op Needs Approval te zetten. Dan toont Claude eerst het voorstel en typ je Yes of No."
  - question: "Ziet Claude alle deals in ons HubSpot-account?"
    answer: "Alleen als de gebruiker die zelf mag zien. De connector volgt de rechten van de gebruiker in HubSpot. Een verkoper die alleen eigen deals mag zien, ziet via Claude ook alleen die deals. Eigen velden met het label Sensitive Data zijn niet bereikbaar. Staat Sensitive Data aan in het account, dan haalt de connector ook geen activiteiten zoals calls en e-mails op."
  - question: "Blijft HubSpot-data van een Nederlands bedrijf in de EU?"
    answer: "Gedeeltelijk. Het verkeer loopt via de servers van HubSpot en volgt de datacenterlocatie van je account, dus een EU-account gaat via het EU-datacenter. Wat Claude ophaalt, staat daarna in het gesprek bij Anthropic en valt onder de voorwaarden van Anthropic. Anthropic slaat data op zijn eigen platform op in de Verenigde Staten."
softwareName: "HubSpot"
softwareUrl: "https://www.hubspot.com/nl"
---

Claude koppelen aan HubSpot doe je met de officiële HubSpot connector. HubSpot bouwt en onderhoudt die connector zelf, en hij staat in de connector directory van Claude met het label "Anthropic verified". Je logt in met je HubSpot-account en daarna kan Claude contacten, deals, tickets en marketingdata opzoeken en records voor je bijwerken. Hieronder lees je wat je nodig hebt, hoe je hem aanzet en wat er met je klantdata gebeurt. Alle feiten op deze pagina hebben we gecontroleerd op 29 oktober 2026. Meer koppelingen vind je op de pagina [integraties](/integraties).

## Heeft HubSpot een officiële connector voor Claude?

Ja. HubSpot bracht de connector uit op 29 juli 2025 en noemde zichzelf toen het eerste CRM met een connector voor Claude. In die eerste versie kon Claude alleen lezen. Volgens de HubSpot Knowledge Base, bijgewerkt op 19 oktober 2026, kan Claude nu ook records maken en wijzigen.

HubSpot zit ook in Claude for Small Business. Anthropic noemde HubSpot op 13 mei 2026 als een van de zeven connectors bij de start van dat pakket, naast onder meer QuickBooks, Google Workspace en Microsoft 365. Werk je met Microsoft 365, dan lees je in [Claude koppelen aan Microsoft 365](/integraties/microsoft-365) hoe die connector werkt.

Oudere handleidingen laten je een eigen MCP server bouwen met een private app token. De officiële connector werkt zonder eigen server. Volgens de FAQ van HubSpot koppel je je HubSpot-account via OAuth.

## Wat kost de HubSpot connector en welk abonnement heb je nodig?

Aan de kant van HubSpot werkt de connector met alle producten en plannen, ook het gratis plan, en HubSpot rekent er niets extra voor. Je hebt wel een actief HubSpot-gebruikersaccount nodig, en de API-limieten van je HubSpot-account gelden ook voor alles wat Claude opvraagt.

Aan de kant van Claude vraagt HubSpot een betaald abonnement: Pro, Max, Team of Enterprise. Op Free werkt deze connector dus niet. Je gebruikt hem in Claude op het web, op de desktop en in de mobiele app.

Tabel: wat je betaalt voor Claude met de HubSpot connector, stand 29 oktober 2026 (ECB-koers 28 oktober 2026: 1 euro is 1,1133 dollar).

| Plan | Prijs in dollar | Ongeveer in euro, exclusief btw | Voor wie |
|---|---|---|---|
| Pro | 20 dollar per maand, 17 dollar bij jaarbetaling | 18 euro, of 15 euro bij jaarbetaling | Eén persoon |
| Team, standaard seat | 25 dollar per seat per maand, 20 dollar bij jaarbetaling | 22 euro, of 18 euro bij jaarbetaling | Teams van 2 tot 150 mensen |
| Enterprise | 20 dollar per seat per maand bij jaarbetaling, plus gebruik tegen API-tarieven | 18 euro per seat, plus gebruik | Minimaal 20 seats |
| HubSpot connector | Gratis | Gratis | Elk HubSpot-plan |

Voor klantdata raden we een zakelijk abonnement aan. Bij Team en Enterprise is de verwerkersovereenkomst van Anthropic onderdeel van de voorwaarden. Het verschil tussen de plannen lees je in [Pro, Team of Enterprise](/prijs/pro-vs-team-vs-enterprise).

## Hoe koppel je HubSpot aan Claude?

Je regelt het aan twee kanten, want in HubSpot mag niet iedereen de connector zomaar installeren. Super Admins en gebruikers met het recht App Marketplace Access kunnen meteen verbinden. Voor alle andere gebruikers keurt een Super Admin de connector eerst goed. Daarbij kiest de Super Admin de optionele datarechten en wie in het account de connector mag installeren.

Werk je met Claude Team of Enterprise, dan zet een Owner of Primary Owner de connector eerst aan voor de organisatie:

1. Ga in Claude naar **Organization settings** > **Connectors**.
2. Klik onderaan op **Browse connectors**.
3. Kies HubSpot en klik op **Add to your team**.

Daarna verbindt elke medewerker zelf zijn eigen HubSpot-account:

1. Ga in Claude naar **Customize** > **Connectors**. De handleiding van HubSpot noemt dit menu nog **Settings** > **Connectors**, het Claude Help Center gebruikt **Customize**.
2. Klik op **+** naast Connectors, kies **HubSpot** en klik op **Connect**.
3. Log in bij het HubSpot-account dat je wilt gebruiken.
4. Kies op de toestemmingspagina welke rechten je toestaat en klik op **Connect app**.
5. Zet in een gesprek via **+** > **Connectors** de schakelaar bij HubSpot aan en stel je vraag.

HubSpot raadt aan om de schrijftools op **Needs Approval** te zetten. Dan toont Claude een voorgestelde wijziging eerst en typ je **Yes** of **No**. Volgens HubSpot kan Claude met **Always allow** wijzigingen doorvoeren zonder die bevestiging. Bij Team en Enterprise kan een Owner deze instelling per tool vastleggen voor de hele organisatie. Medewerkers kunnen die dan niet zelf ruimer zetten.

## Wat kan Claude via de HubSpot connector lezen en aanpassen?

De connector volgt de rechten die de gebruiker in HubSpot al heeft. Een verkoper die alleen eigen deals mag zien, ziet via Claude ook alleen die deals.

Tabel: wat de HubSpot connector per onderdeel kan, stand 29 oktober 2026 (bron: HubSpot Knowledge Base).

| Onderdeel | Lezen | Maken en wijzigen | Beperking |
|---|---|---|---|
| CRM: contacten, leads, bedrijven, deals, tickets, custom objects | Ja | Ja | Maximaal 10 records per keer |
| Activiteiten: calls, meetings, notities, taken, e-mails | Ja | Ja | Geen activiteiten als Sensitive Data aan staat |
| Gesprekken uit Inbox en Help Desk | Ja | Nee | Alleen lezen |
| Marketing: e-mails, landingspagina's, blogposts, segmenten | Ja | Ja | Campagnes en marketingevents alleen aanmaken |
| Commerce: offertes, producten, regelitems | Ja | Ja, offertes in bèta | Facturen, orders en betalingen alleen lezen |
| Instellingen: pipelines, properties, gebruikers, teams | Ja | Pipelines ja, properties alleen aanmaken | Gebruikers en teams alleen lezen |

Verwijderen kan bij geen enkel object, dat doe je altijd in HubSpot zelf. Per Claude-account kun je één HubSpot-account tegelijk koppelen, dus wie voor meerdere klantportals werkt, wisselt steeds van koppeling. Eigen velden met het label Sensitive Data zijn niet bereikbaar. Bij een blogpost vraagt HubSpot een titel, auteur, uitgelichte afbeelding, metabeschrijving en slug.

Vragen die je zo stelt, gaan bijvoorbeeld over deals die al weken in dezelfde fase staan, de opbrengst van een campagne in een bepaalde periode of de voorbereiding op een klantgesprek. Voor prestaties van pagina's en blogs vraagt de connector een campagnenaam en een periode.

## Wat gebeurt er met je klantdata?

Het verkeer tussen Claude en HubSpot loopt via de servers van HubSpot en volgt de datacenterlocatie van je HubSpot-account. Een account in het EU-datacenter gaat dus via de EU. Wat Claude ophaalt, staat daarna wel in het gesprek bij Anthropic, en dan gelden de voorwaarden van Anthropic. Anthropic slaat data op zijn eigen platform op in de Verenigde Staten, zie [Claude-data in de EU houden](/compliance/eu-hosting).

Anthropic gebruikt HubSpot-data volgens HubSpot in het algemeen niet om modellen te trainen. Uitzonderingen zijn feedback die je zelf geeft en een account waarop je training hebt aangezet. Volgens de HubSpot Knowledge Base kan HubSpot geanonimiseerde samenvattingen van toolaanroepen verzamelen om de connector te bewaken.

Elke wijziging via Claude komt in het HubSpot Audit Log, op naam van de gebruiker en van de connector. Een Super Admin ziet ook wie de connector wanneer heeft gekoppeld. Wat de verwerkersovereenkomst van Anthropic dekt, lees je in [de Anthropic verwerkersovereenkomst](/compliance/anthropic-dpa). Verwerk je via Claude veel persoonsgegevens van klanten of prospects, maak dan eerst een DPIA met het [DPIA-stappenplan voor Claude](/compliance/dpia-stappenplan).

Een koppeling verbreken doe je zo:

1. Ga in Claude naar **Customize** > **Connectors**.
2. Zoek HubSpot in de lijst met connectors.
3. Klik op **Disconnect**.

## Heb je nog een eigen MCP server nodig?

Voor gesprekken in Claude werkt de officiële connector zonder eigen server. Bouw je zelf een agent of een vast proces zonder chat, dan heeft HubSpot daarnaast een remote MCP server op mcp.hubspot.com. Je maakt daarvoor in HubSpot een MCP connector aan onder **Development** > **MCP Connectors** en logt in via OAuth. Ook die server volgt de rechten van de gebruiker en kan lezen en schrijven.

## Wat is onze ervaring met Claude en HubSpot?

Met de officiële connector hebben we nog geen eigen klantcase. Wel bouwden we eerder een eigen koppeling met HubSpot. Voor de [klantprofielen-case](/cases/customer-intelligence) bouwden we met Claude Code vier MCP servers, waarvan één voor HubSpot. Die las contacten, deals, activiteiten en engagements. Samen met zoekdata, servicedata en LinkedIn gaf dat een klantprofiel in één vraag. Daarvoor had het salesteam eerst vier logins en twintig minuten zoeken nodig.

Voor lezen en bijwerken van CRM-data in een gesprek is de officiële connector nu de eerste keuze. Een eigen koppeling blijft zinvol als je HubSpot wilt combineren met bronnen waar geen connector voor bestaat, of een vast proces wilt draaien. Voor bureaus die HubSpot voor klanten beheren, staat meer op [Claude voor marketingbureaus](/claude-voor-marketingbureaus). Wil je hulp bij het inrichten van rechten en werkafspraken, dan zit dat in [Claude implementatie](/claude-implementatie).
