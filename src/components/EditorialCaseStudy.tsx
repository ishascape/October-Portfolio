import { caseStudies, type CaseStudyId } from '../data/content'
import { caseStudyPages, type Section } from '../data/caseStudyPages'
import { Lightbox } from './Lightbox'
import { BookingStatusWidget } from './BookingStatusWidget'
import { HostDayFlow } from './HostDayFlow'
import { HostHqPrototype } from './HostHqPrototype'
import {
  AnnotatedScreenshot,
  BeforeAfterComparison,
  DesignDecision,
  MetricHighlight,
  ProjectHero,
  ProjectNavigation,
  ResearchEvidence,
  SectionHeader,
} from './editorial'
import './editorial/editorial.css'

// A case study composed from the editorial components. The page data is the same as the original layout's;
// each section picks its composition from what it holds (a diagram, screens, decisions, a list), so another
// case study can opt in with `editorial: true` once its sections are covered.
export function EditorialCaseStudy({ id }: { id: CaseStudyId }) {
  const page = caseStudyPages[id]
  const study = caseStudies.find((s) => s.id === id)!
  const index = caseStudies.indexOf(study)
  const next = caseStudies[(index + 1) % caseStudies.length]
  const prev = caseStudies[(index - 1 + caseStudies.length) % caseStudies.length]
  const total = page.sections.length

  const renderSection = (s: Section, i: number) => {
    const num = s.label.split(' · ')[0]
    const sid = `sec-${i}`

    if (s.dayDiagram) {
      return (
        <section key={s.label} className="ed-section ed-section--loose" aria-labelledby={sid}>
          <div className="container ed-stack">
            <SectionHeader id={sid} label={s.label} heading={s.heading} eyebrow={s.eyebrow} total={total} variant="statement" />
            <ResearchEvidence body={s.body}>
              <HostDayFlow caption={s.dayDiagram.caption} />
            </ResearchEvidence>
          </div>
        </section>
      )
    }

    if (s.planImage2) {
      return (
        <section key={s.label} className="ed-section ed-section--sunk" aria-labelledby={sid}>
          <div className="container ed-stack">
            <SectionHeader id={sid} label={s.label} heading={s.heading} total={total} />
            {s.list && (
              <ol className="ed-strategy">
                {s.list.map((item) => (
                  <li key={item.text}>{item.text}</li>
                ))}
              </ol>
            )}
            <BeforeAfterComparison {...s.planImage2} />
          </div>
        </section>
      )
    }

    if (s.diagram === 'hq-prototype') {
      return (
        <section key={s.label} className="ed-section" aria-labelledby={sid}>
          <div className="container ed-proto">
            <SectionHeader id={sid} label={s.label} heading={s.heading} total={total} variant="statement" />
            <div className="ed-prose">
              {s.body?.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="ed-proto__frame">
              <HostHqPrototype />
            </div>
          </div>
        </section>
      )
    }

    if (s.moments) {
      return (
        <section key={s.label} className="ed-section ed-section--tight" aria-labelledby={sid}>
          <div className="container ed-stack">
            <SectionHeader id={sid} label={s.label} heading={s.heading} total={total} />
            <div className="ed-shots">
              {s.moments.map((m, n) => (
                <AnnotatedScreenshot key={m.title} fig={`${num}.${n + 1}`} m={m} flip={n % 2 === 1}>
                  {m.widget === 'booking-status' && <BookingStatusWidget />}
                </AnnotatedScreenshot>
              ))}
            </div>
          </div>
        </section>
      )
    }

    if (s.decisions) {
      return (
        <section key={s.label} className="ed-section" aria-labelledby={sid}>
          <div className="container ed-stack">
            <SectionHeader id={sid} label={s.label} heading={s.heading} total={total} variant="statement" />
            <ol className="ed-decisions">
              {s.decisions.map((d, n) => (
                <DesignDecision key={d.title} n={n + 1} d={d} />
              ))}
            </ol>
          </div>
        </section>
      )
    }

    if (s.list) {
      return (
        <section key={s.label} className="ed-section" aria-labelledby={sid}>
          <div className="container ed-stack">
            <SectionHeader id={sid} label={s.label} heading={s.heading} total={total} />
            <div className="ed-split">
              <ul className="ed-next ed-split__main">
                {s.list.map((item) => (
                  <li key={item.text}>{item.text}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )
    }

    // Plain prose: the closing reflection reads as a statement.
    return (
      <section key={s.label} className="ed-section ed-section--loose" aria-labelledby={sid}>
        <div className="container ed-stack">
          <SectionHeader id={sid} label={s.label} heading={s.heading} total={total} variant="statement" />
          <div className="ed-reflection">
            {s.body?.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <article className="case case--editorial" aria-labelledby="case-title">
      <Lightbox />
      <ProjectHero
        number={study.number}
        title={study.title}
        kicker={page.kicker}
        subtitle={page.subtitle}
        image={page.heroImage}
        meta={page.meta}
      />

      <section className="ed-section" aria-label="Summary">
        <div className="container ed-stack">
          <div className="ed-brief">
            <div className="ed-brief__col ed-brief__col--problem">
              <h2 className="label">Problem</h2>
              <p>{page.problem}</p>
            </div>
            <div className="ed-brief__col ed-brief__col--solution">
              <h2 className="label">Solution</h2>
              <p>{page.solution}</p>
            </div>
          </div>
          <MetricHighlight metrics={page.impact} note={page.impactNote} />
        </div>
      </section>

      {page.sections.map(renderSection)}

      <ProjectNavigation prev={prev} next={next} />
    </article>
  )
}
