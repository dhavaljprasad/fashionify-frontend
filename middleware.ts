import { NextRequest, NextResponse } from "next/server"
import { jwtDecode } from "jwt-decode"

type JwtPayload = {
  exp?: number
  [key: string]: any
}

const PUBLIC_PATHS = [
  "/",
  "/auth",
  "/about-us",
  "/privacy-policy",
  "/refund-policy",
  "/terms-and-conditions",
]
const COOKIE_NAME = "access_token"

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Use Next.js built-in cookie API
  const token = req.cookies.get(COOKIE_NAME)?.value || null

  const isPublic = PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  )

  const isValid = isTokenValid(token)

  // Not logged in → trying to access protected route
  if (!isValid && !isPublic) {
    const url = req.nextUrl.clone()
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  // Logged in → trying to access auth pages
  if (isValid && pathname.startsWith("/auth")) {
    const url = req.nextUrl.clone()
    url.pathname = "/app"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

// --- helpers ---

function isTokenValid(token: string | null): boolean {
  if (!token) return false

  try {
    const payload = jwtDecode<JwtPayload>(token)

    // If no exp → treat as invalid (stricter, better)
    if (!payload.exp) return false

    return Date.now() < payload.exp * 1000
  } catch {
    return false
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|manifest.webmanifest|sw.js|icon-192x192.png|icon-512x512.png).*)",
  ],
}
