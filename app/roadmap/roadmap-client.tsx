"use client"

import { useState, useRef, useTransition } from "react"
import {
  Search, Sparkles, Dna, ChevronRight, ArrowRight,
  Clock, Layers, BookOpen, RotateCcw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getRoadmap, SUGGESTED_TOPICS, type GeneratedRoadmap } from "./data"
import { RoadmapDisplay } from "./roadmap-display"
import { AppTopBar } from "@/components/app-top-bar"

// ─── Empty state illustration ──────────────────────────────────────────────
function EmptyState({ onSuggest }: { onSuggest: (topic: string) => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center gap-8">
      {/* Abstract learning graph illustration */}
      <div className="relative size-40">
        <svg viewBox="0 0 160 160" fill="none" className="w-full h-full">
          {/* Background circle */}
          <circle cx="80" cy="80" r="72" fill="oklch(0.97 0.003 255)" stroke="oklch(0.92 0.005 255)" strokeWidth="1.5" />
          {/* Connecting lines */}
          <line x1="80" y1="80" x2="40" y2="50"  stroke="oklch(0.88 0.05 255)" strokeWidth="1.5" strokeDasharray="4 3" />
          <line x1="80" y1="80" x2="120" y2="50" stroke="oklch(0.88 0.05 255)" strokeWidth="1.5" strokeDasharray="4 3" />
          <line x1="80" y1="80" x2="40" y2="110" stroke="oklch(0.88 0.05 255)" strokeWidth="1.5" strokeDasharray="4 3" />
          <line x1="80" y1="80" x2="120" y2="110"stroke="oklch(0.88 0.05 255)" strokeWidth="1.5" strokeDasharray="4 3" />
          <line x1="80" y1="80" x2="80"  y2="32"  stroke="oklch(0.88 0.07 47)"  strokeWidth="1.5" strokeDasharray="4 3" />
          {/* Satellite nodes */}
          <circle cx="40"  cy="50"  r="10" fill="oklch(0.93 0.07 145)" stroke="oklch(0.78 0.14 145)" strokeWidth="1.5" />
          <circle cx="120" cy="50"  r="10" fill="oklch(0.95 0.07 47)"  stroke="oklch(0.82 0.16 47)"  strokeWidth="1.5" />
          <circle cx="40"  cy="110" r="10" fill="oklch(0.93 0.05 255)" stroke="oklch(0.72 0.18 255)" strokeWidth="1.5" />
          <circle cx="120" cy="110" r="10" fill="oklch(0.95 0.05 320)" stroke="oklch(0.72 0.16 320)" strokeWidth="1.5" />
          <circle cx="80"  cy="32"  r="7"  fill="oklch(0.94 0.06 85)"  stroke="oklch(0.78 0.14 85)"  strokeWidth="1.5" />
          {/* Central Dna node */}
          <circle cx="80" cy="80" r="20" fill="oklch(0.95 0.07 47)" stroke="oklch(0.72 0.19 47)" strokeWidth="2" />
          <text x="80" y="85" textAnchor="middle" fontSize="13" fill="oklch(0.52 0.18 47)" fontWeight="700">?</text>
        </svg>
      </div>

      <div className="flex flex-col gap-2 max-w-sm">
        <h2 className="text-xl font-bold text-foreground text-balance">
          What do you want to learn?
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Type any STEM topic above and your AI-generated learning roadmap will appear here — step by step, resource by resource.
        </p>
      </div>

      {/* Suggested topics grid */}
      <div className="w-full max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Popular topics to explore
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SUGGESTED_TOPICS.map((topic) => (
            <button
              key={topic.title}
              onClick={() => {
                // NLP has a dedicated detailed page
                if (topic.title === "Natural Language Processing") {
                  window.location.href = "/roadmap/nlp"
                  return
                }
                onSuggest(topic.title)
              }}
              className="flex flex-col gap-2.5 p-4 rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all duration-200 text-left group"
            >
              {/* Subject pill */}
              <span
                className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full w-fit"
                style={{ background: topic.bgColor, color: topic.color }}
              >
                {topic.subject}
              </span>

              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                  {topic.title}
                </span>
                <span className="text-xs text-muted-foreground leading-relaxed">
                  {topic.description}
                </span>
              </div>

              <div className="flex items-center gap-3 mt-auto pt-1">
                <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Layers className="size-3" />
                  {topic.steps} modules
                </span>
                <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Clock className="size-3" />
                  {topic.time}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Loading skeleton ───────────────────────────────────────────────────────
function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      <div className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-32 rounded-full bg-muted" />
        </div>
        <div className="h-6 w-64 rounded-lg bg-muted" />
        <div className="h-4 w-full rounded-lg bg-muted" />
        <div className="h-4 w-4/5 rounded-lg bg-muted" />
        <div className="flex gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-14 w-28 rounded-xl bg-muted" />
          ))}
        </div>
      </div>
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-4">
          <div className="size-7 rounded-full bg-muted shrink-0 mt-1" />
          <div className="flex-1 rounded-2xl border border-border bg-card p-5 flex flex-col gap-3">
            <div className="h-4 w-48 rounded bg-muted" />
            <div className="h-3 w-28 rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Main page client ───────────────────────────────────────────────────────
export function RoadmapClient() {
  const [query, setQuery] = useState("")
  const [roadmap, setRoadmap] = useState<GeneratedRoadmap | null>(null)
  const [isPending, startTransition] = useTransition()
  const [generatedFor, setGeneratedFor] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const generate = (topic: string) => {
    const trimmed = topic.trim()
    if (!trimmed) return
    setQuery(trimmed)
    setRoadmap(null)

    startTransition(() => {
      // Simulate AI generation delay for UX
      setTimeout(() => {
        const result = getRoadmap(trimmed)
        setRoadmap(result)
        setGeneratedFor(trimmed)

        if (typeof window !== "undefined" && window.pendo && result) {
          pendo.track("roadmap_generated", {
            topic: trimmed,
            steps_count: result.steps.length,
            total_time: result.totalTime,
            source: "search",
          })
        }

        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
        }, 100)
      }, 1400)
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    generate(query)
  }

  const handleSuggest = (topic: string) => {
    setQuery(topic)
    generate(topic)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleReset = () => {
    setRoadmap(null)
    setQuery("")
    setGeneratedFor("")
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  const showEmpty = !isPending && !roadmap

  return (
    <div className="min-h-screen bg-background">
      {/* ── Navbar ── */}
      <AppTopBar pageLabel="Roadmap Generator" />

      {/* ── Hero + Search ── */}
      <div className="bg-background border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-10 flex flex-col gap-6">
          {/* Page heading */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                AI Roadmap Generator
              </span>
            </div>
            <h1 className="text-3xl font-bold text-foreground text-balance tracking-tight">
              Generate your learning roadmap
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
              Enter any STEM topic and get a complete, step-by-step learning pathway with curated resources — tailored to your level.
            </p>
          </div>

          {/* Search form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What do you want to learn? e.g. Machine Learning"
                className="w-full pl-11 pr-4 py-3 text-sm rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary transition-all shadow-sm"
                autoFocus
              />
            </div>
            <Button
              type="submit"
              disabled={!query.trim() || isPending}
              className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 font-semibold px-6 rounded-xl h-[46px] shrink-0 disabled:opacity-60"
            >
              {isPending ? (
                <>
                  <span className="size-3.5 rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <ArrowRight className="size-4" />
                  Generate Roadmap
                </>
              )}
            </Button>
          </form>

          {/* Breadcrumb when roadmap is showing */}
          {roadmap && (
            <div className="flex items-center gap-2 text-sm">
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                <RotateCcw className="size-3.5" />
                New search
              </button>
              <ChevronRight className="size-3.5 text-muted-foreground" />
              <span className="text-foreground font-medium truncate">{generatedFor}</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Main content ── */}
      <main className="max-w-4xl mx-auto px-6 py-8" ref={resultsRef}>
        {isPending && <LoadingSkeleton />}
        {!isPending && roadmap && <RoadmapDisplay roadmap={roadmap} />}
        {showEmpty && <EmptyState onSuggest={handleSuggest} />}
      </main>
    </div>
  )
}
