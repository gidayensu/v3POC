import { useState } from "react"
import { Landmark, MoreHorizontal, Plus, SlidersHorizontal } from "lucide-react"

import { Badge, PageActionButton } from "@/components/common"

const accounts = [
  [
    "Titan Trust Bank",
    "Operating Account",
    "4587",
    "Primary settlement",
    "approved",
  ],
  [
    "Guardian Commercial Bank",
    "Reserve Account",
    "2196",
    "Eligibility review required",
    "pending",
  ],
]

export function BankSettings() {
  const [requested, setRequested] = useState(false)
  return (
    <>
      <div className="setting-head">
        <div>
          <h2>Bank accounts</h2>
          <p>Accounts available to Transflow applications for this merchant.</p>
        </div>
        <PageActionButton icon={Plus}>Request bank account</PageActionButton>
      </div>
      <div className="bank-settings">
        {accounts.map(([bank, name, last, note, status]) => (
          <article key={last}>
            <div className="bank-logo">
              <Landmark />
            </div>
            <div>
              <h3>{bank}</h3>
              <p>
                {name} •••• {last}
              </p>
              <small>GHS · {note}</small>
            </div>
            <Badge s={status} />
            <button>
              <MoreHorizontal />
            </button>
          </article>
        ))}
      </div>
      <section className="request-card">
        <SlidersHorizontal />
        <div>
          <h3>Need a different account setup?</h3>
          <p>
            Request settlement routing, reserve-account eligibility, or
            multi-account access.
          </p>
        </div>
        <PageActionButton variant="outline" onClick={() => setRequested(true)}>
          {requested ? "Request submitted" : "Request setup"}
        </PageActionButton>
      </section>
    </>
  )
}
