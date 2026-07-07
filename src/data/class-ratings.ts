// Klassenratings mit Begründungen – vorläufige KR/TW-Datenstand
// Jede Bewertung enthält: Wert, Erklärung, Confidence, Quellenbezug
// Keine Ratings als 'verified'. Brawler überall 'experimental'.

export type RatingKey =
  | "beginnerFriendly"
  | "mechanicalDemand"
  | "soloPve"
  | "groupPve"
  | "soloPvp"
  | "teamPvp"
  | "massPvp"
  | "mobility"
  | "survivability"
  | "gearDependency"
  | "groupUtility";

export const ratingLabels: Record<RatingKey, string> = {
  beginnerFriendly: "Einsteigerfreundlichkeit",
  mechanicalDemand: "Mechanischer Anspruch",
  soloPve: "Solo-PvE",
  groupPve: "Gruppen-PvE",
  soloPvp: "Solo-PvP",
  teamPvp: "Team-PvP",
  massPvp: "Mass-PvP / Abyss",
  mobility: "Mobilität",
  survivability: "Überlebensfähigkeit",
  gearDependency: "Ausrüstungsabhängigkeit",
  groupUtility: "Gruppennutzen",
};

export const ratingShortLabels: Record<RatingKey, string> = {
  beginnerFriendly: "Einsteiger",
  mechanicalDemand: "Anspruch",
  soloPve: "Solo-PvE",
  groupPve: "Gruppen-PvE",
  soloPvp: "Solo-PvP",
  teamPvp: "Team-PvP",
  massPvp: "Mass-PvP",
  mobility: "Mobilität",
  survivability: "Überleben",
  gearDependency: "Gear-Abh.",
  groupUtility: "Gruppennutzen",
};

export type RatingConfidence =
  | "community-consensus"
  | "experimental"
  | "local-test-needed";

export const confidenceLabels: Record<RatingConfidence, string> = {
  "community-consensus": "Community-Konsens",
  experimental: "Experimentell",
  "local-test-needed": "Lokaler Test nötig",
};

export interface RatingEntry {
  value: 1 | 2 | 3 | 4 | 5;
  explanation: string;
  confidence: RatingConfidence;
  sourceIds: string[];
}

export type ClassRatingId =
  | "templar"
  | "gladiator"
  | "assassin"
  | "ranger"
  | "sorcerer"
  | "spiritmaster"
  | "cleric"
  | "chanter"
  | "brawler";

export interface ClassRating {
  classId: ClassRatingId;
  patchId: "kr-2026-07-01-chapter-1";
  region: "KR";
  lastReviewedAt: string;
  ratings: Record<RatingKey, RatingEntry>;
}

// ── Hilfsfunktion ────────────────────────────────────────────────

function r(
  value: 1 | 2 | 3 | 4 | 5,
  explanation: string,
  confidence: RatingConfidence,
  sourceIds: string[]
): RatingEntry {
  return { value, explanation, confidence, sourceIds };
}

// ── Quellen ──────────────────────────────────────────────────────

const S_A2HUB = ["aion2hub-classes"];
const S_INVEN = ["inven-kr-2026-07-01-patch", "inven-global-2026-07-01-chapter-1"];
const S_OFFICIAL = ["ncsoft-2025-11-18-launch", "aion2-official-kr"];
const S_ALL = [...S_OFFICIAL, ...S_INVEN, ...S_A2HUB];

// ── Templar ──────────────────────────────────────────────────────

