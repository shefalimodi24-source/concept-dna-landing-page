"use client"

import { X, BookOpen, Video, FileText, ChevronRight, Lock, Dumbbell, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { type GraphNode, STATUS_META } from "./data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface NodeDrawerProps {
  node: GraphNode | null
  onClose: () => void
}

const resourceIcon = {
  video: <Video className="size-3.5 shrink-0" />,
  article: <FileText className="size-3.5 shrink-0" />,
  exercise: <Dumbbell className="size-3.5 shrink-0" />,
}

const resourceLabel = {
  video: "Video",
  article: "Article",
  exercise: "Exercise",
}

const resourceColor = {
  video: { bg: "oklch(0.93 0.07 255)", text: "oklch(0.45 0.18 255)" },
  article: { bg: "oklch(0.93 0.07 145)", text: "oklch(0.38 0.14 145)" },
  exercise: { bg: "oklch(0.95 0.07 47)", text: "oklch(0.50 0.18 47)" },
}

export function NodeDrawer({ node, onClose }: NodeDrawerProps) {
  const isOpen = node !== null

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-30 bg-foreground/10 backdrop-blur-[2px] transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <aside
        role="complementary"
        aria-label={node ? `${node.label} concept details` : "Concept details"}
        className={cn(
          "fixed top-0 right-0 h-full z-40 w-full max-w-[420px] bg-background border-l border-border shadow-2xl flex flex-col transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {node && (
          <>
            {/* Header */}
            <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-border">
              <div className="flex flex-col gap-1.5 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Status badge */}
                  <span
                    className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      background: STATUS_META[node.status].bg + "22",
                      color: STATUS_META[node.status].text,
                      border: `1px solid ${STATUS_META[node.status].bg}44`,
                    }}
                  >
                    <span
                      className="size-1.5 rounded-full inline-block"
                      style={{ background: STATUS_META[node.status].bg }}
                    />
                    {STATUS_META[node.status].label}
                  </span>
                  <span className="text-[11px] text-muted-foreground font-medium">{node.subject}</span>
                </div>
                <h2 className="text-xl font-bold text-foreground leading-tight">{node.label}</h2>
              </div>
              <button
                onClick={onClose}
                className="shrink-0 size-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors mt-0.5"
                aria-label="Close panel"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-col gap-0 divide-y divide-border">

                {/* Mastery score */}
                {node.status !== "locked" && (
                  <div className="px-6 py-5 flex flex-col gap-3">
                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Mastery Score
                    </span>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-2.5 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${node.mastery}%`,
                            background: STATUS_META[node.status].bg,
                          }}
                        />
                      </div>
                      <span className="text-base font-bold tabular-nums" style={{ color: STATUS_META[node.status].bg }}>
                        {node.mastery}%
                      </span>
                    </div>
                  </div>
                )}

                {/* Locked state */}
                {node.status === "locked" && (
                  <div className="px-6 py-5 flex items-start gap-3">
                    <div className="size-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#f1f5f9" }}>
                      <Lock className="size-4 text-slate-400" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-semibold text-foreground">Concept Locked</span>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Complete the prerequisite concepts to unlock this topic.
                      </p>
                    </div>
                  </div>
                )}

                {/* Summary */}
                <div className="px-6 py-5 flex flex-col gap-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Concept Summary
                  </span>
                  <p className="text-sm text-foreground/80 leading-relaxed">{node.summary}</p>
                </div>

                {/* Prerequisites */}
                {node.prerequisites.length > 0 && (
                  <div className="px-6 py-5 flex flex-col gap-3">
                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Prerequisites
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {node.prerequisites.map((p) => (
                        <span
                          key={p}
                          className="text-xs font-medium px-2.5 py-1 rounded-full border border-border bg-muted text-muted-foreground"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Unlocks */}
                {node.unlocks.length > 0 && (
                  <div className="px-6 py-5 flex flex-col gap-3">
                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Unlocks
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {node.unlocks.map((u) => (
                        <span
                          key={u}
                          className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full"
                          style={{
                            background: "oklch(0.95 0.07 47)",
                            color: "oklch(0.50 0.18 47)",
                          }}
                        >
                          <ChevronRight className="size-3" />
                          {u}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Learning Resources */}
                <div className="px-6 py-5 flex flex-col gap-3">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Learning Resources
                  </span>
                  <div className="flex flex-col gap-2">
                    {node.resources.map((r) => (
                      <a
                        key={r.title}
                        href={r.url}
                        className="flex items-center gap-3 p-3 rounded-xl border border-border bg-background hover:border-primary/40 hover:shadow-sm transition-all duration-150 group"
                      >
                        <div
                          className="size-7 rounded-lg flex items-center justify-center shrink-0"
                          style={{
                            background: resourceColor[r.type].bg,
                            color: resourceColor[r.type].text,
                          }}
                        >
                          {resourceIcon[r.type]}
                        </div>
                        <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                          <span className="text-xs font-semibold text-foreground leading-snug truncate">{r.title}</span>
                          <span
                            className="text-[10px] font-medium"
                            style={{ color: resourceColor[r.type].text }}
                          >
                            {resourceLabel[r.type]}
                          </span>
                        </div>
                        <BookOpen className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Recommended Next Step */}
                <div className="px-6 py-5 flex flex-col gap-3">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Recommended Next Step
                  </span>
                  <div
                    className="flex items-start gap-3 p-4 rounded-xl"
                    style={{ background: "oklch(0.96 0.06 47)" }}
                  >
                    <div
                      className="size-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: "oklch(0.72 0.19 47)", color: "#fff" }}
                    >
                      <ArrowRight className="size-3.5" />
                    </div>
                    <p className="text-xs text-foreground/80 leading-relaxed font-medium">{node.nextStep}</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Footer CTA */}
            <div className="px-6 py-4 border-t border-border flex flex-col gap-2">
              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2 font-semibold"
                size="sm"
                nativeButton={false}
                render={<a href={`/concept/${node.id}`} />}
              >
                View Full Concept Detail
                <ArrowRight className="size-3.5" />
              </Button>
              <Button
                className="w-full gap-2 font-medium"
                variant="outline"
                size="sm"
              >
                Add to Learning Roadmap
                <ArrowRight className="size-3.5" />
              </Button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
