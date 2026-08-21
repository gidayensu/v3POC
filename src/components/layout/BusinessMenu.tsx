import { Check, ChevronDown, Plus } from "lucide-react"

import { switchableBusinesses } from "@/data/businesses"
import { startExternalOnboarding } from "@/lib/onboarding"
import type { SwitchableBusiness, View } from "@/types"

export function BusinessMenu({
  merchant,
  open,
  toggle,
  close,
  select,
  go,
}: {
  merchant: string
  open: boolean
  toggle: () => void
  close: () => void
  select: (business: SwitchableBusiness) => void
  go: (view: View) => void
}) {
  return (
    <div className="merchant">
      <button onClick={toggle}>
        <span>ACME</span>
        <b>{merchant}</b>
        <ChevronDown />
      </button>
      {open && (
        <div className="business-pop">
          <small>SWITCH BUSINESS</small>
          {switchableBusinesses.map((item) => (
            <button
              onClick={() => {
                if (item.name !== merchant) select(item)
                close()
              }}
              key={item.name}
            >
              <span>{item.initials}</span>
              <p>
                <b>{item.name}</b>
                <small>
                  {item.status === "onboarding"
                    ? "Onboarding incomplete"
                    : "Approved business"}
                </small>
              </p>
              {item.name === merchant && <Check />}
            </button>
          ))}
          <button
            className="blue"
            onClick={() => {
              startExternalOnboarding()
              close()
              go("businesses")
            }}
          >
            <Plus />
            Add another business
          </button>
        </div>
      )}
    </div>
  )
}
