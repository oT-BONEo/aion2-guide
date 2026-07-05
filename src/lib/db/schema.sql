-- AION 2 Guide-Hub – Datenbankschema
-- Fuer Neon Serverless Postgres
--
-- Ausfuehrung: psql $DATABASE_URL_UNPOOLED -f src/lib/db/schema.sql
-- (DATABASE_URL_UNPOOLED fuer Migrationen, DATABASE_URL fuer Runtime)

-- UUID-Erzeugung sicherstellen
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- community_builds: Vom Community eingereichte Builds
CREATE TABLE IF NOT EXISTS community_builds (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id      text NOT NULL,
  title         text NOT NULL,
  author_name   text NOT NULL,
  content_type  text NOT NULL,
  region        text NOT NULL,
  patch_id      text NOT NULL,
  build_payload jsonb NOT NULL DEFAULT '{}',
  calculated_stats jsonb,
  status        text NOT NULL DEFAULT 'pending'
                CHECK (status IN ('pending', 'approved', 'rejected', 'archived')),
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

-- Index fuer hauefige Queries
CREATE INDEX IF NOT EXISTS idx_community_builds_class_status
  ON community_builds (class_id, status);

CREATE INDEX IF NOT EXISTS idx_community_builds_status_created
  ON community_builds (status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_community_builds_region
  ON community_builds (region);

-- Trigger-Funktion: updated_at automatisch aktualisieren
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger nur anlegen wenn noch nicht vorhanden (robuster als IF NOT EXISTS)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_community_builds_updated_at'
  ) THEN
    CREATE TRIGGER update_community_builds_updated_at
      BEFORE UPDATE ON community_builds
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END;
$$;
