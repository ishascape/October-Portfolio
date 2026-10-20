import { sketchRectPath } from './Sketch'
import './MvpScopeFlow.css'
import './DecisionFork.css'

// One decision, drawn as a fork in the graph-paper pencil style: the problem, what we chose, what we
// gave up, and what shipped.

export type Fork = { problem: string; chose: string; gaveUp: string; shipped: string }

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

type Box = { x: number; y: number; w: number; h: number; label: string; lines: string[]; kind: 'plain' | 'chose' | 'gave' | 'shipped' }
type Arrow = { d: string; head: [number, number, number]; light?: boolean }

const LINE = 20

function layout(f: Fork, orient: 'wide' | 'tall') {
  const wide = orient === 'wide'
  const max = wide ? 22 : 34
  const mk = (label: string, text: string, kind: Box['kind']) => ({ label, lines: wrap(text, max), kind })
  const items = {
    problem: mk('The problem', f.problem, 'plain'),
    chose: mk('Chose', f.chose, 'chose'),
    gave: mk('Gave up', f.gaveUp, 'gave'),
    shipped: mk('Shipped', f.shipped, 'shipped'),
  }
  const height = (b: { lines: string[] }) => 34 + b.lines.length * LINE
  const boxes: Box[] = []
  const arrows: Arrow[] = []
  if (wide) {
    const W = 780
    const colW = 220
    const gapX = 60
    const x1 = 0
    const x2 = colW + gapX
    const x3 = (colW + gapX) * 2
    const hChose = height(items.chose)
    const hGave = height(items.gave)
    const rowGap = 24
    const topH = Math.max(hChose, height(items.shipped))
    const H = topH + rowGap + hGave
    const hProb = height(items.problem)
    const yProb = (H - hProb) / 2
    boxes.push({ x: x1, y: yProb, w: colW, h: hProb, ...items.problem })
    boxes.push({ x: x2, y: 0, w: colW, h: topH, ...items.chose })
    boxes.push({ x: x3, y: 0, w: colW, h: topH, ...items.shipped })
    boxes.push({ x: x2, y: topH + rowGap, w: colW, h: hGave, ...items.gave })
    const midChose = topH / 2
    const midGave = topH + rowGap + hGave / 2
    arrows.push({ d: `M${x1 + colW} ${yProb + hProb / 2 - 8} H${x2 - 14}`, head: [x2 - 12, yProb + hProb / 2 - 8, 0] })
    arrows.push({
      d: `M${x1 + colW + gapX / 2} ${yProb + hProb / 2} V${midGave} H${x2 - 14}`,
      head: [x2 - 12, midGave, 0],
      light: true,
    })
    arrows.push({ d: `M${x2 + colW} ${midChose} H${x3 - 14}`, head: [x3 - 12, midChose, 0] })
    return { W, H, boxes, arrows }
  }
  const W = 320
  let y = 0
  const place = (b: (typeof items)[keyof typeof items]) => {
    const h = height(b)
    boxes.push({ x: 0, y, w: W, h, ...b })
    y += h
    return { top: y - h, bottom: y }
  }
  const gap = 36
  const p = place(items.problem)
  y += gap
  const c = place(items.chose)
  y += gap
  const s = place(items.shipped)
  y += gap
  const g = place(items.gave)
  arrows.push({ d: `M${W / 2} ${p.bottom + 4} V${c.top - 14}`, head: [W / 2, c.top - 12, 90] })
  arrows.push({ d: `M${W / 2} ${c.bottom + 4} V${s.top - 14}`, head: [W / 2, s.top - 12, 90] })
  void g
  return { W, H: y, boxes, arrows }
}

function Diagram({ fork, orient }: { fork: Fork; orient: 'wide' | 'tall' }) {
  const { W, H, boxes, arrows } = layout(fork, orient)
  const pad = 12
  return (
    <svg
      className={`fork__svg fork__svg--${orient}`}
      viewBox={`${-pad} ${-pad} ${W + pad * 2} ${H + pad * 2}`}
      aria-hidden="true"
      focusable="false"
    >
      <g className="scope__lines">
        {boxes.map((b) => (
          <path
            key={b.label}
            d={sketchRectPath(b.x, b.y, b.w, b.h)}
            className={`scope__box${b.kind === 'gave' ? ' fork__box--gave' : ''}`}
          />
        ))}
        {arrows.map((a, i) => (
          <path key={i} d={a.d} className={`scope__edge${a.light ? ' scope__edge--light' : ''}`} />
        ))}
      </g>
      {boxes
        .filter((b) => b.kind === 'chose' || b.kind === 'shipped')
        .map((b) => (
          <rect key={b.label} x={b.x} y={b.y} width={b.w} height={b.h} className="fork__wash" />
        ))}
      {arrows.map((a, i) => (
        <path
          key={i}
          d="M-9 -5 L0 0 L-9 5"
          transform={`translate(${a.head[0]} ${a.head[1]}) rotate(${a.head[2]})`}
          className={`scope__head${a.light ? ' scope__head--light' : ''}`}
        />
      ))}
      {boxes.map((b) => (
        <text key={b.label} x={b.x + 14} y={b.y + 22} className={`fork__text${b.kind === 'gave' ? ' fork__text--light' : ''}`}>
          <tspan className="fork__label">{b.label}</tspan>
          {b.lines.map((l, i) => (
            <tspan key={i} x={b.x + 14} dy={i === 0 ? LINE + 4 : LINE}>
              {l}
            </tspan>
          ))}
        </text>
      ))}
    </svg>
  )
}

export function DecisionFork({ fork, title }: { fork: Fork; title: string }) {
  const alt = `${title}. The problem: ${fork.problem}. We chose: ${fork.chose}. We gave up: ${fork.gaveUp}. What shipped: ${fork.shipped}.`
  return (
    <figure className="fork" role="img" aria-label={alt}>
      <div className="scope__paper">
        <Diagram fork={fork} orient="wide" />
        <Diagram fork={fork} orient="tall" />
      </div>
    </figure>
  )
}
