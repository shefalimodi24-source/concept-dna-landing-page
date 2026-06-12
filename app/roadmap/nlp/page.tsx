"use client"

import { Dna, ChevronRight, BookOpen, Map } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NLPRoadmapDisplay } from "../nlp-roadmap-display"
import { NLP_ROADMAP } from "../data"

export default function NLPRoadmapPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ── Navbar ── */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-2 shrink-0">
            <div className="size-7 rounded-lg bg-primary flex items-center justify-center">
              <Dna className="size-3.5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-sm text-foreground hidden sm:block">
              Concept <span className="text-primary">DNA</span>
            </span>
          </a>

          <div className="flex items-center gap-1.5 text-sm text-muted-foreground overflow-hidden">
            <a href="/roadmap" className="hover:text-foreground transition-colors shrink-0 hidden sm:block">
              Roadmap Generator
            </a>
            <ChevronRight className="size-3.5 shrink-0 hidden sm:block" />
            <span className="text-foreground font-medium truncate">Natural Language Processing</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              size="sm"
              variant="ghost"
              className="gap-1.5 text-muted-foreground hover:text-foreground font-medium"
              nativeButton={false}
              render={<a href="/roadmap" />}
            >
              <Map className="size-3.5" />
              <span className="hidden sm:inline">All Roadmaps</span>
            </Button>
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1.5 font-medium"
              nativeButton={false}
              render={<a href="/graph" />}
            >
              <BookOpen className="size-3.5" />
              <span className="hidden sm:inline">Knowledge Graph</span>
            </Button>
          </div>
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <NLPRoadmapDisplay roadmap={NLP_ROADMAP} />
      </main>
    </div>
  )
}
