// Vercel Serverless Function: Gemini API プロキシ
// APIキー（GEMINI_API_KEY）はサーバー側の環境変数として保持し、クライアントには露出させない。
// Vercel のプロジェクト設定 > Environment Variables に GEMINI_API_KEY を登録すること。

const MODEL = "gemini-2.5-flash-lite";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "GEMINI_API_KEY is not configured" });
    return;
  }

  try {
    const { contents, generationConfig } = req.body || {};
    if (!contents) {
      res.status(400).json({ error: "Missing 'contents' in request body" });
      return;
    }

    const upstream = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          generationConfig: generationConfig || { maxOutputTokens: 600, temperature: 1.0 },
        }),
      }
    );

    const data = await upstream.json();
    res.status(upstream.status).json(data);
  } catch (e) {
    res.status(500).json({ error: "Proxy request failed", detail: String(e) });
  }
}
