import { Banknote, ChevronDown, ChevronRight, Landmark } from "lucide-react"

import { Badge, FileTypeIcon } from "@/components/common"

function ActivityTab({ merchant }: { merchant: string }) {
  const activity = [
    [
      "Settlement received",
      "STL-2026-0840 · Today, 2:06 PM",
      "+ GHS 71,650.00",
      "in",
    ],
    [
      "Supplier payment",
      "Apex Office Supplies · Today, 11:42 AM",
      "− GHS 18,400.00",
      "out",
    ],
    [
      "Transfer between accounts",
      "Reserve Account · Yesterday, 4:15 PM",
      "− GHS 25,000.00",
      "out",
    ],
    [
      "Customer payment",
      "Invoice INV-38291 · Yesterday, 10:21 AM",
      "+ GHS 53,160.00",
      "in",
    ],
  ]
  return (
    <section className="data-view">
      <div className="data-toolbar">
        <div>
          <h2>Account activity</h2>
          <p>Recent activity across accounts belonging to {merchant}.</p>
        </div>
        <div>
          <button className="outline">Filters</button>
          <button className="outline">Export</button>
        </div>
      </div>
      <div className="activity-balance">
        <span>
          Closing balance <b>GHS 248,920.42</b>
        </span>
        <span>
          Money in <b className="positive">+ GHS 124,810.00</b>
        </span>
        <span>
          Money out <b>- GHS 86,420.00</b>
        </span>
      </div>
      <div className="activity-list">
        {activity.map((entry, i) => (
          <button key={entry[1]}>
            <span className={`activity-icon a${i}`}>
              <Banknote />
            </span>
            <p>
              <b>{entry[0]}</b>
              <small>{entry[1]}</small>
            </p>
            <strong className={entry[3] === "in" ? "positive" : ""}>
              {entry[2]}
            </strong>
            <ChevronRight />
          </button>
        ))}
      </div>
    </section>
  )
}

function StatementsTab() {
  const statements = [
    ["August 2026", "Aug 1–20 · Current period", "Not final"],
    ["July 2026", "Jul 1–31 · 148 transactions", "Ready"],
    ["June 2026", "Jun 1–30 · 121 transactions", "Ready"],
    ["May 2026", "May 1–31 · 136 transactions", "Ready"],
  ]
  return (
    <section className="data-view">
      <div className="data-toolbar">
        <div>
          <h2>Statements</h2>
          <p>Monthly statements for your connected business accounts.</p>
        </div>
        <button className="outline">Statement preferences</button>
      </div>
      <div className="statement-account">
        <Landmark />
        <p>
          <b>Operating Account ••••4587</b>
          <small>Titan Trust Bank · GHS</small>
        </p>
        <ChevronDown />
      </div>
      <div className="report-list">
        {statements.map((statement, i) => (
          <article key={statement[0]}>
            <FileTypeIcon meta={statement[1]} className="size-9.5" />
            <p>
              <b>{statement[0]}</b>
              <small>{statement[1]}</small>
            </p>
            <Badge s={i ? "approved" : "processing"} />
            <button className="outline">{i ? "Download" : "Preview"}</button>
          </article>
        ))}
      </div>
    </section>
  )
}

export function BalancesTab({
  tab,
  merchant,
}: {
  tab: string
  merchant: string
}) {
  if (tab === "Account activity") return <ActivityTab merchant={merchant} />
  return <StatementsTab />
}
