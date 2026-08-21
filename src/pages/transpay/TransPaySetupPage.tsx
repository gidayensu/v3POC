import { useState } from "react"
import { Building2, Check, CheckCircle2, ChevronRight } from "lucide-react"

import { ConfirmDialog, Overlay } from "@/components/common"
import { BranchModal } from "@/pages/transpay/BranchModal"
import { transpayWizardSteps } from "@/data/tabs"
import {
  BranchesStep,
  GeneralStep,
  ReviewStep,
  SettlementStep,
} from "@/pages/transpay/steps"
import {
  emptyBranch,
  useTranspayDraft,
} from "@/pages/transpay/useTranspayDraft"
import type { Branch } from "@/types"

function WizardHelp({ step }: { step: number }) {
  return (
    <aside className="wizard-help">
      <h3>Setup progress</h3>
      <b>{step + 1} of 4 steps</b>
      <div className="progress">
        <i style={{ width: `${(step + 1) * 25}%` }} />
      </div>
      <hr />
      <h3>Merchant information</h3>
      <p>
        <CheckCircle2 />
        Business verified
      </p>
      <p>
        <CheckCircle2 />
        Funding account eligible
      </p>
      <p>
        <CheckCircle2 />
        Administrator permission
      </p>
      <hr />
      <h3>Need help?</h3>
      <p className="muted">
        Your setup is automatically saved. You can leave and resume at any time.
      </p>
      <button className="outline">Contact support</button>
    </aside>
  )
}

export function TransPaySetupPage({
  back,
  done,
}: {
  back: () => void
  done: () => void
}) {
  const wizard = useTranspayDraft()
  const { step, setStep, draft, update, errors } = wizard
  const [branch, setBranch] = useState<Branch | null>(null)
  const [removeId, setRemoveId] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const submit = () => {
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSuccess(true)
    }, 1300)
  }

  return (
    <div className="wizard-page">
      <div className="breadcrumbs">
        <button onClick={back}>Applications</button>
        <ChevronRight />
        <span>TransPay</span>
        <ChevronRight />
        <b>Setup</b>
      </div>
      <header className="wizard-head">
        <div>
          <h1>Set up TransPay</h1>
          <p>Configure payments, settlement and your initial branch network.</p>
        </div>
        <span className="autosave">
          {wizard.saving ? (
            <>
              <span className="spinner" />
              Saving…
            </>
          ) : (
            <>
              <CheckCircle2 />
              All changes saved
            </>
          )}
        </span>
      </header>
      <div className="wizard-stepper">
        {transpayWizardSteps.map((label, i) => (
          <button
            className={`${i === step ? "active" : ""} ${i < step ? "complete" : ""}`}
            onClick={() => i < step && setStep(i)}
            key={label}
          >
            <span>{i < step ? <Check /> : i + 1}</span>
            <b>{label}</b>
          </button>
        ))}
      </div>
      <div className="wizard-body">
        <section className="wizard-main">
          {step === 0 && (
            <GeneralStep draft={draft} update={update} errors={errors} />
          )}
          {step === 1 && (
            <SettlementStep draft={draft} update={update} errors={errors} />
          )}
          {step === 2 && (
            <BranchesStep
              draft={draft}
              update={update}
              errors={errors}
              addBranch={() => setBranch(emptyBranch())}
              editBranch={setBranch}
              removeBranch={setRemoveId}
            />
          )}
          {step === 3 && <ReviewStep draft={draft} edit={setStep} />}
          <footer className="wizard-actions">
            <button
              className="outline"
              onClick={() => (step ? setStep(step - 1) : back())}
            >
              {step ? "Back" : "Save & exit"}
            </button>
            {step < 3 ? (
              <button className="primary" onClick={wizard.next}>
                Continue
              </button>
            ) : (
              <button
                className="primary"
                disabled={submitting}
                onClick={submit}
              >
                {submitting ? (
                  <>
                    <span className="spinner light" />
                    Submitting…
                  </>
                ) : (
                  "Submit setup"
                )}
              </button>
            )}
          </footer>
        </section>
        <WizardHelp step={step} />
      </div>
      {branch && (
        <BranchModal
          value={branch}
          close={() => setBranch(null)}
          save={(value) => {
            wizard.saveBranch(value)
            setBranch(null)
          }}
        />
      )}
      {removeId && (
        <ConfirmDialog
          icon={<Building2 />}
          title="Remove this branch?"
          cancelLabel="Keep branch"
          confirmLabel="Remove branch"
          confirmClass="danger"
          close={() => setRemoveId(null)}
          confirm={() => {
            wizard.removeBranch(removeId)
            setRemoveId(null)
          }}
        >
          <p>
            The branch will be removed from this setup. You can add it again
            before submission.
          </p>
        </ConfirmDialog>
      )}
      {success && (
        <Overlay>
          <section className="success submit-success">
            <span>
              <Check />
            </span>
            <h2>TransPay setup submitted</h2>
            <p>
              Your configuration has been successfully submitted. We’ll notify
              you when TransPay is ready to use.
            </p>
            <button
              className="primary"
              onClick={() => {
                setSuccess(false)
                done()
                back()
              }}
            >
              Return to Applications
            </button>
          </section>
        </Overlay>
      )}
    </div>
  )
}
