import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import locationsData from '../data/locationsData.js'
import providersData from '../data/providersData.js'
import NewsletterStrip from '../components/NewsletterStrip.jsx'

// Maps dropdown service value → provider specialties
const SERVICE_TO_SPECIALTY = {
  'Medical':           ['Primary Care'],
  'Dental':            ['Dental Care'],
  'Vision':            ['Eye Care'],
  'Nutrition':         ['Nutrition Services'],
  'Behavioral Health': ['Behavioral Health'],
  'Acupuncture':       [],
  'WIC':               ['Nutrition Services'],
  'Pharmacy':          [],
}

// Maps servicesOffered IDs → clinic department card config
const DEPT_CFG = {
  Primary_Care: {
    name: 'Medical Clinic',
    hours: 'Mon–Sat · 8am–5pm',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-dark)" strokeWidth="1.6" style={{ width: 20, height: 20 }}>
        <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"/><path d="M6 3H4"/><path d="M18 3h2"/><path d="M12 16v3"/><circle cx="12" cy="21" r="1.5"/>
      </svg>
    ),
  },
  Dental_Care: {
    name: 'Dental Clinic',
    hours: 'Mon–Sat · 8am–5pm',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-dark)" strokeWidth="1.6" style={{ width: 20, height: 20 }}>
        <path d="M12 2c-2.5 0-5 2-5 5 0 1.4.4 2.6 1 3.7C7.4 12.5 7 14.2 7 16c0 2.2 1.3 4 2.5 4 .7 0 1.3-.6 1.8-1.8.4-1 .7-1.2.7-1.2s.3.2.7 1.2C13.2 19.4 13.8 20 14.5 20 15.7 20 17 18.2 17 16c0-1.8-.4-3.5-1-5.3.6-1.1 1-2.3 1-3.7 0-3-2.5-5-5-5z"/>
      </svg>
    ),
  },
  Eye_Care: {
    name: 'Vision Clinic',
    hours: 'Mon, Tue, Thu · 9am–5pm\nWed · 9am–1pm',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-dark)" strokeWidth="1.6" style={{ width: 20, height: 20 }}>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  Acupuncture: {
    name: 'Acupuncture',
    hours: 'Mon–Thu · 9am–5pm',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-dark)" strokeWidth="1.6" style={{ width: 20, height: 20 }}>
        <line x1="12" y1="2" x2="12" y2="18"/><polyline points="7 13 12 18 17 13"/><path d="M8 6h8"/>
      </svg>
    ),
  },
  Nutrition_Services: {
    name: 'Nutrition',
    hours: 'Mon–Sat · 8am–5pm',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-dark)" strokeWidth="1.6" style={{ width: 20, height: 20 }}>
        <path d="M12 22c-4 0-8-4.5-8-10a8 8 0 0 1 16 0c0 5.5-4 10-8 10z"/><path d="M12 7V2"/><path d="M9 4l3-2 3 2"/>
      </svg>
    ),
  },
  Women_Infants_and_Children_WIC: {
    name: 'Women, Infants & Children (WIC)',
    hours: 'Mon–Sat · 8:30am–5pm',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-dark)" strokeWidth="1.6" style={{ width: 20, height: 20 }}>
        <circle cx="9" cy="7" r="3"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><circle cx="18" cy="8" r="2"/><path d="M21 21v-1.5a3.5 3.5 0 0 0-2.5-3.35"/>
      </svg>
    ),
  },
  Pharmacy: {
    name: 'Pharmacy',
    hours: 'Mon–Fri · 8am–5pm\nSat · 9am–5pm',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-dark)" strokeWidth="1.6" style={{ width: 20, height: 20 }}>
        <rect x="8" y="5" width="8" height="16" rx="2"/><path d="M10 2h4"/><path d="M8 11h8"/>
      </svg>
    ),
  },
  Behavioral_Health: {
    name: 'Behavioral Health',
    hours: 'Mon–Fri · 8am–5pm',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-dark)" strokeWidth="1.6" style={{ width: 20, height: 20 }}>
        <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
  },
  Healthy_Aging_and_Wellness: {
    name: 'Healthy Aging & Wellness',
    hours: 'Mon–Fri · 9am–5pm',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-dark)" strokeWidth="1.6" style={{ width: 20, height: 20 }}>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
  Health_Education: {
    name: 'Health Education',
    hours: 'Mon–Fri · 9am–5pm',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-dark)" strokeWidth="1.6" style={{ width: 20, height: 20 }}>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
  },
  After_Hours_Clinic: {
    name: 'After Hours Clinic',
    hours: 'Mon–Fri · 5pm–9pm',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-dark)" strokeWidth="1.6" style={{ width: 20, height: 20 }}>
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  School_Services: {
    name: 'School Health Services',
    hours: 'School hours only',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-dark)" strokeWidth="1.6" style={{ width: 20, height: 20 }}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  Geriatric_Care: {
    name: 'Geriatric Care',
    hours: 'Mon–Fri · 9am–5pm',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-dark)" strokeWidth="1.6" style={{ width: 20, height: 20 }}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  Medication_Assisted_Treatment: {
    name: 'Medication Assisted Treatment',
    hours: 'Mon–Fri · 8am–5pm',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-dark)" strokeWidth="1.6" style={{ width: 20, height: 20 }}>
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>
      </svg>
    ),
  },
}

