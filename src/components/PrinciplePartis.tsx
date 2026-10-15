import type { CSSProperties, ReactNode } from 'react'
import { SketchRect } from './Sketch'
import { DrawOnScroll } from './DrawOnScroll'

// One parti per "How I work" principle, in the same pen as the case-study partis.
// at(n) staggers the order each line is drawn in.

const P = { pathLength: 1 }
const at = (i: number): CSSProperties => ({ transitionDelay: `${Math.round(i * 140)}ms` })

// 0 · Design the system: the product sits inside the ring of people and workflows around it.
function System() {
  const ring = [
    [80, 14],
    [130, 36],
    [130, 86],
    [80, 108],
    [30, 86],
    [30, 36],
  ]
  return (
    <>
      <circle cx={80} cy={60} r={46} className="parti__ghost draw-late" />
      {ring.map(([x, y], n) => (
        <line key={n} {...P} x1={x} y1={y} x2={80} y2={60} className="parti__fine" style={at(1 + n * 0.3)} />
      ))}
      <SketchRect {...P} x={64} y={46} width={32} height={28} o={4} className="parti__heavy" style={at(3)} />
      {ring.map(([x, y], n) => (
        <rect key={`n${n}`} x={x - 4} y={y - 4} width={8} height={8} className="parti__node draw-late" />
      ))}
    </>
  )
}

// 1 · Commercial sense: users and the business held level on one fulcrum.
function Commercial() {
  return (
    <>
      <line {...P} x1={10} y1={100} x2={150} y2={100} className="parti__fine" style={at(0)} />
      <path {...P} d="M80 52 L66 100 M80 52 L94 100" className="parti__heavy" style={at(1)} />
      <line {...P} x1={18} y1={52} x2={142} y2={52} className="parti__heavy" style={at(2)} />
      <line x1={10} y1={52} x2={150} y2={52} className="parti__axis draw-late" />
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
      <circle {...P} cx={80} cy={60} r={30} className="parti__heavy" style={at(0)} />
      {seats.map(([x, y], n) => (
        <line key={n} {...P} x1={x} y1={y} x2={80} y2={60} className="parti__fine" style={at(1 + n * 0.4)} />
      ))}
      {seats.map(([x, y], n) => (
        <rect key={`s${n}`} x={x - 5} y={y - 5} width={10} height={10} className="parti__node draw-late" />
      ))}
      <circle cx={80} cy={60} r={5} className="parti__dot draw-late" style={{ fill: 'var(--ink)' }} />
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
        <line key={n} {...P} x1={x} y1={y} x2={78} y2={60} className="parti__fine" style={at(n * 0.25)} />
      ))}
      <path {...P} d="M78 30 Q90 60 78 90 Q66 60 78 30" className="parti__heavy" style={at(2)} />
      <path {...P} d="M84 60 H150 M140 52 L150 60 L140 68" className="parti__heavy" style={at(3)} />
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
      <path {...P} d="M12 10 V108 H152" className="parti__fine" style={at(0)} />
      <path d="M80 66 L132 48" className="parti__ghost draw-late" />
      <path {...P} d="M20 88 L80 64 L92 70 L140 28" className="parti__heavy" style={at(2)} />
      <circle cx={86} cy={67} r={11} className="parti__marker draw-late" />
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
