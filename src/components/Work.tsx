import { caseHref } from '../links'
import { caseStudies } from '../data/content'
import { CardCarousel } from './CardCarousel'
import './Work.css'

export function Work() {
  return (
    <section id="work" className="section paper-sheet" aria-labelledby="work-heading">
      <div className="container">
        <h2 id="work-heading" className="display work__heading">
          Using design to solve for conversion, retention and activation.
        </h2>

        <ol className="work__list">
          {caseStudies.map((s) => (
            <li key={s.id}>
              <article className="card" aria-labelledby={`card-${s.id}`}>
                <CardCarousel number={s.number} images={s.images} />

                <div className="card__body">
                  <p className="label card__meta">
                    <span>
                      {s.number} · {s.company}
                    </span>
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

        <p className="work__footer">
          Also shipped: a Gift Subscription MVP that made £500k+ in year one, and 5× free-trial conversion at
          Findmypast. Happy to walk through either.
        </p>
      </div>
    </section>
  )
}
