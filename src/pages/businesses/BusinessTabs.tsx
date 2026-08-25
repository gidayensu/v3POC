import suiteMark from "@/assets/trans_blue.png"
import { Badge, FileTypeIcon, PageActionButton } from "@/components/common"
import { identityFor } from "@/data/appIdentity"
import { products } from "@/data/products"
import type { BusinessRecord } from "@/types"

/** Heading + optional action that opens each tab's content. */
function TabHeader({
  title,
  sub,
  action,
}: {
  title: string
  sub: string
  action?: { label: string; run?: () => void }
}) {
  return (
    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h3 className="m-0 text-base font-bold tracking-[-0.01em] text-[#101d42]">
          {title}
        </h3>
        <p className="mt-1 mb-0 text-sm text-[#667085]">{sub}</p>
      </div>
      {action && (
        <PageActionButton variant="outline" onClick={action.run}>
          {action.label}
        </PageActionButton>
      )}
    </div>
  )
}

const card = "rounded-xl bg-white p-6 shadow-[0_1px_2px_rgb(16_29_66/0.04)]"
const row =
  "flex flex-wrap items-center gap-4 rounded-lg bg-[#f7f9fc] px-5 py-4 transition-colors hover:bg-[#eef3fa]"

function OverviewTab({ business }: { business: BusinessRecord }) {
  const details = [
    ["Legal name", business.name],
    ["Registration number", "CS093482016"],
    ["Tax ID", "GHA-84920384"],
    ["Industry", "Wholesale and distribution"],
  ]
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <section className={card}>
        <h3 className="m-0 mb-4 text-base font-bold tracking-[-0.01em] text-[#101d42]">
          Business details
        </h3>
        <dl className="m-0">
          {details.map(([label, value]) => (
            <div
              key={label}
              className="flex justify-between gap-4 border-b border-[#eef1f6] py-3 last:border-0 last:pb-0"
            >
              <dt className="text-sm text-[#667085]">{label}</dt>
              <dd className="m-0 text-sm font-semibold text-[#101d42]">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </section>
      <section className={card}>
        <h3 className="m-0 mb-4 text-base font-bold tracking-[-0.01em] text-[#101d42]">
          Primary contact
        </h3>
        <p className="m-0 grid gap-1.5">
          <b className="text-[15px] font-bold text-[#101d42]">Gideon Okafor</b>
          <span className="text-sm text-[#667085]">Merchant Administrator</span>
          <span className="text-sm text-[#667085]">gideon@acmetrading.com</span>
          <span className="text-sm text-[#667085]">+233 30 555 0194</span>
        </p>
      </section>
    </div>
  )
}

function RepresentativesTab() {
  const representatives = [
    ["Gideon Okafor", "Primary administrator", "Director · Verified"],
    [
      "Ama Mensah",
      "Finance representative",
      "Authorised representative · Verified",
    ],
    ["Kofi Addo", "Beneficial owner", "35% ownership · Verified"],
  ]
  return (
    <section className={card}>
      <TabHeader
        title="Business representatives"
        sub="Directors, owners and authorised representatives."
        action={{ label: "Request change" }}
      />
      <div className="flex flex-col gap-3">
        {representatives.map((person) => (
          <div key={person[0]} className={row}>
            <i className="grid size-10 shrink-0 place-items-center rounded-full bg-[#eef3fa] text-sm font-bold text-[#0b3565] not-italic">
              {person[0][0]}
            </i>
            <p className="m-0 grid min-w-0 flex-1 gap-0.5">
              <b className="truncate text-sm font-bold text-[#101d42]">
                {person[0]}
              </b>
              <small className="truncate text-[13px] text-[#8792a8]">
                {person[1]}
              </small>
            </p>
            <span className="hidden text-[13px] text-[#667085] lg:block">
              {person[2]}
            </span>
            <Badge s="approved" />
          </div>
        ))}
      </div>
    </section>
  )
}

function DocumentsTab() {
  const documents = [
    ["Certificate of incorporation", "PDF · Uploaded Aug 18, 2026"],
    ["Proof of business address", "PDF · Uploaded Aug 18, 2026"],
    ["Tax registration certificate", "PDF · Uploaded Aug 17, 2026"],
  ]
  return (
    <section className={card}>
      <TabHeader
        title="Business documents"
        sub="Approved documents used across your applications."
        action={{ label: "Upload document" }}
      />
      <div className="flex flex-col gap-3">
        {documents.map((doc) => (
          <div key={doc[0]} className={row}>
            <FileTypeIcon meta={doc[1]} className="size-10" />
            <p className="m-0 grid min-w-0 flex-1 gap-0.5">
              <b className="truncate text-sm font-bold text-[#101d42]">
                {doc[0]}
              </b>
              <small className="truncate text-[13px] text-[#8792a8]">
                {doc[1]}
              </small>
            </p>
            <Badge s="approved" />
            <PageActionButton variant="outline">View</PageActionButton>
          </div>
        ))}
      </div>
    </section>
  )
}

/** Mirrors the catalogue and the switcher: the suite mark, the application's
 *  tagline, and where it stands for this business. */
function ApplicationsTab({ business }: { business: BusinessRecord }) {
  return (
    <section className={card}>
      <TabHeader
        title="Available applications"
        sub={`Product access and configuration for ${business.name}.`}
      />
      <div className="flex flex-col gap-3">
        {products.slice(0, 5).map((p, i) => (
          <div key={p.name} className={row}>
            {/* The mark ships pre-cropped on its navy field, so it just needs rounding. */}
            <img
              className="size-11 shrink-0 rounded-full object-cover"
              src={suiteMark}
              alt=""
            />
            <p className="m-0 grid min-w-0 flex-1 gap-0.5">
              <b className="truncate text-[15px] font-bold tracking-[-0.01em] text-[#101d42]">
                {p.name}
              </b>
              <small className="truncate text-[13px] text-[#8792a8]">
                {identityFor(p.name).tagline}
              </small>
            </p>
            <div className="hidden w-32 shrink-0 justify-start sm:flex">
              <Badge s={i < 2 ? "active" : i === 2 ? "available" : "pending"} />
            </div>
            <PageActionButton variant="outline">
              {i < 2 ? "Open" : "View"}
            </PageActionButton>
          </div>
        ))}
      </div>
    </section>
  )
}

export function BusinessTab({
  tab,
  business,
}: {
  tab: string
  business: BusinessRecord
}) {
  if (tab === "Overview") return <OverviewTab business={business} />
  if (tab === "Representatives") return <RepresentativesTab />
  if (tab === "Documents") return <DocumentsTab />
  return <ApplicationsTab business={business} />
}
