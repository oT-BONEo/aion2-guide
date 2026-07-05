"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ConfidenceStatus =
  | "official"
  | "verified"
  | "community-consensus"
  | "experimental"
  | "obsolete";

export type BadgeVariant =
  // Confidence levels
  | "confidence-official"
  | "confidence-verified"
  | "confidence-community"
  | "confidence-experimental"
  | "confidence-obsolete"
  // Regions
  | "region-kr"
  | "region-tw"
  | "region-global"
  // Roles
  | "role-tank"
  | "role-healer"
  | "role-dps"
  | "role-support"
  | "role-control"
  // Status
  | "status-live"
  | "status-announced"
  | "status-archived"
  // Default
  | "default"
  | "ghost";

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  // Confidence
  "confidence-official":
    "bg-[var(--confidence-official)]/15 text-[var(--confidence-official)] border-[var(--confidence-official)]/30",
  "confidence-verified":
    "bg-[var(--confidence-verified)]/15 text-[var(--confidence-verified)] border-[var(--confidence-verified)]/30",
  "confidence-community":
    "bg-[var(--confidence-community)]/15 text-[var(--confidence-community)] border-[var(--confidence-community)]/30",
  "confidence-experimental":
    "bg-[var(--confidence-experimental)]/15 text-[var(--confidence-experimental)] border-[var(--confidence-experimental)]/30",
  "confidence-obsolete":
    "bg-[var(--confidence-obsolete)]/15 text-[var(--confidence-obsolete)] border-[var(--confidence-obsolete)]/30",
  // Regions
  "region-kr":
    "bg-[var(--region-kr)]/15 text-[var(--region-kr)] border-[var(--region-kr)]/30",
  "region-tw":
    "bg-[var(--region-tw)]/15 text-[var(--region-tw)] border-[var(--region-tw)]/30",
  "region-global":
    "bg-[var(--region-global)]/15 text-[var(--region-global)] border-[var(--region-global)]/30",
  // Roles
  "role-tank":
    "bg-[var(--role-tank)]/15 text-[var(--role-tank)] border-[var(--role-tank)]/30",
  "role-healer":
    "bg-[var(--role-healer)]/15 text-[var(--role-healer)] border-[var(--role-healer)]/30",
  "role-dps":
    "bg-[var(--role-dps)]/15 text-[var(--role-dps)] border-[var(--role-dps)]/30",
  "role-support":
    "bg-[var(--role-support)]/15 text-[var(--role-support)] border-[var(--role-support)]/30",
  "role-control":
    "bg-[var(--role-control)]/15 text-[var(--role-control)] border-[var(--role-control)]/30",
  // Status
  "status-live":
    "bg-[var(--status-live)]/15 text-[var(--status-live)] border-[var(--status-live)]/30",
  "status-announced":
    "bg-[var(--status-announced)]/15 text-[var(--status-announced)] border-[var(--status-announced)]/30",
  "status-archived":
    "bg-[var(--status-archived)]/15 text-[var(--status-archived)] border-[var(--status-archived)]/30",
  // Default
  default:
    "bg-[var(--surface-elevated)] text-[var(--text-secondary)] border-[var(--border-subtle)]",
  ghost:
    "bg-transparent text-[var(--text-muted)] border-transparent",
};

export function Badge({
  variant = "default",
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full border",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
