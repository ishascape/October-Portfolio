import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { Nav } from '../components/Nav'
import { Hero } from '../components/Hero'
import { Footer } from '../components/Footer'
import { AiPrinciples } from '../components/AiPrinciples'
import { Skills } from '../components/Skills'
import { FieldStrip } from '../components/FieldStrip'
import { ModeSwitch } from '../components/ModeSwitch'
import { CardCarousel } from '../components/CardCarousel'
import { CardVideo } from '../components/CardVideo'
import { SketchDefs } from '../components/Sketch'
import type { PlanMode } from '../components/SitePlan'
import { caseStudies, fieldNotes, revisions } from '../data/content'
import '../components/Work.css'
import '../components/About.css'
import '../components/CaseStudy.css'

// The living style guide: real components from the site, rendered with their states. It imports the components
// themselves (not copies), so it can't drift. Where a component isn't exported on its own, the markup mirrors it
// exactly and says so. Docs: docs/design-system/.

const sections = [
  ['colour', 'Colour'],
  ['type', 'Typography'],
  ['space', 'Spacing'],
  ['lines', 'Lines, shape, elevation'],
  ['motion', 'Motion'],
  ['buttons', 'Buttons'],
  ['chips', 'Chips and links'],
  ['nav', 'Nav'],
  ['polaroid', 'Polaroid and hero'],
  ['case-card', 'Case study card'],
  ['principles', 'Principle cards'],
  ['expertise', 'Expertise cards'],
  ['field-notes', 'Field notes pile'],
  ['tables', 'Revision table'],
  ['patterns', 'Case study patterns'],
  ['switch', 'Mode switch'],
  ['footer', 'Title sheet'],
] as const

function Block({ id, title, children, intro }: { id: string; title: string; intro?: ReactNode; children: ReactNode }) {
  return (
    <section id={id} className="ds-block" aria-labelledby={`${id}-h`}>
      <div className="container">
        <h2 id={`${id}-h`} className="ds-block__title">
          {title}
        </h2>
        {intro && <p className="ds-block__intro">{intro}</p>}
        {children}
      </div>
    </section>
  )
}

function Specimen({ label, children, wide }: { label: string; children: ReactNode; wide?: boolean }) {
  return (
    <figure className={wide ? 'ds-specimen ds-specimen--wide' : 'ds-specimen'}>
      <div className="ds-specimen__stage">{children}</div>
      <figcaption className="label">{label}</figcaption>
    </figure>
  )
}

// Reads a custom property's live value, so the swatches show what the CSS actually says. Re-reads when the theme
// toggle in the nav flips light and dark, so the values always match the mode on screen.
function useVar(name: string) {
  const [v, setV] = useState('')
  useEffect(() => {
    const read = () => setV(getComputedStyle(document.documentElement).getPropertyValue(name).trim())
    read()
    const watch = new MutationObserver(read)
    watch.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => watch.disconnect()
  }, [name])
  return v
}

function Swatch({ token, cssVar, note }: { token: string; cssVar: string; note?: string }) {
  const value = useVar(cssVar)
  return (
    <li className="ds-swatch">
      <span className="ds-swatch__chip" style={{ background: `var(${cssVar})` }} />
      <span className="ds-swatch__name">{token}</span>
      <code className="ds-code">{cssVar}</code>
      <span className="label ds-muted">{value}</span>
      {note && <span className="label ds-muted">{note}</span>}
    </li>
  )
}

