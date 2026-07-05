"use client";

import { Badge } from "./Badge";
import type { BadgeVariant } from "./Badge";

const statusMap: Record<string, BadgeVariant> = {
  official: "confidence-official",
  verified: "confidence-verified",
  "community-consensus": "confidence-community",
  experimental: "confidence-experimental",
  obsolete: "confidence-obsolete",
};

const statusLabels: Record<string, string> = {
  official: "Offiziell",
  verified: "Verifiziert",
  "community-consensus": "Community",
  experimental: "Experimentell",
  obsolete: "Veraltet",
};

interface ConfidenceBadgeProps {
  status: "official" | "verified" | "community-consensus" | "experimental" | "obsolete";
  className?: string;
}

export function ConfidenceBadge({ status, className }: ConfidenceBadgeProps) {
  const variant = statusMap[status] ?? "confidence-experimental";
  const label = statusLabels[status] ?? status;

  return (
    <Badge variant={variant} className={className}>
      {label}
    </Badge>
  );
}
