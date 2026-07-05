// Neon Serverless Postgres – Runtime-Client (lazy initialisiert)
// DATABASE_URL wird aus Vercel-Umgebungsvariablen gelesen.
// Kein Connection-String wird im Code, README oder Tests als echter Wert hinterlegt.

import { neon } from "@neondatabase/serverless";

let client: ReturnType<typeof neon> | null = null;

export function getSql() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not defined. Set it in Vercel environment variables or .env.local."
    );
  }

  if (!client) {
    client = neon(connectionString);
  }

  return client;
}
