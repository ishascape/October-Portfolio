import { useState } from 'react'
import { ModeSwitch } from './ModeSwitch'
import { sketchRectPath } from './Sketch'
import type { PlanMode } from './SitePlan'
import './TreeAssistFlow.css'

// TreeAssist onboarding, before and after, drawn as a two-lane flow: what the user does (top lane)
// and what the system works out (bottom lane). Existing is one long line of effort that pays off
// last. Proposed is a loop in which every small input is answered with something back.

type Pt = [number, number]
type Kind = 'main' | 'loop' | 'fallback' | 'drop'
type Node = {
  id: string
  lane: 'user' | 'system'
  cx: number
  cy: number
  w: number
  h: number
  lines: string[]
  key?: boolean
}
type Edge = { d: string; head: Pt; angle: number; kind: Kind }
type Note = { x: number; y: number; lines: string[]; anchor?: 'start' | 'middle' | 'end'; key?: boolean }
type Plan = {
  w: number
  h: number
  lanes: { x: number; y: number; w: number; h: number; label: string }[]
  nodes: Node[]
  edges: Edge[]
  notes: Note[]
}
type Layout = { existing: Plan; proposed: Plan }

const e = (kind: Kind, d: string, head: Pt, angle: number): Edge => ({ kind, d, head, angle })
const n = (
  id: string,
  lane: Node['lane'],
  cx: number,
  cy: number,
  w: number,
  h: number,
  lines: string[],
  key = false,
): Node => ({
  id,
  lane,
  cx,
  cy,
  w,
  h,
  lines,
  key,
})

// ---------- Landscape ----------
const UY = 165
const SY = 345
const col = (i: number) => 104 + i * 150
const wide: Layout = (() => {
  const W = 132
  const H = 60
  const lanes = [
    { x: 40, y: 20, w: 900, h: 215, label: 'User actions' },
    { x: 40, y: 270, w: 900, h: 130, label: 'System intelligence' },
  ]
  const proposed: Plan = {
    w: 960,
    h: 450,
    lanes,
    nodes: [
      n('p1', 'user', col(0) + 20, UY, W, H, ['Enter name,', 'birth, place']),
      n('p2', 'system', col(1) + 20, SY, W, H, ['Search', 'archives']),
      n('p3', 'user', col(2) + 20, UY, W, H, ['Confirm', 'your record'], true),
      n('p4', 'system', col(3) + 20, SY, W, H, ['Extract', "mother's name"]),
      n('p5', 'user', col(4) + 20, UY, W, H, ["Add mother's", 'details']),
      n('p6', 'system', col(5) + 20, SY, W, H, ['Suggest records', '& grow tree']),
      n('p7', 'user', col(1) + 20, UY, W, H, ['Manual entry', 'if no match']),
    ],
    edges: [
      e('main', `M124 ${UY + 30} C124 ${SY} 140 ${SY} 194 ${SY}`, [194, SY], 0),
      e(
        'main',
        `M${col(1) + 86} ${SY} C${col(2) - 6} ${SY} ${col(2) - 6} ${UY + 100} ${col(2) - 6} ${UY + 30}`,
        [col(2) - 6, UY + 30],
        -90,
      ),
      e(
        'main',
        `M${col(2) + 86} ${UY} C${col(3) + 20} ${UY} ${col(3) + 20} ${SY - 120} ${col(3) + 20} ${SY - 30}`,
        [col(3) + 20, SY - 30],
        90,
      ),
      e(
        'main',
        `M${col(3) + 86} ${SY} C${col(4) + 20} ${SY} ${col(4) + 20} ${UY + 100} ${col(4) + 20} ${UY + 30}`,
        [col(4) + 20, UY + 30],
        -90,
      ),
      e(
        'main',
        `M${col(4) + 86} ${UY} C${col(5) + 20} ${UY} ${col(5) + 20} ${SY - 120} ${col(5) + 20} ${SY - 30}`,
        [col(5) + 20, SY - 30],
        90,
      ),
      e(
        'loop',
        `M${col(5) + 20} ${SY + 30} V${SY + 58} Q${col(5) + 20} ${SY + 74} ${col(5) + 4} ${SY + 74} H${col(2) + 52} Q${col(2) + 36} ${SY + 74} ${col(2) + 36} ${SY + 58} V${UY + 30}`,
        [col(2) + 36, UY + 30],
        -90,
      ),
      e('fallback', `M${col(1) + 20} ${SY - 30} V${UY + 30}`, [col(1) + 20, UY + 30], -90),
      e(
        'fallback',
        `M${col(1) + 20} ${UY - 30} C${col(1) + 20} 40 ${col(4) + 20} 40 ${col(4) + 20} ${UY - 30}`,
        [col(4) + 20, UY - 30],
        90,
      ),
    ],
    notes: [
      { x: col(2) + 20, y: 96, lines: ['first reward: they see', 'their own record'], anchor: 'middle', key: true },
      { x: col(1) + 20 + 14, y: 262, lines: ['no match'], anchor: 'start' },
      { x: col(3) + 20, y: SY + 98, lines: ['each generation repeats the loop'], anchor: 'middle', key: true },
    ],
  }

  const fx = (i: number) => 84 + i * 92
  const existing: Plan = {
    w: 960,
    h: 450,
    lanes,
    nodes: [
      ...Array.from({ length: 8 }, (_, i) => n(`x${i}`, 'user', fx(i), UY, 66, 74, [String(i + 1)])),
      n('xs', 'system', 835, SY, 150, H, ['Build tree &', 'record hints']),
      n('xv', 'user', 870, UY, 84, 74, ['First', 'value'], true),
    ],
    edges: [
      ...Array.from({ length: 7 }, (_, i) =>
        e('main', `M${fx(i) + 36} ${UY} H${fx(i + 1) - 40}`, [fx(i + 1) - 36, UY], 0),
      ),
      e('main', `M${fx(7)} ${UY + 38} C${fx(7)} ${SY} 700 ${SY} 760 ${SY}`, [760, SY], 0),
      e('main', `M870 ${SY - 30} V${UY + 44}`, [870, UY + 40], -90),
      e(
        'drop',
        `M${fx(4) + 46} ${UY + 38} C${fx(4) + 46} ${UY + 90} ${fx(4) + 46} ${SY - 40} ${fx(4) + 46} ${SY - 10}`,
        [fx(4) + 46, SY - 6],
        90,
      ),
    ],
    notes: [
      { x: 330, y: 70, lines: ['8 separate forms before anything comes back'], anchor: 'start' },
      { x: fx(4) + 18, y: SY + 6, lines: ['about 4 in 10 leave', 'before reaching value'], anchor: 'start' },
      { x: 690, y: SY + 40, lines: ['value arrives last'], anchor: 'middle', key: true },
      { x: 130, y: SY + 4, lines: ['system waits on data'], anchor: 'start' },
    ],
  }
  return { existing, proposed }
})()

