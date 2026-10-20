import type { ReactNode } from 'react'
import { SketchRect } from './Sketch'
import './Parti.css'
import './DecisionFork.css'

// One small pencil sketch per HostHQ decision, drawn like the partis: ink for the situation, blue for
// what we chose, dashed graphite for what we gave up.

export type DecisionSketch = 'research' | 'structure' | 'embed' | 'reporting' | 'desktop'

function Research() {
  const around = [0, 1, 2, 3, 4].map((i) => {
    const a = (i / 5) * Math.PI * 2 - Math.PI / 2
    return [30 + Math.cos(a) * 25, 60 + Math.sin(a) * 25]
  })
  return (
    <>
      <circle cx={30} cy={60} r={11} className="parti__key" />
      {around.map(([x, y]) => (
        <circle key={`${x}`} cx={x} cy={y} r={3.5} className="parti__node" />
      ))}
      <path d="M62 72 H98 M90 66 L98 72 L90 78" className="parti__heavy" />
      <text x={62} y={50} className="parti__tag">
        round-table
      </text>
      <text x={62} y={60} className="parti__tag">
        research
      </text>
      {['high priority', 'core workflow', 'functionality', 'for MVP'].map((l, i) => (
        <text key={l} x={108} y={54 + i * 12} className="parti__tag">
          {l}
        </text>
      ))}
    </>
  )
}

function Structure() {
  return (
    <>
      <SketchRect x={14} y={18} width={90} height={84} className="parti__heavy" />
      <path d="M44 18 V102 M44 42 H104" className="parti__key" />
      {[
        [116, 26],
        [136, 26],
        [116, 52],
        [136, 52],
        [116, 78],
        [136, 78],
      ].map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={14} height={14} className="parti__ghost" />
      ))}
      <text x={112} y={110} className="parti__tag">
        full feature set
      </text>
    </>
  )
}

function Embed() {
  return (
    <>
      <SketchRect x={12} y={28} width={96} height={64} className="parti__heavy" />
      <path d="M22 40 H70 M22 48 H56" className="parti__fine" />
      <SketchRect x={60} y={56} width={32} height={26} className="parti__key" />
      <path d="M66 56 L72 50 H98 L92 56 M98 50 V76 L92 82" className="parti__key" />
      <text x={14} y={108} className="parti__tag">
        3D Studio inside the proposal flow
      </text>
      <path d="M114 60 H122" className="parti__ghost" />
      <rect x={124} y={42} width={28} height={36} className="parti__ghost" />
      <text x={122} y={92} className="parti__tag">
        migrate later
      </text>
    </>
  )
}

function Reporting() {
  return (
    <>
      <path d="M14 100 H146 M14 100 V16" className="parti__heavy" />
      <path d="M26 100 V62 H42 V100 M50 100 V40 H66 V100" className="parti__key" />
      <path d="M82 100 V56 H98 V100 M106 100 V72 H122 V100 M130 100 V48 H144 V100" className="parti__ghost" />
      <text x={24} y={112} className="parti__tag">
        marketplace
      </text>
      <text x={96} y={34} className="parti__tag">
        full reporting, next
      </text>
    </>
  )
}

function Desktop() {
  return (
    <>
      <SketchRect x={14} y={20} width={86} height={58} className="parti__key" />
      <path d="M57 78 V92 M40 92 H74" className="parti__heavy" />
      <rect x={118} y={32} width={26} height={50} rx={3} className="parti__ghost" />
      <path d="M126 76 H136" className="parti__ghost" />
      <text x={14} y={110} className="parti__tag">
        desktop first, where hosts work
      </text>
      <text x={112} y={96} className="parti__tag">
        mobile later
      </text>
    </>
  )
}

const drawings: Record<DecisionSketch, () => ReactNode> = {
  research: Research,
  structure: Structure,
  embed: Embed,
  reporting: Reporting,
  desktop: Desktop,
}

export function DecisionFork({ sketch }: { sketch: DecisionSketch }) {
  const Drawing = drawings[sketch]
  return (
    <svg className="parti decision-sketch" viewBox="0 0 160 120" aria-hidden="true" focusable="false">
      <Drawing />
    </svg>
  )
}
