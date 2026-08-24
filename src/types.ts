import type { IconSvgElement } from "@hugeicons/react"
import type { LucideIcon } from "lucide-react"

export type View =
  | "home"
  | "applications"
  | "businesses"
  | "users"
  | "approvals"
  | "audit"
  | "support"
  | "settings"
  | "setup"
  | "accounts"
  | "transpay-setup"
  | "settlement"
  | "balances"
  | "product"

export type Status = "active" | "available" | "setup" | "pending"

export type Product = {
  name: string
  desc: string
  group: string
  color: string
  icon: LucideIcon
  status: Status
}

export type NavItem = {
  icon: IconSvgElement
  label: string
  view: View
  badge?: number
}

export type NavSection = {
  title: string
  items: NavItem[]
}

export type TranspayStatus = "draft" | "processing" | "active"

export type Branch = {
  id: string
  name: string
  code: string
  city: string
  account: string
}

export type TranspayDraft = {
  purpose: string
  volume: string
  approval: string
  email: string
  settlement: string
  schedule: string
  branches: Branch[]
}

export type SwitchableBusiness = {
  name: string
  initials: string
  /** Imported logo asset, shown wherever the business is identified. */
  logo: string
  status: string
}

export type BusinessRecord = {
  initials: string
  name: string
  status: string
  kind: string
}

/** Updates a single field of the TransPay setup draft. */
export type DraftUpdater = <K extends keyof TranspayDraft>(
  key: K,
  value: TranspayDraft[K]
) => void

/** A single row in an application's own sidebar. */
export type AppNavItem = {
  icon: IconSvgElement
  label: string
  view?: View
  children?: string[]
}

export type AppNavSection = {
  title: string
  items: AppNavItem[]
}