// ---------- Portrait ----------
const tall: Layout = (() => {
  const UX = 92
  const SX = 268
  const W = 140
  const H = 50
  const lanes = [
    { x: 20, y: 16, w: 144, h: 0, label: 'User actions' },
    { x: 196, y: 16, w: 144, h: 0, label: 'System intelligence' },
  ]
  const ry = (i: number) => 96 + i * 82
  const proposed: Plan = {
    w: 360,
    h: 590,
    lanes,
    nodes: [
      n('p1', 'user', UX, ry(0), W, H, ['Enter name,', 'birth, place']),
      n('p2', 'system', SX, ry(1), W, H, ['Search', 'archives']),
      n('p3', 'user', UX, ry(2), W, H, ['Confirm', 'your record'], true),
      n('p4', 'system', SX, ry(3), W, H, ['Extract', "mother's name"]),
      n('p5', 'user', UX, ry(4), W, H, ["Add mother's", 'details']),
      n('p6', 'system', SX, ry(5), W, H, ['Suggest records', '& grow tree']),
      n('p7', 'user', UX, ry(1), W, H, ['Manual entry', 'if no match']),
    ],
    edges: [
      e('main', `M${UX + 70} ${ry(0)} C${SX} ${ry(0)} ${SX} ${ry(0) + 40} ${SX} ${ry(1) - 25}`, [SX, ry(1) - 25], 90),
      e(
        'main',
        `M${SX} ${ry(1) + 25} C${SX} ${ry(2) - 6} ${UX + 150} ${ry(2)} ${UX + 70} ${ry(2)}`,
        [UX + 70, ry(2)],
        180,
      ),
      e('main', `M${UX} ${ry(2) + 25} C${UX} ${ry(3)} ${SX - 150} ${ry(3)} ${SX - 70} ${ry(3)}`, [SX - 70, ry(3)], 0),
      e(
        'main',
        `M${SX} ${ry(3) + 25} C${SX} ${ry(4) - 6} ${UX + 150} ${ry(4)} ${UX + 70} ${ry(4)}`,
        [UX + 70, ry(4)],
        180,
      ),
      e('main', `M${UX} ${ry(4) + 25} C${UX} ${ry(5)} ${SX - 150} ${ry(5)} ${SX - 70} ${ry(5)}`, [SX - 70, ry(5)], 0),
      e('loop', `M${SX + 70} ${ry(5)} H${SX + 82} V${ry(2) + 12} H${UX + 78}`, [UX + 72, ry(2) + 12], 180),
      e('fallback', `M${SX - 70} ${ry(1)} H${UX + 70}`, [UX + 72, ry(1)], 180),
      e('fallback', `M${UX - 70} ${ry(1)} H8 V${ry(4)} H${UX - 66}`, [UX - 70, ry(4)], 0),
    ],
    notes: [
      { x: UX, y: ry(2) - 36, lines: ['first reward'], anchor: 'middle', key: true },
      { x: SX, y: ry(5) + 54, lines: ['each generation', 'repeats the loop'], anchor: 'middle', key: true },
    ],
  }
  const fy = (i: number) => 76 + i * 50
  const existing: Plan = {
    w: 360,
    h: 590,
    lanes,
    nodes: [
      ...Array.from({ length: 8 }, (_, i) => n(`x${i}`, 'user', UX, fy(i), 130, 32, [`Form ${i + 1}`])),
      n('xs', 'system', SX, fy(7), 140, 54, ['Build tree &', 'record hints']),
      n('xv', 'user', UX, fy(7) + 82, 130, 44, ['First value'], true),
    ],
    edges: [
      ...Array.from({ length: 7 }, (_, i) =>
        e('main', `M${UX} ${fy(i) + 18} V${fy(i + 1) - 22}`, [UX, fy(i + 1) - 17], 90),
      ),
      e('main', `M${UX + 66} ${fy(7)} H${SX - 74}`, [SX - 70, fy(7)], 0),
      e(
        'main',
        `M${SX} ${fy(7) + 30} C${SX} ${fy(7) + 82} ${UX + 130} ${fy(7) + 82} ${UX + 70} ${fy(7) + 82}`,
        [UX + 68, fy(7) + 82],
        180,
      ),
      e('drop', `M${UX + 66} ${fy(3)} H${SX - 20}`, [SX - 14, fy(3)], 0),
    ],
    notes: [
      { x: SX, y: fy(3) + 26, lines: ['about 4 in 10 leave', 'before reaching value'], anchor: 'middle' },
      { x: SX, y: fy(1) + 4, lines: ['system waits on data'], anchor: 'middle' },
      { x: SX, y: fy(7) + 96, lines: ['value arrives last'], anchor: 'middle', key: true },
    ],
  }
  return { existing, proposed }
})()

