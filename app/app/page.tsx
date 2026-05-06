"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { upload } from "@imagekit/next"
import { AppPageHeader } from "@/components/app-page/header"
import { SideBar } from "@/components/modular/side-bar"
import { Separator } from "@/components/ui/separator"
import { api } from "@/lib/api"
import { getCurrentUser, UserType } from "@/lib/user"

import { Images, Check, X } from "lucide-react"

const NEXT_PUBLIC_IMGKIT_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_IMGKIT_PUBLIC_KEY || ""

function page() {
  // variables
  const [sidebar, setSidebar] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string>("")
  const [user, setUser] = useState<UserType | null>(null)
  const [uploading, setUploading] = useState(false)

  // refs
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const router = useRouter()

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

    const image = canvas.toDataURL("image/webp", 0.8)
    setCapturedImage(image)
  }

  const onDiscardImage = () => {
    if (uploading) return
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

  const onConfirmImage = async () => {
    try {
      if (uploading) return
      setUploading(true)
      const convRes = await api.get("/api/conversation/init")

      if (convRes.status === 200) {
        const conversation_id = convRes.data.conversation_id
        const { token, expire, signature } = convRes.data.imgkit_auth

        const file_name = "user_image"

        // uploading image
        const res = await fetch(capturedImage)
        const blob = await res.blob()
        const uploadResponse = await upload({
          // Authentication parameters
          expire: expire,
          token: token,
          signature: signature,
          publicKey: NEXT_PUBLIC_IMGKIT_PUBLIC_KEY,
          file: blob,
          fileName: file_name,
          folder: `/${user?.id}/uploads/${conversation_id}`,
        })
        console.log(uploadResponse)
        try {
          const saveMsgRes = await api.post(
            "/api/conversation/save-user-image",
            {
              conversation_id: conversation_id,
              file_name: uploadResponse.name,
            }
          )
          if (saveMsgRes.data.saved) {
            router.push(`/${conversation_id}`)
          }
        } catch (e) {
          throw e
        }
      }
      setUploading(false)
    } catch (e) {
      console.log(
        "Unexpected error occured uploading the image and geting conversation_id as",
        e
      )
      setUploading(false)
    }
  }

  useEffect(() => {
    startCamera()
    const fetchUser = async () => {
      const userInfo = await getCurrentUser()
      setUser(userInfo)
    }
    fetchUser()
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
            <div
              className={`absolute -bottom-12 flex h-24 w-full items-center justify-around ${uploading ? "opacity-50" : ""}`}
            >
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
