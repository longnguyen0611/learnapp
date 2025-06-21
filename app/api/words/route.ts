import { NextRequest, NextResponse } from "next/server"
import { getDB } from "@/lib/mongodb"

export async function GET(req: NextRequest) {
  const db = await getDB()
  const userId = req.headers.get("x-user-id")
  if (!userId)
    return NextResponse.json({ error: "UNAUTHORIZED", message: "Không có quyền truy cập" }, { status: 401 })

  const words = await db.collection("words").find({ userId }).toArray()
  return NextResponse.json(words)
}

export async function POST(req: NextRequest) {
  try {
    const db = await getDB()
    const userId = req.headers.get("x-user-id")

    if (!userId) {
      return NextResponse.json(
        { error: "UNAUTHORIZED", message: "Không có quyền truy cập" },
        { status: 401 }
      )
    }

    const wordCount = await db.collection("words").countDocuments({ userId })
    if (wordCount >= 10) {
      return NextResponse.json(
        {
          error: "LIMIT_REACHED",
          message: "Bạn đã đạt giới hạn 10 từ. Hãy xóa bớt từ cũ để thêm từ mới.",
        },
        { status: 400 }
      )
    }

    const { text, language, translation } = await req.json()
    if (!text || !language || !translation) {
      return NextResponse.json(
        { error: "INVALID_INPUT", message: "Vui lòng điền đầy đủ thông tin" },
        { status: 400 }
      )
    }

    const newWord = {
      userId,
      text,
      language,
      translation,
      dateAdded: new Date().toISOString(),
    }

    const result = await db.collection("words").insertOne(newWord)
    return NextResponse.json({ ...newWord, _id: result.insertedId }, { status: 201 })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      { error: "SERVER_ERROR", message: "Lỗi server, vui lòng thử lại sau" },
      { status: 500 }
    )
  }
}
