"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, AlertTriangle } from "lucide-react";
import { StatBar } from "@/components/ui/StatBar";
import { ConfidenceBadge } from "@/components/ui/ConfidenceBadge";
import { cn } from "@/lib/utils";

export interface MatchReason {
  text: string;
}

export interface MatchResult {
  classSlug: string;
  classNameDe: string;
  classNameEn: string;
  matchPercentage: number;
  reasons: MatchReason[];
  weakness: string;
  keyStats: { label: string; value: number }[];
  researchStatus: "official" | "verified" | "community-consensus" | "experimental" | "obsolete";
}

interface ResultCardProps {
  result: MatchResult;
  rank: number;
}

const rankColors: Record<number, string> = {
  1: "text-[#F0C75E]",
  2: "text-[var(--text-secondary)]",
  3: "text-[#CD7F32]",
};

export function ResultCard({ result, rank }: ResultCardProps) {
  return (
    <motion.div
      data-testid="result-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: rank * 0.1 }}
      className={cn(
        "rounded-xl border bg-[var(--surface-card)] overflow-hidden",
        rank === 1
          ? "border-[#F0C75E]/30"
          : "border-[var(--border-subtle)]"
      )}
    >
      {/* Header with match percentage */}
      <div className="p-5 pb-0">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "text-3xl font-bold font-serif",
                  rankColors[rank] ?? "text-[var(--text-primary)]"
                )}
              >
                {result.matchPercentage}%
              </span>
              <span className="text-xs text-[var(--text-muted)] uppercase tracking-wide">
                Match
              </span>
            </div>
            <Link
              href={`/klassen/${result.classSlug}/`}
              className="mt-2 block group"
            >
              <h3 className="text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-aether)] transition-colors font-serif">
                {result.classNameDe}
              </h3>
              <p className="text-sm text-[var(--text-muted)]">
                {result.classNameEn}
              </p>
            </Link>
          </div>
          <ConfidenceBadge status={result.researchStatus} />
        </div>
      </div>

      {/* Match reasons */}
      <div className="px-5 py-4">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">
          Passende Eigenschaften
        </h4>
        <ul className="space-y-1.5">
          {result.reasons.map((reason, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <Check
                size={14}
                className="text-[var(--confidence-verified)] mt-0.5 shrink-0"
              />
              <span className="text-[var(--text-secondary)]">{reason.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Weakness */}
      <div className="px-5 pb-4">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">
          M\u00f6gliche Herausforderung
        </h4>
        <div className="flex items-start gap-2 text-sm">
          <AlertTriangle
            size={14}
            className="text-[var(--confidence-experimental)] mt-0.5 shrink-0"
          />
          <span className="text-[var(--text-secondary)]">
            {result.weakness}
          </span>
        </div>
      </div>

      {/* Key stat bars */}
      <div className="px-5 pb-5">
        <div className="space-y-2">
          {result.keyStats.map((stat) => (
            <StatBar
              key={stat.label}
              value={stat.value}
              label={stat.label}
              showLabel
            />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 pb-5">
        <Link
          href={`/klassen/${result.classSlug}/`}
          className="block w-full text-center px-4 py-2.5 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-secondary)] hover:border-[var(--accent-aether)]/50 hover:text-[var(--accent-aether)] transition-colors"
        >
          Klassendetails ansehen
        </Link>
      </div>
    </motion.div>
  );
}
