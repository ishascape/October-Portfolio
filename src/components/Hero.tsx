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
                  From balancing marketplace dynamics and improving subscription growth to streamlining B2B SaaS
                  workflows. I design solutions that work for users and the wider business.
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
                <span className="hero__caption-role">Senior Product Designer</span>
              </figcaption>
              <div className="hero__polaroid-back annotation">
                <p>Senior Product Designer</p>
                <p>Strategy to shipped product</p>
                <p>B2B SaaS, AI &amp; marketplaces</p>
              </div>
              <button
                type="button"
                className="hero__flip"
                aria-hidden="true"
                tabIndex={-1}
                onClick={() => setFlipped((f) => !f)}
              />
            </div>
            {/* The flip control sits outside the print (phones only), so it never reads as part of the card. */}
            <button
              type="button"
              className="hero__flip-btn"
              aria-pressed={flipped}
              aria-label={flipped ? 'Flip the polaroid back to the photo' : 'Flip the polaroid to read my role'}
              onClick={() => setFlipped((f) => !f)}
            >
              <span aria-hidden="true">↻</span>
            </button>
            {/* A chrome thumbtack with a baby dragon on top, holding the print to the page. */}
            <svg className="hero__pin" viewBox="0 0 64 76" aria-hidden="true" focusable="false">
              <defs>
                <radialGradient id="pin-chrome" cx="35%" cy="30%" r="75%">
                  <stop offset="0" stopColor="#ffffff" />
                  <stop offset="0.35" stopColor="#c9d0d8" />
                  <stop offset="0.7" stopColor="#7d8791" />
                  <stop offset="1" stopColor="#4a525b" />
                </radialGradient>
                <linearGradient id="pin-needle" x1="0" x2="1">
                  <stop offset="0" stopColor="#e8ecf0" />
                  <stop offset="1" stopColor="#6c757e" />
                </linearGradient>
              </defs>
              {/* baby dragon, sitting on the dome */}
              <g className="pin__dragon">
                <path className="pin__tail" d="M44 40 C56 40 58 28 52 25 C55 31 50 34 44 34" />
                <path className="pin__wing" d="M25 29 L15 14 L24 19 L27 9 L33 25 Z" />
                <path className="pin__wing pin__wing--far" d="M36 28 L46 14 L38 19 L36 10 L31 25 Z" />
                <ellipse className="pin__body" cx="32" cy="34" rx="12" ry="8.5" />
                <circle className="pin__head" cx="25" cy="23" r="7.5" />
                <path className="pin__horn" d="M21 17.5 L19 11.5 L24.5 16 Z M28 16 L29.5 10.5 L31.5 17 Z" />
                <circle className="pin__eye" cx="22.8" cy="22.4" r="1.4" />
                <circle className="pin__eye pin__eye--far" cx="28" cy="22.4" r="1.4" />
                <path className="pin__smile" d="M22 26.4 Q25 28.6 28.5 26.2" />
                <path className="pin__spots" d="M30 27.5 L33.5 24.5 M35 29.5 L38 26.5 M39 33 L41.5 30.5" />
              </g>
              {/* chrome dome, collar and needle */}
              <ellipse cx="32" cy="46.5" rx="19" ry="5.5" fill="#3d444c" opacity="0.28" />
              <path d="M13 44 C13 36 21 33 32 33 C43 33 51 36 51 44 C51 49 43 51.5 32 51.5 C21 51.5 13 49 13 44 Z" fill="url(#pin-chrome)" />
              <path d="M19 40 C22 36.5 27 35.5 31 35.5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
              <rect x="24" y="50" width="16" height="6" rx="2" fill="url(#pin-chrome)" />
              <path d="M30 56 H34 L32.8 70 L32 73 L31.2 70 Z" fill="url(#pin-needle)" />
            </svg>
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
