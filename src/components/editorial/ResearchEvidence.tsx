import type { ReactNode } from 'react'

// Research as evidence: the finding stated plainly, the supporting text in a narrow column, and the artefact
// (here a day-in-the-life drawing) set on a sunk board that runs wider than the text.
export function ResearchEvidence({
  body,
  children,
}: {
  body?: string[]
  children: ReactNode
}) {
  return (
    <div className="ed-evidence">
      {body && (
        <div className="ed-evidence__text">
          {body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      )}
      <div className="ed-evidence__board">{children}</div>
    </div>
  )
}
