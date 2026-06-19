"use client"

import { ButtonPrimary, ButtonSecondary } from "../modular/button"
import { ArrowRight } from "lucide-react"

const pricingData = [
  {
    name: "STANDARD / PERSONAL",
    pricing: 49,
    images: 20,
    description: "For personal use or low-usage shops",
    features: [
      "Amazon and Flipkart try-on",
      "Cloth piece preview",
      "Standard support",
    ],
  },
  {
    name: "POWER / TAILOR / SHOP",
    pricing: 199,
    images: 75,
    description: "For tailors and high converting cloth shops.",
    features: [
      "Everything in Standard",
      "Custom design & drawing on previews",
      "HD exports for print & WhatsApp sharing",
      "Priority processing queue",
      "Priority support",
    ],
  },
]

export const PricingSection = ({ id }: { id?: string }) => {
  return (
    <div
      id={id}
      className="flex h-fit w-full flex-col items-center justify-center gap-4 px-4 py-16 sm:px-16"
    >
      <span className="text-xs font-semibold text-text">PRICING</span>
      <h1 className="text-center text-6xl font-bold text-text">
        Pick your <span className="text-accent">plan</span>
      </h1>
      <span className="text-center text-sm text-text">
        Honest prices, designed for Indian shops. Start free; upgrade when
        you're closing more sales.
      </span>
      <div className="grid h-auto w-full grid-cols-1 gap-1 md:grid-cols-2">
        {pricingData.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col items-start justify-center gap-4 ${index === 0 ? "bg-background-primary text-text hover:bg-background-secondary" : "bg-contrast text-black"} p-8`}
          >
            <span className="text-sm font-bold text-accent">{item.name}</span>

            <div className="flex items-end gap-1">
              <h1 className="text-2xl font-bold">₹{item.pricing}</h1>
              <h1 className="text-sm">/ month</h1>
            </div>
            <p className="text-sm">{item.images} Images</p>
            <p className="text-sm">{item.description}</p>
            <div className="w-full border-t" />
            {item.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
            {/* <div className="w-full border-t" /> */}
            {index === 0 ? (
              <ButtonSecondary
                text="Choose Basic"
                buttonClass="w-full"
                buttonTextClass="text-xl"
                icon={ArrowRight}
              />
            ) : (
              <ButtonPrimary
                text="Choose Power"
                buttonClass="border w-full"
                buttonTextClass="text-xl"
                icon={ArrowRight}
                onClick={() => {}}
              />
            )}
          </div>
        ))}
      </div>
      <span className="text-center text-sm text-text">
        Includes <span className="font-semibold">5 free renders</span> to try.
        No credit card needed. Need more? Contact us for custom plans and
        enterprise solutions.
      </span>
    </div>
  )
}
