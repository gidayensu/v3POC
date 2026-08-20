import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import {
  Activity,
  ArrowLeft,
  Banknote,
  Bell,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock3,
  CreditCard,
  FileText,
  Grid3X3,
  Grip,
  Headphones,
  Home,
  Landmark,
  LayoutGrid,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Upload,
  UserRound,
  Users,
  WalletCards,
  X,
} from "lucide-react"

type View =
  | "home"
  | "applications"
  | "businesses"
  | "users"
  | "approvals"
  | "audit"
  | "support"
  | "settings"
  | "setup"
  | "accounts"
  | "transpay-setup"
  | "settlement"
  | "balances"
  | "product"
type Status = "active" | "available" | "setup" | "pending"
type Product = {
  name: string
  desc: string
  group: string
  color: string
  icon: any
  status: Status
}
const products: Product[] = [
  {
    name: "RPay",
    desc: "Monitor collections and reconcile revenue",
    group: "Payments",
    color: "purple",
    icon: CreditCard,
    status: "active",
  },
  {
    name: "TransPay",
    desc: "Send and track business payments",
    group: "Payments",
    color: "cyan",
    icon: Banknote,
    status: "setup",
  },
  {
    name: "Accounts",
    desc: "View balances, statements and account activity",
    group: "Finance",
    color: "blue",
    icon: Landmark,
    status: "available",
  },
  {
    name: "Settlement",
    desc: "Track settlement batches and activity",
    group: "Finance",
    color: "orange",
    icon: Activity,
    status: "pending",
  },
  {
    name: "Standing Orders",
    desc: "Schedule recurring payments",
    group: "Collections",
    color: "green",
    icon: Clock3,
    status: "active",
  },
  {
    name: "Direct Debit",
    desc: "Manage mandates and automated collections",
    group: "Collections",
    color: "orange",
    icon: WalletCards,
    status: "setup",
  },
  {
    name: "SMS",
    desc: "Communicate with your customers",
    group: "Other",
    color: "green",
    icon: MessageCircle,
    status: "available",
  },
]
const nav: any[] = [
  [Home, "Home", "home"],
  [LayoutGrid, "Applications", "applications"],
  [Activity, "Settlement", "settlement"],
  [WalletCards, "Balances", "balances"],
  [Building2, "Businesses", "businesses"],
  [Users, "Users & access", "users"],
  [ShieldCheck, "Approvals", "approvals"],
  [FileText, "Audit", "audit"],
  [Settings, "Settings", "settings"],
  [Headphones, "Support", "support"],
]
const Labels: any = {
  active: "Active",
  available: "Available",
  setup: "Setup in progress",
  pending: "Pending approval",
  approved: "Approved",
  processing: "Processing",
  ready: "Ready to use",
}
const ONBOARDING_URL = "https://onboardinguat.itcsrvc.com/"
function startExternalOnboarding() {
  const existing = localStorage.getItem("transflow-onboarding")
  if (!existing)
    localStorage.setItem(
      "transflow-onboarding",
      JSON.stringify({
        name: "New business application",
        status: "Onboarding incomplete",
        progress: 42,
        updatedAt: new Date().toISOString(),
        stages: ["Business details", "Representatives"],
      })
    )
  window.open(ONBOARDING_URL, "_blank", "noopener,noreferrer")
}
function Logo() {
  return (
    <div className="logo">
      <b>T</b>
      <span>
        Transflow <i>Merchant Suite</i>
      </span>
    </div>
  )
}
function Icon({ p, big = false }: { p: Product; big?: boolean }) {
  const I = p.icon
  return (
    <span className={`picon ${p.color} ${big ? "big" : ""}`}>
      <I />
    </span>
  )
}
function Badge({ s }: { s: string }) {
  return (
    <span className={`badge ${s}`}>
      <i />
      {Labels[s] || s}
    </span>
  )
}
function Overlay({ children, close }: { children: any; close?: () => void }) {
  return (
    <div className="overlay" onMouseDown={close}>
      <div onMouseDown={(e) => e.stopPropagation()}>{children}</div>
    </div>
  )
}

