import { NextRequest, NextResponse } from "next/server"
import { jwtDecode } from "jwt-decode"

type JwtPayload = {
  exp?: number
  [key: string]: any
}

const PUBLIC_PATHS = ["/", "/auth"] // pages that don't require login
const COOKIE_NAME = "access_token"

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // 1) Read raw cookie header
  const cookieHeader = req.headers.get("cookie") || ""
  // 2) Extract our access_token value
  const token = getTokenFromCookie(cookieHeader)

  // 3) Is this route public?
  const isPublic = PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  )

  // 4) Check if token is valid (not expired, decodable)
  const isValid = isTokenValid(token)

  // Case A: user NOT authenticated but trying to hit protected route
  if (!isValid && !isPublic) {
    const url = req.nextUrl.clone()
    url.pathname = "/" // redirect to landing page
    return NextResponse.redirect(url)
  }

  // Case B: user authenticated but on /auth -> send them to app
  if (isValid && pathname.startsWith("/auth")) {
    const url = req.nextUrl.clone()
    url.pathname = "/app" // your app home
    return NextResponse.redirect(url)
  }

  // Otherwise just continue
  return NextResponse.next()
}

// --- helpers used only by middleware runtime ---

function getTokenFromCookie(cookieHeader: string): string | null {
  const parts = cookieHeader.split(";").map((c) => c.trim())
  const prefix = `${COOKIE_NAME}=`
  for (const part of parts) {
    if (part.startsWith(prefix)) {
      return part.substring(prefix.length)
    }
  }
  return null
}

function isTokenValid(token: string | null): boolean {
  if (!token) return false
  try {
    const payload = jwtDecode<JwtPayload>(token)
    if (!payload.exp) return true // if no exp, treat as valid (your choice)
    return Date.now() < payload.exp * 1000
  } catch {
    return false
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
