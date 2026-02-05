import { VocabularyWord } from "../types";

const vocabularyWords: VocabularyWord[] = [
  // Animals
  { id: "v1", word: "elephant", translation: "ゾウ", partOfSpeech: "noun", example: "The elephant is the largest land animal.", category: "Animals" },
  { id: "v2", word: "dolphin", translation: "イルカ", partOfSpeech: "noun", example: "Dolphins are very smart animals.", category: "Animals" },
  { id: "v3", word: "butterfly", translation: "チョウ", partOfSpeech: "noun", example: "The butterfly has beautiful wings.", category: "Animals" },
  { id: "v4", word: "penguin", translation: "ペンギン", partOfSpeech: "noun", example: "Penguins live in cold places.", category: "Animals" },
  { id: "v5", word: "giraffe", translation: "キリン", partOfSpeech: "noun", example: "The giraffe has a very long neck.", category: "Animals" },
  { id: "v6", word: "rabbit", translation: "ウサギ", partOfSpeech: "noun", example: "The rabbit jumped over the fence.", category: "Animals" },

  // School
  { id: "v7", word: "homework", translation: "宿題（しゅくだい）", partOfSpeech: "noun", example: "I need to finish my homework.", category: "School" },
  { id: "v8", word: "teacher", translation: "先生（せんせい）", partOfSpeech: "noun", example: "My teacher is very kind.", category: "School" },
  { id: "v9", word: "library", translation: "図書館（としょかん）", partOfSpeech: "noun", example: "We borrow books from the library.", category: "School" },
  { id: "v10", word: "pencil", translation: "えんぴつ", partOfSpeech: "noun", example: "I write with a pencil.", category: "School" },
  { id: "v11", word: "eraser", translation: "消しゴム（けしごむ）", partOfSpeech: "noun", example: "I need an eraser to fix my mistake.", category: "School" },
  { id: "v12", word: "textbook", translation: "教科書（きょうかしょ）", partOfSpeech: "noun", example: "Open your textbook to page 10.", category: "School" },

  // Family
  { id: "v13", word: "parents", translation: "両親（りょうしん）", partOfSpeech: "noun", example: "My parents cook dinner together.", category: "Family" },
  { id: "v14", word: "brother", translation: "兄・弟（あに・おとうと）", partOfSpeech: "noun", example: "My brother is taller than me.", category: "Family" },
  { id: "v15", word: "sister", translation: "姉・妹（あね・いもうと）", partOfSpeech: "noun", example: "My sister likes drawing pictures.", category: "Family" },
  { id: "v16", word: "grandmother", translation: "おばあさん", partOfSpeech: "noun", example: "My grandmother tells great stories.", category: "Family" },
  { id: "v17", word: "grandfather", translation: "おじいさん", partOfSpeech: "noun", example: "My grandfather grows vegetables.", category: "Family" },
  { id: "v18", word: "cousin", translation: "いとこ", partOfSpeech: "noun", example: "I play with my cousin on weekends.", category: "Family" },

  // Food
  { id: "v19", word: "breakfast", translation: "朝食（ちょうしょく）", partOfSpeech: "noun", example: "I eat breakfast at 7 AM.", category: "Food" },
  { id: "v20", word: "delicious", translation: "おいしい", partOfSpeech: "adjective", example: "This cake is delicious!", category: "Food" },
  { id: "v21", word: "vegetable", translation: "野菜（やさい）", partOfSpeech: "noun", example: "Eating vegetables is healthy.", category: "Food" },
  { id: "v22", word: "hungry", translation: "おなかがすいた", partOfSpeech: "adjective", example: "I am hungry. Let's eat lunch!", category: "Food" },
  { id: "v23", word: "thirsty", translation: "のどがかわいた", partOfSpeech: "adjective", example: "I am thirsty. Can I have some water?", category: "Food" },
  { id: "v24", word: "recipe", translation: "レシピ・作り方", partOfSpeech: "noun", example: "My mom has a great cookie recipe.", category: "Food" },

  // Actions
  { id: "v25", word: "practice", translation: "練習する（れんしゅうする）", partOfSpeech: "verb", example: "I practice piano every day.", category: "Actions" },
  { id: "v26", word: "remember", translation: "覚えている（おぼえている）", partOfSpeech: "verb", example: "Please remember to bring your book.", category: "Actions" },
  { id: "v27", word: "understand", translation: "理解する（りかいする）", partOfSpeech: "verb", example: "I understand the question now.", category: "Actions" },
  { id: "v28", word: "explain", translation: "説明する（せつめいする）", partOfSpeech: "verb", example: "Can you explain this word?", category: "Actions" },
  { id: "v29", word: "discover", translation: "発見する（はっけんする）", partOfSpeech: "verb", example: "I discovered a new park near my house.", category: "Actions" },
  { id: "v30", word: "believe", translation: "信じる（しんじる）", partOfSpeech: "verb", example: "I believe you can do it!", category: "Actions" },

  // Feelings
  { id: "v31", word: "excited", translation: "ワクワクした", partOfSpeech: "adjective", example: "I am excited about the school trip!", category: "Feelings" },
  { id: "v32", word: "nervous", translation: "緊張した（きんちょうした）", partOfSpeech: "adjective", example: "She felt nervous before the test.", category: "Feelings" },
  { id: "v33", word: "curious", translation: "好奇心のある（こうきしん）", partOfSpeech: "adjective", example: "The curious student asked many questions.", category: "Feelings" },
  { id: "v34", word: "surprised", translation: "驚いた（おどろいた）", partOfSpeech: "adjective", example: "I was surprised by the birthday party!", category: "Feelings" },
  { id: "v35", word: "proud", translation: "誇りに思う（ほこりにおもう）", partOfSpeech: "adjective", example: "She is proud of her good grades.", category: "Feelings" },
  { id: "v36", word: "grateful", translation: "感謝している（かんしゃ）", partOfSpeech: "adjective", example: "I am grateful for my friends.", category: "Feelings" },
];

export function getCategories(): string[] {
  return [...new Set(vocabularyWords.map((w) => w.category))];
}

export function getWordsByCategory(category: string): VocabularyWord[] {
  return vocabularyWords.filter((w) => w.category === category);
}

export default vocabularyWords;
