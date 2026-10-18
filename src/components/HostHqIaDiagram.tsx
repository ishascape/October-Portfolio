import { sketchRectPath } from './Sketch'
import './TreeAssistFlow.css'
import './HostHqIaDiagram.css'

// HostHQ One Platform: the information architecture, with the first release (the MVP) drawn round the
// Demand workflow. It is an architecture drawing, not a journey map: the arrows between Leads, Requests,
// Proposals and Bookings show how the work progresses, not a mandatory path (Leads is one way in).
// Everything below is data: edit the modules, the stages, the scope or the notes and the drawing follows.

const modules = [
  { id: 'demand', label: ['Demand'], key: true },
  { id: 'reports', label: ['Reports'] },
  { id: 'presentation', label: ['Presentation', '(3D)'] },
  { id: 'content', label: ['Content'] },
  { id: 'tools', label: ['Tools'] },
  { id: 'sales', label: ['Sales', 'Channels'] },
  { id: 'resources', label: ['Resources'] },
  { id: 'venues', label: ['Your Venues'] },
  { id: 'account', label: ['My Account'] },
]

const stages = [
  { id: 'leads', title: 'Leads', children: ['Lead Feed', 'Business Board'] },
  { id: 'requests', title: 'Requests', children: ['Business Invitations', 'Direct Enquiries', 'Rejected Requests'] },
  { id: 'proposals', title: 'Proposals', children: ['Sent Proposals', 'Accepted Proposals', 'Rejected / Lost'] },
  { id: 'bookings', title: 'Bookings', children: ['Confirmed', 'Cancelled', 'Add Your Own', 'Booking Calendar'] },
]

// Which stages sit inside the MVP boundary. All four in this release.
const scope = { label: 'MVP SCOPE', stages: ['leads', 'requests', 'proposals', 'bookings'] }

const notes = {
  modular: ['Modular architecture designed', 'to scale beyond the MVP.'],
  commercial: ['Core commercial', 'activities brought', 'together.'],
  focus: ['Focused first release', 'on the core demand workflow.'],
}

type Pt = [number, number]
type Tone = 'tree' | 'flow' | 'link' | 'note'
type Box = {
  id: string
  x: number
  y: number
  w: number
  h: number
  lines: string[]
  kind: 'parent' | 'module' | 'key' | 'stage' | 'child'
  group?: string // the module or stage this box belongs to, for hover
}
type Edge = { d: string; tone: Tone; head?: Pt; angle?: number; group?: string }
type Note = { x: number; y: number; lines: string[]; key?: boolean }
type Layout = {
  w: number
  h: number
  boxes: Box[]
  edges: Edge[]
  notes: Note[]
  boundary: { x: number; y: number; w: number; h: number }
  scopeLabel: Pt
  modulesGroup?: { x: number; y: number; w: number; h: number }
}

