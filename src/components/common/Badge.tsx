import { statusLabels } from "@/data/labels"

export function Badge({ s }: { s: string }) {
  return (
    <span className={`badge ${s}`}>
      <i />
      {statusLabels[s] || s}
    </span>
  )
}
