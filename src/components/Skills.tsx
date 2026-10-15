import type { ReactNode } from 'react'
import { SketchRect } from './Sketch'
import { principleDrawings } from './PrinciplePartis'
import { DrawOnScroll } from './DrawOnScroll'
import { useRef, type PointerEvent } from 'react'
import './Parti.css'
import './Skills.css'

// Core Expertise partis: one idea per discipline, each with its points listed underneath.

const P = { pathLength: 1 }

// Marketplace: demand on one side, supply on the other, balanced through one match point.
function MarketplaceParti() {
  const demand = [
    [16, 26],
    [26, 52],
    [12, 74],
    [30, 96],
  ]
  const supply = [
    [130, 22],
    [142, 48],
    [128, 72],
    [140, 98],
  ]
  return (
    <>
      {demand.map(([x, y]) => (
        <line key={`d${y}`} {...P} x1={x} y1={y} x2={80} y2={60} className="parti__fine" />
      ))}
      {supply.map(([x, y]) => (
        <line key={`s${y}`} {...P} x1={x} y1={y} x2={80} y2={60} className="parti__fine" />
      ))}
      {demand.map(([x, y]) => (
        <circle key={`dc${y}`} cx={x} cy={y} r={3.5} className="parti__dot" />
      ))}
      {supply.map(([x, y]) => (
        <rect key={`sr${y}`} x={x - 4} y={y - 4} width={8} height={8} className="parti__heavy" />
      ))}
      <circle {...P} cx={80} cy={60} r={9} className="parti__node" />
      <line {...P} x1={52} y1={112} x2={108} y2={112} className="parti__axis" />
      <path {...P} d="M80 112 V74" className="parti__heavy" />
    </>
  )
}

// Platform design: separate products held in one structure, one entrance, one axis.
function PlatformParti() {
  return (
    <>
      {[
        [34, 26],
        [86, 26],
        [34, 64],
        [86, 64],
      ].map(([x, y]) => (
        <SketchRect key={`${x}-${y}`} x={x} y={y} width={40} height={30} o={3} className="parti__ghost" />
      ))}
      <path {...P} d="M72 108 H22 V12 H138 V108 H88" className="parti__heavy" />
      <line {...P} x1={80} y1={118} x2={80} y2={20} className="parti__axis" />
    </>
  )
}

// Experimentation: loop after loop, each one a little further along than the last.
function ExperimentationParti() {
  const loops = [
    [34, 86, 12],
    [74, 64, 15],
    [118, 38, 18],
  ]
  return (
    <>
      <path {...P} d="M8 108 L150 14" className="parti__axis" />
      {loops.map(([cx, cy, r]) => (
        <path
          key={cx}
          {...P}
          d={`M${cx + r} ${cy} A${r} ${r} 0 1 1 ${cx + r * 0.7} ${cy - r * 0.7}`}
          className="parti__heavy"
        />
      ))}
      {loops.map(([cx, cy, r]) => (
        <path
          key={`a${cx}`}
          d={`M${cx + r * 0.7 - 5} ${cy - r * 0.7 - 2} L${cx + r * 0.7} ${cy - r * 0.7} L${cx + r * 0.7 + 1} ${cy - r * 0.7 + 5}`}
          className="parti__heavy"
        />
      ))}
    </>
  )
}

// End-to-end UX and UI: discovery to release, screen by screen, along one blue line.
function EndToEndParti() {
  return (
    <>
      {[12, 62, 112].map((x) => (
        <SketchRect key={x} x={x} y={22} width={36} height={52} o={2} className="parti__heavy" />
      ))}
      {[12, 62, 112].map((x) => (
        <path
          key={`c${x}`}
          {...P}
          d={`M${x + 6} 34 H${x + 30} M${x + 6} 44 H${x + 24} M${x + 6} 62 H${x + 20}`}
          className="parti__fine"
        />
      ))}
      <path {...P} d="M48 48 H62 M98 48 H112" className="parti__fine" />
      <path {...P} d="M12 98 H148" className="parti__key" />
      <path d="M12 92 V104 M142 92 L148 98 L142 104" className="parti__key" />
    </>
  )
}

