# ASV Loxstedt Frontend

CMS-getriebenes React-Frontend auf Basis von Vite, React, TypeScript, React Router und TanStack Query. Inhalte kommen aus Directus und werden datengetrieben gerendert, damit neue Seiten, Navigationseintraege und News ohne manuelle React-Registrierung verfuegbar werden.

## Lokaler Start

1. Directus starten:

```powershell
cd ..\cms
docker compose up -d
```

2. Frontend konfigurieren:

```powershell
cd ..\frontend
Copy-Item .env.example .env.local
```

3. Frontend starten:

```powershell
npm install
npm run dev
```

Standardmaessig erwartet das Frontend Directus unter `http://localhost:8055`.

## Wichtige Architekturpunkte

- `src/api`: schlanke Directus-API-Abstraktion mit einheitlicher Fetch-Strategie.
- `src/features/cms-pages`: generische CMS-Seiten und Page-Queries.
- `src/features/news`: News-Queries, Karten und Detaildarstellung.
- `src/features/navigation`: Navigation-Queries und Baumaufbau aus CMS-Daten.
- `src/components/layout`: App-Layout mit Header und Footer auf Basis von `global_settings`.
- `src/components/ui`: wiederverwendbare Loading-, Error-, Empty- und Rich-Text-Komponenten.
- `src/utils/assets.ts`: zentrale Erzeugung von Directus-Asset-URLs.

## Routing

- `/` versucht zuerst die oeffentlich freigegebene CMS-Seite mit dem Slug `home` zu laden.
- `/news` zeigt die oeffentlich freigegebene News-Uebersicht.
- `/news/:slug` zeigt einen oeffentlich freigegebenen News-Detaildatensatz.
- `/:slug` rendert eine generische oeffentlich freigegebene CMS-Seite.
- `*` zeigt eine 404-Seite.

## Anpassungspunkte spaeter

- `src/config/env.ts`: Basis-URL, Asset-Pfad und Home-Slug.
- `src/api/cms.ts`: Feldselektion, neue Collections, weitere Directus-Endpunkte.
- `src/components/ui/RichText.tsx`: zentrale Stelle fuer HTML-Sanitizing.
- `src/features/navigation/navigation.utils.ts`: Logik fuer Navigationstree und spaetere Sonderregeln.
- `src/features/cms-pages/CmsPageView.tsx`: generische Seitendarstellung fuer weitere Layout-Anpassungen.

## Hinweise zu Rich Text und Sicherheit

HTML aus `pages.content`, `news.text` und `global_settings.footer_text` wird ausschliesslich ueber `src/components/ui/RichText.tsx` gerendert. Dort laeuft das Sanitizing zentral ueber DOMPurify. Wenn spaeter strengere Regeln oder Allow-Lists noetig sind, muss nur diese eine Komponente angepasst werden.

## Hinweise zu Directus-Permissions

Das Frontend fragt bei `pages` und `news` kein `status`-Feld ab und filtert auch nicht clientseitig auf `published`. In der aktuellen Directus-Konfiguration prueft die Public-Role die Freigabe serverseitig, bevor Datensaetze ausgeliefert werden. Das Frontend geht deshalb davon aus, dass oeffentliche Endpunkte bereits nur die sichtbaren Inhalte zurueckgeben.

## Erwartete Directus-Collections

- `global_settings` als Singleton
- `navigation`
- `pages`
- `news`
- `downloads`
- `categories`
- `persons`
- `roles`

Bei der Navigation beruecksichtigt das Frontend auch die im Snapshot auffaellige Schreibweise `parrent`, damit Parent-/Child-Strukturen robust geladen werden.
