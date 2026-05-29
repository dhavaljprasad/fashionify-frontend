import { getDeviceInfo } from "./device"

export function triggerPWAInstall(deferredPrompt: any): {
  method: "prompt" | "ios-manual" | "unsupported"
  instructions?: string
} {
  const { os } = getDeviceInfo()

  // Android + Desktop Chrome/Edge — native prompt
  if (deferredPrompt) {
    deferredPrompt.prompt()
    return { method: "prompt" }
  }

  // iOS — no native prompt, show manual instructions
  if (os === "ios") {
    return {
      method: "ios-manual",
      instructions:
        'Tap the Share button (box with arrow) at the bottom of Safari, then tap "Add to Home Screen"',
    }
  }

  // Fallback
  return { method: "unsupported" }
}
