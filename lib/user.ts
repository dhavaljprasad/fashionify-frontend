import { api } from "@/lib/api"

export type UserType = {
  email: string
  exp: number
  id: string
  image_url: string
  name: string
  type_of_user: string
}

export async function getCurrentUser(): Promise<UserType | null> {
  try {
    const res = await api.get("/auth/me")
    return res.data.data
  } catch {
    return null
  }
}
