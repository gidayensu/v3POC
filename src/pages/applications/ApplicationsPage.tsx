import { useEffect, useState } from "react"

import { Badge, Page, ProductIcon } from "@/components/common"
import { products } from "@/data/products"
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

function CatalogueSkeleton({ merchant }: { merchant: string }) {
  return (
    <Page
      title="Application catalogue"
      sub={`Loading products for ${merchant}.`}
    >
      <div className="catalog-skeleton">
        {[1, 2, 3, 4, 5].map((x) => (
          <div key={x}>
            <i />
            <span />
            <em />
            <button disabled />
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
      <div className="cataloglist">
        {products.map((p) => (
          <div key={p.name}>
            <ProductIcon p={p} big />
            <p>
              <b>{p.name}</b>
              <span>{p.desc}</span>
            </p>
            <Badge s={displayStatus(p, transpayStatus)} />
            <button
              className="outline"
              onClick={() =>
                canOpen(p, transpayStatus)
                  ? requestAppSwitch(p.name)
                  : go(destination(p.name))
              }
            >
              {ctaLabel(p, transpayStatus)}
            </button>
          </div>
        ))}
      </div>
    </Page>
  )
}
