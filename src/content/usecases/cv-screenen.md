---
title: "Claude CV screenen"
titleTag: "Claude CV screenen en vacatureteksten schrijven | Implementeren.ai"
metaDescription: "Claude CV screenen en vacatureteksten schrijven. Match-scores, AVG-veilige screening en discriminatievrije selectie. Praktijkcase met 25 kandidaten/dag."
h1: "Claude CV screenen en vacatureteksten schrijven"
targetKeywords:
  - claude cv screenen
  - claude vacaturetekst schrijven
wordCountTarget: 1400
priority: 1
tier: 2
cases:
  - sdr-sales-agent
internalLinks:
  - /use-cases/e-mail-automatiseren
  - /compliance
  - /compliance/dpia-stappenplan
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
  - question: "Mag ik CV's door Claude laten screenen onder de AVG?"
    answer: "Alleen als je de persoonsgegevens pseudonimiseert. CV's bevatten namen, adressen, geboortedata en werkgeschiedenis. Dat is rode data. Vervang identificerende gegevens voor je ze aan Claude voorlegt. Laat Claude screenen op vaardigheden en ervaring, niet op identiteit. Wij bouwen die anonimiseringslaag in de workflow."
  - question: "Hoe voorkom ik discriminatie bij AI-screening?"
    answer: "Door expliciete, meetbare criteria te hanteren. Definieer must-haves op basis van vaardigheden, certificeringen en ervaring. Geen criteria op leeftijd, geslacht, afkomst of naam. Claude filtert op wat je instelt. Als je discriminerende criteria invoert, discrimineert het systeem. De verantwoordelijkheid ligt bij de opsteller van de criteria."
  - question: "Kan Claude ook vacatureteksten schrijven?"
    answer: "Ja. Je geeft Claude de functie-eisen, het team, de cultuur en de arbeidsvoorwaarden. Claude genereert een vacaturetekst in jouw tone of voice. Inclusief SEO-optimalisatie voor Indeed en LinkedIn. Na twee tot drie correctierondes schrijft Claude teksten die nauwelijks van handgeschreven vacatures te onderscheiden zijn."
  - question: "Hoe betrouwbaar zijn de match-scores?"
    answer: "De scores zijn zo goed als je criteria. Bij heldere, meetbare eisen (3+ jaar Python, BSc informatica) zijn de scores consistent en reproduceerbaar. Bij vage eisen (teamplayer, proactief) wordt de score minder betrouwbaar. Begin met harde criteria en voeg zachte criteria toe als de shortlist te lang is."
---

Claude CV screenen en vacatureteksten schrijven bespaart recruiters en HR-teams uren per vacature. De resultaten: snellere shortlists, consistentere beoordelingen en vacatureteksten die beter converteren.

## Het probleem: waarom claude cv screenen nodig is

Een populaire vacature levert 100 tot 200 sollicitaties op. Een recruiter besteedt gemiddeld 2 tot 3 minuten per CV aan de eerste screening. Bij 150 CV's is dat 5 tot 7,5 uur aan eerste beoordeling. En dan begint het eigenlijke werk pas: gesprekken plannen, referenties checken, assessments organiseren.

De kwaliteit van die screening varieert. CV nummer 1 krijgt meer aandacht dan CV nummer 147. Goede kandidaten worden gemist omdat de recruiter moe is. Slechte kandidaten komen door omdat het CV er professioneel uitzag. Het proces is niet reproduceerbaar: twee recruiters beoordelen dezelfde stapel anders.

Bij het schrijven van vacatureteksten speelt een vergelijkbaar probleem. Elke vacature vraagt om een nieuwe tekst. Tone of voice moet consistent zijn met je employer brand. SEO-optimalisatie voor Indeed en LinkedIn vraagt specifieke kennis. Een gemiddelde vacaturetekst kost 1 tot 2 uur schrijfwerk. Bij 20 vacatures per jaar is dat 20 tot 40 uur alleen aan schrijven.

Het alternatief: een wervingsbureau. Dat kost 15 tot 25% van het bruto jaarsalaris per geplaatste kandidaat. Bij een salaris van 60.000 euro is dat 9.000 tot 15.000 euro per vacature. Claude cv screenen kost een fractie daarvan.

## Hoe claude cv screenen en claude vacaturetekst schrijven werken

