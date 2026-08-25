import {
  ChevronsUpDown,
  MoreHorizontal,
  Plus,
  SlidersHorizontal,
} from "lucide-react"

import { PageActionButton } from "@/components/common"

type UserStatus = "active" | "pending" | "blocked"

type UserRow = {
  name: string
  email: string
  role: string
  status: UserStatus
  merchant?: string
  branch?: string
  created: string
}

const users: UserRow[] = [
  {
    name: "Aduamah Lawrence",
    email: "laduamah@arbapexbank.com",
    role: "RPay Merchant Admin",
    status: "active",
    created: "Aug 24, 2026, 3:02 PM",
  },
  {
    name: "Alfred Abankwah",
    email: "aabankwah@arbapexbank.com",
    role: "RPay Merchant Admin",
    status: "active",
    created: "Aug 24, 2026, 2:57 PM",
  },
  {
    name: "Seth Nkansah",
    email: "snkansah@acmetrading.com",
    role: "Global Transactions Admin",
    status: "active",
    created: "Aug 20, 2026, 8:24 AM",
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
    name: "Richard A. Mensah",
    email: "rmensah@novaretail.com",
    role: "SMS Admin",
    status: "active",
    merchant: "Nova Retail Ltd",
    created: "Aug 10, 2026, 3:11 PM",
  },
  {
    name: "Gideon Okafor",
    email: "gokafor@acmetrading.com",
    role: "Apex Admin",
    status: "active",
    created: "Aug 10, 2026, 1:23 PM",
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
    name: "Alfred Abankwah",
    email: "alfred.abankwah+terminal@arbapexbank.com",
    role: "RPay Terminal",
    status: "blocked",
    merchant: "Nova Retail Ltd",
    created: "Aug 04, 2026, 4:10 PM",
  },
]

/** Outlined status pills — one border-and-text pair per state, no fills. */
const statusPill: Record<UserStatus, { label: string; className: string }> = {
  active: { label: "Active", className: "border-[#4553d6] text-[#3b48c9]" },
  pending: { label: "Pending", className: "border-[#e0a325] text-[#b57d10]" },
  blocked: { label: "Blocked", className: "border-[#c3c9d6] text-[#5b6478]" },
}

/** Column headers the list can be sorted by carry the up/down affordance. */
const columns: { label: string; sortable?: boolean; className?: string }[] = [
  { label: "#", className: "w-14" },
  { label: "User info", sortable: true },
  { label: "Role" },
  { label: "Status", sortable: true },
  { label: "Merchant", sortable: true },
  { label: "Branch" },
  { label: "Created", sortable: true },
  { label: "Actions", className: "w-24" },
]

export function UsersPage({
  merchant = "Acme Trading Ltd",
}: {
  merchant?: string
}) {
  return (
    <section className="rounded-xl border border-[#e6e9f2] bg-white p-5">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <PageActionButton icon={Plus}>New User</PageActionButton>
        <PageActionButton variant="outline">
          Show Deleted Users
        </PageActionButton>
        <PageActionButton
          variant="outline"
          icon={SlidersHorizontal}
          className="ml-auto"
        >
          Filter
        </PageActionButton>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-left">
          <thead>
            <tr className="bg-[#f7f8fc]">
              <th className="w-12 rounded-l-md px-4 py-3">
                <input
                  type="checkbox"
                  aria-label="Select all users"
                  className="size-4 accent-[#105289]"
                />
              </th>
              {columns.map((column, i) => (
                <th
                  key={column.label}
                  className={`px-3 py-3 text-[11px] font-semibold tracking-[0.06em] text-[#3b4763] uppercase ${
                    i === columns.length - 1 ? "rounded-r-md" : ""
                  } ${column.className ?? ""}`}
                >
                  <span className="inline-flex items-center gap-1.5">
                    {column.label}
                    {column.sortable && (
                      <ChevronsUpDown
                        aria-hidden="true"
                        className="size-3 text-[#8b95ad]"
                      />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr
                key={user.email}
                className="border-b border-[#eef0f6] last:border-0 hover:bg-[#f9fafd]"
              >
                <td className="px-4 py-4 align-middle">
                  <input
                    type="checkbox"
                    aria-label={`Select ${user.name}`}
                    className="size-4 accent-[#105289]"
                  />
                </td>
                <td className="px-3 py-4 text-[13px] text-[#5b6478]">
                  {i + 1}
                </td>
                <td className="px-3 py-4">
                  <span className="block text-[13px] font-semibold text-[#101d42]">
                    {user.name}
                  </span>
                  <span className="block text-[12px] text-[#6b7793]">
                    {user.email}
                  </span>
                </td>
                <td className="px-3 py-4 text-[13px] text-[#3f4a60]">
                  {user.role}
                </td>
                <td className="px-3 py-4">
                  <span
                    className={`inline-flex h-6 items-center rounded-md border px-2 text-[11px] font-medium ${statusPill[user.status].className}`}
                  >
                    {statusPill[user.status].label}
                  </span>
                </td>
                <td className="px-3 py-4 text-[13px] text-[#3f4a60]">
                  {user.merchant ?? merchant}
                </td>
                <td className="px-3 py-4 text-[13px] text-[#8b95ad]">
                  {user.branch ?? "--"}
                </td>
                <td className="px-3 py-4 text-[13px] whitespace-nowrap text-[#3f4a60]">
                  {user.created}
                </td>
                <td className="px-3 py-4">
                  <button
                    type="button"
                    aria-label={`Actions for ${user.name}`}
                    className="inline-flex size-8 items-center justify-center rounded-md text-[#8b95ad] transition-colors hover:bg-[#f1f4f9] hover:text-[#3f4a60]"
                  >
                    <MoreHorizontal aria-hidden="true" className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
