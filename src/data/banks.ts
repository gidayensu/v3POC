import ecobankLogo from "@/assets/ecobank.png"
import gcbLogo from "@/assets/gcb.png"

export type SettlementBank = {
  id: string
  name: string
  logo: string
}

/** Banks Transflow can settle to for this merchant today. */
export const settlementBanks: SettlementBank[] = [
  { id: "ecobank", name: "Ecobank Ghana", logo: ecobankLogo },
  { id: "gcb", name: "GCB Bank", logo: gcbLogo },
]

export const bankById = (id: string) =>
  settlementBanks.find((bank) => bank.id === id)
