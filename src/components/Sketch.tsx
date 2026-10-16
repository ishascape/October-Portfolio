import type { SVGProps } from 'react'

// Hand-drawn primitives in the manner of joinery sketches: every edge is its own
// stroke and runs a little past the corner, the way a pencil line overshoots.

const OVER = 5

type RectProps = { x: number; y: number; width: number; height: number; o?: number } & Omit<
  SVGProps<SVGPathElement>,
  'x' | 'y' | 'width' | 'height' | 'd'
>

export function sketchRectPath(x: number, y: number, w: number, h: number, o = OVER) {
  // Each edge overshoots by a slightly different amount so it doesn't look mechanical.
  const a = o
  const b = o * 0.6
  const c = o * 1.3
  const d = o * 0.8
  return [
    `M${x - a} ${y} H${x + w + b}`,
    `M${x + w} ${y - b} V${y + h + c}`,
    `M${x + w + d} ${y + h} H${x - c}`,
    `M${x} ${y + h + d} V${y - a}`,
  ].join(' ')
}

export function SketchRect({ x, y, width, height, o, ...rest }: RectProps) {
  return <path d={sketchRectPath(x, y, width, height, o)} {...rest} />
}

// Shared filters: a slight pencil wobble for linework. Rendered once in the app shell.
export function SketchDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <filter id="pencil" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" />
        </filter>
        <filter id="ink" x="-2%" y="-2%" width="104%" height="104%">
          <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="2" seed="3" result="grain" />
          <feDisplacementMap in="SourceGraphic" in2="grain" scale="1.4" />
        </filter>
      </defs>
    </svg>
  )
}
