import { useEffect, useRef } from 'react'
import { caseHref } from '../../links'
import { CARD_BY_ID, CASE_STUDIES, type CardId } from './oracleData'

// More about one card: its drawing, what it means, how it is used and the work that backs it up.
export function CardDialog({ id, onClose }: { id: CardId | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (id && !d.open) d.showModal()
    if (!id && d.open) d.close()
  }, [id])
  const card = id ? CARD_BY_ID[id] : null
  const Drawing = card?.drawing
  const study = card?.related ? CASE_STUDIES[card.related] : undefined
  return (
    <dialog
      ref={ref}
      className="odialog"
      aria-labelledby="odialog-title"
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {card && Drawing && (
        <div className="odialog__body">
          <button type="button" className="odialog__close" onClick={onClose}>
            Close <span aria-hidden="true">✕</span>
          </button>
          <svg className="parti odialog__parti" viewBox="0 0 160 120" aria-hidden="true">
            <Drawing />
          </svg>
          <p className="label odialog__numeral">Card {card.numeral}</p>
          <h3 id="odialog-title" className="odialog__name">
            {card.archetype}
          </h3>
          <p className="odialog__title">{card.title}</p>
          <p className="odialog__meaning">{card.meaning}</p>
          <h4 className="label odialog__sub">How I use it</h4>
          <p>{card.practice}</p>
          <h4 className="label odialog__sub">In practice</h4>
          <p>{card.evidence}</p>
          {study && (
            <a className="oracle__link" href={caseHref(study.slug)}>
              Read the {study.name} case study <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      )}
    </dialog>
  )
}
