import type { ReactNode } from 'react'
import type { Moment } from '../../data/caseStudyPages'

const KEYS = ['A', 'B', 'C', 'D']

// A real screen at large size with its reasoning set as a keynote legend (A, B, C), like notes on a drawing.
// The screen and legend swap sides on alternate moments. Children (a live widget) sit under the pair.
export function AnnotatedScreenshot({
  fig,
  m,
  flip,
  children,
}: {
  fig: string
  m: Moment
  flip?: boolean
  children?: ReactNode
}) {
  const notes = [
    { k: 'Problem', v: m.problem },
    { k: 'Decision', v: m.decision },
    { k: 'Why', v: m.why },
  ]
  return (
    <figure className={`ed-shot${flip ? ' ed-shot--flip' : ''}`}>
      <div className="ed-shot__screen">
        <span className="label ed-shot__fig">Fig. {fig}</span>
        <img
          className={m.image.bordered ? 'ed-shot__img ed-shot__img--bordered' : 'ed-shot__img'}
          src={m.image.src}
          alt={m.image.alt}
          width={m.image.width}
          height={m.image.height}
          loading="lazy"
          decoding="async"
        />
      </div>
      <figcaption className="ed-shot__notes">
        <h3 className="ed-shot__title">{m.title}</h3>
        <ol className="ed-keynotes">
          {notes.map((n, i) => (
            <li key={n.k}>
              <span className="ed-keynotes__ring" aria-hidden="true">
                {KEYS[i]}
              </span>
              <span className="label ed-keynotes__k">{n.k}</span>
              <span className="ed-keynotes__v">{n.v}</span>
            </li>
          ))}
        </ol>
      </figcaption>
      {children && <div className="ed-shot__extra">{children}</div>}
    </figure>
  )
}
