import { describe, it, expect } from "vitest";
import { classProfiles, calculateMatches } from "@/data/classFinder";
import { classes, getClassBySlug, getAllSlugs } from "@/data/classes";
import { builds, getBuildBySlug, getAllBuildSlugs } from "@/data/builds";
import { statCaps } from "@/data/gear";

describe("ClassFinder", () => {
  it("gibt genau drei Ergebnisse zurueck", () => {
    const answers = [0, 0, 0, 0, 0, 0, 0];
    const results = calculateMatches(answers);
    expect(results).toHaveLength(3);
  });

  it("gibt Ergebnisse mit Scores zwischen 0 und 100 zurueck", () => {
    const answers = [3, 2, 4, 1, 2, 1, 0];
    const results = calculateMatches(answers);
    results.forEach((r) => {
      expect(r.score).toBeGreaterThanOrEqual(0);
      expect(r.score).toBeLessThanOrEqual(100);
    });
  });

  it("sortiert Ergebnisse absteigend nach Score", () => {
    const answers = [0, 0, 0, 0, 0, 0, 0];
    const results = calculateMatches(answers);
    expect(results[0].score).toBeGreaterThanOrEqual(results[1].score);
    expect(results[1].score).toBeGreaterThanOrEqual(results[2].score);
  });

  it("jedes Ergebnis hat genau 3 Gruende", () => {
    const answers = [0, 0, 0, 0, 0, 0, 0];
    const results = calculateMatches(answers);
    results.forEach((r) => {
      expect(r.reasons).toHaveLength(3);
    });
  });

  it("jedes Ergebnis hat genau 1 Schwaeche", () => {
    const answers = [0, 0, 0, 0, 0, 0, 0];
    const results = calculateMatches(answers);
    results.forEach((r) => {
      expect(r.weakness).toBeDefined();
      expect(r.weakness.length).toBeGreaterThan(0);
    });
  });

  it("jedes Ergebnis hat einen gueltigen Slug", () => {
    const answers = [0, 0, 0, 0, 0, 0, 0];
    const results = calculateMatches(answers);
    const validSlugs = classes.map((c) => c.slug);
    results.forEach((r) => {
      expect(validSlugs).toContain(r.classSlug);
    });
  });

  it("Tank-Praeferenz liefert Templar in Top-3", () => {
    const answers = [0, 2, 4, 1, 0, 2, 1];
    const results = calculateMatches(answers);
    const slugs = results.map((r) => r.classSlug);
    expect(slugs).toContain("templar");
  });

  it("Heiler-Praeferenz liefert Cleric in Top-3", () => {
    const answers = [1, 2, 4, 1, 2, 2, 1];
    const results = calculateMatches(answers);
    const slugs = results.map((r) => r.classSlug);
    expect(slugs).toContain("cleric");
  });

  it("Fernkampf-Praeferenz bevorzugt Fernkampf-Klassen", () => {
    const answers = [3, 1, 0, 1, 2, 1, 1];
    const results = calculateMatches(answers);
    const rangedClasses = classes
      .filter((c) => c.range === "ranged")
      .map((c) => c.slug);
    const topResult = results[0];
    expect(rangedClasses).toContain(topResult.classSlug);
  });

  it("leere Antworten liefern trotzdem 3 Ergebnisse", () => {
    const answers = [4, 2, 4, 1, 5, 1, 2];
    const results = calculateMatches(answers);
    expect(results).toHaveLength(3);
  });

  it("zeigt deutsche Namen aus classes.ts an, nicht eigene", () => {
    const answers = [0, 0, 0, 0, 0, 0, 0];
    const results = calculateMatches(answers);
    results.forEach((r) => {
      const cls = classes.find((c) => c.slug === r.classSlug);
      expect(cls).toBeDefined();
      expect(r.classNameDe).toBe(cls!.names.deProvisional);
    });
  });

  it("zeigt 'Templer', nicht 'Tempelritter'", () => {
    const answers = [0, 0, 0, 0, 0, 0, 0];
    const results = calculateMatches(answers);
    const templarResult = results.find((r) => r.classSlug === "templar");
    if (templarResult) {
      expect(templarResult.classNameDe).toBe("Templer");
      expect(templarResult.classNameDe).not.toBe("Tempelritter");
    }
  });

  it("zeigt 'Kantor', nicht 'Cantor'", () => {
    const answers = [1, 0, 1, 1, 4, 1, 0];
    const results = calculateMatches(answers);
    const chanterResult = results.find((r) => r.classSlug === "chanter");
    if (chanterResult) {
      expect(chanterResult.classNameDe).toBe("Kantor");
      expect(chanterResult.classNameDe).not.toBe("Cantor");
    }
  });

  it("Brawler enthaelt kein 'Stance-System' in Match-Reasons", () => {
    const brawlerProfile = classProfiles.find(
      (p) => p.classSlug === "brawler"
    );
    expect(brawlerProfile).toBeDefined();
    for (const reason of brawlerProfile!.matchReasons) {
      expect(reason.toLowerCase()).not.toContain("stance");
    }
  });

  it("enthaelt keine Superlative wie 'Bester', 'Hoechster', 'Staerkste'", () => {
    const superlatives = [
      "bester",
      "beste",
      "h\u00f6chster",
      "h\u00f6chste",
      "st\u00e4rkste",
      "unverzichtbar",
      "dominant",
    ];
    for (const profile of classProfiles) {
      for (const reason of profile.matchReasons) {
        const lower = reason.toLowerCase();
        for (const word of superlatives) {
          expect(lower).not.toContain(word);
        }
      }
    }
  });
});

