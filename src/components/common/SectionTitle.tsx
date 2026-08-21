import { ChevronRight } from "lucide-react"

export function SectionTitle({
  title,
  onViewAll,
}: {
  title: string
  onViewAll?: () => void
}) {
  return (
    <div className="sectitle">
      <h2>{title}</h2>
      <button onClick={onViewAll}>
        View all <ChevronRight />
      </button>
    </div>
  )
}