// Third column: the primitive in tokens.css each semantic token aliases.
const surfaces = [
  ['color.surface.page', '--color-surface-page', '--surface: page, nav, sheets'],
  ['color.surface.card', '--color-surface-card', '--paper: cards, bars'],
  ['color.surface.sunken', '--color-surface-sunken', '--paper-shade: wells'],
  ['color.surface.deep', '--color-surface-deep', '--paper-deep: Selected work'],
  ['color.surface.raised', '--color-surface-raised', 'sheet-lift 45% into paper: prints'],
  ['color.surface.inverse', '--color-surface-inverse', '--ink: primary button'],
  ['color.surface.accent-subtle', '--color-surface-accent-subtle', '--marker-wash'],
]
const content = [
  ['color.text.primary', '--color-text-primary', '--ink'],
  ['color.text.secondary', '--color-text-secondary', '--graphite'],
  ['color.text.accent', '--color-text-accent', '--marker'],
  ['color.text.accent-on-subtle', '--color-text-accent-on-subtle', 'marker 700 (light), --marker (dark)'],
  ['color.border.subtle', '--color-border-subtle', '--rule: resting card edge'],
  ['color.border.divider', '--color-border-divider', '--marker: 1px dividers'],
  ['color.border.focus', '--color-border-focus', '--marker'],
  ['elevation.pop colour', '--pop-ink', 'ink (light), dimmed moonlight (dark)'],
]

