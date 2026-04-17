<!-- Banner & Badges -->
<p align="center">
	<img alt="ASV Loxstedt" src="https://img.shields.io/badge/ASV%20Loxstedt-Website-2b90d9?style=flat-square" />
	<img alt="status" src="https://img.shields.io/badge/status-active-brightgreen?style=flat-square" />
	<img alt="license" src="https://img.shields.io/badge/license-GPLv3-blue?style=flat-square" />
	<img alt="tech" src="https://img.shields.io/badge/tech-React%20%2B%20TypeScript-blue?logo=react&style=flat-square" />
	<img alt="cms" src="https://img.shields.io/badge/cms-Directus-ff69b4?style=flat-square&logo=directus" />
</p>

# asv-loxstedt

Kompakte, wartbare Codebasis für die Website des ASV Loxstedt — Headless-CMS (Directus) plus modernes React + TypeScript Frontend (Vite).

Kurzübersicht

- Directus (CMS): `cms/`
- Frontend (Vite + React + TypeScript): `frontend/`
- Snapshot: `cms/database/snapshot.json` (Directus v11.14.1)

Live-URLs (lokal)

- Directus Admin: http://localhost:8055
- Frontend Dev: http://localhost:5173

Inhalt dieser Datei

- Über das Projekt
- Lokales Setup
- Wichtige Environment-Variablen
- Genutzte Directus-Collections
- Frontend-Scripts & Routing
- Snapshot & Wiederherstellung
- Produktion & Hinweise

## Kurz: Was dieses Repo macht

Dieses Repository trennt Content-Management (Directus) und Präsentation (Frontend). Redakteure pflegen Inhalte in Directus; das Frontend liest die Daten zur Laufzeit und rendert Seiten, Navigation und News dynamisch.

## Schnellstart (lokal)

1. Directus starten:

```powershell
cd cms
docker compose up -d
```

2. Frontend vorbereiten und starten:

```powershell
cd frontend
Copy-Item .env.example .env.local
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

## Wichtige Environment-Variablen (Frontend)

- `VITE_API_BASE_URL` — Basis-URL zur Directus-API (Default: `http://localhost:8055`)
- `VITE_DIRECTUS_ASSETS_PATH` — Pfad für Assets (Default: `/assets`)
- `VITE_HOME_SLUG` — Startseiten-Slug (Default: `home`)
- `VITE_DIRECTUS_TOKEN` — Optional: read-only Token (NICHT ins VCS)

Siehe `frontend/.env.example` und `frontend/src/config/env.ts` für Details.

## Genutzte Directus-Collections (vom Frontend erwartet)

- `global_settings` (Singleton)
- `navigation`
- `pages`
- `news`
- `downloads`
- `categories`
- `persons`
- `roles`

## Frontend-Scripts (im Ordner `frontend`)

- `npm run dev` — Dev-Server (Vite + HMR)
- `npm run build` — `tsc -b && vite build` (Erzeugt Produktions-Build)
- `npm run preview` — `vite preview` (lokale Vorschau)
- `npm run lint` — ESLint

## Routing (Frontend)

- `/` → Startseite (lädt CMS-Seite mit Slug `home`)
- `/news` → News-Übersicht
- `/news/:slug` → News-Detail
- `/:slug` → generische CMS-Seiten
- `*` → 404

(Quellcode: `frontend/src/routes/AppRouter.tsx`)

## Snapshot & Wiederherstellung

- Snapshot: `cms/database/snapshot.json` (erstellt mit Directus v11.14.1)
- Import (empfohlen): Directus Admin UI → Einstellungen → Import/Export → Snapshot importieren
- Restore-Skripte: `cms/restore_snapshot.ps1`, `cms/restore_snapshot.sh`

Clean Start (sqlite, lokal):

```powershell
cd cms
docker compose down
Move-Item cms\database\data.db cms\database\data.db.bak
docker compose up -d
# Danach Snapshot via Admin UI importieren
```

## Produktion

- Directus: Produktionsbereit mit PostgreSQL + persistentem Objektspeicher (z. B. S3)
- Frontend: `npm run build` liefert statische Dateien für Hosting (Netlify, Vercel, S3+CloudFront etc.)

## Hinweise für Developer

- API-Abstraktion: `frontend/src/api/directus.ts` — zentrale Fetch-Logik und Fehlerbehandlung (`CmsApiError`)
- RichText-Sanitizing: `frontend/src/components/ui/RichText.tsx` verwendet DOMPurify
- Navigation-Baum: `frontend/src/features/navigation/navigation.utils.ts`

## Mitwirken

- PRs und Issues willkommen. Bitte Bereiche (`frontend/`, `cms/`) im PR-Titel nennen.

## Lizenz

GPL-3.0

---

Status: aktive Entwicklung
