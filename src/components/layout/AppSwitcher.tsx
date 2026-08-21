import { ChevronRight, Home, Search, X } from "lucide-react"

import { Overlay, ProductIcon } from "@/components/common"
import { PRODUCT_GROUPS, productsInGroup } from "@/data/products"
import type { Product } from "@/types"

export function AppSwitcher({
  close,
  go,
}: {
  close: () => void
  go: (product: Product) => void
}) {
  return (
    <Overlay close={close}>
      <section className="switcher">
        <header>
          <h2>Merchant Suite</h2>
          <button onClick={close}>
            <X />
          </button>
        </header>
        <div className="switch-tools">
          <button>
            <Home /> Suite Home
          </button>
          <label>
            <Search />
            <input placeholder="Search products" />
          </label>
        </div>
        {PRODUCT_GROUPS.map((group) => (
          <div className="switch-group" key={group}>
            <small>{group.toUpperCase()}</small>
            {productsInGroup(group).map((p) => (
              <button key={p.name} onClick={() => go(p)}>
                <ProductIcon p={p} />
                <b>{p.name}</b>
                <span>{p.desc}</span>
                <ChevronRight />
              </button>
            ))}
          </div>
        ))}
      </section>
    </Overlay>
  )
}
