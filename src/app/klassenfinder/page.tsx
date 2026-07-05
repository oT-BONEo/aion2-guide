"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Sparkles } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { ProgressStepper } from "@/components/class-finder/ProgressStepper";
import { QuestionCard } from "@/components/class-finder/QuestionCard";
import { ResultCard } from "@/components/class-finder/ResultCard";
import { questions, calculateMatches } from "@/data/classFinder";
import { classProfiles } from "@/data/classFinder";
import type { MatchResult as DataMatchResult } from "@/data/classFinder";

// ── Types ──────────────────────────────────────────────────────────

interface AdaptedMatchResult {
  classSlug: string;
  classNameDe: string;
  classNameEn: string;
  matchPercentage: number;
  reasons: { text: string }[];
  weakness: string;
  keyStats: { label: string; value: number }[];
  researchStatus: "official" | "verified" | "community-consensus" | "experimental" | "obsolete";
}

// ── Helpers ────────────────────────────────────────────────────────

/**
 * Convert the raw data question format into the shape QuestionCard expects.
 */
function adaptQuestions() {
  return questions.map((q) => ({
    id: String(q.id),
    question: q.question,
    options: q.answers.map((a, idx) => ({
      id: String(idx),
      label: a.label,
    })),
  }));
}

/**
 * Build key-stats from a class profile's dimensions.
 */
function buildKeyStats(classSlug: string): { label: string; value: number }[] {
  const profile = classProfiles.find((p) => p.classSlug === classSlug);
  if (!profile) return [];

  const dims = profile.dimensions;
  return [
    { label: "DPS", value: dims.rolePreference.dps ?? 0 },
    { label: "Überleben", value: Math.round((dims.gearTolerance + (10 - dims.difficultyComfort)) / 2) },
    { label: "Mobilität", value: dims.mobilityImportance },
    { label: "Solo", value: dims.soloPlay },
    { label: "PvP", value: dims.pvpPriority },
  ];
}

/**
 * Adapt raw match results from the engine into the shape ResultCard expects.
 */
function adaptResults(rawResults: DataMatchResult[]): AdaptedMatchResult[] {
  return rawResults.map((r) => ({
    classSlug: r.classSlug,
    classNameDe: r.classNameDe,
    classNameEn: r.classNameEn,
    matchPercentage: r.score,
    reasons: r.reasons.map((text) => ({ text })),
    weakness: r.weakness,
    keyStats: buildKeyStats(r.classSlug),
    researchStatus: (r.researchStatus === "unconfirmed"
      ? "experimental"
      : r.researchStatus) as AdaptedMatchResult["researchStatus"],
  }));
}

// ── Loading Animation Component ────────────────────────────────────

function LoadingAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center py-20"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 rounded-full border-4 border-[var(--accent-aether)]/20 border-t-[var(--accent-aether)]"
      />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 text-center"
      >
        <p className="text-lg font-semibold text-[var(--text-primary)] font-serif">
          Deine Ergebnisse werden berechnet...
        </p>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Wir analysieren deine Antworten und finden die passendsten Klassen.
        </p>
      </motion.div>
    </motion.div>
  );
}

// ── Main Component ─────────────────────────────────────────────────

export default function KlassenfinderPage() {
  const [currentStep, setCurrentStep] = useState(0); // 0-6 (7 questions, 0-indexed display as 1-7)
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [direction, setDirection] = useState(1);

  const adaptedQuestions = adaptQuestions();
  const currentQuestion = adaptedQuestions[currentStep];
  const currentAnswer = answers[currentStep] ?? null;
  const selectedOptionId = currentAnswer !== null ? String(currentAnswer) : null;

  // Calculate how many steps to show in the stepper:
  // During questions: currentStep + 1 (1-7)
  // After: 7 (all complete)
  const stepperStep = showResults ? 8 : currentStep + 1;

  const handleSelect = useCallback((optionId: string) => {
    const answerIndex = parseInt(optionId, 10);
    setAnswers((prev) => {
      const next = [...prev];
      next[currentStep] = answerIndex;
      return next;
    });
  }, [currentStep]);

  const handleNext = useCallback(() => {
    if (selectedOptionId === null) return;

    if (currentStep < 6) {
      setDirection(1);
      setCurrentStep((s) => s + 1);
    } else {
      // Last question answered → show loading then results
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setShowResults(true);
      }, 1500);
    }
  }, [currentStep, selectedOptionId]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((s) => s - 1);
    }
  }, [currentStep]);

  const handleReset = useCallback(() => {
    setCurrentStep(0);
    setAnswers([]);
    setShowResults(false);
    setIsLoading(false);
    setDirection(1);
  }, []);

  // Compute results when needed
  const results: AdaptedMatchResult[] = (() => {
    if (!showResults || answers.length < 7) return [];
    const raw = calculateMatches(answers);
    return adaptResults(raw);
  })();

  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="text-[var(--accent-aether)]" size={28} />
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] font-serif">
              Klassenfinder
            </h1>
          </div>
          <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-lg mx-auto">
            Beantworte 7 Fragen &ndash; wir zeigen dir die 3 passendsten Klassen.
          </p>
        </motion.div>

        {/* ── Progress Stepper ─────────────────────────────────── */}
        {!showResults && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <ProgressStepper currentStep={stepperStep} totalSteps={7} />
          </motion.div>
        )}

        {/* ── Question Card ────────────────────────────────────── */}
        {!showResults && !isLoading && currentQuestion && (
          <div className="min-h-[360px]">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
                Frage {currentStep + 1} von 7
              </span>
            </div>
            <QuestionCard
              question={currentQuestion}
              selectedOption={selectedOptionId}
              onSelect={handleSelect}
              onNext={handleNext}
              onBack={handleBack}
              canGoBack={currentStep > 0}
              direction={direction}
            />
          </div>
        )}

        {/* ── Loading Animation ────────────────────────────────── */}
        <AnimatePresence>
          {isLoading && <LoadingAnimation />}
        </AnimatePresence>

        {/* ── Results ──────────────────────────────────────────── */}
        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {/* Results header */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
              >
                <h2 className="text-2xl font-bold text-[var(--text-primary)] font-serif">
                  Deine Top-Empfehlungen
                </h2>
                <p className="mt-2 text-sm text-[var(--text-muted)]">
                  Basierend auf deinen {answers.length} Antworten
                </p>
              </motion.div>

              {/* Result cards */}
              <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
                {results.map((result, i) => (
                  <ResultCard
                    key={result.classSlug}
                    result={result}
                    rank={(i + 1) as 1 | 2 | 3}
                  />
                ))}
              </div>

              {/* Reset button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-10 text-center"
              >
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[var(--border-subtle)] text-sm text-[var(--text-secondary)] hover:border-[var(--accent-aether)]/50 hover:text-[var(--accent-aether)] transition-all"
                >
                  <RotateCcw size={16} />
                  Finder neu starten
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageLayout>
  );
}
