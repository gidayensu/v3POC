import { useEffect, useState } from "react"

import suiteMark from "@/assets/trans_blue.png"
import { Badge, Page, PageActionButton } from "@/components/common"
import { PRODUCT_GROUPS, productsInGroup } from "@/data/products"
import type { Product, TranspayStatus, View } from "@/types"

const displayStatus = (p: Product, transpayStatus: TranspayStatus) =>
  p.name !== "TransPay"
    ? p.status
    : transpayStatus === "active"
      ? "active"
      : transpayStatus === "processing"
        ? "processing"
        : p.status

const ctaLabel = (p: Product, transpayStatus: TranspayStatus) => {
  if (p.name === "TransPay")
    return transpayStatus === "active"
      ? "Open TransPay"
      : transpayStatus === "processing"
        ? "View progress"
        : "Set up"
  return p.status === "active"
    ? "Open"
    : p.status === "pending"
      ? "View status"
      : "Set up"
}

/** Only a live application can be switched into; the rest open their journey. */
const canOpen = (p: Product, transpayStatus: TranspayStatus) =>
  p.name === "TransPay" ? transpayStatus === "active" : p.status === "active"

const destination = (name: string): View =>
  name === "Accounts"
    ? "setup"
    : name === "TransPay"
      ? "transpay-setup"
      : name === "Settlement"
        ? "settlement"
        : "product"

/** Groups that actually hold products, so an empty heading never renders. */
const populatedGroups = () =>
  PRODUCT_GROUPS.map(
    (group) => [group, productsInGroup(group)] as const
  ).filter(([, group]) => group.length)

function GroupHeading({ title, count }: { title: string; count: number }) {
  return (
    <div className="mb-3 flex items-baseline gap-2">
      <h2 className="m-0 text-xs font-semibold tracking-[0.08em] text-[#8792a8] uppercase">
        {title}
      </h2>
      <span className="text-xs text-[#a6b0c2]">{count}</span>
    </div>
  )
}

/** One shimmering placeholder bar; `shimmer` keyframes live in index.css. */
const shimmer =
  "animate-[shimmer_1.2s_infinite] rounded bg-[linear-gradient(90deg,#eef1f5_25%,#f8fafc_45%,#eef1f5_65%)] bg-size-[300%_100%]"

function CatalogueSkeleton({ merchant }: { merchant: string }) {
  return (
    <Page
      title="Application catalogue"
      sub={`Loading products for ${merchant}.`}
    >
      <div className="flex flex-col gap-3">
        {[1, 2, 3, 4, 5].map((x) => (
          <div
            key={x}
            className="flex items-center gap-5 rounded-lg bg-white px-6 py-5"
          >
            <i className={`size-12 shrink-0 rounded-full ${shimmer}`} />
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <span className={`h-4 max-w-37.5 ${shimmer}`} />
              <span className={`h-3.5 max-w-80 ${shimmer}`} />
            </div>
            <em className={`h-6 w-36 shrink-0 rounded-md ${shimmer}`} />
            <em className={`h-9 w-33 shrink-0 rounded-md ${shimmer}`} />
          </div>
        ))}
      </div>
    </Page>
  )
}

export function ApplicationsPage({
  go,
  transpayStatus,
  merchant,
  requestAppSwitch,
}: {
  go: (view: View) => void
  transpayStatus: TranspayStatus
  merchant: string
  requestAppSwitch: (app: string) => void
}) {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 420)
    return () => clearTimeout(timer)
  }, [])
  if (loading) return <CatalogueSkeleton merchant={merchant} />
  return (
    <Page
      title="Application catalogue"
      sub={`All products available to ${merchant}.`}
    >
      <div className="flex flex-col gap-8">
        {populatedGroups().map(([group, items]) => (
          <section key={group}>
            <GroupHeading title={group} count={items.length} />
            <div className="flex flex-col gap-3">
              {items.map((p) => (
                <div
                  key={p.name}
                  className="flex items-center gap-5 rounded-lg bg-white px-6 py-5 shadow-[0_1px_2px_rgb(16_29_66/0.04)] transition-shadow hover:shadow-[0_6px_18px_rgb(16_29_66/0.08)]"
                >
                  <img
                    className="size-12 shrink-0 rounded-full object-cover"
                    src={suiteMark}
                    alt=""
                  />
                  <div className="min-w-0 flex-1">
                    <b className="block text-base font-bold tracking-[-0.01em] text-[#101d42]">
                      {p.name}
                    </b>
                    <span className="mt-0.5 block truncate text-sm text-[#8792a8]">
                      {p.desc}
                    </span>
                  </div>
                  <div className="hidden w-36 shrink-0 justify-start sm:flex">
                    <Badge s={displayStatus(p, transpayStatus)} />
                  </div>
                  <PageActionButton
                    variant={canOpen(p, transpayStatus) ? "filled" : "outline"}
                    className="sm:min-w-33"
                    onClick={() =>
                      canOpen(p, transpayStatus)
                        ? requestAppSwitch(p.name)
                        : go(destination(p.name))
                    }
                  >
                    {ctaLabel(p, transpayStatus)}
                  </PageActionButton>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </Page>
  )
}
