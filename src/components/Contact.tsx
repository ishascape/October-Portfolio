import { useEffect, useState } from 'react'
import { contact } from '../data/content'
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
        <h2 id="contact-heading" className="display contact__heading">
          Got a complex product problem? I'd love to solve it with you.
        </h2>
        <div className="contact__body">
          <p>
            I'm a Sydney-based Product Designer experienced in turning messy challenges into experiences that work for
            customers and move the business forward.
          </p>
          <p className="contact__connect">Let's connect:</p>
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
