import type { ReactNode } from 'react'
import { SketchRect } from './Sketch'
import { principleDrawings } from './PrinciplePartis'
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

interface Skill {
  title: string
  drawing: () => ReactNode
  points: string[]
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
    points: ['Iterative A/B experiments', 'Conversion and time to value', 'B2C onboarding'],
  },
  {
    title: 'Systems thinking',
    drawing: principleDrawings['0'],
    points: ['Workflow and touchpoint mapping', 'Design across business departments', 'Automating manual operations'],
  },
  {
    title: 'Commercial sense',
    drawing: principleDrawings['1'],
    points: ['Revenue and retention as design constraints', 'Monetisation models', 'Marketplace health'],
  },
  {
    title: 'Facilitation',
    drawing: principleDrawings['2'],
    points: ['Customer focus groups', 'Leadership alignment', 'Cross-functional planning'],
  },
  {
    title: 'Research → vision',
    drawing: principleDrawings['3'],
    points: ['User interviews', 'Continuous research programmes', 'Hypotheses that shape the roadmap'],
  },
  {
    title: 'Data-led decisions',
    drawing: principleDrawings['4'],
    points: ['Behavioural analysis', 'Honest experiment readouts', 'Changing course on evidence'],
  },
]

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
            // tabIndex lets keyboard users reveal the skills the same way hover does
            <li key={s.title} className="skill" tabIndex={0}>
              <svg className="parti skill__parti" viewBox="0 0 160 120" aria-hidden="true">
                <Drawing />
              </svg>
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
