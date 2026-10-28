---
title: "Claude koppelen aan Yuki"
titleTag: "Claude Yuki: automatische verwerking | Implementeren.ai"
metaDescription: "Hoe Yuki en Claude samen werken voor categorisatie, vragen aan klanten en periodieke rapportages."
h1: "Claude Yuki boekhouden: koppelen en automatiseren"
targetKeywords:
  - claude yuki boekhouden
  - yuki ai koppeling
wordCountTarget: 1300
priority: 2
tier: 3
cases:
  - automation-audit
internalLinks: []
schemaTypes:
  - Article
  - FAQPage
  - BreadcrumbList
author: camiel
competitors: []
status: draft
publishDate: null
updatedDate: null
changelogLine: null
faq:
  - question: "Heeft Claude een directe koppeling met Yuki?"
    answer: "Nee. Claude heeft geen ingebouwde Yuki-integratie. De koppeling loopt via de Yuki API (SOAP/REST) of via exports in CSV/MT940-formaat. Claude verwerkt die data nadat je het ophaalt. Met een MCP server automatiseer je het ophalen, zodat Claude direct met actuele boekingsdata werkt zonder handmatige export."
  - question: "Mag ik klantgegevens uit Yuki aan Claude voeren?"
    answer: "Alleen als je pseudonimiseert. Financiële klantdata valt onder de AVG. Vervang klantnamen, rekeningnummers en identificerende gegevens voordat je ze in een prompt stopt. Voor rode data zoals BSN-nummers of loonstroken: gebruik een lokaal model via Ollama. Wij helpen bij het inrichten van die scheiding."
  - question: "Welke Yuki-workflows zijn geschikt voor Claude?"
    answer: "Drie categorieën leveren het meeste op. Ten eerste: categorisatie van bankafschriften die Yuki niet automatisch herkent. Ten tweede: het beantwoorden van klantvragen over hun administratie. Ten derde: periodieke rapportages zoals kwartaaloverzichten of btw-samenvattingen. Begin met de workflow die nu de meeste handmatige tijd kost."
  - question: "Werkt dit ook als ik Yuki gebruik via een accountant?"
    answer: "Ja. De aanpak is dezelfde, maar de accountant bepaalt welke data beschikbaar is. Veel kantoren exporteren periodiek uit Yuki voor hun klanten. Claude verwerkt die exports. Als je zelf API-toegang hebt via het Yuki Portaal, kun je de koppeling ook zelf opzetten. In de praktijk doen wij dat samen met het kantoor."
  - question: "Wat kost het om Claude aan Yuki te koppelen?"
    answer: "Claude Pro kost 20 dollar per gebruiker per maand. De implementatie van de Yuki-koppeling duurt 1 tot 3 weken, afhankelijk van het aantal workflows. Een eenvoudige categorisatie-workflow staat binnen een week. Een volledig geautomatiseerde rapportagepijplijn met API-koppeling duurt 2 tot 3 weken."
softwareName: "Yuki"
softwareUrl: "https://www.yuki.nl"
---

Claude Yuki boekhouden combineert twee krachten. Yuki is de online boekhoudsoftware van Visma die bankafschriften, facturen en bonnen automatisch verwerkt. Claude is het AI-model van Anthropic dat tekst analyseert, categoriseert en genereert. Met een Yuki AI koppeling verwerkt Claude wat Yuki niet automatisch kan. Hieronder lees je hoe die koppeling werkt, wat het oplevert en hoe je het veilig inricht.

## Yuki AI koppeling: wat is Yuki en waarom Claude

Yuki automatiseert het boekhoudwerk voor zo'n 350.000 administraties in Nederland en Belgie. Bankafschriften worden automatisch ingelezen, facturen herkend via OCR, en boekingen voorgesteld op basis van herkenningsregels. Maar Yuki stopt waar de patronen ophouden. Onbekende tegenpartijen, atypische boekingen, facturen zonder match in het systeem: die belanden in de werklijst van de boekhouder.

Claude pakt precies dat stuk op. Het analyseert bankafschriften die Yuki niet automatisch categoriseert, beantwoordt klantvragen over de administratie, en genereert rapportages uit Yuki-data. Geen vervanging van Yuki, maar een verlengstuk voor het werk dat Yuki aan mensen overlaat.

De koppeling is relevant voor mkb-ondernemers die Yuki zelf gebruiken, accountantskantoren die Yuki inzetten voor hun klanten, en boekhouders die met Yuki-administraties werken.

## Claude Yuki boekhouden: stappenplan voor de koppeling

### Stap 1: bepaal welke Yuki-data je nodig hebt

Yuki slaat alles op: bankafschriften, verkoopfacturen, inkoopfacturen, btw-aangiftes, grootboekkaarten. Niet alles is relevant voor Claude. Begin met een inventarisatie:

