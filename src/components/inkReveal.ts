// Marker reveal for the hero: drawing with the pointer held down uncovers a dark copy of the hero underneath.
// The copy is a clone of the section made when a stroke starts, so it matches the live puzzle state.
const NIB_W = 9 // px, chisel nib thickness
const NIB_H = 36 // px, chisel nib length
const HOLD = 2200 // ms a stroke stays before it fades
const FADE = 1400 // ms fade out
const NOTE_AFTER = 320 // px of drawing before the "Draw smth" note goes
const SCALE = 0.5 // mask canvas resolution, relative to the hero

export function inkReveal(hero: HTMLElement) {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return () => {}

  const ink = document.createElement('div')
  ink.className = 'hero__ink'
  ink.setAttribute('aria-hidden', 'true')
  ink.inert = true
  ink.style.opacity = '0' // shown only once the pen is down
  hero.appendChild(ink)

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return () => {}

  // "Draw smth" note: waits near the middle of the hero on load, follows the marker, goes once they have drawn.
  const note = document.createElement('span')
  note.className = 'hero__draw-note'
  note.setAttribute('aria-hidden', 'true')
  note.textContent = 'Draw smth 😉'
  hero.appendChild(note)
  let drawn = 0
  let pen = false

  let last: { x: number; y: number } | null = null
  let lastDrawn = 0
  let raf = 0
  let dirty = false
  let stale = true // the hero changed since the dark copy was made

  const rebuild = () => {
    const clone = hero.cloneNode(true) as HTMLElement
    clone.querySelector('.hero__ink')?.remove()
    clone.querySelector('.hero__draw-note')?.remove()
    clone.removeAttribute('id')
    clone.querySelectorAll('[id]').forEach((n) => n.removeAttribute('id'))
    clone.querySelectorAll('a, button').forEach((n) => n.setAttribute('tabindex', '-1'))
    clone.dataset.theme = 'dark'
    ink.replaceChildren(clone)
    const r = hero.getBoundingClientRect()
    canvas.width = Math.max(1, Math.round(r.width * SCALE))
    canvas.height = Math.max(1, Math.round(r.height * SCALE))
    stale = false
  }

  const paintMask = () => {
    const url = `url(${canvas.toDataURL()})`
    ink.style.webkitMaskImage = url
    ink.style.maskImage = url
  }

  const tick = (now: number) => {
    raf = 0
    const idle = now - lastDrawn
    if (idle > HOLD) {
      // Fade the whole mask out a little each frame once the marker has rested.
      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillStyle = `rgba(0 0 0 / ${Math.min(1, 16 / FADE + 0.02)})`
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.globalCompositeOperation = 'source-over'
      dirty = true
      if (idle > HOLD + FADE) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        paintMask()
        ink.style.opacity = '0'
        dirty = false
        if (stale) rebuild() // refreshed while nobody can see it
        return
      }
    }
    if (dirty) {
      paintMask()
      dirty = false
    }
    raf = requestAnimationFrame(tick)
  }

  // Angled chisel tip: a flat nib tilted 50deg, stamped along the path so strokes thicken and thin with direction.
  const stamp = (x: number, y: number) => {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate((-50 * Math.PI) / 180)
    ctx.fillRect((-NIB_W * SCALE) / 2, (-NIB_H * SCALE) / 2, NIB_W * SCALE, NIB_H * SCALE)
    ctx.restore()
  }

  const nearNote = (x: number, y: number) => {
    if (drawn < NOTE_AFTER) {
      note.style.left = '0'
      note.style.top = '0'
      note.style.transform = `translate(${x / SCALE + 20}px, ${y / SCALE + 26}px)`
    } else {
      note.dataset.gone = 'on'
    }
  }

  const point = (e: PointerEvent) => {
    const r = hero.getBoundingClientRect()
    return { x: (e.clientX - r.left) * SCALE, y: (e.clientY - r.top) * SCALE }
  }

  // Drawing needs the button held down; clicks on links, buttons and puzzle tiles still do their own thing.
  const onDown = (e: PointerEvent) => {
    if (e.pointerType === 'touch' || e.button !== 0) return
    if ((e.target as Element).closest('a, button, [role="button"], input, textarea, select')) return
    e.preventDefault() // no text selection or image drag while drawing
    if (!ink.firstChild || (stale && ink.style.opacity === '0')) rebuild()
    ctx.clearRect(0, 0, canvas.width, canvas.height) // a new drawing replaces the last one
    hero.setPointerCapture(e.pointerId)
    pen = true
    ink.style.opacity = '1'
    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = '#000'
    const { x, y } = point(e)
    stamp(x, y)
    last = { x, y }
    lastDrawn = performance.now()
    dirty = true
    if (!raf) raf = requestAnimationFrame(tick)
  }

  const onMove = (e: PointerEvent) => {
    if (e.pointerType === 'touch') return
    const { x, y } = point(e)
    nearNote(x, y)
    if (!pen || !last) return
    const dist = Math.hypot(x - last.x, y - last.y)
    const steps = Math.max(1, Math.ceil(dist / 1.5))
    for (let k = 1; k <= steps; k++) stamp(last.x + ((x - last.x) * k) / steps, last.y + ((y - last.y) * k) / steps)
    drawn += dist / SCALE
    last = { x, y }
    lastDrawn = performance.now()
    dirty = true
    if (!raf) raf = requestAnimationFrame(tick)
  }

  const onUp = () => {
    pen = false
    last = null
  }

  // Build the dark copy up front and keep it; it is only rebuilt while hidden, after the hero has changed.
  const onEnter = () => {
    if (!ink.firstChild || (stale && ink.style.opacity === '0')) rebuild()
  }
  const markStale = () => {
    stale = true
  }
  const watch = new MutationObserver((records) => {
    if (records.some((m) => !ink.contains(m.target) && m.target !== note)) markStale()
  })
  watch.observe(hero, { subtree: true, childList: true, attributes: true, characterData: true })
  window.addEventListener('resize', markStale)
  hero.addEventListener('pointerenter', onEnter)
  hero.addEventListener('pointerdown', onDown)
  hero.addEventListener('pointermove', onMove)
  hero.addEventListener('pointerup', onUp)
  hero.addEventListener('pointercancel', onUp)
  return () => {
    watch.disconnect()
    window.removeEventListener('resize', markStale)
    hero.removeEventListener('pointerenter', onEnter)
    hero.removeEventListener('pointerdown', onDown)
    hero.removeEventListener('pointermove', onMove)
    hero.removeEventListener('pointerup', onUp)
    hero.removeEventListener('pointercancel', onUp)
    cancelAnimationFrame(raf)
    ink.remove()
    note.remove()
  }
}
