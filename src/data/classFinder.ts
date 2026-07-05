// AION 2 Klassenfinder
// Interactive questionnaire + class matching engine

import { classes } from "./classes";

// ── Types ────────────────────────────────────────────────────────

export interface FinderQuestion {
  id: number;
  question: string;
  answers: {
    label: string;
    weights: Record<string, number>; // class slug -> score modifier (-5..+5)
  }[];
}

export interface ClassProfile {
  classSlug: string;
  dimensions: {
    rolePreference: Record<string, number>; // "tank" | "heal" | "dps" | "support" -> 0..10
    rangePreference: number; // 0=melee, 10=ranged
    difficultyComfort: number; // 0..10
    mobilityImportance: number; // 0..10
    soloPlay: number; // 0..10
    pvpPriority: number; // 0..10
    gearTolerance: number; // 0..10
  };
  matchReasons: string[];
  weakness: string;
}

export interface MatchResult {
  classSlug: string;
  classNameDe: string;
  classNameEn: string;
  score: number; // 0..100
  reasons: string[];
  weakness: string;
  researchStatus: string;
}

// ── Questions (German) ──────────────────────────────────────────

export const questions: FinderQuestion[] = [
  {
    id: 1,
    question: "Welche Rolle gefällt dir am besten?",
    answers: [
      {
        label: "Tank - Ich will die Gruppe schützen",
        weights: { templar: 5, brawler: 2, gladiator: 1 },
      },
      {
        label: "Heiler - Ich will andere heilen",
        weights: { cleric: 5, chanter: 3 },
      },
      {
        label: "DPS - Ich will Schaden machen",
        weights: {
          sorcerer: 3,
          assassin: 3,
          ranger: 3,
          gladiator: 3,
          spiritmaster: 3,
          brawler: 2,
          chanter: 1,
        },
      },
      {
        label: "Support - Buffs und Utility",
        weights: { chanter: 5, templar: 2 },
      },
    ],
  },
  {
    id: 2,
    question: "Bevorzugst du Nah- oder Fernkampf?",
    answers: [
      {
        label: "Nahkampf - Direkt im Geschehen",
        weights: {
          templar: 3,
          gladiator: 3,
          assassin: 3,
          chanter: 2,
          cleric: 2,
          brawler: 3,
        },
      },
      {
        label: "Fernkampf - Aus sicherer Distanz",
        weights: {
          sorcerer: 5,
          ranger: 5,
          spiritmaster: 5,
        },
      },
      {
        label: "Egal - Ich bin flexibel",
        weights: {
          templar: 1,
          gladiator: 1,
          assassin: 1,
          ranger: 1,
          sorcerer: 1,
          cleric: 1,
          chanter: 1,
          spiritmaster: 1,
          brawler: 1,
        },
      },
    ],
  },
  {
    id: 3,
    question: "Wie erfahren bist du mit MMORPGs?",
    answers: [
      {
        label: "Anfänger - Ich bin neu",
        weights: {
          ranger: 3,
          chanter: 2,
          templar: 1,
          gladiator: 1,
        },
      },
      {
        label: "Fortgeschritten - Einige Jahre Erfahrung",
        weights: {
          templar: 2,
          gladiator: 2,
          cleric: 2,
          brawler: 2,
          ranger: 1,
          chanter: 1,
        },
      },
      {
        label: "Experte - Ich kenne mich aus",
        weights: {
          sorcerer: 3,
          assassin: 3,
          spiritmaster: 3,
          templar: 1,
          cleric: 1,
        },
      },
    ],
  },
  {
    id: 4,
    question: "Wie wichtig ist dir Mobilität?",
    answers: [
      {
        label: "Sehr wichtig - Ich will schnell sein",
        weights: {
          assassin: 4,
          ranger: 3,
          brawler: 3,
          sorcerer: 2,
          chanter: 1,
        },
      },
      {
        label: "Mittel - Ein bisschen Bewegung ist gut",
        weights: {
          gladiator: 2,
          cleric: 2,
          spiritmaster: 1,
          chanter: 1,
        },
      },
      {
        label: "Nicht wichtig - Positioning reicht",
        weights: {
          templar: 2,
          cleric: 1,
          chanter: 1,
        },
      },
    ],
  },
  {
    id: 5,
    question: "Spielst du hauptsächlich allein oder in Gruppen?",
    answers: [
      {
        label: "Meist allein - Solo-Leveling",
        weights: {
          ranger: 4,
          assassin: 3,
          gladiator: 3,
          chanter: 3,
          spiritmaster: 3,
          brawler: 2,
        },
      },
      {
        label: "Beides - Solo und Gruppen",
        weights: {
          ranger: 2,
          gladiator: 2,
          chanter: 2,
          templar: 1,
          cleric: 1,
          sorcerer: 1,
          spiritmaster: 1,
          assassin: 1,
          brawler: 1,
        },
      },
      {
        label: "Meist in Gruppen - Dungeons/Raids",
        weights: {
          templar: 4,
          cleric: 4,
          sorcerer: 2,
          chanter: 2,
        },
      },
    ],
  },
  {
    id: 6,
    question: "Wie wichtig ist dir PvP?",
    answers: [
      {
        label: "Sehr wichtig - Hauptsächlich PvP",
        weights: {
          assassin: 4,
          sorcerer: 3,
          ranger: 3,
          gladiator: 2,
          chanter: 1,
        },
      },
      {
        label: "Ausgewogen - Beides PvE und PvP",
        weights: {
          ranger: 2,
          gladiator: 2,
          templar: 2,
          sorcerer: 2,
          chanter: 1,
          assassin: 1,
          brawler: 1,
          spiritmaster: 1,
          cleric: 1,
        },
      },
      {
        label: "Weniger wichtig - Hauptsächlich PvE",
        weights: {
          cleric: 3,
          templar: 2,
          sorcerer: 2,
          chanter: 1,
          ranger: 1,
        },
      },
    ],
  },
  {
    id: 7,
    question: "Wie viel Gear-Investition ist dir recht?",
    answers: [
      {
        label: "Wenig - Ich will nicht zu sehr grinden",
        weights: {
          chanter: 4,
          templar: 3,
          cleric: 3,
          ranger: 2,
        },
      },
      {
        label: "Mittel - Ein bisschen investieren",
        weights: {
          templar: 2,
          cleric: 2,
          ranger: 2,
          gladiator: 2,
          sorcerer: 2,
          spiritmaster: 2,
          chanter: 1,
          brawler: 2,
        },
      },
      {
        label: "Viel - Ich will maximale Performance",
        weights: {
          assassin: 4,
          sorcerer: 3,
          gladiator: 2,
          brawler: 2,
        },
      },
    ],
  },
];

