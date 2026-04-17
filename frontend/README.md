# ASV Loxstedt — Frontend

React + TypeScript Frontend (Vite). Inhalte stammen aus Directus (Headless CMS). Ziel: datengetriebene Seiten, Navigation und News ohne manuelle Frontend-Registrierung.

## Schnellstart (lokal)

1. Directus starten:

```powershell
cd ..\cms
docker compose up -d
```

2. Frontend:

```powershell
cd frontend
Copy-Item .env.example .env.local
npm install
npm run dev
```

(Bash):

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Standardmäßig erwartet das Frontend Directus unter `http://localhost:8055`.

## Environment (siehe frontend/.env.example)

- `VITE_API_BASE_URL` (default `http://localhost:8055`)
- `VITE_DIRECTUS_ASSETS_PATH` (default `/assets`)
- `VITE_HOME_SLUG` (default `home`)
- `VITE_DIRECTUS_TOKEN` (optional — nur read-only Token; niemals in Git einchecken)

## Scripts (frontend/package.json)

- `npm run dev` — Dev-Server (Vite + HMR)
- `npm run build` — `tsc -b && vite build` (Produktions-Build)
- `npm run preview` — `vite preview`
- `npm run lint` — ESLint

## Architektur & wichtige Orte

- `src/api/directus.ts` — zentrale Fetch- und Fehlerlogik (`CmsApiError`)
- `src/api/cms.ts` — API-Funktionen / Endpunkte (z. B. `/items/global_settings`, `/items/navigation`, `/items/pages`, `/items/news`)
- `src/components/ui/RichText.tsx` — HTML-Sanitizing (DOMPurify)
- `src/utils/assets.ts` — Asset-URL-Erzeugung und Bildparameter

## Routing

- `/` → Startseite (lädt CMS-Seite mit Slug `home`)
- `/news` → News-Übersicht
- `/news/:slug` → News-Detail
- `/:slug` → generische CMS-Seite
- `*` → 404

(Quellcode: `frontend/src/routes/AppRouter.tsx`)

## API & Collections

Wichtige Directus-Endpunkte und Collections, die das Frontend nutzt:

- `GET /items/global_settings` — Singleton mit `site_name`, `logo`, `footer_text`
- `GET /items/navigation` — Navigationseinträge
- `GET /items/pages` — CMS-Seiten (By-Slug)
- `GET /items/news` — News-Liste / News-By-Slug

Erwartete Collections:

- `global_settings`, `navigation`, `pages`, `news`, `downloads`, `categories`, `persons`, `roles`

## Sicherheit

- Falls `VITE_DIRECTUS_TOKEN` verwendet wird: nur read-only Token und `.env.local` nicht commiten.

## Anpassungspunkte

- `src/config/env.ts` — Default-URLs / Asset-Pfad
- `src/features/navigation/navigation.utils.ts` — Navigation-Tree-Logik
- `src/features/cms-pages/CmsPageView.tsx` — generische Seitendarstellung

Bei Bedarf kann ich ein kurzes Beispiele-Setup (curl / fetch) liefern, um die wichtigsten Endpunkte schnell zu testen.
