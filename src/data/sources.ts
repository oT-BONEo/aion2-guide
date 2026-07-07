export interface Source {
  id: string;
  title: string;
  url: string;
  publisher: string;
  type: "official" | "patch-notes" | "news" | "guide" | "database";
  language: "ko" | "en" | "de";
  reliability: 1 | 2 | 3 | 4 | 5;
  lastChecked: string;
  notes?: string;
}

export const sources: Source[] = [
  {
    id: "steam-aion2",
    title: "AION 2 on Steam",
    url: "https://store.steampowered.com/app/3393110/AION_2/",
    publisher: "Steam / NCSOFT",
    type: "official",
    language: "en",
    reliability: 5,
    lastChecked: "2026-07-03",
    notes:
      "Offizielle Steam-Seite mit globalem Release-Zeitraum, Plattform und Lokalisierungsangaben.",
  },
  {
    id: "ncsoft-2025-11-18-launch",
    title: "AION 2 Launch Announcement",
    url: "https://about.ncsoft.com/en/news/article/aion2_update_251118",
    publisher: "NCSOFT",
    type: "official",
    language: "en",
    reliability: 5,
    lastChecked: "2026-07-03",
    notes: "Offizielle Ankündigung zum KR/TW-Launch.",
  },
  {
    id: "aion2-official-kr",
    title: "AION 2 Official Korean Website",
    url: "https://aion2.plaync.com/ko-kr/",
    publisher: "NCSOFT",
    type: "official",
    language: "ko",
    reliability: 5,
    lastChecked: "2026-07-03",
    notes: "Offizielle koreanische AION-2-Seite.",
  },
  {
    id: "inven-kr-2026-07-01-patch",
    title: "AION 2 KR Chapter 1 Patch Notes",
    url: "https://www.inven.co.kr/board/aion2/6388/231368",
    publisher: "Inven",
    type: "patch-notes",
    language: "ko",
    reliability: 4,
    lastChecked: "2026-07-03",
    notes: "Koreanische Patchnotizen zu Chapter 1.",
  },
  {
    id: "inven-global-2026-07-01-chapter-1",
    title: "NCSOFT launches major AION 2 update Chapter 1",
    url: "https://www.invenglobal.com/articles/23338/nc-launches-major-aion-2-update-chapter-1-land-of-sand-and-frost",
    publisher: "Inven Global",
    type: "news",
    language: "en",
    reliability: 4,
    lastChecked: "2026-07-03",
    notes: "Englische Zusammenfassung zu Chapter 1.",
  },
  {
    id: "aion2hub-classes",
    title: "AION 2 Hub Classes",
    url: "https://aion2hub.com/classes",
    publisher: "AION 2 Hub",
    type: "database",
    language: "en",
    reliability: 3,
    lastChecked: "2026-07-03",
    notes: "Sekundärquelle für Klassen-/Waffenzuordnung.",
  },
];

export function getSourceById(id: string): Source | undefined {
  return sources.find((s) => s.id === id);
}

export function getSourcesByReliability(
  minReliability: number
): Source[] {
  return sources.filter((s) => s.reliability >= minReliability);
}
