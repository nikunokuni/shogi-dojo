import { useState, useRef } from "react";
import { callGemini } from "../api/gemini";
import { makeQuestionPrompt, makeFeedbackPrompt } from "../api/prompts";
import { loadAffinity, saveAffinity, applyAffinityDelta, calcAffinityDelta } from "../utils/affinity";
import { loadStats, saveStats } from "../utils/stats";
import { reconcileChoices, grade4taku } from "../utils/question";
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
  const [stats, setStats] = useState(() => loadStats());

  // ── 使用済み解答（重複出題防止） ──
  const [usedAnswers, setUsedAnswers] = useState({});

  // ── 非同期状態 ──
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ── リクエスト世代カウンタ（画面離脱後の古い応答で state を書き換えないためのガード） ──
  const requestIdRef = useRef(0);

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
    const reqId = ++requestIdRef.current;

    setCategory(cat);
    setScreen("quiz");
    setLoading(true);
    resetQuizUiState();

    try {
      // 重複出題防止の履歴はカテゴリ・難易度・戦法ごとに分離する
      // （設定を切り替えたときに正当な問題が無駄に弾かれないように）
      const usedKey = `${cat}__${difficulty}__${strategy}`;
      const history = (usedAnswers[usedKey] ?? []).slice(-USED_ANSWERS_HISTORY_SIZE);
      const newChar = pickCharacter();
      setCharacter(newChar);

      let q = await callGemini(
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

      // 画面を離れた・別リクエストが始まった場合は、この応答を反映しない
      if (reqId !== requestIdRef.current) return;

      // 4択の ans と choices の表記揺れを吸収し、正解を必ず choices 内のテキストに揃える
      q = reconcileChoices(q);

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
          [usedKey]: [...(prev[usedKey] ?? []), q.ans].slice(-MAX_USED_ANSWERS),
        }));
      }

      setQuestion(q);
    } catch (e) {
      if (reqId !== requestIdRef.current) return;
      console.error("[startQuiz]", e);
      setError("問題の取得に失敗しました。再度お試しください。");
    } finally {
      if (reqId === requestIdRef.current) setLoading(false);
    }
  }

  /**
   * 回答を送信してフィードバックを取得し、結果画面へ遷移する
   */
  async function submitAnswer() {
    if (!userAnswer.trim() || loading) return;

    const reqId = ++requestIdRef.current;
    const is4taku = question.format === "4択";

    setLoading(true);
    setError(null);

    try {
      let fb;

      if (is4taku) {
        // 4択は正誤・解答・解説をすべて問題データから確定する（LLM 判定の揺れに依存しない）。
        // キャラのコメントだけ LLM から取得するが、失敗してもデフォルトで結果表示できるようにする。
        const correct = grade4taku(userAnswer, question.ans);
        let msg = correct ? "正解です！その調子！" : "惜しい！解説で確認してみよう。";
        try {
          const comment = await callGemini(
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
          if (comment?.msg) msg = comment.msg;
        } catch (commentErr) {
          // コメント取得失敗は致命的でない。デフォルトコメントで続行する。
          console.warn("[submitAnswer] comment fetch failed", commentErr);
        }

        fb = {
          type: "fb",
          correct,
          msg,
          model: { ans: question.ans, exp: question.exp ?? "" },
        };
      } else {
        // 記述は LLM の採点に依存する（失敗時はエラー表示）
        fb = await callGemini(
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
      }

      // 画面を離れた・別リクエストが始まった場合は反映しない
      if (reqId !== requestIdRef.current) return;

      setFeedback(fb);
      setStats(prev => {
        const updated = { ...prev, total: prev.total + 1 };
        saveStats(updated);
        return updated;
      });

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
      if (reqId !== requestIdRef.current) return;
      console.error("[submitAnswer]", e);
      setError("採点に失敗しました。もう一度お試しください。");
    } finally {
      if (reqId === requestIdRef.current) setLoading(false);
    }
  }

  /** 結果画面からホームへ戻る */
  function goHome() {
    // 進行中のリクエスト応答を無効化（ホームに戻った後に勝手に画面遷移させない）
    requestIdRef.current++;
    setAffinityDelta(null);
    setLoading(false);
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
