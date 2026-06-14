"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  X, ArrowRight, ArrowLeft, Check, AlertCircle, Dna,
  TrendingUp, Target, Clock, Briefcase, Brain, Zap, ChevronRight,
} from "lucide-react"

// ── Per-goal questions ──────────────────────────────────────────────────────

interface QuizQuestion {
  id: number
  text: string
  options: string[]
  correctIndex: number
  topic: string
}

const NLP_QUESTIONS: QuizQuestion[] = [
  { id: 1, topic: "Text Representation", text: "How would you represent a sentence computationally?", options: ["As a list of numerical tokens", "As an image", "As a database table", "As a binary tree"], correctIndex: 0 },
  { id: 2, topic: "Python / NumPy", text: "Which Python library is most commonly used for numerical computing?", options: ["Flask", "NumPy", "Django", "BeautifulSoup"], correctIndex: 1 },
  { id: 3, topic: "Probability", text: "What does a probability of 0.8 indicate?", options: ["Impossible event", "Event likely to occur", "Guaranteed event", "Random event"], correctIndex: 1 },
  { id: 4, topic: "Linear Algebra", text: "A matrix is best described as:", options: ["A probability distribution", "A rectangular array of numbers", "A neural network", "A sorting algorithm"], correctIndex: 1 },
  { id: 5, topic: "Linear Algebra in NLP", text: "Why is Linear Algebra important in NLP?", options: ["It stores files", "Word embeddings are represented as vectors", "It improves internet speed", "It generates datasets"], correctIndex: 1 },
  { id: 6, topic: "Machine Learning", text: "What is the primary goal of Machine Learning?", options: ["Learn patterns from data", "Build websites", "Store databases", "Create animations"], correctIndex: 0 },
  { id: 7, topic: "Supervised Learning", text: "Which task is an example of supervised learning?", options: ["Customer segmentation", "Predicting movie ratings", "Dimensionality reduction", "Topic clustering"], correctIndex: 1 },
  { id: 8, topic: "Word Embeddings", text: "What is a word embedding?", options: ["A compressed image", "A numerical representation of words", "A database query", "A programming language"], correctIndex: 1 },
  { id: 9, topic: "NLP Tasks", text: "Which NLP task determines whether text is positive or negative?", options: ["Object Detection", "Speech Compression", "Sentiment Analysis", "Clustering"], correctIndex: 2 },
  { id: 10, topic: "Transformers", text: "Why are Transformers important in NLP?", options: ["They organise databases", "They capture relationships between words efficiently", "They compress files", "They improve graphics"], correctIndex: 1 },
  { id: 11, topic: "BERT", text: "BERT is primarily used for:", options: ["Image Recognition", "Natural Language Understanding", "Video Compression", "Robotics"], correctIndex: 1 },
  { id: 12, topic: "GPT", text: "What does GPT stand for?", options: ["General Processing Tool", "Generative Pre-trained Transformer", "Graph Processing Transformer", "Global Prediction Technology"], correctIndex: 1 },
  { id: 13, topic: "Tokenization", text: "What is tokenization?", options: ["Splitting text into smaller units", "Compressing files", "Encrypting data", "Creating vectors"], correctIndex: 0 },
  { id: 14, topic: "RAG", text: "A chatbot that answers questions based on company documents is most likely using:", options: ["CNN", "RAG (Retrieval-Augmented Generation)", "Sorting Algorithms", "Image Segmentation"], correctIndex: 1 },
  { id: 15, topic: "Prerequisites", text: "Which area would most likely be a prerequisite weakness if someone struggles with Transformers?", options: ["HTML", "Linear Algebra", "CSS", "Computer Graphics"], correctIndex: 1 },
]

