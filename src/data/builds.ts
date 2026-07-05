// AION 2 Build Guides
// All builds are DRAFT with COMMUNITY-CONSENSUS confidence.
// Concrete skill, gear, and rotation data are NOT yet verified.
// See editorialNotes on each build for status.

export interface BuildGuide {
  id: string;
  slug: string;
  classId: string;
  title: string;
  purpose:
    | "pve-dps"
    | "pve-heal"
    | "pve-tank"
    | "pve-support"
    | "pvp-small"
    | "pvp-large"
    | "hybrid";
  region: "KR" | "TW" | "GLOBAL";
  patchId: string;
  levelCap: number;
  confidence: "draft" | "community-consensus" | "verified";
  publicationStatus: "draft" | "review" | "published";
  lastReviewedAt: string;
  testedLocally: boolean;
  localizationStatus: {
    de: "provisional" | "reviewed" | "confirmed";
    en: "provisional" | "reviewed" | "confirmed";
  };
  audience: {
    experience: "beginner" | "intermediate" | "advanced";
    gearTier: "leveling" | "starter" | "mid" | "endgame";
  };
  overview: string;
  playstyle: string;
  statPriorities: {
    stat: string;
    priority: number;
    reason: string;
  }[];
  gear: {
    slot: string;
    recommendation: string;
    alternatives?: string[];
    notes?: string;
  }[];
  rotationType: "priority" | "fixed" | "situational";
  rotation: {
    step: number;
    skill: string;
    condition?: string;
    notes?: string;
  }[];
  alternatives: {
    name: string;
    description: string;
    when: string;
  }[];
  strengths: string[];
  weaknesses: string[];
  commonMistakes: string[];
  sourceIds: string[];
  editorialNotes: string[];
}

