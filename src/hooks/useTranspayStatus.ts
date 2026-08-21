import { useEffect, useState } from "react"

import { keys } from "@/lib/storage"
import type { TranspayStatus } from "@/types"

const ACTIVATION_DELAY = 9000
const DEMO_RESET_DELAY = 30000

/**
 * Simulates TransPay activation: a submitted setup processes for a few
 * seconds, goes active, then resets so the demo journey can run again.
 */
export function useTranspayStatus(notify: (message: string) => void) {
  const [status, setStatus] = useState<TranspayStatus>(
    () =>
      (localStorage.getItem(keys.transpayStatus) as TranspayStatus) || "draft"
  )

  useEffect(() => {
    if (status !== "processing") return
    const activateAt = Number(
      localStorage.getItem(keys.transpayActivateAt) ||
        Date.now() + ACTIVATION_DELAY
    )
    localStorage.setItem(keys.transpayActivateAt, String(activateAt))
    const activate = () => {
      setStatus("active")
      localStorage.setItem(keys.transpayStatus, "active")
      notify("TransPay is ready — your setup has been completed successfully.")
    }
    if (Date.now() >= activateAt) {
      activate()
      return
    }
    const timer = setTimeout(activate, activateAt - Date.now())
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  useEffect(() => {
    if (status !== "active") return
    const resetAt = Number(
      localStorage.getItem(keys.transpayDemoResetAt) ||
        Date.now() + DEMO_RESET_DELAY
    )
    localStorage.setItem(keys.transpayDemoResetAt, String(resetAt))
    const reset = () => {
      ;[
        keys.transpayStatus,
        keys.transpayDraft,
        keys.transpayStep,
        keys.transpayActivateAt,
        keys.transpayDemoResetAt,
      ].forEach((key) => localStorage.removeItem(key))
      setStatus("draft")
      notify(
        "TransPay demo data has reset. The setup journey is ready to run again."
      )
    }
    if (Date.now() >= resetAt) {
      reset()
      return
    }
    const timer = setTimeout(reset, resetAt - Date.now())
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  const submit = () => {
    setStatus("processing")
    localStorage.setItem(keys.transpayStatus, "processing")
    localStorage.setItem(
      keys.transpayActivateAt,
      String(Date.now() + ACTIVATION_DELAY)
    )
    localStorage.removeItem(keys.transpayDemoResetAt)
    localStorage.removeItem(keys.transpayStep)
  }

  return { status, submit }
}
