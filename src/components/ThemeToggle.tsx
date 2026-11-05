import { setTheme, useThemeState } from '../theme'

/** Sun/moon switch in the navbar. The first paint is set by a small script in index.html. */
export function ThemeToggle() {
  const { theme } = useThemeState()

  function toggle() {
    setTheme(theme === 'dark' ? 'light' : 'dark')
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
        {/* Solid, slightly tilted shapes, like the case study icons. The one under the knob is paper-coloured. */}
        <svg className="theme-toggle__sun" viewBox="0 0 16 16">
          <g transform="rotate(-10 8 8)">
            <circle cx="8" cy="8" r="3.1" />
            <path d="M8 1.4v2M8 12.6v2M1.4 8h2M12.6 8h2M3.3 3.3l1.4 1.4M11.3 11.3l1.4 1.4M12.7 3.3l-1.4 1.4M4.7 11.3l-1.4 1.4" />
          </g>
        </svg>
        <svg className="theme-toggle__moon" viewBox="0 0 16 16">
          <g transform="rotate(-10 8 8)">
            <path d="M13.2 9.8A5.9 5.9 0 0 1 6.2 2.8 5.9 5.9 0 1 0 13.2 9.8Z" />
          </g>
        </svg>
        <span className="theme-toggle__knob" />
      </span>
    </button>
  )
}
