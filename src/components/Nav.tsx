import { useEffect, useRef, useState } from 'react'
import { contact } from '../data/content'
import './Nav.css'

const sections = [
  { id: 'top', sheet: '00', label: 'Site plan', inBar: false },
  { id: 'work', sheet: '01', label: 'Work', inBar: true },
  { id: 'about', sheet: '02', label: 'About', inBar: true },
  { id: 'contact', sheet: '03', label: 'Contact', inBar: true },
]

export function Nav() {
  const [current, setCurrent] = useState('top')
  const menu = useRef<HTMLDialogElement>(null)

  // Underline the section currently in view.
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setCurrent(e.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    for (const s of sections) {
      const el = document.getElementById(s.id)
      if (el) io.observe(el)
    }
    return () => io.disconnect()
  }, [])

  return (
    <header className="nav">
      <div className="container nav__inner">
        <a className="nav__name" href="#top">
          Ashni Dave
        </a>

        <nav aria-label="Main" className="nav__links">
          <ul>
            {sections
              .filter((s) => s.inBar)
              .map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} aria-current={current === s.id ? 'location' : undefined}>
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

        <button type="button" className="nav__menu-button mono" onClick={() => menu.current?.showModal()}>
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
            <p className="mono">Drawing list</p>
            <button type="button" className="nav__menu-button mono" onClick={() => menu.current?.close()}>
              Close
            </button>
          </div>
          <ol>
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>
                  <span className="mono">{s.sheet}</span>
                  {s.label}
                </a>
              </li>
            ))}
            {contact.resume && (
              <li>
                <a href={contact.resume} target="_blank" rel="noreferrer">
                  <span className="mono">↗</span>
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
