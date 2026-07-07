export interface GearCategory {
  id: string;
  titleDe: string;
  titleEn: string;
  description: string;
  items: GearItem[];
}

export interface GearItem {
  id: string;
  nameDe: string;
  nameEn: string;
  type: "armor" | "weapon" | "accessory" | "consumable" | "material" | "system";
  levelReq: number;
  source: string;
  sourceId?: string;
  notes?: string;
}

export interface StatCap {
  stat: string;
  statDe: string;
  maxValue: number;
  unit: "%" | "flat";
  capType: "hard" | "soft";
  sourceIds: string[];
  notes?: string;
}

// Gear categories are based on research references and ingame observations.
// Detailed item lists, drop rates, and farm routes will be added after Global Release.
export const gearCategories: GearCategory[] = [
  {
    id: "leveling",
    titleDe: "Leveling-Ausrüstung",
    titleEn: "Leveling Gear",
    description:
      "Ausrüstung, die bis zum jeweils aktuellen Maximallevel gesammelt wird. Quest-Belohnungen, Dungeon-Drops und Mob-Drops.",
    items: [],
  },
  {
    id: "starter-endgame",
    titleDe: "Starter-Endgame",
    titleEn: "Starter Endgame",
    description:
      "Erste Endgame-Ausrüstung ab dem jeweils aktuellen Maximallevel. Das Fundament für alle weiteren Gear-Pfade.",
    items: [],
  },
  {
    id: "pve-progression",
    titleDe: "PvE-Fortschritt",
    titleEn: "PvE Progression",
    description:
      "Fortgeschrittene PvE-Sets für Hard-Mode Dungeons und Raids. Höheres Item-Level und bessere Set-Boni.",
    items: [],
  },
  {
    id: "pvp-progression",
    titleDe: "PvP-Fortschritt",
    titleEn: "PvP Progression",
    description:
      "PvP-Sets für Abyss-Kämpfe, Belagerungen und Arena. Fokus auf PvP-Offensive und Defensive.",
    items: [],
  },
  {
    id: "crafting",
    titleDe: "Handwerkssystem",
    titleEn: "Crafting System",
    description:
      "Handwerksberufe für Ausrüstung, Verbrauchsgüter und Verzauberungen.",
    items: [],
  },
  {
    id: "soul-imprint",
    titleDe: "Seele-Prägung",
    titleEn: "Soul Imprint",
    description:
      "Endgame-Verzauberungssystem für Level 50+ (Kapitel 1). Jede Ausrüstung kann mit Seelenprägungen verstärkt werden.",
    items: [],
  },
  {
    id: "manastones",
    titleDe: "Manasteine",
    titleEn: "Manastones",
    description:
      "Socket-System für Ausrüstung. Manasteine können in Rüstung und Waffen gesockelt werden für zusätzliche Werte.",
    items: [],
  },
  {
    id: "accessories",
    titleDe: "Accessoires",
    titleEn: "Accessories",
    description:
      "Ringe, Ohrringe, Halsketten und Gürtel. Unabhängig vom Rüstungs-Set und wichtig für spezifische Stat-Kappen.",
    items: [],
  },
  {
    id: "pendant",
    titleDe: "Anhänger-System",
    titleEn: "Pendant System",
    description:
      "Spezielles Anhänger-System für zusätzliche passive Boni. Anhänger können aufgewertet und verzaubert werden.",
    items: [],
  },
  {
    id: "arcana",
    titleDe: "Arcana-System",
    titleEn: "Arcana System",
    description:
      "Neues System in Kapitel 1. Spezialkarten die in einen Arcana-Slot ausgerüstet werden können für einzigartige Boni.",
    items: [],
  },
];

export const statCaps: StatCap[] = [
  {
    stat: "cooldownReduction",
    statDe: "Abklingzeit-Reduktion",
    maxValue: 60,
    unit: "%",
    capType: "hard",
    sourceIds: ["inven-kr-2026-07-01-patch", "inven-global-2026-07-01-chapter-1"],
    notes: "Maximal 60 Prozent laut Chapter-1-Patchnotes.",
  },
  {
    stat: "movementSpeed",
    statDe: "Bewegungsgeschwindigkeit",
    maxValue: 150,
    unit: "%",
    capType: "hard",
    sourceIds: ["inven-kr-2026-07-01-patch", "inven-global-2026-07-01-chapter-1"],
    notes: "Maximal 150 Prozent laut Chapter-1-Patchnotes.",
  },
];

export function getGearCategoryById(id: string): GearCategory | undefined {
  return gearCategories.find((g) => g.id === id);
}

export function getStatCap(stat: string): StatCap | undefined {
  return statCaps.find((s) => s.stat === stat);
}
