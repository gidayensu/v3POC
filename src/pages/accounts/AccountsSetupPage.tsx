import { useState } from "react"
import { Check, Landmark, Plus } from "lucide-react"

import { Badge } from "@/components/common"
import { ProductShell } from "@/components/layout"
import { SetupSummary } from "@/pages/accounts/SetupSummary"

const steps = ["Business confirmed", "Link account", "Permissions", "Review"]

const eligibleAccounts = [
  ["Operating Account ••••4587", "Titan Trust Bank", "Eligible"],
  [
    "Reserve Account ••••2196",
    "Guardian Commercial Bank",
    "Eligibility review required",
  ],
]

function Stepper() {
  return (
    <div className="stepper">
      {steps.map((step, i) => (
        <div className={i < 2 ? "active" : ""} key={step}>
          <span>{i === 0 ? <Check /> : i + 1}</span>
          <b>{step}</b>
        </div>
      ))}
    </div>
  )
}

function AccountPicker({
  selected,
  select,
}: {
  selected: number
  select: (index: number) => void
}) {
  return (
    <>
      {eligibleAccounts.map(([name, bank, note], i) => (
        <button
          aria-label={`${name}, ${note}`}
          className={`bank ${selected === i ? "selected" : ""}`}
          onClick={() => select(i)}
          key={name}
        >
          <i />
          <span>
            <Landmark />
          </span>
          <p>
            <b>{name}</b>
            <small>{bank}</small>
          </p>
          <Badge s={i ? "pending" : "approved"} />
          <small>{i ? "Additional checks needed" : "Ready to connect"}</small>
        </button>
      ))}
      <button className="add">
        <Plus />I need to add another account
      </button>
    </>
  )
}

function CapabilityList({
  transfer,
  toggleTransfer,
}: {
  transfer: boolean
  toggleTransfer: () => void
}) {
  const capabilities = [
    ["View balances", "See real-time and available balances", true],
    ["Download statements", "Download statements and documents", true],
    ["View account transactions", "View transaction history and details", true],
    ["Initiate transfers", "Create and send transfers", transfer],
  ] as const
  return (
    <div className="caps">
      {capabilities.map(([title, desc, checked], i) => (
        <label key={title}>
          <input
            checked={Boolean(checked)}
            onChange={() => i === 3 && toggleTransfer()}
            type="checkbox"
          />
          <p>
            <b>{title}</b>
            <small>{desc}</small>
          </p>
          {i === 3 && <em>Requires additional approval</em>}
        </label>
      ))}
    </div>
  )
}

export function AccountsSetupPage({
  back,
  done,
}: {
  back: () => void
  done: () => void
}) {
  const [account, setAccount] = useState(0)
  const [transfer, setTransfer] = useState(false)
  return (
    <ProductShell back={back}>
      <div className="setuplayout">
        <div>
          <div className="pagehead">
            <div>
              <h1>Set up Accounts</h1>
              <p>Connect an eligible account for Acme Trading Ltd.</p>
            </div>
            <button className="outline">Save &amp; exit</button>
          </div>
          <Stepper />
          <h3>Choose an account to connect</h3>
          <p className="muted">
            Only eligible business bank accounts can be connected to Accounts.
          </p>
          <AccountPicker selected={account} select={setAccount} />
          <h3>What Accounts can access</h3>
          <p className="muted">
            Choose what users will be able to do with this account.
          </p>
          <CapabilityList
            transfer={transfer}
            toggleTransfer={() => setTransfer(!transfer)}
          />
          <div className="setupactions">
            <button className="outline" onClick={back}>
              Back
            </button>
            <button className="primary" onClick={done}>
              Continue
            </button>
          </div>
        </div>
        <SetupSummary />
      </div>
    </ProductShell>
  )
}
