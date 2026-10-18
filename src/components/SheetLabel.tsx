import { useEffect, useRef, useState } from 'react'
import './SheetLabel.css'

interface SheetLabelProps {
  sheet: string
  title: string
  tags?: string[]
}

// Opens every section like a drawing border. The rule draws in once, when scrolled into view.
export function SheetLabel({ sheet, title, tags }: SheetLabelProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const [drawn, setDrawn] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) {
      setDrawn(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <p ref={ref} className="sheet-label label" data-drawn={drawn}>
      Sheet {sheet} · {title}
      {tags && (
        <span className="sheet-label__tags">
          {tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </span>
      )}
    </p>
  )
}
