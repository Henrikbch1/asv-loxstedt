# Feature: Calendar (Kalender)

Bettet den Google Calendar des Vereins als iFrame ein.  
Die Kalender-ID und weitere Anzeigeoptionen werden über das CMS konfiguriert.

---

## Ordnerstruktur

```
calendar/
├── index.ts                    # Barrel-Exports
├── useCalendarQueries.ts       # TanStack Query Hooks
├── components/
│   ├── Calendar.tsx            # Container (Feature-Toggle + Einstellungen)
│   └── CalendarEmbed.tsx       # iFrame-Wrapper für Google Calendar
├── model/
│   ├── calendar.types.ts       # TypeScript-Typen (CalendarSettings, CalendarEmbedProps)
│   └── calendar.mapper.ts      # Mapping: CMS-Daten → CalendarSettings
└── styles/
    ├── calendar.classes.ts     # Tailwind-Klassen
    └── calendar.tokens.ts      # Design-Tokens (Höhe, Farben)
```

---

## Datenfluss

```
Directus CMS
  └── /items/features  (key: "calendar")  → Feature-Toggle
  └── /items/calendar_settings            → calendarId

cms.ts: getCalendarSettings() / getFeatureEnabled()
  └── useCalendarFeatureEnabledQuery()
  └── useCalendarSettingsQuery()
        └── select: mapRawSettingsToCalendarSettings()
              └── Calendar
                    └── CalendarEmbed (iFrame → calendar.google.com)
```

---

## Komponenten

### `Calendar`

Container-Komponente. Liest Feature-Toggle und Einstellungen aus dem CMS und rendert `CalendarEmbed`, sobald beides verfügbar ist. Gibt `null` zurück, solange das Feature deaktiviert ist oder die Einstellungen noch laden.

```tsx
<Calendar mode="AGENDA" />
```

Akzeptiert alle Props von `CalendarEmbedProps` außer `calendarId` (wird aus dem CMS bezogen).

### `CalendarEmbed`

Rendert das Google-Calendar-iFrame. Baut die Embed-URL aus den übergebenen Props zusammen.

| Prop            | Typ                                      | Standard                              | Beschreibung                                   |
| --------------- | ---------------------------------------- | ------------------------------------- | ---------------------------------------------- |
| `calendarId`    | `string`                                 | (interner Fallback)                   | Google Calendar ID                             |
| `src`           | `string`                                 | –                                     | Direkte iFrame-URL (überschreibt `calendarId`) |
| `mode`          | `'AGENDA' \| 'MONTH' \| 'WEEK' \| 'DAY'` | `'AGENDA'`                            | Ansichtsmodus                                  |
| `height`        | `number`                                 | `CALENDAR_TOKENS.sizes.defaultHeight` | Höhe des iFrame in px                          |
| `tz`            | `string`                                 | `'Europe/Berlin'`                     | Zeitzone                                       |
| `color`         | `string`                                 | `CALENDAR_TOKENS.colors.primary`      | Kalenderfarbe                                  |
| `showCalendars` | `boolean`                                | `false`                               | Kalender-Seitenleiste anzeigen                 |
| `showDate`      | `boolean`                                | `false`                               | Datum-Navigation anzeigen                      |
| `showNav`       | `boolean`                                | `false`                               | Vor-/Zurück-Navigation anzeigen                |
| `showTitle`     | `boolean`                                | `false`                               | Titel anzeigen                                 |
| `showTabs`      | `boolean`                                | `false`                               | Ansichts-Tabs anzeigen                         |
| `className`     | `string`                                 | –                                     | Überschreibt Standard-Wrapper-Klasse           |

---

## Typen

```ts
interface CalendarSettings {
  calendarId: string;
}

interface CalendarEmbedProps {
  calendarId?: string;
  src?: string;
  mode?: 'AGENDA' | 'MONTH' | 'WEEK' | 'DAY';
  height?: number;
  tz?: string;
  color?: string;
  showCalendars?: boolean;
  showDate?: boolean;
  showNav?: boolean;
  showTitle?: boolean;
  showTabs?: boolean;
  className?: string;
}
```

---

## Query Hooks

| Hook                             | Beschreibung                               |
| -------------------------------- | ------------------------------------------ |
| `useCalendarFeatureEnabledQuery` | Liest Feature-Toggle aus `/items/features` |
| `useCalendarSettingsQuery`       | Liest `calendar_settings` (Kalender-ID)    |

---

## Feature-Toggle

Das Feature kann im Directus-Backend unter **Features → calendar** deaktiviert werden.  
`useCalendarFeatureEnabledQuery` gibt `false` zurück, wenn der Eintrag fehlt oder deaktiviert ist.  
Als Fallback greift `featureConfig.calendar.enabled` (`.env`-Variable).
