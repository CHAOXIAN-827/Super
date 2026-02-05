import { useState } from "react";
import { getCategories, getWordsByCategory } from "../data/vocabulary";
import FlashCard from "../components/FlashCard";

const categoryEmojis: Record<string, string> = {
  Animals: "🐾",
  School: "🏫",
  Family: "👨‍👩‍👧‍👦",
  Food: "🍎",
  Actions: "🏃",
  Feelings: "😊",
};

export default function Vocabulary() {
  const categories = getCategories();
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const words = getWordsByCategory(activeCategory);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
          🔤 Vocabulary Builder
        </h1>
        <p className="text-gray-500">
          Tap a card to see the Japanese meaning. Press 🔊 to hear the word!
        </p>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full font-bold text-sm transition-all cursor-pointer border-none ${
              activeCategory === cat
                ? "bg-purple-500 text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-purple-50 hover:text-purple-600"
            }`}
          >
            {categoryEmojis[cat] || "📝"} {cat}
          </button>
        ))}
      </div>

      {/* Flashcard grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {words.map((word) => (
          <FlashCard key={word.id} word={word} />
        ))}
      </div>
    </div>
  );
}