const templarRating: ClassRating = {
  classId: "templar",
  patchId: "kr-2026-07-01-chapter-1",
  region: "KR",
  lastReviewedAt: "2026-07-05",
  ratings: {
    beginnerFriendly: r(3, "Templer ist im relativen Vergleich moderat zugänglich. Die Tank-Rolle ist konzeptionell klar, erfordert aber Kenntnis von Aggro-Management, Positionierung und Cooldown-Planung.", "community-consensus", S_A2HUB),
    mechanicalDemand: r(3, "Der mechanische Anspruch liegt im Mittelfeld. Tank-Mechaniken wie Block-Timing, Aggro-Rotation und Gruppen-Schutz erfordern Übung, sind aber weniger komplex als Burst-Rotationen mancher DPS-Klassen.", "community-consensus", S_A2HUB),
    soloPve: r(3, "Im Solo-PvE ist der Templer solide, aber langsamer als reine DPS-Klassen. Die Defensive ermöglicht sicheres Spiel, der geringere Schaden verlängert jedoch Kämpfe.", "community-consensus", S_A2HUB),
    groupPve: r(5, "Im Gruppen-PvE ist der Templer innerhalb des aktuellen Klassenvergleichs besonders stark. Als Haupttank mit Schild, Block-Mechanik und Gruppen-Schutz-Fähigkeiten bietet er hohe Stabilität.", "community-consensus", S_ALL),
    soloPvp: r(3, "Im Solo-PvP kann der Templer durch hohe Defensive und Crowd-Control ausharren, fehlt aber an Burst und Mobilität für schnelle Kills. Matchup-abhängig.", "community-consensus", S_A2HUB),
    teamPvp: r(5, "Im Team-PvP ist der Templer sehr stark. Frontline-Präsenz, Gruppen-Schutz und Crowd-Control ermöglichen es Verbündeten, Schaden frei auszuteilen.", "community-consensus", S_ALL),
    massPvp: r(5, "Im Mass-PvP und Abyss ist der Templer innerhalb des Vergleichs besonders wertvoll. Frontline-Stabilität und Gruppen-Utility sind in großen Kämpfen essenziell.", "community-consensus", S_ALL),
    mobility: r(2, "Die Mobilität des Templers ist im Vergleich eher niedrig. Schwere Rüstung und Schild-Mechaniken priorisieren Stabilität über Beweglichkeit.", "community-consensus", S_A2HUB),
    survivability: r(5, "Die Überlebensfähigkeit des Templers ist innerhalb des Vergleichs sehr hoch. Schild, Block, defensive Cooldowns und hohe Rüstungswerte ermöglichen hohe Robustheit.", "community-consensus", S_A2HUB),
    gearDependency: r(4, "Der Templer profitiert deutlich von guter AusRüstung, besonders im Endgame. Block-Werte, HP und defensive Stats beeinflussen die Gruppen-Tauglichkeit stark.", "community-consensus", S_A2HUB),
    groupUtility: r(5, "Der Gruppennutzen des Templers ist sehr hoch. Tank, Aggro-Kontrolle, Gruppen-Schutz und Crowd-Control machen ihn in organisiertem Content wertvoll.", "community-consensus", S_ALL),
  },
};

// ── Gladiator ────────────────────────────────────────────────────

const gladiatorRating: ClassRating = {
  classId: "gladiator",
  patchId: "kr-2026-07-01-chapter-1",
  region: "KR",
  lastReviewedAt: "2026-07-05",
  ratings: {
    beginnerFriendly: r(4, "Gladiator ist im relativen Vergleich zugänglich. Die Großschwert-DPS-Rolle ist intuitiv, Rotations sind nachvollziehbar und die Klasse verzeiht Fehler moderat.", "community-consensus", S_A2HUB),
    mechanicalDemand: r(3, "Der mechanische Anspruch liegt im Mittelfeld. Kombo-System und Stance-Wechsel erfordern Übung, sind aber weniger komplex als Stealth- oder Pet-Mechaniken.", "community-consensus", S_A2HUB),
    soloPve: r(4, "Im Solo-PvE ist der Gladiator solide. Guter Schaden, solide Defensive und Selbstheilung ermöglichen effiziente Solo-Progression.", "community-consensus", S_A2HUB),
    groupPve: r(4, "Im Gruppen-PvE ist der Gladiator nützlich als Nahkampf-DPS. Er bietet guten Schaden, hat aber weniger spezifischen Gruppennutzen als Tank, Heiler oder Support.", "community-consensus", S_A2HUB),
    soloPvp: r(4, "Im Solo-PvP ist der Gladiator durchsetzungsfähig. Guter Burst, solide Defensive und Überraschungsmoment beim Stance-Wechsel ermöglichen starke Duelle.", "community-consensus", S_A2HUB),
    teamPvp: r(4, "Im Team-PvP ist der Gladiator als Frontline-DPS wertvoll. Er teilt Schaden aus und kann Druck auf gegnerische Heiler ausüben.", "community-consensus", S_A2HUB),
    massPvp: r(4, "Im Mass-PvP ist der Gladiator solide. Großschwert-AoE und Frontline-Präsenz sind nützlich, die geringere Reichweite kann aber problematisch sein.", "community-consensus", S_A2HUB),
    mobility: r(3, "Die Mobilität liegt im Mittelfeld. Kein Teleport oder Stealth, aber Berserk-Modus und Stance-Wechsel ermöglichen situationale Mobilität.", "community-consensus", S_A2HUB),
    survivability: r(4, "Die Überlebensfähigkeit ist solide. Schwere Rüstung, defensive Stances und moderate Selbstheilung ermöglichen gutes Ausharren.", "community-consensus", S_A2HUB),
    gearDependency: r(3, "Die Ausrüstungsabhängigkeit ist moderat. Der Gladiator skaliert mit Gear, funktioniert aber auch mit durchschnittlicher AusRüstung akzeptabel.", "community-consensus", S_A2HUB),
    groupUtility: r(3, "Der Gruppennutzen ist moderat. Als reiner DPS bietet er weniger Utility als Tank, Heiler oder Support, kann aber Frontline-Druck ausüben.", "community-consensus", S_A2HUB),
  },
};

