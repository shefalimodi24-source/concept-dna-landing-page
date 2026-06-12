"use client"

import { cn } from "@/lib/utils"
import { type Question } from "./data"
import { CheckCheck, CircleDot, Circle } from "lucide-react"

interface QuestionNavigatorProps {
  questions: Question[]
  currentIndex: number
  answers: (number | null)[]
  onNavigate: (index: number) => void
}

export function QuestionNavigator({
  questions,
  currentIndex,
  answers,
  onNavigate,
}: QuestionNavigatorProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1">
        Question Navigator
      </p>
      <div className="grid grid-cols-8 gap-1.5">
        {questions.map((q, i) => {
          const answered = answers[i] !== null
          const isCurrent = i === currentIndex

          return (
            <button
              key={q.id}
              onClick={() => onNavigate(i)}
              title={`Question ${i + 1}: ${q.topic}`}
              className={cn(
                "size-8 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center justify-center border",
                isCurrent &&
                  "bg-primary text-primary-foreground border-primary shadow-sm",
                !isCurrent && answered &&
                  "bg-[oklch(0.95_0.05_145)] text-[oklch(0.45_0.17_145)] border-[oklch(0.85_0.08_145)]",
                !isCurrent && !answered &&
                  "bg-muted text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
              )}
            >
              {i + 1}
            </button>
          )
        })}
      </div>
      {/* Legend */}
      <div className="flex items-center gap-4 pt-1">
        <div className="flex items-center gap-1.5">
          <div className="size-3 rounded bg-primary" />
          <span className="text-xs text-muted-foreground">Current</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="size-3 rounded bg-[oklch(0.85_0.08_145)]" />
          <span className="text-xs text-muted-foreground">Answered</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="size-3 rounded bg-muted border border-border" />
          <span className="text-xs text-muted-foreground">Skipped</span>
        </div>
      </div>
    </div>
  )
}
