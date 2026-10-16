import { useEffect, useRef, useState } from 'react'
import portrait from '../assets/ashni-portrait.webp'
import portraitSketch from '../assets/ashni-portrait-sketch.webp'
import { revealAt, revealEnd } from './reveal'

// A 2x2 jigsaw that assembles itself on load: one piece is the portrait, three are labelled
// placeholders until the real images arrive. Piece outlines are drawn in a unit square and used
// both as the clip shape and as the pen outline.

type Tab = -1 | 0 | 1 // 1 = tab sticking out of the piece, -1 = socket, 0 = flat edge

// One edge from (x0, y0) to (x1, y1), travelling clockwise, with a mushroom-shaped tab at the middle.
function edge(x0: number, y0: number, x1: number, y1: number, tab: Tab) {
  if (tab === 0) return `L${x1} ${y1}`
  const len = Math.hypot(x1 - x0, y1 - y0)
  const tx = (x1 - x0) / len
  const ty = (y1 - y0) / len
  const ox = ty * tab // outward, for a clockwise walk in screen coordinates
  const oy = -tx * tab
  const p = (u: number, v: number) =>
    `${(x0 + tx * u * len + ox * v * len).toFixed(4)} ${(y0 + ty * u * len + oy * v * len).toFixed(4)}`
  return [
    `L${p(0.4, 0)}`,
    `C${p(0.4, 0.06)} ${p(0.3, 0.1)} ${p(0.3, 0.2)}`,
    `C${p(0.3, 0.32)} ${p(0.7, 0.32)} ${p(0.7, 0.2)}`,
    `C${p(0.7, 0.1)} ${p(0.6, 0.06)} ${p(0.6, 0)}`,
    `L${x1} ${y1}`,
  ].join(' ')
}

function piecePath(x0: number, y0: number, x1: number, y1: number, top: Tab, right: Tab, bottom: Tab, left: Tab) {
  return [
    `M${x0} ${y0}`,
    edge(x0, y0, x1, y0, top),
    edge(x1, y0, x1, y1, right),
    edge(x1, y1, x0, y1, bottom),
    edge(x0, y1, x0, y0, left),
    'Z',
  ].join(' ')
}

const pieces = [
  // Placeholders first, then the portrait lands last as the finishing piece.
  { id: 'tr', path: piecePath(0.5, 0, 1, 0.5, 0, 0, 1, -1), cx: 0.8, cy: 0.25, label: 'Mobile design' },
  { id: 'br', path: piecePath(0.5, 0.5, 1, 1, -1, 0, 0, 1), cx: 0.78, cy: 0.8, label: 'Component design' },
  { id: 'bl', path: piecePath(0, 0.5, 0.5, 1, -1, -1, 0, 0), cx: 0.2, cy: 0.76, label: 'Workshop stickies' },
]
const photoPath = piecePath(0, 0, 0.5, 0.5, 0, 1, 1, 0)

function Outline({ d }: { d: string }) {
  return (
    <svg className="hero__piece-outline" viewBox="0 0 1 1" preserveAspectRatio="none" aria-hidden="true">
      <path d={d} vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

export function HeroPuzzle() {
  const [hover, setHover] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const touched = useRef(false)

  // Once the reader moves on to the next section the puzzle stays joined.
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
      onPointerEnter={(e) => {
        touched.current = e.pointerType === 'touch'
        if (!touched.current) setHover(true)
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== 'touch') setHover(false)
      }}
      onClick={() => touched.current && setHover((h) => !h)}
    >
      <svg className="hero__puzzle-defs" width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          {[...pieces, { id: 'photo', path: photoPath }].map((p) => (
            <clipPath key={p.id} id={`hero-piece-${p.id}`} clipPathUnits="objectBoundingBox">
              <path d={p.path} />
            </clipPath>
          ))}
        </defs>
      </svg>

      {pieces.map((p, n) => (
        <div
          key={p.id}
          className={`hero__piece hero__piece--${p.id}`}
          style={{ clipPath: `url(#hero-piece-${p.id})`, ['--n' as string]: n }}
        >
          <span className="hero__piece-label" style={{ left: `${p.cx * 100}%`, top: `${p.cy * 100}%` }}>
            <strong>{p.label}</strong>
            <span>Image to come</span>
          </span>
          <Outline d={p.path} />
        </div>
      ))}

      {/* The portrait piece. Hovering it with a mouse or pen reveals the line-art version under the cursor. */}
      <div
        className="hero__piece hero__piece--photo"
        style={{ clipPath: 'url(#hero-piece-photo)', ['--n' as string]: 3 }}
        onPointerMove={revealAt}
        onPointerLeave={revealEnd}
      >
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
          <img className="hero__piece-photo" src={portraitSketch} alt="" width={960} height={1200} decoding="async" />
        </div>
        <Outline d={photoPath} />
      </div>
    </div>
  )
}
