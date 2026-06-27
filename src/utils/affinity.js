import { AFFINITY_RANKS, DEFAULT_AFFINITY, DEFAULT_AFFINITY_SCORE, STORAGE_KEY_AFFINITY } from "../data/constants";

/** 親密度スコアを 0〜100 の整数に正規化する。不正値は既定値にフォールバック */
function sanitizeScore(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return DEFAULT_AFFINITY_SCORE;
  return Math.min(100, Math.max(0, Math.round(n)));
}

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
    if (!raw) return { ...DEFAULT_AFFINITY };

    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      return { ...DEFAULT_AFFINITY };
    }

    // 既定キーを基準に、保存値を正規化してマージする（不正値・欠損を弾く）
    const result = { ...DEFAULT_AFFINITY };
    for (const key of Object.keys(DEFAULT_AFFINITY)) {
      if (key in parsed) result[key] = sanitizeScore(parsed[key]);
    }
    return result;
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
  const prev = sanitizeScore(current[characterId] ?? DEFAULT_AFFINITY[characterId] ?? DEFAULT_AFFINITY_SCORE);
  return {
    ...current,
    [characterId]: sanitizeScore(prev + delta),
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
  // 記述は正誤の確定信号がないため一律加点だが、毎回 +5 だと
  // すぐ上限（相棒）に張り付くため控えめの +3 とし、到達に手応えを持たせる。
  return 3;
}
