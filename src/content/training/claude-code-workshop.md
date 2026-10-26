---
title: "Claude Code workshop voor MKB-teams"
titleTag: "Claude Code workshop voor MKB-teams | ClaudeZakelijk"
metaDescription: "Hands-on Claude Code workshop voor developers en tech-leads. Breng je eigen project mee, werk met MCP servers, en leer productiewaardige AI-workflows."
h1: "Claude Code workshop voor MKB-teams"
targetKeywords:
  - claude code workshop
  - claude code training nederlands
  - claude code cursus
wordCountTarget: 1400
priority: 2
tier: 2
cases:
  - devops-monorepo
internalLinks:
  - /training/prompting-cursus
  - /training/training-medewerkers
  - /training/claude-voor-managers
  - /integraties/power-bi
  - /vergelijken/claude-code-vs-cursor
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
  - question: "Moet ik ervaring hebben met AI om aan de Claude Code workshop deel te nemen?"
    answer: "Nee, maar je moet wel kunnen programmeren. De workshop is bedoeld voor developers, DevOps engineers en tech-leads die dagelijks code schrijven. Je hoeft geen ervaring te hebben met Claude of andere AI-tools. Wel moet je comfortabel zijn met een terminal, Git, en minimaal een programmeertaal."
  - question: "Kan ik mijn eigen project meenemen naar de workshop?"
    answer: "Ja, dat is juist de bedoeling. De meest effectieve workshops zijn die waarin deelnemers op hun eigen codebase werken. Je leert Claude Code kennen op een project dat je kent, niet op een kunstmatig oefenproject. Zorg dat je toegang hebt tot de repository en dat je lokaal kunt bouwen en testen."
  - question: "Wat is het verschil tussen deze workshop en de prompting cursus?"
    answer: "De prompting cursus is voor alle medewerkers en richt zich op Claude via de webinterface. De Claude Code workshop is specifiek voor technische teams en richt zich op de CLI-tool: terminal-based development, MCP servers, CLAUDE.md configuratie, multi-agent workflows. Developers volgen idealiter beide, maar de volgorde maakt niet uit."
---

Claude Code workshop voor developers en tech-leads die AI willen integreren in hun dagelijkse development workflow. Geen slides over wat AI kan. Geen demo met een kant-en-klaar project. Je opent je eigen codebase, start Claude Code, en bouwt iets dat je morgen in productie kunt gebruiken.

Bij ClaudeZakelijk geven we deze claude code training nederlands in-company. Maximaal 8 deelnemers per sessie, minimaal 4. Een dag, hands-on, op jullie locatie of remote. Elke deelnemer werkt op eigen hardware met eigen projecten. Wij zorgen dat iedereen aan het eind van de dag een werkende AI-workflow heeft voor hun specifieke stack.

## Waarom een claude code cursus voor je team

Claude Code van Anthropic is fundamenteel anders dan Claude via de webinterface. Het draait in je terminal, heeft directe toegang tot je filesystem, kan Git commits maken, tests draaien, en code refactoren over meerdere bestanden tegelijk. Het verschil met tools als Cursor, Windsurf en GitHub Copilot is dat Claude Code niet autocompleet, maar autonoom kan werken. Je beschrijft wat je wilt, Claude Code voert het uit, en je reviewt het resultaat.

Dat klinkt simpel. In de praktijk vereist het een andere manier van werken. Developers die gewend zijn aan character-by-character coderen moeten leren om in grotere eenheden te denken. Niet "schrijf deze functie" maar "bouw deze feature met model, API endpoint, tests, en migratie". Niet "fix deze bug" maar "analyseer de error log, reproduceer het probleem, en implementeer een fix met regression test".

De teams die het snelst productief worden met Claude Code zijn teams die gestructureerd leren werken met de tool. Een dag investeren in een workshop bespaart weken aan trial-and-error.

## Programma: wat je leert in een dag

### Blok 1: Setup en configuratie (ochtend, 2 uur)

Claude Code installeren en configureren op je eigen machine. CLAUDE.md opzetten als projectcontext. De eerste interactie: een bestaand project analyseren en documenteren.

