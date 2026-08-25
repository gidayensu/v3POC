import { useState, type ReactNode } from "react"

import { BusinessSwitchModal } from "@/components/layout/BusinessSwitchModal"
import { DataReload } from "@/components/layout/DataReload"
import { SearchBox } from "@/components/layout/SearchBox"
import { Sidebar } from "@/components/layout/Sidebar"
import { Topbar } from "@/components/layout/Topbar"
import { isProductAccess } from "@/data/businesses"
import type { SwitchableBusiness, TranspayStatus, View } from "@/types"

export function Shell({
  view,
  go,
  children,
  openSwitcher,
  transpayStatus,
  merchant,
  setMerchant,
  dataReloading,
  activeApp,
  exitApp,
  switchingApp,
  requestProductAccess,
  assumedRole,
}: {
  view: View
  go: (view: View) => void
  children: ReactNode
  openSwitcher: () => void
  transpayStatus: TranspayStatus
  merchant: string
  setMerchant: (name: string) => void
  dataReloading: boolean
  activeApp: string | null
  exitApp: () => void
  switchingApp: string | null
  /** Businesses we only hold a seat on switch through their own dialog. */
  requestProductAccess: (business: SwitchableBusiness) => void
  assumedRole: string
}) {
  const [mobile, setMobile] = useState(false)
  const [search, setSearch] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [pendingBusiness, setPendingBusiness] =
    useState<SwitchableBusiness | null>(null)
  return (
    <div className={`shell ${collapsed ? "collapsed" : ""}`}>
      <Sidebar
        view={view}
        go={go}
        open={mobile}
        close={() => setMobile(false)}
        activeApp={activeApp}
        exitApp={exitApp}
        assumedRole={assumedRole}
        unmanagedBusiness={isProductAccess(merchant)}
        collapsed={collapsed}
        toggleCollapsed={() => setCollapsed((c) => !c)}
      />
      <div className="work">
        <Topbar
          go={go}
          merchant={merchant}
          requestBusinessSwitch={(business) =>
            business.access === "product"
              ? requestProductAccess(business)
              : setPendingBusiness(business)
          }
          toggleSidebar={() => setMobile((open) => !open)}
          openSwitcher={openSwitcher}
          openSearch={() => setSearch(true)}
          transpayStatus={transpayStatus}
        />
        {switchingApp ? (
          <DataReload
            title={`Opening ${switchingApp}`}
            sub="Loading application navigation, permissions and data…"
          />
        ) : dataReloading ? (
          <DataReload />
        ) : (
          <main>{children}</main>
        )}
      </div>
      {search && <SearchBox close={() => setSearch(false)} go={go} />}
      {pendingBusiness && (
        <BusinessSwitchModal
          pending={pendingBusiness}
          merchant={merchant}
          close={() => setPendingBusiness(null)}
          setMerchant={setMerchant}
          go={go}
        />
      )}
    </div>
  )
}
