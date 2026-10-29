---
title: "Claude Managed Agents: wat het is, wat het kost en wanneer je het inzet"
titleTag: "Claude Managed Agents uitgelegd: kosten en inzet | Implementeren.ai"
metaDescription: "Wat Claude Managed Agents is, wat het kost (tokens plus 0,08 dollar per sessie-uur), wat er met je data gebeurt en wanneer het past. Stand: oktober 2026."
h1: "Claude Managed Agents voor bedrijven: wat het is, wat het kost en wanneer je het inzet"
targetKeywords:
  - claude managed agents
  - managed agents
  - claude managed agents prijs
wordCountTarget: 1620
priority: 1
tier: 1
cases:
  - automation-audit
  - copilot-studio-agent
internalLinks:
  - /nieuws
  - /tools/claude-api-kosten-calculator
  - /compliance/zero-data-retention
  - /compliance/eu-hosting
  - /compliance/ai-act-mkb
  - /gids/claude-code-voor-bedrijven
  - /cases/automation-audit
  - /cases/copilot-studio-agent
  - /claude-implementatie
schemaTypes:
  - Article
  - FAQPage
  - BreadcrumbList
author: camiel
competitors:
  - openai.com
  - microsoft.com
disclaimer: juridisch
status: review
publishDate: null
updatedDate: 2026-10-27
changelogLine: null
reviewedBy: null
reviewedDate: null
isRecurring: false
kortAntwoord: "Claude Managed Agents is een dienst van Anthropic waarmee Claude zelfstandig taken uitvoert in een beheerde omgeving, met eigen tools, bestanden en sessies. Je betaalt de gewone API-tokenprijs plus 0,08 dollar per sessie-uur dat de agent actief werkt. De dienst is sinds 8 april 2026 in publieke bèta. Stand: 27 oktober 2026."
bronnen:
  - titel: "Claude Platform Docs, Claude Managed Agents overview (bèta, kernbegrippen, tools, ZDR)"
    url: "https://platform.claude.com/docs/en/managed-agents/overview"
    geraadpleegd: "27 oktober 2026"
  - titel: "Claude Platform Docs, Pricing (modelprijzen en Claude Managed Agents pricing)"
    url: "https://platform.claude.com/docs/en/about-claude/pricing"
    geraadpleegd: "27 oktober 2026"
  - titel: "Claude Platform Docs, Define your agent (ondersteunde modellen, standaard permission policy)"
    url: "https://platform.claude.com/docs/en/managed-agents/agent-setup"
    geraadpleegd: "27 oktober 2026"
  - titel: "Claude Platform Docs, Permission policies (standaard always_allow voor de ingebouwde tools, always_ask voor MCP-tools)"
    url: "https://platform.claude.com/docs/en/managed-agents/permission-policies"
    geraadpleegd: "29 oktober 2026"
  - titel: "Claude Platform Docs, Scheduled deployments (geplande runs en budget per run)"
    url: "https://platform.claude.com/docs/en/managed-agents/scheduled-deployments"
    geraadpleegd: "27 oktober 2026"
  - titel: "Claude Platform Docs, Self-hosted sandboxes (wat er bij jou draait en wat bij Anthropic)"
    url: "https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes"
    geraadpleegd: "27 oktober 2026"
  - titel: "Claude Platform Docs, Managed Agents reference (rate limits)"
    url: "https://platform.claude.com/docs/en/managed-agents/reference"
    geraadpleegd: "27 oktober 2026"
  - titel: "Claude blog, Claude Managed Agents: get to production 10x faster (8 april 2026)"
    url: "https://claude.com/blog/claude-managed-agents"
    geraadpleegd: "27 oktober 2026"
  - titel: "Europese Commissie, AI Act: regulatory framework en tijdlijn (update 19 oktober 2026)"
    url: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai"
    geraadpleegd: "27 oktober 2026"
  - titel: "Europese Centrale Bank, referentiekoers euro/dollar (27 oktober 2026: 1 euro = 1,1150 dollar)"
    url: "https://data.ecb.europa.eu/data/datasets/EXR/EXR.D.USD.EUR.SP00.A"
    geraadpleegd: "27 oktober 2026"
