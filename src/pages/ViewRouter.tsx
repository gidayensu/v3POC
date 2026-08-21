import { Page } from "@/components/common"
import { ApplicationsPage } from "@/pages/applications/ApplicationsPage"
import { ApprovalsPage } from "@/pages/ApprovalsPage"
import { AuditPage } from "@/pages/AuditPage"
import { AccountsConfigPage } from "@/pages/accounts/AccountsConfigPage"
import { AccountsSetupPage } from "@/pages/accounts/AccountsSetupPage"
import { BalancesPage } from "@/pages/balances/BalancesPage"
import { BusinessesPage } from "@/pages/businesses/BusinessesPage"
import { HomePage } from "@/pages/home/HomePage"
import { ProductPage } from "@/pages/ProductPage"
import { SettingsPage } from "@/pages/settings/SettingsPage"
import { SettlementPage } from "@/pages/settlement/SettlementPage"
import { SupportPage } from "@/pages/SupportPage"
import { TransPayProcessingPage } from "@/pages/transpay/TransPayProcessingPage"
import { TransPayReadyPage } from "@/pages/transpay/TransPayReadyPage"
import { TransPaySetupPage } from "@/pages/transpay/TransPaySetupPage"
import { UsersPage } from "@/pages/UsersPage"
import type { TranspayStatus, View } from "@/types"

/** Title and subtitle for the views that render inside a standard page header. */
const pageMeta: Record<string, [string, string]> = {
  businesses: ["Businesses", "Manage business profiles and relationships."],
  users: ["Users & access", "Control access to businesses and applications."],
  approvals: [
    "Approvals",
    "Review and track requests across your organisation.",
  ],
  audit: ["Activity logs", "Every important event across your applications."],
  support: ["Support", "Get help with Merchant Suite and your applications."],
  settings: ["Settings", "Manage shared merchant details and services."],
  settlement: ["Settlement", "Track settlement batches and reconciliation."],
  balances: ["Balances", "View available and ledger balances across accounts."],
  product: [
    "RPay overview",
    "Collections, reconciliation and recent activity.",
  ],
}

type RouterProps = {
  view: View
  go: (view: View) => void
  merchant: string
  setMerchant: (name: string) => void
  transpayStatus: TranspayStatus
  openGateway: () => void
  submitTranspay: () => void
  requestAppSwitch: (app: string) => void
  activeApp: string | null
}

function StandardPage({ view, merchant, setMerchant, activeApp }: RouterProps) {
  const [title, sub] = pageMeta[view] || pageMeta.product
  const heading =
    view === "product" && activeApp ? `${activeApp} overview` : title
  return (
    <Page title={heading} sub={sub}>
      {view === "users" ? (
        <UsersPage merchant={merchant} />
      ) : view === "approvals" ? (
        <ApprovalsPage />
      ) : view === "businesses" ? (
        <BusinessesPage merchant={merchant} setMerchant={setMerchant} />
      ) : view === "audit" ? (
        <AuditPage />
      ) : view === "support" ? (
        <SupportPage />
      ) : view === "settings" ? (
        <SettingsPage merchant={merchant} />
      ) : view === "settlement" ? (
        <SettlementPage merchant={merchant} />
      ) : view === "balances" ? (
        <BalancesPage merchant={merchant} />
      ) : (
        <ProductPage />
      )}
    </Page>
  )
}

/** Renders the page for the current view. */
export function ViewRouter(props: RouterProps) {
  const { view, go, transpayStatus, openGateway, submitTranspay } = props
  const toApplications = () => go("applications")

  if (view === "home")
    return (
      <HomePage
        go={go}
        gateway={openGateway}
        requestAppSwitch={props.requestAppSwitch}
      />
    )
  if (view === "applications")
    return (
      <ApplicationsPage
        go={go}
        transpayStatus={transpayStatus}
        merchant={props.merchant}
        requestAppSwitch={props.requestAppSwitch}
      />
    )
  if (view === "setup")
    return (
      <AccountsSetupPage back={toApplications} done={() => go("accounts")} />
    )
  if (view === "accounts") return <AccountsConfigPage back={toApplications} />
  if (view === "transpay-setup") {
    if (transpayStatus === "processing")
      return <TransPayProcessingPage back={toApplications} />
    if (transpayStatus === "active")
      return <TransPayReadyPage back={toApplications} />
    return <TransPaySetupPage back={toApplications} done={submitTranspay} />
  }
  return <StandardPage {...props} />
}
