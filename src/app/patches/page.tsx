import { PageLayout } from "@/components/layout/PageLayout";
import { patches } from "@/data/patches";
import { Timeline } from "@/components/ui/Timeline";
import { Badge } from "@/components/ui/Badge";
import { RegionBadge } from "@/components/ui/RegionBadge";
import { ExternalLink } from "lucide-react";

const regionStatus = [
  {
    region: "KR" as const,
    label: "Korea",
    status: "Live",
    description: "Kapitel 1 aktiv – Level 50",
    color: "var(--accent-success)",
  },
  {
    region: "TW" as const,
    label: "Taiwan",
    status: "Live",
    description: "Parallel zu KR verfügbar",
    color: "var(--accent-warning)",
  },
  {
    region: "GLOBAL" as const,
    label: "Global",
    status: "Angekündigt",
    description: "Steam-Release September 2026",
    color: "var(--accent-aether)",
  },
];

export default function PatchesPage() {
  const timelineItems = patches.map((p) => ({
    date: p.date,
    title: p.title,
    description: p.summary,
    status: p.status,
  }));

  return (
    <PageLayout
      title="Patches & Regionen"
      subtitle="Patch-Verlauf, Release-Termine und regionale Verfügbarkeit"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 space-y-12">
        {/* Region Status Cards */}
        <section>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            Region-Status
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {regionStatus.map((rs) => (
              <div
                key={rs.region}
                className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/30 p-5"
              >
                <div className="flex items-center justify-between mb-2">
                  <RegionBadge region={rs.region} />
                  <span
                    className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full"
                    style={{
                      backgroundColor: `${rs.color}15`,
                      color: rs.color,
                      border: `1px solid ${rs.color}30`,
                    }}
                  >
                    {rs.status}
                  </span>
                </div>
                <p className="text-sm text-[var(--text-secondary)]">
                  {rs.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Warning Banner */}
        <section className="rounded-lg border border-[var(--accent-warning)]/30 bg-[var(--accent-warning)]/5 p-4 flex items-start gap-3">
          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--accent-warning)]/20 flex items-center justify-center mt-0.5">
            <span className="text-[var(--accent-warning)] text-xs font-bold">
              !
            </span>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--accent-warning)]">
              Vorabinformationen
            </h3>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              KR/TW-Daten sind Vorabinformationen aus fremdsprachigen Quellen.
              Globale Builds können abweichen. Übersetzte Inhalte und Werte
              werden nach Global Release verifiziert.
            </p>
          </div>
        </section>

        {/* Timeline */}
        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6">
            Patch-Verlauf
          </h2>
          <Timeline items={timelineItems} />
        </section>

        {/* Detailed Patch Cards */}
        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6">
            Patch-Details
          </h2>
          <div className="space-y-6">
            {patches.map((patch) => (
              <article
                key={patch.id}
                className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/30 overflow-hidden"
              >
                <div className="p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <RegionBadge region={patch.region} />
                    <Badge
                      variant={
                        patch.status === "live"
                          ? "status-live"
                          : patch.status === "announced"
                          ? "status-announced"
                          : "status-archived"
                      }
                    >
                      {patch.status === "live"
                        ? "Live"
                        : patch.status === "announced"
                        ? "Angekündigt"
                        : "Archiviert"}
                    </Badge>
                    <Badge variant="ghost">Level-Cap {patch.levelCap}</Badge>
                  </div>

                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                    {patch.title}
                  </h3>
                  <time className="text-xs text-[var(--text-muted)]">
                    {patch.date}
                  </time>

                  <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                    {patch.summary}
                  </p>

                  <div className="mt-4">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                      Neue Features
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {patch.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-sm text-[var(--text-secondary)]"
                        >
                          <span className="w-1 h-1 rounded-full bg-[var(--accent-aether)]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Source Links */}
        <section className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/30 p-6">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
            Quellen
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mb-4">
            Patch-Daten stammen aus offiziellen NCSoft-Ankündigungen und
            verifizierten Community-Quellen:
          </p>
          <ul className="space-y-2">
            {[
              {
                label: "Steam Store Page",
                url: "https://store.steampowered.com",
              },
              {
                label: "NCSoft Korea",
                url: "https://aion2.ncsoft.com",
              },
              {
                label: "NCSoft X (Twitter)",
                url: "https://x.com/ncsoft",
              },
            ].map((source) => (
              <li key={source.label}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-[var(--accent-aether)] hover:underline"
                >
                  <ExternalLink className="w-3 h-3" />
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </PageLayout>
  );
}
