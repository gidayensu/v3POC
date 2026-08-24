import { FilePenLine, FilePlus2, type LucideIcon } from "lucide-react"

/** A log line is plain text with the entities it touched picked out in bold. */
type Segment = string | { b: string }

type LogEntry = {
  icon?: LucideIcon
  tone?: "blue" | "green"
  text: Segment[]
  link?: string
  at: string
}

type LogGroup = {
  title: string
  entries: LogEntry[]
}

const groups: LogGroup[] = [
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

const toneStyles = {
  blue: "bg-[#7cc3e8]",
  green: "bg-[#43ac72]",
}

export function AuditPage() {
  return (
    <section className="rounded-xl border border-[#e6e9f2] bg-white px-6 py-5">
      {groups.map((group) => (
        <div key={group.title}>
          <h2 className="border-b border-[#e8ebf2] pb-2.5 text-[13px] font-medium text-[#2340c8]">
            {group.title}
          </h2>
          {group.entries.map((entry, i) => {
            const Icon = entry.icon
            return (
              <div
                key={`${group.title}-${i}`}
                className="flex items-center gap-3.5 border-b border-[#eef0f6] py-3.5 last:border-0"
              >
                <span
                  className={`grid size-8 shrink-0 place-items-center rounded-full text-white ${toneStyles[entry.tone ?? "blue"]}`}
                >
                  {Icon && <Icon aria-hidden="true" className="size-4" />}
                </span>
                <p className="min-w-0 flex-1 text-[13px] leading-snug text-[#3f4a60]">
                  {entry.text.map((segment, s) =>
                    typeof segment === "string" ? (
                      <span key={s}>{segment}</span>
                    ) : (
                      <b key={s} className="font-semibold text-[#101d42]">
                        {segment.b}
                      </b>
                    )
                  )}
                  {entry.link && (
                    <button
                      type="button"
                      className="ml-2 text-[13px] text-[#2340c8] underline-offset-2 hover:underline"
                    >
                      {entry.link}
                    </button>
                  )}
                </p>
                <span className="shrink-0 text-[12px] whitespace-nowrap text-[#3f4a60]">
                  {entry.at}
                </span>
              </div>
            )
          })}
        </div>
      ))}
    </section>
  )
}
