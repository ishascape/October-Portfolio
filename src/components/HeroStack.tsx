import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import portrait from '../assets/ashni-portrait.webp'
import portraitSketch from '../assets/ashni-portrait-sketch.webp'
import vfShot from '../assets/hero-sheet-venue-finder.webp'
import hostShot from '../assets/hero-sheet-hosthq.webp'
import taShot from '../assets/hero-sheet-treeassist.webp'
import dsShot from '../assets/hero-sheet-design-systems.webp'
import { revealAt, revealEnd } from './reveal'

type Sheet = {
  id: string
  name: string
  line: string
  chips: string[]
  src?: string
  alt: string
  w?: number
  h?: number
  pos?: string
}

const sheets: Sheet[] = [
  {
    id: 'ashni',
    name: 'Ashni Dave',
    line: 'Senior Product Designer who thinks like a product manager.',
    chips: ['Product strategy', 'Systems thinking', 'UX/UI', 'Commercial growth'],
    alt: 'Ashni Dave smiling, with long dark hair, in a blue denim top, standing in a garden.',
  },
  {
    id: 'venue-finder',
    name: 'Venue Finder',
    line: 'Reworked marketplace search: +30% qualified enquiries.',
    chips: ['B2C marketplace', 'AI recommendations'],
    src: vfShot,
    alt: "Venue Finder results on a phone: venue cards with I'm interested and Not for me buttons.",
    w: 900,
    h: 900,
  },
  {
    id: 'hosthq',
    name: 'HostHQ',
    line: 'Took a host platform from research to a scoped MVP.',
    chips: ['B2B SaaS', 'Host platform', 'MVP'],
    src: hostShot,
    alt: 'HostHQ leads dashboard on a desktop monitor.',
    w: 700,
    h: 700,
  },
  {
    id: 'treeassist',
    name: 'TreeAssist',
    line: 'Guided onboarding for a complex family-tree build.',
    chips: ['B2C subscription', 'Onboarding'],
    src: taShot,
    alt: "TreeAssist onboarding screens on phones: Let's build your tree together.",
    w: 1200,
    h: 851,
    pos: '44% 50%',
  },
  {
    id: 'design-systems',
    name: 'Design systems',
    line: 'Component states, tokens and rules written down for AI agents and Developer handoff.',
    chips: ['Components', 'Tokens', 'Accessibility'],
    src: dsShot,
    alt: 'A component sheet showing enabled, disabled, hovered, focused and pressed states.',
    w: 1200,
    h: 1200,
  },
]

// The hero stack is the Field notes pile: loose sheets, Ashni's portrait always on top. Click a sheet and it lifts out,
// straightens up and shows its caption; click it again (or Esc, or the pile button) and it drops back into the pile,
// just under the portrait. Each sheet has its own scatter position, worked out from its place in the list.
const PILE_SCALE = 0.88
const PORTRAIT_SCALE = 0.94

function scatter(i: number) {
  const a = i * 2.399963 // golden angle, so neighbours never land on top of each other
  return {
    x: Math.cos(a) * 8,
    y: Math.sin(a) * 6,
    r: ((i * 37) % 21) - 10, // -10 to +10 degrees
  }
}

