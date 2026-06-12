"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Dna } from "lucide-react"

const steps = [
  "Analyzing response patterns...",
  "Mapping conceptual understanding...",
  "Identifying knowledge gaps...",
  "Calculating subject strengths...",
  "Generating your STEM DNA profile...",
]

const subjectScores = [
  { label: "Mathematics", score: 78, color: "oklch(0.55 0.20 255)" },
  { label: "Statistics", score: 65, color: "oklch(0.58 0.17 145)" },
  { label: "Computer Science", score: 82, color: "oklch(0.72 0.19 47)" },
  { label: "Physics", score: 71, color: "oklch(0.55 0.18 320)" },
  { label: "Linear Algebra", score: 60, color: "oklch(0.55 0.20 255)" },
]

export function GeneratingScreen() {
  const router = useRouter()
  const [stepIndex, setStepIndex] = useState(0)
  const [barsVisible, setBarsVisible] = useState(false)
  const [barWidths, setBarWidths] = useState(subjectScores.map(() => 0))
  const [pulsePhase, setPulsePhase] = useState(0)

  useEffect(() => {
    // Redirect to report after all steps complete
    const redirectTimer = setTimeout(() => {
      router.push("/report")
    }, steps.length * 900 + 2200)
    return () => clearTimeout(redirectTimer)
  }, [router])

  useEffect(() => {
    // Cycle through steps
    const stepTimer = setInterval(() => {
      setStepIndex((prev) => {
        if (prev < steps.length - 1) return prev + 1
        clearInterval(stepTimer)
        return prev
      })
    }, 900)
    return () => clearInterval(stepTimer)
  }, [])

  useEffect(() => {
    // Show bars after a short delay
    const barTimer = setTimeout(() => {
      setBarsVisible(true)
      setTimeout(() => {
        setBarWidths(subjectScores.map((s) => s.score))
      }, 100)
    }, 1800)
    return () => clearTimeout(barTimer)
  }, [])

  useEffect(() => {
    // DNA helix pulse animation
    const pulseTimer = setInterval(() => {
      setPulsePhase((prev) => (prev + 1) % 12)
    }, 150)
    return () => clearInterval(pulseTimer)
  }, [])

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6">
      <div className="w-full max-w-lg flex flex-col items-center gap-10 text-center">
        {/* Animated DNA icon */}
        <div className="relative flex items-center justify-center">
          {/* Outer pulsing rings */}
          <div className="absolute size-36 rounded-full border border-primary/10 animate-ping" style={{ animationDuration: "2.5s" }} />
          <div className="absolute size-28 rounded-full border border-primary/20 animate-ping" style={{ animationDuration: "2s", animationDelay: "0.3s" }} />

          {/* DNA helix dots orbiting */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
            const angle = (i / 12) * 360
            const isActive = i === pulsePhase || i === (pulsePhase + 6) % 12
            const rad = (angle * Math.PI) / 180
            const r = 44
            const x = Math.cos(rad) * r
            const y = Math.sin(rad) * r
            return (
              <div
                key={i}
                className="absolute rounded-full transition-all duration-150"
                style={{
                  width: isActive ? 10 : 6,
                  height: isActive ? 10 : 6,
                  background: isActive
                    ? i < 6
                      ? "oklch(0.72 0.19 47)"
                      : "oklch(0.55 0.20 255)"
                    : i < 6
                    ? "oklch(0.85 0.08 47)"
                    : "oklch(0.85 0.06 255)",
                  transform: `translate(${x}px, ${y}px)`,
                  boxShadow: isActive
                    ? `0 0 8px ${i < 6 ? "oklch(0.72 0.19 47 / 0.6)" : "oklch(0.55 0.20 255 / 0.6)"}`
                    : "none",
                }}
              />
            )
          })}

          {/* Center icon */}
          <div className="relative size-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
            <Dna className="size-8 text-primary-foreground" />
          </div>
        </div>

        {/* Heading */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Generating Your STEM DNA
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Our AI is analyzing your responses and building your personalized knowledge map.
          </p>
        </div>

        {/* Processing steps */}
        <div className="w-full flex flex-col gap-2">
          {steps.map((step, i) => {
            const isDone = i < stepIndex
            const isCurrent = i === stepIndex
            return (
              <div
                key={step}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-500"
                style={{
                  background: isCurrent
                    ? "oklch(0.95 0.05 47)"
                    : isDone
                    ? "oklch(0.97 0.02 145)"
                    : "transparent",
                  opacity: i > stepIndex ? 0.35 : 1,
                }}
              >
                <div
                  className="size-5 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-300"
                  style={{
                    background: isDone
                      ? "oklch(0.65 0.17 145)"
                      : isCurrent
                      ? "oklch(0.72 0.19 47)"
                      : "oklch(0.92 0 0)",
                  }}
                >
                  {isDone ? (
                    <svg className="size-3" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : isCurrent ? (
                    <div className="size-2 rounded-full bg-white animate-pulse" />
                  ) : (
                    <div className="size-2 rounded-full bg-muted-foreground/40" />
                  )}
                </div>
                <span
                  className="text-sm font-medium"
                  style={{
                    color: isDone
                      ? "oklch(0.45 0.17 145)"
                      : isCurrent
                      ? "oklch(0.52 0.18 47)"
                      : "oklch(0.6 0 0)",
                  }}
                >
                  {step}
                </span>
              </div>
            )
          })}
        </div>

        {/* Emerging subject scores */}
        {barsVisible && (
          <div className="w-full flex flex-col gap-3 rounded-2xl border border-border bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground text-left">
              Subject Strengths Detected
            </p>
            {subjectScores.map((s, i) => (
              <div key={s.label} className="flex flex-col gap-1">
                <div className="flex justify-between">
                  <span className="text-xs font-medium text-foreground">{s.label}</span>
                  <span className="text-xs text-muted-foreground">{barWidths[i]}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${barWidths[i]}%`,
                      background: s.color,
                      transitionDelay: `${i * 120}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
