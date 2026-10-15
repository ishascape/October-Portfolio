import type { KeyboardEvent, ReactNode } from 'react'
import type { CaseStudy, CaseStudyId } from '../data/content'
import { SketchRect } from './Sketch'
import './SitePlan.css'

export type PlanMode = 'existing' | 'proposed'

interface Rect {
  x: number
  y: number
}

interface Layout {
  viewBox: string
  districts: { label: string; x: number; y: number; w: number; h: number }[]
  plots: Record<CaseStudyId, Rect>
  road: { x1: number; x2: number; y: number }
  phase2: Rect & { w: number; h: number }
  north: Rect
}

// Every building is drawn in a 300 × 200 plot, so both layouts share the same art.
const PLOT_W = 300
const PLOT_H = 200

const layouts: Record<'landscape' | 'portrait', Layout> = {
  landscape: {
    viewBox: '44 22 1150 462',
    districts: [
      { label: 'HeadBox, two-sided events marketplace', x: 60, y: 50, w: 700, h: 420 },
      { label: 'Findmypast, genealogy subscription', x: 800, y: 50, w: 340, h: 420 },
    ],
    plots: {
      'venue-finder': { x: 100, y: 110 },
      hosthq: { x: 430, y: 110 },
      treeassist: { x: 820, y: 110 },
    },
    road: { x1: 60, x2: 760, y: 410 },
    phase2: { x: 820, y: 395, w: 300, h: 56 },
    north: { x: 1170, y: 70 },
  },
  portrait: {
    viewBox: '0 0 400 1080',
    districts: [
      { label: 'HeadBox, events marketplace', x: 12, y: 36, w: 376, h: 630 },
      { label: 'Findmypast, subscription', x: 12, y: 704, w: 376, h: 362 },
    ],
    plots: {
      'venue-finder': { x: 50, y: 80 },
      hosthq: { x: 50, y: 400 },
      treeassist: { x: 50, y: 750 },
    },
    road: { x1: 12, x2: 388, y: 360 },
    phase2: { x: 50, y: 1010, w: 300, h: 44 },
    north: { x: 362, y: 30 },
  },
}

/* ---------- Building art: existing (dashed) and proposed (solid) ---------- */

function Ex({ children }: { children: ReactNode }) {
  return <g className="plan__existing">{children}</g>
}
function Pr({ children }: { children: ReactNode }) {
  return <g className="plan__proposed">{children}</g>
}

const P = { pathLength: 1 } // lets CSS draw any shape with stroke-dashoffset 1 → 0

function VenueFinderArt() {
  const rooms = 13
  const w = 288 / rooms
  return (
    <>
      <Ex>
        <SketchRect x={6} y={70} width={288} height={60} />
        {Array.from({ length: rooms - 1 }, (_, i) => (
          <line key={i} x1={6 + w * (i + 1)} y1={70} x2={6 + w * (i + 1)} y2={130} />
        ))}
        <text x={6} y={150} className="plan__tiny">13-step brief builder</text>
      </Ex>
      <Pr>
        <SketchRect {...P} x={70} y={24} width={160} height={140} />
        <line {...P} x1={150} y1={24} x2={150} y2={104} />
        <line {...P} x1={70} y1={104} x2={230} y2={104} />
        <path {...P} d="M150 196 V176 M144 182 L150 176 L156 182" />
      </Pr>
    </>
  )
}

function HostHQArt() {
  const blocks = [
    { x: 12, y: 14, label: 'Lead Feed' },
    { x: 160, y: 14, label: 'PowerHost' },
    { x: 12, y: 112, label: 'HB for Business' },
    { x: 160, y: 112, label: '3D Studio' },
  ]
  return (
    <>
      <Ex>
        {blocks.map((b) => (
          <g key={b.label}>
            <SketchRect x={b.x} y={b.y} width={128} height={74} />
            <text x={b.x + 8} y={b.y + 18} className="plan__tiny">{b.label}</text>
          </g>
        ))}
      </Ex>
      <Pr>
        <SketchRect {...P} x={4} y={6} width={292} height={188} />
        <line {...P} x1={196} y1={6} x2={196} y2={194} />
        <line {...P} x1={4} y1={120} x2={196} y2={120} />
      </Pr>
    </>
  )
}

function TreeAssistArt() {
  const forms = Array.from({ length: 8 }, (_, i) => ({ x: 8 + (i % 4) * 44, y: 30 + Math.floor(i / 4) * 52 }))
  const nodes = [
    [215, 44],
    [175, 96],
    [255, 96],
    [150, 150],
    [200, 150],
    [270, 150],
  ]
  const edges = [
    [0, 1],
    [0, 2],
    [1, 3],
    [1, 4],
    [2, 5],
  ]
  return (
    <>
      <Ex>
        {forms.map((f, i) => (
          <SketchRect key={i} x={f.x} y={f.y} width={40} height={46} />
        ))}
        <SketchRect x={190} y={14} width={102} height={172} />
        <text x={198} y={34} className="plan__tiny">Blank tree</text>
      </Ex>
      <Pr>
        {[14, 76, 138].map((y) => (
          <SketchRect {...P} key={y} x={8} y={y} width={80} height={52} />
        ))}
        <SketchRect {...P} x={110} y={14} width={182} height={176} />
        {edges.map(([a, b]) => (
          <line {...P} key={`${a}-${b}`} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} />
        ))}
        {nodes.map(([cx, cy], i) => (
          <circle {...P} key={i} cx={cx} cy={cy} r={7} className="plan__node" />
        ))}
      </Pr>
    </>
  )
}

