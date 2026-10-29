import { sectionHref } from '../links'
import { useEffect, useRef, useState } from 'react'
import { contact } from '../data/content'
import { sheetTop, NAV_HEIGHT } from '../sheetNav'
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
          {/* A pen-drawn mountain, for the peaks she has climbed. */}
          <svg className="nav__icon" viewBox="0 0 28 20" aria-hidden="true">
            <path d="M1.2 18.3 L13.6 3.4 L26.8 18.5 L0.8 18.2" />
            <path d="M9.6 8.6 L11.8 10.8 L13.6 8.8 L15.8 11 L17.6 8.8" />
          </svg>
          Ashni Dave
        </a>

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

        <button type="button" className="nav__menu-button label" onClick={() => menu.current?.showModal()}>
          Menu
        </button>
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
