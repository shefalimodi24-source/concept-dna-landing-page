import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Network, Map, Dna, Radar } from "lucide-react"

const features = [
  {
    icon: Network,
    title: "Knowledge Graph Mapping",
    description:
      "Visualize your entire STEM knowledge as an interconnected graph. See how every concept links to the next and instantly understand what you know — and what you&apos;re missing.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Map,
    title: "AI Roadmap Generator",
    description:
      "Our AI generates a step-by-step learning roadmap tailored specifically to your current knowledge and your target career or academic goal.",
    color: "text-accent-foreground",
    bg: "bg-accent",
  },
  {
    icon: Dna,
    title: "STEM DNA Analysis",
    description:
      "Receive a rich profile of your unique STEM strengths and weaknesses — your personal STEM DNA — updated dynamically as you learn.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Radar,
    title: "Skill Gap Detection",
    description:
      "Our AI continuously scans your knowledge graph to surface hidden prerequisite gaps that are quietly blocking your progress.",
    color: "text-accent-foreground",
    bg: "bg-accent",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24" aria-labelledby="features-heading">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Features
          </p>
          <h2
            id="features-heading"
            className="text-4xl font-bold tracking-tight text-foreground text-balance"
          >
            Everything you need to master STEM
          </h2>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed text-pretty">
            Concept DNA combines AI-driven analysis, visual knowledge mapping, and personalized roadmaps to give you the clearest view of your learning journey.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card
                key={feature.title}
                className="border border-border bg-card hover:shadow-md transition-shadow duration-200 rounded-2xl"
              >
                <CardHeader className="pb-2">
                  <div className={`size-11 rounded-xl ${feature.bg} flex items-center justify-center mb-3`}>
                    <Icon className={`size-5 ${feature.color}`} aria-hidden="true" />
                  </div>
                  <CardTitle className="text-lg font-bold text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.title === "Knowledge Graph Mapping"
                      ? "Visualize your entire STEM knowledge as an interconnected graph. See how every concept links to the next and instantly understand what you know — and what you're missing."
                      : feature.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
