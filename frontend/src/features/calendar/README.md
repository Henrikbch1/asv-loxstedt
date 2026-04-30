# Feature: Calendar (Vereinskalender)

Bettet einen Google-Kalender als `<iframe>` ein. Kein eigener CMS-Datenabruf – vollständig konfigurationsgesteuert.

---

## Übersicht

```
┌─────────────────────────────────────────────────────┐
│               CalendarPage (Route)                   │
│  /kalender                                           │
└───────────────────────┬─────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────┐
│                 CalendarFeature                      │
│                                                      │
│  useCalendar()  →  calendarId (aus Hook/Default)     │
│  mapSettingsToCalendarData()  →  CalendarProps       │
│        │                                             │
│        ▼                                             │
│  ┌─────────────────────────────────────────────┐    │
│  │             CalendarEmbed                    │    │
│  │                                              │    │
│  │  <iframe                                     │    │
│  │    src="https://calendar.google.com/         │    │
│  │         calendar/embed?                      │    │
│  │         src=<calendarId>                     │    │
│  │         &view=AGENDA                         │    │
│  │         &hl=de                               │    │
│  │         &ctz=Europe/Berlin                   │    │
│  │         &color=%230b8043                     │    │
│  │         ..."                                 │    │
│  │  />                                          │    │
│  └─────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

---

## Dateistruktur

```
features/calendar/
├── README.md                      ← diese Datei
├── index.ts                       ← Barrel-Export
├── useCalendar.ts                 ← Hook (Stub – calendarId-Verwaltung)
├── components/
│   ├── CalendarFeature.tsx        ← Orchestrator: Settings → Embed
│   └── CalendarEmbed.tsx          ← reines <iframe>-Rendering
├── model/
│   ├── calendar.types.ts          ← CalendarProps / CalendarData Typen
│   └── calendar.mapper.ts         ← mapSettingsToCalendarData()
└── styles/
    ├── calendar.classes.ts        ← Tailwind-Klassen-Konstanten
    └── calendar.tokens.ts         ← Design-Token-Konstanten
```

---

## Datenfluss

```
calendarId (Konfiguration / Hook-Stub)
        │
        ▼
  CalendarFeature
  mapSettingsToCalendarData(calendarId, settings)
        │   Zusammenführung von Props & Defaults
        ▼
  CalendarEmbed
  URLSearchParams → Google Calendar Embed-URL
        │
        ▼
  <iframe src="https://calendar.google.com/calendar/embed?..." />
```

> Aktuell liefert `useCalendar()` immer `undefined` – es wird der hartcodierte Standard-`calendarId` aus `calendar.mapper.ts` verwendet.

---

## Alle konfigurierbaren Props (`CalendarProps`)

| Prop            | Typ                                      | Standard          | Beschreibung                        |
| --------------- | ---------------------------------------- | ----------------- | ----------------------------------- |
| `calendarId`    | `string`                                 | Google-ID im Code | ID des einzubettenden Kalenders     |
| `src`           | `string`                                 | —                 | Überschreibt die gesamte URL        |
| `mode`          | `'AGENDA' \| 'MONTH' \| 'WEEK' \| 'DAY'` | `'AGENDA'`        | Kalenderansicht                     |
| `height`        | `number`                                 | `600`             | Höhe des iframes in px              |
| `tz`            | `string`                                 | `'Europe/Berlin'` | Zeitzone                            |
| `color`         | `string`                                 | `'#0b8043'`       | Akzentfarbe im Kalender             |
| `showCalendars` | `boolean`                                | `false`           | Mini-Kalender-Seitenleiste anzeigen |
| `showDate`      | `boolean`                                | `false`           | Datum in Kopfzeile anzeigen         |
| `showNav`       | `boolean`                                | `false`           | Navigation (vor/zurück) anzeigen    |
| `showTitle`     | `boolean`                                | `false`           | Kalender-Titel anzeigen             |
| `showTabs`      | `boolean`                                | `false`           | Ansichts-Tabs anzeigen              |
| `className`     | `string`                                 | Tailwind-Klassen  | Äußerer Container-Stil              |

---

## Anpassungsmöglichkeiten

### Feature ein-/ausschalten

```env
VITE_FEATURE_CALENDAR=true   # true = aktiv (Standard), false = deaktiviert
```

### Kalender-ID ändern

Die Kalender-ID wird in `calendar.mapper.ts` als Fallback gesetzt. Um den eigenen Vereinskalender einzubinden:

1. Google Kalender öffnen → Einstellungen → Kalender auswählen
2. Abschnitt „Kalender integrieren" → **Kalender-ID** kopieren (Format: `xxxxxx@group.calendar.google.com`)
3. `calendarId` in `calendar.mapper.ts` ersetzen **oder** per Props übergeben

### Ansicht & Darstellung

`CalendarFeature` akzeptiert alle `CalendarProps` direkt als Props und überschreibt damit die Defaults:

```tsx
<CalendarFeature mode="MONTH" height={800} showNav={true} />
```

---

## Verwendete UI-Komponenten

| Komponente                          | Herkunft                       | Beschreibung            |
| ----------------------------------- | ------------------------------ | ----------------------- |
| `CalendarEmbed`                     | `features/calendar/components` | Reines iframe-Rendering |
| — (kein Headless UI, kein Directus) | —                              | —                       |