function AppSwitcher({ close, go }: any) {
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
        {["Payments", "Collections", "Finance", "Other"].map((g) => (
          <div className="switch-group" key={g}>
            <small>{g.toUpperCase()}</small>
            {products
              .filter((p) => p.group === g)
              .map((p) => (
                <button key={p.name} onClick={() => go(p)}>
                  <Icon p={p} />
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
function SearchBox({ close, go }: any) {
  return (
    <Overlay close={close}>
      <section className="searchbox">
        <label>
          <Search />
          <input autoFocus placeholder="Search across Merchant Suite" />
          <kbd>ESC</kbd>
        </label>
        <small>QUICK RESULTS</small>
        {[
          [Landmark, "Accounts", "Application", "setup"],
          [Building2, "Acme Trading Ltd", "Business", "businesses"],
          [Users, "Ama Mensah", "User", "users"],
          [CreditCard, "Operating Account ••••4587", "Account", "accounts"],
        ].map(([I, t, s, v]: any) => (
          <button
            key={t}
            onClick={() => {
              go(v)
              close()
            }}
          >
            <I />
            <p>
              <b>{t}</b>
              <span>{s}</span>
            </p>
            <ChevronRight />
          </button>
        ))}
      </section>
    </Overlay>
  )
}
function Notifications({ close, go, transpayStatus }: any) {
  const merchantChange = (() => {
    try {
      return JSON.parse(
        localStorage.getItem("merchant-change-notification") || "null"
      )
    } catch {
      return null
    }
  })()
  return (
    <div className="notifications">
      <header>
        <h3>Notifications</h3>
        <button onClick={close}>
          <X />
        </button>
      </header>
      {[
        ...(merchantChange
          ? [merchantChange.title + " — " + merchantChange.body]
          : []),
        ...(transpayStatus === "active"
          ? ["TransPay is ready — Your setup has been completed successfully."]
          : transpayStatus === "processing"
            ? ["TransPay setup submitted — Activation is processing."]
            : []),
        "Accounts setup is ready to continue",
        "Settlement configuration needs review",
        "Ama Mensah requested access to RPay",
        "Business verification was approved",
      ].map((x, i) => (
        <button
          key={x}
          onClick={() => {
            go(
              x.includes("TransPay")
                ? "applications"
                : x.includes("requested access")
                  ? "approvals"
                  : "home"
            )
            close()
          }}
        >
          <i />
          <p>
            <b>{x}</b>
            <span>{i < 2 ? "Today" : "Yesterday"}</span>
          </p>
        </button>
      ))}
    </div>
  )
}
function Shell({
  view,
  go,
  children,
  openSwitch,
  transpayStatus,
  merchant,
  setMerchant,
  dataReloading,
}: any) {
  const [mobile, setMobile] = useState(false),
    [business, setBusiness] = useState(false),
    [search, setSearch] = useState(false),
    [notice, setNotice] = useState(false),
    [pendingBusiness, setPendingBusiness] = useState<any>(null)
  return (
    <div className="shell">
      <aside className={`sidebar ${mobile ? "open" : ""}`}>
        <Logo />
        <nav>
          {nav.map(([I, t, v]) => (
            <button
              className={
                view === v ||
                (["setup", "accounts", "transpay-setup"].includes(view) &&
                  v === "applications")
                  ? "active"
                  : ""
              }
              onClick={() => {
                go(v)
                setMobile(false)
              }}
              key={v}
            >
              <I />
              {t}
              {t === "Approvals" && <em>2</em>}
            </button>
          ))}
        </nav>
        <footer>
          <button>
            <Grid3X3 />
            Product catalogue
          </button>
          <button>
            <CircleHelp />
            Help centre
          </button>
        </footer>
      </aside>
      <div className="work">
        <header className="topbar">
          <button className="hamb" onClick={() => setMobile(!mobile)}>
            <Menu />
          </button>
          <button className="apps" onClick={openSwitch}>
            <Grip />
          </button>
          <div className="merchant">
            <button onClick={() => setBusiness(!business)}>
              <span>ACME</span>
              <b>{merchant}</b>
              <ChevronDown />
            </button>
            {business && (
              <div className="business-pop">
                <small>SWITCH BUSINESS</small>
                {[
                  {
                    name: "Acme Trading Ltd",
                    initials: "ACME",
                    status: "approved",
                  },
                  {
                    name: "Nova Retail Ltd",
                    initials: "NR",
                    status: "onboarding",
                  },
                  {
                    name: "Acme Distribution",
                    initials: "AD",
                    status: "approved",
                  },
                ].map((item) => (
                  <button
                    onClick={() => {
                      if (item.name !== merchant) setPendingBusiness(item)
                      setBusiness(false)
                    }}
                    key={item.name}
                  >
                    <span>{item.initials}</span>
                    <p>
                      <b>{item.name}</b>
                      <small>
                        {item.status === "onboarding"
                          ? "Onboarding incomplete"
                          : "Approved business"}
                      </small>
                    </p>
                    {item.name === merchant && <Check />}
                  </button>
                ))}
                <button
                  className="blue"
                  onClick={() => {
                    startExternalOnboarding()
                    setBusiness(false)
                    go("businesses")
                  }}
                >
                  <Plus />
                  Add another business
                </button>
              </div>
            )}
          </div>
          <button className="search" onClick={() => setSearch(true)}>
            <Search />
            Search payments, accounts, invoices and more <kbd>⌘ K</kbd>
          </button>
          <div className="profile">
            <CircleHelp />
            <button onClick={() => setNotice(!notice)}>
              <Bell />
              <em>5</em>
            </button>
            <span>G</span>
            <b>Gideon Okafor</b>
            <ChevronDown />
          </div>
          {notice && (
            <Notifications
              close={() => setNotice(false)}
              go={go}
              transpayStatus={transpayStatus}
            />
          )}
        </header>
        {dataReloading ? <DataReload /> : <main>{children}</main>}
      </div>
      {search && <SearchBox close={() => setSearch(false)} go={go} />}
      {pendingBusiness && (
        <Overlay>
          <section className="confirm-modal business-switch-modal">
            <span
              className={
                pendingBusiness.status === "onboarding"
                  ? "warning"
                  : "switch-icon"
              }
            >
              {pendingBusiness.status === "onboarding" ? (
                <Clock3 />
              ) : (
                <Building2 />
              )}
            </span>
            <h2>
              {pendingBusiness.status === "onboarding"
                ? "Onboarding not complete"
                : "Switch business?"}
            </h2>
            {pendingBusiness.status === "onboarding" ? (
              <p>
                <b>{pendingBusiness.name}</b> has not completed onboarding and
                cannot be used as the active business yet. You can view its
                progress and resume onboarding.
              </p>
            ) : (
              <p>
                You're about to switch from <b>{merchant}</b> to{" "}
                <b>{pendingBusiness.name}</b>. Applications, permissions and
                financial data will reload for this business.
              </p>
            )}
            <footer>
              <button
                className="outline"
                onClick={() => setPendingBusiness(null)}
              >
                Cancel
              </button>
              <button
                className="primary"
                onClick={() => {
                  if (pendingBusiness.status === "onboarding") {
                    localStorage.setItem(
                      "selected-business",
                      pendingBusiness.name
                    )
                    window.dispatchEvent(
                      new CustomEvent("transflow-business-detail", {
                        detail: pendingBusiness.name,
                      })
                    )
                    go("businesses")
                  } else setMerchant(pendingBusiness.name)
                  setPendingBusiness(null)
                }}
              >
                {pendingBusiness.status === "onboarding"
                  ? "View onboarding"
                  : "Switch business"}
              </button>
            </footer>
          </section>
        </Overlay>
      )}
    </div>
  )
}
function DataReload() {
  return (
    <main className="data-reload">
      <div className="reload-head">
        <span className="spinner" />
        <div>
          <h2>Switching business</h2>
          <p>Loading applications, permissions and financial data…</p>
        </div>
      </div>
      <div className="reload-grid">
        <i />
        <i />
        <i />
      </div>
      <div className="reload-lines">
        {[1, 2, 3, 4].map((x) => (
          <span key={x} />
        ))}
      </div>
    </main>
  )
}

function HomePage({ go, gateway }: any) {
  const simplified = true
  if (simplified)
    return (
      <Page title="Good morning, Gideon" sub="Your financial workspace">
        <div className="simple-home">
          <section>
            <h2>Products</h2>
            <div className="workspace-products">
              {[
                ["Payments", products[1], products[0]],
                ["Collections", products[4], products[5]],
              ].map(([group, ...items]: any) => (
                <div key={group}>
                  <small>{group}</small>
                  {items.map((p: Product) => (
                    <button
                      key={p.name}
                      onClick={() =>
                        p.name === "TransPay"
                          ? go("transpay-setup")
                          : go("product")
                      }
                    >
                      <Icon p={p} />
                      <b>{p.name}</b>
                      <span>{p.desc}</span>
                      <ChevronRight />
                    </button>
                  ))}
                </div>
              ))}
            </div>
            <div className="recently-head">
              <h2>Recently used</h2>
              <button onClick={() => go("applications")}>
                View all <ChevronRight />
              </button>
            </div>
            <div className="recent-chips">
              {[
                ["TransPay", "Dashboard"],
                ["RPay", "Reconciliation"],
                ["Standing Orders", "Schedules"],
                ["Direct Debit", "Mandates"],
              ].map((x) => (
                <button key={x[0]}>
                  <i />
                  <b>{x[0]}</b>
                  <span>{x[1]}</span>
                </button>
              ))}
            </div>
          </section>
          <aside className="home-side">
            <h2>Quick actions</h2>
            {[
              [Plus, "Receive a payment", "Create payment link or invoice"],
              [Users, "Add customer", "Create a new customer profile"],
              [FileText, "View reports", "Access key reports and insights"],
            ].map(([I, t, d]: any) => (
              <button key={t}>
                <span>
                  <I />
                </span>
                <p>
                  <b>{t}</b>
                  <small>{d}</small>
                </p>
                <ChevronRight />
              </button>
            ))}
            <div className="attention-list">
              <header>
                <h2>Needs attention</h2>
                <button onClick={() => go("approvals")}>View all</button>
              </header>
              {[
                ["3", "Failed payments", "Last 24 hours"],
                ["8", "Settlements pending", "Requires review"],
                ["5", "Customers to verify", "Action required"],
                ["2", "Expiring mandates", "Within 7 days"],
              ].map((x, i) => (
                <button key={x[1]}>
                  <span className={`mini-task m${i}`}>{x[0]}</span>
                  <p>
                    <b>{x[1]}</b>
                    <small>{x[2]}</small>
                  </p>
                </button>
              ))}
            </div>
          </aside>
        </div>
      </Page>
    )
  const action = (s: Status) =>
    s === "active"
      ? "Open"
      : s === "setup"
        ? "Continue setup"
        : s === "pending"
          ? "View status"
          : "Set up"
  return (
    <Page
      title="Good morning, Gideon"
      sub="Choose an application or continue where you left off."
    >
      <div className="homegrid">
        <div>
          <SectionTitle title="Recently used" />
          <div className="recent">
            {products.slice(0, 3).map((p, i) => (
              <button
                key={p.name}
                onClick={() =>
                  p.name === "Accounts"
                    ? gateway()
                    : go(p.name === "TransPay" ? "transpay-setup" : "product")
                }
              >
                <Icon p={p} big />
                <p>
                  <b>{p.name}</b>
                  <span>{p.desc}</span>
                </p>
                <small>Last opened</small>
                <strong>{i ? "Yesterday, 4:18 PM" : "Today, 9:24 AM"}</strong>
                <ChevronRight />
              </button>
            ))}
          </div>
          <SectionTitle title="Application catalogue" />
          {["Payments", "Finance", "Collections", "Other"].map((g) => (
            <section className="group" key={g}>
              <h3>{g}</h3>
              <div className="cards">
                {products
                  .filter((p) => p.group === g)
                  .map((p) => (
                    <article key={p.name}>
                      <div>
                        <Icon p={p} big />
                        <p>
                          <b>{p.name}</b>
                          <span>{p.desc}</span>
                        </p>
                      </div>
                      <Badge s={p.status} />
                      <footer>
                        <button
                          onClick={() =>
                            p.name === "Accounts"
                              ? gateway()
                              : go(
                                  p.name === "TransPay"
                                    ? "transpay-setup"
                                    : "product"
                                )
                          }
                        >
                          {action(p.status)}
                        </button>
                        <button>
                          <ChevronRight />
                        </button>
                      </footer>
                    </article>
                  ))}
              </div>
            </section>
          ))}
        </div>
        <aside className="tasks">
          <h2>Action required</h2>
          {[
            [
              Landmark,
              "Complete Accounts setup",
              "Finish setup to access balances and statements.",
            ],
            [
              Activity,
              "Settlement pending approval",
              "Your configuration is being reviewed.",
            ],
            [
              Users,
              "Review 2 access requests",
              "Approve or decline pending users.",
            ],
          ].map(([I, t, d]: any, i) => (
            <button
              key={t}
              onClick={() =>
                i === 0 ? gateway() : go(i === 2 ? "approvals" : "applications")
              }
            >
              <span className={`task t${i}`}>
                <I />
              </span>
              <p>
                <b>{t}</b>
                <small>{d}</small>
                <strong>
                  {i === 0
                    ? "Continue setup"
                    : i === 1
                      ? "View status"
                      : "Review requests"}
                </strong>
              </p>
              <ChevronRight />
            </button>
          ))}
        </aside>
      </div>
    </Page>
  )
}
function Page({ title, sub, children, action }: any) {
  return (
    <div className="page">
      <header className="pagehead">
        <div>
          <h1>{title}</h1>
          <p>{sub}</p>
        </div>
        {action}
      </header>
      {children}
    </div>
  )
}
function SectionTitle({ title }: any) {
  return (
    <div className="sectitle">
      <h2>{title}</h2>
      <button>
        View all <ChevronRight />
      </button>
    </div>
  )
}

function Gateway({ close, proceed }: any) {
  const [choice, setChoice] = useState(0)
  return (
    <Overlay>
      <section className="gateway">
        <header>
          <h2>Set up Accounts</h2>
          <button onClick={close}>
            <X />
          </button>
        </header>
        <div className="gateway-product">
          <Icon p={products[2]} big />
          <p>
            <small>FINANCE APP</small>
            <b>Accounts</b>
            <span>
              View balances, statements and account activity for your business.
            </span>
          </p>
        </div>
        <hr />
        <h3>Which business should use Accounts?</h3>
        {[
          [
            "Use Acme Trading Ltd",
            "We’ll reuse your verified business information.",
          ],
          [
            "Add a new business",
            "Start merchant onboarding for another business.",
          ],
        ].map(([t, d], i) => (
          <button
            className={`choice ${choice === i ? "selected" : ""}`}
            onClick={() => setChoice(i)}
            key={t}
          >
            <i />
            <span className="choiceicon">{i ? <Building2 /> : "ACME"}</span>
            <p>
              <b>{t}</b>
              <small>{d}</small>
            </p>
            {!i && <Badge s="approved" />}
          </button>
        ))}
        <hr />
        <h3>Before you begin</h3>
        <div className="prereqs">
          {[
            [
              ShieldCheck,
              "Approved merchant profile",
              "Approved and in good standing.",
            ],
            [
              Landmark,
              "Eligible settlement or operating account",
              "Required to view balances and activity.",
            ],
            [Users, "Administrator permission", "Required to set up Accounts."],
          ].map(([I, t, d]: any) => (
            <div key={t}>
              <I />
              <p>
                <b>{t}</b>
                <small>{d}</small>
              </p>
            </div>
          ))}
        </div>
        <div className="estimate">
          <span>
            Estimated setup{" "}
            <b>
              <Clock3 /> 5–8 minutes
            </b>
          </span>
          <em>Approval required</em>
        </div>
        <footer>
          <button className="outline" onClick={close}>
            Cancel
          </button>
          <button className="primary" onClick={proceed}>
            Continue with Acme Trading Ltd
          </button>
        </footer>
      </section>
    </Overlay>
  )
}

function ProductNav({ back }: any) {
  const list = [
    [Activity, "Overview"],
    [Landmark, "Accounts"],
    [Banknote, "Transactions"],
    [FileText, "Statements"],
    [Users, "Users & access"],
    [SlidersHorizontal, "Configuration"],
    [Settings, "Settings"],
  ]
  return (
    <aside className="productnav">
      <h2>
        <Landmark />
        Accounts
      </h2>
      {list.map(([I, t]: any, i) => (
        <button className={i === 5 ? "active" : ""} key={t}>
          <I />
          {t}
        </button>
      ))}
      <button className="back" onClick={back}>
        <ArrowLeft />
        Back to Merchant Suite
      </button>
    </aside>
  )
}
function ProductTop() {
  return (
    <header className="producttop">
      <Logo />
      <button>
        <Grid3X3 />
      </button>
      <div>
        <Search />
        Search payments, accounts, invoices and more
      </div>
      <CircleHelp />
      <Bell />
      <span>G</span>
      <b>Gideon Okafor</b>
    </header>
  )
}
function Setup({ back, done }: any) {
  const [acct, setAcct] = useState(0),
    [transfer, setTransfer] = useState(false)
  return (
    <div className="productshell">
      <ProductNav setup back={back} />
      <div className="productwork">
        <ProductTop />
        <div className="setuplayout">
          <div>
            <div className="pagehead">
              <div>
                <h1>Set up Accounts</h1>
                <p>Connect an eligible account for Acme Trading Ltd.</p>
              </div>
              <button className="outline">Save & exit</button>
            </div>
            <div className="stepper">
              {[
                "Business confirmed",
                "Link account",
                "Permissions",
                "Review",
              ].map((x, i) => (
                <div className={i < 2 ? "active" : ""} key={x}>
                  <span>{i === 0 ? <Check /> : i + 1}</span>
                  <b>{x}</b>
                </div>
              ))}
            </div>
            <h3>Choose an account to connect</h3>
            <p className="muted">
              Only eligible business bank accounts can be connected to Accounts.
            </p>
            {[
              ["Operating Account ••••4587", "Titan Trust Bank", "Eligible"],
              [
                "Reserve Account ••••2196",
                "Guardian Commercial Bank",
                "Eligibility review required",
              ],
            ].map(([t, b, s], i) => (
              <button
                aria-label={`${t}, ${s}`}
                className={`bank ${acct === i ? "selected" : ""}`}
                onClick={() => setAcct(i)}
                key={t}
              >
                <i />
                <span>
                  <Landmark />
                </span>
                <p>
                  <b>{t}</b>
                  <small>{b}</small>
                </p>
                <Badge s={i ? "pending" : "approved"} />
                <small>
                  {i ? "Additional checks needed" : "Ready to connect"}
                </small>
              </button>
            ))}
            <button className="add">
              <Plus />I need to add another account
            </button>
            <h3>What Accounts can access</h3>
            <p className="muted">
              Choose what users will be able to do with this account.
            </p>
            <div className="caps">
              {[
                ["View balances", "See real-time and available balances", true],
                [
                  "Download statements",
                  "Download statements and documents",
                  true,
                ],
                [
                  "View account transactions",
                  "View transaction history and details",
                  true,
                ],
                ["Initiate transfers", "Create and send transfers", transfer],
              ].map(([t, d, c], i) => (
                <label key={String(t)}>
                  <input
                    checked={Boolean(c)}
                    onChange={() => i === 3 && setTransfer(!transfer)}
                    type="checkbox"
                  />
                  <p>
                    <b>{t}</b>
                    <small>{d}</small>
                  </p>
                  {i === 3 && <em>Requires additional approval</em>}
                </label>
              ))}
            </div>
            <div className="setupactions">
              <button className="outline" onClick={back}>
                Back
              </button>
              <button className="primary" onClick={done}>
                Continue
              </button>
            </div>
          </div>
          <Summary />
        </div>
      </div>
    </div>
  )
}
function Summary() {
  return (
    <aside className="summary">
      <h3>Application</h3>
      <p>
        <Landmark />
        Accounts
      </p>
      <hr />
      <h3>Merchant</h3>
      <p>
        <span>ACME</span>Acme Trading Ltd
      </p>
      <Badge s="approved" />
      <hr />
      <h3>Setup progress</h3>
      <p>2 of 4 steps</p>
      <div className="progress">
        <i />
      </div>
      <b>Link account</b>
      <small>Current step</small>
      <hr />
      <h3>Approval required</h3>
      <p className="muted">Some account access requires additional approval.</p>
      <hr />
      <h3>
        <Clock3 /> Estimated time
      </h3>
      <b>4 minutes</b>
    </aside>
  )
}

function Accounts({ back }: any) {
  const [modal, setModal] = useState(false)
  return (
    <div className="productshell">
      <ProductNav back={back} />
      <div className="productwork">
        <ProductTop />
        <Page
          title="Accounts configuration"
          sub="Configuration version 1 · Effective Aug 20, 2026"
          action={
            <button className="outline" onClick={() => setModal(true)}>
              Request a change
            </button>
          }
        >
          <div className="configgrid">
            <section className="config">
              <h2>Configuration summary</h2>
              {[
                [Building2, "Merchant", "Acme Trading Ltd"],
                [Landmark, "Operating Account ••••4587", "Titan Trust Bank"],
                [
                  Users,
                  "Permissions",
                  "View balances · Download statements · View transactions",
                ],
                [Users, "User access", "4 users have access"],
                [
                  ShieldCheck,
                  "Last approved by",
                  "Compliance Operations · Aug 18, 2026 at 11:42 AM",
                ],
              ].map(([I, t, d]: any) => (
                <div key={t}>
                  <I />
                  <p>
                    <b>{t}</b>
                    <span>{d}</span>
                  </p>
                </div>
              ))}
            </section>
            <aside>
              <section className="infobox">
                <h2>Active configuration</h2>
                <p>This configuration is currently active and in effect.</p>
                <hr />
                <b>Effective date</b>
                <span>Aug 20, 2026</span>
                <b>Approved on</b>
                <span>Aug 18, 2026 at 11:42 AM</span>
              </section>
              <section className="infobox">
                <h2>Why request a change?</h2>
                {[
                  "Compare current and proposed values",
                  "Preserve active configuration until approved",
                  "Changes are reviewed for compliance",
                  "Users will be notified after activation",
                ].map((x) => (
                  <p key={x}>
                    <Check /> {x}
                  </p>
                ))}
              </section>
            </aside>
          </div>
        </Page>
      </div>
      {modal && <Change close={() => setModal(false)} />}
    </div>
  )
}
function Change({ close }: any) {
  const [sent, setSent] = useState(false)
  if (sent)
    return (
      <Overlay>
        <section className="success">
          <span>
            <Check />
          </span>
          <h2>Change request submitted</h2>
          <p>Version 1 remains active while version 2 is reviewed.</p>
          <button className="primary" onClick={close}>
            View configuration
          </button>
        </section>
      </Overlay>
    )
  return (
    <Overlay>
      <section className="change">
        <header>
          <div>
            <h2>Request configuration change</h2>
            <p>
              The active configuration remains in effect until this request is
              approved.
            </p>
          </div>
          <button onClick={close}>
            <X />
          </button>
        </header>
        <h3>What would you like to change?</h3>
        <div className="changetypes">
          {[
            [Landmark, "Connected account"],
            [Users, "Permissions"],
            [UserRound, "User access"],
          ].map(([I, t]: any, i) => (
            <button className={i ? "" : "selected"} key={t}>
              <i />
              <I />
              <b>{t}</b>
              <small>
                {i
                  ? "Change users and access"
                  : "Change the operating account used"}
              </small>
            </button>
          ))}
        </div>
        <div className="compare">
          <label>
            Current value
            <div>
              <Landmark />
              <p>
                <b>Operating Account ••••4587</b>
                <small>Titan Trust Bank</small>
              </p>
            </div>
          </label>
          <ChevronRight />
          <label>
            Proposed value
            <div>
              <Landmark />
              <p>
                <b>Reserve Account ••••2196</b>
                <small>Titan Trust Bank</small>
              </p>
            </div>
            <em>Eligibility review required.</em>
          </label>
        </div>
        <label className="field">
          Reason for change (required)
          <textarea defaultValue="Move reporting access to our primary reserve account." />
        </label>
        <label className="field">
          Upload supporting document (optional)
          <div className="upload">
            <Upload />
            <span>
              Drag and drop a file here, or <b>browse</b>
              <small>PDF, PNG, JPG up to 10MB</small>
            </span>
          </div>
        </label>
        <div className="impact">
          <b>Impact summary</b>
          <div>
            <span>
              <CheckCircle2 />
              Existing balances remain available.
            </span>
            <span>
              <Clock3 />
              No changes until approved.
            </span>
            <span>
              <Users />
              Users will be notified.
            </span>
          </div>
        </div>
        <footer>
          <button className="outline" onClick={close}>
            Cancel
          </button>
          <button className="outline">Save draft</button>
          <button className="primary" onClick={() => setSent(true)}>
            Review change
          </button>
        </footer>
      </section>
    </Overlay>
  )
}

function MerchantSettings({ merchant = "Acme Trading Ltd" }: any) {
  const [tab, setTab] = useState("Business details")
  const [requestOpen, setRequestOpen] = useState(false)
  const [requestedEmail, setRequestedEmail] = useState("")
  const [requestStatus, setRequestStatus] = useState(
    () => localStorage.getItem("merchant-change-status") || ""
  )
  const [activeEmail, setActiveEmail] = useState(
    () =>
      localStorage.getItem("merchant-active-email") || "finance@acmetrading.com"
  )
  const [submitting, setSubmitting] = useState(false)
  useEffect(() => {
    if (requestStatus !== "pending") return
    const at = Number(
      localStorage.getItem("merchant-change-at") || Date.now() + 7000
    )
    const approve = () => {
      const value =
        localStorage.getItem("merchant-request-email") || activeEmail
      localStorage.setItem("merchant-active-email", value)
      localStorage.setItem("merchant-change-status", "approved")
      localStorage.setItem(
        "merchant-change-notification",
        JSON.stringify({
          title: "Merchant change approved",
          body: "Your requested change to business email has been approved and is now active.",
          at: new Date().toISOString(),
        })
      )
      setActiveEmail(value)
      setRequestStatus("approved")
    }
    if (Date.now() >= at) {
      approve()
      return
    }
    const timer = setTimeout(approve, at - Date.now())
    return () => clearTimeout(timer)
  }, [requestStatus, activeEmail])
  const submitRequest = () => {
    if (!requestedEmail.includes("@")) return
    setSubmitting(true)
    setTimeout(() => {
      localStorage.setItem("merchant-request-email", requestedEmail)
      localStorage.setItem("merchant-change-status", "pending")
      localStorage.setItem("merchant-change-at", String(Date.now() + 7000))
      setRequestStatus("pending")
      setSubmitting(false)
      setRequestOpen(false)
    }, 900)
  }
  const tabs = [
    "Business details",
    "Bank accounts",
    "Branding",
    "Setup requests",
  ]
  return (
    <div className="settings-layout">
      <aside className="settings-tabs">
        <h3>Merchant settings</h3>
        {tabs.map((item) => (
          <button
            className={tab === item ? "active" : ""}
            onClick={() => setTab(item)}
            key={item}
          >
            {item}
          </button>
        ))}
      </aside>
      <section className="settings-content">
        {requestStatus === "pending" && (
          <div className="pending-change">
            <Clock3 />
            <p>
              <b>Change request pending approval</b>
              <span>
                Your current business email remains active while
                finance@acmegroup.com is reviewed.
              </span>
            </p>
            <Badge s="pending" />
          </div>
        )}
        {requestStatus === "approved" && (
          <div className="saved">
            <CheckCircle2 />
            <p>
              <b>Merchant change approved</b>
              <span>The requested business email is now active.</span>
            </p>
          </div>
        )}
        {tab === "Business details" && (
          <>
            <div className="setting-head">
              <div>
                <h2>Business details</h2>
                <p>
                  Approved merchant information shared with your applications.
                </p>
              </div>
              <Badge s="approved" />
            </div>
            <div className="detail-grid">
              <label>
                Registered business name
                <input value={merchant} readOnly />
              </label>
              <label>
                Trading name
                <input defaultValue="Acme" readOnly />
              </label>
              <label>
                Registration number
                <input defaultValue="CS093482016" disabled />
              </label>
              <label>
                Tax identification number
                <input defaultValue="GHA-84920384" disabled />
              </label>
              <label>
                Industry
                <input defaultValue="Wholesale and distribution" readOnly />
              </label>
              <label>
                Business email
                <input value={activeEmail} readOnly />
              </label>
              <label>
                Phone number
                <input defaultValue="+233 30 555 0194" readOnly />
              </label>
              <label>
                Website
                <input defaultValue="www.acmetrading.com" readOnly />
              </label>
            </div>
            <div className="address">
              <h3>Registered address</h3>
              <p>14 Independence Avenue, Airport City, Accra, Ghana</p>
              <button className="outline">Request address change</button>
              <small>
                <ShieldCheck /> Regulated details require review before they
                change.
              </small>
            </div>
            <div className="setting-actions">
              <button
                className="primary"
                onClick={() => setRequestOpen(true)}
                disabled={requestStatus === "pending"}
              >
                {requestStatus === "pending"
                  ? "Request pending"
                  : "Request a change"}
              </button>
            </div>
          </>
        )}
        {tab === "Bank accounts" && <BankSettings />}
        {tab === "Branding" && <BrandSettings />}
        {tab === "Setup requests" && <SetupRequests />}
      </section>
      {requestOpen && (
        <Overlay>
          <section className="change request-change">
            <header>
              <div>
                <h2>Request merchant change</h2>
                <p>
                  The current value stays active until this request is approved.
                </p>
              </div>
              <button onClick={() => setRequestOpen(false)}>
                <X />
              </button>
            </header>
            <div className="value-compare">
              <div>
                <small>CURRENT VALUE</small>
                <b>{activeEmail}</b>
              </div>
              <ChevronRight />
              <label>
                REQUESTED VALUE
                <input
                  autoFocus
                  value={requestedEmail}
                  onChange={(e) => setRequestedEmail(e.target.value)}
                  placeholder="finance@acmegroup.com"
                />
              </label>
            </div>
            <label className="field">
              Reason for change
              <textarea defaultValue="Update the primary finance contact for merchant communications." />
            </label>
            <div className="approval-note">
              <ShieldCheck />
              <p>
                <b>Approval required</b>
                <span>
                  No active merchant data changes until review is complete.
                </span>
              </p>
            </div>
            <footer>
              <button className="outline" onClick={() => setRequestOpen(false)}>
                Cancel
              </button>
              <button
                className="primary"
                disabled={submitting || !requestedEmail.includes("@")}
                onClick={submitRequest}
              >
                {submitting ? (
                  <>
                    <span className="spinner light" />
                    Submitting…
                  </>
                ) : (
                  "Review & submit"
                )}
              </button>
            </footer>
          </section>
        </Overlay>
      )}
    </div>
  )
}

function BankSettings() {
  const [requested, setRequested] = useState(false)
  return (
    <>
      <div className="setting-head">
        <div>
          <h2>Bank accounts</h2>
          <p>Accounts available to Transflow applications for this merchant.</p>
        </div>
        <button className="primary">
          <Plus /> Request bank account
        </button>
      </div>
      <div className="bank-settings">
        {[
          [
            "Titan Trust Bank",
            "Operating Account",
            "4587",
            "Primary settlement",
            "approved",
          ],
          [
            "Guardian Commercial Bank",
            "Reserve Account",
            "2196",
            "Eligibility review required",
            "pending",
          ],
        ].map(([bank, name, last, note, status], i) => (
          <article key={last}>
            <div className={`bank-logo b${i}`}>
              <Landmark />
            </div>
            <div>
              <h3>{bank}</h3>
              <p>
                {name} •••• {last}
              </p>
              <small>GHS · {note}</small>
            </div>
            <Badge s={status} />
            <button>
              <MoreHorizontal />
            </button>
          </article>
        ))}
      </div>
      <section className="request-card">
        <SlidersHorizontal />
        <div>
          <h3>Need a different account setup?</h3>
          <p>
            Request settlement routing, reserve-account eligibility, or
            multi-account access.
          </p>
        </div>
        <button className="outline" onClick={() => setRequested(true)}>
          {requested ? "Request submitted" : "Request setup"}
        </button>
      </section>
    </>
  )
}
function BrandSettings() {
  return (
    <>
      <div className="setting-head">
        <div>
          <h2>Business branding</h2>
          <p>Shown on invoices, payment pages and customer messages.</p>
        </div>
      </div>
      <div className="brand-card">
        <div className="brand-preview">
          <span>ACME</span>
          <div>
            <h3>Acme Trading Ltd</h3>
            <p>Wholesale and distribution</p>
          </div>
        </div>
        <label>
          Business logo
          <div className="logo-upload">
            <Upload />
            <span>
              <b>Upload a new logo</b>
              <small>PNG, JPG or SVG · 2MB maximum</small>
            </span>
          </div>
        </label>
        <label>
          Display name
          <input defaultValue="Acme Trading" />
        </label>
        <label>
          Brand colour
          <input type="color" defaultValue="#0b63f6" />
        </label>
        <button className="primary">Request branding change</button>
      </div>
    </>
  )
}
function SetupRequests() {
  return (
    <>
      <div className="setting-head">
        <div>
          <h2>Setup requests</h2>
          <p>Track requests that affect shared merchant services.</p>
        </div>
        <button className="primary">
          <Plus />
          New request
        </button>
      </div>
      <div className="request-list">
        {[
          [
            "Reserve account eligibility",
            "Guardian Commercial Bank ••••2196",
            "In review",
          ],
          [
            "Additional settlement currency",
            "Enable USD settlement",
            "Information required",
          ],
          ["Payment descriptor update", "ACME TRADING", "Completed"],
        ].map((x, i) => (
          <article key={x[0]}>
            <span className={`request-icon r${i}`}>
              <FileText />
            </span>
            <p>
              <b>{x[0]}</b>
              <small>{x[1]}</small>
            </p>
            <Badge s={i === 2 ? "approved" : "pending"} />
            <button className="outline">View</button>
          </article>
        ))}
      </div>
    </>
  )
}

function TransPaySetup({ back, done }: any) {
  type Branch = {
    id: string
    name: string
    code: string
    city: string
    account: string
  }
  type Draft = {
    purpose: string
    volume: string
    approval: string
    email: string
    settlement: string
    schedule: string
    branches: Branch[]
  }
  const initial: Draft = {
    purpose: "Supplier and beneficiary payments",
    volume: "GHS 100,000 – 500,000",
    approval: "Any 2 administrators",
    email: "payments@acmetrading.com",
    settlement: "Operating Account ••••4587",
    schedule: "Same-day settlement",
    branches: [],
  }
  const [step, setStep] = useState(() =>
    Number(localStorage.getItem("transpay-step") || 0)
  )
  const [draft, setDraft] = useState<Draft>(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("transpay-draft") || "null") || initial
      )
    } catch {
      return initial
    }
  })
  const [branch, setBranch] = useState<Branch | null>(null)
  const [removeId, setRemoveId] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const steps = ["General", "Settlement", "Branches", "Review & submit"]
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("transpay-draft", JSON.stringify(draft))
      localStorage.setItem("transpay-step", String(step))
      setSaving(false)
    }, 450)
    setSaving(true)
    return () => clearTimeout(timer)
  }, [draft, step])
  const update = (key: keyof Draft, value: any) =>
    setDraft((d) => ({ ...d, [key]: value }))
  const next = () => {
    const nextErrors: Record<string, string> = {}
    if (step === 0 && !draft.email.includes("@"))
      nextErrors.email = "Enter a valid notification email."
    if (step === 2 && !draft.branches.length)
      nextErrors.branches = "Add at least one branch to continue."
    setErrors(nextErrors)
    if (!Object.keys(nextErrors).length) setStep((s) => Math.min(3, s + 1))
  }
  const saveBranch = (value: Branch) => {
    const exists = draft.branches.some((x) => x.id === value.id)
    update(
      "branches",
      exists
        ? draft.branches.map((x) => (x.id === value.id ? value : x))
        : [...draft.branches, value]
    )
    setBranch(null)
    setErrors({})
  }
  const submit = () => {
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSuccess(true)
    }, 1300)
  }
  return (
    <div className="wizard-page">
      <div className="breadcrumbs">
        <button onClick={back}>Applications</button>
        <ChevronRight />
        <span>TransPay</span>
        <ChevronRight />
        <b>Setup</b>
      </div>
      <header className="wizard-head">
        <div>
          <h1>Set up TransPay</h1>
          <p>Configure payments, settlement and your initial branch network.</p>
        </div>
        <span className="autosave">
          {saving ? (
            <>
              <span className="spinner" />
              Saving…
            </>
          ) : (
            <>
              <CheckCircle2 />
              All changes saved
            </>
          )}
        </span>
      </header>
      <div className="wizard-stepper">
        {steps.map((label, i) => (
          <button
            className={`${i === step ? "active" : ""} ${i < step ? "complete" : ""}`}
            onClick={() => i < step && setStep(i)}
            key={label}
          >
            <span>{i < step ? <Check /> : i + 1}</span>
            <b>{label}</b>
          </button>
        ))}
      </div>
      <div className="wizard-body">
        <section className="wizard-main">
          {step === 0 && (
            <>
              <div className="stage-title">
                <h2>General settings</h2>
                <p>
                  Your approved merchant profile is already connected. Add only
                  the details TransPay needs.
                </p>
              </div>
              <div className="merchant-strip">
                <Building2 />
                <p>
                  <b>Acme Trading Ltd</b>
                  <small>Verified merchant · CS093482016 · Ghana</small>
                </p>
                <Badge s="approved" />
              </div>
              <div className="detail-grid wizard-fields">
                <label>
                  Primary payment purpose
                  <select
                    value={draft.purpose}
                    onChange={(e) => update("purpose", e.target.value)}
                  >
                    <option>Supplier and beneficiary payments</option>
                    <option>Payroll</option>
                    <option>Internal transfers</option>
                  </select>
                </label>
                <label>
                  Expected monthly volume
                  <select
                    value={draft.volume}
                    onChange={(e) => update("volume", e.target.value)}
                  >
                    <option>Below GHS 100,000</option>
                    <option>GHS 100,000 – 500,000</option>
                    <option>Above GHS 500,000</option>
                  </select>
                </label>
                <label>
                  Default approval rule
                  <select
                    value={draft.approval}
                    onChange={(e) => update("approval", e.target.value)}
                  >
                    <option>Any 2 administrators</option>
                    <option>One administrator</option>
                    <option>Finance manager + administrator</option>
                  </select>
                </label>
                <label>
                  Payment notifications
                  <input
                    className={errors.email ? "error" : ""}
                    value={draft.email}
                    onChange={(e) => update("email", e.target.value)}
                  />
                  {errors.email && <em>{errors.email}</em>}
                </label>
              </div>
              <label className="checkline">
                <input type="checkbox" defaultChecked />
                Enable beneficiary verification before first payment
              </label>
            </>
          )}
          {step === 1 && (
            <>
              <div className="stage-title">
                <h2>Settlement & payment settings</h2>
                <p>
                  Select how TransPay should fund payments and handle
                  settlement.
                </p>
              </div>
              <div className="account-select">
                <label className="selected">
                  <input type="radio" checked readOnly />
                  <span className="bank-logo">
                    <Landmark />
                  </span>
                  <p>
                    <b>Operating Account ••••4587</b>
                    <small>Titan Trust Bank · GHS · Eligible</small>
                  </p>
                  <Badge s="approved" />
                </label>
                <label>
                  <input type="radio" disabled />
                  <span className="bank-logo b1">
                    <Landmark />
                  </span>
                  <p>
                    <b>Reserve Account ••••2196</b>
                    <small>
                      Guardian Commercial Bank · Eligibility review required
                    </small>
                  </p>
                  <Badge s="pending" />
                </label>
              </div>
              <div className="detail-grid wizard-fields">
                <label>
                  Settlement account
                  <select
                    value={draft.settlement}
                    onChange={(e) => update("settlement", e.target.value)}
                  >
                    <option>Operating Account ••••4587</option>
                  </select>
                </label>
                <label>
                  Settlement schedule
                  <select
                    value={draft.schedule}
                    onChange={(e) => update("schedule", e.target.value)}
                  >
                    <option>Same-day settlement</option>
                    <option>Next business day</option>
                  </select>
                </label>
              </div>
              <div className="guidance">
                <CircleHelp />
                <p>
                  <b>Settlement account eligibility</b>
                  <span>
                    Only verified business accounts can be used. Add or request
                    account access in Merchant Settings.
                  </span>
                </p>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div className="stage-title row">
                <div>
                  <h2>Initial branches</h2>
                  <p>
                    Add every branch that should begin using TransPay on
                    activation.
                  </p>
                </div>
                <button
                  className="primary"
                  onClick={() =>
                    setBranch({
                      id: crypto.randomUUID(),
                      name: "",
                      code: "",
                      city: "Accra",
                      account: "Operating Account ••••4587",
                    })
                  }
                >
                  <Plus />
                  Add branch
                </button>
              </div>
              {errors.branches && (
                <div className="form-error">{errors.branches}</div>
              )}
              {draft.branches.length === 0 ? (
                <div className="branch-empty">
                  <Building2 />
                  <h3>No branches added yet</h3>
                  <p>
                    Create your first branch with a unique name and identifier.
                  </p>
                  <button
                    className="outline"
                    onClick={() =>
                      setBranch({
                        id: crypto.randomUUID(),
                        name: "",
                        code: "",
                        city: "Accra",
                        account: "Operating Account ••••4587",
                      })
                    }
                  >
                    Add first branch
                  </button>
                </div>
              ) : (
                <div className="branch-list">
                  {draft.branches.map((x, i) => (
                    <article key={x.id}>
                      <span>{i + 1}</span>
                      <p>
                        <b>{x.name}</b>
                        <small>
                          {x.code} · {x.city}
                        </small>
                        <small>{x.account}</small>
                      </p>
                      <Badge s="approved" />
                      <button className="outline" onClick={() => setBranch(x)}>
                        Edit
                      </button>
                      <button
                        className="danger-link"
                        onClick={() => setRemoveId(x.id)}
                      >
                        Remove
                      </button>
                    </article>
                  ))}
                </div>
              )}
            </>
          )}
          {step === 3 && <Review draft={draft} edit={setStep} />}
          <footer className="wizard-actions">
            <button
              className="outline"
              onClick={() => (step ? setStep(step - 1) : back())}
            >
              {step ? "Back" : "Save & exit"}
            </button>
            {step < 3 ? (
              <button className="primary" onClick={next}>
                Continue
              </button>
            ) : (
              <button
                className="primary"
                disabled={submitting}
                onClick={submit}
              >
                {submitting ? (
                  <>
                    <span className="spinner light" />
                    Submitting…
                  </>
                ) : (
                  "Submit setup"
                )}
              </button>
            )}
          </footer>
        </section>
        <aside className="wizard-help">
          <h3>Setup progress</h3>
          <b>{step + 1} of 4 steps</b>
          <div className="progress">
            <i style={{ width: `${(step + 1) * 25}%` }} />
          </div>
          <hr />
          <h3>Merchant information</h3>
          <p>
            <CheckCircle2 />
            Business verified
          </p>
          <p>
            <CheckCircle2 />
            Funding account eligible
          </p>
          <p>
            <CheckCircle2 />
            Administrator permission
          </p>
          <hr />
          <h3>Need help?</h3>
          <p className="muted">
            Your setup is automatically saved. You can leave and resume at any
            time.
          </p>
          <button className="outline">Contact support</button>
        </aside>
      </div>
      {branch && (
        <BranchModal
          value={branch}
          close={() => setBranch(null)}
          save={saveBranch}
        />
      )}{" "}
      {removeId && (
        <ConfirmModal
          close={() => setRemoveId(null)}
          confirm={() => {
            update(
              "branches",
              draft.branches.filter((x) => x.id !== removeId)
            )
            setRemoveId(null)
          }}
        />
      )}
      {success && (
        <Overlay>
          <section className="success submit-success">
            <span>
              <Check />
            </span>
            <h2>TransPay setup submitted</h2>
            <p>
              Your configuration has been successfully submitted. We’ll notify
              you when TransPay is ready to use.
            </p>
            <button
              className="primary"
              onClick={() => {
                setSuccess(false)
                done()
                back()
              }}
            >
              Return to Applications
            </button>
          </section>
        </Overlay>
      )}
    </div>
  )
}

