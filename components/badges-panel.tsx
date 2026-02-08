"use client"

import { useApp } from "@/lib/app-context"
import { cn } from "@/lib/utils"
import { Headphones, Mic, BookOpen, Flame, Zap, Target, Lock } from "lucide-react"
import type { ReactNode } from "react"

const badgeIcons: Record<string, ReactNode> = {
  headphones: <Headphones className="h-5 w-5" />,
  mic: <Mic className="h-5 w-5" />,
  book: <BookOpen className="h-5 w-5" />,
  flame: <Flame className="h-5 w-5" />,
  zap: <Zap className="h-5 w-5" />,
  target: <Target className="h-5 w-5" />,
}

export function BadgesPanel() {
  const { badges } = useApp()
  const unlockedCount = badges.filter(b => b.unlocked).length

  return (
    <div className="space-y-4">
      <div className="rounded-lg border p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Skill Badges
        </p>
        <p className="mt-1 text-2xl font-bold">
          {unlockedCount}{" "}
          <span className="text-sm font-normal text-muted-foreground">of {badges.length} unlocked</span>
        </p>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-foreground transition-all duration-500"
            style={{ width: `${(unlockedCount / badges.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {badges.map(badge => (
          <div
            key={badge.id}
            className={cn(
              "flex flex-col items-center gap-2 rounded-lg border p-4 text-center",
              !badge.unlocked && "opacity-40"
            )}
          >
            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-lg",
                badge.unlocked ? "bg-foreground text-background" : "bg-muted"
              )}
            >
              {badge.unlocked ? badgeIcons[badge.icon] : <Lock className="h-4 w-4" />}
            </div>
            <div>
              <p className="text-sm font-medium">{badge.name}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{badge.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
