---
title: "Claude voor zorgsector AVG en NEN 7510"
titleTag: "Claude voor zorgsector AVG en NEN 7510 | ClaudeZakelijk"
metaDescription: "Hoe zorgorganisaties Claude veilig inzetten binnen AVG, NEN 7510 en de EU AI Act. Praktische gids."
h1: "Claude voor zorgsector AVG en NEN 7510"
targetKeywords:
  - claude voor zorgsector avg
  - claude hipaa zakelijk
  - claude nen 7510
wordCountTarget: 1600
priority: 1
tier: 7
cases:
  - knowledge-base
  - report-engine
internalLinks:
  - /compliance
  - /compliance/dpia-stappenplan
  - /compliance/anthropic-dpa
  - /compliance/zero-data-retention
  - /compliance/ai-act-mkb
schemaTypes:
  - Article
  - FAQPage
author: camiel
competitors:
  - nictiz.nl
  - zorgvisie.nl
  - autoriteitpersoonsgegevens.nl
status: draft
publishDate: null
updatedDate: null
changelogLine: null
faq:
  - question: "Mag ik patientgegevens in Claude invoeren?"
    answer: "In principe niet via de standaard cloud-API. Patientgegevens zijn bijzondere persoonsgegevens onder artikel 9 AVG en vallen onder NEN 7510. Ze mogen niet naar cloud-AI-diensten buiten je beveiligde zorgnetwerk worden gestuurd. Alternatieven: gebruik Claude met volledig gepseudonimiseerde data, of draai een lokaal model via Ollama op eigen infrastructuur. De data mag het zorgnetwerk niet verlaten."
  - question: "Wat is het verschil tussen AVG en NEN 7510 bij AI-gebruik?"
    answer: "De AVG regelt de bescherming van persoonsgegevens in het algemeen. NEN 7510 is de Nederlandse norm specifiek voor informatiebeveiliging in de zorg, gebaseerd op ISO 27001 maar met aanvullingen voor medische data. Beide gelden naast elkaar. De AVG zegt dat je medische data moet beschermen, NEN 7510 schrijft voor hoe. Bij AI-gebruik moet je aan beide voldoen."
  - question: "Hoe verhoudt HIPAA zich tot de Nederlandse zorgsector?"
    answer: "HIPAA is de Amerikaanse wet voor bescherming van gezondheidsinformatie. In Nederland geldt niet HIPAA maar de AVG in combinatie met NEN 7510 en de Wet op de Geneeskundige Behandelingsovereenkomst (WGBO). Als je zoekt op claude hipaa zakelijk, weet dan dat Anthropic's HIPAA-compliance relevant is voor Amerikaanse klanten, niet direct voor Nederlandse zorgorganisaties. Voor Nederland kijk je naar de AVG, NEN 7510 en de BIG-registratie."
  - question: "Hebben we een DPIA nodig voor Claude in de zorg?"
    answer: "Vrijwel zeker. De Autoriteit Persoonsgegevens beschouwt verwerking van medische data met AI-technologie als hoog-risico. Je scoort op minimaal drie criteria uit de DPIA-vereisten: nieuwe technologie, bijzondere persoonsgegevens, en kwetsbare betrokkenen (patienten). Een DPIA is dan verplicht onder artikel 35 AVG. Lees ons DPIA-stappenplan voor de concrete aanpak."
deadline: null
hasTemplate: false
---

Claude voor zorgsector AVG: de combinatie van AI en medische data raakt de strengste privacywetgeving die Nederland kent. Patientgegevens zijn bijzondere persoonsgegevens onder artikel 9 AVG (GDPR). NEN 7510 stelt aanvullende eisen aan informatiebeveiliging in de zorg. En de EU AI Act voegt daar vanaf 2 augustus 2026 een laag aan toe voor AI-gebruik in medische contexten. Toch is Claude ook in de zorg bruikbaar, mits je de architectuur goed opzet. Bij ClaudeZakelijk hebben wij de kaders uitgewerkt. Dit artikel legt uit wat kan, wat niet kan, en hoe je het veilig doet.

