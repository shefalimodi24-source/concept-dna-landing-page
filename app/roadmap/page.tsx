import type { Metadata } from "next"
import { RoadmapClient } from "./roadmap-client"

export const metadata: Metadata = {
  title: "AI Roadmap Generator — Concept DNA",
  description:
    "Generate a complete, step-by-step STEM learning pathway for any topic. Curated resources, difficulty levels, and progress tracking — powered by AI.",
}

export default function RoadmapPage() {
  return <RoadmapClient />
}
