"use client"

import React from "react"
import { useState } from "react"
import { useApp } from "@/lib/app-context"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  PlayCircle,
  FileQuestion,
  Mic,
  BookOpen,
  CheckCircle2,
  Circle,
  Flame,
  Zap,
  ChevronRight,
  Star,
} from "lucide-react"
import { ProgressMap } from "@/components/progress-map"
import { MotivationPanel } from "@/components/motivation-panel"
import { BadgesPanel } from "@/components/badges-panel"
import { MetricsPanel } from "@/components/metrics-panel"

type Tab = "tasks" | "progress" | "badges" | "metrics"

const taskIcons: Record<string, React.ReactNode> = {
  video: <PlayCircle className="h-5 w-5" />,
  practice: <FileQuestion className="h-5 w-5" />,
  speaking: <Mic className="h-5 w-5" />,
  vocab: <BookOpen className="h-5 w-5" />,
}

export function WeeklyDashboard() {
  const {
    currentWeek,
    tasks,
    streak,
    momentumScore,
    toggleTask,
    getWeeklyProgress,
    isWeekComplete,
    getWeeklyTimeEstimate,
    resetWeek,
    showReminder,
    onboardingData,
  } = useApp()

  const [activeTab, setActiveTab] = useState<Tab>("tasks")
  const progress = getWeeklyProgress()
  const weekComplete = isWeekComplete()

  const tabs: { key: Tab; label: string }[] = [
    { key: "tasks", label: "Tasks" },
    { key: "progress", label: "Journey" },
    { key: "badges", label: "Badges" },
    { key: "metrics", label: "Stats" },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background px-6 pb-4 pt-6">
        <div className="mx-auto max-w-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Week {currentWeek} of 12
              </p>
              <h1 className="text-lg font-bold">
                {onboardingData?.targetScore
                  ? `Target: Band ${onboardingData.targetScore}`
                  : "Weekly Milestones"}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 rounded-full border px-3 py-1">
                <Flame className="h-3.5 w-3.5" />
                <span className="text-sm font-bold">{streak}</span>
              </div>
              <div className="flex items-center gap-1 rounded-full border px-3 py-1">
                <Zap className="h-3.5 w-3.5" />
                <span className="text-sm font-bold">{momentumScore}</span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{progress}% complete</span>
              <span>{getWeeklyTimeEstimate()}</span>
            </div>
            <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-foreground transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <nav className="mt-4 flex gap-1" role="tablist">
            {tabs.map(tab => (
              <button
                key={tab.key}
                role="tab"
                aria-selected={activeTab === tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "flex-1 rounded-md px-3 py-1.5 text-xs font-semibold transition-all",
                  activeTab === tab.key
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1 px-6 py-6">
        <div className="mx-auto max-w-md">
          {activeTab === "tasks" && (
            <div className="space-y-4">
              {showReminder && (
                <div className="rounded-lg border p-4">
                  <p className="text-sm font-medium">2 minutes today keeps you on track</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Even a quick vocabulary check helps maintain your streak.
                  </p>
                </div>
              )}

              {weekComplete && (
                <div className="rounded-lg border-2 border-foreground p-5 text-center">
                  <Star className="mx-auto h-8 w-8" />
                  <h3 className="mt-2 text-lg font-bold">Weekly Milestone Completed!</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {"You've"} finished all tasks for Week {currentWeek}. Amazing consistency!
                  </p>
                  {currentWeek < 12 && (
                    <Button onClick={resetWeek} className="mt-4" size="sm">
                      Start Week {currentWeek + 1}
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  )}
                </div>
              )}

              <div className="space-y-2">
                {tasks.map(task => (
                  <button
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-all",
                      task.completed ? "bg-muted" : "hover:bg-muted/50"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-md",
                        task.completed ? "bg-foreground text-background" : "bg-muted"
                      )}
                    >
                      {taskIcons[task.type]}
                    </div>
                    <div className="flex-1">
                      <p className={cn("text-sm font-medium", task.completed && "line-through")}>{task.title}</p>
                      <p className="text-xs text-muted-foreground">{task.description}</p>
                    </div>
                    {task.completed ? (
                      <CheckCircle2 className="h-5 w-5 shrink-0" />
                    ) : (
                      <Circle className="h-5 w-5 shrink-0 text-muted-foreground/40" />
                    )}
                  </button>
                ))}
              </div>

              <MotivationPanel />
            </div>
          )}

          {activeTab === "progress" && <ProgressMap />}
          {activeTab === "badges" && <BadgesPanel />}
          {activeTab === "metrics" && <MetricsPanel />}
        </div>
      </main>
    </div>
  )
}
