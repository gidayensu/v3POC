import { useState } from "react"

import {
  BusinessLogo,
  ConfirmDialog,
  PageActionButton,
} from "@/components/common"
import type { SwitchableBusiness } from "@/types"

/**
 * Switching into a business we hold product access to, rather than manage.
 * Two steps: confirm the switch, then choose which role the application
 * instance is assumed under. Step two can be stepped back out of.
 */
export function ProductAccessSwitchModal({
  pending,
  merchant,
  close,
  confirm,
}: {
  pending: SwitchableBusiness
  merchant: string
  close: () => void
  confirm: (role: string) => void
}) {
  const [step, setStep] = useState<"intro" | "role">("intro")
  const [role, setRole] = useState("")
  const app = pending.productApp || "the application"
  const roles = pending.roles || []
  const proceed = () => (step === "intro" ? setStep("role") : confirm(role))

  return (
    <ConfirmDialog
      className="product-access-modal"
      /* The business identifies itself by its own mark, not a generic glyph. */
      iconClass="mx-auto block w-fit"
      icon={
        <BusinessLogo
          src={pending.logo}
          name={pending.name}
          className="size-14"
        />
      }
      title={
        step === "intro" ? `Switch to ${pending.name}?` : "Select your role"
      }
      titleClass="text-[22px] leading-tight font-bold tracking-[-0.02em] text-[#101d42]"
      close={close}
      confirm={proceed}
      footer={
        <>
          <PageActionButton
            variant="outline"
            className="min-w-[120px]"
            onClick={step === "intro" ? close : () => setStep("intro")}
          >
            {step === "intro" ? "Cancel" : "Back"}
          </PageActionButton>
          <PageActionButton
            className="min-w-[120px]"
            onClick={proceed}
            disabled={step === "role" && !role}
          >
            {step === "intro" ? "Continue" : `Switch and open ${app}`}
          </PageActionButton>
        </>
      }
    >
      <small className="mb-2 block text-xs font-semibold tracking-[0.06em] text-[#8792a8] uppercase">
        Step {step === "intro" ? 1 : 2} of 2
      </small>
      {step === "intro" ? (
        <p>
          You're about to switch from <b>{merchant}</b> to <b>{pending.name}</b>
          . Next you'll choose the role to work under.
        </p>
      ) : (
        <>
          <p>
            Choose the role to assume in <b>{pending.name}</b>. Your navigation,
            permissions and data follow this role.
          </p>
          {/* A dropdown rather than cards: the role list grows per business. */}
          <label className="mt-4 block text-left text-[13px] font-semibold text-[#101d42]">
            Role
            <select
              className="mt-1.5 h-10 w-full appearance-auto rounded-md border border-[#dce1e8] bg-white px-3 text-sm font-normal text-[#101d42] outline-none focus-visible:border-[#0b3565] focus-visible:ring-2 focus-visible:ring-[#0b3565]/25"
              value={role}
              onChange={(event) => setRole(event.target.value)}
            >
              <option value="" disabled>
                Select a role
              </option>
              {roles.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </>
      )}
    </ConfirmDialog>
  )
}
