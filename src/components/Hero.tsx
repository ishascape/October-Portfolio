import { contact } from '../data/content'
import { HeroStack } from './HeroStack'
import './Hero.css'

export function Hero() {
  return (
    <section id="top" className="hero paper-sheet" aria-labelledby="hero-heading">
      {/* Loose sheets that fan out behind the page on load, then settle into it. */}
      <span className="hero__stack" aria-hidden="true">
        <i />
        <i />
      </span>
      <div className="container">
        <div className="hero__intro">
          <div className="hero__text">
            <div className="hero__title">
              <p className="annotation hero__hello">
                Hi! I'm Ashni
                {/* A pen-drawn smile, eyes and mouth only. On hover it winks and smirks. */}
                <svg className="hero__smile" viewBox="0 0 32 24" aria-hidden="true">
                  <path className="smile__eye" d="M11.5 6.8 v3.2" />
                  <path className="smile__eye smile__eye--open" d="M20.5 6.8 v3.2" />
                  <path className="smile__eye smile__eye--wink" d="M18.2 9.6 Q20.4 6.6 22.8 9.4" />
                  <path className="smile__mouth smile__mouth--grin" d="M9.5 14 C12 18.5 20 18.5 22.5 13.6" />
                  <path className="smile__mouth smile__mouth--smirk" d="M9.8 16.2 C13 18.4 19 18.2 23.6 12.4" />
                </svg>
              </p>
              <h1 id="hero-heading" className="display">
                <span className="hero__line">I love a good product puzzle!</span>
              </h1>
              <p className="hero__role">
                <span>Senior Product Designer ·</span> <span>B2B SaaS, marketplaces & AI</span>
              </p>
            </div>
            <div className="hero__support">
              <div className="hero__copy">
                <p className="hero__scene">Give me the complicated stuff.</p>
                <p className="hero__questions">
                  I partner with Product, Engineering and Commercial teams to turn messy problems into conversion,
                  retention and new revenue.
                </p>
              </div>
              <div className="hero__actions">
                <a className="button button--primary" href="#work">
                  See the results <span aria-hidden="true">↓</span>
                </a>
                {contact.resume && (
                  <a className="button" href={contact.resume} target="_blank" rel="noreferrer">
                    View resume <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </div>
          </div>
          <figure className="hero__portrait">
            <HeroStack />
          </figure>
        </div>
      </div>
    </section>
  )
}
