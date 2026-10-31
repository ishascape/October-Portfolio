import { education, fieldNotes, revisions } from '../data/content'
import { Skills } from './Skills'
import { FieldStrip } from './FieldStrip'
import './About.css'

export function About() {
  return (
    <section id="about" className="section about paper-sheet" aria-labelledby="about-heading">
      <div className="container">
        <div className="about__intro">
          <div className="about__title">
            {/* A pen-drawn face above the heading. On hover it winks, smirks and flashes a sparkle. */}
            <span className="about__wink" aria-hidden="true">
              <svg className="wink" viewBox="0 0 40 30">
                <path className="wink__eye" d="M12 5.5 v6" />
                <path className="wink__eye wink__eye--open" d="M26 5.5 v6" />
                <path className="wink__eye wink__eye--shut" d="M22.5 11.5 Q26 5.5 30 11" />
                <path className="wink__mouth wink__mouth--grin" d="M10.5 17.5 C14 23 23 23 27 16.5" />
                <path className="wink__mouth wink__mouth--smirk" d="M10.8 19.5 C15 22.5 23 22 29 14.5" />
                <path className="wink__spark" d="M34 4 v6 M31 7 h6 M32 5 l4 4 M36 5 l-4 4" />
              </svg>
            </span>
            <h2 id="about-heading" className="display about__heading">
              {/* One sentence per line. */}
              <span>Build something people love.</span> <span>Make it commercially viable.</span>
            </h2>
          </div>
          <div className="about__body">
            <p>
              Trained as an architect, so I start with the system: who pays, who uses it, and what must be true for
              both.
            </p>
            <p className="about__mantra">Understand the space. Challenge the brief. Design for the people using it.</p>
            <p>
              <strong>Complex systems, made simple.</strong> Four host tools became one platform.
            </p>
            <p>
              <strong>Commercial outcomes.</strong> £500k+ from a Gift Subscription MVP. 28% less churn on guest booking
              journeys.
            </p>
            <p>
              <strong>Speed through ambiguity.</strong> New-city launch planning cut from 12+ weeks to 2.
            </p>
          </div>
        </div>

        <Skills />

        <h3 className="label about__subhead">Work history</h3>
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

        <h3 className="label about__subhead">Education</h3>
        <table className="revisions revisions--education">
          <caption className="visually-hidden">Education and courses, most recent first</caption>
          <thead className="label">
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Course</th>
              <th scope="col">Institution</th>
            </tr>
          </thead>
          <tbody>
            {education.map((e) => (
              <tr key={e.course}>
                <td className="label">{e.date}</td>
                <th scope="row">{e.course}</th>
                <td>{e.school}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="field-notes">
          <div className="field-notes__copy">
            <h3 className="display field-notes__heading">Field notes</h3>
            <p>Outside work, I'm usually drawing, at a gig, or plotting my next trip.</p>
            <p>
              I love sketching animals, and live music from metalcore to orchestras. I've explored 38 countries,
              summited Kilimanjaro and Mt Kenya, and trekked to Everest Base Camp.
            </p>
            <p>
              I've been on the Amara Charitable Trust committee since 2011, volunteered on reforestation projects with
              FOECT in Kenya, and helped build a sand dam in Machakos that brings better access to water to over 1,000
              people.
            </p>
          </div>

          <div className="field-notes__figures">
            <FieldStrip notes={fieldNotes} label="Field notes" />
          </div>
        </div>
      </div>
    </section>
  )
}
