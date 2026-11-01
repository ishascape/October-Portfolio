import { caseHref } from '../links'
import './AiPrinciples.css'

// How Ashni designs AI products. Every line is sourced from a case study page or the CV; never add a claim here
// that isn't in one of them.
// Line icons in brand blue, one per principle.
const icons = {
  // A person with a loop arrow around them: a human in the loop.
  human: (
    <>
      <circle cx="16" cy="11" r="3.5" />
      <path d="M10 22.5 c0 -3.5 2.7 -6 6 -6 s6 2.5 6 6" />
      <path d="M26.5 9.5 A12 12 0 1 0 28 16" />
      <path d="M28.6 5.8 l-1.9 3.9 l-4 -1.6" />
    </>
  ),
  // A shield with a tick: guardrails.
  shield: (
    <>
      <path d="M16 4 l9.5 3.5 v7.5 c0 6 -4.2 10 -9.5 13 c-5.3 -3 -9.5 -7 -9.5 -13 v-7.5 Z" />
      <path d="M11.8 16 l3 3 l5.6 -6" />
    </>
  ),
  // An hourglass: designing the wait.
  hourglass: (
    <>
      <path d="M9 4.5 h14 M9 27.5 h14" />
      <path d="M10.5 4.5 c0 6 5.5 8 5.5 11.5 s-5.5 5.5 -5.5 11.5 M21.5 4.5 c0 6 -5.5 8 -5.5 11.5 s5.5 5.5 5.5 11.5" />
      <path d="M12.8 25.5 c1 -2 2.2 -3 3.2 -3 s2.2 1 3.2 3" />
    </>
  ),
  // Sparkles: AI in the process.
  sparkle: (
    <>
      <path d="M14 5 c0.8 5.2 2.8 7.2 8 8 c-5.2 0.8 -7.2 2.8 -8 8 c-0.8 -5.2 -2.8 -7.2 -8 -8 c5.2 -0.8 7.2 -2.8 8 -8 Z" />
      <path d="M24 19 c0.4 2.6 1.4 3.6 4 4 c-2.6 0.4 -3.6 1.4 -4 4 c-0.4 -2.6 -1.4 -3.6 -4 -4 c2.6 -0.4 3.6 -1.4 4 -4 Z" />
    </>
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
    icon: 'human',
    title: 'Know when not to use AI, introducing a human in the loop.',
    body: "Venue Finder only made recommendations where we had 200+ venues. Elsewhere it didn't force matches, and briefs over £50k went to a human concierge.",
    link: { slug: 'venue-finder', hash: 'edge-cases', text: 'Venue Finder edge cases' },
  },
  {
    icon: 'shield',
    title: 'Always define the guardrails.',
    body: 'Matches needed a 0.85 similarity score, and paid Spotlight placements were capped at 2 per brief, so paying venues never outranked relevance.',
    link: { slug: 'venue-finder', hash: 'matching', text: 'Venue Finder matching' },
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
            <svg className="ai-principles__icon" viewBox="0 0 32 32" aria-hidden="true">
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
