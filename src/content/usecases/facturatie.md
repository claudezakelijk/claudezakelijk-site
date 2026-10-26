---
title: "Claude facturatie"
titleTag: "Claude facturatie: facturen verwerken automatiseren | ClaudeZakelijk"
metaDescription: "Claude facturatie voor het verwerken, categoriseren en automatiseren van facturen. Moneybird en Exact Online voorbeelden. Case: 38 scripts, 9 gerepareerd."
h1: "Claude facturatie: facturen verwerken en automatiseren"
targetKeywords:
  - claude facturatie
  - claude factuur verwerken
  - facturen automatiseren claude
wordCountTarget: 1300
priority: 1
tier: 2
cases:
  - automation-audit
internalLinks:
  - /claude-voor-accountants
  - /compliance
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
  - question: "Kan Claude facturen direct inboeken in mijn boekhoudsoftware?"
    answer: "Via MCP servers en de API's van Moneybird, Exact Online, Twinfield of Yuki kan Claude facturatiedata lezen en terugschrijven. Het aanmaken van boekingen is technisch mogelijk. Wij raden een goedkeuringsstap aan: Claude categoriseert en bereidt de boeking voor, jij accordeert."
  - question: "Hoe gaat Claude om met verschillende factuurformaten?"
    answer: "Claude parseert PDF-facturen, e-mail bijlages en gestructureerde data (CSV, XML, UBL). Bij PDF-facturen extraheert Claude Code de tekst via OCR-libraries en herkent standaardvelden: factuurnummer, datum, bedrag, btw, leverancier. Ongebruikelijke layouts vereisen soms een extra parseer-template."
  - question: "Is facturen automatiseren met Claude veilig onder de AVG?"
    answer: "Facturen bevatten bedrijfsnamen, bedragen en soms contactpersonen. Bedrijfsgegevens zijn oranje data: pseudonimiseer namen voor verwerking. Persoonsgegevens op facturen (contactpersoon met e-mailadres) zijn rood: verwerk lokaal of pseudonimiseer. Financiële bedragen zonder herleidbare namen zijn groen."
---

Claude facturatie bespaart MKB-bedrijven uren per week op het verwerken, categoriseren en controleren van facturen. Geen handmatig overtypen van PDF's naar je boekhoudsoftware. Geen vergeten facturen die pas bij de BTW-aangifte opduiken.

## Het probleem: claude factuur verwerken als oplossing voor handwerk

Een gemiddeld MKB-bedrijf ontvangt 50 tot 200 inkoopfacturen per maand. Elke factuur moet gelezen, gecategoriseerd, geboekt en gecontroleerd worden. Bij Moneybird of Exact Online is dat: PDF openen, factuurnummer overtypen, bedrag invullen, BTW-percentage selecteren, grootboekrekening kiezen, opslaan. Per factuur 3 tot 5 minuten. Bij 100 facturen is dat 5 tot 8 uur per maand aan puur administratief werk.

De fouten zitten in de routine. Verkeerde grootboekrekening. BTW-percentage van 21% in plaats van 9%. Factuurdatum versus boekdatum verwisseld. Een creditnota die als factuur wordt geboekt. Elke fout kost meer tijd om te corrigeren dan de oorspronkelijke boeking kostte. Bij de kwartaalafsluiting komen die fouten bovendrijven en kosten ze de [accountant](/claude-voor-accountants) extra uren.

Claude factuur verwerken pakt beide problemen aan: snelheid en consistentie. De verwerking gaat van minuten naar seconden per factuur, en de categorisering is consistent op basis van regels die je definieert en verfijnt.

## Hoe facturen automatiseren claude in de praktijk werkt

Claude Code leest de factuur (PDF, e-mail of gestructureerd bestand), extraheert de relevante velden en categoriseert de boeking. De output is een gestructureerd object dat je boekhoudsoftware kan importeren. Anthropic bouwde Claude met taalvaardigheid die zowel Nederlands als Engels dekt, dus ook Engelstalige facturen van buitenlandse leveranciers worden correct geparsed.

