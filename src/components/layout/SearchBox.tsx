import {
  Building2,
  ChevronRight,
  CreditCard,
  Landmark,
  Search,
  Users,
} from "lucide-react"

import { Overlay } from "@/components/common"
import type { View } from "@/types"

const quickResults = [
  { icon: Landmark, title: "Accounts", kind: "Application", view: "setup" },
  {
    icon: Building2,
    title: "Acme Trading Ltd",
    kind: "Business",
    view: "businesses",
  },
  { icon: Users, title: "Ama Mensah", kind: "User", view: "users" },
  {
    icon: CreditCard,
    title: "Operating Account ••••4587",
    kind: "Account",
    view: "accounts",
  },
] as const

export function SearchBox({
  close,
  go,
}: {
  close: () => void
  go: (view: View) => void
}) {
  return (
    <Overlay close={close}>
      <section className="searchbox">
        <label>
          <Search />
          <input autoFocus placeholder="Search across Merchant Suite" />
          <kbd>ESC</kbd>
        </label>
        <small>QUICK RESULTS</small>
        {quickResults.map((result) => {
          const I = result.icon
          return (
            <button
              key={result.title}
              onClick={() => {
                go(result.view as View)
                close()
              }}
            >
              <I />
              <p>
                <b>{result.title}</b>
                <span>{result.kind}</span>
              </p>
              <ChevronRight />
            </button>
          )
        })}
      </section>
    </Overlay>
  )
}