// ── Assassin ─────────────────────────────────────────────────────

const assassinRating: ClassRating = {
  classId: "assassin",
  patchId: "kr-2026-07-01-chapter-1",
  region: "KR",
  lastReviewedAt: "2026-07-05",
  ratings: {
    beginnerFriendly: r(2, "Assassine ist im relativen Vergleich anspruchsvoll. Stealth-Mechanik, Positionierung, Burst-Timing und Gift-Stack-Management erfordern viel Übung.", "community-consensus", S_A2HUB),
    mechanicalDemand: r(5, "Der mechanische Anspruch ist innerhalb des Vergleichs sehr hoch. Backstab-Boni, Stealth-Management, Burst-Windows und Gift-Rotationen erfordern präzises Spiel.", "community-consensus", S_A2HUB),
    soloPve: r(4, "Im Solo-PvE ist die Assassine effizient. Hoher Burst ermöglicht schnelle Kills, Stealth erlaubt gezielte Engagements und Schadensvermeidung.", "community-consensus", S_A2HUB),
    groupPve: r(3, "Im Gruppen-PvE ist die Assassine als reiner DPS nützlich, bietet aber weniger Gruppenutility als Tank, Heiler oder Support. Positionierung ist kritisch.", "community-consensus", S_A2HUB),
    soloPvp: r(5, "Im Solo-PvP ist die Assassine innerhalb des Vergleichs sehr stark. Stealth, Burst und Mobilität ermöglichen starke Initiativen in Duellen und kleinen Kämpfen.", "community-consensus", S_ALL),
    teamPvp: r(4, "Im Team-PvP kann die Assassine gegnerische Heiler oder DPS eliminieren. Voraussetzung ist gute Koordination und Timing mit dem Team.", "community-consensus", S_A2HUB),
    massPvp: r(2, "Im Mass-PvP ist die Assassine riskanter. Geringe Defensive und fehlende AoE machen sie anfällig für Focus-Fire. Positionierung entscheidet überlebenswichtig.", "community-consensus", S_A2HUB),
    mobility: r(5, "Die Mobilität ist innerhalb des Vergleichs sehr hoch. Stealth, Teleport-Mechaniken und schnelle Bewegung ermöglichen maximale Positionierungsfreiheit.", "community-consensus", S_A2HUB),
    survivability: r(3, "Die Überlebensfähigkeit ist moderat. Stealth und Mobilität bieten indirekten Schutz, die niedrige Basis-Defensive macht die Klasse bei Fehlern verzeihlich.", "community-consensus", S_A2HUB),
    gearDependency: r(5, "Die Ausrüstungsabhängigkeit ist innerhalb des Vergleichs sehr hoch. Burst-Damage und Überlebensfähigkeit skalieren stark mit Waffen- und Rüstungswerten.", "community-consensus", S_A2HUB),
    groupUtility: r(2, "Der Gruppennutzen ist eher niedrig. Als reiner Burst-DPS bietet die Assassine kaum buffs, heals oder Crowd-Control für das Team.", "community-consensus", S_A2HUB),
  },
};