function Head({ at: [x, y], angle, kind }: { at: Pt; angle: number; kind: Kind }) {
  return (
    <path
      d="M-9 -5 L0 0 L-9 5"
      transform={`translate(${x} ${y}) rotate(${angle})`}
      className={`flow__head flow__head--${kind}`}
    />
  )
}

// Both states live in the same drawing and cross-fade; the active one draws itself in.
function Svg({ orient, layout, mode }: { orient: 'wide' | 'tall'; layout: Layout; mode: PlanMode }) {
  const { w, h } = layout.proposed
  const wideLanes = orient === 'wide'
  return (
    <svg
      className={`flow__svg flow__svg--${orient}`}
      viewBox={`0 0 ${w} ${h}`}
      data-mode={mode}
      aria-hidden="true"
      focusable="false"
    >
      {wideLanes &&
        layout.proposed.lanes.map((l) => (
          <g key={l.label} className="flow__lane">
            <rect x={l.x} y={l.y} width={l.w} height={l.h} />
            <text
              transform={`translate(${l.x - 14} ${l.y + l.h / 2}) rotate(-90)`}
              textAnchor="middle"
              className="flow__lane-label"
            >
              {l.label}
            </text>
          </g>
        ))}
      {!wideLanes && (
        <g className="flow__lane">
          <line x1={180} x2={180} y1={16} y2={h - 16} />
          {layout.proposed.lanes.map((l) => (
            <text key={l.label} x={l.x + l.w / 2} y={l.y + 8} textAnchor="middle" className="flow__lane-label">
              {l.label}
            </text>
          ))}
        </g>
      )}
      {(['existing', 'proposed'] as const).map((m) => {
        const plan = layout[m]
        return (
          <g key={m} className="flow__state" data-state={m} data-active={mode === m}>
            <g className="flow__lines">
              {plan.edges.map((ed, i) => (
                <path
                  key={i}
                  d={ed.d}
                  pathLength={1}
                  className={`flow__edge flow__edge--${ed.kind}`}
                  style={{ ['--i' as string]: i }}
                />
              ))}
              {plan.nodes.map((nd) => (
                <path
                  key={nd.id}
                  d={sketchRectPath(nd.cx - nd.w / 2, nd.cy - nd.h / 2, nd.w, nd.h, 4)}
                  className={`flow__box${nd.key ? ' flow__box--key' : ''}`}
                />
              ))}
            </g>
            {plan.edges.map((ed, i) => (
              <Head key={i} at={ed.head} angle={ed.angle} kind={ed.kind} />
            ))}
            {plan.nodes.map((nd, i) => (
              <g key={nd.id} className="flow__node" style={{ ['--i' as string]: i }}>
                <rect
                  x={nd.cx - nd.w / 2}
                  y={nd.cy - nd.h / 2}
                  width={nd.w}
                  height={nd.h}
                  className={`flow__fill${nd.key ? ' flow__fill--key' : ''}`}
                />
                {nd.key && m === 'proposed' && (
                  <rect
                    x={nd.cx - nd.w / 2 - 8}
                    y={nd.cy - nd.h / 2 - 8}
                    width={nd.w + 16}
                    height={nd.h + 16}
                    className="flow__ripple"
                  />
                )}
                <text
                  x={nd.cx}
                  y={nd.cy - (nd.lines.length - 1) * 9 + 5}
                  textAnchor="middle"
                  className={`flow__text${m === 'existing' && nd.id.startsWith('x') && nd.lines.length === 1 && nd.w < 100 ? ' flow__text--num' : ''}${nd.key ? ' flow__text--key' : ''}`}
                >
                  {nd.lines.map((l, k) => (
                    <tspan key={l} x={nd.cx} dy={k === 0 ? 0 : 18}>
                      {l}
                    </tspan>
                  ))}
                </text>
              </g>
            ))}
            {plan.notes.map((nt) => (
              <text
                key={nt.lines.join()}
                x={nt.x}
                y={nt.y}
                textAnchor={nt.anchor ?? 'start'}
                className={`flow__note${nt.key ? ' flow__note--key' : ''}`}
              >
                {nt.lines.map((l, k) => (
                  <tspan key={l} x={nt.x} dy={k === 0 ? 0 : 20}>
                    {l}
                  </tspan>
                ))}
              </text>
            ))}
          </g>
        )
      })}
    </svg>
  )
}