function Review({ draft, edit }: any) {
  return (
    <>
      <div className="stage-title">
        <h2>Review & submit</h2>
        <p>Confirm your configuration before sending it for activation.</p>
      </div>
      <div className="review-sections">
        <section>
          <header>
            <h3>Business</h3>
            <button onClick={() => edit(0)}>Edit</button>
          </header>
          <dl>
            <div>
              <dt>Merchant</dt>
              <dd>Acme Trading Ltd</dd>
            </div>
            <div>
              <dt>Registration</dt>
              <dd>CS093482016</dd>
            </div>
            <div>
              <dt>Primary contact</dt>
              <dd>Gideon Okafor</dd>
            </div>
          </dl>
        </section>
        <section>
          <header>
            <h3>TransPay configuration</h3>
            <button onClick={() => edit(0)}>Edit</button>
          </header>
          <dl>
            <div>
              <dt>Payment purpose</dt>
              <dd>{draft.purpose}</dd>
            </div>
            <div>
              <dt>Monthly volume</dt>
              <dd>{draft.volume}</dd>
            </div>
            <div>
              <dt>Approval rule</dt>
              <dd>{draft.approval}</dd>
            </div>
          </dl>
        </section>
        <section>
          <header>
            <h3>Settlement account</h3>
            <button onClick={() => edit(1)}>Edit</button>
          </header>
          <dl>
            <div>
              <dt>Account</dt>
              <dd>{draft.settlement}</dd>
            </div>
            <div>
              <dt>Schedule</dt>
              <dd>{draft.schedule}</dd>
            </div>
          </dl>
        </section>
        <section>
          <header>
            <h3>Branches ({draft.branches.length})</h3>
            <button onClick={() => edit(2)}>Edit</button>
          </header>
          {draft.branches.map((b: any) => (
            <div className="review-branch" key={b.id}>
              <b>{b.name}</b>
              <span>
                {b.code} · {b.city}
              </span>
            </div>
          ))}
        </section>
      </div>
      <label className="checkline review-confirm">
        <input type="checkbox" defaultChecked />I confirm that this
        configuration is accurate and can be submitted for activation.
      </label>
    </>
  )
}
function BranchModal({ value, close, save }: any) {
  const [data, setData] = useState(value),
    [error, setError] = useState("")
  const submit = () => {
    if (!data.name.trim() || !data.code.trim()) {
      setError("Branch name and identifier are required.")
      return
    }
    save(data)
  }
  return (
    <Overlay>
      <section className="branch-modal">
        <header>
          <div>
            <h2>{value.name ? "Edit branch" : "Add branch"}</h2>
            <p>Branch identifiers must be unique within your merchant.</p>
          </div>
          <button onClick={close}>
            <X />
          </button>
        </header>
        <div className="detail-grid">
          <label>
            Branch name
            <input
              autoFocus
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              placeholder="e.g. Airport City Branch"
            />
          </label>
          <label>
            Branch identifier
            <input
              value={data.code}
              onChange={(e) =>
                setData({ ...data, code: e.target.value.toUpperCase() })
              }
              placeholder="e.g. ACC-001"
            />
          </label>
          <label>
            City / location
            <input
              value={data.city}
              onChange={(e) => setData({ ...data, city: e.target.value })}
            />
          </label>
          <label>
            Associated account
            <select
              value={data.account}
              onChange={(e) => setData({ ...data, account: e.target.value })}
            >
              <option>Operating Account ••••4587</option>
            </select>
          </label>
        </div>
        {error && <div className="form-error">{error}</div>}
        <footer>
          <button className="outline" onClick={close}>
            Cancel
          </button>
          <button className="primary" onClick={submit}>
            Save branch
          </button>
        </footer>
      </section>
    </Overlay>
  )
}
function ConfirmModal({ close, confirm }: any) {
  return (
    <Overlay>
      <section className="confirm-modal">
        <span className="warning">
          <Building2 />
        </span>
        <h2>Remove this branch?</h2>
        <p>
          The branch will be removed from this setup. You can add it again
          before submission.
        </p>
        <footer>
          <button className="outline" onClick={close}>
            Keep branch
          </button>
          <button className="danger" onClick={confirm}>
            Remove branch
          </button>
        </footer>
      </section>
    </Overlay>
  )
}

