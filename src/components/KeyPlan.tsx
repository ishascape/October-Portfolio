// Key plan for the footer title sheet: a schematic of Sydney (not to scale) with a north
// point, grid references and one blue pin on Zetland. Drawn by hand as SVG, so it is
// decorative; the location is also given as text in the title block.

// Water, as one outline: the coast north of the harbour, Port Jackson, the eastern
// beaches, Botany Bay and the coast south of Kurnell.
const WATER =
  'M480 0 L404 0 L398 20 L402 40 L392 58 L396 72 L390 86 L378 92 L366 90 L360 80 L352 60 L346 62 L350 84 L338 96 ' +
  'L322 92 L310 100 L296 96 L282 104 L262 104 L250 100 L236 106 L220 104 L200 110 L180 108 L160 114 L130 112 ' +
  'L100 118 L60 120 L0 122 L0 128 L60 127 L100 125 L130 121 L160 122 L180 118 L200 120 L222 116 L238 118 L240 128 ' +
  'L246 128 L248 118 L258 114 L262 118 L266 112 L276 114 L282 120 L288 112 L300 114 L312 124 L326 120 L340 112 ' +
  'L356 106 L366 104 L376 100 L382 108 L378 124 L386 140 L378 150 L384 160 L380 178 L386 192 L382 210 L388 226 ' +
  'L384 240 L378 252 L356 246 L330 240 L300 236 L286 232 L262 236 L240 232 L232 224 L226 232 L210 240 L200 252 ' +
  'L206 268 L230 276 L262 280 L300 276 L330 272 L356 268 L372 272 L380 290 L378 320 L480 320 Z'

const ZETLAND = { x: 268, y: 176 }

export function KeyPlan() {
  return (
    <svg className="keyplan" viewBox="0 0 480 320" role="img" aria-labelledby="keyplan-title">
      <title id="keyplan-title">Key plan: schematic map of Sydney with a pin on Zetland</title>
      <defs>
        <pattern id="keyplan-water" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" className="keyplan__hatch" />
        </pattern>
        <clipPath id="keyplan-frame">
          <rect x="0" y="0" width="480" height="320" />
        </clipPath>
      </defs>

      <g clipPath="url(#keyplan-frame)">
        {/* Grid references */}
        {[120, 240, 360].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="320" className="keyplan__grid" />
        ))}
        {[107, 213].map((y) => (
          <line key={y} x1="0" y1={y} x2="480" y2={y} className="keyplan__grid" />
        ))}

        <path d={WATER} fill="url(#keyplan-water)" className="keyplan__coast" />

        {/* Main roads */}
        <path d="M252 132 L180 140 L90 150 L0 158" className="keyplan__road" />
        <path d="M262 126 L266 176 L276 232" className="keyplan__road" />
        <path d="M276 128 L300 170 L330 238" className="keyplan__road" />
        <path d="M262 104 L262 84 L250 40 L240 0" className="keyplan__road" />
        <path d="M244 136 L220 190 L214 236" className="keyplan__road" />

        {/* City block hatch */}
        <rect x="248" y="118" width="18" height="14" className="keyplan__block" />
      </g>

      <rect x="0.5" y="0.5" width="479" height="319" className="keyplan__frame" />

      {/* Grid letters and numbers */}
      {['A', 'B', 'C', 'D'].map((l, i) => (
        <text key={l} x={60 + i * 120} y="12" className="keyplan__ref">
          {l}
        </text>
      ))}
      {['1', '2', '3'].map((n, i) => (
        <text key={n} x="6" y={58 + i * 107} className="keyplan__ref">
          {n}
        </text>
      ))}

      {/* Labels */}
      <text x="150" y="100" className="keyplan__label">PORT JACKSON</text>
      <text x="228" y="146" className="keyplan__label">CBD</text>
      <text x="262" y="262" className="keyplan__label">BOTANY BAY</text>
      <text x="440" y="200" className="keyplan__label" transform="rotate(-90 440 200)">
        TASMAN SEA
      </text>
      <text x="70" y="190" className="keyplan__label">INNER WEST</text>

      {/* North point */}
      <g transform="translate(52 62)" className="keyplan__north">
        <circle r="20" />
        <path d="M0 -26 L7 8 L0 3 L-7 8 Z" />
        <path d="M0 -26 L0 3 L-7 8 Z" className="keyplan__north-fill" />
        <text x="0" y="-31">N</text>
      </g>

      {/* Scale note */}
      <g transform="translate(24 290)" className="keyplan__scale">
        <path d="M0 0 H80 M0 -4 V4 M20 -3 V3 M40 -4 V4 M60 -3 V3 M80 -4 V4" />
        <text x="0" y="16">Schematic · NTS</text>
      </g>

      {/* Zetland pin, the one blue mark */}
      <g transform={`translate(${ZETLAND.x} ${ZETLAND.y})`}>
        <path d="M0 0 C-9 -12 -10 -16 -10 -20 A10 10 0 1 1 10 -20 C10 -16 9 -12 0 0 Z" className="keyplan__pin" />
        <circle cx="0" cy="-20" r="3.5" className="keyplan__pin-dot" />
        <path d="M12 -20 H54" className="keyplan__leader" />
        <text x="58" y="-16" className="keyplan__label keyplan__label--pin">
          ZETLAND
        </text>
      </g>
    </svg>
  )
}
