---
title: "Claude koppelen aan Microsoft 365"
titleTag: "Claude koppelen aan Microsoft 365: de officiële connector"
metaDescription: "Zo zet je de Microsoft 365 connector van Claude aan: Entra-toestemming, wat Claude per app leest en schrijft, en wat er met je data gebeurt."
h1: "Claude koppelen aan Microsoft 365: de officiële connector voor Outlook, SharePoint en Teams"
targetKeywords:
  - claude koppelen aan microsoft 365
  - claude microsoft 365 connector
  - microsoft 365 connector
  - claude outlook koppelen
  - claude sharepoint
  - claude in copilot
wordCountTarget: 1499
priority: 2
tier: 3
cases:
  - copilot-studio-agent
  - sdr-sales-agent
internalLinks:
  - /compliance/dpia-stappenplan
  - /integraties
  - /prijs/pro-vs-team-vs-enterprise
  - /compliance/anthropic-dpa
  - /compliance/eu-hosting
  - /compliance/zero-data-retention
  - /compliance/is-claude-veilig
  - /vergelijken/claude-vs-copilot
  - /cases/copilot-studio-agent
  - /cases/sdr-sales-agent
  - /claude-in-30-dagen
schemaTypes:
  - Article
  - FAQPage
  - BreadcrumbList
author: camiel
competitors:
  - support.claude.com
  - learn.microsoft.com
  - marketplace.microsoft.com
status: published
publishDate: 2026-11-09
updatedDate: null
changelogLine: null
reviewedBy: null
reviewedDate: null
disclaimer: null
kortAntwoord: "Claude heeft een officiële Microsoft 365 connector van Anthropic. Die leest Outlook-mail, agenda, SharePoint, OneDrive en Teams, altijd met de rechten van de ingelogde gebruiker. Je hebt een werkaccount in een Microsoft Entra-tenant nodig en een Global Administrator geeft eenmalig toestemming. Schrijven, zoals mail versturen, zet de beheerder apart aan."
bronnen:
  - titel: "Claude Help Center, Set up the Microsoft 365 connector"
    url: "https://support.claude.com/en/articles/12542951-set-up-the-microsoft-365-connector"
    geraadpleegd: "2026-10-29"
  - titel: "Claude Help Center, Microsoft 365 connector security guide"
    url: "https://support.claude.com/en/articles/12684923-microsoft-365-connector-security-guide"
    geraadpleegd: "2026-10-22"
  - titel: "Microsoft Learn, Anthropic models in Microsoft Online Services (bijgewerkt 18 september 2026)"
    url: "https://learn.microsoft.com/en-us/microsoft-365/copilot/connect-to-ai-subprocessor"
    geraadpleegd: "2026-10-22"
  - titel: "Microsoft Learn, Copilot in Microsoft 365 apps with Anthropic models (bijgewerkt 3 september 2026)"
    url: "https://learn.microsoft.com/en-us/microsoft-365/copilot/copilot-anthropic-apps"
    geraadpleegd: "2026-10-22"
