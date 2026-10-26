---
title: "173 dashboards met dagelijkse automatische verversing"
description: "We wilden trends zien, maar elke dashboard-viewer kostte een BI-licentie. Dus bouwden we 173 dashboards die elke ochtend zichzelf verversen, zonder licenties."
titleTag: "173 zelfverversende dashboards met Claude Code"
metaDescription: "Elke dashboard-viewer kostte een BI-licentie. Daarom bouwden we 173 dashboards die zichzelf elke dag verversen, zonder licenties."
sector: "MSP"
duration: "5 weken"
tools: ["Claude Code", "Chart.js", "WordPress", "LaunchAgent"]
results:
  - "173 interactieve dashboards live over 10 categorieën"
  - "Dagelijkse automatische verversing om 07:00, team start met actuele data"
  - "Geen BI-licenties nodig voor dashboard-viewers"
publishDate: 2026-05-18
kernwinst: "Een BI-licentie per viewer → 173 dashboards zonder licentiekosten"
klantprofiel: "MSP-softwarebedrijf met twintig interne gebruikers"
voorJou: "Betaal je per persoon om dashboards te mogen bekijken, of blijven de cijfers daardoor bij een klein groepje hangen? Dashboards hoeven niet uit een duur BI-platform te komen. Gegenereerde webpagina's die elke ochtend automatisch verversen geven iedereen dezelfde actuele data, zonder licentie per viewer."
---

## "Heeft iemand de cijfers?"

Ons team bouwde dit eerder bij een Nederlands softwarebedrijf. Dit MSP-softwarebedrijf had rapportages genoeg, maar geen dashboards. Een rapportage geeft een momentopname. We wilden juist de beweging zien: hoe de responstijd zich over de maanden ontwikkelt, welke klanten de meeste tickets opleveren en waar SLA-risico's ontstaan.

Dashboards bouwen in het BI-platform lag voor de hand, maar elke viewer had daar een licentie voor nodig. Bij twintig interne gebruikers liep dat op. Bovendien moesten de dashboards dagelijks ververst worden, anders kijkt iedereen naar de cijfers van vorige week.

## 173 pagina's, nul licenties

We lieten Claude Code 173 dashboards genereren in Chart.js, verdeeld over tien categorieën, waaronder ticketvolume, responstijden, SLA-compliance, klanttevredenheid, contractwaarde en resourcebezetting. Elk dashboard is een interactieve HTML-pagina met grafieken, filters en drill-down.

De dashboards draaien als WordPress-pagina's onder één gezamenlijke parent-pagina. Daar is geen aparte applicatie, extra hosting of loginportaal voor nodig. Medewerkers openen een bookmark en zien de data.

Het SLA-dashboard toont bijvoorbeeld de compliance als percentage, een trendlijn over twaalf maanden, een uitsplitsing per prioriteit en de klanten die het dichtst bij een overschrijding zitten. Je kunt filteren per periode, klant en categorie, en bij elke grafiek zie je de exacte cijfers.

## Elke ochtend om 07:00

Een LaunchAgent start elke ochtend om 07:00 een script. Dat haalt de actuele data op, genereert de grafieken opnieuw en publiceert de bijgewerkte pagina's. Als de medewerkers om 08:30 beginnen, staat de data van gisteren klaar.

> Elke ochtend om 07:00 verversen alle 173 dashboards automatisch.

Er komt geen handmatige export meer aan te pas en niemand hoeft te onthouden dat er ververst moet worden. Gaat er iets mis met de databron, dan logt het script een foutmelding en stuurt het een notificatie. De dashboards van de vorige dag blijven dan gewoon staan tot het is opgelost.

## Het overleg begint nu anders

Iedereen start elke dag met actuele data. Managementoverleggen beginnen met een blik op het dashboard in plaats van met de vraag of iemand de cijfers heeft. En dat zonder één euro aan viewer-licenties.

<!-- MENS: welk dashboard wordt in de praktijk het meest bekeken, en waarom? -->
<!-- MENS: een concreet moment waarop het dashboard een probleem eerder zichtbaar maakte (bijv. een SLA-risico dat op tijd werd opgepakt) -->
