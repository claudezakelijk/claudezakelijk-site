---
title: "Self-hosted CRM opgezet in een weekend"
titleTag: "Self-hosted CRM in een weekend met Claude Code"
description: "Drie losse tools, 180 euro per maand, en data die nergens samenkwam. Een SaaS-team verving het allemaal in één weekend door een eigen CRM-stack."
sector: "SaaS"
duration: "1 weekend"
tools: ["Claude Code", "Docker", "Twenty CRM", "Listmonk"]
results:
  - "Compleet CRM + e-mailmarketing operationeel in twee dagen"
  - "Nul euro maandelijkse licentiekosten (was 180 euro/maand)"
  - "Volledige controle over klantdata, geen vendor lock-in"
publishDate: 2026-05-18
kernwinst: "180 euro/maand aan licenties → 0 euro"
klantprofiel: "SaaS-team met drie losse tools voor CRM, e-mail en leads"
voorJou: "Betaal je elke maand voor losse tools die niet met elkaar praten? Vaak zijn die te vervangen door open-source software op je eigen server, met volledige controle over je klantdata en zonder vendor lock-in."
---

## Drie tools, nul overzicht

Ons team bouwde dit eerder bij een Nederlands softwarebedrijf. Het bedrijf betaalde 180 euro per maand voor drie losse systemen. Contacten stonden in het ene, campagnes liepen via het andere. En wie welke lead moest opvolgen, hield een collega bij in een eigen spreadsheet. Niets was gekoppeld.

<!-- MENS: 1-2 zinnen over het moment waarop het echt knelde — een gemiste lead, een dubbele mail, iets concreets uit de praktijk -->

We wilden één plek voor contactbeheer, e-mailmarketing en leadtracking. Zonder licenties die duurder worden bij elk nieuw teamlid.

## Een weekend, twee open-source-tools

We besloten alle drie de systemen in één weekend te vervangen door open-source-software zonder licentiekosten: Twenty CRM voor contacten, deals en pipeline, en Listmonk voor e-mailmarketing en nieuwsbrieven. Beide draaien in Docker-containers op de server die het bedrijf al had.

Claude Code schreef de Docker Compose-configuratie, de omgevingsvariabelen, de reverse proxy en de database-setup. Door de containers is het systeem ook makkelijk te verhuizen: voor een backup kopieer je een map, voor een migratie start je dezelfde containers op een andere server.

De twee tools zijn bovendien aan elkaar gekoppeld. Nieuwe contacten uit het CRM staan automatisch als ontvangers in Listmonk, en opens en clicks komen terug in het CRM als activiteit bij het contact.

We begonnen vrijdagavond met contacten importeren en e-mailtemplates overzetten. Zondagmiddag stuurden we de eerste testcampagne uit het nieuwe systeem.

> Van 180 euro per maand aan licenties naar 0 euro.

## Wat er nu anders is

De licentiekosten zijn weg, want alles draait op de eigen server. Maar het bedrijf noemt iets anders als grootste winst: het is nu hun eigen systeem. Ze wachten niet meer op een leverancier voor een nieuwe functie. Extra velden, aangepaste workflows of een koppeling met interne tools bouwen ze wanneer ze zelf willen.

<!-- MENS: citaat van iemand uit het team over het werken ermee, met naam of rol -->
