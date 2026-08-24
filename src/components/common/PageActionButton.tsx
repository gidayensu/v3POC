import type { LucideIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const pageActionButton = cva(
  "inline-flex h-10 items-center justify-center gap-2 rounded-md border px-3.5 text-[12px] font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#243cc4]/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45",
  {
    variants: {
      variant: {
        filled:
          "border-[#105289] bg-[#105289] font-bold !text-white shadow-[0_1px_2px_rgb(16_82_137/0.18)] hover:border-[#105289] hover:bg-[#105289] active:border-[#105289] active:bg-[#105289]",
        outline:
          "border-[#105289] border-2 bg-white font-bold !text-[#105289] hover:bg-[#f3f5ff] active:bg-[#e8ebff]",
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
