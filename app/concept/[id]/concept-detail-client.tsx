"use client"

import { useParams } from "next/navigation"
import { NODES, STATUS_META, type GraphNode } from "@/app/graph/data"
import { AppTopBar } from "@/components/app-top-bar"
import {
  Dna,
  ChevronRight,
  BookOpen,
  Video,
  FileText,
  Dumbbell,
  Lock,
  ArrowRight,
  Clock,
  BarChart3,
  Layers,
  Cpu,
  FlaskConical,
  Star,
  BrainCircuit,
  TrendingUp,
  ChevronLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// ── Helpers ────────────────────────────────────────────────────────────────

const resourceIcon = {
  video: Video,
  article: FileText,
  exercise: Dumbbell,
}

const resourceLabel = {
  video: "Video",
  article: "Article",
  exercise: "Exercise",
}

const resourceColor: Record<string, { bg: string; text: string }> = {
  video: { bg: "oklch(0.93 0.07 255)", text: "oklch(0.45 0.18 255)" },
  article: { bg: "oklch(0.93 0.07 145)", text: "oklch(0.38 0.14 145)" },
  exercise: { bg: "oklch(0.95 0.07 47)", text: "oklch(0.50 0.18 47)" },
}

// Per-concept enrichment data (topics, applications, used-in, estimated time, readiness)
const CONCEPT_META: Record<
  string,
  {
    whyMatters: string
    topicsIncluded: string[]
    applications: string[]
    usedIn: { label: string; icon: React.ElementType }[]
    estimatedWeeks: number
    estimatedHoursPerWeek: number
    difficulty: 1 | 2 | 3 | 4 | 5
    practiceReadiness: number
    nextConcepts: string[]
  }
> = {
  algebra: {
    whyMatters:
      "Algebra is the gatekeeper to all quantitative STEM disciplines. Without it you cannot understand calculus, probability, or algorithm analysis. It trains systematic thinking — the ability to manipulate abstract symbols to reach concrete answers.",
    topicsIncluded: [
      "Variables & Expressions",
      "Linear Equations",
      "Quadratic Equations",
      "Polynomials",
      "Systems of Equations",
      "Inequalities",
      "Factoring",
      "Rational Expressions",
    ],
    applications: [
      "Solving optimisation problems",
      "Defining cost and reward functions",
      "Modelling physical systems",
      "Expressing algorithmic relationships",
    ],
    usedIn: [
      { label: "Machine Learning", icon: BrainCircuit },
      { label: "Physics", icon: FlaskConical },
      { label: "Computer Science", icon: Cpu },
      { label: "Finance", icon: TrendingUp },
    ],
    estimatedWeeks: 3,
    estimatedHoursPerWeek: 5,
    difficulty: 1,
    practiceReadiness: 92,
    nextConcepts: ["functions", "trigonometry"],
  },
  functions: {
    whyMatters:
      "Functions are the fundamental abstraction of mathematics — every ML model is a function, every algorithm maps inputs to outputs. Mastering functions unlocks calculus, analysis, and all higher mathematics.",
    topicsIncluded: [
      "Domain & Range",
      "Function Composition",
      "Inverse Functions",
      "Exponential Functions",
      "Logarithmic Functions",
      "Piecewise Functions",
      "Transformations",
      "Parametric Equations",
    ],
    applications: [
      "Defining activation functions in neural nets",
      "Modelling growth and decay",
      "Signal processing",
      "Data transformations",
    ],
    usedIn: [
      { label: "Machine Learning", icon: BrainCircuit },
      { label: "NLP", icon: Layers },
      { label: "Physics", icon: FlaskConical },
      { label: "Computer Science", icon: Cpu },
    ],
    estimatedWeeks: 2,
    estimatedHoursPerWeek: 5,
    difficulty: 1,
    practiceReadiness: 87,
    nextConcepts: ["calculus", "trigonometry"],
  },
  trigonometry: {
    whyMatters:
      "Trigonometry is critical for understanding periodic phenomena, rotations, and wave functions. In ML it underpins positional encoding in Transformers and Fourier-based signal processing.",
    topicsIncluded: [
      "Unit Circle",
      "Sine & Cosine",
      "Tangent & Cotangent",
      "Inverse Trig Functions",
      "Identities & Proofs",
      "Graphs of Trig Functions",
      "Law of Sines/Cosines",
      "Polar Coordinates",
    ],
    applications: [
      "Positional encoding in Transformers",
      "Fourier transforms & signal processing",
      "Rotation matrices in robotics",
      "Wave modelling in physics",
    ],
    usedIn: [
      { label: "NLP", icon: Layers },
      { label: "Robotics", icon: Cpu },
      { label: "Physics", icon: FlaskConical },
      { label: "Computer Vision", icon: Star },
    ],
    estimatedWeeks: 2,
    estimatedHoursPerWeek: 6,
    difficulty: 2,
    practiceReadiness: 81,
    nextConcepts: ["calculus"],
  },
  calculus: {
    whyMatters:
      "Calculus is the mathematics of change — and machine learning is fundamentally about minimising a function through change. Every gradient descent step, every backpropagation pass, every loss landscape is calculus in action.",
    topicsIncluded: [
      "Limits & Continuity",
      "Derivatives & Differentiation Rules",
      "Chain Rule",
      "Partial Derivatives",
      "Integrals",
      "Fundamental Theorem",
      "Multivariable Calculus",
      "Gradient & Divergence",
    ],
    applications: [
      "Backpropagation in neural networks",
      "Gradient descent optimisation",
      "Physics simulation",
      "Probability density functions",
    ],
    usedIn: [
      { label: "Machine Learning", icon: BrainCircuit },
      { label: "NLP", icon: Layers },
      { label: "Physics", icon: FlaskConical },
      { label: "Robotics", icon: Cpu },
    ],
    estimatedWeeks: 4,
    estimatedHoursPerWeek: 7,
    difficulty: 3,
    practiceReadiness: 79,
    nextConcepts: ["linear-algebra", "probability"],
  },
  "linear-algebra": {
    whyMatters:
      "Linear algebra is the native language of neural networks. Every weight matrix, every embedding, every attention head, every convolution is a linear algebraic operation. Without it, modern AI is a black box.",
    topicsIncluded: [
      "Vectors & Scalars",
      "Matrix Operations",
      "Dot Product",
      "Matrix Multiplication",
      "Determinants",
      "Eigenvalues & Eigenvectors",
      "SVD / PCA",
      "Orthogonality & Projections",
    ],
    applications: [
      "Embedding word vectors in NLP",
      "Principal Component Analysis",
      "Image transformations in Computer Vision",
      "Recommendation systems",
    ],
    usedIn: [
      { label: "Machine Learning", icon: BrainCircuit },
      { label: "NLP", icon: Layers },
      { label: "Computer Vision", icon: Star },
      { label: "Robotics", icon: Cpu },
    ],
    estimatedWeeks: 4,
    estimatedHoursPerWeek: 8,
    difficulty: 3,
    practiceReadiness: 54,
    nextConcepts: ["ml"],
  },
  probability: {
    whyMatters:
      "All of machine learning is applied probability theory. Loss functions measure probabilistic error, classifiers output probabilities, and generative models learn probability distributions. Bayesian thinking is the foundation of rigorous data science.",
    topicsIncluded: [
      "Sample Spaces & Events",
      "Conditional Probability",
      "Bayes' Theorem",
      "Random Variables",
      "Distributions (Normal, Binomial, Poisson)",
      "Expected Value & Variance",
      "Law of Large Numbers",
      "Central Limit Theorem",
    ],
    applications: [
      "Naive Bayes classifiers",
      "A/B testing and hypothesis testing",
      "Bayesian inference",
      "Monte Carlo simulation",
    ],
    usedIn: [
      { label: "Machine Learning", icon: BrainCircuit },
      { label: "NLP", icon: Layers },
      { label: "Finance", icon: TrendingUp },
      { label: "Physics", icon: FlaskConical },
    ],
    estimatedWeeks: 3,
    estimatedHoursPerWeek: 6,
    difficulty: 2,
    practiceReadiness: 83,
    nextConcepts: ["statistics"],
  },
  statistics: {
    whyMatters:
      "Statistics is the science of extracting insight from data under uncertainty. It directly powers model evaluation, A/B testing, experimental design, and every data science workflow.",
    topicsIncluded: [
      "Descriptive Statistics",
      "Hypothesis Testing",
      "Confidence Intervals",
      "p-values & Significance",
      "Linear Regression",
      "ANOVA",
      "Maximum Likelihood Estimation",
      "Bayesian vs Frequentist",
    ],
    applications: [
      "Model evaluation and selection",
      "Feature importance analysis",
      "Survey and experiment design",
      "Quality control in engineering",
    ],
    usedIn: [
      { label: "Machine Learning", icon: BrainCircuit },
      { label: "NLP", icon: Layers },
      { label: "Finance", icon: TrendingUp },
      { label: "Computer Science", icon: Cpu },
    ],
    estimatedWeeks: 3,
    estimatedHoursPerWeek: 6,
    difficulty: 2,
    practiceReadiness: 88,
    nextConcepts: ["ml"],
  },
  ml: {
    whyMatters:
      "Machine learning is the engine of modern AI — enabling computers to learn patterns from data without explicit programming. It is the convergence point of your entire STEM foundation and the gateway to Deep Learning and NLP.",
    topicsIncluded: [
      "Supervised Learning",
      "Unsupervised Learning",
      "Regression & Classification",
      "Decision Trees & Ensembles",
      "SVM",
      "k-NN",
      "Gradient Descent",
      "Model Evaluation & Cross-Validation",
    ],
    applications: [
      "Spam detection and content moderation",
      "Recommendation engines",
      "Fraud detection",
      "Medical diagnosis assistance",
    ],
    usedIn: [
      { label: "NLP", icon: Layers },
      { label: "Computer Vision", icon: Star },
      { label: "Robotics", icon: Cpu },
      { label: "Finance", icon: TrendingUp },
    ],
    estimatedWeeks: 6,
    estimatedHoursPerWeek: 8,
    difficulty: 3,
    practiceReadiness: 48,
    nextConcepts: ["deep-learning"],
  },
  "deep-learning": {
    whyMatters:
      "Deep learning is responsible for nearly every AI breakthrough of the past decade — from image recognition to large language models. It is the step from classical ML to the frontier of modern AI research.",
    topicsIncluded: [
      "Artificial Neural Networks",
      "Backpropagation",
      "Activation Functions",
      "Batch Normalisation",
      "Dropout & Regularisation",
      "CNNs",
      "RNNs & LSTMs",
      "Optimisers (Adam, SGD)",
    ],
    applications: [
      "Image classification and segmentation",
      "Speech recognition",
      "Natural language generation",
      "Game playing agents",
    ],
    usedIn: [
      { label: "NLP", icon: Layers },
      { label: "Computer Vision", icon: Star },
      { label: "Robotics", icon: Cpu },
      { label: "Machine Learning", icon: BrainCircuit },
    ],
    estimatedWeeks: 8,
    estimatedHoursPerWeek: 10,
    difficulty: 4,
    practiceReadiness: 26,
    nextConcepts: ["transformers"],
  },
  transformers: {
    whyMatters:
      "Transformers are the architecture powering GPT, BERT, DALL-E, Stable Diffusion, and virtually every state-of-the-art AI system today. Understanding them means understanding the frontier of artificial intelligence.",
    topicsIncluded: [
      "Self-Attention",
      "Multi-Head Attention",
      "Positional Encoding",
      "Encoder-Decoder Architecture",
      "Layer Normalisation",
      "Feed-Forward Networks",
      "BERT & GPT Variants",
      "Fine-Tuning & Prompting",
    ],
    applications: [
      "Large language models (GPT, Claude, Gemini)",
      "Machine translation",
      "Code generation",
      "Image generation (ViT, DALL-E)",
    ],
    usedIn: [
      { label: "NLP", icon: Layers },
      { label: "Computer Vision", icon: Star },
      { label: "Robotics", icon: Cpu },
      { label: "Machine Learning", icon: BrainCircuit },
    ],
    estimatedWeeks: 6,
    estimatedHoursPerWeek: 10,
    difficulty: 5,
    practiceReadiness: 0,
    nextConcepts: [],
  },
}

const DIFFICULTY_LABELS = ["", "Beginner", "Beginner+", "Intermediate", "Advanced", "Expert"]
const DIFFICULTY_COLORS = [
  "",
  "oklch(0.38 0.14 145)",
  "oklch(0.48 0.16 145)",
  "oklch(0.55 0.20 255)",
  "oklch(0.72 0.19 47)",
  "oklch(0.58 0.22 20)",
]
const DIFFICULTY_BG = [
  "",
  "oklch(0.93 0.06 145)",
  "oklch(0.91 0.07 145)",
  "oklch(0.93 0.07 255)",
  "oklch(0.95 0.07 47)",
  "oklch(0.95 0.06 20)",
]

function DifficultyDots({ level }: { level: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="size-2 rounded-full transition-colors"
          style={{
            background: i < level ? DIFFICULTY_COLORS[level] : "oklch(0.91 0 0)",
          }}
        />
      ))}
    </div>
  )
}

