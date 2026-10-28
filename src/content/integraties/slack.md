---
title: "Claude koppelen aan Slack"
titleTag: "Claude Slack koppelen voor teams | Implementeren.ai"
metaDescription: "Hoe je Claude in Slack inzet voor teamworkflows, vraag-baken en automatische samenvattingen."
h1: "Claude Slack koppelen: AI voor je team"
targetKeywords:
  - claude slack koppelen
  - claude slack integratie zakelijk
wordCountTarget: 1300
priority: 3
tier: 3
cases:
  - knowledge-base
internalLinks: []
schemaTypes:
  - Article
  - FAQPage
  - BreadcrumbList
author: camiel
competitors: []
status: draft
publishDate: null
updatedDate: null
changelogLine: null
faq:
  - question: "Heeft Slack een officieel Claude-integratie?"
    answer: "Anthropic biedt een Claude app voor Slack aan. Je installeert die vanuit de Slack App Directory. Na installatie kun je Claude mentionen in channels of direct messages sturen. Voor zakelijke workflows met eigen data heb je daarnaast een custom Slack bot nodig die via de Anthropic API draait. Die combinatie geeft je het beste van twee werelden: snelle ad-hoc vragen via de standaard app, en geautomatiseerde workflows via je eigen bot."
  - question: "Kan ik vertrouwelijke bedrijfsdata door Claude in Slack laten verwerken?"
    answer: "Niet zomaar. Alles wat je in een Slack channel typt, gaat naar Slack's servers en vervolgens naar Anthropic als je Claude aanspreekt. Voor openbare informatie en interne processen (groen) is dat prima. Voor data met klantnamen of bedrijfsgegevens (oranje) pseudonimiseer je eerst. Persoonsgegevens en financiële data (rood) gaan nooit via Slack naar Claude. Gebruik daarvoor een lokale pipeline of een afgesloten API-route met dataclassificatie."
  - question: "Werkt Claude in Slack ook met Microsoft Teams?"
    answer: "Claude werkt met beide platformen, maar apart. De Slack-integratie gebruikt de Slack API en Events API. Voor Microsoft Teams bouw je een vergelijkbare bot via de Bot Framework SDK en de Anthropic API. De onderliggende logica is grotendeels herbruikbaar. De interface-laag verschilt. Als je organisatie beide platformen gebruikt, kun je dezelfde Claude-backend laten bedienen door twee aparte bots."
  - question: "Wat kost een Claude Slack-integratie?"
    answer: "De Slack-kant is gratis: de Slack API heeft geen kosten voor het ontvangen en versturen van berichten. Je betaalt voor het Anthropic API-gebruik. Bij Claude Sonnet ligt dat rond $3 per miljoen input tokens en $15 per miljoen output tokens. Voor een team van 20 mensen dat gemiddeld 50 vragen per dag stelt, kom je uit op $30 tot $80 per maand. De initieel bouwtijd voor een custom bot is twee tot vijf dagen."
softwareName: "Slack"
softwareUrl: "https://slack.com"
---

Claude Slack koppelen brengt AI naar waar je team al werkt. Individuele taken doe je in de browser of in Claude Code. Maar zodra je teambreed kennis wilt delen en workflows wilt automatiseren, wil je een Claude Slack integratie zakelijk inrichten.

Claude koppelen aan Slack betekent dat je team AI-ondersteuning krijgt zonder van tool te wisselen. Geen apart tabblad, geen login, geen extra interface. Gewoon een mention in een channel en Claude antwoordt.

## Claude Slack koppelen: drie routes

Er zijn drie manieren om Claude in Slack te krijgen. Welke je kiest hangt af van wat je nodig hebt.

**Route 1: Anthropic's officieel Claude app.** Installeer de Claude app vanuit de Slack App Directory. Na OAuth-autorisatie kun je Claude mentionen in elk channel waar de app is toegevoegd. Dit is de snelste route. Binnen tien minuten draait het. Geschikt voor ad-hoc vragen, tekst samenvatten, en brainstormen. Beperking: je hebt geen controle over welke data naar Anthropic gaat, en je kunt geen eigen tools of kennisbronnen koppelen.

