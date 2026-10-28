import { useCallback, useEffect, useRef, useState } from 'react'
import portrait from '../assets/ashni-portrait.webp'
import portraitSketch from '../assets/ashni-portrait-sketch.webp'
import vfShot from '../assets/vf-card-desktop.webp'
import hostShot from '../assets/hosthq-card-workspace.webp'
import taShot from '../assets/ta-card-desktop.webp'
import { revealAt, revealEnd } from './reveal'

const FLIP_MS = 700
const HOLD_MS = 4800

type Sheet = { id: string; name: string; line: string; src?: string; alt: string; position?: string }

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
    position: '0% 30%',
  },
  {
    id: 'hosthq',
    name: 'HostHQ',
    line: 'Took a host platform from research to a scoped MVP.',
    src: hostShot,
    alt: 'HostHQ host workspace showing requests and proposals.',
    position: '0% 30%',
  },
  {
    id: 'treeassist',
    name: 'TreeAssist',
    line: 'Made a complex research workflow easy to finish.',
    src: taShot,
    alt: 'TreeAssist family tree research workflow on desktop.',
    position: '0% 30%',
  },
]

// A stack of paper sheets. The top sheet flips up over its top edge, like a Field Notes pad,
// to show the next one: Ashni, then a case study, each with a one-line summary.
export function HeroStack() {
  const [top, setTop] = useState(0)
  const [flipping, setFlipping] = useState(false)
  const [wrapped, setWrapped] = useState<number | null>(null)
  const [paused, setPaused] = useState(false)
  const target = useRef(0)
  const n = sheets.length

  const flipTo = useCallback(
    (next: number) => {
      if (flipping || next === top) return
      target.current = next
      setFlipping(true)
      window.setTimeout(() => {
        setWrapped(top)
        setTop(target.current)
        setFlipping(false)
        window.setTimeout(() => setWrapped(null), 60)
      }, FLIP_MS)
    },
    [flipping, top],
  )

  useEffect(() => {
    if (paused || flipping) return
    const t = window.setTimeout(() => flipTo((top + 1) % n), HOLD_MS)
    return () => window.clearTimeout(t)
  }, [paused, flipping, top, n, flipTo])

  // No point flipping a hidden tab.
  useEffect(() => {
    const onVis = () => setPaused(document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  return (
    <div
      className="hero__deck"
      onPointerEnter={(e) => e.pointerType === 'mouse' && setPaused(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="hero__sheets" onClick={() => flipTo((top + 1) % n)}>
        {sheets.map((s, k) => {
          const p = (k - top + n) % n
          return (
            <article
              key={s.id}
              className="deck-sheet"
              data-p={p}
              data-flip={flipping && p === 0 ? 'on' : undefined}
              data-jump={wrapped === k ? 'on' : undefined}
              aria-hidden={p === 0 ? undefined : true}
            >
              <div
                className={s.src ? 'deck-sheet__media' : 'deck-sheet__media hero__piece--face'}
                onPointerMove={s.src ? undefined : revealAt}
                onPointerLeave={s.src ? undefined : revealEnd}
              >
                <img
                  className="hero__piece-photo"
                  src={s.src ?? portrait}
                  alt={p === 0 ? s.alt : ''}
                  width={s.src ? 1600 : 960}
                  height={s.src ? 1000 : 1200}
                  style={s.position ? { objectPosition: s.position } : undefined}
                  fetchPriority={k === 0 ? 'high' : undefined}
                  decoding="async"
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
            aria-current={k === top ? 'true' : undefined}
            onClick={() => flipTo(k)}
          />
        ))}
      </div>
    </div>
  )
}
