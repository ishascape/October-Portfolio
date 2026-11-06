// Hand-drawn section icons for the case study pages, in the same style as the crayon on the Selected work heading:
// solid brand-blue shapes, slightly tilted, with paper-coloured detail lines. Each icon is picked from its section label.
import type { ReactNode } from 'react'

export type CaseIconName =
  | 'summary'
  | 'problem'
  | 'research'
  | 'experiments'
  | 'strategy'
  | 'mvp'
  | 'shift'
  | 'tradeoffs'
  | 'decisions'
  | 'moments'
  | 'descope'
  | 'matching'
  | 'edge'
  | 'reflections'
  | 'time'

// Filled shapes use class "f" (blue), details use class "d" (paper lines), outlines use class "o" (blue lines).
const shapes: Record<CaseIconName, ReactNode> = {
  // The crayon from the Selected work heading.
  summary: (
    <g transform="rotate(-30 12 12)">
      <rect className="f" x="1.5" y="8.6" width="3" height="6.8" rx="1" opacity="0.75" />
      <rect className="f" x="4" y="8.2" width="13.5" height="7.6" rx="1" />
      <path className="f" d="M17.5 8.2 L22.6 11.4 Q23.2 12 22.6 12.6 L17.5 15.8 Z" />
      <path className="d" d="M6.4 8.8 v6.4 M15.2 8.8 v6.4 M8 12 l1.2 -1.4 l1.2 2.8 l1.2 -2.8 l1.2 2.8 l1.2 -1.4" />
    </g>
  ),
  // A speech bubble with a question mark.
  problem: (
    <g transform="rotate(-6 12 12)">
      <path
        className="f"
        d="M4 4.5 h16 a2 2 0 0 1 2 2 v9 a2 2 0 0 1 -2 2 h-9 l-4.5 3.5 v-3.5 h-2.5 a2 2 0 0 1 -2 -2 v-9 a2 2 0 0 1 2 -2 Z"
      />
      <path className="d" d="M9.6 9 q0.2 -2.4 2.6 -2.4 q2.4 0 2.4 2.1 q0 1.6 -2.2 2.3 v1.3" />
      <circle cx="12.4" cy="14.6" r="0.9" fill="var(--paper)" />
    </g>
  ),
  // A magnifying glass.
  research: (
    <g transform="rotate(-8 12 12)">
      <path className="f" d="M14.6 15.8 l2.2 -2.2 l5 5 a1.55 1.55 0 0 1 -2.2 2.2 Z" />
      <circle className="f" cx="10" cy="10" r="7.5" />
      <circle className="d" cx="10" cy="10" r="4.6" />
      <path className="d" d="M7.4 8.2 q0.8 -1.4 2.4 -1.6" />
    </g>
  ),
  // A lab flask with bubbles.
  experiments: (
    <g transform="rotate(8 12 12)">
      <path
        className="f"
        d="M9 2.5 h6 v1.8 h-0.8 v5 l5.6 9.4 a2 2 0 0 1 -1.7 3 h-12.2 a2 2 0 0 1 -1.7 -3 l5.6 -9.4 v-5 h-0.8 Z"
      />
      <path className="d" d="M7 15.5 h10" />
      <circle cx="11" cy="18.4" r="1" fill="var(--paper)" />
      <circle cx="14.2" cy="17.6" r="0.7" fill="var(--paper)" />
    </g>
  ),
  // A compass.
  strategy: (
    <g transform="rotate(-10 12 12)">
      <circle className="f" cx="12" cy="12" r="9.5" />
      <path className="d" d="M15.6 8.4 l-2.1 5.1 l-5.1 2.1 l2.1 -5.1 Z" />
      <path className="d" d="M12 3.8 v1.6 M12 18.6 v1.6 M3.8 12 h1.6 M18.6 12 h1.6" />
    </g>
  ),
  // A rocket: the first release.
  mvp: (
    <g transform="rotate(35 12 12)">
      <path className="f" d="M12 1.5 c3.6 2.6 5 6.6 4.4 12.4 h-8.8 c-0.6 -5.8 0.8 -9.8 4.4 -12.4 Z" />
      <path className="f" d="M7.8 11 l-3 4.4 v2.4 l3.2 -1.6 Z M16.2 11 l3 4.4 v2.4 l-3.2 -1.6 Z" />
      <path className="f" d="M10 15.4 h4 l-0.8 4.2 q-1.2 2 -2.4 0 Z" opacity="0.75" />
      <circle className="d" cx="12" cy="8" r="1.9" />
    </g>
  ),
  // Two arrows swapping direction.
  shift: (
    <g transform="rotate(-6 12 12)">
      <rect className="f" x="2.5" y="2.5" width="19" height="19" rx="4" />
      <path className="d" d="M7 9.2 h9.4 M13.6 6.4 l2.8 2.8 l-2.8 2.8 M17 14.8 h-9.4 M10.4 12 l-2.8 2.8 l2.8 2.8" />
    </g>
  ),
  // Balance scales.
  tradeoffs: (
    <g transform="rotate(-4 12 12)">
      <path className="o" d="M12 4 v15 M4.5 6.5 h15 M8 21 h8" />
      <path className="o" d="M5.5 6.5 l-3 7 M5.5 6.5 l3 7 M18.5 6.5 l-3 7 M18.5 6.5 l3 7" />
      <path className="f" d="M1.8 13.5 h7.4 a3.7 3.2 0 0 1 -7.4 0 Z M14.8 13.5 h7.4 a3.7 3.2 0 0 1 -7.4 0 Z" />
      <circle className="f" cx="12" cy="4" r="1.8" />
    </g>
  ),
  // A signpost pointing two ways.
  decisions: (
    <g transform="rotate(-5 12 12)">
      <rect className="f" x="10.9" y="3" width="2.4" height="19" rx="1" opacity="0.75" />
      <path className="f" d="M4 4.5 h12.5 l3.5 2.8 l-3.5 2.8 h-12.5 Z" />
      <path className="f" d="M20 11.8 h-12.5 l-3.5 2.8 l3.5 2.8 h12.5 Z" />
      <path className="d" d="M6.5 7.3 h7.5 M10 14.6 h7.5" />
    </g>
  ),
  // A star: the moments that mattered.
  moments: (
    <g transform="rotate(-8 12 12)">
      <path
        className="f"
        d="M12 2 l2.9 6 l6.6 0.9 l-4.8 4.6 l1.2 6.5 l-5.9 -3.1 l-5.9 3.1 l1.2 -6.5 l-4.8 -4.6 l6.6 -0.9 Z"
      />
    </g>
  ),
  // Scissors: cutting scope.
  descope: (
    <g transform="rotate(-12 12 12)">
      <path className="f" d="M9.4 10.6 l11.8 -7.4 a1 1 0 0 1 1.1 1.6 l-10 8.4 Z" />
      <path className="f" d="M9.4 13.4 l11.8 7.4 a1 1 0 0 0 1.1 -1.6 l-10 -8.4 Z" />
      <circle className="f" cx="5.6" cy="7" r="4" />
      <circle className="f" cx="5.6" cy="17" r="4" />
      <circle cx="5.6" cy="7" r="1.7" fill="var(--paper)" />
      <circle cx="5.6" cy="17" r="1.7" fill="var(--paper)" />
    </g>
  ),
  // A jigsaw piece: the right match.
  matching: (
    <g transform="rotate(-8 12 12)">
      <path
        className="f"
        d="M4 7 h4 a2.6 2.6 0 1 1 5 0 h4 v4 a2.6 2.6 0 1 1 0 5 v4 h-4 a2.6 2.6 0 1 0 -5 0 h-4 v-4 a2.6 2.6 0 1 0 0 -5 Z"
      />
    </g>
  ),
  // A warning triangle: the edge cases.
  edge: (
    <g transform="rotate(-5 12 12)">
      <path className="f" d="M10.3 3.4 a2 2 0 0 1 3.4 0 l8.4 14.6 a2 2 0 0 1 -1.7 3 h-16.8 a2 2 0 0 1 -1.7 -3 Z" />
      <path className="d" d="M12 8.6 v5.4" />
      <circle cx="12" cy="17.2" r="1" fill="var(--paper)" />
    </g>
  ),
  // A light bulb: what I learned.
  reflections: (
    <g transform="rotate(8 12 12)">
      <path className="f" d="M12 2 a7 7 0 0 1 4.2 12.6 v2.4 h-8.4 v-2.4 a7 7 0 0 1 4.2 -12.6 Z" />
      <path className="f" d="M8.6 18.4 h6.8 v1.4 a2 2 0 0 1 -2 2 h-2.8 a2 2 0 0 1 -2 -2 Z" opacity="0.75" />
      <path className="d" d="M10 14.6 v-3.4 l1 -1.2 l1 1.2 l1 -1.2 l1 1.2 v3.4" />
    </g>
  ),
  // A calendar page: more time.
  time: (
    <g transform="rotate(-6 12 12)">
      <rect className="f" x="3" y="4.5" width="18" height="17" rx="2.5" />
      <path className="o" d="M8 2.5 v4 M16 2.5 v4" />
      <path className="d" d="M3.4 9.6 h17.2" />
      <path className="d" d="M7.4 13.4 h.01 M12 13.4 h.01 M16.6 13.4 h.01 M7.4 17.4 h.01 M12 17.4 h.01" />
    </g>
  ),
}

// Picks an icon from a section label, by its words.
export function iconFor(label: string): CaseIconName {
  const l = label.toLowerCase()
  if (l.includes('problem')) return 'problem'
  if (l.includes('research')) return 'research'
  if (l.includes('experiment')) return 'experiments'
  if (l.includes('strategy')) return 'strategy'
  if (l.includes('mvp')) return 'mvp'
  if (l.includes('shift')) return 'shift'
  if (l.includes('trade')) return 'tradeoffs'
  if (l.includes('decision')) return 'decisions'
  if (l.includes('moment')) return 'moments'
  if (l.includes('descope')) return 'descope'
  if (l.includes('match')) return 'matching'
  if (l.includes('edge')) return 'edge'
  if (l.includes('reflection')) return 'reflections'
  if (l.includes('month')) return 'time'
  return 'summary'
}

export function CaseIcon({ name, className }: { name: CaseIconName; className?: string }) {
  return (
    <svg className={`case-icon${className ? ` ${className}` : ''}`} viewBox="0 0 24 24" aria-hidden="true">
      {shapes[name]}
    </svg>
  )
}
