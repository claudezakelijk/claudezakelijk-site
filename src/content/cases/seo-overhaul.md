---
title: "SEO-analyse: van 0.09% CTR naar een concreet actieplan"
description: "311.000 impressies per maand, en vrijwel niemand die klikte. Eén uur data-analyse legde bloot waarom, en wat eraan te doen was."
titleTag: "SEO-analyse van 311.000 impressies met Claude"
sector: "SaaS"
duration: "2 weken"
tools: ["Claude Code", "GSC MCP", "WordPress", "SSH"]
results:
  - "Volledige diagnose binnen een uur (was nooit eerder onderzocht)"
  - "14 kannibaliserende pagina's geidentificeerd en opgelost"
  - "Concrete rewrites voor alle meta titels, descriptions en H1 tags"
publishDate: 2026-05-18
kernwinst: "Nooit geanalyseerde Search Console-data → volledige diagnose binnen een uur"
klantprofiel: "SaaS-bedrijf met 311.000 zoekimpressies per maand"
voorJou: "Krijgt jouw site veel vertoningen in Google, maar weinig kliks? De verklaring staat vaak al in je eigen Search Console-data. Een grondige analyse laat zien welke pagina's elkaar in de weg zitten en welke titels niet aansluiten op wat mensen echt zoeken."
---

## Veel bekeken, nooit geklikt

Ons team deed dit eerder bij een Nederlands softwarebedrijf. Dit SaaS-bedrijf kreeg 311.000 impressies per maand in Google. Toch klikte er bijna niemand: op niet-merkgerelateerde zoekopdrachten was de click-through rate 0,09%. Bijna al het verkeer kwam binnen op de bedrijfsnaam. De groei op inhoudelijke zoektermen stond stil.

Het bedrijf wist dat er iets mis was, maar kwam er niet aan toe om de Search Console-data goed te analyseren. Daarvoor was het te veel data en te weinig tijd.

<!-- MENS: wie kaartte dit aan, en wat was het moment waarop besloten werd het echt uit te zoeken? -->

## De diagnose in één uur

Claude Code las de volledige Google Search Console-dataset via een GSC MCP-server. Binnen een uur lag de diagnose op tafel.

Het hoofdprobleem was keyword cannibalization: veertien pagina's beconcurreerden elkaar op dezelfde zoektermen. Zo rankten een blogartikel, een productpagina en een FAQ-pagina alle drie op "power bi dashboard", maar geen van drieën hoog genoeg om clicks op te leveren.

Daarnaast hadden tien pagina's een generieke meta-titel in de trant van "[Bedrijfsnaam] - [Paginanaam]", zonder één zoekterm erin. De H1-tags waren inconsistent: sommige pagina's hadden er twee, andere geen. En de interne links wezen naar de verkeerde pagina's, waardoor Google juist de minder relevante liet ranken.

> 311.000 impressies per maand, en een click-through rate van 0,09%.

## Herschrijven op echte data

We voerden een on-page audit uit van alle betrokken pagina's: meta-titel, meta-description, H1, interne links, en de zoektermen waarop elke pagina impressies kreeg in GSC.

De rewrites zijn gebaseerd op zoektermen die mensen echt intypen. Kreeg een pagina 2.400 impressies op "power bi rapportage automatiseren", dan werd die zoekterm de focus van de titel en de H1.

De aanpassingen gingen direct de productieserver op: de Yoast-velden zijn herschreven via SSH en WP-CLI, zonder handwerk in het CMS. Een link-audit tussen twee gerelateerde domeinen ruimde verwijzingen op die naar verkeerde of verdwenen pagina's wezen.

Voor de kannibalisatie maakten we duidelijke keuzes. Van de drie pagina's op "power bi dashboard" werd er één aangewezen als hoofdpagina. De andere twee kregen eigen zoektermen of werden samengevoegd.

## Wat er nu ligt

De diagnose die er nooit eerder was, stond binnen een uur op papier. Alle betrokken pagina's kregen een concrete rewrite, en die is direct doorgevoerd. Er ligt ook een meetplan voor de komende 30 dagen om het effect te volgen in Search Console.

<!-- MENS: wat liet Search Console na die 30 dagen zien? Zelfs een voorzichtige eerste beweging (CTR/posities) maakt deze case af -->
