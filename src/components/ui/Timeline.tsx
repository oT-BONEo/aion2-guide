"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TimelineItem {
  date: string;
  title: string;
  description?: string;
  status: "live" | "announced" | "archived";
}

interface TimelineProps {
  items: TimelineItem[];
}

const statusColors: Record<string, string> = {
  live: "bg-[var(--status-live)]",
  announced: "bg-[var(--status-announced)]",
  archived: "bg-[var(--status-archived)]",
};

const statusGlow: Record<string, string> = {
  live: "shadow-[0_0_8px_var(--status-live)]",
  announced: "shadow-[0_0_8px_var(--status-announced)]",
  archived: "",
};

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[var(--border-subtle)] md:-translate-x-px" />

      <div className="space-y-8">
        {items.map((item, index) => {
          const isLeft = index % 2 === 0;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="relative"
            >
              {/* Dot */}
              <div
                className={cn(
                  "absolute left-4 md:left-1/2 w-3 h-3 rounded-full -translate-x-1.5 z-10 mt-1.5",
                  statusColors[item.status],
                  statusGlow[item.status]
                )}
              />

              {/* Content */}
              <div
                className={cn(
                  "pl-10 md:pl-0 md:w-[calc(50%-2rem)]",
                  isLeft ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                )}
              >
                <div className="p-4 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-elevated)]/50 hover:bg-[var(--surface-elevated)] transition-colors">
                  <span className="text-xs text-[var(--text-muted)] uppercase tracking-wide">
                    {item.date}
                  </span>
                  <h3 className="mt-1 text-base font-semibold text-[var(--text-primary)]">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="mt-1.5 text-sm text-[var(--text-secondary)] leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
