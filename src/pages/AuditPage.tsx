import { ActivityLog } from "@/components/common"
import { auditGroups } from "@/data/auditLog"

export function AuditPage() {
  return (
    <section className="rounded-xl border border-[#e6e9f2] bg-white px-6 py-5">
      <ActivityLog groups={auditGroups} />
    </section>
  )
}
