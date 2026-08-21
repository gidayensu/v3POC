import { MoreHorizontal, Plus } from "lucide-react"

import { Badge } from "@/components/common"

const team = [
  ["Gideon Okafor", "gideon@acme.com", "Merchant Administrator"],
  ["Ama Mensah", "ama@acme.com", "Finance Manager"],
  ["Kwame Boateng", "kwame@acme.com", "Operations"],
  ["Nana Owusu", "nana@acme.com", "Viewer"],
]

export function UsersPage({
  merchant = "Acme Trading Ltd",
}: {
  merchant?: string
}) {
  return (
    <section className="table">
      <header>
        <h2>Team members</h2>
        <button className="primary">
          <Plus />
          Invite user
        </button>
      </header>
      {team.map((member) => (
        <div key={member[0]}>
          <i>{member[0][0]}</i>
          <p>
            <b>{member[0]}</b>
            <small>{member[1]}</small>
          </p>
          <span>{member[2]}</span>
          <span>{merchant}</span>
          <Badge s="active" />
          <MoreHorizontal />
        </div>
      ))}
    </section>
  )
}
