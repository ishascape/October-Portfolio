// One composite image of before (left) and after (right), with a dashed dimension line down the join.
export function BeforeAfterComparison({
  src,
  alt,
  width,
  height,
}: {
  src: string
  alt: string
  width: number
  height: number
}) {
  return (
    <figure className="ed-ba">
      <div className="ed-ba__frame">
        <img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
        <span className="ed-ba__divider" aria-hidden="true" />
      </div>
    </figure>
  )
}
