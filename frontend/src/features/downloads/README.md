# Feature: Downloads

Zeigt eine nach Kategorien gruppierte Liste herunterladbarer Dateien aus dem CMS. Dateien werden über Directus-Assets ausgeliefert.

---

## Übersicht

```
┌─────────────────────────────────────────────────────┐
│              DownloadsPage (Route)                   │
│  /downloads                                          │
│                                                      │
│  usePublicPageBySlugQuery("downloads")               │
│  usePublicDownloadsQuery()                           │
└──────────────┬───────────────────────────────────────┘
               │ page + downloads
               ▼
┌─────────────────────────────────────────────────────┐
│               DownloadsPageView                      │
│  ┌─────────────────────────────────────────────┐    │
│  │  PageHero  (Titel + Hintergrundbild aus CMS) │    │
│  └─────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────┐    │
│  │  RichText  (optionaler Einleitungstext)      │    │
│  └─────────────────────────────────────────────┘    │
│                                                      │
│  ┌───── Badge: "Satzungen" ────────────────────┐    │
│  │  ┌────────────────────────────────────────┐ │    │
│  │  │ 📄 Vereinssatzung.pdf           ⬇ Link │ │    │
│  │  │    Beschreibung (optional, 2 Zeilen)   │ │    │
│  │  └────────────────────────────────────────┘ │    │
│  │  ┌────────────────────────────────────────┐ │    │
│  │  │ 📄 Jugendordnung.pdf            ⬇ Link │ │    │
│  │  └────────────────────────────────────────┘ │    │
│  └─────────────────────────────────────────────┘    │
│                                                      │
│  ┌───── Badge: "Formulare" ────────────────────┐    │
│  │  ┌────────────────────────────────────────┐ │    │
│  │  │ 📄 Aufnahmeantrag.pdf           ⬇ Link │ │    │
│  │  └────────────────────────────────────────┘ │    │
│  └─────────────────────────────────────────────┘    │
│                                                      │
│  ┌───── (ohne Kategorie) ──────────────────────┐    │
│  │  ...                                         │    │
│  └─────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

---

## Dateistruktur

```
features/downloads/
├── README.md                   ← diese Datei
├── index.ts                    ← Barrel-Export
├── useDownloadsQueries.ts      ← React-Query-Hook
├── DownloadsPageView.tsx       ← Seiten-Komponente (Darstellung)
├── DownloadListItem.tsx        ← einzelne Download-Zeile
└── routes/
    └── DownloadsPage.tsx       ← Route-Komponente (/downloads)
```

---

## Datenfluss

```
Directus CMS
  GET /items/downloads
  ?fields=id,title,description,file,category.name
  &sort=category.name,sort,title
  &limit=-1
        │
        ▼
  usePublicDownloadsQuery()
  Query Key: ['downloads']
        │
        ▼
  DownloadsPageView
  → sortiert: kategorielos ans Ende
  → gruppiert nach category.name
  → je Gruppe: Badge + DownloadListItem-Liste
        │
        ▼
  DownloadListItem
  getCmsAssetUrl(item.file)
  → <a href="..." download>
```

---

## Datenmodell (`DownloadItem`)

| Feld          | Typ       | Bedeutung                                         |
| ------------- | --------- | ------------------------------------------------- |
| `id`          | `string`  | Datensatz-ID                                      |
| `title`       | `string`  | Anzeigename der Datei                             |
| `description` | `string?` | Optionale kurze Beschreibung (2 Zeilen angezeigt) |
| `file`        | `string`  | Directus-Asset-ID (für Download-URL)              |
| `category`    | `object?` | Verknüpfte Kategorie (`name`)                     |

---

## Anpassungsmöglichkeiten

### Feature ein-/ausschalten

```env
VITE_FEATURE_DOWNLOADS=true   # true = aktiv (Standard), false = deaktiviert
```

### Inhalte anpassen (CMS)

| Was                         | Wo in Directus                           |
| --------------------------- | ---------------------------------------- |
| Dateien hinzufügen/löschen  | Collection **`downloads`**               |
| Kategorien                  | Feld `category` (relational)             |
| Sortierung innerhalb Gruppe | Feld `sort` in `downloads`               |
| Seitentitel & Hero-Bild     | Collection **`pages`**, Slug `downloads` |
| Einleitungstext             | Feld `content` der Seite                 |

### Dateien hochladen

Dateien werden direkt in Directus über **File Library** verwaltet und dann in der `downloads`-Collection verknüpft. Alle gängigen Dateiformate werden unterstützt (PDF, DOCX, XLSX, …).

---

## Verwendete UI-Komponenten

| Komponente     | Herkunft    | Beschreibung                           |
| -------------- | ----------- | -------------------------------------- |
| `PageHero`     | `shared/ui` | Seitenheader mit Bild & Titel          |
| `RichText`     | `shared/ui` | DOMPurify-bereinigter HTML-Block       |
| `Badge`        | `shared/ui` | Kategorie-Trennmarkierung              |
| `LoadingState` | `shared/ui` | Ladeindikator                          |
| `ErrorState`   | `shared/ui` | Fehleranzeige                          |
| `EmptyState`   | `shared/ui` | Anzeige wenn keine Downloads vorhanden |
