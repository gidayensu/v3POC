import {
  Building03Icon,
  CustomerSupportIcon,
  UserAdd01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { ChevronLeft, ChevronRight, History, Info, Pin, X } from "lucide-react"
import { useLayoutEffect, useRef, useState, type CSSProperties } from "react"

import suiteMark from "@/assets/trans_blue.png"
import { LogRow, Page, PageActionButton } from "@/components/common"
import { identityFor } from "@/data/appIdentity"
import { recentLogEntries } from "@/data/auditLog"
import { PRODUCT_GROUPS, products } from "@/data/products"
import { usePinnedApps } from "@/hooks/usePinnedApps"
import type { IconSvgElement } from "@hugeicons/react"

import type { Product, View } from "@/types"

/** Applications this user worked in most recently, newest first. */
const recentlyUsed = [
  ["TransPay", "Payments Admin"],
  ["RPay", "Collections Admin"],
  ["Standing Orders", "Schedules Operator"],
  ["Direct Debit", "Mandates Operator"],
]

const ALL = "All applications"
const tabs = [ALL, ...PRODUCT_GROUPS]

/** The three things an operator most often leaves an application to do. */
const quickActions = [
  [UserAdd01Icon, "Add user", "Invite someone and set their access", "users"],
  [
    Building03Icon,
    "Update business details",
    "Change your registered information",
    "settings",
  ],
  [
    CustomerSupportIcon,
    "Contact support",
    "Raise a request with the suite team",
    "support",
  ],
] as const satisfies readonly (readonly [
  IconSvgElement,
  string,
  string,
  View,
])[]

/** Suite announcements, newest first. One is on screen at a time. */
const announcements = [
  [
    "Faster settlement tracking",
    "Follow every batch from processing to completion.",
    "settlement",
  ],
  [
    "Insurance and pensions are live",
    "Manage policies and staff remittances beside your payments.",
    "applications",
  ],
  [
    "Bulk mandate uploads",
    "Add up to 500 Direct Debit mandates from one spreadsheet.",
    "applications",
  ],
] as const satisfies readonly (readonly [string, string, View])[]

/** Where a card sends the operator: live apps switch, the rest open a journey. */
const destination = (name: string): View =>
  name === "TransPay"
    ? "transpay-setup"
    : name === "Accounts"
      ? "setup"
      : name === "Settlement"
        ? "settlement"
        : "product"

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
        <History className="size-[17px] text-[#06b6d4]" />
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
              className="absolute -top-2 -right-2 grid size-5 place-items-center justify-center rounded-full bg-[#e5484d] p-0 leading-none text-white opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
              title={`Remove ${name} from quick switch`}
              onClick={() => setHidden((h) => [...h, name])}
            >
              <X className="w-2  text-white" />
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

/** One application: its name and what it is for, nothing else competing. */
function AppCard({
  p,
  pinned,
  onPin,
  onOpen,
}: {
  p: Product
  pinned: boolean
  onPin: () => void
  onOpen: () => void
}) {
  return (
    <div className="group relative rounded-lg bg-[#f7f9fc] transition-colors hover:bg-[#eef3fa]">
      {/* Right padding keeps the tagline clear of the pin. */}
      <button
        className="flex w-full flex-col items-start gap-1 px-5 py-[18px] pr-14 text-left"
        onClick={onOpen}
      >
        <b className="text-[15px] font-bold tracking-[-0.01em] text-[#101d42]">
          {p.name}
        </b>
        <span className="text-sm text-[#667085]">
          {identityFor(p.name).tagline}
        </span>
      </button>
      <button
        className={`absolute top-1/2 right-4 grid size-7 -translate-y-1/2 place-items-center rounded-md text-[#98a2b3] transition-opacity hover:bg-[#e2e8f1] focus-visible:opacity-100 ${
          pinned ? "text-[#002047]" : "opacity-0 group-hover:opacity-100"
        }`}
        title={pinned ? `Unpin ${p.name}` : `Pin ${p.name}`}
        onClick={onPin}
      >
        <Pin className={`size-4 ${pinned ? "fill-current" : ""}`} />
      </button>
    </div>
  )
}

/** An element's rendered height, kept current as its content changes. */
function useMeasuredHeight<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [height, setHeight] = useState<number>()

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) =>
      setHeight(entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height)
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, height }
}

