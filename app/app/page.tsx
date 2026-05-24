"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { upload } from "@imagekit/next"
import { AppPageHeader } from "@/components/app-page/header"
import { SideBar } from "@/components/modular/side-bar"
import { Separator } from "@/components/ui/separator"
import { api } from "@/lib/api"
import { getCurrentUser, UserType } from "@/lib/user"
import { Marquee } from "@/components/ui/marquee"

import { Images, Check, X } from "lucide-react"

const NEXT_PUBLIC_IMGKIT_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_IMGKIT_PUBLIC_KEY || ""

function page() {
  // variables
  const [sidebar, setSidebar] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string>("")
  const [user, setUser] = useState<UserType | null>(null)
  const [uploading, setUploading] = useState(false)
  const [userImages, setUserImages] = useState<string[]>([])

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
        const file_name = "user_image.webp"

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
          useUniqueFileName: false,
        })

        // saving the uploaded image to the conversation
        try {
          const saveMsgRes = await api.post(
            "/api/conversation/save-user-image",
            {
              new: true,
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

  const getUserUploadedImages = async () => {
    try {
      const res = await api.get("/api/app/user-models")
      if (res.status === 200) {
        setUserImages(res.data.data)
      }
    } catch (e) {
      console.log("Error fetching user uploaded images", e)
    }
  }

  useEffect(() => {
    startCamera()
    const fetchUser = async () => {
      const userInfo = await getCurrentUser()
      setUser(userInfo)
    }
    fetchUser()
    getUserUploadedImages()
  }, [])

  return (
    <div className="flex h-screen w-full flex-col items-center justify-start gap-4 bg-background-primary px-4 sm:px-16">
      <AppPageHeader
        showSidebar={sidebar}
        setShowSidebar={() => setSidebar(!sidebar)}
      />
      {sidebar && <SideBar />}
      <div className="flex h-full w-full flex-col items-center justify-between pt-20 sm:flex-row sm:justify-center sm:gap-4 sm:pt-16 lg:flex-col">
        {capturedImage ? (
          <div className="relative aspect-[2/3] h-fit max-h-[70dvh] sm:max-h-[75dvh]">
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
          <div className="relative aspect-[2/3] h-fit max-h-[70dvh] sm:max-h-[75dvh] lg:hidden">
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

        <div
          className={`flex h-auto w-full items-center justify-start gap-2 py-4 sm:w-2/5 sm:flex-col lg:h-full lg:w-full lg:flex-col lg:justify-center ${capturedImage.length > 0 ? "hidden" : ""}`}
        >
          <h1 className="mb-8 hidden text-4xl font-bold text-text lg:block">
            Let's get started!
          </h1>
          <div
            className="flex cursor-pointer flex-row items-center justify-center gap-2"
            onClick={capturedImage ? () => {} : () => openPicker()}
          >
            <Images className="text-text" size={42} />
            <span className="hidden font-semibold text-text sm:block">
              Upload from Device
            </span>
          </div>
          <Separator
            orientation="vertical"
            className="bg-text sm:hidden lg:block"
          />
          <Separator
            orientation="horizontal"
            className="hidden w-full bg-text sm:block lg:block"
          />
          <span className="hidden text-sm text-text sm:block">
            Select from Prev. Uploaded
          </span>
          {userImages.length > 0 ? (
            <div className="scrollbar-thin flex gap-2 overflow-auto scrollbar-thumb-text scrollbar-track-transparent sm:grid sm:h-[50dvh] sm:grid-cols-2 lg:hidden">
              {userImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  className="w-20 cursor-pointer object-cover"
                  onClick={() => setCapturedImage(img)}
                />
              ))}
            </div>
          ) : null}

          {userImages.length > 0 ? (
            <div className="flex hidden h-auto w-full flex-col items-center justify-center lg:block">
              <Marquee pauseOnHover={true} className="[--duration:60s]">
                <div className="flex gap-4">
                  {userImages.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      className="h-96 w-auto cursor-pointer object-cover transition-transform duration-300 hover:scale-105"
                      onClick={() => setCapturedImage(img)}
                    />
                  ))}
                </div>
              </Marquee>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default page
