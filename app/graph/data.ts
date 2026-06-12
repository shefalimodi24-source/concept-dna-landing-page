export type NodeStatus = "mastered" | "learning" | "weak" | "locked"

export interface GraphNode {
  id: string
  label: string
  subject: string
  x: number
  y: number
  status: NodeStatus
  connections: string[]
  mastery: number
  summary: string
  prerequisites: string[]
  unlocks: string[]
  resources: { title: string; type: "video" | "article" | "exercise"; url: string }[]
  nextStep: string
}

export const STATUS_META: Record<NodeStatus, { label: string; color: string; glow: string; ring: string; bg: string; text: string }> = {
  mastered: {
    label: "Mastered",
    color: "#10b981",
    glow: "#10b981",
    ring: "#a7f3d0",
    bg: "#10b981",
    text: "#064e3b",
  },
  learning: {
    label: "Learning",
    color: "#f59e0b",
    glow: "#f59e0b",
    ring: "#fde68a",
    bg: "#f59e0b",
    text: "#78350f",
  },
  weak: {
    label: "Weak",
    color: "#f43f5e",
    glow: "#f43f5e",
    ring: "#fecdd3",
    bg: "#f43f5e",
    text: "#881337",
  },
  locked: {
    label: "Locked",
    color: "#94a3b8",
    glow: "#94a3b8",
    ring: "#e2e8f0",
    bg: "#cbd5e1",
    text: "#475569",
  },
}

export const SUBJECTS = ["Mathematics", "Statistics", "Physics", "Computer Science", "Linear Algebra", "AI / ML"]

