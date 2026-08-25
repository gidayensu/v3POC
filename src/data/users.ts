import type { UserRecord } from "@/types"

/**
 * Every user across the workspace. Each row names the business it belongs to,
 * so the users list and the audit trail can both narrow to the active one.
 */
export const users: UserRecord[] = [
  {
    name: "Aduamah Lawrence",
    email: "laduamah@arbapexbank.com",
    role: "RPay Merchant Admin",
    status: "active",
    merchant: "Acme Trading Ltd",
    created: "Aug 24, 2026, 3:02 PM",
  },
  {
    name: "Alfred Abankwah",
    email: "aabankwah@arbapexbank.com",
    role: "RPay Merchant Admin",
    status: "active",
    merchant: "Acme Trading Ltd",
    created: "Aug 24, 2026, 2:57 PM",
  },
  {
    name: "Seth Nkansah",
    email: "snkansah@acmetrading.com",
    role: "Global Transactions Admin",
    status: "active",
    merchant: "Acme Trading Ltd",
    created: "Aug 20, 2026, 8:24 AM",
  },
  {
    name: "Gideon Okafor",
    email: "gokafor@acmetrading.com",
    role: "Apex Admin",
    status: "active",
    merchant: "Acme Trading Ltd",
    created: "Aug 10, 2026, 1:23 PM",
  },
  {
    name: "Maame Akua Kyerewaa Bessah",
    email: "mbessah@acmetrading.com",
    role: "RPay Marketplace Admin",
    status: "active",
    merchant: "Acme Manufacturing",
    created: "Aug 10, 2026, 3:13 PM",
  },
  {
    name: "Selasi Pharmacy Shop",
    email: "shop@selasipharmacy.com",
    role: "RPay Shop Attendant",
    status: "pending",
    merchant: "Acme Manufacturing",
    created: "Aug 07, 2026, 1:29 PM",
  },
  {
    name: "Kwabena Asare",
    email: "kasare@acmemanufacturing.com",
    role: "Apex Admin",
    status: "active",
    merchant: "Acme Manufacturing",
    branch: "Tema Industrial",
    created: "Aug 05, 2026, 11:48 AM",
  },
  {
    name: "Richard A. Mensah",
    email: "rmensah@novaretail.com",
    role: "SMS Admin",
    status: "active",
    merchant: "Nova Retail Ltd",
    created: "Aug 10, 2026, 3:11 PM",
  },
  {
    name: "Alfred Abankwah",
    email: "alfred.abankwah+terminal@arbapexbank.com",
    role: "RPay Terminal",
    status: "blocked",
    merchant: "Nova Retail Ltd",
    created: "Aug 04, 2026, 4:10 PM",
  },
  {
    name: "Efua Danso",
    email: "edanso@novaretail.com",
    role: "RPay Merchant Admin",
    status: "active",
    merchant: "Nova Retail Ltd",
    branch: "Osu High Street",
    created: "Aug 02, 2026, 9:05 AM",
  },
]

/** The users belonging to the business currently in context. */
export const usersForMerchant = (merchant: string) =>
  users.filter((user) => user.merchant === merchant)

/** The business a user belongs to, matched by the email that identifies them. */
export const merchantOfUser = (email: string) =>
  users.find((user) => user.email === email)?.merchant
