---
title: "Claude offerte maken"
titleTag: "Claude offerte maken: zo schrijf je een offerte met AI"
metaDescription: "Claude offerte maken: de stappen, een voorbeeldprompt, wat Claude wel en niet doet, de HubSpot-koppeling, prijzen en klantdata. Stand: 29 oktober 2026."
h1: "Claude offerte maken: van aanvraag naar conceptofferte"
targetKeywords:
  - claude offerte maken
  - offerte maken met claude
  - offerte met claude
  - claude offerte schrijven
  - ai offerte schrijven
wordCountTarget: 1438
priority: 1
tier: 2
cases:
  - sdr-sales-agent
internalLinks:
  - /use-cases/meeting-notulen
  - /use-cases
  - /cases/sdr-sales-agent
  - /integraties/hubspot
  - /claude-voor-it-consultancy
  - /claude-voor-installatiebedrijven
  - /prijs/pro-vs-team-vs-enterprise
  - /compliance/anthropic-dpa
  - /claude-implementatie
schemaTypes:
  - Article
  - FAQPage
  - BreadcrumbList
author: camiel
competitors: []
status: published
publishDate: 2026-12-28
updatedDate: null
changelogLine: null
reviewedBy: null
reviewedDate: null
disclaimer: null
kortAntwoord: "Een offerte maken met Claude doe je in een project met twee of drie eerdere offertes en je algemene voorwaarden. Je geeft de aanvraag van de klant en je eigen notities mee, Claude schrijft de tekst en maakt er een Word- of pdf-bestand van. De bedragen neem je zelf over uit je calculatie. Claude Pro kost 20 dollar per maand."
bronnen:
  - titel: "Ondernemersplein (KVK), Stappenplan offerte maken (gecontroleerd 18 augustus 2026)"
    url: "https://ondernemersplein.overheid.nl/stappenplan-offerte-maken/"
    geraadpleegd: "2026-10-29"
  - titel: "Claude Help Center, Create and edit files with Claude"
    url: "https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude"
    geraadpleegd: "2026-10-29"
  - titel: "Claude Help Center, What are projects?"
    url: "https://support.claude.com/en/articles/9517075-what-are-projects"
    geraadpleegd: "2026-10-29"
  - titel: "HubSpot Knowledge Base, Set up and use the HubSpot connector for Claude (bijgewerkt 19 oktober 2026)"
    url: "https://knowledge.hubspot.com/integrations/set-up-and-use-the-hubspot-connector-for-claude"
    geraadpleegd: "2026-10-29"
  - titel: "Claude, plans en prijzen (claude.com)"
    url: "https://claude.com/pricing"
    geraadpleegd: "2026-10-29"
  - titel: "ECB-referentiekoers euro/dollar, 28 oktober 2026: 1,1133 (ecb.europa.eu)"
    url: "https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/eurofxref-graph-usd.en.html"
    geraadpleegd: "2026-10-29"
  - titel: "Anthropic Privacy Center, wordt zakelijke data gebruikt voor modeltraining? (18 augustus 2026)"
    url: "https://privacy.claude.com/en/articles/7996868-is-my-data-used-for-model-training"
    geraadpleegd: "2026-10-29"
  - titel: "Anthropic Privacy Center, wordt mijn data gebruikt voor modeltraining? Free, Pro en Max (16 maart 2026)"
    url: "https://privacy.claude.com/en/articles/10023580-is-my-data-used-for-model-training"
    geraadpleegd: "2026-10-29"
