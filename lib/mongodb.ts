import { MongoClient, Db } from "mongodb"

if (!process.env.MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local")
}

const uri = process.env.MONGODB_URI
const options = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

declare global {
  // để tránh lỗi khi hot reload trong dev
  var _mongoClientPromise: Promise<MongoClient>
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use global variable to preserve the client across module reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri!, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production mode, create a new client for every request
  client = new MongoClient(uri!, options)
  clientPromise = client.connect()
}

export async function getDB(): Promise<Db> {
  const client = await clientPromise
  return client.db() // nếu muốn chỉ định DB, truyền tên DB vào đây
}