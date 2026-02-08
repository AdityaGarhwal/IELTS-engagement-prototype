"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export type Screen = "home" | "onboarding" | "dashboard"

export interface OnboardingData {
  dailyTime: string
  targetScore: string
  examDate: string
}

export interface Task {
  id: string
  title: string
  description: string
  type: "video" | "practice" | "speaking" | "vocab"
  completed: boolean
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
}

interface AppState {
  screen: Screen
  onboardingData: OnboardingData | null
  currentWeek: number
  tasks: Task[]
  streak: number
  momentumScore: number
  badges: Badge[]
  sessionsThisWeek: number
  lastActivityDate: string | null
  showReminder: boolean
}

interface AppContextType extends AppState {
  setScreen: (screen: Screen) => void
  setOnboardingData: (data: OnboardingData) => void
  toggleTask: (taskId: string) => void
  resetWeek: () => void
  getWeeklyProgress: () => number
  isWeekComplete: () => boolean
  getReadinessText: () => string
  getOverallProgress: () => number
  getWeeklyTimeEstimate: () => string
  dismissReminder: () => void
}

const defaultTasks: Task[] = [
  {
    id: "video",
    title: "Watch Concept Video",
    description: "Short lesson on key IELTS strategies",
    type: "video",
    completed: false,
  },
  {
    id: "practice",
    title: "Practice Questions",
    description: "5-10 targeted practice questions",
    type: "practice",
    completed: false,
  },
  {
    id: "speaking",
    title: "Speaking Prompt",
    description: "2-3 minute speaking exercise",
    type: "speaking",
    completed: false,
  },
  {
    id: "vocab",
    title: "Vocabulary Booster",
    description: "Learn 10 new words and phrases",
    type: "vocab",
    completed: false,
  },
]

const defaultBadges: Badge[] = [
  { id: "listening", name: "Listening Pro", description: "Complete 4 weeks of listening tasks", icon: "headphones", unlocked: false },
  { id: "speaking", name: "Speaking Starter", description: "Complete 3 speaking prompts", icon: "mic", unlocked: false },
  { id: "vocab", name: "Word Wizard", description: "Master 50+ vocabulary words", icon: "book", unlocked: false },
  { id: "streak", name: "Streak Master", description: "Maintain a 7-day streak", icon: "flame", unlocked: false },
  { id: "momentum", name: "Momentum Builder", description: "Reach 100 momentum score", icon: "zap", unlocked: false },
  { id: "mock-ready", name: "Mock Ready", description: "Complete all Foundation tasks", icon: "target", unlocked: false },
]

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    screen: "home",
    onboardingData: null,
    currentWeek: 1,
    tasks: defaultTasks.map(t => ({ ...t })),
    streak: 3,
    momentumScore: 45,
    sessionsThisWeek: 2,
    badges: defaultBadges.map(b => ({ ...b })),
    lastActivityDate: null,
    showReminder: false,
  })

  const setScreen = useCallback((screen: Screen) => {
    setState(prev => ({ ...prev, screen }))
  }, [])

  const setOnboardingData = useCallback((data: OnboardingData) => {
    setState(prev => ({ ...prev, onboardingData: data, screen: "dashboard" }))
  }, [])

  const toggleTask = useCallback((taskId: string) => {
    setState(prev => {
      const newTasks = prev.tasks.map(t =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      )
      const completedCount = newTasks.filter(t => t.completed).length
      const wasCompleted = prev.tasks.find(t => t.id === taskId)?.completed
      const scoreChange = wasCompleted ? -15 : 15
      const streakChange = !wasCompleted ? 1 : 0

      const newBadges = prev.badges.map(b => {
        if (b.id === "streak" && prev.streak + streakChange >= 7) return { ...b, unlocked: true }
        if (b.id === "momentum" && prev.momentumScore + scoreChange >= 100) return { ...b, unlocked: true }
        if (b.id === "speaking" && taskId === "speaking" && !wasCompleted) return { ...b, unlocked: true }
        if (b.id === "vocab" && taskId === "vocab" && !wasCompleted) return { ...b, unlocked: true }
        if (b.id === "mock-ready" && completedCount === newTasks.length) return { ...b, unlocked: true }
        return b
      })

      return {
        ...prev,
        tasks: newTasks,
        momentumScore: Math.max(0, prev.momentumScore + scoreChange),
        streak: wasCompleted ? Math.max(0, prev.streak - 1) : prev.streak + 1,
        sessionsThisWeek: wasCompleted ? Math.max(0, prev.sessionsThisWeek - 1) : prev.sessionsThisWeek + 1,
        badges: newBadges,
        lastActivityDate: new Date().toISOString(),
        showReminder: false,
      }
    })
  }, [])

  const resetWeek = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentWeek: Math.min(12, prev.currentWeek + 1),
      tasks: defaultTasks.map(t => ({ ...t })),
      sessionsThisWeek: 0,
    }))
  }, [])

  const getWeeklyProgress = useCallback(() => {
    const completed = state.tasks.filter(t => t.completed).length
    return Math.round((completed / state.tasks.length) * 100)
  }, [state.tasks])

  const isWeekComplete = useCallback(() => {
    return state.tasks.every(t => t.completed)
  }, [state.tasks])

  const getReadinessText = useCallback(() => {
    const progress = ((state.currentWeek - 1) / 12) * 100 + (getWeeklyProgress() / 12)
    const expected = ((state.currentWeek) / 12) * 100
    if (progress >= expected) return "You're ahead"
    if (progress >= expected - 10) return "You're on track"
    return "You're slightly behind"
  }, [state.currentWeek, getWeeklyProgress])

  const getOverallProgress = useCallback(() => {
    const weekBase = ((state.currentWeek - 1) / 12) * 100
    const weekContribution = (getWeeklyProgress() / 12)
    return Math.min(100, Math.round(weekBase + weekContribution))
  }, [state.currentWeek, getWeeklyProgress])

  const getWeeklyTimeEstimate = useCallback(() => {
    if (!state.onboardingData) return "20 mins total"
    switch (state.onboardingData.dailyTime) {
      case "5-10": return "15 mins total"
      case "10-20": return "25 mins total"
      case "30+": return "40 mins total"
      default: return "20 mins total"
    }
  }, [state.onboardingData])

  const dismissReminder = useCallback(() => {
    setState(prev => ({ ...prev, showReminder: false }))
  }, [])

  return (
    <AppContext.Provider
      value={{
        ...state,
        setScreen,
        setOnboardingData,
        toggleTask,
        resetWeek,
        getWeeklyProgress,
        isWeekComplete,
        getReadinessText,
        getOverallProgress,
        getWeeklyTimeEstimate,
        dismissReminder,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error("useApp must be used within AppProvider")
  return context
}
