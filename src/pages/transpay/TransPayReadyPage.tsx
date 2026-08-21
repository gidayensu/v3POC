import { Banknote, ChevronRight, Plus, Users } from "lucide-react"

import { Badge } from "@/components/common"
import { keys, readJSON } from "@/lib/storage"
import type { TranspayDraft } from "@/types"

const branchCount = () =>
  readJSON<Pick<TranspayDraft, "branches">>(keys.transpayDraft, {
    branches: [],
  }).branches.length

export function TransPayReadyPage({ back }: { back: () => void }) {
  return (
    <div className="wizard-page">
      <div className="breadcrumbs">
        <button onClick={back}>Applications</button>
        <ChevronRight />
        <b>TransPay</b>
      </div>
      <header className="wizard-head">
        <div>
          <h1>TransPay</h1>
          <p>Send and manage business payments for Acme Trading Ltd.</p>
        </div>
        <Badge s="ready" />
      </header>
      <div className="context-tabs">
        <button className="active">Overview</button>
        <button>Payments</button>
        <button>Beneficiaries</button>
        <button>Branches</button>
        <button>Settings</button>
      </div>
      <div className="metrics">
        <article>
          <small>PAYMENTS TODAY</small>
          <h2>GHS 0.00</h2>
          <p>No payments sent yet</p>
        </article>
        <article>
          <small>AVAILABLE FUNDING</small>
          <h2>GHS 248,920.42</h2>
          <p>Operating Account ••••4587</p>
        </article>
        <article>
          <small>ACTIVE BRANCHES</small>
          <h2>{branchCount()}</h2>
          <p>Ready to make payments</p>
        </article>
      </div>
      <section className="ready-empty">
        <Banknote />
        <h2>TransPay is ready</h2>
        <p>Create your first payment or add a beneficiary to get started.</p>
        <div>
          <button className="primary">
            <Plus />
            Create payment
          </button>
          <button className="outline">
            <Users />
            Add beneficiary
          </button>
        </div>
      </section>
    </div>
  )
}