- **Bankafschriften** (MT940/CAMT.053 formaat): voor categorisatie van onherkende transacties
- **Grootboekkaarten**: voor periodieke rapportages en analyses
- **Facturen** (PDF via OCR): voor controle en matching
- **Btw-overzichten**: voor kwartaalcontrole en aangifte-voorbereiding

Kies maximaal twee databronnen voor de eerste iteratie. In april 2026 inventariseerden we 38 achtergrondprocessen voor een SaaS-bedrijf en repareerden er 9. Drie waren gestopt door een permissiewijziging na een OS-update. Dezelfde systematische audit-aanpak werkt voor Yuki-workflows: breng eerst in kaart wat er draait, wat vastloopt, en waar de handmatige tijd zit.

### Stap 2: data ophalen uit Yuki

Yuki biedt twee routes voor data:

**Handmatige export.** Vanuit het Yuki Portaal exporteer je grootboekkaarten, saldibalansen en transactieoverzichten als CSV of Excel. Geschikt als je eenmalig of maandelijks data nodig hebt.

**API-koppeling.** De Yuki API (SOAP en REST) geeft programmatische toegang tot administraties, boekingen en documenten. Met een MCP server in Claude Code bouw je een brug tussen Claude en Yuki: Claude vraagt data op via de MCP server, die de Yuki API aanroept en de resultaten teruggeeft. Geen handmatige export meer.

De API-route vereist een API-key uit het Yuki Portaal (Instellingen > API) en een domeinsleutel per administratie. Bewaar die credentials in environment variables, nooit hardcoded in prompts of scripts.

### Stap 3: data voorbereiden voor Claude

Financiële data uit Yuki bevat klantnamen, rekeningnummers en bedrijfsnamen. Dat is oranje data onder de AVG. Pseudonimiseer voordat je het aan Claude voorlegt:

- Vervang klantnamen door codes (KLANT-001, KLANT-002)
- Vervang IBAN-nummers door placeholders
- Houd bedragen, datums en categoriecodes intact: die heeft Claude nodig

Je automatiseert die pseudonimisering met een script dat voor elke Yuki-export draait. Kosten: een halve dag inrichting, daarna volledig automatisch.

### Stap 4: Claude workflows inrichten

Met de data beschikbaar bouw je de workflows. De drie die het meeste opleveren:

**Categorisatie van bankafschriften.** Claude analyseert transacties die Yuki niet automatisch herkent. Op basis van omschrijving, bedrag en tegenpartij stelt Claude een grootboekcategorie voor. De boekhouder accordeert. Bij 50 onherkende transacties per maand bespaar je 2 tot 3 uur.

**Klantvragen beantwoorden.** "Staat factuur 2024-0847 al geboekt?" "Wat is mijn btw-stand dit kwartaal?" Claude beantwoordt die vragen door de Yuki-data te doorzoeken. Je bouwt een prompt-template per vraagtype. Binnen twee weken staan de 10 meest voorkomende vragen klaar.

**Periodieke rapportages.** Kwartaalcijfers, btw-samenvattingen, jaaroverzichten. Claude genereert die rapporten uit de grootboekdata. Je definieert het sjabloon (structuur, toelichtingen, vergelijkende periodes), Claude vult de cijfers in en schrijft de analyse. Bij 20 klanten met kwartaalrapportages bespaar je 160 uur per jaar.

### Stap 5: testen en valideren

Test elke workflow op een kopie van de administratie, niet op productiedata. Controleer de output van Claude tegen de originele Yuki-data:

- Kloppen de voorgestelde categorisaties met het rekeningschema?
- Zijn de btw-bedragen correct berekend?
- Missen er transacties in de rapportage?

Corrigeer fouten in het prompt-template, niet in de data. Na 2 tot 3 iteraties is de output betrouwbaar voor dagelijks gebruik.

## Prompts voor Yuki-workflows met Claude

**Categorisatie-prompt:**

```
Je bent een boekhouder die werkt met het Yuki-rekeningschema.
Hieronder staan bankafschriften die niet automatisch gecategoriseerd zijn.
Stel per transactie een grootboekrekening voor op basis van omschrijving,
bedrag en tegenpartij. Geef bij twijfel twee opties met toelichting.

[plak hier de CSV-export van onherkende transacties]
```

**Rapportage-prompt:**

```
Genereer een kwartaaloverzicht op basis van onderstaande grootboekdata.
Structuur: omzet, kosten per categorie, btw-overzicht, vergelijking
met vorig kwartaal (indien beschikbaar). Schrijf in zakelijk Nederlands.

[plak hier de saldibalans-export uit Yuki]
```

## Valkuilen bij de Yuki-Claude koppeling

