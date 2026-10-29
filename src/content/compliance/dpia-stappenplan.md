---
title: "DPIA voor Claude"
titleTag: "DPIA voor Claude: stappenplan voor het MKB | Implementeren.ai"
metaDescription: "Wanneer een DPIA verplicht is als je Claude inzet, wat de AP-lijst en artikel 35 AVG vragen en welke input je uit de voorwaarden van Anthropic haalt."
h1: "AI DPIA voor Claude: wanneer verplicht en hoe je hem uitvoert"
targetKeywords:
  - ai dpia claude
  - dpia voor claude
  - dpia uitvoeren
  - verplichte dpia
wordCountTarget: 1647
priority: 1
tier: 7
cases:
  - report-engine
internalLinks:
  - /compliance
  - /compliance/anthropic-dpa
  - /compliance/zero-data-retention
  - /compliance/eu-hosting
  - /compliance/ai-act-mkb
  - /cases/report-engine
  - /claude-implementatie
schemaTypes:
  - Article
  - FAQPage
  - BreadcrumbList
author: camiel
competitors:
  - autoriteitpersoonsgegevens.nl
  - ondernemersplein.overheid.nl
disclaimer: juridisch
status: published
publishDate: 2026-11-02
updatedDate: null
changelogLine: null
reviewedBy: null
reviewedDate: null
kortAntwoord: "Een DPIA voor Claude is verplicht als je verwerking op de lijst van 17 soorten verwerkingen van de Autoriteit Persoonsgegevens staat, of aan twee of meer van de negen Europese criteria voldoet. Zet je Claude in op werknemers, gevoelige gegevens of grote klantbestanden, dan is dat snel het geval. Artikel 35 AVG schrijft de inhoud voor."
bronnen:
  - titel: "AVG (Verordening (EU) 2016/679), artikel 35 en 36, EUR-Lex"
    url: "https://eur-lex.europa.eu/legal-content/NL/TXT/?uri=CELEX:32016R0679"
    geraadpleegd: "2026-10-22"
  - titel: "Autoriteit Persoonsgegevens, Besluit lijst van verwerkingen waarvoor een DPIA verplicht is (Staatscourant 2019, 64418)"
    url: "https://zoek.officielebekendmakingen.nl/stcrt-2019-64418.html"
    geraadpleegd: "2026-10-22"
  - titel: "Artikel 29-werkgroep (nu EDPB), Guidelines on DPIA, WP248 rev.01"
    url: "https://ec.europa.eu/newsroom/article29/items/611236"
    geraadpleegd: "2026-10-22"
  - titel: "Ondernemersplein, DPIA uitvoeren"
    url: "https://ondernemersplein.overheid.nl/dpia-data-protection-impact-assessment-uitvoeren"
    geraadpleegd: "2026-10-22"
  - titel: "Anthropic Data Processing Addendum (DPA)"
    url: "https://www.anthropic.com/legal/data-processing-addendum"
    geraadpleegd: "2026-10-22"
  - titel: "Anthropic Commercial Terms of Service"
    url: "https://www.anthropic.com/legal/commercial-terms"
    geraadpleegd: "2026-10-22"
  - titel: "Anthropic Privacy Center, de DPA bekijken en accepteren"
    url: "https://privacy.claude.com/en/articles/7996862-how-do-i-view-and-sign-your-data-processing-addendum-dpa"
    geraadpleegd: "2026-10-22"
  - titel: "Anthropic Privacy Center, hoe lang bewaart Anthropic organisatiedata?"
    url: "https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data"
    geraadpleegd: "2026-10-22"
  - titel: "Anthropic Privacy Center, waarvoor geldt zero data retention?"
    url: "https://privacy.claude.com/en/articles/8956058-i-have-a-zero-data-retention-agreement-with-anthropic-what-products-does-it-apply-to"
    geraadpleegd: "2026-10-22"
  - titel: "Claude Help Center, Covered Models"
    url: "https://support.claude.com/en/articles/15425695-covered-models"
    geraadpleegd: "2026-10-22"
  - titel: "Anthropic Privacy Center, waar staan de servers?"
    url: "https://privacy.claude.com/en/articles/7996890-where-are-your-servers-located-do-you-host-your-models-on-eu-servers"
    geraadpleegd: "2026-10-22"
  - titel: "Salaris Vanmorgen, consultatie AP over lijst DPIA-uitzonderingen (6 juli 2026)"
    url: "https://www.salarisvanmorgen.nl/2026/07/06/consultatie-lijst-dpia-uitzonderingen-verwerking-persoonsgevens-werknemers/"
    geraadpleegd: "2026-10-22"
