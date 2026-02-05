import { useState } from "react";
import { Question } from "../types";

interface QuizQuestionProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (correct: boolean) => void;
}

export default function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
}: QuizQuestionProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const isAnswered = selectedId !== null;
  const isCorrect = selectedId === question.correctOptionId;

  const handleSelect = (optionId: string) => {
    if (isAnswered) return;
    setSelectedId(optionId);
    onAnswer(optionId === question.correctOptionId);
  };

  const getOptionStyle = (optionId: string) => {
    if (!isAnswered) {
      return "bg-white border-2 border-gray-200 hover:border-primary-400 hover:bg-primary-50 cursor-pointer";
    }
    if (optionId === question.correctOptionId) {
      return "bg-success-50 border-2 border-success-400 text-success-600";
    }
    if (optionId === selectedId && !isCorrect) {
      return "bg-danger-50 border-2 border-danger-400 text-danger-500";
    }
    return "bg-gray-50 border-2 border-gray-200 opacity-50";
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-primary-100">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold text-gray-400">
          Question {questionNumber} of {totalQuestions}
        </span>
        {!isAnswered && (
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-xs font-bold text-warning-500 bg-warning-50 px-3 py-1 rounded-full hover:bg-warning-400 hover:text-white transition-colors cursor-pointer border-none"
          >
            {showHint ? "Hide Hint" : "💡 Show Hint"}
          </button>
        )}
      </div>

      <h3 className="text-xl font-bold text-gray-800 mb-4">{question.text}</h3>

      {showHint && !isAnswered && (
        <div className="bg-warning-50 border border-warning-400 rounded-xl p-3 mb-4 text-sm text-warning-500">
          💡 <strong>Hint:</strong> {question.hint}
        </div>
      )}

      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            disabled={isAnswered}
            className={`w-full text-left p-4 rounded-xl font-semibold text-base transition-all ${getOptionStyle(option.id)} ${!isAnswered ? "active:scale-[0.98]" : ""}`}
          >
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 text-sm font-bold mr-3">
              {option.id.toUpperCase()}
            </span>
            {option.text}
            {isAnswered && option.id === question.correctOptionId && (
              <span className="ml-2">✅</span>
            )}
            {isAnswered &&
              option.id === selectedId &&
              option.id !== question.correctOptionId && (
                <span className="ml-2">❌</span>
              )}
          </button>
        ))}
      </div>

      {isAnswered && (
        <div
          className={`mt-4 p-4 rounded-xl text-sm ${isCorrect ? "bg-success-50 border border-success-400 text-success-600" : "bg-primary-50 border border-primary-200 text-primary-700"}`}
        >
          <p className="font-bold text-base mb-1">
            {isCorrect ? "🎉 Great job!" : "📚 Let's learn!"}
          </p>
          <p>{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
