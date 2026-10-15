import { sectionHref } from '../links'
import { useEffect, useRef, useState } from 'react'
import { contact } from '../data/content'
import { sheetTop, NAV_HEIGHT } from '../sheetNav'
import './Nav.css'

const sections = [
  { id: 'top', sheet: '00', label: 'Introduction', inBar: false },
  { id: 'work', sheet: '01', label: 'Work', inBar: true },
  { id: 'about', sheet: '02', label: 'About', inBar: true },
  { id: 'contact', sheet: '03', label: 'Contact', inBar: true },
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
            <p className="label">Drawing list</p>
            <button type="button" className="nav__menu-button label" onClick={() => menu.current?.close()}>
              Close
            </button>
          </div>
          <ol>
            {sections.map((s) => (
              <li key={s.id}>
                <a href={sectionHref(s.id, onHome)}>
                  <span className="label">{s.sheet}</span>
                  {s.label}
                </a>
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
