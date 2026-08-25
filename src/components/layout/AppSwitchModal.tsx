import { ConfirmDialog, PageActionButton } from "@/components/common"

export function AppSwitchModal({
  pending,
  current,
  close,
  confirm,
}: {
  pending: string
  current: string | null
  close: () => void
  confirm: () => void
}) {
  return (
    <ConfirmDialog
      className="app-switch-modal"
      title={`Switch to ${pending}?`}
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
            Open {pending}
          </PageActionButton>
        </>
      }
    >
      <p>
        {current ? (
          <>
            You're about to leave <b>{current}</b> and work in <b>{pending}</b>{" "}
            instead.
          </>
        ) : (
          <>
            You're about to work inside <b>{pending}</b>.
          </>
        )}{" "}
        The sidebar, permissions and data will switch to this application. Your
        business stays the same.
      </p>
    </ConfirmDialog>
  )
}
