---
title: "Claude Zero Data Retention: wat het is en wie het krijgt"
titleTag: "Claude Zero Data Retention (ZDR) uitgelegd | ClaudeZakelijk"
metaDescription: "Wat Zero Data Retention bij Anthropic inhoudt, welke producten eronder vallen, hoe je het aanvraagt en wat Claude standaard bewaart. Stand: 22 oktober 2026."
h1: "Claude Zero Data Retention: wat het is, wat eronder valt en hoe je het aanvraagt"
targetKeywords:
  - claude zero data retention
  - zero data retention
  - anthropic zdr
  - claude dataretentie
wordCountTarget: 1326
priority: 1
tier: 7
cases:
  - report-engine
internalLinks:
  - /compliance
  - /compliance/anthropic-dpa
  - /compliance/is-claude-veilig
  - /compliance/eu-hosting
  - /claude-implementatie
schemaTypes:
  - Article
  - FAQPage
  - BreadcrumbList
author: camiel
competitors:
  - anthropic.com
  - ictrecht.nl
  - iapp.org
disclaimer: juridisch
status: published
publishDate: 2026-10-26
updatedDate: null
changelogLine: null
reviewedBy: null
reviewedDate: null
kortAntwoord: "Zero Data Retention (ZDR) is een afspraak met Anthropic waarbij prompts en antwoorden na het genereren van de respons niet worden opgeslagen. ZDR geldt alleen voor de API, voor Claude Code met een zakelijke API-sleutel en voor Claude Code op Enterprise. Je vraagt het aan via sales, per organisatie, na beoordeling door Anthropic. Stand: 22 oktober 2026."
bronnen:
  - titel: "Claude Platform Docs, API and data retention (ZDR, dekking per feature, Covered Models)"
    url: "https://platform.claude.com/docs/en/manage-claude/api-and-data-retention"
    geraadpleegd: "22 oktober 2026"
  - titel: "Anthropic Privacy Center, waarvoor geldt een zero data retention-overeenkomst?"
    url: "https://privacy.claude.com/en/articles/8956058-i-have-a-zero-data-retention-agreement-with-anthropic-what-products-does-it-apply-to"
    geraadpleegd: "22 oktober 2026"
  - titel: "Anthropic Privacy Center, hoe lang bewaart Anthropic organisatiedata? (1 juli 2026)"
    url: "https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data"
    geraadpleegd: "22 oktober 2026"
  - titel: "Claude Help Center, Covered Models (1 september 2026)"
    url: "https://support.claude.com/en/articles/15425695-covered-models"
    geraadpleegd: "22 oktober 2026"
  - titel: "Claude Code Docs, Zero data retention op Claude for Enterprise"
    url: "https://code.claude.com/docs/en/zero-data-retention"
    geraadpleegd: "22 oktober 2026"
  - titel: "Anthropic Commercial Terms of Service"
    url: "https://www.anthropic.com/legal/commercial-terms"
    geraadpleegd: "22 oktober 2026"
faq:
  - question: "Wat betekent Zero Data Retention in de praktijk?"
    answer: "Met ZDR slaat Anthropic je prompts en de antwoorden van Claude niet op nadat de respons is teruggestuurd. De data bestaat alleen tijdens de verwerking. Er blijven uitzonderingen: resultaten van veiligheidsclassifiers worden bewaard, en content die door de trust-en-safetysystemen wordt gemarkeerd kan tot 2 jaar bewaard blijven. Ook wettelijke bewaarplichten gaan voor."
  - question: "Heb ik nog een verwerkersovereenkomst nodig bij ZDR?"
    answer: "Ja. Ook met ZDR verwerkt Anthropic je data op het moment dat Claude een antwoord genereert, en dat is een verwerking onder de AVG. De DPA van Anthropic is automatisch onderdeel van de Commercial Terms en blijft het juridische fundament. ZDR verkort alleen de bewaartermijn, het vervangt de verwerkersovereenkomst niet."
  - question: "Werkt ZDR ook voor Claude Team of de webinterface van Enterprise?"
    answer: "Nee. De chatinterfaces van Claude Team en Claude Enterprise vallen niet onder ZDR, net als Claude Free, Pro en Max. De ene uitzondering is Claude Code op Claude Enterprise: daarvoor bestaat een eigen ZDR-regeling die Anthropic per organisatie aanzet voor accounts die daarvoor in aanmerking komen."
  - question: "Kan ik Claude Fable 5.1 gebruiken onder ZDR?"
    answer: "Standaard niet. Anthropic heeft Fable 5 en Fable 5.1 aangewezen als Covered Models. Die vereisen minimaal 30 dagen dataretentie voor veiligheidscontroles, op elk platform. Een organisatie met ZDR kan deze modellen wel gebruiken in een aparte workspace waarvoor 30 dagen retentie is aangezet. De overige workspaces houden dan zero data retention."
  - question: "Hoe controleer ik of mijn organisatie ZDR heeft?"
    answer: "In de Claude Console zie je het onder Settings, Privacy Controls, bij Data retention period. Staat daar zero data retention, dan is de regeling actief voor die organisatie. Twijfel je, of heb je meerdere organisaties, check dan je contract of vraag het na bij je Anthropic-accountteam. ZDR geldt per organisatie, nooit automatisch voor allemaal."
