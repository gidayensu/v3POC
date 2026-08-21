import { Building2, CircleHelp, Landmark, Plus } from "lucide-react"

import { Badge } from "@/components/common"
import type { Branch, DraftUpdater, TranspayDraft } from "@/types"

type StepProps = {
  draft: TranspayDraft
  update: DraftUpdater
  errors: Record<string, string>
}

export function GeneralStep({ draft, update, errors }: StepProps) {
  return (
    <>
      <div className="stage-title">
        <h2>General settings</h2>
        <p>
          Your approved merchant profile is already connected. Add only the
          details TransPay needs.
        </p>
      </div>
      <div className="merchant-strip">
        <Building2 />
        <p>
          <b>Acme Trading Ltd</b>
          <small>Verified merchant · CS093482016 · Ghana</small>
        </p>
        <Badge s="approved" />
      </div>
      <div className="detail-grid wizard-fields">
        <label>
          Primary payment purpose
          <select
            value={draft.purpose}
            onChange={(e) => update("purpose", e.target.value)}
          >
            <option>Supplier and beneficiary payments</option>
            <option>Payroll</option>
            <option>Internal transfers</option>
          </select>
        </label>
        <label>
          Expected monthly volume
          <select
            value={draft.volume}
            onChange={(e) => update("volume", e.target.value)}
          >
            <option>Below GHS 100,000</option>
            <option>GHS 100,000 – 500,000</option>
            <option>Above GHS 500,000</option>
          </select>
        </label>
        <label>
          Default approval rule
          <select
            value={draft.approval}
            onChange={(e) => update("approval", e.target.value)}
          >
            <option>Any 2 administrators</option>
            <option>One administrator</option>
            <option>Finance manager + administrator</option>
          </select>
        </label>
        <label>
          Payment notifications
          <input
            className={errors.email ? "error" : ""}
            value={draft.email}
            onChange={(e) => update("email", e.target.value)}
          />
          {errors.email && <em>{errors.email}</em>}
        </label>
      </div>
      <label className="checkline">
        <input type="checkbox" defaultChecked />
        Enable beneficiary verification before first payment
      </label>
    </>
  )
}

export function SettlementStep({ draft, update }: StepProps) {
  return (
    <>
      <div className="stage-title">
        <h2>Settlement &amp; payment settings</h2>
        <p>Select how TransPay should fund payments and handle settlement.</p>
      </div>
      <div className="account-select">
        <label className="selected">
          <input type="radio" checked readOnly />
          <span className="bank-logo">
            <Landmark />
          </span>
          <p>
            <b>Operating Account ••••4587</b>
            <small>Titan Trust Bank · GHS · Eligible</small>
          </p>
          <Badge s="approved" />
        </label>
        <label>
          <input type="radio" disabled />
          <span className="bank-logo b1">
            <Landmark />
          </span>
          <p>
            <b>Reserve Account ••••2196</b>
            <small>
              Guardian Commercial Bank · Eligibility review required
            </small>
          </p>
          <Badge s="pending" />
        </label>
      </div>
      <div className="detail-grid wizard-fields">
        <label>
          Settlement account
          <select
            value={draft.settlement}
            onChange={(e) => update("settlement", e.target.value)}
          >
            <option>Operating Account ••••4587</option>
          </select>
        </label>
        <label>
          Settlement schedule
          <select
            value={draft.schedule}
            onChange={(e) => update("schedule", e.target.value)}
          >
            <option>Same-day settlement</option>
            <option>Next business day</option>
          </select>
        </label>
      </div>
      <div className="guidance">
        <CircleHelp />
        <p>
          <b>Settlement account eligibility</b>
          <span>
            Only verified business accounts can be used. Add or request account
            access in Merchant Settings.
          </span>
        </p>
      </div>
    </>
  )
}

export function BranchesStep({
  draft,
  errors,
  addBranch,
  editBranch,
  removeBranch,
}: StepProps & {
  addBranch: () => void
  editBranch: (branch: Branch) => void
  removeBranch: (id: string) => void
}) {
  return (
    <>
      <div className="stage-title row">
        <div>
          <h2>Initial branches</h2>
          <p>
            Add every branch that should begin using TransPay on activation.
          </p>
        </div>
        <button className="primary" onClick={addBranch}>
          <Plus />
          Add branch
        </button>
      </div>
      {errors.branches && <div className="form-error">{errors.branches}</div>}
      {draft.branches.length === 0 ? (
        <div className="branch-empty">
          <Building2 />
          <h3>No branches added yet</h3>
          <p>Create your first branch with a unique name and identifier.</p>
          <button className="outline" onClick={addBranch}>
            Add first branch
          </button>
        </div>
      ) : (
        <div className="branch-list">
          {draft.branches.map((branch, i) => (
            <article key={branch.id}>
              <span>{i + 1}</span>
              <p>
                <b>{branch.name}</b>
                <small>
                  {branch.code} · {branch.city}
                </small>
                <small>{branch.account}</small>
              </p>
              <Badge s="approved" />
              <button className="outline" onClick={() => editBranch(branch)}>
                Edit
              </button>
              <button
                className="danger-link"
                onClick={() => removeBranch(branch.id)}
              >
                Remove
              </button>
            </article>
          ))}
        </div>
      )}
    </>
  )
}

export function ReviewStep({
  draft,
  edit,
}: {
  draft: TranspayDraft
  edit: (step: number) => void
}) {
  return (
    <>
      <div className="stage-title">
        <h2>Review &amp; submit</h2>
        <p>Confirm your configuration before sending it for activation.</p>
      </div>
      <div className="review-sections">
        <section>
          <header>
            <h3>Business</h3>
            <button onClick={() => edit(0)}>Edit</button>
          </header>
          <dl>
            <div>
              <dt>Merchant</dt>
              <dd>Acme Trading Ltd</dd>
            </div>
            <div>
              <dt>Registration</dt>
              <dd>CS093482016</dd>
            </div>
            <div>
              <dt>Primary contact</dt>
              <dd>Gideon Okafor</dd>
            </div>
          </dl>
        </section>
        <section>
          <header>
            <h3>TransPay configuration</h3>
            <button onClick={() => edit(0)}>Edit</button>
          </header>
          <dl>
            <div>
              <dt>Payment purpose</dt>
              <dd>{draft.purpose}</dd>
            </div>
            <div>
              <dt>Monthly volume</dt>
              <dd>{draft.volume}</dd>
            </div>
            <div>
              <dt>Approval rule</dt>
              <dd>{draft.approval}</dd>
            </div>
          </dl>
        </section>
        <section>
          <header>
            <h3>Settlement account</h3>
            <button onClick={() => edit(1)}>Edit</button>
          </header>
          <dl>
            <div>
              <dt>Account</dt>
              <dd>{draft.settlement}</dd>
            </div>
            <div>
              <dt>Schedule</dt>
              <dd>{draft.schedule}</dd>
            </div>
          </dl>
        </section>
        <section>
          <header>
            <h3>Branches ({draft.branches.length})</h3>
            <button onClick={() => edit(2)}>Edit</button>
          </header>
          {draft.branches.map((branch) => (
            <div className="review-branch" key={branch.id}>
              <b>{branch.name}</b>
              <span>
                {branch.code} · {branch.city}
              </span>
            </div>
          ))}
        </section>
      </div>
      <label className="checkline review-confirm">
        <input type="checkbox" defaultChecked />I confirm that this
        configuration is accurate and can be submitted for activation.
      </label>
    </>
  )
}
