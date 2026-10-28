import type { Metric } from '../../data/caseStudyPages'

// Impact figures as a drawing schedule: the lead figure is set oversized, the others hang off it on leader rules.
export function MetricHighlight({ metrics, note }: { metrics: Metric[]; note?: string }) {
  const [lead, ...rest] = metrics
  if (!lead) return null
  return (
    <div className="ed-metrics">
      <h2 className="label ed-metrics__label">Impact</h2>
      <div className="ed-metrics__lead">
        <span className="ed-metrics__mega">{lead.value}</span>
        <span className="label">{lead.label}</span>
      </div>
      <ul className="ed-metrics__rest">
        {rest.map((m) => (
          <li key={m.label}>
            <span className="ed-metrics__value">{m.value}</span>
            <span className="label">{m.label}</span>
          </li>
        ))}
      </ul>
      {note && <p className="ed-metrics__note">{note}</p>}
    </div>
  )
}
