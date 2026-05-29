"use client"
import { useEffect, useState } from "react"
import { triggerPWAInstall } from "./install"

let deferredPrompt: any = null

if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault()
    deferredPrompt = e
  })
}

export function usePWA() {
  const [isInstalled, setIsInstalled] = useState(false)
  const [canInstall, setCanInstall] = useState(false)

  useEffect(() => {
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true
    setIsInstalled(isStandalone)

    if (deferredPrompt) setCanInstall(true)

    const handler = (e: Event) => {
      e.preventDefault()
      deferredPrompt = e
      setCanInstall(true)
    }

    window.addEventListener("beforeinstallprompt", handler)
    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  function install() {
    return triggerPWAInstall(deferredPrompt)
  }

  return { isInstalled, canInstall, install }
}
