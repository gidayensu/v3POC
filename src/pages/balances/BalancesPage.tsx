import { useState } from "react"
import { ChevronRight, Landmark } from "lucide-react"

import { balancesTabs } from "@/data/tabs"
import { BalancesTab } from "@/pages/balances/BalancesTabs"

const accounts = [
  [
    "Titan Trust Bank",
    "Operating Account ••••4587",
    "GHS 198,420.42",
    "GHS 204,810.18",
  ],
  [
    "Guardian Commercial Bank",
    "Reserve Account ••••2196",
    "GHS 50,500.00",
    "GHS 58,294.00",
  ],
]

function BalancesOverview({ merchant }: { merchant: string }) {
  return (
    <>
      <section className="balance-hero">
        <div>
          <small>TOTAL AVAILABLE BALANCE</small>
          <h2>GHS 248,920.42</h2>
          <p>Across 2 accounts for {merchant}</p>
        </div>
        <div>
          <small>TOTAL LEDGER BALANCE</small>
          <h2>GHS 263,104.18</h2>
          <p>Includes pending activity</p>
        </div>
        <button className="outline">Download statement</button>
      </section>
      <section className="ops-list account-balances">
        <header>
          <div>
            <h2>Business accounts</h2>
            <p>Balances refresh automatically.</p>
          </div>
          <span className="live">
            <i />
            Live
          </span>
        </header>
        {accounts.map((account, i) => (
          <div key={account[1]}>
            <span className={`bank-logo b${i}`}>
              <Landmark />
            </span>
            <p>
              <b>{account[1]}</b>
              <small>{account[0]}</small>
            </p>
            <span>
              <small>Available</small>
              <b>{account[2]}</b>
            </span>
            <span>
              <small>Ledger</small>
              <b>{account[3]}</b>
            </span>
            <ChevronRight />
          </div>
        ))}
      </section>
    </>
  )
}

export function BalancesPage({ merchant }: { merchant: string }) {
  const [tab, setTab] = useState("Balances")
  return (
    <div className="ops-page">
      <div className="context-tabs">
        {balancesTabs.map((item) => (
          <button
            className={tab === item ? "active" : ""}
            onClick={() => setTab(item)}
            key={item}
          >
            {item}
          </button>
        ))}
      </div>
      {tab === "Balances" ? (
        <BalancesOverview merchant={merchant} />
      ) : (
        <BalancesTab tab={tab} merchant={merchant} />
      )}
    </div>
  )
}
