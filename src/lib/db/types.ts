// TypeScript-Typen fuer community_builds
// Status-Enum: pending, approved, rejected, archived

export type CommunityBuildStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "archived";

export type CommunityBuildContentType =
  | "solo-pve"
  | "group-pve"
  | "solo-pvp"
  | "team-pvp"
  | "mass-pvp"
  | "leveling";

export type CommunityBuildRegion = "KR" | "TW" | "GLOBAL";

export interface CommunityBuild {
  id: string; // uuid
  classId: string;
  title: string;
  authorName: string;
  contentType: CommunityBuildContentType;
  region: CommunityBuildRegion;
  patchId: string; // z.B. "kr-2026-07-01-chapter-1"
  buildPayload: Record<string, unknown>; // freies JSON fuer Build-Daten
  calculatedStats: Record<string, unknown> | null; // optional berechnete Werte
  status: CommunityBuildStatus;
  createdAt: string; // ISO-String
  updatedAt: string; // ISO-String
}

// Input fuer neue Build-Einreichungen (POST)
export interface CommunityBuildInput {
  classId: string;
  title: string;
  authorName: string;
  contentType: CommunityBuildContentType;
  region: CommunityBuildRegion;
  patchId: string;
  buildPayload: Record<string, unknown>;
  calculatedStats?: Record<string, unknown>;
}

// Query-Parameter fuer GET
export interface CommunityBuildQuery {
  classId?: string;
  region?: CommunityBuildRegion;
  contentType?: CommunityBuildContentType;
  status?: CommunityBuildStatus;
  limit?: number;
  offset?: number;
}
