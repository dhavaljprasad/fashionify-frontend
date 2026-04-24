"use client"
import { LandingPageHeader } from "@/components/landing-page/header"
import { useToggleTheme } from "@/components/use-theme"

const navItems = [
  {
    label: "Problem",
  },
  {
    label: "How it works",
  },
  {
    label: "Features",
  },
  {
    label: "Pricing",
  },
]

export default function Page() {
  const toggleTheme = useToggleTheme()
  return (
    <div className="flex min-h-screen w-full">
      <LandingPageHeader navItems={navItems} />
    </div>
  )
}
