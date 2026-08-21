import { Activity, ChevronRight, Landmark, Users } from "lucide-react"

import { Badge, Page, ProductIcon, SectionTitle } from "@/components/common"
import { PRODUCT_GROUPS, products, productsInGroup } from "@/data/products"
import type { Status, View } from "@/types"

const actionLabel = (s: Status) =>
  s === "active"
    ? "Open"
    : s === "setup"
      ? "Continue setup"
      : s === "pending"
        ? "View status"
        : "Set up"

const tasks = [
  [
    Landmark,
    "Complete Accounts setup",
    "Finish setup to access balances and statements.",
    "Continue setup",
  ],
  [
    Activity,
    "Settlement pending approval",
    "Your configuration is being reviewed.",
    "View status",
  ],
  [
    Users,
    "Review 2 access requests",
    "Approve or decline pending users.",
    "Review requests",
  ],
] as const

/**
 * The catalogue-style home: recently used apps, the full application
 * catalogue and an "action required" rail.
 */
export function CatalogueHome({
  go,
  gateway,
}: {
  go: (view: View) => void
  gateway: () => void
}) {
  const open = (name: string) =>
    name === "Accounts"
      ? gateway()
      : go(name === "TransPay" ? "transpay-setup" : "product")
  return (
    <Page
      title="Good morning, Gideon"
      sub="Choose an application or continue where you left off."
    >
      <div className="homegrid">
        <div>
          <SectionTitle title="Recently used" />
          <div className="recent">
            {products.slice(0, 3).map((p, i) => (
              <button key={p.name} onClick={() => open(p.name)}>
                <ProductIcon p={p} big />
                <p>
                  <b>{p.name}</b>
                  <span>{p.desc}</span>
                </p>
                <small>Last opened</small>
                <strong>{i ? "Yesterday, 4:18 PM" : "Today, 9:24 AM"}</strong>
                <ChevronRight />
              </button>
            ))}
          </div>
          <SectionTitle title="Application catalogue" />
          {PRODUCT_GROUPS.map((group) => (
            <section className="group" key={group}>
              <h3>{group}</h3>
              <div className="cards">
                {productsInGroup(group).map((p) => (
                  <article key={p.name}>
                    <div>
                      <ProductIcon p={p} big />
                      <p>
                        <b>{p.name}</b>
                        <span>{p.desc}</span>
                      </p>
                    </div>
                    <Badge s={p.status} />
                    <footer>
                      <button onClick={() => open(p.name)}>
                        {actionLabel(p.status)}
                      </button>
                      <button>
                        <ChevronRight />
                      </button>
                    </footer>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
        <aside className="tasks">
          <h2>Action required</h2>
          {tasks.map(([I, title, desc, cta], i) => (
            <button
              key={title}
              onClick={() =>
                i === 0 ? gateway() : go(i === 2 ? "approvals" : "applications")
              }
            >
              <span className={`task t${i}`}>
                <I />
              </span>
              <p>
                <b>{title}</b>
                <small>{desc}</small>
                <strong>{cta}</strong>
              </p>
              <ChevronRight />
            </button>
          ))}
        </aside>
      </div>
    </Page>
  )
}
