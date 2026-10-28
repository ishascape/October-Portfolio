import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent } from 'react'
import portrait from '../assets/ashni-portrait.webp'
import portraitSketch from '../assets/ashni-portrait-sketch.webp'
import vfShot from '../assets/vf-card-desktop.webp'
import hostShot from '../assets/hosthq-card-workspace.webp'
import taShot from '../assets/ta-card-desktop.webp'
import { revealAt, revealEnd } from './reveal'
import { paperStyle } from './Skills'

const HOLD_MS = 4800

type Sheet = { id: string; name: string; line: string; src?: string; alt: string }

const sheets: Sheet[] = [
  {
    id: 'ashni',
    name: 'Ashni Dave',
    line: 'Senior Product Designer who thinks like a product manager.',
    alt: 'Ashni Dave smiling, with long dark hair, in a blue denim top, standing in a garden.',
  },
  {
    id: 'venue-finder',
    name: 'Venue Finder',
    line: 'Reworked marketplace search: +30% qualified enquiries.',
    src: vfShot,
    alt: 'Venue Finder search results on desktop.',
  },
  {
    id: 'hosthq',
    name: 'HostHQ',
    line: 'Took a host platform from research to a scoped MVP.',
    src: hostShot,
    alt: 'HostHQ host workspace showing requests and proposals.',
  },
  {
    id: 'treeassist',
    name: 'TreeAssist',
    line: 'Made a complex research workflow easy to finish.',
    src: taShot,
    alt: 'TreeAssist family tree research workflow on desktop.',
  },
]

// A stack of paper sheets that moves like the Field notes pile: the top sheet slides out and tucks in at the
// back, the rest fan behind it. Swipe, click, use the arrow keys or the dots. It turns by itself until hovered.
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
      onFocus={() => setPaused(true)}
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
              : paperStyle(d, k === index ? drag : 0, dragging)
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
                  width={s.src ? 1600 : 960}
                  height={s.src ? 1000 : 1200}
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
              <p className="deck-sheet__cap">
                <strong>{s.name}</strong>
                <span>{s.line}</span>
              </p>
            </article>
          )
        })}
      </div>
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
    </div>
  )
}