/**
 * Switching tabs changes how many cards the panel holds. Measuring the content
 * and animating an explicit height keeps that from snapping open or shut; the
 * first render leaves the height unset so the panel still sizes itself.
 */
function useSmoothHeight() {
  const { ref, height } = useMeasuredHeight<HTMLDivElement>()
  return {
    wrapper: {
      className:
        "overflow-hidden transition-[height] duration-300 ease-out motion-reduce:transition-none",
      style: { height },
    },
    content: ref,
  }
}

/** Every application the business can reach, segmented by what it is for. */
function Applications({
  go,
  requestAppSwitch,
  floor,
}: {
  go: (view: View) => void
  requestAppSwitch: (app: string) => void
  /** Height of the side column, so the panel never ends above it. */
  floor?: number
}) {
  const [tab, setTab] = useState(ALL)
  const { pinned, toggle, isPinned } = usePinnedApps()
  const { wrapper, content } = useSmoothHeight()
  const inTab = products.filter((p) => tab === ALL || p.group === tab)
  const open = (p: Product) =>
    p.status === "active" ? requestAppSwitch(p.name) : go(destination(p.name))
  const pinnedInTab = inTab.filter((p) => isPinned(p.name))
  /* Headings only earn their space once something is actually pinned. */
  const sections =
    tab === ALL && pinnedInTab.length
      ? ([
          ["Pinned", pinnedInTab],
          ["Everything else", inTab.filter((p) => !isPinned(p.name))],
        ] as const)
      : ([["", inTab]] as const)

  return (
    <section
      /* The floor only applies where the side column sits beside the panel. */
      className="rounded-xl bg-white shadow-[0_1px_2px_rgb(16_29_66/0.04)] transition-[min-height] duration-300 ease-out motion-reduce:transition-none lg:min-h-[var(--floor)]"
      style={{ "--floor": `${floor ?? 0}px` } as CSSProperties}
    >
      <header className="px-6 pt-5">
        <h2 className="m-0 text-lg font-semibold tracking-[-0.01em] text-[#101d42]">
          Applications
        </h2>
      </header>
      {/* The active tab reads in the sidebar's ink, so navigation stays one colour. */}
      <div className="mt-3 flex scrollbar-none gap-1 overflow-x-auto border-b border-[#eef1f6] px-4">
        {tabs.map((item) => (
          <button
            key={item}
            className={`-mb-px border-b-2 px-3 pb-2.5 text-sm whitespace-nowrap transition-colors ${
              tab === item
                ? "border-[#002047] font-semibold text-[#002047]"
                : "border-transparent text-[#667085] hover:text-[#101d42]"
            }`}
            onClick={() => setTab(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div {...wrapper}>
        {/* The observed element stays mounted; only the keyed child re-enters. */}
        <div ref={content}>
          <div
            key={tab}
            className="flex animate-in flex-col gap-5 px-6 py-5 duration-200 fade-in"
          >
            {sections.map(([label, items]) =>
              items.length ? (
                <div key={label || tab}>
                  {label ? (
                    <small className="mb-2.5 block text-xs font-semibold tracking-[0.06em] text-[#a6b0c2] uppercase">
                      {label}
                    </small>
                  ) : null}
                  <div className="grid gap-3 sm:grid-cols-2">
                    {items.map((p) => (
                      <AppCard
                        key={p.name}
                        p={p}
                        pinned={pinned.includes(p.name)}
                        onPin={() => toggle(p.name)}
                        onOpen={() => open(p)}
                      />
                    ))}
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/** The things an operator leaves an application to do, one click from home. */
function QuickActions({ go }: { go: (view: View) => void }) {
  return (
    <section className="rounded-xl bg-white px-5 py-4 shadow-[0_1px_2px_rgb(16_29_66/0.04)]">
      <h2 className="m-0 mb-1 text-sm font-semibold text-[#101d42]">
        Quick actions
      </h2>
      <div className="divide-y divide-[#eef1f6]">
        {quickActions.map(([icon, title, desc, target]) => (
          <button
            key={title}
            className="group -mx-2 flex w-[calc(100%+1rem)] items-center gap-3 rounded-lg px-2 py-3.5 text-left transition-colors hover:bg-[#f8fafc]"
            onClick={() => go(target)}
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#eef3f9] text-[#0b3565] transition-colors group-hover:bg-[#e0e9f3]">
              <HugeiconsIcon icon={icon} className="size-[18px]" />
            </span>
            <span className="min-w-0 flex-1">
              <b className="block text-[15px] font-bold tracking-[-0.01em] text-[#101d42]">
                {title}
              </b>
              <span className="block text-sm text-[#8792a8]">{desc}</span>
            </span>
            <ChevronRight className="size-5 shrink-0 stroke-[2.25] text-[#b6c0d0]" />
          </button>
        ))}
      </div>
    </section>
  )
}

/** Suite announcements, one slide at a time. */
function WhatsNew({ go }: { go: (view: View) => void }) {
  const [index, setIndex] = useState(0)
  const [title, detail, target] = announcements[index]
  const step = (by: number) =>
    setIndex((i) => (i + by + announcements.length) % announcements.length)

  return (
    <section
      className="relative overflow-hidden rounded-xl bg-[linear-gradient(135deg,#002047_0%,#0b3565_60%,#123c6b_100%)] px-5 py-5"
      aria-label="What's new"
    >
      <div
        key={index}
        className="flex animate-in items-start gap-4 duration-300 fade-in slide-in-from-right-2 motion-reduce:animate-none"
      >
        <div className="min-w-0 flex-1">
          <small className="block text-[11px] font-bold tracking-[0.09em] text-white/65 uppercase">
            What&rsquo;s new
          </small>
          <b className="mt-2 block text-lg leading-tight font-bold tracking-[-0.01em] text-white">
            {title}
          </b>
          <span className="mt-1.5 block text-sm leading-snug text-white/70">
            {detail}
          </span>
          <button
            className="mt-4 inline-flex h-9 items-center rounded-md bg-white px-4 text-[13px] font-bold !text-[#002047] transition-colors hover:bg-[#e6edf6]"
            onClick={() => go(target)}
          >
            See what&rsquo;s new
          </button>
        </div>
      </div>
      <div className="relative mt-5 flex items-center gap-3">
        <div className="flex gap-1.5">
          {announcements.map(([slide], i) => (
            <button
              key={slide}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-5 bg-white" : "w-1.5 bg-white/35"
              }`}
              aria-label={`Show announcement ${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
        <button
          className="ml-auto grid size-7 place-items-center rounded-full text-white transition-colors hover:bg-white/12"
          aria-label="Previous announcement"
          onClick={() => step(-1)}
        >
          <ChevronLeft className="size-4 stroke-[2.25]" />
        </button>
        <button
          className="grid size-7 place-items-center rounded-full text-white transition-colors hover:bg-white/12"
          aria-label="Next announcement"
          onClick={() => step(1)}
        >
          <ChevronRight className="size-4 stroke-[2.25]" />
        </button>
      </div>
    </section>
  )
}

/** The newest audit lines, rendered by the same row the audit page uses. */
function RecentActivity({ go }: { go: (view: View) => void }) {
  return (
    <section className="mt-6 rounded-xl bg-white px-6 py-5">
      <div className="flex items-center justify-between gap-3 border-b border-[#e8ebf2] pb-2.5">
        <h2 className="m-0 text-[13px] font-medium text-[#2340c8]">
          Recent activity
        </h2>
        <PageActionButton variant="outline" onClick={() => go("audit")}>
          View all
        </PageActionButton>
      </div>
      {recentLogEntries(5).map((entry, i) => (
        <LogRow
          key={`${entry.group}-${i}`}
          entry={entry}
          context={entry.group}
        />
      ))}
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
  /* The applications panel is floored at the side column's height, so the two
     columns finish together instead of leaving a ragged gap. */
  const { ref: side, height: sideHeight } = useMeasuredHeight<HTMLElement>()
  return (
    <Page title="Good morning, Gideon" sub="Your financial workspace">
      <QuickSwitch requestAppSwitch={requestAppSwitch} />
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(300px,0.85fr)]">
        <Applications
          go={go}
          requestAppSwitch={requestAppSwitch}
          floor={sideHeight}
        />
        <aside ref={side} className="flex flex-col gap-6">
          <QuickActions go={go} />
          <WhatsNew go={go} />
        </aside>
      </div>
      <RecentActivity go={go} />
    </Page>
  )
}
