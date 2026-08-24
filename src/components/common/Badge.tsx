import { statusLabels } from "@/data/labels"

export function Badge({ s }: { s: string }) {
  return (
    <span className={`badge ${s}`}>
      {statusLabels[s] || s}
    </span>
  )
}
