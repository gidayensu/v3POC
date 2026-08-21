import { useEffect, useState } from "react"

import { keys, readJSON } from "@/lib/storage"
import type { Branch, DraftUpdater, TranspayDraft } from "@/types"

const initialDraft: TranspayDraft = {
  purpose: "Supplier and beneficiary payments",
  volume: "GHS 100,000 – 500,000",
  approval: "Any 2 administrators",
  email: "payments@acmetrading.com",
  settlement: "Operating Account ••••4587",
  schedule: "Same-day settlement",
  branches: [],
}

export const emptyBranch = (): Branch => ({
  id: crypto.randomUUID(),
  name: "",
  code: "",
  city: "Accra",
  account: "Operating Account ••••4587",
})

/** Wizard state for TransPay setup, autosaved to localStorage. */
export function useTranspayDraft() {
  const [step, setStep] = useState(() =>
    Number(localStorage.getItem(keys.transpayStep) || 0)
  )
  const [draft, setDraft] = useState<TranspayDraft>(() =>
    readJSON<TranspayDraft>(keys.transpayDraft, initialDraft)
  )
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Autosave: `saving` is true whenever the live snapshot differs from the
  // one last written to localStorage.
  const snapshot = JSON.stringify({ draft, step })
  const [savedSnapshot, setSavedSnapshot] = useState("")
  const saving = snapshot !== savedSnapshot

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(keys.transpayDraft, JSON.stringify(draft))
      localStorage.setItem(keys.transpayStep, String(step))
      setSavedSnapshot(snapshot)
    }, 450)
    return () => clearTimeout(timer)
  }, [snapshot, draft, step])

  const update: DraftUpdater = (key, value) =>
    setDraft((d) => ({ ...d, [key]: value }))

  const next = () => {
    const nextErrors: Record<string, string> = {}
    if (step === 0 && !draft.email.includes("@"))
      nextErrors.email = "Enter a valid notification email."
    if (step === 2 && !draft.branches.length)
      nextErrors.branches = "Add at least one branch to continue."
    setErrors(nextErrors)
    if (!Object.keys(nextErrors).length) setStep((s) => Math.min(3, s + 1))
  }

  const saveBranch = (value: Branch) => {
    const exists = draft.branches.some((x) => x.id === value.id)
    update(
      "branches",
      exists
        ? draft.branches.map((x) => (x.id === value.id ? value : x))
        : [...draft.branches, value]
    )
    setErrors({})
  }

  const removeBranch = (id: string) =>
    update(
      "branches",
      draft.branches.filter((x) => x.id !== id)
    )

  return {
    step,
    setStep,
    draft,
    update,
    errors,
    saving,
    next,
    saveBranch,
    removeBranch,
  }
}
