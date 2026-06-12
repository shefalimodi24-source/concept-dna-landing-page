export type QuestionType = "multiple-choice" | "equation" | "short-answer"

export interface Question {
  id: number
  topic: string
  subject: "Mathematics" | "Statistics" | "Physics" | "Computer Science" | "Linear Algebra"
  difficulty: "Foundation" | "Intermediate" | "Advanced"
  text: string
  type: QuestionType
  options?: string[]
  correctIndex?: number
}

export const questions: Question[] = [
  {
    id: 1,
    topic: "Calculus",
    subject: "Mathematics",
    difficulty: "Intermediate",
    text: "What is the derivative of x²?",
    type: "multiple-choice",
    options: ["x", "2x", "2x²", "x²/2"],
    correctIndex: 1,
  },
  {
    id: 2,
    topic: "Probability",
    subject: "Statistics",
    difficulty: "Foundation",
    text: "What does a probability of 0.5 represent?",
    type: "multiple-choice",
    options: [
      "The event is impossible",
      "The event will definitely happen",
      "An equal chance of occurring or not",
      "A 5% chance of occurring",
    ],
    correctIndex: 2,
  },
  {
    id: 3,
    topic: "Linear Equations",
    subject: "Mathematics",
    difficulty: "Foundation",
    text: "Solve for x: 2x + 5 = 11",
    type: "multiple-choice",
    options: ["x = 2", "x = 3", "x = 8", "x = 5"],
    correctIndex: 1,
  },
  {
    id: 4,
    topic: "Linear Algebra",
    subject: "Linear Algebra",
    difficulty: "Intermediate",
    text: "What is a matrix in mathematics?",
    type: "multiple-choice",
    options: [
      "A single number representing a scalar",
      "A rectangular array of numbers arranged in rows and columns",
      "A type of graph used for data visualization",
      "An equation with two unknowns",
    ],
    correctIndex: 1,
  },
  {
    id: 5,
    topic: "Data Structures",
    subject: "Computer Science",
    difficulty: "Intermediate",
    text: "Which data structure operates on a First-In, First-Out (FIFO) principle?",
    type: "multiple-choice",
    options: ["Stack", "Queue", "Binary Tree", "Hash Map"],
    correctIndex: 1,
  },
  {
    id: 6,
    topic: "Calculus",
    subject: "Mathematics",
    difficulty: "Advanced",
    text: "What does the integral of a function represent geometrically?",
    type: "multiple-choice",
    options: [
      "The slope of the tangent line at a point",
      "The maximum value of the function",
      "The area under the curve between two points",
      "The rate of change of the function",
    ],
    correctIndex: 2,
  },
  {
    id: 7,
    topic: "Physics",
    subject: "Physics",
    difficulty: "Foundation",
    text: "According to Newton's second law, Force equals:",
    type: "multiple-choice",
    options: ["mass × velocity", "mass × acceleration", "mass × distance", "velocity × time"],
    correctIndex: 1,
  },
  {
    id: 8,
    topic: "Algorithms",
    subject: "Computer Science",
    difficulty: "Advanced",
    text: "What is the time complexity of binary search on a sorted array of n elements?",
    type: "multiple-choice",
    options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
    correctIndex: 2,
  },
]

export const subjectColors: Record<Question["subject"], string> = {
  Mathematics: "bg-[oklch(0.95_0.05_255)] text-[oklch(0.45_0.18_255)]",
  Statistics: "bg-[oklch(0.95_0.06_145)] text-[oklch(0.42_0.17_145)]",
  Physics: "bg-[oklch(0.96_0.05_320)] text-[oklch(0.48_0.18_320)]",
  "Computer Science": "bg-[oklch(0.95_0.07_47)] text-[oklch(0.52_0.18_47)]",
  "Linear Algebra": "bg-[oklch(0.95_0.05_255)] text-[oklch(0.45_0.18_255)]",
}

export const difficultyColors: Record<Question["difficulty"], string> = {
  Foundation: "text-[oklch(0.55_0.17_145)] bg-[oklch(0.95_0.06_145)]",
  Intermediate: "text-[oklch(0.55_0.19_47)] bg-[oklch(0.95_0.06_47)]",
  Advanced: "text-[oklch(0.50_0.20_25)] bg-[oklch(0.96_0.06_25)]",
}
