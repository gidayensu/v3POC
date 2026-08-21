import { Check, ChevronRight, Clock3 } from "lucide-react"

import { Badge } from "@/components/common"

const summary = [
  ["Business", "Acme Trading Ltd"],
  ["Configuration", "Saved and validated"],
  ["Notification", "You’ll be notified in-app"],
]

export function TransPayProcessingPage({ back }: { back: () => void }) {
  return (
    <div className="wizard-page">
      <div className="breadcrumbs">
        <button onClick={back}>Applications</button>
        <ChevronRight />
        <span>TransPay</span>
        <ChevronRight />
        <b>Activation</b>
      </div>
      <section className="processing-page">
        <span className="processing-icon">
          <Clock3 />
        </span>
        <Badge s="processing" />
        <h1>TransPay setup is processing</h1>
        <p>
          We’re applying your payment, settlement and branch configuration. This
          prototype will activate TransPay automatically in a few moments.
        </p>
        <div className="processing-track">
          <i />
        </div>
        <div className="processing-steps">
          <span className="done">
            <Check />
            Setup submitted
          </span>
          <span className="current">
            <span className="spinner" />
            Configuring TransPay
          </span>
          <span>Ready to use</span>
        </div>
        <div className="processing-summary">
          {summary.map(([label, value]) => (
            <div key={label}>
              <b>{label}</b>
              <span>{value}</span>
            </div>
          ))}
        </div>
        <button className="outline" onClick={back}>
          Return to Applications
        </button>
      </section>
    </div>
  )
}
