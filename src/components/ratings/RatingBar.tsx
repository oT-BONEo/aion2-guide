"use client";

import { cn } from "@/lib/utils";

interface RatingBarProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
}

const sizeMap = {
  sm: "h-1.5",
  md: "h-2",
  lg: "h-2.5",
};

const colorMap: Record<number, string> = {
  1: "bg-[var(--accent-danger)]",
  2: "bg-[var(--accent-warning)]",
  3: "bg-[var(--accent-elyos)]",
  4: "bg-[var(--accent-success)]",
  5: "bg-[var(--accent-success)]",
};

export function RatingBar({
  value,
  max = 5,
  size = "md",
  showValue = false,
  className,
}: RatingBarProps) {
  const clamped = Math.min(max, Math.max(0, Math.round(value)));
  const pct = (clamped / max) * 100;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("flex-1 rounded-full bg-[var(--border-subtle)]", sizeMap[size])}>
        <div
          className={cn("rounded-full transition-all duration-300", sizeMap[size], colorMap[clamped] || colorMap[3])}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showValue && (
        <span className="text-xs font-semibold text-[var(--text-secondary)] w-6 text-right">
          {clamped}/{max}
        </span>
      )}
    </div>
  );
}
