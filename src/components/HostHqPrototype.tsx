import { useEffect, useState } from 'react'

// The HostHQ MVP prototype is a separate page in an iframe. With reduced motion it is swapped for a still.
export function HostHqPrototype() {
  const title =
    'Auto-playing desktop prototype of the HostHQ MVP: Requests, Leads and filters, sending a proposal, the sent proposal, Proposals, Bookings and Reports.'
  const [still, setStill] = useState(false)
  useEffect(() => {
    setStill(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])
  return (
    <figure className="case__hq-proto">
      {still ? (
        <img src="/hosthq-prototype/poster.webp" alt={title} width={1440} height={1024} />
      ) : (
        <iframe src="/hosthq-prototype/" title={title} loading="lazy" tabIndex={-1} />
      )}
    </figure>
  )
}
