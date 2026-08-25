import { CheckCircle2, X } from "lucide-react"

/**
 * Headings for the toasts the workspace raises, matched in order against the
 * message. The fallback is deliberately neutral: a new message that nothing
 * here recognises should read as unlabelled, never as some other action.
 */
const toastTitles: [RegExp, string][] = [
  [/^Business switched/, "Business switched"],
  [/^TransPay demo/, "Demo reset"],
  [/^TransPay is ready/, "TransPay is ready"],
  [/requested change/, "Merchant change approved"],
  [/^You.re in .+ as /, "Role assumed"],
  [/^You.re now working in/, "Application opened"],
  [/^You.ve left/, "Application and business left"],
  [/back in the merchant workspace/, "Application closed"],
]

const toastTitle = (message: string) =>
  toastTitles.find(([pattern]) => pattern.test(message))?.[1] || "Update"

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
