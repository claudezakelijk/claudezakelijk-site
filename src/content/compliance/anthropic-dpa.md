---
title: "Anthropic verwerkersovereenkomst (DPA)"
titleTag: "Anthropic verwerkersovereenkomst (DPA) uitgelegd"
metaDescription: "Wat de Anthropic DPA dekt, voor welke Claude-abonnementen hij geldt en wat je zelf nog moet regelen. In gewoon Nederlands, met checklist."
h1: "Anthropic verwerkersovereenkomst: wat de DPA dekt en wat jij nog moet regelen"
targetKeywords:
  - anthropic verwerkersovereenkomst
  - anthropic dpa
  - verwerkersovereenkomst
wordCountTarget: 1300
priority: 1
tier: 7
cases:
  - report-engine
internalLinks:
  - /compliance
  - /cases/report-engine
  - /claude-implementatie
  - /compliance/eu-hosting
  - /compliance/is-claude-veilig
  - /compliance/ai-act-mkb
schemaTypes:
  - Article
  - FAQPage
  - BreadcrumbList
author: camiel
competitors:
  - autoriteitpersoonsgegevens.nl
  - ictrecht.nl
  - iapp.org
disclaimer: juridisch
status: published
publishDate: 2026-10-02
updatedDate: null
changelogLine: null
kortAntwoord: "De Anthropic DPA (Data Processing Addendum) is de verwerkersovereenkomst die automatisch bij de zakelijke voorwaarden van Anthropic hoort. Hij dekt de zakelijke producten: de API, Claude Team en Claude Enterprise. Claude Free, Pro en Max vallen erbuiten. De DPA bevat Standard Contractual Clauses voor doorgifte buiten de EU. De zakelijke voorwaarden verbieden training op klantdata. Stand: oktober 2026."
bronnen:
  - titel: "Anthropic Data Processing Addendum (DPA)"
    url: "https://www.anthropic.com/legal/data-processing-addendum"
    geraadpleegd: "2 oktober 2026"
  - titel: "Anthropic Commercial Terms of Service"
    url: "https://www.anthropic.com/legal/commercial-terms"
    geraadpleegd: "2 oktober 2026"
  - titel: "Anthropic Privacy Center, de DPA bekijken en accepteren"
    url: "https://privacy.claude.com/en/articles/7996862-how-do-i-view-and-sign-your-data-processing-addendum-dpa"
    geraadpleegd: "2 oktober 2026"
  - titel: "Anthropic Privacy Center, is Anthropic verwerker of verwerkingsverantwoordelijke?"
    url: "https://privacy.claude.com/en/articles/9267385-does-anthropic-act-as-a-data-processor-or-controller"
    geraadpleegd: "2 oktober 2026"
  - titel: "Anthropic Privacy Center, wordt zakelijke data gebruikt voor modeltraining?"
    url: "https://privacy.claude.com/en/articles/7996868-is-my-data-used-for-model-training"
    geraadpleegd: "2 oktober 2026"
  - titel: "Anthropic over de gewijzigde consumentenvoorwaarden (28 augustus 2025)"
    url: "https://www.anthropic.com/news/updates-to-our-consumer-terms"
    geraadpleegd: "2 oktober 2026"
  - titel: "Anthropic Privacy Center, behaalde certificeringen"
    url: "https://privacy.claude.com/en/articles/10015870-what-certifications-has-anthropic-obtained"
    geraadpleegd: "2 oktober 2026"
  - titel: "Anthropic Privacy Center, waarvoor geldt zero data retention?"
    url: "https://privacy.claude.com/en/articles/8956058-i-have-a-zero-data-retention-agreement-with-anthropic-what-products-does-it-apply-to"
    geraadpleegd: "2 oktober 2026"
  - titel: "Anthropic Privacy Center, waar staan de servers en host Anthropic in de EU?"
    url: "https://privacy.claude.com/en/articles/7996890-where-are-your-servers-located-do-you-host-your-models-on-eu-servers"
    geraadpleegd: "2 oktober 2026"
  - titel: "Anthropic, lijst van sub-verwerkers"
    url: "https://www.anthropic.com/subprocessors"
    geraadpleegd: "2 oktober 2026"