// ── Ranger ───────────────────────────────────────────────────────

const rangerRating: ClassRating = {
  classId: "ranger",
  patchId: "kr-2026-07-01-chapter-1",
  region: "KR",
  lastReviewedAt: "2026-07-05",
  ratings: {
    beginnerFriendly: r(5, "Waldlaeufer ist innerhalb des Vergleichs besonders einsteigerfreundlich. Fernkampf, Kiting und Solo-PvE sind früh verständlich. Die Klasse wird anspruchsvoller bei PvP und optimierten Rotationen.", "community-consensus", S_A2HUB),
    mechanicalDemand: r(3, "Der mechanische Anspruch liegt im Mittelfeld. Distanz-Kombos, Fallen-Platzierung und Bewegungsschüsse erfordern Übung, sind aber intuitiver als komplexe Melee-Rotationen.", "community-consensus", S_A2HUB),
    soloPve: r(5, "Im Solo-PvE ist der Waldlaeufer innerhalb des Vergleichs sehr stark. Fernkampf, Kiting, Fallen und hoher DPS ermöglichen effiziente und sichere Solo-Progression.", "community-consensus", S_ALL),
    groupPve: r(4, "Im Gruppen-PvE ist der Waldlaeufer als Fernkampf-DPS solide. Konstanter Schaden aus sicherer Distanz ist wertvoll, spezifischer Gruppennutzen bleibt aber geringer.", "community-consensus", S_A2HUB),
    soloPvp: r(4, "Im Solo-PvP ist der Waldlaeufer durchsetzungsfähig. Kiting, Distanzkontrolle und Fallen ermöglichen starke 1v1-Performance, sind aber positionierungsabhängig.", "community-consensus", S_A2HUB),
    teamPvp: r(3, "Im Team-PvP ist der Waldlaeufer als DPS nützlich, kann aber weniger Druck ausüben als Nahkampf-DPS und bietet weniger Utility als Support.", "community-consensus", S_A2HUB),
    massPvp: r(4, "Im Mass-PvP kann der Waldlaeufer aus sicherer Distanz Schaden austeilen. Die Reichweite ist ein Vorteil, Focus-Fire bleibt aber ein Risiko.", "community-consensus", S_A2HUB),
    mobility: r(5, "Die Mobilität ist innerhalb des Vergleichs sehr hoch. Schnelle Bewegung, Kiting-Faehigkeit und rollende Ausweichmanöver ermöglichen exzellente Positionierung.", "community-consensus", S_A2HUB),
    survivability: r(3, "Die Überlebensfähigkeit ist moderat. Geringere Rüstung als Nahkämpfer wird durch Distanz und Mobilität kompensiert. Bei Nahkampf-Kontakt anfällig.", "community-consensus", S_A2HUB),
    gearDependency: r(3, "Die Ausrüstungsabhängigkeit ist moderat. Der Waldlaeufer profitiert von gutem Bogen, funktioniert aber auch mit basis Gear durch Mobilität und Kiting.", "community-consensus", S_A2HUB),
    groupUtility: r(2, "Der Gruppennutzen ist eher niedrig. Als reiner Fernkampf-DPS bietet er wenig Utility. Fallen koennen situationale CC bieten, sind aber nicht zuverlässig.", "community-consensus", S_A2HUB),
  },
};

// ── Sorcerer ─────────────────────────────────────────────────────

