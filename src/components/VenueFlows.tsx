import prompt from '../assets/vf-v2-prompt.webp'
import suggestions from '../assets/vf-v2-suggestions.webp'
import { VenueCardDemo } from './VenueCardDemo'
import './VenueFlows.css'

// Two compact diagrams for the Venue Finder case study, in the portfolio's pencil-box style.

const before = ['Guest completes 13 steps', 'Lead Feed', 'Venues approach guest', 'Guest evaluates']
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

const metrics = [
  { value: '≥0.85', label: 'similarity threshold' },
  { value: '32', label: 'candidates max per brief' },
  { value: '≤2', label: 'paid placements per brief' },
  { value: '<1s', label: 'recommendation load' },
]

const signals = [
  { name: 'Best fit', text: 'relevance first' },
  { name: 'Active hosts', text: 'engagement boost' },
  { name: 'Premium', text: 'subscription visibility', paid: true },
  { name: 'Spotlight', text: 'paid promotion', paid: true },
]

// Illustrative only: three of eight retrieved venues fall below the threshold or fail eligibility.
const retrieved = [false, false, true, false, false, true, false, true]
// Illustrative only: a mini ranked list with two promoted placements.
const ranked = [
  { paid: false },
  { paid: true },
  { paid: false },
  { paid: false },
  { paid: true },
]

export function VenueRankingDiagram() {
  return (
    <figure className="vf-flow vf-pipe" aria-label="How Venue Finder retrieves, filters and ranks recommended venues">
      <ul className="vf-pipe__metrics">
        {metrics.map((m) => (
          <li key={m.value}>
            <b>{m.value}</b>
            <span>{m.label}</span>
          </li>
        ))}
      </ul>
      <ol className="vf-pipe__stages">
        <li className="vf-pipe__stage">
          <div className="vf-pipe__head"><p className="vf-pipe__num">01</p>
          <h4>Guest intent</h4></div>
          <div className="vf-pipe__body">
          <ul>
            <li>Natural-language prompt</li>
            <li>Or generated from location, capacity, event type and vibe</li>
          </ul></div>
        </li>
        <li className="vf-pipe__stage vf-pipe__stage--retrieve">
          <div className="vf-pipe__head"><p className="vf-pipe__num">02</p>
          <h4>Vector database</h4></div>
          <div className="vf-pipe__body">
          <ul>
            <li>Intent converted into embeddings</li>
            <li>Semantic similarity search across venue inventory</li>
            <li>Hard eligibility filters applied</li>
          </ul></div>
        </li>
        <li className="vf-pipe__stage vf-pipe__stage--filter">
          <div className="vf-pipe__head"><p className="vf-pipe__num">03</p>
          <h4>Relevance &amp; performance guardrails</h4></div>
          <div className="vf-pipe__body">
          <ul>
            <li>Similarity threshold ≥ 0.85</li>
            <li>Max 32 candidate venues per brief</li>
            <li>Ineligible or low-relevance venues excluded</li>
          </ul>
          <div className="vf-pipe__pool" role="img" aria-label="Illustration: some retrieved venues are excluded">
            {retrieved.map((out, i) => (
              <span key={i} className={out ? 'is-out' : undefined} />
            ))}
          </div>
          <p className="vf-pipe__key">Struck-through venues are excluded</p></div>
        </li>
        <li className="vf-pipe__stage vf-pipe__stage--rank">
          <div className="vf-pipe__head"><p className="vf-pipe__num">04</p>
          <h4>Secondary ranking</h4></div>
          <div className="vf-pipe__body">
          <p className="vf-pipe__scope">Applied to the candidate set only, not the whole database</p>
          <ul className="vf-pipe__signals">
            {signals.map((sg) => (
              <li key={sg.name} className={sg.paid ? 'is-paid' : undefined}>
                <b>{sg.name}</b> {sg.text}
              </li>
            ))}
          </ul>
          <p className="vf-pipe__guard">Max 2 paid-feature placements per brief. Paid boosts never override relevance.</p></div>
        </li>
        <li className="vf-pipe__stage vf-pipe__stage--out">
          <div className="vf-pipe__head"><p className="vf-pipe__num">05</p>
          <h4>Recommended venues</h4></div>
          <div className="vf-pipe__body">
          <ol className="vf-pipe__list" aria-label="Illustration: ranked venues, two of them promoted">
            {ranked.map((r, i) => (
              <li key={i} className={r.paid ? 'is-paid' : undefined}>
                <span className="vf-pipe__rank">{i + 1}</span>
                <span className="vf-pipe__bar" />
                {r.paid && <em>Promoted</em>}
              </li>
            ))}
          </ol>
          <p className="vf-pipe__perf">Loads in under 1 second</p></div>
        </li>
      </ol>
      <figcaption className="vf-pipe__trade">
        <b>The trade-off:</b> We constrained retrieval volume and paid visibility to protect recommendation quality and
        performance, while creating commercial value for paying hosts.
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
          <p className="vf-flow__note vf-flow__note--warn">Lots of upfront effort, with no venues presented until their first message - 1 to 24hrs later</p>
        </div>
        <ol className="vf-flow__steps vf-problem__after">
          <li>Submit enquiry</li>
          <li>Lead Feed</li>
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
    why: 'In V1 the required AI prompt lost 38% of guests, so V2 made it optional.',
    w: 1440,
    h: 964,
  },
  {
    src: suggestions,
    alt: 'Venue Finder V2 suggestions step: "Here are your initial suggestions", with venue cards for Junsei, Caia and Radisson Blu beside a map of 32 venues in London.',
    title: 'See relevant venues',
    note: 'Ranked suggestions on a map, before any enquiry is sent.',
    why: 'Guests used to wait for venues to reply. Now they see venues first.',
    w: 1440,
    h: 964,
  },
  {
    src: '',
    alt: "A Venue Finder suggestion card for Junsei, a yakitori restaurant in Marylebone, with I'm interested and Not for me buttons.",
    title: 'Pre-screen as you go',
    note: '“I’m interested” and “Not for me” tell us what to refine next.',
    why: 'Guests used to have little say over who got in touch. Now their taps shape it.',
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
            <span className="annotation vf-trio__why">{m.why}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
