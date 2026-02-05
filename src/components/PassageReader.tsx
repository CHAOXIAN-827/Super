import { Passage } from "../types";
import WordTooltip from "./WordTooltip";

interface PassageReaderProps {
  passage: Passage;
}

const difficultyColors = {
  easy: "bg-success-50 text-success-600 border-success-400",
  medium: "bg-warning-50 text-warning-500 border-warning-400",
  hard: "bg-danger-50 text-danger-500 border-danger-400",
};

const difficultyLabels = {
  easy: "Easy ⭐",
  medium: "Medium ⭐⭐",
  hard: "Hard ⭐⭐⭐",
};

export default function PassageReader({ passage }: PassageReaderProps) {
  const words = passage.content.split(/(\s+)/);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-primary-100">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <h2 className="text-2xl font-extrabold text-gray-800 m-0">
          {passage.title}
        </h2>
        <span
          className={`text-xs font-bold px-3 py-1 rounded-full border ${difficultyColors[passage.difficulty]}`}
        >
          {difficultyLabels[passage.difficulty]}
        </span>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-50 text-purple-600 border border-purple-400">
          {passage.topic}
        </span>
      </div>
      <p className="text-xs text-gray-400 mb-3">
        💡 Click on any underlined word to see its meaning in Japanese!
      </p>
      <div className="text-lg leading-relaxed text-gray-700">
        {words.map((w, i) =>
          w.trim() ? <WordTooltip key={i} word={w} /> : <span key={i}>{w}</span>
        )}
      </div>
    </div>
  );
}
