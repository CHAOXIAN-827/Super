export interface DictionaryEntry {
  word: string;
  translation: string;
  partOfSpeech: string;
  example?: string;
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  hint: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
}

export interface Passage {
  id: string;
  title: string;
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  content: string;
  questions: Question[];
}

export interface VocabularyWord {
  id: string;
  word: string;
  translation: string;
  partOfSpeech: string;
  example: string;
  category: string;
}

export interface QuizState {
  currentQuestionIndex: number;
  selectedOptionId: string | null;
  isAnswered: boolean;
  score: number;
  totalAnswered: number;
}
