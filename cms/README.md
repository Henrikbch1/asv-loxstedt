# CMS (Directus) — Setup & Snapshot

Kurzanleitung zum lokalen Betrieb und zur Wiederherstellung des initialen Schemas (`snapshot.json`).

Pfad der Snapshot-Datei: [cms/database/snapshot.json](cms/database/snapshot.json)

Voraussetzungen

- Docker & Docker Compose installiert

Schnellstart

```powershell
cd cms
docker compose up -d
```

Admin UI

- Öffne http://localhost:8055

Snapshot importieren (empfohlen für Entwicklung)

1. Directus starten (siehe oben)
2. Admin UI → Einstellungen → Import/Export → Snapshot importieren
3. Wähle `cms/database/snapshot.json` und folge den Anweisungen

Clean Start / datenbankbasiertes Vorgehen

- Container stoppen: `docker compose down`
- Backup der bestehenden DB erstellen: `cms/database/data.db` → `cms/database/data.db.bak`
- Entferne oder verschiebe `cms/database/data.db`, starte Directus neu und importiere den Snapshot via Admin UI.

Hinweise

- Snapshot wurde mit Directus v11.14.1 erzeugt — prüfe Kompatibilität für andere Versionen.
- Immer ein Backup (`data.db.bak`) anlegen, bevor du die DB überschreibst.

Optional: Restore-Skripte

- Siehe `cms/restore_snapshot.ps1` und `cms/restore_snapshot.sh` für einfache, nicht-automatisierte Hilfsbefehle.
