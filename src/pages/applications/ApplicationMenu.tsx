import { useEffect, useRef, useState } from "react"
import { MoreHorizontalIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"

export type MenuAction = {
  label: string
  icon: IconSvgElement
  run: () => void
}

/**
 * Ellipsis trigger for a catalogue row. Clicks are kept away from the card
 * behind it, so opening the menu never fires the row's default action.
 */
export function ApplicationMenu({
  label,
  actions,
}: {
  label: string
  actions: MenuAction[]
}) {
  const [open, setOpen] = useState(false)
  const wrap = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", onDown)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onDown)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <div
      ref={wrap}
      className="relative shrink-0"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        aria-label={`Actions for ${label}`}
        aria-expanded={open}
        aria-haspopup="menu"
        className={`inline-flex size-9 cursor-pointer items-center justify-center rounded-md text-[#8b95ad] transition-colors outline-none hover:bg-[#f1f4f9] hover:text-[#3f4a60] focus-visible:ring-2 focus-visible:ring-[#0b63f6]/35 ${
          open ? "bg-[#f1f4f9] text-[#3f4a60]" : ""
        }`}
        onClick={() => setOpen((o) => !o)}
      >
        <HugeiconsIcon
          icon={MoreHorizontalIcon}
          aria-hidden="true"
          className="size-5"
        />
      </button>
      {open && (
        <div
          role="menu"
          className="absolute top-11 right-0 z-30 w-56 rounded-lg border border-[#dce1e8] bg-white p-1.5 shadow-[0_15px_35px_#10204a2b]"
        >
          {actions.map((action) => (
            <button
              key={action.label}
              type="button"
              role="menuitem"
              className="flex w-full cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm font-medium text-[#243049] transition-colors outline-none hover:bg-[#f4f7fb] focus-visible:bg-[#f4f7fb]"
              onClick={() => {
                setOpen(false)
                action.run()
              }}
            >
              <HugeiconsIcon
                icon={action.icon}
                aria-hidden="true"
                className="size-4 shrink-0 text-[#6f798a]"
              />
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
