import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { VocabularyList } from "@/components/vocabulary/vocabulary-list"

export const metadata: Metadata = {
  title: "Vocabulary - LinguaLearn",
  description: "Manage your saved vocabulary",
}

export default function VocabularyPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Vocabulary" text="Manage your saved words and phrases." />
      <VocabularyList />
    </DashboardShell>
  )
}