### Facturen lezen en parseren

```
Lees deze inkoopfactuur en extraheer:
- Leverancier (naam, KVK-nummer, BTW-nummer)
- Factuurnummer en datum
- Regels: omschrijving, aantal, stuksprijs, BTW-%
- Totaalbedrag incl. en excl. BTW
- Betalingstermijn en IBAN

Categoriseer op grootboekrekening op basis van
de omschrijving en historische boekingen.
```

Claude extraheert de velden en stelt een grootboekrekening voor op basis van eerdere boekingen voor dezelfde leverancier. "TransIP" gaat altijd naar Hosting. "Coolblue" gaat naar Kantoorbenodigdheden of Hardware, afhankelijk van het orderbedrag. Die regels leren zichzelf na de eerste 20 facturen. Na 50 facturen is de trefzekerheid boven de 90%.

### Facturen automatiseren met Moneybird

Via de Moneybird koppeling haalt Claude openstaande facturen op, matcht ze met bankafschriften en signaleert afwijkingen. Voorbeeldworkflow:

```
1. Haal alle openstaande inkoopfacturen op uit Moneybird
2. Vergelijk met de banktransacties van deze week
3. Match op bedrag en leveranciersnaam
4. Markeer gematchte facturen als betaald
5. Signaleer ongematchte transacties en onbetaalde facturen
6. Genereer een weekoverzicht met aandachtspunten
```

Het resultaat: een wekelijks overzicht van wat betaald is, wat nog openstaat en wat niet klopt. In plaats van handmatig door Moneybird en je bankapp te bladeren. Bij 100 facturen per maand bespaart dit 3 tot 4 uur per maand aan reconciliatie.

### Exact Online integratie

Dezelfde aanpak werkt voor Exact Online. Via de Exact Online integratie leest Claude facturatiedata, boekingen en grootboekrekeningen. Claude kan concept-boekingen aanmaken die je accordeert voor definitieve verwerking. De API ondersteunt zowel lezen als schrijven. De OAuth-authenticatie is eenmalig in te richten.

We gebruiken hetzelfde MCP-patroon voor HubSpot, Google Search Console en Power BI. De architectuur is steeds hetzelfde: MCP server als koppeling, Claude als verwerkingslaag, menselijke goedkeuring als controlepunt.

### BTW-controle en afwijkingen

Claude controleert automatisch of het BTW-percentage klopt bij het type levering. Binnenlandse goederen: 21% of 9%. Intracommunautaire leveringen: 0% met vermelding BTW-nummer. Diensten uit het buitenland: verlegde BTW. Bij afwijkingen signaleert Claude het en stelt de correcte boeking voor. Dat voorkomt fouten die pas bij de aangifte zichtbaar worden.

## Case: automation-audit (38 scripts, 9 gerepareerd)

Het automation-audit project laat zien hoe facturen automatiseren claude past in een bredere automatiseringsstrategie. We inventariseerden 38 achtergrondscripts die draaiden op de server: cron jobs, LaunchAgents, webhook-handlers en API-synchronisaties. 9 daarvan bleken stuk: drie gestopt door een permissiewijziging na een OS-update, twee met verlopen API-tokens, vier met onafgehandelde foutmeldingen.

De audit duurde 2 dagen. Claude Code las elke configuratie, testte de verbindingen en genereerde een statusrapport. De 9 gerepareerde scripts omvatten ook facturatieprocessen: een automatische factuurimport die al 3 weken niet meer draaide zonder dat iemand het had opgemerkt. De facturen stapelden zich op in de inbox terwijl de boekhouding dacht dat alles automatisch ging.

Die situatie is typisch. Automatisering die niemand monitort, faalt stil. Claude Code kan die monitoring-laag zijn: dagelijks controleren of alle processen draaien, signaleren als iets stopt en rapporteren wat aandacht nodig heeft. In dat project draait die monitoring als ochtend-routine: om 07:00 checkt Claude alle 38 scripts en rapporteert afwijkingen.

## Stap voor stap: facturatie automatiseren

