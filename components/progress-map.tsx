"use client"

import { useApp } from "@/lib/app-context"
import { cn } from "@/lib/utils"
import { CheckCircle2, Circle, Lock } from "lucide-react"

const phases = [
  { name: "Foundation", weeks: "Weeks 1-4", endWeek: 4 },
  { name: "Skill Building", weeks: "Weeks 5-8", endWeek: 8 },
  { name: "Test Readiness", weeks: "Weeks 9-12", endWeek: 12 },
]

export function ProgressMap() {
  const { currentWeek, getOverallProgress, getReadinessText } = useApp()
  const overallProgress = getOverallProgress()
  const readiness = getReadinessText()

  function getPhaseStatus(phase: (typeof phases)[number]) {
    if (currentWeek > phase.endWeek) return "complete"
    if (currentWeek > phase.endWeek - 4) return "active"
    return "locked"
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Overall Progress
            </p>
            <p className="mt-1 text-2xl font-bold">{overallProgress}%</p>
          </div>
          <span className="rounded-full border px-3 py-1 text-xs font-medium">{readiness}</span>
        </div>

        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-foreground transition-all duration-700"
            style={{ width: `${overallProgress}%` }}
          />
        </div>

        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>Foundation</span>
          <span>Skill Building</span>
          <span>Test Ready</span>
        </div>
      </div>

      <div className="space-y-2">
        {phases.map((phase, index) => {
          const status = getPhaseStatus(phase)
          return (
            <div key={phase.name} className="relative">
              {index < phases.length - 1 && (
                <div className="absolute left-7 top-16 h-4 w-px bg-border" />
              )}
              <div
                className={cn(
                  "flex items-center gap-3 rounded-lg border p-4 transition-all",
                  status === "active" && "border-foreground",
                  status === "locked" && "opacity-50"
                )}
              >
                <div
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg",
                    status === "complete"
                      ? "bg-foreground text-background"
                      : status === "active"
                        ? "bg-muted"
                        : "bg-muted"
                  )}
                >
                  {status === "complete" ? (
                    <CheckCircle2 className="h-6 w-6" />
                  ) : status === "active" ? (
                    <Circle className="h-6 w-6" />
                  ) : (
                    <Lock className="h-5 w-5" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold">{phase.name}</p>
                  <p className="text-xs text-muted-foreground">{phase.weeks}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {status === "complete"
                      ? "Completed"
                      : status === "active"
                        ? `Week ${currentWeek} in progress`
                        : "Not started"}
                  </p>
                </div>
                {status === "active" && (
                  <p className="text-xl font-bold">
                    {Math.round(((currentWeek - (phase.endWeek - 4)) / 4) * 100)}%
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {currentWeek >= 4 && (
        <div className="rounded-lg border p-4 text-center">
          <p className="text-sm font-medium">{"You're ready to attempt your first mock"}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Your foundation skills are strong enough for a practice test.
          </p>
        </div>
      )}
    </div>
  )
}
