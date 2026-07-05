"use client";

import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";
import { RatingExplanationCard } from "./RatingExplanationCard";
import { ratingLabels } from "@/data/class-ratings";
import type { ClassRating, RatingKey } from "@/data/class-ratings";

interface RatingGridProps {
  classRating: ClassRating;
  className?: string;
}

const sectionOrder: { label: string; keys: RatingKey[] }[] = [
  { label: "PvE", keys: ["soloPve", "groupPve"] },
  { label: "PvP", keys: ["soloPvp", "teamPvp", "massPvp"] },
  { label: "Allgemein", keys: ["beginnerFriendly", "mechanicalDemand", "mobility", "survivability", "gearDependency", "groupUtility"] },
];

export function RatingGrid({ classRating, className }: RatingGridProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] font-serif mb-6 flex items-center gap-2">
        <BarChart3 size={22} className="text-[var(--accent-aether)]" />
        Klassenbewertung
      </h2>

      <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-4 sm:p-6 space-y-6">
        <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)]">
          <span>Datenstand: {classRating.region} {classRating.patchId}</span>
          <span>·</span>
          <span>Letzte Pruefung: {classRating.lastReviewedAt}</span>
        </div>

        {sectionOrder.map((section) => (
          <div key={section.label}>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-3">
              {section.label}
            </h3>
            <div className="space-y-2">
              {section.keys.map((key) => (
                <RatingExplanationCard
                  key={key}
                  label={ratingLabels[key]}
                  rating={classRating.ratings[key]}
                />
              ))}
            </div>
          </div>
        ))}

        {classRating.classId === "brawler" && (
          <div className="rounded-lg border border-[var(--accent-warning)]/20 bg-[var(--accent-warning)]/5 p-3 flex items-start gap-2">
            <BarChart3 size={14} className="text-[var(--accent-warning)] mt-0.5 flex-shrink-0" />
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Alle Brawler-Bewertungen sind experimentell. Die Klasse ist seit
              KR/TW Chapter 1 verfuegbar und es gibt noch keine stabilen Meta-Daten.
              Jeder Wert kann sich nach weiteren Tests und dem Global Release aendern.
            </p>
          </div>
        )}
      </div>
    </motion.section>
  );
}
