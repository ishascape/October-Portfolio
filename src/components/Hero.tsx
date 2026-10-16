import { contact } from '../data/content'
import { HeroPuzzle } from './HeroPuzzle'
import './Hero.css'

export function Hero() {
  return (
    <section id="top" className="hero paper-sheet" aria-labelledby="hero-heading">
      <div className="container">
        <p className="label hero__sheet">
          <span>Sheet 00 / 03 · Introduction · Senior Product Designer</span>
          <span aria-hidden="true">Scale: Responsive NTS</span>
        </p>

        <div className="hero__intro">
          <div className="hero__title">
            <p className="annotation hero__hello">
              Hey, I'm Ashni
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
              <span className="hero__line">I love a good product puzzle.</span>{' '}
              <span className="hero__line">Especially a messy one.</span>
            </h1>
          </div>
          <figure className="hero__portrait">
            <HeroPuzzle />
          </figure>
          <div className="hero__support">
            <div className="hero__copy">
              <p>
                Clunky workflows? Disconnected systems? A marketplace that needs to grow? An MVP that needs to scale?
                Baffling user behaviour to investigate?
              </p>
              <p className="hero__scene">That's my scene.</p>
              <p>UX/UI, product strategy, systems thinking, growth &amp; monetisation</p>
            </div>
            <ul className="hero__focus" aria-label="Focus areas">
              {['B2B SaaS', 'Marketplace', 'Platform', 'Mobile', 'B2C'].map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <div className="hero__actions">
              <a className="button button--primary" href="#work">
                Selected work <span aria-hidden="true">↓</span>
              </a>
              {contact.resume && (
                <a className="button" href={contact.resume} target="_blank" rel="noreferrer">
                  View resume <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
