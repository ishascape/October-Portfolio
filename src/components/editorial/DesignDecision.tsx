import type { Decision } from '../../data/caseStudyPages'

// One decision as a log entry. The decision itself is the headline; the rest reads as a schedule underneath.
export function DesignDecision({ n, d }: { n: number; d: Decision }) {
  return (
    <li className="ed-decision">
      <div className="ed-decision__id">
        <span className="ed-decision__n" aria-hidden="true">
          D-{String(n).padStart(2, '0')}
        </span>
        <h3 className="label">{d.title}</h3>
      </div>
      <div className="ed-decision__body">
        <p className="ed-decision__statement">{d.decision}</p>
        <dl className="ed-schedule">
          <div>
            <dt className="label">Problem</dt>
            <dd>{d.problem}</dd>
          </div>
          <div>
            <dt className="label">Options</dt>
            <dd>{d.options}</dd>
          </div>
          <div>
            <dt className="label">Why</dt>
            <dd>{d.why}</dd>
          </div>
          <div>
            <dt className="label">What shipped</dt>
            <dd>{d.shipped}</dd>
          </div>
        </dl>
      </div>
    </li>
  )
}
