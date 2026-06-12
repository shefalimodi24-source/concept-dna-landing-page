"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dna, Search, ArrowRight, Check, Clock, BookOpen,
  Brain, Cpu, Eye, Shield, Database, Atom, Bot, X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { QuizModal } from "./quiz-modal"

// ── Goal data ─────────────────────────────────────────────────────────────────

interface Goal {
  id: string
  label: string
  icon: React.ElementType
  concepts: number
  months: number
  careers: string[]
  description: string
  color: string
  bgColor: string
}

const GOALS: Goal[] = [
  {
    id: "nlp",
    label: "Natural Language Processing",
    icon: Brain,
    concepts: 42,
    months: 8,
    careers: ["NLP Engineer", "ML Engineer", "AI Researcher"],
    description: "Master text processing, embeddings, transformers and large language models.",
    color: "oklch(0.55 0.20 255)",
    bgColor: "oklch(0.94 0.04 255)",
  },
  {
    id: "ml",
    label: "Machine Learning",
    icon: Cpu,
    concepts: 38,
    months: 7,
    careers: ["ML Engineer", "Data Scientist", "AI Engineer"],
    description: "Learn supervised and unsupervised learning, model training, and evaluation.",
    color: "oklch(0.72 0.19 47)",
    bgColor: "oklch(0.95 0.07 47)",
  },
  {
    id: "ai",
    label: "Artificial Intelligence",
    icon: Bot,
    concepts: 52,
    months: 10,
    careers: ["AI Engineer", "Research Scientist", "AI Architect"],
    description: "Broad foundation covering search, reasoning, planning, and modern deep learning.",
    color: "oklch(0.50 0.16 320)",
    bgColor: "oklch(0.95 0.04 320)",
  },
  {
    id: "robotics",
    label: "Robotics",
    icon: Bot,
    concepts: 35,
    months: 9,
    careers: ["Robotics Engineer", "Control Systems Engineer", "Automation Engineer"],
    description: "Kinematics, dynamics, control theory, sensors, and autonomous navigation.",
    color: "oklch(0.48 0.17 165)",
    bgColor: "oklch(0.93 0.05 165)",
  },
  {
    id: "cv",
    label: "Computer Vision",
    icon: Eye,
    concepts: 36,
    months: 7,
    careers: ["CV Engineer", "ML Engineer", "Perception Engineer"],
    description: "Image processing, CNNs, object detection, segmentation, and 3D vision.",
    color: "oklch(0.45 0.16 145)",
    bgColor: "oklch(0.93 0.06 145)",
  },
  {
    id: "ds",
    label: "Data Science",
    icon: Database,
    concepts: 30,
    months: 6,
    careers: ["Data Scientist", "Analyst", "BI Engineer"],
    description: "Statistics, data wrangling, visualisation, and predictive modelling.",
    color: "oklch(0.55 0.18 80)",
    bgColor: "oklch(0.95 0.06 80)",
  },
  {
    id: "quantum",
    label: "Quantum Computing",
    icon: Atom,
    concepts: 44,
    months: 12,
    careers: ["Quantum Engineer", "Research Scientist", "Algorithm Developer"],
    description: "Quantum mechanics, qubits, quantum gates, and quantum algorithms.",
    color: "oklch(0.50 0.20 280)",
    bgColor: "oklch(0.94 0.05 280)",
  },
  {
    id: "cyber",
    label: "Cybersecurity",
    icon: Shield,
    concepts: 33,
    months: 7,
    careers: ["Security Engineer", "Penetration Tester", "Security Analyst"],
    description: "Cryptography, network security, ethical hacking, and threat modelling.",
    color: "oklch(0.48 0.18 25)",
    bgColor: "oklch(0.95 0.05 25)",
  },
  {
    id: "bio",
    label: "Bioinformatics",
    icon: BookOpen,
    concepts: 40,
    months: 10,
    careers: ["Bioinformatician", "Computational Biologist", "Research Scientist"],
    description: "Genomics, sequence analysis, biological data mining, and structural biology.",
    color: "oklch(0.48 0.17 155)",
    bgColor: "oklch(0.93 0.05 155)",
  },
]

// ── Mini graph preview SVG ────────────────────────────────────────────────────

