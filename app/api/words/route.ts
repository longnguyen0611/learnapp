import { NextRequest, NextResponse } from "next/server"
import { getDB } from "@/lib/mongodb"

export async function GET(req: NextRequest) {
  const db = await getDB()
  // (Tuỳ app bạn, có thể lấy user từ cookie, session hoặc JWT)
  const userId = req.headers.get("x-user-id")
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const words = await db.collection("words").find({ userId }).toArray()
  return NextResponse.json(words)
}

export async function POST(req: NextRequest) {
  const db = await getDB()
  const userId = req.headers.get("x-user-id")
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { text, language, translation } = await req.json()
  const newWord = {
    userId,
    text,
    language,
    translation,
    dateAdded: new Date().toISOString(),
  }

  const result = await db.collection("words").insertOne(newWord)
  return NextResponse.json({ ...newWord, _id: result.insertedId }, { status: 201 })
}
