import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react'
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

  const go = (n: number) => setIndex((n + notes.length) % notes.length) // wraps: past the last sheet is the first

  // While a mouse is over the stack the sheets swipe by themselves, one every 3 seconds, looping back to the first.
  const [hovering, setHovering] = useState(false)
  useEffect(() => {
    if (!hovering || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % notes.length), 3000)
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
    if (Math.abs(dx) > 70 || (fast && Math.abs(dx) > 24)) go(index + (dx < 0 ? 1 : -1))
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
            style={paperStyle(i - index, i === index ? drag : 0, dragging) as CSSProperties}
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
