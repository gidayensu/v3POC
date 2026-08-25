import type { LucideIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const pageActionButton = cva(
  "inline-flex h-10 items-center justify-center gap-2 rounded-md border px-3.5 text-[12px] font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#0b3565]/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45",
  {
    variants: {
      variant: {
        filled:
          "border-[#0b3565] bg-[#0b3565] font-bold !text-white shadow-[0_1px_2px_rgb(0_32_71/0.22)] hover:border-[#072b53] hover:bg-[#072b53] active:border-[#002047] active:bg-[#002047]",
        outline:
          "border-[#0b3565] border-2 bg-white font-bold !text-[#0b3565] hover:border-[#072b53] hover:bg-[#eef3f9] hover:!text-[#072b53] active:bg-[#e0e9f3]",
      },
    },
    defaultVariants: { variant: "filled" },
  }
)

type PageActionButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof pageActionButton> & {
    icon?: LucideIcon
  }

export function PageActionButton({
  variant,
  icon: Icon,
  className,
  children,
  ...props
}: PageActionButtonProps) {
  return (
    <button
      type="button"
      className={cn(pageActionButton({ variant }), className)}
      {...props}
    >
      {Icon && (
        <Icon aria-hidden="true" className="size-5" strokeWidth={2.25} />
      )}
      {children}
    </button>
  )
}
