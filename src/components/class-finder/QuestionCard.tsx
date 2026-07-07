"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface QuestionOption {
  id: string;
  label: string;
  description?: string;
}

export interface Question {
  id: string;
  question: string;
  options: QuestionOption[];
}

interface QuestionCardProps {
  question: Question;
  selectedOption: string | null;
  onSelect: (optionId: string) => void;
  onNext: () => void;
  onBack: () => void;
  canGoBack: boolean;
  direction: number;
}

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -200 : 200,
    opacity: 0,
  }),
};

export function QuestionCard({
  question,
  selectedOption,
  onSelect,
  onNext,
  onBack,
  canGoBack,
  direction,
}: QuestionCardProps) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={question.id}
        custom={direction}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="space-y-6"
      >
        {/* Question text */}
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)] font-serif">
          {question.question}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={option.id}
              data-testid={`option-${index}`}
              onClick={() => onSelect(option.id)}
              className={cn(
                "w-full min-h-14 px-4 py-3 rounded-lg border text-left transition-all duration-200",
                selectedOption === option.id
                  ? "border-[var(--accent-aether)] bg-[var(--accent-aether)]/10"
                  : "border-[var(--border-subtle)] bg-[var(--surface-elevated)] hover:border-[var(--text-muted)]"
              )}
            >
              <span
                className={cn(
                  "text-sm font-medium",
                  selectedOption === option.id
                    ? "text-[var(--accent-aether)]"
                    : "text-[var(--text-primary)]"
                )}
              >
                {option.label}
              </span>
              {option.description && (
                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  {option.description}
                </p>
              )}
            </button>
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between pt-4">
          <button
            onClick={onBack}
            disabled={!canGoBack}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm transition-all",
              canGoBack
                ? "border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--text-muted)] hover:text-[var(--text-primary)]"
                : "border-[var(--border-subtle)]/50 text-[var(--text-muted)] cursor-not-allowed opacity-50"
            )}
          >
            <ArrowLeft size={16} />
            Zurück
          </button>

          <button
            onClick={onNext}
            disabled={!selectedOption}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all",
              selectedOption
                ? "bg-[var(--accent-aether)] text-[var(--bg-abyss)] hover:bg-[var(--accent-aether)]/90"
                : "bg-[var(--accent-aether)]/30 text-[var(--text-muted)] cursor-not-allowed"
            )}
          >
            Weiter
            <ArrowRight size={16} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