// Static service category content (same for all locations)
const SVC_CATEGORIES = [
  {
    iconPaths: <><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></>,
    title: 'General Care',
    items: [
      { text: 'Adult & Pediatric Medical Care', detail: 'Comprehensive check-ups, preventive care, and treatment for patients of all ages — from newborns to older adults.' },
      { text: 'On-site Pharmacy', detail: 'Fill prescriptions and get medication counseling right at the clinic, with staff available in multiple languages.' },
      { text: 'Comprehensive Dental', detail: 'Preventive cleanings, fillings, extractions, and other dental services for children and adults.' },
      { text: 'Vision Services', detail: 'Vision exams and prescription eyewear referrals to help you see clearly and maintain long-term eye health.' },
      { text: 'Behavioral Health', detail: 'Mental health counseling and support services integrated with your primary care for whole-person wellness.' },
    ],
  },
  {
    iconPaths: <><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></>,
    title: 'Specialized Support',
    items: [
      { text: "Women's Preventative Health", detail: 'Annual exams, screenings, family planning, and reproductive health services tailored for women at every life stage.' },
      { text: 'Medication Assisted Treatment', detail: 'Evidence-based treatment combining medication and counseling to support recovery from substance use disorders.' },
      { text: 'HIV Prevention', detail: 'PrEP, testing, and education services to help prevent HIV and support those living with the virus.' },
      { text: 'Coordination of Care', detail: 'Our care team connects you with specialists and community resources to make sure nothing falls through the cracks.' },
      { text: 'Nutrition Counseling', detail: 'Personalized guidance from a registered dietitian to support healthy eating habits and manage diet-related conditions.' },
      { text: 'Acupuncture', detail: 'Traditional acupuncture treatments to help with pain management, stress, and overall wellness.' },
    ],
  },
  {
    iconPaths: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
    title: 'Community Resources',
    items: [
      { text: 'WIC (Women, Infants, and Children)', detail: 'Free nutrition support, breastfeeding help, and healthy food resources for pregnant women, young children and infants.' },
      { text: 'Insurance Enrollment', detail: 'Friendly enrollment specialists help you sign up for Medicaid, Apple Health, or find coverage that fits your situation.' },
      { text: 'Health Education', detail: 'Workshops and one-on-one sessions to help you understand your health, manage conditions, and make informed decisions.' },
    ],
  },
]

const VISIBLE = 3

