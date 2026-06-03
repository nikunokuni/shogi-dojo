import { makeSystemPrompt } from "./prompts";

const GEMINI_MODEL = "gemini-2.5-flash-lite";
const GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models";
const MAX_OUTPUT_TOKENS = 600;
const TEMPERATURE = 1.0;

/** Markdown コードブロックや余分な空白を除去して JSON テキストを返す */
function cleanJsonText(raw) {
  return raw.replace(/```json|```/g, "").trim();
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
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY ?? "";
  if (!apiKey) {
    throw new Error("REACT_APP_GEMINI_API_KEY が設定されていません");
  }

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

  const url = `${GEMINI_BASE_URL}/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

  let res;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: geminiMessages,
        generationConfig: { maxOutputTokens: MAX_OUTPUT_TOKENS, temperature: TEMPERATURE },
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