faq:
  - question: "Wat is het verschil tussen Claude Managed Agents en de gewone Claude API?"
    answer: "Met de gewone Messages API bouw je de agent zelf: jij schrijft de loop die tools aanroept, jij regelt de server en jij bewaart de geschiedenis. Bij Managed Agents levert Anthropic die loop, de sandbox en de opslag van sessies. Jij definieert het model, de instructies en de tools. Je levert wat controle in en wint bouwtijd."
  - question: "Wat kost Claude Managed Agents per maand?"
    answer: "Er is geen abonnement. Je betaalt de tokens tegen de normale API-prijs per model, plus 0,08 dollar per sessie-uur dat de agent actief werkt. Wachttijd telt niet mee. Een dagelijkse taak van een halfuur op Sonnet 5.5 met 100.000 inputtokens en 10.000 outputtokens kost in ons rekenvoorbeeld 7,48 dollar per maand bij 22 werkdagen."
  - question: "Valt Claude Managed Agents onder Zero Data Retention?"
    answer: "Nee. Anthropic schrijft dat Managed Agents op dit moment niet in aanmerking komt voor Zero Data Retention of een HIPAA-overeenkomst. Sessies bewaren de gespreksgeschiedenis, de staat van de sandbox en de output op de servers van Anthropic. Je kunt sessies en geüploade bestanden wel zelf verwijderen via de API, op elk moment."
  - question: "Heb ik een developer nodig voor Managed Agents?"
    answer: "Ja. Je maakt een agent, een omgeving en sessies aan via de API, de SDK of de ant-commandoregel. Daar komt het koppelen van je eigen systemen bij, bijvoorbeeld via een MCP-server. Een medewerker zonder programmeerervaring kan dit niet zelf opzetten. Voor wie zonder code wil werken zijn Claude Team en Claude Code meestal de betere start."
  - question: "Kan ik Claude Managed Agents gebruiken via AWS Bedrock of Google Vertex AI?"
    answer: "Niet via de gewone partnerplatforms. De prijspagina van Anthropic noemt Managed Agents niet beschikbaar op clouds die door partners worden beheerd. De dienst draait wel op de Claude Platform on AWS en op Claude Models on Google Cloud, de varianten die Anthropic zelf beheert. Daar gelden enkele verschillen in functies."
deadline: null
hasTemplate: false
---

Claude Managed Agents is een dienst van Anthropic waarmee Claude zelfstandig een taak uitvoert, in een omgeving die Anthropic voor je beheert. Je hoeft zelf geen agent-loop, server of sandbox te bouwen. Je betaalt de gewone tokenprijs van het model plus 0,08 dollar per uur dat een sessie actief werkt. De dienst staat sinds 8 april 2026 in publieke bèta. Op deze pagina lees je hoe het werkt, wat het kost, wat er met je data gebeurt en wanneer het past bij een Nederlands bedrijf. Alle feiten zijn gecheckt op 27 oktober 2026 bij de bronnen onderaan.

## Wat zijn Claude Managed Agents?

Anthropic biedt twee manieren om met Claude te bouwen. Met de Messages API stuur je zelf elk verzoek en bouw je zelf de logica eromheen. Met Claude Managed Agents krijg je een kant-en-klaar raamwerk: Claude leest bestanden, voert commando's uit, zoekt op internet en draait code in een beveiligde omgeving. Anthropic noemt het zelf geschikt voor lange taken en werk dat op de achtergrond loopt.

De dienst rust op vier begrippen:

1. **Agent.** De vaste configuratie: welk model, welke instructies (de system prompt), welke tools, MCP-servers en skills. Je maakt een agent één keer aan, en elke wijziging levert een nieuwe versie op.
2. **Omgeving.** Waar de sessies draaien: in een cloudsandbox van Anthropic, of in een sandbox op je eigen infrastructuur.
3. **Sessie.** Eén lopende opdracht van een agent in een omgeving. Een sessie houdt bestanden en geschiedenis vast, ook als je hem later hervat.
4. **Events.** De berichten tussen jouw applicatie en de agent: jouw opdracht, de resultaten van tools en statusmeldingen.

Ingebouwd zijn een bash-shell, bestandsbewerking, zoeken en ophalen van webpagina's en koppelingen met MCP-servers. Alle modellen vanaf Claude 4.5 worden ondersteund, dus ook Fable 5.1, Opus 5.5, Sonnet 5.5 en Haiku 5.5. Toegang staat standaard aan voor elk API-account. Elk verzoek heeft wel de bèta-header `managed-agents-2026-04-01` nodig; de SDK zet die er zelf bij.

## Managed agents of zelf bouwen: wat is het verschil?

Het verschil zit in wie het werk rond het model doet. Bij een eigen agent op de Messages API regel jij de loop, de opslag en de foutafhandeling. Bij Managed Agents doet Anthropic dat, en betaal je daar per actief uur voor.

Tabel: Claude Managed Agents naast een eigen agent op de Messages API, stand 27 oktober 2026.

