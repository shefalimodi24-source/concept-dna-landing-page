import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles } from "lucide-react"
import { KnowledgeGraph } from "@/components/knowledge-graph"

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden" aria-labelledby="hero-heading">
      {/* Subtle background decoration */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] opacity-[0.07]"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 0%, oklch(0.72 0.19 47), transparent 70%)",
          }}
        />
        <div
          className="absolute top-20 right-0 w-[600px] h-[400px] opacity-[0.05]"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 100% 0%, oklch(0.55 0.20 255), transparent 70%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <div className="flex flex-col gap-7">
            <div>
              <Badge
                variant="outline"
                className="mb-5 gap-1.5 text-primary border-primary/30 bg-primary/5 font-medium text-xs py-1 px-3 rounded-full"
              >
                <Sparkles className="size-3 text-primary" />
                The Google Maps of STEM Learning
              </Badge>

              <h1
                id="hero-heading"
                className="text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-foreground text-balance"
              >
                Map Your Knowledge.{" "}
                <span className="text-primary">Master STEM.</span>
              </h1>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed text-pretty max-w-lg">
              An AI-powered platform that maps your STEM understanding, identifies hidden knowledge gaps,
              and generates personalized learning roadmaps toward your academic and career goals.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md font-semibold px-7 rounded-xl gap-2"
                render={<a href="/assessment" />}
                nativeButton={false}
              >
                Get Started
                <ArrowRight className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="font-semibold px-7 rounded-xl border-border hover:bg-secondary text-foreground"
              >
                Explore Demo
              </Button>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-5 pt-1">
              <div className="flex -space-x-2">
                {["F", "J", "A", "M", "S"].map((initial, i) => (
                  <div
                    key={i}
                    className="size-8 rounded-full border-2 border-background flex items-center justify-center text-xs font-bold text-white"
                    style={{
                      backgroundColor: i % 2 === 0 ? "oklch(0.72 0.19 47)" : "oklch(0.55 0.20 255)",
                    }}
                    aria-hidden="true"
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">2,400+</span> students already mapping their STEM DNA
              </p>
            </div>
          </div>

          {/* Right: Knowledge Graph */}
          <div className="relative">
            <div className="relative rounded-2xl border border-border bg-white/80 shadow-xl overflow-hidden p-4 backdrop-blur-sm min-h-[420px]">
              {/* Card header */}
              <div className="flex items-center justify-between mb-4 px-2">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Your Knowledge Graph
                  </p>
                  <p className="text-sm font-bold text-foreground mt-0.5">Path to Machine Learning</p>
                </div>
                <Badge className="bg-primary/10 text-primary border-0 font-semibold text-xs rounded-full">
                  68% Complete
                </Badge>
              </div>

              <div className="h-[340px]">
                <KnowledgeGraph />
              </div>
            </div>

            {/* Floating AI badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl border border-border shadow-lg px-4 py-3 flex items-center gap-3">
              <div className="size-9 rounded-lg bg-accent flex items-center justify-center">
                <Sparkles className="size-4 text-accent-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">AI Detected</p>
                <p className="text-sm font-bold text-foreground">3 Knowledge Gaps</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
