import { useEffect, useState } from "react"

const TOAST_DURATION = 5000

export function useToast() {
  const [toast, setToast] = useState("")
  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(""), TOAST_DURATION)
    return () => clearTimeout(timer)
  }, [toast])
  return { toast, setToast, dismiss: () => setToast("") }
}
