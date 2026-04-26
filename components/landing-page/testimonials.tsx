"use client"
import { WordRotate } from "../ui/word-rotate"
import { Separator } from "../ui/separator"
import { NumberTicker } from "../ui/number-ticker"
import { Star } from "lucide-react"

const testimonialsData = [
  {
    rating: 5,
    review:
      "Wedding season mein 40% zyada orders close kiye. Drawing tool kamaal ka hai! Customers ko dikhate hi order pakka, mazaa aa gaya!",
    name: "Sunidhi",
    shop: "Fashion One Boutique, Ayodhya",
    image:
      "https://res.cloudinary.com/dli14hm5i/image/upload/v1777184345/ChatGPT_Image_Apr_26_2026_11_47_26_AM_pyni3s.png",
  },
  {
    rating: 5,
    review:
      "Ohh my girl loved it! She was so happy to see how the dress she saw on Amazon would look on her. It’s a game changer!",
    name: "Dhaval",
    shop: "Independent User, Ayodhya",
    image:
      "https://res.cloudinary.com/dli14hm5i/image/upload/v1777184351/WhatsApp_Image_2025-06-28_at_18.27.49g_vlduds.jpg",
  },
  {
    rating: 5,
    review:
      "Pehle customer kapda dekhke confuse hota tha. Ab preview dikhata hoon to decision clear hota hai, aur order pakka ho jata hai.",
    name: "Amitabh",
    shop: "Rajasahab Handloom, Lucknow",
    image:
      "https://res.cloudinary.com/dli14hm5i/image/upload/v1777184338/ChatGPT_Image_Apr_26_2026_11_48_25_AM_k9ll6r.png",
  },
]

const testimonialsMetrics = [
  {
    label: "USERS ONBOARDED",
    value: 100,
    type: "users",
  },
  {
    label: "SALES INFLUENCED",
    value: 50,
    type: "sales",
  },
  {
    label: "AVERAGE RATING",
    value: 4,
    type: "rating",
  },
  {
    label: "AVERAGE RENDER TIME",
    value: 10,
    type: "render",
  },
]

export const TestimonialsSection = () => {
  return (
    <div className="flex h-fit w-full flex-col items-center justify-center gap-4 bg-contrast px-4 py-16 sm:px-16">
      <span className="text-xs font-semibold text-accent">
        REAL USERS. REAL SHOPS. REAL RESULTS.
      </span>
      <div className="flex h-auto w-full flex-col items-center justify-center gap-2 md:flex-row">
        <WordRotate
          words={["Users", "Shops", "Tailors"]}
          className="text-6xl font-bold text-accent"
        />
        <h1 className="text-center text-6xl font-bold text-black">
          already love it!
        </h1>
      </div>
      <div className="grid h-auto w-full grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3">
        {testimonialsData.map((item, index) => (
          <div key={index} className="flex flex-col items-start gap-4 p-4">
            <div className="flex items-center gap-1">
              {[...Array(item.rating)].map((_, i) => (
                <Star key={i} size={16} color="#e65e10" fill="#e65e10" />
              ))}
            </div>
            <h3 className="text-lg font-semibold text-black">
              "{item.review}"
            </h3>
            <Separator className="bg-background-secondary" />
            <div className="flex h-auto w-full items-center justify-start gap-2">
              <img
                src={item.image}
                alt={item.name}
                className="h-16 w-16 object-cover"
              />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-black">
                  {item.name}
                </span>
                <span className="text-xs text-gray-500">{item.shop}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 grid h-auto w-full grid-cols-2 gap-1 lg:grid-cols-4">
        {testimonialsMetrics.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <div className="flex items-end justify-center gap-1">
              {item.type === "sales" && (
                <span className="text-lg font-semibold text-black">₹</span>
              )}
              <NumberTicker
                value={item.value}
                className="text-4xl font-semibold text-black"
              />
              {item.type === "users" && (
                <span className="text-lg font-semibold text-black">+</span>
              )}
              {item.type === "sales" && (
                <span className="text-lg font-semibold text-black">L+</span>
              )}
              {item.type === "rating" && (
                <span className="text-lg font-semibold text-black">/5</span>
              )}
              {item.type === "render" && (
                <span className="text-lg font-semibold text-black">s</span>
              )}
            </div>
            <span className="text-sm text-background-secondary">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
