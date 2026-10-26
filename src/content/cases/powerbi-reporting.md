---
title: "872 Power BI reports in 3 maanden"
titleTag: "872 Power BI-rapporten in 3 maanden met Claude"
description: "Anderhalf uur handwerk per report, keer 50 klanten, keer twee talen: dat is een fulltime baan. Zo maakte ons team er 872, met gevalideerde data."
sector: "MSP"
duration: "12 weken"
tools: ["Claude Code", "Power BI MCP", "Python", "LaunchAgent"]
results:
  - "872 live reports in twee talen (449 EN, 423 NL)"
  - "Nul verzonnen DAX measures dankzij geautomatiseerde validatie"
  - "Dagelijks verversde dashboards via LaunchAgent"
publishDate: 2026-05-18
kernwinst: "20 uur rapportage per week → minder dan 1 uur"
klantprofiel: "MSP-softwarebedrijf met 50+ klanten, rapportages in twee talen"
voorJou: "Zit je vast aan uren handwerk per klantrapport, misschien nog in meerdere talen? Met validatie tegen je eigen datamodel kun je reports op schaal genereren: professioneel opgemaakt, met correcte cijfers, en elke ochtend automatisch ververst."
---

## Een fulltime baan aan rapportages

Ons team bouwde dit eerder bij een Nederlands softwarebedrijf. De data stond al keurig in Power BI. Maar dit MSP-softwarebedrijf met 50+ klanten had geen goede manier om er per klant een report van te maken. Eén report kostte anderhalf uur handwerk: DAX-queries schrijven, data controleren, layout opmaken en vertalen naar het Engels. Reken dat door voor 50 klanten en je hebt een fulltime baan. We wilden nette reports in twee talen, met correcte cijfers, zonder er zelf uren aan kwijt te zijn.

## Een commando in plaats van anderhalf uur

We bouwden een custom slash command in Claude Code. Je geeft een klantnaam en een rapporttype op, en het command maakt een compleet report. De beschikbare measures en dimensies haalt het op via een MCP-server die direct op het Power BI-model is aangesloten.

Elke DAX-query wordt gecontroleerd tegen dat echte datamodel. Bestaat een measure niet, dan komt die niet in het report. Zo kan er geen verzonnen kolom of measure in een report terechtkomen.

Elk report heeft dezelfde opbouw: samenvatting, trendgrafieken, detailtabellen en een korte uitleg bij afwijkingen. De layout ziet er goed uit op scherm en op papier.

> Van 20 uur rapportage per week naar minder dan 1 uur.

## Leren van de eerste 200

Na de eerste 200 reports controleerden we alle bestanden in één keer op hun structuur. Daar kwamen 30 problemen uit, zoals ontbrekende secties, een verkeerde kolomvolgorde en inconsistente namen. We herstelden ze in één ronde. Bij handwerk waren diezelfde fouten maandenlang blijven zitten.

<!-- MENS: kort moment uit de structural sweep — hoe kwam het eerste structurele probleem aan het licht? -->

Daarna kwam er een staging-systeem. Heeft iemand een report met de hand bijgewerkt, dan krijgt het de status "frozen". Het deploy-script slaat die pagina's over, zodat handwerk niet wordt overschreven. Een aparte check, de Visual Truthifier, kijkt vóór publicatie of grafieken en tabellen goed renderen. Een lege chart of een ontbrekend label komt zo niet live.

## Elke ochtend vers

Een LaunchAgent draait elke dag om 06:00 en ververst alle dashboards. Als de medewerkers beginnen, staat de nieuwste data klaar. Voor publicaties is er een deploy-playbook met alle stappen, inclusief rollback.

Het resultaat: 872 live reports, 449 in het Engels en 423 in het Nederlands, allemaal met gevalideerde data. Nieuwe klanten krijgen hun eerste set reports op dag twee van de onboarding.

<!-- MENS: reactie van een klant op de reports — wat viel hen op? Met rol (bijv. "de IT-manager van een klant") -->