// ── Class Profiles ──────────────────────────────────────────────

export const classProfiles: ClassProfile[] = [
  {
    classSlug: "templar",
    dimensions: {
      rolePreference: { tank: 10, heal: 0, dps: 2, support: 5 },
      rangePreference: 0,
      difficultyComfort: 5,
      mobilityImportance: 1,
      soloPlay: 4,
      pvpPriority: 6,
      gearTolerance: 5,
    },
    matchReasons: [
      "klassischer Tank-Fokus mit starker defensiver Gruppennische",
      "in Gruppencontent voraussichtlich h\u00e4ufig gefragt",
      "Gute Überlebensfähigkeit",
    ],
    weakness: "Langsame Mobilität und langsames Solo-Leveling",
  },
  {
    classSlug: "gladiator",
    dimensions: {
      rolePreference: { tank: 4, heal: 0, dps: 9, support: 1 },
      rangePreference: 0,
      difficultyComfort: 5,
      mobilityImportance: 5,
      soloPlay: 8,
      pvpPriority: 7,
      gearTolerance: 7,
    },
    matchReasons: [
      "Vielseitiger Nahkampf-DPS mit Off-Tank-Fähigkeit",
      "Starker Solo-Spielstil",
      "Guter Burst und AoE",
    ],
    weakness: "Gear-abhängig für optimale Performance",
  },
  {
    classSlug: "assassin",
    dimensions: {
      rolePreference: { tank: 0, heal: 0, dps: 10, support: 0 },
      rangePreference: 0,
      difficultyComfort: 9,
      mobilityImportance: 10,
      soloPlay: 8,
      pvpPriority: 10,
      gearTolerance: 9,
    },
    matchReasons: [
      "starker Burst-Fokus bei guter Ausr\u00fcstung und sauberem Timing",
      "Stealth-orientierter Spielstil",
      "hohe Mobilität im Nahkampf",
      "kann in kleinen PvP-Situationen stark sein, abh\u00e4ngig von Matchup und Patchstand",
    ],
    weakness: "Sehr gear-abhängig und geringe PvP-Nutzen in großen Kämpfen",
  },
  {
    classSlug: "ranger",
    dimensions: {
      rolePreference: { tank: 0, heal: 0, dps: 9, support: 1 },
      rangePreference: 10,
      difficultyComfort: 5,
      mobilityImportance: 8,
      soloPlay: 10,
      pvpPriority: 6,
      gearTolerance: 4,
    },
    matchReasons: [
      "gute Solo-Eignung",
      "Ausgeglichener Fernkampf-DPS",
      "Hohe Mobilität",
    ],
    weakness: "Mittlere Gruppennachfrage wegen vieler DPS-Konkurrenten",
  },
  {
    classSlug: "sorcerer",
    dimensions: {
      rolePreference: { tank: 0, heal: 0, dps: 10, support: 2 },
      rangePreference: 10,
      difficultyComfort: 8,
      mobilityImportance: 2,
      soloPlay: 5,
      pvpPriority: 8,
      gearTolerance: 7,
    },
    matchReasons: [
      "starker AoE- und Burst-Fokus",
      "Kontrollfähigkeiten (CC)",
      "in organisierten Gruppen voraussichtlich n\u00fctzlich",
    ],
    weakness: "Sehr geringe Mobilität und fragil (wenig HP/Defense)",
  },
  {
    classSlug: "cleric",
    dimensions: {
      rolePreference: { tank: 0, heal: 10, dps: 1, support: 7 },
      rangePreference: 0,
      difficultyComfort: 5,
      mobilityImportance: 5,
      soloPlay: 4,
      pvpPriority: 5,
      gearTolerance: 4,
    },
    matchReasons: [
      "klarer Hauptheiler-Fokus",
      "voraussichtlich h\u00e4ufig nachgefragt in Dungeons und Raids",
      "in Raids voraussichtlich n\u00fctzlich, wenn Gruppenstabilit\u00e4t wichtig ist",
    ],
    weakness: "Langsames Solo-Leveling und abhängig von Gruppe",
  },
  {
    classSlug: "chanter",
    dimensions: {
      rolePreference: { tank: 1, heal: 5, dps: 5, support: 9 },
      rangePreference: 0,
      difficultyComfort: 5,
      mobilityImportance: 5,
      soloPlay: 7,
      pvpPriority: 5,
      gearTolerance: 1,
    },
    matchReasons: [
      "Vielseitige Support-Klasse (Buff/Heal/DPS)",
      "Geringe Gear-Abhängigkeit",
      "Gut für Solo und Gruppe",
    ],
    weakness: "Kein Spezialist - geringerer DPS als reine DPS, weniger Heilung als Kleriker",
  },
  {
    classSlug: "spiritmaster",
    dimensions: {
      rolePreference: { tank: 0, heal: 0, dps: 8, support: 4 },
      rangePreference: 10,
      difficultyComfort: 8,
      mobilityImportance: 5,
      soloPlay: 8,
      pvpPriority: 6,
      gearTolerance: 5,
    },
    matchReasons: [
      "Elementargeister für jede Situation",
      "Starke Debuffs",
      "Guter Sustain-DPS",
    ],
    weakness: "Hoher Skill-Ceiling und komplexe Geist-Verwaltung",
  },
  {
    classSlug: "brawler",
    dimensions: {
      rolePreference: { tank: 6, heal: 0, dps: 8, support: 0 },
      rangePreference: 0,
      difficultyComfort: 5,
      mobilityImportance: 8,
      soloPlay: 7,
      pvpPriority: 6,
      gearTolerance: 7,
    },
    matchReasons: [
      "Neue einzigartige Klasse mit Faustwaffen",
      "Fury/Rage-System mit Berserk-Gameplay",
      "Hohe Mobilität",
    ],
    weakness:
      "EXPERIMENTELL - Balance kann sich ändern. Limitierte Langzeitdaten verfügbar.",
  },
];

