import {
  Building03Icon,
  CheckmarkBadge01Icon,
  CustomerSupportIcon,
  DashboardSquare01Icon,
  Home01Icon,
  Settings02Icon,
  TaskDaily01Icon,
  UserMultipleIcon,
} from "@hugeicons/core-free-icons"

import type { NavItem, NavSection, View } from "@/types"

/** Sidebar navigation, grouped under section headers. */
export const navSections: NavSection[] = [
  {
    title: "Overview",
    items: [
      { icon: Home01Icon, label: "Home", view: "home" },
      {
        icon: DashboardSquare01Icon,
        label: "Applications",
        view: "applications",
      },
    ],
  },
  {
    title: "Organisation",
    items: [
      { icon: Building03Icon, label: "Businesses", view: "businesses" },
      { icon: UserMultipleIcon, label: "Users & access", view: "users" },
      // {
      //   icon: CheckmarkBadge01Icon,
      //   label: "Approvals",
      //   view: "approvals",
      //   badge: 2,
      // },
      { icon: TaskDaily01Icon, label: "Activity logs", view: "audit" },
    ],
  },
]

/** Pinned to the bottom of the sidebar, below the scrolling sections. */
export const navFooterItems: NavItem[] = [
  { icon: Settings02Icon, label: "Settings", view: "settings" },
  { icon: CustomerSupportIcon, label: "Support", view: "support" },
]

/** Product journeys that should keep "Applications" highlighted. */
const APPLICATION_VIEWS: View[] = ["setup", "accounts", "transpay-setup"]

export const isNavActive = (view: View, target: View) =>
  view === target ||
  (APPLICATION_VIEWS.includes(view) && target === "applications")
