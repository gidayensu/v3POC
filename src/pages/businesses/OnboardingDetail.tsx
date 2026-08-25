import { Check } from "lucide-react"

import { FileTypeIcon, PageActionButton } from "@/components/common"
import { startExternalOnboarding } from "@/lib/onboarding"
import type { BusinessRecord } from "@/types"

const stages = [
  "Business details",
  "Representatives",
  "Documents",
  "Products",
  "Review",
]

const PROGRESS = 42

/** One stage on the rail: done, in progress, or still ahead. */
function Stage({ stage, index }: { stage: string; index: number }) {
  const done = index < 2
  const current = index === 2
  return (
    <div className="relative grid justify-items-center text-center">
      {/* The connector runs from the previous marker into this one. */}
      {index > 0 && (
        <i
          aria-hidden="true"
          className={`absolute top-4 right-1/2 -left-1/2 h-px ${
            done ? "bg-[#9bceb0]" : "bg-[#dfe5ec]"
          }`}
        />
      )}
      <span
        className={`relative z-1 grid size-8 place-items-center rounded-full border text-[13px] font-bold ${
          done
            ? "border-[#9bceb0] bg-[#e9f8ee] text-[#27804a]"
            : current
              ? "border-[#002047] bg-[#002047] text-white"
              : "border-[#dfe5ec] bg-white text-[#98a2b3]"
        }`}
      >
        {done ? <Check className="size-4" strokeWidth={3} /> : index + 1}
      </span>
      <b
        className={`mt-2.5 text-xs font-semibold ${
          done || current ? "text-[#101d42]" : "text-[#98a2b3]"
        }`}
      >
        {stage}
      </b>
      <small className="mt-0.5 text-[11px] text-[#8792a8]">
        {done ? "Completed" : current ? "In progress" : "Not started"}
      </small>
    </div>
  )
}

export function OnboardingDetail({ business }: { business: BusinessRecord }) {
  return (
    <section className="flex flex-col gap-6">
      <header className="flex flex-wrap items-center gap-4 rounded-xl bg-white p-6 shadow-[0_1px_2px_rgb(16_29_66/0.04)]">
        <span className="grid size-14 shrink-0 place-items-center rounded-lg bg-[#eef3fa] text-sm font-bold tracking-[0.04em] text-[#0b3565]">
          {business.initials}
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="m-0 truncate text-xl font-bold tracking-[-0.01em] text-[#101d42]">
            {business.name}
          </h2>
          <p className="mt-1 mb-0 text-sm text-[#667085]">
            Application started · Last updated today
          </p>
        </div>
        <PageActionButton onClick={startExternalOnboarding}>
          Resume onboarding
        </PageActionButton>
      </header>

      <div className="rounded-xl bg-white p-6 shadow-[0_1px_2px_rgb(16_29_66/0.04)]">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="m-0 text-base font-bold tracking-[-0.01em] text-[#101d42]">
              Onboarding incomplete
            </h3>
            <p className="mt-1 mb-0 text-sm text-[#667085]">
              Complete your documents to continue.
            </p>
          </div>
          <b className="text-sm font-bold text-[#0b3565]">
            {PROGRESS}% complete
          </b>
        </div>

        <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-[#eaeef4]">
          <i
            className="block h-full rounded-full bg-[#0b3565] transition-[width] duration-300"
            style={{ width: `${PROGRESS}%` }}
          />
        </div>

        <div className="mt-7 grid grid-cols-5 gap-2">
          {stages.map((stage, i) => (
            <Stage key={stage} stage={stage} index={i} />
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 rounded-xl bg-[#fff9ed] p-5">
        <FileTypeIcon meta="PDF" className="size-10" />
        <p className="m-0 grid min-w-0 flex-1 gap-1">
          <b className="text-sm font-bold text-[#101d42]">
            Outstanding requirement
          </b>
          <span className="text-[13px] leading-relaxed text-[#667085]">
            Upload proof of business address issued within the last three
            months.
          </span>
        </p>
        <PageActionButton variant="outline" onClick={startExternalOnboarding}>
          Continue
        </PageActionButton>
      </div>
    </section>
  )
}
