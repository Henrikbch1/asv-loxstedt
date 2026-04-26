# Inhaltsübersicht – ASV Loxstedt Website

## Routen

| URL            | Beschreibung              | Typ                                                 |
| -------------- | ------------------------- | --------------------------------------------------- |
| `/`            | Weiterleitung auf `/home` | Redirect                                            |
| `/home`        | Startseite                | Dynamisch (CMS-Seite, Slug `home`)                  |
| `/news`        | News-Liste                | Dynamisch (CMS – News-Einträge)                     |
| `/news/:id`    | News-Detailseite          | Dynamisch (CMS – einzelner News-Eintrag)            |
| `/impressum`   | Impressum                 | Dynamisch (CMS – `global_settings.imprint`)         |
| `/datenschutz` | Datenschutzerklärung      | Dynamisch (CMS – `global_settings.data_protection`) |
| `/*`           | Alle weiteren Pfade       | Dynamisch (CMS-Seiten per Slug, z. B. `/vorstand`)  |

---

## Statische Inhalte (im Code fest verankert)

Diese Inhalte können **nicht** über das CMS geändert werden:

| Bereich                   | Details                                                                                                                  |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Google-Kalender-Iframe    | Kalender-URL inkl. eingebetteter Kalender-ID (`AppLayout.tsx`)                                                           |
| News-Pagination           | 5 Einträge pro Seite (`constants.ts`)                                                                                    |
| „News"-Navigationseintrag | Normalerweise im CMS anlegen; falls nicht vorhanden fügt das Frontend ihn nur hinzu, wenn das News-Feature aktiviert ist |
| Fehler- und Ladetext      | z. B. „Die Seite konnte nicht geladen werden"                                                                            |
| Google Maps Konfiguration | Zoom, Kartentyp, Sprache im Footer (`footer.mapper.ts`)                                                                  |

---

## Dynamische Inhalte (über das CMS pflegbar)

### `global_settings` (Singleton)

Einmalige Konfiguration, gilt für die gesamte Website:

| Feld                            | Wo sichtbar                        |
| ------------------------------- | ---------------------------------- |
| `site_name` / `club_name`       | Browser-Titel, Footer              |
| `logo`                          | Header                             |
| `street`, `postal_code`, `city` | Footer (Adresse + Google Maps)     |
| `phone`                         | Footer                             |
| `footer_note`                   | Footer (z. B. Copyright-Text)      |
| `imprint` (Rich Text)           | Impressum-Seite (`/impressum`)     |
| `data_protection` (Rich Text)   | Datenschutz-Seite (`/datenschutz`) |

### `pages` (CMS-Seiten)

Beliebig viele Seiten mit hierarchischer Struktur:

| Feld                        | Beschreibung                              |
| --------------------------- | ----------------------------------------- |
| `title`                     | Seitentitel (auch Browser-Tab)            |
| `slug`                      | URL-Pfad (z. B. `vorstand` → `/vorstand`) |
| `navigation_title`          | Alternativtitel für die Navigation        |
| `content` (Rich Text)       | Hauptinhalt der Seite                     |
| `intro`                     | Einleitungstext                           |
| `featured_image`            | Headerbild                                |
| `hero_title` / `hero_text`  | Hero-Bereich oben auf der Seite           |
| `show_title` / `show_intro` | Anzeigesteuerung                          |
| `template`                  | `default` oder `board` (Vorstandsseite)   |
| `parent_page`               | Elternseite für Unterseiten               |

> **Pflichtseite:** Eine Seite mit Slug `home` muss existieren – das ist die Startseite.

### `navigation`

Definiert die Hauptnavigation im Header:

| Feld     | Beschreibung                                |
| -------- | ------------------------------------------- |
| `label`  | Angezeigter Linktext                        |
| `page`   | Verknüpfte CMS-Seite (liefert den URL-Pfad) |
| `sort`   | Reihenfolge in der Navigation               |
| `parent` | Elternelement für Dropdown-Untermenüs       |

> Der „News"-Eintrag sollte im CMS angelegt werden, wenn die Position kontrolliert werden soll. Falls er nicht existiert, fügt das Frontend ihn nur hinzu, sofern das News-Feature aktiviert ist.

### `news`

Nachrichtenbeiträge:

| Feld               | Beschreibung                             |
| ------------------ | ---------------------------------------- |
| `title`            | Titel des Beitrags                       |
| `date`             | Veröffentlichungsdatum                   |
| `text` (Rich Text) | Inhalt                                   |
| `image`            | Beitragsbild                             |
| `category.name`    | Kategorie (z. B. „Fußball", „Allgemein") |

### `roles` (Vorstand)

Wird auf Seiten mit Template `board` angezeigt:

| Feld          | Beschreibung                                      |
| ------------- | ------------------------------------------------- |
| `sort`        | Reihenfolge der Anzeige                           |
| `person_link` | Verknüpfte Person (Name, E-Mail, Foto, Kategorie) |

---

## Empfohlene Pflegemaßnahmen

| Priorität | Inhalt                                               | Turnus                    |
| --------- | ---------------------------------------------------- | ------------------------- |
| Hoch      | News-Beiträge erstellen / aktualisieren              | Laufend                   |
| Hoch      | Vorstandsmitglieder (`roles`) aktuell halten         | Bei Änderungen            |
| Mittel    | Startseite (`home`) inhaltlich aktuell halten        | Saisonal                  |
| Mittel    | Impressum & Datenschutz in `global_settings` prüfen  | Jährlich / bei Änderungen |
| Mittel    | Navigation anpassen wenn neue Seiten erstellt werden | Bei Bedarf                |
| Niedrig   | Kontaktdaten / Adresse in `global_settings` prüfen   | Bei Änderungen            |
| Niedrig   | Bilder auf CMS-Seiten aktualisieren                  | Bei Bedarf                |
