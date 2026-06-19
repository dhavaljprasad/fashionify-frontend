"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ButtonPrimary } from "../modular/button"
import { getCurrentUser, UserType } from "@/lib/user"

import { Menu, X } from "lucide-react"

export const AppPageHeader = ({
  showSidebar,
  setShowSidebar,
}: {
  showSidebar: boolean
  setShowSidebar: () => void
}) => {
  const [user, setUser] = useState<UserType | null>()
  const router = useRouter()

  const handleInstall = () => {
    // const result = install()
    // if (result.method === "ios-manual") {
    //   // show a modal/toast with result.instructions
    //   alert(result.instructions)
    // }
  }

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await getCurrentUser()
      setUser(userInfo)
    }
    fetchUser()
  }, [])

  return (
    <div className="fixed z-10 flex h-16 w-full items-center justify-between border-b px-4 backdrop-blur-sm sm:px-16">
      <div className="flex items-center justify-center gap-2">
        <div onClick={() => setShowSidebar()}>
          {showSidebar ? (
            <X className="cursor-pointer text-text" />
          ) : (
            <Menu className="cursor-pointer text-text" />
          )}
        </div>

        <div className="flex items-center text-xl font-semibold">
          <h1 className="m-0">Fashionify</h1>
          <h1 className="m-0 text-accent">AI</h1>
        </div>
      </div>
      {user ? (
        <div className="flex items-center justify-center gap-4">
          {/* {isInstalled || !canInstall ? null : (
            <ButtonPrimary
              text="Download App"
              onClick={() => handleInstall()}
            />
          )} */}
          <div
            className="h-10 w-10 cursor-pointer overflow-hidden border border-accent"
            onClick={() => router.push("/profile")}
          >
            <img
              src={user.image_url}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      ) : (
        <ButtonPrimary
          text="Start Free Trial"
          onClick={() => router.push("/auth")}
        />
      )}
    </div>
  )
}
