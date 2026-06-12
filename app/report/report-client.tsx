"use client"

import { Dna, Download, Share2, ArrowRight, Eye, Brain, Layers, Grid, Activity, TrendingUp, Zap, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScoreRing } from "./score-ring"
import { StemRadar } from "./stem-radar"
import { SubjectBar } from "./subject-bar"
import { CareerCard } from "./career-card"
import { reportData } from "./data"
import { cn } from "@/lib/utils"

const profileIconMap: Record<string, React.ReactNode> = {
  eye: <Eye className="size-4" />,
  brain: <Brain className="size-4" />,
  layers: <Layers className="size-4" />,
}

const conceptIconMap: Record<string, React.ReactNode> = {
  grid: <Grid className="size-4" />,
  wave: <Activity className="size-4" />,
  arrow: <TrendingUp className="size-4" />,
}

const difficultyColors: Record<string, { bg: string; text: string }> = {
  Easy: { bg: "oklch(0.94 0.06 145)", text: "oklch(0.40 0.16 145)" },
  Medium: { bg: "oklch(0.95 0.07 47)", text: "oklch(0.50 0.18 47)" },
  Hard: { bg: "oklch(0.95 0.06 20)", text: "oklch(0.55 0.22 20)" },
}

export function ReportClient() {
  const d = reportData

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar strip */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="size-7 rounded-lg bg-primary flex items-center justify-center">
              <Dna className="size-3.5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-sm text-foreground">
              Concept <span className="text-primary">DNA</span>
            </span>
          </a>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground">
              <Share2 className="size-3.5" />
              Share
            </Button>
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1.5">
              <Download className="size-3.5" />
              Export PDF
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-10">

        {/* ── Page Header ── */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              AI-Generated Report
            </span>
            <span className="text-xs text-muted-foreground">·</span>
            <span className="text-xs text-muted-foreground">{d.generatedAt}</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight text-balance">
            Your STEM DNA
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            A personalized AI-generated learning profile based on your assessment responses, {d.name}.
          </p>
        </div>

        {/* ── Overall Score Hero Card ── */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="px-8 py-7 flex flex-col md:flex-row items-center gap-8">
            {/* Score Ring */}
            <div className="flex flex-col items-center gap-3 flex-shrink-0">
              <ScoreRing score={d.overallScore} size={148} strokeWidth={11} />
              <div className="flex items-center gap-1.5">
                <div className="size-2 rounded-full bg-primary" />
                <span className="text-xs text-muted-foreground font-medium">Overall Knowledge Score</span>
              </div>
            </div>

            <Separator orientation="vertical" className="hidden md:block h-32 self-center" />
            <Separator className="md:hidden w-full" />

            {/* Quick stats */}
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
              {[
                { label: "Strongest Subject", value: "Statistics", sub: "88% mastery", color: "oklch(0.58 0.17 145)" },
                { label: "Biggest Gap", value: "Linear Algebra", sub: "41% mastery", color: "oklch(0.55 0.20 255)" },
                { label: "Top Career Match", value: "Data Scientist", sub: "84% alignment", color: "oklch(0.72 0.19 47)" },
                { label: "Learning Style", value: "Visual", sub: "Diagram-first", color: "oklch(0.55 0.18 320)" },
                { label: "Subjects Assessed", value: "6 Areas", sub: "STEM coverage", color: "oklch(0.64 0.19 85)" },
                { label: "Next Priority", value: "Matrices", sub: "Recommended", color: "oklch(0.72 0.19 47)" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-0.5 p-3 rounded-xl bg-muted/50">
                  <span className="text-xs text-muted-foreground font-medium leading-tight">{stat.label}</span>
                  <span className="text-sm font-bold text-foreground leading-snug">{stat.value}</span>
                  <span className="text-xs font-medium" style={{ color: stat.color }}>{stat.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Two-column layout: Radar + Strengths/Weak ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Radar Chart */}
          <div className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-4">
            <div className="flex flex-col gap-0.5">
              <h2 className="text-base font-semibold text-foreground">Knowledge Radar</h2>
              <p className="text-xs text-muted-foreground">Visual map of your STEM subject coverage</p>
            </div>
            <StemRadar data={d.radarData} />
            <div className="flex items-center gap-3 pt-1">
              <div className="flex items-center gap-1.5">
                <div className="size-2.5 rounded-full" style={{ background: "oklch(0.72 0.19 47)" }} />
                <span className="text-xs text-muted-foreground">Your score</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="size-2.5 rounded-full bg-muted" />
                <span className="text-xs text-muted-foreground">100% benchmark</span>
              </div>
            </div>
          </div>

          {/* Strengths + Weak Areas */}
          <div className="flex flex-col gap-4">
            {/* Strengths */}
            <div className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-4 flex-1">
              <div className="flex items-center gap-2">
                <div className="size-6 rounded-lg flex items-center justify-center" style={{ background: "oklch(0.93 0.07 145)" }}>
                  <Zap className="size-3.5" style={{ color: "oklch(0.42 0.16 145)" }} />
                </div>
                <h2 className="text-base font-semibold text-foreground">Strength Areas</h2>
              </div>
              <div className="flex flex-col gap-4">
                {d.strengths.map((s, i) => (
                  <SubjectBar
                    key={s.subject}
                    label={s.subject}
                    score={s.score}
                    detail={s.detail}
                    color="oklch(0.58 0.17 145)"
                    delay={i * 100}
                    variant="strength"
                  />
                ))}
              </div>
            </div>

            {/* Weak Areas */}
            <div className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-4 flex-1">
              <div className="flex items-center gap-2">
                <div className="size-6 rounded-lg flex items-center justify-center" style={{ background: "oklch(0.93 0.05 255)" }}>
                  <Activity className="size-3.5" style={{ color: "oklch(0.45 0.18 255)" }} />
                </div>
                <h2 className="text-base font-semibold text-foreground">Weak Areas</h2>
              </div>
              <div className="flex flex-col gap-4">
                {d.weakAreas.map((w, i) => (
                  <SubjectBar
                    key={w.subject}
                    label={w.subject}
                    score={w.score}
                    detail={w.detail}
                    color="oklch(0.55 0.20 255)"
                    delay={i * 100}
                    variant="weak"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Learning Profile ── */}
        <div className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-5">
          <div className="flex flex-col gap-0.5">
            <h2 className="text-base font-semibold text-foreground">Learning Profile</h2>
            <p className="text-xs text-muted-foreground">How you learn best, based on your response patterns</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {d.learningProfile.map((trait) => (
              <div
                key={trait.trait}
                className="flex flex-col gap-3 p-4 rounded-xl border border-border bg-background hover:bg-muted/40 transition-colors duration-150"
              >
                <div
                  className="size-9 rounded-xl flex items-center justify-center"
                  style={{ background: "oklch(0.95 0.07 47)", color: "oklch(0.52 0.18 47)" }}
                >
                  {profileIconMap[trait.icon]}
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-foreground leading-snug">{trait.trait}</span>
                  <span className="text-xs text-muted-foreground leading-relaxed">{trait.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Recommended Next Concepts ── */}
        <div className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <h2 className="text-base font-semibold text-foreground">Recommended Next Concepts</h2>
              <p className="text-xs text-muted-foreground">AI-curated learning targets based on your gaps</p>
            </div>
            <Button variant="ghost" size="sm" className="gap-1 text-primary hover:text-primary/80 font-medium text-xs" nativeButton={false} render={<a href="/roadmap" />}>
              View full roadmap
              <ChevronRight className="size-3.5" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {d.nextConcepts.map((concept, i) => {
              const diff = difficultyColors[concept.difficulty] ?? difficultyColors["Medium"]
              return (
                <div
                  key={concept.label}
                  className="relative flex flex-col gap-3 p-4 rounded-xl border border-border bg-background hover:border-primary/40 hover:shadow-sm transition-all duration-150 cursor-pointer group"
                >
                  {/* Priority badge */}
                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] font-semibold text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full">
                      #{i + 1}
                    </span>
                  </div>
                  <div
                    className="size-9 rounded-xl flex items-center justify-center transition-colors"
                    style={{ background: "oklch(0.93 0.05 255)", color: "oklch(0.45 0.18 255)" }}
                  >
                    {conceptIconMap[concept.icon]}
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-foreground">{concept.label}</span>
                    <span className="text-xs text-muted-foreground leading-relaxed">{concept.reason}</span>
                  </div>
                  <span
                    className="text-[11px] font-semibold px-2 py-0.5 rounded-full w-fit"
                    style={{ background: diff.bg, color: diff.text }}
                  >
                    {concept.difficulty}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Career Alignment ── */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-0.5">
            <h2 className="text-base font-semibold text-foreground">Career Alignment</h2>
            <p className="text-xs text-muted-foreground">How well your current knowledge maps to top STEM career paths</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {d.careers.map((career, i) => (
              <CareerCard
                key={career.title}
                title={career.title}
                score={career.score}
                color={career.color}
                rank={i + 1}
                delay={i * 80}
              />
            ))}
          </div>
        </div>

        {/* ── CTA Footer ── */}
        <div className="rounded-2xl bg-foreground p-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex flex-col gap-1.5 text-center sm:text-left">
            <h3 className="text-lg font-bold text-background leading-snug">
              Ready to close your knowledge gaps?
            </h3>
            <p className="text-sm text-background/60 leading-relaxed">
              Start your AI-generated learning roadmap and track your progress in real time.
            </p>
          </div>
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 font-semibold flex-shrink-0"
            nativeButton={false}
            render={<a href="/graph" />}
          >
            Explore Knowledge Graph
            <ArrowRight className="size-4" />
          </Button>
        </div>

      </main>
    </div>
  )
}
