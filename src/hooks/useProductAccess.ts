import { useState } from "react"

import { keys } from "@/lib/storage"

/**
 * The seat held on a business we don't manage: which business it is, the
 * role assumed on its application instance, and the business to fall back
 * to when that context is left. Leaving the application leaves all of it,
 * because the seat is the only reason we were in the business at all.
 */
export function useProductAccess() {
  const [role, setRole] = useState(
    () => localStorage.getItem(keys.assumedRole) || ""
  )
  const [returnTo, setReturnTo] = useState(
    () => localStorage.getItem(keys.returnBusiness) || ""
  )

  const assume = (assumedRole: string, from: string) => {
    setRole(assumedRole)
    setReturnTo(from)
    localStorage.setItem(keys.assumedRole, assumedRole)
    localStorage.setItem(keys.returnBusiness, from)
  }

  const release = () => {
    setRole("")
    setReturnTo("")
    localStorage.removeItem(keys.assumedRole)
    localStorage.removeItem(keys.returnBusiness)
  }

  return { role, returnTo, assume, release }
}
