import { useEffect, useRef } from 'react'
import { useThemeState } from '../theme'
import './PaintLayer.css'

/**
 * The light and the canvas for dark mode. One soft moonlight pool follows the pointer with a slow ease; on touch
 * screens and with reduced motion it rests near the top of the screen. Everything here ignores the pointer.
 */
export function PaintLayer() {
  const { theme } = useThemeState()
  const paint = theme === 'dark'
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!paint || !el) return
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let x = window.innerWidth * 0.5
    let y = window.innerHeight * 0.22
    let tx = x
    let ty = y
    let raf = 0
    const draw = () => {
      el.style.setProperty('--lx', `${x}px`)
      el.style.setProperty('--ly', `${y}px`)
    }
    const tick = () => {
      x += (tx - x) * 0.08
      y += (ty - y) * 0.08
      draw()
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.5 ? requestAnimationFrame(tick) : 0
    }
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      tx = e.clientX
      ty = e.clientY
      if (still) {
        x = tx
        y = ty
        draw()
      } else if (!raf) raf = requestAnimationFrame(tick)
    }
    draw()
    window.addEventListener('pointermove', move, { passive: true })
    return () => {
      window.removeEventListener('pointermove', move)
      cancelAnimationFrame(raf)
    }
  }, [paint])

  return <div ref={ref} className="paint-layer" aria-hidden="true" />
}
