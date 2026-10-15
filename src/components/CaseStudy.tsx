import { useState } from 'react'
import { caseStudies, type CaseStudyId } from '../data/content'
import { caseStudyPages } from '../data/caseStudyPages'
import { buildingArt, type PlanMode } from './SitePlan'
import { ModeSwitch } from './ModeSwitch'
import { PartiTransition } from './Parti'
import './CaseStudy.css'

export function CaseStudy({ id }: { id: CaseStudyId }) {
  const [mode, setMode] = useState<PlanMode>('proposed')
  const study = caseStudies.find((s) => s.id === id)!
  const page = caseStudyPages[id]
  const index = caseStudies.indexOf(study)
  const next = caseStudies[(index + 1) % caseStudies.length]
  const Art = buildingArt[id]

  return (
    <article className="case" aria-labelledby="case-title">
      <header className="case__header">
        <div className="container">
          <p className="label case__sheet">
            <a href="#work">← Selected work</a>
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
          </div>

          <dl className="case__meta">
            {page.meta.map((m) => (
              <div key={m.label}>
                <dt className="label">{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
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
        </div>
      </section>

      {page.sections.map((s) => (
        <section key={s.label} className="case__section">
          <div className="container case__section-grid">
            <p className="label case__section-label">{s.label}</p>
            <div className="case__section-body">
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
                    <li key={e.name}>
                      <h3 className="label">{e.name}</h3>
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
                    </li>
                  ))}
                </ol>
              )}
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
        </section>
      ))}

      <nav className="case__next" aria-label="Next case study">
        <div className="container">
          <a href={next.href} className="case__next-link">
            <PartiTransition from={id} to={next.id} />
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
