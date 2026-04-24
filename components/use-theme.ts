"use client"
import { useTheme } from "next-themes"

export function useToggleTheme() {
  const { resolvedTheme, setTheme } = useTheme()
  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }
  return toggleTheme
}

export function useActiveTheme() {
  const { resolvedTheme } = useTheme()
  return resolvedTheme
}
