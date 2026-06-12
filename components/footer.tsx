import { Dna } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const footerLinks = {
  Product: ["Features", "How It Works", "Roadmaps", "Pricing"],
  Company: ["About", "Blog", "Careers", "Press"],
  Resources: ["Documentation", "API Reference", "Community", "Status"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
                <Dna className="size-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground text-lg tracking-tight">
                Concept <span className="text-primary">DNA</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              The AI-powered platform that maps your STEM knowledge and builds personalized roadmaps to mastery.
            </p>
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Concept DNA. All rights reserved.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="flex flex-col gap-4">
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-widest">{category}</h3>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            Built with AI for the next generation of STEM learners.
          </p>
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground">The</span>
            <span className="text-xs font-semibold text-primary">Google Maps</span>
            <span className="text-xs text-muted-foreground">of STEM Learning</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
