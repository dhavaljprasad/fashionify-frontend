"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Play } from "lucide-react"
import { ButtonSecondary, ButtonPrimary } from "../modular/button"
import { getCurrentUser, UserType } from "@/lib/user"

export const HeroFooterSection = () => {
  const [user, setUser] = useState<UserType | null>()
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await getCurrentUser()
      setUser(userInfo)
    }
    fetchUser()
  }, [])
  return (
    <div className="flex h-fit w-full flex-col items-start justify-between gap-4 bg-accent px-4 py-16 sm:px-16 lg:flex-row lg:items-center">
      <div className="flex h-auto w-full flex-col items-start justify-center gap-4 lg:max-w-2xl">
        <span className="text-xs font-semibold text-contrast">
          ABB TRY KARO
        </span>

        <h1 className="text-6xl font-bold text-contrast">
          Ready to close more sales?
        </h1>

        <span className="text-sm text-contrast">
          Get 5 free renders. Made for Indian tailors and cloth shops. No credit
          card.
        </span>
      </div>
      <div className="flex h-full w-full items-center justify-end gap-4">
        {user ? (
          <ButtonPrimary
            text="Start Now"
            buttonClass="hover:border border-background-secondary"
            onClick={() => router.push("/app")}
            icon={ArrowRight}
          />
        ) : (
          <ButtonPrimary
            text="Start Free Trial"
            icon={ArrowRight}
            buttonClass="hover:border border-background-secondary"
            onClick={() => router.push("/auth")}
          />
        )}

        <ButtonSecondary text="See Demo" icon={Play} />
      </div>
    </div>
  )
}
