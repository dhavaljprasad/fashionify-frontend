"use client"
import { GoogleSignInButton } from "@/components/modular/google-auth-button"

function page() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-background-primary px-4 sm:px-16">
      <h1 className="font-semibold text-contrast">Sign-In</h1>
      <GoogleSignInButton />
    </div>
  )
}

export default page
