"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  ArrowLeft,
  Wrench,
  ShieldAlert,
  AlertTriangle,
  ChevronDown,
  Info,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { PageLayout } from "@/components/layout/PageLayout";
import type { AionClass } from "@/data";
import {
  plannerSlots,
  plannerSlotLabels,
  plannerStatLabels,
  rarityLabels,
  rarityOrder,
} from "@/data/build-planner/types";
import { getItemsForSlot, getItemById } from "@/data/build-planner/items";
import { calculateStats } from "@/data/build-planner/stat-formulas";
import type { PlannerSelection, PlannerSlot } from "@/data/build-planner/types";

interface BuildPlannerClientProps {
  cls: AionClass;
}

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function BuildPlannerClient({ cls }: BuildPlannerClientProps) {
  const [selection, setSelection] = useState<PlannerSelection>({});
  const [expandedSlot, setExpandedSlot] = useState<PlannerSlot | null>(null);

  const stats = useMemo(() => calculateStats(selection), [selection]);

  const equippedCount = useMemo(
    () => Object.values(selection).filter(Boolean).length,
    [selection]
  );

  function handleSelect(slot: PlannerSlot, itemId: string) {
    setSelection((prev) => ({ ...prev, [slot]: itemId }));
    setExpandedSlot(null);
  }

  function handleClear(slot: PlannerSlot) {
    setSelection((prev) => {
      const next: PlannerSelection = { ...prev };
      delete next[slot];
      return next;
    });
  }

  return (
    <PageLayout>
      {/* Kopfbereich */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="pt-24 pb-8 px-4 sm:px-6"
      >
        <div className="max-w-6xl mx-auto">
          <Link
            href={`/klassen/${cls.slug}/`}
            className="inline-flex items-center gap-1 text-sm text-[var(--accent-aether)] hover:underline mb-4"
          >
            <ArrowLeft size={14} />
            Zurück zu {cls.names.deProvisional}
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] font-serif">
              Build-Planner für {cls.names.deProvisional}
            </h1>
            <Badge variant="confidence-experimental">Vorläufig</Badge>
          </div>

          <p className="text-sm text-[var(--text-secondary)] mb-2">
            Rolle: {cls.roles.join(" / ")} · Vorläufiger Gear-Simulator auf Basis der aktuellen Datenlage.
          </p>

          <div className="flex items-start gap-2 text-xs text-[var(--text-muted)]">
            <ShieldAlert size={12} className="mt-0.5 flex-shrink-0" />
            <span>
              Werte sind Papierwerte und kein DPS-Rechner. Sie ersetzen keine Ingame-Tests.
            </span>
          </div>
        </div>
      </motion.section>

      {/* Hauptbereich: Slots + Stats */}
      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* B. Gear-/Slot-Auswahl */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-3"
          >
            <h2 className="text-lg font-semibold text-[var(--text-primary)] font-serif flex items-center gap-2 mb-4">
              <Wrench size={18} className="text-[var(--accent-aether)]" />
              Gear-Auswahl ({equippedCount}/{plannerSlots.length})
            </h2>

            {plannerSlots.map((slot) => {
              const selectedId = selection[slot];
              const selectedItem = selectedId ? getItemById(selectedId) : undefined;
              const availableItems = getItemsForSlot(slot, cls.id);
              const isExpanded = expandedSlot === slot;

              return (
                <div
                  key={slot}
                  className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] overflow-hidden"
                >
                  {/* Slot Header */}
                  <button
                    onClick={() =>
                      setExpandedSlot(isExpanded ? null : slot)
                    }
                    className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-[var(--bg-elevated)]/20 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-[var(--text-primary)] capitalize">
                        {plannerSlotLabels[slot]}
                      </span>
                      {selectedItem ? (
                        <span className="text-xs text-[var(--text-secondary)] truncate max-w-[200px] sm:max-w-xs">
                          {selectedItem.name}
                        </span>
                      ) : (
                        <span className="text-xs text-[var(--text-muted)] italic">
                          Kein Item gewählt
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedItem && (
                        <Badge
                          variant="ghost"
                          className="text-[10px]"
                        >
                          {rarityLabels[selectedItem.rarity]}
                        </Badge>
                      )}
                      <ChevronDown
                        size={14}
                        className={`text-[var(--text-muted)] transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </div>
                  </button>

                  {/* Slot Items */}
                  {isExpanded && (
                    <div className="border-t border-[var(--border-subtle)] px-4 py-3 space-y-2 max-h-[320px] overflow-y-auto">
                      {availableItems.length === 0 ? (
                        <p className="text-xs text-[var(--text-muted)] py-2">
                          Keine Items für diesen Slot verfügbar.
                        </p>
                      ) : (
                        availableItems
                          .sort(
                            (a, b) =>
                              rarityOrder[b.rarity] - rarityOrder[a.rarity]
                          )
                          .map((item) => (
                            <button
                              key={item.id}
                              onClick={() => handleSelect(slot, item.id)}
                              className={`w-full flex items-center justify-between rounded-lg border px-3 py-2 text-left transition-colors ${
                                selectedId === item.id
                                  ? "border-[var(--accent-aether)] bg-[var(--accent-aether)]/10"
                                  : "border-[var(--border-subtle)] hover:bg-[var(--bg-elevated)]/30"
                              }`}
                            >
                              <div>
                                <span className="text-xs font-medium text-[var(--text-primary)] block">
                                  {item.name}
                                </span>
                                <span className="text-[10px] text-[var(--text-muted)]">
                                  {Object.entries(item.stats)
                                    .map(
                                      ([k, v]) =>
                                        `${plannerStatLabels[k as keyof typeof plannerStatLabels] ?? k}: +${v}`
                                    )
                                    .join(" · ")}
                                </span>
                              </div>
                              <Badge
                                variant="ghost"
                                className="text-[10px] shrink-0"
                              >
                                {rarityLabels[item.rarity]}
                              </Badge>
                            </button>
                          ))
                      )}

                      {selectedItem && (
                        <button
                          onClick={() => handleClear(slot)}
                          className="w-full text-xs text-[var(--accent-danger)] hover:underline py-1"
                        >
                          Auswahl entfernen
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </motion.div>

          {/* C. Papierwerte / Stat-Zusammenfassung */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-5">
              <h2 className="text-lg font-semibold text-[var(--text-primary)] font-serif mb-4">
                Papierwerte
              </h2>

              <div className="space-y-3">
                {(
                  [
                    "attack",
                    "magicAttack",
                    "crit",
                    "accuracy",
                    "defense",
                    "magicDefense",
                    "hp",
                    "mp",
                    "movement",
                    "cooldownReduction",
                  ] as const
                ).map((key) => {
                  const value = stats[key];
                  const isCapped =
                    (key === "cooldownReduction" && value >= 60) ||
                    (key === "movement" && value >= 150);

                  return (
                    <div
                      key={key}
                      className="flex items-center justify-between"
                    >
                      <span className="text-xs text-[var(--text-secondary)]">
                        {plannerStatLabels[key]}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-sm font-semibold ${value > 0 ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"}`}
                        >
                          {value}
                        </span>
                        {isCapped && (
                          <Badge
                            variant="confidence-experimental"
                            className="text-[10px]"
                          >
                            Cap
                          </Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Hinweis */}
              <div className="mt-5 pt-4 border-t border-[var(--border-subtle)] flex items-start gap-2">
                <AlertTriangle
                  size={12}
                  className="text-[var(--accent-warning)] mt-0.5 flex-shrink-0"
                />
                <p className="text-[10px] text-[var(--text-muted)] leading-relaxed">
                  Diese Werte sind Papierwerte aus den ausgewählten Items. Sie
                  ersetzen keine Ingame-Tests und keine vollständige
                  Kampfsimulation.
                </p>
              </div>

              {/* Speichern-Hinweis */}
              <div className="mt-3 pt-3 border-t border-[var(--border-subtle)] flex items-start gap-2">
                <Info size={12} className="text-[var(--accent-aether)] mt-0.5 flex-shrink-0" />
                <p className="text-[10px] text-[var(--text-muted)] leading-relaxed">
                  Speichern kommt später. Momentan sind die Auswahlen nur im
                  Browser-Sitzung aktiv.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
