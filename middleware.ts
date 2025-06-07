import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // For now, just allow all requests to pass through
  // The client-side auth will handle redirects
  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
