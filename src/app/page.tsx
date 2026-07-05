"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Gamepad2,
  BookOpen,
  Sparkles,
  Calendar,
  ChevronRight,
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { ClassCard, type ClassCardViewModel } from "@/components/class-card/ClassCard";
import { BuildCard, type BuildCardViewModel } from "@/components/build-card/BuildCard";
import { AetherField } from "@/components/AetherField";
import { classes, builds } from "@/data";
import type { AionClass, BuildGuide } from "@/data";
import { toConfidenceStatus } from "@/lib/adapters";
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

function adaptBuild(build: BuildGuide): BuildCardViewModel {
  const cls = classes.find((c) => c.id === build.classId);
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

const featuredBuildSlugs = [
  "chanter-pve-support",
  "cleric-pve-healer",
  "templar-pve-tank",
];

const featuredBuilds = featuredBuildSlugs
  .map((slug) => builds.find((b) => b.slug === slug))
  .filter((b): b is BuildGuide => b !== undefined);

const guideHighlights = [
  {
    title: "Chanter PvE Support",
    image: "/art/guide-chanter-support.jpg",
    badge: "Recherche-Entwurf",
    meta: "Region: KR/TW · Patch: Chapter 1",
    href: "/builds/",
  },
  {
    title: "Cleric PvE Healer",
    image: "/art/guide-cleric-healer.jpg",
    badge: "Recherche-Entwurf",
    meta: "Region: KR/TW · Patch: Chapter 1",
    href: "/builds/",
  },
  {
    title: "Templar PvE Tank",
    image: "/art/guide-templar-tank.jpg",
    badge: "Recherche-Entwurf",
    meta: "Region: KR/TW · Patch: Chapter 1",
    href: "/builds/",
  },
  {
    title: "Gear Progression",
    image: "/art/guide-gear-progression.jpg",
    badge: "Recherche-Entwurf",
    meta: "Region: KR/TW · Patch: Chapter 1",
    href: "/ausruestung/",
  },
];

// ── Animation Variants ───────────────────────────────────────────

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// ── Page ─────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <PageLayout>
      {/* ── 1. Hero ─────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] flex items-end justify-center overflow-hidden px-4 pb-16 pt-32 sm:px-6 lg:pb-20">
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/art/aion2-sgf2026-key-art.webp')" }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(5,5,7,0.08)_0%,rgba(5,5,7,0.34)_46%,rgba(5,5,7,0.92)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_58%,rgba(168,139,250,0.12),transparent_44%),linear-gradient(90deg,rgba(5,5,7,0.38)_0%,rgba(5,5,7,0.06)_44%,rgba(5,5,7,0.38)_100%)]"
        />
        <AetherField />
        <div className="relative z-10 max-w-4xl mx-auto text-center rounded-3xl border border-white/10 bg-[rgba(5,5,7,0.36)] px-5 py-8 shadow-2xl backdrop-blur-sm sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] font-serif leading-tight">
              AION 2 Guides, Klassenvergleich und Gear-Fahrpl&auml;ne
            </h1>
            <p className="mt-6 text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
              Deutschsprachiger Vorab-Hub f&uuml;r Klassen, Rollen, PvE/PvP-Einsch&auml;tzungen und Ausr&uuml;stungswege &ndash; mit sichtbarem KR/TW-Datenstand statt pauschaler Tier-List.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link
              href="/klassen/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[var(--border-default)] text-[var(--text-primary)] font-semibold text-sm hover:border-[var(--accent-aether)]/50 hover:text-[var(--accent-aether)] transition-colors"
            >
              <Gamepad2 size={18} />
              Klassen vergleichen
            </Link>
            <Link
              href="/builds/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[var(--border-default)] text-[var(--text-primary)] font-semibold text-sm hover:border-[var(--accent-aether)]/50 hover:text-[var(--accent-aether)] transition-colors"
            >
              <BookOpen size={18} />
              Guides ansehen
            </Link>
            <Link
              href="/klassenfinder/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--accent-aether)] text-[var(--bg-abyss)] font-semibold text-sm hover:bg-[var(--accent-aether)]/90 transition-colors"
            >
              <Sparkles size={18} />
              Klassenfinder starten
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-10 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)]/80 backdrop-blur-sm"
          >
            <Calendar size={14} className="text-[var(--accent-aether)]" />
            <span className="text-xs text-[var(--text-secondary)]">
              KR/TW: Chapter 1 (01.07.2026) | Global: September 2026
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Datenstand-Band ─────────────────────────────── */}
      <section className="border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-xs sm:text-sm text-[var(--text-muted)]">
            Datenstand: KR/TW Chapter 1 &middot; Patch 01.07.2026 &middot; Global Release September 2026 angek&uuml;ndigt &middot; Deutsche Namen: vorl&auml;ufig
          </p>
          <Link
            href="/methodik/"
            className="text-xs sm:text-sm text-[var(--accent-aether)] hover:underline whitespace-nowrap"
          >
            Was bedeutet dieser Datenstand? &rarr;
          </Link>
        </div>
      </section>

      {/* ── 3. Klassenvergleich ────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] font-serif">
              Klassenvergleich nach Rollen und Modi
            </h2>
            <p className="mt-2 text-[var(--text-secondary)] text-sm max-w-2xl mx-auto">
              Relative Bewertungen im aktuellen KR/TW-Datenstand. Jeder Wert ist vergleichend innerhalb der neun Klassen zu verstehen.
            </p>
          </div>
          <ClassComparisonTable ratings={classRatings} />
          <div className="mt-8 text-center">
            <Link
              href="/klassen/"
              className="inline-flex items-center gap-2 text-sm text-[var(--accent-aether)] hover:underline"
            >
              Alle Klassen im Detail <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── 4. Aktuelle Guide-Schwerpunkte ─────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-[var(--bg-surface)]">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] font-serif">
              Aktuelle Guide-Schwerpunkte
            </h2>
            <p className="mt-2 text-[var(--text-secondary)] text-sm">
              Die ersten detaillierten Entw&uuml;rfe &ndash; basierend auf KR/TW-Chapter-1-Daten
            </p>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {guideHighlights.map((guide) => (
              <motion.div key={guide.title} variants={itemVariants}>
                <Link
                  href={guide.href}
                  className="group block rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] overflow-hidden hover:border-[var(--accent-aether)]/30 transition-colors"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={guide.image}
                      alt={guide.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(5,5,7,0.7)_100%)]" />
                    <span className="absolute top-3 left-3 inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium border border-[var(--accent-warning)]/30 text-[var(--accent-warning)] bg-[var(--accent-warning)]/10">
                      {guide.badge}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] font-serif group-hover:text-[var(--accent-aether)] transition-colors">
                      {guide.title}
                    </h3>
                    <p className="mt-1 text-xs text-[var(--text-muted)]">
                      {guide.meta}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── 5. Bewertungsmethodik ──────────────────────────── */}
      <section className="py-20 px-4 sm:px-6">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] font-serif">
              Wie wir Klassen bewerten
            </h2>
          </div>
          <RatingMethodologyNote />
        </motion.div>
      </section>

      {/* ── 6. Klassenfinder (sekund&auml;r) ────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-[var(--bg-surface)]">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <Sparkles size={32} className="mx-auto text-[var(--accent-aether)] mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] font-serif">
            Unsicher bei der Klassenwahl?
          </h2>
          <p className="mt-4 text-[var(--text-secondary)] leading-relaxed max-w-xl mx-auto">
            Der Klassenfinder hilft dir, Rollen, Reichweite, Anspruch und Content-Vorlieben einzugrenzen. Er ersetzt keine Meta-Auswertung, sondern ist eine Entscheidungshilfe.
          </p>
          <div className="mt-8">
            <Link
              href="/klassenfinder/"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-[var(--accent-aether)] text-[var(--bg-abyss)] font-semibold text-sm hover:bg-[var(--accent-aether)]/90 transition-colors"
            >
              <Sparkles size={18} />
              Klassenfinder starten
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── 7. Alle 9 Klassen ──────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] font-serif">
              Alle 9 Klassen
            </h2>
            <p className="mt-2 text-[var(--text-secondary)]">
              W&auml;hle eine Klasse f&uuml;r Details, Builds und Bewertungen
            </p>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {classes.map((cls, i) => (
              <motion.div key={cls.id} variants={itemVariants}>
                <ClassCard cls={adaptClass(cls)} index={i} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── 8. Vorgestellte Builds ─────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-[var(--bg-surface)]">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] font-serif">
                Vorgestellte Builds
              </h2>
              <p className="mt-1 text-[var(--text-secondary)] text-sm">
                Aktuelle Entw&uuml;rfe &ndash; Community-gepr&uuml;ft
              </p>
            </div>
            <Link
              href="/builds/"
              className="hidden sm:inline-flex items-center gap-1 text-sm text-[var(--accent-aether)] hover:underline"
            >
              Alle Builds <ArrowRight size={16} />
            </Link>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {featuredBuilds.map((build, i) => (
              <motion.div key={build.id} variants={itemVariants}>
                <BuildCard build={adaptBuild(build)} index={i} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── 9. Release Banner ──────────────────────────────── */}
      <section className="py-12 px-4 sm:px-6">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="rounded-xl border border-[var(--accent-elyos)]/20 bg-[var(--accent-elyos)]/5 p-8">
            <Calendar size={32} className="mx-auto text-[var(--accent-elyos)] mb-4" />
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] font-serif">
              Globaler Release: September 2026
            </h2>
            <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed max-w-lg mx-auto">
              AION 2 erscheint voraussichtlich im September 2026 auf Steam. Nutze die Zeit bis dahin, um dich mit den Klassen vertraut zu machen.
            </p>
            <a
              href="https://store.steampowered.com/app/3393110/AION_2/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-[var(--accent-elyos)]/30 text-[var(--accent-elyos)] text-sm font-medium hover:bg-[var(--accent-elyos)]/10 transition-colors"
            >
              Auf Steam ansehen <ChevronRight size={16} />
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── 10. Footer-Disclaimer ──────────────────────────── */}
      <section className="border-t border-[var(--border-subtle)] px-4 py-8 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Alle Bewertungen sind vorl&auml;ufige Einsch&auml;tzungen auf Basis des KR/TW-Datenstands. Sie werden nach dem Global Release &uuml;berpr&uuml;ft und angepasst.
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
