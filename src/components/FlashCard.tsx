import { useState } from "react";
import { VocabularyWord } from "../types";

interface FlashCardProps {
  word: VocabularyWord;
}

export default function FlashCard({ word }: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    const utterance = new SpeechSynthesisUtterance(word.word);
    utterance.lang = "en-US";
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  return (
    <div
      className="cursor-pointer perspective-[1000px] h-48"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${isFlipped ? "[transform:rotateY(180deg)]" : ""}`}
      >
        {/* Front */}
        <div className="absolute inset-0 bg-white rounded-2xl shadow-lg border-2 border-primary-200 p-6 flex flex-col items-center justify-center [backface-visibility:hidden]">
          <span className="text-2xl font-extrabold text-primary-600 mb-2">
            {word.word}
          </span>
          <span className="text-xs text-gray-400 italic mb-3">
            {word.partOfSpeech}
          </span>
          <button
            onClick={handleSpeak}
            className="bg-primary-100 hover:bg-primary-200 text-primary-700 rounded-full px-4 py-1.5 text-sm font-bold transition-colors cursor-pointer border-none"
          >
            🔊 Listen
          </button>
          <span className="text-xs text-gray-300 mt-3">
            Tap to see meaning →
          </span>
        </div>

        {/* Back */}
        <div className="absolute inset-0 bg-purple-50 rounded-2xl shadow-lg border-2 border-purple-300 p-6 flex flex-col items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span className="text-2xl font-extrabold text-purple-600 mb-2">
            {word.translation}
          </span>
          <span className="text-sm text-gray-600 italic text-center">
            "{word.example}"
          </span>
          <span className="text-xs text-gray-300 mt-3">
            ← Tap to see word
          </span>
        </div>
      </div>
    </div>
  );
}
