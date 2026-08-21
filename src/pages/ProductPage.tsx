const metrics = [
  ["AVAILABLE BALANCE", "GHS 248,920.42", "Across 2 connected accounts"],
  ["PAYMENTS TODAY", "42", "GHS 86,400 processed"],
  ["SETTLEMENT STATUS", "On schedule", "Next batch at 5:00 PM"],
]

/** Placeholder RPay overview. */
export function ProductPage() {
  return (
    <div className="metrics">
      {metrics.map((metric) => (
        <article key={metric[0]}>
          <small>{metric[0]}</small>
          <h2>{metric[1]}</h2>
          <p>{metric[2]}</p>
        </article>
      ))}
    </div>
  )
}
