"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { TextWithTranslation } from "@/components/translation/text-with-translation"
import { WordsOverview } from "@/components/dashboard/words-overview"
import { useAuth } from "@/lib/simple-auth"

export default function DashboardPage() {
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return <div>Redirecting...</div>
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading={`Welcome, ${user?.name || "User"}!`}
        text="Continue your language learning journey."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <WordsOverview />
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Practice Text</h2>
        <div className="p-4 border rounded-lg bg-card">
          <TextWithTranslation />
        </div>
      </div>
    </DashboardShell>
  )
}
