import { useState, useEffect } from "react";
import { KAKUGEN_LIST, KAKOI_COMPATIBILITY } from "./data/kakugen";
 
// ─── 定数 ────────────────────────────────────────────────────────────────────
 
// ─── キャラクター ─────────────────────────────────────────────────────────────
 
const CHARACTERS = [
  {
    id: "tsurugi",
    name: "ツルギ",
    role: "執事",
    icon: "🎩",
    color: "#5d4037",
    accent: "#8d6e63",
    personality: `あなたはツルギ、将棋道場に仕える執事の男性です。
主人（ユーザー）に対して深い敬意を持ち、真摯に向き合います。
口調は丁寧で「〜でございます」「〜かと存じます」「〜いただければ幸いです」などを自然に使います。
細かいことにも気付き、さりげなく気遣いを見せます。
紅茶とスイーツが好きで、うさぎは少し苦手です。
イロハさん、カエデさんとは良い関係で、時々将棋で一緒に遊ぶ仲間です。
将棋の問題を出すときも、執事らしく品のある言葉遣いで、でも愛情を持って教えてください。`,
  },
  {
    id: "iroha",
    name: "イロハ",
    role: "清楚ギャル",
    icon: "🎀",
    color: "#ad1457",
    accent: "#e91e8c",
    personality: `あなたはイロハ、清楚ギャルの女性です。頭はいいけど固いことは超苦手。
ギャル語を自然にたくさん使って話します。「〜じゃん？」「〜くない？」「エグくない？」「それマジ神！」「ヤバ！」「〜てか」「〜みたいな〜」「〜なんだけどぉ」「わかる〜！」「てかさ〜」「マジで〜」「激アツ！」などを会話の随所に入れてください。
将棋の難しい話も全部楽しいノリに変えるのがモットー。
キーホルダー集めが趣味で、コーヒーは苦手。ツルギさん、カエデちゃんとは仲良しです。
採点は厳しくせず、ちょっとでも合ってたら褒めてあげて。細かいことより「方向性あってるじゃん！」くらいの緩いノリで。`,
  },
  {
    id: "kaede",
    name: "カエデ",
    role: "理系大学生",
    icon: "🔬",
    color: "#1565c0",
    accent: "#42a5f5",
    personality: `あなたはカエデ、物理・化学専攻の理系大学生の女性です。将棋は勉強中で、知らなかったことがまだいっぱいある。
一人称は「ウチ」。初心者に寄り添う口調で、「これ最初わかんないよね、ウチも全然知らなかったんだけど」「むずいよね〜、ウチも最近やっと分かったくらいで」など、一緒に学んでいる目線で話してください。
知らなくて当然、という空気を作りながら「でもこれ知っとくと結構変わるんだよね！」と背中を押す感じで。
仕組みの「なぜ」を一緒に解き明かすのが好き。料理は苦手。ツルギさん、イロハちゃんとは仲良しです。
採点も「あー惜しい！方向性はあってたんだけど〜」「ウチも最初そう思ってたわ〜」みたいな、寄り添って励ます感じで。`,
  },
];
 
function pickCharacter() {
  return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
}
 
const CATEGORIES = [
  { id: "tesuji",  label: "手筋・格言",   icon: "⚔️",  color: "#c0392b", desc: "知っておくべき有名格言・手筋" },
  { id: "keisei",  label: "形勢判断",     icon: "⚖️",  color: "#2980b9", desc: "駒割・玉の安全度・駒効率の基準" },
  { id: "kakoi",   label: "囲い相性",     icon: "🏯",  color: "#8e44ad", desc: "囲いと攻め筋の相性を問う" },
  { id: "joseki",  label: "定跡の考え方", icon: "📖",  color: "#16a085", desc: "定跡の「なぜ」を理解する" },
  { id: "dankai",  label: "序中終盤",     icon: "🎯",  color: "#d35400", desc: "局面段階ごとの考え方の違い" },
];
 