**Yuki's herkenningsregels en Claude's suggesties kunnen conflicteren.** Yuki leert van eerdere boekingen. Als Claude een andere categorie voorstelt dan Yuki's herkenningsregel, volg dan het rekeningschema van de administratie, niet Claude's suggestie. Claude kent je specifieke rekeningschema niet tenzij je het meegeeft als context.

**API-limieten.** De Yuki API heeft rate limits en sommige endpoints zijn alleen beschikbaar met bepaalde Yuki-licenties. Controleer welke API-toegang je hebt voordat je een MCP server bouwt. De SOAP-API (oudere versie) en REST-API (nieuwere versie) bieden niet dezelfde functionaliteit.

**Valuta en decimalen.** Yuki gebruikt komma's als decimaalscheiding in exports. Claude verwacht standaard punten. Converteer bij het voorbereiden van de data, anders kloppen de berekeningen niet.

**Te veel data in een prompt.** Een volledige jaaradministratie past niet in een enkele prompt. Splits per kwartaal, per grootboekgroep, of per rapporttype. Gestructureerde input levert betere output.

## AVG en privacy bij Yuki-data

Yuki-administraties bevatten financiële klantdata. Die data valt onder de AVG (en de GDPR waar de AVG op is gebaseerd). Anthropic verwerkt prompts in de cloud. Dat betekent:

- **Groene data** (rekeningschema's, sjablonen, algemene boekhoudvragen): direct naar Claude
- **Oranje data** (transacties, facturen, grootboekkaarten met klantnamen): eerst pseudonimiseren
- **Rode data** (BSN-nummers, loonstroken, persoonsgegevens): alleen lokaal model, nooit naar de cloud

De NBA (voor accountants) en de brancherichtlijnen voor boekhouders vereisen dat je documenteert welke AI-tools je gebruikt en welke data je ermee verwerkt. Leg per workflow vast: welke data gaat naar Claude, hoe is die gepseudonimiseerd, en wie controleert de output. Wij helpen bij het opzetten van dat register.

Visma (het moederbedrijf van Yuki) heeft eigen AI-functionaliteit in ontwikkeling. Die draait binnen de Visma-omgeving en valt onder Visma's verwerkersovereenkomst. Claude draait bij Anthropic en valt onder een aparte overeenkomst. Zorg dat je beide verwerkersovereenkomsten op orde hebt.

## Vergelijking met Exact Online en Twinfield

Yuki onderscheidt zich van Exact Online en Twinfield door automatische documentverwerking. Waar Exact Online en Twinfield handmatige invoer verwachten, probeert Yuki boekingen zelf te verwerken. Claude vult het gat dat overblijft. Bij Exact Online is de API-documentatie uitgebreider. Bij Twinfield is de XML-API robuust maar gedateerd. De keuze hangt af van wat je al gebruikt. Wij bouwen de koppeling voor alle drie.

## Veelgestelde vragen

### Heeft Claude een directe koppeling met Yuki?

Nee. Claude heeft geen ingebouwde Yuki-integratie. De koppeling loopt via de Yuki API (SOAP/REST) of via exports in CSV/MT940-formaat. Claude verwerkt die data nadat je het ophaalt. Met een MCP server automatiseer je het ophalen, zodat Claude direct met actuele boekingsdata werkt zonder handmatige export.

### Mag ik klantgegevens uit Yuki aan Claude voeren?

Alleen als je pseudonimiseert. Financiële klantdata valt onder de AVG. Vervang klantnamen, rekeningnummers en identificerende gegevens voordat je ze in een prompt stopt. Voor rode data zoals BSN-nummers of loonstroken: gebruik een lokaal model via Ollama. Wij helpen bij het inrichten van die scheiding.

### Welke Yuki-workflows zijn geschikt voor Claude?

Drie categorieën leveren het meeste op. Ten eerste: categorisatie van bankafschriften die Yuki niet automatisch herkent. Ten tweede: het beantwoorden van klantvragen over hun administratie. Ten derde: periodieke rapportages zoals kwartaaloverzichten of btw-samenvattingen. Begin met de workflow die nu de meeste handmatige tijd kost.

### Werkt dit ook als ik Yuki gebruik via een accountant?

Ja. De aanpak is dezelfde, maar de accountant bepaalt welke data beschikbaar is. Veel kantoren exporteren periodiek uit Yuki voor hun klanten. Claude verwerkt die exports. Als je zelf API-toegang hebt via het Yuki Portaal, kun je de koppeling ook zelf opzetten. In de praktijk doen wij dat samen met het kantoor.

### Wat kost het om Claude aan Yuki te koppelen?

Claude Pro kost 20 dollar per gebruiker per maand. De implementatie van de Yuki-koppeling duurt 1 tot 3 weken, afhankelijk van het aantal workflows. Een eenvoudige categorisatie-workflow staat binnen een week. Een volledig geautomatiseerde rapportagepijplijn met API-koppeling duurt 2 tot 3 weken.
