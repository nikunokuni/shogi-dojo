// Vercel Serverless Function: Gemini API プロキシ
// APIキー（GEMINI_API_KEY）はサーバー側の環境変数として保持し、クライアントには露出させない。
// Vercel のプロジェクト設定 > Environment Variables に GEMINI_API_KEY を登録すること。

const MODEL = "gemini-2.5-flash-lite";

// 悪用（無料中継としての利用）を防ぐためのガード値
const MAX_OUTPUT_TOKENS_CAP = 4096;
const MAX_BODY_BYTES = 20_000; // contents の総量上限（おおよそ）

/** 同一オリジン or 許可リストからのリクエストかを判定する */
function isAllowedOrigin(req) {
  const origin = req.headers.origin;
  // origin ヘッダが無い（同一オリジンの通常 fetch やサーバー間）場合は許可
  if (!origin) return true;

  const allowList = (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);

  // ALLOWED_ORIGINS 未設定なら、デプロイ先ホストと一致するもののみ許可。
  // endsWith による部分一致は "evilexample.com".endsWith("example.com") で
  // バイパスされるため、URL のホスト名を厳密一致で比較する。
  if (allowList.length === 0) {
    const host = req.headers.host;
    if (!host) return false;
    try {
      return new URL(origin).host === host;
    } catch {
      return false;
    }
  }
  return allowList.includes(origin);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  if (!isAllowedOrigin(req)) {
    res.status(403).json({ error: "Forbidden" });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "GEMINI_API_KEY is not configured" });
    return;
  }

  try {
    const { contents, generationConfig } = req.body || {};
    if (!contents || !Array.isArray(contents)) {
      res.status(400).json({ error: "Missing or invalid 'contents' in request body" });
      return;
    }

    // ペイロードサイズの上限チェック（過大なリクエストを弾く）
    if (JSON.stringify(contents).length > MAX_BODY_BYTES) {
      res.status(413).json({ error: "Payload too large" });
      return;
    }

    // クライアント由来の generationConfig はそのまま信用せず、サーバー側でクランプする
    const requested = generationConfig || {};
    const safeConfig = {
      maxOutputTokens: Math.min(
        Math.max(1, Number(requested.maxOutputTokens) || 600),
        MAX_OUTPUT_TOKENS_CAP
      ),
      temperature: Math.min(
        Math.max(0, Number.isFinite(Number(requested.temperature)) ? Number(requested.temperature) : 1.0),
        2
      ),
      ...(requested.responseMimeType === "application/json"
        ? { responseMimeType: "application/json" }
        : {}),
    };

    const upstream = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents, generationConfig: safeConfig }),
      }
    );

    const data = await upstream.json();
    res.status(upstream.status).json(data);
  } catch (e) {
    // 内部エラーの詳細はクライアントに返さない（情報漏えい防止）
    console.error("[/api/generate]", e);
    res.status(500).json({ error: "Proxy request failed" });
  }
}
