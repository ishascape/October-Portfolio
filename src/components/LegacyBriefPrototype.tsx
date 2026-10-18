import { useEffect, useRef, useState } from 'react'
import location from '../assets/legacy-brief-location.webp'
import planning from '../assets/legacy-brief-planning.webp'
import guests from '../assets/legacy-brief-guests.webp'
import './VenueFinderPrototype.css'

// A clickable walk through the first three steps of the legacy brief builder (the control).
// Positions are in the 2000 x 976 space of the screenshots and drawn as percentages.

const W = 2000
const H = 976

type Rect = [number, number, number, number]

const screens = [
  {
    tab: 'Location',
    src: location,
    alt: 'Legacy brief builder, step one: "What location works best?" with a location field set to Auckland, New Zealand, a radius slider at 2 km, a map with the search circle and a Continue button, beside a "How HeadBox works" panel.',
  },
  {
    tab: 'Event',
    src: planning,
    alt: 'Step two: "What are you planning?" with preset options such as Meeting/workshop, Party and Wedding, then "What type of event is it?" with Leisure and Business, and Back and Continue buttons.',
  },
  {
    tab: 'Guests',
    src: guests,
    alt: 'Step three: "Who\'s invited?" asks for the number of guests, 100, and whether the space is Standing, Seated or Not sure, with Back and Continue buttons.',
  },
]

const CONTINUE: Rect = [862, 912, 180, 50]

const centre = (r: Rect): [number, number] => [r[0] + r[2] / 2, r[1] + r[3] / 2]
const sleep = (ms: number) => new Promise<void>((res) => setTimeout(res, ms))

export function LegacyBriefPrototype() {
  const [step, setStep] = useState(0)
  const [auto, setAuto] = useState(true)
  const [visible, setVisible] = useState(false)
  const [cursor, setCursor] = useState({ x: 1000, y: 600, show: false, down: false })
  const stage = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setAuto(false)
  }, [])
  useEffect(() => {
    const el = stage.current
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.5 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const running = auto && visible

  useEffect(() => {
    if (!running) {
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
        setStep(0)
        setCursor({ x: 1000, y: 700, show: true, down: false })
        await sleep(1600)
        if (!live) return
        await move(CONTINUE)
        await click(() => setStep(1))
        await sleep(1600)
        if (!live) return
        await move(CONTINUE)
        await click(() => setStep(2))
        await sleep(2800)
      }
    }
    run()
    return () => {
      live = false
    }
  }, [running])

  return (
    <figure className="vfp vfp--auto">
      <div className="vfp__scroll" role="group" aria-label="Scrollable prototype screen" tabIndex={0}>
        <div
          ref={stage}
          className="vfp__stage"
          style={{ aspectRatio: `${W} / ${H}` }}
          role="img"
          aria-label="Legacy brief builder, an animated walk through the first three steps"
        >
          {screens.map((s, i) => (
            <img
              key={s.tab}
              className="vfp__screen"
              data-pos={i < step ? 'before' : i > step ? 'after' : 'active'}
              src={s.src}
              alt={i === step ? s.alt : ''}
              aria-hidden={i !== step}
              width={W}
              height={H}
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
              draggable={false}
            />
          ))}
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
    </figure>
  )
}
