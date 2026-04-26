# Core und Features — Kurzdefinition

## Zweck

Dieses Dokument definiert, was zum stabilen "Core" des Projekts gehört und was als optionales Feature behandelt wird. Ziel: klare Erwartung an Stabilität, Verantwortlichkeiten und Einordnung in die Projektstruktur.

## Core (stabile Basis)

- CMS-Anbindung zu Directus
- Seiten (`pages`)
- Navigation
- Globale Einstellungen (`global_settings`)
- Footer
- Routing für normale Seiten
- Standard-Layout
- Rich-Text-Darstellung
- 404 / Loading / Error-State

## Warum

Diese Elemente bilden die minimale, wiederverwendbare Basis, auf der jede Seite und jedes Feature sicher aufbauen kann. Sie sind stabil, gut getestet und sollten API-/Datenstruktur-Änderungen so kapseln, dass andere Teile des Projekts nicht ständig angepasst werden müssen.

## Features (optionale/erweiterbare Teile)

- Spezifische CMS-Collections außerhalb der globalen Einstellungen
- Komponenten für Sonderseiten (z. B. Event-Widgets, Microsites)
- Erweiterte SEO- oder Analytics-Integrationen
- Experimentelle UI-Patterns oder alternative Layouts

### Optionale Module (Vorschlag)

Die folgenden Module sollten als einzeln aktivierbare/deaktivierbare Features behandelt werden. Sie gehören nicht zum stabilen Core, können aber bei Bedarf installiert oder aktiviert werden:

- News
- Kalender
- Vorstand (Team-/Kontaktverwaltung)
- Downloads (Dokumenten-/Datei-Listen)
- Landingpage-Module (flexible, wiederverwendbare Sektionen)    
- Kartenanzeige (z. B. Leaflet / Mapbox Integration)
- Veranstaltungen / Event-Listings
- Newsletter-Integration

Warum

Diese Module sind häufig projektspezifisch und verändern meist eigene Collections oder UI-Komponenten. Durch Trennung vom Core können sie unabhängig entwickelt, getestet und optional in Produktivsysteme übernommen werden.

Wo (Dokumentation & Projektstruktur)

- Dokumentation: Erweiterung dieses Dokuments mit Aktivierungs-/Installationshinweisen für jedes Modul.
- Projektstruktur: eigene Ordner unter `frontend/src/features/<feature-name>` mit klarer Schnittstelle zum Core (API-Adapter, Routes, optionaler Menüeintrag).

Empfehlung zur Aktivierung

- Verwende Feature-Flags oder eine Plugin-Registrierung in `global_settings`, damit Admins Features per Directus-UI oder Umgebungsvariablen aktivieren können.


## Wo (Dokumentation & später Projektstruktur)

- Dokumentation: dieses Dokument (docs/CORE_AND_FEATURES.md) als Referenz.
- Später: Ergänzung der Projektstruktur (Ordnerzuordnung, Architekturdiagramm).

## Vorschlag – Einordnung in frontend-Struktur

- frontend/src/pages : Seiten (Core)
- frontend/src/components/layout : Standard-Layout, Footer, Navigation (Core)
- frontend/src/components/ui : UI-Bausteine (Features + Core-klein)
- frontend/src/api : Directus-Adapter / CMS-Anbindung (Core)
- frontend/src/config : globale Einstellungen / Konstanten (Core)
- frontend/src/components/richtext : Rich-Text-Renderer (Core)
- frontend/src/routes : Routing-Definitionen (Core)
- frontend/src/pages/NotFound.tsx / Loading / ErrorBoundary : Statusseiten (Core)

## Empfehlungen

- Alle Core-Module versionieren und dokumentieren (CHANGELOG/README-Abschnitt).
- Für Features: Feature-Flags oder eigene Ordner, klar als optional markieren.
- Beim Hinzufügen neuer Collections in Directus: zuerst prüfen, ob sie in global_settings gehören oder Feature-spezifisch sind.

## Nächste Schritte

1. Review durch Team (Akzeptanz: Änderungen am Core bedürfen Review).
2. Bei Zustimmung: kurze Mapping-PR, die Ordner/Dateien anlegt und Grund-README ergänzt.
