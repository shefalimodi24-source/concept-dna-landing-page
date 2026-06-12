import { ClipboardCheck, Dna, Network, Search, Route } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: ClipboardCheck,
    title: "Take Assessment",
    description:
      "Answer a smart diagnostic across all STEM domains. Our AI calibrates difficulty in real-time to precisely map your existing knowledge.",
  },
  {
    number: "02",
    icon: Dna,
    title: "Generate STEM DNA",
    description:
      "Instantly receive your personalized STEM DNA profile — a rich breakdown of your strengths, proficiencies, and focus areas across every subject.",
  },
  {
    number: "03",
    icon: Network,
    title: "Build Knowledge Graph",
    description:
      "Your DNA is transformed into a beautiful, interactive knowledge graph that shows all your STEM concepts and their prerequisite relationships.",
  },
  {
    number: "04",
    icon: Search,
    title: "Discover Gaps",
    description:
      "AI scans your graph to surface hidden gaps — the missing prerequisites and weak concepts quietly blocking your progress toward your goal.",
  },
  {
    number: "05",
    icon: Route,
    title: "Follow Roadmap",
    description:
      "Receive a step-by-step AI-generated roadmap that fills your gaps in the optimal order and takes you from where you are to where you want to be.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-secondary/40" aria-labelledby="how-it-works-heading">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">How It Works</p>
          <h2
            id="how-it-works-heading"
            className="text-4xl font-bold tracking-tight text-foreground text-balance"
          >
            From zero to mastery in five steps
          </h2>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed text-pretty">
            A clear, repeatable process that shows you exactly where you are and exactly what to do next.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div
            className="hidden lg:block absolute top-11 left-[calc(10%-1px)] right-[calc(10%-1px)] h-px bg-border"
            aria-hidden="true"
          />

          <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4" aria-label="Steps">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <li key={step.number} className="flex flex-col items-center text-center gap-4">
                  {/* Icon circle */}
                  <div className="relative flex items-center justify-center">
                    <div className="size-[88px] rounded-full bg-background border-2 border-border flex items-center justify-center shadow-sm z-10 transition-colors hover:border-primary group">
                      <Icon className="size-7 text-primary" aria-hidden="true" />
                    </div>
                    <span className="absolute -top-2 -right-1 size-6 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shadow z-20">
                      {i + 1}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-foreground text-base">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
