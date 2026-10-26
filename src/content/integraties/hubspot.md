---
title: "Claude koppelen aan HubSpot"
titleTag: "Claude HubSpot koppelen: CRM-automatisering | ClaudeZakelijk"
metaDescription: "Claude koppelen aan HubSpot voor lead-enrichment, sales-mails en klantanalyses. Stappenplan met MCP."
h1: "Claude HubSpot connector Nederlands: CRM automatiseren"
targetKeywords:
  - claude hubspot connector nederlands
  - hubspot claude koppelen
wordCountTarget: 1500
priority: 2
tier: 3
cases:
  - customer-intelligence
  - sdr-sales-agent
internalLinks:
  - /use-cases/sales-outreach
  - /claude-voor-marketingbureaus
schemaTypes:
  - Article
  - FAQPage
  - BreadcrumbList
author: camiel
competitors:
  - hubspot.com/nl
  - webs.nl
  - fastslowmotion.com
status: draft
publishDate: null
updatedDate: null
changelogLine: null
faq:
  - question: "Heeft HubSpot een officieel Claude-plugin?"
    answer: "Nee. HubSpot heeft geen native Claude-integratie. Je bouwt de koppeling via MCP: een protocol waarmee Claude Code lokaal met de HubSpot API communiceert. Dat geeft je meer flexibiliteit dan een standaard plugin, omdat je zelf bepaalt welke data Claude mag lezen en schrijven."
  - question: "Kan ik klantdata uit HubSpot veilig door Claude laten verwerken?"
    answer: "Dat hangt af van het datatype. Dealwaarden, pipeline-stadia en bedrijfsnamen zijn doorgaans groen: vrij te gebruiken. E-mailadressen en telefoonnummers van contactpersonen zijn oranje: pseudonimiseer ze voordat ze in een prompt gaan. Persoonsgegevens zoals BSN of medische notities zijn rood en gaan niet naar de cloud. Werk met het drielagenmodel (groen, oranje, rood) en bouw de classificatie in je MCP-configuratie."
  - question: "Werkt deze aanpak ook met Salesforce of Pipedrive?"
    answer: "Ja. Het MCP-protocol is niet HubSpot-specifiek. Zolang je CRM een REST API aanbiedt, kun je een MCP server bouwen die dezelfde functionaliteit biedt. De werkwijze is identiek: server configureren, data ophalen, Claude laten analyseren. Wij hebben het naast HubSpot ook met Autotask en custom CRM-systemen gedaan."
  - question: "Hoeveel kost het om Claude aan HubSpot te koppelen?"
    answer: "De HubSpot API is gratis beschikbaar in alle plannen, inclusief het gratis plan. Claude Code kost 20 dollar per maand. De MCP server draait lokaal, dus geen extra hostingkosten. De tijdsinvestering voor een werkende koppeling is een halve dag tot een dag, afhankelijk van hoeveel HubSpot-objecten je wilt ontsluiten."
softwareName: "HubSpot"
softwareUrl: "https://www.hubspot.com"
---

De Claude HubSpot connector Nederlands die wij bouwen geeft je directe toegang tot je CRM-data vanuit Claude Code. Geen CSV-exports, geen copy-paste tussen tabbladen. Je typt een vraag over een klant of deal, en Claude haalt het antwoord live uit HubSpot. In dit stappenplan leer je hoe je HubSpot Claude koppelen uitvoert, welke workflows je ermee bouwt, en wat dat in de praktijk oplevert.

## Waarom HubSpot Claude koppelen via MCP

HubSpot is het meest gebruikte CRM in de Benelux voor B2B-bedrijven tot 200 medewerkers. De data zit er al in: contacten, deals, bedrijven, activiteiten, e-mailhistorie. Maar die data gebruiken voor iets anders dan handmatig doorklikken is lastig. Reports bouwen in HubSpot kost tijd. Bulk-personalisatie is beperkt. Cross-referencing met andere bronnen zoals Google Search Console of Power BI doe je handmatig.

MCP (Model Context Protocol) lost dat op. Het is een open protocol van Anthropic waarmee Claude Code direct communiceert met externe systemen. Een MCP server voor HubSpot vertaalt Claude's vragen naar HubSpot API calls en geeft de resultaten terug. De server draait lokaal op je machine. Je data gaat niet via een tussenpartij.

Het verschil met de HubSpot API rechtstreeks aanroepen: Claude begrijpt de context. Je hoeft geen API-endpoints te kennen. Je vraagt "Welke deals staan al 30 dagen in de proposal-fase?" en Claude formuleert de juiste API call, verwerkt het resultaat, en geeft je een bruikbaar antwoord.

## Stap 1: Claude HubSpot connector Nederlands installeren