function TransPayProcessing({ back }: any) {
  return (
    <div className="wizard-page">
      <div className="breadcrumbs">
        <button onClick={back}>Applications</button>
        <ChevronRight />
        <span>TransPay</span>
        <ChevronRight />
        <b>Activation</b>
      </div>
      <section className="processing-page">
        <span className="processing-icon">
          <Clock3 />
        </span>
        <Badge s="processing" />
        <h1>TransPay setup is processing</h1>
        <p>
          We’re applying your payment, settlement and branch configuration. This
          prototype will activate TransPay automatically in a few moments.
        </p>
        <div className="processing-track">
          <i />
        </div>
        <div className="processing-steps">
          <span className="done">
            <Check />
            Setup submitted
          </span>
          <span className="current">
            <span className="spinner" />
            Configuring TransPay
          </span>
          <span>Ready to use</span>
        </div>
        <div className="processing-summary">
          <div>
            <b>Business</b>
            <span>Acme Trading Ltd</span>
          </div>
          <div>
            <b>Configuration</b>
            <span>Saved and validated</span>
          </div>
          <div>
            <b>Notification</b>
            <span>You’ll be notified in-app</span>
          </div>
        </div>
        <button className="outline" onClick={back}>
          Return to Applications
        </button>
      </section>
    </div>
  )
}
function TransPayReady({ back }: any) {
  return (
    <div className="wizard-page">
      <div className="breadcrumbs">
        <button onClick={back}>Applications</button>
        <ChevronRight />
        <b>TransPay</b>
      </div>
      <header className="wizard-head">
        <div>
          <h1>TransPay</h1>
          <p>Send and manage business payments for Acme Trading Ltd.</p>
        </div>
        <Badge s="ready" />
      </header>
      <div className="context-tabs">
        <button className="active">Overview</button>
        <button>Payments</button>
        <button>Beneficiaries</button>
        <button>Branches</button>
        <button>Settings</button>
      </div>
      <div className="metrics">
        <article>
          <small>PAYMENTS TODAY</small>
          <h2>GHS 0.00</h2>
          <p>No payments sent yet</p>
        </article>
        <article>
          <small>AVAILABLE FUNDING</small>
          <h2>GHS 248,920.42</h2>
          <p>Operating Account ••••4587</p>
        </article>
        <article>
          <small>ACTIVE BRANCHES</small>
          <h2>
            {
              JSON.parse(
                localStorage.getItem("transpay-draft") || '{"branches":[]}'
              ).branches.length
            }
          </h2>
          <p>Ready to make payments</p>
        </article>
      </div>
      <section className="ready-empty">
        <Banknote />
        <h2>TransPay is ready</h2>
        <p>Create your first payment or add a beneficiary to get started.</p>
        <div>
          <button className="primary">
            <Plus />
            Create payment
          </button>
          <button className="outline">
            <Users />
            Add beneficiary
          </button>
        </div>
      </section>
    </div>
  )
}

