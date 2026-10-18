import { evidence, type EvidenceId } from '../data/evidence'
import './EvidencePlaceholder.css'

// A dotted outline marking exactly where a piece of evidence belongs. Renders only in dev and on preview
// deployments (see vite.config.ts); production builds render nothing, so layout spacing is unchanged.
export function EvidencePlaceholder({ id }: { id: EvidenceId }) {
  if (!__SHOW_EVIDENCE__) return null
  const e = evidence[id]
  const ratio = 'ratio' in e ? e.ratio : undefined
  return (
    <aside
      className="evidence"
      data-evidence-id={id}
      aria-label={`${e.kind === 'verify' ? 'Verify claim' : 'Evidence needed'}: ${e.title}`}
    >
      <p className="evidence__label">
        <svg viewBox="0 0 16 16" aria-hidden="true">
          {e.kind === 'verify' ? (
            <path d="M8 2 L14.5 13.5 H1.5 Z M8 6.5 V9.5 M8 11.5 V11.6" />
          ) : (
            <path d="M2 3 H14 V13 H2 Z M2 10 L6 7 L9 10 L11 8.5 L14 11" />
          )}
        </svg>
        {e.kind === 'verify' ? 'Verify claim' : 'Evidence needed'} · {e.title}
        <span className="evidence__priority">{e.priority}</span>
      </p>
      <p>{e.ask}</p>
      <p className="evidence__why">{e.why}</p>
      <p className="evidence__format">Suggested format: {e.format}</p>
      {ratio && <span className="evidence__frame" style={{ aspectRatio: ratio }} aria-hidden="true" />}
    </aside>
  )
}
