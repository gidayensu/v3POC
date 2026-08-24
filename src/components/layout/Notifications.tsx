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
    <div className="absolute top-16 right-16 z-30 w-95 rounded-lg border border-[#dce1e8] bg-white p-2 shadow-[0_15px_35px_#10204a2b] max-md:right-3 max-md:left-3 max-md:w-auto">
      <header className="flex items-start justify-between px-2 pt-1.5">
        <h3 className="m-0 text-sm font-bold text-[#101d42]">Notifications</h3>
        <button
          type="button"
          className="grid size-7 place-items-center rounded-md text-[#6c7688] transition-colors outline-none hover:bg-[#f1f4f9] hover:text-[#101d42] focus-visible:ring-2 focus-visible:ring-[#0b63f6]/35"
          onClick={close}
        >
          <X />
        </button>
      </header>
      {buildFeed(transpayStatus).map((message, i) => (
        <button
          type="button"
          className="flex w-full gap-2.5 rounded-md p-3 text-left transition-colors outline-none hover:bg-[#f4f7fb] focus-visible:ring-2 focus-visible:ring-[#0b63f6]/35"
          key={message}
          onClick={() => {
            go(targetFor(message))
            close()
          }}
        >
          <i className="mt-1.5 size-2.25 shrink-0 rounded-full bg-[#0b63f6]" />
          <p className="m-0 grid gap-0.5">
            <b className="text-sm font-semibold text-[#101d42]">{message}</b>
            <span className="text-xs text-[#778195]">
              {i < 2 ? "Today" : "Yesterday"}
            </span>
          </p>
        </button>
      ))}
    </div>
  )
}
