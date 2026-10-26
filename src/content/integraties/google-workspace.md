---
title: "Claude koppelen aan Google Workspace"
titleTag: "Claude Google Workspace koppelen: Gmail, Drive | ClaudeZakelijk"
metaDescription: "Claude koppelen aan Google Workspace: Gmail-triage, Drive-zoekopdrachten en Calendar-automatisering."
h1: "Claude Google Workspace koppelen: Gmail, Drive en Calendar"
targetKeywords:
  - claude google workspace koppelen
  - claude gmail integratie
  - claude google drive koppelen
wordCountTarget: 1400
priority: 2
tier: 3
cases:
  - automation-audit
internalLinks: []
schemaTypes:
  - Article
  - FAQPage
  - BreadcrumbList
softwareName: "Google Workspace"
softwareUrl: "https://workspace.google.com"
author: camiel
competitors: []
status: draft
publishDate: null
updatedDate: null
changelogLine: null
faq:
  - question: "Heeft Claude een kant-en-klare Google Workspace-connector?"
    answer: "Nee. Anthropic levert geen plugin die je met een klik activeert. De koppeling loopt via MCP servers die de Google API's aanspreken. Je configureert OAuth credentials in Google Cloud, geeft de MCP server de juiste scopes, en Claude Code communiceert via dat kanaal met Gmail, Drive en Calendar. Technisch is het een middag werk. Wij hebben het opgezet en draaien het dagelijks."
  - question: "Is het AVG-proof om bedrijfsmail door Claude te laten verwerken?"
    answer: "Dat hangt af van de inhoud. Metadata zoals afzender, onderwerp en timestamp zijn doorgaans groen: vrij te gebruiken. Mailinhoud met persoonsgegevens van klanten of medewerkers is rood: die hoort niet in een cloud-prompt. Werk met een classificatielaag die de inhoud filtert voordat Claude het ziet. Metadata en patronen analyseren kan veilig. Volledige mailteksten met namen en contactgegevens: alleen lokaal verwerken."
  - question: "Kan Claude ook Google Sheets en Google Docs aansturen?"
    answer: "Ja, via dezelfde MCP server-architectuur. De Google Sheets API en Google Docs API werken op dezelfde manier als Gmail en Drive. Claude leest cellen, schrijft data terug, en genereert documenten op basis van templates. Wij richten ons in dit artikel op Gmail, Drive en Calendar omdat die de grootste tijdwinst opleveren, maar de aanpak is identiek voor Sheets en Docs."
  - question: "Wat kost het om Claude aan Google Workspace te koppelen?"
    answer: "De Google Cloud API's zijn gratis tot ruime limieten. De MCP server draait lokaal, dus geen extra hosting. De investering zit in de configuratie: OAuth instellen, scopes bepalen, en de workflows bouwen die bij jouw organisatie passen. Rekenen op een dag voor de basisopzet met Gmail, Drive en Calendar samen."
---

Claude Google Workspace koppelen geeft je directe toegang tot Gmail, Drive en Calendar vanuit Claude Code. Drie tools die je team constant gebruikt en die constant tijd kosten. Mail sorteren, bestanden zoeken, vergaderingen plannen. Claude kan dat werk overnemen. Niet met een kant-en-klare plugin, maar via MCP servers die de Google API's aanspreken. Op ClaudeZakelijk documenteren we hoe dat werkt.

We hebben een vergelijkbare aanpak toegepast bij het [doorlichten van 38 achtergrondprocessen](/cases/automation-audit). Dezelfde systematiek (inventariseren, classificeren, automatiseren) werkt voor het in kaart brengen van je Google Workspace-workflows.

## Stap 1: Google Cloud project en OAuth credentials aanmaken

De koppeling begint in Google Cloud Console. Je maakt een project aan, activeert de API's die je nodig hebt (Gmail API, Google Drive API, Google Calendar API), en configureert OAuth 2.0 credentials. Die credentials geven Claude Code via de MCP server toegang tot je Google Workspace-data.

Kies een OAuth consent screen van het type "Internal" als je een Google Workspace-organisatie hebt. Dat beperkt de toegang tot gebruikers binnen je eigen domein. Geen external consent nodig, geen Google-review. Bij een persoonlijk Google-account moet je external kiezen en je app in test-modus houden.

De scopes bepalen wat Claude mag doen. Wil je alleen mail lezen? Dan volstaat `gmail.readonly`. Wil je ook concepten aanmaken en labels beheren? Dan voeg je `gmail.modify` toe. Hetzelfde geldt voor Drive (`drive.readonly` of `drive`) en Calendar (`calendar.readonly` of `calendar.events`). Begin met read-only scopes. Breid uit wanneer je weet welke schrijfacties je nodig hebt.

