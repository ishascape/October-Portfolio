import './Footer.css'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__block mono">
          <p className="footer__name">Ashni Dave · Senior Product Designer · Sydney</p>
          <nav aria-label="Sheet index">
            <ul className="footer__index">
              <li>
                <a href="#top">00 Site plan</a>
              </li>
              <li>
                <a href="#work">01 Work</a>
              </li>
              <li>
                <a href="#about">02 About</a>
              </li>
              <li>
                <a href="#contact">03 Contact</a>
              </li>
            </ul>
          </nav>
          <p className="footer__rev">© 2026 · Product design with a point of view.</p>
        </div>
      </div>
    </footer>
  )
}
