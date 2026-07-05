"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  Shield,
  Layers,
  Sword,
  Crosshair,
  Hammer,
  Flame,
  Gem,
  CircleDot,
  Sparkles,
  Star,
  BookOpen,
  AlertTriangle,
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { gearCategories, statCaps } from "@/data/gear";
import { Badge } from "@/components/ui/Badge";

const categoryIcons: Record<string, typeof Shield> = {
  leveling: Shield,
  "starter-endgame": Layers,
  "pve-progression": Sword,
  "pvp-progression": Crosshair,
  crafting: Hammer,
  "soul-imprint": Flame,
  manastones: Gem,
  accessories: CircleDot,
  pendant: Sparkles,
  arcana: Star,
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function AusruestungPage() {
  return (
    <PageLayout title="Ausr\u00fcstungs-Guide">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-16">
        {/* ── Intro ─────────────────────────────────────────── */}
        <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6">
            <div className="flex items-start gap-3">
              <BookOpen size={20} className="text-[var(--accent-aether)] mt-0.5 flex-shrink-0" />
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Dieser Bereich gibt einen \u00dcberblick \u00fcber das Ausr\u00fcstungssystem von AION 2.
                Konkrete Farm-Routen, Drop-Chancen und Item-Listen folgen nach dem Global Release,
                wenn sie aus dem Client oder belastbaren Quellen best\u00e4tigt werden.
              </p>
            </div>
          </div>
        </motion.section>

        {/* ── Gear Categories ───────────────────────────────── */}
        <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] font-serif mb-6">
            Ausr\u00fcstungs-Kategorien
          </h2>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gearCategories.map((cat) => {
              const Icon = categoryIcons[cat.id] ?? Shield;
              return (
                <motion.div key={cat.id} variants={itemVariants}>
                  <Link
                    href={`/ausruestung/${cat.id}/`}
                    className="group block rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-5
                      hover:-translate-y-1 hover:border-[var(--accent-aether)]/40 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[var(--accent-aether)]/10 flex items-center justify-center flex-shrink-0">
                        <Icon size={20} className="text-[var(--accent-aether)]" />
                      </div>
                      <div>
                        <h3 className="font-serif text-base font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-aether)] transition-colors">
                          {cat.titleDe}
                        </h3>
                        <p className="mt-1 text-xs text-[var(--text-muted)] leading-relaxed">{cat.description}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.section>

        {/* ── Research Draft Banner ─────────────────────────── */}
        <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div className="rounded-xl border border-[var(--accent-warning)]/20 bg-[var(--accent-warning)]/5 p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle size={20} className="text-[var(--accent-warning)] mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-base font-semibold text-[var(--text-primary)] mb-1">
                  Research-Entwurf – nicht final
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Die Gear-Kategorien basieren auf Quellen und Ingame-Referenzen.
                  Konkrete Item-Listen, Drop-Chancen und Farm-Routen werden nach dem
                  Global Release erg\u00e4nzt, sobald sie aus dem Client oder belastbaren
                  Quellen best\u00e4tigt werden.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ── Stat Caps ─────────────────────────────────────── */}
        <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] font-serif mb-6">
            Stat-Kappen
          </h2>
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6">
            <div className="space-y-4">
              {statCaps.map((cap) => (
                <div key={cap.stat} className="flex items-center justify-between py-3 border-b border-[var(--border-subtle)] last:border-0">
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">{cap.statDe}</p>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">{cap.notes}</p>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">
                      Quellen:{" "}
                      {cap.sourceIds.map((sid, i) => (
                        <span key={sid}>
                          {i > 0 && ", "}
                          <Link href="/quellen/" className="text-[var(--accent-aether)] hover:underline">
                            {sid}
                          </Link>
                        </span>
                      ))}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                    <Badge variant={cap.capType === "hard" ? "status-live" : "status-announced"} className="text-[10px]">
                      {cap.capType === "hard" ? "Hart" : "Soft"}
                    </Badge>
                    <span className="text-sm font-semibold text-[var(--accent-aether)]">
                      {cap.maxValue}{cap.unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ── CTA ───────────────────────────────────────────── */}
        <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="text-center pb-8">
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-8 sm:p-12">
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] font-serif mb-3">
              Noch unsicher?
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mb-6 max-w-md mx-auto">
              Finde die passende Klasse f\u00fcr deinen Spielstil und schaue sp\u00e4ter
              wieder f\u00fcr detaillierte Ausr\u00fcstungs-Empfehlungen vorbei.
            </p>
            <Link href="/klassenfinder/"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-[var(--accent-aether)] text-[var(--bg-abyss)] font-semibold text-sm hover:bg-[var(--accent-aether)]/90 transition-colors">
              <Sparkles size={18} /> Zum Klassenfinder
            </Link>
          </div>
        </motion.section>
      </div>
    </PageLayout>
  );
}
