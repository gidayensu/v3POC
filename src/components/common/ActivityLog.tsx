import type { LogEntry, LogGroup } from "@/types"

const toneStyles = {
  blue: "bg-[#7cc3e8]",
  green: "bg-[#43ac72]",
}

/**
 * One audit line. The home page and the audit page render the same row, so a
 * log entry looks and reads identically wherever it surfaces.
 */
export function LogRow({
  entry,
  context,
}: {
  entry: LogEntry
  /** Where the line came from, shown when the group heading is not on screen. */
  context?: string
}) {
  const Icon = entry.icon
  return (
    <div className="flex items-center gap-3.5 border-b border-[#eef0f6] py-3.5 last:border-0">
      <span
        className={`grid size-8 shrink-0 place-items-center rounded-full text-white ${toneStyles[entry.tone ?? "blue"]}`}
      >
        {Icon && <Icon aria-hidden="true" className="size-4" />}
      </span>
      <p className="min-w-0 flex-1 text-[13px] leading-snug text-[#3f4a60]">
        {entry.text.map((segment, s) =>
          typeof segment === "string" ? (
            <span key={s}>{segment}</span>
          ) : (
            <b key={s} className="font-semibold text-[#101d42]">
              {segment.b}
            </b>
          )
        )}
        {entry.link && (
          <button
            type="button"
            className="ml-2 text-[13px] text-[#2340c8] underline-offset-2 hover:underline"
          >
            {entry.link}
          </button>
        )}
      </p>
      {context && (
        <span className="hidden shrink-0 text-[12px] whitespace-nowrap text-[#8792a8] sm:block">
          {context}
        </span>
      )}
      <span className="shrink-0 text-[12px] whitespace-nowrap text-[#3f4a60]">
        {entry.at}
      </span>
    </div>
  )
}

/** The full trail, split by the area of the workspace each line came from. */
export function ActivityLog({ groups }: { groups: LogGroup[] }) {
  return (
    <>
      {groups.map((group) => (
        <div key={group.title}>
          <h2 className="border-b border-[#e8ebf2] pb-2.5 text-[13px] font-medium text-[#2340c8]">
            {group.title}
          </h2>
          {group.entries.map((entry, i) => (
            <LogRow key={`${group.title}-${i}`} entry={entry} />
          ))}
        </div>
      ))}
    </>
  )
}
