import { useState, useRef, useEffect } from "react";
import { lookupWord } from "../data/dictionary";

interface WordTooltipProps {
  word: string;
}

export default function WordTooltip({ word }: WordTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const entry = lookupWord(word);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US";
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  if (!entry) {
    return <span>{word} </span>;
  }

  return (
    <span ref={tooltipRef} className="relative inline-block">
      <span
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer border-b-2 border-dashed border-primary-300 hover:bg-primary-50 hover:border-primary-500 rounded-sm px-0.5 transition-colors"
      >
        {word}
      </span>{" "}
      {isOpen && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-white rounded-xl shadow-xl border border-primary-100 p-3 z-50 text-left animate-in fade-in">
          <span className="block text-lg font-bold text-primary-700">
            {entry.word}
          </span>
          <span className="block text-xs text-gray-400 italic mb-1">
            {entry.partOfSpeech}
          </span>
          <span className="block text-base font-bold text-purple-600 mb-1">
            {entry.translation}
          </span>
          {entry.example && (
            <span className="block text-xs text-gray-500 italic">
              "{entry.example}"
            </span>
          )}
          <button
            onClick={handleSpeak}
            className="mt-2 bg-primary-100 hover:bg-primary-200 text-primary-700 rounded-full px-3 py-1 text-xs font-bold transition-colors cursor-pointer border-none"
          >
            🔊 Listen
          </button>
          <span className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white" />
        </span>
      )}
    </span>
  );
}
