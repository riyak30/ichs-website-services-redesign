import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const { pathname } = useLocation()

  function isActive(path) {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  }

  return (
    <nav className="main-nav">
      <Link className="nav-logo" to="/">
        <img src="/img/logo.png" alt="ICHS Logo" />
      </Link>
      <div className="nav-items">

        <div className={`nav-item${isActive('/') ? ' active' : ''}`}>
          <Link to="/">Plan Your Visit</Link>
          <span className="drop-arrow">▼</span>
          <div className="mega-drop">
            <div className="mega-col">
              <h6>Current Patients</h6>
              <ul>
                <li>Make an Appointment</li>
                <li>Telehealth</li>
                <li>Sign Up for MyChart</li>
                <li>After Hours Care</li>
              </ul>
            </div>
            <div className="mega-col">
              <h6>Paying for Care</h6>
              <ul>
                <li>Billing</li>
                <li>Insurance Assistance</li>
                <li>Sliding Scale Discount</li>
              </ul>
            </div>
            <div className="mega-col">
              <h6>Patient Resources</h6>
              <ul>
                <li>Interpreter Services</li>
                <li>Patient Forms</li>
                <li>Patient FAQ</li>
              </ul>
            </div>
          </div>
        </div>

        <div className={`nav-item${isActive('/services') ? ' active' : ''}`}>
          <Link to="/services">Services</Link>
          <span className="drop-arrow">▼</span>
          <div className="mega-drop">
            <div className="mega-col">
              <h6>General &amp; Urgent</h6>
              <ul>
                <li><Link to="/services/Primary_Care">Primary Care</Link></li>
                <li><Link to="/services/Dental_Care">Dental Care</Link></li>
                <li><Link to="/services/After_Hours_Clinic">After Hours Clinic</Link></li>
                <li><Link to="/services/Eye_Care">Eye Care</Link></li>
              </ul>
            </div>
            <div className="mega-col">
              <h6>Specialized</h6>
              <ul>
                <li><Link to="/services/Behavioral_Health">Behavioral Health</Link></li>
                <li><Link to="/services/Pregnancy_Care">Pregnancy Care</Link></li>
                <li><Link to="/services/Geriatric_Care">Geriatric Care</Link></li>
              </ul>
            </div>
            <div className="mega-col">
              <h6>Wellness</h6>
              <ul>
                <li><Link to="/services/Healthy_Aging_and_Wellness">Healthy Aging</Link></li>
                <li><Link to="/services/Nutrition_Services">Nutrition Services</Link></li>
                <li><Link to="/services/Acupuncture">Acupuncture</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className={`nav-item${isActive('/location') ? ' active' : ''}`}>
          <Link to="/location">Location</Link>
          <span className="drop-arrow">▼</span>
          <div className="mega-drop" style={{ minWidth: '440px' }}>
            <div className="mega-col">
              <h6>Medical &amp; Dental</h6>
              <ul>
                <li><Link to="/location/intl-district">International District</Link></li>
                <li><Link to="/location/holly-park">Holly Park</Link></li>
                <li><Link to="/location/shoreline">Shoreline</Link></li>
                <li><Link to="/location/bellevue">Bellevue</Link></li>
              </ul>
            </div>
            <div className="mega-col">
              <h6>Community Sites</h6>
              <ul>
                <li><Link to="/location/seattle-world-school">Seattle World School</Link></li>
                <li><Link to="/location/mobile-medical">Mobile Medical Clinic</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className={`nav-item${isActive('/providers') ? ' active' : ''}`}>
          <Link to="/providers">Find a Provider</Link>
        </div>

        <div className={`nav-item${isActive('/about') ? ' active' : ''}`}>
          <Link to="/about">About</Link>
          <span className="drop-arrow">▼</span>
          <div className="mega-drop" style={{ minWidth: '340px' }}>
            <div className="mega-col">
              <h6>Our Organization</h6>
              <ul>
                <li>Mission &amp; History</li>
                <li>Leadership</li>
                <li>Newsroom</li>
                <li>Contact Us</li>
              </ul>
            </div>
            <div className="mega-col">
              <h6>Support Us</h6>
              <ul>
                <li>Donate</li>
                <li>ICHS Foundation</li>
              </ul>
            </div>
          </div>
        </div>

        <div className={`nav-item${isActive('/careers') ? ' active' : ''}`}>
          <Link to="/careers">Careers</Link>
        </div>

      </div>
    </nav>
  )
}
