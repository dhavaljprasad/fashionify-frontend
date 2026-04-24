"use client"

import { EyeOff, Link2Off, Scissors } from "lucide-react"

const problems = [
  {
    index: "01",
    title: "Customers can't visualize",
    description:
      "They hold a cloth piece, squint, and ask 'kaisa lagega?' the sale walks out the door.",
    Icon: EyeOff,
  },
  {
    index: "02",
    title: "No previews from online links",
    description:
      "Amazon and Flipkart photos are on models, not on the customer standing in front of you.",
    Icon: Link2Off,
  },
  {
    index: "03",
    title: "No previews from online links",
    description:
      "Amazon and Flipkart photos are on models, not on the customer standing in front of you.",
    Icon: Scissors,
  },
]

export const ProblemsSection = () => {
  return (
    <div className="flex h-fit w-full flex-col items-start justify-between gap-4 bg-background-secondary px-4 py-16 sm:px-16 lg:flex-row lg:items-center">
      <div className="flex h-fit w-full flex-col items-start justify-center gap-4 lg:max-w-2xl">
        <span className="text-xs font-semibold text-text">THE REALITY</span>

        <h1 className="text-6xl font-bold text-text">
          Tailors & cloth sellers face{" "}
          <span className="text-accent">3 big problems.</span>
        </h1>

        <span className="text-sm text-text">
          I've spent years in my mom's boutique since childhood. The same
          pattern came up again and again.
        </span>
      </div>
      <div className="flex w-auto flex-col items-center items-stretch justify-center gap-1 md:flex-row">
        {problems.map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-start gap-2 bg-background-primary p-8"
            >
              <div className="flex w-full items-center justify-between">
                <span className="text-semibold text-sm text-accent">
                  {item.index}
                </span>
                <item.Icon size={20} className="text-contrast" />
              </div>
              <h3 className="text-lg font-semibold text-text">{item.title}</h3>
              <p className="text-sm text-text">{item.description}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