const PREVIEW_NODES = [
  { x: 48,  y: 52,  r: 12, status: "mastered" },
  { x: 110, y: 30,  r: 9,  status: "mastered" },
  { x: 168, y: 58,  r: 13, status: "learning" },
  { x: 238, y: 36,  r: 10, status: "learning" },
  { x: 48,  y: 120, r: 9,  status: "mastered" },
  { x: 118, y: 110, r: 11, status: "learning" },
  { x: 192, y: 128, r: 10, status: "locked" },
  { x: 268, y: 112, r: 12, status: "locked" },
  { x: 80,  y: 180, r: 10, status: "locked" },
  { x: 158, y: 190, r: 9,  status: "locked" },
  { x: 230, y: 178, r: 11, status: "locked" },
]
const PREVIEW_EDGES = [[0,1],[1,2],[2,3],[0,4],[1,5],[4,5],[5,6],[3,7],[5,7],[4,8],[8,9],[7,10],[9,10]]

function MiniGraph({ primaryColor }: { primaryColor: string }) {
  return (
    <svg viewBox="0 0 300 220" className="w-full h-full" aria-hidden="true">
      <defs>
        <radialGradient id="pg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={primaryColor} stopOpacity="0.18" />
          <stop offset="100%" stopColor={primaryColor} stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="150" cy="110" rx="140" ry="100" fill="url(#pg-glow)" />
      {PREVIEW_EDGES.map(([a, b], i) => {
        const na = PREVIEW_NODES[a], nb = PREVIEW_NODES[b]
        const active = na.status !== "locked" && nb.status !== "locked"
        return (
          <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
            stroke={active ? primaryColor : "#cbd5e1"}
            strokeWidth={active ? 1.5 : 1}
            strokeOpacity={active ? 0.55 : 0.25}
            strokeDasharray={active ? "none" : "3 2"}
          />
        )
      })}
      {PREVIEW_NODES.map((n, i) => {
        const color = n.status === "mastered" ? primaryColor : n.status === "learning" ? primaryColor : "#94a3b8"
        const opacity = n.status === "locked" ? 0.35 : n.status === "mastered" ? 1 : 0.75
        return (
          <g key={i}>
            {n.status !== "locked" && <circle cx={n.x} cy={n.y} r={n.r + 5} fill={color} fillOpacity={0.12} />}
            <circle cx={n.x} cy={n.y} r={n.r} fill={n.status === "locked" ? "#f1f5f9" : color} fillOpacity={opacity}
              stroke={color} strokeWidth={n.status === "locked" ? 1 : 1.5} strokeOpacity={n.status === "locked" ? 0.4 : 0.7} />
          </g>
        )
      })}
    </svg>
  )
}

// ── Page component ────────────────────────────────────────────────────────────

