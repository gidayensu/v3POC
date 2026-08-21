import { LayoutGrid } from "lucide-react"

import { ConfirmDialog, ProductIcon } from "@/components/common"
import { productByName } from "@/data/products"

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
  const product = productByName(pending)
  return (
    <ConfirmDialog
      className="app-switch-modal"
      iconClass="switch-icon"
      icon={product ? <ProductIcon p={product} /> : <LayoutGrid />}
      title={`Switch to ${pending}?`}
      confirmLabel={`Open ${pending}`}
      close={close}
      confirm={confirm}
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
