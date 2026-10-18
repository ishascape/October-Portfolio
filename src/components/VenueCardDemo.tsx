import { useEffect, useRef, useState } from 'react'
import prescreen from '../assets/vf-v2-prescreen.webp'
import './VenueFinderPrototype.css'

// The Venue Finder suggestion card, animated: loading skeleton, the card, "I'm interested", then "Not for me".
// Positions are in the 680 x 335 space of the cropped screenshot and drawn as percentages.

const W = 680
const H = 335

type Rect = [number, number, number, number]

const CARD: Rect = [11, 10, 659, 313]
const YES: Rect = [272, 272, 180, 32]
const NO: Rect = [468, 272, 180, 32]

// Skeleton blocks, laid out like the real card: photo on the left, details on the right.
const BLOCKS: Rect[] = [
  [11, 10, 199, 313], // photo
  [222, 24, 74, 22], // tags
  [304, 24, 80, 22],
  [222, 62, 200, 14], // name
  [222, 88, 130, 12], // location
  [222, 112, 190, 12], // rating, price, seats
  [222, 144, 420, 12], // description
  [222, 166, 410, 12],
  [222, 188, 380, 12],
  [222, 210, 300, 12],
  YES,
  NO,
]

const pct = (r: Rect) => ({
  left: `${(r[0] / W) * 100}%`,
  top: `${(r[1] / H) * 100}%`,
  width: `${(r[2] / W) * 100}%`,
  height: `${(r[3] / H) * 100}%`,
})
const centre = (r: Rect): [number, number] => [r[0] + r[2] / 2, r[1] + r[3] / 2]
const sleep = (ms: number) => new Promise<void>((res) => setTimeout(res, ms))

export function VenueCardDemo() {
  const [skeleton, setSkeleton] = useState(false)
  const [interested, setInterested] = useState(false)
  const [passed, setPassed] = useState(false)
  const [visible, setVisible] = useState(false)
  const [still, setStill] = useState(false)
  const [cursor, setCursor] = useState({ x: 400, y: 200, show: false, down: false })
  const stage = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setStill(true)
  }, [])
  useEffect(() => {
    const el = stage.current
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.5 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const running = visible && !still

  useEffect(() => {
    if (!running) {
      setSkeleton(false)
      setCursor((c) => ({ ...c, show: false, down: false }))
      return
    }
    let live = true
    const move = async (r: Rect, ms = 900) => {
      const [x, y] = centre(r)
      setCursor((c) => ({ ...c, x, y, show: true }))
      await sleep(ms)
    }
    const click = async (fn: () => void) => {
      setCursor((c) => ({ ...c, down: true }))
      await sleep(160)
      if (!live) return
      fn()
      setCursor((c) => ({ ...c, down: false }))
    }
    const run = async () => {
      while (live) {
        setInterested(false)
        setPassed(false)
        setSkeleton(true)
        setCursor({ x: 400, y: 200, show: false, down: false })
        await sleep(1800)
        if (!live) return
        setSkeleton(false)
        await sleep(1200)
        if (!live) return
        await move(YES)
        await click(() => setInterested(true))
        await sleep(1500)
        if (!live) return
        setInterested(false)
        await move(NO)
        await click(() => setPassed(true))
        await sleep(2200)
      }
    }
    run()
    return () => {
      live = false
    }
  }, [running])

  return (
    <div className="vfp__scroll">
      <div
        ref={stage}
        className="vfp__stage"
        style={{ aspectRatio: `${W} / ${H}`, minWidth: 0 }}
        role="img"
        aria-label="A venue card loading as a skeleton, then showing, then the I'm interested button pressed, then Not for me"
      >
        <img
          className="vfp__screen"
          data-pos="active"
          src={prescreen}
          alt=""
          width={W}
          height={H}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
        {interested && <span className="vfp__yes" style={pct(YES)} />}
        {passed && <span className="vfp__dim" style={pct(CARD)} />}
        {skeleton && (
          <span className="vfp__skeleton" style={pct(CARD)}>
            {BLOCKS.map((b, i) => (
              <span
                key={i}
                className="vfp__bone"
                style={{
                  left: `${((b[0] - CARD[0]) / CARD[2]) * 100}%`,
                  top: `${((b[1] - CARD[1]) / CARD[3]) * 100}%`,
                  width: `${(b[2] / CARD[2]) * 100}%`,
                  height: `${(b[3] / CARD[3]) * 100}%`,
                }}
              />
            ))}
          </span>
        )}
        <svg
          className="vfp__cursor"
          data-show={cursor.show}
          data-down={cursor.down}
          style={{ left: `${(cursor.x / W) * 100}%`, top: `${(cursor.y / H) * 100}%` }}
          viewBox="0 0 24 28"
          aria-hidden="true"
        >
          <path d="M3 2 L3 22 L8.5 17 L12.5 26 L16 24.5 L12 15.5 L19.5 15.5 Z" />
        </svg>
        <span
          className="vfp__ripple"
          data-on={cursor.down}
          style={{ left: `${(cursor.x / W) * 100}%`, top: `${(cursor.y / H) * 100}%` }}
          aria-hidden="true"
        />
      </div>
    </div>
  )
}
