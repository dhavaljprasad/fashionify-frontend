"use client"

import { ButtonPrimary } from "../modular/button"

export const LandingPageHeader = ({
  navItems,
}: {
  navItems: { label: string }[]
}) => {
  return (
    <div className="fixed z-10 flex h-16 w-full items-center justify-between border-b px-4 backdrop-blur-sm sm:px-16">
      <div className="flex items-center text-xl font-semibold">
        <h1 className="m-0">Fashionify</h1>
        <h1 className="m-0 text-accent">AI</h1>
      </div>
      <div className="hidden items-center justify-center gap-4 sm:flex">
        {navItems.map((item, index) => (
          <span
            key={index}
            className="cursor-pointer text-sm font-medium text-text transition-colors duration-200 hover:text-accent"
          >
            {item.label}
          </span>
        ))}
      </div>
      <div className="hidden items-center justify-center gap-4 sm:flex">
        <ButtonPrimary text="Start Free Trial" />
      </div>
    </div>
  )
}
