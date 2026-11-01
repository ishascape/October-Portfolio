import { caseHref } from '../links'
import './AiPrinciples.css'

// How Ashni designs AI products. Every line is sourced from a case study page or the CV; never add a claim here
// that isn't in one of them.
const principles = [
  {
    title: 'Know when not to use AI, introducing a human in the loop.',
    body: "Venue Finder only made recommendations where we had 200+ venues. Elsewhere it didn't force matches, and briefs over £50k went to a human concierge.",
    link: { slug: 'venue-finder', hash: 'edge-cases', text: 'Venue Finder edge cases' },
  },
  {
    title: 'Always define the guardrails.',
    body: 'Matches needed a 0.85 similarity score, and paid Spotlight placements were capped at 2 per brief, so paying venues never outranked relevance.',
    link: { slug: 'venue-finder', hash: 'matching', text: 'Venue Finder matching' },
  },
  {
    title: 'Design the wait.',
    body: "TreeAssist's suggestions took 2 to 30 seconds. I proposed personalised wait states, such as headlines from the user's birthday. They were descoped to ship faster.",
    link: { slug: 'tree-assist', hash: 'descope-dungeon', text: 'TreeAssist descope dungeon' },
  },
  {
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
