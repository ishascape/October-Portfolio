import { useEffect, useRef, useState } from 'react'
import portrait from '../assets/ashni-portrait.webp'
import portraitSketch from '../assets/ashni-portrait-sketch.webp'
import { revealAt, revealEnd } from './reveal'

// Four portrait cards that sit slightly apart and slide together on hover (or once the reader scrolls on).
// One card is the portrait; the others stay labelled placeholders until the real images arrive.
// Hovering shows what each card stands for.

const cards = [
  { id: 'tl', label: 'Face card', photo: true },
  { id: 'tr', label: 'UX/UI design' },
  { id: 'bl', label: 'Workshops & ideation' },
  { id: 'br', label: 'Crossfunctional work' },
]

export function HeroPuzzle() {
  const [hover, setHover] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const touched = useRef(false)

  // Once the reader moves on to the next section the cards stay joined.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.25)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="hero__puzzle"
      data-joined={hover || scrolled ? '' : undefined}
      data-hover={hover ? '' : undefined}
      onPointerEnter={(e) => {
        touched.current = e.pointerType === 'touch'
        if (!touched.current) setHover(true)
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== 'touch') setHover(false)
      }}
      onClick={() => touched.current && setHover((h) => !h)}
    >
      {cards.map((c, n) => (
        <div
          key={c.id}
          className={`hero__piece hero__piece--${c.id}`}
          style={{ ['--n' as string]: n }}
          onPointerMove={c.photo ? revealAt : undefined}
          onPointerLeave={c.photo ? revealEnd : undefined}
        >
          {c.photo ? (
            <>
              <img
                className="hero__piece-photo"
                src={portrait}
                alt="Ashni Dave smiling, with long dark hair, in a blue denim top, standing in a garden."
                width={960}
                height={1200}
                fetchPriority="high"
                decoding="async"
              />
              <div className="hero__piece-sketch" aria-hidden="true">
                <img className="hero__piece-photo" src={portraitSketch} alt="" width={960} height={1200} />
              </div>
            </>
          ) : (
            <span className="hero__piece-todo">Image to come</span>
          )}
          <span className="hero__piece-label">{c.label}</span>
        </div>
      ))}
    </div>
  )
}
