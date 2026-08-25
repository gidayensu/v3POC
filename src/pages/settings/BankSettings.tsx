import { useState } from "react"
import {
  CheckCircle2,
  Clock3,
  Info,
  Landmark,
  MoreHorizontal,
  Plus,
  Recycle,
  SlidersHorizontal,
} from "lucide-react"

import { Badge, PageActionButton } from "@/components/common"
import { bankById, settlementBanks } from "@/data/banks"
import { BankAccountModal } from "@/pages/settings/BankAccountModal"
import { RecyclingModal } from "@/pages/settings/RecyclingModal"
import { SettlementConfirmModal } from "@/pages/settings/SettlementConfirmModal"
import {
  prepaidAccount,
  useSettlementDestination,
  type Destination,
} from "@/pages/settings/useSettlementDestination"

/** One place to turn a destination into the copy every card and modal shows. */
function describe(destination: Destination) {
  if (destination.kind === "prepaid")
    return {
      title: "Prepaid account · Recycling",
      detail: `${destination.accountName} •••• ${destination.last4}`,
      note: "GHS · Settlement recycled into your prepaid balance",
      logo: undefined,
    }
  const bank = bankById(destination.bankId)
  return {
    title: bank?.name || "Settlement bank account",
    detail: `${destination.accountName} •••• ${destination.last4}`,
    note: "GHS · Primary settlement",
    logo: bank?.logo,
  }
}

function DestinationCard({
  destination,
  status,
}: {
  destination: Destination
  status: string
}) {
  const { title, detail, note, logo } = describe(destination)
  return (
    <article>
      <div className={logo ? "bank-logo image" : "bank-logo"}>
        {logo ? <img src={logo} alt="" /> : <Recycle />}
      </div>
      <div>
        <h3>{title}</h3>
        <p>{detail}</p>
        <small>{note}</small>
      </div>
      <Badge s={status} />
      <button>
        <MoreHorizontal />
      </button>
    </article>
  )
}

export function BankSettings() {
  const { destination, pending, submitting, approved, request } =
    useSettlementDestination()
  const [bankOpen, setBankOpen] = useState(false)
  const [recycleOpen, setRecycleOpen] = useState(false)
  const [draft, setDraft] = useState<Destination | null>(null)
  const [requested, setRequested] = useState(false)

  const current = describe(destination)
  const locked = !!pending
  const onPrepaid = destination.kind === "prepaid"

  const submit = () => {
    if (!draft) return
    request(draft, () => setDraft(null))
  }

  return (
    <>
      <div className="setting-head">
        <div>
          <h2>Settlement account</h2>
          <p>Where Transflow deposits settlement funds for this merchant.</p>
        </div>
        <PageActionButton
          icon={Plus}
          disabled={locked}
          onClick={() => setBankOpen(true)}
        >
          Add bank account
        </PageActionButton>
      </div>

      <div className="single-destination">
        <Info />
        <p>
          <b>One settlement destination at a time</b>
          <span>
            A merchant can hold a single settlement bank account. Adding a new
            account — or switching to prepaid recycling — replaces the current
            destination once Transflow approves the request.
          </span>
        </p>
      </div>

      {pending && (
        <div className="pending-change">
          <Clock3 />
          <p>
            <b>Settlement change pending approval</b>
            <span>
              {current.title} keeps receiving settlement until{" "}
              {describe(pending).title} is approved.
            </span>
          </p>
          <Badge s="pending" />
        </div>
      )}
      {approved && !pending && (
        <div className="saved">
          <CheckCircle2 />
          <p>
            <b>Settlement change approved</b>
            <span>
              {current.title} is now your active settlement destination.
            </span>
          </p>
          <Badge s="approved" />
        </div>
      )}

      <h3 className="settle-subhead">Active destination</h3>
      <div className="bank-settings">
        <DestinationCard destination={destination} status="active" />
      </div>
      {pending && (
        <div className="bank-settings requested-destination">
          <DestinationCard destination={pending} status="pending" />
        </div>
      )}

      <h3 className="settle-subhead">Choose how you get settled</h3>
      <div className="settle-options">
        <article className={onPrepaid ? "" : "active"}>
          {!onPrepaid && (
            <span className="settle-check" title="Active destination">
              <CheckCircle2 />
            </span>
          )}
          <span className="settle-icon">
            <Landmark />
          </span>
          <h4>Settlement bank account</h4>
          <p>
            Funds are transferred to a bank account your business owns. Pick
            from the banks Transflow settles to.
          </p>
          <div className="settle-banks">
            {settlementBanks.map((bank) => (
              <img key={bank.id} src={bank.logo} alt={bank.name} />
            ))}
          </div>
          <PageActionButton
            variant="outline"
            disabled={locked}
            onClick={() => setBankOpen(true)}
          >
            {onPrepaid ? "Request a bank account" : "Change bank account"}
          </PageActionButton>
        </article>

        <article className={onPrepaid ? "active" : ""}>
          {onPrepaid && (
            <span className="settle-check" title="Active destination">
              <CheckCircle2 />
            </span>
          )}
          <span className="settle-icon recycle">
            <Recycle />
          </span>
          <h4>Prepaid recycling</h4>
          <p>
            Skip the bank transfer. Settlement is deposited into your prepaid
            account instead, and that balance can be spent across Transflow
            applications or withdrawn later.
          </p>
          <small className="settle-hint">
            While recycling is on, your money is never paid into a bank account.
          </small>
          <PageActionButton
            variant="outline"
            disabled={locked || onPrepaid}
            onClick={() => setRecycleOpen(true)}
          >
            {onPrepaid ? "Currently active" : "Request recycling"}
          </PageActionButton>
        </article>
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

      {bankOpen && (
        <BankAccountModal
          currentLabel={current.title}
          close={() => setBankOpen(false)}
          review={({ bankId, accountName, accountNumber }) => {
            setBankOpen(false)
            setDraft({
              kind: "bank",
              bankId,
              accountName,
              last4: accountNumber.slice(-4),
            })
          }}
        />
      )}

      {recycleOpen && (
        <RecyclingModal
          currentLabel={current.title}
          close={() => setRecycleOpen(false)}
          review={() => {
            setRecycleOpen(false)
            setDraft({ kind: "prepaid", ...prepaidAccount })
          }}
        />
      )}

      {draft && (
        <SettlementConfirmModal
          current={current.title}
          requested={describe(draft).title}
          submitting={submitting}
          close={() => setDraft(null)}
          confirm={submit}
        />
      )}
    </>
  )
}
