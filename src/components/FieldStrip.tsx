import { useEffect, useState, type CSSProperties } from 'react'
import type { FieldNote } from '../data/content'

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

// All the field notes as a loose pile of papers. Click a page and it lifts out of the pile, straightens up and shows
// its photo and caption; click it again (or Esc, or the pile button) and it drops back on top of the pile.
// Each sheet sits at its own scatter position, worked out from its place in the list so it never jumps on render.
const PILE_SCALE = 0.6

function scatter(i: number) {
  const a = i * 2.399963 // golden angle, so neighbours never land on top of each other
  return {
    x: Math.cos(a) * 18,
    y: Math.sin(a) * 15,
    r: ((i * 37) % 23) - 11, // -11 to +11 degrees, but never the same run twice in a row
  }
}

export function FieldStrip({ notes, label }: { notes: FieldNote[]; label: string }) {
  const [open, setOpen] = useState<number | null>(null)
  // Pile order, bottom to top. A sheet that was just put back goes on top.
  const [order, setOrder] = useState(() => notes.map((_, i) => i))

  const close = () => {
    if (open === null) return
    setOrder((o) => [...o.filter((i) => i !== open), open])
    setOpen(null)
  }
  const show = (i: number) => {
    if (open !== null && open !== i) setOrder((o) => [...o.filter((j) => j !== open), open])
    setOpen(i)
  }
  const step = (by: number) => show(((((open ?? (by > 0 ? -1 : 0)) + by) % notes.length) + notes.length) % notes.length)

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const sheetStyle = (i: number): CSSProperties => {
    const z = i === open ? 200 : order.indexOf(i) + 1
    if (i === open) return { transform: 'translate(0, 0) rotate(0deg) scale(1)', zIndex: z }
    const { x, y, r } = scatter(i)
    return { transform: `translate(${x}%, ${y}%) rotate(${r}deg) scale(${PILE_SCALE})`, zIndex: z }
  }

  return (
    <>
      <ul className="field-notes__strip field-notes__pile" aria-label={label}>
        {notes.map((f, i) => (
          <li
            key={f.fig}
            className={i === open ? 'field-notes__paper is-open' : 'field-notes__paper'}
            style={sheetStyle(i)}
            role="button"
            tabIndex={0}
            aria-expanded={i === open}
            aria-label={`${i === open ? 'Put back' : 'Open'} ${f.caption}`}
            onClick={() => (i === open ? close() : show(i))}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                i === open ? close() : show(i)
              }
            }}
          >
            <Figure f={f} />
          </li>
        ))}
      </ul>
      <div className="deck__nav">
        <button type="button" className="deck__button" onClick={() => step(-1)} aria-label="Previous page">
          <span aria-hidden="true">←</span>
        </button>
        <button
          type="button"
          className="field-notes__back label"
          onClick={close}
          disabled={open === null}
          tabIndex={open === null ? -1 : 0}
        >
          {open === null ? 'Pick a page' : 'Back to the pile'}
        </button>
        <button type="button" className="deck__button" onClick={() => step(1)} aria-label="Next page">
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </>
  )
}
