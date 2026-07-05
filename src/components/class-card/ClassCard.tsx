"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { StatBar } from "@/components/ui/StatBar";
import { ConfidenceBadge } from "@/components/ui/ConfidenceBadge";
import { getRoleBadgeVariant } from "@/lib/adapters";
import { cn } from "@/lib/utils";

export interface ClassCardViewModel {
  slug: string;
  name: {
    de: string;
    en: string;
    deConfirmed: boolean;
  };
  imageUrl: string;
  weapon: string;
  roles: string[];
  stats: {
    difficulty: number;
    solo: number;
    pve: number;
  };
  researchStatus: "official" | "verified" | "community-consensus" | "experimental" | "obsolete";
}

interface ClassCardProps {
  cls: ClassCardViewModel;
  index?: number;
}

export function ClassCard({ cls, index = 0 }: ClassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
    >
      <Link
        href={`/klassen/${cls.slug}/`}
        className={cn(
          "group block rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] overflow-hidden",
          "hover:-translate-y-1 hover:border-[var(--accent-aether)]/40 transition-all duration-300"
        )}
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={cls.imageUrl}
            alt={cls.name.de}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-abyss)] via-transparent to-transparent" />
          {!cls.name.deConfirmed && (
            <div className="absolute top-3 left-3">
              <Badge variant="confidence-experimental" className="text-[10px]">
                Provisorisch
              </Badge>
            </div>
          )}
        </div>
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-serif text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-aether)] transition-colors">
              {cls.name.de}
            </h3>
            <p className="text-sm text-[var(--text-muted)]">{cls.name.en}</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {cls.roles.map((role) => (
              <Badge
                key={role}
                variant={getRoleBadgeVariant(role)}
                className="text-[10px]"
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </Badge>
            ))}
          </div>
          <p className="text-xs text-[var(--text-secondary)]">
            Waffe: {cls.weapon}
          </p>
          <div className="space-y-2">
            <StatBar value={cls.stats.difficulty} label="Schwierigkeit" showLabel />
            <StatBar value={cls.stats.solo} label="Solo" />
            <StatBar value={cls.stats.pve} label="PvE" />
          </div>
          <div className="pt-1">
            <ConfidenceBadge status={cls.researchStatus} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
