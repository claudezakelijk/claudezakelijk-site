---
title: "Claude meeting notulen"
titleTag: "Claude meeting notulen: vergaderingen samenvatten | Implementeren.ai"
metaDescription: "Automatiseer je claude meeting notulen met AI. Van Teams-opname naar gestructureerde brief in 5 minuten. Bewezen bij IT-consultants."
h1: "Claude meeting notulen: vergaderingen samenvatten"
targetKeywords:
  - claude meeting notulen
  - claude vergadering samenvatten
wordCountTarget: 1400
priority: 1
tier: 2
cases:
  - consultant-brief
internalLinks:
  - /use-cases/offerte-maken
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
  - question: "Welke opnameformaten ondersteunt Claude voor vergadernotulen?"
    answer: "Claude verwerkt MP4 video-opnames met een VTT ondertitelbestand. Teams, Zoom en Google Meet genereren die bestanden standaard. Je uploadt het MP4-bestand en het VTT-transcript, Claude doet de rest. Geen extra software nodig."
  - question: "Hoe lang duurt het verwerken van een vergadering van een uur?"
    answer: "Vijf minuten. In onze consultant-brief case ging de verwerkingstijd van 45 minuten handmatig naar 5 minuten geautomatiseerd. De output is een gestructureerde brief met embedded videoclips, actiepunten en eigenaren."
  - question: "Kan ik Claude meeting notulen gebruiken voor vertrouwelijke gesprekken?"
    answer: "De verwerking loopt via Claude Code op je eigen machine. Je transcript wordt verwerkt in de sessie en niet opgeslagen door Anthropic bij API-gebruik. Voor extra gevoelige gesprekken kun je klantnamen pseudonimiseren voordat je het transcript invoert."
---

Claude meeting notulen maken kost de meeste professionals meer tijd dan de vergadering zelf. Een gesprek van een uur levert een kwartier tot drie kwartier schrijfwerk op. Aantekeningen uitwerken, actiepunten formuleren, eigenaren toewijzen, het verslag versturen. Dat is tijd die je niet besteedt aan het werk dat uit die vergadering volgt. Met Claude automatiseer je die verwerking. Van opname naar gestructureerd verslag in 5 minuten. Geen samenvatting van drie alinea's, maar een brief met embedded videoclips op de relevante momenten, concrete actiepunten en deadlines.

## Claude vergadering samenvatten: hoe het werkt

Het proces begint bij je Teams- of Zoom-opname. Twee bestanden: het MP4-videobestand en het VTT-ondertitelbestand. Teams genereert die automatisch bij elke opname. Zoom en Google Meet bieden vergelijkbare exportopties.

Claude Code leest het VTT-transcript en analyseert de inhoud op structuurblokken. Probleembeschrijving, huidige situatie, gewenste situatie, randvoorwaarden, afspraken, actiepunten. Per blok identificeert het systeem het meest relevante fragment uit de video-opname en koppelt daar een embedded videoclip aan van 30 tot 90 seconden.

De output is een HTML-document. Per onderwerp een korte samenvatting en een afspeelbare clip. Je hoeft de hele opname niet terug te kijken. Lees de samenvatting, klik op een clip als je meer context wilt, en je hebt alle informatie die je nodig hebt.

## De consultant-brief case

Dit systeem is niet hypothetisch. Het draait in productie bij een IT-consultancybureau dat wekelijks assessment-gesprekken voert met klanten.

Voor de automatisering: een consultant had een klantgesprek van een uur. Daarna keek iemand de opname terug, noteerde de kernpunten, en schreef een samenvatting voor de collega die het vervolgtraject zou doen. Dat kostte 45 minuten per gesprek. En eerlijk: niemand keek de hele opname terug. Stukken werden overgeslagen, nuances gemist, en de kwaliteit van de samenvatting hing af van wie die schreef.

