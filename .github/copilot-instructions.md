# Copilot Instructions - Portfolio Projekt

## Meta-Regel: Automatische Dokumentation

**Wenn ich generische Anforderungen oder Best Practices äußere, die für das gesamte Projekt gelten:**
- Diese automatisch in dieser Copilot-Instructions-Datei ergänzen
- Keine explizite Aufforderung nötig
- Regeln sinnvoll kategorisieren und strukturiert einfügen
- Vorhandene Regeln bei Bedarf aktualisieren statt duplizieren

---

**WICHTIG:** Dieser Code wird öffentlich zugänglich sein und dient als Referenz für Bewerbungen. Höchste Code-Qualität und Professionalität sind erforderlich.

## Code-Qualität & Best Practices

### Clean Code Prinzipien
- **Single Responsibility Principle:** Jede Component sollte nur EINE klar definierte Aufgabe haben
- **Component-Struktur:** Bei komplexen Components mit Sub-Elementen eigene Sub-Components erstellen
  - ✅ Beispiel: `List.vue` mit separater `ListItem.vue` Component
  - ❌ Beispiel: Gesamte List-Logik inkl. Items in einer Component
- **Lesbarkeit:** Code sollte selbsterklärend und gut dokumentiert sein
- **DRY (Don't Repeat Yourself):** Wiederholenden Code in wiederverwendbare Functions/Components auslagern

### TypeScript & Type Safety

**KEINE `any` Types verwenden!**

- Bei fehlenden Types → Neue Type Definitions im `/app/types/` Ordner erstellen
- Existierende Types wiederverwenden und pflegen
- Interfaces für komplexe Objekt-Strukturen definieren
- Enums für feste Wertesets nutzen

**Beispiel:**
```typescript
// ❌ Schlecht
const data: any = fetchData();

// ✅ Gut
interface UserData {
  name: string;
  email: string;
  role: "admin" | "user";
}
const data: UserData = fetchData();
```

## Design & Styling

### Zentrale Farbschemata
**ALLE Farbdefinitionen werden zentral verwaltet:**

1. **Primär:** [tailwind.config.ts](tailwind.config.ts) für Tailwind-basierte Farben
2. **Alternativ:** `/app/themes/` für Theme-spezifische Definitionen

**Niemals** inline Hex/RGB-Werte in Components verwenden!

```typescript
// ❌ Schlecht
<div class="bg-[#3B82F6]">

// ✅ Gut
<div class="bg-primary-500">
```

### Theme-Konsistenz
- Alle Farben, Abstände und Design-Tokens aus zentraler Konfiguration beziehen
- Bei neuen Farben → Erst in `tailwind.config.ts` oder Theme-Datei definieren
- Design-System konsistent durch gesamtes Projekt nutzen

## PrimeVue LLM Support

Für PrimeVue-Komponenten steht LLM-optimierte Dokumentation zur Verfügung:
- **LLM Docs:** https://primevue.org/llms/
- **Direct TXT:** https://primevue.org/llms/llms.txt

Bei Fragen zu PrimeVue-Komponenten diese Ressourcen nutzen für aktuelle API-Referenzen.

## Projekt-Struktur

```
app/
  ├── components/     # Vue Components (Single Responsibility)
  ├── composables/    # Wiederverwendbare Composition Functions
  ├── types/          # TypeScript Type Definitions
  ├── themes/         # Theme-Konfigurationen (falls nicht in tailwind.config)
  └── pages/          # Nuxt Pages
```