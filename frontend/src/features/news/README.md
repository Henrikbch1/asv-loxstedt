# Feature: News (Neuigkeiten)

Zeigt Vereinsnachrichten als Liste oder Kachelraster an.  
Einzelne Beiträge sind über eine Detailseite erreichbar.  
Die Darstellung erfolgt auf einer CMS-Seite mit dem Template `news`.

---

## Ordnerstruktur

```
news/
├── index.ts                    # Barrel-Exports
├── useNewsQueries.ts           # TanStack Query Hooks
├── components/
│   ├── News.tsx                # Liste oder Kachelraster (Entry Point)
│   ├── NewsCard.tsx            # Karte für Grid-Darstellung
│   ├── NewsListItem.tsx        # Zeile für Listen-Darstellung
│   └── NewsDetail.tsx          # Detailansicht eines Beitrags
├── model/
│   ├── news.types.ts           # TypeScript-Typen (NewsItem, NewsSettings, …)
│   └── news.mapper.ts          # Mapping: CMS-Daten → Domänentypen
└── styles/
    ├── news.classes.ts         # Tailwind-Klassen
    └── news.tokens.ts          # Design-Tokens
```

---

## Datenfluss

```
Directus CMS
  └── /items/features  (key: "news")      → Feature-Toggle
  └── /items/news_settings                → Einstellungen (itemsPerPage)
  └── /items/news                         → Beitragsliste / Einzelbeitrag
        ├── image    → /files             → Vorschau-/Detailbild
        └── category → /items/category   → Kategoriename

cms.ts: getPublicNewsList() / getPublicNewsById() / getNewsSettings()
  └── usePublicNewsListQuery(page, pageSize)
  └── usePublicNewsByIdQuery(id)
  └── useNewsSettingsQuery()
        └── select: mapRawSettingsToNewsSettings()
              └── News (asCards / Liste)
                    ├── NewsCard    (Grid)
                    └── NewsListItem (Liste)

              └── NewsDetail (Einzelseite)
```

---

## Komponenten

### `News`

Rendert Beiträge entweder als Kachelraster (`asCards`) oder als kompakte Liste.

| Prop      | Typ          | Standard | Beschreibung                          |
| --------- | ------------ | -------- | ------------------------------------- |
| `items`   | `NewsItem[]` | –        | Zu rendernde Beiträge                 |
| `asCards` | `boolean`    | `false`  | `true` → Grid, `false` → Listenzeilen |

### `NewsCard`

Karte im Grid-Layout mit Bild, Datum, Kategorie-Badge, Titel, Textauszug und „Weiterlesen"-Button.

| Prop   | Typ        | Beschreibung          |
| ------ | ---------- | --------------------- |
| `item` | `NewsItem` | Zu rendernder Beitrag |

### `NewsListItem`

Kompakte Listenzeile mit optionalem Thumbnail (rechts ab md), Datum, Kategorie-Badge und Textvorschau.

| Prop   | Typ        | Beschreibung          |
| ------ | ---------- | --------------------- |
| `item` | `NewsItem` | Zu rendernder Beitrag |

### `NewsDetail`

Vollständige Detailansicht mit Bild, Datum, Titel und HTML-Fließtext (`dangerouslySetInnerHTML`).  
Enthält einen `BackButton` für die Navigation zurück zur Liste.

| Prop   | Typ        | Beschreibung          |
| ------ | ---------- | --------------------- |
| `item` | `NewsItem` | Anzuzeigender Beitrag |

---

## Typen

```ts
interface NewsItem {
  id: string | number;
  title: string;
  slug: string | null;
  date: string | null;
  image: DirectusFile | null;
  text: string | null;
  category: Category | DirectusRelation | null;
}

interface NewsListResponse {
  items: NewsItem[];
  total: number;
}

interface NewsSettings {
  itemsPerPage: number;
}
```

---

## Query Hooks

| Hook                         | Beschreibung                               |
| ---------------------------- | ------------------------------------------ |
| `useNewsFeatureEnabledQuery` | Liest Feature-Toggle aus `/items/features` |
| `useNewsSettingsQuery`       | Liest `news_settings` (z. B. Seitengröße)  |
| `usePublicNewsListQuery`     | Paginierte Beitragsliste                   |
| `usePublicNewsByIdQuery`     | Einzelner Beitrag anhand ID                |

---

## Feature-Toggle

Das Feature kann im Directus-Backend unter **Features → news** deaktiviert werden.  
`useNewsFeatureEnabledQuery` gibt `false` zurück, wenn der Eintrag fehlt oder deaktiviert ist.  
Als Fallback greift `featureConfig.news.enabled` (`.env`-Variable).
