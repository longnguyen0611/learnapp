import type React from "react"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { UserNav } from "@/components/dashboard/user-nav"
import { MobileNav } from "@/components/dashboard/mobile-nav"
import NotificationBell from "@/components/noti/NotificationBell"
import { Toaster } from "@/components/ui/toaster" 
import { PomodoroTimer } from "@/components/noti/pomodoro-timer"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="hidden md:block">
            <DashboardNav />
          </div>
          <MobileNav />
          <div className="flex items-center gap-4">
            <PomodoroTimer /> {/* ⏱ thêm timer tại đây */}
            <NotificationBell />
            <UserNav />
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <Toaster />
    </div>
  )
}