// ---------- Landscape ----------
function wide(): Layout {
  const W = 1060
  const boxes: Box[] = []
  const edges: Edge[] = []

  boxes.push({ id: 'host', x: 410, y: 20, w: 240, h: 46, lines: ['One Platform Host'], kind: 'parent' })
  edges.push({ d: 'M530 66 V108', tone: 'tree' })
  edges.push({ d: `M${72} 108 H${72 + 114 * 8}`, tone: 'tree' })
  modules.forEach((m, i) => {
    const cx = 72 + 114 * i
    boxes.push({
      id: m.id,
      x: cx - 53,
      y: 150,
      w: 106,
      h: 44,
      lines: m.label,
      kind: m.key ? 'key' : 'module',
      group: m.id,
    })
    edges.push({ d: `M${cx} 108 V148`, tone: 'tree', head: [cx, 148], angle: 90, group: m.id })
  })

  // stages
  const sx = (i: number) => 52 + 210 * i
  const SW = 170
  const SY = 300
  const SH = 48
  const CH = 38
  const CP = 50
  const childTop = (k: number) => SY + SH + 22 + k * CP
  let bottom = 0
  stages.forEach((s, i) => {
    const x = sx(i)
    boxes.push({ id: s.id, x, y: SY, w: SW, h: SH, lines: [s.title], kind: 'stage', group: s.id })
    const last = childTop(s.children.length - 1) + CH / 2
    edges.push({ d: `M${x + 16} ${SY + SH} V${last}`, tone: 'tree', group: s.id })
    s.children.forEach((c, k) => {
      const top = childTop(k)
      boxes.push({ id: `${s.id}-${k}`, x: x + 26, y: top, w: 144, h: CH, lines: [c], kind: 'child', group: s.id })
      edges.push({ d: `M${x + 16} ${top + CH / 2} H${x + 26}`, tone: 'tree', group: s.id })
      bottom = Math.max(bottom, top + CH)
    })
    if (i < stages.length - 1) {
      const y = SY + SH / 2
      edges.push({
        d: `M${x + SW + 4} ${y} H${sx(i + 1) - 6}`,
        tone: 'flow',
        head: [sx(i + 1) - 4, y],
        angle: 0,
        group: s.id,
      })
    }
  })

  const inScope = stages.map((s, i) => ({ s, i })).filter(({ s }) => scope.stages.includes(s.id))
  const first = inScope[0].i
  const lastI = inScope[inScope.length - 1].i
  const boundary = {
    x: sx(first) - 28,
    y: SY - 48,
    w: sx(lastI) + SW + 28 - (sx(first) - 28),
    h: bottom + 28 - (SY - 48),
  }
  // Demand leads down into the boundary.
  edges.push({
    d: `M72 196 V${boundary.y - 4}`,
    tone: 'link',
    head: [72, boundary.y],
    angle: 90,
    group: 'demand',
  })

  const right = boundary.x + boundary.w
  return {
    w: W,
    h: boundary.y + boundary.h + 86,
    boxes,
    edges: [
      ...edges,
      // note leaders
      { d: 'M846 84 C866 90 872 98 872 104', tone: 'note', head: [872, 106], angle: 90 },
      {
        d: `M${right + 16} ${SY + 96} C${right + 8} ${SY + 96} ${right + 4} ${SY + 80} ${right + 2} ${SY + 66}`,
        tone: 'note',
        head: [right + 2, SY + 64],
        angle: -90,
      },
      {
        d: `M200 ${boundary.y + boundary.h + 36} C186 ${boundary.y + boundary.h + 22} 190 ${boundary.y + boundary.h + 12} 202 ${boundary.y + boundary.h + 4}`,
        tone: 'note',
        head: [203, boundary.y + boundary.h + 2],
        angle: -80,
      },
    ],
    notes: [
      { x: 700, y: 36, lines: notes.modular },
      { x: right + 20, y: SY + 106, lines: notes.commercial },
      { x: 52, y: boundary.y + boundary.h + 40, lines: notes.focus, key: true },
    ],
    boundary,
    scopeLabel: [boundary.x + 20, boundary.y + 32],
  }
}

