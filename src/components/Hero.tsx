import { caseHref } from '../links'
import { caseStudies, contact } from '../data/content'
import { HeroPuzzle } from './HeroPuzzle'
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
        <p className="label hero__sheet">
          <span>
            Sheet 00 / 03 · Introduction<span className="hero__sheet-role"> · Senior Product Designer, Sydney, AU</span>
          </span>
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
              <span className="hero__line">I love a good product puzzle.</span>
            </h1>
          </div>
          <figure className="hero__portrait">
            <HeroPuzzle />
          </figure>
          <div className="hero__support">
            <div className="hero__copy">
              <p className="hero__questions">
                Complex workflows? Disconnected systems? A marketplace with untapped potential? An MVP that needs to
                scale? User behaviour that doesn't quite add up?
              </p>
              <p className="hero__scene">That's my scene.</p>
              <p>Product strategy · Systems thinking · UX/UI · Commercial growth</p>
            </div>
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

        {/* Title block: who and where, and the index of drawings (case studies) that follow. */}
        <dl className="hero__titleblock">
          <div>
            <dt className="label">Role</dt>
            <dd>Senior Product Designer</dd>
          </div>
          <div>
            <dt className="label">Based</dt>
            <dd>Sydney, AU</dd>
          </div>
          <div className="hero__index">
            <dt className="label">Drawing index</dt>
            <dd>
              <ol>
                {caseStudies.map((c) => (
                  <li key={c.id}>
                    <a href={caseHref(c.slug)}>
                      <span className="hero__index-no">{c.number}</span> {c.title}
                    </a>
                  </li>
                ))}
              </ol>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
