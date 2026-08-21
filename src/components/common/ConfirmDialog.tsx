import type { ReactNode } from "react"

import { Overlay } from "@/components/common/Overlay"

export function ConfirmDialog({
  icon,
  iconClass = "warning",
  title,
  children,
  cancelLabel = "Cancel",
  confirmLabel = "Confirm",
  confirmClass = "primary",
  close,
  confirm,
  className = "",
}: {
  icon: ReactNode
  iconClass?: string
  title: string
  children: ReactNode
  cancelLabel?: string
  confirmLabel?: string
  confirmClass?: string
  close: () => void
  confirm: () => void
  className?: string
}) {
  return (
    <Overlay>
      <section className={`confirm-modal ${className}`.trim()}>
        <span className={iconClass}>{icon}</span>
        <h2>{title}</h2>
        {children}
        <footer>
          <button className="outline" onClick={close}>
            {cancelLabel}
          </button>
          <button className={confirmClass} onClick={confirm}>
            {confirmLabel}
          </button>
        </footer>
      </section>
    </Overlay>
  )
}
