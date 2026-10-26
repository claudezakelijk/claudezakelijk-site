---
title: "Gestructureerde kennisoverdracht tussen AI-sessies"
description: "Een goed AI-gesprek vol analyses en beslissingen verdween zodra de sessie sloot. Ons team bouwde een archief dat elke sessie laat verdergaan waar de vorige stopte."
titleTag: "Kennisoverdracht tussen AI-sessies met Claude"
metaDescription: "Een AI-gesprek vol analyses verdween zodra de sessie sloot. Ons team bouwde een archief waarmee elke nieuwe sessie verdergaat waar de vorige stopte."
sector: "SaaS"
duration: "3 weken"
tools: ["Claude Code", "HTML", "Git", "LaunchAgent"]
results:
  - "122 gestructureerde kennisdocumenten met automatische archivering"
  - "Nieuwe sessie pikt context op in seconden via embedded metadata"
  - "Kennisoverdracht tussen teamleden via deelbare links"
publishDate: 2026-05-18
kernwinst: "Context weg na elke AI-sessie → nieuwe sessie leest de context in seconden"
klantprofiel: "Tech-bedrijf (SaaS) dat intensief met AI-assistenten werkt"
voorJou: "Werk jij ook met AI-assistenten en begint elk gesprek weer bij nul? Met een archief van sessiedocumenten gaat een nieuwe sessie verder waar de vorige stopte. Dat werkt ook voor overdracht tussen collega's."
---

## Het gesprek dat verdween

Ons team bouwde dit eerder bij een Nederlands softwarebedrijf. Dit tech-bedrijf werkte intensief met AI-assistenten. Elke sessie leverde iets waardevols op: een analyse, een plan, een beslissing, een specificatie. Maar bij de volgende sessie was alles weg. Medewerkers moesten opnieuw uitleggen wat er eerder was besloten, en kopieerden daarom stukken tekst uit oude chats. Dat werd al snel onwerkbaar.

## Elke sessie eindigt met een document

We bouwden met Claude Code een archiefsysteem dat de output van elke sessie opslaat als een HTML-document met metadata in een JSON-blok: titel, datum, samenvatting, de fase van het werk, wat er in de sessie is gedaan, openstaande blokkades, en verwijzingen naar gerelateerde bestanden en systemen.

Een volgende sessie opent het document, leest het JSON-blok en heeft binnen seconden de volledige context.

De documenten zijn ook voor mensen prettig leesbaar. Het HTML-format toont de inhoud in een vast, printbaar design. Een analyse van vorige week leest daardoor als een memo.

## Archiveren zonder erover na te denken

Een achtergrondproces zet elk nieuw document automatisch in een Git-repository. Documenten gaan via links rond: een collega die aan hetzelfde project werkt, opent de link en heeft dezelfde context als degene die het document maakte.

> Na vier maanden staan er 122 documenten in het archief.

Er staan analyses in, specificaties, architectuurbeslissingen, campagneplannen en technische onderzoeken. Archiveren kost geen extra werk: elke sessie die iets oplevert dat later relevant kan zijn, eindigt gewoon met een document.

## Verdergaan waar de vorige stopte

Er gaat geen context meer verloren tussen sessies. Een nieuw gesprek over een project begint met een link naar het meest recente archiefdocument, en de sessie gaat verder waar de vorige ophield. Dat werkt ook tussen mensen: wie het document leest, kan het project oppakken.

<!-- MENS: een concreet voorbeeld van een overdracht die hierdoor soepel liep — een collega die een project via een archieflink overnam -->
