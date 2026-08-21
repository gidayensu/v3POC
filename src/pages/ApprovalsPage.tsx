import { SlidersHorizontal, Users } from "lucide-react"

const requests = [
  [Users, "Ama Mensah requested access to RPay", "User access · Today"],
  [
    SlidersHorizontal,
    "Settlement configuration change",
    "Configuration · Yesterday",
  ],
] as const

export function ApprovalsPage() {
  return (
    <>
      <div className="tabs">
        <button className="active">Needs my approval (2)</button>
        <button>Submitted by me</button>
        <button>Completed</button>
      </div>
      <section className="approvals table">
        {requests.map(([I, title, meta]) => (
          <div key={title}>
            <span>
              <I />
            </span>
            <p>
              <b>{title}</b>
              <small>{meta} · Acme Trading Ltd</small>
            </p>
            <button className="outline">Review</button>
          </div>
        ))}
      </section>
    </>
  )
}
