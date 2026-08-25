import { useState } from "react"
import { Building2, Check, CheckCircle2, ChevronRight } from "lucide-react"

import { ConfirmDialog, Overlay, PageActionButton } from "@/components/common"
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

const readiness = [
  "Business verified",
  "Funding account eligible",
  "Administrator permission",
]

function WizardHelp({ step }: { step: number }) {
  const total = transpayWizardSteps.length
  return (
    <aside className="h-max rounded-xl bg-white p-6 shadow-[0_1px_2px_rgb(16_29_66/0.04)] lg:sticky lg:top-26">
      <h3 className="m-0 text-sm font-bold tracking-[-0.01em] text-[#101d42]">
        Setup progress
      </h3>
      <b className="mt-1.5 block text-[13px] font-semibold text-[#0b3565]">
        {step + 1} of {total} steps
      </b>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#eaeef4]">
        <i
          className="block h-full rounded-full bg-[#0b3565] transition-[width] duration-300"
          style={{ width: `${((step + 1) / total) * 100}%` }}
        />
      </div>

      <hr className="my-6 border-0 border-t border-[#eef1f6]" />

      <h3 className="m-0 mb-3 text-sm font-bold tracking-[-0.01em] text-[#101d42]">
        Merchant information
      </h3>
      <ul className="m-0 grid list-none gap-2.5 p-0">
        {readiness.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2 text-[13px] text-[#475467]"
          >
            <CheckCircle2
              aria-hidden="true"
              className="size-4 shrink-0 text-[#27804a]"
            />
            {item}
          </li>
        ))}
      </ul>

      <hr className="my-6 border-0 border-t border-[#eef1f6]" />

      <h3 className="m-0 mb-2 text-sm font-bold tracking-[-0.01em] text-[#101d42]">
        Need help?
      </h3>
      <p className="mt-0 mb-4 text-[13px] leading-relaxed text-[#8792a8]">
        Your setup is automatically saved. You can leave and resume at any time.
      </p>
      <PageActionButton variant="outline" className="w-full">
        Contact support
      </PageActionButton>
    </aside>
  )
}

/** The four stages, with the ones already cleared still reachable. */
function Stepper({
  step,
  setStep,
}: {
  step: number
  setStep: (step: number) => void
}) {
  return (
    <div className="mt-7 mb-8 flex border-b border-[#e2e7ef]">
      {transpayWizardSteps.map((label, i) => {
        const done = i < step
        const active = i === step
        return (
          <button
            key={label}
            type="button"
            className={`relative -mb-px flex flex-1 items-center justify-center gap-2.5 border-0 border-b-2 bg-transparent px-2 pb-4 transition-colors ${
              active
                ? "border-[#002047] text-[#002047]"
                : done
                  ? "cursor-pointer border-transparent text-[#267849] hover:text-[#1c5c36]"
                  : "cursor-default border-transparent text-[#8792a8]"
            }`}
            onClick={() => done && setStep(i)}
          >
            <span
              className={`grid size-7 shrink-0 place-items-center rounded-full border text-xs font-bold ${
                active
                  ? "border-[#002047] bg-[#002047] text-white"
                  : done
                    ? "border-[#8bcba2] bg-[#e9f8ee] text-[#267849]"
                    : "border-[#dfe5ec] bg-white text-[#98a2b3]"
              }`}
            >
              {done ? <Check className="size-4" strokeWidth={3} /> : i + 1}
            </span>
            <b className="text-[13px] font-semibold max-md:text-[10px]">
              {label}
            </b>
          </button>
        )
      })}
    </div>
  )
}

export function TransPaySetupPage({
  merchant,
  back,
  done,
}: {
  merchant: string
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
      <div className="mb-6 flex items-center gap-1.5 text-[13px] text-[#8792a8]">
        <button
          type="button"
          className="border-0 bg-transparent p-0 font-semibold text-[#0b3565] transition-colors outline-none hover:text-[#002047] focus-visible:underline"
          onClick={back}
        >
          Applications
        </button>
        <ChevronRight aria-hidden="true" className="size-3.5" />
        <span>TransPay</span>
        <ChevronRight aria-hidden="true" className="size-3.5" />
        <b className="font-semibold text-[#101d42]">Setup</b>
      </div>

      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="m-0 text-[28px] leading-tight font-bold tracking-[-0.02em] text-[#101d42]">
            Set up TransPay
          </h1>
          <p className="mt-2 mb-0 text-sm text-[#667085]">
            Configure payments, settlement and your initial branch network.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-[#eef3fa] px-3 py-1.5 text-xs font-semibold text-[#3d5772]">
          {wizard.saving ? (
            <>
              <span className="spinner" />
              Saving…
            </>
          ) : (
            <>
              <CheckCircle2
                aria-hidden="true"
                className="size-4 text-[#27804a]"
              />
              All changes saved
            </>
          )}
        </span>
      </header>

      <Stepper step={step} setStep={setStep} />

      <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_280px]">
        <section className="min-h-[520px]">
          {step === 0 && (
            <GeneralStep
              merchant={merchant}
              draft={draft}
              update={update}
              errors={errors}
            />
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
          {step === 3 && (
            <ReviewStep merchant={merchant} draft={draft} edit={setStep} />
          )}

          <footer className="mt-9 flex flex-wrap justify-between gap-3 border-t border-[#e2e7ef] pt-5">
            <PageActionButton
              variant="outline"
              className="min-w-[115px]"
              onClick={() => (step ? setStep(step - 1) : back())}
            >
              {step ? "Back" : "Save & exit"}
            </PageActionButton>
            {step < 3 ? (
              <PageActionButton className="min-w-[115px]" onClick={wizard.next}>
                Continue
              </PageActionButton>
            ) : (
              <PageActionButton
                className="min-w-[115px]"
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
              </PageActionButton>
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
              Your configuration has been successfully submitted. We&rsquo;ll
              notify you when TransPay is ready to use.
            </p>
            <PageActionButton
              className="mt-5"
              onClick={() => {
                setSuccess(false)
                done()
                back()
              }}
            >
              Return to Applications
            </PageActionButton>
          </section>
        </Overlay>
      )}
    </div>
  )
}
