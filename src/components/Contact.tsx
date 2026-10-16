import { useEffect, useState } from 'react'
import { availability, contact } from '../data/content'
import { SheetLabel } from './SheetLabel'
import './Contact.css'

export function Contact() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(t)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopied(true)
    } catch {
      window.location.href = `mailto:${contact.email}`
    }
  }

  return (
    <section id="contact" className="section contact paper-sheet" aria-labelledby="contact-heading">
      <div className="container">
        <SheetLabel sheet="03 / 03" title="Contact" />
        <h2 id="contact-heading" className="display contact__heading">
          Got an interesting problem? Let's work together!
        </h2>
        <div className="contact__body">
          <p>
            {availability.headline} {availability.location}
          </p>
        </div>

        <div className="contact__links">
          <button type="button" className="button button--primary contact__copy" onClick={copy}>
            <span className={copied ? 'label' : undefined}>{copied ? 'Copied ✓' : contact.email}</span>
            {!copied && <span className="label contact__copy-hint">Copy</span>}
          </button>
          <span className="visually-hidden" aria-live="polite">
            {copied ? 'Email address copied' : ''}
          </span>
          <a className="button" href={`mailto:${contact.email}`}>
            Email me
          </a>
          {contact.linkedin && (
            <a className="button" href={contact.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
          )}
          {contact.resume && (
            <a className="button" href={contact.resume} target="_blank" rel="noreferrer">
              Download resume <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
