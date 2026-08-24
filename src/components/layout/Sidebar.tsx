import { useState } from "react"
import {
  ArrowDown01Icon,
  Logout03Icon,
  SidebarLeftIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import wordmark from "@/assets/transflow_main_blue.png"
import { ProductIcon } from "@/components/common"
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
      <HugeiconsIcon icon={ArrowDown01Icon} />
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
            : section.items.map((item) => (
                <button
                  className={isNavActive(view, item.view) ? "active" : ""}
                  onClick={() => {
                    go(item.view)
                    close()
                  }}
                  key={item.view}
                  title={item.label}
                >
                  <HugeiconsIcon icon={item.icon} />
                  <span>{item.label}</span>
                  {item.badge ? <em>{item.badge}</em> : null}
                </button>
              ))}
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
                      <HugeiconsIcon icon={item.icon} />
                      <span>{item.label}</span>
                      {item.children ? (
                        <HugeiconsIcon
                          icon={ArrowDown01Icon}
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
      <header
        className={`flex h-[78px] flex-none items-center border-r border-b border-[#e3e7ed] bg-white ${
          collapsed
            ? "-mx-2.5 justify-center px-2"
            : "-mx-3 justify-between pr-3.5 pl-6"
        }`}
      >
        {collapsed ? null : (
          <img
            className="block h-[22px] w-auto shrink-0"
            src={wordmark}
            alt="TransFlow"
          />
        )}
        <button
          type="button"
          className="group grid size-9 shrink-0 place-items-center rounded-lg transition-colors outline-none hover:bg-[#eef1f6] focus-visible:ring-2 focus-visible:ring-[#0b63f6]/35"
          onClick={toggleCollapsed}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {/* Colour lives on the icon: the global `button { color: inherit }`
              rule outranks Tailwind text utilities on the button itself. */}
          <HugeiconsIcon
            icon={SidebarLeftIcon}
            className="text-[#3d4a63] transition-colors group-hover:text-[#101d42]"
          />
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
            <HugeiconsIcon icon={Logout03Icon} />
          </button>
        </div>
      ) : null}

      {activeApp ? (
        <ApplicationNav key={activeApp} app={activeApp} go={go} close={close} />
      ) : (
        <WorkspaceNav view={view} go={go} close={close} />
      )}

      <footer>
        {navFooterItems.map((item) => (
          <button
            key={item.view}
            className={view === item.view ? "active" : ""}
            title={item.label}
            onClick={() => {
              go(item.view)
              close()
            }}
          >
            <HugeiconsIcon icon={item.icon} />
            <span>{item.label}</span>
          </button>
        ))}
      </footer>
    </aside>
  )
}
