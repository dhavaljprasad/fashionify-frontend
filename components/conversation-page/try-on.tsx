"use client"

import { Shirt, Scissors, ArrowRight } from "lucide-react"

const tryOnData = [
  {
    label: "See On",
    icon: Shirt,
    description:
      "Use Amazon / Flipkart link or Direct Garment Picture to get quick see on",
  },
  {
    label: "Dress Up",
    icon: Scissors,
    description:
      "Perfect for un-stitched cloth outfits with custom designs and add-ons",
  },
] as const

type TryOnComponentProps = {
  selectTryOn: (label: "See On" | "Dress Up") => void
}

export const TryOnComponent = ({ selectTryOn }: TryOnComponentProps) => {
  return (
    <div className="grid w-full grid-cols-2 gap-2">
      {tryOnData.map((item, index) => {
        return (
          <div
            key={index}
            className="flex h-auto w-full cursor-pointer flex-col items-start justify-between gap-4 rounded-2xl bg-background-secondary p-4 transition-all hover:scale-[1.02]"
            onClick={() => selectTryOn(item.label)}
          >
            <div className="flex w-full flex-col gap-2">
              <div className="flex w-full items-center justify-between">
                <h1 className="m-0 text-sm font-semibold text-contrast">
                  {item.label}
                </h1>

                <item.icon className="text-contrast" size={18} />
              </div>

              <p className="text-xs text-text">{item.description}</p>
            </div>

            <div className="flex w-full items-center justify-end gap-1">
              <span className="text-xs text-accent">Tap to Choose</span>

              <ArrowRight size={16} className="text-accent" />
            </div>
          </div>
        )
      })}
    </div>
  )
}
