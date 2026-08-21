import { Upload } from "lucide-react"

export function BrandSettings() {
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
