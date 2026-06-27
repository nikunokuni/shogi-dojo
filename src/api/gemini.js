import { makeSystemPrompt } from "./prompts";

// APIキーはサーバーレス関数（/api/generate）側に保持し、クライアントには露出させない。
const PROXY_URL = "/api/generate";
// 記述フィードバックの JSON は項目が多く、思考トークンも消費するため余裕を持たせる。
// 小さすぎると JSON が途中で切れて parse に失敗する。
const MAX_OUTPUT_TOKENS = 2048;
const TEMPERATURE = 1.0;

/**
 * LLM 応答から JSON 部分を抽出する。
 * Markdown コードブロックを除去し、前置き・後置きの文章が付いていても
 * 最初の `{` から最後の `}` までを取り出して parse できるようにする。
 */
function cleanJsonText(raw) {
  const stripped = raw.replace(/```json|```/g, "").trim();
  // 最初の { から最後の } までを抜き出す（前後に文章が混ざっても拾えるように）
  const start = stripped.indexOf("{");
  const end = stripped.lastIndexOf("}");
  if (start !== -1 && end !== -1 && end > start) {
    return stripped.slice(start, end + 1);
  }
  return stripped;
}

/**
 * Gemini API にリクエストを送り、JSON レスポンスを返す
 *
 * @param {Array<{role: "user"|"assistant", content: string}>} messages
 * @param {object|null} character キャラクターオブジェクト（システムプロンプト生成に使用）
 * @returns {Promise<object>} パース済みの JSON オブジェクト
 * @throws {Error} ネットワーク失敗・非 OK レスポンス・JSON パース失敗時
 */
export async function callGemini(messages, character) {
  const systemText = makeSystemPrompt(character);

  // Gemini の contents 形式に変換
  // system 指示は role:user → role:model のペアとして先頭に差し込む
  const geminiMessages = [
    { role: "user",  parts: [{ text: `${systemText}\n\n以下の指示に従ってください。` }] },
    { role: "model", parts: [{ text: "承知しました。JSONのみで回答します。" }] },
    ...messages.map(m => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    })),
  ];

  let res;
  try {
    res = await fetch(PROXY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: geminiMessages,
        generationConfig: {
          maxOutputTokens: MAX_OUTPUT_TOKENS,
          temperature: TEMPERATURE,
          // JSON 以外の文字（前置き・コードフェンス）を返させない
          responseMimeType: "application/json",
        },
      }),
    });
  } catch (networkError) {
    throw new Error(`ネットワークエラー: ${networkError.message}`);
  }

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Gemini API エラー (${res.status}): ${body}`);
  }

  const data = await res.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

  if (!rawText) {
    throw new Error("Gemini からの応答が空でした");
  }

  const cleaned = cleanJsonText(rawText);

  try {
    return JSON.parse(cleaned);
  } catch {
    throw new Error(`JSON パース失敗。受信テキスト: ${cleaned.slice(0, 200)}`);
  }
}