const ML_QUESTIONS: QuizQuestion[] = [
  { id: 1, topic: "ML Basics", text: "What is the primary goal of supervised learning?", options: ["Cluster data into groups", "Learn a mapping from inputs to outputs using labelled data", "Reduce dimensionality", "Generate synthetic data"], correctIndex: 1 },
  { id: 2, topic: "Mathematics", text: "What does a gradient represent in calculus?", options: ["The area under a curve", "The direction and rate of steepest ascent of a function", "A matrix multiplication", "A probability value"], correctIndex: 1 },
  { id: 3, topic: "Python", text: "Which library is the backbone of data manipulation in Python?", options: ["Matplotlib", "Pandas", "Scikit-learn", "TensorFlow"], correctIndex: 1 },
  { id: 4, topic: "Model Evaluation", text: "Which metric is best for evaluating a model on an imbalanced dataset?", options: ["Accuracy", "F1 Score", "Mean Squared Error", "R² Score"], correctIndex: 1 },
  { id: 5, topic: "Overfitting", text: "A model that performs well on training data but poorly on test data is:", options: ["Underfitting", "Overfitting", "Regularised", "Normalised"], correctIndex: 1 },
  { id: 6, topic: "Linear Algebra", text: "In neural networks, the dot product is used to:", options: ["Compress images", "Compute weighted sums of inputs", "Store weights", "Shuffle training data"], correctIndex: 1 },
  { id: 7, topic: "Algorithms", text: "Gradient descent is used to:", options: ["Sort data", "Minimise a loss function by updating parameters", "Visualise data", "Split datasets"], correctIndex: 1 },
  { id: 8, topic: "Probability", text: "Bayes Theorem is central to which algorithm?", options: ["K-means", "Decision Tree", "Naive Bayes Classifier", "PCA"], correctIndex: 2 },
  { id: 9, topic: "Deep Learning", text: "What is an activation function used for in neural networks?", options: ["Storing weights", "Introducing non-linearity", "Splitting layers", "Normalising inputs"], correctIndex: 1 },
  { id: 10, topic: "Regularisation", text: "L1 regularisation encourages:", options: ["Large weights", "Sparse solutions with some weights going to zero", "Faster convergence", "More training data"], correctIndex: 1 },
  { id: 11, topic: "Clustering", text: "K-means clustering requires you to specify:", options: ["The learning rate", "The number of clusters k upfront", "The loss function", "The test split ratio"], correctIndex: 1 },
  { id: 12, topic: "Statistics", text: "The variance of a dataset measures:", options: ["Its central tendency", "How spread out the values are from the mean", "The maximum value", "The correlation between features"], correctIndex: 1 },
  { id: 13, topic: "CNNs", text: "What makes CNNs especially suitable for image data?", options: ["They have more layers", "They exploit spatial locality via shared weights in convolutional filters", "They train faster", "They require less data"], correctIndex: 1 },
  { id: 14, topic: "Feature Engineering", text: "Normalising input features typically helps because:", options: ["It removes outliers", "It ensures features contribute proportionally during gradient updates", "It adds more features", "It reduces overfitting directly"], correctIndex: 1 },
  { id: 15, topic: "Transfer Learning", text: "Transfer learning is most useful when:", options: ["You have a huge labelled dataset", "You have limited labelled data but a related pre-trained model exists", "Your problem is unsupervised", "You are building a regression model"], correctIndex: 1 },
]