export default function LocationDetailPage() {
  const { locationId } = useParams()
  const navigate = useNavigate()
  const location = locationsData.find(l => l.id === locationId)
  const [openItems, setOpenItems] = useState({})
  const [deptPage, setDeptPage] = useState(0)
  const [provService, setProvService] = useState('')
  const [showProv, setShowProv] = useState(false)

  if (!location) {
    navigate('/location')
    return null
  }

  const depts = location.servicesOffered
    .filter(id => DEPT_CFG[id])
    .map(id => ({ ...DEPT_CFG[id], phone: location.phone, id }))

  const totalPages = Math.max(1, Math.ceil(depts.length / VISIBLE))

  function toggleItem(catIdx, itemIdx) {
    const key = `${catIdx}-${itemIdx}`
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }))
  }

  // First non-closed hours entry for General Hours display
  const firstHours = Object.entries(location.hoursDetailed).find(([, v]) => v !== 'Closed')
  const hoursDisplay = firstHours ? firstHours[1] : 'See schedule'

  const carouselBtnStyle = {
    position: 'absolute', top: '50%', transform: 'translateY(-50%)',
    width: 40, height: 40, borderRadius: '50%', background: 'white',
    border: '1.5px solid rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center',
    justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    zIndex: 2, color: 'var(--navy)', fontSize: 20, userSelect: 'none',
    fontFamily: 'var(--font-body)',
  }

  return (
    <>
      {/* ── BREADCRUMB ── */}
      <div className="breadcrumb">
        <Link to="/">Home</Link> / <Link to="/location">Location</Link> / <span>{location.name}</span>
      </div>

      {/* ── HEADER CARD ── */}
      <div style={{ background: 'white' }}>
        <div style={{
          background: 'white', borderRadius: 'var(--radius-lg)',
          border: '1.5px solid rgba(0,0,0,0.07)', display: 'grid',
          gridTemplateColumns: '240px 1fr', overflow: 'hidden',
          margin: '28px 40px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        }}>
          {/* Photo */}
          <div style={{ background: 'linear-gradient(135deg,#0d4858 0%,#1a6878 50%,var(--teal-dark) 100%)', position: 'relative', overflow: 'hidden', minHeight: 220 }}>
            <img
              src={location.imageFile}
              alt={location.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
              onError={e => { e.target.style.display = 'none' }}
            />
          </div>

          {/* Info */}
          <div style={{ padding: '28px 32px' }}>
            <div style={{ fontFamily: 'var(--font-head)', fontSize: 24, fontWeight: 700, color: 'var(--navy)', marginBottom: 10, lineHeight: 1.2 }}>{location.name}</div>
            {location.description && (
              <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.65, marginBottom: 20, maxWidth: 560 }}>{location.description}</div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
              {/* Address */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--teal-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-dark)" strokeWidth="2" style={{ width: 15, height: 15 }}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-head)', fontSize: 11, fontWeight: 700, color: 'var(--muted)', marginBottom: 2 }}>Address</div>
                  <div style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.4 }}>
                    {location.mapUrl
                      ? <a href={location.mapUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--teal-dark)', fontWeight: 600, textDecoration: 'underline', textDecorationColor: 'rgba(2,110,112,0.4)' }}>{location.address}</a>
                      : location.address}
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--teal-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-dark)" strokeWidth="2" style={{ width: 15, height: 15 }}>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.37 2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-head)', fontSize: 11, fontWeight: 700, color: 'var(--muted)', marginBottom: 2 }}>Phone Number</div>
                  <div style={{ fontSize: 13, lineHeight: 1.4 }}>
                    <a href={`tel:${location.phone.replace(/\D/g, '')}`} style={{ color: 'var(--teal-dark)', fontWeight: 600, textDecoration: 'underline', textDecorationColor: 'rgba(2,110,112,0.4)' }}>{location.phone}</a>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--teal-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-dark)" strokeWidth="2" style={{ width: 15, height: 15 }}>
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-head)', fontSize: 11, fontWeight: 700, color: 'var(--muted)', marginBottom: 2 }}>General Hours</div>
                  <div style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.4 }}>{hoursDisplay}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SERVICES AT THIS LOCATION ── */}
      <div style={{ background: 'var(--teal-light)', padding: '48px 40px' }}>
        <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 24, fontWeight: 700, color: 'var(--navy)', textAlign: 'center', marginBottom: 32 }}>
          Services we offer at this location
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
          {SVC_CATEGORIES.map((cat, catIdx) => (
            <div key={catIdx} style={{ background: 'white', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              {/* Category header */}
              <div style={{ background: 'var(--teal-dark)', padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" style={{ width: 18, height: 18 }}>
                    {cat.iconPaths}
                  </svg>
                </div>
                <h4 style={{ fontFamily: 'var(--font-head)', fontSize: 14, fontWeight: 700, color: 'white' }}>{cat.title}</h4>
              </div>
              {/* Accordion items */}
              <div style={{ padding: '4px 0' }}>
                {cat.items.map((item, itemIdx) => {
                  const isOpen = !!openItems[`${catIdx}-${itemIdx}`]
                  return (
                    <div
                      key={itemIdx}
                      onClick={() => toggleItem(catIdx, itemIdx)}
                      style={{
                        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                        gap: 10, padding: '11px 16px',
                        borderBottom: itemIdx < cat.items.length - 1 ? '1px solid rgba(2,110,112,0.1)' : 'none',
                        cursor: 'pointer', background: isOpen ? 'rgba(2,110,112,0.03)' : 'transparent',
                        transition: 'background 0.15s',
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: 'var(--font-head)', fontSize: 13, fontWeight: 600, color: isOpen ? 'var(--teal-dark)' : 'var(--navy)', lineHeight: 1.4 }}>{item.text}</div>
                        <div style={{
                          fontSize: 12, color: 'var(--muted)', lineHeight: 1.6,
                          maxHeight: isOpen ? '80px' : 0, overflow: 'hidden',
                          transition: 'max-height 0.3s ease, margin-top 0.3s ease',
                          marginTop: isOpen ? 6 : 0,
                        }}>{item.detail}</div>
                      </div>
                      <span style={{ fontSize: 16, color: isOpen ? 'var(--teal-dark)' : 'var(--muted)', transition: 'transform 0.25s, color 0.15s', transform: isOpen ? 'rotate(90deg)' : 'none', flexShrink: 0, paddingTop: 1, display: 'block' }}>›</span>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FIND PROVIDERS ── */}
      <div style={{ background: 'var(--teal-light)', padding: '0 40px 48px' }}>
        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: '1.5px solid rgba(0,0,0,0.07)', padding: '28px 32px', maxWidth: 720, margin: '0 auto' }}>
          <h3 style={{ fontFamily: 'var(--font-head)', fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 8 }}>Find Providers at this Location</h3>
          <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 20, lineHeight: 1.6 }}>
            Select a service that we offer. Press Find Provider and it will show you a list of providers.
          </p>
          <div style={{ position: 'relative', marginBottom: 16 }}>
            <select
              value={provService}
              onChange={e => { setProvService(e.target.value); setShowProv(false) }}
              style={{ width: '100%', padding: '12px 40px 12px 16px', border: '1.5px solid #d0d8da', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--ink)', background: 'white', outline: 'none', appearance: 'none', cursor: 'pointer', transition: 'border-color .15s' }}
            >
              <option value="">Clinic Services:</option>
              <option value="Medical">Medical</option>
              <option value="Dental">Dental</option>
              <option value="Vision">Vision</option>
              <option value="Acupuncture">Acupuncture</option>
              <option value="Nutrition">Nutrition Counseling</option>
              <option value="WIC">Women, Infants &amp; Children (WIC)</option>
              <option value="Pharmacy">Pharmacy</option>
            </select>
            <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 10, color: 'var(--muted)', pointerEvents: 'none' }}>▼</span>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <Link
              to="/providers"
              style={{ display: 'inline-flex', alignItems: 'center', padding: '11px 22px', borderRadius: 40, fontFamily: 'var(--font-head)', fontSize: 14, fontWeight: 700, background: 'transparent', color: 'var(--teal-dark)', border: '2px solid var(--teal-dark)', textDecoration: 'none', transition: 'background 0.15s, color 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--teal-dark)'; e.currentTarget.style.color = 'white' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--teal-dark)' }}
            >
              View All Providers
            </Link>
            <button
              onClick={() => setShowProv(v => !v)}
              style={{ display: 'inline-flex', alignItems: 'center', padding: '11px 22px', borderRadius: 40, fontFamily: 'var(--font-head)', fontSize: 14, fontWeight: 700, background: 'var(--crimson)', color: 'white', border: '2px solid var(--crimson)', cursor: 'pointer', transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#6b0d2d'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--crimson)'}
            >
              {showProv ? 'Hide Providers' : 'Find Provider'}
            </button>
          </div>

          {showProv && (() => {
            const specialties = provService ? (SERVICE_TO_SPECIALTY[provService] || []) : null
            const results = providersData.filter(p => {
              const matchLocation = p.location === location.name
              const matchService = !specialties || specialties.length === 0
                ? !provService  // if service has no mapped specialties, only show if no filter
                : specialties.includes(p.specialty)
              return matchLocation && matchService
            })
            return (
              <div>
                <div style={{ fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 700, color: 'var(--navy)', margin: '20px 0 14px' }}>Results</div>
                {results.length === 0 ? (
                  <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>
                    No providers found for the selected service at this location.{' '}
                    <Link to="/providers" style={{ color: 'var(--teal-dark)', fontWeight: 600 }}>View all providers</Link>.
                  </p>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
                    {results.map(p => (
                      <Link
                        key={p.id}
                        to={`/providers/${p.id}`}
                        style={{ display: 'block', background: 'white', borderRadius: 'var(--radius-md)', border: '1.5px solid rgba(0,0,0,0.07)', overflow: 'hidden', textDecoration: 'none', transition: 'border-color .15s' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--teal-mid)' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.07)' }}
                      >
                        <div style={{ height: 120, background: 'linear-gradient(135deg, var(--teal-light) 0%, #b8dfe0 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg viewBox="0 0 100 100" style={{ width: 44, height: 44, stroke: 'var(--teal-dark)', fill: 'none', strokeWidth: 0.8, opacity: 0.4 }}>
                            <circle cx="50" cy="35" r="22"/><path d="M15 90c0-19.3 15.7-35 35-35s35 15.7 35 35"/>
                          </svg>
                        </div>
                        <div style={{ padding: 14 }}>
                          <div style={{ fontFamily: 'var(--font-head)', fontSize: 14, fontWeight: 700, color: 'var(--navy)', marginBottom: 3 }}>{p.name}</div>
                          <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 8, lineHeight: 1.4 }}>{p.role}</div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-dark)" strokeWidth="2" style={{ width: 12, height: 12, flexShrink: 0 }}>
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                            </svg>
                            {p.location}
                          </div>
                          {p.langs && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>
                              <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-dark)" strokeWidth="2" style={{ width: 12, height: 12, flexShrink: 0 }}>
                                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
                              </svg>
                              {p.langs}
                            </div>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })()}
        </div>
      </div>

      {/* ── CLINIC DEPARTMENTS ── */}
      {depts.length > 0 && (
        <div style={{ background: '#f0ede8', padding: '52px 40px' }}>
          <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 26, fontWeight: 700, color: 'var(--navy)', textAlign: 'center', marginBottom: 6 }}>Clinic Departments</h2>
          <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--muted)', marginBottom: 36 }}>Call to book an appointment · All services available in multiple languages</p>
          <div style={{ position: 'relative', maxWidth: 920, margin: '0 auto' }}>
            {/* Prev */}
            {deptPage > 0 && (
              <button
                onClick={() => setDeptPage(p => p - 1)}
                style={{ ...carouselBtnStyle, left: -20 }}
                aria-label="Previous"
              >‹</button>
            )}
            {/* Next */}
            {deptPage < totalPages - 1 && (
              <button
                onClick={() => setDeptPage(p => p + 1)}
                style={{ ...carouselBtnStyle, right: -20 }}
                aria-label="Next"
              >›</button>
            )}

            {/* Cards grid (current page slice) */}
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${VISIBLE}, 1fr)`, gap: 16 }}>
              {depts.slice(deptPage * VISIBLE, (deptPage + 1) * VISIBLE).map((dept, i) => (
                <div
                  key={dept.id}
                  style={{ background: 'white', border: '1.5px solid rgba(0,0,0,0.07)', borderRadius: 'var(--radius-lg)', padding: '22px 20px', transition: 'box-shadow .15s, border-color .15s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--teal-mid)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(2,110,112,0.08)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.07)'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--teal-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                    {dept.icon}
                  </div>
                  <div style={{ fontFamily: 'var(--font-head)', fontSize: 15, fontWeight: 700, color: 'var(--navy)', marginBottom: 10 }}>{dept.name}</div>
                  <hr style={{ border: 'none', borderTop: '1px solid rgba(0,0,0,0.08)', marginBottom: 10 }} />
                  <a
                    href={`tel:${dept.phone.replace(/\D/g, '')}`}
                    style={{ fontFamily: 'var(--font-head)', fontSize: 14, fontWeight: 700, color: 'var(--crimson)', marginBottom: 6, textDecoration: 'none', display: 'block' }}
                  >{dept.phone}</a>
                  <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5, whiteSpace: 'pre-line' }}>{dept.hours}</div>
                </div>
              ))}
            </div>

            {/* Dots */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24 }}>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setDeptPage(i)}
                    aria-label={`Go to page ${i + 1}`}
                    style={{
                      width: 8, height: 8, borderRadius: '50%', border: 'none', padding: 0, cursor: 'pointer',
                      background: i === deptPage ? 'var(--teal-dark)' : 'rgba(2,110,112,0.2)',
                      transform: i === deptPage ? 'scale(1.2)' : 'none',
                      transition: 'background 0.2s, transform 0.2s',
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <NewsletterStrip />
    </>
  )
}
