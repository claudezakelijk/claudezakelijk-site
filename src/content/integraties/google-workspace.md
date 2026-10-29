---
title: "Claude koppelen aan Google Workspace"
titleTag: "Claude Google Workspace koppelen: de officiële connector"
metaDescription: "Claude Google Workspace koppelen via de connector: wat Claude in Gmail, Agenda en Drive mag, welk abonnement je nodig hebt en wat de beheerder doet."
h1: "Claude Google Workspace koppelen: de connector voor Gmail, Agenda en Drive"
targetKeywords:
  - claude google workspace koppelen
  - claude koppelen aan google workspace
  - google workspace connector
  - claude gmail koppelen
  - claude google drive koppelen
wordCountTarget: 1631
priority: 2
tier: 3
cases:
  - copilot-studio-agent
internalLinks:
  - /integraties
  - /integraties/microsoft-365
  - /prijs/pro-vs-team-vs-enterprise
  - /compliance/anthropic-dpa
  - /compliance/eu-hosting
  - /compliance/dpia-stappenplan
  - /vergelijken/welke-ai-voor-mkb
  - /cases/copilot-studio-agent
  - /claude-in-30-dagen
schemaTypes:
  - Article
  - FAQPage
  - BreadcrumbList
author: camiel
competitors:
  - support.claude.com
  - knowledge.workspace.google.com
status: published
publishDate: 2026-12-07
updatedDate: null
changelogLine: null
reviewedBy: null
reviewedDate: null
disclaimer: null
kortAntwoord: "Claude koppelen aan Google Workspace doe je met de connectors van Anthropic voor Gmail, Google Agenda en Google Drive. Ze werken in Claude op het web en in Claude Desktop, op elk abonnement. Bij Team en Enterprise zet een eigenaar ze eerst aan. Mail versturen en bestanden delen keur je standaard per actie goed (stand 29 oktober 2026)."
bronnen:
  - titel: "Claude Help Center, Use Google Workspace connectors"
    url: "https://support.claude.com/en/articles/10166901-use-google-workspace-connectors"
    geraadpleegd: "2026-10-29"
  - titel: "Claude Help Center, Use connectors to extend Claude's capabilities"
    url: "https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities"
    geraadpleegd: "2026-10-29"
  - titel: "Claude Help Center, Use Claude in Google Docs, Sheets, and Slides"
    url: "https://support.claude.com/en/articles/16951679-use-claude-in-google-docs-sheets-and-slides"
    geraadpleegd: "2026-10-29"
  - titel: "Google Workspace Help, Control which apps access Google Workspace data"
    url: "https://knowledge.workspace.google.com/admin/apps/control-which-apps-access-google-workspace-data"
    geraadpleegd: "2026-10-29"
  - titel: "Google Workspace Help, Google Workspace with Gemini"
    url: "https://support.google.com/a/topic/13853688"
    geraadpleegd: "2026-10-29"
  - titel: "Claude, plans en prijzen (claude.com)"
    url: "https://claude.com/pricing"
    geraadpleegd: "2026-10-29"
  - titel: "ECB-referentiekoers euro/dollar, 28 oktober 2026 (ecb.europa.eu)"
    url: "https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/eurofxref-graph-usd.en.html"
    geraadpleegd: "2026-10-29"
  - titel: "Anthropic, Introducing Claude for Small Business (13 mei 2026)"
    url: "https://www.anthropic.com/news/claude-for-small-business"
    geraadpleegd: "2026-10-29"
