import { ChevronRight, ShieldCheck, X } from "lucide-react"

import { Overlay } from "@/components/common"

export function MerchantChangeModal({
  activeEmail,
  requestedEmail,
  setRequestedEmail,
  submitting,
  submit,
  close,
}: {
  activeEmail: string
  requestedEmail: string
  setRequestedEmail: (value: string) => void
  submitting: boolean
  submit: () => void
  close: () => void
}) {
  return (
    <Overlay>
      <section className="change request-change">
        <header>
          <div>
            <h2>Request merchant change</h2>
            <p>
              The current value stays active until this request is approved.
            </p>
          </div>
          <button onClick={close}>
            <X />
          </button>
        </header>
        <div className="value-compare">
          <div>
            <small>CURRENT VALUE</small>
            <b>{activeEmail}</b>
          </div>
          <ChevronRight />
          <label>
            REQUESTED VALUE
            <input
              autoFocus
              value={requestedEmail}
              onChange={(e) => setRequestedEmail(e.target.value)}
              placeholder="finance@acmegroup.com"
            />
          </label>
        </div>
        <label className="field">
          Reason for change
          <textarea defaultValue="Update the primary finance contact for merchant communications." />
        </label>
        <div className="approval-note">
          <ShieldCheck />
          <p>
            <b>Approval required</b>
            <span>
              No active merchant data changes until review is complete.
            </span>
          </p>
        </div>
        <footer>
          <button className="outline" onClick={close}>
            Cancel
          </button>
          <button
            className="primary"
            disabled={submitting || !requestedEmail.includes("@")}
            onClick={submit}
          >
            {submitting ? (
              <>
                <span className="spinner light" />
                Submitting…
              </>
            ) : (
              "Review & submit"
            )}
          </button>
        </footer>
      </section>
    </Overlay>
  )
}
