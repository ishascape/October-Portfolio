import { contact } from '../data/content'
import { Skills } from './Skills'
import portrait from '../assets/ashni-portrait.webp'
import portraitSketch from '../assets/ashni-portrait-sketch.webp'
import { revealAt, revealEnd } from './reveal'
import './Hero.css'

export function Hero() {
  return (
    <section id="top" className="hero paper-sheet" aria-labelledby="hero-heading">
      <div className="container">
        <p className="label hero__sheet">
          <span>Sheet 00 / 03 · Introduction</span>
          <span aria-hidden="true">Scale NTS</span>
        </p>

        <div className="hero__intro">
          <div className="hero__title">
            <p className="annotation hero__hello">
              Hey! I'm Ashni
              {/* A pen-drawn smile in place of an emoji. */}
              <svg className="hero__smile" viewBox="0 0 32 24" aria-hidden="true">
                <path d="M15 1.8 C8 1.6 4.8 6.6 5.2 12.4 C5.6 18.6 10.4 22.4 16.4 22.1 C22.8 21.8 27 17.4 26.6 11.4 C26.3 5.6 22 1.9 16.8 1.6 C14.6 1.5 12.8 2.2 11.4 3.2" />
                <path d="M11.5 9.5 v1.4 M20.5 9.5 v1.4" />
                <path d="M9.5 14 C12 18.5 20 18.5 22.5 13.6" />
              </svg>
            </p>
            <h1 id="hero-heading" className="display">
              I design coherent &amp; scalable products for complex businesses.
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
              <img className="hero__portrait-sketch" src={portraitSketch} alt="" width={960} height={1200} decoding="async" />
            </div>
            <figcaption className="annotation">Fig. 00. Ashni Dave</figcaption>
          </figure>
          <div className="hero__support">
            <p>
              Senior Product Designer for B2B SaaS, marketplaces and AI. I design the whole system, not just
              screens. Research, data and commercial impact decide what ships.
            </p>
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
          <div className="hero__skills">
            <Skills />
          </div>
        </div>
      </div>
    </section>
  )
}
