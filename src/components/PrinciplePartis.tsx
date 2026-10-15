import type { ReactNode } from 'react'
import { SketchRect } from './Sketch'
import { DrawOnScroll } from './DrawOnScroll'

// One parti per "How I work" principle, in the same pen as the case-study partis.
// at(n) sets the order each line is drawn in as you scroll.

const P = { pathLength: 1 }
const at = (i: number) => ({ 'data-order': i })

// 0 · Design the system: a section through the whole thing. The user, the interface they
// touch, and the business behind it, split into departments. One thread runs through all of it.
function System() {
  const touch = [36, 80, 124]
  return (
    <>
      {touch.map((x, n) => (
        <path key={n} {...P} d={`M80 14 L${x} 40`} className="parti__fine" {...at(n * 0.3)} />
      ))}
      <SketchRect {...P} x={12} y={40} width={136} height={10} o={4} className="parti__heavy" {...at(1)} />
      <SketchRect {...P} x={12} y={70} width={136} height={36} o={4} className="parti__heavy" {...at(1.6)} />
      {[46, 80, 114].map((x, n) => (
        <path key={x} {...P} d={`M${x} 70 V106`} className="parti__fine" {...at(2 + n * 0.2)} />
      ))}
      <path
        {...P}
        d="M80 14 V82 M29 82 H131 M29 82 V94 M63 82 V94 M97 82 V94 M131 82 V94"
        className="parti__key"
        {...at(2.8)}
      />
      <circle cx={80} cy={10} r={5} className="parti__node draw-late" />
      {touch.map((x) => (
        <rect key={`t${x}`} x={x - 3.5} y={41.5} width={7} height={7} className="parti__node draw-late" />
      ))}
      <text x={90} y={13} className="parti__tag draw-late">
        user
      </text>
      <text x={12} y={62} className="parti__tag draw-late">
        interface
      </text>
      <text x={12} y={118} className="parti__tag draw-late">
        business, by department
      </text>
    </>
  )
}

// 1 · Commercial sense: users and the business held level on one fulcrum.
function Commercial() {
  return (
    <>
      <line {...P} x1={10} y1={100} x2={150} y2={100} className="parti__fine" {...at(0)} />
      <path {...P} d="M80 52 L66 100 M80 52 L94 100" className="parti__heavy" {...at(1)} />
      <line {...P} x1={14} y1={52} x2={146} y2={52} className="parti__key" {...at(2)} />
      <circle cx={36} cy={36} r={12} className="parti__node draw-late" />
      <rect x={112} y={24} width={24} height={24} className="parti__node draw-late" />
    </>
  )
}

// 2 · Facilitation: separate seats around one table, all lines leading to one decision.
function Facilitation() {
  const seats = [
    [80, 12],
    [128, 40],
    [118, 98],
    [42, 98],
    [32, 40],
  ]
  return (
    <>
      <circle {...P} cx={80} cy={60} r={30} className="parti__heavy" {...at(0)} />
      {seats.map(([x, y], n) => (
        <line key={n} {...P} x1={x} y1={y} x2={80} y2={60} className="parti__fine" {...at(1 + n * 0.4)} />
      ))}
      {seats.map(([x, y], n) => (
        <rect key={`s${n}`} x={x - 5} y={y - 5} width={10} height={10} className="parti__node draw-late" />
      ))}
      <circle cx={80} cy={60} r={6} className="parti__key-fill draw-late" />
    </>
  )
}

// 3 · Research into vision: scattered observations focus through one lens into one direction.
function Research() {
  const notes = [
    [12, 22],
    [24, 48],
    [10, 70],
    [30, 92],
    [16, 104],
    [36, 30],
    [40, 66],
  ]
  return (
    <>
      {notes.map(([x, y], n) => (
        <line key={n} {...P} x1={x} y1={y} x2={78} y2={60} className="parti__fine" {...at(n * 0.25)} />
      ))}
      <path {...P} d="M78 30 Q90 60 78 90 Q66 60 78 30" className="parti__heavy" {...at(2)} />
      <path {...P} d="M84 60 H150 M140 52 L150 60 L140 68" className="parti__key" {...at(3)} />
      {notes.map(([x, y], n) => (
        <circle key={`d${n}`} cx={x} cy={y} r={3} className="parti__dot draw-late" />
      ))}
    </>
  )
}

// 4 · Data: the line heads one way, the results come in, and it changes course.
function Data() {
  const points = [
    [26, 84],
    [44, 76],
    [62, 70],
    [80, 66],
    [98, 74],
    [116, 54],
    [134, 34],
  ]
  return (
    <>
      <path {...P} d="M12 10 V108 H152" className="parti__fine" {...at(0)} />
      <path d="M80 66 L132 48" className="parti__ghost draw-late" />
      <path {...P} d="M20 88 L80 64 L92 70 L140 28" className="parti__heavy" {...at(2)} />
      <circle cx={86} cy={67} r={11} className="parti__key draw-late" />
      {points.map(([x, y], n) => (
        <circle key={n} cx={x} cy={y} r={2.5} className="parti__dot draw-late" />
      ))}
    </>
  )
}

const drawings: Record<string, () => ReactNode> = { '0': System, '1': Commercial, '2': Facilitation, '3': Research, '4': Data }

export function PrincipleParti({ number }: { number: string }) {
  const Drawing = drawings[number]
  if (!Drawing) return null
  return (
    <DrawOnScroll viewBox="0 0 160 120" className="principle__parti">
      <Drawing />
    </DrawOnScroll>
  )
}
