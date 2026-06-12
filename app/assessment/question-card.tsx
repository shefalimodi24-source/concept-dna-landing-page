"use client"

import { cn } from "@/lib/utils"
import { type Question, subjectColors, difficultyColors } from "./data"
import { CheckCircle2, Circle } from "lucide-react"

interface QuestionCardProps {
  question: Question
  selected: number | null
  onSelect: (index: number) => void
  revealed: boolean
}

export function QuestionCard({ question, selected, onSelect, revealed }: QuestionCardProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Topic tags */}
      <div className="flex items-center gap-2 flex-wrap">
        <span
          className={cn(
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
            subjectColors[question.subject]
          )}
        >
          {question.subject}
        </span>
        <span
          className={cn(
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
            difficultyColors[question.difficulty]
          )}
        >
          {question.difficulty}
        </span>
        <span className="text-xs text-muted-foreground">{question.topic}</span>
      </div>

      {/* Question text */}
      <div>
        <h2 className="text-xl font-semibold text-foreground leading-relaxed text-balance">
          {question.text}
        </h2>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-3">
        {question.options?.map((option, i) => {
          const isSelected = selected === i
          const isCorrect = question.correctIndex === i
          const showCorrect = revealed && isCorrect
          const showWrong = revealed && isSelected && !isCorrect

          return (
            <button
              key={i}
              onClick={() => !revealed && onSelect(i)}
              disabled={revealed}
              className={cn(
                "group w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer",
                // Default
                !isSelected && !showCorrect && !showWrong &&
                  "border-border bg-card hover:border-primary/40 hover:bg-primary/5",
                // Selected (not yet revealed)
                isSelected && !revealed &&
                  "border-primary bg-primary/8 shadow-sm",
                // Correct answer revealed
                showCorrect &&
                  "border-[oklch(0.65_0.17_145)] bg-[oklch(0.97_0.04_145)] cursor-not-allowed",
                // Wrong answer revealed
                showWrong &&
                  "border-destructive/50 bg-destructive/5 cursor-not-allowed",
                // Other options when revealed
                revealed && !isSelected && !showCorrect &&
                  "opacity-50 cursor-not-allowed"
              )}
            >
              {/* Option letter bubble */}
              <span
                className={cn(
                  "flex-shrink-0 size-8 rounded-lg border flex items-center justify-center text-sm font-semibold transition-colors",
                  !isSelected && !showCorrect && !showWrong &&
                    "border-border text-muted-foreground group-hover:border-primary/50 group-hover:text-primary",
                  isSelected && !revealed &&
                    "border-primary bg-primary text-primary-foreground",
                  showCorrect &&
                    "border-[oklch(0.65_0.17_145)] bg-[oklch(0.65_0.17_145)] text-white",
                  showWrong &&
                    "border-destructive bg-destructive text-destructive-foreground"
                )}
              >
                {String.fromCharCode(65 + i)}
              </span>

              <span
                className={cn(
                  "flex-1 text-sm font-medium leading-relaxed",
                  isSelected && !revealed ? "text-foreground" : "text-foreground/80",
                  revealed && !isSelected && !showCorrect && "text-muted-foreground"
                )}
              >
                {option}
              </span>

              {/* Reveal icon */}
              {revealed && (
                <span className="flex-shrink-0">
                  {showCorrect ? (
                    <CheckCircle2 className="size-5 text-[oklch(0.65_0.17_145)]" />
                  ) : isSelected && showWrong ? (
                    <Circle className="size-5 text-destructive" />
                  ) : null}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
