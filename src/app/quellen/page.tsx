import { PageLayout } from "@/components/layout/PageLayout";
import { sources } from "@/data/sources";
import { Badge } from "@/components/ui/Badge";
import { ReliabilityBadge } from "@/components/ui/ReliabilityBadge";
import { ExternalLink, Shield, AlertTriangle, CheckCircle, HelpCircle, Info } from "lucide-react";

const confidenceLevels = [
  {
    level: 5,
    label: "Offiziell (5/5)",
    description: "Direkt von NCSoft oder autorisierten Partnern veröffentlicht.",
    icon: Shield,
    color: "var(--accent-success)",
  },
  {
    level: 4,
    label: "Hohe Quellenstärke (4/5)",
    description: "Von mehreren unabhängigen Quellen bestätigt.",
    icon: CheckCircle,
    color: "var(--accent-aether)",
  },
  {
    level: 3,
    label: "Community (3/5)",
    description: "Aus etablierten Community-Projekten mit Datamining.",
    icon: Info,
    color: "var(--accent-elyos)",
  },
  {
    level: 2,
    label: "Experimentell (2/5)",
    description: "Einzelne Beobachtungen oder unbestätigte Informationen.",
    icon: HelpCircle,
    color: "var(--accent-warning)",
  },
  {
    level: 1,
    label: "Gerücht (1/5)",
    description: "Nicht verifiziert – kann sich als falsch herausstellen.",
    icon: AlertTriangle,
    color: "var(--accent-danger)",
  },
];

const typeLabels: Record<string, string> = {
  official: "Offiziell",
  community: "Community",
  news: "News",
  guide: "Guide",
  stream: "Stream",
  database: "Datenbank",
  video: "Video",
  social: "Social Media",
};

const languageLabels: Record<string, string> = {
  ko: "Koreanisch",
  en: "Englisch",
  de: "Deutsch",
  zh: "Chinesisch",
};

export default function QuellenPage() {
  // Group sources by reliability tier
  const highReliability = sources.filter((s) => s.reliability >= 4);
  const mediumReliability = sources.filter((s) => s.reliability === 3);
  const lowReliability = sources.filter((s) => s.reliability <= 2);

  return (
    <PageLayout
      title="Quellenverzeichnis"
      subtitle="Transparenz über Datenherkunft und Vertrauenswürdigkeit"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 space-y-12">
        {/* Confidence Legend */}
        <section className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/50 p-6">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            Vertrauensskala
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mb-4">
            Jede Quelle wird nach folgender Skala bewertet. Alle Angaben auf
            dieser Seite enthalten einen Quellenstärke-Tag, der diese Bewertung
            widerspiegelt:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {confidenceLevels.map((cl) => {
              const Icon = cl.icon;
              return (
                <div
                  key={cl.level}
                  className="rounded-lg border border-[var(--border-subtle)] p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon
                      className="w-4 h-4"
                      style={{ color: cl.color }}
                    />
                    <span
                      className="text-xs font-semibold"
                      style={{ color: cl.color }}
                    >
                      {cl.level}/5
                    </span>
                  </div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">
                    {cl.label.split(" ")[0]}
                  </p>
                  <p className="mt-1 text-xs text-[var(--text-secondary)]">
                    {cl.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Sources - Desktop Table */}
        <section className="hidden md:block">
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
            Alle Quellen
          </h2>
          <div className="overflow-x-auto rounded-xl border border-[var(--border-subtle)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--bg-elevated)]/50 border-b border-[var(--border-subtle)]">
                  <th className="text-left px-4 py-3 font-semibold text-[var(--text-primary)]">
                    Titel
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-[var(--text-primary)]">
                    Herausgeber
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-[var(--text-primary)]">
                    Typ
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-[var(--text-primary)]">
                    Sprache
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-[var(--text-primary)]">
                    Vertrauen
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-[var(--text-primary)]">
                    Zuletzt geprüft
                  </th>
                </tr>
              </thead>
              <tbody>
                {sources.map((source, i) => (
                  <tr
                    key={source.id}
                    className={`border-b border-[var(--border-subtle)] last:border-0 ${
                      i % 2 === 0 ? "bg-[var(--bg-elevated)]/20" : ""
                    }`}
                  >
                    <td className="px-4 py-3">
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[var(--accent-aether)] hover:underline font-medium"
                      >
                        {source.title}
                        <ExternalLink className="w-3 h-3 flex-shrink-0" />
                      </a>
                      {source.notes && (
                        <p className="text-xs text-[var(--text-muted)] mt-0.5">
                          {source.notes}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-[var(--text-secondary)]">
                      {source.publisher}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="default">
                        {typeLabels[source.type] || source.type}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-[var(--text-secondary)]">
                      {languageLabels[source.language] || source.language}
                    </td>
                    <td className="px-4 py-3">
                      <ReliabilityBadge reliability={source.reliability} />
                    </td>
                    <td className="px-4 py-3 text-[var(--text-muted)] text-xs">
                      {source.lastChecked}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Sources - Mobile Card Layout */}
        <section className="md:hidden space-y-6">
          {[
            { title: "Hohe Vertrauenswürdigkeit", items: highReliability },
            { title: "Mittlere Vertrauenswürdigkeit", items: mediumReliability },
            { title: "Niedrige Vertrauenswürdigkeit", items: lowReliability },
          ].map((tier) =>
            tier.items.length > 0 ? (
              <div key={tier.title}>
                <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
                  {tier.title}
                </h2>
                <div className="space-y-3">
                  {tier.items.map((source) => (
                    <div
                      key={source.id}
                      className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/30 p-4"
                    >
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[var(--accent-aether)] hover:underline font-medium"
                      >
                        {source.title}
                        <ExternalLink className="w-3 h-3 flex-shrink-0" />
                      </a>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">
                        {source.publisher}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Badge variant="default">
                          {typeLabels[source.type] || source.type}
                        </Badge>
                        <Badge variant="ghost">
                          {languageLabels[source.language] ||
                            source.language}
                        </Badge>
                        <ReliabilityBadge reliability={source.reliability} />
                      </div>
                      {source.notes && (
                        <p className="mt-2 text-xs text-[var(--text-secondary)]">
                          {source.notes}
                        </p>
                      )}
                      <p className="mt-2 text-xs text-[var(--text-muted)]">
                        Geprüft: {source.lastChecked}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null
          )}
        </section>

        {/* Legend - repeated for mobile */}
        <section className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/20 p-4 md:hidden">
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">
            Vertrauensskala
          </h3>
          <div className="space-y-2">
            {confidenceLevels.map((cl) => (
              <div key={cl.level} className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: cl.color }}
                />
                <span className="text-xs text-[var(--text-secondary)]">
                  {cl.level}/5 – {cl.label.split("(")[0]}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
