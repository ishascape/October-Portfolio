import { education, fieldNotes, revisions } from '../data/content'
import { SheetLabel } from './SheetLabel'
import { Skills } from './Skills'
import { ProductOracle } from './oracle/ProductOracle'
import { FieldStrip } from './FieldStrip'
import './About.css'

export function About() {
  return (
    <section id="about" className="section about paper-sheet" aria-labelledby="about-heading">
      <div className="container">
        <SheetLabel sheet="02 / 03" title="About" />

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
            <p>I trained as an architect in the UK. Turns out, I never stopped thinking like one.</p>
            <p className="about__mantra">Understand the space. Challenge the brief. Design for the people using it.</p>
            <p>
              <strong>Designing complex systems.</strong> These days, I do that with digital products: untangling messy
              workflows, connecting the dots between people and systems, and making complicated things feel simple.
            </p>
            <p>
              <strong>Driving commercial outcomes.</strong> Experiences that work for users and make business sense, at
              HeadBox and Findmypast.
            </p>
            <p>
              <strong>Shipping through ambiguity.</strong> Taking ambiguous problems from discovery to delivery.
            </p>
          </div>
        </div>

        <ProductOracle />

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
            <p>Outside work, I'm usually drawing, consuming art, food &amp; music, or plotting my next trip.</p>
            <p>
              I love sketching animals. There's something satisfying about capturing a personality in just a few lines.
              I've played piano and flute for years, and absolutely love live music, from metalcore gigs to orchestras
              and pretty much everything in between.
            </p>
            <p>
              I've explored 38 countries and counting, summited Kilimanjaro and Mt Kenya, and trekked to Everest Base
              Camp. I'm always up for an adventure, especially if it involves mountains, wildlife or a slightly
              questionable amount of walking.
            </p>
            <p>
              Giving back has always been important to me, too. I've been on the Amara Charitable Trust committee since
              2011, volunteered on reforestation projects with FOECT in Kenya, and helped build a sand dam in Machakos
              with my high school friends, bringing better access to water to over 1,000 people.
            </p>
            <p>Mostly, I just like being curious, trying new things and collecting good stories along the way.</p>
          </div>

          <div className="field-notes__figures">
            <FieldStrip notes={fieldNotes} label="Field notes" />
          </div>
        </div>
      </div>
    </section>
  )
}
