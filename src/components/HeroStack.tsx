import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent } from 'react'
import portrait from '../assets/ashni-portrait.webp'
import portraitSketch from '../assets/ashni-portrait-sketch.webp'
import vfShot from '../assets/hero-sheet-venue-finder.webp'
import hostShot from '../assets/hero-sheet-hosthq.webp'
import taShot from '../assets/hero-sheet-treeassist.webp'
import dsShot from '../assets/hero-sheet-design-systems.webp'
import { revealAt, revealEnd } from './reveal'
import { paperStyle } from './Skills'

const HOLD_MS = 3000

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
    line: 'Component states, tokens and rules written down once.',
    chips: ['Components', 'Tokens', 'Accessibility'],
    src: dsShot,
    alt: 'A component sheet showing enabled, disabled, hovered, focused and pressed states.',
    w: 1200,
    h: 1200,
  },
]

// The sheets behind fan out like the Field notes pile, but stay full size so their edges show under the top one.
const FAN = [
  { x: 0, r: 0 },
  { x: 7, r: 1.8 },
  { x: -6, r: -1.6 },
  { x: 5, r: 1.2 },
]
const behind = (d: number) => {
  const k = Math.min(d, 3)
  const style = paperStyle(d, 0, false)
  return d < 1 ? style : { ...style, transform: `translate(${FAN[k].x}px, ${k * 9}px) rotate(${FAN[k].r}deg)` }
}

// A stack of paper sheets that moves like the Field notes pile: the top sheet slides out and tucks in at the
// back, the rest fan behind it. Swipe, click, use the arrow keys or the dots. It turns by itself every 2 seconds until hovered.
export function HeroStack() {
  const [index, setIndex] = useState(0)
  const [drag, setDrag] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [paused, setPaused] = useState(false)
  const from = useRef<{ x: number; t: number } | null>(null)
  const n = sheets.length

  // The sheet that was just on top slides out a little, then tucks in at the back of the pile.
  const [leaving, setLeaving] = useState<number | null>(null)
  const prev = useRef(0)
  useLayoutEffect(() => {
    const was = prev.current
    prev.current = index
    if (was === index || (index - was + n) % n !== 1) return
    setLeaving(was)
    const id = window.setTimeout(() => setLeaving(null), 260)
    return () => window.clearTimeout(id)
  }, [index, n])

  const go = (i: number) => setIndex((i + n) % n)

  useEffect(() => {
    if (paused || dragging || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % n), HOLD_MS)
    return () => window.clearTimeout(id)
  }, [paused, dragging, index, n])

  // No point turning sheets in a hidden tab.
  useEffect(() => {
    const onVis = () => setPaused(document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  const onDown = (e: PointerEvent) => {
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
    if (Math.abs(dx) > 70 || (fast && Math.abs(dx) > 24)) go(index + (dx > 0 ? 1 : -1))
    else if (Math.abs(dx) < 6) go(index + 1) // a tap turns the sheet
  }

  return (
    <div
      className="hero__deck"
      onPointerEnter={(e) => e.pointerType === 'mouse' && setPaused(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setPaused(false)}
      onFocus={(e) => e.target.matches(':focus-visible') && setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="hero__sheets"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') go(index + 1)
          if (e.key === 'ArrowLeft') go(index - 1)
        }}
        tabIndex={0}
        aria-roledescription="carousel"
        aria-label="Ashni and selected work, swipe or use the arrows"
      >
        {sheets.map((s, k) => {
          const d = (k - index + n) % n
          const style =
            k === leaving
              ? { transform: 'translateX(34%) rotate(4deg)', zIndex: 101, transition: 'transform 260ms ease-out' }
              : d === n - 1 && n > 4
                ? { ...behind(3), opacity: 1, zIndex: 90 } // the one that just went to the back
                : d === 0
                  ? paperStyle(0, drag, dragging)
                  : behind(d)
          return (
            <article key={s.id} className="deck-sheet" style={style} aria-hidden={d === 0 ? undefined : true}>
              <div
                className={
                  s.src ? 'deck-sheet__media deck-sheet__media--screen' : 'deck-sheet__media hero__piece--face'
                }
                onPointerMove={s.src ? undefined : revealAt}
                onPointerLeave={s.src ? undefined : revealEnd}
              >
                <img
                  className="hero__piece-photo"
                  src={s.src ?? portrait}
                  alt={d === 0 ? s.alt : ''}
                  style={s.pos ? { objectPosition: s.pos } : undefined}
                  width={s.w ?? 960}
                  height={s.h ?? 1200}
                  fetchPriority={k === 0 ? 'high' : undefined}
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
          )
        })}
      </div>
      <div className="hero__nav">
        <button type="button" className="deck__button" onClick={() => go(index - 1)} aria-label="Previous">
          <span aria-hidden="true">←</span>
        </button>
        <div className="hero__dots" role="group" aria-label="Choose a sheet">
          {sheets.map((s, k) => (
            <button
              key={s.id}
              type="button"
              className="hero__dot"
              aria-label={s.name}
              aria-current={k === index ? 'true' : undefined}
              onClick={() => go(k)}
            />
          ))}
        </div>
        <button type="button" className="deck__button" onClick={() => go(index + 1)} aria-label="Next">
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  )
}
