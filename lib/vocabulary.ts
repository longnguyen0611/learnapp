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

interface WordsStore {
  words: Word[]
  fetchWords: () => Promise<void>
  addWord: (text: string, language: string, translation: string) => Promise<void>
  deleteWord: (id: string) => Promise<void>
}

export const useWords = create<WordsStore>((set, get) => ({
  words: [],

  fetchWords: async () => {
    try {
      // gửi userId trong header hoặc lấy từ auth store
      const userId = "user-id-cua-ban" // hoặc lấy từ useAuth store
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
      if (!res.ok) throw new Error("Failed to add word")
      const newWord = await res.json()
      set((state) => ({ words: [...state.words, newWord] }))
    } catch (error) {
      console.error(error)
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
      set((state) => ({ words: state.words.filter((w) => w._id !== id) }))
    } catch (error) {
      console.error(error)
    }
  },
}))
