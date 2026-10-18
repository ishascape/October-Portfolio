import { useEffect, useRef, useState } from 'react'
import portrait from '../assets/ashni-portrait.webp'
import heroUi from '../assets/hero-ui.webp'
import heroMap from '../assets/hero-map.webp'
import heroProto from '../assets/hero-proto.webp'
import portraitSketch from '../assets/ashni-portrait-sketch.webp'
import { revealAt, revealEnd } from './reveal'

// Four portrait cards that sit slightly apart and slide together on hover (or once the reader scrolls on).
// One card is the portrait; the others show real work.
// Hovering shows what each card stands for.

const cards = [
  {
    id: 'tl',
    label: 'UI & Design Systems',
    src: heroUi,
    alt: 'A button design-system sheet showing enabled, disabled, hovered, focused and pressed states.',
  },
  { id: 'tr', label: 'Face card', photo: true },
  {
    id: 'bl',
    label: 'Prototyping & testing',
    src: heroProto,
    alt: 'A phone held on a London street showing the HeadBox Venue Finder prototype with a map of matching venues.',
  },
  {
    id: 'br',
    label: 'Ideation & UX mapping',
    src: heroMap,
    pos: '0% 50%',
    alt: 'A HeadBox ecosystem map of the venue self-serve system, drawn as lanes of user steps.',
  },
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
      role="group"
      aria-label="Four cards: UI and design systems, face card, prototyping and testing, ideation and UX mapping"
      tabIndex={0}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
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
          className={`hero__piece hero__piece--${c.id}${c.photo ? ' hero__piece--face' : ''}`}
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
            <img
              className="hero__piece-photo"
              style={c.pos ? { objectPosition: c.pos } : undefined}
              src={c.src}
              alt={c.alt}
              width={960}
              height={1056}
              loading="lazy"
              decoding="async"
            />
          )}
          <span className="hero__piece-label">{c.label}</span>
        </div>
      ))}
    </div>
  )
}