**Route 2: Custom Slack bot met Anthropic API.** Je bouwt een eigen Slack bot die via de Anthropic API met Claude communiceert. De bot luistert naar berichten via de Slack Events API, stuurt ze naar Claude, en post het antwoord terug. Dit geeft je volledige controle: welke channels, welke system prompt, welke data. OAuth 2.0 regelt de Slack-authenticatie. Een API key van Anthropic regelt de Claude-kant.

**Route 3: Claude Code met MCP en Webhook.** Voor geautomatiseerde workflows zonder directe interactie. Een Slack Webhook stuurt notificaties naar een endpoint. Claude Code verwerkt de data via een MCP server en stuurt het resultaat terug naar Slack via de Web API. Dit is de route voor achtergrondprocessen: dagelijkse samenvattingen, ticket-triage notificaties, of automatische kennisbankupdates.

## Claude Slack integratie zakelijk: use cases die werken

### Interne kennisbank via Slack

Dit is de use case waar we de meeste tractie zien. Teams hebben kennis verspreid over Confluence, Google Drive, SharePoint, en de hoofden van senior medewerkers. Nieuwe collega's stellen dezelfde vragen. Ervaren collega's besteden tijd aan beantwoorden in plaats van aan hun eigen werk.

Met Claude in Slack creeer je een vraag-baken. Een medewerker typt een vraag in het #hulp channel. Claude doorzoekt je interne documentatie en geeft een antwoord met bronvermelding.

Ons team bouwde eerder iets vergelijkbaars: een [kennisbank bij een Nederlandse IT-dienstverlener](/cases/knowledge-base). 13 artikelen in vijf werkdagen, gepubliceerd via REST API, 6 uur per week bespaard op herhaalde vragen. Dezelfde aanpak werkt in Slack: in plaats van artikelen publiceren, beantwoord je vragen direct in het channel waar ze gesteld worden.

### Channel-samenvattingen

Slack-channels lopen vol. Na een dag vrij heb je honderden ongelezen berichten. De meeste zijn ruis. Een paar zijn belangrijk. Uitzoeken welke kost een half uur.

Een Claude bot die dagelijks om 09:00 een samenvatting post van de belangrijkste berichten uit de afgelopen 24 uur lost dat op. Besluiten, actiepunten, vragen die nog openstaan. In vijf regels weet je wat je gemist hebt. Technisch is dit een scheduled job die de Slack conversations.history API aanroept, de berichten naar Claude stuurt, en het resultaat in een #samenvatting channel post.

### Onboarding-assistent

Nieuwe medewerkers hebben vragen. "Waar vind ik het verlofformulier?" "Hoe werkt de VPN?" "Wie is verantwoordelijk voor facturatie?" Een Claude bot met toegang tot je HR-documenten en IT-procedures beantwoordt die vragen direct. De nieuwe collega hoeft niemand te storen.

## Technische opzet: stap voor stap

### Stap 1: Slack app aanmaken

Ga naar api.slack.com/apps en maak een nieuwe app. Kies "From scratch" en selecteer je workspace. Onder "OAuth & Permissions" voeg je de scopes toe die je nodig hebt: `chat:write` om berichten te posten, `channels:history` om berichten te lezen, `app_mentions:read` om mentions te ontvangen. Installeer de app in je workspace en kopieer het Bot User OAuth Token.

### Stap 2: Anthropic API koppelen

Maak een API key aan op console.anthropic.com. Sla die op als environment variable, niet hardcoded in je code. Je bot stuurt berichten naar de Anthropic Messages API met je system prompt en de Slack-berichtinhoud als user message. Claude Sonnet is voor de meeste Slack-workflows de juiste keuze: snel genoeg voor real-time antwoorden, capabel genoeg voor complexe vragen.

### Stap 3: Event handling inrichten

Configureer de Slack Events API om berichten door te sturen naar je bot's endpoint. Bij elke `app_mention` event ontvangt je server het bericht, stuurt het naar Claude, en post het antwoord terug in dezelfde thread. Gebruik threading. Altijd. Antwoorden in de thread houden het channel leesbaar. Antwoorden in het channel zelf creëren chaos.

### Stap 4: Kennisbronnen toevoegen

