import { principles } from '../data/content'
import { PrincipleParti } from './PrinciplePartis'
import './Ethos.css'

// The four design-ethos drawings, each with its principle written underneath.
export function Ethos() {
  return (
    <ul className="ethos" aria-label="Design ethos">
      {principles.map((p) => (
        <li key={p.number} className="ethos__cell">
          <div className="ethos__item">
            <PrincipleParti number={p.number} />
            <span className="ethos__caption">{p.title}</span>
          </div>
        </li>
      ))}
    </ul>
  )
}
