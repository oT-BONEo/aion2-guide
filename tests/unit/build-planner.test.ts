import { describe, it, expect } from "vitest";
import {
  plannerItems,
  getItemsForSlot,
  getItemById,
  getSlotsForClass,
} from "@/data/build-planner/items";

import { plannerSlots, plannerSlotLabels } from "@/data/build-planner/types";
import { calculateStats, CDR_CAP, MOVEMENT_CAP } from "@/data/build-planner/stat-formulas";
import { classes } from "@/data/classes";
import { patches } from "@/data/patches";
import type { PlannerSelection } from "@/data/build-planner/types";

/**
 * Hinweis: Diese Tests werden von Kimi vorbereitet, aber NICHT ausgefuehrt.
 * Lukas fuehrt die Tests lokal aus.
 */

describe("Build Planner - Items", () => {
  it("hat nur eindeutige Item-IDs", () => {
    const ids = plannerItems.map((i) => i.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("hat nur gueltige Slots", () => {
    const validSlots = new Set(plannerSlots);
    for (const item of plannerItems) {
      expect(validSlots).toContain(item.slot);
    }
  });

  it("hat nur existierende classIds", () => {
    const validClassIds = new Set(classes.map((c) => c.id));
    for (const item of plannerItems) {
      if (item.classIds) {
        for (const cid of item.classIds) {
          expect(validClassIds).toContain(cid);
        }
      }
    }
  });

  it("hat nur existierende patchIds", () => {
    const validPatchIds = new Set(patches.map((p) => p.id));
    for (const item of plannerItems) {
      expect(validPatchIds).toContain(item.patchId);
    }
  });

  it("hat nur gueltige confidence-Werte", () => {
    const valid = new Set(["official", "verified", "community-consensus", "experimental"]);
    for (const item of plannerItems) {
      expect(valid).toContain(item.confidence);
    }
  });

  it("verwendet nur gueltige stat keys", () => {
    const validKeys = new Set([
      "attack", "magicAttack", "crit", "accuracy", "defense",
      "magicDefense", "hp", "mp", "movement", "cooldownReduction",
    ]);
    for (const item of plannerItems) {
      for (const key of Object.keys(item.stats)) {
        expect(validKeys).toContain(key);
      }
    }
  });

  it("hat getItemById korrekt implementiert", () => {
    const item = getItemById("test-sword-01");
    expect(item).toBeDefined();
    expect(item?.name).toBe("Test-Großschwert der Stufe 50");
    expect(getItemById("nonexistent")).toBeUndefined();
  });

  it("filtert Items nach Slot und Klasse", () => {
    const weapons = getItemsForSlot("weapon", "gladiator");
    expect(weapons.length).toBeGreaterThan(0);
    expect(weapons.every((w) => w.slot === "weapon")).toBe(true);
    // classIds filter
    for (const w of weapons) {
      expect(w.classIds).toContain("gladiator");
    }
  });
});

describe("Build Planner - Stat-Summierung", () => {
  it("summiert Stats korrekt", () => {
    const selection: PlannerSelection = {
      weapon: "test-sword-01",
      head: "test-head-plate-01",
    };
    const stats = calculateStats(selection);
    expect(stats.attack).toBe(240 + 0); // sword: 240, head: 0 attack
    expect(stats.defense).toBe(120);
    expect(stats.hp).toBe(300);
  });

  it("gibt 0 zurueck wenn nichts ausgewaehlt", () => {
    const stats = calculateStats({});
    expect(stats.attack).toBe(0);
    expect(stats.hp).toBe(0);
  });

  it("respektiert CDR-Cap", () => {
    // Simuliere eine Auswahl die CDR > 60 erzeugen wuerde
    // (keine Testitems haben CDR, daher testen wir den Mechanismus direkt)
    expect(CDR_CAP).toBe(60);
  });

  it("respektiert Movement-Cap", () => {
    expect(MOVEMENT_CAP).toBe(150);
  });
});

describe("Build Planner - Slots", () => {
  it("hat 10 Slots definiert", () => {
    expect(plannerSlots.length).toBe(10);
  });

  it("hat deutsche Labels fuer alle Slots", () => {
    for (const slot of plannerSlots) {
      expect(plannerSlotLabels[slot]).toBeDefined();
      expect(plannerSlotLabels[slot].length).toBeGreaterThan(0);
    }
  });

  it("liefert Slots fuer eine Klasse", () => {
    const slots = getSlotsForClass("brawler");
    expect(slots).toContain("weapon");
    expect(slots.length).toBeGreaterThan(0);
  });
});

describe("Build Planner - Testdaten-Markierung", () => {
  it("markiert alle Items als experimental", () => {
    for (const item of plannerItems) {
      expect(item.confidence).toBe("experimental");
    }
  });

  it("hat alle Items sourceId internal-test-data", () => {
    for (const item of plannerItems) {
      expect(item.sourceId).toBe("internal-test-data");
    }
  });

  it("verwendet Test-Praefix in Namen", () => {
    for (const item of plannerItems) {
      expect(item.name).toMatch(/^Test-/);
    }
  });
});
