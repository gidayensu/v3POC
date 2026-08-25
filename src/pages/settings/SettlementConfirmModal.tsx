import { ConfirmDialog, PageActionButton } from "@/components/common"

export function SettlementConfirmModal({
  current,
  requested,
  submitting,
  close,
  confirm,
}: {
  current: string
  requested: string
  submitting: boolean
  close: () => void
  confirm: () => void
}) {
  return (
    <ConfirmDialog
      className="settlement-confirm"
      title={`Settle into ${requested}?`}
      titleClass="text-[22px] leading-tight font-bold tracking-[-0.02em] text-[#101d42]"
      close={close}
      confirm={confirm}
      footer={
        <>
          <PageActionButton
            variant="outline"
            className="min-w-[120px]"
            disabled={submitting}
            onClick={close}
          >
            Cancel
          </PageActionButton>
          <PageActionButton
            className="min-w-[120px]"
            disabled={submitting}
            onClick={confirm}
          >
            {submitting ? (
              <>
                <span className="spinner light" />
                Submitting…
              </>
            ) : (
              "Submit request"
            )}
          </PageActionButton>
        </>
      }
    >
      <p>
        We'll review this request and notify you once it's approved. Settlement
        continues to <b>{current}</b> until then.
      </p>
    </ConfirmDialog>
  )
}
