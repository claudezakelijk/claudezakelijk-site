---
title: "Claude-data in de EU houden"
titleTag: "Claude-data in de EU: opties voor dataresidentie"
metaDescription: "Anthropic slaat Claude-data op in de VS. Dit zijn je opties voor EU-dataresidentie: AWS Bedrock, Google Vertex AI, en wat (nog) niet kan."
h1: "Claude-data in de EU houden: wat kan wel en wat kan (nog) niet"
targetKeywords:
  - claude eu
  - dataresidentie
  - claude-data in de eu
wordCountTarget: 1160
priority: 1
tier: 7
cases:
  - report-engine
  - copilot-studio-agent
internalLinks:
  - /compliance
  - /cases/report-engine
  - /cases/copilot-studio-agent
  - /claude-implementatie
  - /compliance/anthropic-dpa
schemaTypes:
  - Article
  - FAQPage
  - BreadcrumbList
author: camiel
competitors:
  - compound.law
  - learn.microsoft.com/nl-nl
disclaimer: juridisch
status: published
publishDate: 2026-10-02
updatedDate: null
changelogLine: null
kortAntwoord: "Standaard blijft Claude-data niet in de EU. Op het eigen platform van Anthropic (de API, Team en Enterprise) wordt data opgeslagen in de Verenigde Staten. De verwerking is wereldwijd of alleen in de VS. Wil je EU-dataresidentie, gebruik dan AWS Bedrock of Google Vertex AI met een EU-endpoint. Microsoft Foundry heeft in oktober 2026 nog geen EU-datazone voor Claude."
bronnen:
  - titel: "Anthropic Privacy Center, waar staan de servers en host Anthropic in de EU?"
    url: "https://privacy.claude.com/en/articles/7996890-where-are-your-servers-located-do-you-host-your-models-on-eu-servers"
    geraadpleegd: "2 oktober 2026"
  - titel: "Anthropic-documentatie, data residency (inference geo en workspace geo)"
    url: "https://platform.claude.com/docs/en/manage-claude/data-residency"
    geraadpleegd: "2 oktober 2026"
  - titel: "Anthropic Help Center, US-only inference voor Enterprise-organisaties"
    url: "https://support.claude.com/en/articles/15422948-enable-us-only-inference-for-your-organization"
    geraadpleegd: "2 oktober 2026"
  - titel: "Anthropic, regionale beschikbaarheid en compliance"
    url: "https://claude.com/regional-compliance"
    geraadpleegd: "2 oktober 2026"
  - titel: "Anthropic Data Processing Addendum (DPA) met Standard Contractual Clauses"
    url: "https://www.anthropic.com/legal/data-processing-addendum"
    geraadpleegd: "2 oktober 2026"
  - titel: "AWS-documentatie, geographic cross-Region inference in Amazon Bedrock"
    url: "https://docs.aws.amazon.com/bedrock/latest/userguide/geographic-cross-region-inference.html"
    geraadpleegd: "2 oktober 2026"
  - titel: "AWS-documentatie, modelbeschikbaarheid per regio in Amazon Bedrock"
    url: "https://docs.aws.amazon.com/bedrock/latest/userguide/models-region-compatibility.html"
    geraadpleegd: "2 oktober 2026"
  - titel: "AWS-documentatie, data protection in Amazon Bedrock"
    url: "https://docs.aws.amazon.com/bedrock/latest/userguide/data-protection.html"
    geraadpleegd: "2 oktober 2026"
  - titel: "AWS-documentatie, abuse detection in Amazon Bedrock"
    url: "https://docs.aws.amazon.com/bedrock/latest/userguide/abuse-detection.html"
    geraadpleegd: "2 oktober 2026"
  - titel: "AWS GDPR Center"
    url: "https://aws.amazon.com/compliance/gdpr-center/"
    geraadpleegd: "2 oktober 2026"
  - titel: "Anthropic-documentatie, Claude op Google Cloud (globale, multi-regio- en regionale endpoints)"
    url: "https://platform.claude.com/docs/en/build-with-claude/claude-on-vertex-ai"
    geraadpleegd: "2 oktober 2026"
  - titel: "Anthropic-documentatie, Claude in Microsoft Foundry"
    url: "https://platform.claude.com/docs/en/build-with-claude/claude-in-microsoft-foundry"
    geraadpleegd: "2 oktober 2026"
  - titel: "Microsoft Learn, Foundry Models from partners and community (bijgewerkt 21 september 2026)"
    url: "https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/models-from-partners"
    geraadpleegd: "2 oktober 2026"
