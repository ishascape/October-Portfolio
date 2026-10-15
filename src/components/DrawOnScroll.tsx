import { useEffect, useRef, type ReactNode } from 'react'
import './Parti.css'

// An SVG drawing tied to the scroll: it sketches itself in, line by line, as it moves up the
// screen, and rubs out again on the way back. Lines draw in their data-order; anything marked
// .draw-late (dots, fills, labels) settles in at the end.
// Without JavaScript, or with reduced motion, it is simply drawn.
export function DrawOnScroll({ viewBox, className, children }: { viewBox: string; className?: string; children: ReactNode }) {
  const ref = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = ref.current
    if (!svg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lines = Array.from(svg.querySelectorAll<SVGGeometryElement>('[pathLength]'))
    const late = Array.from(svg.querySelectorAll<SVGElement>('.draw-late'))
    const orders = lines.map((el) => Number(el.dataset.order ?? 0))
    const last = Math.max(1, ...orders)
    let frame = 0

    const update = () => {
      frame = 0
      const { top } = svg.getBoundingClientRect()
      const vh = window.innerHeight
      // 0 when the drawing's top edge enters at the bottom of the screen, 1 by the time it reaches 40%
      const p = Math.min(1, Math.max(0, (vh - top) / (vh * 0.6)))
      lines.forEach((el, n) => {
        const start = (orders[n] / last) * 0.6
        const local = Math.min(1, Math.max(0, (p - start) / 0.35))
        el.style.strokeDashoffset = String(1 - local)
      })
      const fade = String(Math.min(1, Math.max(0, (p - 0.75) / 0.25)))
      late.forEach((el) => (el.style.opacity = fade))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <svg ref={ref} className={`parti draw-on-scroll ${className ?? ''}`} viewBox={viewBox} aria-hidden="true">
      {children}
    </svg>
  )
}