const sorcererRating: ClassRating = {
  classId: "sorcerer",
  patchId: "kr-2026-07-01-chapter-1",
  region: "KR",
  lastReviewedAt: "2026-07-05",
  ratings: {
    beginnerFriendly: r(3, "Zauberer ist im relativen Vergleich moderat zugänglich. Die magische DPS-Rolle ist konzeptionell klar, erfordert aber Zauberzeit-Management und Positionierungsbewusstsein.", "community-consensus", S_A2HUB),
    mechanicalDemand: r(4, "Der mechanische Anspruch ist eher hoch. Elementarzauber-Kombos, Burst-Timing, Crowd-Control-Ketten und Zauberzeit-Optimierung erfordern präzises Spiel.", "community-consensus", S_A2HUB),
    soloPve: r(4, "Im Solo-PvE ist der Zauberer solide. Hoher Burst-Schaden ermöglicht schnelle Kills, Crowd-Control bietet Sicherheit. Zauberzeit und Positionierung erfordern Aufmerksamkeit.", "community-consensus", S_A2HUB),
    groupPve: r(5, "Im Gruppen-PvE ist der Zauberer innerhalb des Vergleichs sehr stark. Hoher magischer Schaden, Elementar-Kombos und Crowd-Control machen ihn wertvoll in Dungeons.", "community-consensus", S_ALL),
    soloPvp: r(3, "Im Solo-PvP ist der Zauberer situativ stark. Burst und CC sind mächtig, aber geringe Mobilität und Zauberzeit machen ihn anfällig für mobile Klassen.", "community-consensus", S_A2HUB),
    teamPvp: r(5, "Im Team-PvP ist der Zauberer sehr stark. AoE-Schaden, Crowd-Control und Burst aus geschützter Position ermöglichen massive Wirkung mit Team-Cover.", "community-consensus", S_ALL),
    massPvp: r(5, "Im Mass-PvP ist der Zauberer innerhalb des Vergleichs sehr stark. AoE-Burst und Flaechen-CC sind in dichten Kämpfen extrem wirkungsvoll.", "community-consensus", S_ALL),
    mobility: r(2, "Die Mobilität ist im Vergleich eher niedrig. Zauberzeit erfordert Standhaftigkeit, Blink-Fähigkeiten bieten Ausweichoptionen mit Cooldown.", "community-consensus", S_A2HUB),
    survivability: r(2, "Die Überlebensfähigkeit ist im Vergleich eher niedrig. Geringe Rüstung, Zauberzeit-Abhängigkeit und niedrige Mobilität machen den Zauberer bei Nahkampf-Kontakt anfällig.", "community-consensus", S_A2HUB),
    gearDependency: r(4, "Die Ausrüstungsabhängigkeit ist eher hoch. Magischer Angriff, Zaubergeschwindigkeit und kritische Treffer skalieren stark mit Gear-Qualität.", "community-consensus", S_A2HUB),
    groupUtility: r(3, "Der Gruppennutzen ist moderat. Crowd-Control und hoher Schaden sind wertvoll, aber dedizierte Buffs oder Heilung bietet der Zauberer nicht.", "community-consensus", S_A2HUB),
  },
};

// ── Spiritmaster ─────────────────────────────────────────────────

const spiritmasterRating: ClassRating = {
  classId: "spiritmaster",
  patchId: "kr-2026-07-01-chapter-1",
  region: "KR",
  lastReviewedAt: "2026-07-05",
  ratings: {
    beginnerFriendly: r(2, "Beschwörer ist im relativen Vergleich anspruchsvoll. Pet-Management, DoT-Stacks, Elementar-Synergien und taktisches Spiel erfordern umfassendes Klassenverständnis.", "community-consensus", S_A2HUB),
    mechanicalDemand: r(4, "Der mechanische Anspruch ist eher hoch. Geister-Steuerung, DoT-Optimierung, Debuff-Ketten und Elementar-Synergien erfordern viel Aufmerksamkeit und Erfahrung.", "community-consensus", S_A2HUB),
    soloPve: r(5, "Im Solo-PvE ist der Beschwörer innerhalb des Vergleichs sehr stark. Geister tanken, DoTs schaden kontinuierlich, Debuffs schwächen Gegner – sehr effizient und sicher.", "community-consensus", S_A2HUB),
    groupPve: r(4, "Im Gruppen-PvE ist der Beschwörer wertvoll. Debuffs, DoTs und Geister bieten konstanten Schaden und taktischen Nutzen, der Burst ist aber geringer als anderer DPS.", "community-consensus", S_A2HUB),
    soloPvp: r(4, "Im Solo-PvP ist der Beschwörer durchsetzungsfähig. Debuffs, Fear-Effects und Geister ermöglichen Kontrolle und ausgedehnte Kämpfe zum eigenen Vorteil.", "community-consensus", S_A2HUB),
    teamPvp: r(4, "Im Team-PvP ist der Beschwörer als Debuffer und Crowd-Control wertvoll. Geister bieten zusätzliche Ziele und Druck, Debuffs schwächen Focus-Ziele.", "community-consensus", S_A2HUB),
    massPvp: r(4, "Im Mass-PvP kann der Beschwörer durch Debuffs und DoTs auf mehrere Ziele wirken. Die Geister bieten Chaos in der gegnerischen Formation.", "community-consensus", S_A2HUB),
    mobility: r(3, "Die Mobilität liegt im Mittelfeld. Der Beschwörer ist nicht besonders schnell, kann aber durch Geister und Debuffs Distanz halten.", "community-consensus", S_A2HUB),
    survivability: r(3, "Die Überlebensfähigkeit ist moderat. Geister bieten indirekten Schutz durch Tanken und Debuffs, die eigene Defensive ist aber geringer als bei schweren Klassen.", "community-consensus", S_A2HUB),
    gearDependency: r(3, "Die Ausrüstungsabhängigkeit ist moderat. Der Beschwörer profitiert von Gear, aber DoTs und Debuffs skalieren anders als reiner Burst-DPS.", "community-consensus", S_A2HUB),
    groupUtility: r(5, "Der Gruppennutzen ist innerhalb des Vergleichs sehr hoch. Debuffs, Crowd-Control, Geister-Utility und DoTs bieten vielfältigen taktischen Wert für das Team.", "community-consensus", S_ALL),
  },
};

