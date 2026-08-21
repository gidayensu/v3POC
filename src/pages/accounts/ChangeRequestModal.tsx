import { useState } from "react"
import {
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Landmark,
  Upload,
  UserRound,
  Users,
  X,
} from "lucide-react"

import { Overlay } from "@/components/common"

const changeTypes = [
  [Landmark, "Connected account", "Change the operating account used"],
  [Users, "Permissions", "Change users and access"],
  [UserRound, "User access", "Change users and access"],
] as const

function SubmittedState({ close }: { close: () => void }) {
  return (
    <Overlay>
      <section className="success">
        <span>
          <Check />
        </span>
        <h2>Change request submitted</h2>
        <p>Version 1 remains active while version 2 is reviewed.</p>
        <button className="primary" onClick={close}>
          View configuration
        </button>
      </section>
    </Overlay>
  )
}

/** Requests a change to the active Accounts configuration. */
export function ChangeRequestModal({ close }: { close: () => void }) {
  const [sent, setSent] = useState(false)
  if (sent) return <SubmittedState close={close} />
  return (
    <Overlay>
      <section className="change">
        <header>
          <div>
            <h2>Request configuration change</h2>
            <p>
              The active configuration remains in effect until this request is
              approved.
            </p>
          </div>
          <button onClick={close}>
            <X />
          </button>
        </header>
        <h3>What would you like to change?</h3>
        <div className="changetypes">
          {changeTypes.map(([I, title, desc], i) => (
            <button className={i ? "" : "selected"} key={title}>
              <i />
              <I />
              <b>{title}</b>
              <small>{desc}</small>
            </button>
          ))}
        </div>
        <div className="compare">
          <label>
            Current value
            <div>
              <Landmark />
              <p>
                <b>Operating Account ••••4587</b>
                <small>Titan Trust Bank</small>
              </p>
            </div>
          </label>
          <ChevronRight />
          <label>
            Proposed value
            <div>
              <Landmark />
              <p>
                <b>Reserve Account ••••2196</b>
                <small>Titan Trust Bank</small>
              </p>
            </div>
            <em>Eligibility review required.</em>
          </label>
        </div>
        <label className="field">
          Reason for change (required)
          <textarea defaultValue="Move reporting access to our primary reserve account." />
        </label>
        <label className="field">
          Upload supporting document (optional)
          <div className="upload">
            <Upload />
            <span>
              Drag and drop a file here, or <b>browse</b>
              <small>PDF, PNG, JPG up to 10MB</small>
            </span>
          </div>
        </label>
        <div className="impact">
          <b>Impact summary</b>
          <div>
            <span>
              <CheckCircle2 />
              Existing balances remain available.
            </span>
            <span>
              <Clock3 />
              No changes until approved.
            </span>
            <span>
              <Users />
              Users will be notified.
            </span>
          </div>
        </div>
        <footer>
          <button className="outline" onClick={close}>
            Cancel
          </button>
          <button className="outline">Save draft</button>
          <button className="primary" onClick={() => setSent(true)}>
            Review change
          </button>
        </footer>
      </section>
    </Overlay>
  )
}