faq:
  - question: "Heeft Claude een officiële Microsoft 365 connector?"
    answer: "Ja. Anthropic levert zelf een Microsoft 365 connector voor Claude. Die werkt op Free, Pro, Max, Team en Enterprise. De connector leest Outlook-mail, agenda's, SharePoint, OneDrive en Teams. Een Global Administrator in Microsoft Entra geeft eenmalig toestemming voor de hele tenant. Je hoeft zelf geen app-registratie of eigen MCP server te bouwen."
  - question: "Werkt de connector met een persoonlijk Microsoft-account?"
    answer: "Nee. De connector vraagt een werkaccount in een Microsoft Entra-tenant die bij een zakelijk Microsoft-abonnement hoort. Accounts als outlook.com of hotmail.com kunnen niet verbinden. De gebruiker moet ook een actieve Microsoft 365-licentie hebben. Zonder die licentie lukt het inloggen via de connector niet."
  - question: "Kan Claude via de connector mail versturen?"
    answer: "Alleen als de beheerder de schrijfrechten aanzet. Standaard leest de connector alleen. Met schrijfrechten kan Claude mail versturen, concepten en afspraken beheren, bestanden in OneDrive en SharePoint maken en Teams-berichten sturen. Bijlagen worden niet ondersteund. Verstuurde mail krijgt een header die aangeeft dat een agent de mail verstuurde."
  - question: "Kan Claude alle mailboxen in mijn organisatie lezen?"
    answer: "Nee. De connector gebruikt delegated permissions. Claude werkt dus als de ingelogde gebruiker en ziet alleen wat die persoon in Microsoft 365 al mag zien. Dat geldt ook voor SharePoint: Claude zoekt in de hele tenant, maar alleen in sites waar de gebruiker zelf toegang toe heeft. Gedeelde mailboxen tellen mee als de gebruiker gedelegeerde toegang heeft."
  - question: "Is Claude in Microsoft Copilot hetzelfde als de connector?"
    answer: "Nee, het zijn twee routes. Met de connector werk je in Claude en haalt Claude data uit Microsoft 365. In Microsoft Copilot kies je een Claude-model binnen Microsofts eigen product, met Anthropic als subverwerker van Microsoft. In de EU staat die tweede route standaard uit en een beheerder moet hem zelf aanzetten."
softwareName: "Microsoft 365"
softwareUrl: "https://www.microsoft.com/nl-nl/microsoft-365"
---

Claude koppelen aan Microsoft 365 doe je met de officiële Microsoft 365 connector van Anthropic. Je hoeft geen eigen app-registratie of MCP server meer te bouwen. Een beheerder zet de connector aan, geeft in Microsoft Entra eenmalig toestemming, en daarna kunnen medewerkers Claude laten zoeken in hun mail, agenda, SharePoint, OneDrive en Teams. Hieronder lees je wat daarvoor nodig is, wat werkt per app en wat er met je data gebeurt. Meer koppelingen vind je op de pagina [integraties](/integraties).

## Welke abonnementen kunnen de Microsoft 365 connector gebruiken?

Volgens het Claude Help Center werkt de connector op alle abonnementen: Free, Pro, Max, Team en Enterprise. Aan de Microsoft-kant gelden twee eisen. Je hebt een werkaccount nodig in een Microsoft Entra-tenant die bij een zakelijk Microsoft-abonnement hoort. En de gebruiker moet een actieve Microsoft 365-licentie hebben. Persoonlijke accounts zoals outlook.com of hotmail.com kunnen niet verbinden.

Voor bedrijfsdata raden we een zakelijk Claude-abonnement aan. Alleen Team, Enterprise en de API vallen onder de verwerkersovereenkomst van Anthropic. Het verschil tussen de abonnementen lees je in [Pro, Team of Enterprise](/prijs/pro-vs-team-vs-enterprise), en wat de DPA dekt in [de Anthropic verwerkersovereenkomst](/compliance/anthropic-dpa).

## Hoe zet een beheerder de Microsoft 365 connector aan?

Er zijn twee rollen nodig. Een eigenaar van de Claude-organisatie zet de connector aan (alleen bij Team en Enterprise). Een Global Administrator in Microsoft Entra geeft eenmalig toestemming voor de hele tenant. Vaak is dat in een MKB-bedrijf dezelfde persoon.

1. Log in op Claude en ga naar **Organization settings** > **Connectors**.
2. Klik op **+ Add** en daarna op **All available**.
3. Zoek Microsoft 365 en klik op **Add to your team**.
4. Laat de Global Administrator in Claude naar **Customize** > **Connectors** gaan en bij Microsoft 365 op **Connect** klikken.
5. De Global Administrator logt in met het Microsoft-account en accepteert de rechten namens de hele organisatie.
6. Medewerkers gaan daarna zelf naar **Customize** > **Connectors** en loggen in. Zij krijgen geen toestemmingsvraag meer.

Heeft de Global Administrator geen Claude-account? Dan kan de toestemming ook handmatig in Microsoft Entra ID. Je maakt dan via Graph Explorer twee service principals aan (M365 MCP Client for Claude en M365 MCP Server for Claude) en geeft per app toestemming via de adminconsent-URL van je tenant. De exacte app-ID's staan in het Help Center-artikel bij de bronnen.

