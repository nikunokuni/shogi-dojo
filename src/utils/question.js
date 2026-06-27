/** 比較用に文字列を正規化する（前後空白・全角空白・末尾句読点の揺れを吸収） */
export function normalizeAnswer(value) {
  return String(value ?? "")
    .replace(/　/g, " ") // 全角スペース → 半角
    .trim()
    .replace(/[。、．，\s]+$/u, ""); // 末尾の句読点・空白を除去
}

/**
 * 4択問題の choices と ans の整合性を保証する。
 * LLM が ans と choices 内テキストを微妙に違う表記で返しても、
 * 正規化比較で対応する選択肢を見つけ、ans をその選択肢テキストに揃える。
 * 見つからなければ choices[0] を正解とみなす（プロンプト上 choices[0] が正解）。
 *
 * @returns {object} ans を正規化済みの新しい question オブジェクト
 */
export function reconcileChoices(question) {
  if (question?.format !== "4択" || !Array.isArray(question.choices) || question.choices.length === 0) {
    return question;
  }

  // 正規化キーで重複選択肢を除去（表示が割れる事故を防ぐ）。最初の表記を残す。
  const seen = new Set();
  const uniqueChoices = [];
  for (const c of question.choices) {
    const key = normalizeAnswer(c);
    if (key === "" || seen.has(key)) continue;
    seen.add(key);
    uniqueChoices.push(c);
  }

  const normAns = normalizeAnswer(question.ans);
  const match = uniqueChoices.find(c => normalizeAnswer(c) === normAns);

  // 一致する選択肢があればその「実際の表記」を正解に採用。
  // 無ければ choices[0]（プロンプト規約上の正解位置）を正解とみなし、
  // 重複除去で正解が消えていた場合に備えて先頭へ補完する。
  let ans;
  if (match) {
    ans = match;
  } else {
    ans = question.choices[0];
    if (!uniqueChoices.some(c => normalizeAnswer(c) === normalizeAnswer(ans))) {
      uniqueChoices.unshift(ans);
    }
  }

  return { ...question, choices: uniqueChoices, ans };
}

/**
 * 4択をクライアント側で採点する。
 * @returns {boolean} 正解なら true
 */
export function grade4taku(userAnswer, ans) {
  return normalizeAnswer(userAnswer) === normalizeAnswer(ans);
}
