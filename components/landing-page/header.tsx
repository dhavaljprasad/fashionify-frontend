"use client"

import { ButtonPrimary } from "../modular/button"

export const LandingPageHeader = ({
  navItems,
}: {
  navItems: { label: string }[]
}) => {
  return (
    <div className="flex h-16 w-full items-center justify-between border-b px-16">
      <div className="flex items-center text-xl font-semibold">
        <h1 className="m-0">Fashionify</h1>
        <h1 className="m-0 text-accent">AI</h1>
      </div>
      <div className="flex items-center justify-center gap-4">
        {navItems.map((item, index) => (
          <span
            key={index}
            className="cursor-pointer text-sm font-medium text-text transition-colors duration-200 hover:text-accent"
          >
            {item.label}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-center gap-4">
        <ButtonPrimary text="Start Free Trial" />
      </div>
    </div>
  )
}
