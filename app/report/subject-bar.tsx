"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface SubjectBarProps {
  label: string
  score: number
  detail: string
  color: string
  delay?: number
  variant?: "strength" | "weak"
}

export function SubjectBar({ label, score, detail, color, delay = 0, variant = "strength" }: SubjectBarProps) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setWidth(score), 200 + delay)
    return () => clearTimeout(t)
  }, [score, delay])

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="size-2 rounded-full flex-shrink-0"
            style={{ background: color }}
          />
          <span className="text-sm font-semibold text-foreground">{label}</span>
        </div>
        <span
          className="text-sm font-bold tabular-nums"
          style={{ color }}
        >
          {score}%
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${width}%`,
            background: color,
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">{detail}</p>
    </div>
  )
}