faq:
  - question: "Is een DPIA verplicht als ik Claude alleen intern gebruik?"
    answer: "Dat hangt af van de gegevens die je invoert. Schrijf je teksten zonder persoonsgegevens, dan is er geen DPIA nodig. Laat je Claude het functioneren van medewerkers beoordelen of grote aantallen klantdossiers analyseren, dan raak je de AP-lijst of twee Europese criteria. Leg in beide gevallen vast hoe je tot je conclusie kwam."
  - question: "Mag ik een DPIA zelf uitvoeren?"
    answer: "Ja. De AVG legt de DPIA bij de verwerkingsverantwoordelijke en eist geen externe auditor. Je kiest zelf de methode, zolang de vier onderdelen uit artikel 35 lid 7 erin staan. Heb je een functionaris gegevensbescherming, dan vraag je diens advies (lid 2). Anthropic moet redelijke hulp bieden volgens de DPA."
  - question: "Moet ik mijn DPIA herzien als Anthropic een nieuw model uitbrengt?"
    answer: "Artikel 35 lid 11 AVG vraagt een toetsing als het risico verandert. Een nieuw model kan dat doen. Een voorbeeld: voor Claude Fable 5 en Fable 5.1 geldt standaard minimaal 30 dagen bewaren, en zero data retention alleen bij uitzondering. Check bij elke modelwissel of je beschrijving van bewaartermijnen nog klopt."
  - question: "Wanneer moet ik naar de Autoriteit Persoonsgegevens?"
    answer: "Alleen als je DPIA laat zien dat er een hoog risico overblijft dat je met maatregelen niet genoeg verkleint. Dan raadpleeg je de AP vóór je begint (artikel 36 AVG). De AP geeft binnen acht weken schriftelijk advies. Bij een ingewikkelde verwerking kan dat zes weken langer duren."
  - question: "Geldt de Anthropic DPA ook voor Claude Pro?"
    answer: "Nee. De DPA hoort bij de Commercial Terms en dekt de zakelijke producten, zoals de API en Claude Team en Enterprise. Free, Pro en Max vallen onder consumentenvoorwaarden. Werken medewerkers met persoonsgegevens in een eigen Pro-account, dan heb je voor die verwerking geen verwerkersovereenkomst. Neem dat mee in stap 1 van je DPIA."
deadline: null
hasTemplate: false
---

Een AI DPIA voor Claude is een gegevensbeschermingseffectbeoordeling volgens artikel 35 van de AVG. Je maakt hem vóór je Claude inzet op persoonsgegevens met een hoog risico. Deze pagina legt uit wanneer dat zo is volgens de lijst van de Autoriteit Persoonsgegevens (AP) en de Europese criteria. Daarna volgt een stappenplan voor een MKB-bedrijf, met de input die je uit de voorwaarden van Anthropic haalt. Alle feiten zijn gecontroleerd op 22 oktober 2026.

## Wanneer is een DPIA voor Claude verplicht?

Artikel 35 lid 1 AVG zegt het zo: een DPIA is verplicht als een verwerking "waarschijnlijk een hoog risico" oplevert voor de rechten en vrijheden van mensen. Het artikel noemt verwerkingen met nieuwe technologieën daarbij met name. Je maakt de beoordeling vóór de verwerking begint.

Of jouw Claude-gebruik zo'n hoog risico oplevert, toets je op drie plekken:

