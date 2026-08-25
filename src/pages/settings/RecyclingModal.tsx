import { useState } from "react"
import { AlertTriangle, Recycle, X } from "lucide-react"

import { Overlay, PageActionButton } from "@/components/common"
import { prepaidAccount } from "@/pages/settings/useSettlementDestination"

const points = [
  [
    "Your money is not paid out to a bank",
    "Settlement funds are credited to your prepaid account instead of being transferred to a bank account.",
  ],
  [
    "The balance is yours to spend or withdraw",
    "Recycled funds top up your spending balance and can be used across Transflow applications, or withdrawn later.",
  ],
  [
    "Only one destination stays active",
    "Turning on recycling retires your settlement bank account. You can request a bank account again at any time.",
  ],
]

export function RecyclingModal({
  currentLabel,
  close,
  review,
}: {
  currentLabel: string
  close: () => void
  review: () => void
}) {
  const [understood, setUnderstood] = useState(false)
  return (
    <Overlay>
      <section className="change recycle-modal">
        <header>
          <div>
            <h2>Recycle settlement into your prepaid account</h2>
            <p>
              {currentLabel} stays live until Transflow approves this request.
            </p>
          </div>
          <button onClick={close}>
            <X />
          </button>
        </header>

        <div className="recycle-hero">
          <span>
            <Recycle />
          </span>
          <p>
            <b>{prepaidAccount.accountName} ••••{prepaidAccount.last4}</b>
            <span>
              Every settlement batch is deposited here instead of a bank.
            </span>
          </p>
        </div>

        <ul className="recycle-points">
          {points.map(([title, body]) => (
            <li key={title}>
              <b>{title}</b>
              <small>{body}</small>
            </li>
          ))}
        </ul>

        <div className="recycle-warning">
          <AlertTriangle />
          <p>
            <b>No bank transfers while recycling is on</b>
            <span>
              If you need funds in a bank, withdraw from the prepaid account or
              request a settlement bank account again.
            </span>
          </p>
        </div>

        <label className="consent-check">
          <input
            type="checkbox"
            checked={understood}
            onChange={(e) => setUnderstood(e.target.checked)}
          />
          <span>
            I understand settlement funds will be held in our prepaid account
            and will not be paid into a bank account.
          </span>
        </label>

        <footer>
          <PageActionButton variant="outline" onClick={close}>
            Cancel
          </PageActionButton>
          <PageActionButton disabled={!understood} onClick={review}>
            Review & submit
          </PageActionButton>
        </footer>
      </section>
    </Overlay>
  )
}
