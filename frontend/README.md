# Frontend — ASV Loxstedt

<p align="center">
	<img alt="frontend tech" src="https://img.shields.io/badge/tech-React%2019%20%2B%20TypeScript-blue?logo=react&style=flat-square" />
	<img alt="vite" src="https://img.shields.io/badge/bundler-Vite-646cff?style=flat-square&logo=vite" />
	<img alt="tailwind" src="https://img.shields.io/badge/styles-Tailwind%20v4-38bdf8?style=flat-square&logo=tailwindcss" />
	<img alt="directus" src="https://img.shields.io/badge/cms-Directus-ff69b4?style=flat-square&logo=directus" />
</p>

React 19 + TypeScript + Vite Frontend für den ASV Loxstedt. Inhalte (Seiten, Navigation, News, Downloads, Vorstand, Kalender) werden über Directus als Headless CMS gepflegt.

## Tech-Stack

| Bereich    | Technologie                           |
| ---------- | ------------------------------------- |
| UI         | React 19, TypeScript                  |
| Bundler    | Vite 8                                |
| Styling    | Tailwind CSS v4.2                     |
| Routing    | React Router v7                       |
| Datenabruf | TanStack Query v5                     |
| CMS        | Directus (selbst gehostet via Docker) |
| Tests      | Vitest + Testing Library              |

## Schnellstart (lokal)

**1. Directus starten** (aus dem Projekt-Root):

```powershell
cd cms
docker compose up -d
```

**2. Frontend starten:**

```powershell
# PowerShell
cd frontend
Copy-Item .env.example .env.local
npm install
npm run dev
```

```bash
# Bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Standardmäßig erwartet das Frontend Directus unter `http://localhost:8055`.

## Umgebungsvariablen

Alle Variablen werden in [`.env.example`](.env.example) mit Defaults dokumentiert.

| Variable                    | Default                 | Beschreibung                                             |
| --------------------------- | ----------------------- | -------------------------------------------------------- |
| `VITE_API_BASE_URL`         | `http://localhost:8055` | Basis-URL der Directus-Instanz                           |
| `VITE_DIRECTUS_ASSETS_PATH` | `/assets`               | Pfad für Directus-Assets                                 |
| `VITE_HOME_SLUG`            | `home`                  | Slug der Startseite                                      |
| `VITE_DIRECTUS_TOKEN`       | _(leer)_                | Read-only API-Token (nur wenn Public Access deaktiviert) |

> `VITE_DIRECTUS_TOKEN` nie ins VCS einchecken.

## Scripts

| Befehl                    | Beschreibung                                       |
| ------------------------- | -------------------------------------------------- |
| `npm run dev`             | Dev-Server starten (Vite)                          |
| `npm run build`           | Produktions-Build (`tsc` + Vite)                   |
| `npm run preview`         | Build lokal vorschauen                             |
| `npm run test`            | Tests mit Vitest ausführen                         |
| `npm run lint`            | ESLint prüfen                                      |
| `npm run lint:fix`        | ESLint-Fehler automatisch beheben                  |
| `npm run format`          | Prettier auf `src/` anwenden                       |
| `npm run export:demo-cms` | Demo-JSON aus der lokalen Directus-DB neu erzeugen |

## Projektstruktur

```
src/
├── app/            # App-Einstiegspunkt, Providers, Router
├── core/           # Stabile Basis: CMS-Anbindung, Routing, Shell, Templates
│   ├── cms/        # Directus-Adapter, API, Mapper, Schemas, Typen
│   ├── config/     # Umgebungsvariablen, Konstanten, Defaults
│   ├── shell/      # Header, Footer, Layout
│   └── templates/  # Seiten-Templates (standard, board, downloads, …)
├── features/       # Optionale, modular aktivierbare Features
│   ├── board/      # Vorstand
│   ├── calendar/   # Kalender
│   ├── downloads/  # Downloads
│   ├── news/       # News
│   └── pages/      # CMS-gesteuerte Seiten
└── shared/         # Wiederverwendbare UI-Komponenten, Utilities, Typen
```

## Erwartete Directus-Collections

- `global_settings` — Footer, Kontaktdaten, Feature-Flags
- `navigation` — Navigationsstruktur mit Dropdowns
- `pages` — Alle CMS-Seiten (Slug, Template, Parent)
- `news` — Nachrichtenbeiträge
- `downloads` — Datei-Downloads
- `persons` / `roles` — Vorstandsmitglieder

Weitere Informationen zur CMS-Konfiguration: [Directus-Setup.md](Directus-Setup.md)

## Hinweise

- Eine Seite mit Slug `home` muss in Directus existieren, damit die Startseite Inhalte zeigt.
- Testdaten: `cms/database/snapshot.json` in Directus importieren.
- Demo-Daten: `npm run export:demo-cms` erzeugt `public/demo/cms.json` aus der lokalen Directus-Datenbank neu.
- Pfad-Alias `@` zeigt auf `src/` (konfiguriert in `vite.config.ts`).
