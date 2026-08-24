import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * The single button treatment shared by every row action in the catalogue:
 * one height, one radius, one type scale, so labels of any length still line up.
 */
const actionButton = cva(
  "inline-flex h-9 shrink-0 items-center justify-center rounded-md px-3.5 text-[13px] font-semibold tracking-[-0.005em] whitespace-nowrap transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#0b63f6]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-45",
  {
    variants: {
      variant: {
        /** The one confident action per row — entering a live application. */
        primary:
          "bg-[#0b63f6] text-white shadow-[0_1px_2px_rgb(11_99_246/0.2)] hover:bg-[#0a58dd] active:bg-[#0950c4]",
        /** Everything else: quiet, borderless, still obviously clickable. */
        secondary:
          "bg-[#f1f4f9] text-[#41506b] hover:bg-[#e6ecf6] hover:text-[#101d42] active:bg-[#dbe4f2]",
      },
    },
    defaultVariants: { variant: "secondary" },
  }
)

export function ActionButton({
  variant,
  className,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof actionButton>) {
  return (
    <button
      type="button"
      className={cn(actionButton({ variant }), className)}
      {...props}
    />
  )
}
