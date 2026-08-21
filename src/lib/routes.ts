import type { View } from "@/types"

export const viewToPath: Record<View, string> = {
  home: "/",
  applications: "/applications",
  businesses: "/businesses",
  users: "/users",
  approvals: "/approvals",
  audit: "/audit",
  support: "/support",
  settings: "/settings",
  settlement: "/settlement",
  balances: "/balances",
  setup: "/accounts/setup",
  accounts: "/accounts/configuration",
  "transpay-setup": "/transpay/setup",
  product: "/rpay",
}

export const pathToView = Object.fromEntries(
  Object.entries(viewToPath).map(([view, path]) => [path, view as View])
) as Record<string, View>

export const viewForPath = (pathname: string): View =>
  pathToView[pathname] || "home"
