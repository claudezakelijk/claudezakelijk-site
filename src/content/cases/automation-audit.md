---
title: "Achtergrondprocessen doorlichten: 38 scripts, 9 gerepareerd"
description: "Een dagelijkse data-sync bleek al twee weken stil te staan, en niemand had het gemerkt. Aanleiding om alle 38 achtergrondprocessen door te lichten."
titleTag: "38 achtergrondprocessen doorgelicht met Claude"
sector: "SaaS"
duration: "2 dagen"
tools: ["Claude Code", "LaunchAgent", "Bash", "Python"]
results:
  - "38 achtergrondprocessen geïnventariseerd over 2 machines"
  - "9 stilgevallen of foutieve scripts gerepareerd"
  - "Gedocumenteerd overzicht van wat draait, wanneer en waarom"
publishDate: 2026-05-18
kernwinst: "9 van de 38 achtergrondprocessen kapot of stilgevallen → alle 38 draaien weer, gedocumenteerd"
klantprofiel: "SaaS-bedrijf met tientallen zelfgebouwde achtergrondprocessen op twee machines"
voorJou: "Draaien er bij jou ook scripts en syncs waarvan niemand meer zeker weet of ze nog werken? Een doorlichting laat zien wat er draait, wat stil is gevallen en waarom. Met een dagelijkse check erbij merk je het voortaan direct als er iets stopt."
---

## De sync die twee weken stil stond

Ons team deed dit eerder bij een Nederlands softwarebedrijf. Een dagelijkse data-sync bleek al twee weken niet meer te draaien. Er was geen foutmelding en geen alarm, dus niemand had het gemerkt.

<!-- MENS: 1-2 zinnen over hoe die stilgevallen sync aan het licht kwam — wie ontdekte het, en wat was het directe gevolg? -->

Dat riep een ongemakkelijke vraag op. Het bedrijf had in de loop van maanden tientallen geautomatiseerde processen opgezet: dashboard-refreshes, data-syncs, backupscripts en monitoringchecks. Elk script was op een ander moment gebouwd, en niemand overzag het geheel. Waren er nog meer scripts ongemerkt gestopt?

## Alles op tafel

We lieten Claude Code alle geautomatiseerde processen op beide machines inventariseren: LaunchAgents, cron jobs, achtergrondscripts en scheduled tasks. Per proces legden we vast wat het doet, wanneer het draait, wat de laatste succesvolle run was en of het nu nog werkt.

> Van de 38 gevonden processen werkten er 9 niet meer.

Drie scripts waren gestopt door een permissie-wijziging na een OS-update, en twee verwezen naar een map die niet meer bestond. Nog eens twee schreven hun fouten naar een logbestand dat niemand las. Eén script draaide nog wel, maar leverde niets bruikbaars meer op sinds de bron-API was veranderd. Het laatste had een timingconflict met een ander script.

## Repareren, en opschrijven waarom

Claude Code zocht per kapot script de oorzaak op en repareerde het. De permissies werden opnieuw ingesteld, de ontbrekende paden gecorrigeerd en de request-structuur aangepast aan de gewijzigde API. Het timingconflict was simpel op te lossen: de starttijden vijf minuten uit elkaar zetten.

Minstens zo belangrijk is het overzicht dat eruit kwam. Alle 38 processen staan nu gedocumenteerd: naam, doel, frequentie, locatie van het scriptbestand, verwachte output en hoe je controleert of het werkt. Ook iemand die er niet bij was, kan nu zien wat er 's nachts draait en waarom.

## Wat er nu anders is

De negen gerepareerde scripts draaien weer. Er is ook een dagelijkse check bijgekomen die bevestigt dat alle scripts succesvol gedraaid hebben. Valt er nog eens een script stil, dan ziet het bedrijf dat bij die check.

<!-- MENS: korte reactie van iemand uit het team op het getal 9 — schrokken jullie, of was het herkenbaar? -->
