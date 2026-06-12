"use client"

import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { Clock, BarChart3, Dna, CheckCircle2 } from "lucide-react"
import { type Question } from "./data"
import { QuestionNavigator } from "./question-navigator"

interface SidebarPanelProps {
  questions: Question[]
  currentIndex: number
  answers: (number | null)[]
  timeRemainingSeconds: number
  onNavigate: (index: number) => void
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, "0")}`
}

const subjectSummary: { subject: string; color: string }[] = [
  { subject: "Mathematics", color: "bg-[oklch(0.55_0.20_255)]" },
  { subject: "Statistics", color: "bg-[oklch(0.58_0.17_145)]" },
  { subject: "Computer Science", color: "bg-[oklch(0.72_0.19_47)]" },
  { subject: "Physics", color: "bg-[oklch(0.55_0.18_320)]" },
  { subject: "Linear Algebra", color: "bg-[oklch(0.55_0.20_255)]" },
]

export function SidebarPanel({
  questions,
  currentIndex,
  answers,
  timeRemainingSeconds,
  onNavigate,
}: SidebarPanelProps) {
  const answered = answers.filter((a) => a !== null).length
  const progress = Math.round((answered / questions.length) * 100)
  const timeWarning = timeRemainingSeconds < 120

  return (
    <aside className="flex flex-col gap-5">
      {/* Assessment Progress Card */}
      <div className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-4 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-lg bg-primary/10 flex items-center justify-center">
            <BarChart3 className="size-4 text-primary" />
          </div>
          <h3 className="font-semibold text-sm text-foreground">Assessment Progress</h3>
        </div>

        {/* Progress bar */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-baseline">
            <span className="text-xs text-muted-foreground">
              {answered} of {questions.length} answered
            </span>
            <span className="text-sm font-bold text-foreground">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-muted p-3 flex flex-col gap-0.5">
            <span className="text-xs text-muted-foreground">Answered</span>
            <span className="text-lg font-bold text-foreground">{answered}</span>
          </div>
          <div className="rounded-xl bg-muted p-3 flex flex-col gap-0.5">
            <span className="text-xs text-muted-foreground">Remaining</span>
            <span className="text-lg font-bold text-foreground">
              {questions.length - answered}
            </span>
          </div>
        </div>
      </div>

      {/* Time Remaining Card */}
      <div
        className={cn(
          "rounded-2xl border p-5 flex flex-col gap-3 shadow-sm transition-colors",
          timeWarning
            ? "border-destructive/30 bg-destructive/5"
            : "border-border bg-card"
        )}
      >
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "size-7 rounded-lg flex items-center justify-center",
              timeWarning ? "bg-destructive/15" : "bg-accent"
            )}
          >
            <Clock
              className={cn("size-4", timeWarning ? "text-destructive" : "text-accent-foreground")}
            />
          </div>
          <h3 className="font-semibold text-sm text-foreground">Time Remaining</h3>
        </div>
        <div
          className={cn(
            "text-3xl font-bold tabular-nums tracking-tight",
            timeWarning ? "text-destructive" : "text-foreground"
          )}
        >
          {formatTime(timeRemainingSeconds)}
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {timeWarning
            ? "Less than 2 minutes remaining — wrap up soon."
            : "Take your time. Each question helps map your STEM profile."}
        </p>
      </div>

      {/* Subject Coverage */}
      <div className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-3 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-lg bg-primary/10 flex items-center justify-center">
            <Dna className="size-4 text-primary" />
          </div>
          <h3 className="font-semibold text-sm text-foreground">STEM Coverage</h3>
        </div>
        <div className="flex flex-col gap-2">
          {subjectSummary.map(({ subject, color }) => {
            const subjectQs = questions.filter((q) => q.subject === subject)
            if (subjectQs.length === 0) return null
            const answeredSubject = subjectQs.filter(
              (q) => answers[questions.indexOf(q)] !== null
            ).length
            return (
              <div key={subject} className="flex items-center gap-2">
                <div className={cn("size-2 rounded-full flex-shrink-0", color)} />
                <span className="text-xs text-muted-foreground flex-1 truncate">{subject}</span>
                <span className="text-xs font-medium text-foreground">
                  {answeredSubject}/{subjectQs.length}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Navigator */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <QuestionNavigator
          questions={questions}
          currentIndex={currentIndex}
          answers={answers}
          onNavigate={onNavigate}
        />
      </div>
    </aside>
  )
}