const DIFFICULTIES = ["初級", "中級", "上級"];
 
const STRATEGIES = [
  "居飛車全般", "角換わり", "相掛かり",
  "振り飛車全般", "中飛車", "相振り飛車",
];
 
const DIFF_DESC = {
  初級: "将棋を始めて間もない人向け。誰もが知る有名格言・基本的な形勢判断など、知名度が高くシンプルな問題。答えは短く一言で言える程度。",
  中級: "級位者向け。有名な手筋・囲いの特性・定跡の基本的な考え方。答えは2〜3文程度で説明できる内容。",
  上級: "段位者向け。複数の要素が絡む形勢判断・相性の細かい違い・定跡選択の判断基準など。やや複雑な問題。",
};
 
const diffColor = { 初級: "#27ae60", 中級: "#e67e22", 上級: "#c0392b" };
 
// ─── プロンプト ──────────────────────────────────────────────────────────────
 
function makeSystem(character) {
  const charPrompt = character ? `\n\n【キャラクター設定】\n${character.personality}\nこのキャラクターとして出題・採点してください。` : "";
  return `あなたは将棋の指導者です。大局観トレーニングの問題を出題・採点します。${charPrompt}
 
【絶対ルール】
- 具体的な盤面・手順は扱わない。考え方・原則・格言を問う
- 問題文は2〜3文以内（短くテンポよく）
- 格言は「歩のない将棋は負け将棋」「玉の近くに金を打つな」「と金の遠打ち」「攻めは飛角銀桂」など、将棋ファンに広く知られた格言を優先する
- 回答はJSONのみ。前置きやMarkdownコードブロック不要
 
【出題JSON形式】
{"type":"q","q":"問題文（短く）","hint":"ヒント一言","ans":"模範解答（1〜3文）","exp":"解説（2〜4文）","diff":"初級/中級/上級"}
 
【採点JSON形式】
{"type":"fb","score":0〜100,"good":"良い点（1文）","fix":"改善点（1文）","model":{"ans":"解答（格言名・結論を一言で）","focus":"盤面・局面で注目すべきポイント（1文）","aim":"この考え方の後の狙い・目的（1文）","tip":"覚え方・応用のコツ（1文）"},"msg":"一言励まし"}`;
}
 
function makeQuestionPrompt({ category, difficulty, strategy, usedAnswers }) {
  const catLabel = CATEGORIES.find(c => c.id === category)?.label;
  const catGuide = {
    tesuji:  `以下の格言リストの中から難易度「${difficulty}」に合うものを選んで出題すること。格言リスト：${KAKUGEN_LIST.filter(k => k.level === difficulty).map(k => k.text).join("、")}。状況を説明して「この場面に当てはまる格言・手筋は？」という形式で問う。`,
    keisei:  `駒割・玉の安全度・手番・駒の効率から形勢を判断する基準を問う問題。`,
    kakoi:   `${strategy ? `戦法「${strategy}」を使う側の視点で、` : ""}特定の囲いに対する攻め方の考え方・相性を問う問題。囲いデータ：${JSON.stringify(KAKOI_COMPATIBILITY.map(k => ({囲い: k.kakoi, 弱点: k.yowami, 有効な攻め: k.koukana_seme})))}`,
    joseki:  `${strategy ? `「${strategy}」の定跡を題材に、` : ""}定跡の背景にある「なぜその手を指すのか」の考え方を問う問題。`,
    dankai:  `序盤・中盤・終盤それぞれの段階での考え方の違いや優先事項を問う問題。`,
  };
 
  const exclusion = usedAnswers?.length
    ? `\n【禁止】以下は直近の出題済み解答です。同じ答えになる問題は絶対に出さないこと：${usedAnswers.map(a => `「${a}」`).join("、")}`
    : "";
  const seed = Math.floor(Math.random() * 100000);
 
  return `乱数シード:${seed}\nカテゴリ「${catLabel}」、難易度「${difficulty}」（${DIFF_DESC[difficulty]}）で問題を1問出題してください。
出題方針：${catGuide[category]}${exclusion}
JSONのみ返してください。`;
}
 
