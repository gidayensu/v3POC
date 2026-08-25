import { identityFor } from "@/data/appIdentity"
import type { Product } from "@/types"

/**
 * The identity of one application. The suite ships no logos, so every mark is
 * built the same way — one ink tile, the product's own glyph, no colour. What
 * separates two applications is the glyph and the name, never a hue, which
 * keeps a row of seven marks calm instead of decorative.
 */
export function AppMark({
  p,
  size = 40,
  monogram = false,
  muted = false,
  className = "",
}: {
  p: Product
  size?: number
  /** Use the two-letter monogram instead of the glyph. */
  monogram?: boolean
  /** Quiet variant for dense lists, where a solid tile would shout. */
  muted?: boolean
  className?: string
}) {
  const Glyph = p.icon
  return (
    <span
      aria-hidden
      className={`grid shrink-0 place-items-center ${
        muted ? "bg-[#eff2f7] text-[#101d42]" : "bg-[#101d42] text-white"
      } ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.28),
      }}
    >
      {monogram ? (
        <b
          className="font-data leading-none font-medium tracking-[-0.02em]"
          style={{ fontSize: Math.round(size * 0.34) }}
        >
          {identityFor(p.name).monogram}
        </b>
      ) : (
        <Glyph
          strokeWidth={1.75}
          style={{ width: size * 0.46, height: size * 0.46 }}
        />
      )}
    </span>
  )
}
