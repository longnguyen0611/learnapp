import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { PracticeContent } from "@/components/practice/practice-content"

export const metadata: Metadata = {
  title: "Practice - LinguaLearn",
  description: "Practice your language skills",
}

export default function PracticePage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Practice" text="Improve your language skills with interactive exercises." />
      <PracticeContent />
    </DashboardShell>
  )
}
