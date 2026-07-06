import { z } from "zod";
import { classes } from "@/data/classes";
import { builds } from "@/data/builds";
import { patches } from "@/data/patches";
import { sources } from "@/data/sources";
import { statCaps, gearCategories } from "@/data/gear";
import { classProfiles } from "@/data/classFinder";
import { classRatings, getRatingKeys } from "@/data/class-ratings";
import { plannerItems } from "@/data/build-planner/items";
import { plannerSlots } from "@/data/build-planner/types";
import type { PlannerStatKey } from "@/data/build-planner/types";

// ── Schemas ──────────────────────────────────────────────────────

const classSchema = z.object({
  id: z.string(),
  names: z.object({
    deProvisional: z.string(),
    en: z.string(),
    ko: z.string(),
    deConfirmed: z.literal(false),
  }),
  weapon: z.object({
    deProvisional: z.string(),
    en: z.string(),
  }),
  roles: z.array(z.string()),
  range: z.enum(["melee", "ranged"]),
  difficulty: z.number().int().min(1).max(5),
  mobility: z.number().int().min(1).max(5),
  solo: z.number().int().min(1).max(5),
  partyDemand: z.number().int().min(1).max(5),
  gearDependency: z.number().int().min(1).max(5),
  pve: z.number().int().min(1).max(5),
  pvpSmallScale: z.number().int().min(1).max(5),
  pvpLargeScale: z.number().int().min(1).max(5),
  summary: z.string(),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  mechanics: z.array(z.string()),
  researchStatus: z.enum([
    "official",
    "verified",
    "community-consensus",
    "experimental",
    "obsolete",
  ]),
  slug: z.string(),
});

const buildSchema = z.object({
  id: z.string(),
  slug: z.string(),
  classId: z.string(),
  title: z.string(),
  purpose: z.string(),
  region: z.enum(["KR", "TW", "GLOBAL"]),
  patchId: z.string(),
  levelCap: z.number().int(),
  confidence: z.enum(["draft", "community-consensus", "verified"]),
  publicationStatus: z.enum(["draft", "review", "published"]),
  lastReviewedAt: z.string(),
  testedLocally: z.literal(false),
  localizationStatus: z.object({
    de: z.enum(["provisional", "reviewed", "confirmed"]),
    en: z.enum(["provisional", "reviewed", "confirmed"]),
  }),
  overview: z.string(),
  playstyle: z.string(),
  statPriorities: z.array(z.any()),
  gear: z.array(z.any()),
  rotationType: z.string(),
  rotation: z.array(z.any()),
  alternatives: z.array(z.any()),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  commonMistakes: z.array(z.any()),
  sourceIds: z.array(z.string()).min(1),
  editorialNotes: z.array(z.string()),
});

const patchSchema = z.object({
  id: z.string(),
  region: z.enum(["KR", "TW", "GLOBAL"]),
  title: z.string(),
  date: z.string(),
  levelCap: z.number().int().nullable(),
  status: z.enum(["live", "announced", "archived"]),
  summary: z.string(),
  features: z.array(z.string()),
  sourceIds: z.array(z.string()),
});

const sourceSchema = z.object({
  id: z.string(),
  title: z.string(),
  url: z
    .string()
    .url()
    .refine((u) => u.startsWith("https://"), {
      message: "URL must be https://",
    })
    .refine((u) => !u.includes("..."), {
      message: "URL must not contain placeholder '...'",
    }),
  publisher: z.string(),
  type: z.string(),
  language: z.string(),
  reliability: z.number().int().min(1).max(5),
  lastChecked: z.string().refine((d) => d !== "2025-07-01", {
    message: "lastChecked must not be 2025-07-01",
  }),
  notes: z.string().optional(),
});

// ── Valid Korean names (official AION 2 KR client) ───────────────

