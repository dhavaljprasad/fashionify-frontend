"use client"

import { useEffect, useRef, useState } from "react"
import { AppPageHeader } from "@/components/app-page/header"
import { SideBar } from "@/components/modular/side-bar"
import { Separator } from "@/components/ui/separator"
import { api } from "@/lib/api"

import { Images, Check, X } from "lucide-react"

function page() {
  // variables
  const [sidebar, setSidebar] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string>("")

  // refs
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // functions
  const captureImage = () => {
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

    const image = canvas.toDataURL("image/png", 0.9)
    setCapturedImage(image)
  }

  const onDiscardImage = () => {
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
    const selected = e.target.files?.[0]
    if (!selected) return

    const url = URL.createObjectURL(selected)
    setCapturedImage(url)
  }

  const openPicker = () => {
    inputRef.current?.click()
  }

  const onConfirmImage = async () => {
    try {
      const imgAuthRes = await api.get("/api/imgkit/auth")
      console.log(imgAuthRes.data)
      const { signature, expire, token } = imgAuthRes.data.auth_params
    } catch (e) {
      console.log(
        "Unexpected error occured uploading the image and geting conversation_id as",
        e
      )
    }
  }

  useEffect(() => {
    startCamera()
  }, [])

  return (
    <div className="flex h-screen w-full flex-col items-center justify-start gap-4 bg-background-primary px-4 sm:px-16">
      <AppPageHeader
        showSidebar={sidebar}
        setShowSidebar={() => setSidebar(!sidebar)}
      />
      {sidebar && <SideBar />}
      <div className="flex h-full w-full flex-col items-center justify-between pt-20">
        {capturedImage ? (
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
                <Check
                  className="text-contrast"
                  onClick={() => onConfirmImage()}
                />
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
            <div
              className="absolute -bottom-12 left-1/2 h-24 w-24 -translate-x-1/2 bg-accent"
              onClick={() => captureImage()}
            />
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
        />

        <div className="flex h-auto w-full items-center justify-start gap-2 py-4">
          <Images
            className="text-text"
            size={42}
            onClick={capturedImage ? () => {} : () => openPicker()}
          />
          <Separator orientation="vertical" className="bg-text" />
        </div>
      </div>
    </div>
  )
}

export default page
