# Daevas Guidance

Daevas Guidance – inoffizieller AION-2-Guide. Finde die passende AION-2-Klasse und vergleiche versionierte PvE-, PvP- und Ausrüstungs-Guides.

## Hinweis zu Tests

Kimi hat keine lokalen Installations-, Build-, Lint-, Typecheck-, Unit- oder Playwright-Tests ausgeführt.
Diese Prüfungen führt Lukas lokal aus.

## Voraussetzungen

- **Node.js 22.x** (siehe `.nvmrc`)
- npm (im Lieferumfang von Node.js enthalten)

## Installation

```bash
npm install
```

## Entwicklung

Starte den Entwicklungsserver:

```bash
npm run dev
```

Die Anwendung ist anschließend unter [http://localhost:3000](http://localhost:3000) erreichbar.

## Qualitätssicherung (lokal auszuführen)

```bash
# ESLint
npm run lint

# TypeScript-Typprüfung
npm run typecheck

# Unit-Tests (Vitest)
npm run test

# Produktions-Build
npm run build

# E2E-Tests (Playwright)
npx playwright test
```

## Deployment

1. Repository auf GitHub erstellen.
2. Projektordner `aion2-guide/` committen.
3. Repository in Vercel importieren.
4. Framework Preset: Next.js.
5. Build Command: `npm run build`.
6. Lokale Prüfungen führt Lukas aus.

## Hinweis zu Daten

- Alle deutschen Klassennamen sind **vorläufig** (`deConfirmed: false`).
- Build-Daten sind **Entwürfe** (`publicationStatus: "draft"`).
- Konkrete Skill-, Gear- und Rotationsdaten sind noch nicht geprüft (leere Arrays).
- Brawler hat `researchStatus: "experimental"`.
- Quellen sind mit echten URLs und `lastChecked: "2026-07-03"` hinterlegt.

## Asset-Herkunft

- `public/art/aion2-sgf2026-key-art.webp` = offizielles Creator-Kit-/Fan-Material (SGF 2026 Key Art), nicht als eigenes Bild ausgegeben
- `public/art/class-*.jpg`, `public/hero-bg.jpg`, `public/finder-hero.jpg`, `public/og-default.jpg` = KI-generiert
- `public/art/guide-*.jpg` = KI-generiert

Keine offiziellen AION-2-Screenshots, Logos, Icons oder UI-Elemente wurden kopiert.

## Haftungsausschluss

Dies ist ein **Fan-Projekt** und steht in keiner Verbindung zu NCSOFT oder den offiziellen AION-Entwicklern. Alle Marken und Inhalte sind Eigentum ihrer jeweiligen Besitzer.

## Datenbank

**Neon Serverless Postgres** über Vercel Integration.

### Schema anlegen

```bash
# Migration: Schema anlegen (ungepoolte Verbindung für DDL)
psql $DATABASE_URL_UNPOOLED -f src/lib/db/schema.sql
```

### Umgebungsvariablen

- `DATABASE_URL` – Runtime-Client (gepoolt, für App-Queries)
- `DATABASE_URL_UNPOOLED` – Nur fuer Migrationen/Schema-Änderungen
- `COMMUNITY_BUILDS_WRITE_ENABLED` – `true` aktiviert Build-Einreichung (default: `false`)

Lokal: `.env.local` anlegen (Vorlage in `.env.local.example`).
`.env.local` ist in `.gitignore` eingetragen und wird niemals committed.

### API

- `GET /api/community-builds?classId=brawler&contentType=solo-pve` – Liefert approved Builds (kombinierbar gefiltert)
- `POST /api/community-builds` – Speichert neuen Build als `pending`
  - Per `COMMUNITY_BUILDS_WRITE_ENABLED=false` deaktiviert bis das UI fertig ist
  - Validiert `classId` gegen `classes.ts` und `patchId` gegen `patches.ts`
  - `status` wird serverseitig auf `pending` gesetzt, nie vom Client übernommen

### Tabellen

- `community_builds` – Community-eingereichte Builds (id, class_id, title, author_name, content_type, region, patch_id, build_payload jsonb, calculated_stats jsonb, status, created_at, updated_at)

## Technologie-Stack

- [Next.js 15](https://nextjs.org/) mit App Router
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 3](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Three.js](https://threejs.org/) / React Three Fiber
- [Neon Serverless Postgres](https://neon.tech/) über `@neondatabase/serverless`
- [Vitest](https://vitest.dev/) für Unit-Tests
- [Playwright](https://playwright.dev/) für E2E-Tests
- [Zod](https://zod.dev/) für Content-Validierung

## Creator-Kit-Bild

Die Landing Page nutzt `public/art/aion2-sgf2026-key-art.webp`, abgeleitet aus dem offiziellen AION-2-SGF-2026-Key-Art. Dieses Asset ist nur für dieses inoffizielle Fanprojekt vorgesehen. Die Nutzung setzt voraus, dass die jeweils aktuellen Creator-Kit-/Fan-Site-Bedingungen von NCSOFT eingehalten werden.
