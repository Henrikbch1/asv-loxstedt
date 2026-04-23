# ASV Loxstedt — Website

<p align="center">
	<img alt="ASV Loxstedt" src="https://img.shields.io/badge/ASV%20Loxstedt-Website-2b90d9?style=flat-square" />
	<img alt="status" src="https://img.shields.io/badge/status-active-brightgreen?style=flat-square" />
	<img alt="tech" src="https://img.shields.io/badge/tech-React%20%2B%20TypeScript-blue?logo=react&style=flat-square" />
	<img alt="cms" src="https://img.shields.io/badge/cms-Directus-ff69b4?style=flat-square&logo=directus" />
</p>

Kurzanleitung für Entwickler und Redakteure (Deutsch).

Repository-Aufbau (wichtig):

- `cms/` — Directus-Konfiguration und Docker Compose
- `frontend/` — React + TypeScript Frontend (Vite)

## Lokale Entwicklung (Schnellstart)

1. Directus starten (im Ordner `cms`):

```powershell
cd cms
docker compose up -d
```

2. Frontend vorbereiten und starten:

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

Standard-URLs:

- Directus Admin: http://localhost:8055
- Frontend Dev (Vite): http://localhost:5173

## Wichtige Dateien

- Snapshot: `cms/database/snapshot.json`
- Restore-Skripte: `cms/restore_snapshot.ps1`, `cms/restore_snapshot.sh`
- Frontend-Env-Beispiel: [frontend/.env.example](frontend/.env.example)

## Frontend - Environment-Variablen

- `VITE_API_BASE_URL` — Basis-URL zur Directus-API (z. B. `http://localhost:8055`)
- `VITE_DIRECTUS_ASSETS_PATH` — Pfad für Assets (Standard: `/assets`)
- `VITE_HOME_SLUG` — Startseiten-Slug (Standard: `home`)
- `VITE_DIRECTUS_TOKEN` — Optional: read-only Token (niemals in Git einchecken)

## Testing

- E2E-Tests mit Cypress befinden sich im Ordner `frontend/cypress`.
- Dev-Server starten und dann `npx cypress open` im `frontend`-Ordner ausführen.

## Produktion

- Directus: produktiv mit PostgreSQL + persistentem Objektspeicher betreiben (z. B. S3).
- Frontend: `npm run build` im `frontend`-Ordner erzeugt statische Assets zum Deploy.

## Mitwirken

- Issues und PRs sind willkommen. Bitte im PR-Titel angeben, ob die Änderung `frontend/` oder `cms/` betrifft.
- Code-Style: ESLint + Prettier (siehe `frontend/` Konfiguration).

## Kontakt

Bei Fragen: Projektmaintainer kontaktieren (siehe `package.json` im `frontend/` Ordner).

---

Lizenz: GPL-3.0
Status: aktive Entwicklung
