import { create } from "zustand"

interface Word {
  _id?: string
  userId: string
  text: string
  language: string
  translation: string
  dateAdded: string
  imageUrl?: string
}

type AddWordResult =
  | { success: true; word: Word }
  | { success: false; error: string; message: string }

interface WordsStore {
  words: Word[]
  fetchWords: () => Promise<void>
  addWord: (text: string, language: string, translation: string) => Promise<AddWordResult>
  deleteWord: (id: string) => Promise<void>
}

export const useWords = create<WordsStore>((set, get) => ({
  words: [],

  fetchWords: async () => {
    try {
      const userId = "user-id-cua-ban"
      const res = await fetch("/api/words", {
        method: "GET",
        headers: {
          "x-user-id": userId,
        },
      })
      if (!res.ok) throw new Error("Failed to fetch words")
      const words = await res.json()
      set({ words })
    } catch (error) {
      console.error(error)
    }
  },

  addWord: async (text, language, translation) => {
    try {
      const userId = "user-id-cua-ban"
      const res = await fetch("/api/words", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
        },
        body: JSON.stringify({ text, language, translation }),
      })

      const data = await res.json()

      if (!res.ok) {
        return {
          success: false,
          error: data.error || "UNKNOWN_ERROR",
          message: data.message || "Đã xảy ra lỗi",
        }
      }

      set((state) => ({ words: [...state.words, data] }))
      return { success: true, word: data }
    } catch (error) {
      console.error("Error in addWord:", error)
      return {
        success: false,
        error: "UNKNOWN_ERROR",
        message: "Đã xảy ra lỗi. Vui lòng thử lại.",
      }
    }
  },

  deleteWord: async (id) => {
    try {
      const userId = "user-id-cua-ban"
      const res = await fetch(`/api/words/${id}`, {
        method: "DELETE",
        headers: {
          "x-user-id": userId,
        },
      })
      if (res.status !== 204) throw new Error("Failed to delete word")
      set((state) => ({
        words: state.words.filter((w) => w._id !== id),
      }))
    } catch (error) {
      console.error(error)
    }
  },
}))
