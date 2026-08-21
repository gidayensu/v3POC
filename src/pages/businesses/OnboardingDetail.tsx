import { Check, FileText } from "lucide-react"

import { startExternalOnboarding } from "@/lib/onboarding"
import type { BusinessRecord } from "@/types"

const stages = [
  "Business details",
  "Representatives",
  "Documents",
  "Products",
  "Review",
]

export function OnboardingDetail({ business }: { business: BusinessRecord }) {
  return (
    <section className="onboarding-detail">
      <div className="onboarding-title">
        <div>
          <span>{business.initials}</span>
          <div>
            <h2>{business.name}</h2>
            <p>Application started · Last updated today</p>
          </div>
        </div>
        <button className="primary" onClick={startExternalOnboarding}>
          Resume onboarding
        </button>
      </div>
      <div className="onboarding-status">
        <header>
          <div>
            <h3>Onboarding incomplete</h3>
            <p>Complete your documents to continue.</p>
          </div>
          <b>42% complete</b>
        </header>
        <div className="progress">
          <i style={{ width: "42%" }} />
        </div>
        <div className="onboarding-steps">
          {stages.map((stage, i) => (
            <div
              className={i < 2 ? "complete" : i === 2 ? "current" : ""}
              key={stage}
            >
              <span>{i < 2 ? <Check /> : i + 1}</span>
              <b>{stage}</b>
              <small>
                {i < 2 ? "Completed" : i === 2 ? "In progress" : "Not started"}
              </small>
            </div>
          ))}
        </div>
      </div>
      <div className="outstanding">
        <FileText />
        <p>
          <b>Outstanding requirement</b>
          <span>
            Upload proof of business address issued within the last three
            months.
          </span>
        </p>
        <button className="outline" onClick={startExternalOnboarding}>
          Continue
        </button>
      </div>
    </section>
  )
}
