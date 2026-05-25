"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { AppPageHeader } from "@/components/app-page/header"
import { SideBar } from "@/components/modular/side-bar"
import { MessagesBox } from "@/components/conversation-page/messages"
import { api } from "@/lib/api"
import { TryOnComponent } from "@/components/conversation-page/try-on"
import { SeeOnComponent } from "@/components/conversation-page/see-on"
import { DressUpComponent } from "@/components/conversation-page/dress-up"
import { Spinner } from "@/components/ui/spinner"
import { PopUpImageViewer } from "@/components/modular/pop-up"

export type ConversationData = {
  role: "ai" | "user"
  text: string | null
  images: string[]
}

function page() {
  // variables
  const [sidebar, setSidebar] = useState(false)
  const [conversationData, setConversationData] = useState<ConversationData[]>(
    []
  )
  const [selectedTryOn, setSelectedTryOn] = useState<"See On" | "Dress Up">(
    "See On"
  )
  const [poolingId, setPoolingId] = useState("")
  const [showImageViewer, setShowImageViewer] = useState(false)
  const [imageViewerUrls, setImageViewerUrls] = useState<string[]>([])

  const params = useParams()
  const conversation_id = params.conversation_id as string

  const loadConversationHistory = async (conversation_id: string) => {
    try {
      const historyRes = await api.get(`/api/conversation/${conversation_id}`)
      console.log(historyRes.data, "data")
      if (historyRes.status === 200) {
        setConversationData(historyRes.data.messages)
      }
    } catch (e) {
      console.log("Unexpected error occured getting conversation history as", e)
    }
  }

  const selectTryOnOption = async (selected: "See On" | "Dress Up") => {
    try {
      const tryOnRes = await api.post("/api/conversation/select-try-on", {
        conversation_id: conversation_id,
        selected: selected,
      })
      if (tryOnRes.status === 200 && tryOnRes.data.saved) {
        setConversationData((prev) => [
          ...prev,
          {
            role: "user",
            text: `I'll go with ${selected}`,
            images: [],
          },
          {
            role: "ai",
            text: `Great, let's try ${selected}`,
            images: [],
          },
        ])
        setSelectedTryOn(selected)
      }
    } catch (e) {
      console.log("Unexpected error occured selecting TryOn as:", e)
    }
  }

  const showImageViewerHandler = (images: string[]) => {
    setImageViewerUrls(images)
    setShowImageViewer(true)
  }

  useEffect(() => {
    if (!conversation_id) return
    loadConversationHistory(conversation_id)
  }, [conversation_id])

  useEffect(() => {
    if (!poolingId || poolingId === "") return
    const interval = setInterval(async () => {
      try {
        const res = await api.get(`/api/pooling/${poolingId}`)
        console.log(res.data, "pooling res")

        if (res.data.status === "completed") {
          setConversationData((prev) => [
            ...prev,
            {
              role: "ai",
              text: res.data.data.text,
              images: [res.data.data.see_on_image_url],
            },
          ])
          clearInterval(interval)
          setPoolingId("")
        }
      } catch (e) {
        console.log("Unexpected error occured while polling as:", e)
      }
    }, 15000)
    return () => clearInterval(interval)
  }, [poolingId])

  useEffect(() => {
    const autoScroll = () => {
      const element = document.getElementById("auto-scroll")
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }

    autoScroll()
  }, [conversationData])

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-start gap-4 bg-background-primary px-4 sm:px-16">
      {showImageViewer && (
        <PopUpImageViewer
          images={imageViewerUrls}
          close={() => setShowImageViewer(false)}
        />
      )}
      <AppPageHeader
        showSidebar={sidebar}
        setShowSidebar={() => setSidebar(!sidebar)}
      />
      {sidebar && <SideBar />}
      <div className="scrollbar-none flex h-full w-full flex-col items-center justify-start gap-2 overflow-y-auto pt-20">
        {conversationData.length > 0 &&
          conversationData.map((item, index) => {
            return (
              <MessagesBox
                data={item}
                key={index}
                showImageViewer={showImageViewerHandler}
              />
            )
          })}
        {conversationData.length === 2 && (
          <TryOnComponent selectTryOn={selectTryOnOption} />
        )}
        {conversationData.length === 4 && selectedTryOn === "See On" && (
          <SeeOnComponent
            setConversationData={setConversationData}
            setPoolingId={setPoolingId}
          />
        )}
        {conversationData.length === 4 && selectedTryOn === "Dress Up" && (
          <DressUpComponent />
        )}
        {poolingId && poolingId !== "" && (
          <div className="flex w-full items-center justify-start p-4">
            <span className="text-sm text-text">
              Generating your results...
            </span>
            <Spinner className="ml-2 text-text" />
          </div>
        )}
        <div className="h-20" id="auto-scroll" />
      </div>
    </div>
  )
}

export default page
