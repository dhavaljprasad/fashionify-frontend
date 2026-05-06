"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { AppPageHeader } from "@/components/app-page/header"
import { SideBar } from "@/components/modular/side-bar"
import { MessagesBox } from "@/components/conversation-page/messages"
import { api } from "@/lib/api"
import { TryOnComponent } from "@/components/conversation-page/try-on"
import { SeeOnComponent } from "@/components/conversation-page/see-on"

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

  useEffect(() => {
    if (!conversation_id) return
    loadConversationHistory(conversation_id)
  }, [conversation_id])

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-start gap-4 bg-background-primary px-4 sm:px-16">
      <AppPageHeader
        showSidebar={sidebar}
        setShowSidebar={() => setSidebar(!sidebar)}
      />
      {sidebar && <SideBar />}
      <div className="flex h-dvh w-full flex-col items-center justify-start gap-2 pt-20">
        {conversationData.length > 0 &&
          conversationData.map((item, index) => {
            return <MessagesBox data={item} key={index} />
          })}
        {conversationData.length === 2 && (
          <TryOnComponent selectTryOn={selectTryOnOption} />
        )}
        {conversationData.length === 4 && selectedTryOn === "See On" && (
          <SeeOnComponent />
        )}
      </div>
    </div>
  )
}

export default page
