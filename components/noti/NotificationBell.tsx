"use client"

import { useEffect, useState } from "react"
import { Bell } from "lucide-react"
import { useWords } from "@/lib/vocabulary"

export default function NotificationBell() {
  const { words, fetchWords } = useWords()
  const [newWords, setNewWords] = useState<any[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [showDropdown, setShowDropdown] = useState(false)
  const [displayedWordIds, setDisplayedWordIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetchWords()
  }, [fetchWords])

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      const tenMinutesAgo = now - 10 * 60 * 1000

      // Lọc các từ đủ điều kiện: đã thêm >=10 phút trước và chưa hiển thị
      const candidates = words.filter(
        (w) =>
          w._id &&
          new Date(w.dateAdded).getTime() <= tenMinutesAgo &&
          !displayedWordIds.has(w._id)
      )

      if (candidates.length > 0) {
        const randomIndex = Math.floor(Math.random() * candidates.length)
        const randomWord = candidates[randomIndex]

        setNewWords([randomWord])
        setDisplayedWordIds((prev) => new Set(prev).add(randomWord._id!))
        setUnreadCount(1)
        setShowDropdown(true)

        // Tự ẩn sau 10s
        setTimeout(() => {
          setShowDropdown(false)
          setUnreadCount(0)
          setNewWords([])
        }, 10000)
      }

    }, 10 * 60 * 1000) // ⏱ Mỗi 10 phút chạy 1 lần

    return () => clearInterval(interval)
  }, [words, displayedWordIds])

  return (
    <div className="relative">
      <div className="cursor-default relative">
        <Bell className="w-6 h-6 text-white dark:text-gray-300" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-3 h-3" />
        )}
      </div>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-900 shadow-lg rounded-lg z-50 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-gray-100">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 font-semibold flex justify-between">
            <span>Notifications</span>
            <button
              className="text-xs text-blue-500 dark:text-blue-400 hover:underline"
              onClick={() => {
                setShowDropdown(false)
                setUnreadCount(0)
              }}
            >
              Close
            </button>
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700">
            {newWords.map((word, index) => (
              <div key={word._id ?? index} className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800">
                <div className="font-medium">{word.text}</div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">
                  Translation: {word.translation}
                </div>
                <div className="text-gray-400 dark:text-gray-500 text-xs">
                  {new Date(word.dateAdded).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
