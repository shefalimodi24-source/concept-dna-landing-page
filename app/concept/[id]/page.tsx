import { ConceptDetailClient } from "./concept-detail-client"

export async function generateStaticParams() {
  return [
    { id: "algebra" },
    { id: "functions" },
    { id: "trigonometry" },
    { id: "calculus" },
    { id: "linear-algebra" },
    { id: "probability" },
    { id: "statistics" },
    { id: "ml" },
    { id: "deep-learning" },
    { id: "transformers" },
  ]
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const label = id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  return {
    title: `${label} — Concept DNA`,
    description: `Deep dive into ${label}: overview, prerequisites, topics, applications, resources, and your personalised learning roadmap.`,
  }
}

export default function ConceptPage() {
  return <ConceptDetailClient />
}
