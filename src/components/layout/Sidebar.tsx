import { useState } from "react"
import { ChevronDown, LogOut, PanelLeft } from "lucide-react"

import { Logo, ProductIcon } from "@/components/common"
import { appNavSections } from "@/data/appNavigation"
import { isNavActive, navFooterItems, navSections } from "@/data/navigation"
import { productByName } from "@/data/products"
import type { AppNavSection, View } from "@/types"

type Nav = {
  view: View
  go: (view: View) => void
  close: () => void
}

/** Section header that folds its rows away. */
function SectionHead({
  title,
  folded,
  toggle,
}: {
  title: string
  folded: boolean
  toggle: () => void
}) {
  return (
    <button
      className={`nav-heading ${folded ? "folded" : ""}`}
      onClick={toggle}
      aria-expanded={!folded}
    >
      {title}
      <ChevronDown />
    </button>
  )
}

/** Navigation for the merchant workspace itself. */
function WorkspaceNav({ view, go, close }: Nav) {
  const [folded, setFolded] = useState<Record<string, boolean>>({})
  return (
    <nav>
      {navSections.map((section) => (
        <div className="nav-section" key={section.title}>
          <SectionHead
            title={section.title}
            folded={!!folded[section.title]}
            toggle={() =>
              setFolded((f) => ({ ...f, [section.title]: !f[section.title] }))
            }
          />
          {folded[section.title]
            ? null
            : section.items.map((item) => {
                const I = item.icon
                return (
                  <button
                    className={isNavActive(view, item.view) ? "active" : ""}
                    onClick={() => {
                      go(item.view)
                      close()
                    }}
                    key={item.view}
                    title={item.label}
                  >
                    <I />
                    <span>{item.label}</span>
                    {item.badge ? <em>{item.badge}</em> : null}
                  </button>
                )
              })}
        </div>
      ))}
    </nav>
  )
}

const firstLabel = (sections: AppNavSection[]) =>
  sections[sections.length - 1]?.items[0]?.label || ""

/** Navigation belonging to the application that has been switched into. */
function ApplicationNav({
  app,
  go,
  close,
}: Omit<Nav, "view"> & { app: string }) {
  const sections = appNavSections(app)
  const [selected, setSelected] = useState(() => firstLabel(sections))
  const [folded, setFolded] = useState<Record<string, boolean>>({})
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  return (
    <nav>
      {sections.map((section) => (
        <div className="nav-section" key={section.title}>
          <SectionHead
            title={section.title}
            folded={!!folded[section.title]}
            toggle={() =>
              setFolded((f) => ({ ...f, [section.title]: !f[section.title] }))
            }
          />
          {folded[section.title]
            ? null
            : section.items.map((item) => {
                const I = item.icon
                const open = !!expanded[item.label]
                return (
                  <div key={item.label} className="nav-row">
                    <button
                      className={selected === item.label ? "active" : ""}
                      title={item.label}
                      onClick={() => {
                        setSelected(item.label)
                        if (item.children)
                          setExpanded((e) => ({
                            ...e,
                            [item.label]: !e[item.label],
                          }))
                        if (item.view) {
                          go(item.view)
                          close()
                        }
                      }}
                    >
                      <I />
                      <span>{item.label}</span>
                      {item.children ? (
                        <ChevronDown
                          className={`caret ${open ? "open" : ""}`}
                        />
                      ) : null}
                    </button>
                    {item.children && open ? (
                      <div className="nav-children">
                        {item.children.map((child) => (
                          <button
                            key={child}
                            className={selected === child ? "active" : ""}
                            onClick={() => setSelected(child)}
                          >
                            {child}
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                )
              })}
        </div>
      ))}
    </nav>
  )
}

export function Sidebar({
  view,
  go,
  open,
  close,
  activeApp,
  exitApp,
  collapsed,
  toggleCollapsed,
}: {
  view: View
  go: (view: View) => void
  open: boolean
  close: () => void
  activeApp: string | null
  exitApp: () => void
  collapsed: boolean
  toggleCollapsed: () => void
}) {
  const product = activeApp ? productByName(activeApp) : undefined
  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <header className="sidebar-head">
        <Logo tone="light" />
        <button
          className="rail-toggle"
          onClick={toggleCollapsed}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <PanelLeft />
        </button>
      </header>

      {activeApp ? (
        <div className="app-context">
          {product ? (
            <ProductIcon p={product} neutral />
          ) : (
            <span className="picon" />
          )}
          <p>
            <b>{activeApp}</b>
            <small>Application</small>
          </p>
          <button onClick={exitApp} title="Leave application">
            <LogOut />
          </button>
        </div>
      ) : null}

      {activeApp ? (
        <ApplicationNav key={activeApp} app={activeApp} go={go} close={close} />
      ) : (
        <WorkspaceNav view={view} go={go} close={close} />
      )}

      <footer>
        {navFooterItems.map((item) => {
          const I = item.icon
          return (
            <button
              key={item.view}
              className={view === item.view ? "active" : ""}
              title={item.label}
              onClick={() => {
                go(item.view)
                close()
              }}
            >
              <I />
              <span>{item.label}</span>
            </button>
          )
        })}
      </footer>
    </aside>
  )
}
