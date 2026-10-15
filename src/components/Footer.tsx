import { sectionHref } from '../links'
import { availability, contact } from '../data/content'
import { KeyPlan } from './KeyPlan'
import './Footer.css'

// The footer is the drawing's title sheet: a key plan on the left, the legend and sign-off on the right.
export function Footer({ onHome }: { onHome: boolean }) {
  const linkedinHandle = contact.linkedin?.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
  return (
    <footer className="footer">
      <div className="container">
        <div className="titlesheet">
          <figure className="titlesheet__plan">
            <p className="label titlesheet__field">Key plan · Currently based in Sydney, Australia</p>
            <KeyPlan />
            <figcaption>
              <p className="label titlesheet__field">Legend</p>
              <ul className="titlesheet__key label">
                <li>
                  <svg viewBox="0 0 24 12" aria-hidden="true">
                    <rect x="0.5" y="0.5" width="23" height="11" fill="url(#keyplan-water)" className="keyplan__coast" />
                  </svg>
                  Water
                </li>
                <li>
                  <svg viewBox="0 0 24 12" aria-hidden="true">
                    <path d="M0 6 H24" className="keyplan__suburbs" />
                  </svg>
                  Suburb boundary
                </li>
                <li>
                  <svg viewBox="0 0 24 12" aria-hidden="true">
                    <path d="M0 9 C6 2 12 2 24 6" className="keyplan__contour keyplan__contour--index" />
                  </svg>
                  20 m contour
                </li>
                <li>
                  <svg viewBox="0 0 24 12" aria-hidden="true">
                    <circle cx="12" cy="6" r="5" className="keyplan__pin" />
                  </svg>
                  Zetland, where I'm based
                </li>
              </ul>
              <p className="titlesheet__credit">
                Suburb boundaries: NSW Spatial Services (CC BY 4.0). Terrain: Mapzen Terrain Tiles.
              </p>
            </figcaption>
          </figure>

          <dl className="titlesheet__legend">
            <div className="titlesheet__row titlesheet__row--name">
              <dt className="label titlesheet__field">Drawn by</dt>
              <dd className="titlesheet__name">Ashni Dave</dd>
            </div>
            <div className="titlesheet__row">
              <dt className="label titlesheet__field">Role</dt>
              <dd>Senior Product Designer</dd>
            </div>
            <div className="titlesheet__row">
              <dt className="label titlesheet__field">Availability</dt>
              <dd>{availability.short}</dd>
            </div>
            <div className="titlesheet__row">
              <dt className="label titlesheet__field">Email</dt>
              <dd>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </dd>
            </div>
            {contact.linkedin && (
              <div className="titlesheet__row">
                <dt className="label titlesheet__field">LinkedIn</dt>
                <dd>
                  <a href={contact.linkedin} target="_blank" rel="noreferrer">
                    {linkedinHandle} <span aria-hidden="true">↗</span>
                  </a>
                </dd>
              </div>
            )}
            <div className="titlesheet__row">
              <dt className="label titlesheet__field">Sheets</dt>
              <dd>
                <nav aria-label="Sheet index">
                  <ul className="titlesheet__index">
                    <li>
                      <a href={sectionHref('top', onHome)}>00 Introduction</a>
                    </li>
                    <li>
                      <a href={sectionHref('work', onHome)}>01 Work</a>
                    </li>
                    <li>
                      <a href={sectionHref('about', onHome)}>02 About</a>
                    </li>
                    <li>
                      <a href={sectionHref('contact', onHome)}>03 Contact</a>
                    </li>
                    {contact.resume && (
                      <li>
                        <a href={contact.resume} target="_blank" rel="noreferrer">
                          Resume <span aria-hidden="true">↗</span>
                        </a>
                      </li>
                    )}
                  </ul>
                </nav>
              </dd>
            </div>
            <div className="titlesheet__row titlesheet__row--sign">
              <dt className="label titlesheet__field">Signed off by</dt>
              <dd>
                <span className="titlesheet__signature" aria-hidden="true">
                  Ashni Dave
                </span>
                <span className="titlesheet__signatory">
                  Ashni Dave <span className="titlesheet__title">[Lead Designer]</span>
                </span>
              </dd>
            </div>
            <div className="titlesheet__row titlesheet__row--meta label">
              <div>
                <dt className="titlesheet__field">Date</dt>
                <dd>2026</dd>
              </div>
              <div>
                <dt className="titlesheet__field">Rev</dt>
                <dd>E</dd>
              </div>
              <div>
                <dt className="titlesheet__field">Scale</dt>
                <dd>NTS</dd>
              </div>
              <div>
                <dt className="titlesheet__field">Sheet</dt>
                <dd>04 / 04</dd>
              </div>
            </div>
          </dl>
        </div>
        <p className="footer__copy label">
          © 2026 Ashni Dave ·{' '}
          <a href={`${import.meta.env.BASE_URL}llms.txt`} className="footer__ai">
            Hey AI, read me here
          </a>
        </p>
      </div>
    </footer>
  )
}
