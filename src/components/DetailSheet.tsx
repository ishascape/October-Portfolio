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
            <p className="mono sheet__number">
              Drawing {study.number} · {study.company}
            </p>
            <button type="button" className="sheet__close mono" onClick={() => ref.current?.close()}>
              Close <span aria-hidden="true">×</span>
            </button>
          </div>
          <h2 id="sheet-title" className="sheet__title">
            {study.title}
          </h2>
          <p className="sheet__summary">{study.summary}</p>

          <p className="sheet__metric">
            <span className="sheet__metric-value">{study.leadMetric.value}</span>
            <span className="mono">{study.leadMetric.label}</span>
          </p>

          <dl className="sheet__states">
            <div>
              <dt className="mono">Existing</dt>
              <dd>{study.existing}</dd>
            </div>
            <div>
              <dt className="mono">Proposed</dt>
              <dd>{study.proposed}</dd>
            </div>
            <div>
              <dt className="mono">Role</dt>
              <dd>{study.role}</dd>
            </div>
            <div>
              <dt className="mono">System</dt>
              <dd>{study.system}</dd>
            </div>
          </dl>

          <a className="button button--primary sheet__cta" href={study.href} target="_blank" rel="noreferrer">
            Read case study <span aria-hidden="true">↗</span>
          </a>
        </div>
      )}
    </dialog>
  )
}