| Onderdeel | Eigen agent (Messages API) | Claude Managed Agents |
|-----------|----------------------------|-----------------------|
| Agent-loop en toolaanroepen | Bouw je zelf | Geregeld door Anthropic |
| Sandbox voor code en bestanden | Regel je zelf | Cloudsandbox of eigen sandbox |
| Geschiedenis van sessies | Bewaar je zelf | Opgeslagen bij Anthropic |
| Geplande runs | Eigen scheduler | Ingebouwd, met cron en tijdzone |
| Batch-korting van 50 procent | Beschikbaar | Niet beschikbaar |
| Zero Data Retention | Mogelijk, op aanvraag | Niet beschikbaar |
| Extra kosten bovenop tokens | Hosting die je zelf betaalt | 0,08 dollar per actief sessie-uur |

Geplande runs werken met een cron-expressie en een tijdzone. Elke organisatie kan maximaal 1.000 geplande deployments hebben. Per run kun je een budget instellen: bereikt de sessie dat bedrag, dan pauzeert hij. Voor het aanmaken van agents, sessies en omgevingen geldt een limiet van 300 verzoeken per minuut per organisatie.

## Wat kosten Claude Managed Agents?

Je betaalt op twee dingen: tokens en looptijd. De tokens kosten hetzelfde als bij de gewone API, met dezelfde korting op prompt caching. De looptijd kost 0,08 dollar per sessie-uur (ongeveer 0,07 euro). Anthropic meet die tot op de milliseconde en telt alleen de tijd waarin de sessie de status running heeft. Wacht de agent op jouw volgende bericht of op een goedkeuring, dan loopt de meter niet. Webzoekopdrachten binnen een sessie kosten 10 dollar per 1.000 zoekopdrachten (8,97 euro).

Anthropic geeft zelf dit voorbeeld: een sessie van een uur op Opus 5.5 met 50.000 inputtokens en 15.000 outputtokens kost 0,58 dollar (0,52 euro). Daarvan is 0,08 dollar looptijd. De tokens zijn dus het grootste deel van de rekening.

Om de modellen te vergelijken rekenen we één taak door. Die taak draait elke werkdag een halfuur, met in totaal 100.000 inputtokens en 10.000 outputtokens. Dat is een rekenvoorbeeld, geen meting bij een klant.

Tabel: rekenvoorbeeld voor één dagelijkse agent-taak, prijzen van Anthropic en ECB-koers van 27 oktober 2026 (1 euro = 1,1150 dollar), stand 27 oktober 2026.

| Model | Prijs input / output per miljoen tokens | Kosten per run | Per maand (22 werkdagen) |
|-------|------------------------------------------|----------------|--------------------------|
| Haiku 5.5 | 0,10 / 0,50 dollar | 0,055 dollar (0,05 euro) | 1,21 dollar (1,09 euro) |
| Sonnet 5.5 | 2 / 10 dollar | 0,34 dollar (0,30 euro) | 7,48 dollar (6,71 euro) |
| Opus 5.5 | 4 / 20 dollar | 0,64 dollar (0,57 euro) | 14,08 dollar (12,63 euro) |
| Fable 5.1 | 10 / 50 dollar | 1,54 dollar (1,38 euro) | 33,88 dollar (30,39 euro) |

Twee kanttekeningen. Een agent leest bij elke stap zijn eerdere context opnieuw in, dus het aantal inputtokens loopt bij lange taken snel op. Prompt caching drukt dat: op Opus 5.5 en Sonnet 5.5 kost een cache-hit 5 procent van de normale inputprijs. Pin je de agent op verwerking in de VS, dan betaal je 1,1 keer het normale tarief. Reken je eigen situatie door met de [Claude API-kostencalculator](/tools/claude-api-kosten-calculator).

## Wat gebeurt er met je data bij managed agents?

Hier zit voor de meeste Nederlandse bedrijven de belangrijkste afweging. Managed Agents bewaart bewust veel: de gespreksgeschiedenis, de staat van de sandbox en de output staan op de servers van Anthropic, zodat je een sessie later kunt hervatten. Daarom komt de dienst op dit moment niet in aanmerking voor Zero Data Retention. Je kunt sessies en bestanden wel op elk moment zelf verwijderen via de API. Hoe ZDR werkt en voor welke producten wel, lees je in [Claude Zero Data Retention uitgelegd](/compliance/zero-data-retention).

