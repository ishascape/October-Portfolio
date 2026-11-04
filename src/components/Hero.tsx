import { useEffect, useRef, useState } from 'react'
import { CaseIcon, type CaseIconName } from './CaseIcons'
import { contact } from '../data/content'
import portrait from '../assets/ashni-portrait.webp'
import portraitSmall from '../assets/ashni-portrait-640.webp'
import './Hero.css'

// The steps of how I work, in the order of the link-preview thumbnail. They sit around the polaroid like spilled sweets.
const process: { icon: CaseIconName; name: string; line: string }[] = [
  { icon: 'summary', name: 'Frame', line: 'Sketch the problem before solving it' },
  { icon: 'matching', name: 'Connect', line: 'Fit customer needs to business goals' },
  { icon: 'experiments', name: 'Test', line: 'Run experiments to learn what works' },
  { icon: 'tradeoffs', name: 'Decide', line: 'Weigh the trade-offs and make the call' },
  { icon: 'reflections', name: 'Learn', line: 'Turn Research and data findings into insights' },
  { icon: 'mvp', name: 'Ship', line: 'Launch the first version and measure it' },
]

// Keep a tooltip inside the screen: measure it, then nudge it sideways if it runs past either edge.
function keepTipOnScreen(button: Element | null) {
  const tip = button?.querySelector<HTMLElement>('.hero__step-tip')
  if (!tip) return
  tip.style.setProperty('--tip-dx', '0px')
  const { left, right } = tip.getBoundingClientRect()
  const edge = 12
  const width = document.documentElement.clientWidth
  const dx = left < edge ? edge - left : right > width - edge ? width - edge - right : 0
  tip.style.setProperty('--tip-dx', `${Math.round(dx)}px`)
}

