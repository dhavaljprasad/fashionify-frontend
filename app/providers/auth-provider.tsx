// app/providers/AuthProvider.tsx
"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { UserType } from "@/lib/user"
import { api } from "@/lib/api"

const PUBLIC_ROUTES = [
  "/",
  "/auth",
  "/about-us",
  "/privacy-policy",
  "/refund-policy",
  "/terms-and-conditions",
]

type AuthContextValue = {
  user: UserType | null
  loading: boolean
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    let cancelled = false

    const run = async () => {
      try {
        const res = await api.get("/auth/me")
        if (!cancelled) {
          setUser(res.data.data)
        }
      } catch {
        if (!cancelled) {
          setUser(null)
          // Redirect to landing page if on a protected route (not a public route)
          const isPublicRoute = PUBLIC_ROUTES.includes(pathname)
          if (!isPublicRoute && pathname.startsWith("/app")) {
            router.replace("/")
          }
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    run()

    return () => {
      cancelled = true
    }
  }, [pathname, router])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
