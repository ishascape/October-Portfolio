import { setPaint, useThemeState } from '../theme'

/** Paintbrush switch beside the sun and moon. Off by default; on turns the page into a moonlit oil painting. */
export function PaintToggle() {
  const { paint } = useThemeState()
  return (
    <button
      type="button"
      className="paint-toggle"
      onClick={() => setPaint(!paint)}
      aria-pressed={paint}
      aria-label="Painting mode"
      title={paint ? 'Leave painting mode' : 'Paint the page in moonlight'}
    >
      <span className="paint-toggle__disc" aria-hidden="true">
        {/* A solid, slightly tilted brush like the case study icons: blue handle, paper ferrule band, loaded tip. */}
        <svg viewBox="0 0 16 16">
          <g transform="rotate(-8 8 8)">
            <path className="paint-toggle__handle" d="M12.9 1.5 L14.5 3.1 L8.6 9 L7 7.4 Z" />
            <path className="paint-toggle__ferrule" d="M7 7.4 L8.6 9 L7.6 10 L6 8.4 Z" />
            <path
              className="paint-toggle__tip"
              d="M6 8.4 L7.6 10 C7.6 12.2 6 14.4 3.2 14.5 C2.6 14.5 2.3 14.2 2.5 13.7 C3.4 12.9 3 11.6 3.9 10.6 C4.5 9.9 5.2 9.6 6 8.4 Z"
            />
          </g>
        </svg>
      </span>
    </button>
  )
}
