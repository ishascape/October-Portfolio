import type { ReactNode } from 'react'
import { SketchRect } from './Sketch'
import { principleDrawings } from './PrinciplePartis'
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent, type Ref } from 'react'
import './Parti.css'
import './Skills.css'

// Core Expertise partis: one idea per discipline, with where it has been proven underneath.

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
      <circle {...P} cx={80} cy={60} r={9} className="parti__node" data-h="match" />
      <line {...P} x1={52} y1={112} x2={108} y2={112} className="parti__axis" data-h="base" />
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
        <SketchRect
          key={`${x}-${y}`}
          x={x}
          y={y}
          width={40}
          height={30}
          o={3}
          className="parti__ghost"
          data-h={x > 60 ? 'right' : undefined}
        />
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
      {loops.map(([cx, cy, r], n) => (
        <path
          key={cx}
          {...P}
          d={`M${cx + r} ${cy} A${r} ${r} 0 1 1 ${cx + r * 0.7} ${cy - r * 0.7}`}
          className="parti__heavy"
          data-h={n === 2 ? 'lead' : undefined}
        />
      ))}
      {loops.map(([cx, cy, r], n) => (
        <path
          key={`a${cx}`}
          data-h={n === 2 ? 'lead' : undefined}
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
      <path {...P} d="M12 98 H148" className="parti__key" data-h="line" />
      <path d="M12 92 V104 M142 92 L148 98 L142 104" className="parti__key" data-h="tip" />
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
      <rect x={26} y={12} width={28} height={28} className="parti__key" fill="none" data-h="source" />
      {tiles.map(([x, y], i) =>
        i % 3 === 0 ? (
          <circle
            key={`${x}-${y}`}
            {...P}
            cx={x + 8}
            cy={y + 4}
            r={7}
            className="parti__heavy"
            data-h={i === 0 ? 'tile' : undefined}
          />
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
  text: string
  hover: Nudge[] // the one or two parts of the drawing that move on hover
}

// A hover microinteraction: a [data-h] part of the drawing eases a few pixels, then eases back.
// Origins are "fill-box" so scaling happens around the part itself.
interface Nudge {
  h: string
  to: string // CSS transform at the end of the move
  origin?: string
}

const skills: Skill[] = [
  {
    title: 'Product strategy & systems thinking',
    drawing: principleDrawings['0'],
    text: "Connecting user journeys to the bigger product ecosystem. Helped shape HeadBox's One Platform initiative, bringing fragmented marketplace and SaaS experiences into a more connected system.",
    hover: [{ h: 'user', to: 'translateY(6px)' }],
  },
  {
    title: 'B2B SaaS & platform design',
    drawing: PlatformParti,
    text: "Turning complex operational workflows into simpler, scalable products. Redesigned HeadBox's HostHQ platform, bringing four separate host tools into one.",
    hover: [{ h: 'right', to: 'translateX(-6px)' }],
  },
  {
    title: 'Marketplaces',
    drawing: MarketplaceParti,
    text: 'Designing for both sides of the marketplace, from supplier workflows to buyer conversion. At HeadBox, improved the venue discovery journey, contributing to a 30% increase in qualified leads.',
    hover: [
      { h: 'match', to: 'scale(1.25)' },
      { h: 'base', to: 'scaleX(1.12)' },
    ],
  },
  {
    title: 'Growth & monetisation',
    drawing: principleDrawings['4'],
    text: 'Designing experiences that deliver customer value and commercial returns. At Findmypast, worked across acquisition, retention and gifting, including a Gift Subscription MVP worth approximately £500k.',
    hover: [
      { h: 'turn', to: 'scale(1.2)' },
      { h: 'forecast', to: 'translate(2px, -3px)' },
    ],
  },
  {
    title: 'Experimentation & optimisation',
    drawing: ExperimentationParti,
    text: 'Using behavioural data and experimentation to find and remove friction. At Findmypast, helped increase free-trial conversion 5× through improvements to the onboarding journey.',
    hover: [{ h: 'lead', to: 'translate(5px, -3.5px)' }],
  },
  {
    title: 'User research & analytics',
    drawing: principleDrawings['3'],
    text: "Combining customer insight with product data to challenge assumptions and identify opportunities. Used research and funnel analysis to rethink HeadBox's AI Venue Finder after identifying friction in its initial experience.",
    hover: [
      { h: 'direction', to: 'translateX(5px)' },
      { h: 'lens', to: 'scaleX(1.15)' },
    ],
  },
  {
    title: 'End-to-end UX/UI',
    drawing: EndToEndParti,
    text: "Taking product ideas from ambiguous problems through discovery, prototyping and delivery. As HeadBox's sole product designer, owned design across its B2B platform and B2C marketplace.",
    hover: [
      { h: 'line', to: 'scaleX(1.045)', origin: 'left center' },
      { h: 'tip', to: 'translateX(6px)' },
    ],
  },
  {
    title: 'Design systems & scalability',
    drawing: DesignSystemParti,
    text: "Building reusable foundations that help teams deliver consistent experiences at scale. Supported Findmypast's migration from Sketch to Figma, improving the team's shared design workflow.",
    hover: [
      { h: 'source', to: 'scale(1.12)' },
      { h: 'tile', to: 'scale(1.12)' },
    ],
  },
]

const EASE = 'cubic-bezier(0.3, 0.7, 0.2, 1)'
const MOVE_MS = 420

// Builds paused animations for a card's nudges. Entering plays them forward, leaving plays them back,
// so a long hover never repeats and the drawing always settles at rest. Uses the Web Animations API
// rather than a CSS :hover rule, which Chrome does not reliably restyle on SVG children.
function useNudges(hover: Nudge[]) {
  const svgRef = useRef<SVGSVGElement>(null)
  const anims = useRef<Animation[]>([])
  useEffect(() => {
    const svg = svgRef.current
    if (!svg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    anims.current = hover.flatMap(({ h, to, origin }) =>
      Array.from(svg.querySelectorAll<SVGElement>(`[data-h="${h}"]`)).map((el) => {
        el.style.transformBox = 'fill-box'
        el.style.transformOrigin = origin ?? 'center'
        const a = el.animate([{ transform: 'none' }, { transform: to }], {
          duration: MOVE_MS,
          easing: EASE,
          fill: 'both',
        })
        a.pause()
        return a
      }),
    )
    return () => anims.current.forEach((a) => a.cancel())
  }, [hover])
  const run = (e: PointerEvent, dir: 1 | -1) => {
    if (e.pointerType === 'touch') return
    anims.current.forEach((a) => {
      a.playbackRate = dir
      a.play()
    })
  }
  return { svgRef, enter: (e: PointerEvent) => run(e, 1), leave: (e: PointerEvent) => run(e, -1) }
}

function HoverParti({ children, svgRef }: { children: ReactNode; svgRef: Ref<SVGSVGElement> }) {
  return (
    <svg ref={svgRef} className="parti skill__parti" viewBox="0 0 160 120" aria-hidden="true">
      {children}
    </svg>
  )
}

// On a phone the eight disciplines are a stack of papers: swipe the top sheet away (or use the
// arrows) and the next one comes up from the pile.
const FAN = [
  { x: 0, r: 0 },
  { x: 7, r: 1.8 },
  { x: -6, r: -1.6 },
  { x: 5, r: 1.2 },
]
function paperStyle(d: number, drag: number, dragging: boolean): CSSProperties {
  const transition = dragging && d === 0 ? 'none' : 'transform 460ms cubic-bezier(0.2, 0.7, 0.2, 1), opacity 320ms'
  if (d < 0) {
    return {
      transform: 'translateX(-118%) rotate(-10deg)',
      opacity: 0,
      pointerEvents: 'none',
      zIndex: 100 + d,
      transition,
    }
  }
  if (d === 0) {
    return {
      transform: `translateX(${drag}px) rotate(${drag / 18}deg)`,
      zIndex: 100,
      transition,
    }
  }
  const k = Math.min(d, 3)
  const { x, r } = FAN[k]
  return {
    transform: `translate(${x}px, ${k * 11}px) rotate(${r}deg) scale(${1 - k * 0.04})`,
    opacity: d > 3 ? 0 : 1,
    zIndex: 100 - d,
    transition,
  }
}

// Tools from Ashni's CV.
const toolkit = [
  { group: 'Design', tools: ['Figma', 'Sketch'] },
  {
    group: 'Research and testing',
    tools: ['Dovetail', 'Maze', 'Useberry', 'Hotjar'],
  },
  { group: 'Data', tools: ['PostHog', 'Looker'] },
  { group: 'Delivery', tools: ['Jira', 'Confluence', 'Notion'] },
  { group: 'AI and build', tools: ['Claude', 'ChatGPT', 'Cursor'] },
]

function SkillCard({
  skill,
  deck,
  style,
  hidden,
}: {
  skill: Skill
  deck: boolean
  style: CSSProperties
  hidden: boolean
}) {
  const Drawing = skill.drawing
  const { svgRef, enter, leave } = useNudges(skill.hover)
  return (
    <li
      className="skill"
      style={style}
      aria-hidden={hidden ? true : undefined}
      onPointerEnter={deck ? undefined : enter}
      onPointerLeave={deck ? undefined : leave}
    >
      <HoverParti svgRef={svgRef}>
        <Drawing />
      </HoverParti>
      <h3 className="skill__title">{skill.title}</h3>
      <p className="skill__text">{skill.text}</p>
    </li>
  )
}

export function Skills() {
  const [deck, setDeck] = useState(false)
  const [index, setIndex] = useState(0)
  const [drag, setDrag] = useState(0)
  const [dragging, setDragging] = useState(false)
  const from = useRef<{ x: number; t: number } | null>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const [fan, setFan] = useState<'off' | 'stacked' | 'out'>('off')

  // Desktop: the papers start in a pile and fan out into the grid as the section scrolls into view.
  useEffect(() => {
    const el = listRef.current
    if (!el || deck) return setFan('off')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      return setFan('off')
    }
    setFan('stacked')
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFan('out')
          io.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [deck])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 599px)')
    const sync = () => setDeck(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const go = (n: number) => setIndex(Math.min(skills.length - 1, Math.max(0, n)))
  const onDown = (e: PointerEvent) => {
    if (!deck) return
    from.current = { x: e.clientX, t: performance.now() }
    setDragging(true)
  }
  const onMove = (e: PointerEvent) => {
    if (from.current) setDrag(e.clientX - from.current.x)
  }
  const onUp = (e: PointerEvent) => {
    const start = from.current
    from.current = null
    setDragging(false)
    setDrag(0)
    if (!start) return
    const dx = e.clientX - start.x
    const fast = Math.abs(dx) / Math.max(1, performance.now() - start.t) > 0.4
    if (Math.abs(dx) > 70 || (fast && Math.abs(dx) > 24)) go(index + (dx < 0 ? 1 : -1))
  }

  return (
    <>
      <section className="skills-block" aria-labelledby="core-expertise">
        <h2 id="core-expertise" className="label skills__heading">
          Core Expertise
        </h2>
        <ul
          ref={listRef}
          className={`skills${deck ? ' skills--deck' : ''}${fan === 'off' ? '' : ` skills--fan skills--${fan}`}`}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          onKeyDown={(e) => {
            if (deck && e.key === 'ArrowRight') go(index + 1)
            if (deck && e.key === 'ArrowLeft') go(index - 1)
          }}
          tabIndex={deck ? 0 : undefined}
          aria-roledescription={deck ? 'carousel' : undefined}
          aria-label={deck ? 'Core expertise, swipe or use the arrows' : undefined}
        >
          {skills.map((s, i) => (
            <SkillCard
              key={s.title}
              skill={s}
              deck={deck}
              style={
                deck
                  ? paperStyle(i - index, i === index ? drag : 0, dragging)
                  : ({
                      '--i': i,
                      '--tilt': `${[-1.6, 1.2, -0.8, 1.8][i % 4]}deg`,
                    } as CSSProperties)
              }
              hidden={deck && i !== index}
            />
          ))}
        </ul>
        {deck && (
          <div className="deck__nav">
            <button
              type="button"
              className="deck__button"
              onClick={() => go(index - 1)}
              disabled={index === 0}
              aria-label="Previous"
            >
              <span aria-hidden="true">←</span>
            </button>
            <p className="annotation deck__count" aria-live="polite">
              {index + 1} of {skills.length}, swipe the sheet
            </p>
            <button
              type="button"
              className="deck__button"
              onClick={() => go(index + 1)}
              disabled={index === skills.length - 1}
              aria-label="Next"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        )}
      </section>
      <section className="toolkit" aria-labelledby="toolkit">
        <h2 id="toolkit" className="label skills__heading">
          Toolkit
        </h2>
        <dl className="toolkit__list">
          {toolkit.map((t) => (
            <div key={t.group} className="toolkit__group">
              <dt>{t.group}</dt>
              <dd>{t.tools.join(', ')}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  )
}
