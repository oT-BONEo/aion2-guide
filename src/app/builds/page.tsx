"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchX, Filter, ArrowRight } from "lucide-react";
import Link from "next/link";
import { PageLayout } from "@/components/layout/PageLayout";
import { BuildCard } from "@/components/build-card/BuildCard";
import type { BuildCardViewModel } from "@/components/build-card/BuildCard";
import type { ConfidenceStatus } from "@/components/ui/Badge";
import { builds } from "@/data/builds";
import { patches } from "@/data/patches";
import { classes } from "@/data/classes";
import { cn } from "@/lib/utils";

// ── Filter helpers ─────────────────────────────────────────────────

const purposeOptions = [
  { value: "all", label: "Alle Zwecke" },
  { value: "pve", label: "PvE" },
  { value: "pvp", label: "PvP" },
  { value: "hybrid", label: "Hybrid" },
];

const regionOptions = [
  { value: "all", label: "Alle Regionen" },
  { value: "KR", label: "Korea" },
  { value: "TW", label: "Taiwan" },
  { value: "GLOBAL", label: "Global" },
];

const confidenceOptions = [
  { value: "all", label: "Alle Stati" },
  { value: "draft", label: "Entwurf" },
  { value: "community-consensus", label: "Community" },
];

const purposeLabels: Record<string, string> = {
  "pve-dps": "PvE DPS",
  "pve-heal": "PvE Heal",
  "pve-tank": "PvE Tank",
  "pve-support": "PvE Support",
  "pvp-small": "PvP (klein)",
  "pvp-large": "PvP (gro\u00df)",
  hybrid: "Hybrid",
};

function toConfidenceStatus(confidence: string): ConfidenceStatus {
  if (confidence === "draft") return "experimental";
  if (confidence === "community-consensus") return "community-consensus";
  if (confidence === "verified") return "verified";
  return "experimental";
}

/**
 * Map a BuildGuide into the shape BuildCard expects.
 */
function adaptBuildForCard(build: (typeof builds)[number]): BuildCardViewModel {
  const cls = classes.find((c) => c.id === build.classId);
  const patch = patches.find((p) => p.id === build.patchId);

  return {
    slug: build.slug,
    title: build.title,
    className: cls?.names.deProvisional ?? build.classId,
    region: build.region,
    confidence: toConfidenceStatus(build.confidence),
    patch: patch?.title ?? build.patchId,
    purpose: purposeLabels[build.purpose] ?? build.purpose,
    audience: build.audience.experience,
    overview: build.overview,
    publicationStatus: build.publicationStatus,
  };
}

// ── Patch Status Banner ────────────────────────────────────────────

function PatchStatusBanner() {
  const livePatch = patches.find((p) => p.status === "live");
  const upcomingPatch = patches.find((p) => p.status === "announced");

  if (!livePatch && !upcomingPatch) return null;

  return (
    <div className="mb-6 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4">
      <div className="flex flex-wrap items-center gap-4">
        {livePatch && (
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-success)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--accent-success)]" />
            </span>
            <span className="text-xs text-[var(--text-secondary)]">
              Aktueller Patch:{" "}
              <span className="font-medium text-[var(--text-primary)]">
                {livePatch.title}
              </span>{" "}
              (Level {livePatch.levelCap}, Korea)
            </span>
          </div>
        )}
        {upcomingPatch && (
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent-warning)]" />
            <span className="text-xs text-[var(--text-secondary)]">
              Angek\u00fcndigt:{" "}
              <span className="font-medium text-[var(--text-primary)]">
                {upcomingPatch.title}
              </span>{" "}
              ({upcomingPatch.date})
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────

