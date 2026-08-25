import { useState } from "react"

import { keys } from "@/lib/storage"

const SWITCH_DELAY = 900

/**
 * The application the workspace is currently working inside. Switching in
 * shows a short loading state, as if the application's own navigation,
 * permissions and data were being fetched.
 */
export function useApplication(notify: (message: string) => void) {
  const [app, setApp] = useState<string | null>(
    () => localStorage.getItem(keys.activeApp) || null
  )
  const [switching, setSwitching] = useState<string | null>(null)

  /** `message` overrides the announcement, for entries with more to say. */
  const enterApp = (name: string, done: () => void, message?: string) => {
    if (name === app) {
      done()
      return
    }
    setSwitching(name)
    setTimeout(() => {
      setApp(name)
      localStorage.setItem(keys.activeApp, name)
      setSwitching(null)
      done()
      notify(
        message ||
          `You're now working in ${name}. Navigation and data are scoped to this application.`
      )
    }, SWITCH_DELAY)
  }

  const exitApp = () => {
    setApp(null)
    localStorage.removeItem(keys.activeApp)
  }

  return { app, switching, enterApp, exitApp }
}
