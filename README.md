# asv-loxstedt
Refactoring of the ASV Loxstedt club website — frontend built with React + TypeScript and CMS provided by Directus (Docker).

## Summary
This repository contains the frontend (Vite + React + TypeScript) and a lightweight CMS setup using Directus (running via Docker Compose in the `cms/` folder). We decided to adopt a CMS-first approach for content management and fast iteration. A custom Spring Boot backend is considered a future option if custom server logic is required.

## Why Directus (CMS-first)
- Faster content iteration for editors without building a custom API.
- Provides authentication, role-based access, file uploads, and an admin UI out of the box.
- Runs in Docker and stores data in PostgreSQL (local container by default).

## Tech Stack
- Frontend: React, TypeScript, Vite
- CMS: Directus (Docker Compose) with PostgreSQL
- Dev tooling: Node.js, npm/yarn, Docker

## Repo Layout
- cms/ — Docker Compose for Directus, persistent folders: `database/`, `uploads/`, `extensions/`
- frontend/ — React + Vite application, dev/build scripts in `frontend/package.json`

## Quickstart (developer)
1. Start Directus (from project root):

```powershell
cd cms
docker compose up -d
```

2. Start frontend (new terminal):

```bash
cd frontend
npm install
npm run dev
```

3. Open the Directus admin UI at http://localhost:8055 (default, see `cms/docker-compose.yml`) and the frontend at the Vite dev server URL (usually http://localhost:5173).

## Environment & Persistence
- The `cms/docker-compose.yml` mounts local folders for the database and uploads. Persist these folders (they are in the repo as placeholders).
- Do not commit secrets. Use a `.env` file or Docker secrets for production credentials.

## Deployment notes
- Directus can be deployed with Docker Compose, Docker Swarm, or Kubernetes. Configure a managed PostgreSQL for production and place uploads in durable storage (S3 or mounted volumes).
- Frontend can be built with `npm run build` in `frontend` and served via static hosting (Netlify, Vercel, or any web server).

## Migration / Future backend
If later we require custom server-side logic (heavy business rules, integrations), we can add a Spring Boot (or Node) backend and use Directus either as a headless CMS or migrate content into a dedicated API. For now, the Spring Boot mentions are demoted to "future option" and documentation will focus on the CMS-first flow.

## Contributing
- See `frontend/README.md` for frontend-specific development details.
- For CMS customization, edit `cms/docker-compose.yml` and add Directus extensions under `cms/extensions`.

## Links & References
- Directus docs: https://docs.directus.io
- `cms/docker-compose.yml` — Directus configuration
- `frontend/package.json` — frontend scripts and dependencies

---
Project status: active development.
