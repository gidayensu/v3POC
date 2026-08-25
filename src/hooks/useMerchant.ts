import { useEffect, useState } from "react"

import { keys, writeJSON } from "@/lib/storage"

const RELOAD_DELAY = 950

/**
 * The active business. Switching shows a short data-reload state, as if
 * applications, permissions and balances were being refetched.
 */
export function useMerchant(notify: (message: string) => void) {
  const [merchant, setMerchantState] = useState(
    () => localStorage.getItem(keys.merchant) || "Acme Trading Ltd"
  )
  const [reloading, setReloading] = useState(false)

  /**
   * `silent` and `done` let a caller chain something onto the switch — the
   * product-access flow opens an application straight after, and announces
   * both halves in one message rather than two competing toasts.
   */
  const setMerchant = (
    value: string,
    options?: { silent?: boolean; done?: () => void }
  ) => {
    if (value === merchant) {
      options?.done?.()
      return
    }
    setReloading(true)
    setTimeout(() => {
      setMerchantState(value)
      localStorage.setItem(keys.merchant, value)
      setReloading(false)
      if (!options?.silent)
        notify(
          `Business switched to ${value}. Applications, permissions and balances have been refreshed.`
        )
      options?.done?.()
    }, RELOAD_DELAY)
  }

  return { merchant, setMerchant, reloading }
}

/**
 * Watches for a pending merchant-change request submitted anywhere in the
 * app and raises a toast once its simulated approval window elapses.
 */
export function useMerchantChangeWatcher(notify: (message: string) => void) {
  useEffect(() => {
    const check = () => {
      if (localStorage.getItem(keys.merchantChangeStatus) !== "pending") return
      const at = Number(localStorage.getItem(keys.merchantChangeAt) || 0)
      if (!at || Date.now() < at) return
      const value =
        localStorage.getItem(keys.merchantRequestEmail) ||
        "finance@acmetrading.com"
      localStorage.setItem(keys.merchantActiveEmail, value)
      localStorage.setItem(keys.merchantChangeStatus, "approved")
      writeJSON(keys.merchantChangeNotification, {
        title: "Merchant change approved",
        body: "Your requested change to business email has been approved and is now active.",
        at: new Date().toISOString(),
      })
      notify(
        "Your requested change to business email has been approved and is now active."
      )
    }
    check()
    const timer = setInterval(check, 1000)
    return () => clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
