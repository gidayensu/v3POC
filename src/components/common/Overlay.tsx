import type { ReactNode } from "react"

export function Overlay({
  children,
  close,
}: {
  children: ReactNode
  close?: () => void
}) {
  return (
    <div className="overlay" onMouseDown={close}>
      <div onMouseDown={(e) => e.stopPropagation()}>{children}</div>
    </div>
  )
}
