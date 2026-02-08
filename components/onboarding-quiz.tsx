"use client"

import { useState } from "react"
import { useApp } from "@/lib/app-context"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Clock, Target, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  {
    key: "dailyTime",
    title: "How much time can you dedicate daily?",
    subtitle: "We'll personalize your weekly tasks accordingly.",
    icon: Clock,
    options: [
      { value: "5-10", label: "5-10 minutes", description: "Quick daily practice" },
      { value: "10-20", label: "10-20 minutes", description: "Focused study sessions" },
      { value: "30+", label: "30+ minutes", description: "Intensive preparation" },
    ],
  },
  {
    key: "targetScore",
    title: "What's your target IELTS score?",
    subtitle: "This helps us calibrate difficulty and content.",
    icon: Target,
    options: [
      { value: "6.0", label: "Band 6.0", description: "Competent user" },
      { value: "6.5", label: "Band 6.5", description: "Competent+" },
      { value: "7.0", label: "Band 7.0", description: "Good user" },
      { value: "7.5+", label: "Band 7.5+", description: "Very good user" },
    ],
  },
  {
    key: "examDate",
    title: "When is your exam?",
    subtitle: "We'll pace your preparation accordingly.",
    icon: Calendar,
    options: [
      { value: "4-weeks", label: "In 4 weeks", description: "Accelerated path" },
      { value: "8-weeks", label: "In 8 weeks", description: "Balanced path" },
      { value: "12-weeks", label: "In 12 weeks", description: "Comprehensive path" },
      { value: "not-sure", label: "Not sure yet", description: "Flexible path" },
    ],
  },
]

export function OnboardingQuiz() {
  const { setOnboardingData, setScreen } = useApp()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const step = steps[currentStep]
  const isLastStep = currentStep === steps.length - 1
  const selected = answers[step.key] || ""

  function handleSelect(value: string) {
    setAnswers(prev => ({ ...prev, [step.key]: value }))
  }

  function handleNext() {
    if (!selected) return
    if (isLastStep) {
      setOnboardingData({
        dailyTime: answers.dailyTime || "10-20",
        targetScore: answers.targetScore || "7.0",
        examDate: answers.examDate || "12-weeks",
      })
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  function handleBack() {
    if (currentStep === 0) {
      setScreen("home")
    } else {
      setCurrentStep(prev => prev - 1)
    }
  }

  const StepIcon = step.icon

  return (
    <div className="flex min-h-screen flex-col px-6 py-8">
      <div className="mx-auto w-full max-w-md flex-1">
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <span className="text-sm font-medium text-muted-foreground">
            {currentStep + 1} of {steps.length}
          </span>
          <div className="h-10 w-10" />
        </div>

        <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-foreground transition-all duration-500"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>

        <div className="mt-10 space-y-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
            <StepIcon className="h-5 w-5" />
          </div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight">{step.title}</h2>
          <p className="text-sm text-muted-foreground">{step.subtitle}</p>
        </div>

        <div className="mt-8 space-y-3">
          {step.options.map(option => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg border-2 p-4 text-left transition-all",
                selected === option.value
                  ? "border-foreground bg-muted"
                  : "border-border hover:border-foreground/20"
              )}
            >
              <div
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                  selected === option.value
                    ? "border-foreground bg-foreground"
                    : "border-muted-foreground/30"
                )}
              >
                {selected === option.value && (
                  <div className="h-2 w-2 rounded-full bg-background" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium">{option.label}</p>
                <p className="text-xs text-muted-foreground">{option.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-8 w-full max-w-md">
        <Button
          onClick={handleNext}
          disabled={!selected}
          className="w-full py-6 text-base font-semibold"
          size="lg"
        >
          {isLastStep ? "Start My Journey" : "Continue"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
