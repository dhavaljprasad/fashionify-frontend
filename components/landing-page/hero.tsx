"use client"
import { useEffect, useState } from "react"
import { WordRotate } from "@/components/ui/word-rotate"
import { ButtonGroup, ButtonPrimary, ButtonSecondary } from "../modular/button"
import { useRouter } from "next/navigation"

import { ArrowRight, Play } from "lucide-react"
import { getCurrentUser } from "@/lib/user"

export const HeroSection = () => {
  const [selectedPreview, setSelectedPreview] = useState("Case I")
  const [user, setUser] = useState()

  const router = useRouter()

  const heroPreview = [
    {
      text: "Case I",
      type: "Dress to Customer",
      details:
        "Customer uploads a photo and drops a link or dress image. FashionifyAI previews the finished outfit on the customer under 10 seconds.",
      customerPhoto:
        "https://res.cloudinary.com/dli14hm5i/image/upload/v1777036476/beautiful-woman-purple-sweater-skirt_e9bdwh.jpg",
      dressPhoto:
        "https://res.cloudinary.com/dli14hm5i/image/upload/v1777036565/1d131a53e6eb52528dcfe123b31f4a97_mripm3.jpg",
      finalPhoto:
        "https://res.cloudinary.com/dli14hm5i/image/upload/v1777036274/Gemini_Generated_Image_elnsytelnsytelns_blx61h.png",
      onClick: () => setSelectedPreview("Case I"),
    },
    {
      text: "Case II",
      type: "Cloth to Customer",
      details:
        "Customer uploads a photo and drops a cloth piece. FashionifyAI previews the finished outfit on the customer under 10 seconds.",
      customerPhoto:
        "https://res.cloudinary.com/dli14hm5i/image/upload/v1777036476/beautiful-woman-purple-sweater-skirt_e9bdwh.jpg",
      dressPhoto:
        "https://res.cloudinary.com/dli14hm5i/image/upload/v1777054518/12ba71883be7e0a009555473f3eb0afd_eeu6zk.jpg",
      finalPhoto:
        "https://res.cloudinary.com/dli14hm5i/image/upload/v1777054535/Gemini_Generated_Image_y80mccy80mccy80m_v9aymy.png",
      onClick: () => setSelectedPreview("Case II"),
    },
  ]

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await getCurrentUser()
      setUser(userInfo)
    }
    fetchUser()
  }, [])

  return (
    <div className="flex h-fit w-full flex-col items-start justify-between gap-4 px-4 sm:px-16 lg:flex-row lg:items-center">
      <div className="flex h-screen w-full flex-col items-start justify-center gap-4 lg:max-w-2xl">
        <div className="flex items-center justify-center gap-2 bg-background-secondary px-2 py-1">
          <div className="h-1 w-1 bg-accent" />
          <span className="text-xs font-semibold text-text">
            Made for Indian Body types
          </span>
        </div>
        <div className="flex flex-col items-start justify-center gap-2">
          <h1 className="text-6xl font-bold text-text">Try before</h1>
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-6xl font-bold text-text">you</h1>
            <WordRotate
              words={["Buy.", "Stitch.", "Style."]}
              className="text-6xl font-bold text-accent"
            />
          </div>
        </div>
        <span className="text-sm text-text">
          Upload a photo and Drop an Amazon / Flipkart link or a cloth piece.
          FashionifyAI previews the finished outfit on your customer in 10
          seconds, built for cloth sellers, tailors, and every-day styling.
        </span>
        <div className="flex items-start justify-center gap-4">
          {user ? (
            <ButtonPrimary
              text="Start Now"
              onClick={() => router.push("/app")}
              icon={ArrowRight}
            />
          ) : (
            <ButtonPrimary
              text="Start Free Trial"
              onClick={() => router.push("/auth")}
              icon={ArrowRight}
            />
          )}

          <ButtonSecondary text="See Demo" icon={Play} />
        </div>
      </div>
      <div className="flex h-full w-full flex-col items-end justify-center gap-4">
        <div className="flex items-center justify-center gap-2">
          <ButtonGroup data={heroPreview} activeText={selectedPreview} />
        </div>
        <div className="flex w-full items-center justify-center px-4">
          <div className="relative w-full max-w-5xl">
            <div className="relative flex flex-col gap-6 md:flex-row">
              {/* LEFT SIDE */}
              <div className="relative min-h-[420px] w-full md:w-1/2">
                {/* Customer Photo */}
                <div className="absolute top-4 left-4 aspect-[3/4] w-48 rotate-[-6deg] overflow-hidden rounded-md shadow-lg lg:w-40">
                  <img
                    src={
                      heroPreview.find((item) => item.text === selectedPreview)
                        ?.customerPhoto!
                    }
                    alt="Customer"
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Dress Photo */}
                <div className="absolute right-4 bottom-4 aspect-[3/4] w-48 rotate-[6deg] overflow-hidden rounded-md shadow-lg lg:w-40">
                  <img
                    src={
                      heroPreview.find((item) => item.text === selectedPreview)
                        ?.dressPhoto!
                    }
                    alt="Dress"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="flex w-full items-center justify-center md:w-1/2">
                <div className="aspect-[3/4] w-80 overflow-hidden rounded-md shadow-xl sm:w-76 lg:w-56">
                  <img
                    src={
                      heroPreview.find((item) => item.text === selectedPreview)
                        ?.finalPhoto!
                    }
                    alt="Final"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* OVERVIEW */}
            <div className="absolute bottom-2 mt-4 w-full rounded-md bg-contrast px-4 py-2">
              <span className="text-base font-semibold text-background-primary">
                {
                  heroPreview.find((item) => item.text === selectedPreview)
                    ?.type
                }
              </span>
              <p className="text-sm text-background-primary">
                {
                  heroPreview.find((item) => item.text === selectedPreview)
                    ?.details
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
