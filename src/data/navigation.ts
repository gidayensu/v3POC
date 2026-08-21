import {
  Building2,
  Headphones,
  Home,
  LayoutGrid,
  ScrollText,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react"

import type { NavItem, NavSection, View } from "@/types"

/** Sidebar navigation, grouped under section headers. */
export const navSections: NavSection[] = [
  {
    title: "Overview",
    items: [
      { icon: Home, label: "Home", view: "home" },
      { icon: LayoutGrid, label: "Applications", view: "applications" },
    ],
  },
  {
    title: "Organisation",
    items: [
      { icon: Building2, label: "Businesses", view: "businesses" },
      { icon: Users, label: "Users & access", view: "users" },
      { icon: ShieldCheck, label: "Approvals", view: "approvals", badge: 2 },
      { icon: ScrollText, label: "Activity logs", view: "audit" },
    ],
  },
]

/** Pinned to the bottom of the sidebar, below the scrolling sections. */
export const navFooterItems: NavItem[] = [
  { icon: Settings, label: "Settings", view: "settings" },
  { icon: Headphones, label: "Support", view: "support" },
]

/** Product journeys that should keep "Applications" highlighted. */
const APPLICATION_VIEWS: View[] = ["setup", "accounts", "transpay-setup"]

export const isNavActive = (view: View, target: View) =>
  view === target ||
  (APPLICATION_VIEWS.includes(view) && target === "applications")
