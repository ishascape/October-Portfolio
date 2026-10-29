import { OracleCard } from './OracleCard'
import { DECK, type CardId } from './oracleData'

// All eight cards at a glance: the original Core Expertise, as the full deck.
export function ExpertiseGrid({ onOpen }: { onOpen: (id: CardId) => void }) {
  return (
    <ul className="oracle__grid" aria-label="All eight expertise cards">
      {DECK.map((c, i) => (
        <OracleCard key={c.id} index={i} card={c} text={c.meaning} onOpen={() => onOpen(c.id)} />
      ))}
    </ul>
  )
}
