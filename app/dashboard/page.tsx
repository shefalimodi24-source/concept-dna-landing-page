"use client"

import { useState } from "react"
import {
  Dna, LayoutDashboard, Network, Map, FileText, Compass, Settings,
  User, ChevronRight, ArrowRight, Zap, Target, Brain, TrendingUp,
  CheckCircle2, Clock, Flame, Trophy, BookOpen, Lock, Play,
  BarChart3, Star, Menu, X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// ── Mini graph data ─────────────────────────────────────────────────────────

const MINI_NODES = [
  { id: "python",   label: "Python",      cx: 80,  cy: 80,  status: "mastered" },
  { id: "stats",    label: "Statistics",  cx: 220, cy: 60,  status: "mastered" },
  { id: "ml",       label: "Machine Learning", cx: 360, cy: 100, status: "learning" },
  { id: "lin-alg",  label: "Linear Algebra",   cx: 150, cy: 200, status: "weak" },
  { id: "prob",     label: "Probability", cx: 300, cy: 220, status: "weak" },
  { id: "nn",       label: "Neural Nets", cx: 80,  cy: 310, status: "locked" },
  { id: "embed",    label: "Embeddings",  cx: 280, cy: 330, status: "locked" },
  { id: "tf",       label: "Transformers",cx: 420, cy: 260, status: "locked" },
]

const MINI_EDGES = [
  ["python", "ml"], ["stats", "ml"], ["lin-alg", "ml"],
  ["ml", "nn"], ["lin-alg", "embed"], ["prob", "embed"],
  ["embed", "tf"], ["nn", "tf"],
]

const STATUS_COLOR = {
  mastered: { bg: "oklch(0.85 0.14 145)", ring: "oklch(0.72 0.18 145)", text: "oklch(0.35 0.14 145)" },
  learning: { bg: "oklch(0.90 0.14 85)",  ring: "oklch(0.72 0.18 85)",  text: "oklch(0.45 0.16 85)" },
  weak:     { bg: "oklch(0.88 0.18 25)",  ring: "oklch(0.65 0.22 25)",  text: "oklch(0.45 0.20 25)" },
  locked:   { bg: "oklch(0.88 0.01 255)", ring: "oklch(0.72 0.04 255)", text: "oklch(0.50 0.01 255)" },
} as const

// ── Sidebar nav items ────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: "Dashboard",       icon: LayoutDashboard, href: "/dashboard", active: true },
  { label: "Knowledge Graph", icon: Network,         href: "/graph" },
  { label: "Roadmaps",        icon: Map,             href: "/roadmap" },
  { label: "STEM DNA Report", icon: FileText,        href: "/report" },
  { label: "Concept Explorer",icon: Compass,         href: "/graph" },
  { label: "Settings",        icon: Settings,        href: "#" },
]

const UPCOMING_SECTIONS = [
  { label: "Machine Learning",  locked: false },
  { label: "Deep Learning",     locked: true },
  { label: "Transformers",      locked: true },
  { label: "NLP Applications",  locked: true },
]

const CAREER_READINESS = [
  { title: "AI Engineer",                 pct: 68, color: "oklch(0.72 0.19 47)" },
  { title: "Machine Learning Engineer",   pct: 61, color: "oklch(0.55 0.20 255)" },
  { title: "NLP Engineer",                pct: 41, color: "oklch(0.65 0.17 145)" },
  { title: "NLP Researcher",              pct: 35, color: "oklch(0.55 0.18 320)" },
]

const AI_INSIGHTS = [
  { icon: Star,       text: "Your strongest area is Python Programming.", color: "oklch(0.65 0.17 145)" },
  { icon: Target,     text: "Linear Algebra is your highest-impact improvement opportunity.", color: "oklch(0.72 0.19 47)" },
  { icon: Zap,        text: "Completing Probability will unlock Machine Learning Foundations.", color: "oklch(0.55 0.20 255)" },
  { icon: TrendingUp, text: "You are 41% ready for advanced NLP topics.", color: "oklch(0.55 0.18 320)" },
]

// ── Mini Graph ───────────────────────────────────────────────────────────────

