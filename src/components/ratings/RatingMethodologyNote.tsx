"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Scale, Swords, Globe } from "lucide-react";

interface RatingMethodologyNoteProps {
  className?: string;
}

export function RatingMethodologyNote({ className }: RatingMethodologyNoteProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-5">
          <div className="w-10 h-10 rounded-lg bg-[var(--accent-aether)]/10 flex items-center justify-center mb-3">
            <Scale size={20} className="text-[var(--accent-aether)]" />
          </div>
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">Relative Skala</h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            5/5 bedeutet stark im Vergleich der aktuellen neun Klassen, nicht
            objektiv perfekt. Die Skala passt sich bei Meta-Aenderungen an.
          </p>
        </div>

        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-5">
          <div className="w-10 h-10 rounded-lg bg-[var(--accent-elyos)]/10 flex items-center justify-center mb-3">
            <Swords size={20} className="text-[var(--accent-elyos)]" />
          </div>
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">PvE und PvP getrennt</h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Solo-PvE, Gruppen-PvE, Solo-PvP, Team-PvP und Mass-PvP werden
            getrennt betrachtet. Eine Klasse kann in beiden Bereichen stark
            sein – oder nur in einem.
          </p>
        </div>

        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-5">
          <div className="w-10 h-10 rounded-lg bg-[var(--accent-asmodian)]/10 flex items-center justify-center mb-3">
            <Globe size={20} className="text-[var(--accent-asmodian)]" />
          </div>
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">Vorlaeufiger Datenstand</h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Alle Bewertungen basieren auf dem KR/TW-Datenstand. Nach dem
            Global Release werden sie mit lokalen Tests ueberprueft und
            angepasst.
          </p>
        </div>
      </div>

      <div className="mt-4 text-center">
        <Link href="/methodik/" className="inline-flex items-center gap-1 text-sm text-[var(--accent-aether)] hover:underline">
          Methodik ansehen <ArrowRight size={14} />
        </Link>
      </div>
    </motion.div>
  );
}
