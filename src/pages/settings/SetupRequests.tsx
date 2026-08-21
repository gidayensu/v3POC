import { FileText, Plus } from "lucide-react"

import { Badge } from "@/components/common"

const requests = [
  [
    "Reserve account eligibility",
    "Guardian Commercial Bank ••••2196",
    "In review",
  ],
  [
    "Additional settlement currency",
    "Enable USD settlement",
    "Information required",
  ],
  ["Payment descriptor update", "ACME TRADING", "Completed"],
]

export function SetupRequests() {
  return (
    <>
      <div className="setting-head">
        <div>
          <h2>Setup requests</h2>
          <p>Track requests that affect shared merchant services.</p>
        </div>
        <button className="primary">
          <Plus />
          New request
        </button>
      </div>
      <div className="request-list">
        {requests.map((request, i) => (
          <article key={request[0]}>
            <span className={`request-icon r${i}`}>
              <FileText />
            </span>
            <p>
              <b>{request[0]}</b>
              <small>{request[1]}</small>
            </p>
            <Badge s={i === 2 ? "approved" : "pending"} />
            <button className="outline">View</button>
          </article>
        ))}
      </div>
    </>
  )
}
