"use client"

import { ButtonPrimary } from "./button"
import { X } from "lucide-react"

export const PopUpImageViewer = ({
  images,
  close,
}: {
  images: string[]
  close: () => void
}) => {
  return (
    <div className="\ absolute z-20 flex h-full w-full flex-col items-center justify-start backdrop-blur-sm">
      <div className="flex w-full items-center justify-between p-4 sm:px-16">
        <h1>Image Viewer</h1>
        <div className="flex w-auto items-center justify-end gap-2">
          <ButtonPrimary text="Download" onClick={() => {}} />
          <ButtonPrimary text="Close" onClick={() => close()} icon={X} />
        </div>
      </div>
      <div className="flex h-full w-full items-center justify-center gap-4 overflow-auto p-4">
        {images.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Image ${index + 1}`}
            className="h-auto max-h-[80vh] w-auto max-w-[80vw] rounded-2xl object-contain shadow-xl"
          />
        ))}
      </div>
    </div>
  )
}
