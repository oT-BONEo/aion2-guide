// Build-Planner: Stat-Summierung (Papierwerte)
// Keine DPS-Berechnung. Nur Summe der sichtbaren Stats aus Items.
// CDR-Cap: 60%. Movement-Cap: 150%.

import type { PlannerItem, PlannerStatKey, PlannerSelection } from "./types";
import { getItemById } from "./items";

export const CDR_CAP = 60;
export const MOVEMENT_CAP = 150;

export function calculateStats(selection: PlannerSelection): Record<PlannerStatKey, number> {
  const totals: Record<PlannerStatKey, number> = {
    attack: 0,
    magicAttack: 0,
    crit: 0,
    accuracy: 0,
    defense: 0,
    magicDefense: 0,
    hp: 0,
    mp: 0,
    movement: 0,
    cooldownReduction: 0,
  };

  for (const [, itemId] of Object.entries(selection)) {
    if (!itemId) continue;
    const item = getItemById(itemId);
    if (!item) continue;

    for (const [statKey, value] of Object.entries(item.stats)) {
      if (value !== undefined && value !== null) {
        totals[statKey as PlannerStatKey] += value;
      }
    }
  }

  // Caps anwenden
  totals.cooldownReduction = Math.min(totals.cooldownReduction, CDR_CAP);
  totals.movement = Math.min(totals.movement, MOVEMENT_CAP);

  return totals;
}

export function getSelectedItems(selection: PlannerSelection): PlannerItem[] {
  const items: PlannerItem[] = [];
  for (const [, itemId] of Object.entries(selection)) {
    if (!itemId) continue;
    const item = getItemById(itemId);
    if (item) items.push(item);
  }
  return items;
}

export function getEquippedSlotsCount(selection: PlannerSelection): number {
  return Object.values(selection).filter(Boolean).length;
}

export function getTotalSlots(): number {
  return 10; // weapon, head, chest, legs, gloves, boots, necklace, earring, ring, belt
}