faq:
  - question: "Kan Claude een offerte maken als Word- of pdf-bestand?"
    answer: "Ja. Claude kan Word-, pdf-, Excel- en PowerPoint-bestanden maken, op elk plan, ook het gratis plan. Je vraagt in het gesprek om een .docx of een pdf en downloadt het bestand. Een bestand mag maximaal 30 MB zijn. Controleer logo, lettertype en opmaak zelf voordat je de offerte verstuurt."
  - question: "Kan ik Claude de prijs van een offerte laten uitrekenen?"
    answer: "Dat raden we af. Claude kan een getal verkeerd overnemen of een optelling missen, en een offerte is na ondertekening een bindende afspraak. Maak de prijs in je calculatie of boekhoudpakket en zet de bedragen er zelf in. Laat Claude wel controleren of elk onderdeel van de scope een regel in de prijs heeft."
  - question: "Kan Claude een offerte direct in HubSpot zetten?"
    answer: "Ja, met de officiële HubSpot connector. Volgens HubSpot kan Claude offertes en offertesjablonen lezen, maken en bijwerken, al staat dat op 29 oktober 2026 nog in bèta. Producten en regelitems kan Claude ook maken en bijwerken. Verwijderen kan niet. Zet de schrijftools op Needs Approval, dan keur je elke wijziging eerst goed."
  - question: "Welk Claude-plan heb ik nodig om offertes te maken?"
    answer: "Projecten en het maken van bestanden zitten in elk plan. Zet je klantgegevens of prijsafspraken in Claude, kies dan Claude Team: 25 dollar per gebruiker per maand, ongeveer 22 euro exclusief btw tegen de ECB-koers van 28 oktober 2026. Op de zakelijke plannen traint Anthropic standaard niet op je data."
---

<!--
  Feiten gecontroleerd 29-10-2026, bronnen in de frontmatter. ECB 28-10-2026: 1 EUR = 1,1133 USD.
  Er is geen offerte-case. Ervaring alleen uit sdr-sales-agent (review-scherm, schrijfregels 10 naar 23,
  open rate 8% naar 34%). De oude draft-cijfers (10 offertes per week, 75 naar 20 minuten, 80%
  productie-klaar, voorbeeldbedragen) waren niet onderbouwd en zijn weg.
-->

Een offerte maken met Claude gaat over het schrijfwerk rond je prijs. Je hebt een aanvraag binnen, een gesprek gevoerd en een calculatie gemaakt. Daarna moet er nog een stuk tekst komen dat de vraag van de klant samenvat, je aanpak uitlegt en de voorwaarden noemt. Dat deel kost vaak meer tijd dan nodig, en daar helpt Claude bij. De prijs, de scope en de handtekening blijven bij jou.

Op deze pagina lees je hoe je dat inricht, met een voorbeeldprompt, de koppeling met HubSpot, wat het kost en wat er met klantgegevens mag. De bronnen staan onderaan de pagina, met de datum waarop we ze lazen. Andere taken die je met Claude sneller doet, vind je in het overzicht [use cases](/use-cases).

## Wat staat er in een offerte en wat schrijft Claude daarvan?

Ondernemersplein, de site van KVK en de overheid, noemt de onderdelen van een offerte. Een deel daarvan is vaste tekst die Claude kan schrijven. Een ander deel zijn gegevens en afspraken die alleen jij kunt invullen.

Tabel: onderdelen van een offerte volgens Ondernemersplein en wie ze maakt, stand 29 oktober 2026.

| Onderdeel | Wat Claude doet | Wat jij doet |
|---|---|---|
| Bedrijfsgegevens en gegevens van de klant | Zet ze op de vaste plek in je sjabloon | Levert de juiste gegevens aan en controleert ze |
| Datum en offertenummer | Niets, dit komt uit je eigen administratie | Vult ze in |
| Samenvatting van de werkzaamheden | Schrijft de aanleiding, aanpak en planning uit je notities | Bepaalt de scope en leest na |
| Tarief of projectprijs | Zet de bedragen in de tabel die jij aanlevert | Maakt de prijs in je calculatie |
| Geldigheidsduur en aanbetaling | Neemt je vaste afspraken over | Kiest de termijn per klant |
| Verwijzing naar de algemene voorwaarden | Zet de vaste zin erin | Stuurt de voorwaarden mee |

