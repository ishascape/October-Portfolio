import { CONTOURS, LAND, PLACES, PX_PER_KM, SUBURBS, SUBURB_LABELS, VIEW, ZETLAND } from './keyplanData'

// Key plan for the footer title sheet: inner Sydney drawn from real suburb boundaries and
// terrain (see keyplanData.ts), with a north point, grid references, a scale bar and one
// blue pin on Zetland. Decorative; the location is also given as text beside it.

const { w: fullW, h: fullH } = VIEW

// The drawing is cropped to a window centred on Zetland, so the map reads closer in.
const ZOOM = 1.25
const w = fullW / ZOOM
const h = w / 1.5
const vx = Math.min(Math.max(ZETLAND.x - w / 2, 0), fullW - w)
const vy = Math.min(Math.max(ZETLAND.y - h / 2, 0), fullH - h)
const cols = ['A', 'B', 'C', 'D']
const rows = ['1', '2', '3']

export function KeyPlan() {
  return (
    <svg
      className="keyplan"
      viewBox={`${vx} ${vy} ${w} ${h}`}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-labelledby="keyplan-title"
    >
      <title id="keyplan-title">Key plan of inner and eastern Sydney with a pin on Zetland</title>
      <defs>
        <pattern id="keyplan-water" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" className="keyplan__hatch" />
        </pattern>
        <clipPath id="keyplan-frame">
          <rect x={vx} y={vy} width={w} height={h} />
        </clipPath>
      </defs>

      <g clipPath="url(#keyplan-frame)">
        <rect x={vx} y={vy} width={w} height={h} fill="url(#keyplan-water)" />
        <path d={LAND} className="keyplan__land" fillRule="evenodd" />
        {CONTOURS.map(([level, d]) => (
          <path key={level} d={d} className={`keyplan__contour${level % 40 === 0 ? ' keyplan__contour--index' : ''}`} />
        ))}
        <path d={SUBURBS} className="keyplan__suburbs" />
        <path d={LAND} className="keyplan__coast" fillRule="evenodd" />
        {cols.slice(1).map((_, i) => (
          <line
            key={i}
            x1={vx + ((i + 1) * w) / 4}
            y1={vy}
            x2={vx + ((i + 1) * w) / 4}
            y2={vy + h}
            className="keyplan__grid"
          />
        ))}
        {rows.slice(1).map((_, i) => (
          <line
            key={i}
            x1={vx}
            y1={vy + ((i + 1) * h) / 3}
            x2={vx + w}
            y2={vy + ((i + 1) * h) / 3}
            className="keyplan__grid"
          />
        ))}
      </g>

      {cols.map((l, i) => (
        <text key={l} x={vx + ((i + 0.5) * w) / 4} y={vy + 12} className="keyplan__ref">
          {l}
        </text>
      ))}
      {rows.map((n, i) => (
        <text key={n} x={vx + 6} y={vy + ((i + 0.5) * h) / 3} className="keyplan__ref">
          {n}
        </text>
      ))}

      {SUBURB_LABELS.filter(([name]) => !['Sydney', 'Waterloo'].includes(name)).map(([name, x, y]) => (
        <text key={name} x={x} y={y} className="keyplan__suburb">
          {name}
        </text>
      ))}
      {[
        ['harbour', 'PORT JACKSON', 0],
        ['cbd', 'CBD', 0],
        ['sea', 'TASMAN SEA', -90],
      ].map(([key, label, angle]) => {
        const at = PLACES[key as string]
        if (!at) return null
        return (
          <text
            key={key}
            x={at[0]}
            y={at[1]}
            className="keyplan__label"
            transform={angle ? `rotate(${angle} ${at[0]} ${at[1]})` : undefined}
          >
            {label}
          </text>
        )
      })}

      {/* North point */}
      <g transform={`translate(${vx + 30} ${vy + h - 98})`} className="keyplan__north">
        <circle r="18" />
        <path d="M0 -24 L7 8 L0 3 L-7 8 Z" />
        <path d="M0 -24 L0 3 L-7 8 Z" className="keyplan__north-fill" />
        <text x="0" y="-29">
          N
        </text>
      </g>

      {/* Scale bar, 0 to 2 km */}
      <g transform={`translate(${vx + 16} ${vy + h - 48})`} className="keyplan__scale">
        <rect x="0" y="-3" width={PX_PER_KM} height="6" className="keyplan__scale-fill" />
        <rect x="0" y="-3" width={PX_PER_KM * 2} height="6" />
        <text x="0" y="16">
          0
        </text>
        <text x={PX_PER_KM} y="16">
          1
        </text>
        <text x={PX_PER_KM * 2} y="16">
          2 km
        </text>
      </g>

      {/* Zetland pin, the one blue mark */}
      <g transform={`translate(${ZETLAND.x} ${ZETLAND.y})`}>
        <path d="M0 0 C-8 -11 -9 -14 -9 -18 A9 9 0 1 1 9 -18 C9 -14 8 -11 0 0 Z" className="keyplan__pin" />
        <circle cx="0" cy="-18" r="3" className="keyplan__pin-dot" />
        <path d="M11 -18 H40" className="keyplan__leader" />
        <text x="44" y="-14" className="keyplan__label keyplan__label--pin">
          ZETLAND
        </text>
      </g>
    </svg>
  )
}
