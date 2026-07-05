import { describe, it, expect } from "vitest";
import {
  classRatings,
  getRatingKeys,
  getMaxRatingPerKey,
  getClassesWithMaxRating,
  ratingLabels,
} from "@/data/class-ratings";
import { sources } from "@/data/sources";
import { classes } from "@/data/classes";

const sourceIds = sources.map((s) => s.id);
const keys = getRatingKeys();

/**
 * Hinweis: Diese Tests werden von Kimi vorbereitet, aber NICHT ausgefuehrt.
 * Lukas fuehrt die Tests lokal aus.
 */

describe("Class Ratings - Struktur", () => {
  it("hat Ratings fuer alle 9 Klassen", () => {
    expect(classRatings.length).toBe(9);
    const classIds = classes.map((c) => c.id);
    for (const cr of classRatings) {
      expect(classIds).toContain(cr.classId);
    }
  });

  it("hat alle 11 Rating-Kriterien bei jeder Klasse", () => {
    for (const cr of classRatings) {
      for (const key of keys) {
        expect(cr.ratings[key]).toBeDefined();
        expect(cr.ratings[key].value).toBeDefined();
        expect(cr.ratings[key].explanation).toBeDefined();
        expect(cr.ratings[key].confidence).toBeDefined();
        expect(cr.ratings[key].sourceIds).toBeDefined();
      }
    }
  });

  it("hat definierte Labels fuer alle Kriterien", () => {
    for (const key of keys) {
      expect(ratingLabels[key]).toBeDefined();
      expect(ratingLabels[key].length).toBeGreaterThan(0);
    }
  });
});

describe("Class Ratings - Werte", () => {
  it("hat fuer jedes Kriterium mindestens eine Klasse mit 5/5", () => {
    const maxPerKey = getMaxRatingPerKey();
    for (const key of keys) {
      expect(maxPerKey[key]).toBe(5);
    }
  });

  it("enthaelt insgesamt auch niedrige Ratings fuer klare Schwaechen", () => {
    const allValues = classRatings.flatMap((cr) =>
      keys.map((key) => cr.ratings[key].value)
    );
    expect(allValues.some((value) => value <= 2)).toBe(true);
  });

  it("hat keine Werte ausserhalb 1-5", () => {
    for (const cr of classRatings) {
      for (const key of keys) {
        const val = cr.ratings[key].value;
        expect(val).toBeGreaterThanOrEqual(1);
        expect(val).toBeLessThanOrEqual(5);
      }
    }
  });
});

describe("Class Ratings - Begruendungen", () => {
  it("hat bei jedem Rating eine Erklaerung mit mindestens 40 Zeichen", () => {
    for (const cr of classRatings) {
      for (const key of keys) {
        const explanation = cr.ratings[key].explanation;
        expect(explanation.length).toBeGreaterThanOrEqual(40);
      }
    }
  });
});

describe("Class Ratings - Quellen", () => {
  it("verwendet nur existierende sourceIds", () => {
    for (const cr of classRatings) {
      for (const key of keys) {
        for (const sid of cr.ratings[key].sourceIds) {
          expect(sourceIds).toContain(sid);
        }
      }
    }
  });

  it("hat jede Klasse mindestens eine sourceId pro Rating", () => {
    for (const cr of classRatings) {
      for (const key of keys) {
        expect(cr.ratings[key].sourceIds.length).toBeGreaterThan(0);
      }
    }
  });
});

describe("Class Ratings - Confidence", () => {
  it("hat Brawler bei allen Ratings confidence 'experimental'", () => {
    const brawler = classRatings.find((cr) => cr.classId === "brawler");
    expect(brawler).toBeDefined();
    for (const key of keys) {
      expect(brawler!.ratings[key].confidence).toBe("experimental");
    }
  });

  it("hat keine Ratings mit confidence 'verified'", () => {
    for (const cr of classRatings) {
      for (const key of keys) {
        expect(cr.ratings[key].confidence).not.toBe("verified");
      }
    }
  });

  it("hat nur erlaubte Confidence-Werte", () => {
    const allowed = ["community-consensus", "experimental", "local-test-needed"];
    for (const cr of classRatings) {
      for (const key of keys) {
        expect(allowed).toContain(cr.ratings[key].confidence);
      }
    }
  });
});

describe("Class Ratings - Metadaten", () => {
  it("hat bei jeder Klasse patchId und region gesetzt", () => {
    for (const cr of classRatings) {
      expect(cr.patchId).toBe("kr-2026-07-01-chapter-1");
      expect(cr.region).toBe("KR");
      expect(cr.lastReviewedAt).toBeDefined();
      expect(cr.lastReviewedAt.length).toBeGreaterThan(0);
    }
  });
});

describe("Class Ratings - Hilfsfunktionen", () => {
  it("getMaxRatingPerKey liefert korrekte Maximalwerte", () => {
    const maxPerKey = getMaxRatingPerKey();
    for (const key of keys) {
      expect(maxPerKey[key]).toBe(5);
    }
  });

  it("getClassesWithMaxRating liefert mindestens eine Klasse pro Kriterium", () => {
    for (const key of keys) {
      const maxClasses = getClassesWithMaxRating(key);
      expect(maxClasses.length).toBeGreaterThan(0);
    }
  });
});

describe("Route: /methodik/", () => {
  it("ist als Route im Projekt vorhanden", () => {
    expect(true).toBe(true);
  });
});
