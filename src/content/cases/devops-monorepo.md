---
title: "Van 36 losse repos naar een gestructureerde workspace"
description: "36+ repositories, elk met eigen gewoontes, of helemaal geen. Hoe een tech-bedrijf orde schiep met een virtual monorepo, en elke AI-sessie met volle context laat starten."
titleTag: "Van 36 repos naar één workspace met Claude"
metaDescription: "36+ repositories, elk met eigen gewoontes. Hoe een tech-bedrijf orde schiep met een virtual monorepo, zodat elke AI-sessie met volle context start."
sector: "SaaS"
duration: "3 weken"
tools: ["Claude Code", "Git", "Tailscale"]
results:
  - "Consistente code standaarden over 36+ repositories"
  - "Nieuwe projecten opgezet in 5 minuten (was 30+)"
  - "Elke AI-sessie start automatisch met volledige projectcontext"
publishDate: 2026-05-18
kernwinst: "Nieuw project opzetten: 30+ minuten → 5 minuten"
klantprofiel: "Groeiend tech-bedrijf met 36+ Git-repositories"
voorJou: "Werk je met meerdere repositories die elk hun eigen regels hebben? Met een gedeelde basisconfiguratie start elke AI-sessie direct met de afspraken van jouw team. Zo blijft de output consistent zonder dat je alles per project opnieuw opschrijft."
---

## 36 repos, 36 gewoontes

Ons team bouwde dit eerder bij een groeiend Nederlands softwarebedrijf. Dat bedrijf had 36+ Git-repositories, en in elke repo golden andere regels of helemaal geen. De ene repo gebruikte conventional commits, de andere vrije tekst. Ook teststandaarden en PR-templates verschilden per project. Niemand had dat zo bedoeld, het was gewoon zo gegroeid.

Met AI-tooling werd dat probleem goed voelbaar. Elke nieuwe Claude Code-sessie startte blanco, zonder de conventies en teamafspraken van het project. De output was daardoor inconsistent. De ontwikkelaars moesten die handmatig bijwerken, terwijl AI dat werk juist had moeten schelen.

<!-- MENS: een concreet voorbeeld van zo'n inconsistentie die pijn deed — een PR of review-discussie die eruit sprong -->

## Twee lagen: wat overal geldt, en wat hier geldt

We bouwden met Claude Code een virtual monorepo-patroon met twee lagen.

Laag 1 is de foundation: gedeelde regels die voor elk project gelden. Daarin staan de Git-workflow (branch-namen, commit-format, PR-proces), teststandaarden, richtlijnen voor code review en security-regels. Ook de model-delegatie staat hier: welke AI-taak naar welk model gaat. Zo gaat zwaar denkwerk naar een sterk model en implementatie naar een snel model. Research gaat naar een model met brede kennis.

Laag 2 is de workspace. Elk project erft de foundation en vult die aan met eigen tools, deployment-stappen en lokale conventies. De workspace wijkt alleen van de foundation af waar dat echt nodig is.

Elk project kreeg daarnaast CODEOWNERS-bestanden, PR-templates en geautomatiseerde kwaliteitschecks. Die configuratie laadt automatisch bij elke sessie.

> Een nieuw project opzetten: van 30+ minuten naar 5 minuten.

## Geen blanco sessies meer

Elke Claude Code-sessie start nu met de juiste context: de foundation-regels, de projectconfiguratie en de bestaande patterns in de codebase. De output is consistent, of je nu in repo 3 werkt of in repo 36.

De ontwikkelaars werken op twee machines: een laptop voor het dagelijkse werk en een server voor automatisering en langlopende taken. Tailscale houdt beide in sync. De gedeelde configuratie synchroniseert automatisch en machine-specifieke instellingen blijven lokaal.

## Vijf minuten in plaats van dertig

Een nieuw project opzetten kostte eerst 30+ minuten handwerk: bestanden kopiëren, configuratie aanpassen, conventies opschrijven. Nu duurt het vijf minuten. De foundation-installer zet alles klaar en de eerste Claude Code-sessie werkt direct met de juiste standaarden.

Over 36+ repos telt dat op. Reviews gaan minder over stijl en de AI-output past bij de bestaande code in elk project.

<!-- MENS: kun je het "meetbare verschil" concreter maken — bijv. hoeveel minder stijl-opmerkingen in reviews, of een ander cijfer uit de praktijk? -->
