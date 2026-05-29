export type DeviceOS = "ios" | "android" | "windows" | "macos" | "unknown"
export type DeviceType = "mobile" | "tablet" | "desktop"

export function getDeviceInfo(): { os: DeviceOS; type: DeviceType } {
  const ua = navigator.userAgent.toLowerCase()

  // Detect OS
  let os: DeviceOS = "unknown"
  if (/iphone|ipad|ipod/.test(ua)) os = "ios"
  else if (/android/.test(ua)) os = "android"
  else if (/windows/.test(ua)) os = "windows"
  else if (/mac/.test(ua)) os = "macos"

  // Detect Device Type
  let type: DeviceType = "desktop"
  if (/iphone|android.*mobile/.test(ua)) type = "mobile"
  else if (/ipad|android(?!.*mobile)/.test(ua)) type = "tablet"

  return { os, type }
}