const steps = {
  existing: [
    'Users complete eight separate family-member forms.',
    'The system uses that data to build the tree and surface record hints.',
    'Roughly four in ten leave before they reach any value.',
  ],
  proposed: [
    'User enters name, date of birth and location.',
    'System searches historical archives for their birth record.',
    'User sees and confirms a matching record. This is the first meaningful reward.',
    "System extracts the mother's name.",
    'User adds details about their mother.',
    'System suggests more records and grows the tree. The loop repeats for each generation.',
    'If no record is found, the user continues with manual entry.',
  ],
}

export function TreeAssistFlow() {
  const [mode, setMode] = useState<PlanMode>('proposed')
  return (
    <figure className="flow" data-mode={mode}>
      <div className="flow__bar">
        <ModeSwitch mode={mode} onChange={setMode} />
        <p className="flow__story" aria-live="polite">
          {mode === 'existing' ? (
            <>
              <strong>Before.</strong> Users worked before receiving value.
            </>
          ) : (
            <>
              <strong>After.</strong> The product delivered value first, so users invested progressively.
            </>
          )}
        </p>
      </div>
      <div className="flow__paper">
        <Svg orient="wide" layout={wide} mode={mode} />
        <Svg orient="tall" layout={tall} mode={mode} />
      </div>
      <ol className="visually-hidden">
        {steps[mode].map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
      <figcaption className="flow__outcome" data-show={mode === 'proposed'}>
        <span>Activation ↑</span>
        <span>Conversion ↑</span>
      </figcaption>
    </figure>
  )
}
