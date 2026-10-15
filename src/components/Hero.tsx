import { availability, capabilities, contact } from '../data/content'
import { Skills } from './Skills'
import portrait from '../assets/ashni-portrait.webp'
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
          <h1 id="hero-heading" className="display">
            I design coherent &amp; scalable products for complex businesses.
          </h1>
          <figure className="hero__portrait">
            <div className="hero__portrait-frame">
              <img
                src={portrait}
                alt="Ashni Dave smiling, with long dark hair, in a blue denim top, standing in a garden."
                width={960}
                height={1200}
                fetchPriority="high"
                decoding="async"
              />
            </div>
            <figcaption className="annotation">Fig. 00. Ashni Dave</figcaption>
          </figure>
          <div className="hero__support">
            <p>
              Senior Product Designer for B2B SaaS, marketplaces and AI. I design the whole system, not just
              screens. Research, data and commercial impact decide what ships.
            </p>
            <ul className="hero__capabilities label" aria-label="How I work">
              {capabilities.map((c) => (
                <li key={c}>
                  <a href="#how-i-work">{c}</a>
                </li>
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
          <div className="hero__skills">
            <Skills />
          </div>
        </div>

        <div className="hero__footer">
          <dl className="title-block label">
            <div className="title-block__name">
              <dt className="visually-hidden">Name</dt>
              <dd>Ashni Dave</dd>
            </div>
            <div>
              <dt className="visually-hidden">Role</dt>
              <dd>Senior Product Designer</dd>
            </div>
            <div>
              <dt className="visually-hidden">Location</dt>
              <dd>{availability.location.replace(/\.$/, '')}</dd>
            </div>
            <div>
              <dt className="visually-hidden">Availability</dt>
              <dd>{availability.short}</dd>
            </div>
            <div className="title-block__rev">
              <dt className="visually-hidden">Revision</dt>
              <dd>Drawn 2026 · Rev E</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
