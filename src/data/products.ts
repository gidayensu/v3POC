import {
  Activity,
  Banknote,
  Clock3,
  CreditCard,
  Landmark,
  MessageCircle,
  WalletCards,
} from "lucide-react"

import type { Product } from "@/types"

export const PRODUCT_GROUPS = ["Payments", "Collections", "Finance", "Other"]

export const products: Product[] = [
  {
    name: "RPay",
    desc: "Monitor collections and reconcile revenue",
    group: "Payments",
    color: "purple",
    icon: CreditCard,
    status: "active",
  },
  {
    name: "TransPay",
    desc: "Send and track business payments",
    group: "Payments",
    color: "cyan",
    icon: Banknote,
    status: "setup",
  },
  {
    name: "Accounts",
    desc: "View balances, statements and account activity",
    group: "Finance",
    color: "blue",
    icon: Landmark,
    status: "available",
  },
  {
    name: "Settlement",
    desc: "Track settlement batches and activity",
    group: "Finance",
    color: "orange",
    icon: Activity,
    status: "pending",
  },
  {
    name: "Standing Orders",
    desc: "Schedule recurring payments",
    group: "Collections",
    color: "green",
    icon: Clock3,
    status: "active",
  },
  {
    name: "Direct Debit",
    desc: "Manage mandates and automated collections",
    group: "Collections",
    color: "orange",
    icon: WalletCards,
    status: "setup",
  },
  {
    name: "SMS",
    desc: "Communicate with your customers",
    group: "Other",
    color: "green",
    icon: MessageCircle,
    status: "available",
  },
]

export const productByName = (name: string) =>
  products.find((p) => p.name === name)

export const productsInGroup = (group: string) =>
  products.filter((p) => p.group === group)
