export interface GamePatch {
  id: string;
  region: "KR" | "TW" | "GLOBAL";
  title: string;
  date: string;
  levelCap: number | null;
  status: "live" | "announced" | "archived";
  summary: string;
  features: string[];
  sourceIds: string[];
}

export const patches: GamePatch[] = [
  {
    id: "kr-tw-2025-11-19-launch",
    region: "KR",
    title: "KR/TW Launch",
    date: "2025-11-19",
    levelCap: null,
    status: "archived",
    summary:
      "AION 2 startete in Korea und Taiwan mit acht Startklassen.",
    features: [
      "Launch in Korea und Taiwan",
      "Acht Startklassen",
      "KR/TW-Datenstand, nicht automatisch Global-Stand",
    ],
    sourceIds: ["ncsoft-2025-11-18-launch"],
  },
  {
    id: "kr-2026-07-01-chapter-1",
    region: "KR",
    title: "Chapter 1: Land of Sand and Frost",
    date: "2026-07-01",
    levelCap: 50,
    status: "live",
    summary:
      "Brawler, Level 50, Eltnen/Morheim, Stigma-Level 25, Pendant-Slot und neue PvE-/PvP-Inhalte.",
    features: [
      "Neunte Klasse: Brawler / \uAD8C\uC131",
      "Neue Waffe: Gauntlet / \uAD8C\uAC11",
      "Levelcap 50",
      "Neue Regionen: Eltnen und Morheim",
      "Stigma-Level 25",
      "Partygr\u00F6\u00DFe 5",
      "Force-/Allianzgr\u00F6\u00DFe 20",
      "Sanctuary f\u00FCr 10 Spieler",
      "Neuer Pendant-Slot",
      "Neue Arcana-Slots",
      "Cooldown-Reduktion maximal 60 Prozent",
      "Bewegungsgeschwindigkeit maximal 150 Prozent",
    ],
    sourceIds: [
      "aion2-official-kr",
      "inven-kr-2026-07-01-patch",
      "inven-global-2026-07-01-chapter-1",
    ],
  },
  {
    id: "global-2026-09-release",
    region: "GLOBAL",
    title: "Global Release",
    date: "2026-09",
    levelCap: null,
    status: "announced",
    summary:
      "Steam nennt September 2026 als globalen PC-Release. Exakter Patchstand und Inhaltsumfang sind noch nicht endg\u00FCltig best\u00E4tigt.",
    features: [
      "PC-Release \u00FCber Steam angek\u00FCndigt",
      "Free-to-play",
      "Deutsche Benutzeroberfl\u00E4che und Untertitel laut Steam angek\u00FCndigt",
      "Exakter globaler Patchstand noch nicht best\u00E4tigt",
    ],
    sourceIds: ["steam-aion2"],
  },
];

export function getPatchById(id: string): GamePatch | undefined {
  return patches.find((p) => p.id === id);
}
