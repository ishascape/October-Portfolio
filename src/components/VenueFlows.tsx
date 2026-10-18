import prompt from '../assets/vf-v2-prompt.webp'
import suggestions from '../assets/vf-v2-suggestions.webp'
import { VenueCardDemo } from './VenueCardDemo'
import './VenueFlows.css'

// Two compact diagrams for the Venue Finder case study, in the portfolio's pencil-box style.

const before = ['Guest completes 13 steps', 'LeadFeed', 'Venues approach guest', 'Guest evaluates']
const after = [
  'Guest enters requirements',
  'Semantic matching',
  'Recommended venues',
  'Guest pre-screens and shortlists',
  'Relevant enquiries',
]

export function VenueShiftDiagram() {
  return (
    <figure className="vf-flow" aria-label="Existing and proposed Venue Finder workflows">
      <div className="vf-flow__lane">
        <p className="vf-flow__tag">Existing: venue-led</p>
        <ol className="vf-flow__steps">
          {before.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
        <p className="vf-flow__note vf-flow__note--warn">No venues shown until a venue replies</p>
      </div>
      <div className="vf-flow__lane vf-flow__lane--after">
        <p className="vf-flow__tag">Proposed: guest-led</p>
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
          <p className="vf-flow__tag">Guest intent</p>
          <ul>
            <li>A prompt they write</li>
            <li>Or one we write from location, capacity, event type, vibe</li>
          </ul>
        </div>
        <span className="vf-rank__arrow" aria-hidden="true" />
        <div className="vf-rank__col">
          <p className="vf-flow__tag">Vector-based matching</p>
          <ul>
            <li>Intent compared with every venue in the inventory</li>
          </ul>
        </div>
        <span className="vf-rank__arrow" aria-hidden="true" />
        <div className="vf-rank__col vf-rank__col--wide">
          <p className="vf-flow__tag">Ranking and discovery boosts</p>
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
        We balanced relevance, variety, active venues and revenue. Paid visibility helps discovery, it doesn’t override
        relevance.
      </figcaption>
    </figure>
  )
}

const spend = Array.from({ length: 13 }, (_, i) => i + 1)

export function VenueProblemDiagram() {
  return (
    <figure
      className="vf-flow vf-problem"
      aria-label="The original journey: 13 steps with no venues shown, then waiting"
    >
      <div className="vf-problem__row">
        <div className="vf-problem__effort">
          <p className="vf-flow__tag">13-step brief builder</p>
          <ol className="vf-problem__ticks" aria-hidden="true">
            {spend.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ol>
          <p className="vf-flow__note vf-flow__note--warn">All effort. Not one venue shown.</p>
        </div>
        <ol className="vf-flow__steps vf-problem__after">
          <li>Submit enquiry</li>
          <li>LeadFeed</li>
          <li className="vf-flow__end vf-flow__end--warn">Wait for paying venues to respond</li>
          <li>Guest evaluates responses</li>
        </ol>
      </div>
    </figure>
  )
}

const moments = [
  {
    src: prompt,
    alt: 'Venue Finder V2 prompt step: "Tell us about your event, is there anything specific you\'re looking for?" with example chips, a text area, and Skip this step, Back and Next buttons.',
    title: 'Say what you want',
    note: 'A free-text prompt, or skip it and answer a few structured questions.',
    w: 1440,
    h: 964,
  },
  {
    src: suggestions,
    alt: 'Venue Finder V2 suggestions step: "Here are your initial suggestions", with venue cards for Junsei, Caia and Radisson Blu beside a map of 32 venues in London.',
    title: 'See relevant venues',
    note: 'Ranked suggestions on a map, before any enquiry is sent.',
    w: 1440,
    h: 964,
  },
  {
    src: '',
    alt: "A Venue Finder suggestion card for Junsei, a yakitori restaurant in Marylebone, with I'm interested and Not for me buttons.",
    title: 'Pre-screen as you go',
    note: '“I’m interested” and “Not for me” tell us what to refine next.',
    w: 680,
    h: 335,
  },
]

export function VenueExperienceTrio() {
  return (
    <div className="vf-trio">
      {moments.map((m, i) => (
        <figure key={m.title} className="vf-trio__item">
          {m.src ? (
            <img
              src={m.src}
              alt={m.alt}
              width={m.w}
              height={m.h}
              style={{ maxWidth: m.w }}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <VenueCardDemo />
          )}
          <figcaption>
            <b>
              {i + 1}. {m.title}
            </b>
            <span className="annotation">{m.note}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
