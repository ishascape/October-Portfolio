import { useEffect } from 'react'
import { NAV_HEIGHT, goTo, handleAnchorClick } from './sheetNav'

// Sets each .paper-sheet's sticky offset so it pins only once its bottom edge reaches the
// bottom of the viewport. Short sheets pin under the nav; tall ones are read in full first.
export function useSheetStack(deps: unknown[]) {
  useEffect(() => {
    const sheets = Array.from(document.querySelectorAll<HTMLElement>('.paper-sheet'))
    const update = () => {
      const vh = window.innerHeight
      for (const el of sheets) {
        el.style.setProperty('--stick-top', `${Math.min(NAV_HEIGHT, vh - el.offsetHeight)}px`)
      }
    }
    update()
    // Arriving from another page with a #hash: the browser's own jump lands wrong on sticky sheets.
    if (location.hash) {
      const target = document.getElementById(decodeURIComponent(location.hash.slice(1)))
      if (target) requestAnimationFrame(() => goTo(target))
    }
    document.addEventListener('click', handleAnchorClick)
    const ro = new ResizeObserver(update)
    sheets.forEach((el) => ro.observe(el))
    window.addEventListener('resize', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
      document.removeEventListener('click', handleAnchorClick)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
