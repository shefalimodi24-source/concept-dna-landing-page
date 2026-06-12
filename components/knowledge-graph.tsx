"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

type NodeStatus = "mastered" | "learning" | "weak" | "locked"

interface GraphNode {
  id: string
  label: string
  x: number
  y: number
  status: NodeStatus
  connections: string[]
}

const STATUS_COLORS: Record<NodeStatus, { bg: string; ring: string; text: string; glow: string }> = {
  mastered: {
    bg: "bg-emerald-500",
    ring: "ring-emerald-200",
    text: "text-emerald-700",
    glow: "#10b981",
  },
  learning: {
    bg: "bg-amber-400",
    ring: "ring-amber-200",
    text: "text-amber-700",
    glow: "#f59e0b",
  },
  weak: {
    bg: "bg-rose-500",
    ring: "ring-rose-200",
    text: "text-rose-700",
    glow: "#f43f5e",
  },
  locked: {
    bg: "bg-gray-300",
    ring: "ring-gray-100",
    text: "text-gray-500",
    glow: "#d1d5db",
  },
}

const STATUS_LABELS: Record<NodeStatus, string> = {
  mastered: "Mastered",
  learning: "Learning",
  weak: "Weak",
  locked: "Locked",
}

const NODES: GraphNode[] = [
  { id: "algebra", label: "Algebra", x: 18, y: 38, status: "mastered", connections: ["functions", "probability"] },
  { id: "functions", label: "Functions", x: 35, y: 20, status: "mastered", connections: ["calculus"] },
  { id: "calculus", label: "Calculus", x: 55, y: 15, status: "mastered", connections: ["linear-algebra"] },
  { id: "linear-algebra", label: "Linear Algebra", x: 74, y: 24, status: "learning", connections: ["ml"] },
  { id: "probability", label: "Probability", x: 28, y: 58, status: "mastered", connections: ["ml"] },
  { id: "ml", label: "Machine Learning", x: 62, y: 50, status: "learning", connections: ["neural-networks"] },
  { id: "neural-networks", label: "Neural Networks", x: 50, y: 72, status: "weak", connections: ["transformers"] },
  { id: "transformers", label: "Transformers", x: 75, y: 78, status: "locked", connections: [] },
]

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

export function KnowledgeGraph() {
  const [hovered, setHovered] = useState<string | null>(null)
  const [animated, setAnimated] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[380px] select-none"
      aria-label="Interactive knowledge graph"
    >
      {/* SVG edges */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#e2e8f0" />
          </marker>
        </defs>
        {NODES.flatMap((node) =>
          node.connections.map((targetId) => {
            const target = NODES.find((n) => n.id === targetId)
            if (!target) return null
            const isHighlighted = hovered === node.id || hovered === targetId
            return (
              <line
                key={`${node.id}-${targetId}`}
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${target.x}%`}
                y2={`${target.y}%`}
                stroke={isHighlighted ? "#f97316" : "#e2e8f0"}
                strokeWidth={isHighlighted ? "2" : "1.5"}
                strokeDasharray={target.status === "locked" ? "5,4" : "none"}
                className="transition-all duration-300"
                markerEnd="url(#arrowhead)"
              />
            )
          })
        )}
      </svg>

      {/* Nodes */}
      {NODES.map((node, i) => {
        const colors = STATUS_COLORS[node.status]
        const isHovered = hovered === node.id
        return (
          <button
            key={node.id}
            className={cn(
              "absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 group focus:outline-none transition-all duration-300",
              animated ? "opacity-100" : "opacity-0"
            )}
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transitionDelay: `${i * 60}ms`,
            }}
            onMouseEnter={() => setHovered(node.id)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(node.id)}
            onBlur={() => setHovered(null)}
          >
            <div
              className={cn(
                "size-10 rounded-full flex items-center justify-center ring-4 shadow-sm transition-all duration-200",
                colors.bg,
                colors.ring,
                isHovered ? "scale-125 shadow-lg" : "scale-100",
                node.status === "locked" ? "opacity-50" : "opacity-100"
              )}
              style={
                isHovered
                  ? {
                      boxShadow: `0 0 0 6px ${colors.glow}22, 0 4px 16px ${colors.glow}44`,
                    }
                  : {}
              }
            >
              {node.status === "locked" && (
                <svg className="size-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              {node.status === "mastered" && (
                <svg className="size-4 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              {node.status === "learning" && (
                <span className="text-white text-xs font-bold">~</span>
              )}
              {node.status === "weak" && (
                <span className="text-white text-xs font-bold">!</span>
              )}
            </div>
            <span
              className={cn(
                "text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white/90 shadow border border-border whitespace-nowrap transition-all duration-200",
                colors.text,
                isHovered ? "opacity-100 scale-105" : "opacity-80"
              )}
            >
              {node.label}
            </span>
          </button>
        )
      })}

      {/* Legend */}
      <div className="absolute bottom-3 left-3 flex flex-wrap gap-2" role="list" aria-label="Node status legend">
        {(Object.entries(STATUS_LABELS) as [NodeStatus, string][]).map(([status, label]) => (
          <div key={status} className="flex items-center gap-1.5 text-xs text-muted-foreground" role="listitem">
            <span className={cn("size-2.5 rounded-full inline-block", STATUS_COLORS[status].bg)} aria-hidden="true" />
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}
