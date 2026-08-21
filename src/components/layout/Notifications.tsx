import { X } from "lucide-react"

import { keys, readJSON } from "@/lib/storage"
import type { TranspayStatus, View } from "@/types"

type MerchantChange = { title: string; body: string; at: string } | null

function buildFeed(transpayStatus: TranspayStatus) {
  const merchantChange = readJSON<MerchantChange>(
    keys.merchantChangeNotification,
    null
  )
  return [
    ...(merchantChange
      ? [`${merchantChange.title} — ${merchantChange.body}`]
      : []),
    ...(transpayStatus === "active"
      ? ["TransPay is ready — Your setup has been completed successfully."]
      : transpayStatus === "processing"
        ? ["TransPay setup submitted — Activation is processing."]
        : []),
    "Accounts setup is ready to continue",
    "Settlement configuration needs review",
    "Ama Mensah requested access to RPay",
    "Business verification was approved",
  ]
}

function targetFor(message: string): View {
  if (message.includes("TransPay")) return "applications"
  if (message.includes("requested access")) return "approvals"
  return "home"
}

export function Notifications({
  close,
  go,
  transpayStatus,
}: {
  close: () => void
  go: (view: View) => void
  transpayStatus: TranspayStatus
}) {
  return (
    <div className="notifications">
      <header>
        <h3>Notifications</h3>
        <button onClick={close}>
          <X />
        </button>
      </header>
      {buildFeed(transpayStatus).map((message, i) => (
        <button
          key={message}
          onClick={() => {
            go(targetFor(message))
            close()
          }}
        >
          <i />
          <p>
            <b>{message}</b>
            <span>{i < 2 ? "Today" : "Yesterday"}</span>
          </p>
        </button>
      ))}
    </div>
  )
}
