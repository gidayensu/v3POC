import { useState } from "react"
import { Building2, Check, Landmark, ShieldCheck, Users } from "lucide-react"

import { Page } from "@/components/common"
import { ProductShell } from "@/components/layout"
import { ChangeRequestModal } from "@/pages/accounts/ChangeRequestModal"

const configRows = [
  [Building2, "Merchant", "Acme Trading Ltd"],
  [Landmark, "Operating Account ••••4587", "Titan Trust Bank"],
  [
    Users,
    "Permissions",
    "View balances · Download statements · View transactions",
  ],
  [Users, "User access", "4 users have access"],
  [
    ShieldCheck,
    "Last approved by",
    "Compliance Operations · Aug 18, 2026 at 11:42 AM",
  ],
] as const

const changeReasons = [
  "Compare current and proposed values",
  "Preserve active configuration until approved",
  "Changes are reviewed for compliance",
  "Users will be notified after activation",
]

export function AccountsConfigPage({ back }: { back: () => void }) {
  const [modal, setModal] = useState(false)
  return (
    <>
      <ProductShell back={back}>
        <Page
          title="Accounts configuration"
          sub="Configuration version 1 · Effective Aug 20, 2026"
          action={
            <button className="outline" onClick={() => setModal(true)}>
              Request a change
            </button>
          }
        >
          <div className="configgrid">
            <section className="config">
              <h2>Configuration summary</h2>
              {configRows.map(([I, title, value]) => (
                <div key={title}>
                  <I />
                  <p>
                    <b>{title}</b>
                    <span>{value}</span>
                  </p>
                </div>
              ))}
            </section>
            <aside>
              <section className="infobox">
                <h2>Active configuration</h2>
                <p>This configuration is currently active and in effect.</p>
                <hr />
                <b>Effective date</b>
                <span>Aug 20, 2026</span>
                <b>Approved on</b>
                <span>Aug 18, 2026 at 11:42 AM</span>
              </section>
              <section className="infobox">
                <h2>Why request a change?</h2>
                {changeReasons.map((reason) => (
                  <p key={reason}>
                    <Check /> {reason}
                  </p>
                ))}
              </section>
            </aside>
          </div>
        </Page>
      </ProductShell>
      {modal && <ChangeRequestModal close={() => setModal(false)} />}
    </>
  )
}
