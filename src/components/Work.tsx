import { useEffect, useRef } from 'react'
import { caseHref } from '../links'
import { caseStudies } from '../data/content'
import { CardCarousel } from './CardCarousel'
import { CardVideo } from './CardVideo'
import { AiPrinciples } from './AiPrinciples'
import { RocketCrayon } from './RocketCrayon'
import './Work.css'
import './RocketCrayon.css'

// On touch screens there is no hover, so the rocket plays once each time the heading scrolls into view.
function usePlayOnView(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(hover: hover)').matches) return
    const io = new IntersectionObserver(([e]) => el.classList.toggle('is-inview', e.isIntersecting), {
      threshold: 1,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [ref])
}

export function Work() {
  const headingRef = useRef<HTMLHeadingElement>(null)
  usePlayOnView(headingRef)
  return (
    <section id="work" className="section paper-sheet" aria-labelledby="work-heading">
      <div className="container">
        <h2 id="work-heading" className="work__heading" ref={headingRef}>
          <span>Designing for conversion, supply growth and activation.</span>
          {/* A hand-drawn crayon at the end of the line, in brand blue that turns into a rocket and blasts to Saturn. */}
          <RocketCrayon />
        </h2>

        <ol className="work__list">
          {caseStudies.map((s) => (
            <li key={s.id}>
              <article className="card" aria-labelledby={`card-${s.id}`}>
                {s.video ? (
                  <CardVideo src={s.video.src} poster={s.video.poster} background={s.video.background} />
                ) : (
                  <CardCarousel number={s.number} images={s.images} />
                )}

                <div className="card__body">
                  <p className="label card__meta">
                    <span>{s.company}</span>
                    <span className="card__outcome">{s.outcome}</span>
                  </p>
                  <h3 id={`card-${s.id}`} className="card__title">
                    <a href={caseHref(s.slug)} className="card__link">
                      {s.title}
                    </a>
                  </h3>
                  <p className="card__summary">{s.summary}</p>

                  <p className="card__metric">
                    <span className="card__metric-value">{s.leadMetric.value}</span>
                    <span className="label">{s.leadMetric.label}</span>
                  </p>
                  <ul className="card__supporting">
                    {s.supporting.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>

                  <ul className="card__tags label" aria-label="Tags">
                    {s.tags.slice(0, 3).map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>

                  <p className="card__cta" aria-hidden="true">
                    <span className="button">
                      Read case study <span className="card__arrow">→</span>
                    </span>
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ol>

        <AiPrinciples />
      </div>
    </section>
  )
}
