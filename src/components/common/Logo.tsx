import darkMark from "@/assets/transflow_logo.png"
import lightMark from "@/assets/transflow_white.png"

/** The Transflow wordmark. Use `tone="light"` on dark backgrounds. */
export function Logo({ tone = "dark" }: { tone?: "light" | "dark" }) {
  return (
    <div className={`logo ${tone}`}>
      <img
        src={tone === "light" ? lightMark : darkMark}
        alt="Transflow"
        width={160}
        height={23}
      />
    </div>
  )
}
