import { s } from "../styles";
import { CATEGORIES, DIFF_COLOR } from "../data/constants";
import { Shell, CharacterBadge, FeedRow, ModelAnswer, AffinityBar } from "./shared";

/**
 * 結果画面
 */
export function ResultScreen({
  character,
  category,
  difficulty,
  question,
  userAnswer,
  feedback,
  affinity,
  affinityDelta,
  stats,
  onHome,
  onNextQuestion,
}) {
  const catObj = CATEGORIES.find(c => c.id === category);
  const is4択 = question?.format === "4択";

  // 4択の正解・自分の選択を比較するための正規化ヘルパー
  const norm = v => String(v ?? "").replace(/　/g, " ").trim().replace(/[。、．，\s]+$/u, "");

  return (
    <Shell total={stats.total}>
      <div style={s.quizCard}>
        {/* キャラクターバッジ */}
        {character && <CharacterBadge character={character} />}

        {/* カテゴリ・難易度バッジ */}
        <div style={s.quizTop}>
          <div style={{ ...s.badge, background: catObj?.color }}>
            {catObj?.icon} {catObj?.label}
          </div>
          <div style={{ ...s.diffPill, background: DIFF_COLOR[difficulty] }}>
            {difficulty}
          </div>
        </div>

        {/* 4択：正誤バナー */}
        {is4択 && (
          <div
            style={{
              ...s.correctBanner,
              background: feedback.correct
                ? "rgba(39,174,96,0.15)"
                : "rgba(192,57,43,0.15)",
              borderColor: feedback.correct ? "#27ae60" : "#c0392b",
            }}
          >
            <span style={{ fontSize: 28 }}>
              {feedback.correct ? "⭕" : "❌"}
            </span>
            <span
              style={{
                fontSize: 15,
                color: feedback.correct ? "#27ae60" : "#c0392b",
                fontWeight: 700,
              }}
            >
              {feedback.correct ? "正解！" : "不正解"}
            </span>
          </div>
        )}

        {/* 4択：選択肢の正解・自分の選択を可視化 */}
        {is4択 && Array.isArray(question?.choices) && (
          <div style={s.choicesGrid}>
            {question.choices.map((choice, i) => {
              const isCorrect = norm(choice) === norm(question.ans);
              const isPicked = norm(choice) === norm(userAnswer);
              const style = isCorrect
                ? { borderColor: "#27ae60", background: "rgba(39,174,96,0.15)" }
                : isPicked
                  ? { borderColor: "#c0392b", background: "rgba(192,57,43,0.15)" }
                  : { opacity: 0.6 };
              return (
                <div key={i} style={{ ...s.choiceBtn, cursor: "default", ...style }}>
                  {isCorrect ? "⭕ " : isPicked ? "❌ " : ""}{choice}
                  {isPicked && <span style={{ fontSize: 11, marginLeft: 6, color: "#aaa" }}>（あなたの回答）</span>}
                </div>
              );
            })}
          </div>
        )}

        {/* キャラクターコメント */}
        <p style={s.scoreMsg}>{feedback.msg}</p>

        {/* 記述：詳細フィードバック */}
        {!is4択 && (
          <>
            <FeedRow tag="✓ 良い点" color="#27ae60" text={feedback.good} />
            <FeedRow tag="△ 改善"   color="#e67e22" text={feedback.fix} />
          </>
        )}

        {/* 模範解答 */}
        <ModelAnswer model={feedback.model} />

        {/* 親密度変化 */}
        {character && affinityDelta !== null && (
          <AffinityBar
            character={character}
            affinity={affinity}
            delta={affinityDelta}
          />
        )}

        {/* ナビゲーション */}
        <div style={s.btnRow}>
          <button style={s.ghostBtn} onClick={onHome}>← カテゴリへ</button>
          <button style={s.redBtn} onClick={onNextQuestion}>次の問題 →</button>
        </div>
      </div>
    </Shell>
  );
}