// ── Cleric ───────────────────────────────────────────────────────

const clericRating: ClassRating = {
  classId: "cleric",
  patchId: "kr-2026-07-01-chapter-1",
  region: "KR",
  lastReviewedAt: "2026-07-05",
  ratings: {
    beginnerFriendly: r(3, "Kleriker ist im relativen Vergleich moderat zugänglich. Die Heiler-Rolle ist konzeptionell klar, erfordert aber Ressourcen-Management, Timing und Gruppenbewusstsein.", "community-consensus", S_A2HUB),
    mechanicalDemand: r(4, "Der mechanische Anspruch ist eher hoch. Heilung unter Druck, Aggro-Management, Buff-Verteilung und Mana-Optimierung erfordern konzentriertes Spiel.", "community-consensus", S_A2HUB),
    soloPve: r(3, "Im Solo-PvE ist der Kleriker langsamer als DPS-Klassen. Heilung und defensive Fähigkeiten ermöglichen sicheres Spiel, der geringe Schaden verlängert Kämpfe jedoch.", "community-consensus", S_A2HUB),
    groupPve: r(5, "Im Gruppen-PvE ist der Kleriker innerhalb des Vergleichs sehr stark. Hauptheilung, Stabilisierung, Buffs und defensive Reaktionen sind in koordiniertem Content essenziell.", "community-consensus", S_ALL),
    soloPvp: r(4, "Im Solo-PvP ist der Kleriker überraschend durchsetzungsfähig. Hohe Überlebensfähigkeit, Sustain und defensive Cooldowns ermöglichen ausgedehnte Kämpfe.", "community-consensus", S_A2HUB),
    teamPvp: r(5, "Im Team-PvP ist der Kleriker sehr stark. Heilung, Dispel, Buffs und Stabilisierung ermöglichen es dem Team, länger und aggressiver zu spielen.", "community-consensus", S_ALL),
    massPvp: r(5, "Im Mass-PvP ist der Kleriker innerhalb des Vergleichs sehr wertvoll. Flaechenheilung, Gruppen-Buffs und Stabilisierung sind in großen Kämpfen kritisch.", "community-consensus", S_ALL),
    mobility: r(2, "Die Mobilität ist im Vergleich eher niedrig. Schwere Rüstung und Heilzauber erfordern Standhaftigkeit. Defensive Bewegungsfähigkeiten bieten begrenzte Ausweichoptionen.", "community-consensus", S_A2HUB),
    survivability: r(5, "Die Überlebensfähigkeit ist innerhalb des Vergleichs sehr hoch. Hohe Rüstung, Selbstheilung, defensive Buffs und Cooldowns ermöglichen hohe Robustheit.", "community-consensus", S_A2HUB),
    gearDependency: r(3, "Die Ausrüstungsabhängigkeit ist moderat. Heilung skaliert mit Gear, aber die Basis-Heilfähigkeit ermöglicht auch mit durchschnittlicher AusRüstung gruppentaugliches Spiel.", "community-consensus", S_A2HUB),
    groupUtility: r(5, "Der Gruppennutzen ist innerhalb des Vergleichs sehr hoch. Heilung, Buffs, Dispel und Stabilisierung machen den Kleriker in jedem organisierten Content wertvoll.", "community-consensus", S_ALL),
  },
};

