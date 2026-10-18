import { useEffect, useRef, useState } from 'react'
import './BookingStatusWidget.css'

type Row = { text: string; date?: string }
type Stage = { id: string; tab: string; pill: string; lead: string[]; rows: Row[] }

const EVENT = '14/12/2026'

// The four states of the HostHQ booking status panel, in the order an event moves through them.
const stages: Stage[] = [
  {
    id: 'waiting',
    tab: 'Waiting',
    pill: 'Waiting for guest response',
    lead: [
      'We’ve sent your prospective proposal to the guest.',
      'They will accept it if they wish to proceed with booking.',
    ],
    rows: [
      { text: 'Guest submitted brief', date: '02/11/2026' },
      { text: 'You sent a proposal to the guest', date: '03/11/2026' },
      { text: 'Waiting for guest to respond…' },
    ],
  },
  {
    id: 'progress',
    tab: 'In progress',
    pill: 'Booking in progress',
    lead: [
      'Congratulations, your proposal was accepted by the guest! Contact them directly to finalise the booking progress',
    ],
    rows: [
      { text: 'You reached out with a proposal', date: '03/11/2026' },
      { text: 'The guest has accepted your proposal', date: '05/11/2026' },
      { text: 'You need to contact the guest to finalise booking.' },
    ],
  },
  {
    id: 'upcoming',
    tab: 'Upcoming',
    pill: 'Upcoming event',
    lead: [`This will take place on ${EVENT}.`],
    rows: [
      { text: 'You reached out with a proposal', date: '03/11/2026' },
      { text: 'The guest has accepted your proposal', date: '05/11/2026' },
      { text: 'You contacted the guest', date: '06/11/2026' },
      { text: 'You confirmed the booking', date: '09/11/2026' },
      { text: 'Event scheduled for 14/12/26 🎉' },
    ],
  },
  {
    id: 'completed',
    tab: 'Completed',
    pill: 'Completed event',
    lead: [`This will take place on ${EVENT}.`],
    rows: [
      { text: 'You reached out with a proposal', date: '03/11/2026' },
      { text: 'The guest has accepted your proposal', date: '05/11/2026' },
      { text: 'You contacted the guest', date: '06/11/2026' },
      { text: 'You confirmed the booking', date: '09/11/2026' },
      { text: 'Event took place on 14/12/26 🎉' },
    ],
  },
]

const HOLD = 3200

// An animated booking status panel: it steps through each stage an event passes through, the status
// pill changing and the timeline filling in row by row. Hover or focus pauses it; the tabs jump to a stage.
export function BookingStatusWidget() {
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(false)
  const [paused, setPaused] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Only run while it is on screen, and never when the visitor prefers reduced motion.
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver(([e]) => setAuto(e.isIntersecting), { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!auto || paused) return
    const t = setTimeout(() => setActive((i) => (i + 1) % stages.length), HOLD)
    return () => clearTimeout(t)
  }, [auto, paused, active])

  const stage = stages[active]

  return (
    <div
      ref={ref}
      className="bsw"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="bsw__card" data-stage={stage.id}>
        <div className="bsw__head">
          <span className="bsw__title">Booking Status</span>
          <span className="bsw__pill" key={stage.id}>
            {stage.pill}
          </span>
          <svg className="bsw__chevron" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 17 12 7l9 10" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </div>
        <p className="bsw__lead" key={`lead-${stage.id}`}>
          {stage.lead.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </p>
        <ol className="bsw__rows">
          {stage.rows.map((r, i) => {
            const current = i === stage.rows.length - 1
            return (
              <li
                key={`${stage.id}-${i}`}
                className="bsw__row"
                data-current={current || undefined}
                style={{ animationDelay: `${i * 160}ms` }}
              >
                <span className="bsw__num">{i + 1}</span>
                <span className="bsw__text">{r.text}</span>
                {r.date && <span className="bsw__date">{r.date}</span>}
              </li>
            )
          })}
        </ol>
      </div>
      <div className="bsw__tabs" role="group" aria-label="Booking stage">
        {stages.map((s, i) => (
          <button key={s.id} type="button" aria-pressed={i === active} onClick={() => setActive(i)}>
            {s.tab}
          </button>
        ))}
      </div>
    </div>
  )
}