faq:
  - question: "Heeft Claude een officiële Google Workspace connector?"
    answer: "Ja. Anthropic levert zelf connectors voor Gmail, Google Agenda en Google Drive, plus losse connectors voor Docs, Sheets en Slides. Ze werken in Claude op het web en in Claude Desktop, op alle abonnementen. In de stappen van het Claude Help Center komt geen eigen Google Cloud-project of MCP server voor. Je logt in met je eigen Google-account."
  - question: "Kan Claude mail versturen vanuit Gmail?"
    answer: "Ja. Claude kan mail versturen, beantwoorden en doorsturen, en concepten maken. Voor versturen vraagt Claude standaard bij elke mail eerst jouw goedkeuring. Bij Team en Enterprise bepaalt de eigenaar of medewerkers dat mogen overslaan. De inhoud van bijlagen kan Claude in Gmail niet lezen, alleen gegevens als de bestandsnaam."
  - question: "Ziet Claude alle mail en bestanden in ons bedrijf?"
    answer: "Nee. Claude werkt met het Google-account dat de medewerker zelf koppelt. Wat die persoon in Google Workspace niet mag openen, kan Claude via de connector ook niet openen. Claude haalt alleen data op als een vraag of opdracht daarom vraagt. Elke medewerker logt apart in, ook nadat de eigenaar de connector heeft aangezet."
  - question: "Waarom zie ik 'Access blocked' bij het koppelen van Google Drive?"
    answer: "Dan laat je Google Workspace-beheer geen onbekende apps toe. Een beheerder zet Claude in de Google Admin console op Trusted, onder Security, Access and data control, API controls. Daarvoor is het beheerdersrecht Service Settings administrator nodig. Volgens Anthropic duurt het daarna ongeveer 15 minuten voordat de wijziging werkt."
  - question: "Traint Anthropic op de data uit mijn Gmail of Drive?"
    answer: "Anthropic schrijft dat het niet traint op data uit de Gmail-, Drive- en Agenda-connectors. Er is één uitzondering. Op Free, Pro en Max kan tekst die je zelf uit die bronnen in een gesprek plakt wel meetellen, als je modeltraining hebt aangezet. Op Team en Enterprise gelden de zakelijke voorwaarden met verwerkersovereenkomst."
softwareName: "Google Workspace"
softwareUrl: "https://workspace.google.com"
---

<!--
  Feiten gecontroleerd 29-10-2026 bij de bronnen in de frontmatter. Koers ECB 28-10-2026:
  1 EUR = 1,1133 USD. De zelfgebouwde OAuth- en MCP-handleiding uit het concept is weg
  (kalenderrij W9-3). Geen eigen Google-case; ervaring alleen uit copilot-studio-agent.
-->

Claude Google Workspace koppelen doe je met de connectors die Anthropic zelf levert. In de stappen van het Claude Help Center komt geen eigen Google Cloud-project of zelfgebouwde MCP server voor. Je zet de connector aan, logt in met je Google-account en daarna kan Claude zoeken in je mail, je agenda en je Drive. Hieronder lees je welk abonnement je nodig hebt, wat Claude per app mag en wat een beheerder regelt. Andere koppelingen vind je op de pagina [integraties](/integraties). Alle feiten zijn gecontroleerd op 29 oktober 2026.

## Heeft Claude een officiële koppeling met Google Workspace?

Ja, en er zijn twee routes. De eerste zijn de Google Workspace-connectors in Claude zelf. Daarmee werk je in een gesprek op claude.ai of in Claude Desktop, en haalt Claude informatie uit Gmail, Google Agenda en Google Drive. Volgens hetzelfde Help Center-artikel zijn er voor live bewerken van Google Docs, Sheets en Slides aparte connectors, die naast het gesprek een venster met het bestand openen.

De tweede route is Claude for Google Workspace. Dat is een extensie uit de Google Workspace Marketplace die een zijbalk met Claude in Docs, Sheets en Slides zet. Daar werk je dus in het bestand zelf, en Claude ziet alleen dat ene bestand, plus de connectors die je zelf aanzet.

Google Workspace stond ook in de lijst van zeven pakketten waarmee Anthropic op 13 mei 2026 Claude for Small Business aankondigde. Werkt je bedrijf in Microsoft 365, lees dan [Claude koppelen aan Microsoft 365](/integraties/microsoft-365). Google biedt in Workspace ook een eigen AI-assistent aan, Gemini, met een eigen hoofdstuk in de Google Workspace Help. Twijfel je of Gemini al genoeg is, dan helpt [welke AI past bij je mkb-bedrijf](/vergelijken/welke-ai-voor-mkb).

## Welke abonnementen kunnen de Google Workspace connector gebruiken?

Volgens het Claude Help Center zijn de connectors voor Gmail, Agenda en Drive beschikbaar voor alle gebruikers van Claude en Claude Desktop, dus ook op Free. De extensie in Docs, Sheets en Slides is een bèta voor Pro, Max, Team en Enterprise.

Tabel: Claude-abonnementen en de Google-koppelingen, stand 29 oktober 2026. Prijzen in dollar exclusief btw, euro tegen de ECB-koers van 28 oktober 2026 (1 euro is 1,1133 dollar).

