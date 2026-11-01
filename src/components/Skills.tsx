import './Skills.css'

// Tools from Ashni's CV.
const toolkit = [
  { group: 'Design', tools: ['Figma', 'Sketch'] },
  {
    group: 'Research and testing',
    tools: ['Dovetail', 'Maze', 'Useberry', 'Hotjar'],
  },
  { group: 'Data', tools: ['PostHog', 'Looker'] },
  { group: 'Delivery', tools: ['Jira', 'Confluence', 'Notion'] },
  { group: 'AI and build', tools: ['Claude', 'ChatGPT', 'Cursor'] },
]

export function Skills() {
  return (
    <section className="toolkit" aria-labelledby="toolkit">
      <h2 id="toolkit" className="label skills__heading">
        Toolkit
      </h2>
      <dl className="toolkit__list">
        {toolkit.map((t) => (
          <div key={t.group} className="toolkit__group">
            <dt>{t.group}</dt>
            <dd>{t.tools.join(', ')}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