export default function BuildsPage() {
  const [classFilter, setClassFilter] = useState("all");
  const [purposeFilter, setPurposeFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");
  const [confidenceFilter, setConfidenceFilter] = useState("all");

  const adaptedBuilds = useMemo(() => builds.map(adaptBuildForCard), []);

  const filteredBuilds = useMemo(() => {
    return adaptedBuilds.filter((build) => {
      // Class filter
      const buildClass = classes.find((c) => c.id === builds.find((b) => b.slug === build.slug)?.classId);
      if (classFilter !== "all" && buildClass?.slug !== classFilter) return false;

      // Purpose filter (grouped)
      if (purposeFilter !== "all") {
        if (purposeFilter === "pve" && !build.purpose.startsWith("PvE")) return false;
        if (purposeFilter === "pvp" && !build.purpose.startsWith("PvP")) return false;
        if (purposeFilter === "hybrid" && build.purpose !== "Hybrid") return false;
      }

      // Region filter
      if (regionFilter !== "all" && build.region !== regionFilter) return false;

      // Confidence filter
      if (confidenceFilter !== "all") {
        const buildConfidence = builds.find((b) => b.slug === build.slug)?.confidence;
        if (confidenceFilter === "draft" && buildConfidence !== "draft") return false;
        if (confidenceFilter === "community-consensus" && buildConfidence !== "community-consensus") return false;
      }

      return true;
    });
  }, [adaptedBuilds, classFilter, purposeFilter, regionFilter, confidenceFilter]);

  const activeFilterCount = [
    classFilter !== "all",
    purposeFilter !== "all",
    regionFilter !== "all",
    confidenceFilter !== "all",
  ].filter(Boolean).length;

  const handleResetFilters = () => {
    setClassFilter("all");
    setPurposeFilter("all");
    setRegionFilter("all");
    setConfidenceFilter("all");
  };

  return (
    <PageLayout title="Builds &amp; Guides">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Patch status banner */}
        <PatchStatusBanner />

        {/* ── Filter Bar ─────────────────────────────────────── */}
        <div className="mb-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-4">
            <Filter size={16} className="text-[var(--accent-aether)]" />
            <span className="text-sm font-medium text-[var(--text-primary)]">
              Filter
              {activeFilterCount > 0 && (
                <span className="ml-1.5 text-xs text-[var(--accent-aether)]">
                  ({activeFilterCount} aktiv)
                </span>
              )}
            </span>
            {activeFilterCount > 0 && (
              <button
                onClick={handleResetFilters}
                className="ml-auto text-xs text-[var(--text-muted)] hover:text-[var(--accent-aether)] transition-colors"
              >
                Zur\u00fccksetzen
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Class filter */}
            <div>
              <label className="block text-xs text-[var(--text-muted)] mb-1.5">
                Klasse
              </label>
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className={cn(
                  "w-full px-3 py-2 rounded-lg border bg-[var(--bg-elevated)] text-sm",
                  "text-[var(--text-primary)] border-[var(--border-subtle)]",
                  "focus:outline-none focus:border-[var(--accent-aether)]/50"
                )}
              >
                <option value="all">Alle Klassen</option>
                {classes.map((cls) => (
                  <option key={cls.slug} value={cls.slug}>
                    {cls.names.deProvisional}
                  </option>
                ))}
              </select>
            </div>

            {/* Purpose filter */}
            <div>
              <label className="block text-xs text-[var(--text-muted)] mb-1.5">
                Zweck
              </label>
              <select
                value={purposeFilter}
                onChange={(e) => setPurposeFilter(e.target.value)}
                className={cn(
                  "w-full px-3 py-2 rounded-lg border bg-[var(--bg-elevated)] text-sm",
                  "text-[var(--text-primary)] border-[var(--border-subtle)]",
                  "focus:outline-none focus:border-[var(--accent-aether)]/50"
                )}
              >
                {purposeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Region filter */}
            <div>
              <label className="block text-xs text-[var(--text-muted)] mb-1.5">
                Region
              </label>
              <select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className={cn(
                  "w-full px-3 py-2 rounded-lg border bg-[var(--bg-elevated)] text-sm",
                  "text-[var(--text-primary)] border-[var(--border-subtle)]",
                  "focus:outline-none focus:border-[var(--accent-aether)]/50"
                )}
              >
                {regionOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Confidence filter */}
            <div>
              <label className="block text-xs text-[var(--text-muted)] mb-1.5">
                Vertrauensstatus
              </label>
              <select
                value={confidenceFilter}
                onChange={(e) => setConfidenceFilter(e.target.value)}
                className={cn(
                  "w-full px-3 py-2 rounded-lg border bg-[var(--bg-elevated)] text-sm",
                  "text-[var(--text-primary)] border-[var(--border-subtle)]",
                  "focus:outline-none focus:border-[var(--accent-aether)]/50"
                )}
              >
                {confidenceOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ── Results Count ──────────────────────────────────── */}
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm text-[var(--text-muted)]">
            {filteredBuilds.length}{" "}
            {filteredBuilds.length === 1 ? "Build" : "Builds"} gefunden
          </span>
          <Link
            href="/klassenfinder/"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--accent-aether)] hover:underline"
          >
            Zum Klassenfinder
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* ── Build Grid ─────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {filteredBuilds.length > 0 ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
            >
              {filteredBuilds.map((build, i) => (
                <BuildCard key={build.slug} build={build} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <SearchX size={48} className="text-[var(--text-muted)] mb-4" />
              <h3 className="text-lg font-semibold text-[var(--text-primary)] font-serif mb-2">
                Keine Builds gefunden
              </h3>
              <p className="text-sm text-[var(--text-muted)] max-w-md mb-6">
                Versuche es mit anderen Filtern oder schau sp\u00e4ter wieder vorbei.
                Wir f\u00fcgen laufend neue Builds hinzu.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2.5 rounded-lg border border-[var(--border-subtle)] text-sm text-[var(--text-secondary)] hover:border-[var(--accent-aether)]/50 hover:text-[var(--accent-aether)] transition-all"
                >
                  Filter zur\u00fccksetzen
                </button>
                <Link
                  href="/klassenfinder/"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--accent-aether)] text-[var(--bg-abyss)] text-sm font-medium hover:bg-[var(--accent-aether)]/90 transition-all"
                >
                  <ArrowRight size={16} />
                  Zum Klassenfinder
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageLayout>
  );
}
