import { useCallback, useEffect, useRef, useState } from 'react'
import location from '../assets/vf-v2-location.webp'
import prompt from '../assets/vf-v2-prompt.webp'
import details from '../assets/vf-v2-details.webp'
import suggestions from '../assets/vf-v2-suggestions.webp'
import './VenueFinderPrototype.css'

// A clickable walk through the Venue Finder V2 screens. Every screen is the real design at 1440 x 964;
// the hotspots, the cursor and the small state changes (radio, interested, not for me) sit on top of it.
// All positions are in that 1440 x 964 space and drawn as percentages, so they scale with the stage.

const W = 1440
const H = 964

type Rect = [number, number, number, number] // x, y, width, height

const screens = [
  {
    tab: 'Location',
    src: location,
    alt: 'Venue Finder V2, first step: "Let\'s find the perfect venue to host your event!" with a three-step explainer, a location field set to Marylebone, London, a map with a 5km radius, Corporate and Personal event types and a Start searching button.',
  },
  {
    tab: 'Prompt',
    src: prompt,
    alt: 'Second step: an optional AI prompt, "Tell us about your event, is there anything specific you\'re looking for?", with example chips (Christmas party, Meeting, Birthday, Surprise me), a text area, a Skip this step button and Back and Next buttons.',
  },
  {
    tab: 'Details',
    src: details,
    alt: 'Third step: "Add a few more details to find the best venues", a form filled in from the earlier answers. It asks for the event name with a suggested name, the occasion, attendees, date and time, and how soon to book, with Back and Next buttons.',
  },
  {
    tab: 'Suggestions',
    src: suggestions,
    alt: 'Fourth step: "Here are your initial suggestions, tell us if you\'re interested so we can refine them further". Venue cards for Junsei, Caia and Radisson Blu each have I\'m interested and Not for me buttons, beside a map of 32 venues in London and a How does HeadBox work explainer.',
  },
]

const NEXT: Rect = [458, 916, 202, 32]
const START: Rect = [538, 837, 375, 46]
const CORPORATE: Rect = [580, 788, 120, 28]
// The first two venue cards on the suggestions screen.
const CARDS: { card: Rect; yes: Rect; no: Rect }[] = [
  { card: [121, 255, 659, 313], yes: [382, 517, 180, 32], no: [578, 517, 180, 32] },
  { card: [121, 593, 659, 307], yes: [382, 855, 180, 32], no: [578, 855, 180, 32] },
]

const pct = (r: Rect) => ({
  left: `${(r[0] / W) * 100}%`,
  top: `${(r[1] / H) * 100}%`,
  width: `${(r[2] / W) * 100}%`,
  height: `${(r[3] / H) * 100}%`,
})
const centre = (r: Rect): [number, number] => [r[0] + r[2] / 2, r[1] + r[3] / 2]
const sleep = (ms: number) => new Promise<void>((res) => setTimeout(res, ms))

type Choice = 'corporate' | 'personal' | null

export function VenueFinderPrototype() {
  const [step, setStep] = useState(0)
  const [choice, setChoice] = useState<Choice>(null)
  const [interested, setInterested] = useState<boolean[]>([false, false])
  const [passed, setPassed] = useState<boolean[]>([false, false])
  const [auto, setAuto] = useState(true)
  const [visible, setVisible] = useState(false)
  const [cursor, setCursor] = useState<{ x: number; y: number; show: boolean; down: boolean }>({
    x: 720,
    y: 560,
    show: false,
    down: false,
  })
  const stage = useRef<HTMLDivElement>(null)

  // Autoplay only when it is on screen, and never for reduced motion.
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

  const reset = useCallback(() => {
    setStep(0)
    setChoice(null)
    setInterested([false, false])
    setPassed([false, false])
  }, [])

  const running = auto && visible

  // The demo: a cursor that works through the flow, clicking as a guest would.
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
        reset()
        setCursor({ x: 760, y: 600, show: true, down: false })
        await sleep(900)
        if (!live) return
        await move(CORPORATE)
        await click(() => setChoice('corporate'))
        await sleep(600)
        if (!live) return
        await move(START)
        await click(() => setStep(1))
        await sleep(1500)
        if (!live) return
        await move(NEXT)
        await click(() => setStep(2))
        await sleep(1600)
        if (!live) return
        await move(NEXT)
        await click(() => setStep(3))
        await sleep(1300)
        if (!live) return
        await move(CARDS[0].yes)
        await click(() => setInterested([true, false]))
        await sleep(800)
        if (!live) return
        await move(CARDS[1].yes)
        await click(() => setInterested([true, true]))
        await sleep(2600)
      }
    }
    run()
    return () => {
      live = false
    }
  }, [running, reset])

  return (
    <figure className="vfp vfp--auto">
      <div className="vfp__scroll">
        <div
          ref={stage}
          className="vfp__stage"
          role="img"
          aria-label="Venue Finder V2, an animated walk through the four steps"
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

          {/* Small state changes drawn over the real screens. */}
          {step === 0 && choice && (
            <span
              className="vfp__radio"
              style={{ left: `${((choice === 'corporate' ? 599 : 767) / W) * 100}%`, top: `${(801 / H) * 100}%` }}
            />
          )}
          {step === 3 &&
            CARDS.map((c, i) => (
              <span key={i}>
                {passed[i] && <span className="vfp__dim" style={pct(c.card)} />}
                {interested[i] && <span className="vfp__yes" style={pct(c.yes)} />}
              </span>
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