function Generic({ view, go, transpayStatus, merchant, setMerchant }: any) {
  if (view === "applications")
    return (
      <Catalogue go={go} transpayStatus={transpayStatus} merchant={merchant} />
    )
  const titles: any = {
    businesses: ["Businesses", "Manage business profiles and relationships."],
    users: ["Users & access", "Control access to businesses and applications."],
    approvals: [
      "Approvals",
      "Review and track requests across your organisation.",
    ],
    audit: ["Audit activity", "A complete record of important events."],
    support: ["Support", "Get help with Merchant Suite and your applications."],
    settings: ["Settings", "Manage shared merchant details and services."],
    settlement: ["Settlement", "Track settlement batches and reconciliation."],
    balances: [
      "Balances",
      "View available and ledger balances across accounts.",
    ],
    product: [
      "RPay overview",
      "Collections, reconciliation and recent activity.",
    ],
  }
  const [t, s] = titles[view] || titles.product
  return (
    <Page title={t} sub={s}>
      {view === "users" ? (
        <UsersPage merchant={merchant} />
      ) : view === "approvals" ? (
        <Approvals />
      ) : view === "businesses" ? (
        <Businesses merchant={merchant} setMerchant={setMerchant} />
      ) : view === "audit" ? (
        <Audit />
      ) : view === "support" ? (
        <Support />
      ) : view === "settings" ? (
        <MerchantSettings merchant={merchant} />
      ) : view === "settlement" ? (
        <SettlementExperience merchant={merchant} />
      ) : view === "balances" ? (
        <BalancesExperience merchant={merchant} />
      ) : (
        <Metrics />
      )}
    </Page>
  )
}
function Catalogue({ go, transpayStatus, merchant }: any) {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 420)
    return () => clearTimeout(timer)
  }, [])
  if (loading)
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
  return (
    <Page
      title="Application catalogue"
      sub={`All products available to ${merchant}.`}
    >
      <div className="cataloglist">
        {products.map((p) => {
          const displayStatus =
            p.name === "TransPay"
              ? transpayStatus === "active"
                ? "active"
                : transpayStatus === "processing"
                  ? "processing"
                  : p.status
              : p.status
          const cta =
            p.name === "TransPay"
              ? transpayStatus === "active"
                ? "Open TransPay"
                : transpayStatus === "processing"
                  ? "View progress"
                  : "Set up"
              : p.status === "active"
                ? "Open"
                : p.status === "pending"
                  ? "View status"
                  : "Set up"
          return (
            <div key={p.name}>
              <Icon p={p} big />
              <p>
                <b>{p.name}</b>
                <span>{p.desc}</span>
              </p>
              <Badge s={displayStatus} />
              <button
                className="outline"
                onClick={() =>
                  go(
                    p.name === "Accounts"
                      ? "setup"
                      : p.name === "TransPay"
                        ? "transpay-setup"
                        : p.name === "Settlement"
                          ? "settlement"
                          : "product"
                  )
                }
              >
                {cta}
              </button>
            </div>
          )
        })}
      </div>
    </Page>
  )
}
function UsersPage({ merchant = "Acme Trading Ltd" }: any) {
  return (
    <section className="table">
      <header>
        <h2>Team members</h2>
        <button className="primary">
          <Plus />
          Invite user
        </button>
      </header>
      {[
        ["Gideon Okafor", "gideon@acme.com", "Merchant Administrator"],
        ["Ama Mensah", "ama@acme.com", "Finance Manager"],
        ["Kwame Boateng", "kwame@acme.com", "Operations"],
        ["Nana Owusu", "nana@acme.com", "Viewer"],
      ].map((r) => (
        <div key={r[0]}>
          <i>{r[0][0]}</i>
          <p>
            <b>{r[0]}</b>
            <small>{r[1]}</small>
          </p>
          <span>{r[2]}</span>
          <span>{merchant}</span>
          <Badge s="active" />
          <MoreHorizontal />
        </div>
      ))}
    </section>
  )
}
function Approvals() {
  return (
    <>
      <div className="tabs">
        <button className="active">Needs my approval (2)</button>
        <button>Submitted by me</button>
        <button>Completed</button>
      </div>
      <section className="approvals table">
        {[
          [Users, "Ama Mensah requested access to RPay", "User access · Today"],
          [
            SlidersHorizontal,
            "Settlement configuration change",
            "Configuration · Yesterday",
          ],
        ].map(([I, t, d]: any) => (
          <div key={t}>
            <span>
              <I />
            </span>
            <p>
              <b>{t}</b>
              <small>{d} · Acme Trading Ltd</small>
            </p>
            <button className="outline">Review</button>
          </div>
        ))}
      </section>
    </>
  )
}
function Businesses({ merchant, setMerchant }: any) {
  const [selected, setSelected] = useState(
    () => localStorage.getItem("selected-business") || ""
  )
  const [confirm, setConfirm] = useState("")
  const [businessTab, setBusinessTab] = useState("Overview")
  useEffect(() => {
    const openBusiness = (event: Event) =>
      setSelected((event as CustomEvent<string>).detail)
    window.addEventListener("transflow-business-detail", openBusiness)
    return () =>
      window.removeEventListener("transflow-business-detail", openBusiness)
  }, [])
  const onboarding = (() => {
    try {
      return JSON.parse(localStorage.getItem("transflow-onboarding") || "null")
    } catch {
      return null
    }
  })()
  const businesses = [
    {
      initials: "ACME",
      name: "Acme Trading Ltd",
      status: "approved",
      kind: "Independent business",
    },
    {
      initials: "NR",
      name: "Nova Retail Ltd",
      status: "onboarding",
      kind: "Onboarding incomplete",
    },
    {
      initials: "AD",
      name: "Acme Distribution",
      status: "approved",
      kind: "Related business",
    },
    ...(onboarding
      ? [
          {
            initials: "NB",
            name: onboarding.name,
            status: "onboarding",
            kind: "Onboarding incomplete",
          },
        ]
      : []),
  ]
  const item = businesses.find((x) => x.name === selected)
  if (item)
    return (
      <div className="business-detail">
        <button
          className="back-link"
          onClick={() => {
            setSelected("")
            localStorage.removeItem("selected-business")
          }}
        >
          <ArrowLeft />
          All businesses
        </button>
        {item.status === "approved" ? (
          <>
            <div className="business-detail-head">
              <span className="business-avatar">{item.initials}</span>
              <div>
                <h2>{item.name}</h2>
                <p>{item.kind} · Ghana</p>
              </div>
              <Badge s="approved" />
              <button
                className="primary"
                disabled={merchant === item.name}
                onClick={() => setConfirm(item.name)}
              >
                {merchant === item.name
                  ? "Current business"
                  : "Switch to this business"}
              </button>
            </div>
            <div className="business-facts">
              <div>
                <small>Registration</small>
                <b>CS093482016</b>
              </div>
              <div>
                <small>Merchant status</small>
                <b>Active</b>
              </div>
              <div>
                <small>Applications</small>
                <b>5 available</b>
              </div>
              <div>
                <small>Users</small>
                <b>8 users</b>
              </div>
            </div>
            <div className="business-detail-tabs">
              {["Overview", "Representatives", "Documents", "Applications"].map(
                (x) => (
                  <button
                    className={businessTab === x ? "active" : ""}
                    onClick={() => setBusinessTab(x)}
                    key={x}
                  >
                    {x}
                  </button>
                )
              )}
            </div>
            <BusinessTab tab={businessTab} business={item} />
          </>
        ) : (
          <OnboardingDetail business={item} />
        )}
        {confirm && (
          <Overlay>
            <section className="confirm-modal">
              <span className="warning">
                <Building2 />
              </span>
              <h2>Switch business?</h2>
              <p>
                You're about to switch from <b>{merchant}</b> to{" "}
                <b>{confirm}</b>. Your applications and permissions will update
                to reflect this business.
              </p>
              <footer>
                <button className="outline" onClick={() => setConfirm("")}>
                  Cancel
                </button>
                <button
                  className="primary"
                  onClick={() => {
                    setMerchant(confirm)
                    setConfirm("")
                  }}
                >
                  Switch business
                </button>
              </footer>
            </section>
          </Overlay>
        )}
      </div>
    )
  return (
    <div className="businessgrid">
      {businesses.map((x) => (
        <article key={x.name}>
          <i>{x.initials}</i>
          <h2>{x.name}</h2>
          <Badge s={x.status === "approved" ? "approved" : "pending"} />
          <p>{x.kind}</p>
          <button
            className="outline"
            onClick={() => {
              setSelected(x.name)
              localStorage.setItem("selected-business", x.name)
            }}
          >
            View business
          </button>
        </article>
      ))}
      <button
        className="addbiz"
        onClick={() => {
          startExternalOnboarding()
          setSelected("New business application")
        }}
      >
        <Plus />
        <b>Add another business</b>
        <span>Continue securely in the onboarding portal</span>
      </button>
    </div>
  )
}
function BusinessTab({ tab, business }: any) {
  if (tab === "Overview")
    return (
      <div className="business-tab-content overview-grid">
        <section>
          <h3>Business details</h3>
          <dl>
            <div>
              <dt>Legal name</dt>
              <dd>{business.name}</dd>
            </div>
            <div>
              <dt>Registration number</dt>
              <dd>CS093482016</dd>
            </div>
            <div>
              <dt>Tax ID</dt>
              <dd>GHA-84920384</dd>
            </div>
            <div>
              <dt>Industry</dt>
              <dd>Wholesale and distribution</dd>
            </div>
          </dl>
        </section>
        <section>
          <h3>Primary contact</h3>
          <p>
            <b>Gideon Okafor</b>
            <span>Merchant Administrator</span>
            <span>gideon@acmetrading.com</span>
            <span>+233 30 555 0194</span>
          </p>
        </section>
      </div>
    )
  if (tab === "Representatives")
    return (
      <div className="business-tab-content">
        <div className="data-toolbar">
          <div>
            <h3>Business representatives</h3>
            <p>Directors, owners and authorised representatives.</p>
          </div>
          <button className="outline">Request change</button>
        </div>
        <div className="representative-list">
          {[
            ["Gideon Okafor", "Primary administrator", "Director · Verified"],
            [
              "Ama Mensah",
              "Finance representative",
              "Authorised representative · Verified",
            ],
            ["Kofi Addo", "Beneficial owner", "35% ownership · Verified"],
          ].map((x) => (
            <div key={x[0]}>
              <i>{x[0][0]}</i>
              <p>
                <b>{x[0]}</b>
                <small>{x[1]}</small>
              </p>
              <span>{x[2]}</span>
              <Badge s="approved" />
            </div>
          ))}
        </div>
      </div>
    )
  if (tab === "Documents")
    return (
      <div className="business-tab-content">
        <div className="data-toolbar">
          <div>
            <h3>Business documents</h3>
            <p>Approved documents used across your applications.</p>
          </div>
          <button className="outline">Upload document</button>
        </div>
        <div className="report-list">
          {[
            ["Certificate of incorporation", "PDF · Uploaded Aug 18, 2026"],
            ["Proof of business address", "PDF · Uploaded Aug 18, 2026"],
            ["Tax registration certificate", "PDF · Uploaded Aug 17, 2026"],
          ].map((x) => (
            <article key={x[0]}>
              <span>
                <FileText />
              </span>
              <p>
                <b>{x[0]}</b>
                <small>{x[1]}</small>
              </p>
              <Badge s="approved" />
              <button className="outline">View</button>
            </article>
          ))}
        </div>
      </div>
    )
  return (
    <div className="business-tab-content">
      <div className="data-toolbar">
        <div>
          <h3>Available applications</h3>
          <p>Product access and configuration for {business.name}.</p>
        </div>
      </div>
      <div className="business-apps">
        {products.slice(0, 5).map((p, i) => (
          <div key={p.name}>
            <Icon p={p} />
            <p>
              <b>{p.name}</b>
              <small>{p.desc}</small>
            </p>
            <Badge s={i < 2 ? "active" : i === 2 ? "available" : "pending"} />
            <button className="outline">{i < 2 ? "Open" : "View"}</button>
          </div>
        ))}
      </div>
    </div>
  )
}
function OnboardingDetail({ business }: any) {
  return (
    <section className="onboarding-detail">
      <div className="onboarding-title">
        <div>
          <span>{business.initials}</span>
          <div>
            <h2>{business.name}</h2>
            <p>Application started · Last updated today</p>
          </div>
        </div>
        <button className="primary" onClick={startExternalOnboarding}>
          Resume onboarding
        </button>
      </div>
      <div className="onboarding-status">
        <header>
          <div>
            <h3>Onboarding incomplete</h3>
            <p>Complete your documents to continue.</p>
          </div>
          <b>42% complete</b>
        </header>
        <div className="progress">
          <i style={{ width: "42%" }} />
        </div>
        <div className="onboarding-steps">
          {[
            "Business details",
            "Representatives",
            "Documents",
            "Products",
            "Review",
          ].map((x, i) => (
            <div
              className={i < 2 ? "complete" : i === 2 ? "current" : ""}
              key={x}
            >
              <span>{i < 2 ? <Check /> : i + 1}</span>
              <b>{x}</b>
              <small>
                {i < 2 ? "Completed" : i === 2 ? "In progress" : "Not started"}
              </small>
            </div>
          ))}
        </div>
      </div>
      <div className="outstanding">
        <FileText />
        <p>
          <b>Outstanding requirement</b>
          <span>
            Upload proof of business address issued within the last three
            months.
          </span>
        </p>
        <button className="outline" onClick={startExternalOnboarding}>
          Continue
        </button>
      </div>
    </section>
  )
}
function Audit() {
  return (
    <section className="timeline">
      {[
        ["Gideon Okafor", "submitted Accounts configuration", "Today, 9:24 AM"],
        ["Ama Mensah", "requested access to Settlement", "Yesterday, 3:12 PM"],
        [
          "Compliance Operations",
          "approved business verification",
          "Aug 18, 2026",
        ],
      ].map((x) => (
        <div key={x[1]}>
          <Activity />
          <p>
            <b>{x[0]}</b> {x[1]}
            <small>{x[2]}</small>
          </p>
        </div>
      ))}
    </section>
  )
}
function Support() {
  return (
    <div className="support">
      <section>
        <Headphones />
        <h2>How can we help?</h2>
        <p>Our support team is available Monday–Friday, 8am–6pm.</p>
        <button className="primary">Contact support</button>
      </section>
      <section>
        <h2>Existing requests</h2>
        <p>
          <b>#TF-2841 · Account eligibility review</b>
          <Badge s="pending" />
        </p>
        <p>
          <b>#TF-2760 · User access question</b>
          <Badge s="approved" />
        </p>
      </section>
    </div>
  )
}
function SettlementExperience({ merchant }: any) {
  const [tab, setTab] = useState("Overview")
  return (
    <div className="ops-page">
      <div className="context-tabs">
        {[
          "Overview",
          "Batches",
          "Reconciliation",
          "Reports",
          "Configuration",
        ].map((x) => (
          <button
            className={tab === x ? "active" : ""}
            onClick={() => setTab(x)}
            key={x}
          >
            {x}
          </button>
        ))}
      </div>
      {tab === "Overview" ? (
        <>
          <div className="ops-summary">
            <div>
              <small>NEXT SETTLEMENT</small>
              <h2>GHS 86,420.00</h2>
              <p>Today at 5:00 PM</p>
            </div>
            <div>
              <small>PENDING BATCHES</small>
              <h2>3</h2>
              <p>2 ready · 1 under review</p>
            </div>
            <div>
              <small>SETTLED THIS MONTH</small>
              <h2>GHS 1.24m</h2>
              <p>42 completed batches</p>
            </div>
          </div>
          <section className="ops-list">
            <header>
              <div>
                <h2>Recent settlement batches</h2>
                <p>{merchant} · Updated just now</p>
              </div>
              <button className="outline">View all batches</button>
            </header>
            {[
              ["STL-2026-0842", "Today, 5:00 PM", "GHS 54,280.00", "Scheduled"],
              [
                "STL-2026-0841",
                "Today, 2:00 PM",
                "GHS 32,140.00",
                "Processing",
              ],
              [
                "STL-2026-0840",
                "Yesterday, 5:00 PM",
                "GHS 71,650.00",
                "Completed",
              ],
            ].map((x, i) => (
              <div key={x[0]}>
                <span className={`ops-icon o${i}`}>
                  <Activity />
                </span>
                <p>
                  <b>{x[0]}</b>
                  <small>{x[1]}</small>
                </p>
                <strong>{x[2]}</strong>
                <Badge
                  s={i === 2 ? "approved" : i === 1 ? "processing" : "pending"}
                />
                <ChevronRight />
              </div>
            ))}
          </section>
        </>
      ) : (
        <SettlementTab tab={tab} merchant={merchant} />
      )}
    </div>
  )
}
function BalancesExperience({ merchant }: any) {
  const [tab, setTab] = useState("Balances")
  return (
    <div className="ops-page">
      <div className="context-tabs">
        {["Balances", "Account activity", "Statements"].map((x) => (
          <button
            className={tab === x ? "active" : ""}
            onClick={() => setTab(x)}
            key={x}
          >
            {x}
          </button>
        ))}
      </div>
      {tab === "Balances" ? (
        <>
          <section className="balance-hero">
            <div>
              <small>TOTAL AVAILABLE BALANCE</small>
              <h2>GHS 248,920.42</h2>
              <p>Across 2 accounts for {merchant}</p>
            </div>
            <div>
              <small>TOTAL LEDGER BALANCE</small>
              <h2>GHS 263,104.18</h2>
              <p>Includes pending activity</p>
            </div>
            <button className="outline">Download statement</button>
          </section>
          <section className="ops-list account-balances">
            <header>
              <div>
                <h2>Business accounts</h2>
                <p>Balances refresh automatically.</p>
              </div>
              <span className="live">
                <i />
                Live
              </span>
            </header>
            {[
              [
                "Titan Trust Bank",
                "Operating Account ••••4587",
                "GHS 198,420.42",
                "GHS 204,810.18",
              ],
              [
                "Guardian Commercial Bank",
                "Reserve Account ••••2196",
                "GHS 50,500.00",
                "GHS 58,294.00",
              ],
            ].map((x, i) => (
              <div key={x[1]}>
                <span className={`bank-logo b${i}`}>
                  <Landmark />
                </span>
                <p>
                  <b>{x[1]}</b>
                  <small>{x[0]}</small>
                </p>
                <span>
                  <small>Available</small>
                  <b>{x[2]}</b>
                </span>
                <span>
                  <small>Ledger</small>
                  <b>{x[3]}</b>
                </span>
                <ChevronRight />
              </div>
            ))}
          </section>
        </>
      ) : (
        <BalancesTab tab={tab} merchant={merchant} />
      )}
    </div>
  )
}
function SettlementTab({ tab, merchant }: any) {
  if (tab === "Batches")
    return (
      <section className="data-view">
        <div className="data-toolbar">
          <div>
            <h2>Settlement batches</h2>
            <p>All scheduled and completed batches for {merchant}.</p>
          </div>
          <div>
            <button className="outline">Export</button>
            <button className="primary">Create batch</button>
          </div>
        </div>
        <div className="filter-row">
          <button className="active">
            All <span>48</span>
          </button>
          <button>
            Scheduled <span>3</span>
          </button>
          <button>
            Processing <span>1</span>
          </button>
          <button>
            Completed <span>44</span>
          </button>
        </div>
        <div className="data-table">
          <header>
            <span>Batch</span>
            <span>Settlement date</span>
            <span>Transactions</span>
            <span>Amount</span>
            <span>Status</span>
          </header>
          {[
            [
              "STL-2026-0842",
              "Aug 20, 2026 · 5:00 PM",
              "126",
              "GHS 54,280.00",
              "pending",
            ],
            [
              "STL-2026-0841",
              "Aug 20, 2026 · 2:00 PM",
              "84",
              "GHS 32,140.00",
              "processing",
            ],
            [
              "STL-2026-0840",
              "Aug 19, 2026 · 5:00 PM",
              "191",
              "GHS 71,650.00",
              "approved",
            ],
            [
              "STL-2026-0839",
              "Aug 19, 2026 · 2:00 PM",
              "57",
              "GHS 24,810.00",
              "approved",
            ],
          ].map((x) => (
            <button key={x[0]}>
              <b>{x[0]}</b>
              <span>{x[1]}</span>
              <span>{x[2]}</span>
              <strong>{x[3]}</strong>
              <Badge s={x[4]} />
            </button>
          ))}
        </div>
      </section>
    )
  if (tab === "Reconciliation")
    return (
      <section className="data-view">
        <div className="data-toolbar">
          <div>
            <h2>Reconciliation</h2>
            <p>Compare expected settlement values with received funds.</p>
          </div>
          <button className="outline">Download report</button>
        </div>
        <div className="recon-summary">
          <div>
            <CheckCircle2 />
            <p>
              <small>MATCHED</small>
              <b>GHS 1,186,420.00</b>
              <span>39 batches</span>
            </p>
          </div>
          <div>
            <Clock3 />
            <p>
              <small>IN REVIEW</small>
              <b>GHS 38,540.00</b>
              <span>2 batches</span>
            </p>
          </div>
          <div>
            <CircleHelp />
            <p>
              <small>VARIANCE</small>
              <b>GHS 1,240.00</b>
              <span>1 batch needs attention</span>
            </p>
          </div>
        </div>
        <div className="data-table">
          <header>
            <span>Batch</span>
            <span>Expected</span>
            <span>Received</span>
            <span>Variance</span>
            <span>Result</span>
          </header>
          {[
            [
              "STL-2026-0840",
              "GHS 71,650.00",
              "GHS 71,650.00",
              "GHS 0.00",
              "approved",
            ],
            [
              "STL-2026-0839",
              "GHS 24,810.00",
              "GHS 23,570.00",
              "GHS 1,240.00",
              "pending",
            ],
          ].map((x) => (
            <button key={x[0]}>
              <b>{x[0]}</b>
              <span>{x[1]}</span>
              <span>{x[2]}</span>
              <strong>{x[3]}</strong>
              <Badge s={x[4]} />
            </button>
          ))}
        </div>
      </section>
    )
  if (tab === "Reports")
    return (
      <section className="data-view">
        <div className="data-toolbar">
          <div>
            <h2>Settlement reports</h2>
            <p>Prepared exports for finance and reconciliation teams.</p>
          </div>
          <button className="primary">Create report</button>
        </div>
        <div className="report-list">
          {[
            [
              "Monthly settlement summary",
              "August 2026 · PDF",
              "Generated today",
            ],
            [
              "Transaction reconciliation export",
              "Aug 1–20 · CSV",
              "Generated today",
            ],
            ["Settlement fee statement", "July 2026 · PDF", "Generated Aug 1"],
          ].map((x, i) => (
            <article key={x[0]}>
              <span>
                <FileText />
              </span>
              <p>
                <b>{x[0]}</b>
                <small>
                  {x[1]} · {x[2]}
                </small>
              </p>
              <Badge s={i ? "approved" : "processing"} />
              <button className="outline">Download</button>
            </article>
          ))}
        </div>
      </section>
    )
  return (
    <section className="data-view">
      <div className="data-toolbar">
        <div>
          <h2>Settlement configuration</h2>
          <p>Current approved settings for {merchant}.</p>
        </div>
        <button className="outline">Request a change</button>
      </div>
      <div className="config-rows">
        {[
          ["Primary settlement account", "Operating Account ••••4587"],
          ["Settlement schedule", "Twice daily · 2:00 PM and 5:00 PM"],
          ["Settlement currency", "Ghanaian Cedi (GHS)"],
          ["Minimum batch value", "GHS 100.00"],
          ["Failure notifications", "settlements@acmetrading.com"],
        ].map((x) => (
          <div key={x[0]}>
            <span>{x[0]}</span>
            <b>{x[1]}</b>
          </div>
        ))}
      </div>
      <div className="activation-note">
        <ShieldCheck />
        <p>
          <b>Configuration changes require approval</b>
          <span>
            Your active configuration remains unchanged while a request is
            reviewed.
          </span>
        </p>
      </div>
    </section>
  )
}
function BalancesTab({ tab, merchant }: any) {
  if (tab === "Account activity")
    return (
      <section className="data-view">
        <div className="data-toolbar">
          <div>
            <h2>Account activity</h2>
            <p>Recent activity across accounts belonging to {merchant}.</p>
          </div>
          <div>
            <button className="outline">Filters</button>
            <button className="outline">Export</button>
          </div>
        </div>
        <div className="activity-balance">
          <span>
            Closing balance <b>GHS 248,920.42</b>
          </span>
          <span>
            Money in <b className="positive">+ GHS 124,810.00</b>
          </span>
          <span>
            Money out <b>- GHS 86,420.00</b>
          </span>
        </div>
        <div className="activity-list">
          {[
            [
              "Settlement received",
              "STL-2026-0840 · Today, 2:06 PM",
              "+ GHS 71,650.00",
              "in",
            ],
            [
              "Supplier payment",
              "Apex Office Supplies · Today, 11:42 AM",
              "− GHS 18,400.00",
              "out",
            ],
            [
              "Transfer between accounts",
              "Reserve Account · Yesterday, 4:15 PM",
              "− GHS 25,000.00",
              "out",
            ],
            [
              "Customer payment",
              "Invoice INV-38291 · Yesterday, 10:21 AM",
              "+ GHS 53,160.00",
              "in",
            ],
          ].map((x, i) => (
            <button key={x[1]}>
              <span className={`activity-icon a${i}`}>
                <Banknote />
              </span>
              <p>
                <b>{x[0]}</b>
                <small>{x[1]}</small>
              </p>
              <strong className={x[3] === "in" ? "positive" : ""}>
                {x[2]}
              </strong>
              <ChevronRight />
            </button>
          ))}
        </div>
      </section>
    )
  return (
    <section className="data-view">
      <div className="data-toolbar">
        <div>
          <h2>Statements</h2>
          <p>Monthly statements for your connected business accounts.</p>
        </div>
        <button className="outline">Statement preferences</button>
      </div>
      <div className="statement-account">
        <Landmark />
        <p>
          <b>Operating Account ••••4587</b>
          <small>Titan Trust Bank · GHS</small>
        </p>
        <ChevronDown />
      </div>
      <div className="report-list">
        {[
          ["August 2026", "Aug 1–20 · Current period", "Not final"],
          ["July 2026", "Jul 1–31 · 148 transactions", "Ready"],
          ["June 2026", "Jun 1–30 · 121 transactions", "Ready"],
          ["May 2026", "May 1–31 · 136 transactions", "Ready"],
        ].map((x, i) => (
          <article key={x[0]}>
            <span>
              <FileText />
            </span>
            <p>
              <b>{x[0]}</b>
              <small>{x[1]}</small>
            </p>
            <Badge s={i ? "approved" : "processing"} />
            <button className="outline">{i ? "Download" : "Preview"}</button>
          </article>
        ))}
      </div>
    </section>
  )
}
function Metrics() {
  return (
    <div className="metrics">
      {[
        ["AVAILABLE BALANCE", "GHS 248,920.42", "Across 2 connected accounts"],
        ["PAYMENTS TODAY", "42", "GHS 86,400 processed"],
        ["SETTLEMENT STATUS", "On schedule", "Next batch at 5:00 PM"],
      ].map((x) => (
        <article key={x[0]}>
          <small>{x[0]}</small>
          <h2>{x[1]}</h2>
          <p>{x[2]}</p>
        </article>
      ))}
    </div>
  )
}