| Abonnement | Prijs per maand | Connectors Gmail, Agenda, Drive | Extensie in Docs, Sheets, Slides |
|---|---|---|---|
| Free | 0 dollar | Ja | Nee |
| Pro | 20 dollar, of 17 dollar bij jaarbetaling | Ja | Ja, bèta |
| Team (2 tot 150 gebruikers) | 25 dollar per gebruiker (22,46 euro), of 20 dollar bij jaarbetaling (17,96 euro) | Ja, na aanzetten door een eigenaar | Ja, bèta |
| Enterprise (minimaal 20 seats) | 20 dollar per seat bij jaarbetaling, plus verbruik | Ja, na aanzetten door een eigenaar | Ja, bèta |

Voor bedrijfsdata kies je een zakelijk abonnement. In het Help Center-artikel over Claude for Google Workspace schrijft Anthropic dat bij Team en Enterprise de Commercial Terms en de Data Processing Addendum van je organisatie gelden, en bij Pro en Max de Consumer Terms. Het verschil lees je in [Pro, Team of Enterprise](/prijs/pro-vs-team-vs-enterprise).

## Wat kan Claude in Gmail, Agenda en Drive?

Claude werkt met de rechten van het Google-account dat je koppelt. Wat jij in Google Workspace niet mag zien, ziet Claude via de connector ook niet. In het antwoord staat naar welke mails, afspraken of documenten Claude keek, met een link naar het origineel als die er is.

Tabel: wat de Google Workspace-connectors per app kunnen volgens het Claude Help Center, stand 29 oktober 2026.

| App | Lezen en zoeken | Schrijven en acties | Beperking |
|---|---|---|---|
| Gmail | Mail zoeken en lezen in gewone taal, labels en threads, opgeslagen concepten | Concepten maken, versturen, beantwoorden en doorsturen | Inhoud van bijlagen niet leesbaar, alleen de gegevens erover. Sommige geavanceerde Gmail-filters werken niet |
| Google Agenda | Eigen afspraken, gedeelde agenda's waar je bij kunt en gezamenlijke vrije tijd van deelnemers | Afspraken maken, wijzigen en verwijderen, terugkerende afspraken, reageren op uitnodigingen | Anthropic noemt geen aparte beperking |
| Google Drive | Docs zoeken, Sheets, Slides, pdf, afbeeldingen en Office-bestanden lezen | Uploaden, mappen maken, bestanden delen, verplaatsen en naar de prullenbak | Alleen tekst wordt gelezen, afbeeldingen in documenten niet |
| Docs, Sheets, Slides | Opmerkingen en suggesties in Docs lezen | Bestanden maken en live bewerken naast het gesprek | Geen grafieken in Slides, en wijzigingen in Slides zijn soms niet live te zien |

Versturen, beantwoorden en doorsturen in Gmail gaan standaard pas door na jouw goedkeuring. Dat geldt ook voor delen, verplaatsen en weggooien in Drive. Op Team en Enterprise bepaalt de eigenaar volgens het Help Center of medewerkers die acties zonder vraag mogen laten doorgaan. Grote mailboxen kunnen trager zijn, en er gelden de limieten van de API's van Google.

## Hoe kun je Claude koppelen aan Google Workspace?

Bij Free, Pro en Max zet je de connector zelf aan. Klik in een gesprek op het plusteken, ga naar **Connectors** en zet Gmail, Google Calendar of Google Drive aan. Daarna log je in bij Google.

Bij Team en Enterprise gaat het in deze volgorde, volgens de Help Center-artikelen over connectors en over de Google Workspace-connectors:

1. Een eigenaar of primaire eigenaar gaat in Claude naar **Organization settings** > **Connectors**.
2. Hij klikt op **Browse connectors**, kiest de Google-connector en klikt op **Add to your team**.
3. Een medewerker zet de connector aan via het plusteken in een gesprek en logt in met het eigen Google-account. Iedereen doet die stap zelf, ook als de eigenaar de connector al heeft aangezet.
4. Ziet de medewerker de melding "Access blocked: your institution's admin needs to review Claude for Google Drive", dan gaat de Google-beheerder naar admin.google.com.
5. De beheerder kiest **Security** > **Access and data control** > **API controls** > **Manage App Access** en daarna **Configure new app**. Hij zoekt Claude, kiest voor wie de instelling geldt en zet de app op **Trusted**.
6. Na ongeveer 15 minuten probeert de medewerker opnieuw te koppelen.

