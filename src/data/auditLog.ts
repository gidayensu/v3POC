import { FilePenLine, FilePlus2 } from "lucide-react"

import type { LogGroup, RecentLogEntry } from "@/types"

/**
 * The workspace audit trail. Home shows the newest few lines of it and the
 * audit page shows all of it grouped, so both read from here.
 */
export const auditGroups: LogGroup[] = [
  {
    title: "User Management",
    entries: [
      {
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
        icon: FilePlus2,
        tone: "green",
        text: [
          "Seth Nkansah created a new user – ",
          { b: "Alfred Abankwah" },
          " successfully.",
        ],
        at: "2:57 PM",
      },
    ],
  },
  {
    title: "Sms Messages",
    entries: [
      {
        icon: FilePenLine,
        text: [
          { b: "Richard A. Mensah" },
          " updated the details of a recipient.",
        ],
        link: "View Details",
        at: "3:24 PM",
      },
      {
        icon: FilePenLine,
        text: [
          { b: "Richard A. Mensah" },
          " updated the details of a recipient.",
        ],
        link: "View Details",
        at: "3:23 PM",
      },
      {
        icon: FilePenLine,
        text: [
          { b: "Richard A. Mensah" },
          " updated the details of a recipient.",
        ],
        link: "View Details",
        at: "3:14 PM",
      },
      {
        icon: FilePenLine,
        text: [
          { b: "Richard A. Mensah" },
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
        text: [
          "Seth Nkansah successfully added ",
          { b: "terminal" },
          " Aduamah Lawrence, 58833 as a portal user with ",
          { b: "email" },
          ": laduamah@arbapexbank.com",
        ],
        at: "3:02 PM",
      },
    ],
  },
]

/** Minutes past midnight, so "3:26 PM" sorts against "11:04 AM". */
const minutes = (at: string) => {
  const [, h, m, suffix] = /^(\d+):(\d+)\s*(AM|PM)$/i.exec(at) ?? []
  if (!h) return 0
  const hour = Number(h) % 12
  return (suffix.toUpperCase() === "PM" ? hour + 12 : hour) * 60 + Number(m)
}

/** The newest lines across every group, for the home page's activity panel. */
export const recentLogEntries = (limit: number): RecentLogEntry[] =>
  auditGroups
    .flatMap((group) =>
      group.entries.map((entry) => ({ ...entry, group: group.title }))
    )
    .sort((a, b) => minutes(b.at) - minutes(a.at))
    .slice(0, limit)