const GENERIC_QUESTIONS: QuizQuestion[] = [
  { id: 1, topic: "Programming", text: "Which of these is a compiled programming language?", options: ["Python", "JavaScript", "C++", "Ruby"], correctIndex: 2 },
  { id: 2, topic: "Mathematics", text: "What is the derivative of a constant?", options: ["1", "0", "The constant itself", "Undefined"], correctIndex: 1 },
  { id: 3, topic: "Data Structures", text: "Which data structure uses LIFO ordering?", options: ["Queue", "Stack", "Linked List", "Hash Map"], correctIndex: 1 },
  { id: 4, topic: "Statistics", text: "The mean, median, and mode are all measures of:", options: ["Variability", "Central tendency", "Correlation", "Distribution shape"], correctIndex: 1 },
  { id: 5, topic: "Algorithms", text: "What is the time complexity of merge sort?", options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"], correctIndex: 1 },
  { id: 6, topic: "Linear Algebra", text: "The determinant of a matrix equals zero means:", options: ["The matrix is invertible", "The matrix is singular (not invertible)", "The matrix is diagonal", "The matrix is symmetric"], correctIndex: 1 },
  { id: 7, topic: "Probability", text: "Two events are independent if:", options: ["They can't both happen", "One occurring does not affect the probability of the other", "They always occur together", "Their probabilities sum to 1"], correctIndex: 1 },
  { id: 8, topic: "Machine Learning", text: "Cross-validation is used to:", options: ["Clean data", "Estimate how well a model generalises to unseen data", "Increase training speed", "Reduce feature count"], correctIndex: 1 },
  { id: 9, topic: "Databases", text: "SQL stands for:", options: ["Structured Queue Language", "Structured Query Language", "Sequential Query Logic", "Simple Query Language"], correctIndex: 1 },
  { id: 10, topic: "Networking", text: "HTTP stands for:", options: ["HyperText Transfer Protocol", "High-Text Transfer Process", "HyperText Transmission Path", "Hosted Text Transfer Protocol"], correctIndex: 0 },
  { id: 11, topic: "Operating Systems", text: "Virtual memory allows programs to:", options: ["Run without a CPU", "Use more memory than physically available via disk swapping", "Access the GPU directly", "Encrypt memory contents"], correctIndex: 1 },
  { id: 12, topic: "Logic", text: "In Boolean algebra, A AND (A OR B) simplifies to:", options: ["B", "A OR B", "A", "A AND B"], correctIndex: 2 },
  { id: 13, topic: "Recursion", text: "A recursive function must have:", options: ["A loop", "A base case to terminate", "Multiple return values", "No parameters"], correctIndex: 1 },
  { id: 14, topic: "Complexity", text: "O(1) time complexity means:", options: ["Linear time", "Constant time regardless of input size", "Logarithmic time", "Quadratic time"], correctIndex: 1 },
  { id: 15, topic: "Python", text: "In Python, a list comprehension [x*2 for x in range(5)] produces:", options: ["[0,2,4,6,8]", "[1,2,4,6,8]", "[2,4,6,8,10]", "[0,1,2,3,4]"], correctIndex: 0 },
]

function getQuestionsForGoal(goalId: string): QuizQuestion[] {
  if (goalId === "nlp") return NLP_QUESTIONS
  if (goalId === "ml" || goalId === "ai") return ML_QUESTIONS
  return GENERIC_QUESTIONS
}

// ── Scoring & results ───────────────────────────────────────────────────────

interface QuizResult {
  goalLabel: string
  goalColor: string
  assessmentScore: number
  readinessScore: number
  strengths: string[]
  weaknesses: string[]
  highestImpactTopic: string
  estimatedMonths: number
  careers: string[]
}

function computeResult(
  answers: (number | null)[],
  questions: QuizQuestion[],
  goalLabel: string,
  goalColor: string,
  goalMonths: number,
  careers: string[],
): QuizResult {
  const correct = answers.filter((a, i) => a === questions[i].correctIndex).length
  const assessmentScore = Math.round((correct / questions.length) * 100)
  const readinessScore = Math.round(assessmentScore * 0.6 + Math.random() * 10)

  // Group by topic: correct = strength, wrong = weakness
  const topicMap: Record<string, { correct: number; total: number }> = {}
  questions.forEach((q, i) => {
    if (!topicMap[q.topic]) topicMap[q.topic] = { correct: 0, total: 0 }
    topicMap[q.topic].total++
    if (answers[i] === q.correctIndex) topicMap[q.topic].correct++
  })

  const strengths: string[] = []
  const weaknesses: string[] = []
  Object.entries(topicMap).forEach(([topic, { correct, total }]) => {
    if (correct / total >= 0.5) strengths.push(topic)
    else weaknesses.push(topic)
  })

  // Highest impact topic = first weakness if any, else first topic
  const highestImpactTopic = weaknesses[0] ?? questions[0].topic

  return {
    goalLabel,
    goalColor,
    assessmentScore,
    readinessScore,
    strengths: strengths.slice(0, 4),
    weaknesses: weaknesses.slice(0, 4),
    highestImpactTopic,
    estimatedMonths: goalMonths,
    careers,
  }
}

// ── Option letter map ───────────────────────────────────────────────────────

const LETTERS = ["A", "B", "C", "D"]

// ── Main modal ──────────────────────────────────────────────────────────────

interface QuizModalProps {
  goalId: string
  goalLabel: string
  goalColor: string
  goalBgColor: string
  goalMonths: number
  careers: string[]
  onClose: () => void
}

export function QuizModal({
  goalId,
  goalLabel,
  goalColor,
  goalBgColor,
  goalMonths,
  careers,
  onClose,
}: QuizModalProps) {
  const router = useRouter()
  const questions = getQuestionsForGoal(goalId)

  const [phase, setPhase] = useState<"quiz" | "results">("quiz")
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null))
  const [revealed, setRevealed] = useState(false)
  const [result, setResult] = useState<QuizResult | null>(null)

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  const question = questions[current]
  const answered = answers[current] !== null
  const progress = ((current) / questions.length) * 100

  function selectOption(idx: number) {
    if (answered) return
    const updated = [...answers]
    updated[current] = idx
    setAnswers(updated)
    setRevealed(true)
  }

  function goNext() {
    if (current < questions.length - 1) {
      setCurrent(current + 1)
      setRevealed(false)
    } else {
      // Compute results
      const r = computeResult(answers, questions, goalLabel, goalColor, goalMonths, careers)
      const correctCount = answers.filter((a, i) => a === questions[i].correctIndex).length
      pendo.track("assessment_completed", {
        goal_id: goalId,
        goal_label: r.goalLabel,
        assessment_score: r.assessmentScore,
        readiness_score: r.readinessScore,
        strengths: r.strengths.join(","),
        weaknesses: r.weaknesses.join(","),
        highest_impact_topic: r.highestImpactTopic,
        estimated_months: r.estimatedMonths,
        questions_answered: answers.filter((a) => a !== null).length,
        total_questions: questions.length,
        correct_count: correctCount,
      })
      setResult(r)
      setPhase("results")
    }
  }

  function goPrev() {
    if (current > 0) {
      setCurrent(current - 1)
      setRevealed(answers[current - 1] !== null)
    }
  }

  const isLast = current === questions.length - 1

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm">
      <div
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-background shadow-2xl border border-border flex flex-col"
        style={{ boxShadow: `0 24px 80px ${goalColor}22, 0 4px 24px rgba(0,0,0,0.12)` }}
      >
        {phase === "quiz" ? (
          <QuizPhase
            question={question}
            questions={questions}
            current={current}
            answers={answers}
            revealed={revealed}
            progress={progress}
            isLast={isLast}
            goalLabel={goalLabel}
            goalColor={goalColor}
            goalBgColor={goalBgColor}
            onSelect={selectOption}
            onNext={goNext}
            onPrev={goPrev}
            onClose={onClose}
          />
        ) : result ? (
          <ResultsPhase
            result={result}
            onContinue={() => {
              pendo.track("onboarding_completed", {
                goal_label: result.goalLabel,
                assessment_score: result.assessmentScore,
                readiness_score: result.readinessScore,
                strengths_count: result.strengths.length,
                weaknesses_count: result.weaknesses.length,
                highest_impact_topic: result.highestImpactTopic,
                estimated_months: result.estimatedMonths,
                target_careers: result.careers.join(","),
              })
              router.push("/dashboard")
            }}
            onClose={onClose}
          />
        ) : null}
      </div>
    </div>
  )
}

