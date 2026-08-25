import { useEffect, useState } from "react"

import { keys, readJSON, writeJSON } from "@/lib/storage"

const CHANGED = "transflow-pins-changed"

const read = () => readJSON<string[]>(keys.pinnedApps, ["TransPay", "RPay"])

/**
 * Applications the operator has pinned. Home and the app switcher both read
 * this, so a write broadcasts on the window and every mounted list re-reads.
 */
export function usePinnedApps() {
  const [pinned, setPinned] = useState<string[]>(read)

  useEffect(() => {
    const sync = () => setPinned(read())
    window.addEventListener(CHANGED, sync)
    window.addEventListener("storage", sync)
    return () => {
      window.removeEventListener(CHANGED, sync)
      window.removeEventListener("storage", sync)
    }
  }, [])

  const toggle = (name: string) => {
    const next = pinned.includes(name)
      ? pinned.filter((p) => p !== name)
      : [...pinned, name]
    writeJSON(keys.pinnedApps, next)
    setPinned(next)
    window.dispatchEvent(new Event(CHANGED))
  }

  return { pinned, toggle, isPinned: (name: string) => pinned.includes(name) }
}