export const buildingArt: Record<CaseStudyId, () => ReactNode> = {
  'venue-finder': VenueFinderArt,
  hosthq: HostHQArt,
  treeassist: TreeAssistArt,
}

/* ---------- Plan ---------- */

interface SitePlanProps {
  variant: 'landscape' | 'portrait'
  studies: CaseStudy[]
  mode: PlanMode
  hovered: CaseStudyId | null
  onHover: (id: CaseStudyId | null) => void
  onSelect: (id: CaseStudyId, el: Element) => void
}

export function SitePlan({ variant, studies, mode, hovered, onHover, onSelect }: SitePlanProps) {
  const L = layouts[variant]
  const portrait = variant === 'portrait'

  const onKey = (e: KeyboardEvent<SVGGElement>, id: CaseStudyId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelect(id, e.currentTarget)
    }
  }

  return (
    <svg
      className={`plan plan--${variant}`}
      data-mode={mode}
      viewBox={L.viewBox}
      role="group"
      aria-label="Site plan of selected work. Each building is a case study."
    >
      <defs>
        <pattern id={`hatch-grey-${variant}`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" className="plan__hatch-line plan__hatch-line--grey" />
        </pattern>
      </defs>

      {L.districts.map((d) => (
        <g key={d.label} className="plan__district">
          <SketchRect x={d.x} y={d.y} width={d.w} height={d.h} />
          <text x={d.x} y={d.y - 10} className="plan__label">{d.label}</text>
        </g>
      ))}

      <g className="plan__road" aria-hidden="true">
        <line x1={L.road.x1} y1={L.road.y - 12} x2={L.road.x2} y2={L.road.y - 12} />
        <line x1={L.road.x1} y1={L.road.y + 12} x2={L.road.x2} y2={L.road.y + 12} />
        <text x={(L.road.x1 + L.road.x2) / 2} y={L.road.y + 4} textAnchor="middle" className="plan__tiny plan__road-label">
          {portrait ? 'Brief → lead → booking' : 'Brief → lead → proposal → booking'}
        </text>
      </g>

      {studies.map((s, i) => {
        const p = L.plots[s.id]
        const Art = buildingArt[s.id]
        const side = s.id === 'venue-finder' ? 'Demand' : s.id === 'hosthq' ? 'Supply' : 'Activation'
        return (
          <g
            key={s.id}
            className="plan__building"
            data-hovered={hovered === s.id ? 'true' : 'false'}
            style={{ ['--i' as string]: i }}
            transform={`translate(${p.x} ${p.y})`}
            role="button"
            tabIndex={0}
            aria-label={`${s.number}, ${s.title}. ${s.leadMetric.value} ${s.leadMetric.label}. Before: ${s.existing}. After: ${s.proposed}. Open details.`}
            onMouseEnter={() => onHover(s.id)}
            onMouseLeave={() => onHover(null)}
            onFocus={() => onHover(s.id)}
            onBlur={() => onHover(null)}
            onClick={(e) => onSelect(s.id, e.currentTarget)}
            onKeyDown={(e) => onKey(e, s.id)}
          >
            <rect className="plan__hit" x={-12} y={-24} width={PLOT_W + 24} height={PLOT_H + 76} />
            <g className="plan__construct" aria-hidden="true">
              <line x1={-28} y1={0} x2={PLOT_W + 28} y2={0} />
              <line x1={-28} y1={PLOT_H} x2={PLOT_W + 28} y2={PLOT_H} />
              <line x1={0} y1={-18} x2={0} y2={PLOT_H + 18} />
              <line x1={PLOT_W} y1={-18} x2={PLOT_W} y2={PLOT_H + 18} />
            </g>
            <text x={0} y={-8} className="plan__tiny">{side}</text>
            <g className="plan__art">
              <Art />
            </g>
            <text x={0} y={PLOT_H + 26} className="plan__name">
              {s.title}
            </text>
            <text x={0} y={PLOT_H + 46} className="plan__metric">
              {s.leadMetric.value} {s.leadMetric.label}
            </text>
          </g>
        )
      })}

      <g className="plan__phase2" aria-hidden="true">
        <rect x={L.phase2.x} y={L.phase2.y} width={L.phase2.w} height={L.phase2.h} fill={`url(#hatch-grey-${variant})`} />
        <rect x={L.phase2.x} y={L.phase2.y} width={L.phase2.w} height={L.phase2.h} className="plan__phase2-outline" />
        <text x={L.phase2.x + 10} y={L.phase2.y + L.phase2.h / 2 + 4} className="plan__tiny plan__phase2-label">
          Phase 2: more work on request
        </text>
      </g>

      {!portrait && (
        <g aria-hidden="true">
          <text x={548} y={28} className="plan__note">
            promoted to Senior, Jan 2026
          </text>
          <path className="plan__note-arrow" d="M540 22 C 515 18, 500 30, 492 50 M486 42 L492 50 L499 44" />
        </g>
      )}

      <g className="plan__north" transform={`translate(${L.north.x} ${L.north.y})`} aria-hidden="true">
        <circle r="14" />
        <path d="M0 -10 L6 8 L0 4 L-6 8 Z" />
        <text y="-20" textAnchor="middle" className="plan__tiny">N</text>
      </g>
    </svg>
  )
}
