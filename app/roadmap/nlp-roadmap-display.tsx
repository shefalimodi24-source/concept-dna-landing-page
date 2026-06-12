"use client"

import { useState, useMemo } from "react"
import {
  ChevronDown,
  ChevronUp,
  Clock,
  BookOpen,
  Play,
  Code2,
  FileText,
  CheckCircle2,
  Lock,
  Circle,
  ArrowRight,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { SectionedRoadmap, RoadmapTopic, RoadmapSection, Difficulty, ResourceType, TopicStatus } from "./data"

// ── Style maps ────────────────────────────────────────────────────────────────

const DIFFICULTY_META: Record<Difficulty, { label: string; bg: string; color: string }> = {
  Beginner:     { label: "Beginner",     bg: "oklch(0.93 0.07 145)", color: "oklch(0.35 0.16 145)" },
  Intermediate: { label: "Intermediate", bg: "oklch(0.95 0.07 47)",  color: "oklch(0.45 0.19 47)"  },
  Advanced:     { label: "Advanced",     bg: "oklch(0.94 0.06 20)",  color: "oklch(0.46 0.22 20)"  },
}

const RESOURCE_META: Record<ResourceType, { icon: React.ReactNode; label: string; color: string }> = {
  video:    { icon: <Play      className="size-3" />, label: "Video",    color: "oklch(0.46 0.22 20)"  },
  article:  { icon: <FileText  className="size-3" />, label: "Article",  color: "oklch(0.45 0.18 255)" },
  course:   { icon: <BookOpen  className="size-3" />, label: "Course",   color: "oklch(0.42 0.16 145)" },
  practice: { icon: <Code2     className="size-3" />, label: "Practice", color: "oklch(0.48 0.16 320)" },
}

// ── Helper: resolve status for each topic ────────────────────────────────────

function resolveStatuses(
  sections: RoadmapSection[],
  completed: Set<string>
): Record<string, TopicStatus> {
  const allTopics = sections.flatMap((s) => s.topics)
  const statuses: Record<string, TopicStatus> = {}

  for (const topic of allTopics) {
    if (completed.has(topic.id)) {
      statuses[topic.id] = "completed"
    } else {
      const prereqsMet = topic.prerequisites.every((p) => completed.has(p))
      statuses[topic.id] = prereqsMet ? "available" : "locked"
    }
  }
  return statuses
}

// ── Topic card ────────────────────────────────────────────────────────────────

function TopicCard({
  topic,
  status,
  sectionColor,
  sectionBg,
  allTopicsById,
  onToggle,
}: {
  topic: RoadmapTopic
  status: TopicStatus
  sectionColor: string
  sectionBg: string
  allTopicsById: Record<string, RoadmapTopic>
  onToggle: () => void
}) {
  const [expanded, setExpanded] = useState(false)
  const diff = DIFFICULTY_META[topic.difficulty]
  const isLocked = status === "locked"
  const isCompleted = status === "completed"

  const prereqTopics = topic.prerequisites.map((id) => allTopicsById[id]).filter(Boolean)

  return (
    <div
      className={cn(
        "rounded-2xl border bg-card transition-all duration-200",
        isCompleted && "opacity-70",
        isLocked && "opacity-50",
        !isLocked && !isCompleted && "hover:shadow-md hover:-translate-y-0.5",
        expanded && "shadow-md"
      )}
      style={{ borderColor: expanded ? sectionColor + "60" : undefined }}
    >
      {/* ── Header row ── */}
      <div className="flex items-start gap-3 px-4 py-3.5">
        {/* Completion toggle */}
        <button
          onClick={onToggle}
          disabled={isLocked}
          aria-label={isCompleted ? "Mark incomplete" : isLocked ? "Locked" : "Mark complete"}
          className={cn(
            "shrink-0 mt-0.5 size-5 rounded-full border-2 flex items-center justify-center transition-all duration-200",
            !isLocked && "hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring/40",
            isLocked && "cursor-not-allowed"
          )}
          style={{
            borderColor: isCompleted
              ? "oklch(0.55 0.17 145)"
              : isLocked
              ? "oklch(0.82 0.005 255)"
              : sectionColor,
            background: isCompleted
              ? "oklch(0.90 0.08 145)"
              : "transparent",
          }}
        >
          {isCompleted ? (
            <CheckCircle2 className="size-3" style={{ color: "oklch(0.42 0.16 145)" }} />
          ) : isLocked ? (
            <Lock className="size-2.5 text-muted-foreground/50" />
          ) : (
            <Circle className="size-3" style={{ color: sectionColor, opacity: 0.4 }} />
          )}
        </button>

        {/* Title + meta */}
        <button
          onClick={() => !isLocked && setExpanded((e) => !e)}
          className="flex-1 text-left min-w-0"
          disabled={isLocked}
        >
          <div className="flex items-center gap-2 flex-wrap">
            <h4
              className={cn(
                "text-sm font-semibold leading-snug",
                isCompleted && "line-through text-muted-foreground",
                isLocked && "text-muted-foreground"
              )}
            >
              {topic.title}
            </h4>
            {/* Difficulty badge */}
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0"
              style={{ background: diff.bg, color: diff.color }}
            >
              {diff.label}
            </span>
          </div>

          {/* Hours + prerequisites inline */}
          <div className="flex items-center gap-3 mt-1 flex-wrap">
            <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <Clock className="size-3" />
              {topic.estimatedHours} hrs
            </span>
            {prereqTopics.length > 0 && (
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <ArrowRight className="size-3" />
                Needs: {prereqTopics.map((t) => t.title).join(", ")}
              </span>
            )}
          </div>
        </button>

        {/* Expand chevron */}
        {!isLocked && (
          <button
            onClick={() => setExpanded((e) => !e)}
            className="shrink-0 text-muted-foreground hover:text-foreground transition-colors mt-0.5"
          >
            {expanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          </button>
        )}
      </div>

      {/* ── Expanded detail ── */}
      {expanded && !isLocked && (
        <div className="border-t border-border px-4 pb-4 pt-3.5 flex flex-col gap-4">
          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">{topic.description}</p>

          {/* Skills */}
          <div className="flex flex-wrap gap-1.5">
            {topic.skills.map((skill) => (
              <span
                key={skill}
                className="text-[11px] font-medium px-2.5 py-0.5 rounded-full border border-border bg-muted text-muted-foreground"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Prerequisites visual */}
          {prereqTopics.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Prerequisites
              </span>
              <div className="flex flex-wrap gap-2">
                {prereqTopics.map((pre) => (
                  <div
                    key={pre.id}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-muted/50 text-xs text-muted-foreground"
                  >
                    <ChevronRight className="size-3 text-muted-foreground/60" />
                    {pre.title}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resources */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Resources
            </span>
            <div className="flex flex-col gap-1.5">
              {topic.resources.map((resource) => {
                const rm = RESOURCE_META[resource.type]
                return (
                  <div
                    key={resource.title}
                    className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl border border-border bg-background hover:bg-muted/40 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className="shrink-0 size-5 rounded-md flex items-center justify-center"
                        style={{ background: sectionBg, color: rm.color }}
                      >
                        {rm.icon}
                      </span>
                      <span className="text-xs font-medium text-foreground truncate group-hover:text-primary transition-colors">
                        {resource.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                        style={{ background: sectionBg, color: sectionColor }}
                      >
                        {rm.label}
                      </span>
                      <span className="text-[11px] text-muted-foreground">{resource.duration}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Section block ─────────────────────────────────────────────────────────────

function SectionBlock({
  section,
  statuses,
  allTopicsById,
  onToggle,
  globalIndex,
}: {
  section: RoadmapSection
  statuses: Record<string, TopicStatus>
  allTopicsById: Record<string, RoadmapTopic>
  onToggle: (id: string) => void
  globalIndex: number
}) {
  const completedInSection = section.topics.filter((t) => statuses[t.id] === "completed").length
  const totalInSection = section.topics.length
  const pct = Math.round((completedInSection / totalInSection) * 100)

  return (
    <div className="flex gap-4 md:gap-6">
      {/* ── Left: timeline spine ── */}
      <div className="flex flex-col items-center shrink-0">
        {/* Section number bubble */}
        <div
          className="size-9 rounded-full flex items-center justify-center text-sm font-bold border-2 z-10 bg-card shrink-0"
          style={{ borderColor: section.color, color: section.color }}
        >
          {globalIndex + 1}
        </div>
        {/* Vertical line */}
        <div
          className="w-0.5 flex-1 mt-2 min-h-[2rem]"
          style={{
            background: `linear-gradient(to bottom, ${section.color}40, ${section.color}10)`,
          }}
        />
      </div>

      {/* ── Right: section content ── */}
      <div className="flex-1 min-w-0 pb-10">
        {/* Section header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2.5">
              <span
                className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                style={{ background: section.bgColor, color: section.color }}
              >
                Section {globalIndex + 1}
              </span>
              <h3 className="text-base font-bold text-foreground">{section.title}</h3>
            </div>
            <p className="text-xs text-muted-foreground">
              {completedInSection}/{totalInSection} topics completed
            </p>
          </div>
          {/* Mini progress */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-24 h-1.5 rounded-full bg-border overflow-hidden hidden sm:block">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${pct}%`, background: section.color }}
              />
            </div>
            <span className="text-xs font-semibold tabular-nums" style={{ color: section.color }}>
              {pct}%
            </span>
          </div>
        </div>

        {/* Topics grid */}
        <div className="flex flex-col gap-2.5">
          {section.topics.map((topic) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              status={statuses[topic.id] ?? "locked"}
              sectionColor={section.color}
              sectionBg={section.bgColor}
              allTopicsById={allTopicsById}
              onToggle={() => onToggle(topic.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────

export function NLPRoadmapDisplay({ roadmap }: { roadmap: SectionedRoadmap }) {
  const [completed, setCompleted] = useState<Set<string>>(new Set())

  const allTopicsById = useMemo(() => {
    const map: Record<string, RoadmapTopic> = {}
    for (const section of roadmap.sections) {
      for (const topic of section.topics) {
        map[topic.id] = topic
      }
    }
    return map
  }, [roadmap])

  const statuses = useMemo(
    () => resolveStatuses(roadmap.sections, completed),
    [roadmap.sections, completed]
  )

  const toggle = (id: string) => {
    setCompleted((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const totalTopics = roadmap.sections.reduce((acc, s) => acc + s.topics.length, 0)
  const completedCount = completed.size
  const progressPct = Math.round((completedCount / totalTopics) * 100)
  const totalHoursRemaining = roadmap.sections
    .flatMap((s) => s.topics)
    .filter((t) => !completed.has(t.id))
    .reduce((acc, t) => acc + t.estimatedHours, 0)

  return (
    <div className="flex flex-col gap-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">

      {/* ── Sticky progress header ── */}
      <div className="rounded-2xl border border-border bg-card p-5 md:p-6 flex flex-col gap-5">
        {/* Title row */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
              <span
                className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full"
                style={{ background: "oklch(0.94 0.06 255)", color: "oklch(0.45 0.18 255)" }}
              >
                AI-Generated Roadmap
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                {roadmap.totalMonths} months estimated
              </span>
            </div>
            <h2 className="text-2xl font-bold text-foreground tracking-tight text-balance">
              {roadmap.title}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mt-0.5 max-w-2xl">
              {roadmap.subtitle}
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Sections",          value: `${roadmap.sections.length}` },
            { label: "Total Topics",       value: `${totalTopics}` },
            { label: "Total Hours",        value: `~${roadmap.totalHours} hrs` },
            { label: "Remaining Hours",    value: `~${totalHoursRemaining} hrs` },
            { label: "Completed",          value: `${completedCount}/${totalTopics}` },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col gap-0.5 px-4 py-2.5 rounded-xl border border-border bg-muted/50"
            >
              <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">
                {stat.label}
              </span>
              <span className="text-sm font-bold text-foreground">{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Overall progress bar */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-medium">Overall progress</span>
            <span
              className="text-xs font-bold tabular-nums"
              style={{ color: "oklch(0.42 0.16 145)" }}
            >
              {progressPct}%
            </span>
          </div>
          <div className="h-2 rounded-full bg-border overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progressPct}%`,
                background: "oklch(0.58 0.17 145)",
              }}
            />
          </div>
        </div>

        {/* Per-section mini bars */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Progress by section
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {roadmap.sections.map((section) => {
              const done = section.topics.filter((t) => completed.has(t.id)).length
              const pct = Math.round((done / section.topics.length) * 100)
              return (
                <div key={section.id} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-medium text-muted-foreground truncate">
                      {section.title}
                    </span>
                    <span
                      className="text-[10px] font-bold tabular-nums ml-1"
                      style={{ color: section.color }}
                    >
                      {done}/{section.topics.length}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-border overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, background: section.color }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Timeline ── */}
      <div className="flex flex-col">
        {roadmap.sections.map((section, i) => (
          <SectionBlock
            key={section.id}
            section={section}
            statuses={statuses}
            allTopicsById={allTopicsById}
            onToggle={toggle}
            globalIndex={i}
          />
        ))}
      </div>

      {/* ── Legend ── */}
      <div className="rounded-2xl border border-border bg-card p-4 flex flex-wrap gap-4">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground self-center">
          Legend
        </span>
        {[
          { icon: <CheckCircle2 className="size-3.5" style={{ color: "oklch(0.42 0.16 145)" }} />, label: "Completed" },
          { icon: <Circle className="size-3.5 text-primary" />, label: "Available" },
          { icon: <Lock className="size-3.5 text-muted-foreground/50" />, label: "Locked (complete prerequisites first)" },
        ].map(({ icon, label }) => (
          <div key={label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            {icon}
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}
