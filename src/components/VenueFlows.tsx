import { useState } from 'react'
import prompt from '../assets/vf-v2-prompt.webp'
import suggestions from '../assets/vf-v2-suggestions.webp'
import prescreen from '../assets/vf-v2-prescreen.webp'
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
  const [view, setView] = useState<'existing' | 'proposed'>('existing')
  const steps = view === 'existing' ? before : after
  return (
    <figure className="vf-flow" aria-label="Existing and proposed Venue Finder workflows">
      <div className="vf-flow__tabs" role="group" aria-label="Workflow">
        {(['existing', 'proposed'] as const).map((v) => (
          <button key={v} type="button" aria-pressed={view === v} onClick={() => setView(v)}>
            {v === 'existing' ? 'Existing' : 'Proposed'}
          </button>
        ))}
      </div>
      <div className={`vf-flow__lane${view === 'proposed' ? ' vf-flow__lane--after' : ''}`}>
        <p className="vf-flow__tag">{view === 'existing' ? 'Venue-led' : 'Guest-led'}</p>
        <ol className="vf-flow__steps">
          {steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
        <p className={`vf-flow__note${view === 'existing' ? ' vf-flow__note--warn' : ''}`}>
          {view === 'existing' ? 'No venues shown until a venue replies' : 'Venues shown before anything is submitted'}
        </p>
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
    src: prescreen,
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
          <img src={m.src} alt={m.alt} width={m.w} height={m.h} loading="lazy" decoding="async" />
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

export function VenueGapsDiagram() {
  return (
    <figure className="vf-flow vf-tree" aria-label="What happens when a location has too little inventory">
      <ol className="vf-tree__grid">
        <li className="vf-tree__n vf-tree__n--start vf-tree__n--r">Guest enters event location</li>
        <li className="vf-tree__n vf-tree__n--q vf-tree__n--r vf-tree__n--d">
          Does it have <b>200+ venues</b>?<span className="vf-tree__lbl vf-tree__lbl--r">Yes</span>
          <span className="vf-tree__lbl vf-tree__lbl--d">No</span>
        </li>
        <li className="vf-tree__n vf-tree__n--ok">
          <small className="vf-tree__via">Yes</small>Normal Venue Finder recommendations
        </li>
        <li className="vf-tree__n vf-tree__n--budget vf-tree__n--d">
          <small className="vf-tree__via">No</small>Reveal a budget field
        </li>
        <li className="vf-tree__n vf-tree__n--q vf-tree__n--r vf-tree__n--d">
          Budget over <b>£50k</b>?<span className="vf-tree__lbl vf-tree__lbl--r">Yes</span>
          <span className="vf-tree__lbl vf-tree__lbl--d">£50k or less</span>
        </li>
        <li className="vf-tree__n vf-tree__n--ok vf-tree__n--concierge">
          <small className="vf-tree__via">Yes</small>Human concierge handles the enquiry
        </li>
        <li className="vf-tree__n vf-tree__n--gap">
          <small className="vf-tree__via">£50k or less</small>
          <b>Unavailable-location page</b>
          “Sorry, we’re not currently available in your area.” Links to cities we cover and event-planning guides.
        </li>
      </ol>
    </figure>
  )
}

export function VenueIterationStrip() {
  return (
    <figure className="vf-flow vf-iter" aria-label="From V1 to V2">
      <ol className="vf-flow__steps vf-iter__steps">
        <li>
          <b>V1</b>
          Prompt first, account required before recommendations
        </li>
        <li className="vf-iter__learn">
          <b>Learning</b>
          38% left at the prompt, 27% at account creation. Intent was valuable, the friction wasn’t.
        </li>
        <li className="vf-iter__v2">
          <b>V2</b>
          Optional prompt, magic-link sign-up, faster load
        </li>
      </ol>
    </figure>
  )
}