export default function OnboardingPage() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    if (!q) return GOALS
    return GOALS.filter(
      (g) => g.label.toLowerCase().includes(q) || g.description.toLowerCase().includes(q)
    )
  }, [search])

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  // Aggregate preview data from selected goals
  const preview = useMemo(() => {
    if (selected.length === 0) return null
    const goals = GOALS.filter((g) => selected.includes(g.id))
    const totalConcepts = goals.reduce((a, g) => a + g.concepts, 0)
    const maxMonths = Math.max(...goals.map((g) => g.months))
    const careers = [...new Set(goals.flatMap((g) => g.careers))].slice(0, 4)
    const primaryGoal = goals[0]
    return { goals, totalConcepts, maxMonths, careers, primaryGoal }
  }, [selected])

  function handleGenerate() {
    if (!selected.length) return
    setShowQuiz(true)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {showQuiz && preview && (
        <QuizModal
          goalId={preview.primaryGoal.id}
          goalLabel={preview.primaryGoal.label}
          goalColor={preview.primaryGoal.color}
          goalBgColor={preview.primaryGoal.bgColor}
          goalMonths={preview.maxMonths}
          careers={preview.careers}
          onClose={() => setShowQuiz(false)}
        />
      )}

      {/* Sticky top bar */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <div className="size-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "oklch(0.72 0.19 47)" }}>
              <Dna className="size-4 text-white" />
            </div>
            <span className="font-bold text-base text-foreground tracking-tight">
              Concept <span style={{ color: "oklch(0.72 0.19 47)" }}>DNA</span>
            </span>
          </a>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="hidden sm:block">Step 2 of 3</span>
            <div className="flex gap-1">
              {[1,2,3].map((s) => (
                <div key={s} className={cn("h-1.5 rounded-full transition-all duration-300",
                  s === 1 ? "w-6" : s === 2 ? "w-6" : "w-3",
                  s <= 2 ? "bg-primary" : "bg-border"
                )} />
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-10 lg:py-14">
        <div className="grid lg:grid-cols-[1fr_360px] gap-10 lg:gap-12 items-start">

          {/* ── Left: Goal selector ── */}
          <div className="flex flex-col gap-8">

            {/* Header */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "oklch(0.72 0.19 47)" }}>
                Learning Goals
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight text-balance leading-[1.15]">
                What do you want to learn?
              </h1>
              <p className="mt-3 text-base text-muted-foreground leading-relaxed text-pretty max-w-lg">
                We&apos;ll personalise your STEM journey based on your goals. Select one or more topics.
              </p>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Search any STEM topic..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-11 pl-10 pr-10 rounded-xl border border-input bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-ring transition-colors shadow-sm"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Clear search"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            {/* Selected chips */}
            {selected.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selected.map((id) => {
                  const g = GOALS.find((x) => x.id === id)!
                  return (
                    <button
                      key={id}
                      onClick={() => toggle(id)}
                      className="flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 hover:opacity-80"
                      style={{ backgroundColor: g.bgColor, borderColor: g.color, color: g.color }}
                    >
                      {g.label}
                      <X className="size-3" />
                    </button>
                  )
                })}
                <button
                  onClick={() => setSelected([])}
                  className="flex items-center gap-1 pl-3 pr-2 py-1.5 rounded-full text-xs font-medium text-muted-foreground border border-border hover:text-foreground hover:border-foreground/30 transition-colors"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Popular Goals label */}
            {!search && (
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground -mb-4">
                Popular Goals
              </p>
            )}

            {/* Goal cards grid */}
            <div className="grid sm:grid-cols-2 gap-3">
              {filtered.length > 0 ? filtered.map((goal) => {
                const Icon = goal.icon
                const isSelected = selected.includes(goal.id)
                return (
                  <button
                    key={goal.id}
                    onClick={() => toggle(goal.id)}
                    className={cn(
                      "relative flex flex-col gap-3 p-4 rounded-2xl border text-left transition-all duration-200 group",
                      isSelected
                        ? "shadow-md"
                        : "border-border bg-card hover:border-border/0 hover:shadow-md"
                    )}
                    style={isSelected ? {
                      borderColor: goal.color,
                      backgroundColor: goal.bgColor,
                      boxShadow: `0 4px 20px ${goal.color}22`,
                    } : {}}
                  >
                    {/* Check badge */}
                    <div className={cn(
                      "absolute top-3 right-3 size-5 rounded-full border-2 flex items-center justify-center transition-all duration-200",
                      isSelected ? "border-transparent" : "border-border bg-background group-hover:border-muted-foreground/40"
                    )}
                      style={isSelected ? { backgroundColor: goal.color } : {}}
                    >
                      {isSelected && <Check className="size-3 text-white" strokeWidth={3} />}
                    </div>

                    {/* Icon */}
                    <div
                      className="size-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: isSelected ? goal.color : goal.bgColor }}
                    >
                      <Icon className="size-5" style={{ color: isSelected ? "#fff" : goal.color }} />
                    </div>

                    {/* Label + description */}
                    <div className="flex flex-col gap-1 pr-5">
                      <span className={cn(
                        "text-sm font-semibold leading-tight",
                        isSelected ? "text-foreground" : "text-foreground"
                      )}>
                        {goal.label}
                      </span>
                      <span className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {goal.description}
                      </span>
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-3 mt-auto">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Brain className="size-3" />
                        {goal.concepts} concepts
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="size-3" />
                        {goal.months} months
                      </span>
                    </div>
                  </button>
                )
              }) : (
                <div className="sm:col-span-2 flex flex-col items-center justify-center py-16 text-center gap-3">
                  <Search className="size-8 text-muted-foreground/40" />
                  <p className="text-sm text-muted-foreground">No topics found for &quot;{search}&quot;</p>
                  <button onClick={() => setSearch("")} className="text-xs text-primary hover:underline font-medium">
                    Clear search
                  </button>
                </div>
              )}
            </div>

            {/* Mobile CTA */}
            <div className="lg:hidden">
              <Button
                size="lg"
                disabled={selected.length === 0 || loading}
                onClick={handleGenerate}
                className="w-full gap-2 font-semibold rounded-xl h-12"
                style={{ backgroundColor: "oklch(0.72 0.19 47)", color: "#fff" }}
              >
                {loading ? "Preparing your path..." : "Generate My Learning Path"}
                {!loading && <ArrowRight className="size-4" />}
              </Button>
            </div>
          </div>

          {/* ── Right: Preview panel ── */}
          <div className="hidden lg:flex flex-col gap-5 sticky top-24">

            {preview ? (
              <>
                {/* Header */}
                <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
                  {/* Graph preview */}
                  <div
                    className="relative px-6 pt-6 pb-4"
                    style={{ background: `linear-gradient(135deg, ${preview.primaryGoal.bgColor}, oklch(0.99 0 0))` }}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                          Selected Goal{preview.goals.length > 1 ? "s" : ""}
                        </p>
                        <p className="text-sm font-bold text-foreground mt-0.5 leading-tight text-balance">
                          {preview.goals.length === 1
                            ? preview.primaryGoal.label
                            : `${preview.primaryGoal.label} +${preview.goals.length - 1} more`
                          }
                        </p>
                      </div>
                      <div
                        className="size-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: preview.primaryGoal.color }}
                      >
                        {(() => { const Icon = preview.primaryGoal.icon; return <Icon className="size-4 text-white" /> })()}
                      </div>
                    </div>

                    <div className="h-[160px] mt-3">
                      <MiniGraph primaryColor={preview.primaryGoal.color} />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 divide-x divide-border border-t border-border">
                    <div className="flex flex-col gap-0.5 px-5 py-4">
                      <span className="text-xl font-bold text-foreground">{preview.totalConcepts}</span>
                      <span className="text-xs text-muted-foreground">Estimated Concepts</span>
                    </div>
                    <div className="flex flex-col gap-0.5 px-5 py-4">
                      <span className="text-xl font-bold text-foreground">{preview.maxMonths}<span className="text-sm font-medium text-muted-foreground ml-1">mo</span></span>
                      <span className="text-xs text-muted-foreground">Estimated Learning Time</span>
                    </div>
                  </div>
                </div>

                {/* Career paths */}
                <div className="rounded-2xl border border-border bg-card px-5 py-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Career Paths</p>
                  <div className="flex flex-col gap-2">
                    {preview.careers.map((c) => (
                      <div key={c} className="flex items-center gap-2.5">
                        <div className="size-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "oklch(0.72 0.19 47)" }} />
                        <span className="text-sm font-medium text-foreground">{c}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* What you'll get */}
                <div className="rounded-2xl border border-border bg-card px-5 py-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">What you&apos;ll get</p>
                  <div className="flex flex-col gap-2.5">
                    {[
                      "Personalised STEM DNA knowledge graph",
                      "AI-generated step-by-step roadmap",
                      "Gap analysis & concept dependencies",
                      "Curated resources per concept",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-2.5">
                        <div className="size-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: "oklch(0.95 0.07 47)" }}>
                          <Check className="size-2.5" style={{ color: "oklch(0.72 0.19 47)" }} strokeWidth={3} />
                        </div>
                        <span className="text-xs text-muted-foreground leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Primary CTA */}
                <Button
                  size="lg"
                  onClick={handleGenerate}
                  disabled={loading}
                  className="w-full gap-2 font-semibold rounded-xl h-12 shadow-md"
                  style={{ backgroundColor: "oklch(0.72 0.19 47)", color: "#fff" }}
                >
                  {loading ? "Preparing your path..." : "Generate My Learning Path"}
                  {!loading && <ArrowRight className="size-4" />}
                </Button>
              </>
            ) : (
              /* Empty state */
              <div className="rounded-2xl border border-dashed border-border bg-card/50 flex flex-col items-center justify-center gap-4 p-10 text-center min-h-[460px]">
                <div className="size-14 rounded-2xl bg-muted flex items-center justify-center">
                  <Brain className="size-6 text-muted-foreground/50" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">No goal selected yet</p>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed max-w-[180px]">
                    Pick one or more learning goals to preview your personalised path.
                  </p>
                </div>

                {/* Placeholder bars */}
                <div className="w-full flex flex-col gap-2.5 mt-2">
                  {[80, 60, 72, 50].map((w, i) => (
                    <div key={i} className="h-3 rounded-full bg-muted animate-pulse" style={{ width: `${w}%`, opacity: 1 - i * 0.15 }} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