faq:
  - question: "Blijft Claude-data automatisch binnen de EU?"
    answer: "Nee. Op het eigen platform van Anthropic (de API en Claude Team en Enterprise) wordt data opgeslagen in de Verenigde Staten. Verzoeken kunnen standaard worden verwerkt in de VS, Europa, Azië en Australië. Je kunt de verwerking beperken tot de VS, maar een EU-optie is er niet. Wil je dat data in de EU blijft, dan gebruik je Claude via AWS Bedrock of Google Vertex AI met een EU-endpoint."
  - question: "Is verwerking in de VS dan verboden onder de AVG?"
    answer: "Nee. De AVG staat doorgifte naar de VS toe als die juridisch is afgedekt, bijvoorbeeld met de Standard Contractual Clauses die in de Anthropic DPA zitten. Voor veel MKB-bedrijven is dat voldoende. Dataresidentie in de EU wordt pas een harde eis als je klanten, sector of eigen risicoafweging dat vragen."
  - question: "Kan ik Claude via Microsoft Azure in de EU draaien?"
    answer: "Nog niet met EU-datagarantie. Claude is beschikbaar in Microsoft Foundry met de deploymenttypes Global Standard en US Data Zone Standard. Microsoft vermeldt Data Zone Standard voor Europa als niet beschikbaar en Anthropic noemt Foundry in Europa 'coming soon' (stand 2 oktober 2026). Wie nu EU-dataresidentie nodig heeft, kiest AWS Bedrock of Google Vertex AI."
  - question: "Heb ik een verwerkersovereenkomst nodig als ik Claude via Bedrock gebruik?"
    answer: "Ja. Bij Bedrock verwerkt AWS je data. Volgens AWS hebben modelaanbieders zoals Anthropic geen toegang tot je prompts en antwoorden. AWS heeft een eigen GDPR Data Processing Addendum, en de Standard Contractual Clauses zitten in de AWS Service Terms. Jij blijft verwerkingsverantwoordelijke en vermeldt AWS als verwerker in je verwerkingsregister en klantcontracten."
  - question: "Kan Claude volledig on-premise draaien?"
    answer: "Anthropic biedt Claude aan via het eigen platform en via AWS, Google Cloud en Microsoft Foundry. Een versie om het model op eigen servers te draaien staat niet in de documentatie. Voor data die je netwerk niet mag verlaten, gebruik je een lokaal open-source model naast Claude, of een architectuur waarbij de gevoelige data lokaal blijft."
deadline: null
hasTemplate: false
---

<!--
  Bronnen voor Claude EU-dataresidentie (live geopend op 2 oktober 2026):
  - Eerstepartijplatform: "data is stored in the US"; verkeer standaard naar VS, Europa, Azië en Australië
    (privacy.claude.com artikel 7996890, update 15 juni 2026). inference_geo alleen "global" of "us",
    workspace geo alleen "us" (platform.claude.com data-residency). Enterprise met usage-based billing:
    US-only inference, regelt opslag niet (support.claude.com artikel 15422948).
  - claude.com/regional-compliance: Europa via AWS Bedrock en GCP Vertex; Microsoft Foundry "Coming soon".
  - Foundry: Global Standard + US Data Zone Standard (Anthropic-docs); Data Zone Standard Europe "Not available",
    Global Standard in swedencentral (Microsoft Learn, 21 sept 2026).
  - Bedrock: geografische cross-region inference blijft binnen de geografie; modelaanbieders geen toegang;
    Fable 5 / 5.1: verkeer tot 30 dagen bewaard door AWS (docs.aws.amazon.com).
  - Vertex AI: multi-regio-endpoint "eu", regionale endpoints zoals europe-west1 (Sonnet 4.6 en ouder),
    10% toeslag op regionale en multi-regio-endpoints (platform.claude.com claude-on-vertex-ai).
  - SCC's module 2 en 3 in de Anthropic DPA: anthropic.com/legal/data-processing-addendum.
