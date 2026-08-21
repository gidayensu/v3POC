import {
  Activity,
  BarChart3,
  Building,
  ClipboardList,
  Cog,
  CreditCard,
  FileSpreadsheet,
  FileText,
  LayoutGrid,
  ListTree,
  MonitorSmartphone,
  Network,
  Receipt,
  ScrollText,
  Send,
  Settings,
  SquareStack,
  Users,
  UsersRound,
  WalletCards,
} from "lucide-react"

import type { AppNavSection, View } from "@/types"

/** Rows every application inherits, before its own feature sections. */
const generalSection: AppNavSection = {
  title: "General",
  items: [
    { icon: Users, label: "Users", view: "users" },
    { icon: ClipboardList, label: "Activity Logs", view: "audit" },
  ],
}

const transpayNav: AppNavSection[] = [
  generalSection,
  {
    title: "Prepaid",
    items: [{ icon: SquareStack, label: "Balance", view: "balances" }],
  },
  {
    title: "TransPay",
    items: [
      { icon: LayoutGrid, label: "Dashboard", view: "transpay-setup" },
      {
        icon: Send,
        label: "Disbursements",
        children: ["Single payment", "Bulk upload", "Payment history"],
      },
      {
        icon: Receipt,
        label: "Invoices",
        children: ["All invoices", "Drafts", "Recurring"],
      },
      {
        icon: FileSpreadsheet,
        label: "Reconciliations",
        children: ["Statements", "Exceptions"],
      },
      { icon: Settings, label: "Settings", view: "settings" },
    ],
  },
  {
    title: "Global transactions",
    items: [{ icon: ListTree, label: "All Transactions", view: "settlement" }],
  },
]

const rpayNav: AppNavSection[] = [
  generalSection,
  {
    title: "RPay",
    items: [
      { icon: LayoutGrid, label: "Dashboard", view: "product" },
      { icon: BarChart3, label: "Analytics" },
      { icon: MonitorSmartphone, label: "Terminals" },
      { icon: Building, label: "Branches" },
      {
        icon: ScrollText,
        label: "Bill Management",
        children: ["Bills", "Bill categories"],
      },
      {
        icon: FileText,
        label: "Reports",
        children: ["Collections", "Terminal performance"],
      },
      {
        icon: UsersRound,
        label: "Customer Management",
        children: ["Customers", "Segments"],
      },
      { icon: Cog, label: "Configurations", view: "settings" },
      {
        icon: Network,
        label: "Network",
        children: ["Institutions", "Routing"],
      },
    ],
  },
  {
    title: "Settlement report",
    items: [{ icon: ListTree, label: "Settlement Report", view: "settlement" }],
  },
]

const accountsNav: AppNavSection[] = [
  generalSection,
  {
    title: "Accounts",
    items: [
      { icon: LayoutGrid, label: "Overview", view: "accounts" },
      { icon: WalletCards, label: "Balances", view: "balances" },
      {
        icon: FileSpreadsheet,
        label: "Statements",
        children: ["Download", "Scheduled"],
      },
      { icon: Settings, label: "Configuration", view: "accounts" },
    ],
  },
]

/** Sidebar used by applications without a bespoke navigation yet. */
const genericNav = (name: string): AppNavSection[] => [
  generalSection,
  {
    title: name,
    items: [
      { icon: LayoutGrid, label: "Dashboard", view: "product" },
      { icon: Activity, label: "Transactions", view: "settlement" },
      { icon: CreditCard, label: "Payouts", view: "balances" },
      { icon: Settings, label: "Settings", view: "settings" },
    ],
  },
]

const bespoke: Record<string, AppNavSection[]> = {
  TransPay: transpayNav,
  RPay: rpayNav,
  Accounts: accountsNav,
}

export const appNavSections = (name: string): AppNavSection[] =>
  bespoke[name] || genericNav(name)

/** The view an application opens on once it has been switched into. */
const landing: Record<string, View> = {
  TransPay: "transpay-setup",
  RPay: "product",
  Accounts: "accounts",
  Settlement: "settlement",
}

export const appLandingView = (name: string): View => landing[name] || "product"
