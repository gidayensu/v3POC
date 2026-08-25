import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { Toast } from "@/components/common"
import { AppSwitcher, Shell } from "@/components/layout"
import { AppExitModal } from "@/components/layout/AppExitModal"
import { AppSwitchModal } from "@/components/layout/AppSwitchModal"
import { ProductAccessSwitchModal } from "@/components/layout/ProductAccessSwitchModal"
import { appLandingView } from "@/data/appNavigation"
import { useApplication } from "@/hooks/useApplication"
import { useMerchant, useMerchantChangeWatcher } from "@/hooks/useMerchant"
import { useProductAccess } from "@/hooks/useProductAccess"
import { useToast } from "@/hooks/useToast"
import { useTranspayStatus } from "@/hooks/useTranspayStatus"
import { viewForPath, viewToPath } from "@/lib/routes"
import { AccountsGateway } from "@/pages/accounts/AccountsGateway"
import { ViewRouter } from "@/pages/ViewRouter"
import type { Product, SwitchableBusiness, View } from "@/types"

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
  const productAccess = useProductAccess()
  useMerchantChangeWatcher(setToast)

  const [gateway, setGateway] = useState(false)
  const [switcher, setSwitcher] = useState(false)
  const [pendingApp, setPendingApp] = useState<string | null>(null)
  const [exiting, setExiting] = useState(false)
  const [pendingAccess, setPendingAccess] = useState<SwitchableBusiness | null>(
    null
  )

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

  /**
   * Switching into a business we only hold a seat on: the business changes,
   * then its application opens under the chosen role. Both halves are
   * announced together, so the switch reads as the single act it is.
   */
  const assumeProductAccess = (role: string) => {
    const business = pendingAccess
    if (!business) return
    const app = business.productApp || ""
    setPendingAccess(null)
    productAccess.assume(role, merchant)
    setMerchant(business.name, {
      silent: true,
      done: () =>
        application.enterApp(
          app,
          () => go(appLandingView(app)),
          `You're in ${business.name} as ${role}. ${app} is scoped to this role.`
        ),
    })
  }

  /**
   * Switching straight to another business from the topbar leaves a
   * product-access context the same way exiting the application does: the
   * seat, and the application it was held on, go with it.
   */
  const switchBusiness = (name: string) => {
    if (productAccess.returnTo && name !== merchant) {
      productAccess.release()
      application.exitApp()
      go("home")
    }
    setMerchant(name)
  }

  const exitApp = () => {
    const app = application.app
    const returnTo = productAccess.returnTo
    application.exitApp()
    setExiting(false)
    /* A seat on someone else's business is the only reason we were in that
       business, so leaving the application returns us to our own. */
    if (returnTo) {
      const left = merchant
      productAccess.release()
      go("home")
      setMerchant(returnTo, {
        silent: true,
        done: () =>
          setToast(
            `You've left ${app} and ${left}. You're back in ${returnTo}.`
          ),
      })
      return
    }
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
      setMerchant={switchBusiness}
      dataReloading={reloading}
      activeApp={application.app}
      exitApp={() => setExiting(true)}
      switchingApp={application.switching}
      requestProductAccess={setPendingAccess}
      assumedRole={productAccess.role}
    >
      <ViewRouter
        view={view}
        go={go}
        merchant={merchant}
        setMerchant={switchBusiness}
        requestProductAccess={setPendingAccess}
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
      {switcher && (
        <AppSwitcher
          close={() => setSwitcher(false)}
          go={launch}
          goView={go}
          activeApp={application.app}
        />
      )}
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
      {pendingAccess && (
        <ProductAccessSwitchModal
          pending={pendingAccess}
          merchant={merchant}
          close={() => setPendingAccess(null)}
          confirm={assumeProductAccess}
        />
      )}
      {exiting && application.app && (
        <AppExitModal
          app={application.app}
          /* Named only while the seat is what put us in this business, so the
             prompt can say that leaving the app leaves the business too. */
          productAccessBusiness={productAccess.returnTo ? merchant : null}
          returnBusiness={productAccess.returnTo}
          close={() => setExiting(false)}
          confirm={exitApp}
        />
      )}
      {toast && <Toast message={toast} close={dismiss} />}
    </Shell>
  )
}
