// /app/api/register/route.ts
import { getDB } from "@/lib/mongodb"
import bcrypt from "bcrypt"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    const db = await getDB()
    const users = db.collection("users")

    const existingUser = await users.findOne({ email })
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "Email already exists" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const result = await users.insertOne({
      email,
      password: hashedPassword,
      createdAt: new Date(),
    })

    return new Response(
      JSON.stringify({
        id: result.insertedId,
        email,
        name: "User",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    )
  } catch (error) {
    console.error("❌ Register API error:", error)
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}
