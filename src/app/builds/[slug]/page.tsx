import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Users, Calendar, Shield, Globe, AlertTriangle } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { RegionBadge } from "@/components/ui/RegionBadge";
import { ConfidenceBadge } from "@/components/ui/ConfidenceBadge";
import { Badge } from "@/components/ui/Badge";
import { BuildTabs } from "./BuildTabs";
import {
  builds,
  getBuildBySlug,
  getAllBuildSlugs,
  getBuildsByClass,
} from "@/data/builds";
import { classes } from "@/data/classes";
import { patches } from "@/data/patches";
import { cn } from "@/lib/utils";

// ── Static Generation ──────────────────────────────────────────────

export function generateStaticParams() {
  return getAllBuildSlugs().map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const build = getBuildBySlug(slug);
  if (!build) return { title: "Build nicht gefunden" };
  return {
    title: `${build.title} – AION 2 Klassenfinder`,
    description: build.overview,
  };
}

// ── Helper: Purpose label ──────────────────────────────────────────

const purposeLabels: Record<string, string> = {
  "pve-dps": "PvE DPS",
  "pve-heal": "PvE Heal",
  "pve-tank": "PvE Tank",
  "pve-support": "PvE Support",
  "pvp-small": "PvP (klein)",
  "pvp-large": "PvP (groß)",
  "hybrid": "Hybrid",
};

const experienceLabels: Record<string, string> = {
  beginner: "Anfänger",
  intermediate: "Fortgeschritten",
  advanced: "Experte",
};

const gearTierLabels: Record<string, string> = {
  leveling: "Leveling",
  starter: "Starter",
  mid: "Mittleres Gear",
  endgame: "Endgame",
};

// ── Changelog helper ───────────────────────────────────────────────

function getChangelog(build: (typeof builds)[number]) {
  const entries = [
    {
      date: build.lastReviewedAt,
      title: "Letzte Überprüfung",
      description: `Build wurde zuletzt am ${build.lastReviewedAt} überprüft.`,
    },
    {
      date: build.localizationStatus.de === "provisional" ? build.lastReviewedAt : undefined,
      title: "Lokalisierung",
      description:
        build.localizationStatus.de === "provisional"
          ? "Deutsche Übersetzungen sind provisorisch und können sich ändern."
          : "Deutsche Lokalisierung bestätigt.",
    },
    {
      date: undefined,
      title: "Test-Status",
      description: build.testedLocally
        ? "Dieser Build wurde lokal getestet."
        : "Dieser Build basiert auf ausländischen Quellen und wurde nicht lokal getestet.",
    },
  ];

  return entries.filter((e) => e.description);
}

// ── Related Build Card ─────────────────────────────────────────────

function RelatedBuildCard({
  build,
}: {
  build: (typeof builds)[number];
}) {
  return (
    <Link
      href={`/builds/${build.slug}/`}
      className={cn(
        "block rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4",
        "hover:border-[var(--accent-aether)]/40 hover:-translate-y-0.5 transition-all duration-200"
      )}
    >
      <h4 className="text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent-aether)] transition-colors">
        {build.title}
      </h4>
      <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
        <RegionBadge region={build.region} className="text-[10px]" />
        <Badge variant="default" className="text-[10px]">
          {purposeLabels[build.purpose] ?? build.purpose}
        </Badge>
      </div>
    </Link>
  );
}

// ── Main Page Component ────────────────────────────────────────────

