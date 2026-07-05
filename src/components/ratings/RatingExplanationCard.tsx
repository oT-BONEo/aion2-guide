"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { RatingBar } from "./RatingBar";
import type { RatingEntry } from "@/data/class-ratings";
import { confidenceLabels } from "@/data/class-ratings";

interface RatingExplanationCardProps {
  label: string;
  rating: RatingEntry;
  dataStatus?: string;
}

export function RatingExplanationCard({
  label,
  rating,
  dataStatus = "KR/TW Chapter 1",
}: RatingExplanationCardProps) {
  const [expanded, setExpanded] = useState(false);

  const confidenceBadge =
    rating.confidence === "experimental"
      ? ("confidence-experimental" as const)
      : rating.confidence === "local-test-needed"
        ? ("confidence-obsolete" as const)
        : ("confidence-community" as const);

  return (
    <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[var(--bg-elevated)]/30 transition-colors"
      >
        <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider w-28 shrink-0">
          {label}
        </span>
        <RatingBar value={rating.value} size="sm" className="flex-1" />
        <span className="text-xs font-bold text-[var(--text-secondary)] w-8 text-right">
          {rating.value}/5
        </span>
        <ChevronDown
          size={14}
          className={`text-[var(--text-muted)] transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-3 pt-1 border-t border-[var(--border-subtle)]">
              <div className="flex items-start gap-2 mt-2">
                <HelpCircle size={12} className="text-[var(--accent-aether)] mt-0.5 flex-shrink-0" />
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {rating.explanation}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <Badge variant={confidenceBadge} className="text-[10px]">
                  {confidenceLabels[rating.confidence]}
                </Badge>
                <span className="text-[10px] text-[var(--text-muted)]">
                  {dataStatus}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
