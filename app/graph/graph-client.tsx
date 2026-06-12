"use client"

import { useState, useCallback } from "react"
import {
  Search, ZoomIn, ZoomOut, Maximize2, Dna, SlidersHorizontal,
  LayoutGrid, Activity, Map, ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { type GraphNode, type NodeStatus, STATUS_META, NODES, SUBJECTS } from "./data"
import { GraphCanvas } from "./graph-canvas"
import { NodeDrawer } from "./node-drawer"
import { AppTopBar } from "@/components/app-top-bar"

const FILTERS: { label: string; value: NodeStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Mastered", value: "mastered" },
  { label: "Learning", value: "learning" },
  { label: "Weak", value: "weak" },
  { label: "Locked", value: "locked" },
]

const statusCounts = FILTERS.slice(1).reduce((acc, f) => {
  acc[f.value as NodeStatus] = NODES.filter((n) => n.status === f.value as NodeStatus).length
  return acc
}, {} as Record<NodeStatus, number>)

export function GraphClient() {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null)
  const [filter, setFilter] = useState<NodeStatus | "all">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [zoomKey, setZoomKey] = useState(0) // triggers zoom reset

  const handleSelect = useCallback((node: GraphNode) => {
    setSelectedNode(node)
  }, [])

  const handleClose = useCallback(() => {
    setSelectedNode(null)
  }, [])

  const masteredCount = NODES.filter((n) => n.status === "mastered").length
  const totalUnlocked = NODES.filter((n) => n.status !== "locked").length

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">

      {/* ── Top Navbar ── */}
      <AppTopBar
        pageLabel="Knowledge Graph"
        rightSlot={
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-xs font-medium text-muted-foreground">
            <div className="size-1.5 rounded-full bg-emerald-500" />
            {masteredCount}/{NODES.length} Mastered
          </div>
        }
      />

      {/* ── Content: Sidebar + Canvas ── */}
      <div className="flex-1 flex min-h-0 overflow-hidden">

        {/* ── Left Sidebar ── */}
        <aside className="hidden md:flex w-56 shrink-0 border-r border-border bg-background/90 flex-col gap-0 overflow-y-auto">

          {/* Search */}
          <div className="px-4 py-3 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search concepts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="px-4 py-3 border-b border-border flex flex-col gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
              <SlidersHorizontal className="size-3" />
              Filter by Status
            </span>
            <div className="flex flex-col gap-1">
              {FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={cn(
                    "flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                    filter === f.value
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <div className="flex items-center gap-2">
                    {f.value !== "all" && (
                      <span
                        className="size-2 rounded-full inline-block"
                        style={{ background: STATUS_META[f.value as NodeStatus].bg }}
                      />
                    )}
                    {f.value === "all" && (
                      <LayoutGrid className="size-3" />
                    )}
                    {f.label}
                  </div>
                  {f.value !== "all" && (
                    <span className="text-[10px] font-bold tabular-nums text-muted-foreground">
                      {statusCounts[f.value as NodeStatus]}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Subjects legend */}
          <div className="px-4 py-3 flex flex-col gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
              <Map className="size-3" />
              Subjects
            </span>
            <div className="flex flex-col gap-1">
              {SUBJECTS.map((subject) => {
                const count = NODES.filter((n) => n.subject === subject).length
                return (
                  <div
                    key={subject}
                    className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs text-muted-foreground"
                  >
                    <span className="font-medium text-foreground/70">{subject}</span>
                    <span className="text-[10px] font-bold tabular-nums">{count}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Stats summary */}
          <div className="px-4 py-3 mt-auto border-t border-border">
            <div className="rounded-xl border border-border bg-muted/50 p-3 flex flex-col gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Your Progress
              </span>
              <div className="flex flex-col gap-1.5">
                {(["mastered", "learning", "weak", "locked"] as NodeStatus[]).map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <span
                      className="size-2 rounded-full shrink-0"
                      style={{ background: STATUS_META[s].bg }}
                    />
                    <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${(statusCounts[s] / NODES.length) * 100}%`,
                          background: STATUS_META[s].bg,
                        }}
                      />
                    </div>
                    <span className="text-[10px] font-semibold tabular-nums text-muted-foreground w-3">
                      {statusCounts[s]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* ── Graph Canvas Area ── */}
        <div className="flex-1 relative overflow-hidden bg-[oklch(0.985_0.003_255)]">

          {/* Canvas */}
          <div className="absolute inset-0">
            <GraphCanvas
              key={zoomKey}
              selectedId={selectedNode?.id ?? null}
              onSelect={handleSelect}
              filter={filter}
              searchQuery={searchQuery}
            />
          </div>

          {/* Zoom Controls */}
          <div className="absolute bottom-5 right-5 z-10 flex flex-col gap-1.5">
            <button
              className="size-9 rounded-xl bg-background border border-border shadow-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:shadow-md transition-all"
              onClick={() => setZoomKey((k) => k + 1)}
              title="Reset view"
              aria-label="Reset zoom"
            >
              <Maximize2 className="size-4" />
            </button>
          </div>

          {/* Mobile search bar */}
          <div className="md:hidden absolute top-4 left-4 right-4 z-10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search concepts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2.5 text-sm rounded-xl border border-border bg-background/95 backdrop-blur text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 shadow-sm"
              />
            </div>
          </div>

          {/* Mobile filter pills */}
          <div className="md:hidden absolute bottom-5 left-4 right-16 z-10 flex gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={cn(
                  "shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors shadow-sm bg-background/95 backdrop-blur",
                  filter === f.value
                    ? "border-primary text-primary"
                    : "border-border text-muted-foreground hover:text-foreground"
                )}
              >
                {f.value !== "all" && (
                  <span
                    className="size-1.5 rounded-full inline-block"
                    style={{ background: STATUS_META[f.value as NodeStatus].bg }}
                  />
                )}
                {f.label}
              </button>
            ))}
          </div>

          {/* Legend overlay (desktop, bottom-left) */}
          <div className="hidden md:flex absolute bottom-5 left-5 z-10 items-center gap-3 px-3 py-2 rounded-xl bg-background/90 backdrop-blur border border-border shadow-sm">
            {(Object.entries(STATUS_META) as [NodeStatus, typeof STATUS_META[NodeStatus]][]).map(([status, meta]) => (
              <div key={status} className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full" style={{ background: meta.bg }} />
                <span className="text-[11px] font-medium text-muted-foreground">{meta.label}</span>
              </div>
            ))}
          </div>

          {/* Hint overlay */}
          <div className="hidden md:flex absolute top-4 right-4 z-10 items-center gap-1.5 px-3 py-1.5 rounded-xl bg-background/80 backdrop-blur border border-border shadow-sm">
            <span className="text-[11px] text-muted-foreground">Click a node to explore  ·  Drag to pan  ·  Scroll to zoom</span>
          </div>
        </div>
      </div>

      {/* Node detail drawer */}
      <NodeDrawer node={selectedNode} onClose={handleClose} />
    </div>
  )
}
