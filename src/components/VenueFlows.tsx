import './VenueFlows.css'

// Two compact diagrams for the Venue Finder case study, in the portfolio's pencil-box style.

const before = ['13-step brief', 'Lead Feed', 'Venues respond', 'Guest evaluates']
const after = ['Guest intent', 'Semantic matching', 'Ranked venues', 'Guest pre-screens', 'Better-fit enquiries']

export function VenueShiftDiagram() {
  return (
    <figure className="vf-flow" aria-label="Existing and proposed Venue Finder workflows">
      <div className="vf-flow__lane">
        <p className="vf-flow__tag">Before: venue-led</p>
        <ol className="vf-flow__steps">
          {before.map((s) => (
            <li key={s}>{s}</li>
          ))}
          <li className="vf-flow__end vf-flow__end--warn">Guests drop off</li>
        </ol>
        <p className="vf-flow__note vf-flow__note--warn">No venues shown until a venue replies</p>
      </div>
      <div className="vf-flow__lane vf-flow__lane--after">
        <p className="vf-flow__tag">After: guest-led</p>
        <ol className="vf-flow__steps">
          {after.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
        <p className="vf-flow__note">Venues shown before anything is submitted</p>
      </div>
    </figure>
  )
}

const signals = [
  { name: 'Best fit', text: 'Ranks high even on a free plan' },
  { name: 'Active venues', text: 'Engaged hosts are surfaced' },
  { name: 'Premium', text: 'Extra visibility' },
  { name: 'Spotlight', text: 'Paid boost' },
]

export function VenueRankingDiagram() {
  return (
    <figure className="vf-flow vf-flow--rank" aria-label="How Venue Finder ranks recommended venues">
      <div className="vf-rank">
        <div className="vf-rank__col">
          <p className="vf-flow__tag">Guest requirements</p>
          <ul>
            <li>Their own words</li>
            <li>Or capacity, location, event type, vibe</li>
          </ul>
        </div>
        <span className="vf-rank__arrow" aria-hidden="true" />
        <div className="vf-rank__col">
          <p className="vf-flow__tag">Semantic matching</p>
          <ul>
            <li>Compared with every venue in the inventory</li>
          </ul>
        </div>
        <span className="vf-rank__arrow" aria-hidden="true" />
        <div className="vf-rank__col vf-rank__col--wide">
          <p className="vf-flow__tag">Ranking signals</p>
          <ul className="vf-rank__signals">
            {signals.map((s) => (
              <li key={s.name}>
                <b>{s.name}</b> {s.text}
              </li>
            ))}
          </ul>
        </div>
        <span className="vf-rank__arrow" aria-hidden="true" />
        <div className="vf-rank__col vf-rank__col--end">
          <p className="vf-flow__tag">Recommended venues</p>
          <ul>
            <li>A varied, relevant mix</li>
          </ul>
        </div>
      </div>
      <figcaption className="annotation vf-flow__caption">
        Paid visibility helps discovery. Relevance still comes first.
      </figcaption>
    </figure>
  )
}