Na de implementatie: 5 minuten verwerking per gesprek. Dat bespaart 40 uur per maand bij 3 gesprekken per dag. Het systeem levert 3 tot 5 kernonderwerpen per brief, elk met een samenvatting en een embedded videoclip van het relevante moment. De consultant leest de brief, bekijkt alleen de clips waar extra context nodig is, en start het vervolgtraject met volledige context. Geen informatie meer kwijt, geen afhankelijkheid van wie de aantekeningen maakte.

Doorlooptijd van het hele project: 1 week. Met Claude Code als bouwomgeving, FFmpeg voor de videobewerking, en HTML als outputformaat. De skill draait als een slash command: upload je MP4 en VTT, ontvang je brief.

## Stap voor stap: van opname naar notulen

**Stap 1: Opname starten.** Zet de opname aan in Teams, Zoom of Google Meet. Zorg dat ondertiteling is ingeschakeld zodat het VTT-bestand wordt gegenereerd.

**Stap 2: Bestanden exporteren.** Na de vergadering download je het MP4-bestand en het VTT-ondertitelbestand. Bij Teams vind je beide in de opname via OneDrive of SharePoint. Bij Zoom in je opnamemap.

**Stap 3: Claude Code starten.** Open Claude Code in je terminal. Voer het slash command uit met de twee bestanden als input.

**Stap 4: Verwerking.** Claude analyseert het transcript, identificeert de inhoudelijke blokken, koppelt videoclips, en genereert de brief. Dit duurt 3 tot 5 minuten afhankelijk van de lengte van de vergadering.

**Stap 5: Controleren en versturen.** Open de HTML-brief, controleer de actiepunten en eigenaren, en stuur de brief naar de deelnemers. Of laat je assistent dat doen.

## Wat je mist zonder gestructureerde notulen

De meeste vergaderingen produceren twee soorten output: een vaag verslag dat niemand leest, of helemaal niets. Dat is geen organisatorisch probleem, het is een informatieprobleem. De besluiten zijn genomen, de afspraken zijn gemaakt, maar ze zijn niet vastgelegd op een manier die bruikbaar is.

Bij consultancybureaus verwerken adviseurs meerdere klantgesprekken per week. Zonder gestructureerde notulen gaat context verloren bij overdracht tussen collega's. De consultant die het assessment deed is niet altijd dezelfde als de consultant die het implementatietraject leidt. Die tweede consultant moet de hele opname terugkijken, of afgaan op een haastig geschreven mailtje.

Met de consultant-brief case is die overdracht gestandaardiseerd. Elke brief volgt hetzelfde format: kernonderwerpen, afspraken, actiepunten met eigenaar en deadline, en openstaande vragen voor het volgende gesprek. De vervolgconsultant leest de brief in 5 minuten en start voorbereid. Geen informatie meer verloren bij de overdracht.

## Claude meeting notulen versus andere tools

Er bestaan tools die vergaderingen transcriberen en samenvatten. Otter.ai, Fireflies.ai, Microsoft Copilot in Teams. Het verschil met Claude zit in drie punten.

Ten eerste: de outputstructuur. De meeste tools leveren een lineaire samenvatting. Claude levert een gestructureerd document met aparte secties per onderwerp, actiepunten met eigenaren, en embedded videoclips. Dat is het verschil tussen "hier is wat er is besproken" en "hier is wat je moet doen, wie het doet, en wanneer het af moet zijn."

Ten tweede: de aanpasbaarheid. Bij Otter.ai krijg je de output die Otter.ai levert. Bij Claude definieer je zelf het format. Wil je een sectie voor risico's? Voeg die toe. Wil je de brief in het Engels en Nederlands? Configureer het. De skill is code die je beheert, geen SaaS-product waar je van afhankelijk bent.

