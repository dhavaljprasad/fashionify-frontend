"use client"

import { ConversationData } from "@/app/[conversation_id]/page"

type MessagesBoxProps = {
  data: ConversationData
}

export const MessagesBox = ({ data }: MessagesBoxProps) => {
  return (
    <div
      className={`flex h-auto w-full flex-col ${data.role === "user" ? "items-end" : "items-start"} justify-center`}
    >
      {/* images block  */}
      {data.images && data.images.length > 0 && (
        <div className="relative mt-4 flex w-full justify-end">
          <div className="relative h-[300px] w-[220px]">
            {data.images.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`Image ${index + 1}`}
                className="absolute top-0 h-full w-full rounded-2xl object-cover shadow-xl transition-all"
                style={{
                  right: `${index * 12}px`,
                  transform:
                    index === 0 ? "rotate(0deg)" : `rotate(-${index * 4}deg)`,
                  zIndex: data.images.length - index,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* text block  */}
      {data.text && (
        <span
          className={`text-sm ${data.role === "user" ? "bg-background-secondary p-2" : ""}`}
        >
          {data.text}
        </span>
      )}
    </div>
  )
}
