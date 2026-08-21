import type { Product } from "@/types"

export function ProductIcon({
  p,
  big = false,
  neutral = false,
}: {
  p: Product
  big?: boolean
  neutral?: boolean
}) {
  const I = p.icon
  return (
    <span
      className={`picon ${neutral ? "neutral" : p.color} ${big ? "big" : ""}`}
    >
      <I />
    </span>
  )
}
