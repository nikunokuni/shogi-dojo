import { AFFINITY_RANKS, DEFAULT_AFFINITY, STORAGE_KEY_AFFINITY } from "../data/constants";

/**
 * スコアに対応する親密度ランクを返す
 * @param {number} score 0〜100
 */
export function getAffinityRank(score) {
  return AFFINITY_RANKS.find(r => score >= r.min && score <= r.max) ?? AFFINITY_RANKS[AFFINITY_RANKS.length - 1];
}

/**
 * localStorage から親密度データを読み込む
 * @returns {{ tsurugi: number, iroha: number, kaede: number }}
 */
export function loadAffinity() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_AFFINITY);
    return raw ? JSON.parse(raw) : { ...DEFAULT_AFFINITY };
  } catch {
    return { ...DEFAULT_AFFINITY };
  }
}

/**
 * 親密度データを localStorage に保存する
 * @param {{ tsurugi: number, iroha: number, kaede: number }} data
 */
export function saveAffinity(data) {
  try {
    localStorage.setItem(STORAGE_KEY_AFFINITY, JSON.stringify(data));
  } catch {
    // localStorage が使えない環境（プライベートブラウジング等）では無視
  }
}

/**
 * 親密度スコアを clamp して更新した新しいオブジェクトを返す
 * @param {object} current 現在の親密度マップ
 * @param {string} characterId キャラクター ID
 * @param {number} delta 変化量
 */
export function applyAffinityDelta(current, characterId, delta) {
  const prev = current[characterId] ?? DEFAULT_AFFINITY[characterId] ?? 20;
  return {
    ...current,
    [characterId]: Math.min(100, Math.max(0, prev + delta)),
  };
}

/**
 * フィードバック結果から親密度の変化量を算出する
 * @param {"4択"|"記述"} format 問題形式
 * @param {boolean|null} correct 4択の正誤（記述は null）
 */
export function calcAffinityDelta(format, correct) {
  if (format === "4択") {
    return correct === false ? -3 : 5;
  }
  return 5; // 記述は常に +5
}
