"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export function PomodoroTimer() {
  const [isRunning, setIsRunning] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [timeLeft, setTimeLeft] = useState(25 * 60)

  useEffect(() => {
    if (!isRunning) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer)
          const nextIsBreak = !isBreak
          setIsBreak(nextIsBreak)
          setTimeLeft(nextIsBreak ? 5 * 60 : 25 * 60)
          return nextIsBreak ? 5 * 60 : 25 * 60
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isRunning, isBreak])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
  }

  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-sm">
        {isBreak ? "⏸ Break" : "📚 Study"}: {formatTime(timeLeft)}
      </span>
      {!isRunning ? (
        <Button size="sm" onClick={() => setIsRunning(true)}>
          ▶️ Start Study
        </Button>
      ) : (
        <Button variant="destructive" size="sm" onClick={() => {
          setIsRunning(false)
          setTimeLeft(25 * 60)
          setIsBreak(false)
        }}>
          ⏹ Stop Study
        </Button>
      )}
    </div>
  )
}