deadline: null
hasTemplate: false
---

Claude zero data retention (ZDR) is een afspraak met Anthropic waarbij je prompts en de antwoorden van Claude niet worden opgeslagen nadat de respons is teruggestuurd. Je krijgt het alleen voor de API, voor Claude Code met een zakelijke API-sleutel en, als aparte regeling, voor Claude Code op Claude Enterprise. Anthropic beoordeelt elke aanvraag per organisatie, via het salesteam. Op deze pagina lees je wat eronder valt, wat niet, en wat Anthropic bewaart als je geen ZDR hebt. Alle feiten zijn gecheckt op 22 oktober 2026 bij de bronnen onderaan.

## Wat is Claude zero data retention?

Standaard bewaart Anthropic API-verkeer kort (daarover verderop meer). Onder een ZDR-afspraak slaat Anthropic je prompts en de gegenereerde antwoorden helemaal niet op nadat de API-respons is teruggestuurd. De data bestaat alleen tijdens de verwerking zelf.

Dat is wat anders dan "Anthropic doet niets met je data". Drie dingen blijven ook met ZDR overeind:

1. Anthropic bewaart de resultaten van de veiligheidsclassifiers, om de Usage Policy te kunnen handhaven.
2. Content die de geautomatiseerde trust-en-safetysystemen markeren als mogelijke schending kan tot 2 jaar bewaard blijven.
3. Wettelijke bewaarplichten gaan altijd voor.

ZDR is geen instelling die je zelf aanzet. Het is een contractuele regeling die Anthropic per organisatie toekent, na een beoordeling. Heb je meerdere organisaties in de Claude Console, dan moet elke organisatie apart worden aangezet. ZDR geldt nooit automatisch voor een nieuwe organisatie onder hetzelfde account.

## Welke producten vallen onder ZDR en welke niet?

Dit is de kern, en hier gaat het in gesprekken het vaakst mis. ZDR is een API-regeling. De chatproducten vallen er vrijwel allemaal buiten.

Tabel: dekking van een ZDR-afspraak per product, stand 22 oktober 2026.

| Product | Onder ZDR? | Toelichting |
|---------|-----------|-------------|
| Messages API en Token Counting API | Ja | Voor de features die Anthropic als ZDR-geschikt aanmerkt |
| Claude Code met zakelijke API-sleutel | Ja | Sleutel van een organisatie onder de Commercial Terms |
| Claude Code op Claude Enterprise | Ja, aparte regeling | Alleen voor accounts die in aanmerking komen, apart aan te zetten |
| Claude Free, Pro en Max | Nee | Consumentenproducten, ook als je er Claude Code mee gebruikt |
| Chatinterface van Claude Team en Enterprise | Nee | Alleen Claude Code op Enterprise heeft de eigen regeling hierboven |
| Claude Console (incl. playground) | Nee | Consolegebruik valt buiten de afspraak |
| Claude Managed Agents | Nee | Sessies blijven bestaan tot je ze verwijdert |
| Claude for Excel | Nee | Op dit moment niet ZDR-geschikt |

Ook binnen de API is niet elke feature geschikt. Features die iets moeten opslaan om te werken vallen buiten de afspraak: de Files API bewaart je bestanden tot je ze verwijdert, batchverwerking bewaart jobs 29 dagen en code execution bewaart containerdata tot 30 dagen. Gebruik je zo'n feature, dan kiest je organisatie er zelf voor om voor die specifieke data buiten de ZDR-afspraak te stappen. De API blokkeert dat niet. De volledige featuretabel staat in de documentatie van Anthropic (eerste bron onderaan).

Let op bij metrics logging in Claude Code: productiviteitsdata zoals gebruiksstatistieken valt buiten ZDR en kan bewaard worden.

## Fable-modellen vereisen 30 dagen bewaartermijn

Anthropic heeft Claude Fable 5, Fable 5.1 en de Mythos-varianten aangewezen als Covered Models: modellen waarvan de capaciteiten extra waarborgen vragen. Voor die modellen geldt een minimale dataretentie van 30 dagen, op elk platform, juist omdat sommige vormen van misbruik alleen zichtbaar worden over meerdere verzoeken heen. Prompts en antwoorden worden na die 30 dagen automatisch verwijderd, tenzij er een veiligheidsonderzoek loopt.

Voor een organisatie met ZDR betekent dit dat Fable-modellen standaard niet beschikbaar zijn. Er is een tussenweg: je kunt voor één aparte workspace 30 dagen retentie aanzetten en Fable daar gebruiken, terwijl de rest van de organisatie zero data retention houdt. Anthropic werkt daarnaast vanaf najaar 2026 aan Enterprise Frontier Safeguards, een regeling waarbij de bewaarde monitoringdata in cloudomgeving van de klant zelf kan staan.

## Wat bewaart Anthropic standaard, zonder ZDR?

