"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Dna, ArrowRight, BookOpen, Map, Network, Eye, EyeOff, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

const trustIndicators = [
  { icon: Network, label: "Knowledge Graphs", description: "Visualise your STEM understanding" },
  { icon: Map, label: "AI Roadmaps", description: "Personalised learning paths" },
  { icon: BookOpen, label: "Personalised Learning", description: "Adapt to your pace and goals" },
]

// Graph node positions for the decorative illustration
const NODES = [
  { x: 120, y: 80,  r: 22, color: "#f97316", label: "Algebra",      status: "mastered" },
  { x: 240, y: 50,  r: 18, color: "#f97316", label: "Functions",    status: "mastered" },
  { x: 360, y: 90,  r: 24, color: "#f97316", label: "Calculus",     status: "mastered" },
  { x: 480, y: 60,  r: 20, color: "#f97316", label: "Linear Alg",   status: "mastered" },
  { x: 80,  y: 190, r: 18, color: "#3b82f6", label: "Statistics",   status: "learning" },
  { x: 200, y: 170, r: 22, color: "#3b82f6", label: "Probability",  status: "learning" },
  { x: 330, y: 200, r: 20, color: "#94a3b8", label: "Info Theory",  status: "locked"   },
  { x: 460, y: 180, r: 26, color: "#3b82f6", label: "ML Basics",    status: "learning" },
  { x: 140, y: 290, r: 18, color: "#94a3b8", label: "Deep Learning",status: "locked"   },
  { x: 280, y: 310, r: 22, color: "#94a3b8", label: "NLP",          status: "locked"   },
  { x: 420, y: 290, r: 20, color: "#94a3b8", label: "Transformers", status: "locked"   },
  { x: 540, y: 260, r: 16, color: "#94a3b8", label: "GPT",          status: "locked"   },
]

const EDGES = [
  [0, 1], [1, 2], [2, 3], [0, 4], [1, 5], [4, 5], [5, 6], [3, 7], [5, 7],
  [4, 8], [8, 9], [7, 10], [9, 10], [10, 11],
]

