import { useState } from "react"
import { CheckCircle2, Clock3 } from "lucide-react"

import { Badge } from "@/components/common"
import { merchantSettingsTabs } from "@/data/tabs"
import { BankSettings } from "@/pages/settings/BankSettings"
import { BrandSettings } from "@/pages/settings/BrandSettings"
import { BusinessDetails } from "@/pages/settings/BusinessDetails"
import { MerchantChangeModal } from "@/pages/settings/MerchantChangeModal"
import { SetupRequests } from "@/pages/settings/SetupRequests"
import { useMerchantChange } from "@/pages/settings/useMerchantChange"

function ChangeStatusBanner({ status }: { status: string }) {
  if (status === "pending")
    return (
      <div className="pending-change">
        <Clock3 />
        <p>
          <b>Change request pending approval</b>
          <span>
            Your current business email remains active while
            finance@acmegroup.com is reviewed.
          </span>
        </p>
        <Badge s="pending" />
      </div>
    )
  if (status === "approved")
    return (
      <div className="saved">
        <CheckCircle2 />
        <p>
          <b>Merchant change approved</b>
          <span>The requested business email is now active.</span>
        </p>
      </div>
    )
  return null
}

export function SettingsPage({
  merchant = "Acme Trading Ltd",
}: {
  merchant?: string
}) {
  const [tab, setTab] = useState("Business details")
  const [requestOpen, setRequestOpen] = useState(false)
  const change = useMerchantChange()
  return (
    <div className="settings-layout">
      <aside className="settings-tabs">
        <h3>Merchant settings</h3>
        {merchantSettingsTabs.map((item) => (
          <button
            className={tab === item ? "active" : ""}
            onClick={() => setTab(item)}
            key={item}
          >
            {item}
          </button>
        ))}
      </aside>
      <section className="settings-content">
        <ChangeStatusBanner status={change.status} />
        {tab === "Business details" && (
          <BusinessDetails
            merchant={merchant}
            activeEmail={change.activeEmail}
            requestPending={change.status === "pending"}
            requestChange={() => setRequestOpen(true)}
          />
        )}
        {tab === "Bank accounts" && <BankSettings />}
        {tab === "Branding" && <BrandSettings />}
        {tab === "Setup requests" && <SetupRequests />}
      </section>
      {requestOpen && (
        <MerchantChangeModal
          activeEmail={change.activeEmail}
          requestedEmail={change.requestedEmail}
          setRequestedEmail={change.setRequestedEmail}
          submitting={change.submitting}
          submit={() => change.submit(() => setRequestOpen(false))}
          close={() => setRequestOpen(false)}
        />
      )}
    </div>
  )
}