Claude leest elk CV, toetst het aan vooraf gedefinieerde criteria en genereert een gerankte lijst met onderbouwing per kandidaat. De recruiter beoordeelt de top 10 tot 15 in plaats van alle 150. Het screening-proces wordt reproduceerbaar: dezelfde criteria, dezelfde weging, elke keer.

### Stap 1: Screeningcriteria definiëren

Stel meetbare must-haves op:

```
Screen deze CV's op de volgende criteria:

Must-haves (knock-out):
- Minimaal 3 jaar ervaring in Python of Java
- BSc informatica of vergelijkbaar
- Werkervaring in Nederland of EU

Nice-to-haves (bonuspunten):
- Ervaring met cloud platforms (AWS, Azure, GCP)
- Kennis van CI/CD pipelines
- Nederlandstalig (mondeling en schriftelijk)

Output: gerankte lijst met score (0-100),
motivatie per kandidaat, en rode vlaggen.
```

De criteria zijn meetbaar en objectief. Geen ruimte voor onbewuste bias op naam, leeftijd of geslacht. Dat is ook wat de AI Verordening van de EU vereist bij AI-gestuurde selectie: transparante, uitlegbare criteria met menselijk toezicht.

### Stap 2: CV's uploaden en verwerken

Upload de CV's als batch. Claude Code verwerkt ze sequentieel en genereert per CV een scorekaart. De output bevat:

- **Score** (0-100) op basis van de gewogen criteria
- **Match-analyse**: welke must-haves zijn aanwezig, welke ontbreken
- **Rode vlaggen**: gaten in het CV, inconsistenties, ontbrekende informatie
- **Shortlist-advies**: top kandidaten met motivatie
- **Vervolgvragen**: wat je aan de kandidaat wilt vragen in het eerste gesprek

Bij 150 CV's levert dit een gerankte lijst op in 15 tot 20 minuten. Handmatig kost dat 5 tot 7,5 uur.

### Stap 3: Claude vacaturetekst schrijven

Voor de vacaturetekst geef je Claude de context:

```
Schrijf een vacaturetekst voor Senior Python Developer.
Team: 6 developers, Agile/Scrum, remote-first.
Stack: Python, FastAPI, PostgreSQL, AWS.
Cultuur: informeel, eigenaarschap, geen micromanagement.
Arbeidsvoorwaarden: 65-80K, 30 vakantiedagen, opleidingsbudget.
Tone of voice: direct, geen corporate jargon.
Optimaliseer voor Indeed en LinkedIn zoekresultaten.
```

Claude vacaturetekst schrijven levert een complete tekst op met functieomschrijving, vereisten, arbeidsvoorwaarden en een sterke slotparagraaf. Na feedback pas je de prompt aan en regenereert Claude de tekst. Na twee tot drie iteraties heb je een tekst die past bij je employer brand.

De SEO-optimalisatie is ingebouwd: Claude kent de zoektermen die kandidaten gebruiken op Indeed en LinkedIn. De vacaturetitel, de structuur en de zoekwoorden zijn afgestemd op hoe platforms vacatures ranken.

## Case: sdr-sales-agent (scoring en personalisatie op schaal)

Het sdr-sales-agent project toont hoe scoring en personalisatie op schaal werken. In dat project genereert Claude 25 gepersonaliseerde sales-emails per dag. Het systeem scoort prospects op basis van meerdere criteria en past de communicatie aan op het profiel. De open rate steeg van 8% naar 34%.

Dezelfde scoring-logica werkt voor CV-screening. Je definieert criteria, weegt ze, en Claude past de weging consistent toe op elke kandidaat. Het verschil met handmatige screening: Claude vergeet geen criterium bij kandidaat nummer 130. De weging verschuift niet omdat het vrijdagmiddag is. En de motivatie per score is traceerbaar en reproduceerbaar.

De 10 schrijfregels die we voor sales-e-mails ontwikkelden, groeiden naar 23 regels door iteratieve verfijning. Diezelfde aanpak werkt voor vacatureteksten en [e-mail workflows](/use-cases/e-mail-automatiseren): begin met basisinstructies, verfijn op basis van feedback, en bouw een set prompt-templates die consistent output levert.

De personalisatie-motor uit dat project is herbruikbaar. Het patroon (data ophalen, scoren, personaliseren, output genereren) werkt voor elke use case waar je individuele communicatie op schaal nodig hebt. CV-feedback naar kandidaten, afwijzingsberichten, uitnodigingen voor gesprekken via Microsoft Outlook of Gmail.

