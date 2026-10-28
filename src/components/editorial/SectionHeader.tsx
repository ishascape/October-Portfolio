import type { ReactNode } from 'react'

// A sheet reference ("03 · The MVP") split into its drawing number and name, with the heading beside or under it.
// rail: number in the left rail, heading in the main column. statement: a full-width ruled head with a large heading.
export function SectionHeader({
  label,
  heading,
  eyebrow,
  total,
  variant = 'rail',
  id,
}: {
  label: string
  heading: ReactNode
  eyebrow?: ReactNode
  total?: number
  variant?: 'rail' | 'statement'
  id?: string
}) {
  const [num, ...rest] = label.split(' · ')
  const name = rest.join(' · ')
  const ref = (
    <p className="label ed-sheetref">
      <span className="ed-sheetref__num">{num}</span>
      {name && <span className="ed-sheetref__name">{name}</span>}
      {total ? (
        <span className="ed-sheetref__of" aria-hidden="true">
          / {String(total).padStart(2, '0')}
        </span>
      ) : null}
    </p>
  )
  return (
    <header className={`ed-head ed-head--${variant}`}>
      {ref}
      <div className="ed-head__text">
        {eyebrow && <p className="annotation ed-head__eyebrow">{eyebrow}</p>}
        <h2 id={id} className="ed-head__title">
          {heading}
        </h2>
      </div>
    </header>
  )
}
