import { useState } from "react"
import { ArrowLeft, Building2 } from "lucide-react"

import { Badge, ConfirmDialog, PageActionButton } from "@/components/common"
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
  const current = merchant === business.name
  return (
    <div className="max-w-[1050px]">
      <button
        type="button"
        className="mb-5 inline-flex items-center gap-2 border-0 bg-transparent p-0 text-sm font-semibold text-[#0b3565] transition-colors outline-none hover:text-[#002047] focus-visible:underline"
        onClick={back}
      >
        <ArrowLeft aria-hidden="true" className="size-4.5" />
        All businesses
      </button>

      {business.status === "approved" ? (
        <div className="flex flex-col gap-6">
          <header className="flex flex-wrap items-center gap-4 rounded-xl bg-white p-6 shadow-[0_1px_2px_rgb(16_29_66/0.04)]">
            <span className="grid size-14 shrink-0 place-items-center rounded-lg bg-[#eef3fa] text-sm font-bold tracking-[0.04em] text-[#0b3565]">
              {business.initials}
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="m-0 truncate text-xl font-bold tracking-[-0.01em] text-[#101d42]">
                {business.name}
              </h2>
              <p className="mt-1 mb-0 text-sm text-[#667085]">
                {business.kind} · Ghana
              </p>
            </div>
            <Badge s="approved" />
            <PageActionButton
              disabled={current}
              onClick={() => setConfirm(business.name)}
            >
              {current ? "Current business" : "Switch to this business"}
            </PageActionButton>
          </header>

          <div className="grid gap-px overflow-hidden rounded-xl bg-[#e7ecf3] shadow-[0_1px_2px_rgb(16_29_66/0.04)] sm:grid-cols-2 xl:grid-cols-4">
            {facts.map(([label, value]) => (
              <div key={label} className="bg-white px-6 py-5">
                <small className="block text-xs font-semibold tracking-[0.06em] text-[#8792a8] uppercase">
                  {label}
                </small>
                <b className="mt-1.5 block text-[15px] font-bold text-[#101d42]">
                  {value}
                </b>
              </div>
            ))}
          </div>

          {/* Tabs read in the sidebar's ink, so navigation stays one colour. */}
          <div className="flex scrollbar-none gap-1 overflow-x-auto border-b border-[#e2e7ef]">
            {businessTabs.map((item) => (
              <button
                key={item}
                type="button"
                className={`-mb-px cursor-pointer border-0 border-b-2 bg-transparent px-4 pb-3 text-sm whitespace-nowrap transition-colors ${
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

          <BusinessTab tab={tab} business={business} />
        </div>
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
