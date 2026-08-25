import { ShieldCheck } from "lucide-react"

import { Badge, PageActionButton } from "@/components/common"
import { businessLogo } from "@/data/businesses"

export function BusinessDetails({
  merchant,
  activeEmail,
  requestPending,
  requestChange,
}: {
  merchant: string
  activeEmail: string
  requestPending: boolean
  requestChange: () => void
}) {
  const logo = businessLogo(merchant)
  return (
    <>
      <div className="setting-head">
        <div className="merchant-identity">
          {logo ? (
            <span>
              <img src={logo} alt={merchant} />
            </span>
          ) : null}
          <div>
            <h2>Business details</h2>
            <p>Approved merchant information shared with your applications.</p>
          </div>
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
        <PageActionButton variant="outline">
          Request address change
        </PageActionButton>
        <small>
          <ShieldCheck /> Regulated details require review before they change.
        </small>
      </div>
      <div className="setting-actions">
        <PageActionButton onClick={requestChange} disabled={requestPending}>
          {requestPending ? "Request pending" : "Request a change"}
        </PageActionButton>
      </div>
    </>
  )
}
