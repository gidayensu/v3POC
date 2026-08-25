import {
  Activity,
  Banknote,
  Clock3,
  CreditCard,
  HeartPulse,
  Landmark,
  MessageCircle,
  PiggyBank,
  WalletCards,
} from "lucide-react"

import type { Product } from "@/types"

export const PRODUCT_GROUPS = [
  "Payments",
  "Collections",
  "Finance",
  "Insurance & Pension",
  "Other",
]

export const products: Product[] = [
  {
    name: "RPay",
    desc: "Monitor collections and reconcile revenue",
    group: "Payments",
    color: "purple",
    icon: CreditCard,
    status: "active",
    about:
      "RPay is the collections hub of Merchant Suite. It brings every payment channel your customers use — card, mobile money and bank transfer — into one ledger, then reconciles what landed against what you expected.",
    highlights: [
      "Accept card, mobile money and bank transfers",
      "Daily reconciliation against your settlement account",
      "Shop, branch and attendant level reporting",
    ],
  },
  {
    name: "TransPay",
    desc: "Send and track business payments",
    group: "Payments",
    color: "cyan",
    icon: Banknote,
    status: "setup",
    about:
      "TransPay handles money going out: salaries, supplier runs and one-off disbursements. You upload or key in a batch, route it through your approval chain, and track every leg until the beneficiary is paid.",
    highlights: [
      "Single and bulk payouts from your funding account",
      "Maker–checker approvals you configure per branch",
      "Live status on every transfer, with reasons for failures",
    ],
  },

  {
    name: "Settlement",
    desc: "Track settlement batches and activity",
    group: "Finance",
    color: "orange",
    icon: Activity,
    status: "pending",
    about:
      "Settlement shows how collected funds move into your bank accounts. Each batch is traceable from the transactions that formed it through to the credit on your statement.",
    highlights: [
      "Batch level view of every settlement cycle",
      "Drill from a payout back to its transactions",
      "Exportable statements for your finance team",
    ],
  },
  {
    name: "Standing Orders",
    desc: "Schedule recurring payments",
    group: "Collections",
    color: "green",
    icon: Clock3,
    status: "active",
    about:
      "Standing Orders automates recurring outgoing payments — rent, retainers, loan repayments — on a schedule you set once and can pause at any time.",
    highlights: [
      "Daily, weekly, monthly or custom schedules",
      "Pause, resume or amend without recreating the order",
      "Alerts before each run and after each debit",
    ],
  },
  {
    name: "Direct Debit",
    desc: "Manage mandates and automated collections",
    group: "Collections",
    color: "orange",
    icon: WalletCards,
    status: "setup",
    about:
      "Direct Debit lets you collect from your customers' accounts on an agreed schedule. Mandates are captured, approved and stored, then collections run automatically against them.",
    highlights: [
      "Digital mandate capture and approval tracking",
      "Automated collection runs with retry rules",
      "Full mandate history per customer",
    ],
  },
  {
    name: "Insurance",
    desc: "Policies, premiums and claims",
    group: "Insurance & Pension",
    color: "blue",
    icon: HeartPulse,
    status: "available",
    about:
      "Insurance brings policies, premium collections and claims into Merchant Suite, so cover your business buys or sells is administered next to the money that pays for it.",
    highlights: [
      "Policy register with renewal reminders",
      "Premium collection through your existing channels",
      "Claim submission and status tracking",
    ],
  },
  {
    name: "Pensions",
    desc: "Employee contributions and remittances",
    group: "Insurance & Pension",
    color: "purple",
    icon: PiggyBank,
    status: "pending",
    about:
      "Pensions manages employee contributions end to end: schemes, contribution schedules and the remittances that go to each trustee.",
    highlights: [
      "Employee and scheme registers",
      "Scheduled contribution remittances",
      "Trustee-ready remittance statements",
    ],
  },
  {
    name: "SMS",
    desc: "Communicate with your customers",
    group: "Other",
    color: "green",
    icon: MessageCircle,
    status: "available",
    about:
      "SMS gives you a messaging channel for the notices your customers actually need — payment confirmations, reminders and campaign broadcasts — billed through your merchant account.",
    highlights: [
      "One-off and bulk sends from saved contact lists",
      "Templates for receipts, reminders and alerts",
      "Delivery reports on every message",
    ],
  },
]

export const productByName = (name: string) =>
  products.find((p) => p.name === name)

export const productsInGroup = (group: string) =>
  products.filter((p) => p.group === group)
