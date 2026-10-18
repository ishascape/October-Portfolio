import { sketchRectPath } from './Sketch'
import './MvpScopeFlow.css'
import './HostDayFlow.css'

// A day in the life of a venue host, drawn in the same graph-paper pencil style as the scope flow:
// five moments in a row, with the HeadBox check squeezed in between running the venue and calls.

const stages = [
  {
    title: 'Running the venue',
    text: 'Preparing the space, coordinating staff and getting ready for events.',
    note: 'On-site operations',
  },
  {
    title: 'Managing clients',
    text: 'Welcoming guests, showing the venue and discussing event details.',
    note: 'Client relationships',
  },
  {
    title: 'Calls and enquiries',
    text: 'Answering phone calls and managing multiple enquiries at once.',
  },
  {
    title: 'Quick HeadBox check',
    text: 'Checking for new event leads, but with doubts.',
    note: 'Is this a genuine enquiry? Are we even available? Will this turn into a booking?',
  },
  {
    title: 'Empty slots to confirmed bookings',
    text: 'Filling available dates and turning enquiries into bookings.',
    note: 'Filling empty slots, more revenue',
  },
]

const goal = 'Fill the venue with bookings, without spending all day on a platform.'

const alt =
  'A day in the life of a venue host, in five moments: running the venue, managing clients, calls and enquiries, a quick HeadBox check where a new enquiry prompts doubts about whether it is genuine, available and will turn into a booking, and filling empty slots with confirmed bookings. Running a venue comes first; finding new bookings happens in between. The aim is to fill the venue with bookings without spending all day on a platform.'

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

function Head({ x, y, angle }: { x: number; y: number; angle: number }) {
  return <path d="M-9 -5 L0 0 L-9 5" transform={`translate(${x} ${y}) rotate(${angle})`} className="scope__head" />
}

type Lines = { x: number; y: number; lines: string[]; cls: string; step: number; anchor?: 'start' | 'middle' }

function Text({ x, y, lines, cls, step, anchor = 'start' }: Lines) {
  return (
    <text x={x} y={y} className={cls} textAnchor={anchor}>
      {lines.map((l, i) => (
        <tspan key={l} x={x} dy={i === 0 ? 0 : step}>
          {l}
        </tspan>
      ))}
    </text>
  )
}

function layout(orient: 'wide' | 'tall') {
  const wide = orient === 'wide'
  const W = wide ? 1044 : 340
  const colW = wide ? 172 : 292
  const gap = wide ? 34 : 36
  const x0 = 24
  const boxes: { x: number; y: number; w: number; h: number; n: number }[] = []
  const titles: Lines[] = []
  const texts: Lines[] = []
  const notes: Lines[] = []
  const arrows: { d: string; head: [number, number, number] }[] = []
  let y = 30
  let bottom = 0
  stages.forEach((s, i) => {
    const x = wide ? x0 + i * (colW + gap) : x0
    const top = wide ? 30 : y
    const tl = wrap(s.title, wide ? 18 : 34)
    const h = wide ? 64 : 22 + tl.length * 20
    boxes.push({ x, y: top, w: colW, h, n: i + 1 })
    titles.push({
      x: x + colW / 2,
      y: top + h / 2 - ((tl.length - 1) * 19) / 2 + 5,
      lines: tl,
      cls: 'scope__text day__title',
      step: 19,
      anchor: 'middle',
    })
    const dl = wrap(s.text, wide ? 22 : 42)
    const ty = top + h + 28
    texts.push({ x: x + 4, y: ty, lines: dl, cls: 'scope__text scope__text--light', step: 19 })
    let end = ty + (dl.length - 1) * 19
    if (s.note) {
      const nl = wrap(s.note, wide ? 17 : 34)
      const ny = end + 34
      notes.push({ x: x + 4, y: ny, lines: nl, cls: 'day__note', step: 23 })
      end = ny + (nl.length - 1) * 23
    }
    if (wide) {
      bottom = Math.max(bottom, end)
      if (i < stages.length - 1) {
        arrows.push({
          d: `M${x + colW + 6} ${top + h / 2} H${x + colW + gap - 10}`,
          head: [x + colW + gap - 8, top + h / 2, 0],
        })
      }
    } else if (i < stages.length - 1) {
      const next = end + 22
      arrows.push({
        d: `M${x + colW / 2} ${next - 6 + 0} V${next + gap - 14}`,
        head: [x + colW / 2, next + gap - 12, 90],
      })
      y = next + gap
    } else {
      bottom = end
    }
  })
  const gy = bottom + (wide ? 44 : 40)
  const gw = wide ? 640 : 292
  const gl = wrap(goal, wide ? 80 : 34)
  const gh = wide ? 48 : 20 + gl.length * 20
  const gx = wide ? (W - gw) / 2 : x0
  const H = gy + gh + 24
  return { W, H, boxes, titles, texts, notes, arrows, goalBox: { x: gx, y: gy, w: gw, h: gh }, gl, wide }
}

function Diagram({ orient }: { orient: 'wide' | 'tall' }) {
  const { W, H, boxes, titles, texts, notes, arrows, goalBox, gl } = layout(orient)
  return (
    <svg className={`scope__svg scope__svg--${orient}`} viewBox={`0 0 ${W} ${H}`} aria-hidden="true" focusable="false">
      <g className="scope__lines">
        {arrows.map((a, i) => (
          <path key={i} d={a.d} className="scope__edge" />
        ))}
        {boxes.map((b) => (
          <path key={b.n} d={sketchRectPath(b.x, b.y, b.w, b.h)} className="scope__box" />
        ))}
        <path d={sketchRectPath(goalBox.x, goalBox.y, goalBox.w, goalBox.h)} className="scope__box day__goal-box" />
      </g>
      {arrows.map((a, i) => (
        <Head key={i} x={a.head[0]} y={a.head[1]} angle={a.head[2]} />
      ))}
      {boxes.map((b) => (
        <g key={b.n}>
          <circle cx={b.x} cy={b.y} r="12" className="day__badge" />
          <text x={b.x} y={b.y} textAnchor="middle" dominantBaseline="central" className="day__num">
            {b.n}
          </text>
        </g>
      ))}
      {titles.map((t) => (
        <Text key={t.lines[0]} {...t} />
      ))}
      {texts.map((t) => (
        <Text key={t.lines[0]} {...t} />
      ))}
      {notes.map((t) => (
        <Text key={t.lines[0]} {...t} />
      ))}
      <Text
        x={goalBox.x + goalBox.w / 2}
        y={goalBox.y + goalBox.h / 2 - ((gl.length - 1) * 19) / 2 + 5}
        lines={gl}
        cls="scope__text day__title"
        step={19}
        anchor="middle"
      />
    </svg>
  )
}

export function HostDayFlow({ caption }: { caption: string }) {
  return (
    <figure className="scope" role="img" aria-label={alt}>
      <div className="scope__paper">
        <Diagram orient="wide" />
        <Diagram orient="tall" />
      </div>
      <figcaption className="annotation day__caption">{caption}</figcaption>
    </figure>
  )
}
