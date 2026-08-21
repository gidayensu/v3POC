import type { ReactNode } from "react"

export function Page({
  title,
  sub,
  children,
  action,
}: {
  title: ReactNode
  sub?: ReactNode
  children?: ReactNode
  action?: ReactNode
}) {
  return (
    <div className="page">
      <header className="pagehead">
        <div>
          <h1>{title}</h1>
          <p>{sub}</p>
        </div>
        {action}
      </header>
      {children}
    </div>
  )
}