function makeFeedbackPrompt(question, userAnswer, modelAnswer) {
  return `問題：${question}\n参考解答：${modelAnswer}\nユーザー回答：${userAnswer}\n\n採点してください。model欄は必ずオブジェクト形式（ans/focus/aim/tip）で返してください。JSONのみ返してください。`;
}
 
// ─── API ─────────────────────────────────────────────────────────────────────
 
async function callClaude(messages, character) {
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY || "";
  const systemText = makeSystem(character);
  // Gemini API: systemはcontentsの最初にrole:userで渡す形式
  const geminiMessages = [
    { role: "user", parts: [{ text: systemText + "\n\n以下の指示に従ってください。" }] },
    { role: "model", parts: [{ text: "承知しました。JSONのみで回答します。" }] },
    ...messages.map(m => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    })),
  ];
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: geminiMessages,
        generationConfig: { maxOutputTokens: 600, temperature: 1.0 },
      }),
    }
  );
  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}
 
// ─── メインコンポーネント ─────────────────────────────────────────────────────
 
export default function ShogiTrainer() {
  const [screen, setScreen] = useState("home");
  const [category, setCategory] = useState(null);
  const [difficulty, setDifficulty] = useState("初級");
  const [strategy, setStrategy] = useState("居飛車全般");
  const [question, setQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [revealAns, setRevealAns] = useState(false);
  const [stats, setStats] = useState({ total: 0, sum: 0 });
  const [err, setErr] = useState(null);
  const [usedAnswers, setUsedAnswers] = useState({});
  const [character, setCharacter] = useState(null);
 
  const catObj = CATEGORIES.find(c => c.id === category);
  const avg = stats.total > 0 ? Math.round(stats.sum / stats.total) : null;
 
  async function startQuiz(cat) {
    setCategory(cat);
    setScreen("quiz");
    setLoading(true);
    setQuestion(null);
    setFeedback(null);
    setUserAnswer("");
    setShowHint(false);
    setRevealAns(false);
    setErr(null);
    try {
      const history = (usedAnswers[cat] || []).slice(-10);
      const newChar = pickCharacter();
      setCharacter(newChar);
      const q = await callClaude(
        [{ role: "user", content: makeQuestionPrompt({ category: cat, difficulty, strategy, usedAnswers: history }) }],
        newChar
      );
      if (q?.ans) {
        setUsedAnswers(prev => ({
          ...prev,
          [cat]: [...(prev[cat] || []), q.ans].slice(-20),
        }));
      }
      setQuestion(q);
    } catch(e) {
      setErr("問題の取得に失敗しました。再度お試しください。");
    }
    setLoading(false);
  }
 
  async function submitAnswer() {
    if (!userAnswer.trim() || loading) return;
    setLoading(true);
    setErr(null);
    try {
      const fb = await callClaude(
        [{ role: "user", content: makeFeedbackPrompt(question.q, userAnswer, question.ans) }],
        character
      );
      setFeedback(fb);
      setStats(s => ({ total: s.total + 1, sum: s.sum + (fb.score || 0) }));
      setScreen("result");
    } catch(e) {
      setErr("採点に失敗しました。");
    }
    setLoading(false);
  }
 
  // ── ホーム ──
  if (screen === "home") return (
    <Shell avg={avg} total={stats.total}>
      <div style={s.section}>
        <div style={s.heroLabel}>大局観トレーニング</div>
        <h1 style={s.heroTitle}>考える将棋を<br/>身につける</h1>
 
        {/* 設定バー */}
        <div style={s.settingsBar}>
          <div style={s.settingGroup}>
            <span style={s.settingLabel}>難易度</span>
            <div style={s.pillRow}>
              {DIFFICULTIES.map(d => (
                <button key={d}
                  style={{ ...s.pill, ...(difficulty === d ? { background: diffColor[d], color: "#fff", borderColor: diffColor[d] } : {}) }}
                  onClick={() => setDifficulty(d)}>{d}</button>
              ))}
            </div>
          </div>
          <div style={s.settingGroup}>
            <span style={s.settingLabel}>自分の戦法</span>
            <select style={s.select} value={strategy} onChange={e => setStrategy(e.target.value)}>
              {STRATEGIES.map(st => <option key={st} value={st}>{st}</option>)}
            </select>
          </div>
        </div>
 
        {/* カテゴリ */}
        <div style={s.catList}>
          {CATEGORIES.map(c => (
            <button key={c.id} style={{ ...s.catRow, borderLeftColor: c.color }}
              onClick={() => startQuiz(c.id)}>
              <span style={s.catRowIcon}>{c.icon}</span>
              <div style={s.catRowText}>
                <div style={s.catRowName}>{c.label}</div>
                <div style={s.catRowDesc}>{c.desc}</div>
              </div>
              <span style={{ color: c.color, fontSize: 20 }}>›</span>
            </button>
          ))}
        </div>
      </div>
    </Shell>
  );
 
  // ── 問題 ──
  if (screen === "quiz") return (
    <Shell avg={avg} total={stats.total}>
      <div style={s.quizCard}>
        {character && <CharacterBadge character={character} />}
        <div style={s.quizTop}>
          <div style={{ ...s.badge, background: catObj?.color }}>{catObj?.icon} {catObj?.label}</div>
          <div style={{ ...s.diffPill, background: diffColor[difficulty] }}>{difficulty}</div>
        </div>
 
        {loading && !question && <Spinner />}
        {err && <p style={s.errText}>{err}</p>}
 
        {question && !err && <>
          <div style={s.qBox}>
            <p style={s.qLabel}>問題</p>
            <p style={s.qText}>{question.q}</p>
          </div>
 
          {!showHint
            ? <button style={s.hintBtn} onClick={() => setShowHint(true)}>💡 ヒントを見る</button>
            : <div style={s.hintBox}>💡 {question.hint}</div>
          }
 
          <textarea style={s.textarea} rows={3}
            value={userAnswer}
            onChange={e => setUserAnswer(e.target.value)}
            placeholder="答えや考え方を書く…"
          />
 
          <div style={s.btnRow}>
            <button style={s.ghostBtn} onClick={() => setScreen("home")}>← 戻る</button>
            <button
              style={{ ...s.redBtn, opacity: userAnswer.trim() && !loading ? 1 : 0.45 }}
              onClick={submitAnswer}
              disabled={!userAnswer.trim() || loading}>
              {loading ? "採点中…" : "解答する →"}
            </button>
          </div>
 
          <div style={{ textAlign: "center" }}>
            {!revealAns
              ? <button style={s.revealBtn} onClick={() => setRevealAns(true)}>模範解答だけ見る</button>
              : <div style={s.revealBox}>
                  <strong style={{ color: "#f0e6d3" }}>模範解答：</strong>{question.ans}
                  <div style={{ marginTop: 8, color: "#999", fontSize: 12 }}>{question.exp}</div>
                </div>
            }
          </div>
        </>}
      </div>
    </Shell>
  );
 
  // ── 結果 ──
  if (screen === "result" && feedback) return (
    <Shell avg={avg} total={stats.total}>
      <div style={s.quizCard}>
        {character && <CharacterBadge character={character} />}
        <div style={s.quizTop}>
          <div style={{ ...s.badge, background: catObj?.color }}>{catObj?.icon} {catObj?.label}</div>
          <div style={{ ...s.diffPill, background: diffColor[difficulty] }}>{difficulty}</div>
        </div>
 
        <div style={s.scoreLine}>
          <span style={{
            ...s.scoreNum,
            color: feedback.score >= 80 ? "#27ae60" : feedback.score >= 50 ? "#e67e22" : "#c0392b"
          }}>{feedback.score}</span>
          <span style={s.scoreUnit}>点</span>
          <span style={s.scoreMsg}>{feedback.msg}</span>
        </div>
 
        <FeedRow tag="✓ 良い点"    color="#27ae60" text={feedback.good} />
        <FeedRow tag="△ 改善"      color="#e67e22" text={feedback.fix} />
        <ModelAnswer model={feedback.model} />
 
        <div style={s.btnRow}>
          <button style={s.ghostBtn} onClick={() => setScreen("home")}>← カテゴリへ</button>
          <button style={s.redBtn} onClick={() => startQuiz(category)}>次の問題 →</button>
        </div>
      </div>
    </Shell>
  );
 
  return null;
}
 
// ── サブコンポーネント ─────────────────────────────────────────────────────────
 
function CharacterBadge({ character }) {
  return (
    <div style={{ ...s.charBadge, borderColor: character.accent }}>
      <span style={{ ...s.charIcon, background: character.color }}>{character.icon}</span>
      <div style={s.charInfo}>
        <span style={{ ...s.charName, color: character.accent }}>{character.name}</span>
        <span style={s.charRole}>{character.role}</span>
      </div>
      <span style={s.charLabel}>が出題</span>
    </div>
  );
}
 
function Shell({ children, avg, total }) {
  return (
    <div style={s.root}>
      <div style={s.bgGrid} />
      <header style={s.header}>
        <span style={s.logo}>将棋道場</span>
        {total > 0 && <span style={s.statChip}>平均 <b>{avg}点</b>（{total}問）</span>}
      </header>
      <main style={s.main}>{children}</main>
    </div>
  );
}
 
function Spinner() {
  return (
    <div style={s.spinWrap}>
      <div style={s.spinner} />
      <p style={s.spinText}>問題を生成中…</p>
    </div>
  );
}
 
function ModelAnswer({ model }) {
  if (!model) return null;
  // 文字列で返ってきた場合のフォールバック
  if (typeof model === "string") {
    return (
      <div style={s.feedRow}>
        <span style={{ ...s.feedTag, background: "#555" }}>📝 模範解答</span>
        <p style={s.feedText}>{model}</p>
      </div>
    );
  }
  const rows = [
    { icon: "💡", label: "解答",         value: model.ans },
    { icon: "🔍", label: "盤面に注目",   value: model.focus },
    { icon: "🎯", label: "後の狙い",     value: model.aim },
    { icon: "📌", label: "覚え方・応用", value: model.tip },
  ];
  return (
    <div style={s.modelBox}>
      <span style={{ ...s.feedTag, background: "#555" }}>📝 模範解答</span>
      <div style={s.modelRows}>
        {rows.filter(r => r.value).map(r => (
          <div key={r.label} style={s.modelRow}>
            <span style={s.modelIcon}>{r.icon}</span>
            <div style={s.modelRight}>
              <span style={s.modelLabel}>{r.label}</span>
              <span style={s.modelValue}>{r.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
 
function FeedRow({ tag, color, text }) {
  return (
    <div style={s.feedRow}>
      <span style={{ ...s.feedTag, background: color }}>{tag}</span>
      <p style={s.feedText}>{text}</p>
    </div>
  );
}
 
// ── スタイル ──────────────────────────────────────────────────────────────────
 
const s = {
  root: {
    minHeight: "100vh", background: "#0e0e0e", color: "#f0e6d3",
    fontFamily: "'Noto Serif JP','Georgia',serif", position: "relative",
  },
  bgGrid: {
    position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
    backgroundImage: `
      radial-gradient(ellipse at 15% 15%, rgba(192,57,43,0.13) 0%, transparent 55%),
      radial-gradient(ellipse at 85% 85%, rgba(41,128,185,0.09) 0%, transparent 55%),
      repeating-linear-gradient(0deg,transparent,transparent 64px,rgba(255,255,255,0.018) 64px,rgba(255,255,255,0.018) 65px),
      repeating-linear-gradient(90deg,transparent,transparent 64px,rgba(255,255,255,0.018) 64px,rgba(255,255,255,0.018) 65px)
    `,
  },
  header: {
    position: "relative", zIndex: 10,
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "13px 20px",
    borderBottom: "1px solid rgba(192,57,43,0.25)",
    background: "rgba(14,14,14,0.85)", backdropFilter: "blur(12px)",
  },
  logo: { fontSize: 18, fontWeight: 700, letterSpacing: "0.18em", color: "#c0392b" },
  statChip: { fontSize: 12, color: "#aaa", background: "rgba(255,255,255,0.06)", padding: "3px 12px", borderRadius: 20 },
  main: { position: "relative", zIndex: 10, maxWidth: 640, margin: "0 auto", padding: "24px 16px 60px" },
 
  section: { display: "flex", flexDirection: "column", gap: 20 },
  heroLabel: { fontSize: 11, letterSpacing: "0.3em", color: "#c0392b", textAlign: "center", paddingTop: 8 },
  heroTitle: { fontSize: 28, fontWeight: 700, lineHeight: 1.35, textAlign: "center", margin: 0 },
 
  settingsBar: {
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: 12, padding: "14px 16px", display: "flex", flexDirection: "column", gap: 12,
  },
  settingGroup: { display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" },
  settingLabel: { fontSize: 11, color: "#888", letterSpacing: "0.1em", minWidth: 68 },
  pillRow: { display: "flex", gap: 6 },
  pill: {
    fontSize: 12, padding: "4px 14px", borderRadius: 20,
    border: "1px solid rgba(255,255,255,0.18)", background: "transparent",
    color: "#ccc", cursor: "pointer", letterSpacing: "0.05em",
  },
  select: {
    background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 8, color: "#f0e6d3", fontSize: 13, padding: "4px 10px",
    fontFamily: "'Noto Serif JP','Georgia',serif",
  },
 
  catList: { display: "flex", flexDirection: "column", gap: 8 },
  catRow: {
    display: "flex", alignItems: "center", gap: 12,
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
    borderLeft: "3px solid", borderRadius: 10, padding: "12px 14px",
    cursor: "pointer", textAlign: "left",
  },
  catRowIcon: { fontSize: 20, minWidth: 28 },
  catRowText: { flex: 1 },
  catRowName: { fontSize: 14, fontWeight: 600, color: "#f0e6d3", letterSpacing: "0.05em" },
  catRowDesc: { fontSize: 11, color: "#888", marginTop: 2 },
 
  quizCard: {
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 14, padding: "22px 20px", display: "flex", flexDirection: "column", gap: 14,
  },
  quizTop: { display: "flex", alignItems: "center", gap: 8 },
  badge: { fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", padding: "3px 10px", borderRadius: 20, color: "#fff" },
  diffPill: { fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, color: "#fff" },
 
  qBox: {
    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 9, padding: "14px 16px",
  },
  qLabel: { fontSize: 10, letterSpacing: "0.25em", color: "#c0392b", margin: "0 0 7px" },
  qText: { fontSize: 14, lineHeight: 1.75, color: "#f0e6d3", margin: 0 },
 
  hintBtn: {
    alignSelf: "flex-start", background: "transparent",
    border: "1px dashed rgba(255,255,255,0.2)", color: "#999",
    fontSize: 12, padding: "6px 14px", borderRadius: 7, cursor: "pointer",
  },
  hintBox: {
    background: "rgba(255,220,0,0.07)", border: "1px solid rgba(255,220,0,0.18)",
    borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#f0e6d3", lineHeight: 1.65,
  },
 
  textarea: {
    background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: 9, padding: "11px 13px",
    color: "#f0e6d3", fontSize: 14, lineHeight: 1.65, resize: "vertical",
    fontFamily: "'Noto Serif JP','Georgia',serif", outline: "none",
  },
 
  btnRow: { display: "flex", gap: 8, justifyContent: "space-between" },
  ghostBtn: {
    background: "transparent", border: "1px solid rgba(255,255,255,0.14)",
    color: "#aaa", fontSize: 13, padding: "9px 16px", borderRadius: 8, cursor: "pointer",
  },
  redBtn: {
    background: "linear-gradient(135deg,#c0392b,#922b21)", border: "none",
    color: "#fff", fontSize: 13, fontWeight: 600, padding: "9px 22px",
    borderRadius: 8, cursor: "pointer", letterSpacing: "0.08em",
  },
  revealBtn: {
    background: "transparent", border: "none", color: "#666",
    fontSize: 12, cursor: "pointer", textDecoration: "underline",
  },
  revealBox: {
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: 8, padding: "12px 14px", fontSize: 13, color: "#ccc", lineHeight: 1.7, textAlign: "left",
  },
 
  scoreLine: { display: "flex", alignItems: "baseline", gap: 6, padding: "8px 0" },
  scoreNum: { fontSize: 48, fontWeight: 700, lineHeight: 1 },
  scoreUnit: { fontSize: 16, color: "#888" },
  scoreMsg: { fontSize: 14, color: "#f0e6d3", marginLeft: 8 },
 
  feedRow: {
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 9, padding: "12px 14px",
  },
  feedTag: {
    display: "inline-block", fontSize: 10, fontWeight: 600, color: "#fff",
    padding: "2px 9px", borderRadius: 10, marginBottom: 7, letterSpacing: "0.05em",
  },
  feedText: { fontSize: 13, color: "#ddd", lineHeight: 1.7, margin: 0 },
 
  modelBox: {
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 9, padding: "12px 14px",
  },
  modelRows: { display: "flex", flexDirection: "column", gap: 10, marginTop: 8 },
  modelRow: { display: "flex", alignItems: "flex-start", gap: 10 },
  modelIcon: { fontSize: 15, minWidth: 20, paddingTop: 1 },
  modelRight: { display: "flex", flexDirection: "column", gap: 2 },
  modelLabel: { fontSize: 10, color: "#888", letterSpacing: "0.1em" },
  modelValue: { fontSize: 13, color: "#f0e6d3", lineHeight: 1.65 },
 
  spinWrap: { display: "flex", flexDirection: "column", alignItems: "center", gap: 14, padding: "36px 0" },
  spinner: {
    width: 32, height: 32, borderRadius: "50%",
    border: "3px solid rgba(255,255,255,0.1)", borderTop: "3px solid #c0392b",
    animation: "spin 0.75s linear infinite",
  },
  spinText: { color: "#888", fontSize: 13, letterSpacing: "0.1em" },
  errText: { color: "#c0392b", fontSize: 13, textAlign: "center" },
 
  charBadge: {
    display: "flex", alignItems: "center", gap: 10,
    background: "rgba(255,255,255,0.05)", border: "1px solid",
    borderRadius: 10, padding: "10px 14px", marginBottom: 2,
  },
  charIcon: {
    width: 36, height: 36, borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 18, flexShrink: 0,
  },
  charInfo: { display: "flex", flexDirection: "column", gap: 1, flex: 1 },
  charName: { fontSize: 14, fontWeight: 700, letterSpacing: "0.05em" },
  charRole: { fontSize: 10, color: "#888", letterSpacing: "0.08em" },
  charLabel: { fontSize: 11, color: "#666", letterSpacing: "0.05em" },
};
 
if (typeof document !== "undefined") {
  const el = document.createElement("style");
  el.textContent = `@keyframes spin{to{transform:rotate(360deg)}}`;
  document.head.appendChild(el);
}
