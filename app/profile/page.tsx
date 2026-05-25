"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  BadgeCheck,
  Clock3,
  Hash,
  Mail,
  UserRound,
} from "lucide-react"
import { getCurrentUser, UserType } from "@/lib/user"
import { ButtonPrimary } from "@/components/modular/button"

function Page() {
  const [user, setUser] = useState<UserType | null | undefined>(undefined)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await getCurrentUser()
      setUser(userInfo)
    }
    fetchUser()
  }, [])

  return (
    <div className="flex min-h-screen w-full flex-col p-4 sm:px-16">
      <ButtonPrimary
        text="Back"
        onClick={() => router.back()}
        icon={ArrowLeft}
      />
      <div className="flex w-full flex-1 items-center justify-center">
        <section className="flex w-full max-w-6xl flex-col gap-8 border border-text/10 bg-background-secondary/60 p-6 shadow-[0_30px_120px_rgba(60,46,29,0.08)] backdrop-blur-sm sm:p-8 lg:grid lg:grid-cols-[minmax(280px,0.85fr)_minmax(0,1.15fr)] lg:gap-12 lg:p-10">
          <div className="flex flex-col items-center justify-center border-b border-text/10 pb-8 text-center lg:border-r lg:border-b-0 lg:pr-12 lg:pb-0">
            <div className="relative mb-6">
              <div className="absolute inset-0 rounded-full bg-accent/20 blur-2xl" />
              <img
                src={user?.image_url}
                alt={user?.name}
                referrerPolicy="no-referrer"
                className="relative h-32 w-32 rounded-full border border-accent/35 object-cover shadow-[0_18px_60px_rgba(218,104,42,0.18)] sm:h-40 sm:w-40 lg:h-52 lg:w-52"
              />
            </div>

            <h1 className="max-w-[12ch] text-3xl leading-tight font-semibold text-contrast sm:text-4xl">
              {user?.name}
            </h1>
          </div>

          <div className="flex w-full flex-col items-start justify-start">
            <div className="flex w-full flex-col gap-2 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
              <div className="flex items-center gap-3 text-text/70">
                <UserRound size={18} className="text-accent" />
                <span className="text-xs font-medium tracking-[0.22em] uppercase">
                  Full Name
                </span>
              </div>
              <p className="text-base font-medium text-contrast sm:max-w-[60%] sm:text-right">
                {user?.name}
              </p>
            </div>

            <div className="flex w-full flex-col gap-2 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
              <div className="flex items-center gap-3 text-text/70">
                <Mail size={18} className="text-accent" />
                <span className="text-xs font-medium tracking-[0.22em] uppercase">
                  Email
                </span>
              </div>
              <p className="text-base font-medium break-all text-contrast sm:max-w-[60%] sm:text-right">
                {user?.email}
              </p>
            </div>

            <div className="flex w-full flex-col gap-2 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
              <div className="flex items-center gap-3 text-text/70">
                <BadgeCheck size={18} className="text-accent" />
                <span className="text-xs font-medium tracking-[0.22em] uppercase">
                  Account Type
                </span>
              </div>
              <p className="text-base font-medium text-contrast capitalize sm:max-w-[60%] sm:text-right">
                {user?.type_of_user}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Page
