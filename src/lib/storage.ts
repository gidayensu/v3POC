/** localStorage keys used across the prototype. */
export const keys = {
  merchant: "transflow-merchant",
  activeApp: "transflow-active-app",
  onboarding: "transflow-onboarding",
  selectedBusiness: "selected-business",
  transpayStatus: "transpay-status",
  transpayDraft: "transpay-draft",
  transpayStep: "transpay-step",
  transpayActivateAt: "transpay-activate-at",
  transpayDemoResetAt: "transpay-demo-reset-at",
  merchantChangeStatus: "merchant-change-status",
  merchantChangeAt: "merchant-change-at",
  merchantRequestEmail: "merchant-request-email",
  merchantActiveEmail: "merchant-active-email",
  merchantChangeNotification: "merchant-change-notification",
  pinnedApps: "transflow-pinned-apps",
  hiddenRecents: "transflow-hidden-recents",
} as const

/** Reads and parses JSON from localStorage, falling back on any failure. */
export function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return (JSON.parse(raw) as T) ?? fallback
  } catch {
    return fallback
  }
}

export function writeJSON(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value))
}
