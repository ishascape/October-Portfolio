import { caseHref } from '../links'
import { caseStudies } from '../data/content'
import { CardCarousel } from './CardCarousel'
import { AiPrinciples } from './AiPrinciples'
import './Work.css'

export function Work() {
  return (
    <section id="work" className="section paper-sheet" aria-labelledby="work-heading">
      <div className="container">
        <h2 id="work-heading" className="work__heading">
          {/* A hand-drawn crayon in brand blue, leading into the line like it's writing it. */}
          <svg className="work__crayon" viewBox="0 0 44 20" aria-hidden="true">
            <g transform="rotate(-18 22 10)">
              <rect className="crayon__cap" x="3" y="5.5" width="5" height="9" rx="1.5" />
              <rect className="crayon__body" x="7" y="5" width="25" height="10" rx="1.2" />
              <path className="crayon__tip" d="M32 5 L40.5 9.2 Q41.4 10 40.5 10.8 L32 15 Z" />
              <path className="crayon__band" d="M11 5.5 v9 M28 5.5 v9" />
              <path className="crayon__zigzag" d="M14 10 l2 -2.2 l2 4.4 l2 -4.4 l2 4.4 l2 -4.4 l2 2.2" />
            </g>
          </svg>
          <span>Designing for conversion, supply growth and activation.</span>
        </h2>

        <ol className="work__list">
          {caseStudies.map((s) => (
            <li key={s.id}>
              <article className="card" aria-labelledby={`card-${s.id}`}>
                <CardCarousel number={s.number} images={s.images} />

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