// ── Matching Algorithm ──────────────────────────────────────────

/**
 * Calculate top 3 class matches based on user answers.
 * @param answers Array of selected answer indices, one per question
 * @returns Top 3 matches sorted by score (descending)
 */
export function calculateMatches(
  answers: number[]
): MatchResult[] {
  // Initialize scores
  const scores: Record<string, number> = {
    templar: 50,
    gladiator: 50,
    assassin: 50,
    ranger: 50,
    sorcerer: 50,
    cleric: 50,
    chanter: 50,
    spiritmaster: 50,
    brawler: 50,
  };

  // Apply answer weights
  answers.forEach((answerIndex, questionIndex) => {
    const question = questions[questionIndex];
    if (!question) return;
    const answer = question.answers[answerIndex];
    if (!answer) return;

    Object.entries(answer.weights).forEach(([classSlug, weight]) => {
      if (scores[classSlug] !== undefined) {
        scores[classSlug] += weight * 3;
      }
    });
  });

  // Clamp scores to 0..100 range
  Object.keys(scores).forEach((slug) => {
    scores[slug] = Math.max(0, Math.min(100, scores[slug]));
  });

  // Build results – derive names and metadata from canonical classes data
  const results: MatchResult[] = Object.entries(scores)
    .map(([classSlug, score]) => {
      const profile = classProfiles.find((p) => p.classSlug === classSlug);
      const classData = classes.find((c) => c.slug === classSlug);
      return {
        classSlug,
        classNameDe: classData?.names.deProvisional ?? classSlug,
        classNameEn: classData?.names.en ?? classSlug,
        score: Math.round(score),
        reasons: (profile?.matchReasons ?? []).slice(0, 3),
        weakness: profile?.weakness ?? classData?.weaknesses[0] ?? "",
        researchStatus: classData?.researchStatus ?? "community-consensus",
      };
    })
    .sort((a, b) => b.score - a.score);

  return results.slice(0, 3);
}
