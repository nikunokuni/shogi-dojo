import { s } from "../styles";
import { CATEGORIES, DIFF_COLOR } from "../data/constants";
import { Shell, Spinner, CharacterBadge } from "./shared";

/**
 * 問題画面
 */
export function QuizScreen({
  character,
  category,
  difficulty,
  question,
  userAnswer,
  showHint,
  revealAns,
  loading,
  error,
  stats,
  onAnswerChange,
  onChoiceSelect,
  onShowHint,
  onRevealAns,
  onSubmit,
  onBack,
  onRetry,
}) {
  const catObj = CATEGORIES.find(c => c.id === category);
  const isSubmitDisabled = !userAnswer.trim() || loading;

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

        {/* ローディング */}
        {loading && !question && <Spinner />}

        {/* エラー */}
        {error && (
          <div style={{ textAlign: "center" }}>
            <p style={s.errText}>{error}</p>
            <div style={s.btnRow}>
              <button style={s.ghostBtn} onClick={onBack}>← 戻る</button>
              <button style={s.redBtn} onClick={onRetry} disabled={loading}>
                {loading ? "再取得中…" : "再試行 ↻"}
              </button>
            </div>
          </div>
        )}

        {/* 問題 */}
        {question && !error && (
          <>
            <div style={s.qBox}>
              <p style={s.qLabel}>問題</p>
              <p style={s.qText}>{question.q}</p>
            </div>

            {/* ヒント */}
            {showHint
              ? <div style={s.hintBox}>💡 {question.hint}</div>
              : <button style={s.hintBtn} onClick={onShowHint}>💡 ヒントを見る</button>
            }

            {/* 入力エリア */}
            {question.format === "4択"
              ? (
                <div style={s.choicesGrid} role="radiogroup" aria-label="選択肢">
                  {(question.choices ?? []).map((choice, i) => (
                    <button
                      key={i}
                      role="radio"
                      aria-checked={userAnswer === choice}
                      style={{
                        ...s.choiceBtn,
                        ...(userAnswer === choice
                          ? { borderColor: "#c0392b", background: "rgba(192,57,43,0.15)" }
                          : {}),
                      }}
                      onClick={() => onChoiceSelect(choice)}
                    >
                      {choice}
                    </button>
                  ))}
                </div>
              )
              : (
                <textarea
                  style={s.textarea}
                  rows={3}
                  value={userAnswer}
                  onChange={e => onAnswerChange(e.target.value)}
                  onKeyDown={e => {
                    // Ctrl/Cmd + Enter で送信
                    if ((e.ctrlKey || e.metaKey) && e.key === "Enter" && !isSubmitDisabled) {
                      e.preventDefault();
                      onSubmit();
                    }
                  }}
                  aria-label="答えや考え方を入力"
                  placeholder="答えや考え方を書く…（Ctrl+Enterで送信）"
                />
              )
            }

            {/* ボタン行 */}
            <div style={s.btnRow}>
              <button style={s.ghostBtn} onClick={onBack}>← 戻る</button>
              <button
                style={{ ...s.redBtn, opacity: isSubmitDisabled ? 0.45 : 1 }}
                onClick={onSubmit}
                disabled={isSubmitDisabled}
              >
                {loading ? "フィードバック中…" : "解答する →"}
              </button>
            </div>

            {/* 模範解答を先に見る */}
            <div style={{ textAlign: "center" }}>
              {revealAns
                ? (
                  <div style={s.revealBox}>
                    <strong style={{ color: "#f0e6d3" }}>模範解答：</strong>
                    {question.ans}
                    <div style={{ marginTop: 8, color: "#999", fontSize: 12 }}>
                      {question.exp}
                    </div>
                  </div>
                )
                : (
                  <button style={s.revealBtn} onClick={onRevealAns}>
                    模範解答だけ見る
                  </button>
                )
              }
            </div>
          </>
        )}
      </div>
    </Shell>
  );
}