export const NODES: GraphNode[] = [
  {
    id: "algebra",
    label: "Algebra",
    subject: "Mathematics",
    x: 12,
    y: 30,
    status: "mastered",
    mastery: 92,
    connections: ["functions", "probability"],
    summary:
      "Algebra forms the backbone of all mathematical reasoning — covering variables, equations, inequalities, polynomials, and systems of equations. Your strong mastery here gives you a solid foundation for all higher-level STEM topics.",
    prerequisites: [],
    unlocks: ["Functions", "Probability"],
    resources: [
      { title: "Khan Academy: Algebra Fundamentals", type: "video", url: "#" },
      { title: "Algebra Review — MIT OCW", type: "article", url: "#" },
      { title: "Practice Problems Set A", type: "exercise", url: "#" },
    ],
    nextStep: "Explore parametric equations and polynomial factoring to strengthen your Functions foundation.",
  },
  {
    id: "functions",
    label: "Functions",
    subject: "Mathematics",
    x: 30,
    y: 14,
    status: "mastered",
    mastery: 87,
    connections: ["trigonometry", "calculus"],
    summary:
      "Functions are the language of mathematics — describing relationships between inputs and outputs. You have demonstrated strong comprehension of domain/range, function composition, and inverses.",
    prerequisites: ["Algebra"],
    unlocks: ["Trigonometry", "Calculus"],
    resources: [
      { title: "Functions Masterclass — 3Blue1Brown", type: "video", url: "#" },
      { title: "MIT Notes: Functions & Graphs", type: "article", url: "#" },
      { title: "Function Composition Drills", type: "exercise", url: "#" },
    ],
    nextStep: "Move into Trigonometry — it extends function thinking into periodic phenomena.",
  },
  {
    id: "trigonometry",
    label: "Trigonometry",
    subject: "Mathematics",
    x: 50,
    y: 8,
    status: "mastered",
    mastery: 81,
    connections: ["calculus"],
    summary:
      "Trigonometry covers the relationships between angles and side lengths, unit circle, sinusoidal functions, and identities. You've shown solid performance across most trig concepts with minor gaps in advanced identities.",
    prerequisites: ["Functions"],
    unlocks: ["Calculus"],
    resources: [
      { title: "Trig Identities — Paul's Online Math Notes", type: "article", url: "#" },
      { title: "Visual Trig — Manim explainer", type: "video", url: "#" },
      { title: "Inverse Trig Practice", type: "exercise", url: "#" },
    ],
    nextStep: "Review sum-to-product identities before Calculus to make integration smoother.",
  },
  {
    id: "calculus",
    label: "Calculus",
    subject: "Mathematics",
    x: 68,
    y: 14,
    status: "mastered",
    mastery: 79,
    connections: ["linear-algebra", "probability"],
    summary:
      "Calculus underpins nearly all quantitative STEM work — derivatives, integrals, limits, and the fundamental theorem. Your scores show mastery of single-variable calculus with slight weaknesses in multivariable topics.",
    prerequisites: ["Functions", "Trigonometry"],
    unlocks: ["Linear Algebra", "Probability"],
    resources: [
      { title: "Essence of Calculus — 3Blue1Brown", type: "video", url: "#" },
      { title: "Calculus Problem Sets — MIT OCW 18.01", type: "exercise", url: "#" },
      { title: "Multivariable Calculus Intro", type: "article", url: "#" },
    ],
    nextStep: "Strengthen multivariable calculus to unlock core Machine Learning gradient concepts.",
  },
  {
    id: "linear-algebra",
    label: "Linear Algebra",
    subject: "Linear Algebra",
    x: 85,
    y: 28,
    status: "learning",
    mastery: 54,
    connections: ["ml"],
    summary:
      "Linear algebra is the mathematical engine of AI — covering vectors, matrices, eigenvalues, and transformations. You are currently building proficiency here; eigenvectors and matrix decompositions need more attention.",
    prerequisites: ["Calculus"],
    unlocks: ["Machine Learning"],
    resources: [
      { title: "Essence of Linear Algebra — 3Blue1Brown", type: "video", url: "#" },
      { title: "MIT 18.06 Linear Algebra (Strang)", type: "video", url: "#" },
      { title: "Matrix Operations Practice", type: "exercise", url: "#" },
    ],
    nextStep: "Focus on eigendecomposition and SVD — they appear in every ML algorithm you will encounter.",
  },
  {
    id: "probability",
    label: "Probability",
    subject: "Statistics",
    x: 28,
    y: 50,
    status: "mastered",
    mastery: 83,
    connections: ["statistics"],
    summary:
      "Probability gives you the mathematical language for uncertainty. You have demonstrated strong understanding of distributions, Bayes' theorem, and expected value calculations.",
    prerequisites: ["Algebra", "Calculus"],
    unlocks: ["Statistics"],
    resources: [
      { title: "Introduction to Probability — MIT OCW", type: "article", url: "#" },
      { title: "Bayesian Thinking Explained", type: "video", url: "#" },
      { title: "Probability Drills — 200 problems", type: "exercise", url: "#" },
    ],
    nextStep: "Apply Bayesian inference to statistical modeling to bridge toward Data Science.",
  },
  {
    id: "statistics",
    label: "Statistics",
    subject: "Statistics",
    x: 14,
    y: 64,
    status: "mastered",
    mastery: 88,
    connections: ["ml"],
    summary:
      "Statistics is your strongest subject. You excel at hypothesis testing, regression analysis, confidence intervals, and experimental design — skills that directly power data science and research.",
    prerequisites: ["Probability"],
    unlocks: ["Machine Learning"],
    resources: [
      { title: "Statistics and Data Analysis — Coursera", type: "video", url: "#" },
      { title: "Think Stats (free textbook)", type: "article", url: "#" },
      { title: "Regression Analysis Exercises", type: "exercise", url: "#" },
    ],
    nextStep: "Pivot into Statistical Learning Theory to connect your statistics mastery to ML foundations.",
  },
  {
    id: "ml",
    label: "Machine Learning",
    subject: "AI / ML",
    x: 62,
    y: 50,
    status: "learning",
    mastery: 48,
    connections: ["deep-learning"],
    summary:
      "Machine Learning is where your STEM foundations converge. You show understanding of supervised learning and model evaluation, but unsupervised methods and regularisation techniques need reinforcement.",
    prerequisites: ["Linear Algebra", "Statistics", "Calculus"],
    unlocks: ["Deep Learning"],
    resources: [
      { title: "CS229 — Andrew Ng (Stanford)", type: "video", url: "#" },
      { title: "An Introduction to Statistical Learning", type: "article", url: "#" },
      { title: "Scikit-learn Exercises", type: "exercise", url: "#" },
    ],
    nextStep: "Work through regularization (L1/L2) and dimensionality reduction before entering Deep Learning.",
  },
  {
    id: "deep-learning",
    label: "Deep Learning",
    subject: "AI / ML",
    x: 50,
    y: 70,
    status: "weak",
    mastery: 26,
    connections: ["transformers"],
    summary:
      "Deep Learning covers neural network architectures, backpropagation, activation functions, and optimisation. This is currently your largest gap — foundational concepts are partially understood but require significant reinforcement.",
    prerequisites: ["Machine Learning"],
    unlocks: ["Transformers"],
    resources: [
      { title: "Deep Learning Specialization — Coursera", type: "video", url: "#" },
      { title: "Deep Learning Book — Goodfellow et al.", type: "article", url: "#" },
      { title: "Neural Network from Scratch — exercises", type: "exercise", url: "#" },
    ],
    nextStep: "Implement a neural network from scratch in NumPy to solidify the backpropagation algorithm.",
  },
  {
    id: "transformers",
    label: "Transformers",
    subject: "AI / ML",
    x: 75,
    y: 80,
    status: "locked",
    mastery: 0,
    connections: [],
    summary:
      "Transformers are the architecture behind GPT, BERT, and modern AI systems. This concept is locked until you strengthen your Deep Learning foundations. Once unlocked, you will cover attention mechanisms, positional encoding, and fine-tuning.",
    prerequisites: ["Deep Learning"],
    unlocks: [],
    resources: [
      { title: "Attention Is All You Need (paper)", type: "article", url: "#" },
      { title: "Illustrated Transformer — Jay Alammar", type: "article", url: "#" },
      { title: "The Annotated Transformer", type: "exercise", url: "#" },
    ],
    nextStep: "Complete Deep Learning fundamentals to unlock this concept.",
  },
]
