"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Sparkles, RotateCcw } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { ClassCard } from "@/components/class-card/ClassCard";
import { ClassFilters } from "@/components/class-card/ClassFilters";
import type { ClassFiltersState } from "@/components/class-card/ClassFilters";
import { classes } from "@/data";
import type { AionClass } from "@/data";
import type { ClassCardViewModel } from "@/components/class-card/ClassCard";
import { ClassComparisonTable } from "@/components/ratings/ClassComparisonTable";
import { RatingMethodologyNote } from "@/components/ratings/RatingMethodologyNote";
import { classRatings } from "@/data/class-ratings";

// ── Data Adapters ────────────────────────────────────────────────

function toRoleKey(role: string): string {
  const lower = role.toLowerCase();
  if (lower.includes("tank")) return "tank";
  if (lower.includes("heal")) return "healer";
  if (lower.includes("support")) return "support";
  if (lower.includes("dps") || lower.includes("burst") || lower.includes("kiter")) return "dps";
  if (lower.includes("debuffer") || lower.includes("control") || lower.includes("cc")) return "control";
  if (lower.includes("summoner") || lower.includes("aoe")) return "dps";
  return lower;
}

function adaptClass(cls: AionClass): ClassCardViewModel {
  return {
    slug: cls.slug,
    name: {
      de: cls.names.deProvisional,
      en: cls.names.en,
      deConfirmed: cls.names.deConfirmed,
    },
    imageUrl: `/art/class-${cls.slug}.jpg`,
    weapon: cls.weapon.deProvisional,
    stats: {
      difficulty: cls.difficulty,
      solo: cls.solo,
      pve: cls.pve,
    },
    roles: cls.roles.map(toRoleKey),
    researchStatus: cls.researchStatus,
  };
}

// ── Filter Logic ─────────────────────────────────────────────────

const rangeFilterMap: Record<string, string> = {
  nahkampf: "melee",
  fernkampf: "ranged",
};

const roleFilterMap: Record<string, (cls: AionClass) => boolean> = {
  tank: (cls) => cls.roles.some((r) => r.toLowerCase().includes("tank")),
  heiler: (cls) => cls.roles.some((r) => r.toLowerCase().includes("heal")),
  support: (cls) => cls.roles.some((r) => r.toLowerCase().includes("support")),
  dps: (cls) =>
    cls.roles.some((r) => {
      const lr = r.toLowerCase();
      return lr.includes("dps") || lr.includes("burst") || lr.includes("kiter") || lr.includes("summoner") || lr.includes("debuffer") || lr.includes("aoe");
    }),
  kontrolle: (cls) =>
    cls.roles.some((r) => r.toLowerCase().includes("debuffer") || r.toLowerCase().includes("control") || r.toLowerCase().includes("kiter")),
};

function applyFilters(classes: AionClass[], filters: ClassFiltersState): AionClass[] {
  return classes.filter((cls) => {
    if (filters.roles.length > 0) {
      const matchesRole = filters.roles.some((role) => {
        const checker = roleFilterMap[role];
        return checker ? checker(cls) : false;
      });
      if (!matchesRole) return false;
    }
    if (filters.ranges.length > 0) {
      const matchesRange = filters.ranges.some((range) => cls.range === rangeFilterMap[range]);
      if (!matchesRange) return false;
    }
    if (filters.difficulty !== null) {
      if (cls.difficulty !== filters.difficulty) return false;
    }
    if (filters.researchStatus !== null) {
      if (cls.researchStatus !== filters.researchStatus) return false;
    }
    return true;
  });
}

// ── Animation Variants ───────────────────────────────────────────

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

// ── Page ─────────────────────────────────────────────────────────

export default function KlassenPage() {
  const [filters, setFilters] = useState<ClassFiltersState>({
    roles: [],
    ranges: [],
    difficulty: null,
    researchStatus: null,
  });

  const filteredClasses = useMemo(() => applyFilters(classes, filters), [filters]);


  const resetFilters = () => {
    setFilters({ roles: [], ranges: [], difficulty: null, researchStatus: null });
  };

  return (
    <PageLayout title="Klassenübersicht" subtitle={`${filteredClasses.length} Klasse${filteredClasses.length !== 1 ? "n" : ""}`}>
      {/* ── 1. Klassenvergleich Tabelle (NEU) ───────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] font-serif">
              Klassenvergleich nach Rollen und Modi
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              Relative Bewertungen im aktuellen KR/TW-Datenstand.
            </p>
          </div>
          <ClassComparisonTable ratings={classRatings} />
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="md:sticky md:top-24">
              <ClassFilters filters={filters} onChange={setFilters} />
            </div>
          </aside>
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {filteredClasses.length > 0 ? (
                <motion.div key="grid" variants={gridVariants} initial="hidden" animate="visible" exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredClasses.map((cls, i) => (
                    <motion.div key={cls.id} variants={itemVariants}>
                      <ClassCard cls={adaptClass(cls)} index={i} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div key="empty" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-16 h-16 rounded-full bg-[var(--border-subtle)] flex items-center justify-center mb-4">
                    <Sparkles size={28} className="text-[var(--text-muted)]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Keine Klassen gefunden</h3>
                  <p className="text-sm text-[var(--text-secondary)] mb-6 max-w-sm">
                    Mit den aktuellen Filtern gibt es keine passenden Klassen. Probiere es mit anderen Kriterien.
                  </p>
                  <button onClick={resetFilters}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border-subtle)] text-sm text-[var(--text-secondary)] hover:border-[var(--accent-aether)]/50 hover:text-[var(--accent-aether)] transition-colors">
                    <RotateCcw size={14} /> Filter zurücksetzen
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="mt-20 text-center rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-8 sm:p-12">
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] font-serif mb-3">Finde deine Klasse</h2>
          <p className="text-sm text-[var(--text-secondary)] mb-6 max-w-md mx-auto">
            Bist du unsicher, welche Klasse zu dir passt? Unser Klassenfinder hilft dir mit wenigen Fragen die richtige Wahl zu treffen.
          </p>
          <Link href="/klassenfinder/"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-[var(--accent-aether)] text-[var(--bg-abyss)] font-semibold text-sm hover:bg-[var(--accent-aether)]/90 transition-colors">
            <Sparkles size={18} /> Zum Klassenfinder
          </Link>
        </motion.div>
      </div>

      {/* ── 3. Rating Methodology Note (NEU) ────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        <RatingMethodologyNote />
      </section>
    </PageLayout>
  );
}
