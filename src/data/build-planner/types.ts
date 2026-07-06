// Build-Planner Typen
// Testitems sind klar als Testdaten markiert (confidence: "experimental", sourceId: "internal-test-data")

export type PlannerItemRarity =
  | "common"
  | "uncommon"
  | "rare"
  | "epic"
  | "legendary";

export const plannerSlots = [
  "weapon",
  "head",
  "chest",
  "legs",
  "gloves",
  "boots",
  "necklace",
  "earring",
  "ring",
  "belt",
] as const;

export type PlannerSlot = (typeof plannerSlots)[number];

export type PlannerStatKey =
  | "attack"
  | "magicAttack"
  | "crit"
  | "accuracy"
  | "defense"
  | "magicDefense"
  | "hp"
  | "mp"
  | "movement"
  | "cooldownReduction";

export interface PlannerItem {
  id: string;
  name: string;
  slot: PlannerSlot;
  classIds?: string[]; // undefined = alle Klassen
  rarity: PlannerItemRarity;
  levelRequirement?: number;
  region: "KR" | "TW" | "GLOBAL";
  patchId: string;
  stats: Partial<Record<PlannerStatKey, number>>;
  sourceId?: string;
  confidence: "official" | "verified" | "community-consensus" | "experimental";
}

export const plannerSlotLabels: Record<PlannerSlot, string> = {
  weapon: "Waffe",
  head: "Kopf",
  chest: "Brust",
  legs: "Beine",
  gloves: "Handschuhe",
  boots: "Schuhe",
  necklace: "Halskette",
  earring: "Ohrring",
  ring: "Ring",
  belt: "Gürtel",
};

export const plannerStatLabels: Record<PlannerStatKey, string> = {
  attack: "Angriff",
  magicAttack: "Magischer Angriff",
  crit: "Krit",
  accuracy: "Präzision",
  defense: "Verteidigung",
  magicDefense: "Magische Verteidigung",
  hp: "HP",
  mp: "MP",
  movement: "Bewegung",
  cooldownReduction: "Cooldown Reduction",
};

export const rarityLabels: Record<PlannerItemRarity, string> = {
  common: "Gewöhnlich",
  uncommon: "Ungewöhnlich",
  rare: "Selten",
  epic: "Episch",
  legendary: "Legendär",
};

export const rarityOrder: Record<PlannerItemRarity, number> = {
  common: 1,
  uncommon: 2,
  rare: 3,
  epic: 4,
  legendary: 5,
};

export type PlannerSelection = Partial<Record<PlannerSlot, string>>;