Voor die vijfde stap heeft de beheerder volgens Google het recht Service Settings administrator nodig. De knopnamen in stap 5 komen uit de Google Workspace Help van 29 oktober 2026; het Claude Help Center noemt nog de oudere namen Manage third-party app access en Add app. Volgens het Claude Help Center geldt de goedkeuring ook voor live bewerken in Docs, Sheets en Slides, want dat loopt via dezelfde app Claude for Google Drive.

Wil je een Drive-bestand in een Project zetten? Dat kan alleen in een privé-Project, niet in een gedeeld Project.

## Hoe beperk je wat Claude in Google Workspace mag doen?

Op Team en Enterprise stelt een eigenaar per connector in welke acties mogen. Dat geldt voor de hele organisatie. Een medewerker kan het niet zelf ruimer zetten.

1. Ga naar **Customize** > **Connectors** en kies de Google-connector.
2. Open **Tool permissions**. De rechten staan per soort, zoals alleen lezen en schrijven of verwijderen.
3. Kies per soort of per losse actie **Always allow**, **Needs approval** of **Blocked**.

Zo kun je Claude mail laten zoeken en samenvatten zonder dat er iets verstuurd kan worden. Of je laat Claude bestanden in Drive lezen en blokkeert het maken en bewerken van documenten. Een recht in Claude geeft nooit meer toegang dan het Google-account al heeft.

Aan de Google-kant ziet de beheerder in de Admin console onder **API controls** welke apps bij de data van de organisatie komen. Per app staan daar het aantal gebruikers en de Google-diensten en OAuth-scopes die de app gebruikt, zoals Gmail, Agenda of Drive.

## Wat gebeurt er met je bedrijfsdata?

Claude haalt pas data uit Google als jij een vraag stelt die daarom vraagt, en haalt dan zo weinig mogelijk op. Wat de connector ophaalt, slaat Anthropic op bij het gesprek. Verwijder je het gesprek, dan verwijder je die data ook. Anthropic schrijft dat het niet traint op data uit de Gmail-, Drive- en Agenda-connectors. Op Free, Pro en Max geldt één uitzondering. Tekst die je zelf uit die bronnen in een gesprek plakt, kan voor training meetellen als je dat hebt aangezet.

Op Team en Enterprise zijn gesprekken met gesynchroniseerde inhoud niet te delen, staat in het Help Center-artikel over connectors. Wat de verwerkersovereenkomst regelt, lees je in [de Anthropic verwerkersovereenkomst](/compliance/anthropic-dpa). Waar Anthropic data opslaat, staat in [Claude-data in de EU houden](/compliance/eu-hosting). Laat je Claude mail met veel persoonsgegevens doorzoeken, maak dan eerst een DPIA met het [DPIA-stappenplan voor Claude](/compliance/dpia-stappenplan).

## Heb je nog een eigen MCP server voor Google nodig?

Voor zoeken, lezen en concepten maken in Gmail, Agenda en Drive niet meer. De connector doet dat, met de rechten van de medewerker en met goedkeuring per actie. Een eigen koppeling kan nog zinvol zijn als je de inhoud van Gmail-bijlagen nodig hebt, of als een vast proces zonder chat moet draaien. Daarvoor kun je in Claude een eigen connector via remote MCP toevoegen. Dat kan op alle abonnementen, op Free met één eigen connector.

## Wat is onze ervaring met Claude en Google Workspace?

Met de Google Workspace-connector hebben we nog geen eigen klantcase. We hebben wel eerder zelf de login-laag voor een koppeling gebouwd. Voor de [rapportage-agent](/cases/copilot-studio-agent) bouwden we in 3 weken een agent achter de bedrijfslogin van de klant, via Azure AD. Een rapport ging van 45 minuten handwerk naar 2 minuten. Dat inlogwerk is het deel dat de connector je nu uit handen neemt. Voor Gmail, Agenda en Drive beginnen we daarom met de connector en bouwen we alleen bij als een proces dat echt vraagt. Wil je hulp bij het inrichten voor je team, dan zit dat in [Claude in 30 dagen](/claude-in-30-dagen).
