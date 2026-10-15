// In-page jumps for the sheet stack. Sheets are position: sticky, so a plain #anchor jump
// scrolls to wherever a pinned sheet happens to sit, not where it starts. These helpers work
// from each sheet's place in the normal flow instead.

export const NAV_HEIGHT = 57

// Where a sheet starts in the document, ignoring sticky offsets: its parent's top plus the
// heights of the sheets before it.
export function sheetTop(sheet: HTMLElement) {
  const parent = sheet.parentElement
  let y = parent ? parent.getBoundingClientRect().top + window.scrollY : 0
  for (let el = parent?.firstElementChild; el && el !== sheet; el = el.nextElementSibling) {
    y += (el as HTMLElement).offsetHeight
  }
  return y
}

// The scroll position that puts a target (a sheet, or something inside one) under the nav.
export function scrollTargetFor(target: HTMLElement) {
  const sheet = target.closest<HTMLElement>('.paper-sheet')
  if (!sheet) return target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT
  const inner = target === sheet ? 0 : target.getBoundingClientRect().top - sheet.getBoundingClientRect().top - 16
  return Math.max(0, sheetTop(sheet) - NAV_HEIGHT + inner)
}

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Jump to the target, then bring its sheet up over the stack like a page pulled to the top.
export function goTo(target: HTMLElement) {
  const sheet = target.closest<HTMLElement>('.paper-sheet')
  window.scrollTo({ top: scrollTargetFor(target), behavior: 'instant' })
  if (sheet && !reduced() && sheet !== document.querySelector('.paper-sheet')) {
    sheet.getAnimations().forEach((a) => a.cancel())
    sheet.animate(
      [
        { transform: 'translateY(55vh)', boxShadow: '0 -1px 0 var(--ink), 0 -24px 48px -12px rgb(28 27 25 / 0.32)' },
        { transform: 'translateY(0)', boxShadow: '0 -1px 0 var(--ink), 0 -12px 24px -12px rgb(28 27 25 / 0.18)' },
      ],
      { duration: 650, easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)' },
    )
  }
  const focusable = sheet && target === sheet ? sheet : target
  if (!focusable.hasAttribute('tabindex')) focusable.setAttribute('tabindex', '-1')
  focusable.focus({ preventScroll: true })
}

// Delegated handler for every same-page #link (nav, menu, footer, hero buttons).
export function handleAnchorClick(e: MouseEvent) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
  const a = (e.target as HTMLElement).closest('a')
  if (!a || !a.hash || a.target) return
  const url = new URL(a.href)
  const page = (path: string) => path.replace(/\/index\.html$/, '/')
  if (page(url.pathname) !== page(location.pathname)) return
  const target = document.getElementById(decodeURIComponent(a.hash.slice(1)))
  if (!target) return
  e.preventDefault()
  history.pushState(null, '', a.hash)
  if (a.hash === '#top' || a.hash === '#main') {
    window.scrollTo({ top: 0, behavior: reduced() ? 'instant' : 'smooth' })
    target.setAttribute('tabindex', target.getAttribute('tabindex') ?? '-1')
    target.focus({ preventScroll: true })
    return
  }
  goTo(target)
}
