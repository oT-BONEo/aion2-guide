"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, BookOpen, Swords, Shield, Zap, GitBranch, XCircle, Link2, Wrench } from "lucide-react";
import { getSourceById } from "@/data/sources";
import { cn } from "@/lib/utils";
import type { BuildGuide } from "@/data/builds";

interface BuildTabsProps {
  build: BuildGuide;
}

type TabId =
  | "overview"
  | "skills"
  | "stigmen"
  | "stats-gear"
  | "rotation"
  | "alternatives"
  | "mistakes"
  | "sources";

interface TabDef {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

const tabs: TabDef[] = [
  { id: "overview", label: "Übersicht", icon: <BookOpen size={14} /> },
  { id: "skills", label: "Skills", icon: <Swords size={14} /> },
  { id: "stigmen", label: "Stigmen", icon: <Shield size={14} /> },
  { id: "stats-gear", label: "Stats & Gear", icon: <Zap size={14} /> },
  { id: "rotation", label: "Rotation", icon: <GitBranch size={14} /> },
  { id: "alternatives", label: "Alternativen", icon: <GitBranch size={14} /> },
  { id: "mistakes", label: "Fehler", icon: <XCircle size={14} /> },
  { id: "sources", label: "Quellen", icon: <Link2 size={14} /> },
];

// ── In Bearbeitung placeholder ─────────────────────────────────────

function WorkInProgress({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="py-8">
      <div className="flex items-center gap-2 mb-4">
        <Wrench size={16} className="text-[var(--accent-warning)]" />
        <h3 className="text-sm font-semibold text-[var(--accent-warning)] uppercase tracking-wider">
          In Bearbeitung
        </h3>
      </div>
      <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5">
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          {children}
        </p>
      </div>
      <h4 className="mt-6 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
        {title}
      </h4>
    </div>
  );
}

// ── Tab Content ────────────────────────────────────────────────────

function OverviewTab({ build }: { build: BuildGuide }) {
  return (
    <div className="space-y-6">
      {/* Playstyle */}
      <div>
        <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
          Spielstil
        </h3>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          {build.playstyle}
        </p>
      </div>

      {/* Strengths */}
      {build.strengths.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-[var(--accent-success)] uppercase tracking-wider mb-2">
            Stärken
          </h3>
          <ul className="space-y-1.5">
            {build.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                <span className="text-[var(--accent-success)] mt-0.5 shrink-0">+</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Weaknesses */}
      {build.weaknesses.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-[var(--accent-danger)] uppercase tracking-wider mb-2">
            Schwächen
          </h3>
          <ul className="space-y-1.5">
            {build.weaknesses.map((w, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                <span className="text-[var(--accent-danger)] mt-0.5 shrink-0">-</span>
                {w}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function SkillsTab() {
  return (
    <WorkInProgress title="Skill-Build">
      Hier wird der vollständige Skill-Build mit Punktverteilung, Skill-Beschreibungen
      und Empfehlungen für die Reihenfolge beim Leveln angezeigt. Die Daten werden aus
      koreanischen Quellen übersetzt und geprüft.
    </WorkInProgress>
  );
}

function StigmenTab() {
  return (
    <WorkInProgress title="Stigma-Build">
      Hier wird der empfohlene Stigma-Build mit allen Slots, alternative Stigmen für
      verschiedene Situationen und eine Begründung für die Auswahl angezeigt. Stigmen
      sind essenzielle Skill-Modifikationen, die deinen Spielstil maßgeblich beeinflussen.
    </WorkInProgress>
  );
}

function StatsGearTab({ build }: { build: BuildGuide }) {
  return (
    <div className="space-y-6">
      {/* Stat priorities */}
      <div>
        <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
          Stat-Prioritäten
        </h3>
        {build.statPriorities.length === 0 ? (
          <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4">
            <p className="text-sm text-[var(--text-secondary)]">
              Noch keine geprüften Stat-Prioritäten hinterlegt. Konkrete Werte
              werden erst ergänzt, wenn sie aus KR/TW-Quellen, Patchnotes oder
              dem Global-Client überprüft wurden.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {build.statPriorities.map((sp) => (
              <div
                key={sp.stat}
                className="flex items-center gap-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--accent-aether)]/15 text-[var(--accent-aether)] text-xs font-bold flex items-center justify-center">
                  {sp.priority}
                </span>
                <div>
                  <span className="text-sm font-medium text-[var(--text-primary)]">
                    {sp.stat}
                  </span>
                  <p className="text-xs text-[var(--text-muted)]">{sp.reason}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Gear recommendations */}
      <div>
        <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
          Gear-Empfehlungen
        </h3>
        {build.gear.length === 0 ? (
          <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4">
            <p className="text-sm text-[var(--text-secondary)]">
              Noch keine geprüften Gear-Empfehlungen hinterlegt. Es werden
              bewusst keine erfundenen Best-in-Slot-Listen angezeigt.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {build.gear.map((g) => (
              <div
                key={g.slot}
                className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4"
              >
                <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                  {g.slot}
                </h4>
                <p className="text-sm text-[var(--accent-aether)] mb-1">
                  {g.recommendation}
                </p>
                {g.alternatives && g.alternatives.length > 0 && (
                  <p className="text-xs text-[var(--text-muted)] mb-1">
                    Alternativen: {g.alternatives.join(", ")}
                  </p>
                )}
                {g.notes && (
                  <p className="text-xs text-[var(--text-secondary)]">{g.notes}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function RotationTab({ build }: { build: BuildGuide }) {
  return (
    <div className="space-y-6">
      {/* Rotation type badge */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
          Rotations-Typ:
        </span>
        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--accent-aether)]/15 text-[var(--accent-aether)] border border-[var(--accent-aether)]/30">
          {build.rotationType === "priority" && "Prioritätsrotation"}
          {build.rotationType === "fixed" && "Fixe Rotation"}
          {build.rotationType === "situational" && "Situationsabhängig"}
        </span>
      </div>

      {/* Rotation steps */}
      {build.rotation.length > 0 ? (
        <div className="space-y-2">
          {build.rotation.map((step) => (
            <div
              key={step.step}
              className="flex items-start gap-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3"
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--accent-aether)]/15 text-[var(--accent-aether)] text-xs font-bold flex items-center justify-center">
                {step.step}
              </span>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium text-[var(--text-primary)]">
                  {step.skill}
                </span>
                {step.condition && (
                  <span className="ml-2 text-xs text-[var(--accent-warning)]">
                    [{step.condition}]
                  </span>
                )}
                {step.notes && (
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">{step.notes}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <WorkInProgress title="Rotation">
          Die detaillierte Rotationsanleitung mit Prioritäten, Cooldown-Management
          und situationsabhängigen Anpassungen wird hier angezeigt.
        </WorkInProgress>
      )}
    </div>
  );
}

function AlternativesTab({ build }: { build: BuildGuide }) {
  if (build.alternatives.length === 0) {
    return (
      <WorkInProgress title="Alternative Builds">
        Alternative Build-Varianten für verschiedene Spielsituationen werden hier
        aufgelistet, inklusive Begründung wann welche Variante sinnvoll ist.
      </WorkInProgress>
    );
  }

  return (
    <div className="space-y-4">
      {build.alternatives.map((alt, i) => (
        <div
          key={i}
          className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4"
        >
          <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1">
            {alt.name}
          </h4>
          <p className="text-sm text-[var(--text-secondary)] mb-2">
            {alt.description}
          </p>
          <p className="text-xs text-[var(--accent-aether)]">
            Wann: {alt.when}
          </p>
        </div>
      ))}
    </div>
  );
}

function MistakesTab({ build }: { build: BuildGuide }) {
  if (build.commonMistakes.length === 0) {
    return (
      <WorkInProgress title="Häufige Fehler">
        Die Liste häufiger Fehler und Tipps zur Vermeidung wird hier angezeigt.
        Diese basieren auf Community-Feedback und koreanischen Spieler-Erfahrungen.
      </WorkInProgress>
    );
  }

  return (
    <div className="space-y-3">
      {build.commonMistakes.map((m, i) => (
        <div
          key={i}
          className="flex items-start gap-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3"
        >
          <AlertTriangle
            size={16}
            className="text-[var(--accent-warning)] mt-0.5 shrink-0"
          />
          <span className="text-sm text-[var(--text-secondary)]">{m}</span>
        </div>
      ))}
    </div>
  );
}

function SourcesTab({ build }: { build: BuildGuide }) {
  return (
    <div className="space-y-6">
      {/* Source list */}
      <div>
        <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
          Quellen
        </h3>
        <ul className="space-y-2">
          {build.sourceIds.map((sid) => {
            const source = getSourceById(sid);

            if (!source) {
              return (
                <li
                  key={sid}
                  className="flex items-center gap-2 text-sm text-[var(--accent-danger)]"
                >
                  <Link2 size={12} className="text-[var(--accent-danger)] shrink-0" />
                  Fehlende Quelle im Quellenregister: {sid}
                </li>
              );
            }

            return (
              <li
                key={sid}
                className="flex flex-wrap items-center gap-2 text-sm text-[var(--text-secondary)]"
              >
                <Link2 size={12} className="text-[var(--text-muted)] shrink-0" />
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent-aether)] hover:underline"
                >
                  {source.title}
                </a>
                <span className="text-[var(--text-muted)]">
                  ({source.publisher})
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Editorial notes */}
      {build.editorialNotes.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-[var(--accent-warning)] uppercase tracking-wider mb-3">
            Redaktionelle Hinweise
          </h3>
          <div className="space-y-2">
            {build.editorialNotes.map((note, i) => (
              <p
                key={i}
                className="text-sm text-[var(--text-muted)] border-l-2 border-[var(--accent-warning)]/30 pl-3"
              >
                {note}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Tabs Component ────────────────────────────────────────────

export function BuildTabs({ build }: BuildTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  return (
    <div>
      {/* Tab bar */}
      <div className="border-b border-[var(--border-subtle)] mb-6">
        <div className="flex overflow-x-auto scrollbar-hide gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative flex items-center gap-1.5 px-3 py-3 text-xs sm:text-sm font-medium whitespace-nowrap transition-colors",
                activeTab === tab.id
                  ? "text-[var(--accent-aether)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
              )}
            >
              {tab.icon}
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent-aether)]"
                  transition={{ duration: 0.2 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "overview" && <OverviewTab build={build} />}
          {activeTab === "skills" && <SkillsTab />}
          {activeTab === "stigmen" && <StigmenTab />}
          {activeTab === "stats-gear" && <StatsGearTab build={build} />}
          {activeTab === "rotation" && <RotationTab build={build} />}
          {activeTab === "alternatives" && <AlternativesTab build={build} />}
          {activeTab === "mistakes" && <MistakesTab build={build} />}
          {activeTab === "sources" && <SourcesTab build={build} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
