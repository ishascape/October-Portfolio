import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import type { FieldNote } from '../data/content'
import { paperStyle } from './Skills'

function Figure({ f }: { f: FieldNote }) {
  return (
    <figure className="figure">
      {f.src ? (
        <div className="figure__photo" style={{ aspectRatio: f.ratio }}>
          <img src={f.src} alt={f.alt} loading="lazy" decoding="async" />
        </div>
      ) : (
        <div className="figure__frame" style={{ aspectRatio: f.ratio }} aria-hidden="true">
          <span className="label">Fig. {f.fig}</span>
        </div>
      )}
      <p className="label field-notes__sheet-label">{f.group}</p>
      <figcaption className="annotation">{f.caption}</figcaption>
    </figure>
  )
}

// All the field notes as one stack of papers, like the Core Expertise cards on a phone: swipe the top sheet away,
// or use the arrows. Each sheet is cut to its own photo, category and caption, so taller sheets show behind the one on top.
export function FieldStrip({ notes, label }: { notes: FieldNote[]; label: string }) {
  const [index, setIndex] = useState(0)
  const [drag, setDrag] = useState(0)
  const [dragging, setDragging] = useState(false)
  const from = useRef<{ x: number; t: number } | null>(null)

  // The sheet that was just on top slides out a little, then tucks in at the back of the pile.
  const [leaving, setLeaving] = useState<number | null>(null)
  const prev = useRef(0)
  useLayoutEffect(() => {
    const was = prev.current
    prev.current = index
    if (was === index || (index - was + notes.length) % notes.length !== 1) return
    setLeaving(was)
    const id = window.setTimeout(() => setLeaving(null), 260)
    return () => window.clearTimeout(id)
  }, [index, notes.length])

  const sheetStyle = (i: number): CSSProperties => {
    if (i === leaving) {
      return { transform: 'translateX(34%) rotate(4deg)', zIndex: 101, transition: 'transform 260ms ease-out' }
    }
    const n = notes.length
    const d = (i - index + n) % n
    if (d === n - 1 && n > 4) return { ...paperStyle(3, 0, false), opacity: 1, zIndex: 90 } // the one that just went to the back
    return paperStyle(d, i === index ? drag : 0, dragging)
  }

  const go = (n: number) => setIndex((n + notes.length) % notes.length) // wraps: past the last sheet is the first

  // While a mouse is over the stack the sheets swipe by themselves, one every 2.5 seconds, looping back to the first.
  const [hovering, setHovering] = useState(false)
  useEffect(() => {
    if (!hovering || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % notes.length), 2500)
    return () => window.clearInterval(id)
  }, [hovering, notes.length])
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
  }

  return (
    <>
      <ul
        className="field-notes__strip field-notes__deck"
        onPointerEnter={(e) => e.pointerType === 'mouse' && setHovering(true)}
        onPointerLeave={() => setHovering(false)}
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
        aria-label={`${label}, swipe or use the arrows`}
      >
        {notes.map((f, i) => (
          <li
            key={f.fig}
            className="field-notes__paper"
            style={sheetStyle(i)}
            aria-hidden={i !== index ? true : undefined}
          >
            <Figure f={f} />
          </li>
        ))}
      </ul>
      <div className="deck__nav">
        <button
          type="button"
          className="deck__button"
          onClick={() => go(index - 1)}
          aria-label="Previous"
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          type="button"
          className="deck__button"
          onClick={() => go(index + 1)}
          aria-label="Next"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </>
  )
}
