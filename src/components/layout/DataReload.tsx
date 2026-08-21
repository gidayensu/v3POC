export function DataReload({
  title = "Switching business",
  sub = "Loading applications, permissions and financial data…",
}: {
  title?: string
  sub?: string
}) {
  return (
    <main className="data-reload">
      <div className="reload-head">
        <span className="spinner" />
        <div>
          <h2>{title}</h2>
          <p>{sub}</p>
        </div>
      </div>
      <div className="reload-grid">
        <i />
        <i />
        <i />
      </div>
      <div className="reload-lines">
        {[1, 2, 3, 4].map((x) => (
          <span key={x} />
        ))}
      </div>
    </main>
  )
}
