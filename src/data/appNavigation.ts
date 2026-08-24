import {
  Activity01Icon,
  Analytics01Icon,
  Building02Icon,
  CreditCardIcon,
  DashboardSquare01Icon,
  File01Icon,
  InvoiceIcon,
  Layers01Icon,
  ListViewIcon,
  MonitorSmartphoneIcon,
  NetworkIcon,
  ReceiptIcon,
  SentIcon,
  Settings01Icon,
  Settings02Icon,
  SheetIcon,
  TaskDaily01Icon,
  UserGroupIcon,
  UserMultipleIcon,
  Wallet01Icon,
} from "@hugeicons/core-free-icons"

import type { AppNavSection, View } from "@/types"

/** Rows every application inherits, before its own feature sections. */
const generalSection: AppNavSection = {
  title: "General",
  items: [
    { icon: UserMultipleIcon, label: "Users", view: "users" },
    { icon: TaskDaily01Icon, label: "Activity Logs", view: "audit" },
  ],
}

const transpayNav: AppNavSection[] = [
  generalSection,
  {
    title: "Prepaid",
    items: [{ icon: Layers01Icon, label: "Balance", view: "balances" }],
  },
  {
    title: "TransPay",
    items: [
      {
        icon: DashboardSquare01Icon,
        label: "Dashboard",
        view: "transpay-setup",
      },
      {
        icon: SentIcon,
        label: "Disbursements",
        children: ["Single payment", "Bulk upload", "Payment history"],
      },
      {
        icon: InvoiceIcon,
        label: "Invoices",
        children: ["All invoices", "Drafts", "Recurring"],
      },
      {
        icon: SheetIcon,
        label: "Reconciliations",
        children: ["Statements", "Exceptions"],
      },
      { icon: Settings02Icon, label: "Settings", view: "settings" },
    ],
  },
  {
    title: "Global transactions",
    items: [
      { icon: ListViewIcon, label: "All Transactions", view: "settlement" },
    ],
  },
]

const rpayNav: AppNavSection[] = [
  generalSection,
  {
    title: "RPay",
    items: [
      { icon: DashboardSquare01Icon, label: "Dashboard", view: "product" },
      { icon: Analytics01Icon, label: "Analytics" },
      { icon: MonitorSmartphoneIcon, label: "Terminals" },
      { icon: Building02Icon, label: "Branches" },
      {
        icon: ReceiptIcon,
        label: "Bill Management",
        children: ["Bills", "Bill categories"],
      },
      {
        icon: File01Icon,
        label: "Reports",
        children: ["Collections", "Terminal performance"],
      },
      {
        icon: UserGroupIcon,
        label: "Customer Management",
        children: ["Customers", "Segments"],
      },
      { icon: Settings01Icon, label: "Configurations", view: "settings" },
      {
        icon: NetworkIcon,
        label: "Network",
        children: ["Institutions", "Routing"],
      },
    ],
  },
  {
    title: "Settlement report",
    items: [
      { icon: ListViewIcon, label: "Settlement Report", view: "settlement" },
    ],
  },
]

const accountsNav: AppNavSection[] = [
  generalSection,
  {
    title: "Accounts",
    items: [
      { icon: DashboardSquare01Icon, label: "Overview", view: "accounts" },
      { icon: Wallet01Icon, label: "Balances", view: "balances" },
      {
        icon: SheetIcon,
        label: "Statements",
        children: ["Download", "Scheduled"],
      },
      { icon: Settings02Icon, label: "Configuration", view: "accounts" },
    ],
  },
]

/** Sidebar used by applications without a bespoke navigation yet. */
const genericNav = (name: string): AppNavSection[] => [
  generalSection,
  {
    title: name,
    items: [
      { icon: DashboardSquare01Icon, label: "Dashboard", view: "product" },
      { icon: Activity01Icon, label: "Transactions", view: "settlement" },
      { icon: CreditCardIcon, label: "Payouts", view: "balances" },
      { icon: Settings02Icon, label: "Settings", view: "settings" },
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
