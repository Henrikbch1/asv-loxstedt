#!/usr/bin/env bash
# Simple helper: backup current SQLite DB and restart Directus for a clean snapshot import.
# Usage: cd cms && ./restore_snapshot.sh

set -euo pipefail

echo "Stopping containers..."
docker compose down

DB_PATH="./database/data.db"
BACKUP_PATH="./database/data.db.bak"

if [ -f "$DB_PATH" ]; then
  echo "Backing up existing DB to $BACKUP_PATH"
  cp "$DB_PATH" "$BACKUP_PATH"
  echo "Removing existing DB to allow clean initialization..."
  rm -f "$DB_PATH"
else
  echo "No existing DB found at $DB_PATH — starting fresh"
fi

echo "Starting Directus..."
docker compose up -d

echo "Directus läuft. Öffne http://localhost:8055 und importiere cms/database/snapshot.json über Settings → Import/Export."
