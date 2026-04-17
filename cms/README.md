# Directus (CMS) — Setup & Snapshot

Kurz: Lokales Directus für Entwicklung mit Snapshot zum Wiederherstellen des Schemas.

Pfad des Snapshots: `cms/database/snapshot.json` (erstellt mit Directus v11.14.1)

Voraussetzungen

- Docker & Docker Compose

Schnellstart (lokal)

```powershell
cd cms
docker compose up -d
```

Admin UI: http://localhost:8055

Snapshot importieren (empfohlen)

1. Directus starten
2. Admin UI → Einstellungen → Import/Export → Snapshot importieren
3. `cms/database/snapshot.json` auswählen

Clean Start (sqlite, lokal)

```powershell
cd cms
docker compose down
Move-Item cms\database\data.db cms\database\data.db.bak
docker compose up -d
# Danach Snapshot via Admin UI importieren
```

Restore-Skripte

- `cms/restore_snapshot.ps1` — PowerShell-Beispiel
- `cms/restore_snapshot.sh` — Bash-Beispiel

Wichtige Collections (im Snapshot enthalten / vom Frontend erwartet)

- `global_settings`
- `navigation`
- `pages`
- `news`
- `downloads`
- `categories`
- `persons`
- `roles`

Extensions

- Erweiterungen liegen in `cms/extensions` bzw. `cms/extensions/.registry`.
- Wenn du eine lokale Extension änderst oder hinzufügst: `npm install` im Extension-Ordner (falls nötig), `npm run build` (sofern vorhanden) und Directus neu starten.

Docker / Produktion

- Dev-Setup nutzt sqlite (Datei `cms/database/data.db`). Für Produktion: PostgreSQL + persistente Volumes + Objektstore (z. B. S3) konfigurieren.
- Prüfe `cms/docker-compose.yml` auf Umgebungsvariablen und Volumes.

Admin-User / Berechtigungen

- Beim ersten Start Admin über die Admin-UI anlegen oder via API/CLI. Siehe Directus-Dokumentation für automatisierte Admin-Erstellung.
- Achte darauf, dass die Public-Role nur freigegebene Inhalte liefert (das Frontend erwartet öffentliche Endpunkte).

Support

- Bei Fragen zu Snapshot/Extensions: siehe `cms/restore_snapshot.ps1` und `cms/restore_snapshot.sh` oder öffne ein Issue.