// ── Chanter ──────────────────────────────────────────────────────

const chanterRating: ClassRating = {
  classId: "chanter",
  patchId: "kr-2026-07-01-chapter-1",
  region: "KR",
  lastReviewedAt: "2026-07-05",
  ratings: {
    beginnerFriendly: r(4, "Kantor ist im relativen Vergleich zugänglich. Die Hybrid-Rolle aus Support und Heilung ist flexibel, erfordert aber Prioritäten-Entscheidungen zwischen Schaden, Heilung und Buffs.", "community-consensus", S_A2HUB),
    mechanicalDemand: r(4, "Der mechanische Anspruch ist eher hoch. Mantra-Management, Buff-Verteilung, Heilung unter Druck und zeitweiser Schaden erfordern konstante Aufmerksamkeit und schnelle Entscheidungen.", "community-consensus", S_A2HUB),
    soloPve: r(4, "Im Solo-PvE ist der Kantor solide. Hybride Fähigkeiten ermöglichen Selbstheilung, Buffs und moderaten Schaden. Die Flexibilität kompensiert den geringeren Burst.", "community-consensus", S_A2HUB),
    groupPve: r(5, "Im Gruppen-PvE ist der Kantor innerhalb des Vergleichs sehr stark. Buffs, Backup-Heilung, Crowd-Control und Gruppen-Stabilisierung bieten vielfältigen Nutzen.", "community-consensus", S_ALL),
    soloPvp: r(4, "Im Solo-PvP ist der Kantor durchsetzungsfähig. Sustain, Buffs, Stuns und moderate Heilung ermöglichen ausgedehnte Kämpfe mit gutem Überlebenspotenzial.", "community-consensus", S_A2HUB),
    teamPvp: r(5, "Im Team-PvP ist der Kantor sehr stark. Buffs, Heilung, Stuns und Gruppen-Stabilisierung ermöglichen dem Team eine deutlich höhere Effektivität.", "community-consensus", S_ALL),
    massPvp: r(4, "Im Mass-PvP ist der Kantor wertvoll. Mantras und Buffs wirken auf die ganze Gruppe, Stuns unterbrechen gegnerische Formationen. Die Reichweite kann limitieren.", "community-consensus", S_A2HUB),
    mobility: r(3, "Die Mobilität liegt im Mittelfeld. Der Kantor ist nicht besonders schnell, kann aber durch Buffs und Stuns Distanz halten oder schließen.", "community-consensus", S_A2HUB),
    survivability: r(4, "Die Überlebensfähigkeit ist solide. Selbstheilung, Buffs, defensive Mantras und mittlere Rüstung ermöglichen gutes Ausharren in verschiedenen Situationen.", "community-consensus", S_A2HUB),
    gearDependency: r(4, "Die Ausrüstungsabhängigkeit ist eher hoch. Der Kantor skaliert mit allen drei Stats (Schaden, Heilung, Überleben), was gutes Gear besonders wertvoll macht.", "community-consensus", S_A2HUB),
    groupUtility: r(5, "Der Gruppennutzen ist innerhalb des Vergleichs sehr hoch. Buffs, Mantras, Backup-Heilung, Stuns und Gruppen-Stabilisierung bieten umfassenden Support.", "community-consensus", S_ALL),
  },
};

// ── Brawler ──────────────────────────────────────────────────────

