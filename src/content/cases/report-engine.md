---
title: "GDPR-first rapportage zonder dure BI-licenties"
titleTag: "Rapportage zonder BI-licenties met Claude Code"
description: "Sommige prospects haakten af zodra ze hoorden dat hun data via de cloud ging. Dus bouwde ons team een rapportage-engine waarbij de data de eigen server nooit verlaat."
metaDescription: "Prospects haakten af zodra hun data via de cloud ging. Dus bouwde ons team een rapportage-engine waarbij de data de eigen server niet verlaat."
sector: "MSP"
duration: "6 weken"
tools: ["Claude Code", "PHP", "DuckDB", "HTML/CSS"]
results:
  - "Rapportages genereren zonder Power BI Pro licenties (besparing 1.200 euro/jaar)"
  - "Data verlaat de eigen server niet, volledig GDPR-compliant"
  - "281 rapporttypes gepland en gespecificeerd in een content planner"
publishDate: 2026-05-18
kernwinst: "Rapportages via de Power BI-cloud → lokaal, zonder viewer-licenties (1.200 euro/jaar bespaard)"
klantprofiel: "MSP-softwarebedrijf met klanten in gereguleerde sectoren"
voorJou: "Haken jouw prospects ook af op het idee dat hun data via de cloud gaat? Rapportages kunnen ook lokaal draaien, zonder licentie per gebruiker. Privacy wordt dan geen bezwaar meer, maar een verkoopargument."
---

## De prospect die afhaakte

Ons team bouwde dit eerder bij een Nederlands softwarebedrijf. De rapportages van dit MSP-softwarebedrijf draaiden prima op Power BI. Toch zaten er twee problemen aan. De kosten: elke gebruiker die rapporten wilde bekijken, had een Pro-licentie nodig, en bij een groeiend klantenbestand stegen die kosten mee. En de privacy woog zwaarder: klantdata ging via de Power BI-cloud. De meeste klanten vonden dat prima, maar sommige prospects haakten af omdat hun operationele data dan bij een derde partij stond.

<!-- MENS: wat zei zo'n prospect precies? Eén zin uit dat gesprek maakt dit punt tastbaar -->

We wilden dezelfde rapportages uit dezelfde data, maar dan lokaal, zonder cloud en zonder licenties per gebruiker.

## Dezelfde data, eigen server

We bouwden met Claude Code een rapportage-engine in PHP. De engine haalt data uit een lokale DuckDB-database met 148 tabellen, 254 measures en 1,55 miljoen rijen. Dat is dezelfde dataset die eerst in het semantische model van Power BI zat, maar nu draait hij op de eigen server.

Per rapporttype bepaal je welke cijfers erin komen, hoe de opmaak eruitziet en welke toelichting het systeem schrijft. De uitkomst is een HTML-document dat er goed uitziet op scherm en op papier. De klant heeft geen viewer-licentie nodig: link openen in de browser is genoeg.

Een content planner beschrijft 281 rapporttypes in tien categorieën, zoals SLA-prestaties, ticketanalyse, contractoverzichten en financiële samenvattingen. Elk type heeft een beschrijving, de benodigde measures en de doelgroep.

> Rapportages zonder BI-licenties: 1.200 euro per jaar bespaard.

## Privacy als ontwerpkeuze

De data verlaat de server niet. De engine draait op dezelfde machine als de database. Alleen de gegenereerde rapporten gaan via HTTPS naar de klant; de ruwe data blijft waar hij staat. Voor klanten in gereguleerde sectoren is dat een harde eis.

Er zit ook een anonimisatielaag in. Voor demo's en presentaties vervangt het systeem klantnamen, bedragen en andere herkenbare gegevens door fictieve data. Zo laat je het product zien zonder echte klantdata te tonen.

## Wat het opleverde

De eerste tien rapporttypes draaien in productie. De licentiekosten daalden met 1.200 euro per jaar, omdat een deel van de gebruikers geen Power BI Pro meer nodig heeft. Het privacy-verhaal werd bovendien een verkoopargument: twee prospects die eerder afhaakten op de cloud, stapten alsnog in.

<!-- MENS: context bij de 1.200 euro — om hoeveel gebruikers/licenties gaat het? -->
