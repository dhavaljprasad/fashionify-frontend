"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

import { Images, PenLine } from "lucide-react"
import { getCurrentUser, UserType } from "@/lib/user"
import { ButtonSecondary } from "./button"

export const SideBar = () => {
  const [user, setUser] = useState<UserType | null>()
  const router = useRouter()

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

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await getCurrentUser()
      setUser(userInfo)
    }
    fetchUser()
  }, [])
  return (
    <div className="fixed left-0 z-5 flex h-screen w-72 flex-col items-center justify-between gap-2 bg-background-secondary px-4 pt-20 pb-4">
      <div className="flex h-auto w-full flex-col items-start justify-start gap-2">
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
      {user ? (
        <div
          className="bottom-0 flex h-auto w-full cursor-pointer gap-2 p-4 hover:bg-background-primary"
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
