import { useRef, useState } from 'react'
import { capabilities, caseStudies, contact, type CaseStudyId } from '../data/content'
import { SitePlan, type PlanMode } from './SitePlan'
import { DetailSheet } from './DetailSheet'
import { ModeSwitch } from './ModeSwitch'
import './Hero.css'

export function Hero() {
  const [mode, setMode] = useState<PlanMode>('proposed')
  const [hovered, setHovered] = useState<CaseStudyId | null>(null)
  const [selected, setSelected] = useState<CaseStudyId | null>(null)
  const returnFocus = useRef<Element | null>(null)

  const active = caseStudies.find((s) => s.id === hovered)
  const selectedStudy = caseStudies.find((s) => s.id === selected) ?? null

  const planProps = {
    studies: caseStudies,
    mode,
    hovered,
    onHover: setHovered,
    onSelect: (id: CaseStudyId, el: Element) => {
      returnFocus.current = el
      setSelected(id)
    },
  }

  return (
    <section id="top" className="hero paper-sheet" aria-labelledby="hero-heading">
      <div className="container">
        <p className="label hero__sheet">
          <span>Sheet 00 / 03 · Site plan</span>
          <span aria-hidden="true">Scale NTS</span>
        </p>

        <div className="hero__intro">
          <h1 id="hero-heading" className="display">
            I design coherent, scalable products for complex businesses.
          </h1>
          <div className="hero__support">
            <p>
              Senior Product Designer for B2B SaaS, marketplaces and AI products. I design the system around a
              product, not just the product: the workflows, automation, teams and processes it touches. Research,
              workshops, data and commercial sense decide what ships.
            </p>
            <ul className="hero__capabilities label" aria-label="How I work">
              {capabilities.map((c) => (
                <li key={c}>
                  <a href="#how-i-work">{c}</a>
                </li>
              ))}
            </ul>
            <div className="hero__actions">
              <a className="button button--primary" href="#work">
                Selected work <span aria-hidden="true">↓</span>
              </a>
              {contact.resume && (
                <a className="button" href={contact.resume} target="_blank" rel="noreferrer">
                  View resume <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="hero__drawing">
          <div className="hero__controls">
            <div className="hero__toggle">
              <div className="hero__toggle-row">
                <span className="margin-note" aria-hidden="true">
                  try it →
                </span>
                <ModeSwitch mode={mode} onChange={setMode} />
              </div>
              <p className="hero__helper">Dashed lines show what I found. Solid lines show what shipped.</p>
            </div>
          </div>

          <div className="hero__plan hero__plan--landscape">
            <SitePlan variant="landscape" {...planProps} />
          </div>
          <div className="hero__plan hero__plan--portrait">
            <SitePlan variant="portrait" {...planProps} />
          </div>

          <div className="hero__footer">
            <p className="hero__annotation label" aria-hidden="true">
              {active ? (
                <>
                  <span>
                    {active.number} · {active.title}
                  </span>
                  <span className="hero__annotation-existing">Existing: {active.existing}</span>
                  <span>Proposed: {active.proposed}</span>
                </>
              ) : (
                <span>Select a building to open the project</span>
              )}
            </p>

            <dl className="title-block label">
              <div className="title-block__name">
                <dt className="visually-hidden">Name</dt>
                <dd>Ashni Dave</dd>
              </div>
              <div>
                <dt className="visually-hidden">Role</dt>
                <dd>Senior Product Designer</dd>
              </div>
              <div>
                <dt className="visually-hidden">Location and availability</dt>
                <dd>Sydney, Australia · Seeking a permanent role (visa sponsorship) · Remote considered</dd>
              </div>
              <div className="title-block__rev">
                <dt className="visually-hidden">Revision</dt>
                <dd>Drawn 2026 · Rev D</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <DetailSheet
        study={selectedStudy}
        onClose={() => {
          setSelected(null)
          if (returnFocus.current instanceof SVGElement || returnFocus.current instanceof HTMLElement) {
            returnFocus.current.focus()
          }
        }}
      />
    </section>
  )
}
