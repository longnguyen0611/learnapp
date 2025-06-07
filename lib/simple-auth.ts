"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  id: string
  email: string
  name: string
}

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  loginAsDemo: () => void
  register: (email: string, password: string) => Promise<boolean>
}

const DEMO_USER: User = {
  id: "demo-user-123",
  email: "demo@lingualearn.com",
  name: "Demo User",
}

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email, password) => {
        try {
          const res = await fetch("/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          })

          if (!res.ok) return false

          const user = await res.json()
          set({ user, isAuthenticated: true })
          return true
        } catch (error) {
          return false
        }
      },

      logout: async () => {
        try {
          await fetch("/api/logout", {
            method: "POST",
          })
        } catch (_) {}
        set({ user: null, isAuthenticated: false })
        localStorage.removeItem("savedWords")
      },

      loginAsDemo: () => {
        set({ user: DEMO_USER, isAuthenticated: true })
        localStorage.setItem(
          "savedWords",
          JSON.stringify([
            { id: 1, text: "Hello", language: "english", translation: "Hallo", dateAdded: new Date().toISOString() },
            { id: 2, text: "Thank you", language: "english", translation: "Danke", dateAdded: new Date().toISOString() },
            { id: 3, text: "Guten Morgen", language: "german", translation: "Good morning", dateAdded: new Date().toISOString() },
            { id: 4, text: "Wie geht es dir?", language: "german", translation: "How are you?", dateAdded: new Date().toISOString() },
            { id: 5, text: "Learning", language: "english", translation: "Lernen", dateAdded: new Date().toISOString() },
          ])
        )
      },

      register: async (email, password) => {
        try {
          const res = await fetch("/api/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          })

          if (!res.ok) return false
          return true
        } catch (error) {
          return false
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
)
