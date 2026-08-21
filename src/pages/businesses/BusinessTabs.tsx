import { FileText } from "lucide-react"

import { Badge, ProductIcon } from "@/components/common"
import { products } from "@/data/products"
import type { BusinessRecord } from "@/types"

function OverviewTab({ business }: { business: BusinessRecord }) {
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
    <div className="business-tab-content">
      <div className="data-toolbar">
        <div>
          <h3>Business representatives</h3>
          <p>Directors, owners and authorised representatives.</p>
        </div>
        <button className="outline">Request change</button>
      </div>
      <div className="representative-list">
        {representatives.map((person) => (
          <div key={person[0]}>
            <i>{person[0][0]}</i>
            <p>
              <b>{person[0]}</b>
              <small>{person[1]}</small>
            </p>
            <span>{person[2]}</span>
            <Badge s="approved" />
          </div>
        ))}
      </div>
    </div>
  )
}

function DocumentsTab() {
  const documents = [
    ["Certificate of incorporation", "PDF · Uploaded Aug 18, 2026"],
    ["Proof of business address", "PDF · Uploaded Aug 18, 2026"],
    ["Tax registration certificate", "PDF · Uploaded Aug 17, 2026"],
  ]
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
        {documents.map((doc) => (
          <article key={doc[0]}>
            <span>
              <FileText />
            </span>
            <p>
              <b>{doc[0]}</b>
              <small>{doc[1]}</small>
            </p>
            <Badge s="approved" />
            <button className="outline">View</button>
          </article>
        ))}
      </div>
    </div>
  )
}

function ApplicationsTab({ business }: { business: BusinessRecord }) {
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
            <ProductIcon p={p} />
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
