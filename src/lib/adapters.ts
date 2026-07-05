import type { ConfidenceStatus } from "@/components/ui/Badge";
import type { BadgeVariant } from "@/components/ui/Badge";
import type { BuildGuide } from "@/data/builds";

/**
 * Map BuildGuide.confidence (draft | community-consensus | verified)
 * to the UI-facing ConfidenceStatus type.
 */
export function toConfidenceStatus(
  confidence: BuildGuide["confidence"]
): ConfidenceStatus {
  if (confidence === "draft") return "experimental";
  if (confidence === "community-consensus") return "community-consensus";
  if (confidence === "verified") return "verified";
  return "experimental";
}

// ── Role Badge Mapping ─────────────────────────────────────────────

const roleBadgeMap: Record<string, BadgeVariant> = {
  tank: "role-tank",
  healer: "role-healer",
  dps: "role-dps",
  support: "role-support",
  control: "role-control",
};

export function getRoleBadgeVariant(role: string): BadgeVariant {
  return roleBadgeMap[role] ?? "default";
}