ZDR is de uitzondering. Dit is de standaard, zoals Anthropic die zelf beschrijft (Privacy Center, 1 juli 2026):

Tabel: standaard bewaartermijnen bij zakelijk Claude-gebruik, stand 22 oktober 2026.

| Situatie | Bewaartermijn |
|----------|---------------|
| API: prompts en antwoorden | Automatisch verwijderd binnen 30 dagen |
| Claude Team en Enterprise: chats | Bewaard zolang jij ze bewaart, voor je chatgeschiedenis |
| Verwijderde chat | Direct uit je geschiedenis, binnen 30 dagen van de backend |
| Gemarkeerd door trust-en-safetysystemen | Prompts en antwoorden tot 2 jaar, classifier-scores tot 7 jaar |
| Feedback die je zelf instuurt | 5 jaar |

Claude Enterprise heeft daarnaast eigen instelbare bewaartermijnen (custom data retention controls), waarmee een beheerder de bewaartermijn van de organisatie zelf bepaalt. Voor veel MKB-organisaties is die combinatie, 30 dagen op de API en zelf ingestelde termijnen in Enterprise, al passend. ZDR is vooral relevant als jouw klanten of toezichthouder eisen dat er helemaal niets bij de leverancier op opslag staat.

## Hoe verhoudt ZDR zich tot de Anthropic DPA?

ZDR vervangt niets, het komt bovenop de bestaande afspraken. De verwerkersovereenkomst van Anthropic (de DPA) is automatisch onderdeel van de Commercial Terms of Service en blijft het juridische fundament onder je Claude-gebruik: ook met ZDR verwerkt Anthropic persoonsgegevens op het moment dat Claude een antwoord genereert, en die verwerking moet onder de AVG contractueel geregeld zijn. Hoe die DPA in elkaar zit lees je in ons artikel over de [Anthropic verwerkersovereenkomst](/compliance/anthropic-dpa).

De Commercial Terms verbieden daarnaast training op klantcontent, met of zonder ZDR. En certificeringen als SOC 2 en ISO 27001 staan er los van: die zeggen iets over hoe veilig de verwerking is, ZDR zegt iets over hoe lang data blijft bestaan. Dat bredere beveiligingsverhaal staat in [Is Claude veilig voor bedrijfsdata?](/compliance/is-claude-veilig) Wil je ook sturen op waar de data verwerkt wordt, lees dan [Claude-data in de EU houden](/compliance/eu-hosting).

In je verwerkingsregister en DPIA is ZDR een maatregel die het restrisico verlaagt: de bewaartermijn bij de verwerker gaat naar vrijwel nul. Het is geen vervanging voor je eigen beoordeling welke data Claude in mag.

## Heb je ZDR eigenlijk nodig?

Eerlijk is eerlijk: wij hebben nog geen klant door een ZDR-aanvraag heen begeleid. Wat we wel uit eigen werk kennen is de route die er vaak aan voorafgaat: minder data naar de API sturen. Bij een [rapportage-engine](/cases/report-engine) die ons team eerder bij een Nederlands softwarebedrijf bouwde, bleef de data (148 tabellen, 1,55 miljoen rijen) op de eigen server en verliet die server niet. Dat bespaarde 1.200 euro per jaar aan licenties, en het maakte het privacygesprek met prospects ineens kort: er ging simpelweg weinig naar buiten.

Die volgorde raden we aan. Bepaal eerst welke data Claude echt nodig heeft en wat je kunt pseudonimiseren of lokaal kunt houden. Wat er dan nog naar de API gaat, dek je af met de DPA, de standaard 30 dagen, en pas als dat niet genoeg is met ZDR. Dit soort datagrenzen stellen we in de eerste week van een [Claude-implementatie](/claude-implementatie) vast.

## Hoe vraag je Anthropic ZDR aan?

De aanvraag is geen formulier in je instellingen. Zo loopt het:

1. Neem contact op met het salesteam van Anthropic en geef aan dat je een zero data retention-afspraak wilt. Heb je meerdere organisaties, noem ze dan allemaal: ZDR wordt per organisatie beoordeeld en aangezet.
2. Anthropic beoordeelt of je organisatie in aanmerking komt. ZDR is onderdeel van je contractvoorwaarden, niet van een standaardabonnement.
3. Na toekenning controleer je het in de Claude Console onder Settings, Privacy Controls, bij Data retention period.
4. Voor Claude Code op Claude Enterprise geldt een aparte regeling: niet inbegrepen in het standaard Enterprise-plan, alleen voor accounts die in aanmerking komen, en apart aan te zetten door Anthropic. Reken erop dat features die opslag vereisen (zoals cloud sessions) dan uitgeschakeld worden.

Verwerk je gezondheidsgegevens, kijk dan eerst naar de HIPAA-regeling van Anthropic in plaats van ZDR; die twee zijn alternatieven van elkaar. Voor Nederlandse bedrijven is dat zelden de route, maar het verklaart waarom je beide termen in de documentatie naast elkaar ziet.

Meer compliance-vragen rond Claude, van DPA tot AI Act, vind je op onze [compliance-overzichtspagina](/compliance).
