"use client"

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts"

interface StemRadarProps {
  data: { subject: string; score: number; fullMark: number }[]
}

export function StemRadar({ data }: StemRadarProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <RadarChart data={data} margin={{ top: 10, right: 28, bottom: 10, left: 28 }}>
        <PolarGrid
          stroke="oklch(0.90 0.003 255)"
          gridType="polygon"
        />
        <PolarAngleAxis
          dataKey="subject"
          tick={{
            fontSize: 11,
            fontWeight: 500,
            fill: "oklch(0.5 0.01 255)",
          }}
          tickLine={false}
        />
        {/* Filled area — weak zones */}
        <Radar
          name="Knowledge"
          dataKey="score"
          stroke="oklch(0.72 0.19 47)"
          fill="oklch(0.72 0.19 47)"
          fillOpacity={0.18}
          strokeWidth={2}
          dot={{
            r: 4,
            fill: "oklch(0.72 0.19 47)",
            strokeWidth: 0,
          }}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}