// ---------- Portrait ----------
function tall(): Layout {
  const W = 360
  const boxes: Box[] = []
  const edges: Edge[] = []

  boxes.push({ id: 'host', x: 80, y: 12, w: 200, h: 42, lines: ['One Platform Host'], kind: 'parent' })
  const gy = 80
  const modulesGroup = { x: 22, y: gy, w: 332, h: 144 }
  edges.push({ d: `M180 54 V${gy - 4}`, tone: 'tree', head: [180, gy - 2], angle: 90 })
  modules.forEach((m, i) => {
    const col = i % 3
    const row = Math.floor(i / 3)
    boxes.push({
      id: m.id,
      x: 30 + 108 * col,
      y: gy + 12 + 44 * row,
      w: 100,
      h: 36,
      lines: m.label,
      kind: m.key ? 'key' : 'module',
      group: m.id,
    })
  })

  const bTop = 296
  const px = 46
  const PW = 200
  const PH = 40
  const CH = 34
  const CP = 42
  let y = bTop + 46
  const lastBottoms: number[] = []
  const tops: number[] = []
  stages.forEach((s, i) => {
    tops.push(y)
    boxes.push({ id: s.id, x: px, y, w: PW, h: PH, lines: [s.title], kind: 'stage', group: s.id })
    const ctop = (k: number) => y + PH + 14 + k * CP
    const lastC = ctop(s.children.length - 1) + CH / 2
    edges.push({ d: `M${px + 14} ${y + PH} V${lastC}`, tone: 'tree', group: s.id })
    s.children.forEach((c, k) => {
      boxes.push({ id: `${s.id}-${k}`, x: px + 28, y: ctop(k), w: 190, h: CH, lines: [c], kind: 'child', group: s.id })
      edges.push({ d: `M${px + 14} ${ctop(k) + CH / 2} H${px + 28}`, tone: 'tree', group: s.id })
    })
    const bottom = ctop(s.children.length - 1) + CH
    lastBottoms.push(bottom)
    y = bottom + 34
    void i
  })
  stages.forEach((s, i) => {
    if (i === stages.length - 1) return
    edges.push({
      d: `M${px + PW / 2} ${lastBottoms[i] + 5} V${tops[i + 1] - 7}`,
      tone: 'flow',
      head: [px + PW / 2, tops[i + 1] - 5],
      angle: 90,
      group: s.id,
    })
  })
  const bBottom = lastBottoms[lastBottoms.length - 1] + 28
  const boundary = { x: 22, y: bTop, w: 332, h: bBottom - bTop }
  const demand = boxes.find((b) => b.id === 'demand')!
  edges.push({
    d: `M${demand.x} ${demand.y + demand.h / 2} H10 V${bTop + 28} H${boundary.x - 2}`,
    tone: 'link',
    head: [boundary.x, bTop + 28],
    angle: 0,
    group: 'demand',
  })

  return {
    w: W,
    h: bBottom + 112,
    boxes,
    edges,
    notes: [
      { x: 24, y: gy + modulesGroup.h + 26, lines: notes.modular },
      {
        x: 24,
        y: bBottom + 34,
        lines: notes.commercial
          .join(' ')
          .match(/.{1,28}(\s|$)/g)!
          .map((l) => l.trim()),
      },
      { x: 24, y: bBottom + 84, lines: notes.focus, key: true },
    ],
    boundary,
    scopeLabel: [boundary.x + 20, boundary.y + 30],
    modulesGroup,
  }
}

const description = [
  'One Platform Host is made up of nine modules: Demand, Reports, Presentation (3D), Content, Tools, Sales Channels, Resources, Your Venues and My Account.',
  'The first release focused on Demand, which brings together four sections: Leads, Requests, Proposals and Bookings.',
  'Leads holds the Lead Feed and Business Board. Requests holds Business Invitations, Direct Enquiries and Rejected Requests.',
  'Proposals holds Sent Proposals, Accepted Proposals and Rejected or Lost. Bookings holds Confirmed, Cancelled, Add Your Own and the Booking Calendar.',
  'Leads is a supporting way in. Not every request starts there.',
]

const layouts = { wide: wide(), tall: tall() }

function Head({ at: [x, y], angle, tone, hot }: { at: Pt; angle: number; tone: Tone; hot: boolean }) {
  return (
    <path
      d="M-8 -4.5 L0 0 L-8 4.5"
      transform={`translate(${x} ${y}) rotate(${angle})`}
      className={`ia__head ia__head--${tone}`}
      data-hot={hot}
    />
  )
}