Je leert hoe CLAUDE.md werkt als persistent geheugen voor Claude Code. Welke informatie erin hoort (code conventies, architectuurkeuzes, test-commando's) en wat niet (gevoelige data, credentials). Hoe je met een goed geschreven CLAUDE.md elke sessie start met volledige projectcontext in plaats van alles opnieuw uit te leggen.

Bij een tech-bedrijf met 36 repositories standaardiseerden we CLAUDE.md over alle projecten. Nieuwe projecten werden opgezet in 5 minuten in plaats van 30+. Elke AI-sessie startte automatisch met volledige context over code conventies, teststandaarden en architectuurpatronen.

### Blok 2: MCP servers en integraties (ochtend, 1,5 uur)

Model Context Protocol is wat Claude Code onderscheidt van andere AI-tools. MCP servers geven Claude Code directe toegang tot externe systemen: databases, API's, monitoring tools, project management. Geen copy-paste van data, maar een live verbinding.

In dit blok configureer je minimaal een MCP server voor je eigen stack. Voorbeelden die we in eerdere workshops hebben gedaan:

- PostgreSQL MCP server voor directe database-interactie
- Jira MCP voor ticket-management vanuit de terminal
- Power BI MCP voor [rapportage-automatisering](/integraties/power-bi)
- Sentry MCP voor error tracking en debugging

Je leert het verschil tussen MCP servers die je zelf bouwt en community servers. Hoe je credentials veilig configureert via environment variables. En hoe je MCP servers combineert voor workflows die meerdere systemen overbruggen.

### Blok 3: productiewaardige workflows (middag, 2 uur)

Het kernblok. Je bouwt een complete workflow op je eigen project. Niet een speelgoedvoorbeeld, maar iets dat je morgen kunt gebruiken. De meest gekozen workflows door eerdere deelnemers:

**Code review automation.** Claude Code analyseert een pull request, controleert op patronen die in CLAUDE.md staan, en genereert review-opmerkingen. Niet als vervanging van menselijke review, maar als eerste filter dat de voor de hand liggende issues vangt.

**Test generation.** Een bestaand bestand zonder tests voorzien van unit tests. Claude Code leest de implementatie, begrijpt de bedoeling, en schrijft tests die edge cases dekken. Inclusief de tests draaien en itereren tot ze slagen.

**Refactoring met context.** Een legacy module refactoren waarbij Claude Code de volledige codebase als context heeft. Niet een enkel bestand herschrijven, maar een refactoring die consistent is over alle bestanden die de module gebruiken.

**API endpoint bouwen.** Van specificatie naar werkend endpoint met model, controller, validatie, tests en documentatie. De verticale slice aanpak die Anthropic aanbeveelt voor complexe taken.

### Blok 4: multi-agent en advanced patterns (middag, 1,5 uur)

Voor teams die al ervaring hebben of snel leren. Hoe je meerdere Claude Code instanties parallel laat werken. Git worktrees voor geisoleerde taken. Slash commands als herbruikbare workflows. Skills en knowledge bases voor teambreed gedeelde context.

Je leert ook de grenzen van Claude Code. Wanneer het model hallucineert en hoe je dat detecteert. Waarom je altijd moet verifieren voor je commit. Hoe je voorkomt dat Claude Code destructieve operaties uitvoert op je codebase. Security-bewustzijn is geen bijzaak in deze workshop, maar een doorlopend thema. We behandelen ook AVG (GDPR) en EU AI Act compliance voor developers, en de dataclassificatie (groen, oranje, rood) die ClaudeZakelijk hanteert.

## Voor wie is deze claude code workshop

**Developers** die dagelijks code schrijven en hun productiviteit willen verdubbelen. Elke programmeertaal, elk framework. Claude Code werkt met Python, TypeScript, PHP, Go, Rust, Java, C#, en vrijwel alles wat een compiler of interpreter heeft.

**Tech-leads** die hun team willen laten werken met AI-assisted development. Na de workshop kun je beoordelen waar Claude Code de meeste waarde toevoegt in jullie development-proces en hoe je het veilig uitrolt.

**DevOps engineers** die deployment pipelines, monitoring en infrastructure as code willen versnellen met AI. Claude Code werkt uitstekend met Terraform, Kubernetes manifests, GitHub Actions, en CI/CD configuratie.

De workshop is niet bedoeld voor niet-technische medewerkers. Zij volgen de [Claude prompting cursus](/training/prompting-cursus) of de [in-company training](/training/training-medewerkers) die geen terminal-ervaring vereist.

## Claude Code versus Cursor en Copilot

Deelnemers vragen regelmatig naar het [verschil met Cursor, Copilot en Windsurf](/vergelijken/claude-code-vs-cursor). Kort samengevat: Copilot is autocomplete op steroiden, Cursor is een AI-first IDE, Claude Code is een autonome agent in je terminal. Ze vullen elkaar aan, maar Claude Code is de enige die complete taken zelfstandig kan uitvoeren over meerdere bestanden zonder dat je elk bestand handmatig opent.

In de workshop ervaar je dat verschil zelf. Niet via een vergelijkingsslide, maar door dezelfde taak uit te voeren met Claude Code en te vergelijken met hoe je het nu doet.

## Praktische informatie

**Duur:** 1 dag (09:00 tot 17:00, inclusief lunch)
**Groepsgrootte:** 4 tot 8 deelnemers
**Locatie:** in-company op jullie kantoor of remote via screen share
**Vereisten:** eigen laptop met terminal toegang, Git, een IDE, en een Claude Pro of Team account
**Voorbereiding:** installeer Claude Code vooraf (instructies volgen na aanmelding)

De [managers en directie](/training/claude-voor-managers) hoeven niet deel te nemen aan deze technische workshop, maar het helpt als ze begrijpen wat hun team leert. We bieden optioneel een 30-minuten managementsessie aan het eind van de dag.

## Veelgestelde vragen

### Moet ik ervaring hebben met AI om aan de Claude Code workshop deel te nemen?

Nee, maar je moet wel kunnen programmeren. De workshop is bedoeld voor developers, DevOps engineers en tech-leads die dagelijks code schrijven. Je hoeft geen ervaring te hebben met Claude of andere AI-tools. Wel moet je comfortabel zijn met een terminal, Git, en minimaal een programmeertaal.

### Kan ik mijn eigen project meenemen naar de workshop?

Ja, dat is juist de bedoeling. De meest effectieve workshops zijn die waarin deelnemers op hun eigen codebase werken. Je leert Claude Code kennen op een project dat je kent, niet op een kunstmatig oefenproject. Zorg dat je toegang hebt tot de repository en dat je lokaal kunt bouwen en testen.

### Wat is het verschil tussen deze workshop en de prompting cursus?

De [prompting cursus](/training/prompting-cursus) is voor alle medewerkers en richt zich op Claude via de webinterface. De Claude Code workshop is specifiek voor technische teams en richt zich op de CLI-tool: terminal-based development, MCP servers, CLAUDE.md configuratie, multi-agent workflows. Developers volgen idealiter beide, maar de volgorde maakt niet uit.
