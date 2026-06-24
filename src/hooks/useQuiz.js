import { useState } from "react";
import { callGemini } from "../api/gemini";
import { makeQuestionPrompt, makeFeedbackPrompt } from "../api/prompts";
import { loadAffinity, saveAffinity, applyAffinityDelta, calcAffinityDelta } from "../utils/affinity";
import { pickCharacter } from "../utils/character";
import { MAX_USED_ANSWERS, USED_ANSWERS_HISTORY_SIZE } from "../data/constants";
// NOTE: データは呼び出し元から注入する（テスト容易性のため）
import { KAKUGEN_LIST, KAKOI_COMPATIBILITY } from "../data/kakugen";
/**
 * クイズの全ステート・ロジックを管理するカスタムフック
 */
export function useQuiz() {
  // ── 画面遷移 ──
  const [screen, setScreen] = useState("home"); // "home" | "quiz" | "result"

  // ── 設定 ──
  const [category, setCategory] = useState(null);
  const [difficulty, setDifficulty] = useState("初級");
  const [strategy, setStrategy] = useState("居飛車");

  // ── クイズ ──
  const [question, setQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [revealAns, setRevealAns] = useState(false);

  // ── キャラクター・親密度 ──
  const [character, setCharacter] = useState(null);
  const [affinity, setAffinity] = useState(() => loadAffinity());
  const [affinityDelta, setAffinityDelta] = useState(null);

  // ── 小話モーダル ──
  const [kobanashiModal, setKobanashiModal] = useState(null); // { character, text } | null

  // ── 統計 ──
  const [stats, setStats] = useState({ total: 0 });

  // ── 使用済み解答（重複出題防止） ──
  const [usedAnswers, setUsedAnswers] = useState({});

  // ── 非同期状態 ──
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ── クイズ UI リセット ──
  function resetQuizUiState() {
    setQuestion(null);
    setFeedback(null);
    setUserAnswer("");
    setShowHint(false);
    setRevealAns(false);
    setError(null);
  }

  /**
   * 問題を取得してクイズ画面へ遷移する
   * @param {string} cat カテゴリ ID
   */
  async function startQuiz(cat) {
    setCategory(cat);
    setScreen("quiz");
    setLoading(true);
    resetQuizUiState();

    try {
      const history = (usedAnswers[cat] ?? []).slice(-USED_ANSWERS_HISTORY_SIZE);
      const newChar = pickCharacter();
      setCharacter(newChar);

      const q = await callGemini(
        [{
          role: "user",
          content: makeQuestionPrompt({
            category: cat,
            difficulty,
            strategy,
            usedAnswers: history,
            kakugenList: KAKUGEN_LIST,
            kakoiCompatibility: KAKOI_COMPATIBILITY,
          }),
        }],
        newChar
      );

      // 4択は正解が先頭に来るため、表示前にシャッフルする（判定は q.ans で行うので順序は無関係）
      // Fisher–Yates で偏りなくシャッフルする
      if (q?.choices && Array.isArray(q.choices)) {
        const shuffled = [...q.choices];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        q.choices = shuffled;
      }

      // 使用済み解答を更新（重複出題防止）
      if (q?.ans) {
        setUsedAnswers(prev => ({
          ...prev,
          [cat]: [...(prev[cat] ?? []), q.ans].slice(-MAX_USED_ANSWERS),
        }));
      }

      setQuestion(q);
    } catch (e) {
      console.error("[startQuiz]", e);
      setError("問題の取得に失敗しました。再度お試しください。");
    } finally {
      setLoading(false);
    }
  }

  /**
   * 回答を送信してフィードバックを取得し、結果画面へ遷移する
   */
  async function submitAnswer() {
    if (!userAnswer.trim() || loading) return;

    setLoading(true);
    setError(null);

    try {
      const fb = await callGemini(
        [{
          role: "user",
          content: makeFeedbackPrompt({
            question: question.q,
            userAnswer,
            modelAnswer: question.ans,
            keywords: question.keywords,
            characterName: character?.name ?? null,
            format: question.format,
          }),
        }],
        character
      );

      // 4択の正誤はクライアント側で確定する（LLM の判定揺れに依存しない）。
      // 解答・解説も問題データを正とし、AI 応答が欠けても表示できるようにする。
      if (question.format === "4択") {
        fb.correct = userAnswer.trim() === String(question.ans ?? "").trim();
        fb.model = {
          ans: question.ans,
          exp: question.exp ?? fb.model?.exp ?? "",
        };
      }

      setFeedback(fb);
      setStats(prev => ({ ...prev, total: prev.total + 1 }));

      // 親密度を更新
      if (character) {
        const delta = calcAffinityDelta(question.format, fb.correct ?? null);
        setAffinityDelta(delta);
        setAffinity(prev => {
          const updated = applyAffinityDelta(prev, character.id, delta);
          saveAffinity(updated);
          return updated;
        });
      }

      setScreen("result");
    } catch (e) {
      console.error("[submitAnswer]", e);
      setError("採点に失敗しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  }

  /** 結果画面からホームへ戻る */
  function goHome() {
    setAffinityDelta(null);
    setScreen("home");
  }

  /** 結果画面から次の問題へ進む */
  function goNextQuestion() {
    setAffinityDelta(null);
    startQuiz(category);
  }

  return {
    // 状態
    screen,
    category,
    difficulty,
    strategy,
    question,
    userAnswer,
    feedback,
    showHint,
    revealAns,
    character,
    affinity,
    affinityDelta,
    kobanashiModal,
    stats,
    loading,
    error,
    // セッター（シンプルなもの）
    setDifficulty,
    setStrategy,
    setUserAnswer,
    setShowHint,
    setRevealAns,
    setKobanashiModal,
    // アクション
    startQuiz,
    submitAnswer,
    goHome,
    goNextQuestion,
  };
}
