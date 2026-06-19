"use client"
import {
  useState,
  useEffect,
  useRef,
  type Dispatch,
  type SetStateAction,
} from "react"
import { ConversationData } from "@/app/[conversation_id]/page"
import { useParams } from "next/navigation"
import { UserType, getCurrentUser } from "@/lib/user"
import { upload } from "@imagekit/next"
import { ButtonGroup } from "../modular/button"
import { DressUpConfig } from "../../utils/dress-up"
import { api } from "@/lib/api"
import { Plus, X, Images, ArrowRight } from "lucide-react"

const NEXT_PUBLIC_IMGKIT_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_IMGKIT_PUBLIC_KEY || ""

interface CapturedImagesType {
  for: string
  url: string
}

export const DressUpComponent = ({
  setConversationData,
  setPoolingId,
}: {
  setPoolingId: Dispatch<SetStateAction<string>>
  setConversationData: Dispatch<SetStateAction<ConversationData[]>>
}) => {
  const [activeTab, setActiveTab] =
    useState<keyof typeof DressUpConfig>("Women")
  const [selectedOutfit, setSelectedOutfit] = useState<string>("")
  const [user, setUser] = useState<UserType | null>(null)
  const [capturedImages, setCapturedImages] = useState<CapturedImagesType[]>([])
  const [cameraFor, setCameraFor] = useState<string>("")
  const [openCamera, setOpenCamera] = useState<boolean>(false)
  const [uploading, setUploading] = useState<boolean>(false)
  const [customInstruction, setCustomInstruction] = useState("")

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const params = useParams()

  const handleTabChange = (tab: keyof typeof DressUpConfig) => {
    setActiveTab(tab)
    setSelectedOutfit("")
    setCapturedImages([])
  }

  const tabsData = [
    {
      text: "Women",
      onClick: () => handleTabChange("Women"),
    },
    {
      text: "Men",
      onClick: () => handleTabChange("Men"),
    },
    {
      text: "Others",
      onClick: () => handleTabChange("Others"),
    },
  ]

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

  const onClickOfFabric = (itemName: string) => {
    setCameraFor(itemName)
    setOpenCamera(true)
  }

  const openPicker = () => {
    inputRef.current?.click()
  }

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
    setCapturedImages((prev) => [...prev, { for: cameraFor, url: image }])
    setOpenCamera(false)
    setCameraFor("")
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
          setCapturedImages((prev) => [
            ...prev,
            { for: cameraFor, url: finalUrl },
          ])
          setOpenCamera(false)
          setCameraFor("")
        },
        "image/webp",
        0.8
      )

      URL.revokeObjectURL(url)
    }
    img.src = url
  }

  const onDiscardImage = (forItem: string) => {
    setCapturedImages((prev) => prev.filter((img) => img.for !== forItem))
  }

  const onSelectOutfit = (itemName: string) => {
    setSelectedOutfit(itemName)
    setCapturedImages([])
  }

  const onGeneratePreview = async () => {
    if (uploading) return
    if (!capturedImages.length) return

    setUploading(true)
    try {
      const convRes = await api.get(
        `/api/conversation/init-multiple-uploads/${capturedImages.length}`
      )
      if (convRes.status !== 200) return

      const imgkit_auths = convRes.data.imgkit_auths || []
      if (imgkit_auths.length !== capturedImages.length) {
        return
      }

      const conversation_id = params.conversation_id as string
      const folder = `/${user?.id}/uploads/${conversation_id}`

      const uploadedImages: string[] = []
      const uploadedImagesUrl: string[] = []

      for (let index = 0; index < capturedImages.length; index += 1) {
        const item = capturedImages[index]
        const { token, expire, signature } = imgkit_auths[index]
        const blob = await fetch(item.url).then((res) => res.blob())
        const fileName = `${item.for.replace(/\s+/g, "_")}.webp`

        const uploadResponse = await upload({
          expire,
          token,
          signature,
          publicKey: NEXT_PUBLIC_IMGKIT_PUBLIC_KEY,
          file: blob,
          fileName,
          folder,
          useUniqueFileName: false,
        })
        console.log(uploadResponse.url, " link for ", item.for)
        uploadedImages.push(item.for)
        uploadedImagesUrl.push(uploadResponse.url || "")
      }

      try {
        const saveMsgRes = await api.post(
          "/api/conversation/save-dress-up-images",
          {
            conversation_id: conversation_id,
            file_names: uploadedImages,
            text: `Let's go with ${selectedOutfit}`,
          }
        )

        if (saveMsgRes.status === 200) {
          const dressUpRes = await api.post("/api/conversation/dress-up", {
            conversation_id: conversation_id,
            uploaded_images: uploadedImages,
            dress: selectedOutfit,
            custom_instruction: customInstruction,
          })

          setConversationData((prev) => [
            ...prev,
            {
              role: "user",
              text: `Let's go with ${selectedOutfit}`,
              images: uploadedImagesUrl,
            },
          ])
          setPoolingId(dressUpRes.data.pooling_id)
        }
      } catch (e) {
        throw e
      }

      console.log("Uploaded images", uploadedImages)
    } catch (e) {
      console.log("Unexpected error occured as: ", e)
    } finally {
      setUploading(false)
    }
  }

  useEffect(() => {
    if (!openCamera) return
    startCamera()
  }, [openCamera])

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await getCurrentUser()
      setUser(userInfo)
    }
    fetchUser()
  }, [])

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 bg-background-secondary p-4">
      <span className="w-full text-left text-sm text-text">Who is it for?</span>
      <ButtonGroup
        data={tabsData}
        activeText={activeTab}
        wholeClass="w-full"
        buttonClass="w-full flex items-center justify-center"
      />
      <span className="w-full text-left text-sm text-text">Outfit Type</span>
      <div className="flex w-full flex-wrap gap-2">
        {DressUpConfig[activeTab].map((item, key) => (
          <div
            key={key}
            className={`cursor-pointer p-2 ${
              selectedOutfit === item.name ? "bg-background-primary" : ""
            }`}
            onClick={() => onSelectOutfit(item.name)}
          >
            <h3 className="text-sm">{item.name}</h3>
          </div>
        ))}
      </div>
      {selectedOutfit && (
        <div className="flex h-auto w-full flex-col items-center justify-center gap-2">
          <span className="w-full text-left text-sm text-text">
            Fabric Images
          </span>
          <div className="flex h-auto w-full flex-col md:flex-row md:flex-wrap">
            {DressUpConfig[activeTab]
              .find((item) => item.name === selectedOutfit)
              ?.needs.map((item, key) => (
                <div
                  key={key}
                  className={`flex h-auto w-full cursor-pointer items-center justify-between gap-2 p-2 hover:bg-background-primary md:w-[50%] ${cameraFor === item.name && "border border-accent"}`}
                  onClick={() => onClickOfFabric(item.name)}
                >
                  <div className="flex items-center justify-start gap-2">
                    <div className="flex h-16 w-16 items-center justify-center overflow-hidden bg-background-primary">
                      {capturedImages.find((img) => img.for === item.name) ? (
                        <img
                          src={
                            capturedImages.find((img) => img.for === item.name)
                              ?.url
                          }
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Plus className="h-8 w-8 text-accent" />
                      )}
                    </div>
                    <h3 className="m-0 text-sm text-text">
                      {item.name} {item.optional && "(Optional)"}
                    </h3>
                  </div>
                  {capturedImages.find((img) => img.for === item.name) ? (
                    <X onClick={() => onDiscardImage(item.name)} />
                  ) : null}
                </div>
              ))}
          </div>
          <span className="w-full text-left text-sm text-text">
            Additional Prompt
          </span>
          <input
            className="w-full border-none bg-white/75 p-2 text-sm text-black outline-none focus:bg-white focus:ring-0 focus:outline-none"
            placeholder="Custom Instruction"
            value={customInstruction}
            onChange={(e) => setCustomInstruction(e.target.value)}
          />
        </div>
      )}
      {openCamera && (
        <div className="h-[80dvh] w-auto">
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
                onClick={() => openPicker()}
              >
                <Images className="text-accent" />
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
        </div>
      )}
      <div
        className="flex h-auto w-full cursor-pointer items-center justify-center gap-2 text-accent"
        onClick={() => onGeneratePreview()}
      >
        <span className="text-sm font-semibold">Generate Preview</span>
        <ArrowRight />
      </div>
    </div>
  )
}
