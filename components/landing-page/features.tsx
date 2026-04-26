"use client"
import { Smartphone, Cpu, Brush, Zap, IndianRupee, Share2 } from "lucide-react"

const featuresData = [
  {
    index: "01",
    title: "Mobile-first",
    description:
      "Designed for phones in shops. Works on any browser, any device.",
    icon: Smartphone,
  },
  {
    index: "02",
    title: "Realistic for Indian bodies",
    description:
      "Trained on Indian skin tones, body types, and silhouettes: powered by agentic image generation, not just superimposition.",
    icon: Cpu,
  },
  {
    index: "03",
    title: "Custom design overlays",
    description:
      "Draw on the preview or describe changes. Send tailor-ready visuals to your karigar.",
    icon: Brush,
  },
  {
    index: "04",
    title: "Fast results",
    description:
      "7–10 seconds per render. Show, don't tell, close the sale before they leave.",
    icon: Zap,
  },
  {
    index: "05",
    title: "Affordable for SMBs",
    description:
      "Plans from ₹49. No subscription traps. Pay only for what you actually use.",
    icon: IndianRupee,
  },
  {
    index: "06",
    title: "WhatsApp-ready exports",
    description:
      "One-tap export. Share to WhatsApp, Instagram, or print straight from the phone.",
    icon: Share2,
  },
]

export const FeaturesSection = ({ id }: { id?: string }) => {
  return (
    <div
      id={id}
      className="flex h-fit w-full flex-col items-start justify-center gap-4 bg-background-secondary px-4 py-16 sm:px-16"
    >
      <span className="text-xs font-semibold text-text">WHAT YOU GET</span>
      <div className="flex w-full flex-col items-center justify-between gap-4 xl:flex-row xl:items-end xl:gap-0">
        <div className="flex flex-col items-start justify-center gap-2">
          <h1 className="text-center text-6xl font-bold text-text">
            Everything you need.
          </h1>
          <h1 className="text-center text-6xl font-bold text-accent">
            Nothing you don't.
          </h1>
        </div>
        <span className="text-sm text-text">
          Built ground-up for the dukandar with a phone in one hand and a cloth
          piece in the other.
        </span>
      </div>
      <div className="grid w-full grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3">
        {featuresData.map((feature) => (
          <div
            key={feature.index}
            className="group flex flex-col items-start justify-center gap-4 rounded-lg bg-background-primary p-4 transition-colors duration-200 hover:bg-contrast"
          >
            <div className="flex w-full items-center justify-between gap-2">
              <span className="text-sm font-semibold text-accent">
                {feature.index}
              </span>
              <feature.icon
                size={18}
                className="text-contrast transition-colors duration-200 group-hover:text-black"
              />
            </div>
            <h3 className="text-lg font-bold text-contrast transition-colors duration-200 group-hover:text-black">
              {feature.title}
            </h3>
            <p className="text-sm text-contrast transition-colors duration-200 group-hover:text-black">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