export default function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const pathToView: Record<string, View> = {
    "/": "home",
    "/applications": "applications",
    "/businesses": "businesses",
    "/users": "users",
    "/approvals": "approvals",
    "/audit": "audit",
    "/support": "support",
    "/settings": "settings",
    "/settlement": "settlement",
    "/balances": "balances",
    "/accounts/setup": "setup",
    "/accounts/configuration": "accounts",
    "/transpay/setup": "transpay-setup",
    "/rpay": "product",
  }
  const view = pathToView[location.pathname] || "home"
  const viewToPath: Record<View, string> = {
    home: "/",
    applications: "/applications",
    businesses: "/businesses",
    users: "/users",
    approvals: "/approvals",
    audit: "/audit",
    support: "/support",
    settings: "/settings",
    settlement: "/settlement",
    balances: "/balances",
    setup: "/accounts/setup",
    accounts: "/accounts/configuration",
    "transpay-setup": "/transpay/setup",
    product: "/rpay",
  }
  const go = (next: View) => navigate(viewToPath[next])
  const [gateway, setGateway] = useState(false),
    [switcher, setSwitcher] = useState(false),
    [merchant, setMerchantState] = useState(
      () => localStorage.getItem("transflow-merchant") || "Acme Trading Ltd"
    ),
    [transpayStatus, setTranspayStatus] = useState(
      () => localStorage.getItem("transpay-status") || "draft"
    ),
    [toast, setToast] = useState(""),
    [dataReloading, setDataReloading] = useState(false)
  const setMerchant = (value: string) => {
    if (value === merchant) return
    setDataReloading(true)
    setTimeout(() => {
      setMerchantState(value)
      localStorage.setItem("transflow-merchant", value)
      setDataReloading(false)
      setToast(
        `Business switched to ${value}. Applications, permissions and balances have been refreshed.`
      )
    }, 950)
  }
  useEffect(() => {
    if (transpayStatus !== "processing") return
    const activateAt = Number(
      localStorage.getItem("transpay-activate-at") || Date.now() + 9000
    )
    localStorage.setItem("transpay-activate-at", String(activateAt))
    const activate = () => {
      setTranspayStatus("active")
      localStorage.setItem("transpay-status", "active")
      setToast(
        "TransPay is ready — your setup has been completed successfully."
      )
    }
    if (Date.now() >= activateAt) {
      activate()
      return
    }
    const timer = setTimeout(activate, activateAt - Date.now())
    return () => clearTimeout(timer)
  }, [transpayStatus])
  useEffect(() => {
    if (transpayStatus !== "active") return
    const resetAt = Number(
      localStorage.getItem("transpay-demo-reset-at") || Date.now() + 30000
    )
    localStorage.setItem("transpay-demo-reset-at", String(resetAt))
    const reset = () => {
      ;[
        "transpay-status",
        "transpay-draft",
        "transpay-step",
        "transpay-activate-at",
        "transpay-demo-reset-at",
      ].forEach((key) => localStorage.removeItem(key))
      setTranspayStatus("draft")
      setToast(
        "TransPay demo data has reset. The setup journey is ready to run again."
      )
    }
    if (Date.now() >= resetAt) {
      reset()
      return
    }
    const timer = setTimeout(reset, resetAt - Date.now())
    return () => clearTimeout(timer)
  }, [transpayStatus])
  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(""), 5000)
    return () => clearTimeout(timer)
  }, [toast])
  useEffect(() => {
    const check = () => {
      if (localStorage.getItem("merchant-change-status") !== "pending") return
      const at = Number(localStorage.getItem("merchant-change-at") || 0)
      if (at && Date.now() >= at) {
        const value =
          localStorage.getItem("merchant-request-email") ||
          "finance@acmetrading.com"
        localStorage.setItem("merchant-active-email", value)
        localStorage.setItem("merchant-change-status", "approved")
        localStorage.setItem(
          "merchant-change-notification",
          JSON.stringify({
            title: "Merchant change approved",
            body: "Your requested change to business email has been approved and is now active.",
            at: new Date().toISOString(),
          })
        )
        setToast(
          "Your requested change to business email has been approved and is now active."
        )
      }
    }
    check()
    const timer = setInterval(check, 1000)
    return () => clearInterval(timer)
  }, [])
  const submitTranspay = () => {
    setTranspayStatus("processing")
    localStorage.setItem("transpay-status", "processing")
    localStorage.setItem("transpay-activate-at", String(Date.now() + 9000))
    localStorage.removeItem("transpay-demo-reset-at")
    localStorage.removeItem("transpay-step")
  }
  const launch = (p: Product) => {
    setSwitcher(false)
    go(
      p.name === "Accounts"
        ? "setup"
        : p.name === "TransPay"
          ? "transpay-setup"
          : p.name === "Settlement"
            ? "settlement"
            : "product"
    )
  }
  return (
    <Shell
      view={view}
      go={go}
      openSwitch={() => setSwitcher(true)}
      transpayStatus={transpayStatus}
      merchant={merchant}
      setMerchant={setMerchant}
      dataReloading={dataReloading}
    >
      {view === "setup" ? (
        <Setup back={() => go("applications")} done={() => go("accounts")} />
      ) : view === "accounts" ? (
        <Accounts back={() => go("applications")} />
      ) : view === "transpay-setup" ? (
        transpayStatus === "processing" ? (
          <TransPayProcessing back={() => go("applications")} />
        ) : transpayStatus === "active" ? (
          <TransPayReady back={() => go("applications")} />
        ) : (
          <TransPaySetup
            back={() => go("applications")}
            done={submitTranspay}
          />
        )
      ) : view === "home" ? (
        <HomePage go={go} gateway={() => setGateway(true)} />
      ) : (
        <Generic
          view={view}
          go={go}
          transpayStatus={transpayStatus}
          merchant={merchant}
          setMerchant={setMerchant}
        />
      )}{" "}
      {gateway && (
        <Gateway
          close={() => setGateway(false)}
          proceed={() => {
            setGateway(false)
            go("setup")
          }}
        />
      )}
      {switcher && <AppSwitcher close={() => setSwitcher(false)} go={launch} />}
      {toast && (
        <div className="toast">
          <span>
            <CheckCircle2 />
          </span>
          <p>
            <b>
              {toast.startsWith("Business switched")
                ? "Business switched"
                : toast.startsWith("TransPay demo")
                  ? "Demo reset"
                  : toast.includes("requested change")
                    ? "Merchant change approved"
                    : "TransPay is ready"}
            </b>
            <small>{toast}</small>
          </p>
          <button onClick={() => setToast("")}>
            <X />
          </button>
        </div>
      )}
    </Shell>
  )
}
