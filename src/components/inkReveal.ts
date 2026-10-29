// Marker reveal for the hero: drawing with the pointer held down uncovers a dark copy of the hero's background.
// Scribbles stay until "Clear scribbles" is pressed. The card pile, the buttons and the clear button sit above the
// layer (see .hero__ink in Hero.css), so the marker only ever draws on the background behind them.
const NIB_W = 9 // px, chisel nib thickness
const NIB_H = 36 // px, chisel nib length
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
  note.innerHTML =
    'Draw smth' +
    '<svg class="hero__smile" viewBox="0 0 32 24" aria-hidden="true">' +
    '<path class="smile__eye" d="M11.5 6.8 v3.2" />' +
    '<path class="smile__eye smile__eye--open" d="M20.5 6.8 v3.2" />' +
    '<path class="smile__eye smile__eye--wink" d="M18.2 9.6 Q20.4 6.6 22.8 9.4" />' +
    '<path class="smile__mouth smile__mouth--grin" d="M9.5 14 C12 18.5 20 18.5 22.5 13.6" />' +
    '<path class="smile__mouth smile__mouth--smirk" d="M9.8 16.2 C13 18.4 19 18.2 23.6 12.4" />' +
    '</svg>'
  hero.appendChild(note)
  let drawn = 0
  let pen = false
  let last: { x: number; y: number } | null = null
  let raf = 0
  let dirty = false

  // The dark copy: a clone of the hero, made once and remade only when the layout changes (a resize).
  // The foreground pieces in it are hidden by CSS, because the live ones sit on top of the layer.
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
    const w = Math.max(1, Math.round(r.width * SCALE))
    const h = Math.max(1, Math.round(r.height * SCALE))
    if (w !== canvas.width || h !== canvas.height) {
      // Keep the scribbles through a resize by stretching them to the new size.
      const old = document.createElement('canvas')
      old.width = canvas.width
      old.height = canvas.height
      old.getContext('2d')?.drawImage(canvas, 0, 0)
      canvas.width = w
      canvas.height = h
      if (old.width > 0 && old.height > 0) ctx.drawImage(old, 0, 0, w, h)
      schedule()
    }
  }

  // What the layer shows is the scribbles minus the foreground pieces, so nothing is ever drawn over the card pile or
  // the buttons, even where they are see-through (the outline button, the arrows, the "Pick a page" label).
  const out = document.createElement('canvas')
  const outCtx = out.getContext('2d')
  const FOREGROUND = '.hero__actions .button, .hero__portrait, .hero__clear'
  const paintMask = () => {
    let source: HTMLCanvasElement = canvas
    if (outCtx) {
      out.width = canvas.width
      out.height = canvas.height
      outCtx.drawImage(canvas, 0, 0)
      outCtx.globalCompositeOperation = 'destination-out'
      outCtx.fillStyle = '#000'
      const h = hero.getBoundingClientRect()
      hero.querySelectorAll(FOREGROUND).forEach((el) => {
        if (ink.contains(el)) return
        const r = el.getBoundingClientRect()
        if (r.width === 0 || r.height === 0) return
        outCtx.beginPath()
        outCtx.roundRect(
          (r.left - h.left) * SCALE,
          (r.top - h.top) * SCALE,
          r.width * SCALE,
          r.height * SCALE,
          16 * SCALE,
        )
        outCtx.fill()
      })
      source = out
    }
    const url = `url(${source.toDataURL()})`
    ink.style.webkitMaskImage = url
    ink.style.maskImage = url
  }
  const flush = () => {
    raf = 0
    if (!dirty) return
    dirty = false
    paintMask()
  }
  function schedule() {
    dirty = true
    if (!raf) raf = requestAnimationFrame(flush)
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

  // Drawing needs the button held down. Presses on the card pile, the buttons and links do their own thing.
  const onDown = (e: PointerEvent) => {
    if (e.pointerType === 'touch' || e.button !== 0) return
    if ((e.target as Element).closest('a, button, [role="button"], input, textarea, select, .hero__portrait')) return
    e.preventDefault() // no text selection or image drag while drawing
    if (!ink.firstChild) rebuild()
    hero.setPointerCapture(e.pointerId)
    pen = true
    ink.style.opacity = '1'
    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = '#000'
    const { x, y } = point(e)
    stamp(x, y)
    last = { x, y }
    hero.dataset.scribbled = 'on'
    schedule()
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
    schedule()
  }

  const onUp = () => {
    pen = false
    last = null
  }

  // The "Clear scribbles" button (in Hero.tsx) asks for a clean sheet.
  const onClear = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ink.style.opacity = '0'
    delete hero.dataset.scribbled
    paintMask()
  }

  let resizeTimer = 0
  const onResize = () => {
    window.clearTimeout(resizeTimer)
    resizeTimer = window.setTimeout(() => {
      if (ink.firstChild) rebuild()
    }, 150)
  }

  const onEnter = () => {
    if (!ink.firstChild) rebuild() // built up front so the first stroke has no delay
  }

  window.addEventListener('resize', onResize)
  hero.addEventListener('pointerenter', onEnter)
  hero.addEventListener('pointerdown', onDown)
  hero.addEventListener('pointermove', onMove)
  hero.addEventListener('pointerup', onUp)
  hero.addEventListener('pointercancel', onUp)
  hero.addEventListener('hero:clear', onClear)
  return () => {
    window.removeEventListener('resize', onResize)
    window.clearTimeout(resizeTimer)
    hero.removeEventListener('pointerenter', onEnter)
    hero.removeEventListener('pointerdown', onDown)
    hero.removeEventListener('pointermove', onMove)
    hero.removeEventListener('pointerup', onUp)
    hero.removeEventListener('pointercancel', onUp)
    hero.removeEventListener('hero:clear', onClear)
    cancelAnimationFrame(raf)
    ink.remove()
    note.remove()
  }
}
