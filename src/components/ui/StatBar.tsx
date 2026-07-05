"use client";

import { cn } from "@/lib/utils";

const statColors: Record<number, string> = {
  1: "bg-[var(--stat-1)]",
  2: "bg-[var(--stat-2)]",
  3: "bg-[var(--stat-3)]",
  4: "bg-[var(--stat-4)]",
  5: "bg-[var(--stat-5)]",
};

const statLabels: Record<number, string> = {
  1: "Sehr niedrig",
  2: "Niedrig",
  3: "Mittel",
  4: "Hoch",
  5: "Sehr hoch",
};

interface StatBarProps {
  value: number;
  label?: string;
  showLabel?: boolean;
  className?: string;
}

export function StatBar({
  value,
  label,
  showLabel = false,
  className,
}: StatBarProps) {
  const clampedValue = Math.min(5, Math.max(1, Math.round(value)));

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <div className="flex items-center justify-between">
          <span className="text-xs text-[var(--text-secondary)]">{label}</span>
          {showLabel && (
            <span className="text-xs text-[var(--text-muted)]">
              {statLabels[clampedValue]}
            </span>
          )}
        </div>
      )}
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((segment) => (
          <div
            key={segment}
            className={cn(
              "h-2 flex-1 rounded-sm transition-colors duration-300",
              segment <= clampedValue
                ? statColors[clampedValue]
                : "bg-[var(--border-subtle)]"
            )}
          />
        ))}
      </div>
    </div>
  );
}
