import { sketchRectPath } from './Sketch'
import './MvpScopeFlow.css'
import './HostDayFlow.css'
import './VenueGapsFlow.css'

// What happens when a location has too little inventory, drawn in the scope flow's graph-paper pencil style.

const alt =
  'Decision tree for the self-service Venue Finder. A guest enters their event location. If the location has 200 or more venues, they get the normal Venue Finder recommendations. If not, a budget field is revealed. If the budget is over 50 thousand pounds, a human concierge handles the enquiry. If it is 50 thousand pounds or less, the guest sees an unavailable-location page that says "Sorry, we\'re not currently available in your area", with links to cities where HeadBox is available and event-planning guides.'

function wrap(text: string, max: number) {
  const lines: string[] = []
  let line = ''
  for (const word of text.split(' ')) {
    if (line && (line + ' ' + word).length > max) {
      lines.push(line)
      line = word
    } else {
      line = line ? line + ' ' + word : word
    }
  }
  if (line) lines.push(line)
  return lines
}

type Kind = 'box' | 'ask' | 'ok' | 'gap'
type Node = { id: string; kind: Kind; x: number; y: number; w: number; h: number; lines: string[]; sub?: string[] }
type Edge = { d: string; head: [number, number, number] }
type Note = { x: number; y: number; text: string; anchor?: 'start' | 'middle' }

function diamond(cx: number, cy: number, w: number, h: number) {
  return `M${cx - w / 2} ${cy} L${cx} ${cy - h / 2} L${cx + w / 2} ${cy} L${cx} ${cy + h / 2} Z`
}

function Head({ x, y, angle }: { x: number; y: number; angle: number }) {
  return <path d="M-9 -5 L0 0 L-9 5" transform={`translate(${x} ${y}) rotate(${angle})`} className="scope__head" />
}

const gapSub = [
  '“Sorry, we’re not currently available in your area.”',
  'Links to cities we cover and event-planning guides.',
]

function layout(orient: 'wide' | 'tall') {
  const wide = orient === 'wide'
  if (wide) {
    const nodes: Node[] = [
      { id: 'start', kind: 'box', x: 24, y: 40, w: 200, h: 64, lines: ['Guest enters', 'event location'] },
      { id: 'q1', kind: 'ask', x: 410, y: 72, w: 240, h: 104, lines: ['Does it have', '200+ venues?'] },
      { id: 'ok1', kind: 'ok', x: 640, y: 40, w: 300, h: 64, lines: ['Normal Venue Finder', 'recommendations'] },
      { id: 'budget', kind: 'box', x: 300, y: 190, w: 220, h: 56, lines: ['Reveal a budget field'] },
      { id: 'q2', kind: 'ask', x: 410, y: 330, w: 240, h: 96, lines: ['Budget over', '£50k?'] },
      { id: 'ok2', kind: 'ok', x: 640, y: 298, w: 300, h: 64, lines: ['Human concierge', 'handles the enquiry'] },
      {
        id: 'gap',
        kind: 'gap',
        x: 250,
        y: 424,
        w: 320,
        h: 128,
        lines: ['Unavailable-location page'],
        sub: gapSub.flatMap((s) => wrap(s, 38)),
      },
    ]
    const edges: Edge[] = [
      { d: 'M232 72 H282', head: [290, 72, 0] },
      { d: 'M536 72 H620', head: [630, 72, 0] },
      { d: 'M410 130 V180', head: [410, 188, 90] },
      { d: 'M410 248 V272', head: [410, 280, 90] },
      { d: 'M536 330 H620', head: [630, 330, 0] },
      { d: 'M410 386 V414', head: [410, 422, 90] },
    ]
    const notes: Note[] = [
      { x: 578, y: 58, text: 'Yes', anchor: 'middle' },
      { x: 426, y: 164, text: 'No' },
      { x: 578, y: 316, text: 'Yes', anchor: 'middle' },
      { x: 426, y: 410, text: '£50k or less' },
    ]
    return { W: 1044, H: 580, nodes, edges, notes, max: 26 }
  }
  const nodes: Node[] = [
    { id: 'start', kind: 'box', x: 16, y: 24, w: 168, h: 56, lines: ['Guest enters', 'event location'] },
    { id: 'q1', kind: 'ask', x: 100, y: 168, w: 176, h: 96, lines: ['Does it have', '200+ venues?'] },
    { id: 'ok1', kind: 'ok', x: 222, y: 136, w: 112, h: 64, lines: ['Normal Venue', 'Finder'] },
    { id: 'budget', kind: 'box', x: 16, y: 262, w: 168, h: 48, lines: ['Reveal a budget field'] },
    { id: 'q2', kind: 'ask', x: 100, y: 384, w: 176, h: 88, lines: ['Budget over', '£50k?'] },
    { id: 'ok2', kind: 'ok', x: 222, y: 352, w: 112, h: 64, lines: ['Human', 'concierge'] },
    {
      id: 'gap',
      kind: 'gap',
      x: 16,
      y: 476,
      w: 308,
      h: 132,
      lines: ['Unavailable-location page'],
      sub: gapSub.flatMap((s) => wrap(s, 38)),
    },
  ]
  const edges: Edge[] = [
    { d: 'M100 86 V112', head: [100, 120, 90] },
    { d: 'M190 168 H206', head: [214, 168, 0] },
    { d: 'M100 216 V252', head: [100, 260, 90] },
    { d: 'M100 312 V332', head: [100, 340, 90] },
    { d: 'M190 384 H206', head: [214, 384, 0] },
    { d: 'M100 430 V466', head: [100, 474, 90] },
  ]
  const notes: Note[] = [
    { x: 198, y: 154, text: 'Yes', anchor: 'middle' },
    { x: 114, y: 240, text: 'No' },
    { x: 198, y: 370, text: 'Yes', anchor: 'middle' },
    { x: 114, y: 458, text: '£50k or less' },
  ]
  return { W: 340, H: 632, nodes, edges, notes, max: 15 }
}

