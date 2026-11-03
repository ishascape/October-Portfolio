import { useEffect, useRef } from 'react'

// The Venue Finder card media: a muted looping clip that plays while it is on screen.
// With reduced motion it stays on the poster frame and never plays.
export function useLoopWhenVisible() {
  const video = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = video.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    el.muted = true // React does not set the muted attribute reliably, and autoplay needs it
    const watch = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) el.play().catch(() => undefined)
      else el.pause()
    })
    watch.observe(el)
    return () => watch.disconnect()
  }, [])
  return video
}

export function CardVideo({ src, poster }: { src: string; poster: string }) {
  const video = useLoopWhenVisible()
  return (
    <div className="card__image card__image--video" aria-hidden="true">
      <video ref={video} src={src} poster={poster} muted loop playsInline preload="metadata" tabIndex={-1} />
    </div>
  )
}
