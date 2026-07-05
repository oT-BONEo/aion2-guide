"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ClassFiltersState {
  roles: string[];
  ranges: string[];
  difficulty: number | null;
  researchStatus: string | null;
}

interface ClassFiltersProps {
  filters: ClassFiltersState;
  onChange: (filters: ClassFiltersState) => void;
}

const roleOptions = [
  { value: "tank", label: "Tank" },
  { value: "heiler", label: "Heiler" },
  { value: "support", label: "Support" },
  { value: "dps", label: "DPS" },
  { value: "kontrolle", label: "Kontrolle" },
];

const rangeOptions = [
  { value: "nahkampf", label: "Nahkampf" },
  { value: "fernkampf", label: "Fernkampf" },
];

const statusOptions = [
  { value: "official", label: "Offiziell" },
  { value: "community-consensus", label: "Community" },
  { value: "experimental", label: "Experimentell" },
];

export function ClassFilters({ filters, onChange }: ClassFiltersProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleRole = (role: string) => {
    const next = filters.roles.includes(role)
      ? filters.roles.filter((r) => r !== role)
      : [...filters.roles, role];
    onChange({ ...filters, roles: next });
  };

  const toggleRange = (range: string) => {
    const next = filters.ranges.includes(range)
      ? filters.ranges.filter((r) => r !== range)
      : [...filters.ranges, range];
    onChange({ ...filters, ranges: next });
  };

  const setDifficulty = (d: number | null) => {
    onChange({ ...filters, difficulty: d === filters.difficulty ? null : d });
  };

  const setStatus = (s: string | null) => {
    onChange({
      ...filters,
      researchStatus: s === filters.researchStatus ? null : s,
    });
  };

  const reset = () => {
    onChange({
      roles: [],
      ranges: [],
      difficulty: null,
      researchStatus: null,
    });
  };

  const hasFilters =
    filters.roles.length > 0 ||
    filters.ranges.length > 0 ||
    filters.difficulty !== null ||
    filters.researchStatus !== null;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Role filter */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-3">
          Rolle
        </h4>
        <div className="flex flex-wrap gap-2">
          {roleOptions.map((role) => (
            <button
              key={role.value}
              onClick={() => toggleRole(role.value)}
              className={cn(
                "px-3 py-1.5 text-xs rounded-full border transition-all",
                filters.roles.includes(role.value)
                  ? "bg-[var(--accent-aether)]/20 border-[var(--accent-aether)]/50 text-[var(--accent-aether)]"
                  : "bg-transparent border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--text-muted)]"
              )}
            >
              {role.label}
            </button>
          ))}
        </div>
      </div>

      {/* Range filter */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-3">
          Reichweite
        </h4>
        <div className="flex flex-wrap gap-2">
          {rangeOptions.map((range) => (
            <button
              key={range.value}
              onClick={() => toggleRange(range.value)}
              className={cn(
                "px-3 py-1.5 text-xs rounded-full border transition-all",
                filters.ranges.includes(range.value)
                  ? "bg-[var(--accent-aether)]/20 border-[var(--accent-aether)]/50 text-[var(--accent-aether)]"
                  : "bg-transparent border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--text-muted)]"
              )}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty filter */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-3">
          Schwierigkeit
        </h4>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={cn(
                "w-8 h-8 rounded-md border text-xs font-medium transition-all",
                filters.difficulty === d
                  ? "bg-[var(--accent-aether)]/20 border-[var(--accent-aether)] text-[var(--accent-aether)]"
                  : "bg-transparent border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--text-muted)]"
              )}
              title={`Schwierigkeit ${d}`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Research status filter */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-3">
          Recherche-Status
        </h4>
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((status) => (
            <button
              key={status.value}
              onClick={() => setStatus(status.value)}
              className={cn(
                "px-3 py-1.5 text-xs rounded-full border transition-all",
                filters.researchStatus === status.value
                  ? "bg-[var(--accent-aether)]/20 border-[var(--accent-aether)]/50 text-[var(--accent-aether)]"
                  : "bg-transparent border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--text-muted)]"
              )}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reset */}
      {hasFilters && (
        <button
          onClick={reset}
          className="flex items-center gap-2 text-xs text-[var(--text-muted)] hover:text-[var(--accent-aether)] transition-colors"
        >
          <RotateCcw size={12} />
          Zur&uuml;cksetzen
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop filters */}
      <div className="hidden md:block">
        <FilterContent />
      </div>

      {/* Mobile filter button + drawer */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMobileOpen(true)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition-all",
            hasFilters
              ? "border-[var(--accent-aether)]/50 text-[var(--accent-aether)] bg-[var(--accent-aether)]/10"
              : "border-[var(--border-subtle)] text-[var(--text-secondary)]"
          )}
        >
          <SlidersHorizontal size={16} />
          Filter
          {hasFilters && (
            <span className="w-5 h-5 rounded-full bg-[var(--accent-aether)] text-[var(--bg-abyss)] text-[10px] font-bold flex items-center justify-center">
              {filters.roles.length +
                filters.ranges.length +
                (filters.difficulty ? 1 : 0) +
                (filters.researchStatus ? 1 : 0)}
            </span>
          )}
        </button>

        <AnimatePresence>
          {isMobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-40"
                onClick={() => setIsMobileOpen(false)}
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-[var(--bg-abyss)] border-l border-[var(--border-subtle)] z-50 p-6 overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-serif text-lg font-semibold text-[var(--text-primary)]">
                    Filter
                  </h3>
                  <button
                    onClick={() => setIsMobileOpen(false)}
                    className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <FilterContent />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
