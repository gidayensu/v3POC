import { Clock3, Landmark } from "lucide-react"

import { Badge } from "@/components/common"

/** Right-hand rail summarising the Accounts setup wizard. */
export function SetupSummary() {
  return (
    <aside className="summary">
      <h3>Application</h3>
      <p>
        <Landmark />
        Accounts
      </p>
      <hr />
      <h3>Merchant</h3>
      <p>
        <span>ACME</span>Acme Trading Ltd
      </p>
      <Badge s="approved" />
      <hr />
      <h3>Setup progress</h3>
      <p>2 of 4 steps</p>
      <div className="progress">
        <i />
      </div>
      <b>Link account</b>
      <small>Current step</small>
      <hr />
      <h3>Approval required</h3>
      <p className="muted">Some account access requires additional approval.</p>
      <hr />
      <h3>
        <Clock3 /> Estimated time
      </h3>
      <b>4 minutes</b>
    </aside>
  )
}
