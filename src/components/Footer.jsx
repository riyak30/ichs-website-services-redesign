import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="footer-logo">
            <Link to="/"><img src="/img/logo.png" alt="ICHS Logo" /></Link>
          </div>
          <p className="footer-tagline">Serving Greater Seattle's diverse communities since 1973.</p>
          <div className="footer-social">
            {/* Facebook */}
            <a className="social-btn" href="#" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            {/* Instagram */}
            <a className="social-btn" href="#" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="white" strokeWidth="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="white" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.5" fill="white"/></svg>
            </a>
            {/* Twitter/X */}
            <a className="social-btn" href="#" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
            </a>
            {/* YouTube */}
            <a className="social-btn" href="#" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#072C38"/></svg>
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h5>About</h5>
          <ul>
            <li><Link to="/about">History</Link></li>
            <li><Link to="/about">Leadership</Link></li>
            <li>Newsroom</li>
            <li>Annual Reports</li>
            <li>Healthcare Advocacy</li>
            <li>Contact Us</li>
            <li>For Employees</li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>Patient Resources</h5>
          <ul>
            <li>Make an Appointment</li>
            <li>Telehealth</li>
            <li>Sign Up for MyChart</li>
            <li>Billing</li>
            <li>Sliding Scale Discounts</li>
            <li>Patient Forms</li>
            <li>Patient FAQ</li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>Careers</h5>
          <ul>
            <li><Link to="/careers">Current Openings</Link></li>
            <li>Family Medicine Residency</li>
            <li>Advanced Practice</li>
            <li>Provider Regency</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright &copy; 2026 International Community Health Services. All rights reserved.</p>
        <p>This health center is a Health Center Program grantee under 42 U.S.C. 254b, and a deemed Public Health Service employee under 42 U.S.C. 233(g)-(n).</p>
        <p>ICHS does not discriminate on the basis of race, color, sex, marital status, sexual orientation, political ideology, age, creed, religion, ancestry, gender identity, genetic information, use of service animals, national origin, veteran status, citizenship status, or the presence of any sensory, mental or physical disability.</p>
        <div className="footer-lang-notice">
          ATTENTION: Language assistance services are available to you free of charge. Call <a href="tel:2067883700">1-206-788-3700</a> (TTY 711).
        </div>
      </div>
    </footer>
  )
}
