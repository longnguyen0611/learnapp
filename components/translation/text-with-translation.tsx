"use client";

import { useState, useRef, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TranslationPopup } from "./translation-popup";
import { useToast } from "@/components/ui/use-toast";
import { useWords } from "@/lib/vocabulary";

const englishText = `
Learning a new language opens up a world of opportunities. It allows you to connect with people from different cultures and backgrounds. The process of language acquisition involves listening, speaking, reading, and writing. Regular practice is essential for mastering any language. Don't be afraid to make mistakes, as they are a natural part of the learning process.
`;

const germanText = `
Eine neue Sprache zu lernen eröffnet eine Welt voller Möglichkeiten. Es ermöglicht Ihnen, sich mit Menschen aus verschiedenen Kulturen und Hintergründen zu verbinden. Der Prozess des Spracherwerbs umfasst Hören, Sprechen, Lesen und Schreiben. Regelmäßiges Üben ist unerlässlich, um eine Sprache zu beherrschen. Haben Sie keine Angst, Fehler zu machen, da sie ein natürlicher Teil des Lernprozesses sind.
`;

export function TextWithTranslation() {
  const [selectedText, setSelectedText] = useState("");
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [showPopup, setShowPopup] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("english");

  const englishTextRef = useRef<HTMLDivElement>(null);
  const germanTextRef = useRef<HTMLDivElement>(null);

  const { toast } = useToast();
  const { addWord } = useWords();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const outsideEnglish = englishTextRef.current && !englishTextRef.current.contains(target);
      const outsideGerman = germanTextRef.current && !germanTextRef.current.contains(target);
      if (outsideEnglish && outsideGerman) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim()) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      setSelectedText(selection.toString().trim());
      setPopupPosition({
        x: rect.left + window.scrollX + rect.width / 2,
        y: rect.bottom + window.scrollY,
      });
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  };

  const handleSaveWord = async (word: string, translation: string) => {
    try {
      await addWord(word, currentLanguage, translation);

      toast({
        title: "Thành công",
        description: `Từ "${word}" đã được thêm vào danh sách từ vựng.`,
      });

      setShowPopup(false);
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể lưu từ. Vui lòng thử lại sau.",
      });
      console.error("Lỗi khi lưu từ:", error);
    }
  };

  return (
    <div className="relative">
      <Tabs defaultValue="english" onValueChange={setCurrentLanguage}>
        <TabsList className="mb-4">
          <TabsTrigger value="english">Tiếng Anh</TabsTrigger>
          <TabsTrigger value="german">Tiếng Đức</TabsTrigger>
        </TabsList>

        <TabsContent value="english">
          <div
            ref={englishTextRef}
            className="text-lg leading-relaxed"
            onMouseUp={handleTextSelection}
            onTouchEnd={handleTextSelection}
          >
            {englishText}
          </div>
        </TabsContent>

        <TabsContent value="german">
          <div
            ref={germanTextRef}
            className="text-lg leading-relaxed"
            onMouseUp={handleTextSelection}
            onTouchEnd={handleTextSelection}
          >
            {germanText}
          </div>
        </TabsContent>
      </Tabs>

      {showPopup && (
        <TranslationPopup
          text={selectedText}
          position={popupPosition}
          sourceLanguage={currentLanguage}
          targetLanguage={currentLanguage === "english" ? "german" : "english"}
          onSave={handleSaveWord}
        />
      )}
    </div>
  );
}
