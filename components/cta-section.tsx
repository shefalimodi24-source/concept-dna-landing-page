import { Button } from "@/components/ui/button"
import { ArrowRight, Dna } from "lucide-react"

export function CtaSection() {
  return (
    <section
      id="about"
      className="py-24"
      aria-labelledby="cta-heading"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="relative rounded-3xl overflow-hidden border border-border p-12 lg:p-20 text-center flex flex-col items-center gap-8"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.98 0.02 47) 0%, oklch(0.99 0.01 255) 100%)",
          }}
        >
          {/* Decoration */}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
          >
            <div
              className="absolute -top-20 -right-20 size-80 rounded-full opacity-20"
              style={{
                background: "radial-gradient(circle, oklch(0.72 0.19 47), transparent 70%)",
              }}
            />
            <div
              className="absolute -bottom-20 -left-20 size-80 rounded-full opacity-10"
              style={{
                background: "radial-gradient(circle, oklch(0.55 0.20 255), transparent 70%)",
              }}
            />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-8 max-w-2xl">
            <div className="size-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <Dna className="size-8 text-primary-foreground" />
            </div>

            <div className="flex flex-col gap-4">
              <h2
                id="cta-heading"
                className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance"
              >
                Start Building Your STEM DNA Today
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                Join thousands of students who are unlocking their full potential with personalized AI-powered learning maps. It&apos;s free to start.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 font-semibold px-8 rounded-xl gap-2"
              >
                Get Started — It&apos;s Free
                <ArrowRight className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="font-semibold px-8 rounded-xl border-border bg-white hover:bg-secondary text-foreground"
              >
                View Demo
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              No credit card required &middot; Free forever plan available
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
