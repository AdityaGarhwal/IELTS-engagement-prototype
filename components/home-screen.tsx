"use client"

import React from "react"
import { useApp } from "@/lib/app-context"
import { Button } from "@/components/ui/button"
import { BookOpen, Target, TrendingUp, Clock } from "lucide-react"

export function HomeScreen() {
  const { setScreen } = useApp()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="flex items-center justify-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <BookOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold tracking-tight">Leap Scholar</span>
        </div>

        <div className="space-y-3 text-center">
          <span className="inline-block rounded-full border px-3 py-1 text-xs font-medium">
            New Feature
          </span>
          <h1 className="text-balance text-3xl font-bold tracking-tight">
            Your 12-Week IELTS Momentum Path is ready
          </h1>
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
            Build consistent study habits, track your progress weekly, and stay motivated throughout your IELTS preparation journey.
          </p>
        </div>

        <div className="space-y-3">
          <FeatureItem
            icon={<Clock className="h-4 w-4" />}
            title="Micro-learning sessions"
            description="Just 5-20 minutes a day keeps you on track"
          />
          <FeatureItem
            icon={<Target className="h-4 w-4" />}
            title="Weekly milestones"
            description="Clear goals each week to build momentum"
          />
          <FeatureItem
            icon={<TrendingUp className="h-4 w-4" />}
            title="Visual progress"
            description="See how far you've come at every step"
          />
        </div>

        <Button
          onClick={() => setScreen("onboarding")}
          className="w-full py-6 text-base font-semibold"
          size="lg"
        >
          Start My Path
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          Personalized to your schedule and target score
        </p>
      </div>
    </div>
  )
}

function FeatureItem({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border p-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
