import { useState } from "react"
import {
  Building2,
  Clock3,
  Landmark,
  ShieldCheck,
  Users,
  X,
} from "lucide-react"

import { Badge, Overlay, ProductIcon } from "@/components/common"
import { productByName } from "@/data/products"

const choices = [
  ["Use Acme Trading Ltd", "We’ll reuse your verified business information."],
  ["Add a new business", "Start merchant onboarding for another business."],
]

const prerequisites = [
  [ShieldCheck, "Approved merchant profile", "Approved and in good standing."],
  [
    Landmark,
    "Eligible settlement or operating account",
    "Required to view balances and activity.",
  ],
  [Users, "Administrator permission", "Required to set up Accounts."],
] as const

/** Pre-setup gateway shown before entering the Accounts setup wizard. */
export function AccountsGateway({
  close,
  proceed,
}: {
  close: () => void
  proceed: () => void
}) {
  const [choice, setChoice] = useState(0)
  const accounts = productByName("Accounts")!
  return (
    <Overlay>
      <section className="gateway">
        <header>
          <h2>Set up Accounts</h2>
          <button onClick={close}>
            <X />
          </button>
        </header>
        <div className="gateway-product">
          <ProductIcon p={accounts} big />
          <p>
            <small>FINANCE APP</small>
            <b>Accounts</b>
            <span>
              View balances, statements and account activity for your business.
            </span>
          </p>
        </div>
        <hr />
        <h3>Which business should use Accounts?</h3>
        {choices.map(([title, desc], i) => (
          <button
            className={`choice ${choice === i ? "selected" : ""}`}
            onClick={() => setChoice(i)}
            key={title}
          >
            <i />
            <span className="choiceicon">{i ? <Building2 /> : "ACME"}</span>
            <p>
              <b>{title}</b>
              <small>{desc}</small>
            </p>
            {!i && <Badge s="approved" />}
          </button>
        ))}
        <hr />
        <h3>Before you begin</h3>
        <div className="prereqs">
          {prerequisites.map(([I, title, desc]) => (
            <div key={title}>
              <I />
              <p>
                <b>{title}</b>
                <small>{desc}</small>
              </p>
            </div>
          ))}
        </div>
        <div className="estimate">
          <span>
            Estimated setup{" "}
            <b>
              <Clock3 /> 5–8 minutes
            </b>
          </span>
          <em>Approval required</em>
        </div>
        <footer>
          <button className="outline" onClick={close}>
            Cancel
          </button>
          <button className="primary" onClick={proceed}>
            Continue with Acme Trading Ltd
          </button>
        </footer>
      </section>
    </Overlay>
  )
}