// ── Quiz phase ──────────────────────────────────────────────────────────────

interface QuizPhaseProps {
  question: QuizQuestion
  questions: QuizQuestion[]
  current: number
  answers: (number | null)[]
  revealed: boolean
  progress: number
  isLast: boolean
  goalLabel: string
  goalColor: string
  goalBgColor: string
  onSelect: (i: number) => void
  onNext: () => void
  onPrev: () => void
  onClose: () => void
}

function QuizPhase({
  question, questions, current, answers, revealed, progress, isLast,
  goalLabel, goalColor, goalBgColor, onSelect, onNext, onPrev, onClose,
}: QuizPhaseProps) {
  const answered = answers[current] !== null
  const selected = answers[current]

  return (
    <>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm rounded-t-3xl border-b border-border px-6 pt-5 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="size-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: goalColor }}>
              <Dna className="size-3.5 text-white" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground leading-none mb-0.5">
                Goal Assessment
              </p>
              <p className="text-xs font-semibold text-foreground leading-none">{goalLabel}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground font-medium tabular-nums">
              {current + 1} / {questions.length}
            </span>
            <button
              onClick={onClose}
              className="size-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Close quiz"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%`, backgroundColor: goalColor }}
          />
        </div>

        {/* Question navigator dots */}
        <div className="flex gap-1 mt-3 flex-wrap">
          {questions.map((_, i) => {
            const isDone = answers[i] !== null
            const isCurrent = i === current
            return (
              <div
                key={i}
                className="h-1 rounded-full transition-all duration-300"
                style={{
                  width: isCurrent ? "20px" : "8px",
                  backgroundColor: isCurrent ? goalColor : isDone ? goalColor : undefined,
                  opacity: isCurrent ? 1 : isDone ? 0.5 : undefined,
                  backgroundColor: isCurrent ? goalColor : isDone ? goalColor : "oklch(0.92 0.005 255)",
                }}
              />
            )
          })}
        </div>
      </div>

      {/* Question body */}
      <div className="flex-1 px-6 py-6">
        {/* Topic chip */}
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider mb-4"
          style={{ backgroundColor: goalBgColor, color: goalColor }}
        >
          <Brain className="size-2.5" />
          {question.topic}
        </div>

        {/* Question text */}
        <h2 className="text-lg font-bold text-foreground leading-snug mb-6 text-balance">
          {question.text}
        </h2>

        {/* Options */}
        <div className="flex flex-col gap-3">
          {question.options.map((opt, i) => {
            const isSelected = selected === i
            const isCorrect = i === question.correctIndex
            const isWrong = revealed && isSelected && !isCorrect
            const showCorrect = revealed && isCorrect

            return (
              <button
                key={i}
                onClick={() => onSelect(i)}
                disabled={answered && !revealed}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-2xl border text-left transition-all duration-200 group",
                  !answered && "hover:border-border/0 hover:shadow-md hover:bg-muted/30 cursor-pointer",
                  !revealed && "border-border bg-card",
                  showCorrect && "border-transparent",
                  isWrong && "border-transparent",
                  !revealed && isSelected && "border-transparent",
                )}
                style={
                  showCorrect
                    ? { backgroundColor: "oklch(0.93 0.08 145)", borderColor: "oklch(0.55 0.17 145)" }
                    : isWrong
                    ? { backgroundColor: "oklch(0.95 0.07 25)", borderColor: "oklch(0.55 0.19 25)" }
                    : !revealed && isSelected
                    ? { backgroundColor: goalBgColor, borderColor: goalColor }
                    : {}
                }
              >
                {/* Letter badge */}
                <div
                  className={cn(
                    "size-8 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all duration-200",
                  )}
                  style={
                    showCorrect
                      ? { backgroundColor: "oklch(0.55 0.17 145)", color: "#fff" }
                      : isWrong
                      ? { backgroundColor: "oklch(0.55 0.19 25)", color: "#fff" }
                      : !revealed && isSelected
                      ? { backgroundColor: goalColor, color: "#fff" }
                      : { backgroundColor: "oklch(0.96 0.005 255)", color: "oklch(0.45 0.01 255)" }
                  }
                >
                  {showCorrect ? <Check className="size-4" strokeWidth={3} /> : isWrong ? <X className="size-4" strokeWidth={3} /> : LETTERS[i]}
                </div>

                <span
                  className={cn(
                    "text-sm font-medium leading-snug",
                    showCorrect && "text-[oklch(0.35_0.14_145)] font-semibold",
                    isWrong && "text-[oklch(0.40_0.16_25)]",
                    !revealed && isSelected && "font-semibold",
                  )}
                  style={!revealed && isSelected ? { color: goalColor } : {}}
                >
                  {opt}
                </span>
              </button>
            )
          })}
        </div>

        {/* Feedback banner */}
        {revealed && (
          <div
            className="mt-4 flex items-center gap-3 p-3.5 rounded-xl text-sm font-medium"
            style={
              answers[current] === question.correctIndex
                ? { backgroundColor: "oklch(0.93 0.08 145)", color: "oklch(0.35 0.14 145)" }
                : { backgroundColor: "oklch(0.95 0.07 25)", color: "oklch(0.40 0.16 25)" }
            }
          >
            {answers[current] === question.correctIndex
              ? <Check className="size-4 flex-shrink-0" strokeWidth={3} />
              : <AlertCircle className="size-4 flex-shrink-0" />
            }
            {answers[current] === question.correctIndex
              ? "Correct! Great understanding of this concept."
              : `Correct answer: ${LETTERS[question.correctIndex]}. ${question.options[question.correctIndex]}`
            }
          </div>
        )}
      </div>

      {/* Footer nav */}
      <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm rounded-b-3xl border-t border-border px-6 py-4 flex items-center justify-between gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={onPrev}
          disabled={current === 0}
          className="gap-1.5 rounded-xl"
        >
          <ArrowLeft className="size-3.5" />
          Previous
        </Button>

        <div className="flex-1 flex justify-center">
          <span className="text-xs text-muted-foreground">
            {answers.filter((a) => a !== null).length} of {questions.length} answered
          </span>
        </div>

        <Button
          size="sm"
          onClick={onNext}
          disabled={!answered}
          className="gap-1.5 rounded-xl font-semibold"
          style={{ backgroundColor: goalColor, color: "#fff" }}
        >
          {isLast ? "See Results" : "Next"}
          <ArrowRight className="size-3.5" />
        </Button>
      </div>
    </>
  )
}

// ── Results phase ───────────────────────────────────────────────────────────

interface ResultsPhaseProps {
  result: QuizResult
  onContinue: () => void
  onClose: () => void
}

function ResultsPhase({ result, onContinue, onClose }: ResultsPhaseProps) {
  const scoreColor =
    result.assessmentScore >= 70
      ? "oklch(0.50 0.17 145)"
      : result.assessmentScore >= 45
      ? "oklch(0.60 0.19 47)"
      : "oklch(0.50 0.20 25)"

  const scoreBg =
    result.assessmentScore >= 70
      ? "oklch(0.94 0.06 145)"
      : result.assessmentScore >= 45
      ? "oklch(0.95 0.07 47)"
      : "oklch(0.95 0.06 25)"

  return (
    <>
      {/* Header */}
      <div className="px-6 pt-6 pb-5 border-b border-border flex items-start justify-between rounded-t-3xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="size-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: result.goalColor }}>
              <Dna className="size-3 text-white" />
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Assessment Complete
            </p>
          </div>
          <h2 className="text-xl font-bold text-foreground leading-tight">Your STEM DNA Results</h2>
          <p className="text-sm text-muted-foreground mt-1">Goal: <span className="font-semibold text-foreground">{result.goalLabel}</span></p>
        </div>
        <button
          onClick={onClose}
          className="size-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex-shrink-0"
          aria-label="Close"
        >
          <X className="size-4" />
        </button>
      </div>

      {/* Scores */}
      <div className="grid grid-cols-2 gap-4 px-6 pt-5">
        {/* Assessment Score */}
        <div className="flex flex-col items-center gap-2 p-5 rounded-2xl border border-border bg-card">
          <div
            className="size-16 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: scoreBg }}
          >
            <span className="text-2xl font-black" style={{ color: scoreColor }}>
              {result.assessmentScore}%
            </span>
          </div>
          <div className="text-center">
            <p className="text-xs font-bold text-foreground">Assessment Score</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              {result.assessmentScore >= 70 ? "Strong foundation" : result.assessmentScore >= 45 ? "Developing" : "Needs building"}
            </p>
          </div>
        </div>

        {/* Readiness Score */}
        <div className="flex flex-col items-center gap-2 p-5 rounded-2xl border border-border bg-card">
          <div
            className="relative size-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "oklch(0.95 0.04 255)" }}
          >
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 64 64" aria-hidden="true">
              <circle cx="32" cy="32" r="27" fill="none" stroke="oklch(0.90 0.02 255)" strokeWidth="5" />
              <circle
                cx="32" cy="32" r="27" fill="none"
                stroke={result.goalColor}
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 27 * result.readinessScore / 100} ${2 * Math.PI * 27}`}
              />
            </svg>
            <span className="text-base font-black relative z-10" style={{ color: result.goalColor }}>
              {result.readinessScore}%
            </span>
          </div>
          <div className="text-center">
            <p className="text-xs font-bold text-foreground">Readiness Score</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Path readiness</p>
          </div>
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-2 gap-4 px-6 pt-4">
        <div className="rounded-2xl border border-border bg-card px-4 py-3.5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2.5">Strengths</p>
          <div className="flex flex-col gap-1.5">
            {result.strengths.length > 0 ? result.strengths.map((s) => (
              <div key={s} className="flex items-center gap-2">
                <Check className="size-3 flex-shrink-0" style={{ color: "oklch(0.55 0.17 145)" }} strokeWidth={3} />
                <span className="text-xs text-foreground font-medium">{s}</span>
              </div>
            )) : (
              <p className="text-xs text-muted-foreground italic">Keep practising!</p>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card px-4 py-3.5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2.5">Weaknesses</p>
          <div className="flex flex-col gap-1.5">
            {result.weaknesses.length > 0 ? result.weaknesses.map((w) => (
              <div key={w} className="flex items-center gap-2">
                <X className="size-3 flex-shrink-0" style={{ color: "oklch(0.55 0.19 25)" }} strokeWidth={3} />
                <span className="text-xs text-foreground font-medium">{w}</span>
              </div>
            )) : (
              <p className="text-xs text-muted-foreground italic">Excellent work!</p>
            )}
          </div>
        </div>
      </div>

      {/* Key stats */}
      <div className="flex flex-col gap-3 px-6 pt-4">
        {/* Highest impact next topic */}
        <div
          className="flex items-center justify-between p-4 rounded-2xl border"
          style={{ backgroundColor: "oklch(0.96 0.06 47)", borderColor: "oklch(0.85 0.10 47)" }}
        >
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: "oklch(0.72 0.19 47)" }}>
              <Zap className="size-4 text-white" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "oklch(0.55 0.18 47)" }}>
                Highest Impact Next Topic
              </p>
              <p className="text-sm font-bold text-foreground mt-0.5">{result.highestImpactTopic}</p>
            </div>
          </div>
          <ChevronRight className="size-4" style={{ color: "oklch(0.72 0.19 47)" }} />
        </div>

        {/* Estimated roadmap duration */}
        <div className="flex items-center gap-3 p-4 rounded-2xl border border-border bg-card">
          <div className="size-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: "oklch(0.94 0.04 255)" }}>
            <Clock className="size-4" style={{ color: "oklch(0.55 0.20 255)" }} />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Estimated Roadmap Duration</p>
            <p className="text-sm font-bold text-foreground mt-0.5">{result.estimatedMonths} Months</p>
          </div>
        </div>

        {/* Target careers */}
        <div className="flex items-start gap-3 p-4 rounded-2xl border border-border bg-card">
          <div className="size-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "oklch(0.95 0.04 320)" }}>
            <Briefcase className="size-4" style={{ color: "oklch(0.50 0.16 320)" }} />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Target Careers</p>
            <div className="flex flex-wrap gap-1.5">
              {result.careers.map((c) => (
                <span
                  key={c}
                  className="px-2.5 py-1 rounded-full text-[10px] font-semibold"
                  style={{ backgroundColor: result.goalColor + "18", color: result.goalColor }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 py-5 mt-2">
        <Button
          size="lg"
          onClick={onContinue}
          className="w-full gap-2 font-semibold rounded-2xl h-12"
          style={{ backgroundColor: result.goalColor, color: "#fff" }}
        >
          Generate My Full Learning Roadmap
          <ArrowRight className="size-4" />
        </Button>
        <p className="text-center text-[10px] text-muted-foreground mt-2.5">
          Your personalised roadmap will be built based on these results
        </p>
      </div>
    </>
  )
}
