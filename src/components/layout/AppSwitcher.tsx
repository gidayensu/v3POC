import { useEffect, useMemo, useRef, useState } from "react"
import {
  ArrowRight01Icon,
  Cancel01Icon,
  Home01Icon,
  PinIcon,
  Search01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import suiteMark from "@/assets/trans_blue.png"
import { Overlay } from "@/components/common"
import { identityFor } from "@/data/appIdentity"
import { PRODUCT_GROUPS, products } from "@/data/products"
import { usePinnedApps } from "@/hooks/usePinnedApps"
import type { Product, View } from "@/types"

const ALL = "All applications"
const tabs = [ALL, ...PRODUCT_GROUPS]

const matches = (p: Product, query: string) =>
  `${p.name} ${p.desc} ${identityFor(p.name).tagline}`
    .toLowerCase()
    .includes(query)

/** One application in the switcher grid: what it is, and whether it is open. */
function SwitchCard({
  p,
  current,
  pinned,
  onPin,
  onOpen,
}: {
  p: Product
  current: boolean
  pinned: boolean
  onPin: () => void
  onOpen: () => void
}) {
  return (
    <div
      className={`group relative rounded-lg transition-colors ${
        current
          ? "bg-[#eef3fa] ring-1 ring-[#0b3565]/20"
          : "bg-[#f7f9fc] hover:bg-[#eef3fa]"
      }`}
    >
      {/* Right padding keeps the tagline clear of the pin. */}
      <button
        type="button"
        className="flex w-full cursor-pointer items-center gap-3.5 px-4 py-4 pr-12 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#0b63f6]/35"
        onClick={onOpen}
      >
        {/* The mark ships pre-cropped on its navy field, so it just needs rounding. */}
        <img
          className="size-10 shrink-0 rounded-full object-cover"
          src={suiteMark}
          alt=""
        />
        <span className="min-w-0 flex-1">
          <b className="flex items-center gap-2 text-[15px] font-bold tracking-[-0.01em] text-[#101d42]">
            <span className="truncate">{p.name}</span>
            {current && (
              <em className="shrink-0 rounded-full bg-[#002047] px-2 py-0.5 text-[10px] font-bold tracking-[0.04em] text-white uppercase not-italic">
                Open
              </em>
            )}
          </b>
          <span className="mt-0.5 block truncate text-sm text-[#667085]">
            {identityFor(p.name).tagline}
          </span>
        </span>
      </button>
      <button
        type="button"
        className={`absolute top-1/2 right-3 grid size-7 -translate-y-1/2 cursor-pointer place-items-center rounded-md text-[#98a2b3] transition-opacity outline-none hover:bg-[#e2e8f1] focus-visible:opacity-100 ${
          pinned ? "text-[#002047]" : "opacity-0 group-hover:opacity-100"
        }`}
        title={pinned ? `Unpin ${p.name}` : `Pin ${p.name}`}
        onClick={onPin}
      >
        <HugeiconsIcon
          icon={PinIcon}
          className="size-4"
          strokeWidth={pinned ? 2.5 : 1.8}
        />
      </button>
    </div>
  )
}

/** Full-screen switcher: every application the business can reach. */
export function AppSwitcher({
  close,
  go,
  goView,
  activeApp,
}: {
  close: () => void
  go: (product: Product) => void
  goView: (view: View) => void
  activeApp: string | null
}) {
  const [tab, setTab] = useState(ALL)
  const [query, setQuery] = useState("")
  const { pinned, toggle, isPinned } = usePinnedApps()
  const search = useRef<HTMLInputElement>(null)

  useEffect(() => {
    search.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [close])

  const term = query.trim().toLowerCase()
  /* A search looks across the whole suite; tabs only narrow the browse view. */
  const listed = useMemo(
    () =>
      products.filter((p) =>
        term ? matches(p, term) : tab === ALL || p.group === tab
      ),
    [term, tab]
  )
  const pinnedListed = listed.filter((p) => isPinned(p.name))
  const sections =
    !term && tab === ALL && pinnedListed.length
      ? ([
          ["Pinned", pinnedListed],
          ["Everything else", listed.filter((p) => !isPinned(p.name))],
        ] as const)
      : ([["", listed]] as const)

  const open = (p: Product) => (p.name === activeApp ? close() : go(p))

  return (
    <Overlay close={close}>
      <section
        className="flex max-h-[min(85vh,46rem)] w-[min(56rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-xl bg-white shadow-[0_25px_60px_#10204a3d]"
        aria-label="Switch application"
      >
        <header className="flex items-center gap-3 px-6 pt-5 pb-4">
          <img
            className="size-9 shrink-0 rounded-full object-cover"
            src={suiteMark}
            alt=""
          />
          <div className="min-w-0 flex-1">
            <h2 className="m-0 text-lg font-semibold tracking-[-0.01em] text-[#101d42]">
              Merchant Suite
            </h2>
            <span className="block text-sm text-[#8792a8]">
              Switch to any application you have access to
            </span>
          </div>
          <button
            type="button"
            aria-label="Close"
            className="grid size-8 cursor-pointer place-items-center rounded-md text-[#8b95ad] transition-colors outline-none hover:bg-[#f1f4f9] hover:text-[#3f4a60] focus-visible:ring-2 focus-visible:ring-[#0b63f6]/35"
            onClick={close}
          >
            <HugeiconsIcon
              icon={Cancel01Icon}
              aria-hidden="true"
              className="size-4"
            />
          </button>
        </header>

        <div className="flex flex-wrap items-center gap-2.5 px-6">
          <label className="flex h-10 min-w-0 flex-1 items-center gap-2.5 rounded-md border border-[#e2e7ef] bg-[#f7f9fc] px-3 transition-colors focus-within:border-[#0b63f6]/40 focus-within:bg-white">
            <HugeiconsIcon
              icon={Search01Icon}
              aria-hidden="true"
              className="size-4 shrink-0 text-[#8792a8]"
            />
            <input
              ref={search}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search applications"
              className="min-w-0 flex-1 border-0 bg-transparent text-sm text-[#101d42] outline-none placeholder:text-[#a6b0c2]"
            />
          </label>
          <button
            type="button"
            className="inline-flex h-10 shrink-0 cursor-pointer items-center gap-2 rounded-md border border-[#e2e7ef] px-3.5 text-sm font-semibold text-[#0b3565] transition-colors outline-none hover:bg-[#eef3f9] focus-visible:ring-2 focus-visible:ring-[#0b63f6]/35"
            onClick={() => {
              close()
              goView("home")
            }}
          >
            <HugeiconsIcon
              icon={Home01Icon}
              aria-hidden="true"
              className="size-4.5"
            />
            Suite Home
          </button>
        </div>

        {/* The active tab reads in the sidebar's ink, so navigation stays one colour. */}
        <div className="mt-4 flex scrollbar-none gap-1 overflow-x-auto border-b border-[#eef1f6] px-4">
          {tabs.map((item) => (
            <button
              key={item}
              type="button"
              className={`-mb-px cursor-pointer border-b-2 px-3 pb-2.5 text-sm whitespace-nowrap transition-colors ${
                tab === item && !term
                  ? "border-[#002047] font-semibold text-[#002047]"
                  : "border-transparent text-[#667085] hover:text-[#101d42]"
              }`}
              onClick={() => {
                setQuery("")
                setTab(item)
              }}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
          {listed.length ? (
            <div
              key={term || tab}
              className="flex animate-in flex-col gap-5 duration-200 fade-in"
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
                        <SwitchCard
                          key={p.name}
                          p={p}
                          current={p.name === activeApp}
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
          ) : (
            <p className="m-0 py-10 text-center text-sm text-[#8792a8]">
              No application matches &ldquo;{query.trim()}&rdquo;.
            </p>
          )}
        </div>

        <footer className="flex items-center justify-between gap-3 border-t border-[#eef1f6] px-6 py-3.5">
          <small className="text-xs text-[#8792a8]">
            Pin the applications you use most to keep them at the top.
          </small>
          <button
            type="button"
            className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-[#0b63f6] transition-colors outline-none hover:text-[#0847b8] focus-visible:underline"
            onClick={() => {
              close()
              goView("applications")
            }}
          >
            Browse the catalogue
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              aria-hidden="true"
              className="size-4"
            />
          </button>
        </footer>
      </section>
    </Overlay>
  )
}