export const builds: BuildGuide[] = [
  {
    id: "build-chanter-pve-support",
    slug: "chanter-pve-support",
    classId: "chanter",
    title: "Kantor PvE Support",
    purpose: "pve-support",
    region: "KR",
    patchId: "kr-2026-07-01-chapter-1",
    levelCap: 50,
    confidence: "community-consensus",
    publicationStatus: "draft",
    lastReviewedAt: "2026-07-03",
    testedLocally: false,
    localizationStatus: {
      de: "provisional",
      en: "provisional",
    },
    audience: {
      experience: "intermediate",
      gearTier: "mid",
    },
    overview:
      "Support-Build für Kantor fokussiert auf Party-Buffs, Off-Healing und Utility. Der Kantor ist keine reine Heil-Klasse, sondern ein hybrider Support.",
    playstyle:
      "Halte Buffs aktiv. Priorisiere Gruppen-Unterstützung vor DPS. Nutze Off-Healing wenn der Hauptheiler überlastet ist.",
    statPriorities: [],
    gear: [],
    rotationType: "priority",
    rotation: [],
    alternatives: [],
    strengths: [
      "Vielseitig - Buff, Heal und DPS in einer Klasse",
      "Geringe Gear-Abhängigkeit",
      "Gefragt in Gruppen",
    ],
    weaknesses: [
      "Kein spezialisierter Hauptheiler",
      "Geringerer DPS als reine DPS-Klassen",
      "Mana kann in langen Kämpfen knapp werden",
    ],
    commonMistakes: [],
    sourceIds: [
      "inven-kr-2026-07-01-patch",
      "inven-global-2026-07-01-chapter-1",
      "aion2hub-classes",
    ],
    editorialNotes: [
      "Recherche-Entwurf: konkrete Skill-, Stigma-, Arcana-, Gear- und Rotationsdaten sind noch nicht geprüft.",
      "KR/TW-Datenstand. Globaler Patchstand noch nicht bestätigt.",
      "Deutsche Skill- und Itemnamen sind nicht bestätigt.",
      "Nicht lokal getestet.",
    ],
  },
  {
    id: "build-cleric-pve-healer",
    slug: "cleric-pve-healer",
    classId: "cleric",
    title: "Kleriker PvE Heiler",
    purpose: "pve-heal",
    region: "KR",
    patchId: "kr-2026-07-01-chapter-1",
    levelCap: 50,
    confidence: "community-consensus",
    publicationStatus: "draft",
    lastReviewedAt: "2026-07-03",
    testedLocally: false,
    localizationStatus: {
      de: "provisional",
      en: "provisional",
    },
    audience: {
      experience: "intermediate",
      gearTier: "mid",
    },
    overview:
      "Heil-Build für Kleriker. Optimiert für Dungeons und Raids. Der Kleriker ist ein Hauptheiler in AION 2.",
    playstyle:
      "Positioniere dich mittig in der Gruppe. Nutze Heilungen effizient. Manage dein Mana.",
    statPriorities: [],
    gear: [],
    rotationType: "priority",
    rotation: [],
    alternatives: [],
    strengths: [
      "Heilung für Gruppe",
      "Wichtig für Dungeons und Raids",
      "Wiederbelebungs-Fähigkeit",
    ],
    weaknesses: [
      "Geringer Schaden",
      "Geringe Mobilität",
      "Abhängig von Gruppe",
    ],
    commonMistakes: [],
    sourceIds: [
      "inven-kr-2026-07-01-patch",
      "inven-global-2026-07-01-chapter-1",
      "aion2hub-classes",
    ],
    editorialNotes: [
      "Recherche-Entwurf: konkrete Skill-, Stigma-, Arcana-, Gear- und Rotationsdaten sind noch nicht geprüft.",
      "KR/TW-Datenstand. Globaler Patchstand noch nicht bestätigt.",
      "Deutsche Skill- und Itemnamen sind nicht bestätigt.",
      "Nicht lokal getestet.",
    ],
  },
  {
    id: "build-templar-pve-tank",
    slug: "templar-pve-tank",
    classId: "templar",
    title: "Templer PvE Tank",
    purpose: "pve-tank",
    region: "KR",
    patchId: "kr-2026-07-01-chapter-1",
    levelCap: 50,
    confidence: "community-consensus",
    publicationStatus: "draft",
    lastReviewedAt: "2026-07-03",
    testedLocally: false,
    localizationStatus: {
      de: "provisional",
      en: "provisional",
    },
    audience: {
      experience: "intermediate",
      gearTier: "mid",
    },
    overview:
      "Tank-Build für Templer fokussiert auf Aggro-Generation und Überlebensfähigkeit. Der Templer ist ein Tank in AION 2.",
    playstyle:
      "Halte Aggro auf Gegnern. Nutze Defensiv-Fähigkeiten zum richtigen Zeitpunkt. Positioniere Gegner für DPS.",
    statPriorities: [],
    gear: [],
    rotationType: "priority",
    rotation: [],
    alternatives: [],
    strengths: [
      "Defensive Fähigkeiten",
      "Wichtig für Gruppen-Content",
      "Crowd-Control",
    ],
    weaknesses: [
      "Geringer persönlicher DPS",
      "Langsame Mobilität",
      "Gear-abhängig",
    ],
    commonMistakes: [],
    sourceIds: [
      "inven-kr-2026-07-01-patch",
      "inven-global-2026-07-01-chapter-1",
      "aion2hub-classes",
    ],
    editorialNotes: [
      "Recherche-Entwurf: konkrete Skill-, Stigma-, Arcana-, Gear- und Rotationsdaten sind noch nicht geprüft.",
      "KR/TW-Datenstand. Globaler Patchstand noch nicht bestätigt.",
      "Deutsche Skill- und Itemnamen sind nicht bestätigt.",
      "Nicht lokal getestet.",
    ],
  },
];

export function getBuildBySlug(slug: string): BuildGuide | undefined {
  return builds.find((b) => b.slug === slug);
}

export function getBuildsByClass(classId: string): BuildGuide[] {
  return builds.filter((b) => b.classId === classId);
}

export function getAllBuildSlugs(): string[] {
  return builds.map((b) => b.slug);
}
