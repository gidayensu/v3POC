import { useState } from "react"
import {
  Activity,
  Banknote,
  CreditCard,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react"

type LogEntry = {
  source: string
  icon: LucideIcon
  actor: string
  action: string
  at: string
}

const logs: LogEntry[] = [
  {
    source: "TransPay",
    icon: Banknote,
    actor: "Gideon Okafor",
    action: "approved bulk disbursement TP-4821 (GHS 184,300.00)",
    at: "Today, 10:42 AM",
  },
  {
    source: "RPay",
    icon: CreditCard,
    actor: "Ama Mensah",
    action: "reconciled terminal batch RP-0917 for Osu branch",
    at: "Today, 10:05 AM",
  },
  {
    source: "TransPay",
    icon: Banknote,
    actor: "Kofi Boateng",
    action: "added Tema Industrial as a payout branch",
    at: "Today, 9:31 AM",
  },
  {
    source: "Workspace",
    icon: ShieldCheck,
    actor: "Gideon Okafor",
    action: "submitted Accounts configuration for review",
    at: "Today, 9:24 AM",
  },
  {
    source: "RPay",
    icon: CreditCard,
    actor: "Naa Adjeley",
    action: "created bill category “School fees — Term 2”",
    at: "Yesterday, 4:58 PM",
  },
  {
    source: "TransPay",
    icon: Banknote,
    actor: "System",
    action: "flagged 3 failed payouts for retry",
    at: "Yesterday, 3:40 PM",
  },
  {
    source: "Workspace",
    icon: ShieldCheck,
    actor: "Ama Mensah",
    action: "requested access to Settlement",
    at: "Yesterday, 3:12 PM",
  },
  {
    source: "RPay",
    icon: CreditCard,
    actor: "Kwesi Danso",
    action: "deactivated terminal RP-TRM-2214",
    at: "Aug 19, 2026",
  },
  {
    source: "Workspace",
    icon: ShieldCheck,
    actor: "Compliance Operations",
    action: "approved business verification",
    at: "Aug 18, 2026",
  },
]

const sources = ["All", "TransPay", "RPay", "Workspace"]

export function AuditPage() {
  const [source, setSource] = useState("All")
  const shown =
    source === "All" ? logs : logs.filter((log) => log.source === source)

  return (
    <>
      <div className="log-filters">
        {sources.map((option) => (
          <button
            key={option}
            className={source === option ? "active" : ""}
            onClick={() => setSource(option)}
          >
            {option}
            <em>
              {option === "All"
                ? logs.length
                : logs.filter((log) => log.source === option).length}
            </em>
          </button>
        ))}
      </div>
      <section className="timeline">
        {shown.map((log) => {
          const I = log.icon || Activity
          return (
            <div key={`${log.actor}-${log.at}-${log.action}`}>
              <I />
              <p>
                <b>{log.actor}</b> {log.action}
                <small>
                  <span className="log-source">{log.source}</span>
                  {log.at}
                </small>
              </p>
            </div>
          )
        })}
      </section>
    </>
  )
}
