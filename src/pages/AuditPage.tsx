import { ActivityLog } from "@/components/common"
import { auditGroupsForMerchant } from "@/data/auditLog"

export function AuditPage({ merchant }: { merchant: string }) {
  const groups = auditGroupsForMerchant(merchant)
  return (
    <section className="rounded-xl border border-[#e6e9f2] bg-white px-6 py-5">
      {groups.length > 0 ? (
        <ActivityLog groups={groups} />
      ) : (
        <p className="py-10 text-center text-[13px] text-[#6b7793]">
          No activity recorded for {merchant} yet.
        </p>
      )}
    </section>
  )
}