faq:
  - question: "Geldt de Anthropic DPA ook voor Claude Pro?"
    answer: "Nee. De DPA hoort bij de zakelijke voorwaarden van Anthropic en dekt de zakelijke producten, zoals de API en Claude Team en Enterprise. Claude Free, Pro en Max vallen onder de consumentenvoorwaarden. Daar geldt geen verwerkersovereenkomst, en Anthropic mag gesprekken gebruiken voor modeltraining als de gebruiker die instelling aan heeft staan."
  - question: "Moet ik de Anthropic DPA apart ondertekenen?"
    answer: "Nee. Volgens Anthropic is de DPA met Standard Contractual Clauses automatisch onderdeel van de Commercial Terms of Service. Wie die voorwaarden accepteert, accepteert ook de DPA. Bewaar wel een kopie van de geldende versie in je AVG-documentatie en houd bij wanneer Anthropic de tekst wijzigt."
  - question: "Wat als Anthropic sub-verwerkers buiten de EU inzet?"
    answer: "Anthropic gebruikt sub-verwerkers en publiceert de lijst op anthropic.com/subprocessors. Voor doorgifte van persoonsgegevens buiten de EU bevat de DPA Standard Contractual Clauses (module 2 en 3). Bij een nieuwe sub-verwerker krijg je vooraf bericht en kun je binnen 15 dagen schriftelijk bezwaar maken."
  - question: "Vervangt de Anthropic DPA een verwerkersovereenkomst met mijn eigen klanten?"
    answer: "Nee. De Anthropic DPA regelt alleen de relatie tussen jou en Anthropic. Verwerk je klantdata via Claude, dan heb je daarnaast een verwerkersovereenkomst met je eigen klanten nodig waarin je Anthropic als sub-verwerker benoemt. Het zijn twee aparte schakels in dezelfde keten."
  - question: "Traint Anthropic op onze bedrijfsdata?"
    answer: "Standaard niet bij de zakelijke producten. De Commercial Terms zeggen dat Anthropic geen modellen mag trainen op klantcontent. Er zijn twee uitzonderingen: feedback die je zelf instuurt, en gevallen waarin je er zelf voor kiest data te delen. Bij consumentenaccounts (Free, Pro, Max) kiest de gebruiker zelf of chats voor training worden gebruikt."
deadline: null
hasTemplate: false
---

<!--
  Bronnen voor dit artikel over de Anthropic verwerkersovereenkomst / Anthropic DPA (live geopend op 2 oktober 2026):
  - DPA automatisch onderdeel van Commercial Terms; dekt commerciële producten (Claude for Work, API):
    privacy.claude.com artikel 7996862. DPA-pagina toont "Effective February 24, 2025",
    Commercial Terms "Effective June 17, 2025". Contractpartij in de EER: Anthropic Ireland, Limited.
  - "Anthropic may not train models on Customer Content from Services": anthropic.com/legal/commercial-terms.
    Uitzonderingen feedback en eigen keuze: privacy.claude.com artikel 7996868 (update 18 aug 2026).
  - DPA: SCC's module 2 en 3 (I.1), sub-verwerkers bezwaar binnen 15 dagen (C.3), datalekmelding binnen 48 uur (G.1),
    verwijdering binnen 30 dagen na einde overeenkomst (H.1), AES-256 en TLS 1.2+ (Schedule 2).
  - Consumentenvoorwaarden: uitrol 28 aug 2025, keuze uiterlijk 8 okt 2025, 5 jaar bij toestemming, anders 30 dagen:
    anthropic.com/news/updates-to-our-consumer-terms.
  - Certificeringen: SOC 2 Type I & II, ISO 27001:2022, ISO/IEC 42001:2023: privacy.claude.com artikel 10015870.
  - ZDR alleen voor de API en Claude Code op Enterprise: privacy.claude.com artikel 8956058 (update 9 juni 2026).
  - Opslag in de VS: privacy.claude.com artikel 7996890 (update 15 juni 2026).
-->

