<!-- Banner & Badges -->
<p align="center">
	<img alt="ASV Loxstedt" src="https://img.shields.io/badge/ASV%20Loxstedt-Website-2b90d9?style=flat-square" />
	<img alt="status" src="https://img.shields.io/badge/status-active-brightgreen?style=flat-square" />
	<img alt="license" src="https://img.shields.io/badge/license-GPLv3-blue?style=flat-square" />
	<img alt="tech" src="https://img.shields.io/badge/tech-React%20%2B%20TypeScript-blue?logo=react&style=flat-square" />
	<img alt="cms" src="https://img.shields.io/badge/cms-Directus-ff69b4?style=flat-square&logo=directus" />
</p>

# asv-loxstedt

<div align="center" markdown="1">
	<h1 style="margin:0;">ASV Loxstedt — Website</h1>
	<p style="margin:6px 0 0 0; color:#555;">Headless CMS (Directus) + React + TypeScript (Vite)</p>
	<p>
		<img alt="banner" src="cms/uploads/f2fae195-b718-4a24-80bd-4bfb5530839c__e9dcbd6d37cf1a1351d2786febd96ceaf3ef6132.avif" width="720" style="border-radius:8px; margin-top:12px;" />
	</p>
</div>

<p align="center">
	<img alt="status" src="https://img.shields.io/badge/status-active-brightgreen?style=flat-square" />
	<img alt="tech" src="https://img.shields.io/badge/tech-React%20%2B%20TypeScript-blue?logo=react&style=flat-square" />
	<img alt="cms" src="https://img.shields.io/badge/cms-Directus-ff69b4?style=flat-square&logo=directus" />
	<img alt="license" src="https://img.shields.io/badge/license-GPLv3-blue?style=flat-square" />
</p>

---

## Kurzübersicht

- **Architektur:** Headless CMS (`cms/`) + Frontend (`frontend/`) mit klarer Trennung von Content und Presentation
- **Snapshot:** `cms/database/snapshot.json`
- **Local:** Directus Admin — `http://localhost:8055`, Frontend Dev — `http://localhost:5173`

---

<div style="background:linear-gradient(90deg,#f3f8ff,#ffffff); border-left:4px solid #2b90d9; padding:12px; margin:12px 0; border-radius:6px;">
	<strong>Was macht dieses Repo?</strong>
	<p style="margin:6px 0 0 0; color:#333;">Redakteure pflegen Inhalte in Directus; das Frontend liest die Daten und rendert Navigation, Seiten und News dynamisch. Ziel ist eine wartbare, leicht erweiterbare Web-Präsenz.</p>
</div>

## Schneller Start (lokal)

1. Directus (im Ordner `cms`):

```powershell
cd cms
docker compose up -d
```

2. Frontend starten:

```powershell
cd frontend
Copy-Item .env.example .env.local
npm install
npm run dev
```

Hinweis: Siehe `frontend/.env.example` für benötigte `VITE_`-Variablen.

## Wichtige Env-Variablen

- `VITE_API_BASE_URL` — Directus-API (z. B. `http://localhost:8055`)
- `VITE_DIRECTUS_ASSETS_PATH` — Asset-Pfad (Default: `/assets`)
- `VITE_HOME_SLUG` — Startseiten-Slug (Default: `home`)

<!-- Banner & Badges -->
<p align="center">
	<img alt="ASV Loxstedt" src="https://img.shields.io/badge/ASV%20Loxstedt-Website-2b90d9?style=flat-square" />
	<img alt="status" src="https://img.shields.io/badge/status-active-brightgreen?style=flat-square" />
	<img alt="license" src="https://img.shields.io/badge/license-GPLv3-blue?style=flat-square" />
	<img alt="tech" src="https://img.shields.io/badge/tech-React%20%2B%20TypeScript-blue?logo=react&style=flat-square" />
	<img alt="cms" src="https://img.shields.io/badge/cms-Directus-ff69b4?style=flat-square&logo=directus" />
</p>

# ASV Loxstedt — Website

Eine schlanke, wartbare Codebasis für die Vereins-Website: Headless-CMS (Directus) zur Inhaltspflege und modernes React + TypeScript Frontend (Vite) zur Ausgabe.

> Kurzübersicht

- **Directus (CMS):** `cms/`
- **Frontend (Vite + React + TypeScript):** `frontend/`
- **Snapshot:** `cms/database/snapshot.json`

---

## Vorschau

![Frontend Vorschau](cms/uploads/f2fae195-b718-4a24-80bd-4bfb5530839c__e9dcbd6d37cf1a1351d2786febd96ceaf3ef6132.avif)

---

## Was ist dieses Projekt?

Dieses Repository trennt Content (Directus) und Präsentation (Frontend). Redakteur:innen pflegen Inhalte in Directus; das Frontend liest die Daten dynamisch und rendert Seiten, Navigation und News.

**Ziele:** einfache Wartbarkeit, klare Trennung von Inhalt/Präsentation, gute Developer-Experience.

---

## Schnellstart (lokal)

1. Directus (im Ordner `cms`) starten:

```powershell
cd cms
docker compose up -d
```

2. Frontend vorbereiten und lokal starten:

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

**Lokale URLs:**

- Directus Admin: http://localhost:8055
- Frontend Dev (Vite): http://localhost:5173

---

## Wichtige Environment-Variablen (Frontend)

- `VITE_API_BASE_URL` — Basis-URL zur Directus-API (Default: `http://localhost:8055`)
- `VITE_DIRECTUS_ASSETS_PATH` — Pfad für Assets (Default: `/assets`)
- `VITE_HOME_SLUG` — Startseiten-Slug (Default: `home`)
- `VITE_DIRECTUS_TOKEN` — Optional: read-only Token (NICHT ins VCS)

Siehe auch: `frontend/.env.example` und `frontend/src/config/env.ts`.

---

## Erwartete Directus-Collections

- `global_settings` (Singleton)
- `navigation`
- `pages`
- `news`
- `downloads`
- `categories`
- `persons`
- `roles`

---

## Frontend: Scripts & Routing

- `npm run dev` — Dev-Server (Vite + HMR)
- `npm run build` — Produktions-Build
- `npm run preview` — `vite preview` (lokale Vorschau)
- `npm run lint` — ESLint

Routing-Übersicht (siehe `frontend/src/routes/AppRouter.tsx`):

- `/` → Startseite
- `/news` → News-Übersicht
- `/news/:slug` → News-Detail
- `/:slug` → generische CMS-Seiten
- `*` → 404

---

## Snapshot & Wiederherstellung

- Snapshot-Datei: `cms/database/snapshot.json` (nützlich für Demo-Instanzen)
- Restore-Skripte: `cms/restore_snapshot.ps1`, `cms/restore_snapshot.sh`

Empfehlung: Snapshot über Directus Admin → Einstellungen → Import/Export importieren.

---

## Produktion

- Directus: Betrieb mit PostgreSQL + persistentem Objektspeicher (z. B. S3)
- Frontend: Statisches Hosting (Netlify, Vercel, S3, etc.) nach `npm run build`

---

## Hinweise für Developer

- API-Abstraktion: `frontend/src/api/directus.ts` — zentrale Fetch-Logik
- RichText: `frontend/src/components/ui/RichText.tsx` nutzt Sanitizing
- Navigation: `frontend/src/features/navigation/navigation.utils.ts`

---

## Mitwirken

- PRs und Issues willkommen — bitte Bereich (`frontend/` oder `cms/`) im PR-Titel angeben.

---

## Lizenz

Dieses Projekt steht unter der GPL-3.0-Lizenz.

---

Status: aktive Entwicklung