const typeRoles: { token: string; style: CSSProperties; sample: string; hand?: boolean }[] = [
  {
    token: 'type.display.hero · 700',
    style: { fontSize: 'var(--type-display-hero)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em' },
    sample: 'I design products that help people make better decisions.',
  },
  {
    token: 'type.display.statement · 500',
    style: { fontSize: 'var(--type-display-statement)', fontWeight: 500, lineHeight: 1.15 },
    sample: 'Build something people love.',
  },
  {
    token: 'type.heading.section · 600',
    style: { fontSize: 'var(--type-heading-section)', fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.015em' },
    sample: 'Section heading',
  },
  {
    token: 'type.heading.card · 600',
    style: { fontSize: 'var(--type-heading-card)', fontWeight: 600, lineHeight: 1.15, letterSpacing: '-0.01em' },
    sample: 'Venue Finder',
  },
  {
    token: 'type.title · 18 / 600',
    style: { fontSize: 'var(--type-title)', fontWeight: 600, lineHeight: 1.3 },
    sample: 'Always define the guardrails.',
  },
  {
    token: 'type.lead · 20 / 400',
    style: { fontSize: 'var(--type-lead)', lineHeight: 1.55 },
    sample: 'Designing for conversion, supply growth and activation.',
  },
  {
    token: 'type.body · 16-18 / 1.65',
    style: { fontSize: 'var(--type-body)', lineHeight: 1.65 },
    sample:
      'Trained as an architect, so I start with the system: who pays, who uses it, and what must be true for both.',
  },
  {
    token: 'type.label · 14 / 500',
    style: { fontSize: 'var(--type-label)', fontWeight: 500, lineHeight: 1.4 },
    sample: 'HeadBox · Senior Product Designer',
  },
  {
    token: 'type.metric · 600 tabular',
    style: {
      fontSize: 'var(--type-metric)',
      fontWeight: 600,
      lineHeight: 1,
      letterSpacing: '-0.02em',
      color: 'var(--color-text-accent)',
      fontVariantNumeric: 'tabular-nums',
    },
    sample: '+30%',
  },
  {
    token: 'type.annotation · Caveat 22',
    style: { fontFamily: 'var(--font-hand)', fontSize: 'var(--type-annotation)', fontWeight: 500, lineHeight: 1.15 },
    sample: "Hi! I'm Ashni",
    hand: true,
  },
]

const spaceSteps = ['--space-1', '--space-2', '--space-3', '--space-4', '--space-5', '--space-6', '--space-7']

function SpaceRow({ step }: { step: string }) {
  const v = useVar(step)
  return (
    <li className="ds-space">
      <code className="ds-code">{step}</code>
      <span className="ds-space__bar" style={{ width: `var(${step})` }} />
      <span className="label ds-muted">{v}</span>
    </li>
  )
}

const easings = [
  ['motion.easing.pen', 'var(--motion-easing-pen)', 'State changes'],
  ['motion.easing.settle', 'var(--motion-easing-settle)', 'Paper moving'],
  ['motion.easing.enter', 'var(--motion-easing-enter)', 'Entrances'],
  ['motion.easing.glide', 'var(--motion-easing-glide)', 'Hero title glide'],
]

// The same chip rule as Work.tsx: drop any chip that repeats the badge, then show cardTagCount (3 by default).
function cardTags(s: (typeof caseStudies)[number]) {
  return s.tags.filter((t) => t !== s.outcome).slice(0, s.cardTagCount ?? 3)
}

export function StyleGuide() {
  const [moved, setMoved] = useState(false)
  const [heroKey, setHeroKey] = useState(0)
  const [mode, setMode] = useState<PlanMode>('existing')
  const study = caseStudies[0]

  return (
    <div className="ds">
      <SketchDefs />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav onHome={false} />
      <main id="main">
        <header className="ds-header">
          <div className="container">
            <p className="label ds-muted">Drawing set · Living style guide</p>
            <h1 className="display">Design system</h1>
            <p className="ds-block__intro">
              The real components from ashnidave.com, with their states. Written guidance lives in{' '}
              <code className="ds-code">docs/design-system/</code> in the repo. Forced states (hover, focus, pressed) are
              labelled; everything else is live, so hover and tab through it.
            </p>
            <nav aria-label="Style guide sections">
              <ul className="ds-index">
                {sections.map(([id, label]) => (
                  <li key={id}>
                    <a href={`#${id}`}>{label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>

        <Block
          id="colour"
          title="Colour"
          intro="Semantic tokens, resolved live from the CSS. A cool gray page with white cards; marker blue is rationed. Flip the sun and moon switch in the nav to see the moonlit dark values."
        >
          <h3 className="label ds-sub">Surfaces</h3>
          <ul className="ds-swatches">
            {surfaces.map(([t, v, n]) => (
              <Swatch key={t} token={t} cssVar={v} note={n} />
            ))}
          </ul>
          <h3 className="label ds-sub">Text and lines</h3>
          <ul className="ds-swatches">
            {content.map(([t, v, n]) => (
              <Swatch key={t} token={t} cssVar={v} note={n} />
            ))}
          </ul>
          <div className="ds-row">
            <Specimen label="Blueprint theme: data-theme='blueprint' swaps the primitives">
              <div data-theme="blueprint" className="ds-theme-sample">
                <p style={{ color: 'var(--color-text-primary)' }}>Text primary</p>
                <p className="label" style={{ color: 'var(--color-text-secondary)' }}>
                  Text secondary
                </p>
              </div>
            </Specimen>
          </div>
        </Block>

        <Block
          id="type"
          title="Typography"
          intro="Poppins for everything you read. Caveat only signs and annotates. Even pixel sizes only."
        >
          <ul className="ds-type">
            {typeRoles.map((r) => (
              <li key={r.token}>
                <code className="ds-code">{r.token}</code>
                <p style={r.style}>{r.sample}</p>
              </li>
            ))}
          </ul>
        </Block>

        <Block
          id="space"
          title="Spacing"
          intro="8px-based. Steps 4 to 7 grow from 600px wide; resize the window to see the values change."
        >
          <ul className="ds-spaces">
            {spaceSteps.map((s) => (
              <SpaceRow key={s} step={s} />
            ))}
          </ul>
        </Block>

        <Block
          id="lines"
          title="Lines, shape, elevation"
          intro="Pen weights carry hierarchy. UI is rounded, paper is square. Lifted paper casts a soft shadow; things you can press cast a hard shadow pop on hover and focus."
        >
          <div className="ds-row">
            {[
              ['line.hair 0.5px', '--line-hair'],
              ['line.thin 1px', '--line-thin'],
              ['line.building 1.5px', '--line-building'],
              ['line.cut 3px', '--line-cut'],
            ].map(([l, v]) => (
              <Specimen key={v} label={l}>
                <span className="ds-line" style={{ borderTopWidth: `var(${v})` }} />
              </Specimen>
            ))}
          </div>
          <div className="ds-row">
            <Specimen label="radius.md 16px: UI">
              <span className="ds-shape" style={{ borderRadius: 'var(--radius-md)' }} />
            </Specimen>
            <Specimen label="radius.pill">
              <span className="ds-shape ds-shape--pill" />
            </Specimen>
            <Specimen label="radius.none: paper">
              <span className="ds-shape" style={{ borderRadius: 0 }} />
            </Specimen>
          </div>
          <h3 className="label ds-sub">Divider</h3>
          <Specimen label="border.divider: 1px marker blue, the only full-width rule (nav, section and case study header edges)" wide>
            <span className="ds-divider" />
          </Specimen>
          <h3 className="label ds-sub">Shadow pop: buttons, case study cards, next case study card, deck arrows</h3>
          <div className="ds-row">
            {(
              [
                ['Rest', ''],
                ['Hover or focus: lifts 2px up-left, 5px hard shadow', 'ds-pop--up'],
                ['Pressed: settles into a 1px shadow', 'ds-pop--pressed'],
              ] as const
            ).map(([l, c]) => (
              <Specimen key={l} label={l}>
                <span className={`ds-pop ${c}`} />
              </Specimen>
            ))}
          </div>
          <p className="ds-note">
            Hover pops only where a real pointer can hover, so a tap never leaves a card stuck up. Keyboard focus always
            pops. With reduced motion the shadow still appears but nothing moves. The hover corner marks were removed on
            13 Nov 2026; do not bring them back.
          </p>
          <h3 className="label ds-sub">Paper shadows</h3>
          <div className="ds-row">
            {['--elevation-paper', '--elevation-paper-hover', '--elevation-paper-lifted'].map((e) => (
              <Specimen key={e} label={e.replace('--', '').replace('-', '.')}>
                <span className="ds-paper" style={{ boxShadow: `var(${e})` }} />
              </Specimen>
            ))}
          </div>
        </Block>

        <Block
          id="motion"
          title="Motion"
          intro="Settle, don't spring. Press play to compare the four curves over 700ms. With reduced motion on, they jump."
        >
          <button type="button" className="button" onClick={() => setMoved((m) => !m)}>
            {moved ? 'Reset' : 'Play'}
          </button>
          <ul className="ds-easings">
            {easings.map(([t, e, use]) => (
              <li key={t}>
                <code className="ds-code">{t}</code>
                <span className="label ds-muted">{use}</span>
                <span className="ds-track">
                  <span
                    className="ds-dot"
                    style={{
                      transitionTimingFunction: e,
                      transform: moved ? 'translateX(calc(100cqw - 24px))' : 'none',
                    }}
                  />
                </span>
              </li>
            ))}
          </ul>
        </Block>

        <Block
          id="buttons"
          title="Buttons"
          intro="Primary and secondary. Hover turns them marker blue and pops them up off the page; keyboard focus pops them too, with the blue focus ring. Pressing settles them back. One primary per view."
        >
          <div className="ds-grid">
            {(['', 'ds-hover', 'ds-focus', 'ds-pressed'] as const).map((state) => (
              <div key={state} className="ds-state">
                <p className="label ds-muted">
                  {
                    {
                      '': 'Default (live)',
                      'ds-hover': 'Hover (forced)',
                      'ds-focus': 'Focus (forced)',
                      'ds-pressed': 'Pressed (forced)',
                    }[state]
                  }
                </p>
                <div className="ds-stack">
                  <a className={`button button--primary ${state}`} href="#buttons">
                    Explore my work <span aria-hidden="true">↓</span>
                  </a>
                  <a className={`button ${state}`} href="#buttons">
                    View resume <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            ))}
            <div className="ds-state">
              <p className="label ds-muted">Disabled and loading</p>
              <p className="ds-note">Not defined yet. No live button needs them. Proposal in governance/findings.md.</p>
            </div>
          </div>
          <h3 className="label ds-sub">Icon button and text button</h3>
          <div className="deck__nav ds-deck-demo">
            <button type="button" className="deck__button" aria-label="Previous (disabled)" disabled>
              <span aria-hidden="true">←</span>
            </button>
            <button type="button" className="field-notes__back label">
              Back to the pile
            </button>
            <button type="button" className="deck__button" aria-label="Next">
              <span aria-hidden="true">→</span>
            </button>
          </div>
          <div className="ds-row">
            {(
              [
                ['Deck arrow: hover (forced)', 'ds-hover'],
                ['Deck arrow: pressed (forced)', 'ds-pressed'],
                ['Disabled: stays flat, 30% opacity', ''],
              ] as const
            ).map(([l, c]) => (
              <Specimen key={l} label={l}>
                <button type="button" className={`deck__button ${c}`} aria-label={l} disabled={c === ''} tabIndex={-1}>
                  <span aria-hidden="true">→</span>
                </button>
              </Specimen>
            ))}
          </div>
        </Block>

        <Block
          id="chips"
          title="Chips and links"
          intro="Each case study card has one outcome badge and a row of chips. A chip never repeats the badge: chips name other skills or scan keywords from the case study. Three chips by default; a card can show more (TreeAssist shows five). Live from content.ts, with the same filter as the home page."
        >
          <div className="ds-row ds-row--chips">
            {caseStudies.map((s) => (
              <Specimen key={s.id} label={`${s.title}: badge, then ${cardTags(s).length} chips`}>
                <div className="ds-chips">
                  <p className="label card__meta">
                    <span className="card__outcome">{s.outcome}</span>
                  </p>
                  <ul className="card__tags label">
                    {cardTags(s).map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              </Specimen>
            ))}
          </div>
          <div className="ds-row">
            <Specimen label="Accent link">
              <a className="ai-principles__link" href="#chips">
                Venue Finder edge cases <span aria-hidden="true">→</span>
              </a>
            </Specimen>
          </div>
        </Block>

        <Block
          id="nav"
          title="Nav"
          intro="The real nav sits at the top of this page: the blue mountain and name, the links, the sun and moon theme switch, and a 1px marker-blue rule along its foot. Hover a link to see the dimension line; under 600px the links become Menu and a full-screen drawing list."
        >
          <p className="ds-note">
            Current section uses aria-current="location" and keeps the dimension line drawn. The theme switch follows
            the device's light or dark setting until the visitor picks; their choice is saved and wins.
          </p>
        </Block>

        <Block
          id="polaroid"
          title="Polaroid and hero"
          intro="The live hero, including its load sequence. Hover the polaroid on desktop; on a phone, tap it to flip."
        >
          <button type="button" className="button" onClick={() => setHeroKey((k) => k + 1)}>
            Replay load sequence
          </button>
          <div className="ds-frame">
            <Hero key={heroKey} />
          </div>
        </Block>

        <Block
          id="case-card"
          title="Case study card"
          intro="Mirrors the markup in Work.tsx with real data: a 6:5 looping clip on top (side by side from 900px), the badge, title, lead metric and chips. Hover or tab into the live card to see it pop."
        >
          <div className="ds-cards">
            {(['', 'ds-hover'] as const).map((state) => (
              <div key={state}>
                <p className="label ds-muted ds-state-label">{state ? 'Hover (forced)' : 'Default (live)'}</p>
                <article className={`card ${state}`} aria-labelledby={`ds-card-${state || 'live'}`}>
                  {study.video ? (
                    <CardVideo src={study.video.src} poster={study.video.poster} background={study.video.background} />
                  ) : (
                    <CardCarousel number={study.number} images={study.images} />
                  )}
                  <div className="card__body">
                    <p className="label card__meta">
                      <span>{study.company}</span>
                      <span className="card__outcome">{study.outcome}</span>
                    </p>
                    <h3 id={`ds-card-${state || 'live'}`} className="card__title">
                      <a href={`/${study.slug}`} className="card__link">
                        {study.title}
                      </a>
                    </h3>
                    <p className="card__summary">{study.summary}</p>
                    <p className="card__metric">
                      <span className="card__metric-value">{study.leadMetric.value}</span>
                      <span className="label">{study.leadMetric.label}</span>
                    </p>
                    <ul className="card__supporting">
                      {study.supporting.map((m) => (
                        <li key={m}>{m}</li>
                      ))}
                    </ul>
                    <ul className="card__tags label" aria-label="Tags">
                      {cardTags(study).map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                    <p className="card__cta" aria-hidden="true">
                      <span className="button">
                        Read case study <span className="card__arrow">→</span>
                      </span>
                    </p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </Block>

        <Block id="principles" title="Principle cards" intro="The live AI principles component.">
          <AiPrinciples />
        </Block>

        <Block
          id="expertise"
          title="Expertise cards"
          intro="The live Core Expertise component: raised papers that fan in on scroll (desktop) or a swipeable deck (phone)."
        >
          <Skills />
        </Block>

        <Block
          id="field-notes"
          title="Field notes pile"
          intro="The live pile. Click a print, use Enter or Space, Esc to put it back."
        >
          <div className="ds-pile">
            <FieldStrip notes={fieldNotes} label="Field notes" />
          </div>
        </Block>

        <Block id="tables" title="Revision table" intro="Mirrors About.tsx. Hover a row.">
          <table className="revisions">
            <caption className="visually-hidden">Work history, most recent first</caption>
            <thead className="label">
              <tr>
                <th scope="col">Rev</th>
                <th scope="col">Date</th>
                <th scope="col">Role</th>
                <th scope="col">Company</th>
              </tr>
            </thead>
            <tbody>
              {revisions.slice(0, 3).map((r) => (
                <tr key={r.date}>
                  <td className="label">{r.rev}</td>
                  <td className="label">{r.date}</td>
                  <th scope="row">{r.role}</th>
                  <td>{r.company}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Block>

        <Block
          id="patterns"
          title="Case study patterns"
          intro="Specimens of the blocks case study pages are built from. Text here is placeholder copy describing the block, not a claim."
        >
          <div className="ds-patterns">
            <Specimen label="Callout" wide>
              <div className="case__callout">
                <p>
                  <strong>Callout.</strong> One key insight per section, on a marker tint with a 4px bar.
                </p>
              </div>
            </Specimen>
            <Specimen label="Quote card, light and dark" wide>
              <div className="case__quote-cards">
                <blockquote className="case__quote">
                  <p>Quote cards hold verbatim words from research or stakeholders.</p>
                  <p className="case__quote-name">
                    Name<span>Role</span>
                  </p>
                </blockquote>
                <blockquote className="case__quote case__quote--dark">
                  <p>The dark variant is for the one quote that carries the section.</p>
                  <p className="case__quote-name">
                    Name<span>Role</span>
                  </p>
                </blockquote>
              </div>
            </Specimen>
            <Specimen label="Impact item (value from content.ts)" wide>
              <ul className="case__impact">
                <li>
                  <span className="case__impact-value">{study.leadMetric.value}</span>
                  <span className="label">{study.leadMetric.label}</span>
                </li>
              </ul>
            </Specimen>
            <Specimen label="List with box bullets" wide>
              <ul className="case__list">
                <li>Box bullets, never dashes.</li>
                <li>
                  <strong>Bold lead-in</strong> when an item needs a name.
                </li>
              </ul>
            </Specimen>
            <Specimen label="Placeholder figure" wide>
              <figure className="case__figure">
                <div className="case__figure-frame">
                  <span className="label">Fig. 1 · Key screens to come</span>
                </div>
              </figure>
            </Specimen>
          </div>
        </Block>

        <Block id="switch" title="Mode switch" intro="Existing ⇄ proposed, the architectural before and after.">
          <ModeSwitch mode={mode} onChange={setMode} />
        </Block>

        <Block id="footer" title="Title sheet" intro="The live home page footer below: the blueprint theme in use.">
          <p className="ds-note">Field names use 10px uppercase labels, an open question in the findings.</p>
        </Block>
      </main>
      <Footer onHome />
    </div>
  )
}
