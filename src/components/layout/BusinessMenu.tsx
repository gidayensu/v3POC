import { Check, ChevronDown, Plus } from "lucide-react"

import { BusinessLogo } from "@/components/common"
import { businessLogo, switchableBusinesses } from "@/data/businesses"
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
    <div className="relative shrink-0">
      <button
        type="button"
        className="flex items-center gap-2.5 rounded-lg px-1.5 py-1 transition-colors outline-none hover:bg-[#f1f4f9] focus-visible:ring-2 focus-visible:ring-[#0b63f6]/35"
        onClick={toggle}
        aria-expanded={open}
      >
        <BusinessLogo src={businessLogo(merchant)} name={merchant} />
        <b className="text-[15px] font-bold whitespace-nowrap text-[#101d42] max-md:hidden">
          {merchant}
        </b>
        <ChevronDown className="text-[#101d42]" />
      </button>
      {open && (
        <div className="absolute top-13 left-0 z-30 w-80 rounded-lg border border-[#dce1e8] bg-white p-2 shadow-[0_15px_35px_#10204a2b]">
          <small className="block px-2.5 py-2 text-xs font-semibold tracking-[0.06em] text-[#6f798a] uppercase">
            Switch business
          </small>
          {switchableBusinesses.map((item) => (
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-md p-2.5 text-left transition-colors outline-none hover:bg-[#f4f7fb] focus-visible:ring-2 focus-visible:ring-[#0b63f6]/35"
              onClick={() => {
                if (item.name !== merchant) select(item)
                close()
              }}
              key={item.name}
            >
              <BusinessLogo src={item.logo} name={item.name} />
              <p className="m-0 grid flex-1">
                <b className="text-sm font-semibold text-[#101d42]">
                  {item.name}
                </b>
                <small className="text-xs text-[#788294]">
                  {item.status === "onboarding"
                    ? "Onboarding incomplete"
                    : "Approved business"}
                </small>
              </p>
              {item.name === merchant && (
                <Check className="shrink-0 text-[#0b63f6]" />
              )}
            </button>
          ))}
          <button
            type="button"
            className="mt-1 flex w-full items-center gap-2.5 rounded-md border-t border-[#eef1f5] p-2.5 text-sm font-semibold text-[#0b63f6] transition-colors outline-none hover:bg-[#f4f7fb] focus-visible:ring-2 focus-visible:ring-[#0b63f6]/35"
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
