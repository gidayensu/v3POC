import { useState } from "react"
import { Bell, ChevronDown, CircleHelp, Grip, Menu, Search } from "lucide-react"

import { BusinessMenu } from "@/components/layout/BusinessMenu"
import { Notifications } from "@/components/layout/Notifications"
import type { SwitchableBusiness, TranspayStatus, View } from "@/types"

/** Quiet square icon button shared by every utility control in the bar. */
const iconButton =
  "grid size-9 shrink-0 place-items-center rounded-lg text-[#101d42] transition-colors outline-none hover:bg-[#eef1f6] focus-visible:ring-2 focus-visible:ring-[#0b63f6]/35"

export function Topbar({
  go,
  merchant,
  requestBusinessSwitch,
  toggleSidebar,
  openSwitcher,
  openSearch,
  transpayStatus,
}: {
  go: (view: View) => void
  merchant: string
  requestBusinessSwitch: (business: SwitchableBusiness) => void
  toggleSidebar: () => void
  openSwitcher: () => void
  openSearch: () => void
  transpayStatus: TranspayStatus
}) {
  const [business, setBusiness] = useState(false)
  const [notice, setNotice] = useState(false)
  return (
    <header className="sticky top-0 z-[12] flex h-[78px] items-center gap-4 border-b border-[#e3e7ed] bg-white px-7 max-md:gap-3 max-md:px-3">
      <button
        type="button"
        className={`${iconButton} md:hidden`}
        onClick={toggleSidebar}
        title="Open navigation"
      >
        <Menu />
      </button>

      <button
        type="button"
        className={`${iconButton} max-md:hidden`}
        onClick={openSwitcher}
        title="Switch application"
      >
        <Grip />
      </button>

      <span className="h-6 w-px shrink-0 bg-[#e3e7ed] max-md:hidden" />

      <BusinessMenu
        merchant={merchant}
        open={business}
        toggle={() => setBusiness(!business)}
        close={() => setBusiness(false)}
        select={requestBusinessSwitch}
        go={go}
      />

      <button
        type="button"
        className="ml-auto flex h-[42px] w-[min(430px,38vw)] items-center gap-2.5 overflow-hidden rounded-md border border-[#dce1e8] bg-white px-3 text-left text-xs whitespace-nowrap text-[#6c7688] transition-colors outline-none hover:border-[#c3ccdb] hover:bg-[#f8fafc] focus-visible:ring-2 focus-visible:ring-[#0b63f6]/35 max-md:w-auto max-md:flex-1 max-md:text-[0px]"
        onClick={openSearch}
      >
        <Search />
        Search payments, accounts, invoices and more
        <kbd className="ml-auto rounded border border-[#e3e7ed] bg-[#f7f9fc] px-1.5 py-0.5 text-[11px] font-medium text-[#6c7688] max-md:hidden">
          ⌘ K
        </kbd>
      </button>

      <div className="flex shrink-0 items-center gap-3 max-md:gap-1.5">
        <button type="button" className={iconButton} title="Help">
          <CircleHelp />
        </button>
        <button
          type="button"
          className={`${iconButton} relative`}
          onClick={() => setNotice(!notice)}
          title="Notifications"
        >
          <Bell />
          <em className="absolute top-0.5 right-0.5 rounded-full bg-[#dc2626] px-1.5 py-px text-[10px] leading-tight font-semibold text-white not-italic">
            5
          </em>
        </button>
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#061f49] text-sm font-bold text-white">
          G
        </span>
        <b className="text-sm font-semibold text-[#101d42] max-md:hidden">
          Gideon Okafor
        </b>
        <ChevronDown className="text-[#8792a8] max-md:hidden" />
      </div>

      {notice && (
        <Notifications
          close={() => setNotice(false)}
          go={go}
          transpayStatus={transpayStatus}
        />
      )}
    </header>
  )
}
