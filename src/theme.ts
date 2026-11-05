import { useEffect, useState } from 'react'

// Theme state lives on <html> (data-theme, data-paint) so the first paint can be set by the script in index.html.
// Light is always the default. Dark and painting mode only apply when the visitor picks them.
const THEME_KEY = 'theme'
const PAINT_KEY = 'paint'

export type Theme = 'light' | 'dark'

const root = () => document.documentElement
const meta = () => document.querySelector('meta[name="theme-color"]')

export const readTheme = (): Theme => (root().dataset.theme === 'dark' ? 'dark' : 'light')
export const readPaint = (): boolean => root().dataset.paint === 'on'

function save(key: string, value: string | null) {
  try {
    if (value === null) localStorage.removeItem(key)
    else localStorage.setItem(key, value)
  } catch {
    /* private mode */
  }
}

function savedTheme(): Theme {
  try {
    return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

function paintColour() {
  const paint = readPaint()
  meta()?.setAttribute('content', paint ? '#0b0e13' : readTheme() === 'dark' ? '#121416' : '#F4F5F6')
}

/** Sun / moon. Choosing light while painting mode is on switches painting mode off too. */
export function setTheme(t: Theme) {
  if (t === 'light') {
    delete root().dataset.paint
    save(PAINT_KEY, null)
  }
  if (t === 'dark') root().dataset.theme = 'dark'
  else delete root().dataset.theme
  save(THEME_KEY, t)
  paintColour()
}

/** Painting mode sits on top of dark. Turning it off returns to the sun or moon the visitor had chosen. */
export function setPaint(on: boolean) {
  if (on) {
    root().dataset.paint = 'on'
    root().dataset.theme = 'dark'
    save(PAINT_KEY, 'on')
  } else {
    delete root().dataset.paint
    save(PAINT_KEY, null)
    if (savedTheme() === 'dark') root().dataset.theme = 'dark'
    else delete root().dataset.theme
  }
  paintColour()
}

/** Re-renders when either attribute changes, so the two switches always agree. */
export function useThemeState() {
  const [state, setState] = useState<{ theme: Theme; paint: boolean }>({ theme: 'light', paint: false })
  useEffect(() => {
    const read = () => setState({ theme: readTheme(), paint: readPaint() })
    read()
    const mo = new MutationObserver(read)
    mo.observe(root(), { attributes: true, attributeFilter: ['data-theme', 'data-paint'] })
    return () => mo.disconnect()
  }, [])
  return state
}
