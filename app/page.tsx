"use client"

import { AppProvider, useApp } from "@/lib/app-context"
import { HomeScreen } from "@/components/home-screen"
import { OnboardingQuiz } from "@/components/onboarding-quiz"
import { WeeklyDashboard } from "@/components/weekly-dashboard"

function AppContent() {
  const { screen } = useApp()

  return (
    <main className="mx-auto min-h-screen max-w-lg">
      {screen === "home" && <HomeScreen />}
      {screen === "onboarding" && <OnboardingQuiz />}
      {screen === "dashboard" && <WeeklyDashboard />}
    </main>
  )
}

export default function Page() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}
