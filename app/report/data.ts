export const reportData = {
  name: "Alex Johnson",
  overallScore: 72,
  generatedAt: "June 12, 2026",

  strengths: [
    { subject: "Statistics", score: 88, detail: "Strong grasp of descriptive & inferential methods" },
    { subject: "Algebra", score: 83, detail: "Confident with equations, functions, and proofs" },
    { subject: "Data Analysis", score: 79, detail: "Solid pattern recognition and interpretation" },
  ],

  weakAreas: [
    { subject: "Linear Algebra", score: 41, detail: "Struggles with matrix operations and vector spaces" },
    { subject: "Calculus", score: 48, detail: "Needs reinforcement on limits and derivatives" },
    { subject: "Probability", score: 52, detail: "Conceptual gaps in conditional probability" },
  ],

  nextConcepts: [
    {
      label: "Matrices",
      reason: "Foundational for Linear Algebra mastery",
      icon: "grid",
      difficulty: "Medium",
    },
    {
      label: "Functions",
      reason: "Bridges Algebra into Calculus",
      icon: "wave",
      difficulty: "Easy",
    },
    {
      label: "Derivatives",
      reason: "Core Calculus building block",
      icon: "arrow",
      difficulty: "Medium",
    },
  ],

  learningProfile: [
    { trait: "Visual Learner", description: "Grasps concepts best through diagrams and charts", icon: "eye" },
    { trait: "Strong Analytical Thinking", description: "Excels at breaking down complex problems", icon: "brain" },
    { trait: "Needs Mathematical Foundations", description: "Benefits from first-principles explanations", icon: "layers" },
  ],

  careers: [
    { title: "Data Scientist", score: 84, color: "oklch(0.72 0.19 47)" },
    { title: "AI Engineer", score: 68, color: "oklch(0.55 0.20 255)" },
    { title: "Quantitative Researcher", score: 61, color: "oklch(0.58 0.17 145)" },
    { title: "Robotics Engineer", score: 58, color: "oklch(0.55 0.18 320)" },
  ],

  radarData: [
    { subject: "Statistics", score: 88, fullMark: 100 },
    { subject: "Algebra", score: 83, fullMark: 100 },
    { subject: "Data Analysis", score: 79, fullMark: 100 },
    { subject: "Prob. & Logic", score: 52, fullMark: 100 },
    { subject: "Calculus", score: 48, fullMark: 100 },
    { subject: "Linear Algebra", score: 41, fullMark: 100 },
  ],
}
