"use client"

import { Dna, ChevronRight, BookOpen, Map } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NLPRoadmapDisplay } from "../nlp-roadmap-display"
import { NLP_ROADMAP } from "../data"
import { AppTopBar } from "@/components/app-top-bar"

export default function NLPRoadmapPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ── Navbar ── */}
      <AppTopBar
        pageLabel="Natural Language Processing"
        parent={{ label: "Roadmap Generator", href: "/roadmap" }}
        rightSlot={
          <Button
            size="sm"
            variant="ghost"
            className="gap-1.5 text-muted-foreground hover:text-foreground font-medium text-xs"
            nativeButton={false}
            render={<a href="/roadmap" />}
          >
            <Map className="size-3.5" />
            <span className="hidden sm:inline">All Roadmaps</span>
          </Button>
        }
      />

      {/* ── Main content ── */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <NLPRoadmapDisplay roadmap={NLP_ROADMAP} />
      </main>
    </div>
  )
}
