"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import {
  CheckCircle,
  AlertTriangle,
  ChevronRight,
  Wrench,
  BookOpen,
  ExternalLink,
  Users,
  Swords,
  Target,
  Gauge,
  Shield,
  Zap,
  Crown,
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { StatBar } from "@/components/ui/StatBar";
import { Badge } from "@/components/ui/Badge";
import { ConfidenceBadge } from "@/components/ui/ConfidenceBadge";
import { ClassCard } from "@/components/class-card/ClassCard";
import { BuildCard } from "@/components/build-card/BuildCard";
import type { AionClass, BuildGuide } from "@/data";
import type { ClassCardViewModel } from "@/components/class-card/ClassCard";
import type { BuildCardViewModel } from "@/components/build-card/BuildCard";
import { toConfidenceStatus, getRoleBadgeVariant } from "@/lib/adapters";
import { RatingGrid } from "@/components/ratings/RatingGrid";
import type { ClassRating } from "@/data/class-ratings";

// ── Data Adapters ────────────────────────────────────────────────

function toRoleKey(role: string): string {
  const lower = role.toLowerCase();
  if (lower.includes("tank")) return "tank";
  if (lower.includes("heal")) return "healer";
  if (lower.includes("support")) return "support";
  if (lower.includes("dps") || lower.includes("burst") || lower.includes("kiter"))
    return "dps";
  if (lower.includes("debuffer") || lower.includes("control") || lower.includes("cc"))
    return "control";
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

function adaptBuild(build: BuildGuide, allClasses: AionClass[]): BuildCardViewModel {
  const cls = allClasses.find((c) => c.id === build.classId);
  return {
    slug: build.slug,
    title: build.title,
    className: cls?.names.deProvisional ?? build.classId,
    region: build.region,
    confidence: toConfidenceStatus(build.confidence),
    patch: build.patchId,
    purpose: build.purpose,
    audience: build.audience.experience,
    overview: build.overview,
    publicationStatus: build.publicationStatus,
  };
}

// ── Animation Variants ───────────────────────────────────────────

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

// ── Role badge variant map ───────────────────────────────────────

// ── Component ────────────────────────────────────────────────────

interface KlassenDetailClientProps {
  cls: AionClass;
  classBuilds: BuildGuide[];
  otherClasses: AionClass[];
  classRating?: ClassRating;
}

export function KlassenDetailClient({
  cls,
  classBuilds,
  otherClasses,
  classRating,
}: KlassenDetailClientProps) {
  const allClasses = [...otherClasses, cls];

  return (
    <PageLayout>
      {/* ── 1. Hero ─────────────────────────────────────────────── */}
      <section className="relative">
        <div className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
          <Image
            src={`/art/class-${cls.slug}.jpg`}
            alt={cls.names.deProvisional}
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-abyss)] via-[var(--bg-abyss)]/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-4">
                  <Link href="/klassen/" className="hover:text-[var(--accent-aether)] transition-colors">Klassen</Link>
                  <ChevronRight size={12} />
                  <span className="text-[var(--text-secondary)]">{cls.names.deProvisional}</span>
                </div>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] font-serif">
                    {cls.names.deProvisional}
                  </h1>
                  {!cls.names.deConfirmed && (
                    <Badge variant="confidence-experimental" className="text-[10px]">Deutscher Name vorläufig</Badge>
                  )}
                </div>
                <p className="text-lg text-[var(--text-muted)] mb-4">({cls.names.en})</p>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)]">
                    <Swords size={14} className="text-[var(--text-muted)]" />
                    {cls.weapon.deProvisional}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cls.roles.map((role) => {
                      const roleKey = toRoleKey(role);
                      return (
                        <Badge key={role} variant={getRoleBadgeVariant(roleKey)} className="text-[10px]">
                          {role}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-16">
        {/* ── 2. Patch Status Bar ─────────────────────────────── */}
        <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Badge variant="region-kr" className="text-[10px]">KR</Badge>
            <span className="text-sm text-[var(--text-secondary)]">Chapter 1: Land of Sand and Frost | 01.07.2026</span>
          </div>
          <ConfidenceBadge status={cls.researchStatus} className="text-[10px]" />
        </motion.section>

        {/* ── 3. "Für wen?" Section ───────────────────────────── */}
        <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] font-serif mb-4 flex items-center gap-2">
            <Target size={22} className="text-[var(--accent-aether)]" />
            Für wen?
          </h2>
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6">
            <p className="text-[var(--text-secondary)] leading-relaxed">{cls.summary}</p>
            <div className="mt-4 flex items-start gap-2 text-sm text-[var(--text-muted)]">
              <Users size={16} className="mt-0.5 flex-shrink-0" />
              <span>Diese Klasse ist für Spieler, die {cls.roles.join(", ")} mögen und einen {""}
                {cls.difficulty <= 2 ? "einfachen" : cls.difficulty <= 3 ? "moderaten" : cls.difficulty <= 4 ? "anspruchsvollen" : "sehr anspruchsvollen"}{" "}
                Einstieg bevorzugen.
              </span>
            </div>
          </div>
        </motion.section>

        {/* ── 4. Stärken ────────────────────────────────────────── */}
        <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] font-serif mb-4 flex items-center gap-2">
            <Crown size={22} className="text-[var(--accent-success)]" />
            Stärken
          </h2>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {cls.strengths.map((s, i) => (
              <motion.div key={i} variants={itemVariants} className="flex items-start gap-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] p-4">
                <CheckCircle size={18} className="text-[var(--accent-success)] mt-0.5 flex-shrink-0" />
                <span className="text-sm text-[var(--text-secondary)]">{s}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ── 5. Schwächen ──────────────────────────────────────── */}
        <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] font-serif mb-4 flex items-center gap-2">
            <AlertTriangle size={22} className="text-[var(--accent-warning)]" />
            Schwächen
          </h2>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {cls.weaknesses.map((w, i) => (
              <motion.div key={i} variants={itemVariants} className="flex items-start gap-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] p-4">
                <AlertTriangle size={18} className="text-[var(--accent-warning)] mt-0.5 flex-shrink-0" />
                <span className="text-sm text-[var(--text-secondary)]">{w}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ── 6. Mechaniken ─────────────────────────────────────── */}
        <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] font-serif mb-4 flex items-center gap-2">
            <Zap size={22} className="text-[var(--accent-elyos)]" />
            Mechaniken
          </h2>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-2">
            {cls.mechanics.map((m, i) => (
              <motion.div key={i} variants={itemVariants} className="flex items-center gap-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] px-4 py-3">
                <span className="w-6 h-6 rounded-full bg-[var(--accent-elyos)]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-[var(--accent-elyos)]">{i + 1}</span>
                </span>
                <span className="text-sm text-[var(--text-secondary)]">{m}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ── 7. Stat-Bars ──────────────────────────────────────── */}
        <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] font-serif mb-6 flex items-center gap-2">
            <Gauge size={22} className="text-[var(--accent-aether)]" />
            Werte-Übersicht
          </h2>
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
              <StatBar value={cls.difficulty} label="Schwierigkeit" showLabel />
              <StatBar value={cls.mobility} label="Mobilität" showLabel />
              <StatBar value={cls.solo} label="Solo-Fähigkeit" showLabel />
              <StatBar value={cls.partyDemand} label="Gruppen-Nachfrage" showLabel />
              <StatBar value={cls.gearDependency} label="Gear-Abhängigkeit" showLabel />
              <StatBar value={cls.pve} label="PvE" showLabel />
              <StatBar value={cls.pvpSmallScale} label="PvP Kleingruppen" showLabel />
              <StatBar value={cls.pvpLargeScale} label="PvP Großkampf" showLabel />
            </div>
          </div>
        </motion.section>

        {/* ── 7.5. RatingGrid (NEU) ─────────────────────────────── */}
        {classRating && <RatingGrid classRating={classRating} />}

        {/* ── 8. Builds ─────────────────────────────────────────── */}
        <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] font-serif flex items-center gap-2">
              <Swords size={22} className="text-[var(--accent-aether)]" />
              Builds
            </h2>
            <Link href="/builds/" className="inline-flex items-center gap-1 text-sm text-[var(--accent-aether)] hover:underline">Alle Builds<ChevronRight size={16} /></Link>
          </div>
          {classBuilds.length > 0 ? (
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classBuilds.map((build, i) => (
                <motion.div key={build.id} variants={itemVariants}>
                  <BuildCard build={adaptBuild(build, allClasses)} index={i} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-8 text-center">
              <Swords size={32} className="mx-auto text-[var(--text-muted)] mb-3" />
              <p className="text-sm text-[var(--text-secondary)]">Noch keine Builds für diese Klasse verfügbar.</p>
              <Link href="/builds/" className="mt-3 inline-flex items-center gap-1 text-sm text-[var(--accent-aether)] hover:underline">Alle Builds ansehen<ChevronRight size={14} /></Link>
            </div>
          )}
        </motion.section>

        {/* ── 9. Gear Section ───────────────────────────────────── */}
        <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] font-serif mb-4 flex items-center gap-2">
            <Wrench size={22} className="text-[var(--accent-elyos)]" />
            Ausrüstung
          </h2>
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6">
            <div className="flex items-start gap-3">
              <Shield size={18} className="text-[var(--text-muted)] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Gear-Roadmap für {cls.names.deProvisional} folgt. Die Ausrüstungs-Guides werden nach dem Global Release mit detaillierten Empfehlungen zu Sets, Manasteine und Arcana aktualisiert.
                </p>
                <Link href="/ausruestung/" className="mt-3 inline-flex items-center gap-1 text-sm text-[var(--accent-aether)] hover:underline">Zu den Ausrüstungs-Guides<ChevronRight size={14} /></Link>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ── 10. Quellen ───────────────────────────────────────── */}
        <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] font-serif mb-4 flex items-center gap-2">
            <BookOpen size={22} className="text-[var(--accent-asmodian)]" />
            Quellen
          </h2>
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6">
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
              Alle Informationen zu dieser Klasse basieren auf den folgenden Quellen. Jede Quelle hat eine zugewiesene Vertrauensstufe für maximale Transparenz.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/quellen/" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border-subtle)] text-sm text-[var(--text-secondary)] hover:border-[var(--accent-aether)]/50 hover:text-[var(--accent-aether)] transition-colors">
                <ExternalLink size={14} /> Alle Quellen ansehen
              </Link>
              <Link href="/patches/" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border-subtle)] text-sm text-[var(--text-secondary)] hover:border-[var(--accent-aether)]/50 hover:text-[var(--accent-aether)] transition-colors">
                <BookOpen size={14} /> Patch-History
              </Link>
            </div>
          </div>
        </motion.section>

        {/* ── 11. Weitere Klassen ───────────────────────────────── */}
        <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="pb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] font-serif mb-6 flex items-center gap-2">
            <Users size={22} className="text-[var(--accent-aether)]" />
            Weitere Klassen
          </h2>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherClasses.map((c, i) => (
              <motion.div key={c.id} variants={itemVariants}>
                <ClassCard cls={adaptClass(c)} index={i} />
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </div>
    </PageLayout>
  );
}
