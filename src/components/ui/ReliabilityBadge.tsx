"use client";

import { Badge } from "./Badge";
import type { BadgeVariant } from "./Badge";

type Reliability = 1 | 2 | 3 | 4 | 5;

const labels: Record<Reliability, string> = {
  5: "Offizielle Quelle (5/5)",
  4: "Hohe Quellenstärke (4/5)",
  3: "Community-Quelle (3/5)",
  2: "Einzelhinweis (2/5)",
  1: "Niedrige Quellenstärke (1/5)",
};

function variantForReliability(reliability: Reliability): BadgeVariant {
  if (reliability >= 5) return "confidence-official";
  if (reliability >= 4) return "confidence-community";
  if (reliability >= 2) return "confidence-experimental";
  return "confidence-obsolete";
}

interface ReliabilityBadgeProps {
  reliability: Reliability;
  className?: string;
}

export function ReliabilityBadge({
  reliability,
  className,
}: ReliabilityBadgeProps) {
  return (
    <Badge variant={variantForReliability(reliability)} className={className}>
      {labels[reliability]}
    </Badge>
  );
}
