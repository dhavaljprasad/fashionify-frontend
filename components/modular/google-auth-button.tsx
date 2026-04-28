"use client"

import { useCallback } from "react"
import { useRouter } from "next/navigation"
import Script from "next/script"
import axios from "axios"
import { setToken } from "@/lib/auth"

declare global {
  interface Window {
    google?: any
  }
}

export function GoogleSignInButton() {
  const router = useRouter()

  const handleCredentialResponse = useCallback((response: any) => {
    console.log("Google credential response:", response)
    const idToken = response.credential as string
    sendCredentials(idToken)
  }, [])

  const sendCredentials = async (creds: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/sign-in`,
        {
          credential: creds,
        }
      )

      // success check (depends on your backend)
      if (response.status === 200) {
        setToken(response.data.data.access_token)
        console.log("success", response.data)
        router.push("/app")
      }
    } catch (e: any) {
      console.error("Error:", e?.response?.data || e.message)
    }
  }

  const handleScriptLoad = useCallback(() => {
    console.log("Google script loaded", window.google)

    if (!window.google) {
      console.error("window.google is not available")
      return
    }

    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
    if (!clientId) {
      console.error("NEXT_PUBLIC_GOOGLE_CLIENT_ID is missing")
      return
    }

    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: handleCredentialResponse,
    })

    const btn = document.getElementById("google-signin-btn")
    if (!btn) {
      console.error("#google-signin-btn not found in DOM")
      return
    }

    window.google.accounts.id.renderButton(btn, {
      type: "standard",
      theme: "outline",
      size: "large",
      text: "continue_with",
      shape: "pill",
    })

    // Optional: show One Tap too
    // window.google.accounts.id.prompt()
  }, [handleCredentialResponse])

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        async
        defer
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
      />
      <div id="google-signin-btn" />
    </>
  )
}