function MiniGraph() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <svg viewBox="0 0 500 400" className="w-full h-full" aria-label="Knowledge graph preview">
      <defs>
        <pattern id="mini-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="oklch(0.93 0.003 255)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="500" height="400" fill="url(#mini-grid)" />

      {/* Edges */}
      {MINI_EDGES.map(([a, b]) => {
        const na = MINI_NODES.find((n) => n.id === a)!
        const nb = MINI_NODES.find((n) => n.id === b)!
        const isHl = hovered === a || hovered === b
        return (
          <line
            key={`${a}-${b}`}
            x1={na.cx} y1={na.cy} x2={nb.cx} y2={nb.cy}
            stroke={isHl ? "oklch(0.72 0.19 47)" : "oklch(0.80 0.02 255)"}
            strokeWidth={isHl ? 2 : 1.5}
            strokeOpacity={isHl ? 0.9 : 0.5}
            strokeDasharray={nb.status === "locked" ? "6 4" : undefined}
          />
        )
      })}

      {/* Nodes */}
      {MINI_NODES.map((node) => {
        const meta = STATUS_COLOR[node.status as keyof typeof STATUS_COLOR]
        const isHl = hovered === node.id
        return (
          <g
            key={node.id}
            style={{ cursor: "pointer" }}
            onMouseEnter={() => setHovered(node.id)}
            onMouseLeave={() => setHovered(null)}
          >
            {isHl && <circle cx={node.cx} cy={node.cy} r={22} fill={meta.ring} opacity="0.2" />}
            <circle
              cx={node.cx} cy={node.cy} r={16}
              fill={meta.bg} stroke={meta.ring} strokeWidth="2"
            />
            {node.status === "locked" && (
              <path
                d={`M${node.cx - 4} ${node.cy - 1} a4 4 0 0 1 8 0v3h-8v-3z`}
                fill={meta.text} opacity="0.8"
              />
            )}
            <text
              x={node.cx} y={node.cy + 28}
              textAnchor="middle" fontSize="9" fontWeight="600"
              fill={meta.text}
            >
              {node.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

// ── Dashboard ────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans">

      {/* ── Sidebar ── */}
      <aside
        className={cn(
          "flex flex-col shrink-0 border-r border-border bg-sidebar transition-all duration-300",
          "fixed inset-y-0 left-0 z-40 w-60 md:relative md:flex",
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="px-5 h-16 flex items-center gap-3 border-b border-border shrink-0">
          <div className="size-8 rounded-xl bg-primary flex items-center justify-center shadow-sm">
            <Dna className="size-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-base text-foreground tracking-tight">
            Concept <span className="text-primary">DNA</span>
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                item.active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="size-4 shrink-0" />
              {item.label}
              {item.active && (
                <span className="ml-auto size-1.5 rounded-full bg-primary" />
              )}
            </a>
          ))}
        </nav>

        {/* User profile */}
        <div className="px-3 py-4 border-t border-border shrink-0">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted transition-colors cursor-pointer">
            <div className="size-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs shrink-0">
              S
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">Sarah Chen</p>
              <p className="text-xs text-muted-foreground truncate">NLP Engineer Track</p>
            </div>
            <Settings className="size-3.5 text-muted-foreground shrink-0" />
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-foreground/20 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <header className="shrink-0 h-16 border-b border-border bg-background/95 backdrop-blur flex items-center justify-between px-6 gap-4">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-1.5 rounded-lg hover:bg-muted text-muted-foreground"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
            <div>
              <h1 className="text-base font-bold text-foreground leading-tight">Welcome back, Sarah</h1>
              <p className="text-xs text-muted-foreground leading-tight hidden sm:block">
                Your personalized roadmap to becoming an NLP Engineer.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Badge className="hidden sm:flex bg-accent text-accent-foreground border-0 rounded-full font-medium text-xs px-3 gap-1.5">
              <BookOpen className="size-3" />
              Natural Language Processing
            </Badge>
            <Badge
              className="rounded-full font-semibold text-xs px-3"
              style={{ background: "oklch(0.95 0.07 47)", color: "oklch(0.50 0.18 47)" }}
            >
              41% Ready
            </Badge>
            <Button size="sm" nativeButton={false} render={<a href="/" />}
              variant="ghost" className="text-muted-foreground hover:text-foreground text-xs gap-1.5">
              Home
            </Button>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto px-6 py-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col gap-6">

            {/* ── Overview cards ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  label: "STEM DNA Score", value: "72%", sub: "+4% this week",
                  icon: Brain, color: "oklch(0.72 0.19 47)", bg: "oklch(0.95 0.07 47)",
                },
                {
                  label: "Concepts Mastered", value: "12 / 42", sub: "28.6% complete",
                  icon: CheckCircle2, color: "oklch(0.55 0.20 255)", bg: "oklch(0.93 0.06 255)",
                },
                {
                  label: "Knowledge Gaps", value: "30", sub: "Focus: Linear Algebra",
                  icon: Target, color: "oklch(0.65 0.22 25)", bg: "oklch(0.95 0.06 25)",
                },
                {
                  label: "Est. Completion", value: "7 Months", sub: "At current pace",
                  icon: Clock, color: "oklch(0.55 0.18 320)", bg: "oklch(0.95 0.04 320)",
                },
              ].map((card) => (
                <div
                  key={card.label}
                  className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-3 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      {card.label}
                    </span>
                    <div
                      className="size-8 rounded-xl flex items-center justify-center"
                      style={{ background: card.bg }}
                    >
                      <card.icon className="size-4" style={{ color: card.color }} />
                    </div>
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-foreground leading-none">{card.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{card.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Main 2-col layout ── */}
            <div className="flex flex-col lg:flex-row gap-6">

              {/* Left column */}
              <div className="flex-1 flex flex-col gap-6 min-w-0">

                {/* Continue Your Journey */}
                <section className="flex flex-col gap-3">
                  <h2 className="text-sm font-bold text-foreground uppercase tracking-wide">
                    Continue Your Journey
                  </h2>
                  <div
                    className="rounded-2xl border border-border overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, oklch(0.99 0 0) 0%, oklch(0.97 0.03 255) 100%)",
                    }}
                  >
                    <div className="p-6 flex flex-col sm:flex-row gap-6 items-start">
                      {/* Left: info */}
                      <div className="flex-1 flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                          <div
                            className="size-10 rounded-xl flex items-center justify-center"
                            style={{ background: "oklch(0.95 0.07 47)" }}
                          >
                            <Brain className="size-5" style={{ color: "oklch(0.52 0.18 47)" }} />
                          </div>
                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                              Recommended Next Concept
                            </p>
                            <p className="text-xl font-extrabold text-foreground leading-tight">Linear Algebra</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Mastering Linear Algebra unlocks Neural Networks, Embeddings, and Transformers — three critical pillars of your NLP journey.
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge className="rounded-full text-[11px] font-medium px-2.5 py-0.5"
                            style={{ background: "oklch(0.95 0.06 255)", color: "oklch(0.45 0.18 255)", border: "none" }}>
                            Mathematics
                          </Badge>
                          <Badge className="rounded-full text-[11px] font-medium px-2.5 py-0.5"
                            style={{ background: "oklch(0.95 0.06 25)", color: "oklch(0.45 0.20 25)", border: "none" }}>
                            Weak Area
                          </Badge>
                          <Badge className="rounded-full text-[11px] font-medium px-2.5 py-0.5"
                            style={{ background: "oklch(0.95 0.07 47)", color: "oklch(0.50 0.18 47)", border: "none" }}>
                            20 hrs
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3">
                          <Button
                            size="sm"
                            className="gap-1.5 font-semibold rounded-xl"
                            style={{ background: "oklch(0.72 0.19 47)", color: "#fff" }}
                            nativeButton={false}
                            render={<a href="/concept/linear-algebra" />}
                          >
                            <Play className="size-3.5" />
                            Start Learning
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-1.5 font-medium rounded-xl"
                            nativeButton={false}
                            render={<a href="/concept/linear-algebra" />}
                          >
                            View Concept Details
                            <ChevronRight className="size-3.5" />
                          </Button>
                        </div>
                      </div>
                      {/* Right: mastery ring */}
                      <div className="shrink-0 flex flex-col items-center gap-2">
                        <svg viewBox="0 0 80 80" className="size-20">
                          <circle cx="40" cy="40" r="32" fill="none" stroke="oklch(0.93 0.005 255)" strokeWidth="7" />
                          <circle
                            cx="40" cy="40" r="32" fill="none"
                            stroke="oklch(0.65 0.22 25)" strokeWidth="7"
                            strokeLinecap="round" strokeDasharray="201"
                            strokeDashoffset={201 * (1 - 0.22)}
                            transform="rotate(-90 40 40)"
                          />
                          <text x="40" y="44" textAnchor="middle" fontSize="14" fontWeight="800" fill="oklch(0.12 0.005 255)">22%</text>
                        </svg>
                        <p className="text-[10px] text-muted-foreground font-medium text-center">Mastery</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Knowledge Graph Preview */}
                <section className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-bold text-foreground uppercase tracking-wide">
                      Knowledge Graph Preview
                    </h2>
                    <Button
                      size="sm" variant="ghost"
                      className="gap-1 text-xs text-muted-foreground hover:text-foreground font-medium"
                      nativeButton={false} render={<a href="/graph" />}
                    >
                      Open Full Graph <ChevronRight className="size-3.5" />
                    </Button>
                  </div>
                  <div className="rounded-2xl border border-border bg-card overflow-hidden">
                    <div className="h-64 sm:h-80 p-2">
                      <MiniGraph />
                    </div>
                    {/* Legend */}
                    <div className="px-4 py-3 border-t border-border flex items-center gap-4 flex-wrap">
                      {(["mastered", "learning", "weak", "locked"] as const).map((s) => (
                        <div key={s} className="flex items-center gap-1.5">
                          <span
                            className="size-2.5 rounded-full"
                            style={{ background: STATUS_COLOR[s].ring }}
                          />
                          <span className="text-[11px] font-medium text-muted-foreground capitalize">{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* AI Insights */}
                <section className="flex flex-col gap-3">
                  <h2 className="text-sm font-bold text-foreground uppercase tracking-wide">
                    AI Insights
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {AI_INSIGHTS.map((insight, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-border bg-card p-4 flex items-start gap-3 hover:shadow-sm transition-shadow"
                      >
                        <div
                          className="size-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                          style={{ background: insight.color + "22" }}
                        >
                          <insight.icon className="size-4" style={{ color: insight.color }} />
                        </div>
                        <p className="text-sm text-foreground leading-relaxed">{insight.text}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Roadmap Progress */}
                <section className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-bold text-foreground uppercase tracking-wide">
                      Roadmap Progress
                    </h2>
                    <Button
                      size="sm" variant="ghost"
                      className="gap-1 text-xs text-muted-foreground hover:text-foreground font-medium"
                      nativeButton={false} render={<a href="/roadmap/nlp" />}
                    >
                      View Full Roadmap <ChevronRight className="size-3.5" />
                    </Button>
                  </div>
                  <div className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-5">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div>
                        <p className="font-bold text-foreground">Natural Language Processing Roadmap</p>
                        <p className="text-xs text-muted-foreground mt-0.5">12 / 42 Concepts Complete</p>
                      </div>
                      <span className="text-2xl font-extrabold" style={{ color: "oklch(0.72 0.19 47)" }}>
                        29%
                      </span>
                    </div>
                    {/* Progress bar */}
                    <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ width: "29%", background: "oklch(0.72 0.19 47)" }}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full"
                          style={{ background: "oklch(0.93 0.06 255)", color: "oklch(0.45 0.18 255)" }}
                        >
                          Current Section
                        </div>
                        <span className="text-sm font-semibold text-foreground">Mathematics Foundations</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full"
                          style={{ background: "oklch(0.95 0.07 47)", color: "oklch(0.50 0.18 47)" }}
                        >
                          Next Milestone
                        </div>
                        <span className="text-sm text-muted-foreground">Complete Linear Algebra</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                        Upcoming Sections
                      </p>
                      {UPCOMING_SECTIONS.map((section) => (
                        <div key={section.label} className="flex items-center gap-2.5 text-sm">
                          {section.locked
                            ? <Lock className="size-3.5 text-muted-foreground shrink-0" />
                            : <ChevronRight className="size-3.5 shrink-0" style={{ color: "oklch(0.72 0.19 47)" }} />
                          }
                          <span className={cn(section.locked ? "text-muted-foreground" : "text-foreground font-medium")}>
                            {section.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Career Readiness */}
                <section className="flex flex-col gap-3">
                  <h2 className="text-sm font-bold text-foreground uppercase tracking-wide">
                    Career Readiness
                  </h2>
                  <div className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-4">
                    {CAREER_READINESS.map((career) => (
                      <div key={career.title} className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-foreground">{career.title}</span>
                          <span className="text-sm font-bold" style={{ color: career.color }}>
                            {career.pct}%
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{ width: `${career.pct}%`, background: career.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

              </div>

              {/* ── Right Sidebar ── */}
              <aside className="w-full lg:w-72 shrink-0 flex flex-col gap-4">

                {/* Today's Focus */}
                <div
                  className="rounded-2xl border border-primary/20 p-5 flex flex-col gap-4"
                  style={{ background: "linear-gradient(135deg, oklch(0.97 0.04 47) 0%, oklch(0.99 0.01 255) 100%)" }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="size-8 rounded-xl flex items-center justify-center"
                      style={{ background: "oklch(0.72 0.19 47)", color: "#fff" }}
                    >
                      <Target className="size-4" />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Today&apos;s Focus
                    </p>
                  </div>
                  <div>
                    <p className="text-xl font-extrabold text-foreground">Linear Algebra</p>
                    <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
                      <Clock className="size-3.5" />
                      Estimated: 45 Minutes
                    </p>
                  </div>
                  <Button
                    size="sm"
                    className="w-full gap-1.5 font-semibold rounded-xl"
                    style={{ background: "oklch(0.72 0.19 47)", color: "#fff" }}
                    nativeButton={false}
                    render={<a href="/concept/linear-algebra" />}
                  >
                    Start Session
                    <ArrowRight className="size-3.5" />
                  </Button>
                </div>

                {/* Streak & Achievement */}
                <div className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="size-9 rounded-xl flex items-center justify-center"
                        style={{ background: "oklch(0.95 0.08 47)", color: "oklch(0.52 0.18 47)" }}
                      >
                        <Flame className="size-5" />
                      </div>
                      <div>
                        <p className="text-2xl font-extrabold text-foreground leading-none">14</p>
                        <p className="text-xs text-muted-foreground">Day Streak</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      {[1,1,1,1,1,1,0].map((on, i) => (
                        <div
                          key={i}
                          className="size-2 rounded-full"
                          style={{ background: on ? "oklch(0.72 0.19 47)" : "oklch(0.90 0.005 255)" }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent Achievement */}
                <div className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Recent Achievement
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="size-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "oklch(0.93 0.07 145)", color: "oklch(0.40 0.16 145)" }}
                    >
                      <Trophy className="size-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">Statistics Fundamentals</p>
                      <p className="text-xs text-muted-foreground">Completed 2 days ago</p>
                    </div>
                  </div>
                </div>

                {/* Upcoming Goal */}
                <div className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Upcoming Goal
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="size-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "oklch(0.93 0.05 255)", color: "oklch(0.45 0.18 255)" }}
                    >
                      <BarChart3 className="size-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">Start Neural Networks</p>
                      <p className="text-xs text-muted-foreground">Unlock after Linear Algebra</p>
                    </div>
                  </div>
                </div>

                {/* Quick links */}
                <div className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                    Quick Links
                  </p>
                  {[
                    { label: "Knowledge Graph",  href: "/graph",        icon: Network },
                    { label: "NLP Roadmap",       href: "/roadmap/nlp",  icon: Map },
                    { label: "STEM DNA Report",   href: "/report",       icon: FileText },
                    { label: "Assessment",        href: "/assessment",   icon: BarChart3 },
                  ].map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors font-medium"
                    >
                      <link.icon className="size-3.5 shrink-0" />
                      {link.label}
                    </a>
                  ))}
                </div>

              </aside>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
