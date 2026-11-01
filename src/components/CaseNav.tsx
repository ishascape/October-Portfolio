import { useEffect, useRef, useState } from 'react'
import { CaseIcon, type CaseIconName } from './CaseIcons'
import './CaseNav.css'

export type CaseNavItem = { id: string; label: string; icon: CaseIconName }

// The case study's sections as a nav. Desktop and tablet: a floating column of icons on the left, which shows each
// section's name on hover or focus. Phones: a bar pinned under the header that scrolls sideways.
// The section in view is highlighted as you read.
export function CaseNav({ items }: { items: CaseNavItem[] }) {
  const [active, setActive] = useState(items[0]?.id)
  const [shown, setShown] = useState(false)
  const barRef = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const targets = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el)
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: '-35% 0px -60% 0px' },
    )
    targets.forEach((t) => io.observe(t))

    // The floating nav appears once the case study header has scrolled away.
    const header = document.querySelector('.case__header')
    const ho = new IntersectionObserver(([e]) => setShown(!e.isIntersecting), { rootMargin: '-120px 0px 0px 0px' })
    if (header) ho.observe(header)
    return () => {
      io.disconnect()
      ho.disconnect()
    }
  }, [items])

  // On phones, keep the active chip in view inside the sideways bar.
  useEffect(() => {
    const bar = barRef.current
    const chip = bar?.querySelector<HTMLElement>('[aria-current="true"]')
    if (!bar || !chip || bar.scrollWidth <= bar.clientWidth) return
    const left = chip.offsetLeft - (bar.clientWidth - chip.offsetWidth) / 2
    bar.scrollTo({ left, behavior: 'smooth' })
  }, [active])

  return (
    <nav className={shown ? 'case-nav is-shown' : 'case-nav'} aria-label="Case study sections">
      <ol className="case-nav__list" ref={barRef}>
        {items.map((i) => (
          <li key={i.id}>
            <a
              className="case-nav__link"
              href={`#${i.id}`}
              aria-current={i.id === active ? 'true' : undefined}
              onClick={() => setActive(i.id)}
            >
              <CaseIcon name={i.icon} />
              <span className="case-nav__label">{i.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
