import { caseStudies } from '../data/content'
import { SheetLabel } from './SheetLabel'
import './Work.css'

export function Work() {
  return (
    <section id="work" className="section paper-sheet" aria-labelledby="work-heading">
      <div className="container">
        <SheetLabel sheet="01 / 03" title="Selected work" />
        <h2 id="work-heading" className="display work__heading">
          Three products, one habit: design the system first, then the surface.
        </h2>

        <ol className="work__list">
          {caseStudies.map((s) => (
            <li key={s.id}>
              <article className="card" aria-labelledby={`card-${s.id}`}>
                <div className="card__image" aria-hidden="true">
                  <span className="label">Drawing {s.number}</span>
                  <span className="label card__image-note">System diagram to come</span>
                </div>

                <div className="card__body">
                  <p className="label card__meta">
                    {s.number} · {s.company}
                  </p>
                  <h3 id={`card-${s.id}`} className="card__title">
                    <a href={s.href} className="card__link">
                      {s.title}
                    </a>
                  </h3>
                  <p className="card__summary">{s.summary}</p>
                  <p className="card__role">{s.role}</p>

                  <p className="card__metric">
                    <span className="card__metric-value">{s.leadMetric.value}</span>
                    <span className="label">{s.leadMetric.label}</span>
                  </p>
                  <ul className="card__supporting">
                    {s.supporting.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>

                  <p className="card__system">
                    <span className="label">System</span> {s.system}
                  </p>

                  <ul className="card__tags label" aria-label="Tags">
                    {s.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>

                  <p className="card__cta label" aria-hidden="true">
                    Read case study <span className="card__arrow">→</span>
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ol>

        <p className="work__footer">More work, including growth and monetisation experiments, available on request.</p>
      </div>
    </section>
  )
}
