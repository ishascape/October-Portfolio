import { sectionHref } from '../links'
import { useEffect, useRef, useState } from 'react'
import { contact } from '../data/content'
import { sheetTop, NAV_HEIGHT } from '../sheetNav'
import { ThemeToggle } from './ThemeToggle'
import './Nav.css'

const sections = [
  { id: 'top', label: 'Introduction', inBar: false },
  { id: 'work', label: 'Work', inBar: true },
  { id: 'about', label: 'About', inBar: true },
  { id: 'contact', label: 'Contact', inBar: true },
]

export function Nav({ onHome }: { onHome: boolean }) {
  const [current, setCurrent] = useState('top')
  const menu = useRef<HTMLDialogElement>(null)

  // Underline the sheet on top of the stack. Sticky sheets overlap, so this works from each
  // sheet's place in the flow rather than from what intersects the viewport.
  useEffect(() => {
    if (!onHome) return
    let frame = 0
    const update = () => {
      frame = 0
      const line = window.scrollY + NAV_HEIGHT + window.innerHeight * 0.3
      let on = 'top'
      for (const s of sections) {
        const el = document.getElementById(s.id)
        if (el && sheetTop(el) <= line) on = s.id
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) on = 'contact'
      setCurrent(on)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [onHome])

  return (
    <header className="nav">
      <div className="container nav__inner">
        <a className="nav__name" href={sectionHref('top', onHome)}>
          {/* A solid blue mountain, like the section icons. On hover a climber walks up the left slope and plants a flag. */}
          <svg className="nav__icon" viewBox="0 0 28 22" aria-hidden="true">
            <g>
              <path className="mt__main" d="M1 20 L11.2 4.2 Q12 3 12.8 4.2 L26 20 Q26.8 21 25.6 21 H2 Q0.6 21 1 20 Z" />
              <path className="mt__snow" d="M8.6 10.2 L10.6 12.2 L12.4 10 L14.4 12.2 L16.4 10" />
            </g>
            <path className="mt__flag" d="M12 4 V0.6 L15.2 1.8 L12 3" />
            <g className="mt__climber">
              <g className="mt__walk">
                <circle className="mt__head" cx="0" cy="-6.3" r="1.3" />
                <path className="mt__limbs" d="M0 -5 L0.4 -2 M0.4 -2 L-1.2 0 M0.4 -2 L1.6 0" />
                <path className="mt__arms" d="M0.1 -4.3 L1.9 -5.6 M0.1 -4.3 L-1 -3" />
                <path className="mt__cheer" d="M0.1 -4.3 L-1.8 -6.9 M0.1 -4.3 L1.8 -6.9" />
              </g>
            </g>
          </svg>
          Ashni Dave
          <span className="nav__role">Senior Product Designer</span>
        </a>

        <div className="nav__end">
        <nav aria-label="Main" className="nav__links">
          <ul>
            {sections
              .filter((s) => s.inBar)
              .map((s) => (
                <li key={s.id}>
                  <a href={sectionHref(s.id, onHome)} aria-current={current === s.id ? 'location' : undefined}>
                    {s.label}
                  </a>
                </li>
              ))}
            {contact.resume && (
              <li>
                <a href={contact.resume} target="_blank" rel="noreferrer">
                  Resume <span aria-hidden="true">↗</span>
                </a>
              </li>
            )}
          </ul>
        </nav>

        <ThemeToggle />

        <button type="button" className="nav__menu-button label" onClick={() => menu.current?.showModal()}>
          Menu
        </button>
        </div>
      </div>

      <dialog
        ref={menu}
        className="nav__menu"
        aria-label="Drawing list"
        onClick={(e) => {
          if ((e.target as HTMLElement).closest('a')) menu.current?.close()
        }}
      >
        <div className="container nav__menu-inner">
          <div className="nav__menu-head">
            <p className="label">Menu</p>
            <button type="button" className="nav__menu-button label" onClick={() => menu.current?.close()}>
              Close
            </button>
          </div>
          <ol>
            {sections.map((s) => (
              <li key={s.id}>
                <a href={sectionHref(s.id, onHome)}>{s.label}</a>
              </li>
            ))}
            {contact.resume && (
              <li>
                <a href={contact.resume} target="_blank" rel="noreferrer">
                  <span className="label">↗</span>
                  Resume
                </a>
              </li>
            )}
          </ol>
        </div>
      </dialog>
    </header>
  )
}
