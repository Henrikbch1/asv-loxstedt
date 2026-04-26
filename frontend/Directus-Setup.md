# Directus – Was muss konfiguriert werden?

---

## 1. Seiten (`pages`) anlegen

Jede Seite, die über die Website erreichbar sein soll, braucht einen Eintrag.

### Pflichtfelder pro Seite

| Feld       | Beschreibung                                      |
| ---------- | ------------------------------------------------- |
| `title`    | Titel der Seite (Pflicht)                         |
| `slug`     | URL-Pfad (Pflicht, einzigartig, z. B. `vorstand`) |
| `status`   | Muss auf **`published`** stehen, sonst unsichtbar |
| `template` | Wähle das passende Template (s. u.)               |

### Verfügbare Templates

| Template    | Wann verwenden                                           |
| ----------- | -------------------------------------------------------- |
| `standard`  | Normale Inhaltsseite mit Rich-Text                       |
| `board`     | Vorstandsseite – zeigt automatisch alle `roles`-Einträge |
| `downloads` | Seite mit Datei-Downloads                                |
| `landing`   | Landingpage                                              |
| `legal`     | Rechtliche Seiten (alternativ zu global_settings)        |

### Unterseiten (Hierarchie)

- Feld `parent_page` auf eine bestehende Seite setzen
- Daraus entsteht die URL automatisch: `eltern-slug/kind-slug`
- Beispiel: Seite `geschichte` mit Parent `verein` → URL `/verein/geschichte`

### Besondere Pflichtseite: Startseite

Eine Seite mit Slug **`home`** muss existieren, damit der Startseiten-Inhalt angezeigt wird.
Ohne diese Seite erscheint auf `/home` nur der Kalender.

---

## 2. Navigation anlegen

Die Navigation steuert, **welche Links** im Header erscheinen, in welcher **Reihenfolge** und in welchen **Dropdowns**.

### Wichtige Regeln

- Ein Navigationseintrag **ohne verknüpfte Seite** (`page = leer`) wird vom Frontend ignoriert
- Der **„News"-Eintrag**: Lege ihn im CMS an, wenn du die Position kontrollieren willst. Falls er
  nicht vorhanden ist, fügt das Frontend ihn nur hinzu, sofern das News-Feature aktiviert ist.
- Die Navigation zeigt nur Einträge mit gültigem `page`-Bezug an

### Einfacher Top-Level-Link

| Feld      | Wert                                                |
| --------- | --------------------------------------------------- |
| `label`   | Angezeigter Text (z. B. `Verein`)                   |
| `page`    | Verknüpfte Seite auswählen                          |
| `sort`    | Zahl für die Reihenfolge (z. B. `10`, `20`, `30` …) |
| `parent`  | **leer lassen**                                     |
| `visible` | `true`                                              |

### Dropdown-Menü (Elternelement)

Ein Dropdown entsteht durch ein **Elternelement** mit Kindelementen:

**Schritt 1 – Elternelement anlegen:**

| Feld     | Wert                                                                        |
| -------- | --------------------------------------------------------------------------- |
| `label`  | Angezeigter Text (z. B. `Verein`)                                           |
| `page`   | Seite auswählen (z. B. Seite `verein`) – bestimmt den Klick-Link des Titels |
| `sort`   | Position in der Hauptnavigation                                             |
| `parent` | leer lassen                                                                 |

**Schritt 2 – Untereinträge anlegen:**

| Feld     | Wert                                          |
| -------- | --------------------------------------------- |
| `label`  | Angezeigter Text (z. B. `Geschichte`)         |
| `page`   | Verknüpfte Unterseite auswählen               |
| `sort`   | Position innerhalb des Dropdowns              |
| `parent` | **Das Elternelement aus Schritt 1 auswählen** |

---

## 3. Beispiel-Navigation für ASV Loxstedt

### Vorschlag Struktur

```
[sort 10]  Startseite      → Seite: home
[sort 20]  Verein          → Seite: verein
           ├─ Geschichte   → Seite: verein/geschichte
           └─ Satzung      → Seite: verein/satzung
[sort 30]  Abteilungen     → Seite: abteilungen
           ├─ Fußball      → Seite: abteilungen/fussball
           └─ Turnen       → Seite: abteilungen/turnen
[sort 40]  Vorstand        → Seite: vorstand        (Template: board)
[sort 50]  Kontakt         → Seite: kontakt
```

> **Hinweis:** „News" wird vom Frontend immer nach dem ersten Nav-Eintrag eingefügt.
> Den genauen Platz kann ein Entwickler in `AppLayout.tsx` anpassen.

---

## 4. `global_settings` befüllen

Einmalig ausfüllen – gilt für die gesamte Website:

| Feld              | Beispiel                                           |
| ----------------- | -------------------------------------------------- |
| `club_name`       | `ASV Loxstedt`                                     |
| `site_name`       | `ASV Loxstedt`                                     |
| `logo`            | Logo-Datei hochladen                               |
| `street`          | `Musterstraße 1`                                   |
| `postal_code`     | `27612`                                            |
| `city`            | `Loxstedt`                                         |
| `phone`           | `+49 4741 123456`                                  |
| `footer_note`     | `© 2025 ASV Loxstedt`                              |
| `imprint`         | Vollständigen Impressumstext eintragen (Rich Text) |
| `data_protection` | Datenschutzerklärung eintragen (Rich Text)         |

---

## 5. News anlegen

Unter `news` neue Beiträge erstellen:

| Feld       | Beschreibung                        |
| ---------- | ----------------------------------- |
| `title`    | Titel des Beitrags                  |
| `date`     | Veröffentlichungsdatum              |
| `text`     | Inhalt (Rich Text)                  |
| `image`    | Beitragsbild (optional)             |
| `category` | Kategorie auswählen (z. B. Fußball) |
| `status`   | Auf **`published`** setzen          |

---

## 6. Vorstand (`roles` + `persons`) pflegen

Wird auf der Seite mit Template `board` angezeigt.

**Schritt 1 – Person anlegen** (unter `persons`):

- Name, E-Mail, Foto, Kategorie

**Schritt 2 – Rolle anlegen** (unter `roles`):

- `person_link` → Person auswählen
- `sort` → Reihenfolge auf der Seite

---

## Checkliste für den Start

- [ ] `global_settings` vollständig ausfüllen
- [ ] Seite mit Slug `home` anlegen (Status: published)
- [ ] Weitere Seiten anlegen (Status: published)
- [ ] Navigation konfigurieren (sort, parent, page)
- [ ] News-Kategorien anlegen (unter `categories`)
- [ ] Erste News-Beiträge erstellen
- [ ] Personen und Rollen für Vorstandsseite anlegen
