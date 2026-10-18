import { sketchRectPath } from './Sketch'
import './MvpScopeFlow.css'

// The HostHQ MVP scope, drawn in the same graph-paper pencil style as the TreeAssist flow:
// one events workflow in four stages, each with the views it holds.

const stages = [
  { name: 'Leads', views: ['Unread', 'Declined'] },
  { name: 'Requests', views: ['All Requests', 'New Requests', 'Rejected requests'] },
  { name: 'Proposals', views: ['Sent proposals', 'Accepted', 'In Progress', 'Declined'] },
  { name: 'Bookings', views: ['Upcoming', 'Past', 'Cancelled'] },
]

const note = [
  'Unify all event types into one intuitive workflow, whether B2B, B2C,',
  'free or commissionable. Use distinct event card styling to differentiate',
  'them without fragmenting the experience.',
]

const alt =
  'The MVP scope: one events workflow in four stages. Leads (Unread, Declined) leads to Requests (All Requests, New Requests, Rejected requests), then Proposals (Sent proposals, Accepted, In Progress, Declined), then Bookings (Upcoming, Past, Cancelled). Unify all event types into one intuitive workflow, whether B2B, B2C, free or commissionable, using distinct event card styling to differentiate them without fragmenting the experience.'

function Head({ x, y, angle, light }: { x: number; y: number; angle: number; light?: boolean }) {
  return (
    <path
      d="M-9 -5 L0 0 L-9 5"
      transform={`translate(${x} ${y}) rotate(${angle})`}
      className={`scope__head${light ? ' scope__head--light' : ''}`}
    />
  )
}

type Box = { x: number; y: number; w: number; h: number }

// Parent boxes, their child boxes and every connector, for one orientation.
function layout(orient: 'wide' | 'tall') {
  const PW = 150
  const PH = 56
  const CW = 140
  const CH = 36
  const GAP = 54
  const parents: (Box & { name: string })[] = []
  const children: (Box & { label: string })[] = []
  const lines: { d: string; head: [number, number, number]; light?: boolean }[] = []
  let w: number
  let h: number
  if (orient === 'wide') {
    const step = 228
    stages.forEach((s, i) => {
      const x = 40 + i * step
      const y = 40
      parents.push({ x, y, w: PW, h: PH, name: s.name })
      s.views.forEach((v, j) => {
        const cy = y + PH + 40 + j * GAP
        children.push({ x: x + 44, y: cy, w: CW, h: CH, label: v })
        lines.push({
          d: `M${x + 18} ${j === 0 ? y + PH + 2 : cy - GAP + CH / 2} V${cy + CH / 2 - 8} Q${x + 18} ${cy + CH / 2} ${x + 26} ${cy + CH / 2} H${x + 38}`,
          head: [x + 40, cy + CH / 2, 0],
          light: true,
        })
      })
      if (i < stages.length - 1) {
        lines.push({
          d: `M${x + PW + 6} ${y + PH / 2} H${x + step - 10}`,
          head: [x + step - 8, y + PH / 2, 0],
        })
      }
    })
    w = 40 + 3 * step + 44 + CW + 40
    h = 40 + PH + 40 + 3 * GAP + CH + 30
  } else {
    let y = 30
    stages.forEach((s, i) => {
      const x = 24
      parents.push({ x, y, w: PW, h: PH, name: s.name })
      s.views.forEach((v, j) => {
        const cy = y + PH + 30 + j * 48
        children.push({ x: x + 44, y: cy, w: CW, h: CH, label: v })
        lines.push({
          d: `M${x + 18} ${j === 0 ? y + PH + 2 : cy - 48 + CH / 2} V${cy + CH / 2 - 8} Q${x + 18} ${cy + CH / 2} ${x + 26} ${cy + CH / 2} H${x + 38}`,
          head: [x + 40, cy + CH / 2, 0],
          light: true,
        })
      })
      const next = y + PH + 30 + s.views.length * 48 + 4
      if (i < stages.length - 1) {
        lines.push({
          d: `M${x + PW + 6} ${y + PH / 2} H${x + PW + 44} V${next + PH / 2} H${x + PW + 8}`,
          head: [x + PW + 6, next + PH / 2, 180],
        })
      }
      y = next
    })
    w = 24 + PW + 60
    h = y - 4 + PH * 0
    h = y + 10
  }
  return { parents, children, lines, w, h }
}

function Diagram({ orient }: { orient: 'wide' | 'tall' }) {
  const { parents, children, lines, w, h } = layout(orient)
  const wide = orient === 'wide'
  const H = wide ? h + 70 : h
  return (
    <svg className={`scope__svg scope__svg--${orient}`} viewBox={`0 0 ${w} ${H}`} aria-hidden="true" focusable="false">
      <g className="scope__lines">
        {lines.map((l, i) => (
          <path key={i} d={l.d} className={`scope__edge${l.light ? ' scope__edge--light' : ''}`} />
        ))}
        {parents.map((p) => (
          <path key={p.name} d={sketchRectPath(p.x, p.y, p.w, p.h)} className="scope__box" />
        ))}
        {children.map((c) => (
          <path
            key={c.label + c.y}
            d={sketchRectPath(c.x, c.y, c.w, c.h, 3)}
            className="scope__box scope__box--light"
          />
        ))}
      </g>
      {lines.map((l, i) => (
        <Head key={i} x={l.head[0]} y={l.head[1]} angle={l.head[2]} light={l.light} />
      ))}
      {parents.map((p) => (
        <g key={p.name}>
          <rect x={p.x} y={p.y} width={p.w} height={p.h} className="scope__fill" />
          <text
            x={p.x + p.w / 2}
            y={p.y + p.h / 2}
            textAnchor="middle"
            dominantBaseline="central"
            className="scope__text"
          >
            {p.name}
          </text>
        </g>
      ))}
      {children.map((c) => (
        <g key={c.label + c.y}>
          <rect x={c.x} y={c.y} width={c.w} height={c.h} className="scope__fill" />
          <text
            x={c.x + c.w / 2}
            y={c.y + c.h / 2}
            textAnchor="middle"
            dominantBaseline="central"
            className="scope__text scope__text--light"
          >
            {c.label}
          </text>
        </g>
      ))}
      {wide &&
        note.map((t, i) => (
          <text key={t} x={40} y={H - 56 + i * 24} className="scope__note">
            {t}
          </text>
        ))}
    </svg>
  )
}

export function MvpScopeFlow() {
  return (
    <figure className="scope" role="img" aria-label={alt}>
      <div className="scope__paper">
        <Diagram orient="wide" />
        <Diagram orient="tall" />
        <p className="scope__note scope__note--tall">{note.join(' ')}</p>
      </div>
    </figure>
  )
}