De HubSpot MCP server configureer je in je Claude Code settings. Je hebt een HubSpot API key of private app token nodig. Die maak je aan in HubSpot onder Settings > Integrations > Private Apps.

Voeg de server toe aan je `.claude/settings.json`:

```json
{
  "mcpServers": {
    "hubspot": {
      "command": "npx",
      "args": ["-y", "@anthropic/hubspot-mcp"],
      "env": {
        "HUBSPOT_ACCESS_TOKEN": "${HUBSPOT_TOKEN}"
      }
    }
  }
}
```

Sla je token op als environment variable, niet hardcoded in het configuratiebestand. Na het herstarten van Claude Code verschijnt HubSpot als beschikbare MCP server. Test de verbinding door een simpele query te stellen: "Hoeveel open deals staan er in mijn pipeline?"

De server geeft Claude toegang tot contacten, bedrijven, deals, engagements en properties. Je bepaalt zelf via HubSpot's private app scopes welke objecten leesbaar en schrijfbaar zijn. Begin met alleen lezen. Schrijftoegang voeg je toe als je workflows hebt die dat vereisen.

## Stap 2: klantprofielen verrijken met meerdere databronnen

Een CRM is zo goed als de data die erin zit. De meeste HubSpot-instanties bevatten contactgegevens en dealhistorie, maar missen context. Welke pagina's bezocht een prospect op je website? Hoe presteert de klant op servicegebied? Wat gebeurt er bij het bedrijf op LinkedIn?

Ons team bouwde precies dit eerder bij een Nederlands softwarebedrijf. Vier MCP servers die elk een databron ontsluiten: HubSpot voor CRM-data, Google Search Console voor zoekgedrag, Power BI voor servicedata, en LinkedIn voor bedrijfscontext. Claude combineert die bronnen tot een compleet klantprofiel in een paar seconden.

Een typisch profiel toont: de dealhistorie en pipeline-status uit HubSpot, de zoektermen waarmee het bedrijf je website vond, openstaande tickets en SLA-prestaties uit je BI-platform, en recente bedrijfsontwikkelingen. Het sales team weet voor het gesprek dat de prospect drie keer op de pricing-pagina is geweest en vorige maand een nieuwe directeur heeft aangesteld.

Die combinatie verandert sales van gokken naar weten, zowel voor sales teams als voor [marketingbureaus](/claude-voor-marketingbureaus). De data was er al. Die werd alleen nooit tegelijk bekeken. De [customer-intelligence case](/cases/customer-intelligence) beschrijft de volledige opzet.

## Stap 3: sales-mails genereren vanuit HubSpot-data

Generieke [sales-mails](/use-cases/sales-outreach) werken niet. Iedereen weet dat. Maar handmatig personaliseren voor 25 prospects per dag is onhaalbaar voor een klein sales team.

Ons team bouwde eerder bij een Nederlands softwarebedrijf een systeem dat Claude Code combineert met HubSpot-data om dagelijks 25 gepersonaliseerde sales-mails te genereren. Het proces: een batch selecteert elke ochtend 25 kandidaten uit HubSpot op basis van scoring criteria. Claude schrijft per prospect een email die verwijst naar hun sector, het product dat ze gebruiken, en relevante bedrijfsontwikkelingen.

Het verschil met standaard email-automation in HubSpot: de personalisatie gaat verder dan `{voornaam}` en `{bedrijfsnaam}`. Claude schrijft inhoudelijke zinnen die laten zien dat je het bedrijf kent. Geen templates met variabelen, maar e-mails die lezen alsof een mens ze schreef.

Niets gaat de deur uit zonder menselijke goedkeuring. Een review-dashboard toont alle drafts. Het sales team keurt goed, wijst af of bewerkt. Bij afwijzing geeft de reviewer een reden op. Die feedback wordt opgeslagen en meegenomen in toekomstige drafts. Het systeem begon met 10 schrijfregels en had er na vier weken 23, allemaal gebaseerd op wat het team goedkeurde.

Verzending gaat via MS Graph API vanuit het persoonlijke mailaccount van de medewerker. Geen apart platform als afzender, geen "verzonden namens". Open rates stegen van 8% naar 34%. De volledige werkwijze staat in de [SDR sales agent case](/cases/sdr-sales-agent).

## Stap 4: deal-analyse en pipeline-monitoring automatiseren

HubSpot heeft ingebouwde rapportages, maar die zijn statisch. Je maakt een report, bekijkt het, en vergeet het. Met Claude Code en de HubSpot MCP server bouw je dynamische analyses die je in natuurlijke taal opvraagt.

Voorbeelden van queries die direct werken:

- "Welke deals zijn langer dan 30 dagen in dezelfde fase blijven hangen?"
- "Geef me de gemiddelde dealwaarde per bron over de laatste zes maanden."
- "Welke contacten hebben vorige week een meeting gehad maar geen follow-up activiteit?"
- "Vergelijk de win-rate van dit kwartaal met vorig kwartaal."

Claude haalt de data op via de MCP server, analyseert het resultaat, en geeft een bruikbaar antwoord. Geen dashboard bouwen, geen filters instellen, geen export draaien. Je stelt een vraag en krijgt een antwoord.

Voor terugkerende analyses bouw je Claude Code slash commands. Een `/pipeline-check` die elke maandag de pipeline-gezondheid controleert. Een `/stale-deals` die wekelijks deals opspoort die aandacht nodig hebben. Die commands sla je op in je project en deelt ze met het team.

## Stap 5: AVG-compliance inrichten voor HubSpot-data in Claude

Voordat je HubSpot-data door Claude laat verwerken, moet je de dataclassificatie regelen. Niet alles mag naar de cloud.

Werk met drie zones. Groen: bedrijfsnamen, dealwaarden, pipeline-stadia, activiteitstypes. Die data is niet persoonsgebonden en mag direct naar Claude. Oranje: namen van contactpersonen, e-mailadressen, telefoonnummers. Pseudonimiseer die voordat ze in een prompt gaan. Rood: notities met medische of financiële details, BSN-nummers, privacygevoelige klantdossiers. Die gaan niet naar de cloud.

Bouw de classificatie in je MCP-configuratie. De HubSpot MCP server kan zo worden ingericht dat bepaalde properties automatisch worden geanonimiseerd voordat Claude ze ziet. Contactnaam wordt "Contact-A", emailadres wordt weggelaten. De analyse werkt op de geanonimiseerde data, de oorspronkelijke waarden blijven in HubSpot.

Als je klantdata verwerkt namens derden, ben je verwerker in de zin van de AVG. Vermeld AI-gebruik in je verwerkersovereenkomst. Noem Anthropic als sub-verwerker als klantdata via Claude gaat. Of werk met een lokaal model voor rode data. Die organisatorische stap kost een halve dag, maar voorkomt problemen bij een audit.

## HubSpot Claude koppelen: wat het oplevert

De investering is beperkt: een HubSpot API token (gratis), Claude Code (20 dollar per maand), en een halve dag tot een dag voor de initiële configuratie. Het rendement zit in de uren die je sales team terugkrijgt. Bij 25 mails per dag en 10 minuten besparing per mail praat je over 4 uur per dag. Dat is een halve FTE aan tijdsbesparing voor een tool die 20 dollar per maand kost.

ClaudeZakelijk begeleidt bedrijven bij het opzetten van deze HubSpot-integratie. Van MCP-configuratie tot schrijfregels, van dataclassificatie tot het trainen van je team. [Neem contact op voor een vrijblijvend gesprek over jouw CRM-automatisering](/use-cases/sales-outreach).

## Veelgestelde vragen

### Heeft HubSpot een officieel Claude-plugin?

Nee. HubSpot heeft geen native Claude-integratie. Je bouwt de koppeling via MCP: een protocol waarmee Claude Code lokaal met de HubSpot API communiceert. Dat geeft je meer flexibiliteit dan een standaard plugin, omdat je zelf bepaalt welke data Claude mag lezen en schrijven.

### Kan ik klantdata uit HubSpot veilig door Claude laten verwerken?

Dat hangt af van het datatype. Dealwaarden, pipeline-stadia en bedrijfsnamen zijn doorgaans groen: vrij te gebruiken. E-mailadressen en telefoonnummers van contactpersonen zijn oranje: pseudonimiseer ze voordat ze in een prompt gaan. Persoonsgegevens zoals BSN of medische notities zijn rood en gaan niet naar de cloud. Werk met het drielagenmodel (groen, oranje, rood) en bouw de classificatie in je MCP-configuratie.

### Werkt deze aanpak ook met Salesforce of Pipedrive?

Ja. Het MCP-protocol is niet HubSpot-specifiek. Zolang je CRM een REST API aanbiedt, kun je een MCP server bouwen die dezelfde functionaliteit biedt. De werkwijze is identiek: server configureren, data ophalen, Claude laten analyseren. Wij hebben het naast HubSpot ook met Autotask en custom CRM-systemen gedaan.

### Hoeveel kost het om Claude aan HubSpot te koppelen?

De HubSpot API is gratis beschikbaar in alle plannen, inclusief het gratis plan. Claude Code kost 20 dollar per maand. De MCP server draait lokaal, dus geen extra hostingkosten. De tijdsinvestering voor een werkende koppeling is een halve dag tot een dag, afhankelijk van hoeveel HubSpot-objecten je wilt ontsluiten.
