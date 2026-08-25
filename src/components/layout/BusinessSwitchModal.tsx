import {
  BusinessLogo,
  ConfirmDialog,
  PageActionButton,
} from "@/components/common"
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
  const confirm = () => {
    if (onboarding) {
      localStorage.setItem(keys.selectedBusiness, pending.name)
      window.dispatchEvent(
        new CustomEvent("transflow-business-detail", { detail: pending.name })
      )
      go("businesses")
    } else setMerchant(pending.name)
    close()
  }
  return (
    <ConfirmDialog
      className="business-switch-modal"
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
        onboarding ? "Onboarding not complete" : `Switch to ${pending.name}?`
      }
      titleClass="text-[22px] leading-tight font-bold tracking-[-0.02em] text-[#101d42]"
      close={close}
      confirm={confirm}
      footer={
        <>
          <PageActionButton
            variant="outline"
            className="min-w-[120px]"
            onClick={close}
          >
            Cancel
          </PageActionButton>
          <PageActionButton className="min-w-[120px]" onClick={confirm}>
            {onboarding ? "View onboarding" : "Switch business"}
          </PageActionButton>
        </>
      }
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
