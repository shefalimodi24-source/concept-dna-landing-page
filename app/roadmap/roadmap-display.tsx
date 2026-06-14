"use client"

import { useState } from "react"
import {
  ChevronDown,
  ChevronUp,
  Clock,
  BookOpen,
  Play,
  Code2,
  FileText,
  CheckCircle2,
  Circle,
  Sparkles,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { GeneratedRoadmap, RoadmapStep, ResourceType, Difficulty } from "./data"

const DIFFICULTY_META: Record<Difficulty, { label: string; bg: string; color: string }> = {
  Beginner:     { label: "Beginner",     bg: "oklch(0.93 0.07 145)", color: "oklch(0.38 0.16 145)" },
  Intermediate: { label: "Intermediate", bg: "oklch(0.95 0.07 47)",  color: "oklch(0.48 0.18 47)"  },
  Advanced:     { label: "Advanced",     bg: "oklch(0.94 0.06 20)",  color: "oklch(0.50 0.22 20)"  },
}

const RESOURCE_META: Record<ResourceType, { icon: React.ReactNode; label: string; color: string }> = {
  video:    { icon: <Play    className="size-3" />, label: "Video",    color: "oklch(0.50 0.22 20)"  },
  article:  { icon: <FileText className="size-3" />, label: "Article", color: "oklch(0.45 0.18 255)" },
  course:   { icon: <BookOpen className="size-3" />, label: "Course",  color: "oklch(0.48 0.16 145)" },
  practice: { icon: <Code2   className="size-3" />, label: "Practice", color: "oklch(0.50 0.17 320)" },
}

function StepCard({
  step,
  index,
  total,
  completed,
  onToggleComplete,
}: {
  step: RoadmapStep
  index: number
  total: number
  completed: boolean
  onToggleComplete: () => void
}) {
  const [expanded, setExpanded] = useState(index === 0)
  const diff = DIFFICULTY_META[step.difficulty]
  const isLast = index === total - 1

  return (
    <div className="flex gap-4">
      {/* Timeline spine */}
      <div className="flex flex-col items-center shrink-0 pt-1">
        <button
          onClick={onToggleComplete}
          aria-label={completed ? "Mark incomplete" : "Mark complete"}
          className="size-7 rounded-full border-2 flex items-center justify-center transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring/50"
          style={{
            borderColor: completed ? "oklch(0.58 0.17 145)" : "oklch(0.82 0.005 255)",
            background: completed ? "oklch(0.93 0.07 145)" : "oklch(1 0 0)",
          }}
        >
          {completed
            ? <CheckCircle2 className="size-4" style={{ color: "oklch(0.42 0.16 145)" }} />
            : <Circle className="size-4 text-muted-foreground/40" />
          }
        </button>
        {!isLast && (
          <div
            className="w-px flex-1 min-h-[2rem] mt-2 transition-colors"
            style={{ background: completed ? "oklch(0.82 0.10 145)" : "oklch(0.90 0.005 255)" }}
          />
        )}
      </div>

      {/* Card */}
      <div
        className={cn(
          "flex-1 rounded-2xl border bg-card transition-all duration-200 overflow-hidden mb-4",
          completed ? "border-border/50 opacity-75" : "border-border hover:shadow-sm"
        )}
      >
        {/* Header */}
        <button
          onClick={() => setExpanded((e) => !e)}
          className="w-full text-left px-5 py-4 flex items-start gap-3 group"
        >
          {/* Step number */}
          <span
            className="shrink-0 size-6 rounded-lg flex items-center justify-center text-[11px] font-bold mt-0.5"
            style={{
              background: completed ? "oklch(0.93 0.07 145)" : "oklch(0.95 0.07 47)",
              color:      completed ? "oklch(0.42 0.16 145)" : "oklch(0.52 0.18 47)",
            }}
          >
            {index + 1}
          </span>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className={cn("text-sm font-semibold leading-snug", completed && "line-through text-muted-foreground")}>
                {step.title}
              </h3>
              <span
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0"
                style={{ background: diff.bg, color: diff.color }}
              >
                {diff.label}
              </span>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <Clock className="size-3" />
                {step.estimatedTime}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <BookOpen className="size-3" />
                {step.resources.length} resources
              </span>
            </div>
          </div>

          <span className="text-muted-foreground shrink-0 mt-1">
            {expanded
              ? <ChevronUp className="size-4" />
              : <ChevronDown className="size-4" />
            }
          </span>
        </button>

        {/* Expanded body */}
        {expanded && (
          <div className="px-5 pb-5 flex flex-col gap-4 border-t border-border pt-4">
            <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>

            {/* Skills */}
            <div className="flex flex-wrap gap-1.5">
              {step.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-[11px] font-medium px-2.5 py-0.5 rounded-full border border-border bg-muted text-muted-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Resources */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Resources</span>
              <div className="flex flex-col gap-1.5">
                {step.resources.map((resource) => {
                  const rm = RESOURCE_META[resource.type]
                  return (
                    <div
                      key={resource.title}
                      className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl border border-border bg-background hover:bg-muted/40 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className="shrink-0 size-5 rounded-md flex items-center justify-center"
                          style={{ background: "oklch(0.95 0.03 255)", color: rm.color }}
                        >
                          {rm.icon}
                        </span>
                        <span className="text-xs font-medium text-foreground truncate group-hover:text-primary transition-colors">
                          {resource.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                          style={{ background: "oklch(0.95 0.03 255)", color: rm.color }}
                        >
                          {rm.label}
                        </span>
                        <span className="text-[11px] text-muted-foreground">{resource.duration}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function RoadmapDisplay({ roadmap }: { roadmap: GeneratedRoadmap }) {
  const [completed, setCompleted] = useState<Set<number>>(new Set())

  const toggleComplete = (id: number) => {
    const wasCompleted = completed.has(id)
    setCompleted((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

    if (typeof window !== "undefined" && window.pendo) {
      const step = roadmap.steps.find((s) => s.id === id)
      const stepIndex = roadmap.steps.findIndex((s) => s.id === id)
      const newCompletedCount = wasCompleted ? completedCount - 1 : completedCount + 1
      pendo.track("roadmap_step_completed", {
        step_id: id,
        step_title: step?.title ?? "",
        step_index: stepIndex,
        is_completed: !wasCompleted,
        completed_count: newCompletedCount,
        total_steps: totalSteps,
        progress_percentage: Math.round((newCompletedCount / totalSteps) * 100),
        roadmap_topic: roadmap.topic,
      })
    }
  }

  const completedCount = completed.size
  const totalSteps = roadmap.steps.length
  const progressPct = Math.round((completedCount / totalSteps) * 100)

  return (
    <div className="flex flex-col gap-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
      {/* Roadmap header card */}
      <div className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <Sparkles className="size-3.5 text-primary" />
              <span className="text-[11px] font-semibold uppercase tracking-widest text-primary">
                AI-Generated Roadmap
              </span>
            </div>
            <h2 className="text-xl font-bold text-foreground text-balance leading-snug">
              {roadmap.topic}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mt-1">
              {roadmap.overview}
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap gap-3 pt-1">
          {[
            { label: "Total Steps",  value: `${totalSteps} modules`       },
            { label: "Est. Duration", value: roadmap.totalTime             },
            { label: "Completed",    value: `${completedCount}/${totalSteps}` },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col gap-0.5 px-4 py-2.5 rounded-xl bg-muted/60 border border-border"
            >
              <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">
                {stat.label}
              </span>
              <span className="text-sm font-bold text-foreground">{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-medium">Your progress</span>
            <span className="text-xs font-bold tabular-nums" style={{ color: "oklch(0.42 0.16 145)" }}>
              {progressPct}%
            </span>
          </div>
          <div className="h-2 rounded-full bg-border overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progressPct}%`,
                background: "oklch(0.58 0.17 145)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="flex flex-col">
        {roadmap.steps.map((step, i) => (
          <StepCard
            key={step.id}
            step={step}
            index={i}
            total={totalSteps}
            completed={completed.has(step.id)}
            onToggleComplete={() => toggleComplete(step.id)}
          />
        ))}
      </div>
    </div>
  )
}
