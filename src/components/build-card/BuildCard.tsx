"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { RegionBadge } from "@/components/ui/RegionBadge";
import { ConfidenceBadge } from "@/components/ui/ConfidenceBadge";
import type { ConfidenceStatus } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export interface BuildCardViewModel {
  slug: string;
  title: string;
  className: string;
  region: "KR" | "TW" | "GLOBAL";
  confidence: ConfidenceStatus;
  patch: string;
  purpose: string;
  audience: "beginner" | "intermediate" | "advanced";
  overview: string;
  publicationStatus: "draft" | "review" | "published";
}

interface BuildCardProps {
  build: BuildCardViewModel;
  index?: number;
}

const audienceLabels: Record<string, string> = {
  beginner: "Anfänger",
  intermediate: "Fortgeschritten",
  advanced: "Experte",
};

export function BuildCard({ build, index = 0 }: BuildCardProps) {
  const isDraft = build.publicationStatus === "draft";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="relative"
    >
      <Link
        href={`/builds/${build.slug}/`}
        className={cn(
          "block rounded-xl border bg-[var(--surface-card)] overflow-hidden",
          "hover:-translate-y-1 hover:border-[var(--accent-aether)]/40 transition-all duration-300"
        )}
      >
        {isDraft && (
          <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
            <span className="text-6xl font-bold text-[var(--text-muted)]/5 rotate-[-15deg] select-none uppercase tracking-widest">
              Entwurf
            </span>
          </div>
        )}
        <div className="p-5 space-y-4 relative z-0">
          <div>
            <h3 className="font-serif text-lg font-semibold text-[var(--text-primary)] hover:text-[var(--accent-aether)] transition-colors">
              {build.title}
            </h3>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              {build.className}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <RegionBadge region={build.region} />
            <ConfidenceBadge status={build.confidence} />
            <Badge variant="default" className="text-[10px]">{build.patch}</Badge>
            <Badge variant="default" className="text-[10px]">{build.purpose}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--text-muted)]">Zielgruppe:</span>
            <span className="text-xs text-[var(--text-secondary)]">
              {audienceLabels[build.audience] ?? build.audience}
            </span>
          </div>
          {build.overview && (
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3">
              {build.overview}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
