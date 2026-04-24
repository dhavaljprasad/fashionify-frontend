"use client"
import { LandingPageHeader } from "@/components/landing-page/header"
import { HeroSection } from "@/components/landing-page/hero"
import { ProblemsSection } from "@/components/landing-page/problems"
import { RollingMarquee } from "@/components/landing-page/rolling-marquee"
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
    <div className="relative flex min-h-screen w-full flex-col">
      <LandingPageHeader navItems={navItems} />
      <HeroSection />
      <RollingMarquee />
      <ProblemsSection />
    </div>
  )
}
