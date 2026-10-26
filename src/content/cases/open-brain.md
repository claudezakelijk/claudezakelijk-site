---
title: "Doorzoekbaar kennissysteem: 642 gedachten vastgelegd"
description: "Twee maanden na een beslissing wist niemand meer waaróm die was genomen. Een ondernemer bouwde een extern geheugen dat elke beslissing traceerbaar maakt."
titleTag: "Doorzoekbaar kennissysteem met Claude Code"
sector: "SaaS"
duration: "Doorlopend (4 maanden)"
tools: ["Claude Code", "MCP Server", "SQLite", "Node.js"]
results:
  - "642 gedachten vastgelegd en doorzoekbaar over 4 maanden"
  - "AI-assistent raadpleegt automatisch eerdere beslissingen voor elke taak"
  - "Beslissingen traceerbaar: wanneer genomen, waarom, met welke context"
publishDate: 2026-05-18
kernwinst: "Context na twee maanden verdwenen → elke beslissing traceerbaar"
klantprofiel: "Ondernemer van een SaaS-bedrijf die dagelijks tientallen beslissingen neemt"
voorJou: "Voer jij discussies soms opnieuw omdat niemand meer weet waarom iets is besloten? Een eigen kennissysteem legt beslissingen vast op het moment dat je ze neemt. Je AI-assistent kan die kennis daarna bij elke taak raadplegen."
---

## "Weet jij nog waarom we dat zo hadden besloten?"

Ons team bouwde dit eerder bij een Nederlands softwarebedrijf. De ondernemer daar neemt dagelijks tientallen beslissingen. Over features, over leveranciers, over de conclusie van een gesprek vorige maand. De antwoorden stonden verspreid over notitieapps, chats en e-mails. En veel zat alleen in hoofden.

Twee maanden later was die context weg. Omdat niemand meer wist waarom een beslissing zo was genomen, werden dezelfde discussies opnieuw gevoerd en dezelfde fouten herhaald.

## Eén doorzoekbare plek voor elke beslissing

We bouwden met Claude Code een MCP-server als persoonlijk kennissysteem. Het draait lokaal en slaat gedachten op: beslissingen, observaties, inzichten, referenties naar externe systemen, ideeën en gespreksnotities. Elke gedachte krijgt een type, een beschrijving en eventueel tags. Alles staat in een SQLite-database waarin je op elk woord kunt zoeken.

Het kennissysteem is gekoppeld aan de AI-assistent. Voordat Claude Code aan een taak begint, zoekt het eerst naar eerdere beslissingen en context over dat onderwerp. Bij "we gaan de onboarding flow aanpassen" haalt het bijvoorbeeld eerdere beslissingen over onboarding op, plus klantfeedback op de huidige flow.

## Tien seconden per gedachte

Na een vergadering typt de ondernemer een korte notitie: "Besloten om feature X uit te stellen tot Q3 vanwege afhankelijkheid van de API-migratie." Dat kost tien seconden. Vraagt iemand drie maanden later waarom feature X er nog niet is, dan staat het antwoord in het systeem, met datum en reden erbij.

Er is geen mappenstructuur of wekelijkse opruimsessie nodig. De ondernemer legt een gedachte vast op het moment dat die ontstaat, en vindt hem later terug via zoektermen of de tijdlijn.

> 642 gedachten vastgelegd in 4 maanden, allemaal doorzoekbaar.

## De balans na vier maanden

De teller staat op 642 gedachten: 264 observaties, 142 referenties, 125 taken, 48 vergadernotities, 26 ideeën, 17 persoonsbeschrijvingen en 16 beslissingen. De ondernemer zoekt oude beslissingen nu op via de AI-assistent. Graven in oude chats of collega's vragen hoe het ook alweer zat, hoeft niet meer. Van elke beslissing is terug te vinden wanneer die is genomen en waarom.

<!-- MENS: een concreet moment waarop het systeem een oude beslissing terughaalde en daarmee een herhaalde discussie (of fout) voorkwam -->
