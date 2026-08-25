import type { Product } from "@/types"

/**
 * The applications ship without logos, so the suite gives each one a mark it
 * can be recognised by: its glyph on an ink tile, and a monogram for the
 * places a glyph would be too small to read. Deliberately colourless — the
 * name and the glyph do the identifying.
 */
export type AppIdentity = {
  /** Stands in for the glyph at small sizes. */
  monogram: string
  /** What the application does, in the operator's words. */
  tagline: string
  /** The one number an operator wants before they open it. */
  signal?: string
  /** Onboarding left to do, for applications that are part-way set up. */
  setup?: { done: number; total: number; next: string }
}

export const appIdentity: Record<string, AppIdentity> = {
  RPay: {
    monogram: "RP",
    tagline: "Collections and reconciliation",
    signal: "142 payments collected today",
  },
  TransPay: {
    monogram: "TP",
    tagline: "Outgoing business payments",
    signal: "12 payments awaiting approval",
    setup: { done: 3, total: 5, next: "Add your settlement account" },
  },
  Accounts: {
    monogram: "AC",
    tagline: "Balances and statements",
    signal: "4 accounts connected",
  },
  Settlement: {
    monogram: "ST",
    tagline: "Settlement batches",
    signal: "8 batches pending review",
  },
  "Standing Orders": {
    monogram: "SO",
    tagline: "Recurring payments",
    signal: "31 schedules running",
  },
  "Direct Debit": {
    monogram: "DD",
    tagline: "Mandates and auto collections",
    signal: "2 mandates expiring this week",
    setup: { done: 1, total: 4, next: "Upload your mandate template" },
  },
  Insurance: {
    monogram: "IN",
    tagline: "Policies, premiums and claims",
    signal: "Not started",
  },
  Pensions: {
    monogram: "PN",
    tagline: "Employee pension remittances",
    signal: "Scheme application in review",
  },
  SMS: {
    monogram: "SM",
    tagline: "Customer messaging",
    signal: "Not connected yet",
  },
}

const fallback: AppIdentity = { monogram: "··", tagline: "Suite application" }

export const identityFor = (name: string): AppIdentity =>
  appIdentity[name] ?? fallback

/** Operator-facing wording for a product's state, shorter than a full label. */
export const statusLabel: Record<Product["status"], string> = {
  active: "Live",
  setup: "Setup unfinished",
  pending: "In review",
  available: "Not started",
}
