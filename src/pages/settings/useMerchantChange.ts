import { useEffect, useState } from "react"

import { keys, writeJSON } from "@/lib/storage"

const APPROVAL_DELAY = 7000

/**
 * Drives the simulated merchant-change approval: a submitted request stays
 * pending for a few seconds, then auto-approves and updates the active value.
 */
export function useMerchantChange() {
  const [status, setStatus] = useState(
    () => localStorage.getItem(keys.merchantChangeStatus) || ""
  )
  const [activeEmail, setActiveEmail] = useState(
    () =>
      localStorage.getItem(keys.merchantActiveEmail) ||
      "finance@acmetrading.com"
  )
  const [requestedEmail, setRequestedEmail] = useState("")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (status !== "pending") return
    const at = Number(
      localStorage.getItem(keys.merchantChangeAt) || Date.now() + APPROVAL_DELAY
    )
    const approve = () => {
      const value =
        localStorage.getItem(keys.merchantRequestEmail) || activeEmail
      localStorage.setItem(keys.merchantActiveEmail, value)
      localStorage.setItem(keys.merchantChangeStatus, "approved")
      writeJSON(keys.merchantChangeNotification, {
        title: "Merchant change approved",
        body: "Your requested change to business email has been approved and is now active.",
        at: new Date().toISOString(),
      })
      setActiveEmail(value)
      setStatus("approved")
    }
    if (Date.now() >= at) {
      approve()
      return
    }
    const timer = setTimeout(approve, at - Date.now())
    return () => clearTimeout(timer)
  }, [status, activeEmail])

  const submit = (onDone: () => void) => {
    if (!requestedEmail.includes("@")) return
    setSubmitting(true)
    setTimeout(() => {
      localStorage.setItem(keys.merchantRequestEmail, requestedEmail)
      localStorage.setItem(keys.merchantChangeStatus, "pending")
      localStorage.setItem(
        keys.merchantChangeAt,
        String(Date.now() + APPROVAL_DELAY)
      )
      setStatus("pending")
      setSubmitting(false)
      onDone()
    }, 900)
  }

  return {
    status,
    activeEmail,
    requestedEmail,
    setRequestedEmail,
    submitting,
    submit,
  }
}
