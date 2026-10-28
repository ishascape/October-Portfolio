import { caseHref } from '../../links'
import type { CaseStudy } from '../../data/content'

function Pane({ study, dir }: { study: CaseStudy; dir: 'Previous' | 'Next' }) {
  const img = study.images?.[0]
  return (
    <a href={caseHref(study.slug)} className={`ed-nav__pane ed-nav__pane--${dir.toLowerCase()}`}>
      {img ? (
        <img className="ed-nav__img" src={img.src} alt="" loading="lazy" decoding="async" />
      ) : (
        <span className="ed-nav__img ed-nav__img--empty" aria-hidden="true" />
      )}
      <span className="ed-nav__text">
        <span className="label">
          {dir} · Drawing {study.number}
        </span>
        <span className="ed-nav__title">
          {dir === 'Previous' && <span aria-hidden="true">← </span>}
          {study.title}
          {dir === 'Next' && <span aria-hidden="true"> →</span>}
        </span>
        <span className="ed-nav__summary">{study.summary}</span>
      </span>
    </a>
  )
}

// Previous and next drawings: next is the larger pane, since it is where the reader is heading.
export function ProjectNavigation({ prev, next }: { prev: CaseStudy; next: CaseStudy }) {
  return (
    <nav className="ed-nav" aria-label="More case studies">
      <div className="container ed-nav__grid">
        <Pane study={prev} dir="Previous" />
        <Pane study={next} dir="Next" />
      </div>
    </nav>
  )
}
