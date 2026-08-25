import { useEffect, useState } from "react"
import { Plus } from "lucide-react"

import acmeManuLogo from "@/assets/acme_manu.png"
import acmeLogo from "@/assets/acme.png"
import novaLogo from "@/assets/nova.png"
import { Badge, PageActionButton } from "@/components/common"
import { startExternalOnboarding } from "@/lib/onboarding"
import { keys, readJSON } from "@/lib/storage"
import { BusinessDetail } from "@/pages/businesses/BusinessDetail"
import type { BusinessRecord } from "@/types"

const baseBusinesses: BusinessRecord[] = [
  {
    initials: "ACME",
    name: "Acme Trading Ltd",
    status: "approved",
    kind: "Independent business",
  },
  {
    initials: "NR",
    name: "Nova Retail Ltd",
    status: "onboarding",
    kind: "Onboarding incomplete",
  },
  {
    initials: "AD",
    name: "Acme Manufacturing",
    status: "approved",
    kind: "Related business",
  },
]

/** The Acme/Nova wordmarks sit on a square canvas that is ~70% empty, while the
 *  Acme Manufacturing lockup fills its own. Each carries the scale that lands
 *  the mark at roughly 34px tall on the plate, so the row reads evenly. */
const logos: Record<string, { src: string; scale: string }> = {
  "Acme Trading Ltd": { src: acmeLogo, scale: "scale-[2.6]" },
  "Nova Retail Ltd": { src: novaLogo, scale: "scale-[2.6]" },
  "Acme Manufacturing": { src: acmeManuLogo, scale: "scale-90" },
}

function useBusinesses(): BusinessRecord[] {
  const onboarding = readJSON<{ name: string } | null>(keys.onboarding, null)
  return onboarding
    ? [
        ...baseBusinesses,
        {
          initials: "NB",
          name: onboarding.name,
          status: "onboarding",
          kind: "Onboarding incomplete",
        },
      ]
    : baseBusinesses
}

/** Brand plate: the wordmark when we have one, initials as the fallback. */
function LogoPlate({ business }: { business: BusinessRecord }) {
  const logo = logos[business.name]
  if (!logo)
    return (
      <span className="grid h-10 w-28 place-items-center rounded-md bg-[#f1f4fa] text-xs font-bold tracking-[0.06em] text-[#5b6a8a]">
        {business.initials}
      </span>
    )
  return (
    <span className="flex h-10 w-28 items-center overflow-hidden">
      <img
        src={logo.src}
        alt={business.name}
        className={`h-full w-full origin-left object-contain object-left ${logo.scale}`}
      />
    </span>
  )
}

function BusinessCard({
  business,
  open,
}: {
  business: BusinessRecord
  open: () => void
}) {
  return (
    <article className="flex flex-col rounded-xl bg-white p-6 shadow-[0_1px_2px_rgb(16_29_66/0.04)] transition-shadow hover:shadow-[0_6px_18px_rgb(16_29_66/0.08)]">
      <div className="flex items-start justify-between gap-4">
        <LogoPlate business={business} />
        <Badge s={business.status === "approved" ? "approved" : "pending"} />
      </div>

      <h2 className="mt-6 truncate text-[17px] font-bold tracking-[-0.01em] text-[#101d42]">
        {business.name}
      </h2>
      <p className="mt-1 text-sm text-[#8792a8]">{business.kind}</p>

      <PageActionButton
        variant="outline"
        className="mt-6 w-full"
        onClick={open}
      >
        View business
      </PageActionButton>
    </article>
  )
}

function AddBusinessCard({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-[#ccd5e6] bg-transparent p-6 text-center transition-colors hover:border-[#0b3565] hover:bg-[#f5f8fc]"
    >
      <span className="grid size-11 place-items-center rounded-full bg-[#eef3fa] text-[#0b3565] transition-colors group-hover:bg-[#e0e9f3]">
        <Plus className="size-5" strokeWidth={2.25} />
      </span>
      <b className="text-sm font-semibold text-[#101d42]">
        Add another business
      </b>
      <span className="max-w-[24ch] text-[13px] leading-relaxed text-[#8792a8]">
        Continue securely in the onboarding portal
      </span>
    </button>
  )
}

export function BusinessesPage({
  merchant,
  setMerchant,
}: {
  merchant: string
  setMerchant: (name: string) => void
}) {
  const [selected, setSelected] = useState(
    () => localStorage.getItem(keys.selectedBusiness) || ""
  )
  useEffect(() => {
    const openBusiness = (event: Event) =>
      setSelected((event as CustomEvent<string>).detail)
    window.addEventListener("transflow-business-detail", openBusiness)
    return () =>
      window.removeEventListener("transflow-business-detail", openBusiness)
  }, [])
  const businesses = useBusinesses()
  const business = businesses.find((x) => x.name === selected)
  const addBusiness = () => {
    startExternalOnboarding()
    setSelected("New business application")
  }
  if (business)
    return (
      <BusinessDetail
        business={business}
        merchant={merchant}
        setMerchant={setMerchant}
        back={() => {
          setSelected("")
          localStorage.removeItem(keys.selectedBusiness)
        }}
      />
    )
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-baseline gap-2">
          <h2 className="m-0 text-xs font-semibold tracking-[0.08em] text-[#8792a8] uppercase">
            Your businesses
          </h2>
          <span className="text-xs text-[#a6b0c2]">{businesses.length}</span>
        </div>
        <PageActionButton icon={Plus} onClick={addBusiness}>
          Add business
        </PageActionButton>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {businesses.map((x) => (
          <BusinessCard
            key={x.name}
            business={x}
            open={() => {
              setSelected(x.name)
              localStorage.setItem(keys.selectedBusiness, x.name)
            }}
          />
        ))}
        <AddBusinessCard onClick={addBusiness} />
      </div>
    </div>
  )
}
