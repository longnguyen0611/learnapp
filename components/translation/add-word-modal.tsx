"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface AddWordModalProps {
  open: boolean
  onClose: () => void
  onSave: (english: string, german: string) => void
}

export function AddWordModal({ open, onClose, onSave }: AddWordModalProps) {
  const [english, setEnglish] = useState("")
  const [german, setGerman] = useState("")

  const handleSave = () => {
    if (english.trim() && german.trim()) {
      onSave(english, german)
      setEnglish("")
      setGerman("")
      onClose()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Word</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">English</label>
            <Input value={english} onChange={(e) => setEnglish(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium">German</label>
            <Input value={german} onChange={(e) => setGerman(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
