"use client"

import { useEffect, useState } from "react"

interface CareerCardProps {
  title: string
  score: number
  color: string
  rank: number
  delay?: number
}

const rankLabels: Record<number, { label: string; bg: string; text: string }> = {
  1: { label: "Best Match", bg: "oklch(0.95 0.07 47)", text: "oklch(0.52 0.18 47)" },
  2: { label: "Strong Fit", bg: "oklch(0.93 0.05 255)", text: "oklch(0.45 0.18 255)" },
  3: { label: "Good Fit", bg: "oklch(0.95 0.05 145)", text: "oklch(0.42 0.16 145)" },
  4: { label: "Possible Fit", bg: "oklch(0.95 0.04 320)", text: "oklch(0.42 0.16 320)" },
}

export function CareerCard({ title, score, color, rank, delay = 0 }: CareerCardProps) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setWidth(score), 300 + delay)
    return () => clearTimeout(t)
  }, [score, delay])

  const rankInfo = rankLabels[rank] ?? rankLabels[4]

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-foreground leading-tight">{title}</span>
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full w-fit"
            style={{ background: rankInfo.bg, color: rankInfo.text }}
          >
            {rankInfo.label}
          </span>
        </div>
        <span
          className="text-2xl font-bold tabular-nums leading-none flex-shrink-0"
          style={{ color }}
        >
          {score}%
        </span>
      </div>
      {/* Alignment bar */}
      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${width}%`,
            background: color,
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  )
}
