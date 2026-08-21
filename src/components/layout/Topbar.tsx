import { useState } from "react"
import { Bell, ChevronDown, CircleHelp, Grip, Menu, Search } from "lucide-react"

import { BusinessMenu } from "@/components/layout/BusinessMenu"
import { Notifications } from "@/components/layout/Notifications"
import type { SwitchableBusiness, TranspayStatus, View } from "@/types"

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
    <header className="topbar">
      <button className="hamb" onClick={toggleSidebar}>
        <Menu />
      </button>
      <button className="apps" onClick={openSwitcher}>
        <Grip />
      </button>
      <BusinessMenu
        merchant={merchant}
        open={business}
        toggle={() => setBusiness(!business)}
        close={() => setBusiness(false)}
        select={requestBusinessSwitch}
        go={go}
      />
      <button className="search" onClick={openSearch}>
        <Search />
        Search payments, accounts, invoices and more <kbd>⌘ K</kbd>
      </button>
      <div className="profile">
        <CircleHelp />
        <button onClick={() => setNotice(!notice)}>
          <Bell />
          <em>5</em>
        </button>
        <span>G</span>
        <b>Gideon Okafor</b>
        <ChevronDown />
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
