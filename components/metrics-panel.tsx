"use client"

import { useApp } from "@/lib/app-context"
import { BarChart3, CheckSquare, Flame, Clock, Target, TrendingUp } from "lucide-react"

export function MetricsPanel() {
  const { sessionsThisWeek, tasks, streak, currentWeek, momentumScore, getOverallProgress } = useApp()
  const completedTasks = tasks.filter(t => t.completed).length

  const stats = [
    {
      label: "Sessions This Week",
      value: sessionsThisWeek,
      icon: <BarChart3 className="h-4 w-4" />,
      change: "+2 from last week",
    },
    {
      label: "Weekly Tasks Done",
      value: `${completedTasks}/${tasks.length}`,
      icon: <CheckSquare className="h-4 w-4" />,
      change: `${Math.round((completedTasks / tasks.length) * 100)}% complete`,
    },
    {
      label: "Current Streak",
      value: `${streak} days`,
      icon: <Flame className="h-4 w-4" />,
      change: streak >= 7 ? "Weekly goal met!" : `${7 - streak} to weekly goal`,
    },
    {
      label: "Current Week",
      value: `Week ${currentWeek}`,
      icon: <Clock className="h-4 w-4" />,
      change: `${12 - currentWeek} weeks remaining`,
    },
    {
      label: "Momentum Score",
      value: momentumScore,
      icon: <TrendingUp className="h-4 w-4" />,
      change: momentumScore >= 100 ? "Peak momentum!" : `${100 - momentumScore} to max`,
    },
    {
      label: "Overall Progress",
      value: `${getOverallProgress()}%`,
      icon: <Target className="h-4 w-4" />,
      change: "Across all weeks",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="rounded-lg border p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Analytics Overview
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Track your preparation metrics at a glance.
        </p>
      </div>

      <div className="space-y-2">
        {stats.map(stat => (
          <div key={stat.label} className="flex items-center gap-3 rounded-lg border p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted">
              {stat.icon}
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-base font-bold">{stat.value}</p>
            </div>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