function Drawing({
  orient,
  layout,
  hot,
  setHot,
}: {
  orient: 'wide' | 'tall'
  layout: Layout
  hot: string | null
  setHot: (id: string | null) => void
}) {
  const { w, h, boxes, edges, notes: nts, boundary, scopeLabel, modulesGroup } = layout
  return (
    <svg className={`ia__svg ia__svg--${orient}`} viewBox={`0 0 ${w} ${h}`} aria-hidden="true" focusable="false">
      <g className="ia__scope">
        <rect x={boundary.x} y={boundary.y} width={boundary.w} height={boundary.h} rx={14} />
        <text x={scopeLabel[0]} y={scopeLabel[1]} className="ia__scope-label">
          {scope.label}
        </text>
      </g>
      {modulesGroup && (
        <rect
          className="ia__group"
          x={modulesGroup.x}
          y={modulesGroup.y}
          width={modulesGroup.w}
          height={modulesGroup.h}
          rx={10}
        />
      )}
      <g className="ia__lines">
        {edges
          .filter((e) => e.tone !== 'note')
          .map((e, i) => (
            <path
              key={i}
              d={e.d}
              pathLength={1}
              className={`ia__edge ia__edge--${e.tone}`}
              data-hot={e.tone === 'flow' && e.group === hot}
              style={{ ['--i' as string]: i }}
            />
          ))}
        {boxes.map((b) => (
          <path
            key={b.id}
            d={sketchRectPath(b.x, b.y, b.w, b.h, b.kind === 'module' || b.kind === 'child' ? 3 : 4)}
            className={`ia__box ia__box--${b.kind}`}
            data-hot={b.group === hot && (b.kind === 'stage' || b.kind === 'module')}
          />
        ))}
      </g>
      {edges
        .filter((e) => e.head && e.tone !== 'note')
        .map((e, i) => (
          <Head key={i} at={e.head!} angle={e.angle ?? 0} tone={e.tone} hot={e.tone === 'flow' && e.group === hot} />
        ))}
      {boxes.map((b, i) => (
        <g
          key={b.id}
          className="ia__node"
          style={{ ['--i' as string]: i }}
          onPointerEnter={b.group ? () => setHot(b.group!) : undefined}
          onPointerLeave={b.group ? () => setHot(null) : undefined}
        >
          <rect
            x={b.x}
            y={b.y}
            width={b.w}
            height={b.h}
            className={`ia__fill ia__fill--${b.kind}`}
            data-hot={b.group === hot && (b.kind === 'stage' || b.kind === 'module')}
          />
          <text
            x={b.x + b.w / 2}
            y={b.y + b.h / 2 - (b.lines.length - 1) * 8 + 5}
            textAnchor="middle"
            className={`ia__text ia__text--${b.kind}`}
          >
            {b.lines.map((l, k) => (
              <tspan key={l} x={b.x + b.w / 2} dy={k === 0 ? 0 : 16}>
                {l}
              </tspan>
            ))}
          </text>
        </g>
      ))}
      <g className="ia__notes">
        {edges
          .filter((e) => e.tone === 'note')
          .map((e, i) => (
            <g key={i}>
              <path d={e.d} className="ia__edge--note" />
              {e.head && <Head at={e.head} angle={e.angle ?? 0} tone="note" hot={false} />}
            </g>
          ))}
        {nts.map((n) => (
          <text key={n.lines.join()} x={n.x} y={n.y} className={`ia__note${n.key ? ' ia__note--key' : ''}`}>
            {n.lines.map((l, k) => (
              <tspan key={l} x={n.x} dy={k === 0 ? 0 : 20}>
                {l}
              </tspan>
            ))}
          </text>
        ))}
      </g>
    </svg>
  )
}

export function HostHqIaDiagram() {
  // A still drawing: no entrance animation and no hover effects.
  const hot = null
  const setHot = () => {}

  return (
    <figure className="flow ia">
      <div className="flow__bar">
        <p className="flow__story">
          <strong>MVP scope.</strong> The first connected workflow.
        </p>
      </div>
      <div className="flow__paper ia__paper">
        <Drawing orient="wide" layout={layouts.wide} hot={hot} setHot={setHot} />
        <Drawing orient="tall" layout={layouts.tall} hot={hot} setHot={setHot} />
      </div>
      <ul className="visually-hidden">
        {description.map((d) => (
          <li key={d}>{d}</li>
        ))}
      </ul>
      <figcaption className="ia__caption">
        Leads is one way in, not a required first step. Requests can also arrive directly.
      </figcaption>
    </figure>
  )
}
