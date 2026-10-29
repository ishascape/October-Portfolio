// The back of a card: a systems diagram in fine lines, a few cobalt marks and a small Oracle motif at the centre.
const stars = [
  [38, 62],
  [74, 98],
  [52, 140],
  [150, 74],
  [128, 118],
  [160, 168],
  [42, 214],
  [96, 246],
  [150, 232],
]

export function CardBack() {
  return (
    <svg className="oback" viewBox="0 0 200 320" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <rect className="oback__frame" x="10" y="10" width="180" height="300" />
      <rect className="oback__frame oback__frame--inner" x="18" y="18" width="164" height="284" />
      {[1, 2, 3, 4, 5].map((i) => (
        <line key={`v${i}`} className="oback__grid" x1={18 + i * 27.3} y1="18" x2={18 + i * 27.3} y2="302" />
      ))}
      {[1, 2, 3, 4, 5, 6, 7].map((i) => (
        <line key={`h${i}`} className="oback__grid" x1="18" y1={18 + i * 35.5} x2="182" y2={18 + i * 35.5} />
      ))}
      <path
        className="oback__line"
        d="M38 62 L74 98 L52 140 L100 160 L128 118 L150 74 M128 118 L160 168 L100 160 L42 214 L96 246 L150 232 L160 168"
      />
      {stars.map(([x, y]) => (
        <circle key={`${x}-${y}`} className="oback__dot" cx={x} cy={y} r="2.2" />
      ))}
      <circle className="oback__ring" cx="100" cy="160" r="22" />
      <circle className="oback__ring oback__ring--dash" cx="100" cy="160" r="40" />
      <circle className="oback__ring" cx="100" cy="160" r="58" />
      <path className="oback__star" d="M100 142 V178 M84.4 151 L115.6 169 M84.4 169 L115.6 151" />
      <circle className="oback__orbit" cx="141" cy="160" r="3" />
    </svg>
  )
}