Vraag bij een willekeurig MKB-bedrijf waar de Anthropic verwerkersovereenkomst ligt, en het blijft meestal stil. Er wordt volop met Claude gewerkt, maar niemand weet of er een DPA geldt, welke versie, en of die het juiste abonnement dekt. Dat doet ertoe: zonder verwerkersovereenkomst voldoe je niet aan de AVG zodra er persoonsgegevens door Claude gaan. En die gaan er in de praktijk bijna altijd doorheen, bijvoorbeeld als klantnaam in een e-mail die je laat herschrijven.

Dit artikel legt uit wat de Anthropic DPA is, voor welke abonnementen hij geldt, wat hij dekt en wat je daarnaast zelf moet regelen.

## Waarom heb je een verwerkersovereenkomst nodig?

Een Data Processing Agreement (DPA), in het Nederlands een verwerkersovereenkomst, is verplicht onder artikel 28 van de AVG (GDPR). Zodra een derde partij persoonsgegevens verwerkt namens jouw organisatie, moet je contractueel vastleggen hoe dat gebeurt. Bij zakelijk Claude-gebruik is Anthropic die verwerker en ben jij de verwerkingsverantwoordelijke. Zo staat het ook in de DPA zelf.

De verplichting rust op jou als verwerkingsverantwoordelijke. De verwerkersovereenkomst is daarmee de juridische basis onder je Claude-gebruik. De bredere context staat in [Claude en de AVG: wat regel je als bedrijf?](/compliance).

## Voor welke Claude-abonnementen geldt de DPA?

Hier gaat het in de praktijk het vaakst mis. De Anthropic DPA (officieel het Data Processing Addendum) is automatisch onderdeel van de Commercial Terms of Service. Wie die voorwaarden accepteert, accepteert ook de DPA. Voor klanten in de Europese Economische Ruimte is Anthropic Ireland, Limited de contractpartij. De DPA dekt de zakelijke producten:

- **De Anthropic API**, dus ook tools die daarop draaien, zoals Claude Code met een API-sleutel.
- **Claude Team en Enterprise** (voorheen Claude for Work): de zakelijke abonnementen.

Claude Free, Pro en Max vallen erbuiten. Dat zijn consumentenproducten onder consumentenvoorwaarden, zonder verwerkersovereenkomst. Sinds de wijziging van die voorwaarden op 28 augustus 2025 kiest elke gebruiker of Anthropic de gesprekken mag gebruiken voor modeltraining. Staat die instelling aan, dan bewaart Anthropic de data tot vijf jaar. Staat hij uit, dan blijft de termijn 30 dagen.

Gebruik je Claude via een ander platform, zoals AWS Bedrock of Google Vertex AI? Dan gelden volgens Anthropic de voorwaarden van dat platform.

Eén collega die klantdossiers in een persoonlijk Pro-account plakt, werkt dus buiten de DPA om. Inventariseer daarom ook de privé-accounts die medewerkers zelf hebben aangemaakt.

## Wat regelt de Anthropic DPA wel?

De belangrijkste onderdelen van de DPA en de zakelijke voorwaarden:

**Doel van de verwerking.** Anthropic verwerkt je persoonsgegevens alleen om de dienst te leveren en volgens jouw instructies. De Commercial Terms zeggen dat Anthropic geen modellen mag trainen op klantcontent. Uitzonderingen zijn feedback die je zelf instuurt en gevallen waarin je er zelf voor kiest data te delen.

**Beveiliging.** De DPA noemt de technische en organisatorische maatregelen, waaronder versleuteling met minimaal AES-256 voor opgeslagen data en TLS 1.2 of hoger voor transport. Anthropic meldt de volgende certificeringen: SOC 2 Type I en Type II, ISO 27001:2022 en ISO/IEC 42001:2023 (de norm voor AI-managementsystemen). Rapporten vraag je op via het Trust Center van Anthropic.

**Sub-verwerkers.** Anthropic publiceert de lijst van sub-verwerkers online. Bij een nieuwe sub-verwerker krijg je vooraf bericht en kun je binnen 15 dagen schriftelijk bezwaar maken.

