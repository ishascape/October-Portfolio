import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'
const KEY = 'theme'

function current(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

/** Sun/moon switch in the navbar. The first paint is set by a small script in index.html. */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    setTheme(current())
  }, [])

  function apply(t: Theme) {
    document.documentElement.dataset.theme = t
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', t === 'dark' ? '#121416' : '#F4F5F6')
  }

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    apply(next)
    setTheme(next)
    try {
      localStorage.setItem(KEY, next)
    } catch {
      /* private mode */
    }
  }

  const dark = theme === 'dark'
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-pressed={dark}
      aria-label="Dark mode"
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="theme-toggle__track" aria-hidden="true">
        <svg className="theme-toggle__sun" viewBox="0 0 16 16">
          <circle cx="8" cy="8" r="3" />
          <path d="M8 1.5v1.8M8 12.7v1.8M1.5 8h1.8M12.7 8h1.8M3.4 3.4l1.3 1.3M11.3 11.3l1.3 1.3M12.6 3.4l-1.3 1.3M4.7 11.3l-1.3 1.3" />
        </svg>
        <svg className="theme-toggle__moon" viewBox="0 0 16 16">
          <path d="M13 9.6A5.5 5.5 0 0 1 6.4 3 5.5 5.5 0 1 0 13 9.6Z" />
        </svg>
        <span className="theme-toggle__knob" />
      </span>
    </button>
  )
}
