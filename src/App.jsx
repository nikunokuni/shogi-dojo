import { useQuiz } from "./hooks/useQuiz";
import { HomeScreen }   from "./components/HomeScreen";
import { QuizScreen }   from "./components/QuizScreen";
import { ResultScreen } from "./components/ResultScreen";

/**
 * ShogiTrainer
 *
 * このコンポーネントは「どの画面を表示するか」だけを担当する薄いオーケストレーター。
 * ロジックはすべて useQuiz フックに、UI は各 Screen コンポーネントに委譲している。
 */
export default function App() {
  const quiz = useQuiz();

  if (quiz.screen === "home") {
    return (
      <HomeScreen
        difficulty={quiz.difficulty}
        strategy={quiz.strategy}
        affinity={quiz.affinity}
        stats={quiz.stats}
        kobanashiModal={quiz.kobanashiModal}
        onDifficultyChange={quiz.setDifficulty}
        onStrategyChange={quiz.setStrategy}
        onStartQuiz={quiz.startQuiz}
        onOpenKobanashi={quiz.setKobanashiModal}
        onCloseKobanashi={() => quiz.setKobanashiModal(null)}
      />
    );
  }

  if (quiz.screen === "quiz") {
    return (
      <QuizScreen
        character={quiz.character}
        category={quiz.category}
        difficulty={quiz.difficulty}
        question={quiz.question}
        userAnswer={quiz.userAnswer}
        showHint={quiz.showHint}
        revealAns={quiz.revealAns}
        loading={quiz.loading}
        error={quiz.error}
        stats={quiz.stats}
        onAnswerChange={quiz.setUserAnswer}
        onChoiceSelect={quiz.setUserAnswer}
        onShowHint={() => quiz.setShowHint(true)}
        onRevealAns={() => quiz.setRevealAns(true)}
        onSubmit={quiz.submitAnswer}
        onBack={() => quiz.setScreen ? quiz.goHome() : null}
      />
    );
  }

  if (quiz.screen === "result" && quiz.feedback) {
    return (
      <ResultScreen
        character={quiz.character}
        category={quiz.category}
        difficulty={quiz.difficulty}
        question={quiz.question}
        feedback={quiz.feedback}
        affinity={quiz.affinity}
        affinityDelta={quiz.affinityDelta}
        stats={quiz.stats}
        onHome={quiz.goHome}
        onNextQuestion={quiz.goNextQuestion}
      />
    );
  }

  // result 画面だが feedback がまだ null の場合（通常は発生しない）
  return null;
}
