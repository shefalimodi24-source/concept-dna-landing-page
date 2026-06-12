"use client"

import { Dna, Home, LayoutDashboard, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AppTopBarProps {
  /** Breadcrumb label shown as the current page name */
  pageLabel: string
  /** Optional parent breadcrumb (label + href) */
  parent?: { label: string; href: string }
  /** Slot for additional right-side controls */
  rightSlot?: React.ReactNode
  className?: string
}

export function AppTopBar({ pageLabel, parent, rightSlot, className }: AppTopBarProps) {
  return (
    <header
      className={cn(
        "shrink-0 z-40 bg-background/95 backdrop-blur border-b border-border",
        className
      )}
    >
      <div className="h-14 px-5 flex items-center justify-between gap-4">

        {/* Left: logo + breadcrumb */}
        <div className="flex items-center gap-3 min-w-0">
          <a href="/" className="flex items-center gap-2 shrink-0">
            <div className="size-7 rounded-lg bg-primary flex items-center justify-center">
              <Dna className="size-3.5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-sm text-foreground hidden sm:block">
              Concept <span className="text-primary">DNA</span>
            </span>
          </a>

          {/* Breadcrumb */}
          <div className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground overflow-hidden">
            <ChevronRight className="size-3.5 shrink-0 text-border" />
            {parent && (
              <>
                <a href={parent.href} className="hover:text-foreground transition-colors shrink-0 truncate max-w-28">
                  {parent.label}
                </a>
                <ChevronRight className="size-3.5 shrink-0 text-border" />
              </>
            )}
            <span className="text-foreground font-medium truncate">{pageLabel}</span>
          </div>
        </div>

        {/* Right: Home + Dashboard + custom slot */}
        <div className="flex items-center gap-2 shrink-0">
          {rightSlot}

          <Button
            size="sm"
            variant="ghost"
            className="gap-1.5 text-muted-foreground hover:text-foreground font-medium text-xs"
            nativeButton={false}
            render={<a href="/" />}
          >
            <Home className="size-3.5" />
            <span className="hidden sm:inline">Home</span>
          </Button>

          <Button
            size="sm"
            className="gap-1.5 font-medium text-xs"
            style={{ background: "oklch(0.72 0.19 47)", color: "#fff" }}
            nativeButton={false}
            render={<a href="/dashboard" />}
          >
            <LayoutDashboard className="size-3.5" />
            <span className="hidden sm:inline">Dashboard</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
