---
title: "AI sales agent: van 0 naar 25 gepersonaliseerde e-mails per dag"
description: "Twee salesmensen, drieduizend prospects en een open rate van 8%. Hoe een B2B-team elke ochtend 25 persoonlijke e-mails klaar heeft staan, en zelf de knop indrukt."
titleTag: "Sales-agent met Claude: 25 e-mails per dag"
metaDescription: "Twee salesmensen, 3.000 prospects en een open rate van 8%. Hoe een B2B-team elke ochtend 25 persoonlijke e-mails klaar heeft en zelf de knop indrukt."
sector: "SaaS"
duration: "4 weken"
tools: ["Claude Code", "Laravel", "Vue.js", "MS Graph API", "Telegram"]
results:
  - "25 gepersonaliseerde sales e-mails per dag"
  - "Human-in-the-loop review via custom Vue dashboard"
  - "Zelfverbeterend systeem op basis van feedback van het sales team"
publishDate: 2026-05-18
kernwinst: "Open rate van 8% → 34%"
klantprofiel: "B2B SaaS-bedrijf met een salesteam van twee mensen en drieduizend prospects"
voorJou: "Wil je persoonlijke sales-e-mails sturen, maar heeft je team daar de tijd niet voor? Een AI-systeem kan elke ochtend de concepten klaarzetten, terwijl jouw mensen elke e-mail beoordelen voordat er iets wordt verstuurd. Zo houd je zelf de controle en de persoonlijke toon."
---

## Twee mensen, drieduizend prospects

Ons team bouwde dit eerder bij een Nederlands softwarebedrijf. Het salesteam van dit B2B SaaS-bedrijf bestond uit twee mensen. De prospectlijst telde er drieduizend. Persoonlijke e-mails schrijven voor zoveel mensen lukte niet, dus stuurden we standaardteksten. Daarvan werd 8% geopend. We wilden persoonlijkere e-mails sturen, maar hadden er de uren niet voor.

## Elke ochtend 25 drafts

We bouwden in vier weken een sales development systeem met Claude Code. De backend draait op Laravel, met vijf databasemodellen (kandidaten, drafts, feedback, sequenties en schrijfregels) en vijf API-controllers.

Elke ochtend selecteert een batchproces 25 kandidaten uit het CRM. Dat gebeurt op basis van scoringcriteria: bedrijfsgrootte, branche, laatste contactmoment en eerdere interacties. Voor elke kandidaat schrijft een AI-model een persoonlijke e-mail. Daarin staat bijvoorbeeld het product dat de prospect gebruikt, de sector waarin ze werken en een haakje uit recent bedrijfsnieuws.

## Niets gaat de deur uit zonder mens

Niets wordt verstuurd zonder goedkeuring. Een reviewpagina in Vue toont alle 25 drafts. Het salesteam kan per e-mail goedkeuren, afwijzen, bewerken of uitstellen tot morgen. Bij een afwijzing geeft de reviewer een reden op, zoals: te lang, verkeerde toon of niet relevant. Die feedback wordt opgeslagen en gebruikt bij nieuwe drafts.

Ook de schrijfregels veranderen op basis van die feedback. Het begon met tien basisregels, zoals "maximaal zes zinnen" en "altijd een concrete vraag als afsluiter". Na vier weken stonden er 23 regels in, allemaal gebaseerd op wat het salesteam goedkeurde of afwees.

<!-- MENS: een voorbeeld van een afgewezen draft en de regel die daaruit voortkwam — dat laat het leereffect concreet zien -->

> De open rate steeg van 8% naar 34%.

## Het ochtendritueel

Een LaunchAgent start de batch elke werkdag om 07:00. Om 07:15 krijgt het salesteam een Telegram-bericht: "25 drafts klaar voor review." Na goedkeuring verstuurt het systeem de e-mails via de Microsoft Graph API, vanuit het eigen mailaccount van de salesmedewerker. De prospect ziet dus geen apart platform als afzender.

Reageert een prospect na drie dagen niet, dan maakt het systeem een follow-up die voortbouwt op de eerste e-mail. Een sequentie stopt na maximaal drie berichten.

## Van 8% naar 34%

Het salesteam beoordeelt de batch nu elke ochtend in tien minuten. De open rate steeg van 8% naar 34%. Twee mensen doen het werk waar eerder vijf mensen voor nodig waren.

<!-- MENS: citaat van een van de twee salesmensen over het ochtendritueel, met naam of rol -->