Wil je dat alleen bepaalde collega's de connector gebruiken, dan regel je dat in Entra:

1. Open op entra.microsoft.com de enterprise application **M365 MCP Server for Claude**.
2. Zet onder **Properties** de optie **Assignment required?** op **Yes**.
3. Voeg onder **Users and groups** de toegestane gebruikers of groepen toe.
4. Herhaal dit voor **M365 MCP Client for Claude**, met precies dezelfde mensen.

Je kunt ook losse Graph-rechten intrekken onder **Permissions** > **Admin consent**. Een tool die dat recht nodig heeft, geeft daarna de melding "Failed to call tool".

## Wat leest de Claude Microsoft 365 connector per app?

De connector werkt met delegated permissions. Claude handelt als de ingelogde gebruiker en kan alleen bij data die die gebruiker in Microsoft 365 al mag zien. Zonder extra instelling zijn alle rechten alleen-lezen.

Tabel: wat de Microsoft 365 connector per app kan, stand 22 oktober 2026.

| App | Lezen (standaard) | Schrijven (na aanzetten schrijfrechten) | Beperking |
|---|---|---|---|
| Outlook-mail | Eigen mailbox, de map Archief en gedeelde mailboxen met gedelegeerde toegang | Mail versturen, concepten beheren, mailboxinstellingen wijzigen | Geen Online Archive, geen bijlagen bij versturen |
| Agenda | Eigen afspraken en gedeelde agenda's | Afspraken maken en wijzigen | Deelnemers krijgen een uitnodiging of update van Microsoft 365 |
| SharePoint | Zoeken in de hele tenant, binnen de rechten van de gebruiker | Bestanden maken en bijwerken | Zoeken beperken tot één site kan niet |
| OneDrive | Eigen bestanden en bestanden waar de gebruiker bij kan | Bestanden maken en bijwerken | Verwijderde items gaan naar de prullenbak |
| Teams | Chats, kanaalberichten, vergaderingen, transcripties en opnames | Berichten sturen en beantwoorden, nieuwe chat starten | Teams-instellingen en rechten wijzigen kan niet |

Claude leest Word, Excel en PowerPoint (ook de oude .doc, .xls en .ppt), pdf en platte tekst zoals .txt, .md en .csv. OneNote-bestanden kan de connector niet lezen.

## Hoe zet je de schrijfrechten van de connector aan?

Lezen en zoeken werken direct. Voor schrijven zijn extra stappen nodig. Organisaties die de connector al gebruikten voordat de schrijfrechten er waren, hebben ze standaard geblokkeerd.

1. Laat de Global Administrator opnieuw toestemming geven als je tenant al toestemming gaf voordat de schrijfrechten bestonden.
2. Zet in Claude onder **Organization settings** > **Connectors** > **Microsoft 365** de rechten per tool.
3. Op Enterprise kun je schrijven beperken tot bepaalde gebruikers via custom roles.
4. Stel de Teams-tools apart in. Versturen, posten en antwoorden staan op **Ask** of **Blocked**, zodat de medewerker elk bericht bevestigt. Een nieuwe chat starten mag op **Allow**.
5. Test het door Claude een mail te laten opstellen zonder te versturen.

Houd rekening met een paar regels. Mail die Claude verstuurt, krijgt een header die aangeeft dat een agent hem verstuurde. Bestanden, afspraken en Teams-berichten krijgen dat label niet. Bijlagen worden niet ondersteund bij versturen, doorsturen en concepten. Er gelden limieten per gebruiker op het aantal acties en ontvangers.

## Wat gebeurt er met je data bij de koppeling?

Je documenten en mail blijven in je eigen Microsoft-tenant. De connector haalt data alleen op als een vraag erom vraagt en bewaart de inhoud van bestanden niet in een cache. Wat Claude ophaalt, staat wel in het gesprek als je dat gesprek bewaart. In een gedeeld gesprek zien anderen alleen het antwoord van Claude.

Elke Graph-aanroep van de connector komt in het Microsoft 365-auditlog van je organisatie, met tijd, gebruiker, actie en bron. Anthropic logt zelf het inloggen en de toolaanroepen. Toegang loopt af na 90 dagen zonder gebruik. Een medewerker kan de koppeling verbreken onder **Customize** > **Connectors**, en een eigenaar kan de connector voor de hele organisatie verwijderen.

