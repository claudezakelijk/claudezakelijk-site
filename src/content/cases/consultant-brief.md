---
title: "Vergadernotities naar actiepunten in 5 minuten"
titleTag: "Vergadernotities naar actiepunten met Claude"
description: "Niemand keek de opnames van klantgesprekken echt terug. Een IT-consultancybureau maakte er gestructureerde briefs van, met de videoclips op de juiste plek."
metaDescription: "Niemand keek de opnames van klantgesprekken terug. Een IT-consultancybureau maakt er nu briefs van, met de videoclips op de juiste plek."
sector: "IT-consultancy"
duration: "1 week"
tools: ["Claude Code", "FFmpeg", "VTT/MP4", "HTML"]
results:
  - "Verwerking van een uur vergadering in 5 minuten (was 45 minuten)"
  - "Gestructureerde briefs met embedded videoclips op de juiste momenten"
  - "Consultants starten voorbereid aan het vervolgtraject"
publishDate: 2026-05-18
kernwinst: "45 minuten uitwerken per gesprek → 5 minuten"
klantprofiel: "IT-consultancybureau dat wekelijks assessment-gesprekken met klanten opneemt"
voorJou: "Neem je klantgesprekken op die daarna niemand terugkijkt? Zo'n opname is om te zetten in een korte brief met de videofragmenten op de juiste plek. De kennis uit het gesprek blijft zo bruikbaar, zonder dat iemand het hele uur opnieuw bekijkt."
---

## Het uur dat niemand terugkeek

Ons team bouwde dit eerder bij een Nederlands IT-consultancybureau. Dit IT-consultancybureau voert elke week een assessment-gesprek met een klant. Zo'n gesprek duurt een uur en wordt opgenomen via Teams. Daarna keek een collega de opname terug, noteerde de kernpunten en schreef een samenvatting voor de consultant van het vervolgtraject.

Dat kostte 45 minuten per gesprek. In de praktijk keek niemand de hele opname echt terug. Wie de samenvatting schreef, sloeg stukken over en miste nuances.

<!-- MENS: een concreet voorbeeld van iets dat in de oude werkwijze verloren ging — een gemiste afspraak of nuance die later opdook -->

## Van opname naar brief

We bouwden met Claude Code een skill die een Teams-opname (MP4 plus het VTT-ondertitelbestand) omzet naar een gestructureerde brief. De skill deelt het transcript op in blokken: probleembeschrijving, huidige situatie, gewenste situatie, randvoorwaarden en afspraken. Bij elk blok komt het passende fragment uit de video-opname.

De uitkomst is een HTML-document met per onderwerp een korte samenvatting en een videoclip. De consultant leest de samenvatting en klikt alleen op de clips waar meer context nodig is.

Elke brief volgt hetzelfde format:

- Naam van de klant en datum van het gesprek
- De drie tot vijf kernproblemen die besproken zijn
- Per probleem: een alinea context en een videoclip van 30 tot 90 seconden
- Concrete vervolgacties met wie, wat en wanneer
- Openstaande vragen voor het vervolgtraject

De clips worden automatisch uit de originele opname geknipt op basis van de timestamps in het ondertitelbestand.

> Van 45 minuten naar 5 minuten verwerking per gesprek.

## Het tweede gesprek werd beter

De verwerking van een uur gesprek duurt nu vijf minuten. De consultant van het vervolgtraject leest de brief in tien minuten en zit beter in het dossier dan met de oude samenvatting. In het tweede gesprek stelt die daardoor meteen de juiste vragen aan de klant.

<!-- MENS: reactie van een consultant of klant op de nieuwe werkwijze, met rol (bijv. "een van de senior consultants") -->
