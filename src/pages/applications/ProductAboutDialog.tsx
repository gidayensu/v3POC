import { Cancel01Icon, Tick02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import {
  Badge,
  Overlay,
  PageActionButton,
  ProductIcon,
} from "@/components/common"
import type { Product } from "@/types"

/** Read-only summary of a product, opened from the catalogue's row menu. */
export function ProductAboutDialog({
  product,
  status,
  ctaLabel,
  cta,
  close,
}: {
  product: Product
  status: string
  ctaLabel: string
  cta: () => void
  close: () => void
}) {
  return (
    <Overlay close={close}>
      <section className="w-[min(34rem,calc(100vw-2rem))] rounded-xl bg-white p-6 text-left shadow-[0_25px_60px_#10204a3d]">
        <header className="flex items-start gap-4">
          <ProductIcon p={product} big />
          <div className="min-w-0 flex-1">
            <h2 className="m-0 text-lg font-bold tracking-[-0.01em] text-[#101d42]">
              {product.name}
            </h2>
            <span className="mt-0.5 block text-sm text-[#8792a8]">
              {product.group}
            </span>
          </div>
          <button
            type="button"
            aria-label="Close"
            className="inline-flex size-8 cursor-pointer items-center justify-center rounded-md text-[#8b95ad] transition-colors hover:bg-[#f1f4f9] hover:text-[#3f4a60]"
            onClick={close}
          >
            <HugeiconsIcon
              icon={Cancel01Icon}
              aria-hidden="true"
              className="size-4"
            />
          </button>
        </header>

        <p className="mt-5 mb-0 text-sm leading-6 text-[#4a5568]">
          {product.about}
        </p>

        <ul className="mt-4 mb-0 flex list-none flex-col gap-2 p-0">
          {product.highlights.map((point) => (
            <li
              key={point}
              className="flex items-start gap-2.5 text-sm text-[#243049]"
            >
              <HugeiconsIcon
                icon={Tick02Icon}
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-[#0b63f6]"
              />
              {point}
            </li>
          ))}
        </ul>

        <footer className="mt-6 flex items-center justify-between gap-3 border-t border-[#eef1f5] pt-4">
          <Badge s={status} />
          <div className="flex gap-2">
            <PageActionButton variant="outline" onClick={close}>
              Close
            </PageActionButton>
            <PageActionButton
              onClick={() => {
                close()
                cta()
              }}
            >
              {ctaLabel}
            </PageActionButton>
          </div>
        </footer>
      </section>
    </Overlay>
  )
}
