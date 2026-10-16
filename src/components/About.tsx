import { education, fieldNotes, principles, revisions } from '../data/content'
import { SheetLabel } from './SheetLabel'
import { PrincipleParti } from './PrinciplePartis'
import { Skills } from './Skills'
import './About.css'

export function About() {
  const groups = [...new Set(fieldNotes.map((f) => f.group))]

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
            <p className="about__mantra">Understand the site. Question the brief. Design for the people who use it.</p>
            <p>
              Today, I apply that thinking to digital products — untangling complex workflows, connecting user needs
              with business goals, and making the complicated feel effortless.
            </p>
            <p>
              Most recently, I shaped B2B and marketplace experiences at HeadBox, following work across growth, core
              product and monetisation at Findmypast.
            </p>
            <p className="about__note">
              And this portfolio? Designed by me. Built with React, TypeScript and a lot of help from AI.
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

        <h3 id="design-ethos" className="label about__subhead">
          Design ethos
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
              <PrincipleParti number={p.number} />
            </li>
          ))}
        </ol>

        <div className="field-notes">
          <div className="field-notes__copy">
            <h3 className="display field-notes__heading">Field notes</h3>
            <p>Outside work, I'm usually drawing, consuming art, food &amp; music, or plotting my next trip.</p>
            <p>
              I love sketching animals, there's something satisfying about capturing a personality in just a few lines.
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
            {groups.map((g) => (
              <div key={g} className="field-notes__group">
                <p className="label field-notes__group-label">{g}</p>
                <ul className="field-notes__strip">
                  {fieldNotes
                    .filter((f) => f.group === g)
                    .map((f) => (
                      <li key={f.fig}>
                        <figure className="figure">
                          {f.src ? (
                            <div className="figure__photo" style={{ aspectRatio: f.ratio }}>
                              <img src={f.src} alt={f.alt} loading="lazy" decoding="async" />
                            </div>
                          ) : (
                            <div className="figure__frame" style={{ aspectRatio: f.ratio }} aria-hidden="true">
                              <span className="label">Fig. {f.fig}</span>
                            </div>
                          )}
                          <figcaption className="annotation">{f.caption}</figcaption>
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
