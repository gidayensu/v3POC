import {
  CheckCircle2,
  CircleHelp,
  Clock3,
  FileText,
  ShieldCheck,
} from "lucide-react"

import { Badge } from "@/components/common"

function BatchesTab({ merchant }: { merchant: string }) {
  const batches = [
    [
      "STL-2026-0842",
      "Aug 20, 2026 · 5:00 PM",
      "126",
      "GHS 54,280.00",
      "pending",
    ],
    [
      "STL-2026-0841",
      "Aug 20, 2026 · 2:00 PM",
      "84",
      "GHS 32,140.00",
      "processing",
    ],
    [
      "STL-2026-0840",
      "Aug 19, 2026 · 5:00 PM",
      "191",
      "GHS 71,650.00",
      "approved",
    ],
    [
      "STL-2026-0839",
      "Aug 19, 2026 · 2:00 PM",
      "57",
      "GHS 24,810.00",
      "approved",
    ],
  ]
  return (
    <section className="data-view">
      <div className="data-toolbar">
        <div>
          <h2>Settlement batches</h2>
          <p>All scheduled and completed batches for {merchant}.</p>
        </div>
        <div>
          <button className="outline">Export</button>
          <button className="primary">Create batch</button>
        </div>
      </div>
      <div className="filter-row">
        <button className="active">
          All <span>48</span>
        </button>
        <button>
          Scheduled <span>3</span>
        </button>
        <button>
          Processing <span>1</span>
        </button>
        <button>
          Completed <span>44</span>
        </button>
      </div>
      <div className="data-table">
        <header>
          <span>Batch</span>
          <span>Settlement date</span>
          <span>Transactions</span>
          <span>Amount</span>
          <span>Status</span>
        </header>
        {batches.map((batch) => (
          <button key={batch[0]}>
            <b>{batch[0]}</b>
            <span>{batch[1]}</span>
            <span>{batch[2]}</span>
            <strong>{batch[3]}</strong>
            <Badge s={batch[4]} />
          </button>
        ))}
      </div>
    </section>
  )
}

function ReconciliationTab() {
  const rows = [
    ["STL-2026-0840", "GHS 71,650.00", "GHS 71,650.00", "GHS 0.00", "approved"],
    [
      "STL-2026-0839",
      "GHS 24,810.00",
      "GHS 23,570.00",
      "GHS 1,240.00",
      "pending",
    ],
  ]
  return (
    <section className="data-view">
      <div className="data-toolbar">
        <div>
          <h2>Reconciliation</h2>
          <p>Compare expected settlement values with received funds.</p>
        </div>
        <button className="outline">Download report</button>
      </div>
      <div className="recon-summary">
        <div>
          <CheckCircle2 />
          <p>
            <small>MATCHED</small>
            <b>GHS 1,186,420.00</b>
            <span>39 batches</span>
          </p>
        </div>
        <div>
          <Clock3 />
          <p>
            <small>IN REVIEW</small>
            <b>GHS 38,540.00</b>
            <span>2 batches</span>
          </p>
        </div>
        <div>
          <CircleHelp />
          <p>
            <small>VARIANCE</small>
            <b>GHS 1,240.00</b>
            <span>1 batch needs attention</span>
          </p>
        </div>
      </div>
      <div className="data-table">
        <header>
          <span>Batch</span>
          <span>Expected</span>
          <span>Received</span>
          <span>Variance</span>
          <span>Result</span>
        </header>
        {rows.map((row) => (
          <button key={row[0]}>
            <b>{row[0]}</b>
            <span>{row[1]}</span>
            <span>{row[2]}</span>
            <strong>{row[3]}</strong>
            <Badge s={row[4]} />
          </button>
        ))}
      </div>
    </section>
  )
}

function ReportsTab() {
  const reports = [
    ["Monthly settlement summary", "August 2026 · PDF", "Generated today"],
    ["Transaction reconciliation export", "Aug 1–20 · CSV", "Generated today"],
    ["Settlement fee statement", "July 2026 · PDF", "Generated Aug 1"],
  ]
  return (
    <section className="data-view">
      <div className="data-toolbar">
        <div>
          <h2>Settlement reports</h2>
          <p>Prepared exports for finance and reconciliation teams.</p>
        </div>
        <button className="primary">Create report</button>
      </div>
      <div className="report-list">
        {reports.map((report, i) => (
          <article key={report[0]}>
            <span>
              <FileText />
            </span>
            <p>
              <b>{report[0]}</b>
              <small>
                {report[1]} · {report[2]}
              </small>
            </p>
            <Badge s={i ? "approved" : "processing"} />
            <button className="outline">Download</button>
          </article>
        ))}
      </div>
    </section>
  )
}

function ConfigurationTab({ merchant }: { merchant: string }) {
  const rows = [
    ["Primary settlement account", "Operating Account ••••4587"],
    ["Settlement schedule", "Twice daily · 2:00 PM and 5:00 PM"],
    ["Settlement currency", "Ghanaian Cedi (GHS)"],
    ["Minimum batch value", "GHS 100.00"],
    ["Failure notifications", "settlements@acmetrading.com"],
  ]
  return (
    <section className="data-view">
      <div className="data-toolbar">
        <div>
          <h2>Settlement configuration</h2>
          <p>Current approved settings for {merchant}.</p>
        </div>
        <button className="outline">Request a change</button>
      </div>
      <div className="config-rows">
        {rows.map((row) => (
          <div key={row[0]}>
            <span>{row[0]}</span>
            <b>{row[1]}</b>
          </div>
        ))}
      </div>
      <div className="activation-note">
        <ShieldCheck />
        <p>
          <b>Configuration changes require approval</b>
          <span>
            Your active configuration remains unchanged while a request is
            reviewed.
          </span>
        </p>
      </div>
    </section>
  )
}

export function SettlementTab({
  tab,
  merchant,
}: {
  tab: string
  merchant: string
}) {
  if (tab === "Batches") return <BatchesTab merchant={merchant} />
  if (tab === "Reconciliation") return <ReconciliationTab />
  if (tab === "Reports") return <ReportsTab />
  return <ConfigurationTab merchant={merchant} />
}