## Waarom de zorgsector extra regels heeft

Medische data is de meest beschermde categorie persoonsgegevens onder de AVG. Artikel 9 verbiedt de verwerking van bijzondere persoonsgegevens, waaronder "gegevens over gezondheid", tenzij een van de uitzonderingsgronden van toepassing is. In de praktijk betekent dit: je mag medische data alleen verwerken als het noodzakelijk is voor de zorgverlening, de patient toestemming heeft gegeven, of een andere wettelijke grondslag van toepassing is.

NEN 7510 voegt daar de Nederlandse norm voor informatiebeveiliging in de zorg aan toe. Gebaseerd op ISO 27001, maar aangevuld met specifieke eisen voor de zorgsector. Waar ISO 27001 een generieke standaard is, schrijft NEN 7510 voor hoe je informatiebeveiliging inricht voor medische informatie. Dat omvat toegangscontrole, logging, encryptie, incidentrespons en het bewaken van gegevensstromen.

De Wet op de Geneeskundige Behandelingsovereenkomst (WGBO) voegt het medisch beroepsgeheim toe. Zorgverleners mogen patientinformatie niet delen met derden zonder toestemming. Het versturen van patientgegevens naar een externe AI-dienst is een vorm van delen met een derde partij.

Combineer deze drie regelgevingen en je begrijpt waarom de zorgsector de strengste eisen stelt aan AI-gebruik. Het gaat niet alleen om privacy. Het gaat om het medisch beroepsgeheim, de veiligheid van de patient, en het vertrouwen dat de patient in de zorgverlener stelt.

## De gouden regel: medische data is altijd rood

Bij ClaudeZakelijk hanteren we een driezonensysteem voor dataclassificatie: groen (vrij te gebruiken met cloud-AI), oranje (pseudonimiseren voor gebruik), rood (alleen lokaal model, nooit cloud). Medische data is altijd rood. Geen uitzonderingen. Geen grijsgebieden.

Dat betekent: patientnamen, diagnoses, behandelplannen, medicatielijsten, BSN-nummers en alles wat een patient identificeerbaar maakt, mag niet naar de Anthropic API, niet naar ChatGPT van OpenAI, niet naar Google Gemini, niet naar Microsoft Copilot. Niet met een verwerkersovereenkomst. Niet met Zero Data Retention. Niet met EU hosting.

Waarom zo strikt? Omdat de risico-afweging voor medische data fundamenteel anders is dan voor andere bedrijfsdata. Een datalek van klantnamen is een overtreding. Een datalek van medische dossiers is een crisis die het vertrouwen in de zorginstelling ondermijnt, de Autoriteit Persoonsgegevens in beweging brengt, en in het ergste geval de gezondheid van patienten raakt.

De Autoriteit Persoonsgegevens heeft in handhavingsbesluit AP 2023-0048 een zorginstelling beboet voor onvoldoende beveiliging van patientgegevens. Het signaal is duidelijk: medische data vereist de hoogste bescherming.

## Claude voor zorgsector AVG: wat je wel kunt met Claude in de zorg

Strenge regels betekenen niet dat Claude onbruikbaar is in de zorgsector. Er zijn concrete toepassingen die volledig compliant zijn.

**Administratieve taken zonder patientdata.** Beleidsdocumenten schrijven, protocollen opstellen, vergadernotulen samenvatten (zonder patientnamen), formulieren ontwerpen, interne communicatie redigeren. Alles wat geen medische of identificeerbare data bevat, is groen.

**Gepseudonimiseerde data-analyse.** Als je patientdata volledig pseudonimiseert zodat geen enkele combinatie van gegevens terug te leiden is naar een individu, kun je die data door Claude laten analyseren. Pseudonimisering moet voldoen aan de eisen van de AVG: het moet onomkeerbaar zijn voor degene die de data verwerkt. In de praktijk betekent dit: de sleutel mag niet mee naar Claude.

