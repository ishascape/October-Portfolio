import { contact } from '../data/content'
import { HeroStack } from './HeroStack'
import './Hero.css'

export function Hero() {
  return (
    <section id="top" className="hero paper-sheet" aria-labelledby="hero-heading">
      <div className="container">
        <div className="hero__intro">
          <div className="hero__text">
            <div className="hero__title">
              <p className="annotation hero__hello">
                {/* Three pen flicks, like a little wave of energy before the hello. */}
                <svg className="hero__spark" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9 3.5 L11 8.5" />
                  <path d="M2.5 9 L8 11" />
                  <path d="M3 17 L8.5 15" />
                </svg>
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
                <span className="hero__line">I turn complex product problems into business growth.</span>
              </h1>
              <p className="hero__role">
                <span>Senior Product Designer ·</span> <span>Product Strategy, B2B SaaS & AI</span>
              </p>
            </div>
            <div className="hero__support">
              <div className="hero__copy">
                <p className="hero__lede">
                  I work across strategy, discovery and delivery to build products that improve conversion, retention
                  and revenue.
                </p>
              </div>
              <div className="hero__actions">
                <a className="button button--primary" href="#work">
                  Explore my work <span aria-hidden="true">↓</span>
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
