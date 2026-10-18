import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { systemsLayouts, type Layout, type Pt } from './systemsLayout'
import './Parti.css'
import './SystemsDiagram.css'

// How I work, drawn as a systems diagram. It begins as a slightly chaotic tangle: six inputs, extra
// steps, a bottleneck, an orphaned feature. It then reroutes, untangles and resolves, one input at
// a time, into three connected outcomes, and gently drifts back so the loop never restarts.
// Everything is computed from one clock, so the paths genuinely morph instead of cross-fading.

const INK = [28, 27, 25] as const
const GRAPHITE = [97, 94, 88] as const
const MARKER = [47, 95, 179] as const

const CYCLE = 26 // seconds per loop
const CALM = 0.5 // how much of the ambient wobble, pulse and bobbing is kept
const INTRO = 4.2 // seconds to sketch the first draw
const START = 2.2 // chaos is shown for a moment before the first untangling

const inputs = [
  'Frustrated users',
  'Confusing user journeys',
  'Business goals and KPIs',
  'Stakeholder expectations',
  'Technical constraints',
  'Data and research insights',
]
const moments = [
  'Connecting the dots',
  'Finding patterns',
  'Prioritising',
  'Simplifying journeys',
  'Making trade-offs',
  'Designing & testing',
]
const bubbleText = [
  ['ugh. where do', 'I even start?'],
  ['wait... these', 'connect.'],
  ['balanced.', 'ship it.'],
]

const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const sstep = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a))
  return t * t * (3 - 2 * t)
}
const lerpPt = (a: Pt, b: Pt, t: number): Pt => [lerp(a[0], b[0], t), lerp(a[1], b[1], t)]
const add = (a: Pt, b: Pt): Pt => [a[0] + b[0], a[1] + b[1]]
const mix = (a: readonly number[], b: readonly number[], t: number) =>
  `rgb(${a.map((v, i) => Math.round(lerp(v, b[i], t))).join(' ')})`
