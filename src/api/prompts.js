import { CATEGORIES, DIFF_DESC } from "../data/constants";
// NOTE: KAKUGEN_LIST と KAKOI_COMPATIBILITY は呼び出し元から渡す設計にすることで
//       このファイルをデータに依存させず、テストしやすくする

/**
 * システムプロンプトを生成する
 * @param {object|null} character キャラクターオブジェクト（null なら汎用プロンプト）
 */
export function makeSystemPrompt(character) {
  const charSection = character
    ? `\n\n【キャラクター設定】\n${character.personality}\nこのキャラクターとして出題・フィードバックしてください。`
    : "";

  return `あなたは将棋の指導者です。大局観トレーニングの問題を出題・フィードバックします。${charSection}

【絶対ルール】
- 具体的な盤面・手順は扱わない。考え方・原則・格言を問う
- 問題文は2〜3文以内（短くテンポよく）
- 格言は渡されたリストの中からのみ出題すること
- 回答はJSONのみ。前置きやMarkdownコードブロック不要

【出題形式について】
出題タイプはランダムで以下のどちらかを選ぶこと：
- 通常形式：状況を説明して「この場面に当てはまる格言・手筋は？」と問う
- 逆引き形式：格言名を先に提示して「この格言はどんな状況で使う？どんな意味がある？」と問う

【難易度別の出題方法】
- 初級：4択問題。正解1つ＋ダミー3つを用意する
- 中級・上級：自由記述問題

【出題JSON形式（初級・4択）】
{"type":"q","format":"4択","q":"問題文","hint":"ヒント一言","ans":"正解の選択肢テキスト","exp":"解説（2〜4文）","diff":"初級","keywords":["キーワード1"],"choices":["正解テキスト","ダミー1","ダミー2","ダミー3"]}

【出題JSON形式（中級・上級・自由記述）】
{"type":"q","format":"記述","q":"問題文","hint":"ヒント一言","ans":"模範解答（1〜3文）","exp":"解説（2〜4文）","diff":"中級or上級","keywords":["キーワード1","キーワード2"]}

【フィードバックJSON形式（初級・4択）】
{"type":"fb","correct":true/false,"model":{"ans":"正解","exp":"解説"},"msg":"一言コメント（キャラ口調で）"}

【フィードバックJSON形式（中級・上級・記述）】
{"type":"fb","good":"良い点（1文・キャラ口調）","fix":"改善点（1文・キャラ口調）","model":{"ans":"解答（格言名・結論）","focus":"注目すべきポイント","aim":"後の狙い・目的","tip":"覚え方・応用のコツ"},"msg":"一言励まし（キャラ口調）"}`;
}

/**
 * カテゴリ別の出題ガイドを生成する
 * 変更：tesuji/hatten/kakoiの3カテゴリに対応、格言フィルタをcategoryで分岐
 */
function buildCategoryGuide(category, difficulty, strategy, kakugenList, kakoiList) {
  const guides = {
    tesuji: () => {
      const list = kakugenList.map(k => k.text);
      return `以下の格言リストの中から難易度「${difficulty}」に合うものを選んで出題すること。格言リスト：${list.join("、")}。状況を説明して「この場面に当てはまる格言は？」という形式で問う。`;
    },
    hatten: () => {
      const list = kakugenList.map(k => k.text);
      return `以下の形勢・大局観リストの中から難易度「${difficulty}」に合うものを選んで出題すること。リスト：${list.join("、")}。形勢判断や序中終盤の考え方を問う問題を出すこと。`;
    },
    kakoi: () => {
      const data = kakoiList.map(k => ({
        囲い: k.name,
        弱点: k.yowami,
        有効な攻め: k.koukana_seme,
      }));
      const strategyPrefix = strategy ? `戦法「${strategy}」を使う側の視点で、` : "";
      return `${strategyPrefix}特定の囲いに対する攻め方の考え方・相性を問う問題。囲いデータ：${JSON.stringify(data)}`;
    },
  };

  return guides[category]?.() ?? "";
}

/**
 * 出題プロンプトを生成する
 * 変更：senpouフィルタを追加、categoryフィールドで格言を分類
 */
export function makeQuestionPrompt({ category, difficulty, strategy, usedAnswers, kakugenList, kakoiCompatibility }) {
  const catLabel = CATEGORIES.find(c => c.id === category)?.label ?? category;
  const senpou = STRATEGY[strategy] ?? "ibisha";

  // tesuji → category:"kakugen" / hatten → category:"keisei" でフィルタ
  const kakugenCategory = category === "tesuji" ? "kakugen" : "keisei";
  const filteredKakugen = kakugenList.filter(
    k => k.level === difficulty && (k.senpou === senpou || k.senpou === "common")  && k.category === kakugenCategory
  );

  const categoryGuide = buildCategoryGuide(
    category, difficulty, strategy, filteredKakugen, kakoiCompatibility
  );

  const exclusionText = usedAnswers?.length
    ? `\n【禁止】以下は直近の出題済み解答です。同じ答えになる問題は絶対に出さないこと：${usedAnswers.map(a => `「${a}」`).join("、")}`
    : "";

  const seed = Math.floor(Math.random() * 100000);

  return `乱数シード:${seed}\nカテゴリ「${catLabel}」、難易度「${difficulty}」（${DIFF_DESC[difficulty]}）で問題を1問出題してください。
出題方針：${categoryGuide}${exclusionText}
JSONのみ返してください。`;
}

/**
 * フィードバックプロンプトを生成する
 * @param {object} params
 * @param {string} params.question 問題文
 * @param {string} params.userAnswer ユーザー回答
 * @param {string} params.modelAnswer 模範解答
 * @param {string[]} params.keywords 採点キーワード
 * @param {string|null} params.characterName キャラクター名
 * @param {"4択"|"記述"} params.format 問題形式
 */
export function makeFeedbackPrompt({ question, userAnswer, modelAnswer, keywords, characterName, format }) {
  const kwText = keywords?.length ? `\n採点キーワード：${keywords.join("、")}` : "";
  const charText = characterName ? `\nあなたは${characterName}として回答してください。` : "";

  if (format === "4択") {
    return `問題：${question}\n正解：${modelAnswer}\nユーザーの選択：${userAnswer}${charText}\n\n正誤判定してフィードバックJSONを返してください。JSONのみ。`;
  }

  return `問題：${question}\n模範解答：${modelAnswer}\nユーザー回答：${userAnswer}${kwText}${charText}\n\n記述フィードバックJSONを返してください。点数は不要です。model欄はオブジェクト形式（ans/focus/aim/tip）で。JSONのみ。`;
}
