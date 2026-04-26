"use client"
import { FeaturesSection } from "@/components/landing-page/features"
import { FooterSection } from "@/components/landing-page/footer"
import { LandingPageHeader } from "@/components/landing-page/header"
import { HeroSection } from "@/components/landing-page/hero"
import { HeroFooterSection } from "@/components/landing-page/hero-footer"
import { HowItWorksSection } from "@/components/landing-page/how-it-works"
import { PricingSection } from "@/components/landing-page/pricing"
import { ProblemsSection } from "@/components/landing-page/problems"
import { RollingMarquee } from "@/components/landing-page/rolling-marquee"
import { TestimonialsSection } from "@/components/landing-page/testimonials"

const navItems = [
  {
    label: "Problem",
    href: "#problems",
  },
  {
    label: "How it works",
    href: "#how-it-works",
  },
  {
    label: "Features",
    href: "#features",
  },
  {
    label: "Pricing",
    href: "#pricing",
  },
]

export default function Page() {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <LandingPageHeader navItems={navItems} />
      <HeroSection />
      <RollingMarquee />
      <ProblemsSection id="problems" />
      <HowItWorksSection id="how-it-works" />
      <FeaturesSection id="features" />
      <PricingSection id="pricing" />
      <TestimonialsSection />
      <HeroFooterSection />
      <FooterSection />
    </div>
  )
}