function ReadinessRing({ score, color }: { score: number; color: string }) {
  const r = 36
  const circ = 2 * Math.PI * r
  const filled = (score / 100) * circ
  return (
    <svg width="96" height="96" viewBox="0 0 96 96" className="-rotate-90">
      <circle cx="48" cy="48" r={r} fill="none" stroke="oklch(0.93 0 0)" strokeWidth="8" />
      <circle
        cx="48"
        cy="48"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeDasharray={`${filled} ${circ - filled}`}
        strokeLinecap="round"
        className="transition-all duration-700"
      />
    </svg>
  )
}

// ── Main component ────────────────────────────────────────────────────────

export function ConceptDetailClient() {
  const params = useParams<{ id: string }>()
  const node: GraphNode | undefined = NODES.find((n) => n.id === params.id)
  const meta = params.id ? CONCEPT_META[params.id] : undefined

  if (!node || !meta) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center flex flex-col items-center gap-4">
          <div className="size-16 rounded-2xl bg-muted flex items-center justify-center">
            <Layers className="size-7 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Concept not found</h1>
          <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
            The concept you are looking for does not exist or has not been mapped yet.
          </p>
          <Button size="sm" nativeButton={false} render={<a href="/graph" />} className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 mt-2">
            <ChevronLeft className="size-4" />
            Back to Knowledge Graph
          </Button>
        </div>
      </div>
    )
  }

  const statusMeta = STATUS_META[node.status]
  const totalHours = meta.estimatedWeeks * meta.estimatedHoursPerWeek
  const nextNodes = NODES.filter((n) => meta.nextConcepts.includes(n.id))

  return (
    <div className="min-h-screen bg-background">

      {/* ── Navbar ── */}
      <AppTopBar
        pageLabel={node.label}
        parent={{ label: "Knowledge Graph", href: "/graph" }}
        rightSlot={
          <Button
            size="sm"
            variant="ghost"
            className="gap-1.5 text-muted-foreground hover:text-foreground text-xs"
            nativeButton={false}
            render={<a href="/graph" />}
          >
            <ChevronLeft className="size-3.5" />
            <span className="hidden sm:inline">Graph</span>
          </Button>
        }
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

        {/* ── Hero ── */}
        <section className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            <div className="flex flex-col gap-3">
              {/* Subject + status pills */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                  {node.subject}
                </span>
                <span
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{
                    background: `${statusMeta.bg}22`,
                    color: statusMeta.text,
                    border: `1px solid ${statusMeta.bg}44`,
                  }}
                >
                  <span className="size-1.5 rounded-full inline-block" style={{ background: statusMeta.bg }} />
                  {statusMeta.label}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight text-balance">
                {node.label}
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed max-w-xl text-pretty">
                {node.summary}
              </p>
            </div>

            {/* Mastery ring / locked badge */}
            <div className="shrink-0">
              {node.status === "locked" ? (
                <div className="size-24 rounded-2xl bg-muted flex flex-col items-center justify-center gap-1.5">
                  <Lock className="size-6 text-muted-foreground" />
                  <span className="text-[10px] font-semibold text-muted-foreground">Locked</span>
                </div>
              ) : (
                <div className="relative size-24 flex items-center justify-center">
                  <ReadinessRing score={node.mastery} color={statusMeta.bg} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-extrabold tabular-nums" style={{ color: statusMeta.bg }}>
                      {node.mastery}%
                    </span>
                    <span className="text-[9px] font-semibold text-muted-foreground uppercase tracking-wide">
                      mastery
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick-stat row */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Difficulty */}
            <div className="flex flex-col gap-2 p-4 rounded-2xl border border-border bg-card">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                <BarChart3 className="size-3" />
                Difficulty
              </span>
              <DifficultyDots level={meta.difficulty} />
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full self-start"
                style={{
                  background: DIFFICULTY_BG[meta.difficulty],
                  color: DIFFICULTY_COLORS[meta.difficulty],
                }}
              >
                {DIFFICULTY_LABELS[meta.difficulty]}
              </span>
            </div>

            {/* Est. time */}
            <div className="flex flex-col gap-2 p-4 rounded-2xl border border-border bg-card">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                <Clock className="size-3" />
                Estimated Time
              </span>
              <span className="text-2xl font-extrabold text-foreground tabular-nums">{meta.estimatedWeeks}</span>
              <span className="text-xs text-muted-foreground font-medium">
                weeks &mdash; ~{meta.estimatedHoursPerWeek} hrs/wk
              </span>
            </div>

            {/* Total hours */}
            <div className="flex flex-col gap-2 p-4 rounded-2xl border border-border bg-card">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                <BookOpen className="size-3" />
                Total Hours
              </span>
              <span className="text-2xl font-extrabold text-foreground tabular-nums">{totalHours}</span>
              <span className="text-xs text-muted-foreground font-medium">hours of study</span>
            </div>

            {/* Practice Readiness */}
            <div className="flex flex-col gap-2 p-4 rounded-2xl border border-border bg-card">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                <Star className="size-3" />
                Practice Readiness
              </span>
              <span
                className="text-2xl font-extrabold tabular-nums"
                style={{ color: meta.practiceReadiness >= 70 ? "oklch(0.45 0.17 145)" : meta.practiceReadiness >= 40 ? "oklch(0.60 0.18 47)" : "oklch(0.55 0.22 20)" }}
              >
                {meta.practiceReadiness}%
              </span>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${meta.practiceReadiness}%`,
                    background: meta.practiceReadiness >= 70 ? "oklch(0.45 0.17 145)" : meta.practiceReadiness >= 40 ? "oklch(0.60 0.18 47)" : "oklch(0.55 0.22 20)",
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Main 2-col grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── Left column (wide) ── */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Why It Matters */}
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="px-6 py-4 border-b border-border flex items-center gap-2.5">
                <div className="size-7 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BrainCircuit className="size-3.5 text-primary" />
                </div>
                <h2 className="text-sm font-bold text-foreground">Why It Matters</h2>
              </div>
              <div className="px-6 py-5">
                <p className="text-sm text-foreground/80 leading-relaxed">{meta.whyMatters}</p>
              </div>
            </div>

            {/* Topics Included */}
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="size-7 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Layers className="size-3.5 text-primary" />
                  </div>
                  <h2 className="text-sm font-bold text-foreground">Topics Included</h2>
                </div>
                <Badge variant="secondary" className="text-xs font-semibold tabular-nums">
                  {meta.topicsIncluded.length} topics
                </Badge>
              </div>
              <div className="px-6 py-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {meta.topicsIncluded.map((topic, i) => (
                    <div
                      key={topic}
                      className="flex items-center gap-2.5 p-3 rounded-xl border border-border bg-background hover:border-primary/30 transition-colors group"
                    >
                      <span
                        className="size-5 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0"
                        style={{ background: "oklch(0.95 0.07 47)", color: "oklch(0.50 0.18 47)" }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-xs font-medium text-foreground">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Applications */}
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="px-6 py-4 border-b border-border flex items-center gap-2.5">
                <div className="size-7 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FlaskConical className="size-3.5 text-primary" />
                </div>
                <h2 className="text-sm font-bold text-foreground">Applications</h2>
              </div>
              <div className="px-6 py-5">
                <div className="flex flex-col gap-2">
                  {meta.applications.map((app) => (
                    <div key={app} className="flex items-start gap-2.5">
                      <div
                        className="size-1.5 rounded-full mt-1.5 shrink-0"
                        style={{ background: "oklch(0.72 0.19 47)" }}
                      />
                      <span className="text-sm text-foreground/80 leading-relaxed">{app}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Learning Resources */}
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="px-6 py-4 border-b border-border flex items-center gap-2.5">
                <div className="size-7 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BookOpen className="size-3.5 text-primary" />
                </div>
                <h2 className="text-sm font-bold text-foreground">Learning Resources</h2>
              </div>
              <div className="px-6 py-5 flex flex-col gap-2.5">
                {node.resources.map((r) => {
                  const Icon = resourceIcon[r.type]
                  return (
                    <a
                      key={r.title}
                      href={r.url}
                      className="flex items-center gap-3 p-4 rounded-xl border border-border bg-background hover:border-primary/40 hover:shadow-sm transition-all duration-150 group"
                    >
                      <div
                        className="size-9 rounded-xl flex items-center justify-center shrink-0"
                        style={{
                          background: resourceColor[r.type].bg,
                          color: resourceColor[r.type].text,
                        }}
                      >
                        <Icon className="size-4" />
                      </div>
                      <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                        <span className="text-sm font-semibold text-foreground leading-snug truncate">{r.title}</span>
                        <span
                          className="text-[11px] font-medium"
                          style={{ color: resourceColor[r.type].text }}
                        >
                          {resourceLabel[r.type]}
                        </span>
                      </div>
                      <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                    </a>
                  )
                })}
              </div>
            </div>

          </div>

          {/* ── Right column (narrow) ── */}
          <div className="flex flex-col gap-6">

            {/* Prerequisites */}
            {node.prerequisites.length > 0 && (
              <div className="rounded-2xl border border-border bg-card overflow-hidden">
                <div className="px-5 py-4 border-b border-border flex items-center gap-2.5">
                  <div className="size-7 rounded-lg bg-primary/10 flex items-center justify-center">
                    <ChevronLeft className="size-3.5 text-primary" />
                  </div>
                  <h2 className="text-sm font-bold text-foreground">Prerequisites</h2>
                </div>
                <div className="px-5 py-4 flex flex-col gap-2">
                  {node.prerequisites.map((prereq) => {
                    const prereqNode = NODES.find((n) => n.label === prereq)
                    return (
                      <a
                        key={prereq}
                        href={prereqNode ? `/concept/${prereqNode.id}` : "#"}
                        className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl border border-border bg-background hover:border-primary/30 hover:shadow-sm transition-all group"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          {prereqNode && (
                            <span
                              className="size-2 rounded-full shrink-0"
                              style={{ background: STATUS_META[prereqNode.status].bg }}
                            />
                          )}
                          <span className="text-xs font-medium text-foreground truncate">{prereq}</span>
                        </div>
                        <ChevronRight className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                      </a>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Used In */}
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="px-5 py-4 border-b border-border flex items-center gap-2.5">
                <div className="size-7 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Cpu className="size-3.5 text-primary" />
                </div>
                <h2 className="text-sm font-bold text-foreground">Used In</h2>
              </div>
              <div className="px-5 py-4 flex flex-col gap-2">
                {meta.usedIn.map(({ label, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-border bg-background"
                  >
                    <div className="size-7 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <Icon className="size-3.5 text-muted-foreground" />
                    </div>
                    <span className="text-xs font-medium text-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Concepts */}
            {nextNodes.length > 0 && (
              <div className="rounded-2xl border border-border bg-card overflow-hidden">
                <div className="px-5 py-4 border-b border-border flex items-center gap-2.5">
                  <div className="size-7 rounded-lg bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="size-3.5 text-primary" />
                  </div>
                  <h2 className="text-sm font-bold text-foreground">Recommended Next</h2>
                </div>
                <div className="px-5 py-4 flex flex-col gap-2">
                  {nextNodes.map((nextNode) => (
                    <a
                      key={nextNode.id}
                      href={`/concept/${nextNode.id}`}
                      className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl border border-border bg-background hover:border-primary/40 hover:shadow-sm transition-all group"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className="size-2 rounded-full shrink-0"
                          style={{ background: STATUS_META[nextNode.status].bg }}
                        />
                        <span className="text-xs font-medium text-foreground truncate">{nextNode.label}</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="text-[10px] text-muted-foreground font-medium tabular-nums">
                          {nextNode.mastery}%
                        </span>
                        <ChevronRight className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Recommended Next Step */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: "oklch(0.96 0.06 47)", border: "1px solid oklch(0.90 0.09 47)" }}
            >
              <div className="px-5 py-4 border-b flex items-center gap-2.5" style={{ borderColor: "oklch(0.90 0.09 47)" }}>
                <div
                  className="size-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "oklch(0.72 0.19 47)", color: "#fff" }}
                >
                  <ArrowRight className="size-3.5" />
                </div>
                <h2 className="text-sm font-bold" style={{ color: "oklch(0.40 0.15 47)" }}>
                  Your Next Step
                </h2>
              </div>
              <div className="px-5 py-4">
                <p className="text-xs leading-relaxed font-medium" style={{ color: "oklch(0.45 0.14 47)" }}>
                  {node.nextStep}
                </p>
              </div>
            </div>

            {/* CTA */}
            <Button
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2 font-semibold"
              size="sm"
              nativeButton={false}
              render={<a href="/roadmap" />}
              onClick={() => {
                pendo.track("concept_added_to_roadmap", {
                  concept_id: node.id,
                  concept_label: node.label,
                  concept_status: node.status,
                  mastery_percentage: node.mastery,
                  subject: node.subject,
                  source_page: "concept_detail",
                })
              }}
            >
              Add to Learning Roadmap
              <ArrowRight className="size-3.5" />
            </Button>

          </div>
        </div>
      </main>
    </div>
  )
}