1. **De lijst van de AP.** Staat je verwerking op de Nederlandse lijst van verplichte DPIA's, dan is de DPIA verplicht.
2. **Artikel 35 lid 3 AVG.** Daarin staan drie gevallen die altijd een DPIA vragen, zoals een systematische en uitgebreide beoordeling van mensen op basis van geautomatiseerde verwerking, waar besluiten met grote gevolgen op volgen.
3. **De negen Europese criteria.** De Europese privacytoezichthouders (toen de Artikel 29-werkgroep, nu de EDPB) noemen negen criteria in hun richtsnoeren WP248. Voldoet een verwerking aan twee of meer, dan is in de meeste gevallen een DPIA nodig.

Twijfel je, doe hem dan toch. Dat adviseren de richtsnoeren zelf, omdat een DPIA ook helpt om aan de rest van de AVG te voldoen.

## Wat staat er op de verplichte DPIA-lijst van de AP?

De AP publiceerde de lijst in de Staatscourant van 27 november 2019. Hij telt 17 soorten verwerkingen. Voor een MKB-bedrijf met Claude zijn deze het relevantst:

- **Profilering (nr. 15):** systematische en uitgebreide geautomatiseerde beoordeling van persoonlijke aspecten, zoals werkprestaties, gezondheid of gedrag.
- **Monitoring van werknemers (nr. 11):** grootschalig of systematisch volgen van wat medewerkers doen, bijvoorbeeld hun e-mail of internetgebruik.
- **Gezondheidsgegevens (nr. 7):** grootschalige verwerking door zorgaanbieders, verzekeraars en onderzoeksinstellingen. Individuele artsen en zorgverleners vallen erbuiten.
- **Financiële situatie en kredietscores (nr. 4 en 5):** grootschalig beoordelen van kredietwaardigheid of inkomen en uitgaven.
- **Communicatiegegevens (nr. 13):** grootschalig monitoren van de inhoud van communicatie of de metadata.

De lijst is niet uitputtend. Staat je verwerking er niet op, dan toets je zelf aan de Europese criteria.

In juli 2026 consulteerde de AP over een conceptlijst van verwerkingen waarvoor juist géén DPIA nodig is. Dat meldt Salaris Vanmorgen. Het concept noemt onder meer personeelsadministratie en salarisverwerking voor werkgevers tot 250 medewerkers, zonder profilering of bijzondere gegevens. Of die lijst inmiddels definitief is, hebben wij op 22 oktober 2026 niet kunnen bevestigen bij de AP.

## Welke Claude-toepassingen vragen om een DPIA?

Artikel 35 lid 1 noemt nieuwe technologieën met name, en criterium 8 van WP248 is "innovatief gebruik of nieuwe technologie". Generatieve AI zoals Claude kun je het veiligst als zo'n technologie behandelen. Dan staat de teller bij elke toepassing met persoonsgegevens al op één criterium. Komt er één bij, dan ben je bij twee.

Tabel: voorbeelden van Claude-toepassingen getoetst aan de AP-lijst en de criteria uit WP248, stand 22 oktober 2026.

| Toepassing | Persoonsgegevens | Raakt AP-lijst of criteria | DPIA |
|---|---|---|---|
| Marketingteksten of offertesjablonen schrijven | Geen | Geen | Niet nodig |
| Losse klantmail herschrijven | Naam, contactgegevens | Criterium 8 | Meestal niet, leg je afweging vast |
| Duizenden supporttickets samenvatten en classificeren | Klantgegevens, op grote schaal | Criterium 5 (grote schaal) en 8 | Verplicht |
| Functioneren of gedrag van medewerkers laten beoordelen | Werknemersgegevens | AP nr. 15, criteria 1, 7 (werknemers) en 8 | Verplicht |
| Cv's laten selecteren of rangschikken | Sollicitantgegevens | Criteria 1 en 8, bij geautomatiseerde besluiten ook 2 | Verplicht |
| Patiënt- of cliëntdossiers analyseren | Gezondheidsgegevens | Criterium 4 en 8, bij grote schaal AP nr. 7 | Verplicht |

