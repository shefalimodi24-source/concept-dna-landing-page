import { GraphClient } from "./graph-client"

export const metadata = {
  title: "Knowledge Graph — Concept DNA",
  description: "Explore your STEM knowledge as an interactive interconnected graph.",
}

export default function GraphPage() {
  return <GraphClient />
}
