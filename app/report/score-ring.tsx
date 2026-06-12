"use client"

import { useEffect, useState } from "react"

interface ScoreRingProps {
  score: number
  size?: number
  strokeWidth?: number
}

export function ScoreRing({ score, size = 140, strokeWidth = 10 }: ScoreRingProps) {
  const [animatedScore, setAnimatedScore] = useState(0)
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const progress = (animatedScore / 100) * circumference
  const dashOffset = circumference - progress

  useEffect(() => {
    const timeout = setTimeout(() => {
      const step = () => {
        setAnimatedScore((prev) => {
          if (prev >= score) return score
          return prev + 1
        })
      }
      const interval = setInterval(() => {
        setAnimatedScore((prev) => {
          if (prev >= score) {
            clearInterval(interval)
            return score
          }
          return prev + 1
        })
      }, 18)
      return () => clearInterval(interval)
    }, 400)
    return () => clearTimeout(timeout)
  }, [score])

  // Colour shifts from orange (high) to blue (low)
  const strokeColor =
    animatedScore >= 75
      ? "oklch(0.72 0.19 47)"
      : animatedScore >= 55
      ? "oklch(0.64 0.19 85)"
      : "oklch(0.55 0.20 255)"

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="oklch(0.93 0.003 255)"
          strokeWidth={strokeWidth}
        />
        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transition: "stroke-dashoffset 0.04s linear, stroke 0.3s ease" }}
        />
      </svg>
      {/* Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
        <span className="text-4xl font-bold text-foreground tabular-nums leading-none">
          {animatedScore}
        </span>
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Score</span>
      </div>
    </div>
  )
}
