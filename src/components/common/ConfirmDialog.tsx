import type { ReactNode } from "react"

import { Overlay } from "@/components/common/Overlay"

export function ConfirmDialog({
  icon,
  iconClass = "warning",
  title,
  titleClass,
  children,
  cancelLabel = "Cancel",
  confirmLabel = "Confirm",
  confirmClass = "primary",
  close,
  confirm,
  className = "",
  footer,
}: {
  /** Optional: the switch dialogs lead with their heading instead. */
  icon?: ReactNode
  iconClass?: string
  title: string
  /** Lets a dialog give its heading more weight than the shared default. */
  titleClass?: string
  children: ReactNode
  cancelLabel?: string
  confirmLabel?: string
  confirmClass?: string
  close: () => void
  confirm: () => void
  className?: string
  /**
   * Replaces the default pair of buttons. Rendered in a div rather than a
   * `footer`, so the legacy `.confirm-modal footer button` sizing stays out of
   * the way of whatever the caller passes in.
   */
  footer?: ReactNode
}) {
  return (
    <Overlay>
      <section className={`confirm-modal ${className}`.trim()}>
        {icon ? <span className={iconClass}>{icon}</span> : null}
        <h2 className={titleClass}>{title}</h2>
        {children}
        {footer ? (
          <div className="mt-5 flex flex-wrap justify-center gap-2.5 border-t border-[#e4e7ec] pt-4">
            {footer}
          </div>
        ) : (
          <footer>
            <button className="outline" onClick={close}>
              {cancelLabel}
            </button>
            <button className={confirmClass} onClick={confirm}>
              {confirmLabel}
            </button>
          </footer>
        )}
      </section>
    </Overlay>
  )
}