Dit is een hulpmiddel. De uitkomst hangt af van jouw situatie, en die leg je vast in je DPIA of in een korte notitie waarom er geen nodig is.

## DPIA uitvoeren voor Claude: welke stappen volg je?

Je mag de methode zelf kiezen, zegt Ondernemersplein, zolang de DPIA voldoet aan de eisen van de AP. Deze volgorde volgt artikel 35 en 36:

1. **Inventariseer het gebruik.** Maak per toepassing een lijst: welk Claude-product (API, Team, Enterprise of een persoonlijk Pro-account), wie het gebruikt, welke gegevens erin gaan en over wie. Persoonlijke Free-, Pro- en Max-accounts vallen buiten de verwerkersovereenkomst van Anthropic.
2. **Toets of de DPIA verplicht is.** Leg de toepassing naast de AP-lijst, artikel 35 lid 3 en de negen criteria. Schrijf je conclusie op, ook als die "niet verplicht" is.
3. **Vraag advies en meningen.** Heb je een functionaris gegevensbescherming, dan wint je diens advies in (lid 2). Vraag waar het past de mening van betrokkenen of hun vertegenwoordigers (lid 9), bijvoorbeeld de ondernemingsraad bij toepassingen op medewerkers.
4. **Beschrijf de verwerking systematisch (lid 7a).** Doel, gegevens, betrokkenen, de keten van jouw organisatie naar Anthropic en diens sub-verwerkers, en de bewaartermijnen.
5. **Beoordeel noodzaak en evenredigheid (lid 7b).** Heb je Claude nodig voor dit doel, en gaan er niet meer gegevens in dan nodig? Pseudonimiseren of weglaten is vaak de grootste winst.
6. **Beoordeel de risico's voor betrokkenen (lid 7c).** Denk aan onjuiste output die een besluit over iemand beïnvloedt, medewerkers die gegevens in een privéaccount plakken, doorgifte naar de VS en te lang bewaren.
7. **Kies maatregelen per risico (lid 7d).** Technisch en organisatorisch. Zie de lijst hieronder.
8. **Bepaal het restrisico.** Blijft er een hoog risico over dat je niet genoeg verkleint, dan raadpleeg je de AP vóór je start (artikel 36). De AP adviseert binnen acht weken, met een mogelijke verlenging van zes weken.
9. **Leg vast, laat besluiten en plan een herziening.** Iemand met beslissingsbevoegdheid tekent. Toets opnieuw als het risico verandert (lid 11), bijvoorbeeld bij een nieuwe toepassing of een nieuw model.

<!-- figuur:1 -->

## Wat haal je uit de voorwaarden van Anthropic voor je DPIA?

Voor stap 4 en 6 heb je feiten over de verwerker nodig. De meeste staan in de DPA, de Commercial Terms en het Privacy Center van Anthropic. De DPA is automatisch onderdeel van de Commercial Terms. Hoe die DPA in elkaar zit, lees je in [Anthropic verwerkersovereenkomst: wat de DPA dekt](/compliance/anthropic-dpa).

Tabel: input uit de documenten van Anthropic voor een DPIA, stand 22 oktober 2026.

