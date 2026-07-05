"use client";

import { Badge } from "./Badge";
import type { BadgeVariant } from "./Badge";

const regionMap: Record<string, BadgeVariant> = {
  KR: "region-kr",
  TW: "region-tw",
  GLOBAL: "region-global",
};

const regionLabels: Record<string, string> = {
  KR: "Korea",
  TW: "Taiwan",
  GLOBAL: "Global",
};

interface RegionBadgeProps {
  region: "KR" | "TW" | "GLOBAL";
  className?: string;
}

export function RegionBadge({ region, className }: RegionBadgeProps) {
  const variant = regionMap[region] ?? "region-global";
  const label = regionLabels[region] ?? region;

  return (
    <Badge variant={variant} className={className}>
      {label}
    </Badge>
  );
}
