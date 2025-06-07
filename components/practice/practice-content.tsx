"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TextWithTranslation } from "@/components/translation/text-with-translation"
import { FlashcardExercise } from "@/components/practice/flashcard-exercise"

export function PracticeContent() {
  return (
    <div className="grid gap-4">
      <Tabs defaultValue="reading">
        <TabsList className="mb-4">
          <TabsTrigger value="reading">Reading</TabsTrigger>
          <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
        </TabsList>
        <TabsContent value="reading">
          <Card>
            <CardHeader>
              <CardTitle>Reading Practice</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Select text to see translations and save new words to your vocabulary notebook.</p>
              <TextWithTranslation />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="flashcards">
          <Card>
            <CardHeader>
              <CardTitle>Flashcard Practice</CardTitle>
            </CardHeader>
            <CardContent>
              <FlashcardExercise />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
