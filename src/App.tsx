import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { Toast } from "@/components/common"
import { AppSwitcher, Shell } from "@/components/layout"
import { AppExitModal } from "@/components/layout/AppExitModal"
import { AppSwitchModal } from "@/components/layout/AppSwitchModal"
import { appLandingView } from "@/data/appNavigation"
import { useApplication } from "@/hooks/useApplication"
import { useMerchant, useMerchantChangeWatcher } from "@/hooks/useMerchant"
import { useToast } from "@/hooks/useToast"
import { useTranspayStatus } from "@/hooks/useTranspayStatus"
import { viewForPath, viewToPath } from "@/lib/routes"
import { AccountsGateway } from "@/pages/accounts/AccountsGateway"
import { ViewRouter } from "@/pages/ViewRouter"
import type { Product, View } from "@/types"

const launchTarget = (name: string): View =>
  name === "Accounts"
    ? "setup"
    : name === "TransPay"
      ? "transpay-setup"
      : name === "Settlement"
        ? "settlement"
        : "product"

export default function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const view = viewForPath(location.pathname)
  const go = (next: View) => navigate(viewToPath[next])

  const { toast, setToast, dismiss } = useToast()
  const { merchant, setMerchant, reloading } = useMerchant(setToast)
  const transpay = useTranspayStatus(setToast)
  const application = useApplication(setToast)
  useMerchantChangeWatcher(setToast)

  const [gateway, setGateway] = useState(false)
  const [switcher, setSwitcher] = useState(false)
  const [pendingApp, setPendingApp] = useState<string | null>(null)
  const [exiting, setExiting] = useState(false)

  /** Live applications are switched into; the rest open their setup journey. */
  const launch = (p: Product) => {
    setSwitcher(false)
    const live =
      p.name === "TransPay"
        ? transpay.status === "active"
        : p.status === "active"
    if (live) setPendingApp(p.name)
    else go(launchTarget(p.name))
  }

  const exitApp = () => {
    application.exitApp()
    setExiting(false)
    go("home")
    setToast("You're back in the merchant workspace.")
  }

  return (
    <Shell
      view={view}
      go={go}
      openSwitcher={() => setSwitcher(true)}
      transpayStatus={transpay.status}
      merchant={merchant}
      setMerchant={setMerchant}
      dataReloading={reloading}
      activeApp={application.app}
      exitApp={() => setExiting(true)}
      switchingApp={application.switching}
    >
      <ViewRouter
        view={view}
        go={go}
        merchant={merchant}
        setMerchant={setMerchant}
        transpayStatus={transpay.status}
        openGateway={() => setGateway(true)}
        submitTranspay={transpay.submit}
        requestAppSwitch={setPendingApp}
        activeApp={application.app}
      />
      {gateway && (
        <AccountsGateway
          close={() => setGateway(false)}
          proceed={() => {
            setGateway(false)
            go("setup")
          }}
        />
      )}
      {switcher && <AppSwitcher close={() => setSwitcher(false)} go={launch} />}
      {pendingApp && (
        <AppSwitchModal
          pending={pendingApp}
          current={application.app}
          close={() => setPendingApp(null)}
          confirm={() => {
            const name = pendingApp
            setPendingApp(null)
            application.enterApp(name, () => go(appLandingView(name)))
          }}
        />
      )}
      {exiting && application.app && (
        <AppExitModal
          app={application.app}
          close={() => setExiting(false)}
          confirm={exitApp}
        />
      )}
      {toast && <Toast message={toast} close={dismiss} />}
    </Shell>
  )
}
