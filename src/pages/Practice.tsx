import { useState } from "react";
import passages from "../data/passages";
import PassageReader from "../components/PassageReader";
import QuizQuestion from "../components/QuizQuestion";
import ProgressBar from "../components/ProgressBar";
import { Passage } from "../types";

export default function Practice() {
  const [selectedPassage, setSelectedPassage] = useState<Passage | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  const handleSelectPassage = (p: Passage) => {
    setSelectedPassage(p);
    setCurrentQ(0);
    setAnswered(0);
    setCorrect(0);
    setQuizDone(false);
  };

  const handleAnswer = (isCorrect: boolean) => {
    setAnswered((a) => a + 1);
    if (isCorrect) setCorrect((c) => c + 1);
  };

  const handleNext = () => {
    if (selectedPassage && currentQ < selectedPassage.questions.length - 1) {
      setCurrentQ((q) => q + 1);
    } else {
      setQuizDone(true);
    }
  };

  const handleBack = () => {
    setSelectedPassage(null);
    setQuizDone(false);
  };

  // Passage selection screen
  if (!selectedPassage) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
            📖 Reading Practice
          </h1>
          <p className="text-gray-500">
            Choose a story to read! Click on words you don't know for help.
          </p>
        </div>
        <div className="grid gap-4">
          {passages.map((p) => (
            <button
              key={p.id}
              onClick={() => handleSelectPassage(p)}
              className="w-full text-left bg-white rounded-2xl p-5 border-2 border-primary-100 hover:border-primary-400 hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">📖</span>
                <span className="font-extrabold text-lg text-gray-800">
                  {p.title}
                </span>
              </div>
              <div className="flex gap-2">
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${p.difficulty === "easy" ? "bg-success-50 text-success-600" : p.difficulty === "medium" ? "bg-warning-50 text-warning-500" : "bg-danger-50 text-danger-500"}`}
                >
                  {p.difficulty === "easy"
                    ? "Easy ⭐"
                    : p.difficulty === "medium"
                      ? "Medium ⭐⭐"
                      : "Hard ⭐⭐⭐"}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-600">
                  {p.topic}
                </span>
                <span className="text-xs text-gray-400">
                  {p.questions.length} questions
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Quiz completed screen
  if (quizDone) {
    const pct = Math.round((correct / selectedPassage.questions.length) * 100);
    const emoji = pct === 100 ? "🏆" : pct >= 75 ? "🎉" : pct >= 50 ? "👍" : "💪";
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-primary-100">
          <div className="text-6xl mb-4">{emoji}</div>
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
            {pct === 100
              ? "Perfect Score!"
              : pct >= 75
                ? "Great Job!"
                : pct >= 50
                  ? "Good Effort!"
                  : "Keep Trying!"}
          </h2>
          <p className="text-lg text-gray-500 mb-6">
            You got <strong className="text-primary-600">{correct}</strong> out
            of{" "}
            <strong className="text-primary-600">
              {selectedPassage.questions.length}
            </strong>{" "}
            questions right!
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => handleSelectPassage(selectedPassage)}
              className="bg-primary-500 hover:bg-primary-600 text-white font-bold px-6 py-3 rounded-full transition-colors cursor-pointer border-none"
            >
              🔄 Try Again
            </button>
            <button
              onClick={handleBack}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-6 py-3 rounded-full transition-colors cursor-pointer border-none"
            >
              📚 More Stories
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active practice screen
  const question = selectedPassage.questions[currentQ];

  return (
    <div className="space-y-6">
      <button
        onClick={handleBack}
        className="text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors cursor-pointer bg-transparent border-none"
      >
        ← Back to stories
      </button>

      <PassageReader passage={selectedPassage} />

      <ProgressBar
        current={answered}
        total={selectedPassage.questions.length}
        correct={correct}
      />

      <QuizQuestion
        key={question.id}
        question={question}
        questionNumber={currentQ + 1}
        totalQuestions={selectedPassage.questions.length}
        onAnswer={handleAnswer}
      />

      {answered > currentQ && (
        <div className="text-center">
          <button
            onClick={handleNext}
            className="bg-primary-500 hover:bg-primary-600 text-white font-bold px-8 py-3 rounded-full text-lg transition-colors cursor-pointer border-none shadow-md"
          >
            {currentQ < selectedPassage.questions.length - 1
              ? "Next Question →"
              : "See Results 🎉"}
          </button>
        </div>
      )}
    </div>
  );
}
