import acmeLogo from "@/assets/acme.png"
import acmeManufacturingLogo from "@/assets/acme_manu.png"
import novaLogo from "@/assets/nova.png"
import royalLogo from "@/assets/royal.png"
import type { SwitchableBusiness } from "@/types"

/** Businesses offered in the topbar business switcher. */
export const switchableBusinesses: SwitchableBusiness[] = [
  {
    name: "Acme Trading Ltd",
    initials: "ACME",
    logo: acmeLogo,
    status: "approved",
    access: "managed",
  },
  {
    name: "Nova Retail Ltd",
    initials: "NR",
    logo: novaLogo,
    status: "onboarding",
    access: "managed",
  },
  {
    name: "Acme Manufacturing",
    initials: "AD",
    logo: acmeManufacturingLogo,
    status: "approved",
    access: "managed",
  },
  {
    /* Royal Sale is not ours to administer: we hold a seat on its RPay
       instance and nothing else, so the switch asks which role to assume. */
    name: "Royal Sale Limited",
    initials: "RS",
    logo: royalLogo,
    status: "approved",
    access: "product",
    productApp: "RPay",
    roles: ["RPay Merchant Admin", "RPay Branch Admin"],
  },
]

/** The logo of the business currently in context, matched by name. */
export const businessLogo = (name: string) =>
  switchableBusinesses.find((business) => business.name === name)?.logo

export const businessByName = (name: string) =>
  switchableBusinesses.find((business) => business.name === name)

/** True when the named business exposes its applications but not itself. */
export const isProductAccess = (name: string) =>
  businessByName(name)?.access === "product"