## Stap 2: MCP server configureren voor Claude Google Workspace koppeling

Met de OAuth credentials op zak configureer je een MCP server die als brug dient tussen Claude Code en de Google API's. De configuratie gaat in je `.claude/settings.json`:

```json
{
  "mcpServers": {
    "google-workspace": {
      "command": "npx",
      "args": ["-y", "@anthropic/google-workspace-mcp"],
      "env": {
        "GOOGLE_CLIENT_ID": "uit-environment",
        "GOOGLE_CLIENT_SECRET": "uit-environment",
        "GOOGLE_REFRESH_TOKEN": "uit-environment"
      }
    }
  }
}
```

Credentials horen in environment variables, niet in het configuratiebestand. Zet ze in je `.env` of in de shell-configuratie van de machine waar Claude Code draait. De refresh token verkrijg je via de OAuth flow: je logt eenmalig in via de browser, geeft toestemming, en ontvangt een token dat de MCP server hergebruikt.

Test de verbinding door Claude te vragen je laatste vijf mails op te halen. Werkt dat? Dan staat de koppeling.

## Claude Gmail integratie: mail-triage en concepten

Gmail-triage is waar de meeste tijd verloren gaat. Je opent je inbox, scant door tientallen mails, bepaalt per mail of het actie vereist, archiveert de rest. Claude doet dat in seconden.

Via de MCP server leest Claude je inbox, classificeert mails op urgentie en type (actie vereist, ter info, spam, newsletter), en past labels toe. Je definieert de regels: alles van een specifiek domein krijgt label "Klant", facturen gaan naar "Financieel", nieuwsbrieven naar "Later lezen". Claude voert uit.

Concepten aanmaken werkt op dezelfde manier. Claude leest een binnenkomende mail, analyseert de vraag, en schrijft een concept-antwoord dat je alleen nog hoeft te reviewen en te versturen. Geen blanco scherm meer. Bij terugkerende vragen (supportverzoeken, offerte-aanvragen, vergaderverzoeken) herkent Claude het patroon en past het concept aan op basis van eerdere antwoorden.

De AVG-kant: mailmetadata (afzender, onderwerp, timestamps) is doorgaans groen. Mailinhoud met persoonsgegevens classificeer je als oranje of rood, afhankelijk van de gevoeligheid. Bouw een filter die persoonsgegevens uit de prompt houdt wanneer je cloud-verwerking gebruikt.

## Claude Google Drive koppelen: zoeken en organiseren

Google Drive wordt snel een digitale rommelzolder. Duizenden bestanden verspreid over gedeelde drives, mappen en submappen. "Waar stond dat document ook alweer?" is een vraag die dagelijks terugkomt in elk team.

Claude doorzoekt je volledige Drive via de API. Niet alleen op bestandsnaam, maar ook op inhoud. Je vraagt "Zoek het voorstel voor klant X van vorige maand" en Claude retourneert het bestand met een directe link. Geen handmatig klikken door mappenstructuren.

Daarnaast kan Claude bestanden organiseren. Documenten verplaatsen naar de juiste map op basis van naamgevingsconventies. Metadata toevoegen. Duplicaten identificeren. Een rapport genereren van alle bestanden die langer dan 90 dagen niet geopend zijn. Het soort opruimwerk dat niemand handmatig doet maar dat je Drive wel overzichtelijk houdt.

Voor teams die naast Google Drive ook Microsoft 365 gebruiken (Outlook, OneDrive, SharePoint): de MCP-architectuur is identiek. Je kunt beide platformen parallel aansluiten op Claude Code en zoekacties over beide omgevingen laten lopen.

## Google Calendar automatiseren met Claude

Calendar-beheer is het derde stuk van de puzzel. Vergaderingen plannen, beschikbaarheid checken, uitnodigingen versturen, conflicten oplossen. Claude leest je agenda via de Calendar API en handelt de logistiek af.

Concreet: je zegt "Plan volgende week een uur met het development team, vermijd woensdag" en Claude checkt de beschikbaarheid van alle deelnemers, vindt een geschikt moment, en maakt de afspraak aan. Met een locatie, agenda-items en een Google Meet-link als je dat wilt.

Bij terugkerende taken (weekelijkse standups, maandelijkse reviews) bouwt Claude de reeks in een keer aan. Wijzigingen doorvoeren (tijd verschuiven, deelnemer toevoegen) doe je via een prompt in plaats van door de Calendar UI.

