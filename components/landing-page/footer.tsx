"use client"

export const FooterSection = () => {
  return (
    <div className="flex h-fit w-full flex-col items-center justify-center gap-4 bg-background-primary px-4 py-8 sm:px-16">
      <div className="flex items-center text-xl font-semibold">
        <h1 className="m-0">Fashionify</h1>
        <h1 className="m-0 text-accent">AI</h1>
      </div>
      <span className="text-sm text-text">
        An AI fashion visualization studio in your pocket; built for the tailors
        and cloth shops and fashion fanatics of Bharat.
      </span>
      <span className="text-sm text-text">
        © 2026 FashionifyAI. All rights reserved.
      </span>
    </div>
  )
}