export function Hero() {
  // Touch screens have no hover, so a tap on an icon opens its tooltip; tapping elsewhere closes it.
  const [openStep, setOpenStep] = useState<number | null>(null)
  const pointerType = useRef('')
  // The lightbulb's intro: wait, pulse once, show its tooltip for 2s, then stop. Any click or tap, or touching an icon, ends it.
  const [intro, setIntro] = useState<'wait' | 'pulse' | 'tip' | 'done'>('wait')
  useEffect(() => {
    if (intro === 'done') return
    const next = {
      wait: () => setIntro('pulse'),
      pulse: () => {
        setOpenStep(4)
        setIntro('tip')
      },
      tip: () => {
        setOpenStep((o) => (o === 4 ? null : o))
        setIntro('done')
      },
    }[intro]
    const timer = window.setTimeout(next, { wait: 1400, pulse: 1200, tip: 2000 }[intro])
    const stop = () => setIntro('done')
    document.addEventListener('pointerdown', stop)
    document.addEventListener('keydown', stop)
    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('pointerdown', stop)
      document.removeEventListener('keydown', stop)
    }
  }, [intro])
  useEffect(() => {
    if (openStep !== null) keepTipOnScreen(document.querySelector(`.hero__step--${openStep}`))
  }, [openStep])
  useEffect(() => {
    if (openStep === null) return
    const close = (e: Event) => {
      if (e instanceof KeyboardEvent ? e.key === 'Escape' : !(e.target as Element).closest('.hero__step')) {
        setOpenStep(null)
      }
    }
    document.addEventListener('pointerdown', close)
    document.addEventListener('keydown', close)
    return () => {
      document.removeEventListener('pointerdown', close)
      document.removeEventListener('keydown', close)
    }
  }, [openStep])

  // Phones only: tapping the polaroid flips it over to show the role line, written on the back.
  const [flipped, setFlipped] = useState(false)
  return (
    <section id="top" className="hero paper-sheet" aria-labelledby="hero-heading">
      <div className="container">
        <div className="hero__intro">
          <div className="hero__text">
            <div className="hero__title">
              <p className="hero__role">
                <span>Senior Product Designer ·</span> <span>SaaS, Marketplaces &amp; AI</span>
              </p>
              <h1 id="hero-heading" className="display">
                <span className="hero__line">Designing and delivering products that solve the right problems.</span>
              </h1>
            </div>
            <div className="hero__support">
              <div className="hero__copy">
                <p className="hero__lede">
                  I solve product problems where customer needs and commercial goals intersect. Whether that's balancing
                  supply and demand in marketplaces, improving subscription conversion and retention, or streamlining B2B
                  SaaS workflows, I understand the wider business ecosystem and design solutions that create value for
                  everyone involved.
                </p>
              </div>
              <div className="hero__actions">
                <a className="button button--primary" href="#work">
                  Explore my work <span aria-hidden="true">↓</span>
                </a>
                {contact.resume && (
                  <a className="hero__link" href={contact.resume} target="_blank" rel="noreferrer">
                    View resume <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </div>
          </div>
          {/* Ashni's portrait as a polaroid, like the Field notes prints. Hovering the card makes the smile wink. */}
          <figure className="hero__portrait hero__polaroid">
            <div className={flipped ? 'hero__card is-flipped' : 'hero__card'}>
              <div className="hero__polaroid-photo">
                <img
                  src={portrait}
                  srcSet={`${portraitSmall} 640w, ${portrait} 960w`}
                  sizes="(max-width: 599px) 80vw, 480px"
                  alt="Ashni Dave smiling, with long dark hair, in a blue denim top, standing in a garden."
                  width={960}
                  height={1200}
                  fetchPriority="high"
                />
              </div>
              <figcaption className="annotation hero__hello">
                Hi! I'm Ashni
                <svg className="hero__smile" viewBox="0 0 32 24" aria-hidden="true">
                  <path className="smile__eye" d="M11.5 6.8 v3.2" />
                  <path className="smile__eye smile__eye--open" d="M20.5 6.8 v3.2" />
                  <path className="smile__eye smile__eye--wink" d="M18.2 9.6 Q20.4 6.6 22.8 9.4" />
                  <path className="smile__mouth smile__mouth--grin" d="M9.5 14 C12 18.5 20 18.5 22.5 13.6" />
                  <path className="smile__mouth smile__mouth--smirk" d="M9.8 16.2 C13 18.4 19 18.2 23.6 12.4" />
                </svg>
                <span className="hero__caption-role">
                  Senior Product Designer
                  <span className="hero__flip-hint" aria-hidden="true">
                    ↻
                  </span>
                </span>
              </figcaption>
              <div className="hero__polaroid-back annotation">
                <p>Senior Product Designer</p>
                <p>Strategy to shipped product</p>
                <p>B2B SaaS, AI &amp; marketplaces</p>
              </div>
              <button
                type="button"
                className="hero__flip"
                aria-pressed={flipped}
                aria-label={flipped ? 'Flip the polaroid back to the photo' : 'Flip the polaroid to read my role'}
                onClick={() => setFlipped((f) => !f)}
              />
            </div>
            {process.map((step, i) => (
              <button
                key={step.icon}
                type="button"
                className={`hero__step hero__step--${i}${openStep === i ? ' is-open' : ''}${i === 4 && (intro === 'pulse' || intro === 'tip') ? ' is-nudge' : ''}`}
                aria-label={`${step.name}: ${step.line}`}
                aria-expanded={openStep === i}
                onPointerDown={(e) => (pointerType.current = e.pointerType)}
                onPointerEnter={(e) => {
                  if (e.pointerType !== 'mouse') return
                  setIntro('done')
                  setOpenStep(i)
                }}
                onPointerLeave={(e) => e.pointerType === 'mouse' && setOpenStep((o) => (o === i ? null : o))}
                onFocus={(e) => e.currentTarget.matches(':focus-visible') && setOpenStep(i)}
                onBlur={() => setOpenStep((o) => (o === i ? null : o))}
                onClick={() => {
                  // Touch toggles; mouse and keyboard already opened it, so a click keeps it open.
                  const touch = pointerType.current === 'touch' || pointerType.current === 'pen'
                  pointerType.current = ''
                  setOpenStep((o) => (touch && o === i ? null : i))
                }}
              >
                <CaseIcon name={step.icon} />
                <span className="hero__step-tip" aria-hidden="true">
                  <strong>{step.name}</strong> {step.line}
                </span>
              </button>
            ))}
          </figure>
        </div>
      </div>
    </section>
  )
}
