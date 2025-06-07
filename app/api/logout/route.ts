import { NextResponse } from "next/server";

export async function POST() {
  // Nếu bạn không dùng session hay token ở backend,
  // logout chỉ là thao tác ở frontend thôi, backend trả về 200 OK
  return NextResponse.json({ message: "Logged out" }, { status: 200 });
}
