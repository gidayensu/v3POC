import { Building2, Clock3 } from "lucide-react"

import { ConfirmDialog } from "@/components/common"
import { keys } from "@/lib/storage"
import type { SwitchableBusiness, View } from "@/types"

export function BusinessSwitchModal({
  pending,
  merchant,
  close,
  setMerchant,
  go,
}: {
  pending: SwitchableBusiness
  merchant: string
  close: () => void
  setMerchant: (name: string) => void
  go: (view: View) => void
}) {
  const onboarding = pending.status === "onboarding"
  return (
    <ConfirmDialog
      className="business-switch-modal"
      iconClass={onboarding ? "warning" : "switch-icon"}
      icon={onboarding ? <Clock3 /> : <Building2 />}
      title={onboarding ? "Onboarding not complete" : "Switch business?"}
      confirmLabel={onboarding ? "View onboarding" : "Switch business"}
      close={close}
      confirm={() => {
        if (onboarding) {
          localStorage.setItem(keys.selectedBusiness, pending.name)
          window.dispatchEvent(
            new CustomEvent("transflow-business-detail", {
              detail: pending.name,
            })
          )
          go("businesses")
        } else setMerchant(pending.name)
        close()
      }}
    >
      {onboarding ? (
        <p>
          <b>{pending.name}</b> has not completed onboarding and cannot be used
          as the active business yet. You can view its progress and resume
          onboarding.
        </p>
      ) : (
        <p>
          You're about to switch from <b>{merchant}</b> to <b>{pending.name}</b>
          . Applications, permissions and financial data will reload for this
          business.
        </p>
      )}
    </ConfirmDialog>
  )
}
