"use client"
import { Link, Shirt, PenLine } from "lucide-react"

const howItWorksData = [
  {
    step: "Usecase 01",
    label: "TRY-ON",
    heading: "Paste an Amazon or Flipkart link.",
    description:
      "Drop any product URL plus a customer photo. See how it actually looks on them not on a model.",
    Icon: Link,
  },
  {
    step: "Usecase 02",
    label: "CLOTH PIECE",
    heading: "Upload unstitched fabric.",
    description:
      "Snap the cloth, snap the body. AI stitches a realistic preview in 10 seconds kurta, suit, lehenga, blouse.",
    Icon: Shirt,
  },
  {
    step: "Usecase 03",
    label: "DESIGN",
    heading: "Draw or describe changes.",
    description:
      "Sketch a new neckline. Type 'longer sleeves'. Hand the tailor-ready visualization straight to your karigar.",
    Icon: PenLine,
  },
]

export const HowItWorksSection = ({ id }: { id?: string }) => {
  return (
    <div
      id={id}
      className="flex h-fit w-full flex-col items-center justify-center gap-4 px-4 py-16 sm:px-16"
    >
      <span className="text-xs font-semibold text-text">THE FLOW</span>
      <h1 className="text-center text-6xl font-bold text-text">
        One linear flow. <span className="text-accent">Three use cases.</span>
      </h1>
      <span className="text-center text-sm text-text">
        Stop at step one or go all the way to step three. The deeper you go, the
        better the result. No learning curve.
      </span>
      <div className="flex h-auto w-full flex-col items-center items-stretch justify-center md:flex-row">
        {howItWorksData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-start justify-center gap-4 bg-background-primary p-4 hover:bg-background-secondary"
          >
            <div className="flex w-full items-center justify-between">
              <span className="text-sm text-accent">{item.step}</span>
              <item.Icon size={18} />
            </div>

            <div className="border p-1">
              <p className="text-xs font-semibold text-text">{item.label}</p>
            </div>
            <h3 className="text-lg font-bold text-text">{item.heading}</h3>
            <p className="text-sm text-text">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
