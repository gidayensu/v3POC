import type { ReactNode } from "react"
import {
  Activity,
  ArrowLeft,
  Banknote,
  Bell,
  CircleHelp,
  FileText,
  Grid3X3,
  Landmark,
  Search,
  Settings,
  SlidersHorizontal,
  Users,
} from "lucide-react"

import { Logo } from "@/components/common"

const productNavItems = [
  [Activity, "Overview"],
  [Landmark, "Accounts"],
  [Banknote, "Transactions"],
  [FileText, "Statements"],
  [Users, "Users & access"],
  [SlidersHorizontal, "Configuration"],
  [Settings, "Settings"],
] as const

export function ProductNav({ back }: { back: () => void }) {
  return (
    <aside className="productnav">
      <h2>
        <Landmark />
        Accounts
      </h2>
      {productNavItems.map(([I, label], i) => (
        <button className={i === 5 ? "active" : ""} key={label}>
          <I />
          {label}
        </button>
      ))}
      <button className="back" onClick={back}>
        <ArrowLeft />
        Back to Merchant Suite
      </button>
    </aside>
  )
}

export function ProductTop() {
  return (
    <header className="producttop">
      <Logo />
      <button>
        <Grid3X3 />
      </button>
      <div>
        <Search />
        Search payments, accounts, invoices and more
      </div>
      <CircleHelp />
      <Bell />
      <span>G</span>
      <b>Gideon Okafor</b>
    </header>
  )
}

/** Chrome for the embedded "Accounts" product experience. */
export function ProductShell({
  back,
  children,
}: {
  back: () => void
  children: ReactNode
}) {
  return (
    <div className="productshell">
      <ProductNav back={back} />
      <div className="productwork">
        <ProductTop />
        {children}
      </div>
    </div>
  )
}
