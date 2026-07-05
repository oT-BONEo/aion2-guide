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
    titleDe: "Leveling-Ausr\u00fcstung",
    titleEn: "Leveling Gear",
    description:
      "Ausr\u00fcstung, die bis zum jeweils aktuellen Maximallevel gesammelt wird. Quest-Belohnungen, Dungeon-Drops und Mob-Drops.",
    items: [],
  },
  {
    id: "starter-endgame",
    titleDe: "Starter-Endgame",
    titleEn: "Starter Endgame",
    description:
      "Erste Endgame-Ausr\u00fcstung ab dem jeweils aktuellen Maximallevel. Das Fundament f\u00fcr alle weiteren Gear-Pfade.",
    items: [],
  },
  {
    id: "pve-progression",
    titleDe: "PvE-Fortschritt",
    titleEn: "PvE Progression",
    description:
      "Fortgeschrittene PvE-Sets f\u00fcr Hard-Mode Dungeons und Raids. H\u00f6heres Item-Level und bessere Set-Boni.",
    items: [],
  },
  {
    id: "pvp-progression",
    titleDe: "PvP-Fortschritt",
    titleEn: "PvP Progression",
    description:
      "PvP-Sets f\u00fcr Abyss-K\u00e4mpfe, Belagerungen und Arena. Fokus auf PvP-Offensive und Defensive.",
    items: [],
  },
  {
    id: "crafting",
    titleDe: "Handwerkssystem",
    titleEn: "Crafting System",
    description:
      "Handwerksberufe f\u00fcr Ausr\u00fcstung, Verbrauchsg\u00fcter und Verzauberungen.",
    items: [],
  },
  {
    id: "soul-imprint",
    titleDe: "Seele-Pr\u00e4gung",
    titleEn: "Soul Imprint",
    description:
      "Endgame-Verzauberungssystem f\u00fcr Level 50+ (Kapitel 1). Jede Ausr\u00fcstung kann mit Seelenpr\u00e4gungen verst\u00e4rkt werden.",
    items: [],
  },
  {
    id: "manastones",
    titleDe: "Manasteine",
    titleEn: "Manastones",
    description:
      "Socket-System f\u00fcr Ausr\u00fcstung. Manasteine k\u00f6nnen in R\u00fcstung und Waffen gesockelt werden f\u00fcr zus\u00e4tzliche Werte.",
    items: [],
  },
  {
    id: "accessories",
    titleDe: "Accessoires",
    titleEn: "Accessories",
    description:
      "Ringe, Ohrringe, Halsketten und G\u00fcrtel. Unabh\u00e4ngig vom R\u00fcstungs-Set und wichtig f\u00fcr spezifische Stat-Kappen.",
    items: [],
  },
  {
    id: "pendant",
    titleDe: "Anh\u00e4nger-System",
    titleEn: "Pendant System",
    description:
      "Spezielles Anh\u00e4nger-System f\u00fcr z\u00e4tzliche passive Boni. Anh\u00e4nger k\u00f6nnen aufgewertet und verzaubert werden.",
    items: [],
  },
  {
    id: "arcana",
    titleDe: "Arcana-System",
    titleEn: "Arcana System",
    description:
      "Neues System in Kapitel 1. Spezialkarten die in einen Arcana-Slot ausger\u00fcstet werden k\u00f6nnen f\u00fcr einzigartige Boni.",
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
