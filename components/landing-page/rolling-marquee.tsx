"use client"
import { Marquee } from "../ui/marquee"

const marqueeItems = [
  "Indian Body Types",
  "Custom Design Options",
  "Amazon Try-On",
  "Flipkart Try-On",
  "Cloth Piece Preview",
  "WhatsApp Ready Exports",
  "Mobile first",
]

export const RollingMarquee = () => {
  return (
    <div className="mt-4 h-auto w-full bg-contrast md:mt-0">
      <Marquee pauseOnHover className="[--duration:20s]">
        {marqueeItems.map((item) => (
          <div
            key={item}
            className="cursor-pointer px-4 text-sm font-semibold text-black transition-colors duration-200 hover:text-accent"
          >
            {item}
          </div>
        ))}
      </Marquee>
    </div>
  )
}
