import { useState } from "react"
import {
  ChevronRight,
  CircleAlert,
  History,
  Info,
  Plus,
  ScrollText,
  UserPlus,
  X,
  type LucideIcon,
} from "lucide-react"

import suiteMark from "@/assets/trans_blue.png"
import { Page, ProductIcon } from "@/components/common"
import { products } from "@/data/products"
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

/** `tone` keys into `countTone`; Tailwind needs the full class string present. */
const attention = [
  {
    count: 3,
    title: "Failed payments",
    sub: "Last 24 hours",
    meta: "GHS 4,280 affected",
    tone: "red",
  },
  {
    count: 8,
    title: "Settlements pending",
    sub: "Requires review",
    meta: "Oldest: 3h ago",
    tone: "amber",
  },
  {
    count: 5,
    title: "Customers to verify",
    sub: "KYC checks awaiting action",
    meta: "2 high priority",
    tone: "blue",
  },
  {
    count: 2,
    title: "Expiring mandates",
    sub: "Within 7 days",
    meta: "Renewal required",
    tone: "amber",
  },
] as const

const countTone: Record<string, string> = {
  red: "bg-[#fdeaea] text-[#d14343]",
  amber: "bg-[#fdf1de] text-[#b26a00]",
  blue: "bg-[#e8f1fe] text-[#1a68d1]",
}

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
    <section className="mb-[26px]">
      <header className="mb-3 flex items-center gap-2">
        <History className="size-[17px] text-[#0b63f6]" />
        <h2 className="m-0 text-sm font-semibold text-[#101d42]">
          Quick Switch
        </h2>
        <Info
          className="size-[17px] text-[#98a2b3]"
          aria-label="Applications you opened recently on this device"
        />
      </header>
      {/*
       * `overflow-x-auto` also clips vertically, so the rail needs enough
       * padding to hold the dismiss badge overhanging each card's top corner.
       */}
      <div className="-mx-3 -mt-3.5 -mb-3 flex [scrollbar-width:thin] gap-4 overflow-x-auto px-3 pt-3.5 pb-3">
        {visible.map(([name, role]) => (
          <div className="group relative min-w-[250px] flex-1" key={name}>
            <button
              className="flex w-full items-center gap-[18px] rounded-lg bg-white px-[22px] py-[18px] text-left shadow-[0_1px_2px_rgb(16_29_66/0.04)] transition-shadow hover:shadow-[0_6px_18px_rgb(16_29_66/0.08)]"
              onClick={() => requestAppSwitch(name)}
            >
              {/* The mark ships pre-cropped on its navy field, so it just needs rounding. */}
              <img
                className="size-[46px] shrink-0 rounded-full object-cover"
                src={suiteMark}
                alt=""
              />
              <p className="m-0 flex min-w-0 flex-col gap-[3px]">
                <b className="text-base font-bold tracking-[-0.01em] text-[#101d42]">
                  {name}
                </b>
                <em className="text-sm font-normal text-[#8792a8] not-italic">
                  {role}
                </em>
              </p>
              <ChevronRight className="ml-auto size-5 shrink-0 stroke-[2.25] text-[#8792a8]" />
            </button>
            <button
              className="absolute -top-2 -right-2 grid size-[22px] place-items-center rounded-full bg-[#e5484d] p-0 text-white opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
              title={`Remove ${name} from quick switch`}
              onClick={() => setHidden((h) => [...h, name])}
            >
              <X className="size-[13px]" />
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

/** Open items across the workspace, each row one click from its queue. */
function NeedsAttention({ go }: { go: (view: View) => void }) {
  const open = attention.reduce((total, a) => total + a.count, 0)
  return (
    <section className="mt-8 rounded-xl bg-white shadow-[0_1px_2px_rgb(16_29_66/0.04)]">
      <header className="flex items-center gap-3 border-b border-[#eef1f6] px-7 py-5">
        <CircleAlert className="size-7 shrink-0 text-[#e5484d]" />
        <h2 className="m-0 text-xl font-semibold tracking-[-0.01em] text-[#101d42]">
          Needs attention
        </h2>
        <span className="rounded-md bg-[#eef1f5] px-2.5 py-1 text-sm text-[#5f6875]">
          {open} open
        </span>
        <button
          className="ml-auto flex items-center gap-1 text-sm font-semibold text-[#0b63f6]"
          onClick={() => go("approvals")}
        >
          View all <ChevronRight className="size-4 stroke-[2.5]" />
        </button>
      </header>
      <div className="divide-y divide-[#eef1f6] px-7">
        {attention.map(({ count, title, sub, meta, tone }) => (
          <div key={title} className="flex items-center gap-4 py-5">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2.5">
                <b className="text-[17px] font-bold tracking-[-0.01em] text-[#101d42]">
                  {title}
                </b>
                <span
                  className={`rounded-md px-2 py-0.5 text-sm font-semibold ${countTone[tone]}`}
                >
                  {count}
                </span>
              </div>
              <span className="mt-0.5 block text-sm text-[#8792a8]">{sub}</span>
            </div>
            <span className="hidden shrink-0 text-sm text-[#667085] md:block">
              {meta}
            </span>
            <button
              className="flex h-10 shrink-0 items-center gap-1.5 rounded-md border border-[#d3dced] px-4 font-semibold whitespace-nowrap text-[#101d42] transition-colors hover:border-[#0b63f6] hover:text-[#0759d9]"
              onClick={() => go("approvals")}
            >
              Review <ChevronRight className="size-4 stroke-[2.5]" />
            </button>
          </div>
        ))}
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
        </aside>
      </div>
      <NeedsAttention go={go} />
    </Page>
  )
}