Ten derde: de integratie. Claude Code draait op je eigen machine en koppelt via MCP servers aan je bestaande systemen. Autotask, Jira, HubSpot, SharePoint. De notulen kunnen direct actiepunten aanmaken in je projectmanagementsysteem. Geen handmatige copy-paste van de samenvatting naar je ticketing-tool. Combineer dat met [offerte-generatie](/use-cases/offerte-maken) voor een compleet pakket.

## De outputstructuur in detail

Elke brief die het systeem genereert volgt een vast format. Bovenaan een samenvatting van drie tot vijf zinnen: de kernboodschap van het gesprek, de belangrijkste beslissing en de eerstvolgende actie. Daaronder de onderwerpen, geordend op relevantie.

Per onderwerp bevat de brief een samenvatting van twee tot vier zinnen, een embedded videoclip van 30 tot 90 seconden die het relevante moment uit de opname toont, de gemaakte afspraken, de actiepunten met eigenaar en deadline, en eventuele openstaande vragen. De videoclips worden automatisch geknipt uit de originele opname door FFmpeg op basis van de timestamps in het VTT-bestand.

Onderaan de brief staat een sectie met alle actiepunten samengevoegd in een overzichtslijst. Eigenaar, actie, deadline. Die lijst kun je direct kopieerern naar je projectmanagementtool. Bij integratie via MCP servers kan Claude die actiepunten ook direct aanmaken als tickets in Jira, taken in Autotask of items in Microsoft Planner.

Het format is aanpasbaar. Wil je een sectie voor risico's? Een apart blok voor budgetimplicaties? Een samenvatting in het Engels naast de Nederlandse versie? De skill is code die je aanpast aan jouw proces. Niet een SaaS-product met vaste output.

## Toepassingen buiten consultancy

Meeting notulen maken met Claude werkt in elke context waar vergaderingen plaatsvinden en follow-up nodig is. Managementoverleggen waar besluiten genomen worden die vastgelegd moeten worden. Sollicitatiegesprekken waar meerdere interviewers feedback moeten geven. Stuurgroepvergaderingen waar actiepunten naar verschillende afdelingen gaan. Klantoverleggen in de bouw, bij advocatenkantoren, in de zorg.

Bij een advocatenkantoor documenteer je de kernpunten van client-intakes. Bij een bouwbedrijf leg je de afspraken uit bouwvergaderingen vast inclusief de verantwoordelijke aannemer per punt. Bij een zorginstelling verwerk je multidisciplinaire overleggen naar behandelplannen met actiepunten per discipline. Het format verschilt, het proces is hetzelfde: opname invoeren, gestructureerde output ontvangen, controleren en distribueren.

De vergaderverwerking is een van de quickwins die we het vaakst zien: laag risico, direct resultaat, en iedereen in het bedrijf begrijpt het probleem dat het oplost. De doorlooptijd van implementatie is 1 week. De besparing is direct meetbaar in uren per week.

## Veelgestelde vragen

### Welke opnameformaten ondersteunt Claude voor vergadernotulen?

Claude verwerkt MP4 video-opnames met een VTT ondertitelbestand. Teams, Zoom en Google Meet genereren die bestanden standaard. Je uploadt het MP4-bestand en het VTT-transcript, Claude doet de rest. Geen extra software nodig.

### Hoe lang duurt het verwerken van een vergadering van een uur?

Vijf minuten. In onze consultant-brief case ging de verwerkingstijd van 45 minuten handmatig naar 5 minuten geautomatiseerd. De output is een gestructureerde brief met embedded videoclips, actiepunten en eigenaren.

### Kan ik Claude meeting notulen gebruiken voor vertrouwelijke gesprekken?

De verwerking loopt via Claude Code op je eigen machine. Je transcript wordt verwerkt in de sessie en niet opgeslagen door Anthropic bij API-gebruik. Voor extra gevoelige gesprekken kun je klantnamen pseudonimiseren voordat je het transcript invoert. Wij werken met een drielagenmodel (groen, oranje, rood) dat bepaalt welke data naar de cloud mag en welke lokaal blijft.
