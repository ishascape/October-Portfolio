import { useRef, useState, type CSSProperties, type PointerEvent } from 'react'
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
      <figcaption className="annotation">{f.caption}</figcaption>
    </figure>
  )
}

// A group of field notes as a stack of papers, like the Core Expertise cards on a phone: swipe the top sheet away,
// or use the arrows. Every sheet in a group is cropped to the group's median ratio so the pile reads as one stack.
function ratioOf(r: string) {
  const [w, h] = r.split('/').map((n) => parseFloat(n))
  return w / h
}

export function FieldStrip({ notes, label }: { notes: FieldNote[]; label: string }) {
  const [index, setIndex] = useState(0)
  const [drag, setDrag] = useState(0)
  const [dragging, setDragging] = useState(false)
  const from = useRef<{ x: number; t: number } | null>(null)
  const ratios = notes.map((n) => ratioOf(n.ratio)).sort((x, y) => x - y)
  const sheet = ratios[Math.floor(ratios.length / 2)].toFixed(3)

  const go = (n: number) => setIndex(Math.min(notes.length - 1, Math.max(0, n)))
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
        style={{ '--sheet': sheet } as CSSProperties}
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
          disabled={index === 0}
          aria-label="Previous"
        >
          <span aria-hidden="true">←</span>
        </button>
        <p className="annotation deck__count" aria-live="polite">
          {index + 1} of {notes.length}, swipe the sheet
        </p>
        <button
          type="button"
          className="deck__button"
          onClick={() => go(index + 1)}
          disabled={index === notes.length - 1}
          aria-label="Next"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </>
  )
}
