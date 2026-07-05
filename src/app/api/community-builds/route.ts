// API-Route: /api/community-builds
// GET:  Liest approved Builds (kombinierbar gefiltert nach classId, region, contentType)
// POST: Speichert neuen Build als pending (per Feature-Flag deaktivierbar)

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { classes } from "@/data/classes";
import { patches } from "@/data/patches";
import type { CommunityBuild } from "@/lib/db/types";

// ── Zod-Schema fuer POST-Input ───────────────────────────────────

const communityBuildInputSchema = z.object({
  classId: z.string().min(1).max(64),
  title: z.string().min(3).max(80),
  authorName: z.string().min(2).max(40),
  contentType: z.enum([
    "solo-pve",
    "group-pve",
    "solo-pvp",
    "team-pvp",
    "mass-pvp",
    "leveling",
  ]),
  region: z.enum(["KR", "TW", "GLOBAL"]),
  patchId: z.string().min(1).max(80),
  buildPayload: z.record(z.unknown()).default({}),
  calculatedStats: z.record(z.unknown()).optional(),
});

// ── GET: Approved Builds abfragen (kombinierbare Filter) ─────────

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const classId = searchParams.get("classId") || undefined;
  const region = searchParams.get("region") || undefined;
  const contentType = searchParams.get("contentType") || undefined;

  // Robustes limit/offset Parsing (Schutz gegen NaN)
  const rawLimit = Number.parseInt(searchParams.get("limit") ?? "20", 10);
  const limit = Number.isFinite(rawLimit)
    ? Math.min(Math.max(rawLimit, 1), 100)
    : 20;

  const rawOffset = Number.parseInt(searchParams.get("offset") ?? "0", 10);
  const offset = Number.isFinite(rawOffset) ? Math.max(rawOffset, 0) : 0;

  // WHERE-Bedingungen dynamisch aufbauen
  const conditions: string[] = ["status = 'approved'"];
  const params: (string | number)[] = [];

  if (classId) {
    params.push(classId);
    conditions.push(`class_id = $${params.length}`);
  }
  if (region) {
    params.push(region);
    conditions.push(`region = $${params.length}`);
  }
  if (contentType) {
    params.push(contentType);
    conditions.push(`content_type = $${params.length}`);
  }

  params.push(limit, offset);

  const whereClause = conditions.join(" AND ");
  const limitIdx = params.length - 1;
  const offsetIdx = params.length;

  try {
    const sql = getSql();

    const query = `
      SELECT id, class_id AS "classId", title, author_name AS "authorName",
             content_type AS "contentType", region, patch_id AS "patchId",
             build_payload AS "buildPayload", calculated_stats AS "calculatedStats",
             status, created_at AS "createdAt", updated_at AS "updatedAt"
      FROM community_builds
      WHERE ${whereClause}
      ORDER BY created_at DESC
      LIMIT $${limitIdx} OFFSET $${offsetIdx}
    `;

    const rows = await sql.query(query, params);
    return NextResponse.json({ builds: rows as CommunityBuild[] });
  } catch (error) {
    console.error("GET /api/community-builds error:", error);
    return NextResponse.json(
      { error: "DATABASE_UNAVAILABLE" },
      { status: 500 }
    );
  }
}

// ── POST: Neuen Build einreichen (als pending) ───────────────────

export async function POST(request: NextRequest) {
  // Feature-Flag: Schreibzugriff deaktiviert?
  if (process.env.COMMUNITY_BUILDS_WRITE_ENABLED !== "true") {
    return NextResponse.json(
      { error: "COMMUNITY_SUBMISSIONS_DISABLED" },
      { status: 403 }
    );
  }

  try {
    const rawBody = await request.json();

    // Zod-Validierung
    const parseResult = communityBuildInputSchema.safeParse(rawBody);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "INVALID_BUILD_INPUT", details: parseResult.error.format() },
        { status: 400 }
      );
    }

    const body = parseResult.data;

    // classId muss in classes.ts existieren
    const classExists = classes.some((c) => c.id === body.classId);
    if (!classExists) {
      return NextResponse.json(
        { error: "INVALID_BUILD_INPUT", field: "classId" },
        { status: 400 }
      );
    }

    // patchId muss in patches.ts existieren
    const patchExists = patches.some((p) => p.id === body.patchId);
    if (!patchExists) {
      return NextResponse.json(
        { error: "INVALID_BUILD_INPUT", field: "patchId" },
        { status: 400 }
      );
    }

    const sql = getSql();

    const query = `
      INSERT INTO community_builds
        (class_id, title, author_name, content_type, region, patch_id, build_payload, calculated_stats, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'pending')
      RETURNING id, class_id AS "classId", title, author_name AS "authorName",
                content_type AS "contentType", region, patch_id AS "patchId",
                build_payload AS "buildPayload", calculated_stats AS "calculatedStats",
                status, created_at AS "createdAt", updated_at AS "updatedAt"
    `;

    const insertParams = [
      body.classId,
      body.title,
      body.authorName,
      body.contentType,
      body.region,
      body.patchId,
      JSON.stringify(body.buildPayload),
      JSON.stringify(body.calculatedStats ?? {}),
    ];

    const rows = await sql.query(query, insertParams);
    const build = (rows as CommunityBuild[])[0];

    return NextResponse.json({ build }, { status: 201 });
  } catch (error) {
    console.error("POST /api/community-builds error:", error);
    return NextResponse.json(
      { error: "DATABASE_UNAVAILABLE" },
      { status: 500 }
    );
  }
}
