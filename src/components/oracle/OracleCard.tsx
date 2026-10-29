import type { CSSProperties } from 'react'
import { useNudges } from '../Skills'
import { CardBack } from './CardBack'
import { ROLE_LABEL, type Role } from './oracleLogic'
import type { OracleCardData } from './oracleData'

type Props = {
  card: OracleCardData
  text: string // the advice for a reading, or the card's meaning in the full deck
  role?: Role
  faceUp?: boolean
  showProof?: boolean
  index?: number
  onOpen: () => void
}

// One tarot card. The front is the real expertise; the back only shows while the deck is being shuffled.
export function OracleCard({ card, text, role, faceUp = true, showProof = false, index = 0, onOpen }: Props) {
  const Drawing = card.drawing
  const { svgRef, enter, leave } = useNudges(card.hover)
  return (
    <li
      className={`ocard${faceUp ? ' is-up' : ''}`}
      style={{ '--n': index } as CSSProperties}
      onPointerEnter={faceUp ? enter : undefined}
      onPointerLeave={leave}
    >
      <div className="ocard__lift">
        <div className="ocard__inner">
          <article className="ocard__face ocard__front" aria-hidden={faceUp ? undefined : true}>
            <header className="ocard__top">
              <span className="ocard__numeral">{card.numeral}</span>
              {role && <span className="ocard__role">{ROLE_LABEL[role]}</span>}
            </header>
            <svg ref={svgRef} className="parti ocard__parti" viewBox="0 0 160 120" aria-hidden="true">
              <Drawing />
            </svg>
            <h3 className="ocard__name">{card.archetype}</h3>
            <p className="ocard__title">{card.title}</p>
            <p className="ocard__text">{text}</p>
            {showProof && <p className="ocard__proof">{card.proof}</p>}
            <button
              type="button"
              className="ocard__open"
              onClick={onOpen}
              disabled={!faceUp}
              aria-label={`More about ${card.archetype}: ${card.title}`}
            />
          </article>
          <div className="ocard__face ocard__back" aria-hidden="true">
            <CardBack />
          </div>
        </div>
      </div>
    </li>
  )
}