export default async function BuildDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const build = getBuildBySlug(slug);

  if (!build) {
    notFound();
  }

  const cls = classes.find((c) => c.slug === build.classId);
  const patch = patches.find((p) => p.id === build.patchId);
  const isDraft = build.publicationStatus === "draft";
  const relatedBuilds = getBuildsByClass(build.classId).filter(
    (b) => b.slug !== build.slug
  );
  const changelog = getChangelog(build);

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* ── Back Navigation ──────────────────────────────── */}
        <div className="mb-6">
          <Link
            href="/builds/"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--accent-aether)] transition-colors"
          >
            <ArrowLeft size={16} />
            Alle Builds
          </Link>
        </div>

        {/* ── Hero ─────────────────────────────────────────── */}
        <div className="mb-6">
          {/* Badges row */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <RegionBadge region={build.region} />
            <ConfidenceBadge
              status={
                build.confidence === "draft"
                  ? "experimental"
                  : build.confidence
              }
            />
            {patch && (
              <Badge variant="default" className="text-[10px]">
                {patch.title}
              </Badge>
            )}
            <Badge variant="default" className="text-[10px]">
              Level {build.levelCap}
            </Badge>
          </div>

          {/* Title & class */}
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] font-serif mb-1">
            {build.title}
          </h1>
          {cls && (
            <p className="text-sm text-[var(--text-muted)]">
              <Link
                href={`/klassen/${cls.slug}/`}
                className="hover:text-[var(--accent-aether)] transition-colors"
              >
                {cls.names.deProvisional}
              </Link>
              {" "}&middot;{" "}
              <span className="text-[var(--text-secondary)]">
                {purposeLabels[build.purpose] ?? build.purpose}
              </span>
            </p>
          )}
        </div>

        {/* ── Draft Banner ─────────────────────────────────── */}
        {isDraft && (
          <div className="mb-6 rounded-lg border border-[var(--accent-warning)]/30 bg-[var(--accent-warning)]/10 p-4 flex items-start gap-3">
            <AlertTriangle
              size={18}
              className="text-[var(--accent-warning)] mt-0.5 shrink-0"
            />
            <div>
              <p className="text-sm font-medium text-[var(--accent-warning)]">
                Dieser Build ist ein Entwurf.
              </p>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                Die Daten wurden nicht vollständig geprüft. Verwende diese
                Informationen mit Vorsicht und prüfe sie gegen aktuelle
                Quellen.
              </p>
            </div>
          </div>
        )}

        {/* ── Status Bar ───────────────────────────────────── */}
        <div className="mb-8 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center gap-2.5">
              <Globe size={14} className="text-[var(--text-muted)]" />
              <div>
                <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider block">
                  Region
                </span>
                <span className="text-sm text-[var(--text-primary)]">
                  {build.region === "KR" && "Korea"}
                  {build.region === "TW" && "Taiwan"}
                  {build.region === "GLOBAL" && "Global"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Shield size={14} className="text-[var(--text-muted)]" />
              <div>
                <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider block">
                  Patch
                </span>
                <span className="text-sm text-[var(--text-primary)]">
                  {patch?.title ?? build.patchId}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Calendar size={14} className="text-[var(--text-muted)]" />
              <div>
                <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider block">
                  Zuletzt geprüft
                </span>
                <span className="text-sm text-[var(--text-primary)]">
                  {build.lastReviewedAt}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Users size={14} className="text-[var(--text-muted)]" />
              <div>
                <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider block">
                  Zielgruppe
                </span>
                <span className="text-sm text-[var(--text-primary)]">
                  {experienceLabels[build.audience.experience] ?? build.audience.experience}
                  {" "}&middot;{" "}
                  {gearTierLabels[build.audience.gearTier] ?? build.audience.gearTier}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Globe size={14} className="text-[var(--text-muted)]" />
              <div>
                <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider block">
                  Lokalisierung (DE)
                </span>
                <span
                  className={cn(
                    "text-sm",
                    build.localizationStatus.de === "provisional"
                      ? "text-[var(--accent-warning)]"
                      : "text-[var(--text-primary)]"
                  )}
                >
                  {build.localizationStatus.de === "provisional" && "Provisorisch"}
                  {build.localizationStatus.de === "reviewed" && "Überprüft"}
                  {build.localizationStatus.de === "confirmed" && "Bestätigt"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Overview ─────────────────────────────────────── */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] font-serif mb-3">
            Übersicht
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
            {build.overview}
          </p>

          {/* Playstyle tags */}
          {build.playstyle && (
            <div className="flex flex-wrap gap-2">
              {build.playstyle.split(".").filter(s => s.trim().length > 10).slice(0, 4).map((phrase, i) => (
                <Badge key={i} variant="ghost" className="text-[11px]">
                  {phrase.trim().substring(0, 40)}
                  {phrase.trim().length > 40 ? "..." : ""}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* ── Tabs ─────────────────────────────────────────── */}
        <div className="mb-10">
          <BuildTabs build={build} />
        </div>

        {/* ── Changelog ────────────────────────────────────── */}
        {changelog.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] font-serif mb-4">
              Änderungshistorie
            </h2>
            <div className="space-y-3">
              {changelog.map((entry, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4"
                >
                  {entry.date && (
                    <span className="text-xs text-[var(--text-muted)] shrink-0 w-24">
                      {entry.date}
                    </span>
                  )}
                  <div>
                    <h4 className="text-sm font-medium text-[var(--text-primary)]">
                      {entry.title}
                    </h4>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">
                      {entry.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Related Builds ───────────────────────────────── */}
        {relatedBuilds.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)] font-serif mb-4">
              Weitere Builds für{" "}
              <span className="text-[var(--accent-aether)]">
                {cls?.names.deProvisional ?? build.classId}
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {relatedBuilds.map((b) => (
                <RelatedBuildCard key={b.slug} build={b} />
              ))}
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
