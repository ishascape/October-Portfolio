import { caseHref, homeHref } from '../links'
import { useEffect, useState } from 'react'
import { Lightbox } from './Lightbox'
import { caseStudies, type CaseStudyId } from '../data/content'
import { caseStudyPages } from '../data/caseStudyPages'
import { buildingArt, type PlanMode } from './SitePlan'
import { ModeSwitch } from './ModeSwitch'
import { TreeAssistFlow } from './TreeAssistFlow'
import { BookingStatusWidget } from './BookingStatusWidget'
import { MvpScopeFlow } from './MvpScopeFlow'
import { HostDayFlow } from './HostDayFlow'
import { VenueFinderPrototype } from './VenueFinderPrototype'
import { LegacyBriefPrototype } from './LegacyBriefPrototype'
import { VenueShiftDiagram, VenueRankingDiagram, VenueProblemDiagram, VenueExperienceTrio } from './VenueFlows'
import { VenueGapsFlow } from './VenueGapsFlow'
import './CaseStudy.css'

// The Key product moments prototype is a separate page in an iframe. With reduced motion it is swapped for a still.
function VenuePrototype() {
  const src = '/venue-finder-prototype/'
  const poster = '/venue-finder-prototype/poster.webp'
  const title =
    'Auto-playing prototype of the Venue Finder flow on a phone: landing, prompt, event details, contact details, venue shortlist and confirmation.'
  const [still, setStill] = useState(false)
  useEffect(() => {
    setStill(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])
  return (
    <figure className="case__hero-proto">
      {still ? (
        <img src={poster} alt={title} width={420} height={720} />
      ) : (
        <iframe src={src} title={title} loading="lazy" tabIndex={-1} />
      )}
    </figure>
  )
}

// The HostHQ MVP prototype is a separate page in an iframe. With reduced motion it is swapped for a still.
function HostHqPrototype() {
  const title =
    'Auto-playing desktop prototype of the HostHQ MVP: Requests, Leads and filters, sending a proposal, the sent proposal, Proposals, Bookings and Reports.'
  const [still, setStill] = useState(false)
  useEffect(() => {
    setStill(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])
  return (
    <figure className="case__hq-proto">
      {still ? (
        <img src="/hosthq-prototype/poster.webp" alt={title} width={1440} height={1024} />
      ) : (
        <iframe src="/hosthq-prototype/" title={title} loading="lazy" tabIndex={-1} />
      )}
    </figure>
  )
}

export function CaseStudy({ id }: { id: CaseStudyId }) {
  const [mode, setMode] = useState<PlanMode>('proposed')
  const study = caseStudies.find((s) => s.id === id)!
  const page = caseStudyPages[id]
  const index = caseStudies.indexOf(study)
  const next = caseStudies[(index + 1) % caseStudies.length]
  const Art = buildingArt[id]

  const planFigure = (
    <figure className="case__drawing">
      <svg className="plan" data-mode={mode} viewBox="-12 -12 324 224" aria-hidden="true">
        <g className="plan__art">
          <Art />
        </g>
      </svg>
      <figcaption>
        <ModeSwitch mode={mode} onChange={setMode} />
        <span className="label case__state">{mode === 'existing' ? study.existing : study.proposed}</span>
      </figcaption>
    </figure>
  )

  return (
    <article className="case" aria-labelledby="case-title">
      <Lightbox />
      <header className="case__header">
        <div className="container">
          <p className="label case__sheet">
            <a href={homeHref('#work')}>← Selected work</a>
            <span>Drawing {study.number} · Case study</span>
          </p>

          <div className="case__intro">
            <div className="case__titles">
              <p className="label case__kicker">{page.kicker}</p>
              <h1 id="case-title" className="display" tabIndex={-1}>
                {study.title}
              </h1>
              <p className="case__subtitle">{page.subtitle}</p>
            </div>

            <div className={page.heroImage ? 'case__visual case__visual--image' : 'case__visual'}>
              {page.heroImage ? (
                <figure className="case__hero-image">
                  <img
                    src={page.heroImage.src}
                    alt={page.heroImage.alt}
                    width={page.heroImage.width}
                    height={page.heroImage.height}
                    fetchPriority="high"
                    decoding="async"
                  />
                </figure>
              ) : (
                planFigure
              )}
              <dl className="case__meta">
                {page.meta.map((m) => (
                  <div key={m.label}>
                    <dt className="label">{m.label}</dt>
                    <dd>{m.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </header>

      <section className="case__tldr" aria-label="Summary">
        <div className="container">
          <div className="case__ps">
            <div>
              <h2 className="label">Problem</h2>
              <p>{page.problem}</p>
            </div>
            <div>
              <h2 className="label">Solution</h2>
              <p>{page.solution}</p>
            </div>
          </div>
          <h2 className="label case__impact-label">Impact</h2>
          <ul className="case__impact">
            {page.impact.map((m) => (
              <li key={m.label}>
                <span className="case__impact-value">{m.value}</span>
                <span className="label">{m.label}</span>
              </li>
            ))}
          </ul>
          {page.impactNote && <p className="case__impact-note">{page.impactNote}</p>}
        </div>
      </section>

      {page.sections.map((s) => (
        <section key={s.label} className="case__section">
          <div className="container case__section-grid">
            <p className="label case__section-label">{s.label}</p>
            <div className="case__section-body">
              {s.eyebrow && (
                <p className="annotation case__eyebrow">
                  <svg viewBox="0 0 24 28" aria-hidden="true">
                    {s.eyebrowIcon === 'sword' ? (
                      <>
                        <path d="M19.5 2.5 L20.5 7.5 L10.5 17.5 L8 15 L18 5 Z" />
                        <path d="M6.5 13 L12.5 19 M8.2 21.2 L4 25.2 M3.2 21.6 L6.8 25.2" />
                        <path d="M16.5 7 L18 8.5" />
                      </>
                    ) : (
                      <>
                        <path d="M12 2.5 C7.2 2.4 4 6 4.2 10.4 C4.4 13.4 6 15 7.6 17 C8.4 18 8.6 18.8 8.6 20.2 H15.4 C15.4 18.8 15.6 18 16.4 17 C18 15 19.6 13.4 19.8 10.4 C20 6 16.8 2.6 12 2.5 Z" />
                        <path d="M9 23 H15 M10.2 26 H13.8" />
                        <path d="M10 12 L12 15 L14 12" />
                      </>
                    )}
                  </svg>
                  {s.eyebrow}
                </p>
              )}
              <h2 className="case__section-heading">{s.heading}</h2>
              {s.body?.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {s.list && (
                <ul className="case__list">
                  {s.list.map((item) => (
                    <li key={item.text}>
                      {item.title && <strong>{item.title}. </strong>}
                      {item.text}
                    </li>
                  ))}
                </ul>
              )}
              {s.experiments && (
                <ol className="case__experiments">
                  {s.experiments.map((e) => (
                    <li key={e.name} className={e.image ? 'case__experiment--image' : undefined}>
                      <h3 className="label">{e.name}</h3>
                      {e.image && (
                        <img
                          className="case__experiment-image"
                          src={e.image.src}
                          alt={e.image.alt}
                          width={e.image.width}
                          height={e.image.height}
                          loading="lazy"
                          decoding="async"
                        />
                      )}
                      <dl>
                        <div>
                          <dt className="label">Intent</dt>
                          <dd>{e.intent}</dd>
                        </div>
                        <div>
                          <dt className="label">Change</dt>
                          <dd>{e.change}</dd>
                        </div>
                        <div>
                          <dt className="label">Result</dt>
                          <dd>{e.result}</dd>
                        </div>
                      </dl>
                      {e.verdict && <p className="label case__verdict">{e.verdict}</p>}
                      {e.prototype === 'vf-v2' && <VenueFinderPrototype />}
                      {e.prototype === 'legacy' && <LegacyBriefPrototype />}
                    </li>
                  ))}
                </ol>
              )}
              {s.quotes && (
                <figure className="case__quotes">
                  {s.quotesCaption && <figcaption className="annotation">{s.quotesCaption}</figcaption>}
                  <div className="case__quote-cards">
                    {s.quotes.map((q) => (
                      <blockquote key={q.name} className={`case__quote${q.dark ? ' case__quote--dark' : ''}`}>
                        <p className="case__quote-name">
                          {q.name}
                          <span>{q.role}</span>
                        </p>
                        {q.lines.map((l) => (
                          <p key={l}>“{l}”</p>
                        ))}
                      </blockquote>
                    ))}
                  </div>
                </figure>
              )}
              {s.decisions && (
                <ol className="case__decisions">
                  {s.decisions.map((d) => (
                    <li key={d.title}>
                      <h3 className="label">{d.title}</h3>
                      <dl>
                        <div>
                          <dt className="label">Problem</dt>
                          <dd>{d.problem}</dd>
                        </div>
                        <div>
                          <dt className="label">Options</dt>
                          <dd>{d.options}</dd>
                        </div>
                        <div>
                          <dt className="label">Decision</dt>
                          <dd>{d.decision}</dd>
                        </div>
                        <div>
                          <dt className="label">Why</dt>
                          <dd>{d.why}</dd>
                        </div>
                        <div>
                          <dt className="label">What shipped</dt>
                          <dd>{d.shipped}</dd>
                        </div>
                      </dl>
                    </li>
                  ))}
                </ol>
              )}
              {s.moments?.map((m) => (
                <figure key={m.title} className="case__moment">
                  <img
                    className={
                      m.image.bordered ? 'case__moment-image case__moment-image--bordered' : 'case__moment-image'
                    }
                    src={m.image.src}
                    alt={m.image.alt}
                    width={m.image.width}
                    height={m.image.height}
                    loading="lazy"
                    decoding="async"
                  />
                  {m.widget === 'booking-status' && <BookingStatusWidget />}
                  <figcaption>
                    <h3 className="label">{m.title}</h3>
                    <dl>
                      <div>
                        <dt className="label">Problem</dt>
                        <dd>{m.problem}</dd>
                      </div>
                      <div>
                        <dt className="label">Decision</dt>
                        <dd>{m.decision}</dd>
                      </div>
                      <div>
                        <dt className="label">Why</dt>
                        <dd>{m.why}</dd>
                      </div>
                    </dl>
                  </figcaption>
                </figure>
              ))}
              {s.dayDiagram && <HostDayFlow caption={s.dayDiagram.caption} />}
              {s.diagram === 'vf-shift' && <VenueShiftDiagram />}
              {s.diagram === 'vf-ranking' && <VenueRankingDiagram />}
              {s.diagram === 'vf-problem' && <VenueProblemDiagram />}
              {s.diagram === 'vf-experience' && <VenueExperienceTrio />}
              {s.diagram === 'vf-prototype' && (
                <div className="case__proto-split">
                  <VenuePrototype />
                  {s.keyDecisions && (
                    <div className="case__key-decisions">
                      {s.keyDecisions.map((d) => (
                        <div key={d.title}>
                          <strong>{d.title}</strong>
                          <p>{d.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {s.diagram === 'vf-gaps' && <VenueGapsFlow />}
              {s.diagram === 'hq-prototype' && <HostHqPrototype />}
              {s.image && (
                <figure
                  className={`case__figure case__figure--image${s.image.bordered ? ' case__figure--bordered' : ''}`}
                >
                  <img
                    src={s.image.src}
                    alt={s.image.alt}
                    width={s.image.width}
                    height={s.image.height}
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption className={s.image.plainCaption ? 'case__caption-plain' : 'annotation'}>{s.image.caption}</figcaption>
                </figure>
              )}
              {s.figures?.map((f) => (
                <figure key={f} className="case__figure">
                  <div className="case__figure-frame" aria-hidden="true">
                    <span className="label">Image to come</span>
                  </div>
                  <figcaption className="annotation">{f}</figcaption>
                </figure>
              ))}
              {s.figure && (
                <figure className="case__figure">
                  <div className="case__figure-frame" aria-hidden="true">
                    <span className="label">Image to come</span>
                  </div>
                  <figcaption className="annotation">{s.figure}</figcaption>
                </figure>
              )}
            </div>
          </div>
          {(s.plan ||
            s.planDiagram ||
            s.planImage ||
            s.planImageTop ||
            s.planImage3 ||
            s.planImage4 ||
            s.bookingStatus) && (
            <div className={`container case__section-grid case__plan${s.planImageTop ? ' case__plan--spaced' : ''}`}>
              <span aria-hidden="true" />
              <div className="case__plan-stack">
                {s.planImage ? (
                  <figure
                    className={`case__figure case__figure--image${s.planImage.bordered ? ' case__figure--bordered' : ''}${s.planImage.transparent ? ' case__figure--clear' : ''}`}
                  >
                    <img
                      src={s.planImage.src}
                      alt={s.planImage.alt}
                      width={s.planImage.width}
                      height={s.planImage.height}
                      loading="lazy"
                      decoding="async"
                    />
                  </figure>
                ) : s.planDiagram === 'mvp-scope' ? (
                  <MvpScopeFlow />
                ) : s.plan === 'flow' ? (
                  <TreeAssistFlow />
                ) : s.plan ? (
                  planFigure
                ) : null}
                {s.planImageTop && (
                  <figure
                    className={`case__figure case__figure--image${s.planImageTop.bordered ? ' case__figure--bordered' : ''}`}
                  >
                    <img
                      src={s.planImageTop.src}
                      alt={s.planImageTop.alt}
                      width={s.planImageTop.width}
                      height={s.planImageTop.height}
                      loading="lazy"
                      decoding="async"
                    />
                    <figcaption className="annotation case__figure-caption--spaced">
                      {s.planImageTop.caption}
                    </figcaption>
                  </figure>
                )}
                {s.planImage3 && (
                  <figure
                    className={`case__figure case__figure--image${s.planImage3.bordered ? ' case__figure--bordered' : ''}`}
                  >
                    <img
                      src={s.planImage3.src}
                      alt={s.planImage3.alt}
                      width={s.planImage3.width}
                      height={s.planImage3.height}
                      loading="lazy"
                      decoding="async"
                    />
                    <figcaption className="annotation">{s.planImage3.caption}</figcaption>
                  </figure>
                )}
                {s.bookingStatus && (
                  <div className="case__callout">
                    {s.bookingStatus.callout.map((c) => (
                      <p key={c.title}>
                        <strong>{c.title}</strong>
                        {c.text}
                      </p>
                    ))}
                  </div>
                )}
                {s.planImage4 && (
                  <figure className="case__figure case__figure--image">
                    {s.planImage4.title && <figcaption className="case__figure-title">{s.planImage4.title}</figcaption>}
                    <img
                      src={s.planImage4.src}
                      alt={s.planImage4.alt}
                      width={s.planImage4.width}
                      height={s.planImage4.height}
                      loading="lazy"
                      decoding="async"
                    />
                  </figure>
                )}
                {s.bookingStatus && (
                  <figure className="case__figure">
                    <BookingStatusWidget />
                  </figure>
                )}
                {s.planImage2 && (
                  <figure className="case__figure case__figure--image case__figure--clear">
                    <img
                      src={s.planImage2.src}
                      alt={s.planImage2.alt}
                      width={s.planImage2.width}
                      height={s.planImage2.height}
                      loading="lazy"
                      decoding="async"
                    />
                    {s.planImage2.caption && <figcaption className="annotation">{s.planImage2.caption}</figcaption>}
                  </figure>
                )}
              </div>
            </div>
          )}
        </section>
      ))}

      <nav className="case__next" aria-label="Next case study">
        <div className="container">
          <a href={caseHref(next.slug)} className="case__next-link">
            {next.images?.[0] ? (
              <img className="case__next-image" src={next.images[0].src} alt="" loading="lazy" decoding="async" />
            ) : (
              <span className="case__next-image case__next-image--placeholder" aria-hidden="true">
                <span className="label">Product image to come</span>
              </span>
            )}
            <span className="case__next-text">
              <span className="label">Next · Drawing {next.number}</span>
              <span className="case__next-title">
                {next.title} <span aria-hidden="true">→</span>
              </span>
              <span className="case__next-summary">{next.summary}</span>
            </span>
          </a>
        </div>
      </nav>
    </article>
  )
}
