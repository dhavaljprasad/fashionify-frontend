"use client"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"

import { Images, PenLine } from "lucide-react"
import { getCurrentUser, UserType } from "@/lib/user"
import { ButtonSecondary } from "./button"
import { api } from "@/lib/api"

type ConversationHistoryItem = {
  conversation_id: string
  entry_type: string
  title: string
}

export const SideBar = () => {
  const [user, setUser] = useState<UserType | null>()
  const [history, setHistory] = useState<ConversationHistoryItem[]>([])
  const router = useRouter()

  const params = useParams()
  const conversation_id = params.conversation_id as string

  const sideBarConstOptions = [
    {
      label: "New Chat",
      onClick: () => router.push("/app"),
      icon: PenLine,
    },
    {
      label: "Gallery",
      onClick: () => router.push("/gallery"),
      icon: Images,
    },
  ]

  const getUserConversations = async () => {
    try {
      const res = await api.get("/api/conversation/user-conversations")
      setHistory(res.data.conversations)
      console.log("User Conversations:", res.data)
    } catch (error) {
      console.error("Error fetching user conversations:", error)
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await getCurrentUser()
      setUser(userInfo)
    }
    fetchUser()
    getUserConversations()
  }, [])
  return (
    <div className="fixed left-0 z-5 flex h-screen w-72 flex-col bg-background-secondary px-4 pt-20 pb-4">
      <div className="flex w-full flex-col gap-2">
        {sideBarConstOptions.map((item, index) => {
          return (
            <div
              className="group flex w-full cursor-pointer items-center justify-start gap-2 p-2 hover:bg-background-primary"
              key={index}
              onClick={item.onClick}
            >
              <item.icon size={16} className="group-hover:text-contrast" />
              <span className="text-text group-hover:text-contrast">
                {item.label}
              </span>
            </div>
          )
        })}
        <span className="mt-2 text-lg font-semibold text-text">History</span>
      </div>
      <div className="scrollbar-thin flex w-full flex-1 flex-col gap-2 overflow-y-auto scrollbar-thumb-text scrollbar-track-transparent">
        {history.length > 0 ? (
          history.map((item, index) => {
            return (
              <div
                className={`group flex w-full cursor-pointer items-center justify-start gap-2 p-2 ${conversation_id === item.conversation_id ? "bg-background-primary" : "hover:bg-background-primary"}`}
                key={index}
                onClick={() => router.push(`/${item.conversation_id}`)}
              >
                <span className="text-sm text-text group-hover:text-contrast">
                  {item.title}
                </span>
              </div>
            )
          })
        ) : (
          <div className="border-border flex h-full items-center justify-center rounded-md border p-4 text-center text-text">
            No conversation history available.
          </div>
        )}
      </div>
      {user ? (
        <div
          className="flex h-auto w-full cursor-pointer gap-2 p-4 hover:bg-background-primary"
          onClick={() => router.push("/profile")}
        >
          <img
            src={user.image_url}
            className="h-12 w-12 border border-accent"
          />
          <div className="flex h-auto w-auto flex-col justify-center gap-1">
            <h1 className="m-0 text-sm font-semibold">{user.name}</h1>
            <span className="text-xs capitalize">{user.type_of_user}</span>
          </div>
        </div>
      ) : (
        <ButtonSecondary text="Sign-In" />
      )}
    </div>
  )
}
