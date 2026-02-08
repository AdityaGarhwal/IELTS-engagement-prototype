"use client"

import { useApp } from "@/lib/app-context"
import { Flame, Zap, TrendingUp } from "lucide-react"

export function MotivationPanel() {
  const { streak, momentumScore, tasks } = useApp()
  const completedCount = tasks.filter(t => t.completed).length

  if (completedCount === 0) return null

  const progressToTarget = Math.min(100, Math.round((completedCount / tasks.length) * 100))

  return (
    <div className="space-y-3">
      <div className="rounded-lg border p-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          <p className="text-sm font-medium">
            {"You're"} {progressToTarget}% closer to your target score
          </p>
        </div>
        <p className="mt-1 pl-6 text-xs text-muted-foreground">
          {completedCount === tasks.length
            ? "All tasks done this week! You're building real momentum."
            : `${tasks.length - completedCount} more task${tasks.length - completedCount > 1 ? "s" : ""} to complete your weekly goal.`}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-1.5">
            <Flame className="h-4 w-4" />
            <span className="text-xs text-muted-foreground">Streak</span>
          </div>
          <p className="mt-2 text-2xl font-bold">
            {streak} <span className="text-sm font-normal text-muted-foreground">days</span>
          </p>
          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-foreground transition-all"
              style={{ width: `${Math.min(100, (streak / 7) * 100)}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {streak >= 7 ? "Amazing streak!" : `${7 - streak} days to weekly streak`}
          </p>
        </div>

        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-1.5">
            <Zap className="h-4 w-4" />
            <span className="text-xs text-muted-foreground">Momentum</span>
          </div>
          <p className="mt-2 text-2xl font-bold">{momentumScore}</p>
          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-foreground transition-all"
              style={{ width: `${Math.min(100, momentumScore)}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {momentumScore >= 100 ? "Peak momentum!" : `${100 - momentumScore} to max`}
          </p>
        </div>
      </div>
    </div>
  )
}
