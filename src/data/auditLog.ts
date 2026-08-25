import { FilePenLine, FilePlus2 } from "lucide-react"

import { merchantOfUser } from "@/data/users"
import type { LogGroup, RecentLogEntry } from "@/types"

/**
 * The workspace audit trail. Home shows the newest few lines of it and the
 * audit page shows all of it grouped, so both read from here. Every line names
 * the user who performed it, which is how a line is traced back to a business.
 */
export const auditGroups: LogGroup[] = [
  {
    title: "User Management",
    entries: [
      {
        actor: "mbessah@acmetrading.com",
        icon: FilePenLine,
        text: [
          "Maame Akua Kyerewaa Bessah changed the ",
          { b: "Selasi Pharmacy Shop" },
          " theme to ",
          { b: "#1E89EF" },
        ],
        at: "3:26 PM",
      },
      {
        actor: "snkansah@acmetrading.com",
        icon: FilePenLine,
        text: [
          { b: "Seth Nkansah" },
          " update roles from ",
          { b: "RPay Terminal" },
          " to ",
          { b: "RPay Merchant Admin" },
          " for user – ",
          { b: "Aduamah Lawrence" },
          " successfully.",
        ],
        at: "3:11 PM",
      },
      {
        actor: "snkansah@acmetrading.com",
        icon: FilePenLine,
        text: [
          { b: "Seth Nkansah" },
          " reassigned ",
          { b: "Aduamah Lawrence laduamah@arbapexbank.com" },
          " branches from ",
          { b: "none" },
          " to successfully.",
        ],
        at: "3:11 PM",
      },
      {
        actor: "snkansah@acmetrading.com",
        icon: FilePlus2,
        tone: "green",
        text: [
          "Seth Nkansah created a new user – ",
          { b: "Alfred Abankwah" },
          " successfully.",
        ],
        at: "2:57 PM",
      },
      {
        actor: "edanso@novaretail.com",
        icon: FilePlus2,
        tone: "green",
        text: [
          "Efua Danso created a new user – ",
          { b: "Richard A. Mensah" },
          " successfully.",
        ],
        at: "2:41 PM",
      },
      {
        actor: "kasare@acmemanufacturing.com",
        icon: FilePenLine,
        text: [
          { b: "Kwabena Asare" },
          " reassigned ",
          { b: "Selasi Pharmacy Shop shop@selasipharmacy.com" },
          " branches from ",
          { b: "none" },
          " to ",
          { b: "Tema Industrial" },
          " successfully.",
        ],
        at: "1:52 PM",
      },
    ],
  },
  {
    title: "Sms Messages",
    entries: [
      {
        actor: "rmensah@novaretail.com",
        icon: FilePenLine,
        text: [
          { b: "Richard A. Mensah" },
          " updated the details of a recipient.",
        ],
        link: "View Details",
        at: "3:24 PM",
      },
      {
        actor: "rmensah@novaretail.com",
        icon: FilePenLine,
        text: [
          { b: "Richard A. Mensah" },
          " updated the details of a recipient.",
        ],
        link: "View Details",
        at: "3:23 PM",
      },
      {
        actor: "rmensah@novaretail.com",
        icon: FilePenLine,
        text: [
          { b: "Richard A. Mensah" },
          " updated the details of a recipient.",
        ],
        link: "View Details",
        at: "3:14 PM",
      },
      {
        actor: "mbessah@acmetrading.com",
        icon: FilePenLine,
        text: [
          { b: "Maame Akua Kyerewaa Bessah" },
          " updated the details of a recipient.",
        ],
        link: "View Details",
        at: "3:14 PM",
      },
    ],
  },
  {
    title: "Terminal",
    entries: [
      {
        actor: "aabankwah@arbapexbank.com",
        text: [
          "Alfred Abankwah successfully added a new terminal with ",
          { b: "name" },
          ": ALFRED ABANKWAH, ",
          { b: "mobile number" },
          ": 233249383068 in ",
          { b: "branch" },
          ": Apex Rpay Product",
        ],
        at: "3:12 PM",
      },
      {
        actor: "snkansah@acmetrading.com",
        text: [
          "Seth Nkansah successfully added ",
          { b: "terminal" },
          " Aduamah Lawrence, 58833 as a portal user with ",
          { b: "email" },
          ": laduamah@arbapexbank.com",
        ],
        at: "3:02 PM",
      },
      {
        actor: "shop@selasipharmacy.com",
        text: [
          "Selasi Pharmacy Shop successfully added a new terminal with ",
          { b: "name" },
          ": SELASI PHARMACY 02, ",
          { b: "mobile number" },
          ": 233207714520 in ",
          { b: "branch" },
          ": Tema Industrial",
        ],
        at: "2:48 PM",
      },
      {
        actor: "alfred.abankwah+terminal@arbapexbank.com",
        text: [
          "Alfred Abankwah successfully added ",
          { b: "terminal" },
          " Efua Danso, 61204 as a portal user with ",
          { b: "email" },
          ": edanso@novaretail.com",
        ],
        at: "2:20 PM",
      },
    ],
  },
]

/**
 * The trail narrowed to the business in context: only lines performed by users
 * of that business, with groups that end up empty dropped.
 */
export const auditGroupsForMerchant = (merchant: string): LogGroup[] =>
  auditGroups
    .map((group) => ({
      ...group,
      entries: group.entries.filter(
        (entry) => entry.actor && merchantOfUser(entry.actor) === merchant
      ),
    }))
    .filter((group) => group.entries.length > 0)

/** Minutes past midnight, so "3:26 PM" sorts against "11:04 AM". */
const minutes = (at: string) => {
  const [, h, m, suffix] = /^(\d+):(\d+)\s*(AM|PM)$/i.exec(at) ?? []
  if (!h) return 0
  const hour = Number(h) % 12
  return (suffix.toUpperCase() === "PM" ? hour + 12 : hour) * 60 + Number(m)
}

/** The newest lines across every group, for the home page's activity panel. */
export const recentLogEntries = (
  limit: number,
  merchant?: string
): RecentLogEntry[] =>
  (merchant ? auditGroupsForMerchant(merchant) : auditGroups)
    .flatMap((group) =>
      group.entries.map((entry) => ({ ...entry, group: group.title }))
    )
    .sort((a, b) => minutes(b.at) - minutes(a.at))
    .slice(0, limit)
