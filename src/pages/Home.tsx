import { Link } from "react-router-dom";

const features = [
  {
    icon: "📖",
    title: "Reading Practice",
    description: "Read fun stories and answer questions. Click on any word to see what it means!",
    to: "/practice",
    color: "from-primary-400 to-primary-600",
    bgColor: "bg-primary-50",
    borderColor: "border-primary-200",
  },
  {
    icon: "🔤",
    title: "Vocabulary Builder",
    description: "Learn new English words with fun flashcards. Tap a card to flip it!",
    to: "/vocabulary",
    color: "from-purple-400 to-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
];

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="text-center py-8">
        <div className="text-6xl mb-4">📚</div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-3">
          Welcome to <span className="text-primary-600">English Buddy</span>!
        </h1>
        <p className="text-lg text-gray-500 max-w-md mx-auto">
          Your fun helper for learning English. Read stories, learn words, and become a better English reader!
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {features.map((f) => (
          <Link
            key={f.to}
            to={f.to}
            className={`block ${f.bgColor} rounded-2xl p-6 border-2 ${f.borderColor} hover:shadow-lg transition-all hover:-translate-y-1 no-underline`}
          >
            <div className="text-4xl mb-3">{f.icon}</div>
            <h2 className="text-xl font-extrabold text-gray-800 mb-2">
              {f.title}
            </h2>
            <p className="text-gray-600 text-sm">{f.description}</p>
            <span
              className={`inline-block mt-4 bg-gradient-to-r ${f.color} text-white font-bold text-sm px-5 py-2 rounded-full`}
            >
              Start →
            </span>
          </Link>
        ))}
      </div>

      {/* Tips */}
      <div className="bg-white/80 rounded-2xl p-6 border border-gray-200">
        <h3 className="text-lg font-extrabold text-gray-800 mb-3">
          💡 Tips for Learning
        </h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-success-500 font-bold mt-0.5">✓</span>
            <span>
              <strong>Click on words</strong> you don't know to see the Japanese meaning
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success-500 font-bold mt-0.5">✓</span>
            <span>
              <strong>Use the hints</strong> if a question is too hard
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success-500 font-bold mt-0.5">✓</span>
            <span>
              <strong>Press the 🔊 button</strong> to hear how words sound
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success-500 font-bold mt-0.5">✓</span>
            <span>
              <strong>Don't worry about mistakes</strong> — they help you learn!
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
