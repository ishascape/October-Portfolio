import { useEffect, useState } from 'react'
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
  { icon: 'reflections', name: 'Learn', line: 'Turn what I find into insight' },
  { icon: 'mvp', name: 'Ship', line: 'Launch the first version and measure it' },
]

export function Hero() {
  // Touch screens have no hover, so a tap on an icon opens its tooltip; tapping elsewhere closes it.
  const [openStep, setOpenStep] = useState<number | null>(null)
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
                  Connecting customer needs, business priorities and what's possible to build - from uncovering pain
                  points to shipping solutions.
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
          <figure className={flipped ? 'hero__portrait hero__polaroid is-flipped' : 'hero__portrait hero__polaroid'}>
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
            {process.map((step, i) => (
              <button
                key={step.icon}
                type="button"
                className={openStep === i ? `hero__step hero__step--${i} is-open` : `hero__step hero__step--${i}`}
                aria-label={`${step.name}: ${step.line}`}
                aria-expanded={openStep === i}
                onClick={() => setOpenStep(openStep === i ? null : i)}
              >
                <CaseIcon name={step.icon} />
                <span className="hero__step-tip" aria-hidden="true">
                  <strong>{step.name}</strong> {step.line}
                </span>
              </button>
            ))}
            <button
              type="button"
              className="hero__flip"
              aria-pressed={flipped}
              aria-label={flipped ? 'Flip the polaroid back to the photo' : 'Flip the polaroid to read my role'}
              onClick={() => setFlipped((f) => !f)}
            />
          </figure>
        </div>
      </div>
    </section>
  )
}
