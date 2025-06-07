"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookmarkPlus } from "lucide-react";

interface TranslationPopupProps {
  text: string;
  position: { x: number; y: number };
  sourceLanguage: string;
  targetLanguage: string;
  onSave?: (word: string, translation: string) => void | Promise<void>;
}

export function TranslationPopup({
  text,
  position,
  sourceLanguage,
  targetLanguage,
  onSave,
}: TranslationPopupProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const translationsEnToDe: Record<string, string> = {
    learning: "Lernen",
    language: "Sprache",
    new: "neu",
    world: "Welt",
    opportunities: "Möglichkeiten",
    connect: "verbinden",
    people: "Menschen",
    cultures: "Kulturen",
    backgrounds: "Hintergründe",
    process: "Prozess",
    acquisition: "Erwerb",
    listening: "Hören",
    speaking: "Sprechen",
    reading: "Lesen",
    writing: "Schreiben",
    practice: "Übung",
    essential: "wesentlich",
    mastering: "Beherrschen",
    mistakes: "Fehler",
    natural: "natürlich",
    "learning process": "Lernprozess",
  };

  const translationsDeToEn: Record<string, string> = {
    lernen: "Learning",
    sprache: "Language",
    neu: "New",
    welt: "World",
    möglichkeiten: "Opportunities",
    verbinden: "Connect",
    menschen: "People",
    kulturen: "Cultures",
    hintergründe: "Backgrounds",
    prozess: "Process",
    erwerb: "Acquisition",
    hören: "Listening",
    sprechen: "Speaking",
    lesen: "Reading",
    schreiben: "Writing",
    übung: "Practice",
    wesentlich: "Essential",
    beherrschen: "Mastering",
    fehler: "Mistakes",
    natürlich: "Natural",
    lernprozess: "Learning process",
  };

  const getTranslation = (
    word: string,
    from: string,
    to: string
  ): string => {
    const lower = word.toLowerCase();
    if (from === "english" && to === "german") {
      return translationsEnToDe[lower] || `${word} auf Deutsch`;
    } else if (from === "german" && to === "english") {
      return translationsDeToEn[lower] || `${word} in English`;
    }
    return `Translation of "${word}"`;
  };

  const translation = getTranslation(text, sourceLanguage, targetLanguage);

  const handleSave = async () => {
    if (!onSave) return;
    try {
      setIsSaving(true);
      await onSave(text, translation);
      setIsSaved(true);
    } catch (error) {
      console.error("Lỗi khi lưu từ:", error);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (isSaved) {
      const timer = setTimeout(() => {
        setIsSaved(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isSaved]);

  return (
    <Card
      className="absolute z-50 w-64 shadow-lg"
      style={{
        left: `${position.x}px`,
        top: `${position.y + 10}px`,
        transform: "translateX(-50%)",
      }}
    >
      <CardContent className="p-4">
        <div className="mb-2">
          <div className="font-bold">{text}</div>
          <div className="text-sm text-muted-foreground">{translation}</div>
        </div>
        <Button
          size="sm"
          className="w-full"
          onClick={handleSave}
          disabled={isSaving}
        >
          <BookmarkPlus className="mr-2 h-4 w-4" />
          {isSaving ? "Saving..." : isSaved ? "Saved!" : "Save to Vocabulary"}
        </Button>
      </CardContent>
    </Card>
  );
}
