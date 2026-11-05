import { useEffect, useState } from 'react'

// Theme state lives on <html data-theme> so the first paint can be set by the script in index.html.
// The visitor's saved choice from the toggle wins. Without one, the page follows the system setting, live.
const THEME_KEY = 'theme'

export type Theme = 'light' | 'dark'

const root = () => document.documentElement

export const readTheme = (): Theme => (root().dataset.theme === 'dark' ? 'dark' : 'light')

function paint(t: Theme) {
  if (t === 'dark') root().dataset.theme = 'dark'
  else delete root().dataset.theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', t === 'dark' ? '#0b0e13' : '#F4F5F6')
}

/** Sun / moon: an explicit choice, remembered. */
export function setTheme(t: Theme) {
  paint(t)
  try {
    localStorage.setItem(THEME_KEY, t)
  } catch {
    /* private mode */
  }
}

/** With no saved choice, follow the device's light or dark setting as it changes. Call once. */
export function useSystemTheme() {
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => {
      try {
        if (localStorage.getItem(THEME_KEY)) return
      } catch {
        /* private mode: keep following the system */
      }
      paint(mq.matches ? 'dark' : 'light')
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
}

/** Re-renders when the theme attribute changes. */
export function useThemeState() {
  const [theme, setThemeState] = useState<Theme>('light')
  useEffect(() => {
    const read = () => setThemeState(readTheme())
    read()
    const mo = new MutationObserver(read)
    mo.observe(root(), { attributes: true, attributeFilter: ['data-theme'] })
    return () => mo.disconnect()
  }, [])
  return { theme }
}
