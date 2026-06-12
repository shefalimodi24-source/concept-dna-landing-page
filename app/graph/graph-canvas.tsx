"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { cn } from "@/lib/utils"
import { type GraphNode, type NodeStatus, STATUS_META, NODES } from "./data"

interface GraphCanvasProps {
  selectedId: string | null
  onSelect: (node: GraphNode) => void
  filter: NodeStatus | "all"
  searchQuery: string
}

// Extended positions for a large canvas (in percent of 1800×900 virtual space)
const NODE_POSITIONS: Record<string, { cx: number; cy: number }> = {
  algebra:      { cx: 160,  cy: 370 },
  functions:    { cx: 380,  cy: 180 },
  trigonometry: { cx: 620,  cy: 100 },
  calculus:     { cx: 900,  cy: 160 },
  "linear-algebra": { cx: 1200, cy: 250 },
  probability:  { cx: 380,  cy: 560 },
  statistics:   { cx: 160,  cy: 700 },
  ml:           { cx: 900,  cy: 540 },
  "deep-learning":  { cx: 760,  cy: 730 },
  transformers: { cx: 1120, cy: 800 },
}

const CANVAS_W = 1400
const CANVAS_H = 900

function NodeIcon({ status }: { status: NodeStatus }) {
  if (status === "locked") {
    return (
      <path
        d="M10 9V7a4 4 0 0 1 8 0v2M7 9h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1z"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        transform="translate(-12,-12)"
      />
    )
  }
  if (status === "mastered") {
    return (
      <path
        d="M4 12l5 5L20 7"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        transform="translate(-12,-12)"
      />
    )
  }
  if (status === "learning") {
    return (
      <text x="-5" y="5" fill="white" fontSize="14" fontWeight="bold" textAnchor="middle">~</text>
    )
  }
  // weak
  return (
    <text x="-4" y="6" fill="white" fontSize="16" fontWeight="bold" textAnchor="middle">!</text>
  )
}