const brawlerRating: ClassRating = {
  classId: "brawler",
  patchId: "kr-2026-07-01-chapter-1",
  region: "KR",
  lastReviewedAt: "2026-07-05",
  ratings: {
    beginnerFriendly: r(2, "Brawler ist im relativen Vergleich anspruchsvoll. Das Fury/Rage-System, Berserk-Modus und Kombo-Mechaniken erfordern umfassendes Verstaendnis einer neuen Klasse ohne etablierte Guides.", "experimental", S_A2HUB),
    mechanicalDemand: r(5, "Der mechanische Anspruch ist innerhalb des Vergleichs sehr hoch. Fury-Generation, Berserk-Timing, Kombo-Ketten und Ressourcen-Management erfordern präzises und schnelles Spiel.", "experimental", S_A2HUB),
    soloPve: r(4, "Im Solo-PvE wirkt der Brawler vielversprechend. Hoher Schaden im Berserk-Modus und dynamische Kombos ermöglichen effiziente Kämpfe. Datenstand ist noch vorläufig.", "experimental", S_A2HUB),
    groupPve: r(3, "Im Gruppen-PvE ist die Rolle des Brawlers noch nicht klar definiert. Als DPS ohne spezifischen Gruppennutzen muss er sich gegen etablierte Klassen behaupten.", "experimental", S_A2HUB),
    soloPvp: r(4, "Im Solo-PvP zeigt der Brawler Tendenzen zu starker Burst-Damage im Berserk-Modus. Die Vorhersehbarkeit des Modus kann aber erfahrenen Gegnern einen Vorteil bieten.", "experimental", S_A2HUB),
    teamPvp: r(3, "Im Team-PvP ist die Wirkung des Brawlers noch unsicher. Frontline-Druck ist vorhanden, aber CC-Immunität und koordinierte Focus-Fire koennen den Berserk-Modus neutralisieren.", "experimental", S_A2HUB),
    massPvp: r(3, "Im Mass-PvP ist der Brawler experimentell. Berserk-AoE kann wirkungsvoll sein, aber die geringere Reichweite und fehlende Utility limitieren den Nutzen.", "experimental", S_A2HUB),
    mobility: r(4, "Die Mobilität scheint gut zu sein. Dynamische Kampfbewegungen und Berserk-Speed-Buffs ermöglichen aggressive Positionierung. Endgültige Bewertung steht aus.", "experimental", S_A2HUB),
    survivability: r(3, "Die Überlebensfähigkeit ist vorläufig als moderat einzuschätzen. Im Berserk-Modus ist der Brawler offensiver und anfälliger. Außerhalb fehlt Defensive.", "experimental", S_A2HUB),
    gearDependency: r(4, "Die Ausrüstungsabhängigkeit scheint eher hoch zu sein. Fury-Generation, Berserk-Dauer und Schaden skalieren voraussichtlich stark mit Gear-Qualität.", "experimental", S_A2HUB),
    groupUtility: r(2, "Der Gruppennutzen ist vorläufig als eher niedrig einzuschätzen. Als reiner DPS ohne Buffs oder Heilung muss der Brawler durch Schaden überzeugen.", "experimental", S_A2HUB),
  },
};

// ── Export: Alle Ratings ─────────────────────────────────────────

export const classRatings: ClassRating[] = [
  templarRating, gladiatorRating, assassinRating, rangerRating,
  sorcererRating, spiritmasterRating, clericRating, chanterRating, brawlerRating,
];

// ── Hilfsfunktionen ──────────────────────────────────────────────

export function getRatingByClassId(classId: string): ClassRating | undefined {
  return classRatings.find((rating) => rating.classId === classId);
}

export function getAllClassIds(): ClassRatingId[] {
  return classRatings.map((cr) => cr.classId);
}

export function getRatingKeys(): RatingKey[] {
  return Object.keys(ratingLabels) as RatingKey[];
}

export function getMaxRatingPerKey(): Record<RatingKey, number> {
  const keys = getRatingKeys();
  const result = {} as Record<RatingKey, number>;
  for (const key of keys) {
    let max = 0;
    for (const cr of classRatings) {
      if (cr.ratings[key].value > max) max = cr.ratings[key].value;
    }
    result[key] = max;
  }
  return result;
}

export function getClassesWithMaxRating(key: RatingKey): ClassRatingId[] {
  const max = getMaxRatingPerKey()[key];
  return classRatings.filter((cr) => cr.ratings[key].value === max).map((cr) => cr.classId);
}