const f = (n: number) => Math.round(n * 10) / 10
const bez = (p: Pt, c1: Pt, c2: Pt, q: Pt, t: number): Pt => {
  const u = 1 - t
  return [
    u * u * u * p[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * q[0],
    u * u * u * p[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * q[1],
  ]
}
const cubic = (p: Pt, c1: Pt, c2: Pt, q: Pt) =>
  `M${f(p[0])} ${f(p[1])} C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(q[0])} ${f(q[1])}`
const draw = (d: number): CSSProperties => ({ strokeDasharray: 1, strokeDashoffset: 1 - clamp(d) })
const P1 = { pathLength: 1 }

// The state of the drawing at one moment.
function timeline(clock: number, still: boolean) {
  const intro = still ? 1 : clamp(clock / INTRO)
  const u = still ? 0.62 : (Math.max(0, clock - START) / CYCLE) % 1
  const up = sstep(0.04, 0.5, u)
  const down = sstep(0.8, 0.98, u)
  const t = up * (1 - down)
  return { intro, u, t, clock: still ? 0 : clock }
}

function Chevron({
  at: p,
  dir,
  size = 5,
  ...rest
}: {
  at: Pt
  dir: Pt
  size?: number
  className?: string
  style?: CSSProperties
}) {
  const len = Math.hypot(dir[0], dir[1]) || 1
  const [dx, dy] = [dir[0] / len, dir[1] / len]
  const [nx, ny] = [-dy, dx]
  return (
    <path
      {...rest}
      d={`M${f(p[0] - dx * size + nx * size * 0.8)} ${f(p[1] - dy * size + ny * size * 0.8)} L${f(p[0])} ${f(p[1])} L${f(p[0] - dx * size - nx * size * 0.8)} ${f(p[1] - dy * size - ny * size * 0.8)}`}
    />
  )
}

// The small drawings along the process line. `a` is how much of each is drawn; `tone` its colour.
function Moment({ k, a, tone }: { k: number; a: number; tone: 'idle' | 'active' | 'done' }) {
  const color = tone === 'active' ? 'var(--marker)' : tone === 'done' ? 'var(--ink)' : 'var(--graphite)'
  const style: CSSProperties = { stroke: color, opacity: tone === 'idle' ? 0.55 : 1 }
  const g = (children: ReactNode) => (
    <g className="sysmap__moment" style={style}>
      {children}
    </g>
  )
  switch (k) {
    case 0:
      return g(
        <>
          {[
            [-24, 10],
            [0, -10],
            [24, 8],
          ].map(([x, y]) => (
            <circle key={x} cx={x} cy={y} r={3.5} style={{ fill: color }} />
          ))}
          <path d="M-24 10 L0 -10 L24 8" strokeDasharray="3 4" opacity={0.7} />
          <path {...P1} d="M-24 10 L0 -10 L24 8" style={draw(a)} />
        </>,
      )
    case 1:
      return g(
        <>
          {[
            [-26, -4],
            [-12, 10],
            [4, -8],
            [20, 8],
            [30, -6],
          ].map(([x, y]) => (
            <circle key={x} cx={x} cy={y} r={3} style={{ fill: color }} />
          ))}
          <ellipse {...P1} cx={-10} cy={0} rx={24} ry={16} transform="rotate(-18 -10 0)" style={draw(a)} />
        </>,
      )
    case 2:
      return g(
        <>
          {[
            [-12, 44],
            [0, 30],
            [12, 18],
          ].map(([y, w], i) => (
            <g key={y}>
              <path {...P1} d={`M-6 ${y} h${w}`} style={{ ...draw(a * 3 - i), strokeWidth: i === 0 ? 3 : 1.8 }} />
              <text
                x={-20}
                y={y + 4}
                className="sysmap__tiny"
                style={{ opacity: clamp(a * 3 - i + 0.2), stroke: 'none', fill: color }}
              >
                {i + 1}
              </text>
            </g>
          ))}
        </>,
      )
    case 3:
      return g(
        <>
          <path d="M-30 -9 C-18 -23 -8 9 2 -7 C10 -19 18 3 30 -9" strokeDasharray="2 3" opacity={0.7} />
          <path {...P1} d="M-30 12 H30 M24 7 L30 12 L24 17" style={draw(a)} />
          <path {...P1} d="M-6 -17 L6 -3 M6 -17 L-6 -3" style={draw(a * 2 - 0.6)} />
        </>,
      )
    case 4: {
      const angle = lerp(-14, 0, a)
      return g(
        <>
          <path d="M0 6 L-9 19 H9 Z" />
          <g transform={`rotate(${f(angle)} 0 4)`}>
            <path d="M-30 4 H30" />
            <circle cx={-26} cy={-3} r={lerp(7, 5, a)} />
            <circle cx={26} cy={-1} r={lerp(3.5, 5, a)} />
          </g>
        </>,
      )
    }
    default:
      return g(
        <>
          <rect x={-28} y={-16} width={36} height={32} />
          <path d="M-22 -7 H2 M-22 1 H-8 M-22 9 H-14" opacity={0.7} />
          <path
            {...P1}
            d="M10 6 L17 14 L31 -8"
            style={{ ...draw(a), strokeWidth: 2.4, stroke: tone === 'idle' ? color : 'var(--marker)' }}
          />
        </>,
      )
  }
}

// The little glyph inside each outcome: a smile, a rising arrow, a tick.
function Glyph({ k, r, a }: { k: number; r: number; a: number }) {
  const s = r / 27
  const style = { stroke: 'var(--marker)', strokeWidth: 2.2 }
  return (
    <g transform={`scale(${s})`} style={{ opacity: a }}>
      {k === 0 && (
        <>
          <circle cx={-8} cy={-6} r={2.2} style={{ fill: 'var(--marker)', stroke: 'none' }} />
          <circle cx={8} cy={-6} r={2.2} style={{ fill: 'var(--marker)', stroke: 'none' }} />
          <path d="M-11 5 C-6 14 6 14 11 5" style={style} />
        </>
      )}
      {k === 1 && <path d="M-11 9 L11 -9 M0 -9 H11 V2" style={style} />}
      {k === 2 && <path d="M-11 1 L-3 9 L12 -9" style={style} />}
    </g>
  )
}

function Diagram({ L, clock, still }: { L: Layout; clock: number; still: boolean }) {
  const { intro, u, t, clock: raw } = timeline(clock, still)
  const c = raw * CALM // ambient motion runs at half speed
  const [vw, vh] = L.vb
  const fl = L.flow
  const lap = L.laptop
  const sx = lap.cx - lap.w / 2
  const sy = lap.cy - lap.h / 2

  // Intro stages: inputs, then the laptop, then outcomes, then the process line.
  const sIn = (i: number) => sstep(i * 0.04, 0.3 + i * 0.04, intro)
  const sLap = sstep(0.28, 0.48, intro)
  const sOut = sstep(0.5, 0.78, intro)
  const sMom = (i: number) => sstep(0.62 + i * 0.05, 0.84 + i * 0.05, intro)

  // Each input settles in turn.
  const e = inputs.map((_, i) => sstep(i * 0.06, i * 0.06 + 0.6, t))
  const nodes = L.nodes.map((n, i) => {
    const amp = L.jitter * CALM * (0.25 + (1 - e[i]) * 0.9)
    const j: Pt = [Math.sin(c * 0.9 + i * 1.7) * amp, Math.cos(c * 0.7 + i * 2.3) * amp]
    return add(lerpPt(n.chaos, n.order, e[i]), j)
  })
  const ports = L.ports.map((p, i) => lerpPt(L.gate, p, e[i]))
  const paths = L.nodes.map((n, i) => {
    const wob = (1 - e[i]) * 10 * CALM
    const w: Pt = [Math.sin(c * 0.8 + i) * wob, Math.cos(c * 0.6 + i * 1.3) * wob]
    const c1 = lerpPt(add(nodes[i], add(n.off1, w)), add(nodes[i], [fl[0] * L.k, fl[1] * L.k]), e[i])
    const c2 = lerpPt(add(ports[i], add(n.off2, [-w[0], -w[1]])), add(ports[i], [-fl[0] * L.k, -fl[1] * L.k]), e[i])
    return { p: nodes[i], c1, c2, q: ports[i] }
  })

  // Process moments, lit in turn as the system untangles.
  const mState = moments.map((_, k) => {
    const w0 = 0.06 + k * 0.07
    const relax = 1 - sstep(0.8, 0.95, u)
    if (u < w0) return { a: 0, tone: 'idle' as const, pulse: 0 }
    if (u < w0 + 0.07) {
      const a = (u - w0) / 0.07
      return { a, tone: 'active' as const, pulse: Math.sin(Math.PI * a) }
    }
    return { a: relax, tone: relax > 0.5 ? ('done' as const) : ('idle' as const), pulse: 0 }
  })

  // Outcomes and the balance between them.
  const oIn = sstep(0.5, 0.82, t)
  const edge = sstep(0.62, 0.92, t)
  const edgeLabel = clamp(edge * 1.4 - 0.4)
  const outs = L.outcomes
  const outPaths = outs.map((o, i) => {
    const start = L.out
    const end = o.end
    return {
      d: cubic(start, add(start, [fl[0] * L.k, fl[1] * L.k]), add(end, [-fl[0] * L.k, -fl[1] * L.k]), end),
      draw: sstep(0.3 + i * 0.07, 0.72 + i * 0.07, t),
    }
  })

  // The face on the laptop.
  const fx = lap.cx
  const fy = lap.cy + 2
  const worry = (1 - t) * (0.6 + 0.4 * Math.sin(c * 2.1))
  const mouthA = lerp(7, 10, t)
  const mouthB = lerp(-7, 10, t)
  const stage = t < 0.22 ? 0 : t < 0.78 ? 1 : 2
  const blink = (c * 0.37) % 1 > 0.965 ? 0.2 : 1

  // The orphaned feature joins the system.
  const eo = sstep(0.35, 0.85, t)
  const orphan = add(lerpPt(L.orphan.chaos, L.orphan.order, eo), [
    Math.sin(c * 0.8 + 4) * L.jitter * CALM * (1 - eo) * 0.8,
    Math.cos(c * 0.9 + 1) * L.jitter * CALM * (1 - eo) * 0.8,
  ])
  const link = sstep(0.5, 0.86, t)
  const linkEnd = lerpPt(orphan, nodes[5], link)

  const mid13 = lerpPt(nodes[1], nodes[3], 0.5)

  return (
    <svg className="sysmap__svg" viewBox={`0 0 ${vw} ${vh}`} aria-hidden="true">
      <text className="sysmap__cap sysmap__title" x={L.caps.mess[0]} y={L.caps.mess[1]} style={{ opacity: sIn(0) }}>
        The messy reality
      </text>

      {/* Competing priorities and the bottleneck, fading as things settle */}
      <g style={{ opacity: (1 - sstep(0.1, 0.5, t)) * sIn(2) }}>
        <g transform={`translate(${f(mid13[0] + 18)} ${f(mid13[1])})`}>
          <path d="M-14 0 H14 M-14 0 l5 -4 M-14 0 l5 4 M14 0 l-5 -4 M14 0 l-5 4" className="parti__fine" />
          <text className="sysmap__note" x={20} y={4}>
            competing priorities
          </text>
        </g>
        <text className="sysmap__note" x={L.bottleneck.text[0]} y={L.bottleneck.text[1]}>
          bottleneck
        </text>
        <path d={L.bottleneck.arrow} className="parti__fine" />
      </g>

      {/* Inputs: the paths, in graphite while tangled and cobalt once they are clear */}
      {paths.map((p, i) => {
        const end = [p.q[0] - p.c2[0], p.q[1] - p.c2[1]] as Pt
        return (
          <g key={inputs[i]}>
            <path
              {...P1}
              d={cubic(p.p, p.c1, p.c2, p.q)}
              style={{
                ...draw(sIn(i)),
                stroke: mix(GRAPHITE, MARKER, e[i]),
                strokeWidth: lerp(0.9, 1.9, e[i]),
                opacity: lerp(0.8, 1, e[i]),
              }}
            />
            <Chevron
              at={p.q}
              dir={end}
              style={{ stroke: mix(GRAPHITE, MARKER, e[i]), opacity: e[i] * sIn(i), strokeWidth: 1.6 }}
            />
          </g>
        )
      })}

      {/* Extra steps that quietly disappear */}
      {[1, 3, 4].map((i, n) => {
        const p = paths[i]
        const at = bez(p.p, p.c1, p.c2, p.q, 0.5)
        const o = (1 - sstep(0.15, 0.55, e[i])) * sIn(i)
        return (
          <g key={i} transform={`translate(${f(at[0])} ${f(at[1])}) scale(${f(0.4 + 0.6 * o)})`} style={{ opacity: o }}>
            <circle r={7} className="sysmap__node" />
            <path d="M-3 -3 L3 3 M3 -3 L-3 3" className="parti__fine" style={{ strokeWidth: 1.3 }} />
            <text className="sysmap__note" x={10} y={-8}>
              {['extra step', 'dead end', '???'][n]}
            </text>
          </g>
        )
      })}

      {/* The orphan, left out until it is connected */}
      <g style={{ opacity: sIn(5) }}>
        <path
          d={`M${f(orphan[0])} ${f(orphan[1])} L${f(linkEnd[0])} ${f(linkEnd[1])}`}
          className="parti__fine"
          style={{
            strokeDasharray: link < 0.98 ? '3 4' : undefined,
            stroke: mix(GRAPHITE, MARKER, link),
            strokeWidth: lerp(0.9, 1.6, link),
          }}
        />
        <circle
          cx={orphan[0]}
          cy={orphan[1]}
          r={L.nodeR}
          className="sysmap__node"
          style={{ strokeDasharray: link < 0.98 ? '2 3' : undefined }}
        />
        <text className="sysmap__note" x={orphan[0] + 11} y={orphan[1] + 4} style={{ opacity: 1 - link }}>
          orphan feature... who owns this?
        </text>
      </g>

      {/* Input nodes and their labels */}
      {nodes.map((n, i) => {
        const pulse = 1 + mState[i].pulse * 0.6 * CALM
        return (
          <g key={inputs[i]} style={{ opacity: sIn(i) }}>
            <circle
              cx={n[0]}
              cy={n[1]}
              r={L.nodeR * pulse}
              className="sysmap__node"
              style={{ stroke: mState[i].pulse > 0.05 ? 'var(--marker)' : undefined }}
            />
            <text className="sysmap__label" x={n[0] + L.label[0]} y={n[1] + L.label[1]} textAnchor={L.label[2]}>
              {inputs[i]}
            </text>
          </g>
        )
      })}

      {/* Me, at the centre */}
      <g style={{ opacity: sLap }}>
        <rect x={sx} y={sy} width={lap.w} height={lap.h} rx={3} className="sysmap__laptop" />
        <path
          d={`M${f(sx - 14)} ${f(sy + lap.h + 8)} H${f(sx + lap.w + 14)} L${f(sx + lap.w + 4)} ${f(sy + lap.h + 22)} H${f(sx + 10)} Z`}
          className="sysmap__laptop"
        />
        {/* the face: brows, eyes, a mouth that goes from a wobble to a smile */}
        <g className="sysmap__face">
          <path d={`M${f(fx - 26)} ${f(fy - 13 - worry * 1)} L${f(fx - 10)} ${f(fy - 13 - 6 * worry)}`} />
          <path d={`M${f(fx + 26)} ${f(fy - 13 - worry * 1)} L${f(fx + 10)} ${f(fy - 13 - 6 * worry)}`} />
          <ellipse cx={fx - 17} cy={fy - 4} rx={2.6} ry={2.6 * blink} className="sysmap__eye" />
          <ellipse cx={fx + 17} cy={fy - 4} rx={2.6} ry={2.6 * blink} className="sysmap__eye" />
          <path
            d={`M${f(fx - 17)} ${f(fy + 12)} C${f(fx - 8)} ${f(fy + 12 + mouthA)} ${f(fx + 8)} ${f(fy + 12 + mouthB)} ${f(fx + 17)} ${f(fy + 12)}`}
            style={{ stroke: mix(INK, MARKER, t) }}
          />
          <path
            d={`M${f(fx + 34)} ${f(fy - 28)} q-4 7 0 10 q4 -3 0 -10`}
            className="sysmap__sweat"
            style={{ opacity: clamp(1 - t * 2), transform: `translateY(${f(Math.sin(c * 3) * 1.5 * CALM)}px)` }}
          />
        </g>
        {[
          [-14, -12, 5],
          [18, -26, 7],
          [50, -16, 4],
        ].map(([dx, dy, s], i) => (
          <path
            key={i}
            d={`M${f(sx + dx)} ${f(sy + dy - s)} v${s * 2} M${f(sx + dx - s)} ${f(sy + dy)} h${s * 2}`}
            className="sysmap__spark"
            style={{ opacity: sstep(0.85, 1, t) * (0.55 + 0.45 * Math.sin(c * 3 + i * 2)) }}
          />
        ))}
        <text className="sysmap__me" x={lap.cx} y={sy + lap.h + L.meDy} textAnchor="middle">
          Me, figuring things out
        </text>
        {/* a thought bubble that changes its mind */}
        <g style={{ opacity: sLap }}>
          <path
            d={`M${L.bubble.x} ${L.bubble.y + 6} Q${L.bubble.x} ${L.bubble.y} ${L.bubble.x + 6} ${L.bubble.y} H${L.bubble.x + L.bubble.w - 6} Q${L.bubble.x + L.bubble.w} ${L.bubble.y} ${L.bubble.x + L.bubble.w} ${L.bubble.y + 6} V${L.bubble.y + L.bubble.h - 6} Q${L.bubble.x + L.bubble.w} ${L.bubble.y + L.bubble.h} ${L.bubble.x + L.bubble.w - 6} ${L.bubble.y + L.bubble.h} H${L.bubble.x + 6} Q${L.bubble.x} ${L.bubble.y + L.bubble.h} ${L.bubble.x} ${L.bubble.y + L.bubble.h - 6} Z M${L.bubble.tail[0][0]} ${L.bubble.tail[0][1]} L${L.bubble.tail[1][0]} ${L.bubble.tail[1][1]} L${L.bubble.tail[2][0]} ${L.bubble.tail[2][1]}`}
            className="sysmap__bubble"
          />
          {bubbleText.map((lines, s) => (
            <text
              key={s}
              className="sysmap__note sysmap__note--ink"
              x={L.bubble.x + L.bubble.w / 2}
              textAnchor="middle"
              style={{ opacity: stage === s ? 1 : 0, transition: 'opacity 500ms ease' }}
            >
              <tspan x={L.bubble.x + L.bubble.w / 2} y={L.bubble.y + 15}>
                {lines[0]}
              </tspan>
              <tspan x={L.bubble.x + L.bubble.w / 2} y={L.bubble.y + 29}>
                {lines[1]}
              </tspan>
            </text>
          ))}
        </g>
      </g>

      {/* Clean pathways out, and the three outcomes holding each other up */}
      {outPaths.map((o, i) => (
        <g key={i}>
          <path {...P1} d={o.d} className="sysmap__out" style={draw(o.draw * sOut)} />
          <Chevron at={outs[i].end} dir={L.flow} className="sysmap__out" style={{ opacity: o.draw > 0.97 ? 1 : 0 }} />
        </g>
      ))}
      {[
        [0, 1, 'worth it'],
        [1, 2, 'doable'],
        [2, 0, 'wanted'],
      ].map(([a, b, label], i) => {
        const A = outs[a as number].pos
        const B = outs[b as number].pos
        const d = Math.hypot(B[0] - A[0], B[1] - A[1])
        const ux = (B[0] - A[0]) / d
        const uy = (B[1] - A[1]) / d
        const r = L.outR + 4
        const p0: Pt = [A[0] + ux * r, A[1] + uy * r]
        const p1: Pt = [B[0] - ux * r, B[1] - uy * r]
        const mid = lerpPt(p0, p1, 0.5)
        const lp = L.edgeLabels[i]
        return (
          <g key={i}>
            <path
              {...P1}
              d={`M${f(p0[0])} ${f(p0[1])} L${f(p1[0])} ${f(p1[1])}`}
              className="sysmap__out"
              style={draw(edge * sOut)}
            />
            <text
              className="sysmap__note sysmap__note--key"
              x={mid[0] + lp[0]}
              y={mid[1] + lp[1]}
              textAnchor={lp[2]}
              style={{ opacity: edgeLabel * sOut }}
            >
              {label}
            </text>
          </g>
        )
      })}
      <text
        className="sysmap__note sysmap__note--key"
        x={L.balance[0]}
        y={L.balance[1]}
        textAnchor="middle"
        style={{ opacity: edgeLabel * sOut }}
      >
        balanced
      </text>
      {outs.map((o, i) => (
        <g key={o.label} style={{ opacity: sOut }}>
          <g transform={`translate(${o.pos[0]} ${o.pos[1]}) scale(${f(lerp(0.9, 1, oIn))})`}>
            <circle
              r={L.outR}
              className="sysmap__outcome"
              style={{ strokeDasharray: oIn < 0.5 ? '3 4' : undefined, opacity: lerp(0.55, 1, oIn) }}
            />
            <text className="sysmap__q" y={6} textAnchor="middle" style={{ opacity: 1 - sstep(0.3, 0.6, t) }}>
              ?
            </text>
            <Glyph k={i} r={L.outR} a={sstep(0.45, 0.8, t)} />
          </g>
          <text className="sysmap__out-name" x={o.label_at[0]} y={o.label_at[1]} textAnchor={o.anchor}>
            {o.label}
          </text>
          {o.sub.map((line, n) => (
            <text
              key={line}
              className="sysmap__sub"
              x={o.label_at[0]}
              y={o.label_at[1] + 15 + n * 13.5}
              textAnchor={o.anchor}
            >
              {line}
            </text>
          ))}
        </g>
      ))}

      {/* My process, as a dimension line with six little moments */}
      <text className="sysmap__cap" x={L.caps.process[0]} y={L.caps.process[1]} style={{ opacity: sMom(0) }}>
        My process
      </text>
      <path
        {...P1}
        d={`M${L.procLine[0]} ${L.procLine[2]} H${L.procLine[1]} M${L.procLine[0] - 4} ${L.procLine[2] + 4} l8 -8 M${L.procLine[1] - 4} ${L.procLine[2] + 4} l8 -8`}
        className="parti__heavy sysmap__rule"
        style={draw(sMom(0))}
      />
      {L.moments.map((p, k) => (
        <g
          key={moments[k]}
          transform={`translate(${p[0]} ${p[1]}) scale(${L.momentScale})`}
          style={{ opacity: sMom(k) }}
        >
          <Moment k={k} a={mState[k].a} tone={mState[k].tone} />
          <text
            className="sysmap__label sysmap__label--moment"
            y={36}
            textAnchor="middle"
            style={{
              fill: mState[k].tone === 'active' ? 'var(--marker)' : undefined,
              opacity: mState[k].tone === 'idle' ? 0.6 : 1,
            }}
          >
            {moments[k]}
          </text>
        </g>
      ))}
      {/* drawn last so its paper halo clears any line passing behind it */}
      <text
        className="sysmap__cap sysmap__cap--key sysmap__title"
        x={L.caps.end[0]}
        y={L.caps.end[1]}
        textAnchor={L.caps.endAnchor}
        style={{ opacity: sOut }}
      >
        The happy ending
      </text>
    </svg>
  )
}

export function SystemsDiagram() {
  const ref = useRef<HTMLElement>(null)
  const [layoutKey, setLayoutKey] = useState<'wide' | 'tall'>('wide')
  const [still, setStill] = useState(true) // the resolved drawing, until we know motion is welcome
  const [clock, setClock] = useState(0)
  const started = useRef(false)
  const visible = useRef(false)
  const last = useRef(0)
  const frame = useRef(0)
  const time = useRef(0)

  useEffect(() => {
    const wide = window.matchMedia('(min-width: 760px)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setLayoutKey(wide.matches ? 'wide' : 'tall')
    sync()
    wide.addEventListener('change', sync)
    if (reduced.matches) return () => wide.removeEventListener('change', sync)

    const el = ref.current
    const tick = (now: number) => {
      frame.current = 0
      if (!visible.current) return
      const dt = last.current ? Math.min(0.1, (now - last.current) / 1000) : 0
      last.current = now
      time.current += dt
      setClock(time.current)
      frame.current = requestAnimationFrame(tick)
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting
        if (entry.isIntersecting) {
          if (!started.current) {
            started.current = true
            time.current = 0
            setStill(false)
          }
          last.current = 0
          if (!frame.current) frame.current = requestAnimationFrame(tick)
        }
      },
      { threshold: 0.15 },
    )
    if (el) io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(frame.current)
      wide.removeEventListener('change', sync)
    }
  }, [])

  return (
    <figure className="sysmap" ref={ref}>
      <Diagram L={systemsLayouts[layoutKey]} clock={clock} still={still} />
      <p className="visually-hidden">
        A diagram of how I work. On the left, the messy reality: frustrated users, confusing user journeys, business
        goals and KPIs, stakeholder expectations, technical constraints, and data and research insights, tangled
        together with extra steps, bottlenecks, competing priorities and an orphaned feature. In the middle, me at a
        laptop, figuring things out through six moments: connecting the dots, finding patterns, prioritising,
        simplifying journeys, making trade-offs, and designing and testing. The tangle resolves into three connected
        outcomes: happy users, with simpler journeys and less friction; a happy business, with stronger conversion,
        retention, revenue and growth; and happy stakeholders, with aligned priorities, clear direction and things
        actually shipped. Good product design balances what users want, what is worth it for the business, and what is
        feasible to build.
      </p>
    </figure>
  )
}
