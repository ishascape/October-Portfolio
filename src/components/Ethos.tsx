import { useState } from 'react'
import { principles } from '../data/content'
import { PrincipleParti } from './PrinciplePartis'
import './Ethos.css'

// The four design-ethos drawings. Each shows its principle as a speech bubble on hover or focus,
// and on tap for touch screens, where there is no hover.
export function Ethos() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <ul className="ethos" aria-label="Design ethos">
      {principles.map((p) => (
        <li key={p.number} className="ethos__cell">
          <button
            type="button"
            className="ethos__item"
            aria-label={p.title}
            data-open={open === p.number}
            onClick={() => setOpen(open === p.number ? null : p.number)}
            onBlur={() => setOpen(null)}
          >
            <span className="ethos__bubble" aria-hidden="true">
              <span>{p.title}</span>
            </span>
            <PrincipleParti number={p.number} />
          </button>
        </li>
      ))}
    </ul>
  )
}