const VALID_KO_NAMES: Record<string, string> = {
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

// ── Valid German names (provisional) ─────────────────────────────

const VALID_DE_NAMES: Record<string, string> = {
  templar: "Templer",
  gladiator: "Gladiator",
  assassin: "Assassine",
  ranger: "Waldläufer",
  sorcerer: "Zauberer",
  spiritmaster: "Beschwörer",
  cleric: "Kleriker",
  chanter: "Kantor",
  brawler: "Brawler",
};

// ── Validation functions ─────────────────────────────────────────

function validateClasses(): string[] {
  const errors: string[] = [];

  if (classes.length !== 9) {
    errors.push(`Expected 9 classes, got ${classes.length}`);
  }

  const slugs = classes.map((c) => c.slug);
  const uniqueSlugs = [...new Set(slugs)];
  if (uniqueSlugs.length !== slugs.length) {
    errors.push("Duplicate class slugs found");
  }

  for (const cls of classes) {
    if (cls.names.deConfirmed !== false) {
      errors.push(`${cls.slug}: deConfirmed must be false`);
    }

    const expectedKo = VALID_KO_NAMES[cls.slug];
    if (expectedKo && cls.names.ko !== expectedKo) {
      errors.push(`${cls.slug}: Korean name '${cls.names.ko}' does not match expected '${expectedKo}'`);
    }

    const expectedDe = VALID_DE_NAMES[cls.slug];
    if (expectedDe && cls.names.deProvisional !== expectedDe) {
      errors.push(`${cls.slug}: German name '${cls.names.deProvisional}' does not match expected '${expectedDe}'`);
    }

    if (cls.researchStatus === "verified") {
      errors.push(`${cls.slug}: researchStatus must not be 'verified'`);
    }

    if (cls.slug === "brawler" && cls.researchStatus !== "experimental") {
      errors.push(`${cls.slug}: Brawler must have researchStatus 'experimental'`);
    }

    // Templar must not contain Mantra-System
    if (cls.slug === "templar") {
      for (const mech of cls.mechanics) {
        if (mech.toLowerCase().includes("mantra")) {
          errors.push(`${cls.slug}: Templar mechanics must not contain 'Mantra-System', got '${mech}'`);
        }
      }
    }

    // Check for ASCII umlauts in visible text
    const asciiUmlautPatterns = [/laeufer/i, /beschwoerer/i, /gro[^a-z]schwert/i, /fuer /i, /ueber/i];
    for (const pattern of asciiUmlautPatterns) {
      if (pattern.test(cls.names.deProvisional)) {
        errors.push(`${cls.slug}: German name contains ASCII umlaut: '${cls.names.deProvisional}'`);
      }
    }

    const result = classSchema.safeParse(cls);
    if (!result.success) {
      errors.push(`${cls.slug}: Schema validation failed - ${result.error.message}`);
    }
  }

  return errors;
}

function validateBuilds(): string[] {
  const errors: string[] = [];

  for (const build of builds) {
    // No verified confidence
    if (build.confidence === "verified") {
      errors.push(`${build.slug}: confidence must not be 'verified'`);
    }

    // testedLocally must be false
    if (build.testedLocally !== false) {
      errors.push(`${build.slug}: testedLocally must be false`);
    }

    // Must have patchId
    if (!build.patchId || build.patchId.length === 0) {
      errors.push(`${build.slug}: patchId is required`);
    }

    const classExists = classes.some(
      (cls) => cls.id === build.classId || cls.slug === build.classId
    );
    if (!classExists) {
      errors.push(`${build.slug}: classId '${build.classId}' does not exist`);
    }

    const patchExists = patches.some((patch) => patch.id === build.patchId);
    if (!patchExists) {
      errors.push(`${build.slug}: patchId '${build.patchId}' does not exist`);
    }

    // Must have sourceIds
    if (!build.sourceIds || build.sourceIds.length === 0) {
      errors.push(`${build.slug}: at least one sourceId is required`);
    }

    // lastReviewedAt must not be 2025-07-01
    if (build.lastReviewedAt === "2025-07-01") {
      errors.push(`${build.slug}: lastReviewedAt must not be '2025-07-01'`);
    }

    // Validate schema
    const result = buildSchema.safeParse(build);
    if (!result.success) {
      errors.push(`${build.slug}: Schema validation failed - ${result.error.message}`);
    }
  }

  return errors;
}

function validatePatches(): string[] {
  const errors: string[] = [];

  for (const patch of patches) {
    const result = patchSchema.safeParse(patch);
    if (!result.success) {
      errors.push(`${patch.id}: Schema validation failed - ${result.error.message}`);
    }
  }

  return errors;
}

function validateSources(): string[] {
  const errors: string[] = [];

  for (const source of sources) {
    // URL must not contain placeholder
    if (source.url.includes("...")) {
      errors.push(`${source.id}: URL contains placeholder '...'`);
    }

    // lastChecked must not be 2025-07-01
    if (source.lastChecked === "2025-07-01") {
      errors.push(`${source.id}: lastChecked must not be '2025-07-01'`);
    }

    // Validate schema
    const result = sourceSchema.safeParse(source);
    if (!result.success) {
      errors.push(`${source.id}: Schema validation failed - ${result.error.message}`);
    }
  }

  return errors;
}

// ── Superlative blacklist ────────────────────────────────────────

const SUPERLATIVE_BLACKLIST = [
  "bester",
  "beste",
  "h\u00f6chster",
  "h\u00f6chste",
  "st\u00e4rkste",
  "unverzichtbar",
  "dominant",
];

function containsSuperlative(text: string): boolean {
  const lower = text.toLowerCase();
  return SUPERLATIVE_BLACKLIST.some((word) => lower.includes(word));
}

// ── Validation: Gear Caps ────────────────────────────────────────

function validateGearCaps(): string[] {
  const errors: string[] = [];

  for (const cap of statCaps) {
    if (!cap.sourceIds || cap.sourceIds.length === 0) {
      errors.push(`Gear cap '${cap.statDe}' must have at least one sourceId`);
    }
    for (const sid of cap.sourceIds) {
      const source = sources.find((s) => s.id === sid);
      if (!source) {
        errors.push(`Gear cap '${cap.statDe}': sourceId '${sid}' does not exist in sources.ts`);
      }
    }
    if (!cap.capType) {
      errors.push(`Gear cap '${cap.statDe}' must have a capType (hard or soft)`);
    }
  }

  return errors;
}

// ── Validation: Reference Integrity ──────────────────────────────

function validateBuildSourceIds(): string[] {
  const errors: string[] = [];
  for (const build of builds) {
    for (const sid of build.sourceIds) {
      const source = sources.find((s) => s.id === sid);
      if (!source) {
        errors.push(`${build.slug}: sourceId '${sid}' does not exist in sources.ts`);
      }
    }
  }
  return errors;
}

function validatePatchSourceIds(): string[] {
  const errors: string[] = [];
  for (const patch of patches) {
    for (const sid of patch.sourceIds) {
      const source = sources.find((s) => s.id === sid);
      if (!source) {
        errors.push(`${patch.id}: sourceId '${sid}' does not exist in sources.ts`);
      }
    }
  }
  return errors;
}

// ── Validation: Gear Categories ──────────────────────────────────

function validateGearCategories(): string[] {
  const errors: string[] = [];
  for (const cat of gearCategories) {
    if (cat.items.length > 0) {
      // Items should only be populated after Global Release verification
      for (const item of cat.items) {
        if (!item.sourceId) {
          errors.push(`Gear category '${cat.id}': item '${item.id}' should have a sourceId`);
        }
      }
    }
  }
  return errors;
}

// ── Validation: ClassFinder ──────────────────────────────────────

function validateClassFinder(): string[] {
  const errors: string[] = [];

  for (const profile of classProfiles) {
    const cls = classes.find((c) => c.slug === profile.classSlug);
    if (!cls) {
      errors.push(`classFinder: No class found for slug '${profile.classSlug}'`);
      continue;
    }

    // Check matchReasons for superlatives
    for (const reason of profile.matchReasons) {
      if (containsSuperlative(reason)) {
        errors.push(`classFinder ${profile.classSlug}: matchReason contains superlative: '${reason}'`);
      }
    }

    // Check for stale classNameDe (should not exist in profile anymore)
    if ("classNameDe" in profile) {
      errors.push(`classFinder ${profile.classSlug}: profile must not contain 'classNameDe', derive from classes.ts`);
    }
  }

  return errors;
}

// ── Validation: Class Ratings ────────────────────────────────────

function validateRatings(): string[] {
  const errors: string[] = [];
  const keys = getRatingKeys();
  const sourceIds = sources.map((s) => s.id);

  if (classRatings.length !== 9) {
    errors.push(`Expected 9 class ratings, got ${classRatings.length}`);
  }

  for (const cr of classRatings) {
    const classExists = classes.some(
      (cls) => cls.id === cr.classId || cls.slug === cr.classId
    );
    if (!classExists) {
      errors.push(`${cr.classId}: rating classId does not exist`);
    }

    const patchExists = patches.some((patch) => patch.id === cr.patchId);
    if (!patchExists) {
      errors.push(`${cr.classId}: rating patchId '${cr.patchId}' does not exist`);
    }
    for (const key of keys) {
      if (!cr.ratings[key]) {
        errors.push(`${cr.classId}: Missing rating for '${key}'`);
        continue;
      }
      const rating = cr.ratings[key];
      if (rating.value < 1 || rating.value > 5) {
        errors.push(`${cr.classId}.${key}: Value must be 1-5, got ${rating.value}`);
      }
      if (!rating.explanation || rating.explanation.length < 40) {
        errors.push(`${cr.classId}.${key}: Explanation must be at least 40 chars, got ${rating.explanation?.length ?? 0}`);
      }
      for (const sid of rating.sourceIds) {
        if (!sourceIds.includes(sid)) {
          errors.push(`${cr.classId}.${key}: sourceId '${sid}' does not exist in sources.ts`);
        }
      }
    }
    if (cr.classId === "brawler") {
      for (const key of keys) {
        const rating = cr.ratings[key];
        if (rating && rating.confidence !== "experimental") {
          errors.push(`${cr.classId}.${key}: Brawler rating must have confidence 'experimental'`);
        }
      }
    }
  }

  for (const key of keys) {
    const hasMax = classRatings.some((cr) => cr.ratings[key]?.value === 5);
    if (!hasMax) {
      errors.push(`Rating '${key}': No class has value 5/5`);
    }
  }

  return errors;
}

// ── Validation: Build-Planner ────────────────────────────────────

function validatePlannerItems(): string[] {
  const errors: string[] = [];
  const validSlots = new Set(plannerSlots);
  const validClassIds = new Set(classes.map((c) => c.id));
  const validPatchIds = new Set(patches.map((p) => p.id));
  const validStatKeys = new Set<PlannerStatKey>([
    "attack", "magicAttack", "crit", "accuracy", "defense",
    "magicDefense", "hp", "mp", "movement", "cooldownReduction",
  ]);
  const validConfidences = new Set([
    "official", "verified", "community-consensus", "experimental",
  ]);
  const seenIds = new Set<string>();

  for (const item of plannerItems) {
    // Eindeutige ID
    if (seenIds.has(item.id)) {
      errors.push(`Planner item duplicate id: ${item.id}`);
    }
    seenIds.add(item.id);

    // Gueltiger Slot
    if (!validSlots.has(item.slot)) {
      errors.push(`Planner item ${item.id}: invalid slot '${item.slot}'`);
    }

    // classIds muessen existieren
    if (item.classIds) {
      for (const cid of item.classIds) {
        if (!validClassIds.has(cid)) {
          errors.push(`Planner item ${item.id}: classId '${cid}' does not exist`);
        }
      }
    }

    // patchId muss existieren
    if (!validPatchIds.has(item.patchId)) {
      errors.push(`Planner item ${item.id}: patchId '${item.patchId}' does not exist`);
    }

    // Stats muessen gueltige Keys haben
    for (const statKey of Object.keys(item.stats)) {
      if (!validStatKeys.has(statKey as PlannerStatKey)) {
        errors.push(`Planner item ${item.id}: invalid stat key '${statKey}'`);
      }
    }

    // Confidence muss gueltig sein
    if (!validConfidences.has(item.confidence)) {
      errors.push(`Planner item ${item.id}: invalid confidence '${item.confidence}'`);
    }
  }

  return errors;
}

// ── Main validation ──────────────────────────────────────────────

export function validateAllContent(): { valid: boolean; errors: string[] } {
  const errors: string[] = [
    ...validateClasses(),
    ...validateBuilds(),
    ...validatePatches(),
    ...validateSources(),
    ...validateGearCaps(),
    ...validateClassFinder(),
    ...validateGearCategories(),
    ...validateBuildSourceIds(),
    ...validatePatchSourceIds(),
    ...validateRatings(),
    ...validatePlannerItems(),
  ];

  return {
    valid: errors.length === 0,
    errors,
  };
}

// Run validation on import (build-time check)
const validation = validateAllContent();
if (!validation.valid) {
  const message =
    "Content validation failed:\n" + validation.errors.map((e) => `  - ${e}`).join("\n");
  // In development, throw to make errors visible
  // In production build, this will fail the build
  if (process.env.NODE_ENV !== "production") {
    console.error("[content-validation] " + message);
  }
  throw new Error(message);
}
