# Feature: Board (Vorstand)

Zeigt die Vorstandsmitglieder des Vereins gruppiert nach Kategorie an.  
Die Darstellung erfolgt auf einer CMS-Seite mit dem Template `board`.

---

## Ordnerstruktur

```
board/
├── index.ts                    # Barrel-Exports
├── BoardPageView.tsx           # Seiten-Komponente (Entry Point)
├── useBoardQueries.ts          # TanStack Query Hooks
├── components/
│   ├── BoardCard.tsx           # Karte für eine einzelne Vorstandsrolle
│   └── BoardList.tsx           # Gruppierte Liste aller Rollen
├── model/
│   ├── board.types.ts          # TypeScript-Typen (BoardRole, BoardGroup)
│   └── board.mapper.ts         # Mapping: CMS-Daten → Domänentypen
└── styles/
    ├── board.classes.ts        # Tailwind-Klassen
    └── board.tokens.ts         # Design-Tokens
```

---

## Datenfluss

```
Directus CMS
  └── /items/features  (key: "board")     → Feature-Toggle
  └── /items/roles                        → Vorstandsrollen
        ├── person_link → /items/persons  → Name
        └── category    → /items/category → Kategoriename

cms.ts: getBoardRoles()
  └── useBoardRolesQuery()
        └── select: mapRoleToBoardRole() + groupBoardRoles()
              └── BoardPageView
                    └── BoardList
                          ├── Badge (Kategorie-Trenner)
                          └── BoardCard (je Rolle)
```

---

## Komponenten

### `BoardPageView`

Haupt-Einstiegspunkt. Wird von `CmsPageView` gerendert, wenn `page.template === 'board'`.

```tsx
<BoardPageView page={page} />
```

### `BoardList`

Rendert alle Gruppen. Zeigt `LoadingState` / `ErrorState` bei Ladezustand.

| Prop        | Typ            | Beschreibung              |
| ----------- | -------------- | ------------------------- |
| `groups`    | `BoardGroup[]` | Bereits gruppierte Rollen |
| `isLoading` | `boolean`      | Ladezustand               |
| `isError`   | `boolean`      | Fehlerzustand             |

### `BoardCard`

Karte für eine einzelne Rolle. Unterscheidet zwischen besetzt und `is_vacant`.

| Prop   | Typ         | Beschreibung   |
| ------ | ----------- | -------------- |
| `role` | `BoardRole` | Vorstandsrolle |

---

## Typen

```ts
interface BoardRole {
  id: string | number;
  sort: number | null;
  role: string; // z. B. "1. Vorsitzender"
  email: string | null;
  isVacant: boolean;
  category: Category | null;
  person: Person | null;
}

interface BoardGroup {
  category: Category | null;
  roles: BoardRole[];
}
```

---

## Feature-Toggle

Die Feature-Aktivierung läuft zweistufig:

1. **Build-Zeit** – Env-Variable `VITE_FEATURE_BOARD=true|false` (Fallback: `true`)
2. **Laufzeit** – Eintrag in der Directus-Collection `features` mit `key: "board"` und `enabled: true|false`

Ist das Feature deaktiviert, rendert `CmsPageView` die Standard-Seitenansicht statt des Vorstand-Templates.

---

## Directus-Setup

| Collection | Felder                                                                | Typ       |
| ---------- | --------------------------------------------------------------------- | --------- |
| `features` | `key`, `enabled`                                                      | vorhanden |
| `roles`    | `id`, `sort`, `role`, `email`, `is_vacant`, `category`, `person_link` | vorhanden |
| `persons`  | `id`, `firstname`, `lastname`                                         | vorhanden |
| `category` | `id`, `name`                                                          | vorhanden |

> Keine eigene `board_settings`-Collection nötig – es gibt keine konfigurierbaren Einstellungen analog zu `calendar_settings`.
