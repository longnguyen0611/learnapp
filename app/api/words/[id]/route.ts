import { NextRequest, NextResponse } from "next/server"
import { getDB } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import path from "path"
import fs from "fs"

export async function DELETE(req: NextRequest) {
  const db = await getDB()
  const userId = req.headers.get("x-user-id")
  const url = new URL(req.url)
  const id = url.pathname.split("/").pop() // lấy id cuối URL

  if (!userId || !id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // 🔍 Lấy thông tin từ để kiểm tra có ảnh hay không
  const word = await db.collection("words").findOne({
    _id: new ObjectId(id),
    userId,
  })

  if (!word) {
    return NextResponse.json({ error: "Not Found or Unauthorized" }, { status: 404 })
  }

  // 🧹 Nếu có ảnh, xóa file ảnh trong thư mục uploads
  if (word.imageUrl) {
    const filePath = path.join(process.cwd(), "public", word.imageUrl.replace(/^\/+/, "")) // bỏ dấu "/" đầu nếu có
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
    } catch (err) {
      console.error("Error deleting image file:", err)
    }
  }

  // ❌ Xóa từ trong DB
  const result = await db.collection("words").deleteOne({
    _id: new ObjectId(id),
    userId,
  })

  return new NextResponse(null, { status: 204 })
}