**Kennisbankopbouw.** Voor de [knowledge base](/cases/knowledge-base) die ons team eerder bij een Nederlandse IT-dienstverlener bouwde, maakten we 13 artikelen met 27 screenshots in 5 dagen. Dat bespaart structureel 6+ uur per week. Diezelfde aanpak werkt voor zorgorganisaties: protocollen, behandelrichtlijnen, FAQ's voor patienten, voorlichtingsmateriaal. Allemaal op basis van publieke medische informatie, niet op basis van patientdossiers.

**Rapportage op geaggregeerd niveau.** Bij de [report engine](/cases/report-engine) die ons team eerder bij een Nederlands softwarebedrijf bouwde, verwerken we 281 rapporttypes met 1,55 miljoen rijen. Alle data blijft op de server. De Claude-integratie werkt alleen met geaggregeerde, niet-herleidbare cijfers. Die architectuur is direct toepasbaar in de zorg: rapportages over bezettingsgraden, wachtlijsten (geaggregeerd), financiële overzichten (zonder patientdata).

## NEN 7510 en AI: de aanvullende eisen

NEN 7510 stelt specifieke eisen die je moet meenemen bij elke AI-implementatie in de zorg.

**Toegangscontrole (NEN 7510: 9.1).** Wie heeft toegang tot het AI-systeem? Wie kan data invoeren? Is er rolgebaseerde autorisatie? Bij Claude-gebruik betekent dit: individuele accounts per medewerker, geen gedeelde API-keys, logging van wie welke prompts verstuurt.

**Logging en monitoring (NEN 7510: 12.4).** Alle interacties met AI-systemen moeten gelogd worden. Claude Code houdt sessiegeschiedenis bij, maar je moet die logs integreren in je bestaande audittrail. Bij een audit door de IGJ of de Autoriteit Persoonsgegevens moet je kunnen aantonen wie wanneer welke data door een AI-systeem heeft laten verwerken.

**Gegevensoverdracht (NEN 7510: 13.2).** Data die het zorgnetwerk verlaat, moet versleuteld zijn en er moet een juridische basis voor de overdracht zijn. Bij cloud-AI-diensten gaat data per definitie het netwerk uit. Anthropic gebruikt TLS 1.2+ voor encryptie in transit en biedt Zero Data Retention aan. Maar de vraag is of de data uberhaupt het netwerk mag verlaten. Voor patientgegevens is het antwoord: nee.

**BIG-registratie en verantwoordelijkheid.** Een AI-systeem kan niet verantwoordelijk zijn voor medische beslissingen. Elke output die betrekking heeft op patientenzorg moet beoordeeld worden door een BIG-geregistreerde professional. Claude is een hulpmiddel, nooit een beslisser. Dat is niet alleen een beleidsregel. Het is een wettelijke vereiste.

## DPIA voor Claude in de zorg

Een Data Protection Impact Assessment is vrijwel zeker verplicht als je Claude inzet in een zorgomgeving. Je scoort op minimaal drie van de criteria die de Autoriteit Persoonsgegevens hanteert: nieuwe technologie (AI), bijzondere persoonsgegevens (medische data), en kwetsbare betrokkenen (patienten).

De DPIA moet specifiek ingaan op de AI-component. Niet alleen "we verwerken data via een clouddienst", maar: welk model gebruiken we, hoe garanderen we dat medische data het netwerk niet verlaat, wat zijn de hallucinatierisico's bij medische informatie, en hoe borgen we menselijk toezicht bij output die patientenzorg raakt?

Lees ons [DPIA-stappenplan](/compliance/dpia-stappenplan) voor de concrete aanpak. De [Anthropic DPA](/compliance/anthropic-dpa) is een bouwsteen in die DPIA, maar dekt niet de NEN 7510-specifieke vereisten. Die moet je zelf adresseren.

## Claude HIPAA zakelijk en de Nederlandse context

Als je zoekt op claude hipaa zakelijk, is het belangrijk om te weten dat HIPAA de Amerikaanse wet is. Anthropic biedt HIPAA-compliance aan voor Amerikaanse zorgklanten. In Nederland geldt niet HIPAA maar de AVG, NEN 7510 en de WGBO.

