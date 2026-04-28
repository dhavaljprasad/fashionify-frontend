"use client"
import { jwtDecode } from "jwt-decode"

const ACCESS_TOKEN_KEY = "access_token"
const COOKIE_NAME = "access_token"

// --- localStorage helpers ---

// Save or remove JWT
export function setToken(token: string | null) {
  if (typeof window === "undefined") return

  if (token) {
    // 1) Persist token in localStorage (for client-side JS)
    localStorage.setItem(ACCESS_TOKEN_KEY, token)
    // 2) Also mirror token into a cookie (for middleware)
    setTokenCookie(token)
  } else {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    clearTokenCookie()
  }
}

// Read JWT from localStorage
export function getToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

// Clear token everywhere
export function clearToken() {
  setToken(null)
}

// --- cookie helpers (middleware can see cookies) ---

function setTokenCookie(token: string) {
  if (typeof document === "undefined") {
    console.log("[setTokenCookie] No document, skipping")
    return
  }

  console.log("Comes till here!")
  // Cookie lifetime in seconds (doesn't matter much, JWT exp is the real limit)
  const maxAgeSeconds = 60 * 60 * 24 * 30 * 6 // ~6 months

  document.cookie = `${COOKIE_NAME}=${token}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax${
    process.env.NODE_ENV === "production" ? "; Secure" : ""
  }`
}

function clearTokenCookie() {
  if (typeof document === "undefined") return
  document.cookie = `${COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax${
    process.env.NODE_ENV === "production" ? "; Secure" : ""
  }`
}

// --- decode helper ---

// Decode JWT into an object (or null if invalid/expired)
export function getUserFromToken(token?: string | null) {
  const t = token ?? getToken()
  if (!t) return null

  try {
    const payload = jwtDecode(t)

    // If expired, clear and treat as logged out
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      clearToken()
      return null
    }

    return payload
  } catch (e) {
    console.error("Failed to decode JWT", e)
    clearToken()
    return null
  }
}