export function HeroStack() {
  const [open, setOpen] = useState<number | null>(null)
  // "Pick a page" lays every sheet out as an image-only grid; picking one goes back to the pile with that sheet open.
  const [grid, setGrid] = useState(false)
  const [lockH, setLockH] = useState(0)
  const [moving, setMoving] = useState(false)
  // Pile order, bottom to top. The portrait (sheet 0) is always the last one, so it is always on top.
  const [order, setOrder] = useState(() => [...sheets.keys()].slice(1).concat(0))
  const n = sheets.length
  const sheetsEl = useRef<HTMLDivElement>(null)
  const firstRects = useRef<DOMRect[] | null>(null)

  // Remember where every sheet is now, so the next layout can slide them from there (FLIP).
  const measure = () => {
    const el = sheetsEl.current
    if (!el) return
    firstRects.current = [...el.querySelectorAll('.deck-sheet')].map((e) => e.getBoundingClientRect())
    setLockH(el.offsetHeight)
    setMoving(true)
  }
  useLayoutEffect(() => {
    const first = firstRects.current
    firstRects.current = null
    const el = sheetsEl.current
    if (!first || !el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const done = window.setTimeout(() => setMoving(false), 520)
    if (reduce || !el.animate) return () => window.clearTimeout(done)
    el.querySelectorAll<HTMLElement>('.deck-sheet').forEach((sheet, i) => {
      const a = first[i]
      const b = sheet.getBoundingClientRect()
      if (!a || !b.width || !b.height) return
      const rest = sheet.style.transform === 'none' ? '' : sheet.style.transform
      const dx = a.left + a.width / 2 - (b.left + b.width / 2)
      const dy = a.top + a.height / 2 - (b.top + b.height / 2)
      sheet.animate(
        [
          { transform: `translate(${dx}px, ${dy}px) scale(${a.width / b.width}, ${a.height / b.height}) ${rest}` },
          { transform: rest || 'none' },
        ],
        { duration: 480, easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)' },
      )
    })
    return () => window.clearTimeout(done)
  }, [grid, open])

  // A sheet that goes back drops in just under the portrait, unless it is the portrait, which goes back on top.
  const putBack = (o: number[], i: number) =>
    i === 0 ? [...o.filter((j) => j !== 0), 0] : [...o.filter((j) => j !== i && j !== 0), i, 0]
  const close = () => {
    if (grid) {
      measure()
      setGrid(false)
      return
    }
    if (open === null) return
    setOrder((o) => putBack(o, open))
    setOpen(null)
  }
  const show = (i: number) => {
    if (grid) {
      measure()
      setGrid(false)
    }
    if (open !== null && open !== i) setOrder((o) => putBack(o, open))
    setOpen(i)
  }
  const step = (by: number) => show(((((open ?? (by > 0 ? -1 : 0)) + by + n) % n) + n) % n)
  const pick = () => {
    measure()
    if (open !== null) setOrder((o) => putBack(o, open))
    setOpen(null)
    setGrid(true)
  }

  useEffect(() => {
    if (open === null && !grid) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const sheetStyle = (i: number): CSSProperties => {
    const transition = moving ? 'none' : undefined // the slide between layouts does the moving
    if (grid) return { transform: 'none', zIndex: 1, transition }
    const z = i === open ? 200 : order.indexOf(i) + 1
    if (i === open) return { transform: 'translate(0, 0) rotate(0deg) scale(1)', zIndex: z, transition }
    if (i === 0) return { transform: `translate(0, 0) rotate(-2deg) scale(${PORTRAIT_SCALE})`, zIndex: z, transition }
    const { x, y, r } = scatter(i)
    return { transform: `translate(${x}%, ${y}%) rotate(${r}deg) scale(${PILE_SCALE})`, zIndex: z, transition }
  }

  return (
    <div
      className="hero__deck"
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') step(1)
        if (e.key === 'ArrowLeft') step(-1)
      }}
    >
      <div
        ref={sheetsEl}
        className={grid ? 'hero__sheets is-grid' : 'hero__sheets'}
        style={grid ? { minHeight: lockH } : undefined}
        role="group"
        aria-label="Ashni and selected work, pick a sheet"
      >
        {sheets.map((s, i) => (
          <article
            key={s.id}
            className="deck-sheet"
            style={sheetStyle(i)}
            role="button"
            tabIndex={0}
            aria-expanded={grid ? undefined : i === open}
            aria-label={`${grid ? 'Open' : i === open ? 'Put back' : 'Open'} ${s.name}`}
            onClick={() => (!grid && i === open ? close() : show(i))}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                !grid && i === open ? close() : show(i)
              }
            }}
          >
            <div
              className={s.src ? 'deck-sheet__media deck-sheet__media--screen' : 'deck-sheet__media hero__piece--face'}
              onPointerMove={s.src ? undefined : revealAt}
              onPointerLeave={s.src ? undefined : revealEnd}
            >
              <img
                className="hero__piece-photo"
                src={s.src ?? portrait}
                alt={s.alt}
                style={s.pos ? { objectPosition: s.pos } : undefined}
                width={s.w ?? 960}
                height={s.h ?? 1200}
                fetchPriority={i < 2 ? 'high' : undefined}
                loading={i < 2 ? 'eager' : undefined}
                decoding="async"
                draggable={false}
              />
              {!s.src && (
                <div className="hero__piece-sketch" aria-hidden="true">
                  <img className="hero__piece-photo" src={portraitSketch} alt="" width={960} height={1200} />
                </div>
              )}
            </div>
            <div className="deck-sheet__cap">
              <p>
                <strong>{s.name}</strong>
                <span>{s.line}</span>
              </p>
              <ul className="deck-sheet__chips">
                {s.chips.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
      <div className="hero__nav">
        <button type="button" className="deck__button" onClick={() => step(-1)} aria-label="Previous sheet">
          <span aria-hidden="true">←</span>
        </button>
        <button type="button" className="hero__back" onClick={open === null && !grid ? pick : close}>
          {open === null && !grid ? 'Pick a page' : 'Back to the pile'}
        </button>
        <button type="button" className="deck__button" onClick={() => step(1)} aria-label="Next sheet">
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  )
}
