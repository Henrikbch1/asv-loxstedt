# Feature: News (Vereinsnachrichten)

Vollständiges News-Modul mit paginierter Listenansicht, Detailseite und wiederverwendbaren Karten-/Listen-Komponenten.

---

## Übersicht

```
┌──────────────────────────────────────────────────────────────┐
│                     Routing                                   │
│                                                              │
│   /news           →  NewsListPage                            │
│   /news/:id       →  NewsDetailPage                          │
└────────────────────────┬─────────────────────────────────────┘
                         │
          ┌──────────────┴──────────────┐
          ▼                             ▼
┌─────────────────────┐       ┌──────────────────────────────┐
│    NewsListPage      │       │       NewsDetailPage          │
│                     │       │                              │
│  ?page=N (URL)      │       │  :id (URL-Parameter)         │
│  usePublicNews      │       │  usePublicNewsByIdQuery(id)   │
│  ListQuery(page)    │       │         │                    │
│         │           │       │         ▼                    │
│         ▼           │       │  ┌────────────────────────┐  │
│  ┌─────────────┐   │       │  │  PageHero              │  │
│  │NewsListItem │   │       │  │  Titel · Datum · Kat.  │  │
│  ├─────────────┤   │       │  └────────────────────────┘  │
│  │NewsListItem │   │       │  ┌────────────────────────┐  │
│  ├─────────────┤   │       │  │  RichText (Inhalt)     │  │
│  │NewsListItem │   │       │  └────────────────────────┘  │
│  ├─────────────┤   │       │  ┌────────────────────────┐  │
│  │   ...       │   │       │  │  ImageLightbox (opt.)  │  │
│  └─────────────┘   │       │  └────────────────────────┘  │
│                     │       │  ← BackButton               │
│  ← Zurück  Weiter → │       └──────────────────────────────┘
└─────────────────────┘
```

### Wiederverwendbare Layouts

```
┌───────────────────────────────────────────────────────────────┐
│  <News asCards={false} />  →  Liste (NewsListItem)             │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐    │
│  │  [Datum]  Titel der Meldung               [Bild]     │    │
│  │           Kurze Vorschau (2 Zeilen)                  │    │
│  └──────────────────────────────────────────────────────┘    │
│  ┌──────────────────────────────────────────────────────┐    │
│  │  [Datum]  Weiterer Artikel                [Bild]     │    │
│  └──────────────────────────────────────────────────────┘    │
└───────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────┐
│  <News asCards={true} />  →  Karten-Grid (NewsCard)            │
│                                                               │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐               │
│  │  [Bild]   │  │  [Bild]   │  │  [Bild]   │               │
│  │  Datum    │  │  Datum    │  │  Datum    │               │
│  │  Titel    │  │  Titel    │  │  Titel    │               │
│  │ [Weiterlesen]│ [Weiterlesen]│ [Weiterlesen]│             │
│  └───────────┘  └───────────┘  └───────────┘               │
└───────────────────────────────────────────────────────────────┘
```

---

## Dateistruktur

```
features/news/
├── README.md                   ← diese Datei
├── index.ts                    ← Barrel-Export (Komponenten + Typen + Hooks)
├── useNewsQueries.ts           ← React-Query-Hooks
├── NewsCard.tsx                ← Karten-Layout (Bild oben, für Grids)
├── NewsListItem.tsx            ← Horizontale Zeile (für Listen)
├── components/
│   ├── News.tsx                ← Wrapper: rendert Card[]  oder ListItem[]
│   └── NewsDetail.tsx          ← Einzel-Presenter (ohne Routing)
├── model/
│   ├── news.types.ts           ← Re-Export: NewsItem, NewsListResponse
│   └── news.mapper.ts          ← mapCmsNewsToNewsItem / mapCmsNewsList
├── routes/
│   ├── NewsListPage.tsx        ← Route: /news
│   └── NewsDetailPage.tsx      ← Route: /news/:id
└── styles/
    ├── news.classes.ts         ← Tailwind-Klassen-Objekte
    └── news.tokens.ts          ← Design-Tokens (Farben, Abstände, Radius)
```

---

## Datenfluss

```
Directus CMS
  GET /items/news                      GET /items/news/:id
  ?fields=id,title,date,              ?fields=id,title,date,
          text,image,                          text,image,
          category.name                        category.name
  &sort=-date,-id
  &limit=5  (NEWS_PAGE_SIZE)
  &page=N
  &meta=filter_count
        │                                      │
        ▼                                      ▼
usePublicNewsListQuery(page)       usePublicNewsByIdQuery(id)
Query Key: ['news','list',page]    Query Key: ['news','detail',id]
        │                                      │
        ▼                                      ▼
  NewsListPage                         NewsDetailPage
  → mapCmsNewsList()                   → mapCmsNewsToNewsItem()
  → NewsListItem × N                   → PageHero + RichText + Image
  → Pagination (prev/next)
```

---

## Datenmodell (`NewsItem`)

| Feld       | Typ       | Bedeutung                                    |
| ---------- | --------- | -------------------------------------------- |
| `id`       | `string`  | Datensatz-ID                                 |
| `title`    | `string`  | Überschrift                                  |
| `date`     | `string`  | Veröffentlichungsdatum (ISO 8601)            |
| `text`     | `string?` | HTML-Inhalt (wird durch DOMPurify bereinigt) |
| `image`    | `string?` | Directus-Asset-ID des Titelbilds             |
| `category` | `object?` | Verknüpfte Kategorie (`name`)                |

---

## Anpassungsmöglichkeiten

### Feature ein-/ausschalten

```env
VITE_FEATURE_NEWS=true   # true = aktiv (Standard), false = deaktiviert
```

### Seitengröße ändern

In `src/core/config/constants.ts`:

```ts
export const NEWS_PAGE_SIZE = 5; // Anzahl Meldungen pro Seite
```

### Layout wählen (`<News />` Wrapper)

```tsx
// Listenansicht (Standard)
<News items={newsItems} />

// Kartenansicht (z. B. für Homepage-Teaser)
<News items={newsItems} asCards={true} />
```

### Einzelartikel ohne Routing

```tsx
// Direkter Presenter – benötigt kein Routing
<NewsDetail item={newsItem} />
```

### Inhalte anpassen (CMS)

| Was                         | Wo in Directus               |
| --------------------------- | ---------------------------- |
| Meldungen erstellen/löschen | Collection **`news`**        |
| Kategorien                  | Feld `category` (relational) |
| Titelbild                   | Feld `image` (Directus File) |
| Inhalt (Rich Text)          | Feld `text` (WYSIWYG-Editor) |

---

## Verwendete UI-Komponenten

| Komponente      | Herkunft    | Beschreibung                              |
| --------------- | ----------- | ----------------------------------------- |
| `PageHero`      | `shared/ui` | Seitenheader mit Bild, Titel & Meta-Daten |
| `RichText`      | `shared/ui` | DOMPurify-bereinigter HTML-Block          |
| `ImageLightbox` | `shared/ui` | Vollbild-Bild-Overlay                     |
| `BackButton`    | `shared/ui` | Zurück-Schaltfläche                       |
| `LoadingState`  | `shared/ui` | Ladeindikator                             |
| `ErrorState`    | `shared/ui` | Fehleranzeige                             |
| `EmptyState`    | `shared/ui` | Anzeige wenn keine Meldungen vorhanden    |
