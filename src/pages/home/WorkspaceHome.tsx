import { useState } from "react"
import {
  ChevronRight,
  History,
  Info,
  Plus,
  ScrollText,
  UserPlus,
  X,
  type LucideIcon,
} from "lucide-react"

import { Page, ProductIcon } from "@/components/common"
import { productByName, products } from "@/data/products"
import type { Product, View } from "@/types"

const workspaceGroups: [string, Product[]][] = [
  ["Payments", [products[1], products[0]]],
  ["Collections", [products[4], products[5]]],
]

/** Applications this user worked in most recently, newest first. */
const recentlyUsed = [
  ["TransPay", "Payments Admin"],
  ["RPay", "Collections Admin"],
  ["Standing Orders", "Schedules Operator"],
  ["Direct Debit", "Mandates Operator"],
]

const quickActions = [
  [Plus, "Receive a payment", "Create a payment link or invoice", "product"],
  [UserPlus, "Add user", "Invite someone and set their access", "users"],
  [ScrollText, "View logs", "Track activity across your applications", "audit"],
] as const satisfies readonly (readonly [LucideIcon, string, string, View])[]

const attention = [
  ["3", "Failed payments", "Last 24 hours"],
  ["8", "Settlements pending", "Requires review"],
  ["5", "Customers to verify", "Action required"],
  ["2", "Expiring mandates", "Within 7 days"],
]

/** Recently used applications, one click away from being switched into. */
function QuickSwitch({
  requestAppSwitch,
}: {
  requestAppSwitch: (app: string) => void
}) {
  const [hidden, setHidden] = useState<string[]>([])
  const visible = recentlyUsed.filter(([name]) => !hidden.includes(name))
  if (!visible.length) return null
  return (
    <section className="quick-switch">
      <header>
        <History />
        <h2>Quick Switch</h2>
        <Info aria-label="Applications you opened recently on this device" />
      </header>
      <div className="quick-switch-rail">
        {visible.map(([name, role]) => {
          const product = productByName(name)
          return (
            <div className="quick-switch-card" key={name}>
              <button onClick={() => requestAppSwitch(name)}>
                {product ? (
                  <ProductIcon p={product} neutral />
                ) : (
                  <span className="picon" />
                )}
                <p>
                  <b>{name}</b>
                  <em>{role}</em>
                </p>
                <ChevronRight />
              </button>
              <button
                className="dismiss"
                title={`Remove ${name} from quick switch`}
                onClick={() => setHidden((h) => [...h, name])}
              >
                <X />
              </button>
            </div>
          )
        })}
      </div>
    </section>
  )
}

/** The default, simplified workspace home. */
export function WorkspaceHome({
  go,
  requestAppSwitch,
}: {
  go: (view: View) => void
  requestAppSwitch: (app: string) => void
}) {
  return (
    <Page title="Good morning, Gideon" sub="Your financial workspace">
      <QuickSwitch requestAppSwitch={requestAppSwitch} />
      <div className="simple-home">
        <section>
          <div className="recently-head">
            <h2>Products</h2>
            <button onClick={() => go("applications")}>
              View all applications <ChevronRight />
            </button>
          </div>
          <div className="workspace-products">
            {workspaceGroups.map(([group, items]) => (
              <div key={group}>
                <small>{group}</small>
                {items.map((p) => (
                  <button
                    key={p.name}
                    onClick={() =>
                      go(p.name === "TransPay" ? "transpay-setup" : "product")
                    }
                  >
                    <ProductIcon p={p} neutral />
                    <b>{p.name}</b>
                    <span>{p.desc}</span>
                    <ChevronRight />
                  </button>
                ))}
              </div>
            ))}
          </div>
        </section>
        <aside className="home-side">
          <h2>Quick actions</h2>
          {quickActions.map(([I, title, desc, target]) => (
            <button key={title} onClick={() => go(target)}>
              <span>
                <I />
              </span>
              <p>
                <b>{title}</b>
                <small>{desc}</small>
              </p>
              <ChevronRight />
            </button>
          ))}
          <div className="attention-list">
            <header>
              <h2>Needs attention</h2>
              <button onClick={() => go("approvals")}>View all</button>
            </header>
            {attention.map((x, i) => (
              <button key={x[1]}>
                <span className={`mini-task m${i}`}>{x[0]}</span>
                <p>
                  <b>{x[1]}</b>
                  <small>{x[2]}</small>
                </p>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </Page>
  )
}