Die verdeling is belangrijk. Volgens Ondernemersplein is een offerte een voorstel aan je klant en nog geen opdracht. Accepteert de klant de offerte en stuurt hij hem ondertekend terug, dan is het juridisch een bindend contract. Een fout bedrag of een vergeten voorwaarde in een concept van Claude wordt dan jouw afspraak.

## Hoe maak je een offerte met Claude?

Je richt het één keer in en gebruikt het daarna bij elke aanvraag. Een project in Claude is een werkruimte met eigen instructies en documenten. Projecten zitten in elk plan. Op het gratis plan maak je er maximaal vijf.

1. Maak een project "Offertes" en zet er twee of drie goede offertes in die je eerder verstuurde, plus je algemene voorwaarden.
2. Schrijf in de projectinstructies de vaste opbouw, je toon en wat Claude niet mag doen, zoals bedragen bedenken.
3. Plak bij een nieuwe aanvraag de vraag van de klant en je eigen notities uit het gesprek in een nieuw gesprek binnen het project.
4. Geef de bedragen uit je calculatie mee als losse tabel en laat Claude ze ongewijzigd overnemen.
5. Vraag Claude om een conceptofferte als Word-bestand of pdf. Claude maakt Word-, pdf-, Excel- en PowerPoint-bestanden, tot 30 MB per bestand.
6. Lees het concept na, vul datum en offertenummer in en verstuur de offerte zelf.

Het maken van bestanden staat standaard aan. Bij Claude Team en Enterprise kan de eigenaar van de organisatie het uitzetten onder **Organization settings** > **Capabilities**.

## Welke prompt gebruik je voor een offerte?

Een goede prompt geeft Claude de context en de grenzen. Dit is een voorbeeld dat je in je project kunt gebruiken:

> Schrijf een conceptofferte voor de aanvraag hieronder. Volg de opbouw en de toon van de offertes in dit project. Gebruik alleen de bedragen uit de tabel die ik meegeef en verander ze niet. Zet bij elk onderdeel van de scope de bijbehorende regel uit de tabel. Noem een geldigheid van 30 dagen en verwijs naar onze algemene voorwaarden. Ontbreekt er informatie, zet dan [NAVRAGEN] in de tekst en verzin niets. Lever het concept als Word-bestand.

De markering voor ontbrekende informatie helpt bij het nalezen. Je ziet in één keer waar je nog iets moet vragen of invullen. De geldigheid van 30 dagen is een voorbeeld: kies zelf de termijn die bij je werk past.

Laat Claude na het schrijven ook een controle doen. Vraag bijvoorbeeld of elk onderdeel uit de aanvraag van de klant in de offerte terugkomt, en of de scope en de prijstabel op elkaar aansluiten. Je eigen controle blijft nodig, maar zo vind je sneller een gemist punt.

## Kan Claude een offerte in HubSpot maken?

Werk je met HubSpot, dan kan Claude via de officiële HubSpot connector ook in je CRM werken. Volgens de HubSpot Knowledge Base, bijgewerkt op 19 oktober 2026, kan Claude offertes en offertesjablonen lezen, maken en bijwerken. Die functie staat nog in bèta. Producten en regelitems kan Claude ook maken en bijwerken, zonder bèta-label.

Er gelden een paar grenzen. Claude maakt of wijzigt maximaal 10 records per keer en kan niets verwijderen. De API-limieten van je HubSpot-account gelden ook voor Claude. Zet de schrijftools op **Needs Approval**, dan toont Claude een wijziging eerst en keur je die zelf goed. Hoe je de connector aanzet en wat Claude verder ziet, lees je in [Claude koppelen aan HubSpot](/integraties/hubspot).

Werk je niet met HubSpot, dan blijft de route via het project en een Word-bestand het eenvoudigst. Je plakt de tekst daarna in je eigen offertesoftware of boekhoudpakket.

