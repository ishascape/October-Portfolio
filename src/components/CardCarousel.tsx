import { useEffect, useRef, useState } from 'react'

const PLACEHOLDERS = ['System diagram to come', 'Key screens to come', 'Outcome to come']
const INTERVAL = 1600

// The card image: 2–3 slides that cycle while the card is hovered or focused, and rest on
// the first slide otherwise. Until real images exist, each slide is a labelled drawing frame.
export function CardCarousel({ number, images }: { number: string; images?: { src: string; alt: string }[] }) {
  const slides = images?.length ? images : PLACEHOLDERS.map((note) => ({ src: '', alt: note }))
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing || slides.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setActive((i) => (i + 1) % slides.length), INTERVAL)
    return () => clearInterval(t)
  }, [playing, slides.length])

  // The whole card is one link target, so listen on the card rather than the image.
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const card = ref.current?.closest('.card')
    if (!card) return
    const start = () => {
      setPlaying(true)
      setActive((i) => (slides.length > 1 && i === 0 ? 1 : i))
    }
    const stop = () => {
      setPlaying(false)
      setActive(0)
    }
    const leaveFocus = (e: Event) => {
      if (!card.contains((e as FocusEvent).relatedTarget as Node)) stop()
    }
    card.addEventListener('pointerenter', start)
    card.addEventListener('pointerleave', stop)
    card.addEventListener('focusin', start)
    card.addEventListener('focusout', leaveFocus)
    return () => {
      card.removeEventListener('pointerenter', start)
      card.removeEventListener('pointerleave', stop)
      card.removeEventListener('focusin', start)
      card.removeEventListener('focusout', leaveFocus)
    }
  }, [slides.length])

  return (
    <div ref={ref} className="card__image" aria-hidden="true">
      {slides.map((sl, i) => (
        <div key={i} className="card__slide" data-active={i === active || undefined}>
          {sl.src ? (
            <img src={sl.src} alt="" loading="lazy" decoding="async" />
          ) : (
            <>
              <span className="label">
                Drawing {number}
                {String.fromCharCode(97 + i)}
              </span>
              <span className="label card__image-note">{sl.alt}</span>
            </>
          )}
        </div>
      ))}
      {slides.length > 1 && (
        <span className="card__dots">
          {slides.map((_, i) => (
            <span key={i} data-active={i === active || undefined} />
          ))}
        </span>
      )}
    </div>
  )
}
