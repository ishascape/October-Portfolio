import { useEffect, useRef, useState } from 'react'
import { CardDialog } from './CardDialog'
import { ExpertiseGrid } from './ExpertiseGrid'
import { OraclePrompt } from './OraclePrompt'
import { OracleReading } from './OracleReading'
import { CARD_BY_ID, type CardId } from './oracleData'
import { DEFAULT_QUESTION, DEFAULT_READING, consultOracle, type OracleReading as Reading } from './oracleLogic'
import './productOracle.css'

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const withTimeout = <T,>(p: Promise<T>, ms: number) =>
  Promise.race([p, new Promise<never>((_, no) => window.setTimeout(() => no(new Error('timeout')), ms))])

// Timeline of a new reading (about 2.3 seconds): cards turn face down, gather, swap, spread out and turn up one by one.
const FLIP = 400
const GATHER_AT = FLIP
const SWAP_AT = 900
const STAGGER = 300

// The Core Expertise section, as a tarot reading of a product problem. The first reading is curated and local, so the
// section is complete on load; nothing is fetched until someone asks a question.
export function ProductOracle() {
  const [view, setView] = useState<'oracle' | 'deck'>('oracle')
  const [question, setQuestion] = useState(DEFAULT_QUESTION)
  const [reading, setReading] = useState<Reading>(DEFAULT_READING)
  const [faces, setFaces] = useState([true, true, true])
  const [gather, setGather] = useState(false)
  const [synthesis, setSynthesis] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [status, setStatus] = useState('')
  const [openId, setOpenId] = useState<CardId | null>(null)
  const timers = useRef<number[]>([])
  const strip = useRef<HTMLDivElement>(null)
  const later = (fn: () => void, ms: number) => void timers.current.push(window.setTimeout(fn, ms))
  useEffect(() => () => timers.current.forEach(window.clearTimeout), [])

  const run = async (next: () => Promise<Reading>) => {
    const reduce = reducedMotion()
    const started = performance.now()
    setError('')
    setBusy(true)
    setSynthesis(false)
    setStatus('Shuffling the cards.')
    if (!reduce) {
      strip.current?.querySelector('.oracle__cards')?.scrollTo({ left: 0 })
      setFaces([false, false, false])
      later(() => setGather(true), GATHER_AT)
    }
    let result: Reading
    try {
      result = await withTimeout(next(), 8000)
    } catch {
      timers.current.forEach(window.clearTimeout)
      setGather(false)
      setFaces([true, true, true])
      setSynthesis(true)
      setBusy(false)
      setStatus('')
      setError('The Oracle could not read that just now. Try rephrasing it, or go back to the featured reading.')
      return
    }
    const wait = reduce ? 0 : Math.max(0, SWAP_AT - (performance.now() - started))
    later(() => {
      setReading(result)
      setGather(false)
    }, wait)
    const spread = wait + (reduce ? 0 : FLIP)
    ;[0, 1, 2].forEach((i) =>
      later(() => setFaces((f) => f.map((up, j) => (j === i ? true : up))), spread + (reduce ? 0 : i * STAGGER)),
    )
    later(
      () => {
        setSynthesis(true)
        setBusy(false)
        setStatus(`Your reading: ${result.cards.map((c) => CARD_BY_ID[c.cardId].archetype).join(', ')}.`)
      },
      spread + (reduce ? 0 : 2 * STAGGER + 100),
    )
  }

  const consult = () => {
    const text = question.trim()
    if (!text) {
      setError('Ask a product problem first, or go back to the featured reading.')
      return
    }
    void run(() => consultOracle(text))
  }
  const restore = () => {
    setQuestion(DEFAULT_QUESTION)
    void run(async () => DEFAULT_READING)
  }

  const custom = reading !== DEFAULT_READING

  return (
    <section className="oracle" aria-labelledby="oracle-title">
      <p className="label oracle__eyebrow">An experiment in product thinking</p>
      <h2 id="oracle-title" className="display oracle__title">
        The Product Oracle <span aria-hidden="true">✳</span>
      </h2>
      <p className="oracle__lede">
        “Every product problem has a card. Ask me a product question, and I'll show you how I'd approach it.”
      </p>

      {view === 'oracle' ? (
        <div className="oracle__view" ref={strip}>
          <OraclePrompt value={question} onChange={setQuestion} onSubmit={consult} busy={busy} error={error} />
          <OracleReading reading={reading} faces={faces} gather={gather} showSynthesis={synthesis} onOpen={setOpenId} />
          <div className="oracle__actions">
            <button type="button" className="oracle__link" onClick={() => setView('deck')} disabled={busy}>
              Explore all eight cards <span aria-hidden="true">↗</span>
            </button>
            {custom && (
              <button type="button" className="oracle__link oracle__link--quiet" onClick={restore} disabled={busy}>
                Back to the featured reading
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="oracle__view">
          <div className="oracle__actions oracle__actions--top">
            <button type="button" className="oracle__link" onClick={() => setView('oracle')}>
              <span aria-hidden="true">←</span> Back to the Oracle
            </button>
            <p className="oracle__count">Eight cards, one for each area of expertise. Select a card to read more.</p>
          </div>
          <ExpertiseGrid onOpen={setOpenId} />
        </div>
      )}

      <p className="visually-hidden" role="status" aria-live="polite">
        {status}
      </p>
      <CardDialog id={openId} onClose={() => setOpenId(null)} />
    </section>
  )
}