**Doorgifte buiten de EU.** De DPA bevat Standard Contractual Clauses (SCC's), de standaardclausules van de Europese Commissie, in de varianten module 2 en module 3. Anthropic slaat data op in de Verenigde Staten.

**Datalekken.** Anthropic meldt een beveiligingsinbreuk zonder onnodige vertraging en uiterlijk binnen 48 uur nadat het ervan weet.

**Rechten van betrokkenen.** Anthropic stuurt verzoeken van betrokkenen aan je door en helpt je om eraan te voldoen.

**Verwijdering.** Binnen 30 dagen na het einde van de overeenkomst verwijdert Anthropic de klantdata, behalve waar de wet bewaren eist of waar dat nodig is tegen misbruik.

Daarnaast bestaat Zero Data Retention. Bij die afspraak slaat Anthropic prompts en antwoorden niet op, behalve waar de wet of misbruikbestrijding dat vereist. Anthropic beoordeelt aanvragen per organisatie, via sales. De regeling geldt alleen voor de API en voor Claude Code op Enterprise-abonnementen. Voor sommige modellen blijft een beperkte bewaartermijn gelden.

## Wat lost de DPA niet voor je op?

Deze punten blijven jouw verantwoordelijkheid.

**Welke data je invoert.** De DPA regelt hoe Anthropic verwerkt. Of medische gegevens of BSN's in een prompt thuishoren, beoordeel je zelf, inclusief de vraag of daar een DPIA voor nodig is. Wij maken daar bij implementaties afspraken over: welke categorieën data mogen erin, welke worden eerst gepseudonimiseerd en welke blijven eruit.

**De rest van de keten.** Ben je zelf dienstverlener en verwerk je klantdata via Claude, dan heb je een eigen verwerkersovereenkomst met je klanten nodig waarin Anthropic als sub-verwerker staat. De Anthropic DPA dekt alleen de schakel tussen jou en Anthropic.

**Datalocatie.** De DPA geeft geen garantie dat data binnen de EU blijft. Op het eigen platform van Anthropic is er geen EU-dataresidentie. Juridisch is de doorgifte afgedekt via de SCC's, maar sommige klanten of sectoren eisen meer. De routes daarvoor, zoals Claude via AWS Bedrock met een EU-endpoint, staan in [Claude-data in de EU houden](/compliance/eu-hosting).

## Eén verwerkersovereenkomst is niet genoeg: de praktijk

Hoe dit samenkomt, zie je in een [rapportage-engine](/cases/report-engine) die ons team eerder bij een Nederlands softwarebedrijf bouwde. Daar was de architectuur de eigenlijke privacymaatregel: de data (148 tabellen, 1,55 miljoen rijen) blijft in een lokale DuckDB-database op de eigen server en verlaat die server niet. Voor demo's vervangt een anonimisatielaag klantnamen en bedragen automatisch door fictieve data. Het privacy-verhaal bleek daar een verkoopargument: twee prospects die eerder afhaakten op het cloudvraagstuk, gingen alsnog overstag.

De verwerkersovereenkomst is het juridische fundament. De architectuur bepaalt hoeveel er onder die overeenkomst valt. Hoe minder persoonsgegevens richting een AI-dienst gaan, hoe kleiner je risico en hoe eenvoudiger je compliance-verhaal.

## Checklist: zo zet je de Anthropic DPA goed in

1. **Inventariseer alle Claude-accounts**, ook persoonlijke. Free, Pro en Max vallen buiten de DPA.
2. **Bewaar een kopie van de geldende DPA-versie** in je AVG-documentatie en houd wijzigingen bij.
3. **Controleer de sub-verwerkerslijst** van Anthropic en beoordeel of locatie en type verwerking acceptabel zijn.
4. **Leg de keten vast in je verwerkingsregister** (artikel 30 AVG): jij, Anthropic, en de sub-verwerkers. Ben je dienstverlener, voeg dan de schakel naar je eigen klanten toe.
5. **Bepaal je datagrenzen**: welke informatie mag in prompts, wat wordt gepseudonimiseerd, wat blijft eruit. Beoordeel ook of een DPIA nodig is.

Welke risico's er in het dagelijks gebruik zitten, lees je in [Is Claude veilig voor bedrijfsdata?](/compliance/is-claude-veilig) Wat de AI Act daarnaast vraagt, staat in [Claude en de EU AI Act voor het MKB](/compliance/ai-act-mkb).

Wil je dit niet zelf uitzoeken? Dit regelen we in de eerste week van een [Claude-implementatie](/claude-implementatie), samen met de rest van de veilige inrichting.