describe("Classes Data", () => {
  it("hat genau 9 Klassen", () => {
    expect(classes).toHaveLength(9);
  });

  it("jede Klasse hat einen eindeutigen Slug", () => {
    const slugs = classes.map((c) => c.slug);
    const uniqueSlugs = [...new Set(slugs)];
    expect(uniqueSlugs).toHaveLength(slugs.length);
  });

  it("jede Klasse hat deConfirmed: false", () => {
    classes.forEach((c) => {
      expect(c.names.deConfirmed).toBe(false);
    });
  });

  it("alle Klassen haben researchStatus community-consensus oder experimental", () => {
    classes.forEach((c) => {
      expect(["community-consensus", "experimental"]).toContain(
        c.researchStatus
      );
    });
  });

  it("Brawler hat researchStatus: experimental", () => {
    const brawler = getClassBySlug("brawler");
    expect(brawler).toBeDefined();
    expect(brawler!.researchStatus).toBe("experimental");
  });

  it("keine Klasse hat researchStatus: verified", () => {
    classes.forEach((c) => {
      expect(c.researchStatus).not.toBe("verified");
    });
  });

  it("Templar enthaelt kein 'Mantra-System' in Mechaniken", () => {
    const templar = getClassBySlug("templar");
    expect(templar).toBeDefined();
    for (const mech of templar!.mechanics) {
      expect(mech.toLowerCase()).not.toContain("mantra");
    }
  });

  it("jede Klasse hat difficulty zwischen 1 und 5", () => {
    classes.forEach((c) => {
      expect(c.difficulty).toBeGreaterThanOrEqual(1);
      expect(c.difficulty).toBeLessThanOrEqual(5);
    });
  });

  it("jede Klasse hat pve zwischen 1 und 5", () => {
    classes.forEach((c) => {
      expect(c.pve).toBeGreaterThanOrEqual(1);
      expect(c.pve).toBeLessThanOrEqual(5);
    });
  });

  it("unbekannter Slug wird nicht gefunden", () => {
    expect(getClassBySlug("nonexistent")).toBeUndefined();
  });

  it("getAllSlugs liefert 9 Slugs", () => {
    expect(getAllSlugs()).toHaveLength(9);
  });

  it("jede Klasse hat gueltige koreanische Namen", () => {
    const expectedKo: Record<string, string> = {
      templar: "\uC218\uD638\uC131",
      gladiator: "\uAC80\uC131",
      assassin: "\uC0B4\uC131",
      ranger: "\uAD81\uC131",
      sorcerer: "\uB9C8\uB3C4\uC131",
      spiritmaster: "\uC815\uB839\uC131",
      cleric: "\uCE58\uC720\uC131",
      chanter: "\uD638\uBC95\uC131",
      brawler: "\uAD8C\uC131",
    };
    classes.forEach((c) => {
      expect(c.names.ko).toBe(expectedKo[c.slug]);
    });
  });

  it("jede Klasse hat gueltige deutsche Namen ohne ASCII-Umlaute", () => {
    const expectedDe: Record<string, string> = {
      templar: "Templer",
      gladiator: "Gladiator",
      assassin: "Assassine",
      ranger: "Waldl\u00e4ufer",
      sorcerer: "Zauberer",
      spiritmaster: "Beschw\u00f6rer",
      cleric: "Kleriker",
      chanter: "Kantor",
      brawler: "Brawler",
    };
    classes.forEach((c) => {
      expect(c.names.deProvisional).toBe(expectedDe[c.slug]);
      expect(c.names.deProvisional).not.toMatch(
        /laeufer|beschwoerer|gro[?\u00df]schwert/
      );
    });
  });
});

describe("Builds Data", () => {
  it("hat mindestens 3 Builds", () => {
    expect(builds.length).toBeGreaterThanOrEqual(3);
  });

  it("jeder Build hat einen eindeutigen Slug", () => {
    const slugs = builds.map((b) => b.slug);
    const uniqueSlugs = [...new Set(slugs)];
    expect(uniqueSlugs).toHaveLength(slugs.length);
  });

  it("kein Build hat confidence: verified", () => {
    builds.forEach((b) => {
      expect(b.confidence).not.toBe("verified");
    });
  });

  it("jeder Build hat testedLocally: false", () => {
    builds.forEach((b) => {
      expect(b.testedLocally).toBe(false);
    });
  });

  it("jeder Build hat eine gueltige Patch-ID", () => {
    builds.forEach((b) => {
      expect(b.patchId).toBeDefined();
      expect(b.patchId.length).toBeGreaterThan(0);
    });
  });

  it("jeder Build hat mindestens eine Quelle", () => {
    builds.forEach((b) => {
      expect(b.sourceIds.length).toBeGreaterThan(0);
    });
  });

  it("unbekannter Build-Slug wird nicht gefunden", () => {
    expect(getBuildBySlug("nonexistent")).toBeUndefined();
  });

  it("getAllBuildSlugs liefert alle Slugs", () => {
    expect(getAllBuildSlugs().length).toBe(builds.length);
  });
});

describe("Gear Caps", () => {
  it("jeder Gear-Cap hat eine capType (hard oder soft)", () => {
    for (const cap of statCaps) {
      expect(["hard", "soft"]).toContain(cap.capType);
    }
  });

  it("jeder Gear-Cap hat mindestens eine Quelle in sourceIds", () => {
    for (const cap of statCaps) {
      expect(cap.sourceIds.length).toBeGreaterThan(0);
    }
  });

  it("jede Gear-Cap-Quelle ist ein nicht-leerer String", () => {
    for (const cap of statCaps) {
      for (const sid of cap.sourceIds) {
        expect(sid.length).toBeGreaterThan(0);
      }
    }
  });
});
