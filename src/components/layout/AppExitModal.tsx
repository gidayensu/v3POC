import { LogOut } from "lucide-react"

import { ConfirmDialog } from "@/components/common"

export function AppExitModal({
  app,
  close,
  confirm,
}: {
  app: string
  close: () => void
  confirm: () => void
}) {
  return (
    <ConfirmDialog
      className="app-exit-modal"
      iconClass="switch-icon"
      icon={<LogOut />}
      title={`Leave ${app}?`}
      cancelLabel="Stay here"
      confirmLabel="Leave application"
      close={close}
      confirm={confirm}
    >
      <p>
        You'll go back to the merchant workspace and the sidebar will return to
        your workspace navigation. Anything you've saved in <b>{app}</b> stays
        as it is.
      </p>
    </ConfirmDialog>
  )
}
