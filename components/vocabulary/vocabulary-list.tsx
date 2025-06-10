"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card, CardContent, CardDescription, CardFooter,
  CardHeader, CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useWords } from "@/lib/vocabulary"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

export function VocabularyList() {
  const { words, fetchWords, deleteWord, addWord } = useWords()
  const [searchTerm, setSearchTerm] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [english, setEnglish] = useState("")
  const [german, setGerman] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    fetchWords()
  }, [fetchWords])

  const handleDeleteWord = async (id: string) => {
    await deleteWord(id)
    toast({
      title: "Word deleted",
      description: "The word has been removed from your vocabulary notebook.",
    })
  }

  const handleAddWord = async () => {
    if (!english.trim() || !german.trim()) {
      toast({ title: "Please fill in both fields." })
      return
    }

    await addWord(english, "english", german)
    toast({
      title: "Word added",
      description: `"${english}" has been added to your vocabulary.`,
    })

    setEnglish("")
    setGerman("")
    setShowModal(false)
    fetchWords()
  }

  const filteredWords = words.filter(
    (word) =>
      word.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.translation.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search vocabulary..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={() => setShowModal(true)}>
          + Add Word
        </Button>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a new word</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">English</label>
              <Input value={english} onChange={(e) => setEnglish(e.target.value)} placeholder="Enter English word" />
            </div>
            <div>
              <label className="block text-sm font-medium">German</label>
              <Input value={german} onChange={(e) => setGerman(e.target.value)} placeholder="Enter German translation" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button onClick={handleAddWord}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {filteredWords.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">
              {searchTerm
                ? "No matching words found."
                : "Your vocabulary notebook is empty. Add a new word to get started."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredWords.map((word) => (
            <Card key={word._id}>
              <CardHeader className="pb-2">
                <CardTitle>{word.text}</CardTitle>
                <CardDescription>{word.language === "english" ? "English" : "German"}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{word.translation}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-xs text-muted-foreground">
                  {new Date(word.dateAdded).toLocaleDateString()}
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleDeleteWord(word._id!)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
