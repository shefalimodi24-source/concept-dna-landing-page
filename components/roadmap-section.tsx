"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle, Lock, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

type RoadmapStepStatus = "done" | "active" | "upcoming" | "locked"

interface RoadmapStep {
  id: string
  title: string
  subtitle: string
  status: RoadmapStepStatus
  duration: string
  resources: number
}

const NLP_ROADMAP: RoadmapStep[] = [
  {
    id: "1",
    title: "Linear Algebra Foundations",
    subtitle: "Vectors, matrices, eigenvalues & SVD",
    status: "done",
    duration: "1 week",
    resources: 12,
  },
  {
    id: "2",
    title: "Probability & Statistics",
    subtitle: "Distributions, Bayes theorem, MLE",
    status: "done",
    duration: "1 week",
    resources: 9,
  },
  {
    id: "3",
    title: "Machine Learning Core",
    subtitle: "Regression, classification, gradient descent",
    status: "active",
    duration: "2 weeks",
    resources: 18,
  },
  {
    id: "4",
    title: "Neural Networks",
    subtitle: "Perceptrons, backprop, CNNs & RNNs",
    status: "upcoming",
    duration: "2 weeks",
    resources: 15,
  },
  {
    id: "5",
    title: "Transformers & Attention",
    subtitle: "Self-attention, BERT, GPT architecture",
    status: "locked",
    duration: "2 weeks",
    resources: 14,
  },
  {
    id: "6",
    title: "NLP Applications",
    subtitle: "Tokenization, fine-tuning, RAG systems",
    status: "locked",
    duration: "2 weeks",
    resources: 16,
  },
]

const STEP_CONFIG: Record<
  RoadmapStepStatus,
  { icon: typeof CheckCircle2; iconClass: string; border: string; bg: string; badge: string; badgeClass: string }
> = {
  done: {
    icon: CheckCircle2,
    iconClass: "text-emerald-500",
    border: "border-emerald-200 bg-emerald-50/50",
    bg: "bg-emerald-500",
    badge: "Completed",
    badgeClass: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
  active: {
    icon: Circle,
    iconClass: "text-primary",
    border: "border-primary/40 bg-primary/5",
    bg: "bg-primary",
    badge: "In Progress",
    badgeClass: "bg-primary/10 text-primary border-primary/20",
  },
  upcoming: {
    icon: Circle,
    iconClass: "text-muted-foreground",
    border: "border-border",
    bg: "bg-secondary",
    badge: "Up Next",
    badgeClass: "bg-secondary text-muted-foreground border-border",
  },
  locked: {
    icon: Lock,
    iconClass: "text-muted-foreground/50",
    border: "border-border opacity-60",
    bg: "bg-muted",
    badge: "Locked",
    badgeClass: "bg-muted text-muted-foreground border-border",
  },
}

export function RoadmapSection() {
  const [expanded, setExpanded] = useState<string | null>("3")

  return (
    <section id="roadmaps" className="py-24" aria-labelledby="roadmaps-heading">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Roadmap Showcase</p>
          <h2
            id="roadmaps-heading"
            className="text-4xl font-bold tracking-tight text-foreground text-balance"
          >
            Your path to Natural Language Processing
          </h2>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed text-pretty">
            An example AI-generated roadmap for a student targeting NLP. Every roadmap is unique — built around your STEM DNA.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Progress bar */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-foreground">Overall Progress</p>
            <p className="text-sm font-bold text-primary">33% complete</p>
          </div>
          <div className="w-full h-2 bg-secondary rounded-full mb-10 overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-700"
              style={{ width: "33%" }}
              role="progressbar"
              aria-valuenow={33}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>

          {/* Steps */}
          <ol className="flex flex-col gap-3" aria-label="NLP Roadmap steps">
            {NLP_ROADMAP.map((step) => {
              const cfg = STEP_CONFIG[step.status]
              const Icon = cfg.icon
              const isExpanded = expanded === step.id
              return (
                <li key={step.id}>
                  <button
                    className={cn(
                      "w-full text-left rounded-xl border px-5 py-4 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                      cfg.border,
                      step.status === "locked" ? "cursor-default" : "cursor-pointer hover:shadow-sm"
                    )}
                    onClick={() => step.status !== "locked" && setExpanded(isExpanded ? null : step.id)}
                    aria-expanded={isExpanded}
                    disabled={step.status === "locked"}
                  >
                    <div className="flex items-center gap-4">
                      <Icon className={cn("size-5 shrink-0", cfg.iconClass)} aria-hidden="true" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-foreground text-sm">{step.title}</span>
                          <Badge
                            variant="outline"
                            className={cn("text-[11px] font-semibold rounded-full px-2 py-0 h-5", cfg.badgeClass)}
                          >
                            {cfg.badge}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{step.subtitle}</p>
                      </div>
                      {step.status !== "locked" && (
                        <ChevronRight
                          className={cn(
                            "size-4 text-muted-foreground shrink-0 transition-transform duration-200",
                            isExpanded && "rotate-90"
                          )}
                          aria-hidden="true"
                        />
                      )}
                    </div>

                    {/* Expanded detail */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-border/60 grid sm:grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">Duration:</span>
                          {step.duration}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">Resources:</span>
                          {step.resources} curated items
                        </div>
                      </div>
                    )}
                  </button>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
