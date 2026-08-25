import { FileText } from "lucide-react"

import pdfMark from "@/assets/pdf.png"

/** Documents are identified by their meta line ("PDF · Uploaded Aug 18"), so
 *  the mark is picked from that rather than from a separate field. */
export function FileTypeIcon({
  meta,
  className = "size-9",
}: {
  meta?: string
  className?: string
}) {
  if (/pdf/i.test(meta ?? ""))
    return (
      <img
        src={pdfMark}
        alt="PDF"
        className={`${className} shrink-0 object-contain`}
      />
    )
  return (
    <span
      className={`${className} grid shrink-0 place-items-center rounded-md bg-[#eef3fa] text-[#0b3565]`}
    >
      <FileText aria-hidden="true" />
    </span>
  )
}
