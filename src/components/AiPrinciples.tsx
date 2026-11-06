import { caseHref } from '../links'
import './AiPrinciples.css'

// How Ashni designs AI products. Every line is sourced from a case study page or the CV; never add a claim here
// that isn't in one of them.
// Hand-drawn icons in the same style as the case study menu icons: solid brand-blue shapes, slightly tilted,
// with paper-coloured detail lines. Class "f" is a blue fill, "o" a blue line, "d" a paper detail line.
const icons = {
  // A person with a loop arrow around them: a human in the loop.
  human: (
    <g transform="rotate(-5 16 16)">
      <circle className="f" cx="16" cy="12" r="4.2" />
      <path className="f" d="M8.8 24 c0 -4.6 3.2 -7.4 7.2 -7.4 s7.2 2.8 7.2 7.4 Z" />
      <path className="d" d="M12.6 21.6 q3.4 -1.8 6.8 0" />
      <g className="aip-loop">
        <path className="o" d="M26.2 9.2 A12.2 12.2 0 1 0 28.2 16" />
        <path className="f" d="M29.4 4.6 l-0.6 6.2 l-5.6 -2.6 Z" />
      </g>
    </g>
  ),
  // A shield with a tick: guardrails.
  shield: (
    <g transform="rotate(-6 16 16)">
      <path className="f" d="M16 3 l10.5 3.9 v8.4 c0 6.6 -4.6 11 -10.5 14.2 c-5.9 -3.2 -10.5 -7.6 -10.5 -14.2 v-8.4 Z" />
      <path className="d" d="M10.8 15.8 l3.8 3.8 l6.6 -7.2" />
    </g>
  ),
  // An hourglass: designing the wait.
  hourglass: (
    <g transform="rotate(8 16 16)">
      <rect className="f" x="7" y="3" width="18" height="3.2" rx="1.2" />
      <rect className="f" x="7" y="25.8" width="18" height="3.2" rx="1.2" />
      <path className="f" d="M9.6 6.2 h12.8 c0 5.2 -3.6 7.4 -5.2 9.8 c1.6 2.4 5.2 4.6 5.2 9.8 h-12.8 c0 -5.2 3.6 -7.4 5.2 -9.8 c-1.6 -2.4 -5.2 -4.6 -5.2 -9.8 Z" />
      <path className="d" d="M12.4 9 h7.2 M12.6 24.2 q3.4 -3.6 6.8 0" />
    </g>
  ),
  // Sparkles: AI in the process.
  sparkle: (
    <g transform="rotate(-6 16 16) translate(-2 -2.5) scale(1.12)">
      <path className="f aip-big" d="M13.5 3.5 c0.9 5.8 3.1 8 9 9 c-5.9 1 -8.1 3.2 -9 9 c-0.9 -5.8 -3.1 -8 -9 -9 c5.9 -1 8.1 -3.2 9 -9 Z" />
      <path className="f aip-small" d="M24.2 19 c0.5 3 1.5 4 4.5 4.5 c-3 0.5 -4 1.5 -4.5 4.5 c-0.5 -3 -1.5 -4 -4.5 -4.5 c3 -0.5 4 -1.5 4.5 -4.5 Z" />
      <path className="d" d="M10.6 9.4 q0.8 -2 2.6 -2.8" />
    </g>
  ),
}

const principles: {
  icon: keyof typeof icons
  title: string
  body: string | string[]
  closing?: string
  link?: { slug: string; hash: string; text: string }
}[] = [
  {
    icon: 'shield',
    title: 'Always define the guardrails.',
    body: 'Matches needed a 0.85 similarity score, and paid Spotlight placements were capped at 2 per brief, so paying venues never outranked relevance.',
    link: { slug: 'venue-finder', hash: 'matching', text: 'Venue Finder matching' },
  },
  {
    icon: 'human',
    title: 'Know when not to use AI, introducing a human in the loop.',
    body: "Venue Finder only made recommendations where we had 200+ venues. Elsewhere it didn't force matches, and briefs over £50k went to a human concierge.",
    link: { slug: 'venue-finder', hash: 'edge-cases', text: 'Venue Finder edge cases' },
  },
  {
    icon: 'hourglass',
    title: 'Design the wait.',
    body: "TreeAssist's suggestions took 2 to 30 seconds. I proposed personalised wait states, such as headlines from the user's birthday. They were descoped to ship faster.",
    link: { slug: 'tree-assist', hash: 'descope-dungeon', text: 'TreeAssist descope dungeon' },
  },
  {
    icon: 'sparkle',
    title: 'AI in my process.',
    body: [
      'I designed and built this website with Claude Code, and use Claude and Cursor to rapidly prototype ideas.',
      'I also use AI to synthesise requirements, analyse data, research competitors and streamline engineering handovers.',
    ],
    closing: 'AI helps me move faster and explore further. The judgement stays human.',
  },
]

export function AiPrinciples() {
  return (
    <section className="ai-principles" aria-labelledby="ai-principles-heading">
      <h2 id="ai-principles-heading" className="ai-principles__heading">
        How I design AI products
      </h2>
      <ol className="ai-principles__list">
        {principles.map((p) => (
          <li key={p.title} className="ai-principles__item">
            <svg className={`ai-principles__icon ai-principles__icon--${p.icon}`} viewBox="0 0 32 32" aria-hidden="true">
              {icons[p.icon]}
            </svg>
            <h3 className="ai-principles__title">{p.title}</h3>
            <div className="ai-principles__body">
              {(Array.isArray(p.body) ? p.body : [p.body]).map((para) => (
                <p key={para}>{para}</p>
              ))}
              {p.closing && (
                <p>
                  <strong>{p.closing}</strong>
                </p>
              )}
            </div>
            {p.link && (
              <a className="ai-principles__link" href={`${caseHref(p.link.slug)}#${p.link.hash}`}>
                {p.link.text} <span aria-hidden="true">→</span>
              </a>
            )}
          </li>
        ))}
      </ol>
    </section>
  )
}