function Diagram({ orient }: { orient: 'wide' | 'tall' }) {
  const { W, H, nodes, edges, notes } = layout(orient)
  const wide = orient === 'wide'
  return (
    <svg className={`scope__svg scope__svg--${orient}`} viewBox={`0 0 ${W} ${H}`} aria-hidden="true" focusable="false">
      <g className="scope__lines">
        {edges.map((e, i) => (
          <path key={i} d={e.d} className="scope__edge" />
        ))}
        {nodes.map((n) =>
          n.kind === 'ask' ? (
            <path key={n.id} d={diamond(n.x + (wide ? 0 : 0), n.y, n.w, n.h)} className="scope__box vfg__ask" />
          ) : (
            <path
              key={n.id}
              d={sketchRectPath(n.x, n.y, n.w, n.h)}
              className={`scope__box${n.kind === 'ok' ? ' vfg__ok' : ''}${n.kind === 'gap' ? ' vfg__gap' : ''}`}
            />
          ),
        )}
      </g>
      {edges.map((e, i) => (
        <Head key={i} x={e.head[0]} y={e.head[1]} angle={e.head[2]} />
      ))}
      {nodes.map((n) => {
        const cx = n.kind === 'ask' ? n.x : n.x + n.w / 2
        const cy = n.kind === 'ask' ? n.y : n.y + n.h / 2
        if (n.kind === 'gap') {
          const sub = n.sub ?? []
          const top = n.y + 30
          return (
            <text key={n.id} textAnchor="start" className="scope__text day__title" x={n.x + 14} y={top}>
              <tspan x={n.x + 14} className="vfg__bold">
                {n.lines[0]}
              </tspan>
              {sub.map((l, i) => (
                <tspan key={l} x={n.x + 14} dy={i === 0 ? 26 : 19} className="scope__text--light vfg__sub">
                  {l}
                </tspan>
              ))}
            </text>
          )
        }
        const total = n.lines.length
        return (
          <text key={n.id} textAnchor="middle" className="scope__text day__title">
            {n.lines.map((l, i) => (
              <tspan key={l} x={cx} y={cy + 5 - ((total - 1) * 19) / 2 + i * 19}>
                {l}
              </tspan>
            ))}
          </text>
        )
      })}
      {notes.map((n) => (
        <text key={n.text + n.y} x={n.x} y={n.y} className="day__note" textAnchor={n.anchor ?? 'start'}>
          {n.text}
        </text>
      ))}
    </svg>
  )
}

export function VenueGapsFlow() {
  return (
    <figure className="scope vfg" role="img" aria-label={alt}>
      <div className="scope__paper">
        <Diagram orient="wide" />
        <Diagram orient="tall" />
      </div>
    </figure>
  )
}
