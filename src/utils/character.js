import { CHARACTERS } from "../constants";

/**
 * ランダムにキャラクターを1体選んで返す
 * @returns {object} CHARACTERS のいずれか1つ
 */
export function pickCharacter() {
  return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
}
