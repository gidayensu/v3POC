import { useEffect, useState } from "react"
import { Plus } from "lucide-react"

import { Badge } from "@/components/common"
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
    name: "Acme Distribution",
    status: "approved",
    kind: "Related business",
  },
]

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
    <div className="businessgrid">
      {businesses.map((x) => (
        <article key={x.name}>
          <i>{x.initials}</i>
          <h2>{x.name}</h2>
          <Badge s={x.status === "approved" ? "approved" : "pending"} />
          <p>{x.kind}</p>
          <button
            className="outline"
            onClick={() => {
              setSelected(x.name)
              localStorage.setItem(keys.selectedBusiness, x.name)
            }}
          >
            View business
          </button>
        </article>
      ))}
      <button
        className="addbiz"
        onClick={() => {
          startExternalOnboarding()
          setSelected("New business application")
        }}
      >
        <Plus />
        <b>Add another business</b>
        <span>Continue securely in the onboarding portal</span>
      </button>
    </div>
  )
}