function GraphIllustration() {
  return (
    <svg viewBox="0 0 620 370" className="w-full h-full" aria-hidden="true">
      <defs>
        <radialGradient id="glow-orange" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f97316" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="glow-blue" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </radialGradient>
        <filter id="blur-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Ambient glow blobs */}
      <ellipse cx="300" cy="150" rx="200" ry="120" fill="url(#glow-orange)" />
      <ellipse cx="450" cy="240" rx="140" ry="100" fill="url(#glow-blue)" />

      {/* Edges */}
      {EDGES.map(([a, b], i) => {
        const na = NODES[a], nb = NODES[b]
        const isActive = na.status !== "locked" && nb.status !== "locked"
        return (
          <line
            key={i}
            x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
            stroke={isActive ? (na.color === "#f97316" ? "#f97316" : "#3b82f6") : "#cbd5e1"}
            strokeWidth={isActive ? 1.5 : 1}
            strokeOpacity={isActive ? 0.5 : 0.25}
            strokeDasharray={isActive ? "none" : "4 3"}
          />
        )
      })}

      {/* Nodes */}
      {NODES.map((node, i) => (
        <g key={i}>
          {node.status !== "locked" && (
            <circle cx={node.x} cy={node.y} r={node.r + 8} fill={node.color} fillOpacity={0.12} />
          )}
          <circle
            cx={node.x} cy={node.y} r={node.r}
            fill={node.status === "locked" ? "#f8fafc" : node.color}
            stroke={node.status === "locked" ? "#cbd5e1" : node.color}
            strokeWidth={node.status !== "locked" ? 2 : 1.5}
            fillOpacity={node.status === "locked" ? 1 : 0.18}
          />
          {node.status !== "locked" && (
            <circle cx={node.x} cy={node.y} r={node.r - 6} fill={node.color} fillOpacity={0.9} />
          )}
          <text
            x={node.x} y={node.y + node.r + 12}
            textAnchor="middle" fontSize="9" fontWeight="500"
            fill={node.status === "locked" ? "#94a3b8" : "#374151"}
            fontFamily="sans-serif"
          >
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

export default function AuthPage() {
  const router = useRouter()
  const [tab, setTab] = useState<"signin" | "signup">("signup")
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", password: "" })

  const isSignUp = tab === "signup"

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background">

      {/* ── Left branding panel ── */}
      <div className="relative lg:w-[52%] flex flex-col justify-between overflow-hidden bg-foreground px-10 py-12 lg:px-16 lg:py-16 min-h-[420px] lg:min-h-screen">

        {/* Background texture / gradient */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 80% 60% at 20% 0%, oklch(0.72 0.19 47 / 0.25), transparent 60%), radial-gradient(ellipse 60% 60% at 80% 100%, oklch(0.55 0.20 255 / 0.20), transparent 60%)",
            }}
          />
          {/* Subtle grid */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" aria-hidden="true">
            <defs>
              <pattern id="auth-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#auth-grid)" />
          </svg>
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <a href="/" className="inline-flex items-center gap-2.5">
            <div className="size-9 rounded-xl bg-primary flex items-center justify-center shadow-lg">
              <Dna className="size-5 text-white" />
            </div>
            <span className="font-bold text-xl text-white tracking-tight">
              Concept <span className="text-primary">DNA</span>
            </span>
          </a>
        </div>

        {/* Headline + graph */}
        <div className="relative z-10 flex flex-col gap-8 my-auto py-12">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-[1.15] tracking-tight text-balance">
              Map Your Knowledge.<br />
              <span className="text-primary">Master STEM.</span>
            </h1>
            <p className="mt-4 text-base text-white/60 leading-relaxed text-pretty max-w-sm">
              Build your personalised STEM learning graph and discover exactly what to learn next.
            </p>
          </div>

          {/* Knowledge graph illustration */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 shadow-2xl">
            <div className="flex items-center justify-between mb-3 px-1">
              <div>
                <p className="text-[10px] font-semibold text-white/40 uppercase tracking-wider">Knowledge Graph</p>
                <p className="text-sm font-semibold text-white mt-0.5">Path to Machine Learning</p>
              </div>
              <div className="flex items-center gap-1.5 bg-primary/20 text-primary text-xs font-semibold px-2.5 py-1 rounded-full border border-primary/30">
                68% Complete
              </div>
            </div>
            <div className="h-[220px] lg:h-[260px]">
              <GraphIllustration />
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 mt-2 px-1">
              {[
                { color: "#f97316", label: "Mastered" },
                { color: "#3b82f6", label: "Learning" },
                { color: "#94a3b8", label: "Locked" },
              ].map(({ color, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <div className="size-2 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-[10px] text-white/50 font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="relative z-10 flex flex-col gap-3">
          {trustIndicators.map(({ icon: Icon, label, description }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center flex-shrink-0">
                <Icon className="size-3.5 text-white/60" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white/90 leading-none">{label}</p>
                <p className="text-xs text-white/40 mt-0.5">{description}</p>
              </div>
              <CheckCircle2 className="size-4 text-primary ml-auto" />
            </div>
          ))}
        </div>
      </div>

      {/* ── Right auth card panel ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-12">
        <div className="w-full max-w-[420px]">

          {/* Tab switcher */}
          <div className="flex gap-1 p-1 bg-muted rounded-xl mb-8 border border-border">
            {(["signup", "signin"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200",
                  tab === t
                    ? "bg-background text-foreground shadow-sm border border-border"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t === "signup" ? "Create Account" : "Sign In"}
              </button>
            ))}
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground tracking-tight">
              {isSignUp ? "Start mapping your STEM DNA" : "Welcome back"}
            </h2>
            <p className="text-sm text-muted-foreground mt-1.5">
              {isSignUp
                ? "Create your account and get your personalised knowledge graph in minutes."
                : "Sign in to continue building your knowledge graph."}
            </p>
          </div>

          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => { e.preventDefault(); router.push("/onboarding") }}
          >
            {/* Full name — only for sign up */}
            {isSignUp && (
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-sm font-medium text-foreground">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Alex Johnson"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full h-11 px-3.5 rounded-xl border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-ring transition-colors"
                />
              </div>
            )}

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@university.edu"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full h-11 px-3.5 rounded-xl border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-ring transition-colors"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </label>
                {!isSignUp && (
                  <a href="#" className="text-xs text-primary hover:underline font-medium">
                    Forgot password?
                  </a>
                )}
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                  placeholder={isSignUp ? "At least 8 characters" : "Enter your password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full h-11 px-3.5 pr-11 rounded-xl border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-ring transition-colors"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {/* Primary CTA */}
            <Button
              type="submit"
              size="lg"
              className="w-full mt-2 font-semibold gap-2 rounded-xl h-11"
              style={{ backgroundColor: "oklch(0.72 0.19 47)", color: "#fff" }}
            >
              {isSignUp ? "Create Account" : "Sign In"}
              <ArrowRight className="size-4" />
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground font-medium">or continue with</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Google button */}
          <Button
            variant="outline"
            size="lg"
            className="w-full gap-3 rounded-xl h-11 font-medium border-border hover:bg-muted"
          >
            <svg className="size-4" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </Button>

          {/* Switch tab link */}
          <p className="text-sm text-center text-muted-foreground mt-6">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={() => setTab(isSignUp ? "signin" : "signup")}
              className="text-primary font-semibold hover:underline"
            >
              {isSignUp ? "Sign In" : "Create Account"}
            </button>
          </p>

          {/* Terms */}
          {isSignUp && (
            <p className="text-xs text-center text-muted-foreground mt-4 leading-relaxed">
              By creating an account you agree to our{" "}
              <a href="#" className="text-primary hover:underline">Terms of Service</a>
              {" "}and{" "}
              <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
