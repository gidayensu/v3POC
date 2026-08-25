import { useEffect, useState } from "react"

const APPROVAL_DELAY = 7000

export type Destination =
  | { kind: "bank"; bankId: string; accountName: string; last4: string }
  | { kind: "prepaid"; accountName: string; last4: string }

/** The prepaid wallet money is recycled into when settlement is not a bank. */
export const prepaidAccount = {
  accountName: "TransPay prepaid account",
  last4: "8820",
}

/**
 * A merchant settles to exactly one destination. A request to move settlement
 * elsewhere waits for Transflow approval, and only replaces the live
 * destination once that approval lands.
 */
export function useSettlementDestination() {
  const [destination, setDestination] = useState<Destination>({
    kind: "bank",
    bankId: "ecobank",
    accountName: "Operating Account",
    last4: "4587",
  })
  const [pending, setPending] = useState<Destination | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [approved, setApproved] = useState(false)

  useEffect(() => {
    if (!pending) return
    const timer = setTimeout(() => {
      setDestination(pending)
      setPending(null)
      setApproved(true)
    }, APPROVAL_DELAY)
    return () => clearTimeout(timer)
  }, [pending])

  const request = (next: Destination, onDone: () => void) => {
    setSubmitting(true)
    setTimeout(() => {
      setApproved(false)
      setPending(next)
      setSubmitting(false)
      onDone()
    }, 900)
  }

  return { destination, pending, submitting, approved, request }
}
