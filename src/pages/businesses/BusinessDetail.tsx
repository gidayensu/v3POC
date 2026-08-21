import { useState } from "react"
import { ArrowLeft, Building2 } from "lucide-react"

import { Badge, ConfirmDialog } from "@/components/common"
import { businessTabs } from "@/data/tabs"
import { BusinessTab } from "@/pages/businesses/BusinessTabs"
import { OnboardingDetail } from "@/pages/businesses/OnboardingDetail"
import type { BusinessRecord } from "@/types"

const facts = [
  ["Registration", "CS093482016"],
  ["Merchant status", "Active"],
  ["Applications", "5 available"],
  ["Users", "8 users"],
]

export function BusinessDetail({
  business,
  merchant,
  setMerchant,
  back,
}: {
  business: BusinessRecord
  merchant: string
  setMerchant: (name: string) => void
  back: () => void
}) {
  const [tab, setTab] = useState("Overview")
  const [confirm, setConfirm] = useState("")
  return (
    <div className="business-detail">
      <button className="back-link" onClick={back}>
        <ArrowLeft />
        All businesses
      </button>
      {business.status === "approved" ? (
        <>
          <div className="business-detail-head">
            <span className="business-avatar">{business.initials}</span>
            <div>
              <h2>{business.name}</h2>
              <p>{business.kind} · Ghana</p>
            </div>
            <Badge s="approved" />
            <button
              className="primary"
              disabled={merchant === business.name}
              onClick={() => setConfirm(business.name)}
            >
              {merchant === business.name
                ? "Current business"
                : "Switch to this business"}
            </button>
          </div>
          <div className="business-facts">
            {facts.map(([label, value]) => (
              <div key={label}>
                <small>{label}</small>
                <b>{value}</b>
              </div>
            ))}
          </div>
          <div className="business-detail-tabs">
            {businessTabs.map((item) => (
              <button
                className={tab === item ? "active" : ""}
                onClick={() => setTab(item)}
                key={item}
              >
                {item}
              </button>
            ))}
          </div>
          <BusinessTab tab={tab} business={business} />
        </>
      ) : (
        <OnboardingDetail business={business} />
      )}
      {confirm && (
        <ConfirmDialog
          icon={<Building2 />}
          title="Switch business?"
          confirmLabel="Switch business"
          close={() => setConfirm("")}
          confirm={() => {
            setMerchant(confirm)
            setConfirm("")
          }}
        >
          <p>
            You're about to switch from <b>{merchant}</b> to <b>{confirm}</b>.
            Your applications and permissions will update to reflect this
            business.
          </p>
        </ConfirmDialog>
      )}
    </div>
  )
}
