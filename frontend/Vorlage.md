# Feature-Package Vorlage

Anhand des `footer`-Features dokumentierte Konvention für feature-basierte Pakete unter `src/features/<feature>/`.

---

## Verzeichnisstruktur

```
src/features/<feature>/
├── index.ts                        # Public API – nur hier wird exportiert
├── components/
│   ├── Feature.tsx                  # Haupt-Komponente (Orchestrierung)
│   ├── FeatureTeil1.tsx             # Sub-Komponente
│   └── FeatureTeil2.tsx             # Sub-Komponente
├── model/
│   ├── <feature>.types.ts           # Typen & Interfaces
│   └── <feature>.mapper.ts          # Daten-Transformation / Mapping-Logik
└── styles/
    ├── <feature>.tokens.ts          # Design-Tokens (Farben, Abstände, Größen)
    └── <feature>.classes.ts         # Tailwind-Klassengruppen
```

---

## Ebenen im Detail

### 1. `index.ts` – Public API

Einziger Einstiegspunkt für Konsumenten. Nur hier werden Komponenten, Typen und Mapper exportiert.

```ts
export { Footer } from './components/Footer';
export { mapGlobalSettingsToFooterData } from './model/footer.mapper';
export type { FooterData, FooterLegalLink } from './model/footer.types';
```

**Regeln:**

- Alle internen Dateien importieren sich gegenseitig über relative Pfade.
- Externe Konsumenten importieren **ausschließlich** über den `index.ts`.

---

### 2. `components/` – UI-Komponenten

| Datei              | Rolle                                                                                        |
| ------------------ | -------------------------------------------------------------------------------------------- |
| `Feature.tsx`      | Haupt-Komponente: empfängt rohe Daten, ruft den Mapper auf und orchestriert Sub-Komponenten. |
| `FeatureTeil*.tsx` | Reine Darstellungs-Komponenten: empfangen bereits gemappte Props.                            |

**Konventionen:**

- Jede Komponente hat ein eigenes `interface …Props`.
- Styling erfolgt über die Klassen aus `styles/`, nicht inline.
- Kein eigener Daten-Fetch – Daten kommen via Props.

```tsx
// Beispiel: Haupt-Komponente (Footer.tsx)
interface FooterProps {
  settings?: GlobalSettings | null;
  legalLinks?: FooterLegalLink[] | null;
}

export function Footer({ settings, legalLinks }: FooterProps) {
  const data = mapGlobalSettingsToFooterData(settings);
  return (
    <footer className={footerClasses.layout.root}>
      <FooterContact displayName={data?.displayName} /* … */ />
      <FooterMap mapsEmbedUrl={data?.mapsEmbedUrl} /* … */ />
      <FooterLegal displayName={settings?.site_name} legalLinks={legalLinks} />
    </footer>
  );
}
```

---

### 3. `model/` – Typen & Mapper

#### `<feature>.types.ts`

Domain-Typen, die das Feature intern und extern nutzt.

```ts
export interface FooterData {
  displayName: string;
  addressLines: string[];
  phone?: string;
  mapsEmbedUrl?: string;
}

export interface FooterLegalLink {
  label: string;
  to: string;
}
```

#### `<feature>.mapper.ts`

Transformiert externe Datenstrukturen (z. B. CMS-Antworten) in die Feature-eigenen Typen.

```ts
export function mapGlobalSettingsToFooterData(
  settings?: GlobalSettings | null,
): FooterData | null {
  if (!settings) return null;
  // … Mapping-Logik
  return { displayName, addressLines, phone, mapsEmbedUrl };
}
```

**Regeln:**

- Pure Functions – kein State, keine Side-Effects.
- Rückgabe ist `null`, wenn die Eingabe fehlt.

---

### 4. `styles/` – Design-Tokens & Klassen

#### Ziel

Die `styles/`-Ebene hält alle designrelevanten Konstanten und Tailwind-Klassen, die Komponenten konsistent, testbar und themenfähig machen. Styles sind deklarativ — keine Inline-Styles oder hardcodierte Klassen in Komponenten.

#### `<feature>.tokens.ts`

Enthält primitive, projektweit stabile Werte (Farben, Abstände, Breakpoints, maxWidths, Shadows, z-index-Werte etc.). Tokens sind reine Werte, keine Klassen.

Beispiele:

```ts
export const FOOTER_TOKENS = {
  layout: { maxWidth: '1120px' },
  spacing: { small: '8px', md: '16px' },
  colors: { primary: '#0b69ff', neutral: '#111827' },
} as const;
```

Regeln für Tokens:

- Primitive Werte only — keine CSS-Strings mit Tailwind-Klassen.
- Namen sprechend, hierarchisch gruppiert (`layout`, `spacing`, `colors`).
- Export immer `as const` für Typ-Sicherheit.

#### `<feature>.classes.ts`

Sammlung von Tailwind-Klassen-Strings, logisch gruppiert nach UI-Bereichen (z. B. `layout`, `contact`, `legal`). Komponenten importieren genau die benötigten Gruppen.

Beispiel:

```ts
export const layoutClasses = {
  root: 'bg-white py-8',
  container: 'max-w-[1120px] mx-auto px-4',
} as const;
export const contactClasses = {
  panel: 'space-y-2',
  phone: 'text-sm text-gray-700',
} as const;

export const footerClasses = {
  layout: layoutClasses,
  contact: contactClasses,
} as const;
```

Regeln für Klassen:

- Keine Inline-Styles in Komponenten — nutze die gruppierten Klassen.
- Gruppiere Klassen nach semantischen Bereichen, nicht nach Seiten/Views.
- Verwende Utilities und kleine, zusammensetzbare Gruppen (ähnlich zu BEM, aber mit Tailwind-Prinzip).
- `as const` für Typ-Sicherheit.
- Falls eine Gruppe > ~15 Keys hat, splitte in mehrere Dateien und re-exportiere sie.

Best Practices

- Accessibility: Achte auf ausreichende Kontrastwerte in `tokens.colors` und auf fokusbare Elemente (`focus:outline-none` vermeiden ohne ersatz).
- Responsiveness: Definiere responsive Klassen in `classes` oder benenne Varianten (`root`, `rootMd`, `rootLg`) statt inline breakpoints in Komponenten.
- Theming: Halte Tokens primär; Wechselnde Themes sollten nur Tokens ersetzen — nicht die Komponentenstruktur.
- Wiederverwendbarkeit: Bevor du neue Klassen erstellst, prüfe bestehende `styles/*` auf Wiederverwendung.
- Testing: Da Tokens und Klassen reine Daten sind, lassen sie sich leicht in Snapshot- oder Unit-Tests prüfen.

Zusammenfassung

Die `styles/`-Ebene soll Designentscheidungen an einem Ort zentralisieren, Komponenten von Styling-Logik entkoppeln und die Wartbarkeit erhöhen. Halte Tokens klein und semantisch; gruppiere Klassen pragmatisch und typsicher.

---

## Checkliste für ein neues Feature

1. **Ordner anlegen:** `src/features/<feature>/`
2. **Typen definieren:** `model/<feature>.types.ts`
3. **Mapper schreiben:** `model/<feature>.mapper.ts`
4. **Tokens festlegen:** `styles/<feature>.tokens.ts`
5. **Klassen gruppieren:** `styles/<feature>.classes.ts`
6. **Komponenten bauen:** `components/` – Haupt + Sub-Komponenten
7. **Public API exportieren:** `index.ts` – nur das, was außerhalb gebraucht wird
