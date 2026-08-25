import { Upload } from "lucide-react"

import { PageActionButton } from "@/components/common"
import { businessLogo } from "@/data/businesses"

export function BrandSettings({
  merchant = "Acme Trading Ltd",
}: {
  merchant?: string
}) {
  const logo = businessLogo(merchant)
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
          <span>
            {logo ? <img src={logo} alt={merchant} /> : merchant.slice(0, 4)}
          </span>
          <div>
            <h3>{merchant}</h3>
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
          <input type="color" defaultValue="#002047" />
        </label>
        <div className="setting-actions">
          <PageActionButton>Request branding change</PageActionButton>
        </div>
      </div>
    </>
  )
}
