import { useState } from "react"
import { X } from "lucide-react"

import { Overlay } from "@/components/common"
import type { Branch } from "@/types"

export function BranchModal({
  value,
  close,
  save,
}: {
  value: Branch
  close: () => void
  save: (branch: Branch) => void
}) {
  const [data, setData] = useState(value)
  const [error, setError] = useState("")
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