1. **Koppel je boekhoudsoftware**: Verbind Claude Code met Moneybird of Exact Online via MCP server en API. Configureer de authenticatie met OAuth of API-tokens. Doorlooptijd: 2 tot 4 uur.
2. **Importeer historische boekingen**: Claude leert van je bestaande boekingen welke leverancier naar welke grootboekrekening gaat. 50 tot 100 historische boekingen is voldoende voor een betrouwbaar categorisatiemodel.
3. **Test met een batch**: Upload 10 facturen en laat Claude categoriseren. Controleer de output en corrigeer waar nodig. Elke correctie verfijnt de regels. Na 3 batches is de nauwkeurigheid stabiel.
4. **Automatiseer de flow**: Configureer een workflow die dagelijks of wekelijks draait: facturen ophalen, categoriseren, concept-boekingen aanmaken en je een goedkeuringsoverzicht sturen.
5. **Monitor**: Stel alerts in voor afwijkingen: onbekende leveranciers, ongebruikelijke bedragen, ontbrekende BTW-nummers, facturen zonder PO-nummer. Claude signaleert, jij beoordeelt.

## Valkuilen en beperkingen

- **OCR-kwaliteit**: Slecht gescande PDF's of foto's van facturen leveren parse-fouten op. Gebruik digitale facturen (e-mail, UBL) waar mogelijk. Bij scans: controleer de extractie steekproefsgewijs. ChatGPT heeft hetzelfde probleem bij slecht leesbare documenten.
- **Complexe BTW**: Verlegde BTW, intracommunautaire leveringen, gemengde facturen met meerdere BTW-percentages: Claude handelt standaardsituaties correct af. Uitzonderingen vereisen specifieke prompt-instructies en controle door de boekhouder.
- **Creditnota's**: Claude herkent creditnota's aan negatieve bedragen en specifieke termen. Maar een creditnota die er uitziet als een factuur (positief bedrag, geen "credit" vermelding) wordt soms verkeerd geclassificeerd. Voeg een expliciete check toe in je workflow.
- **Niet voor de jaarrekening**: Claude categoriseert en boekt. De jaarrekening, de controleverklaring en de fiscale aangifte blijven mensenwerk. Claude levert het voorwerk, de [accountant](/claude-voor-accountants) tekent af. Dat is de lijn die de AI Verordening ook trekt.
- **Meerdere valuta's**: Bij import en export krijg je facturen in USD, GBP of andere valuta's. Claude herkent het valutateken en het bedrag, maar de wisselkoersberekening moet je meegeven of automatiseren via de ECB API. Gebruik altijd de koers op factuurdatum, niet de actuele koers.

## AVG-check

Facturen bevatten bedrijfsnamen, bedragen, KVK-nummers en soms contactpersonen met e-mailadres. De AVG en de GDPR zijn van toepassing zodra er persoonsgegevens op de factuur staan. De classificatie:

| Factuurgegeven | Data-classificatie | Actie |
|---|---|---|
| Bedrijfsnaam en KVK | Oranje | Pseudonimiseer bij verwerking |
| Bedragen en BTW | Groen | Vrij te gebruiken |
| Contactpersoon (naam + e-mail) | Rood | Verwijder of pseudonimiseer |
| Bankgegevens (IBAN) | Rood | Verwijder voor verwerking |

Wij bij ClaudeZakelijk configureren de workflow zo dat alleen de noodzakelijke velden naar Claude gaan. Contactpersonen en bankgegevens worden gestript voor verwerking. De Moneybird-koppeling en Exact Online integratie zijn zo ingericht dat persoonsgegevens je eigen systeem niet verlaten. Anthropic verwerkt de data niet voor modeltraining. De data passeert de Anthropic API, maar wordt na verwerking niet opgeslagen. Bij volumes boven 500 facturen per maand is een lokaal model via Ollama een alternatief dat alle data binnen je eigen netwerk houdt. Meer over privacy: [Claude AVG en GDPR voor MKB](/compliance).

## Veelgestelde vragen
