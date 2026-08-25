/** Framed tile that keeps every merchant logo the same size and alignment. */
export function BusinessLogo({
  src,
  name,
  className = "size-10",
}: {
  src?: string
  name: string
  className?: string
}) {
  return (
    <span
      className={`${className} grid shrink-0 place-items-center overflow-hidden rounded-[5px] border border-[#e3e7ed] bg-white p-1.5`}
    >
      {src ? (
        <img
          className="max-h-full max-w-full object-contain"
          src={src}
          alt=""
        />
      ) : (
        <b className="text-[10px] font-bold text-[#6c7688]">
          {name.slice(0, 2).toUpperCase()}
        </b>
      )}
    </span>
  )
}
