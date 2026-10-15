import { fieldNotes, principles, revisions } from '../data/content'
import { SheetLabel } from './SheetLabel'
import './About.css'

export function About() {
  const groups = [...new Set(fieldNotes.map((f) => f.group))]

  return (
    <section id="about" className="section about paper-sheet" aria-labelledby="about-heading">
      <div className="container">
        <SheetLabel sheet="02 / 03" title="About" />

        <div className="about__intro">
          <h2 id="about-heading" className="display about__heading">
            Trained as an architect. Practising as a product designer.
          </h2>
          <div className="about__body">
            <p>
              I studied architecture at the University of Bath, and I still think like one: understand the site
              before drawing the building. Today I turn complex marketplaces and B2B platforms into simple products
              that drive business results, most recently as Senior Product Designer at HeadBox, and before that across
              growth, core product and monetisation squads at Findmypast.
            </p>
            <p className="about__note">
              This site is designed and built with AI-assisted code in React and TypeScript, after Memorisely's AI
              Coding for Designers (2026).
            </p>
          </div>
        </div>

        <h3 id="how-i-work" className="label about__subhead">
          How I work
        </h3>
        <ol className="principles">
          {principles.map((p) => (
            <li key={p.number} className="principle">
              <span className="principle__number" aria-hidden="true">
                {p.number}
              </span>
              <div className="principle__text">
                <h4 className="principle__title">{p.title}</h4>
                <p>{p.body}</p>
                <ul className="principle__evidence">
                  {p.evidence.map((e) => (
                    <li key={e.text}>
                      <span className="label">{e.source}</span>
                      {e.text}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        <h3 className="label about__subhead">Revision history</h3>
        <table className="revisions">
          <caption className="visually-hidden">Career history, most recent first</caption>
          <thead className="label">
            <tr>
              <th scope="col">Rev</th>
              <th scope="col">Date</th>
              <th scope="col">Role</th>
              <th scope="col">Company</th>
            </tr>
          </thead>
          <tbody>
            {revisions.map((r) => (
              <tr key={r.date}>
                <td className="label">{r.rev}</td>
                <td className="label">{r.date}</td>
                <th scope="row">{r.role}</th>
                <td>{r.company}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="field-notes">
          <div className="field-notes__copy">
            <h3 className="field-notes__heading">Field notes</h3>
            <p>Outside work I'm usually drawing, playing music or planning the next trip.</p>
            <p>
              My sketchbook is mostly animals. Drawing them uses the same muscle as product design: look closely, then
              leave out everything that isn't needed.
            </p>
            <p>
              I play piano and flute and perform at gigs every few weeks. I've travelled to 39 countries, summited
              Kilimanjaro and Mt Kenya, and trekked to Everest Base Camp. Since 2011 I've been a committee member at
              the Amara Charitable Trust, and I volunteer with FOECT on reforestation in Kenya.
            </p>
          </div>

          <div className="field-notes__figures">
            {groups.map((g) => (
              <div key={g} className="field-notes__group">
                <p className="label field-notes__group-label">{g}</p>
                <ul className="field-notes__strip">
                  {fieldNotes
                    .filter((f) => f.group === g)
                    .map((f) => (
                      <li key={f.fig}>
                        <figure className="figure">
                          <div className="figure__frame" style={{ aspectRatio: f.ratio }} aria-hidden="true">
                            <span className="label">Fig. {f.fig}</span>
                          </div>
                          <figcaption className="label">{f.caption}</figcaption>
                        </figure>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
