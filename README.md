# ASV Loxstedt — Website

<p align="center">
	<img alt="ASV Loxstedt" src="https://img.shields.io/badge/ASV%20Loxstedt-Website-2b90d9?style=flat-square" />
	<img alt="status" src="https://img.shields.io/badge/status-active-brightgreen?style=flat-square" />
	<img alt="tech" src="https://img.shields.io/badge/tech-React%20%2B%20TypeScript-blue?logo=react&style=flat-square" />
	<img alt="cms" src="https://img.shields.io/badge/cms-Directus-ff69b4?style=flat-square&logo=directus" />
	<img alt="license" src="https://img.shields.io/badge/license-GPLv3-blue?style=flat-square" />
</p>

Aktualisierte, kompakte Anleitung für Entwickler und Redakteure.

Kurz: Headless CMS (Directus) im Ordner `cms/` und React + TypeScript Frontend in `frontend/`.

## Schnellstart (lokal)

1. Directus starten (im Ordner `cms`):

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

Standard-Lokale URLs:

- Directus Admin: http://localhost:8055
- Frontend Dev (Vite): http://localhost:5173

---

<p align="center">
	<img alt="Frontend preview" src="cms/uploads/f2fae195-b718-4a24-80bd-4bfb5530839c__e9dcbd6d37cf1a1351d2786febd96ceaf3ef6132.avif" width="840" style="border-radius:8px" />
</p>

## Wichtige Environment-Variablen (Frontend)

- `VITE_API_BASE_URL` — Basis-URL zur Directus-API (z. B. `http://localhost:8055`)
- `VITE_DIRECTUS_ASSETS_PATH` — Pfad für Assets (Standard: `/assets`)
- `VITE_HOME_SLUG` — Startseiten-Slug (Standard: `home`)
- `VITE_DIRECTUS_TOKEN` — Optional: read-only Token (niemals in Git einchecken)

Die Beispieldatei: [frontend/.env.example](frontend/.env.example)

## Snapshot & Restore

- Snapshot-Datei: `cms/database/snapshot.json`
- Restore-Skripte: `cms/restore_snapshot.ps1`, `cms/restore_snapshot.sh`

Import/Export ist auch über die Directus-Admin-Oberfläche möglich.

## Erwartete Directus-Collections

- `global_settings` (Singleton)
- `navigation`
- `pages`
- `news`
- `downloads`
- `categories`
- `persons`
- `roles`

## Frontend: wichtige Orte & Befehle

- API-Wrapper: `frontend/src/api/directus.ts`
- CMS-Endpunkte: `frontend/src/api/cms.ts`
- Routing: [frontend/src/routes/AppRouter.tsx](frontend/src/routes/AppRouter.tsx)
- RichText-Komponente: `frontend/src/components/ui/RichText.tsx`

Scripts (im Ordner `frontend`):

- `npm run dev` — Dev-Server (Vite)
- `npm run build` — Produktions-Build
- `npm run preview` — `vite preview`
- `npm run lint` — ESLint

## Produktion

- Directus: betreiben mit PostgreSQL + persistentem Objektspeicher (z. B. S3)
- Frontend: Static Hosting nach `npm run build`

## Mitwirken

- PRs und Issues willkommen — Bereich (`frontend/` oder `cms/`) im PR-Titel angeben.

---

Lizenz: GPL-3.0
Status: aktive Entwicklung
