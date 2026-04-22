# Frontend — ASV Loxstedt

<p align="center">
	<img alt="frontend tech" src="https://img.shields.io/badge/tech-React%20%2B%20TypeScript-blue?logo=react&style=flat-square" />
	<img alt="vite" src="https://img.shields.io/badge/bundler-Vite-646cff?style=flat-square&logo=vite" />
	<img alt="directus" src="https://img.shields.io/badge/cms-Directus-ff69b4?style=flat-square&logo=directus" />
</p>

React + TypeScript (Vite) Frontend, das Inhalte aus Directus rendert: Seiten, Navigation, News.

## Schnellstart (lokal)

1. Directus starten (aus Projekt-Root):

```powershell
cd cms
docker compose up -d
```

2. Frontend starten:

```powershell
cd frontend
Copy-Item .env.example .env.local   # PowerShell
npm install
npm run dev
```

oder (Bash):

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Standardmäßig erwartet das Frontend Directus unter `http://localhost:8055`.

## Wichtige Umgebungsvariablen

- `VITE_API_BASE_URL` (default `http://localhost:8055`)
- `VITE_DIRECTUS_ASSETS_PATH` (default `/assets`)
- `VITE_HOME_SLUG` (default `home`)
- `VITE_DIRECTUS_TOKEN` (optional — read-only Token)

Siehe [frontend/.env.example](frontend/.env.example) für Details.

## Scripts

- `npm run dev` — Dev-Server (Vite)
- `npm run build` — Produktions-Build
- `npm run preview` — `vite preview`
- `npm run lint` — ESLint

## Wichtige Dateien

- `frontend/src/api/directus.ts` — zentrale Fetch-/Fehlerlogik
- `frontend/src/api/cms.ts` — CMS-API-Funktionen
- `frontend/src/routes/AppRouter.tsx` — Routing
- `frontend/src/components/ui/RichText.tsx` — sichere RichText-Ausgabe

## Erwartete Directus-Collections

- `global_settings`, `navigation`, `pages`, `news`, `downloads`, `categories`, `persons`, `roles`

## Hinweise

- Nutze `VITE_DIRECTUS_TOKEN` nur für read-only Zugriffe und nie ins VCS einchecken.
- Falls du Inhalte testen willst: `cms/database/snapshot.json` oder Directus Import/Export verwenden.

Bei Bedarf passe ich die README weiter an (Screenshots, Deploy-Anleitung, CI).
