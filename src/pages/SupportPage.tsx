import { Headphones } from "lucide-react"

import { Badge } from "@/components/common"

export function SupportPage() {
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
