# Feature: Pages (Startseite)

Rendert die konfigurierte Startseite des Vereins. Delegiert vollständig an die generische `CmsPageView`-Komponente – keine eigene Darstellungslogik.

---

## Übersicht

```
┌─────────────────────────────────────────────────────┐
│               HomePage (Route)                       │
│  /  (Stammpfad)                                      │
│                                                      │
│  usePublicPageByPathQuery(appConfig.defaultHomeSlug) │
└───────────────────────┬─────────────────────────────┘
                        │
          ┌─────────────┴──────────────┐
          │  Lade-Zustand               │
          ▼                             ▼
   LoadingState                  ErrorState
   (Spinner)                     (Fehlermeldung)
                        │
                        ▼ (Daten vorhanden)
┌─────────────────────────────────────────────────────┐
│                   CmsPageView                        │
│                                                      │
│  ┌─────────────────────────────────────────────┐    │
│  │  PageHero                                    │    │
│  │  (Titel + Hintergrundbild aus CMS)           │    │
│  └─────────────────────────────────────────────┘    │
│                                                      │
│  ┌─────────────────────────────────────────────┐    │
│  │  Content-Blöcke (dynamisch aus CMS)          │    │
│  │                                              │    │
│  │  ▸ RichText-Block                           │    │
│  │  ▸ News-Teaser-Block                        │    │
│  │  ▸ Bild-Block                               │    │
│  │  ▸ … weitere Block-Typen                    │    │
│  └─────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

---

## Dateistruktur

```
features/pages/
├── README.md        ← diese Datei
└── HomePage.tsx     ← Route-Komponente (/)
```

> Das Feature ist bewusst schlank gehalten. Die gesamte Darstellungslogik
> liegt in `core/content/CmsPageView` und den zugehörigen Block-Komponenten.

---

## Datenfluss

```
appConfig.defaultHomeSlug   (aus core/config)
        │
        ▼
  usePublicPageByPathQuery(slug)
  Query Key: ['pages', 'byPath', slug]
  GET /items/pages?filter[slug]=<slug>
        │
        ▼
  CmsPageView
  → rendert alle CMS-Blöcke der Seite
```

---

## Anpassungsmöglichkeiten

### Standard-Startseite ändern

In `src/core/config/defaults.ts` (oder der entsprechenden Config-Datei):

```ts
export const appConfig = {
  defaultHomeSlug: 'home', // ← Slug der gewünschten CMS-Startseite
};
```

Der Slug muss einer Seite in der Directus-Collection **`pages`** entsprechen.

### Inhalte anpassen (CMS)

| Was                    | Wo in Directus                           |
| ---------------------- | ---------------------------------------- |
| Seitentitel & Hero     | Collection **`pages`**, Slug = `home`    |
| Hero-Hintergrundbild   | Feld `image` der Seite                   |
| Inhalt / Blöcke        | Feld `blocks` (M2A – viele Block-Typen)  |
| Neue Blöcke hinzufügen | Block in `blocks`-Feld der Seite anlegen |

### Weitere CMS-Seiten

`HomePage` ist nur der Einstiegspunkt. Weitere Routen (z. B. `/ueber-uns`) verwenden denselben `usePublicPageByPathQuery`-Hook mit einem anderen Slug und rendern ebenfalls über `CmsPageView`.

---

## Abhängigkeiten

| Modul            | Herkunft       | Beschreibung                          |
| ---------------- | -------------- | ------------------------------------- |
| `CmsPageView`    | `core/content` | Generischer Seiten-Renderer           |
| `usePublicPage…` | `core/cms/api` | CMS-Daten-Hook                        |
| `LoadingState`   | `shared/ui`    | Ladeindikator                         |
| `ErrorState`     | `shared/ui`    | Fehleranzeige                         |
| `appConfig`      | `core/config`  | App-weite Konfiguration (Slugs, etc.) |
