import { Passage } from "../types";

const passages: Passage[] = [
  {
    id: "passage-1",
    title: "Yuki's Library Adventure",
    topic: "Hobbies",
    difficulty: "easy",
    content:
      "Yuki loves reading books. Every day after school, she goes to the library. She picks a book and sits down quietly. Today, she begins reading a story about a girl who travels to a magical forest. In the forest, there are talking animals and hidden treasure. Yuki reads for one hour. When she looks up, it is already dark outside. She smiles because the story was so exciting. Yuki forgets about the real world when she reads. She also loves that reading lets her visit new places and meet interesting people without leaving her room.",
    questions: [
      {
        id: "q1-1",
        text: "Where does Yuki go after school?",
        hint: "Look at the second sentence of the story.",
        options: [
          { id: "a", text: "To the park" },
          { id: "b", text: "To the library" },
          { id: "c", text: "To her friend's house" },
          { id: "d", text: "To the store" },
        ],
        correctOptionId: "b",
        explanation:
          'The story says "Every day after school, she goes to the library." This tells us Yuki goes to the library.',
      },
      {
        id: "q1-2",
        text: "What is the story Yuki reads about?",
        hint: "Read the part where it describes the book she is reading.",
        options: [
          { id: "a", text: "A boy and his dog" },
          { id: "b", text: "A trip to the beach" },
          { id: "c", text: "A girl in a magical forest" },
          { id: "d", text: "A spaceship adventure" },
        ],
        correctOptionId: "c",
        explanation:
          'The passage says she reads "a story about a girl who travels to a magical forest." This means the book is about a girl in a magical forest.',
      },
      {
        id: "q1-3",
        text: "Why does Yuki smile?",
        hint: 'Find the word "smiles" in the story and read around it.',
        options: [
          { id: "a", text: "Because she found treasure" },
          { id: "b", text: "Because the story was exciting" },
          { id: "c", text: "Because her friend came" },
          { id: "d", text: "Because school is over" },
        ],
        correctOptionId: "b",
        explanation:
          'The text says "She smiles because the story was so exciting." The word "because" tells us the reason — the exciting story made her smile.',
      },
      {
        id: "q1-4",
        text: "What does Yuki love about reading?",
        hint: "Look at the last sentence of the passage.",
        options: [
          { id: "a", text: "She can eat snacks while reading" },
          { id: "b", text: "She can visit new places and meet people" },
          { id: "c", text: "She can skip school" },
          { id: "d", text: "She can talk to animals" },
        ],
        correctOptionId: "b",
        explanation:
          'The last sentence says reading "lets her visit new places and meet interesting people without leaving her room." This means she loves how reading takes her to new places.',
      },
    ],
  },
  {
    id: "passage-2",
    title: "Kenji's English Class",
    topic: "School",
    difficulty: "easy",
    content:
      "Kenji is in the 5th grade. His English class is every Tuesday and Thursday. The teacher, Mr. Tanaka, always gives fun lessons. Today, the class is learning new words. Mr. Tanaka says, \"The best way to learn English is to practice every day.\" Kenji tries hard. He writes each new word in his notebook three times. He also practices speaking in front of his classmates. Sometimes he makes mistakes, but Mr. Tanaka says that is okay. \"Mistakes help us learn,\" he tells the class. Kenji feels nervous sometimes, but he is brave and tries his best. At the end of the class, his classmates clap for him. Kenji feels proud. He knows that being perfect is not important — what matters is trying.",
    questions: [
      {
        id: "q2-1",
        text: "How often does Kenji have English class?",
        hint: "Look for the days of the week mentioned in the story.",
        options: [
          { id: "a", text: "Every day" },
          { id: "b", text: "Once a week" },
          { id: "c", text: "Twice a week (Tuesday and Thursday)" },
          { id: "d", text: "Three times a week" },
        ],
        correctOptionId: "c",
        explanation:
          'The passage says "His English class is every Tuesday and Thursday." Tuesday and Thursday = two days = twice a week.',
      },
      {
        id: "q2-2",
        text: "What does Mr. Tanaka say about learning English?",
        hint: "Look for what Mr. Tanaka says inside the quotation marks (\").",
        options: [
          { id: "a", text: "Read many books" },
          { id: "b", text: "Practice every day" },
          { id: "c", text: "Watch English movies" },
          { id: "d", text: "Talk to foreigners" },
        ],
        correctOptionId: "b",
        explanation:
          'Mr. Tanaka says, "The best way to learn English is to practice every day." This is his advice for learning English well.',
      },
      {
        id: "q2-3",
        text: "How does Kenji study new words?",
        hint: "Find the part about what Kenji does with new words.",
        options: [
          { id: "a", text: "He reads them once" },
          { id: "b", text: "He writes each word three times" },
          { id: "c", text: "He draws pictures" },
          { id: "d", text: "He sings a song" },
        ],
        correctOptionId: "b",
        explanation:
          'The story says "He writes each new word in his notebook three times." This is how Kenji practices new vocabulary.',
      },
      {
        id: "q2-4",
        text: "What does Mr. Tanaka think about mistakes?",
        hint: 'Look for what Mr. Tanaka says about "mistakes."',
        options: [
          { id: "a", text: "They are bad" },
          { id: "b", text: "They help us learn" },
          { id: "c", text: "They are funny" },
          { id: "d", text: "They don't matter" },
        ],
        correctOptionId: "b",
        explanation:
          'Mr. Tanaka says, "Mistakes help us learn." This means he thinks mistakes are actually helpful and part of the learning process.',
      },
      {
        id: "q2-5",
        text: "How does Kenji feel at the end of the class?",
        hint: "Read the last few sentences of the passage.",
        options: [
          { id: "a", text: "Sad" },
          { id: "b", text: "Angry" },
          { id: "c", text: "Proud" },
          { id: "d", text: "Bored" },
        ],
        correctOptionId: "c",
        explanation:
          'The passage says "Kenji feels proud." His classmates clapping for him made him feel proud of his effort.',
      },
    ],
  },
  {
    id: "passage-3",
    title: "The Spelling Test",
    topic: "School",
    difficulty: "medium",
    content:
      "Every Friday, Mrs. Sato gives her class a spelling test. The students must study ten new English words each week. Mika always studies hard. She practices by writing the words, reading them out loud, and asking her mother to test her at home. This week, the words are more difficult than usual. Mika is worried about the word \"environment\" because it is very long. She writes it ten times and says each letter carefully: E-N-V-I-R-O-N-M-E-N-T. On Friday, the test begins. Mika feels nervous but ready. When she sees \"environment\" on the test, she smiles. She remembers how to spell it! After the test, Mrs. Sato checks the papers. Mika gets a perfect score. She is so happy. Her hard work helped her do well.",
    questions: [
      {
        id: "q3-1",
        text: "When does Mrs. Sato give a spelling test?",
        hint: "Look at the very first sentence.",
        options: [
          { id: "a", text: "Every Monday" },
          { id: "b", text: "Every Wednesday" },
          { id: "c", text: "Every Friday" },
          { id: "d", text: "Every day" },
        ],
        correctOptionId: "c",
        explanation:
          'The first sentence says "Every Friday, Mrs. Sato gives her class a spelling test."',
      },
      {
        id: "q3-2",
        text: "How many new words do the students learn each week?",
        hint: "Look for a number in the second sentence.",
        options: [
          { id: "a", text: "Five" },
          { id: "b", text: "Ten" },
          { id: "c", text: "Fifteen" },
          { id: "d", text: "Twenty" },
        ],
        correctOptionId: "b",
        explanation:
          'The passage says "The students must study ten new English words each week."',
      },
      {
        id: "q3-3",
        text: "Why is Mika worried?",
        hint: 'Find the word "worried" and read what comes after it.',
        options: [
          { id: "a", text: "She didn't study" },
          { id: "b", text: "The word 'environment' is very long" },
          { id: "c", text: "She lost her notebook" },
          { id: "d", text: "The test is tomorrow" },
        ],
        correctOptionId: "b",
        explanation:
          'The passage says "Mika is worried about the word environment because it is very long." The word "because" tells us the reason for her worry.',
      },
      {
        id: "q3-4",
        text: "What is the main lesson of this passage?",
        hint: "Think about what Mika did and what happened because of it.",
        options: [
          { id: "a", text: "Spelling is not important" },
          { id: "b", text: "Tests are too hard" },
          { id: "c", text: "Hard work helps you succeed" },
          { id: "d", text: "Long words are impossible to learn" },
        ],
        correctOptionId: "c",
        explanation:
          'The last sentence says "Her hard work helped her do well." The whole story shows that because Mika practiced a lot, she did well on the test. The main lesson is that hard work leads to success.',
      },
    ],
  },
];

export default passages;
