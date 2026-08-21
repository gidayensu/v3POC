import { useState } from "react"
import { Activity, ChevronRight } from "lucide-react"

import { Badge } from "@/components/common"
import { settlementTabs } from "@/data/tabs"
import { SettlementTab } from "@/pages/settlement/SettlementTabs"

const recentBatches = [
  ["STL-2026-0842", "Today, 5:00 PM", "GHS 54,280.00"],
  ["STL-2026-0841", "Today, 2:00 PM", "GHS 32,140.00"],
  ["STL-2026-0840", "Yesterday, 5:00 PM", "GHS 71,650.00"],
]

const summary = [
  ["NEXT SETTLEMENT", "GHS 86,420.00", "Today at 5:00 PM"],
  ["PENDING BATCHES", "3", "2 ready · 1 under review"],
  ["SETTLED THIS MONTH", "GHS 1.24m", "42 completed batches"],
]

function SettlementOverview({ merchant }: { merchant: string }) {
  return (
    <>
      <div className="ops-summary">
        {summary.map((item) => (
          <div key={item[0]}>
            <small>{item[0]}</small>
            <h2>{item[1]}</h2>
            <p>{item[2]}</p>
          </div>
        ))}
      </div>
      <section className="ops-list">
        <header>
          <div>
            <h2>Recent settlement batches</h2>
            <p>{merchant} · Updated just now</p>
          </div>
          <button className="outline">View all batches</button>
        </header>
        {recentBatches.map((batch, i) => (
          <div key={batch[0]}>
            <span className={`ops-icon o${i}`}>
              <Activity />
            </span>
            <p>
              <b>{batch[0]}</b>
              <small>{batch[1]}</small>
            </p>
            <strong>{batch[2]}</strong>
            <Badge
              s={i === 2 ? "approved" : i === 1 ? "processing" : "pending"}
            />
            <ChevronRight />
          </div>
        ))}
      </section>
    </>
  )
}

export function SettlementPage({ merchant }: { merchant: string }) {
  const [tab, setTab] = useState("Overview")
  return (
    <div className="ops-page">
      <div className="context-tabs">
        {settlementTabs.map((item) => (
          <button
            className={tab === item ? "active" : ""}
            onClick={() => setTab(item)}
            key={item}
          >
            {item}
          </button>
        ))}
      </div>
      {tab === "Overview" ? (
        <SettlementOverview merchant={merchant} />
      ) : (
        <SettlementTab tab={tab} merchant={merchant} />
      )}
    </div>
  )
}
