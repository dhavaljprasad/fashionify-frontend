"use client"
import { useState, useEffect, useRef } from "react"
import { ButtonGroup } from "../modular/button"
import { ArrowRight, Images, X, Check } from "lucide-react"

export const SeeOnComponent = () => {
  // variables
  const [activeTab, setActiveTab] = useState<
    "E-Commerce Link" | "Upload Picture"
  >("E-Commerce Link")
  const [capturedImage, setCapturedImage] = useState<string>("")

  // refs
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const tabsData = [
    {
      text: "E-Commerce Link",
      onClick: () => setActiveTab("E-Commerce Link"),
    },
    {
      text: "Upload Picture",
      onClick: () => setActiveTab("Upload Picture"),
    },
  ]

  // functions
  const captureImage = () => {
    console.log("click triggered")
    const video = videoRef.current
    if (!video) return

    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")!

    const videoWidth = video.videoWidth
    const videoHeight = video.videoHeight

    const targetRatio = 2 / 3

    let cropWidth = videoWidth
    let cropHeight = videoWidth / targetRatio

    if (cropHeight > videoHeight) {
      cropHeight = videoHeight
      cropWidth = videoHeight * targetRatio
    }

    const startX = (videoWidth - cropWidth) / 2
    const startY = (videoHeight - cropHeight) / 2

    const targetWidth = 1024
    const targetHeight = 1536

    canvas.width = targetWidth
    canvas.height = targetHeight

    ctx.drawImage(
      video,
      startX,
      startY,
      cropWidth,
      cropHeight,
      0,
      0,
      targetWidth,
      targetHeight
    )

    const image = canvas.toDataURL("image/webp", 0.8)
    setCapturedImage(image)
  }

  const onDiscardImage = () => {
    // if (uploading) return
    setCapturedImage("")
    startCamera()
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const img = new Image()
    const url = URL.createObjectURL(file)

    img.onload = () => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const targetRatio = 2 / 3

      let cropWidth = img.width
      let cropHeight = img.width / targetRatio

      if (cropHeight > img.height) {
        cropHeight = img.height
        cropWidth = img.height * targetRatio
      }

      const startX = (img.width - cropWidth) / 2
      const startY = (img.height - cropHeight) / 2

      const targetWidth = 1024
      const targetHeight = 1536

      canvas.width = targetWidth
      canvas.height = targetHeight

      ctx.drawImage(
        img,
        startX,
        startY,
        cropWidth,
        cropHeight,
        0,
        0,
        targetWidth,
        targetHeight
      )

      canvas.toBlob(
        (blob) => {
          if (!blob) return

          const finalUrl = URL.createObjectURL(blob)
          setCapturedImage(finalUrl) // same pattern as your previous version
        },
        "image/webp",
        0.8
      )

      URL.revokeObjectURL(url)
    }

    img.src = url
  }

  const openPicker = () => {
    inputRef.current?.click()
  }

  useEffect(() => {
    if (activeTab === "E-Commerce Link") return
    startCamera()
  }, [activeTab])

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 bg-background-secondary p-4">
      <ButtonGroup
        data={tabsData}
        activeText={activeTab}
        wholeClass="w-full"
        buttonClass="w-full flex items-center justify-center"
      />

      {activeTab === "E-Commerce Link" && (
        <div className="flex w-full flex-col gap-1">
          <label className="text-xs text-contrast">Paste the link below:</label>

          <input
            type="text"
            className="h-auto w-full rounded-none border-none bg-contrast p-2 text-sm font-semibold text-background-primary outline-none focus:ring-0 focus:outline-none"
            placeholder="Paste your link here"
          />
        </div>
      )}

      {activeTab === "Upload Picture" &&
        (capturedImage ? (
          <div className="relative aspect-[2/3] h-fit max-h-[70dvh]">
            <img src={capturedImage} className="h-full w-full object-cover" />

            <div className="absolute -bottom-12 flex h-24 w-full items-center justify-around">
              <div
                className="flex h-24 w-24 items-center justify-center bg-contrast"
                onClick={() => {}}
              >
                <X className="text-accent" onClick={() => onDiscardImage()} />
              </div>

              <div
                className="flex h-24 w-24 items-center justify-center bg-accent"
                onClick={() => {}}
              >
                <Check className="text-contrast" onClick={() => {}} />
              </div>
            </div>
          </div>
        ) : (
          <div className="relative aspect-[2/3] h-fit max-h-[70dvh]">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="h-full w-full object-cover"
            />

            <div className="absolute -bottom-12 z-5 flex h-24 w-full items-center justify-around">
              <div
                className="flex h-24 w-24 items-center justify-center bg-contrast"
                onClick={() => {}}
              >
                <Images
                  className="text-accent"
                  onClick={capturedImage ? () => {} : () => openPicker()}
                />
              </div>

              <div
                className="flex h-24 w-24 items-center justify-center bg-accent"
                onClick={() => captureImage()}
              ></div>
            </div>

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFile}
            />
          </div>
        ))}

      <div className="mt-2 flex w-full items-center justify-center gap-1">
        <span className="text-sm font-semibold text-accent">
          Generate Preview
        </span>

        <ArrowRight size={16} className="text-accent" />
      </div>
    </div>
  )
}
