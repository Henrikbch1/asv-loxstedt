# Feature: Board (Vorstand)

Zeigt den Vereinsvorstand – Ämter mit zugeordneten Personen, gruppiert nach Kategorie (z. B. „Vorstand", „Kassenprüfer").

---

## Übersicht

```
┌─────────────────────────────────────────────────────┐
│                   BoardPage (Route)                  │
│  /vorstand                                           │
└───────────────────────┬─────────────────────────────┘
                        │ page: CmsPage
                        ▼
┌─────────────────────────────────────────────────────┐
│                  BoardPageView                       │
│  ┌─────────────────────────────────────────────┐    │
│  │  PageHero  (Titel + Hintergrundbild aus CMS) │    │
│  └─────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────┐    │
│  │  RichText  (optionaler Einleitungstext)      │    │
│  └─────────────────────────────────────────────┘    │
│                                                      │
│  ┌───── Kategorie-Badge ───────────────────────┐    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  │    │
│  │  │ RoleCard │  │ RoleCard │  │ RoleCard │  │    │
│  │  │ Amt      │  │ Amt      │  │ Amt      │  │    │
│  │  │ Person   │  │ Person   │  │ (vakant) │  │    │
│  │  │ ✉ E-Mail │  │ ✉ E-Mail │  │          │  │    │
│  │  └──────────┘  └──────────┘  └──────────┘  │    │
│  └─────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

---

## Dateistruktur

```
features/board/
├── README.md               ← diese Datei
├── BoardPageView.tsx       ← Seiten-Komponente (Darstellung)
└── useBoardQueries.ts      ← React-Query-Hook (Datenabruf)
```

---

## Datenfluss

```
Directus CMS
  GET /items/roles
  ?fields=id,sort,role,email,is_vacant,
          category.name,
          person_link.firstname,
          person_link.lastname
        │
        ▼
  useBoardRolesQuery()
  Query Key: ['board', 'roles']
        │
        ▼
  BoardPageView
  → sortiert nach `sort`
  → gruppiert nach `category.name`
  → rendert pro Gruppe: Badge + RoleCard-Grid
```

---

## Datenmodell

| Feld          | Typ       | Bedeutung                                   |
| ------------- | --------- | ------------------------------------------- |
| `id`          | `string`  | Datensatz-ID                                |
| `sort`        | `number`  | Sortierreihenfolge                          |
| `role`        | `string`  | Bezeichnung des Amts                        |
| `email`       | `string?` | Optionale Kontakt-E-Mail                    |
| `is_vacant`   | `boolean` | `true` → „Zurzeit unbesetzt"                |
| `category`    | `object`  | Verknüpfte Kategorie (`name`)               |
| `person_link` | `object?` | Verknüpfte Person (`firstname`, `lastname`) |

---

## Anpassungsmöglichkeiten

### Feature ein-/ausschalten

In `.env` (bzw. `.env.local`):

```env
VITE_FEATURE_BOARD=true   # true = aktiv (Standard), false = deaktiviert
```

### Inhalte anpassen (CMS)

| Was                     | Wo in Directus                           |
| ----------------------- | ---------------------------------------- |
| Ämter & Personen        | Collection **`roles`**                   |
| Kategorien              | Collection **`categories`** (relational) |
| Seitentitel & Hero-Bild | Collection **`pages`**, Slug `vorstand`  |
| Einleitungstext         | Feld `content` der Seite                 |

### Sortierung

Die Reihenfolge der Karten wird über das Feld `sort` in der `roles`-Collection gesteuert. Kategorien werden in der Reihenfolge angezeigt, wie ihr erstes zugehöriges Amt sortiert ist.

---

## Verwendete UI-Komponenten

| Komponente     | Herkunft    | Beschreibung                       |
| -------------- | ----------- | ---------------------------------- |
| `PageHero`     | `shared/ui` | Seitenheader mit Bild & Titel      |
| `RichText`     | `shared/ui` | DOMPurify-gebereinigter HTML-Block |
| `Badge`        | `shared/ui` | Kategorie-Trennmarkierung          |
| `LoadingState` | `shared/ui` | Ladeindikator                      |
| `ErrorState`   | `shared/ui` | Fehleranzeige                      |
| `EmptyState`   | `shared/ui` | Anzeige wenn keine Daten vorhanden |