## Wat kost een offerte maken met Claude?

Claude rekent in dollars. De euro-bedragen zijn omgerekend met de ECB-koers van 28 oktober 2026 (1 euro is 1,1133 dollar) en zijn exclusief btw.

Tabel: Claude-plannen voor offertewerk, lijstprijzen, stand 29 oktober 2026.

| Plan | Per maand, maandbetaling | Per maand, jaarbetaling | Geschikt voor |
|---|---|---|---|
| Free | $0 | $0 | Uitproberen zonder klantgegevens, maximaal 5 projecten |
| Pro | $20 (± €18) | $17 (± €15) | Eén persoon |
| Team, standaard seat | $25 per gebruiker (± €22) | $20 per gebruiker (± €18) | Teams van 2 tot 150 mensen, projecten delen |
| Enterprise | n.v.t. | $20 per seat (± €18), minimaal 20 seats, plus verbruik tegen API-tarieven | Grotere organisaties |

Wil je offertes met collega's maken uit hetzelfde project, dan heb je Team nodig. Alleen in Team en Enterprise kun je projecten delen. Het verschil tussen de plannen staat in [Claude Pro, Team of Enterprise](/prijs/pro-vs-team-vs-enterprise).

## Mag je klantgegevens in Claude zetten voor een offerte?

Een offerte bevat namen, adressen en prijsafspraken van je klant. Op de zakelijke plannen (Team, Enterprise en de API) gebruikt Anthropic je invoer en uitvoer standaard niet voor training. Op Free, Pro en Max hangt dat af van een instelling van de gebruiker.

Claude heeft voor de tekst van een offerte de naam en het adres van je contactpersoon niet nodig. Schrijf "de klant" en vul de gegevens in je eigen sjabloon in. Wat de verwerkersovereenkomst van Anthropic regelt, lees je in [de Anthropic verwerkersovereenkomst](/compliance/anthropic-dpa).

## Wat leert eigen werk ons over offertes met Claude?

Een systeem dat offertes schrijft, hebben we nog niet gebouwd. Er staat op deze site dus geen offerte-case. Wel bouwden we met Claude Code een [sales-agent](/cases/sdr-sales-agent) bij een Nederlands softwarebedrijf, met hetzelfde patroon: Claude schrijft het concept, een mens beslist.

Daar maakt het systeem elke ochtend 25 persoonlijke sales-e-mails klaar. Het salesteam keurt elke e-mail goed, past hem aan, stelt hem uit of wijst hem af met een reden. Uit die feedback groeiden de schrijfregels in vier weken van tien naar 23. De open rate steeg van 8% naar 34%. Er gaat niets de deur uit zonder dat een mens het heeft gelezen.

Voor offertes is de les dezelfde. Leg vast wat je bij het nalezen steeds verandert en zet dat als regel in je projectinstructies. Zo wordt het volgende concept beter, en de controle blijft bij jou.

## Waar begin je met offertes in Claude?

Kies een type offerte dat vaak terugkomt en weinig variatie heeft. Maak er een project voor met je beste voorbeelden en werk er een maand mee. Houd zelf bij hoeveel tijd een offerte kost, voor en na. Dan weet je wat het jouw bedrijf oplevert, met je eigen aantallen.

Begint een offerte bij een klantgesprek, maak dan eerst [notulen van dat gesprek met Claude](/use-cases/meeting-notulen) en gebruik die als invoer. Hoe een IT-bureau voorstellen schrijft, lees je in [Claude voor IT-consultancy](/claude-voor-it-consultancy). Voor offertes rond een calculatie van materiaal en uren staat een uitwerking in [Claude voor installatiebedrijven](/claude-voor-installatiebedrijven). Wil je hulp bij het inrichten van projecten, sjablonen of de HubSpot-koppeling, kijk dan op onze [implementatiepagina](/claude-implementatie).
