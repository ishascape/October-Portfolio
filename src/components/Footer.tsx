import { sectionHref } from '../links'
import './Footer.css'

export function Footer({ onHome }: { onHome: boolean }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__block label">
          <p className="footer__name">Ashni Dave · Senior Product Designer · Sydney</p>
          <nav aria-label="Sheet index">
            <ul className="footer__index">
              <li>
                <a href={sectionHref('top', onHome)}>00 Introduction</a>
              </li>
              <li>
                <a href={sectionHref('work', onHome)}>01 Work</a>
              </li>
              <li>
                <a href={sectionHref('about', onHome)}>02 About</a>
              </li>
              <li>
                <a href={sectionHref('contact', onHome)}>03 Contact</a>
              </li>
            </ul>
          </nav>
          <p className="footer__rev">© 2026 · Product design with a point of view.</p>
        </div>
      </div>
    </footer>
  )
}
