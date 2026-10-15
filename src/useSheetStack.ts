import { useEffect } from 'react'

const NAV_HEIGHT = 57

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
    const ro = new ResizeObserver(update)
    sheets.forEach((el) => ro.observe(el))
    window.addEventListener('resize', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
