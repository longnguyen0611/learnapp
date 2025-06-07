import { NextRequest, NextResponse } from "next/server"
import { getDB } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
export async function DELETE(req: NextRequest) {
  const db = await getDB()
  const userId = req.headers.get("x-user-id")
  const url = new URL(req.url)
  const id = url.pathname.split("/").pop() // lấy id cuối URL

  if (!userId || !id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const result = await db.collection("words").deleteOne({
    _id: new ObjectId(id),
    userId,
  })

  if (result.deletedCount === 0) {
    return NextResponse.json({ error: "Not Found or Unauthorized" }, { status: 404 })
  }

  return new NextResponse(null, { status: 204 })
}