Hier wordt het interessant. Een kale Claude-integratie beantwoordt vragen op basis van algemene kennis. Maar je wilt dat Claude antwoordt op basis van jouw documenten, jouw procedures, jouw specifieke context. Via MCP servers koppel je Claude aan je interne systemen. Een MCP server voor je Confluence-ruimte. Een voor je ticketsysteem. Een voor je CRM in HubSpot of Salesforce. Claude doorzoekt die bronnen en baseert zijn antwoord op jouw data.

### Stap 5: Dataclassificatie en AVG

Voordat je live gaat: classificeer welke data door de Slack-Claude pipeline mag. Interne procedures en publieke informatie (groen) gaan direct. Klantnamen en bedrijfsgegevens (oranje) worden gepseudonimiseerd voordat ze naar Anthropic gaan. Persoonsgegevens, BSN-nummers, financiële data (rood) gaan nooit via deze route. Dat is geen optionele stap. De GDPR en AVG vereisen dat je weet welke data je waar naartoe stuurt. Documenteer het in je verwerkingsregister.

## Veelvoorkomende fouten

**Te brede toegang.** Geef de bot niet toegang tot alle channels. Begin met twee of drie channels en breid uit op basis van gebruik.

**Geen rate limiting.** Bouw een maximum in per gebruiker en per dag. Start met 50 berichten per gebruiker per dag en pas aan op basis van werkelijk gebruik. Zonder limiet lopen de Anthropic API-kosten snel op.

**Geen fallback.** Als de Anthropic API niet bereikbaar is, moet de bot dat melden. Een simpel "Ik kan even niet antwoorden" voorkomt verwarring.

**Geen logging.** Log welke vragen gesteld worden. Zonder die data weet je niet of de integratie waarde levert of alleen tokens verbrandt.

## Wat het oplevert

Een goed ingerichte Claude Slack-integratie bespaart een team van 20 mensen gemiddeld 30 tot 60 minuten per dag aan informatiezoeken. Dat is 10 tot 20 uur per week. De exacte besparing hangt af van hoeveel herhaalde vragen je team heeft en hoe verspreid je kennis nu zit.

De kosten zijn overzichtelijk. Slack API: gratis. Anthropic API: $30 tot $80 per maand voor een gemiddeld team. Bouwtijd: twee tot vijf dagen voor een werkende integratie. De terugverdientijd is meestal binnen de eerste maand.

## Veelgestelde vragen

### Heeft Slack een officieel Claude-integratie?

Anthropic biedt een Claude app voor Slack aan. Je installeert die vanuit de Slack App Directory. Na installatie kun je Claude mentionen in channels of direct messages sturen. Voor zakelijke workflows met eigen data heb je daarnaast een custom Slack bot nodig die via de Anthropic API draait. Die combinatie geeft je het beste van twee werelden: snelle ad-hoc vragen via de standaard app, en geautomatiseerde workflows via je eigen bot.

### Kan ik vertrouwelijke bedrijfsdata door Claude in Slack laten verwerken?

Niet zomaar. Alles wat je in een Slack channel typt, gaat naar Slack's servers en vervolgens naar Anthropic als je Claude aanspreekt. Voor openbare informatie en interne processen (groen) is dat prima. Voor data met klantnamen of bedrijfsgegevens (oranje) pseudonimiseer je eerst. Persoonsgegevens en financiële data (rood) gaan nooit via Slack naar Claude. Gebruik daarvoor een lokale pipeline of een afgesloten API-route met dataclassificatie.

### Werkt Claude in Slack ook met Microsoft Teams?

Claude werkt met beide platformen, maar apart. De Slack-integratie gebruikt de Slack API en Events API. Voor Microsoft Teams bouw je een vergelijkbare bot via de Bot Framework SDK en de Anthropic API. De onderliggende logica is grotendeels herbruikbaar. De interface-laag verschilt. Als je organisatie beide platformen gebruikt, kun je dezelfde Claude-backend laten bedienen door twee aparte bots.

### Wat kost een Claude Slack-integratie?

De Slack-kant is gratis: de Slack API heeft geen kosten voor het ontvangen en versturen van berichten. Je betaalt voor het Anthropic API-gebruik. Bij Claude Sonnet ligt dat rond $3 per miljoen input tokens en $15 per miljoen output tokens. Voor een team van 20 mensen dat gemiddeld 50 vragen per dag stelt, kom je uit op $30 tot $80 per maand. De initieel bouwtijd voor een custom bot is twee tot vijf dagen.