// Design systems: one source token in blue, carried into every component built from it.
function DesignSystemParti() {
  const tiles = [
    [72, 14],
    [118, 14],
    [26, 56],
    [72, 56],
    [118, 56],
    [26, 98],
    [72, 98],
    [118, 98],
  ]
  return (
    <>
      {tiles.map(([x, y]) => (
        <line key={`l${x}-${y}`} {...P} x1={40} y1={26} x2={x + 8} y2={y + 4} className="parti__fine" />
      ))}
      <rect x={26} y={12} width={28} height={28} className="parti__key" fill="none" />
      {tiles.map(([x, y], i) =>
        i % 3 === 0 ? (
          <circle key={`${x}-${y}`} {...P} cx={x + 8} cy={y + 4} r={7} className="parti__heavy" />
        ) : i % 3 === 1 ? (
          <rect key={`${x}-${y}`} {...P} x={x} y={y - 3} width={16} height={14} className="parti__heavy" />
        ) : (
          <rect key={`${x}-${y}`} {...P} x={x - 4} y={y} width={24} height={8} rx={4} className="parti__heavy" />
        ),
      )}
    </>
  )
}

interface Skill {
  title: string
  drawing: () => ReactNode
  points: string[]
  onScroll?: boolean // draws in with the scroll; the rest redraw when hovered
}

const skills: Skill[] = [
  {
    title: 'Marketplaces',
    drawing: MarketplaceParti,
    points: ['Supply and demand optimisation', 'Improving match rate', 'Two-sided journeys'],
  },
  {
    title: 'Platform design',
    drawing: PlatformParti,
    points: ['Feature consolidation', 'Information architecture and navigation', 'User research'],
  },
  {
    title: 'Experimentation',
    drawing: ExperimentationParti,
    onScroll: true,
    points: ['Iterative A/B experiments', 'Conversion and time to value', 'B2C onboarding'],
  },
  {
    title: 'Systems thinking',
    drawing: principleDrawings['0'],
    points: ['Workflow and touchpoint mapping', 'Design across business departments', 'Automating manual operations'],
  },
  {
    title: 'Growth and monetisation',
    drawing: principleDrawings['4'],
    onScroll: true,
    points: ['Pricing and revenue models', 'Conversion and retention experiments', 'Marketplace health'],
  },
  {
    title: 'User research and analysis',
    drawing: principleDrawings['3'],
    points: ['User interviews and focus groups', 'Behavioural and funnel analysis', 'Continuous research programmes'],
  },
  {
    title: 'End-to-end UX & UI design',
    drawing: EndToEndParti,
    points: ['Discovery through to release', 'Journeys, flows and wireframes', 'High-fidelity UI and prototypes'],
  },
  {
    title: 'Design systems and documentation',
    drawing: DesignSystemParti,
    points: ['Components and tokens', 'Usage guidelines', 'Specs and engineering handover'],
  },
]

// Redraws a drawing line by line when the pointer enters it. Uses the Web Animations API
// rather than a CSS :hover rule, which Chrome does not reliably restyle on SVG children.
function HoverParti({ children }: { children: ReactNode }) {
  const ref = useRef<SVGSVGElement>(null)
  const redraw = (e: PointerEvent) => {
    const svg = ref.current
    if (!svg || e.pointerType === 'touch') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    svg.querySelectorAll<SVGElement>('[pathLength]').forEach((el, i) => {
      el.style.strokeDasharray = '1'
      el.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], {
        duration: 700,
        delay: i * 40,
        easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)',
        fill: 'backwards',
      })
    })
    svg.querySelectorAll<SVGElement>('.draw-late').forEach((el) => {
      el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, delay: 500, fill: 'backwards' })
    })
  }
  return (
    <svg ref={ref} className="parti skill__parti" viewBox="0 0 160 120" aria-hidden="true" onPointerEnter={redraw}>
      {children}
    </svg>
  )
}

export function Skills() {
  return (
    <section className="skills-block" aria-labelledby="core-expertise">
      <h2 id="core-expertise" className="label skills__heading">
        Core Expertise
      </h2>
      <ul className="skills">
        {skills.map((s) => {
          const Drawing = s.drawing
          return (
            <li key={s.title} className="skill">
              {s.onScroll ? (
                <DrawOnScroll viewBox="0 0 160 120" className="skill__parti">
                  <Drawing />
                </DrawOnScroll>
              ) : (
                <HoverParti>
                  <Drawing />
                </HoverParti>
              )}
              <h3 className="skill__title">{s.title}</h3>
              <ul className="skill__points">
                {s.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