export function GraphCanvas({ selectedId, onSelect, filter, searchQuery }: GraphCanvasProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const [panStart, setPanStart] = useState({ x: 0, y: 0 })
  const [animated, setAnimated] = useState(false)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 100)
    return () => clearTimeout(t)
  }, [])

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    const delta = -e.deltaY * 0.001
    setZoom((z) => Math.min(2.5, Math.max(0.4, z + delta * z)))
  }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if ((e.target as SVGElement).closest("[data-node]")) return
    setIsPanning(true)
    setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
  }, [pan])

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (!isPanning) return
    setPan({ x: e.clientX - panStart.x, y: e.clientY - panStart.y })
  }, [isPanning, panStart])

  const handleMouseUp = useCallback(() => setIsPanning(false), [])

  const isNodeVisible = (node: GraphNode) => {
    const matchesFilter = filter === "all" || node.status === filter
    const matchesSearch = searchQuery === "" || node.label.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  }

  const getNodeOpacity = (node: GraphNode) => {
    if (!isNodeVisible(node)) return 0.15
    return 1
  }

  return (
    <svg
      ref={svgRef}
      className={cn(
        "w-full h-full",
        isPanning ? "cursor-grabbing" : "cursor-grab"
      )}
      viewBox={`${-pan.x / zoom} ${-pan.y / zoom} ${CANVAS_W / zoom} ${CANVAS_H / zoom}`}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      aria-label="STEM knowledge graph"
      role="img"
    >
      <defs>
        {/* Arrow markers per status color */}
        {(["mastered", "learning", "weak", "locked"] as NodeStatus[]).map((s) => (
          <marker
            key={s}
            id={`arrow-${s}`}
            markerWidth="8"
            markerHeight="6"
            refX="7"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" fill={STATUS_META[s].color} opacity="0.5" />
          </marker>
        ))}
        <marker id="arrow-highlight" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="oklch(0.72 0.19 47)" />
        </marker>
        {/* Glow filters */}
        {(["mastered", "learning", "weak", "locked"] as NodeStatus[]).map((s) => (
          <filter key={`glow-${s}`} id={`glow-${s}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        ))}
      </defs>

      {/* Subtle grid background */}
      <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="oklch(0.92 0.005 255)" strokeWidth="0.5" />
      </pattern>
      <rect width={CANVAS_W} height={CANVAS_H} fill="url(#grid)" />

      {/* Edges */}
      {NODES.flatMap((node) =>
        node.connections.map((targetId) => {
          const target = NODES.find((n) => n.id === targetId)
          if (!target) return null
          const src = NODE_POSITIONS[node.id]
          const tgt = NODE_POSITIONS[targetId]
          if (!src || !tgt) return null

          const isHighlighted =
            hoveredId === node.id || hoveredId === targetId ||
            selectedId === node.id || selectedId === targetId

          // Shorten line to not overlap node circles (r=28)
          const dx = tgt.cx - src.cx
          const dy = tgt.cy - src.cy
          const dist = Math.sqrt(dx * dx + dy * dy)
          const nx = dx / dist
          const ny = dy / dist
          const pad = 30
          const x1 = src.cx + nx * pad
          const y1 = src.cy + ny * pad
          const x2 = tgt.cx - nx * pad
          const y2 = tgt.cy - ny * pad

          return (
            <line
              key={`${node.id}-${targetId}`}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={isHighlighted ? "oklch(0.72 0.19 47)" : STATUS_META[node.status].color}
              strokeWidth={isHighlighted ? 2.5 : 1.5}
              strokeOpacity={isHighlighted ? 1 : 0.35}
              strokeDasharray={target.status === "locked" ? "8 5" : undefined}
              markerEnd={`url(#${isHighlighted ? "arrow-highlight" : `arrow-${node.status}`})`}
              className="transition-all duration-200"
            />
          )
        })
      )}

      {/* Nodes */}
      {NODES.map((node, i) => {
        const pos = NODE_POSITIONS[node.id]
        if (!pos) return null
        const meta = STATUS_META[node.status]
        const isSelected = selectedId === node.id
        const isHovered = hoveredId === node.id
        const opacity = getNodeOpacity(node)
        const r = 28
        const labelY = pos.cy + r + 18

        return (
          <g
            key={node.id}
            data-node
            tabIndex={0}
            role="button"
            aria-label={`${node.label} — ${meta.label}`}
            style={{
              cursor: "pointer",
              opacity,
              transition: "opacity 0.3s ease",
            }}
            transform={`translate(${pos.cx}, ${pos.cy})`}
            onClick={() => onSelect(node)}
            onMouseEnter={() => setHoveredId(node.id)}
            onMouseLeave={() => setHoveredId(null)}
            onKeyDown={(e) => e.key === "Enter" && onSelect(node)}
          >
            {/* Pulse ring for selected */}
            {isSelected && (
              <circle
                r={r + 12}
                fill="none"
                stroke={meta.color}
                strokeWidth="2"
                strokeOpacity="0.4"
                className="animate-ping"
                style={{ animationDuration: "1.8s" }}
              />
            )}

            {/* Glow halo on hover */}
            {(isHovered || isSelected) && (
              <circle
                r={r + 8}
                fill={meta.color}
                opacity="0.12"
              />
            )}

            {/* Outer ring */}
            <circle
              r={r + 5}
              fill="none"
              stroke={meta.ring}
              strokeWidth="3"
            />

            {/* Main circle */}
            <circle
              r={r}
              fill={meta.bg}
              filter={isHovered || isSelected ? `url(#glow-${node.status})` : undefined}
              style={{
                transform: isHovered || isSelected ? "scale(1.1)" : "scale(1)",
                transformOrigin: "center",
                transition: "transform 0.2s ease",
              }}
            />

            {/* Icon */}
            <g style={{ pointerEvents: "none" }}>
              <NodeIcon status={node.status} />
            </g>

            {/* Label pill */}
            <foreignObject
              x={-70}
              y={r + 5}
              width="140"
              height="28"
              style={{ pointerEvents: "none" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: meta.text,
                    background: "rgba(255,255,255,0.95)",
                    border: "1px solid rgba(0,0,0,0.08)",
                    borderRadius: "999px",
                    padding: "2px 10px",
                    whiteSpace: "nowrap",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                  }}
                >
                  {node.label}
                </span>
              </div>
            </foreignObject>
          </g>
        )
      })}
    </svg>
  )
}
