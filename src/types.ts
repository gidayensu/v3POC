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
  /** Longer explanation shown by the catalogue's "About the product" panel. */
  about: string
  /** Three short selling points listed alongside `about`. */
  highlights: string[]
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

/**
 * How much of a business the signed-in user holds. `managed` businesses are
 * theirs to administer; `product` businesses expose their applications only —
 * the business itself cannot be opened or edited.
 */
export type BusinessAccess = "managed" | "product"

export type SwitchableBusiness = {
  name: string
  initials: string
  /** Imported logo asset, shown wherever the business is identified. */
  logo: string
  status: string
  access: BusinessAccess
  /** `product` businesses only: the application the switch lands in. */
  productApp?: string
  /** `product` businesses only: the roles that instance can be assumed under. */
  roles?: string[]
}

export type UserStatus = "active" | "pending" | "blocked"

export type UserRecord = {
  name: string
  email: string
  role: string
  status: UserStatus
  /** The business this user belongs to. */
  merchant: string
  branch?: string
  created: string
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

/** A log line is plain text with the entities it touched picked out in bold. */
export type Segment = string | { b: string }

export type LogEntry = {
  /** Email of the user who performed the action, so lines can be attributed. */
  actor?: string
  icon?: LucideIcon
  tone?: "blue" | "green"
  text: Segment[]
  link?: string
  at: string
}

export type LogGroup = {
  title: string
  entries: LogEntry[]
}

/** A log line lifted out of its group, so it can name where it came from. */
export type RecentLogEntry = LogEntry & { group: string }
