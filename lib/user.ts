import { api } from "@/lib/api"

export async function getCurrentUser() {
  try {
    const res = await api.get("/auth/me")
    return res.data.data
  } catch {
    return null
  }
}
