import type { PointerEvent } from 'react'

// Moves the circular sketch reveal to the pointer. Touch is ignored: there is no hover to follow.
export function revealAt(e: PointerEvent<HTMLElement>) {
  if (e.pointerType === 'touch') return
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--reveal-x', `${e.clientX - r.left}px`)
  el.style.setProperty('--reveal-y', `${e.clientY - r.top}px`)
  el.dataset.reveal = 'on'
}

export function revealEnd(e: PointerEvent<HTMLElement>) {
  delete e.currentTarget.dataset.reveal
}
