// File: /app/api/words/[id]/image/route.ts

import { NextRequest, NextResponse } from "next/server"
import { getDB } from "@/lib/mongodb"
import { writeFile } from "fs/promises"
import path from "path"
import { v4 as uuidv4 } from "uuid"
import { ObjectId } from "mongodb"

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } 
) {
  const { id } = await context.params 
  const userId = req.headers.get("x-user-id")
  if (!userId || !id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const formData = await req.formData()
  const file = formData.get("image") as File
  if (!file) {
    return NextResponse.json({ error: "No image uploaded" }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const filename = `${uuidv4()}-${file.name}`
  const uploadDir = path.join(process.cwd(), "public", "uploads")
  const filePath = path.join(uploadDir, filename)

  try {
    await writeFile(filePath, buffer)
  } catch (err) {
    console.error("Error saving file:", err)
    return NextResponse.json({ error: "Failed to save image" }, { status: 500 })
  }

  const imageUrl = `/uploads/${filename}`

  const db = await getDB()
  await db.collection("words").updateOne(
    { _id: new ObjectId(id), userId },
    { $set: { imageUrl } }
  )

  return NextResponse.json({ imageUrl }, { status: 200 })
}
