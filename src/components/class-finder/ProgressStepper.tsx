"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressStepperProps {
  currentStep: number;
  totalSteps?: number;
}

export function ProgressStepper({
  currentStep,
  totalSteps = 7,
}: ProgressStepperProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, i) => {
          const stepNumber = i + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;
          const isFuture = stepNumber > currentStep;

          return (
            <div key={stepNumber} className="flex items-center flex-1 last:flex-none">
              {/* Step circle */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300",
                    isCompleted &&
                      "bg-[var(--accent-aether)]/30 text-[var(--accent-aether)] border border-[var(--accent-aether)]/50",
                    isActive &&
                      "bg-[var(--accent-aether)] text-[var(--bg-abyss)] border border-[var(--accent-aether)]",
                    isFuture &&
                      "bg-transparent text-[var(--text-muted)] border border-[var(--border-subtle)]"
                  )}
                >
                  {isCompleted ? <Check size={14} /> : stepNumber}
                </div>
              </div>

              {/* Connector line */}
              {stepNumber < totalSteps && (
                <div className="flex-1 h-px mx-2">
                  <div
                    className={cn(
                      "h-full transition-all duration-300",
                      isCompleted
                        ? "bg-[var(--accent-aether)]/50"
                        : "bg-[var(--border-subtle)]"
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
