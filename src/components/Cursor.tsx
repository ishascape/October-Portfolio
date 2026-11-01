import { useEffect, useRef } from 'react'
import './Cursor.css'

// Anything a visitor can click, tap or press.
const CLICKABLE =
  'a[href], button:not(:disabled), [role="button"], [role="tab"], summary, label, select, [tabindex]:not([tabindex="-1"]), .deck-sheet, .switch, .vfp__spot, .field-notes__paper, .case img[alt]:not([alt=""])'

// A hand-drawn blue cursor for mouse users: an arrow that turns into a hand over anything clickable.
// Touch screens and reduced-motion-free pointers fall back to the normal cursor.
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const root = document.documentElement
    root.classList.add('cc-on')

    let x = -100
    let y = -100
    let raf = 0
    const paint = () => {
      raf = 0
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      x = e.clientX
      y = e.clientY
      el.classList.add('is-visible')
      el.classList.toggle('is-hand', !!(e.target as Element | null)?.closest?.(CLICKABLE))
      if (!raf) raf = requestAnimationFrame(paint)
    }
    const onDown = () => el.classList.add('is-down')
    const onUp = () => el.classList.remove('is-down')
    const onLeave = () => el.classList.remove('is-visible')

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      root.classList.remove('cc-on')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="cc" ref={ref} aria-hidden="true">
      {/* The pointer: a solid blue arrow with a paper highlight, tilted like the section icons. */}
      <svg className="cc__arrow" viewBox="0 0 32 32">
        <g transform="rotate(-8 6 4)">
          <path className="f" d="M5 3 L5 24 L10.5 19 L14.5 28 L18 26.5 L14 17.8 L21.5 17.5 Z" />
          <path className="d" d="M8 9.5 v7" />
        </g>
      </svg>
      {/* The hand: one finger up, knuckle lines in paper. */}
      <svg className="cc__hand" viewBox="0 0 32 32">
        <g transform="rotate(-6 16 16)">
          <path
            className="f"
            d="M11 4.5 a2.2 2.2 0 0 1 4.4 0 V13 a2 2 0 0 1 3.6 -0.8 a2 2 0 0 1 3.4 0.2 a2 2 0 0 1 3.4 0.8 V20 c0 4.5 -3 8 -7.5 8 h-2 c-3 0 -4.6 -1.6 -6.2 -4 l-3.6 -5.6 a1.9 1.9 0 0 1 3.2 -2 l2.3 2.6 Z"
          />
          <path className="d" d="M19 15.5 v4 M22.4 16 v3.5" />
        </g>
      </svg>
    </div>
  )
}
