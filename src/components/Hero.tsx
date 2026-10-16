import { contact } from '../data/content'
import portrait from '../assets/ashni-portrait.webp'
import portraitSketch from '../assets/ashni-portrait-sketch.webp'
import { revealAt, revealEnd } from './reveal'
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
              Hey, I'm Ashni!
              {/* A pen-drawn asterisk in place of an emoji. */}
              <svg className="hero__smile" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3.2 L12.4 20.6" />
                <path d="M4.2 7.6 L19.8 16.2" />
                <path d="M19.6 7.2 L4.6 16.6" />
              </svg>
            </p>
            <h1 id="hero-heading" className="display">
              I love a good product puzzle. Especially a messy one.
            </h1>
          </div>
          <figure className="hero__portrait">
            {/* Hovering with a mouse or pen reveals a line-art version of the photo under the cursor. */}
            <div className="hero__portrait-frame" onPointerMove={revealAt} onPointerLeave={revealEnd}>
              <img
                src={portrait}
                alt="Ashni Dave smiling, with long dark hair, in a blue denim top, standing in a garden."
                width={960}
                height={1200}
                fetchPriority="high"
                decoding="async"
              />
              <img
                className="hero__portrait-sketch"
                src={portraitSketch}
                alt=""
                width={960}
                height={1200}
                decoding="async"
              />
            </div>
            <figcaption className="annotation">Fig. 00. Ashni Dave</figcaption>
          </figure>
          <div className="hero__support">
            <div className="hero__copy">
              <p>
                Clunky workflows? Disconnected systems? A marketplace that needs to grow? A product ready to scale?
                Baffling user behaviour that needs investigation?
              </p>
              <p className="hero__scene">That's my scene.</p>
              <p>
                I'm a product designer blending design, strategy and commercial thinking to make complex products
                simpler, smarter and more successful.
              </p>
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