Een eigen sandbox lost niet alles op. De tools draaien dan op je eigen server, maar Claude zelf draait nog bij Anthropic. De invoer en uitvoer van elke toolaanroep gaan naar Anthropic, zodat het model kan bepalen wat de volgende stap is. Over de plek van verwerking: je kunt een agent vastzetten op `us` of `global`. Een EU-optie staat er niet bij, en de gewone partnerclouds zoals AWS Bedrock en Google Vertex AI bieden Managed Agents niet aan. Meer daarover in [Claude-data in de EU houden](/compliance/eu-hosting).

Voor de AVG betekent dit: neem de agent op in je verwerkingsregister, geef hem alleen toegang tot de data die hij nodig heeft en doe een DPIA als er persoonsgegevens doorheen gaan. Persoonsgegevens die je kunt weglaten of pseudonimiseren, laat je weg.

Ook de EU AI Act telt mee. De transparantieregels van artikel 50 gelden sinds 2 augustus 2026. De regels voor hoog-risicosystemen uit bijlage III zijn door de AI Omnibus uitgesteld naar 2 december 2027. Gebruik je een agent voor beslissingen over mensen, zoals sollicitanten of kredietaanvragen, dan val je in die categorie. Voor rapporten maken of data controleren meestal niet. De volledige tijdlijn staat in ons artikel over de [AI Act voor het MKB](/compliance/ai-act-mkb).

Let op de standaardinstellingen voor goedkeuring. De ingebouwde tools, zoals de bash-shell en bestandsbewerking, staan standaard op de permission policy `always_allow`. Die draaien dus zonder dat iemand ze goedkeurt. Tools van een MCP-server staan standaard op `always_ask`: de sessie pauzeert tot jij een aanroep goedkeurt. Wil je dat een mens ook de ingebouwde tools goedkeurt, dan zet je die zelf op `always_ask`.

## Wanneer zet je Claude Managed Agents in?

Managed Agents past bij werk dat lang duurt, vaak terugkomt en zonder iemand ernaast kan draaien. Denk aan een wekelijkse controle van je data, een nachtelijke inventarisatie van scripts of een rapport dat elke ochtend klaar moet staan. De ingebouwde planning en de opslag van sessies besparen je dan echt bouwwerk.

Het past minder goed als je data de EU niet mag verlaten, als je klanten ZDR eisen of als een medewerker de taak gewoon in een chat kan doen. Dat laatste lukt vaak al met Claude Team. Voor ontwikkelwerk op je eigen machine is Claude Code vaak de logischere keuze. Dat verschil leggen we uit in de [gids Claude Code voor bedrijven](/gids/claude-code-voor-bedrijven).

Onze eigen ervaring komt uit zulk agent-werk, al draaide het niet op Managed Agents. Ons team lichtte bij een Nederlands softwarebedrijf alle [38 achtergrondprocessen door](/cases/automation-audit). Van die 38 waren er 9 stilgevallen of fout, en na 2 dagen draaiden ze alle 38 weer, gedocumenteerd. Dat deden we met Claude Code, op de twee machines van het bedrijf zelf. Bij een MSP-softwarebedrijf bouwden we een [agent die rapportages op aanvraag maakt](/cases/copilot-studio-agent) uit Power BI: van 30 tot 45 minuten handwerk per rapport naar 2 minuten. Die agent draait achter een eigen endpoint met bedrijfs-SSO. Geen van onze gepubliceerde cases draait op Managed Agents.

## Hoe begin je met Claude Managed Agents?

Wil je het proberen, volg dan deze stappen:

1. Kies één taak die vaak terugkomt en een duidelijk eindpunt heeft. "Maak elke maandag het overzicht van openstaande tickets" werkt beter dan "analyseer alles".
2. Bepaal welke data de agent nodig heeft en of daar persoonsgegevens in zitten. Zitten die erin, doe dan eerst de AVG-check uit de vorige sectie.
3. Maak in de Claude Console een API-sleutel aan en maak een agent met het goedkoopste model dat de taak aankan. Begin met Sonnet 5.5 en stap pas over op Opus 5.5 als de kwaliteit tekortschiet.
4. Zet bevestiging aan voor tools die iets veranderen of versturen, en stel een budget per sessie in.
5. Draai de taak een paar keer met de hand voordat je een schema instelt. Kijk na elke run naar het tokengebruik.
6. Zet daarna de geplande deployment aan en controleer de eerste twee weken elke run.

Wil je hulp bij de keuze tussen Managed Agents, de gewone API en Claude Code, of bij de afspraken over data? Dat bepalen we in de eerste week van een [Claude-implementatie](/claude-implementatie). Meer achtergrond over Claude en Anthropic vind je in het [nieuwsoverzicht](/nieuws).
