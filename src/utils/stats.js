import { STORAGE_KEY_STATS } from "../data/constants";

const DEFAULT_STATS = { total: 0 };

/** localStorage から統計を読み込む。不正値は既定値にフォールバック */
export function loadStats() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_STATS);
    if (!raw) return { ...DEFAULT_STATS };

    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      return { ...DEFAULT_STATS };
    }
    const total = Number(parsed.total);
    return { total: Number.isFinite(total) && total >= 0 ? Math.floor(total) : 0 };
  } catch {
    return { ...DEFAULT_STATS };
  }
}

/** 統計を localStorage に保存する */
export function saveStats(stats) {
  try {
    localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(stats));
  } catch {
    // localStorage が使えない環境では無視
  }
}