## Integratie met je bestaande HR-systemen

Claude cv screenen werkt niet als eiland. De workflow integreert met je ATS (Applicant Tracking System), je e-mailsysteem en je CRM. Via MCP servers verbindt Claude Code met de API's van veelgebruikte HR-tools.

De data-flow: CV's komen binnen via je ATS of via een gedeelde mailbox. Claude parseert de documenten, scoort ze tegen je criteria en schrijft de resultaten terug naar je ATS. De recruiter ziet de gerankte lijst in het systeem dat die al kent. Geen extra tool, geen nieuw dashboard. De output past in de bestaande workflow.

Claude vacaturetekst schrijven integreert op dezelfde manier: de vacaturetekst wordt gegenereerd op basis van de functie-eisen in je ATS, en na goedkeuring direct gepubliceerd naar Indeed, LinkedIn en je eigen website. Een slash command, drie publicatiekanalen.

We hebben dit patroon ingezet voor een recruitmentbureau met 8 actieve vacatures tegelijk. De tijdsbesparing: 2 uur per week op vacatureteksten, 4 uur per week op CV-screening. De consistentie in beoordeling ging omhoog: dezelfde criteria, dezelfde weging, ongeacht wie de screening uitvoert. De output is een CSV-bestand dat direct in het ATS geimporteerd wordt. Geen handmatig overtypen van scores. En de vacatureteksten worden gegenereerd in de tone of voice van het bureau, niet in generiek AI-proza.

## Valkuilen en beperkingen

- **Bias in criteria**: Claude filtert op wat je instelt. Als je "universiteit X" als criterium opneemt, filtert het op universiteit X. De verantwoordelijkheid voor eerlijke criteria ligt bij jou. De AI Verordening van de EU classificeert AI-screening van werknemers als hoog-risico. Dat betekent documentatieplicht, menselijk toezicht en een DPIA.
- **CV-parsing**: Niet alle CV-formaten worden foutloos geparsed. Zwaar opgemaakte PDF's met tabellen, kolommen en grafische elementen leveren soms verlies van informatie op. Platte tekst en eenvoudige PDF's werken het best. Canva-CV's met veel design zijn problematisch.
- **Zachte criteria**: "Teamplayer" en "proactief" zijn niet meetbaar. Claude kan ze niet betrouwbaar beoordelen op basis van een CV. Gebruik die criteria pas in het sollicitatiegesprek. Hetzelfde geldt voor "cultural fit": dat is per definitie subjectief.
- **Volume**: Bij meer dan 50 CV's per batch wordt de verwerking trager. Splits grote batches in groepen van 20 tot 30 voor optimale doorlooptijd.
- **ChatGPT als alternatief**: Voor losse CV's werkt ChatGPT prima. Het verschil met Claude Code: workflow-automatisering. Claude Code draait als geautomatiseerd proces met vaste templates, scoring-logica en batch-verwerking. Anthropic biedt via de Claude API ook de mogelijkheid om dit te integreren in je eigen ATS.

## AVG-check

CV's bevatten per definitie persoonsgegevens. Naam, adres, geboortedatum, werkgeschiedenis, soms een foto. Dat is rode data onder de AVG en de GDPR. Je mag die gegevens niet zonder meer naar een cloud-AI sturen.

De oplossing: pseudonimiseer voor verwerking. Vervang namen door codes (Kandidaat-001), verwijder adressen en geboortedata, behoud alleen de relevante ervaring en vaardigheden. Claude screent op competenties, niet op identiteit.

Bij Implementeren.ai bouwen we die anonimiseringslaag in de workflow. De persoonsgegevens verlaten je eigen systeem niet. Claude ziet alleen de gepseudonimiseerde versie. Na de screening koppel je de scores terug aan de originele kandidaten in je eigen ATS.

De GDPR vereist een DPIA bij geautomatiseerde besluitvorming over personen. CV-screening met AI valt daar ondubbelzinnig onder. Documenteer welke criteria je hanteert, wie toezicht houdt en hoe kandidaten bezwaar kunnen maken. Lees meer over de stappen: [DPIA stappenplan](/compliance/dpia-stappenplan). En bekijk onze [AVG-gids voor Claude](/compliance).

## Veelgestelde vragen
