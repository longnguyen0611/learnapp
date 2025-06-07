"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react"
import { useWords } from "@/lib/vocabulary"

export function FlashcardExercise() {
  const { words, fetchWords } = useWords()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showTranslation, setShowTranslation] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadWords = async () => {
      await fetchWords()
      setIsLoading(false)
    }
    loadWords()
  }, [fetchWords])

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setShowTranslation(false)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setShowTranslation(false)
    }
  }

  const handleFlip = () => {
    setShowTranslation(!showTranslation)
  }

  if (isLoading) {
    return <div>Loading flashcards...</div>
  }

  if (words.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="mb-4">You don't have any saved words yet.</p>
        <p className="text-muted-foreground">
          Go to the Reading Practice section and highlight text to save words to your vocabulary notebook.
        </p>
      </div>
    )
  }

  const currentWord = words[currentIndex]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Card {currentIndex + 1} of {words.length}
        </div>
      </div>

      <Card className="h-64 flex items-center justify-center cursor-pointer" onClick={handleFlip}>
        <CardContent className="text-center p-6">
          <div className="text-2xl font-bold mb-2">
            {showTranslation ? currentWord.translation : currentWord.text}
          </div>
          <div className="text-sm text-muted-foreground">
            {showTranslation
              ? currentWord.language === "english"
                ? "German"
                : "English"
              : currentWord.language === "english"
                ? "English"
                : "German"}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <Button variant="outline" size="icon" onClick={handlePrevious} disabled={currentIndex === 0}>
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button variant="outline" onClick={handleFlip}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Flip Card
        </Button>

        <Button variant="outline" size="icon" onClick={handleNext} disabled={currentIndex === words.length - 1}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
