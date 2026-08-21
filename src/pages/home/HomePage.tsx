import { CatalogueHome } from "@/pages/home/CatalogueHome"
import { WorkspaceHome } from "@/pages/home/WorkspaceHome"
import type { View } from "@/types"

/** Flip to `false` to show the full application-catalogue home instead. */
const SIMPLIFIED_HOME = true

export function HomePage({
  go,
  gateway,
  requestAppSwitch,
}: {
  go: (view: View) => void
  gateway: () => void
  requestAppSwitch: (app: string) => void
}) {
  return SIMPLIFIED_HOME ? (
    <WorkspaceHome go={go} requestAppSwitch={requestAppSwitch} />
  ) : (
    <CatalogueHome go={go} gateway={gateway} />
  )
}
