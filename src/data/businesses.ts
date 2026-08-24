import acmeLogo from "@/assets/acme.png"
import acmeManufacturingLogo from "@/assets/acme_manu.png"
import novaLogo from "@/assets/nova.png"
import type { SwitchableBusiness } from "@/types"

/** Businesses offered in the topbar business switcher. */
export const switchableBusinesses: SwitchableBusiness[] = [
  {
    name: "Acme Trading Ltd",
    initials: "ACME",
    logo: acmeLogo,
    status: "approved",
  },
  {
    name: "Nova Retail Ltd",
    initials: "NR",
    logo: novaLogo,
    status: "onboarding",
  },
  {
    name: "Acme Manufacturing",
    initials: "AD",
    logo: acmeManufacturingLogo,
    status: "approved",
  },
]

/** The logo of the business currently in context, matched by name. */
export const businessLogo = (name: string) =>
  switchableBusinesses.find((business) => business.name === name)?.logo