-->

"Blijft onze data dan wel in Europa?" Het is een van de eerste vragen die we krijgen zodra een directie serieus over Claude nadenkt. Het eerlijke antwoord is dat Claude-data standaard niet in de EU blijft. EU-dataresidentie kan wel, en voor een flink deel van de bedrijven is het strikt genomen niet verplicht. Hieronder staan de opties zoals ze er op 2 oktober 2026 voorstaan.

## Wat lost dataresidentie wel en niet op?

Dataresidentie betekent dat je data binnen een bepaald gebied wordt verwerkt en opgeslagen, in dit geval de EU. Dat is iets anders dan AVG-compliance. De AVG (GDPR) verbiedt verwerking in de VS niet. Hij eist dat doorgifte juridisch is afgedekt, bijvoorbeeld met de Standard Contractual Clauses (SCC's) van de Europese Commissie. Die zitten in de [verwerkersovereenkomst van Anthropic](/compliance/anthropic-dpa). Hoe die keten in elkaar zit, staat in [Claude en de AVG: wat regel je als bedrijf?](/compliance).

Waarom zou je dan toch EU-dataresidentie willen? De redenen die we in de praktijk tegenkomen: klanten die het contractueel eisen (zeker enterprise-klanten en overheden), sectoren met eigen regels bovenop de AVG, en de eigen afweging dat je niet afhankelijk wilt zijn van de juridische discussie rond trans-Atlantische doorgifte.

## Kan EU-dataresidentie rechtstreeks bij Anthropic?

Nee, op dit moment niet. Wie Claude via het eigen platform van Anthropic gebruikt (de API, Claude Team en Enterprise, of Claude Code met een API-sleutel), krijgt geen EU-dataresidentie.

Anthropic maakt onderscheid tussen opslag en verwerking. Over opslag is Anthropic kort: data wordt opgeslagen in de VS. Op de API is "us" de enige beschikbare opslagregio voor een workspace. De verwerking (inference) kan standaard plaatsvinden in de VS, Europa, Azië en Australië. Je kunt die beperken tot de VS: op de API met de instelling `inference_geo`, en op Enterprise-abonnementen met verbruiksafrekening met de optie US-only inference. Een instelling voor alleen de EU bestaat niet.

De DPA met SCC's dekt de doorgifte juridisch af. Wie een EU-garantie nodig heeft, kiest een route via een cloudprovider.

## Welke Claude EU-opties zijn er?

| Route | EU-optie | Wie verwerkt je data? | Status 2 oktober 2026 |
|-------|----------|-----------------------|-----------------------|
| Anthropic API / Claude Team en Enterprise | Geen. Opslag in de VS, verwerking wereldwijd of alleen VS | Anthropic, met DPA en SCC's | Juridisch afgedekt, geen EU-residentie |
| AWS Bedrock | EU-regio's en EU cross-region inference | AWS. Anthropic heeft geen toegang | Beschikbaar |
| Google Vertex AI | Multi-regio-endpoint "eu" en regionale endpoints zoals europe-west1 | Google Cloud | Beschikbaar |
| Microsoft Foundry | Geen EU-datazone voor Claude | Anthropic, op Azure of op eigen infrastructuur | Europa "coming soon" |
| Lokaal open-source model | Je eigen server | Jijzelf (geen Claude) | Beschikbaar |

**AWS Bedrock.** Claude-modellen zijn beschikbaar in meerdere Europese AWS-regio's. Welke modellen in welke regio draaien, verschilt per model en staat in de AWS-documentatie. Nieuwere modellen gebruik je meestal via geografische cross-region inference met een EU-profiel. Volgens AWS blijven verzoeken dan binnen de AWS-regio's van die geografie. AWS schrijft ook dat modelaanbieders geen toegang hebben tot prompts en antwoorden. Eén kanttekening: bij Claude Fable 5 en 5.1 bewaart AWS al het verkeer tot 30 dagen voor misbruikdetectie. Die data blijft bij AWS. Voor regionale endpoints geldt volgens Anthropic een toeslag van 10% ten opzichte van globale endpoints.

**Google Vertex AI.** Google Cloud biedt drie soorten endpoints: globaal, multi-regio en regionaal. Het multi-regio-endpoint "eu" verdeelt verkeer over regio's binnen de Europese Unie. Regionale endpoints zoals europe-west1 zijn er volgens de documentatie van Anthropic voor Claude Sonnet 4.6 en ouder; nieuwere modellen gebruiken het globale of het multi-regio-endpoint. Ook hier geldt 10% toeslag op regionale en multi-regio-endpoints. De omgang met data valt onder de voorwaarden van Google Cloud.

**Microsoft Foundry.** Claude is er beschikbaar in twee deploymenttypes: Global Standard en US Data Zone Standard. Microsoft vermeldt Data Zone Standard voor Europa als niet beschikbaar. Je kunt wel een Global Standard-deployment aanmaken in de Azure-regio Sweden Central, maar bij Global Standard kan de verwerking in elke regio plaatsvinden waar het model draait. Anthropic noemt Foundry voor Europa "coming soon". Let ook op de hostingoptie. Bij "Hosted on Anthropic" draait het model op infrastructuur van Anthropic. Bij "Hosted on Azure" blijven prompts en antwoorden binnen Azure, met uitzondering van gebruiksgegevens en content die de veiligheidssystemen markeren.

## Als zelfs EU-cloud niet genoeg is

Soms is de eis strenger: de data mag het eigen netwerk niet uit. Denk aan advocatenkantoren met dossiers onder verschoningsrecht, zorgdata, of klanten die het contractueel vastleggen.

Het model zelf draait altijd bij Anthropic of bij een cloudprovider. De architectuur kan wel zo worden ingericht dat de gevoelige data lokaal blijft. Ons team bouwde dat eerder bij een Nederlands softwarebedrijf, in een [rapportage-engine](/cases/report-engine): de data (148 tabellen, 1,55 miljoen rijen) staat in een lokale DuckDB-database en verlaat de eigen server niet. Dat privacy-ontwerp trok twee prospects over de streep die eerder waren afgehaakt op het cloudvraagstuk, en bespaarde als bijvangst 1.200 euro per jaar aan BI-licenties.

Voor taken waar je een taalmodel op gevoelige data nodig hebt, kun je naast Claude een lokaal open-source model draaien. In de praktijk is de verdeling meestal: Claude voor het denkwerk op niet-gevoelige data, lokale verwerking voor de rest.

## Toegang inrichten weegt net zo zwaar als locatie

Waar je data staat is één vraag, wie erbij kan is de andere. Bij een [rapportage-agent](/cases/copilot-studio-agent) die ons team eerder bouwde voor een klant van een Nederlands IT-consultancybureau, richtten we de toegang in via Azure AD met de OAuth on-behalf-of flow. Klanten loggen in met hun bestaande bedrijfsaccount en de agent toont uitsluitend de data van de ingelogde klant. Een goede verwerkingslocatie met slordige toegangsrechten levert alsnog een datalekrisico op.

## Hoe kies je?

Deze vragen beslissen het in de praktijk:

1. **Wat eisen je klanten contractueel?** Accepteren ze een DPA met SCC's, dan volstaat het Anthropic-platform. Eisen ze EU-verwerking, kies dan Bedrock of Vertex AI en vraag dit vooraf na.
2. **Welke cloud gebruik je al?** Zit je op AWS, kies dan Bedrock, en op Google Cloud Vertex AI. Gebruik je geen van beide, begin dan bij de Anthropic API met DPA en stap over zodra het nodig is.
3. **Welke data gaat er doorheen?** Interne documenten en code: het Anthropic-platform volstaat. Persoonsgegevens van klanten: overweeg een EU-endpoint. Data die je netwerk niet uit mag: houd die lokaal.

Dit vraagstuk speelt ook bij andere AI-aanbieders, zoals ChatGPT van OpenAI en Microsoft Copilot.

Deze afweging maken we standaard in de eerste week van een [Claude-implementatie](/claude-implementatie), samen met de verwerkersovereenkomst en de data-afspraken. Meer achtergrond staat in het [compliance-overzicht](/compliance).
