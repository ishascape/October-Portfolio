import './VenueSystem.css'

// Two compact diagrams for the Venue Finder case study: the matching flow, and the four ranking signals.
// No weights, thresholds or formulas are drawn: none were supplied.

const flow = [
  { name: 'Guest intent', text: 'Free text, or location, capacity, event type and vibe', status: 'Confirmed' },
  { name: 'Matching', text: 'Intent compared with every venue in the inventory', status: 'Confirmed' },
  { name: 'Candidate venues', text: 'Venues that could fit', status: 'Design intent' },
  { name: 'Eligibility and ranking', text: 'Which can show, and in what order', status: 'Confirmed' },
  { name: 'Recommendations', text: 'Cards and a map, before any enquiry', status: 'Confirmed' },
  { name: 'Feedback', text: 'I’m interested, Not for me', status: 'Confirmed' },
]

export function VenueSystemFlow() {
  return (
    <figure className="vsys" aria-label="How a guest's intent becomes recommendations, step by step">
      <ol className="vsys__steps">
        {flow.map((s) => (
          <li key={s.name} data-status={s.status === 'Confirmed' ? 'confirmed' : 'intent'}>
            <b>{s.name}</b>
            <span>{s.text}</span>
            <em>{s.status}</em>
          </li>
        ))}
      </ol>
      <figcaption className="annotation">
        Feedback is where the loop could close. What it changed is still to confirm.
      </figcaption>
    </figure>
  )
}

const signals = [
  { name: 'Best-fit relevance', text: 'The guest’s own words and must-haves. Ranks high even on a free plan.' },
  { name: 'Host activity', text: 'Engaged, responsive hosts are surfaced.' },
  { name: 'Premium status', text: 'Subscribers get extra visibility.' },
  { name: 'Paid Spotlight', text: 'A paid boost for Spotlight Partners.' },
]

const tensions = [
  ['Relevance', 'Host activity', 'The best fit may be quiet. The responsive host may fit less.'],
  ['Relevance', 'Revenue', 'A paid boost must not outrank a clearly better fit.'],
  ['Revenue', 'Guest trust', 'Too many sponsored slots and the list stops feeling like advice.'],
  ['Top relevance', 'Variety', 'Ten near-identical best matches are less useful than a varied few.'],
]

export function VenueSignals() {
  return (
    <figure className="vsig" aria-label="The four ranking signals and the objectives that conflict">
      <ol className="vsig__signals">
        {signals.map((s, i) => (
          <li key={s.name}>
            <span className="vsig__n" aria-hidden="true">
              {i + 1}
            </span>
            <b>{s.name}</b>
            <span>{s.text}</span>
          </li>
        ))}
      </ol>
      <p className="vsig__head">Where they pull against each other</p>
      <ul className="vsig__tensions">
        {tensions.map(([a, b, t]) => (
          <li key={a + b}>
            <span className="vsig__pair">
              {a} <i aria-hidden="true">↔</i> {b}
            </span>
            <span>{t}</span>
          </li>
        ))}
      </ul>
      <figcaption className="annotation">Order, not weights: how much each signal counts is not shown.</figcaption>
    </figure>
  )
}
