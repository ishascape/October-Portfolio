import type { ReactNode } from 'react'
import type { CaseStudyId } from '../data/content'
import { SketchRect } from './Sketch'
import './Parti.css'

// A parti is the one-idea diagram an architect draws before anything else.
// Each case study has one; the "Next" card draws the current idea leading into the next.

export const partiIdeas: Record<CaseStudyId, string> = {
  'venue-finder': 'Intent first',
  hosthq: 'One system of entry',
  treeassist: 'Value before data',
}

const P = { pathLength: 1 }

// Venue Finder: scattered briefs pass through one non-negotiable gate, then run as one clear line.
function VenueFinderParti() {
  const dots = [
    [14, 22],
    [30, 46],
    [12, 64],
    [40, 18],
    [26, 88],
    [48, 74],
    [16, 104],
    [44, 100],
  ]
  return (
    <>
      {dots.map(([x, y]) => (
        <line key={`l${x}-${y}`} {...P} x1={x} y1={y} x2={96} y2={60} className="parti__fine" />
      ))}
      {dots.map(([x, y]) => (
        <circle key={`c${x}-${y}`} cx={x} cy={y} r={3} className="parti__dot" />
      ))}
      <line {...P} x1={96} y1={36} x2={96} y2={54} className="parti__heavy" />
      <line {...P} x1={96} y1={66} x2={96} y2={84} className="parti__heavy" />
      <path {...P} d="M96 60 H150 M142 54 L150 60 L142 66" className="parti__heavy" />
    </>
  )
}

// HostHQ: four separate products, one enclosing system, one entrance and one axis.
function HostHQParti() {
  return (
    <>
      {[
        [34, 26],
        [86, 26],
        [34, 64],
        [86, 64],
      ].map(([x, y]) => (
        <SketchRect key={`${x}-${y}`} x={x} y={y} width={40} height={30} className="parti__ghost" />
      ))}
      <path {...P} d="M72 108 H22 V12 H138 V108 H88" className="parti__heavy" />
      <line {...P} x1={80} y1={118} x2={80} y2={20} className="parti__axis" />
    </>
  )
}

// TreeAssist: three short steps, then straight into an open field where the tree grows.
function TreeAssistParti() {
  return (
    <>
      {[8, 30, 52].map((x) => (
        <SketchRect key={x} {...P} x={x} y={86} width={16} height={14} className="parti__heavy" />
      ))}
      <line {...P} x1={68} y1={93} x2={112} y2={93} className="parti__heavy" />
      <circle cx={112} cy={60} r={42} className="parti__ghost" />
      <path
        {...P}
        d="M112 93 V62 M112 62 L92 40 M112 62 L132 40 M92 40 L82 24 M92 40 L100 24 M132 40 L140 24"
        className="parti__heavy"
      />
      {[
        [112, 62],
        [92, 40],
        [132, 40],
        [82, 24],
        [100, 24],
        [140, 24],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} {...P} cx={cx} cy={cy} r={3.5} className="parti__node" />
      ))}
    </>
  )
}

const drawings: Record<CaseStudyId, () => ReactNode> = {
  'venue-finder': VenueFinderParti,
  hosthq: HostHQParti,
  treeassist: TreeAssistParti,
}

export function Parti({ id, className }: { id: CaseStudyId; className?: string }) {
  const Drawing = drawings[id]
  return (
    <svg className={`parti ${className ?? ''}`} viewBox="0 0 160 120" aria-hidden="true">
      <Drawing />
    </svg>
  )
}

interface PartiTransitionProps {
  from: CaseStudyId
  to: CaseStudyId
}

// The current project's parti, ghosted, leading into the next one in ink.
export function PartiTransition({ from, to }: PartiTransitionProps) {
  return (
    <div className="parti-transition">
      <figure className="parti-transition__item parti-transition__item--from">
        <Parti id={from} />
        <figcaption className="annotation">{partiIdeas[from]}</figcaption>
      </figure>
      <svg className="parti-transition__link" viewBox="0 0 80 20" aria-hidden="true" preserveAspectRatio="none">
        <path pathLength={1} d="M2 10 H74 M68 4 L76 10 L68 16" />
      </svg>
      <figure className="parti-transition__item parti-transition__item--to">
        <Parti id={to} />
        <figcaption className="annotation">{partiIdeas[to]}</figcaption>
      </figure>
    </div>
  )
}
