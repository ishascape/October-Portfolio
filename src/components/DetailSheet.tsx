import { caseHref } from '../links'
import { useEffect, useRef } from 'react'
import type { CaseStudy } from '../data/content'
import './DetailSheet.css'

interface DetailSheetProps {
  study: CaseStudy | null
  onClose: () => void
}

// A native <dialog>: focus trapping and Esc come from the browser.
// Bottom sheet on mobile, side sheet on larger screens.
export function DetailSheet({ study, onClose }: DetailSheetProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (study && !dialog.open) dialog.showModal()
    if (!study && dialog.open) dialog.close()
  }, [study])

  return (
    <dialog
      ref={ref}
      className="sheet"
      aria-labelledby="sheet-title"
      onClose={onClose}
      onClick={(e) => {
        // A click on the backdrop lands on the dialog element itself.
        if (e.target === e.currentTarget) ref.current?.close()
      }}
    >
      {study && (
        <div className="sheet__body">
          <div className="sheet__head">
            <p className="label sheet__number">
              Drawing {study.number} · {study.company}
            </p>
            <button type="button" className="sheet__close label" onClick={() => ref.current?.close()}>
              Close <span aria-hidden="true">×</span>
            </button>
          </div>
          <h2 id="sheet-title" className="sheet__title">
            {study.title}
          </h2>
          <p className="sheet__summary">{study.summary}</p>

          <p className="sheet__metric">
            <span className="sheet__metric-value">{study.leadMetric.value}</span>
            <span className="label">{study.leadMetric.label}</span>
          </p>

          <dl className="sheet__states">
            <div>
              <dt className="label">Existing</dt>
              <dd>{study.existing}</dd>
            </div>
            <div>
              <dt className="label">Proposed</dt>
              <dd>{study.proposed}</dd>
            </div>
            <div>
              <dt className="label">Role</dt>
              <dd>{study.role}</dd>
            </div>
            <div>
              <dt className="label">System</dt>
              <dd>{study.system}</dd>
            </div>
          </dl>

          <a className="button button--primary sheet__cta" href={caseHref(study.slug)}>
            Read case study <span aria-hidden="true">→</span>
          </a>
        </div>
      )}
    </dialog>
  )
}