| Onderwerp | Wat Anthropic vastlegt | Bron |
|---|---|---|
| Rol | Anthropic is verwerker, jij bent verwerkingsverantwoordelijke | DPA, B.1 |
| Hulp bij DPIA | Redelijke hulp bij DPIA's en bij raadpleging van de toezichthouder | DPA, B.6 |
| Training | Anthropic mag geen modellen trainen op klantcontent | Commercial Terms, B |
| Bewaren API | Prompts en antwoorden binnen 30 dagen verwijderd, met uitzonderingen | Privacy Center |
| Bewaren Team en Enterprise | Chats blijven bewaard zolang jij ze bewaart. Verwijderd: binnen 30 dagen van de backend | Privacy Center |
| Gemarkeerde content | Prompts en antwoorden tot 2 jaar, classificatiescores tot 7 jaar | Privacy Center |
| Zero data retention | Alleen voor de API, Claude Code met een zakelijke API-sleutel en Claude Code op Enterprise, na aanvraag | Privacy Center |
| Covered Models | Fable 5 en Fable 5.1: standaard minimaal 30 dagen bewaren | Help Center |
| Opslag en doorgifte | Data opgeslagen in de VS. Standard Contractual Clauses, module 2 en 3 | Privacy Center, DPA I.1 |
| Sub-verwerkers | Vooraf bericht, 15 dagen om bezwaar te maken | DPA, C.3 |
| Datalek | Melding binnen 48 uur nadat Anthropic ervan weet | DPA, G.1 |
| Einde contract | Data binnen 30 dagen verwijderd, met wettelijke uitzonderingen | DPA, H.1 |
| Audit | Auditrapporten zoals SOC 2 op verzoek, voor zover beschikbaar | DPA, F.1 |

Let op de uitzonderingen in de bewaartermijnen. Feedback die een medewerker met een duim omhoog of omlaag instuurt, bewaart Anthropic 5 jaar. Wat zero data retention wel en niet dekt, staat uitgewerkt in [Claude zero data retention](/compliance/zero-data-retention). Wil je de opslag in de VS beperken, lees dan [Claude-data in de EU houden](/compliance/eu-hosting).

## Welke maatregelen passen bij Claude?

Deze maatregelen zie je vaak terug in stap 7:

- Alleen zakelijke accounts (Team, Enterprise of API) voor werk met persoonsgegevens. Persoonlijke accounts verbied je daarvoor in je beleid.
- Een indeling van gegevens in wat erin mag, wat eerst gepseudonimiseerd wordt en wat buiten Claude blijft.
- Een mens die output controleert voordat die een besluit over een persoon beïnvloedt. Artikel 22 AVG geeft mensen rechten bij volledig geautomatiseerde besluiten.
- Bewaartermijnen afstemmen: chats opruimen in Team en Enterprise, en zero data retention aanvragen als je klanten dat eisen.
- Een kopie van de geldende DPA in je dossier, en de sub-verwerkerslijst in je verwerkingsregister.
- Instructie voor medewerkers over wat ze niet in prompts zetten, en over het niet insturen van feedback met klantgegevens.

## Hoe ziet gegevensbeperking eruit in een echt project?

Op deze site staat nog geen eigen case van een DPIA voor Claude. Wel een project waarin de grootste DPIA-maatregel in de architectuur zat. Bij een [rapportage-engine](/cases/report-engine) voor een Nederlands MSP-softwarebedrijf bouwde ons team in 6 weken een systeem waarbij de data de eigen server niet verlaat. Het gaat om een lokale database met 148 tabellen en 1,55 miljoen rijen. Voor demo's vervangt een anonimisatielaag klantnamen en bedragen door fictieve data. Het bedrijf bespaarde daarnaast 1.200 euro per jaar aan licenties.

Voor een DPIA betekent zo'n opzet dat stap 5 en 6 kort worden: wat niet naar een AI-dienst gaat, levert daar ook geen risico op. Datagrenzen vastleggen doen we in de eerste week van een [Claude-implementatie](/claude-implementatie), samen met de verwerkersovereenkomst.

## Hoe verhoudt de DPIA zich tot de AI Act?

De DPIA komt uit de AVG en gaat over persoonsgegevens. De AI Act gaat over het AI-systeem en het risico van de toepassing. Je hebt dus met beide te maken. Gebruik je Claude voor werving of andere hoog-risicotoepassingen, dan gelden de AI Act-regels daarvoor vanaf 2 december 2027. Wat er nu al geldt, zoals artikel 4 over AI-geletterdheid, lees je in [Claude en de EU AI Act voor het MKB](/compliance/ai-act-mkb). Meer over de AVG-kant van Claude staat op de [compliance-overzichtspagina](/compliance).
