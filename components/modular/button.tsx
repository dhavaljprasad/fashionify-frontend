"use client"
import React from "react"
import { LucideIcon } from "lucide-react"

export const ButtonPrimary = ({
  text,
  icon,
  buttonClass,
  buttonTextClass,
  onClick,
}: {
  text: string
  icon?: LucideIcon
  buttonClass?: string
  buttonTextClass?: string
  onClick: () => void
}) => {
  return (
    <div
      className={`group flex h-auto w-fit cursor-pointer items-center justify-center gap-1 bg-contrast px-4 py-2 transition-colors duration-200 hover:bg-accent ${buttonClass || ""}`}
      onClick={onClick}
    >
      <span
        className={`text-xs font-semibold text-background-primary ${buttonTextClass || ""}`}
      >
        {text}
      </span>
      {icon && (
        <span className="text-xs font-semibold text-background-primary transition-transform duration-200 group-hover:translate-x-1">
          {React.createElement(icon, { size: 16 })}
        </span>
      )}
    </div>
  )
}

export const ButtonSecondary = ({
  text,
  icon,
  buttonClass,
  buttonTextClass,
}: {
  text: string
  icon?: LucideIcon
  buttonClass?: string
  buttonTextClass?: string
}) => {
  return (
    <div
      className={`group flex h-auto w-fit cursor-pointer items-center justify-center gap-1 border bg-background-primary px-4 py-2 transition-colors duration-200 hover:bg-contrast ${buttonClass || ""}`}
    >
      {icon && (
        <span className="text-xs font-semibold text-text transition-all group-hover:text-black">
          {React.createElement(icon, { size: 16 })}
        </span>
      )}
      <span
        className={`text-xs font-semibold text-text transition-all duration-200 group-hover:translate-x-1 group-hover:text-black ${buttonTextClass || ""}`}
      >
        {text}
      </span>
    </div>
  )
}

type ButtonGroupProps = {
  text: string
  onClick?: () => void
}

export const ButtonGroup = ({
  data,
  activeText,
  wholeClass = "",
  buttonClass = "",
}: {
  data: ButtonGroupProps[]
  activeText: string
  wholeClass?: string
  buttonClass?: string
}) => {
  return (
    <div
      className={`flex w-auto items-center justify-center border border-contrast ${wholeClass}`}
    >
      {data.map((item, index) => {
        return (
          <div
            key={index}
            className={`px-4 py-2 ${activeText === item.text ? "bg-accent text-black" : "cursor-pointer hover:bg-contrast hover:text-black"} transition-colors duration-200 ${buttonClass}`}
            onClick={item.onClick}
          >
            <span className="text-sm font-semibold">{item.text}</span>
          </div>
        )
      })}
    </div>
  )
}
