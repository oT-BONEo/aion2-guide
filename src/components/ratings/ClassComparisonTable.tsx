"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { RatingBar } from "./RatingBar";
import { ratingShortLabels } from "@/data/class-ratings";
import type { RatingKey, ClassRating } from "@/data/class-ratings";
import { classes } from "@/data/classes";

interface ClassComparisonTableProps {
  ratings: ClassRating[];
  className?: string;
}

const tableKeys: RatingKey[] = [
  "soloPve", "groupPve", "soloPvp", "teamPvp", "massPvp",
  "mechanicalDemand", "beginnerFriendly",
];

function getClassName(classId: string): string {
  const cls = classes.find((c) => c.id === classId);
  return cls?.names.deProvisional ?? classId;
}

function getClassSlug(classId: string): string {
  const cls = classes.find((c) => c.id === classId);
  return cls?.slug ?? classId;
}

function getRole(classId: string): string {
  const cls = classes.find((c) => c.id === classId);
  return cls?.roles[0] ?? "";
}

export function ClassComparisonTable({ ratings, className }: ClassComparisonTableProps) {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {/* Desktop Table */}
      <div className="hidden md:block rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] overflow-hidden overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[var(--bg-elevated)]/50 border-b border-[var(--border-subtle)]">
              <th className="text-left px-4 py-3 font-semibold text-[var(--text-primary)] sticky left-0 bg-[var(--bg-elevated)]/50">Klasse</th>
              <th className="text-left px-3 py-3 font-semibold text-[var(--text-muted)] text-xs">Rolle</th>
              {tableKeys.map((key) => (
                <th key={key} className="text-center px-2 py-3 font-semibold text-[var(--text-muted)] text-xs min-w-[72px]">
                  {ratingShortLabels[key]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ratings.map((cr) => (
              <tr key={cr.classId} className="border-b border-[var(--border-subtle)] last:border-0 hover:bg-[var(--bg-elevated)]/20 transition-colors">
                <td className="px-4 py-3 sticky left-0 bg-[var(--surface-card)]">
                  <Link href={`/klassen/${getClassSlug(cr.classId)}/`} className="font-medium text-[var(--accent-aether)] hover:underline">
                    {getClassName(cr.classId)}
                  </Link>
                </td>
                <td className="px-3 py-3 text-[var(--text-muted)] text-xs capitalize">{getRole(cr.classId)}</td>
                {tableKeys.map((key) => (
                  <td key={key} className="px-2 py-3">
                    <div className="flex items-center justify-center gap-1.5">
                      <RatingBar value={cr.ratings[key].value} size="sm" className="w-12" />
                      <span className="text-xs font-semibold text-[var(--text-secondary)] w-6">{cr.ratings[key].value}</span>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {ratings.map((cr) => {
          const isExpanded = expandedRow === cr.classId;
          return (
            <div key={cr.classId} className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] overflow-hidden">
              <button
                onClick={() => setExpandedRow(isExpanded ? null : cr.classId)}
                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-[var(--bg-elevated)]/20 transition-colors"
              >
                <div>
                  <Link href={`/klassen/${getClassSlug(cr.classId)}/`} className="font-medium text-[var(--accent-aether)] hover:underline text-sm" onClick={(e) => e.stopPropagation()}>
                    {getClassName(cr.classId)}
                  </Link>
                  <span className="text-xs text-[var(--text-muted)] ml-2 capitalize">{getRole(cr.classId)}</span>
                </div>
                <ChevronDown size={16} className={`text-[var(--text-muted)] transition-transform ${isExpanded ? "rotate-180" : ""}`} />
              </button>
              {isExpanded && (
                <div className="px-4 pb-3 space-y-2 border-t border-[var(--border-subtle)] pt-3">
                  {tableKeys.map((key) => (
                    <div key={key} className="flex items-center gap-3">
                      <span className="text-xs text-[var(--text-muted)] w-24 shrink-0">{ratingShortLabels[key]}</span>
                      <RatingBar value={cr.ratings[key].value} size="sm" className="flex-1" />
                      <span className="text-xs font-semibold text-[var(--text-secondary)] w-6 text-right">{cr.ratings[key].value}</span>
                    </div>
                  ))}
                  <Link href={`/klassen/${getClassSlug(cr.classId)}/`} className="inline-flex items-center gap-1 text-xs text-[var(--accent-aether)] hover:underline mt-2">
                    Details <ArrowRight size={12} />
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
