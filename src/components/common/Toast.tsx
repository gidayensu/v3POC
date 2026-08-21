import { CheckCircle2, X } from "lucide-react"

function toastTitle(message: string) {
  if (message.startsWith("Business switched")) return "Business switched"
  if (message.startsWith("TransPay demo")) return "Demo reset"
  if (message.includes("requested change")) return "Merchant change approved"
  return "TransPay is ready"
}

export function Toast({
  message,
  close,
}: {
  message: string
  close: () => void
}) {
  return (
    <div className="toast">
      <span>
        <CheckCircle2 />
      </span>
      <p>
        <b>{toastTitle(message)}</b>
        <small>{message}</small>
      </p>
      <button onClick={close}>
        <X />
      </button>
    </div>
  )
}