Een punt voor je Conditional Access-beleid: na het inloggen doen de servers van Anthropic de verzoeken. Entra ziet die als afkomstig van het IP-bereik 160.79.104.0/21 van Anthropic. Een locatieregel die alleen je kantoornetwerk toelaat, blokkeert de connector dan voor iedereen. Het Help Center beschrijft hoe je dat bereik als named location toevoegt.

De security guide zegt niet in welke regio de data wordt verwerkt. Op het eigen platform van Anthropic slaat Anthropic data op in de Verenigde Staten, zie [Claude-data in de EU houden](/compliance/eu-hosting). Zet je gevoelige persoonsgegevens in Claude, kijk dan ook naar [zero data retention](/compliance/zero-data-retention) en naar [is Claude veilig voor bedrijfsdata](/compliance/is-claude-veilig). Verwerk je via de connector persoonsgegevens met een hoog risico, maak dan eerst een DPIA met het [DPIA-stappenplan voor Claude](/compliance/dpia-stappenplan).

## Kun je Claude ook in Microsoft Copilot gebruiken?

Ja, dat is een tweede route. Microsoft biedt Claude-modellen aan in zijn eigen producten, zoals Microsoft Copilot, Researcher, Copilot Studio, Power Platform en Copilot in de Microsoft 365-apps. Microsoft noemt Microsoft 365 Copilot inmiddels Microsoft Copilot. Anthropic werkt hier als subverwerker van Microsoft en de Product Terms en de Data Protection Addendum van Microsoft gelden.

Voor Nederlandse bedrijven is dit belangrijk. Claude-modellen in deze producten vallen buiten de EU Data Boundary van Microsoft. Daarom staan ze in de EU, de EVA-landen en het Verenigd Koninkrijk standaard uit. Een beheerder met de rol AI Administrator of Global Administrator zet ze zo aan:

1. Ga in het Microsoft 365-beheercentrum naar **Copilot** > **Settings** > **View all**.
2. Kies **AI providers operating as Microsoft subprocessors**.
3. Selecteer onder **Available subprocessors for your organization** de optie **Anthropic** en klik op **Save**.
4. Kies welke gebruikers of groepen de modellen mogen gebruiken en klik op **Save**.

Voor Copilot in Word, Excel en PowerPoint bestaat in de EU een aparte instelling. Die staat standaard aan bij tenants die na 25 maart 2026 zijn aangemaakt. Bij oudere tenants staat de standaard in het Message Center, dus controleer het zelf. Sommige nieuwe modellen, zoals Fable 5.0, vallen onder "Anthropic models with Data Retention". Die vragen een aparte opt-in en dan gelden de voorwaarden en de DPA van Anthropic, met bewaring tot 30 dagen.

Wanneer je welke route kiest, lees je in [Claude of Copilot](/vergelijken/claude-vs-copilot).

## Wat is onze ervaring met Claude en Microsoft 365?

Met de officiële connector hebben we nog geen eigen klantcase. Wel bouwden we eerder koppelingen via de Microsoft Graph API, voordat deze connector er was. Voor de [rapportage-agent](/cases/copilot-studio-agent) bouwden we in 3 weken een agent achter de bedrijfslogin van de klant, via Azure AD en de OAuth on-behalf-of flow. Een rapport ging van 45 minuten handwerk naar 2 minuten, en elke klant ziet alleen de eigen data. Bij de [sales-agent](/cases/sdr-sales-agent) gaan goedgekeurde mails via de Graph API vanuit het eigen mailaccount van de salesmedewerker.

Dat delegated-model gebruikt de connector nu ook. Voor lezen en zoeken in mail, agenda en documenten is de connector daarom de eerste keuze. Een eigen Graph-koppeling blijft zinvol als je bijlagen moet versturen, op één SharePoint-site wilt zoeken of een vast proces zonder chat wilt draaien. Wil je hulp bij het inrichten, dan zit dat in [Claude in 30 dagen](/claude-in-30-dagen).
