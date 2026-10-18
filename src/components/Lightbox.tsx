import { useEffect, useRef, useState } from 'react'
import './Lightbox.css'

// Click any real screenshot inside a case study to see it full size. One native dialog, no dependencies.
export function Lightbox() {
  const ref = useRef<HTMLDialogElement>(null)
  const [shown, setShown] = useState<{ src: string; alt: string } | null>(null)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const img = (e.target as HTMLElement).closest?.('.case img') as HTMLImageElement | null
      if (!img || img.closest('.case__next, .lightbox') || !img.alt || img.closest('a, button')) return
      setShown({ src: img.currentSrc || img.src, alt: img.alt })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  useEffect(() => {
    const d = ref.current
    if (shown && d && !d.open) d.showModal()
  }, [shown])

  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label="Enlarged image"
      onClose={() => setShown(null)}
      onClick={(e) => e.target === e.currentTarget && ref.current?.close()}
    >
      {shown && <img src={shown.src} alt={shown.alt} />}
      <button type="button" className="button lightbox__close" onClick={() => ref.current?.close()}>
        Close
      </button>
    </dialog>
  )
}
