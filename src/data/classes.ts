// Korean names follow the current research brief and KR class naming references.
// Client confirmation remains part of later local/global verification.

export interface AionClass {
  id: string;
  names: {
    deProvisional: string;
    en: string;
    ko: string;
    deConfirmed: boolean;
  };
  weapon: {
    deProvisional: string;
    en: string;
  };
  roles: string[];
  range: "melee" | "ranged";
  difficulty: 1 | 2 | 3 | 4 | 5;
  mobility: 1 | 2 | 3 | 4 | 5;
  solo: 1 | 2 | 3 | 4 | 5;
  partyDemand: 1 | 2 | 3 | 4 | 5;
  gearDependency: 1 | 2 | 3 | 4 | 5;
  pve: 1 | 2 | 3 | 4 | 5;
  pvpSmallScale: 1 | 2 | 3 | 4 | 5;
  pvpLargeScale: 1 | 2 | 3 | 4 | 5;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  mechanics: string[];
  researchStatus:
    | "official"
    | "verified"
    | "community-consensus"
    | "experimental"
    | "obsolete";
  slug: string;
}

export const classes: AionClass[] = [
  {
    id: "templar",
    names: {
      deProvisional: "Templer",
      en: "Templar",
      ko: "\uC218\uD638\uC131",
      deConfirmed: false,
    },
    weapon: { deProvisional: "Langschwert", en: "Longsword" },
    roles: ["tank"],
    range: "melee",
    difficulty: 3,
    mobility: 2,
    solo: 2,
    partyDemand: 4,
    gearDependency: 4,
    pve: 4,
    pvpSmallScale: 3,
    pvpLargeScale: 4,
    summary:
      "Defensiver Nahkampf-Tank mit Schild. Zentrale Rolle in Gruppencontent.",
    strengths: [
      "Hohe Defensive durch Schild",
      "in Gruppen- und Raid-Content typisch wichtig",
      "Kann Gegner festhalten",
    ],
    weaknesses: [
      "Geringer Schaden im Vergleich zu DPS-Klassen",
      "Langsame Solo-Progression",
      "Abhängig von Gruppe für optimalen Content",
    ],
    mechanics: [
      "Schild- und Block-Mechaniken",
      "Aggro-/Bedrohungskontrolle",
      "Defensive Cooldowns",
    ],
    researchStatus: "community-consensus",
    slug: "templar",
  },
  {
    id: "gladiator",
    names: {
      deProvisional: "Gladiator",
      en: "Gladiator",
      ko: "\uAC80\uC131",
      deConfirmed: false,
    },
    weapon: { deProvisional: "Großschwert", en: "Greatsword" },
    roles: ["dps"],
    range: "melee",
    difficulty: 2,
    mobility: 3,
    solo: 3,
    partyDemand: 3,
    gearDependency: 3,
    pve: 4,
    pvpSmallScale: 3,
    pvpLargeScale: 3,
    summary:
      "Offensiver Nahkampf-DPS mit Großwaffe. Vielseitig im PvE und PvP.",
    strengths: [
      "Guter Nahkampf-Schaden",
      "Flexibel im PvE und PvP",
      "Schnelle Solo-Progression",
    ],
    weaknesses: [
      "Keine Fernkampf-Option",
      "Mittlere Defensive",
      "Gear-abhängig für Endgame",
    ],
    mechanics: [
      "Kombo-System",
      "Stance-Wechsel",
      "Kritische Treffer-Optimierung",
    ],
    researchStatus: "community-consensus",
    slug: "gladiator",
  },
  {
    id: "assassin",
    names: {
      deProvisional: "Assassine",
      en: "Assassin",
      ko: "\uC0B4\uC131",
      deConfirmed: false,
    },
    weapon: { deProvisional: "Dolche", en: "Daggers" },
    roles: ["dps"],
    range: "melee",
    difficulty: 4,
    mobility: 5,
    solo: 4,
    partyDemand: 3,
    gearDependency: 5,
    pve: 3,
    pvpSmallScale: 5,
    pvpLargeScale: 2,
    summary:
      "Schnelle Burst-DPS-Klasse mit Stealth-Mechanik. Kann im PvP wirksam sein, abhängig von Matchup.",
    strengths: [
      "Hoher Burst-Schaden",
      "Stealth für Überraschungsangriffe",
      "Sehr mobile Klasse",
    ],
    weaknesses: [
      "Geringe Defensive",
      "Schwach in Massenschlachten",
      "Hoher Skill-Faktor",
    ],
    mechanics: [
      "Stealth-Mechanik",
      "Backstab-Boni",
      "Gift-Stacks",
    ],
    researchStatus: "community-consensus",
    slug: "assassin",
  },
  {
    id: "ranger",
    names: {
      deProvisional: "Waldläufer",
      en: "Ranger",
      ko: "\uAD81\uC131",
      deConfirmed: false,
    },
    weapon: { deProvisional: "Bogen", en: "Bow" },
    roles: ["dps"],
    range: "ranged",
    difficulty: 3,
    mobility: 4,
    solo: 4,
    partyDemand: 3,
    gearDependency: 3,
    pve: 4,
    pvpSmallScale: 4,
    pvpLargeScale: 3,
    summary:
      "Fernkampf-DPS mit Bogen. Gute Mobilität und Solo-Fähigkeit.",
    strengths: [
      "Kann aus der Distanz kämpfen",
      "Gute Mobilität",
      "Schnelle Solo-Progression",
    ],
    weaknesses: [
      "Muss Position halten",
      "Geringere Defensive als Nahkämpfer",
      "Abhängig von Treffgenauigkeit",
    ],
    mechanics: [
      "Distanz-Kombos",
      "Fallen-System",
      "Bewegungsschuss",
    ],
    researchStatus: "community-consensus",
    slug: "ranger",
  },
  {
    id: "sorcerer",
    names: {
      deProvisional: "Zauberer",
      en: "Sorcerer",
      ko: "\uB9C8\uB3C4\uC131",
      deConfirmed: false,
    },
    weapon: { deProvisional: "Zauberbuch", en: "Spellbook" },
    roles: ["dps", "control"],
    range: "ranged",
    difficulty: 3,
    mobility: 2,
    solo: 3,
    partyDemand: 4,
    gearDependency: 3,
    pve: 4,
    pvpSmallScale: 4,
    pvpLargeScale: 4,
    summary:
      "Magischer Fernkampf-DPS mit Elementarzaubern. Burst- und Kontrollpotential.",
    strengths: [
      "Hoher magischer Schaden",
      "Kontrollfähigkeiten",
      "Gut für Gruppen-Content",
    ],
    weaknesses: [
      "Geringe Mobilität",
      "Abhängig von Zauberzeit",
      "Geringe Defensive",
    ],
    mechanics: [
      "Elementarzauber",
      "Burst-Kombos",
      "Crowd Control",
    ],
    researchStatus: "community-consensus",
    slug: "sorcerer",
  },
  {
    id: "spiritmaster",
    names: {
      deProvisional: "Beschwörer",
      en: "Spiritmaster",
      ko: "\uC815\uB839\uC131",
      deConfirmed: false,
    },
    weapon: { deProvisional: "Orb", en: "Orb" },
    roles: ["dps", "control"],
    range: "ranged",
    difficulty: 4,
    mobility: 2,
    solo: 3,
    partyDemand: 3,
    gearDependency: 4,
    pve: 4,
    pvpSmallScale: 4,
    pvpLargeScale: 3,
    summary:
      "Beschwörer-Klasse mit Elementargeistern. DoT-Fokus und Kontrolle.",
    strengths: [
      "Kann Geister beschwören",
      "DoT-Schaden über Zeit",
      "Kontrollfähigkeiten",
    ],
    weaknesses: [
      "Geringe Mobilität",
      "Komplexes Geister-Management",
      "Langsamer Schadensaufbau",
    ],
    mechanics: [
      "Geister-Beschwörung",
      "DoT-Stacks",
      "Elementar-Synergien",
    ],
    researchStatus: "community-consensus",
    slug: "spiritmaster",
  },
  {
    id: "cleric",
    names: {
      deProvisional: "Kleriker",
      en: "Cleric",
      ko: "\uCE58\uC720\uC131",
      deConfirmed: false,
    },
    weapon: { deProvisional: "Streitkolben", en: "Mace" },
    roles: ["healer"],
    range: "melee",
    difficulty: 2,
    mobility: 2,
    solo: 3,
    partyDemand: 5,
    gearDependency: 3,
    pve: 5,
    pvpSmallScale: 3,
    pvpLargeScale: 4,
    summary:
      "Hauptheiler mit Unterstützungszaubern. in Gruppen voraussichtlich nützlich.",
    strengths: [
      "Heilung für Gruppe",
      "in Dungeons voraussichtlich stark nachgefragt",
      "Unterstützende Buffs",
    ],
    weaknesses: [
      "Geringer Schaden",
      "Geringe Mobilität",
      "Abhängig von Gruppe",
    ],
    mechanics: [
      "Heilung",
      "Buffs",
      "Aggro-Management",
    ],
    researchStatus: "community-consensus",
    slug: "cleric",
  },
  {
    id: "chanter",
    names: {
      deProvisional: "Kantor",
      en: "Chanter",
      ko: "\uD638\uBC95\uC131",
      deConfirmed: false,
    },
    weapon: { deProvisional: "Stab", en: "Staff" },
    roles: ["support", "healer"],
    range: "melee",
    difficulty: 3,
    mobility: 3,
    solo: 3,
    partyDemand: 4,
    gearDependency: 3,
    pve: 4,
    pvpSmallScale: 3,
    pvpLargeScale: 4,
    summary:
      "Hybrid-Support mit Heilung und Buffs. Flexible Rolle in Gruppen.",
    strengths: [
      "Buffs für Gruppe",
      "Heilung nötigenfalls",
      "Flexibel einsetzbar",
    ],
    weaknesses: [
      "Kein spezialisierter Hauptheiler",
      "Geringerer Schaden als DPS",
      "Mittlere Mobilität",
    ],
    mechanics: [
      "Mantra-System",
      "Hybrid-Rolle",
      "Gruppen-Buffs",
    ],
    researchStatus: "community-consensus",
    slug: "chanter",
  },
  {
    id: "brawler",
    names: {
      deProvisional: "Brawler",
      en: "Brawler",
      ko: "\uAD8C\uC131",
      deConfirmed: false,
    },
    weapon: { deProvisional: "Panzerhandschuh", en: "Gauntlet" },
    roles: ["dps"],
    range: "melee",
    difficulty: 4,
    mobility: 3,
    solo: 3,
    partyDemand: 2,
    gearDependency: 4,
    pve: 3,
    pvpSmallScale: 3,
    pvpLargeScale: 2,
    summary:
      "Nahkampf-DPS mit Fury/Rage-System. Seit Chapter 1 verfügbar.",
    strengths: [
      "Fury/Rage-System",
      "Berserk-Modus",
      "Dynamischer Kampfstil",
    ],
    weaknesses: [
      "Neue Klasse, wenig getestet",
      "Builds noch nicht stabil",
      "Geringe Nachfrage bisher",
    ],
    mechanics: [
      "Fury/Rage-Generation",
      "Berserk-Modus",
      "Kombo-System",
    ],
    researchStatus: "experimental",
    slug: "brawler",
  },
];

export function getClassBySlug(
  slug: string
): AionClass | undefined {
  return classes.find((c) => c.slug === slug);
}

export function getAllSlugs(): string[] {
  return classes.map((c) => c.slug);
}
