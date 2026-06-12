"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { ArrowLeft, ArrowRight, CheckCheck, Dna } from "lucide-react"
import { questions } from "./data"
import { QuestionCard } from "./question-card"
import { SidebarPanel } from "./sidebar-panel"
import { GeneratingScreen } from "./generating-screen"

const TOTAL_SECONDS = 12 * 60 // 12 minutes

export function AssessmentClient() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(questions.map(() => null))
  const [revealed, setRevealed] = useState<boolean[]>(questions.map(() => false))
  const [timeRemaining, setTimeRemaining] = useState(TOTAL_SECONDS)
  const [isGenerating, setIsGenerating] = useState(false)

  // Countdown timer
  useEffect(() => {
    if (isGenerating) return
    if (timeRemaining <= 0) {
      setIsGenerating(true)
      return
    }
    const t = setInterval(() => setTimeRemaining((s) => s - 1), 1000)
    return () => clearInterval(t)
  }, [timeRemaining, isGenerating])

  const handleSelect = useCallback(
    (optionIndex: number) => {
      setAnswers((prev) => {
        const next = [...prev]
        next[currentIndex] = optionIndex
        return next
      })
    },
    [currentIndex]
  )

  const handleNext = () => {
    // Reveal answer briefly before advancing
    setRevealed((prev) => {
      const next = [...prev]
      next[currentIndex] = true
      return next
    })
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((i) => i + 1)
      }
    }, 600)
  }

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1)
  }

  const handleNavigate = (index: number) => {
    setCurrentIndex(index)
  }

  const handleSubmit = () => {
    setIsGenerating(true)
  }

  const answeredCount = answers.filter((a) => a !== null).length
  const isLastQuestion = currentIndex === questions.length - 1
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100)

  if (isGenerating) return <GeneratingScreen />

  const question = questions[currentIndex]

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky top progress bar */}
      <div className="fixed top-16 inset-x-0 z-40 h-0.5 bg-border">
        <div
          className="h-full bg-primary transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Page header */}
        <div className="flex flex-col items-center text-center gap-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
            <Dna className="size-3" />
            STEM DNA Assessment
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight text-balance">
            Discover Your STEM DNA
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed max-w-md">
            Answer a few questions and let AI map your understanding.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-6 items-start">
          {/* Main question area */}
          <div className="flex flex-col gap-5">
            {/* Question card */}
            <div className="rounded-2xl border border-border bg-card shadow-sm p-6 sm:p-8">
              {/* Question header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="size-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                    {currentIndex + 1}
                  </span>
                  <span className="text-sm text-muted-foreground font-medium">
                    of {questions.length} questions
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      "text-xs font-medium px-2 py-0.5 rounded-full",
                      answeredCount === questions.length
                        ? "bg-[oklch(0.95_0.05_145)] text-[oklch(0.45_0.17_145)]"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {answeredCount}/{questions.length} answered
                  </span>
                </div>
              </div>

              <QuestionCard
                question={question}
                selected={answers[currentIndex]}
                onSelect={handleSelect}
                revealed={revealed[currentIndex]}
              />
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="gap-2"
              >
                <ArrowLeft className="size-4" data-icon="inline-start" />
                Previous
              </Button>

              <div className="flex items-center gap-3">
                {/* Skip */}
                {answers[currentIndex] === null && !isLastQuestion && (
                  <button
                    onClick={() => setCurrentIndex((i) => i + 1)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Skip
                  </button>
                )}

                {isLastQuestion ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={answeredCount < questions.length}
                    className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                  >
                    <CheckCheck className="size-4" data-icon="inline-start" />
                    Submit Assessment
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    disabled={answers[currentIndex] === null}
                    className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                  >
                    Next
                    <ArrowRight className="size-4" data-icon="inline-end" />
                  </Button>
                )}
              </div>
            </div>

            {/* Mobile progress info */}
            <div className="lg:hidden rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold text-foreground">{answeredCount}/{questions.length}</span>
                </div>
                <Progress value={(answeredCount / questions.length) * 100} className="h-2" />
              </div>
            </div>
          </div>

          {/* Right sidebar (desktop) */}
          <div className="hidden lg:block sticky top-24">
            <SidebarPanel
              questions={questions}
              currentIndex={currentIndex}
              answers={answers}
              timeRemainingSeconds={timeRemaining}
              onNavigate={handleNavigate}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
