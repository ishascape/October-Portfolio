import { useEffect, useRef, type ReactNode } from 'react'
import './Parti.css'

// An SVG drawing that sketches itself in the first time it scrolls into view.
// Without JavaScript, or with reduced motion, it is simply drawn.
export function DrawOnScroll({ viewBox, className, children }: { viewBox: string; className?: string; children: ReactNode }) {
  const ref = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    el.dataset.draw = 'pending'
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        el.dataset.draw = 'drawing'
        io.disconnect()
      },
      { rootMargin: '0px 0px -20% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <svg ref={ref} className={`parti draw-on-scroll ${className ?? ''}`} viewBox={viewBox} aria-hidden="true">
      {children}
    </svg>
  )
}
