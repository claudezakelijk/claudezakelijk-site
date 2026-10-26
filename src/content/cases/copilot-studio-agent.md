---
title: "AI-assistent genereert rapportages op aanvraag"
titleTag: "Rapportages op aanvraag met Claude Code"
description: "Twee volle werkdagen per kwartaal aan handmatige rapportages. Nu vraagt de klant het gewoon zelf, in een chat, klaar in twee minuten."
sector: "MSP"
duration: "3 weken"
tools: ["Claude Code", "Azure AD", "Streamable HTTP", "Power BI"]
results:
  - "Rapportage-aanvraag van 45 minuten teruggebracht naar 2 minuten"
  - "Klant kan zelf rapportages opvragen zonder tussenkomst van een medewerker"
  - "Authenticatie via bedrijfs-SSO, geen extra inloggegevens nodig"
publishDate: 2026-05-18
kernwinst: "45 minuten per rapport → 2 minuten, klant vraagt het zelf op"
klantprofiel: "MSP-softwarebedrijf met ~20 klanten per kwartaal"
voorJou: "Stel je terugkerende rapportages nog met de hand samen voor je klanten? Een AI-assistent achter je bestaande bedrijfslogin kan die aanvragen overnemen: de klant vraagt in gewone taal wat die wil zien en krijgt binnen minuten een gevalideerd rapport terug."
---

## Steeds hetzelfde rondje

Ons team bouwde dit eerder voor een klant van een Nederlands IT-consultancybureau. Bij dit MSP-softwarebedrijf kende iedereen het rondje. Een klant vraagt een kwartaalrapport aan. Een medewerker logt in op het BI-platform, kiest de juiste dataset, maakt het rapport, exporteert het als PDF en stuurt het op. Dat kost 30 tot 45 minuten per rapport. Met twintig klanten per kwartaal is dat twee volle werkdagen.

Het bedrijf wilde dat klanten zelf hun rapportages konden opvragen. Gewoon door te vragen wat ze willen zien, zonder portaal met tien dropdowns.

## Vragen in plaats van klikken

Met Claude Code bouwden we een agent achter een chatinterface. De klant typt bijvoorbeeld "Laat mijn SLA-prestaties van Q1 zien" en krijgt binnen twee minuten een opgemaakt rapport terug.

> Een rapport kostte 30 tot 45 minuten handwerk. Nu vraagt de klant het zelf op en is het klaar in 2 minuten.

De agent bestaat uit drie onderdelen: een Streamable HTTP-endpoint dat de chatberichten ontvangt, een authenticatielaag via Azure AD, en een rapportage-engine die de cijfers uit het datamodel haalt en in het standaardformat zet.

Voor het inloggen gebruikt de agent de OAuth on-behalf-of flow. De klant logt in met het bestaande bedrijfsaccount, dus een apart wachtwoord is niet nodig. Wie inlogt, krijgt alleen de eigen data te zien.

## Geen verzonnen cijfers

Elk rapport doorloopt dezelfde validatie als vroeger bij het handwerk. De DAX-queries worden gecontroleerd tegen het echte datamodel. Bestaat een measure niet voor een klant, dan valt die uit het rapport, met een korte uitleg waarom.

De output volgt een vast template. Wat de klant ook vraagt, het rapport ziet er altijd hetzelfde uit.

## Wat er veranderde

Klanten vragen hun rapportages nu zelf op, ook tussentijds. Dat was vroeger te veel gedoe. De twee werkdagen per kwartaal zijn teruggebracht tot af en toe een controle.

<!-- MENS: eerste reactie van een klant die de agent voor het eerst gebruikte — wat vroegen ze, en wat zeiden ze erna? -->
