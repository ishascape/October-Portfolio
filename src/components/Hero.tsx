import { contact } from '../data/content'
import portrait from '../assets/ashni-portrait.webp'
import './Hero.css'

export function Hero() {
  return (
    <section id="top" className="hero paper-sheet" aria-labelledby="hero-heading">
      <div className="container">
        <div className="hero__intro">
          <div className="hero__text">
            <div className="hero__title">
              <h1 id="hero-heading" className="display">
                <span className="hero__line">I turn complex product problems into business growth.</span>
              </h1>
              <p className="hero__role">
                <span>Senior Product Designer ·</span> <span>Strategy to shipped product ·</span>{' '}
                <span>B2B SaaS, AI &amp; marketplaces</span>
              </p>
            </div>
            <div className="hero__support">
              <div className="hero__copy">
                <p className="hero__lede">
                  I bring customer insight, data and business goals together to design, ship and improve products people
                  love to use.
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
          {/* Ashni's portrait as a polaroid, like the Field notes prints. Hovering the card makes the smile wink. */}
          <figure className="hero__portrait hero__polaroid">
            <div className="hero__polaroid-photo">
              <img
                src={portrait}
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
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