De eisen zijn vergelijkbaar maar niet identiek. HIPAA kent het concept van "covered entities" en "business associates". De AVG werkt met verwerkingsverantwoordelijken en verwerkers. HIPAA staat verwerking bij externe partijen toe met een Business Associate Agreement. Onder de combinatie van AVG en NEN 7510 gelden strengere eisen voor medische data: het medisch beroepsgeheim gaat verder dan de HIPAA privacy rule.

Voor internationale zorgorganisaties die zowel in de VS als in Nederland opereren: je moet aan beide voldoen. De strengste norm prevaleert, en dat is in de meeste gevallen de Nederlandse combinatie van AVG plus NEN 7510.

## EU AI Act en de zorgsector

De EU AI Act classificeert AI-toepassingen in de gezondheidszorg vaak als hoog-risico. Artikel 6 en bijlage III noemen expliciet AI-systemen die bedoeld zijn als medisch hulpmiddel. Vanaf 2 augustus 2026 gelden voor die systemen de zwaarste compliance-eisen: conformiteitsbeoordeling, risicomanagementsysteem, technische documentatie, logging en menselijk toezicht.

Gebruik je Claude als hulpmiddel bij administratieve taken in de zorg, dan valt dat onder minimaal risico. Gebruik je Claude als component in een systeem dat bijdraagt aan diagnose of behandelbeslissingen, dan verschuift de classificatie naar hoog-risico. De toepassing bepaalt de classificatie, net als bij [de AI Act voor MKB](/compliance/ai-act-mkb) in het algemeen.

De [certificeringen van Anthropic](/compliance/zero-data-retention), waaronder ISO 27001 en ISO 42001, ondersteunen je compliance-dossier. Maar ze vervangen niet de sectorspecifieke eisen van NEN 7510. Lees onze [Claude AVG en GDPR gids voor het MKB](/compliance) voor de algemene privacykaders die ook in de zorg de basis vormen.

## Veelgestelde vragen

### Mag ik patientgegevens in Claude invoeren?

In principe niet via de standaard cloud-API. Patientgegevens zijn bijzondere persoonsgegevens onder artikel 9 AVG en vallen onder NEN 7510. Ze mogen niet naar cloud-AI-diensten buiten je beveiligde zorgnetwerk worden gestuurd. Alternatieven: gebruik Claude met volledig gepseudonimiseerde data, of draai een lokaal model via Ollama op eigen infrastructuur. De data mag het zorgnetwerk niet verlaten.

### Wat is het verschil tussen AVG en NEN 7510 bij AI-gebruik?

De AVG regelt de bescherming van persoonsgegevens in het algemeen. NEN 7510 is de Nederlandse norm specifiek voor informatiebeveiliging in de zorg, gebaseerd op ISO 27001 maar met aanvullingen voor medische data. Beide gelden naast elkaar. De AVG zegt dat je medische data moet beschermen, NEN 7510 schrijft voor hoe. Bij AI-gebruik moet je aan beide voldoen.

### Hoe verhoudt HIPAA zich tot de Nederlandse zorgsector?

HIPAA is de Amerikaanse wet voor bescherming van gezondheidsinformatie. In Nederland geldt niet HIPAA maar de AVG in combinatie met NEN 7510 en de Wet op de Geneeskundige Behandelingsovereenkomst (WGBO). Als je zoekt op claude hipaa zakelijk, weet dan dat Anthropic's HIPAA-compliance relevant is voor Amerikaanse klanten, niet direct voor Nederlandse zorgorganisaties. Voor Nederland kijk je naar de AVG, NEN 7510 en de BIG-registratie.

### Hebben we een DPIA nodig voor Claude in de zorg?

Vrijwel zeker. De Autoriteit Persoonsgegevens beschouwt verwerking van medische data met AI-technologie als hoog-risico. Je scoort op minimaal drie criteria uit de DPIA-vereisten: nieuwe technologie, bijzondere persoonsgegevens, en kwetsbare betrokkenen (patienten). Een DPIA is dan verplicht onder artikel 35 AVG. Lees ons [DPIA-stappenplan](/compliance/dpia-stappenplan) voor de concrete aanpak.
