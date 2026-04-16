<#
Simple helper: Backup current SQLite DB and restart Directus for a clean snapshot import.
Usage (PowerShell):
  cd cms
  .\restore_snapshot.ps1
#>

Write-Host "Stopping containers..."
docker compose down

$dbPath = "./database/data.db"
$backupPath = "./database/data.db.bak"

if (Test-Path $dbPath) {
    Write-Host "Backing up existing DB to $backupPath"
    Copy-Item -Path $dbPath -Destination $backupPath -Force
    Write-Host "Removing existing DB to allow clean initialization..."
    Remove-Item -Path $dbPath -Force
} else {
    Write-Host "No existing DB found at $dbPath — starting fresh"
}

Write-Host "Starting Directus..."
docker compose up -d

Write-Host "Directus läuft. Öffne http://localhost:8055 und importiere cms/database/snapshot.json über Settings → Import/Export."