De combinatie met Gmail maakt het krachtig. Een mail met "Kunnen we volgende week afstemmen?" triggert Claude om beschikbaarheid te checken en een voorstel terug te mailen. Twee tools, een workflow.

## Beveiliging en AVG-compliance bij Google Workspace-koppelingen

Google Workspace bevat bedrijfskritische data. Mail, documenten, agenda's. De beveiliging van de Claude-koppeling verdient aandacht.

OAuth scopes: geef Claude alleen de rechten die het nodig heeft. Lees-toegang tot mail is genoeg voor triage. Schrijftoegang voeg je toe wanneer je concepten wilt laten aanmaken. Hetzelfde principe geldt voor Drive en Calendar. Least privilege, altijd.

De MCP server draait lokaal op je eigen machine. De OAuth tokens verlaten die machine niet. De data die Claude verwerkt gaat wel naar Anthropic's API. Pas daarom het drielagenmodel toe: groene data (metadata, eigen documenten) gaat direct. Oranje data (klantgerelateerde documenten) pseudonimiseer je. Rode data (persoonsgegevens, BSN-nummers, medische gegevens) verwerk je alleen lokaal.

Google Workspace-beheerders kunnen via het Admin Console precies zien welke API-scopes zijn toegekend en aan welke applicaties. Dat geeft je een audittrail. Combineer dat met logging in de MCP server zelf en je hebt een compleet overzicht van wat Claude heeft gelezen en geschreven.

Voor organisaties die onder de AVG of GDPR vallen: documenteer de verwerking in je verwerkingsregister. Vermeld Anthropic als sub-verwerker als je klantdata door Claude laat lopen. Of richt de pipeline zo in dat gevoelige data lokaal blijft. Beide routes zijn gangbaar. De keuze hangt af van je risicobereidheid en de eisen van je klanten.

## Wat levert de Claude Google Workspace koppeling op

De tijdwinst zit in de herhaling. Elke dag mail sorteren: 20 minuten bespaard. Elke week bestanden zoeken in Drive: een uur terug. Elke vergadering plannen: 10 minuten minder heen-en-weer mailen. Tel dat op over een maand en je hebt een werkdag terug.

Maar de echte waarde zit in de combinatie. Gmail, Drive en Calendar zijn geen losse tools wanneer Claude ze verbindt. Een mail triggert een agenda-afspraak. Een agenda-afspraak genereert een voorbereidingsdocument uit Drive. Een document leidt tot een follow-up mail. Claude orkestreert de flow tussen de drie systemen.

De basisopzet (OAuth, MCP server, eerste workflows) kost een dag. Daarna bouw je uit op basis van wat je team nodig heeft. Geen langlopende projecten, geen maanden wachten op resultaat. Werkende automatisering vanaf dag een.

## Veelgestelde vragen

### Heeft Claude een kant-en-klare Google Workspace-connector?

Nee. Anthropic levert geen plugin die je met een klik activeert. De koppeling loopt via MCP servers die de Google API's aanspreken. Je configureert OAuth credentials in Google Cloud, geeft de MCP server de juiste scopes, en Claude Code communiceert via dat kanaal met Gmail, Drive en Calendar. Technisch is het een middag werk. Wij hebben het opgezet en draaien het dagelijks.

### Is het AVG-proof om bedrijfsmail door Claude te laten verwerken?

Dat hangt af van de inhoud. Metadata zoals afzender, onderwerp en timestamp zijn doorgaans groen: vrij te gebruiken. Mailinhoud met persoonsgegevens van klanten of medewerkers is rood: die hoort niet in een cloud-prompt. Werk met een classificatielaag die de inhoud filtert voordat Claude het ziet. Metadata en patronen analyseren kan veilig. Volledige mailteksten met namen en contactgegevens: alleen lokaal verwerken.

### Kan Claude ook Google Sheets en Google Docs aansturen?

Ja, via dezelfde MCP server-architectuur. De Google Sheets API en Google Docs API werken op dezelfde manier als Gmail en Drive. Claude leest cellen, schrijft data terug, en genereert documenten op basis van templates. Wij richten ons in dit artikel op Gmail, Drive en Calendar omdat die de grootste tijdwinst opleveren, maar de aanpak is identiek voor Sheets en Docs.

### Wat kost het om Claude aan Google Workspace te koppelen?

De Google Cloud API's zijn gratis tot ruime limieten. De MCP server draait lokaal, dus geen extra hosting. De investering zit in de configuratie: OAuth instellen, scopes bepalen, en de workflows bouwen die bij jouw organisatie passen. Reken op een dag voor de basisopzet met Gmail, Drive en Calendar samen.
